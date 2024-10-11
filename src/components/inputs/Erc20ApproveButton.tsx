import {
    CheckOutlined,
    ErrorOutlined,
    RestaurantMenu,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { erc20Abi } from "viem";
import { useCallback, useEffect, useState } from "react";
import {
    useReadContract,
    useWaitForTransactionReceipt,
    useWatchContractEvent,
    useWriteContract,
} from "wagmi";
import { BN_ZERO } from "@/utils/constants";
import EvmAddress from "@/utils/evmAddress";
import { eventNames } from "process";
import TransactionDialog from "../TransactionDialog";

export type Erc20ApproveButtonProps = {
    amountNeeded: bigint;
    token?: EvmAddress;
    owner?: EvmAddress;
    spender?: EvmAddress;
    disabled?: boolean;
    label?: string;
    successLabel?: string;
    onAllowanceChange?: (newAllowance: bigint) => void;
};

export type Erc20ApproveButtonRef = {
    reset: () => void;
};

function Erc20ApproveButton({
    label,
    disabled,
    successLabel,
    token,
    owner,
    spender,
    amountNeeded,
    onAllowanceChange,
}: Erc20ApproveButtonProps) {
    label = label || "Approve";
    successLabel = successLabel || "Approved";
    const [allowance, setAllowance] = useState(0n);

    const { data: initialAllowance } = useReadContract({
        address: token,
        abi: erc20Abi,
        functionName: "allowance",
        args: [owner as EvmAddress, spender as EvmAddress],
    });

    const {
        writeContract: sendTx,
        data: txHash,
        reset: resetTx,
    } = useWriteContract();

    const onButtonClick = useCallback(() => {
        sendTx({
            address: token as EvmAddress,
            abi: erc20Abi,
            functionName: "approve",
            args: [spender as EvmAddress, amountNeeded],
        });
    }, [token, erc20Abi, spender, amountNeeded]);

    const { isLoading, isSuccess, isPending, isError } =
        useWaitForTransactionReceipt({
            hash: txHash,
            confirmations: 1,
        });

    useWatchContractEvent({
        address: token,
        abi: erc20Abi,
        eventName: "Approval",
        onLogs: (logs) => {
            if (!token) return;
            if (!owner) return;
            if (!spender) return;
            if (!logs.length) return;
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.spender == spender ||
                    logEvent.args.owner == owner
                )
                    if (logEvent.args.value !== undefined)
                        setAllowance(logEvent.args.value);
            });
        },
    });

    useWatchContractEvent({
        address: token,
        abi: erc20Abi,
        eventName: "Transfer",
        onLogs: (logs) => {
            if (!owner) return;
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.from == owner &&
                    logEvent.args.value !== undefined
                )
                    setAllowance(allowance - logEvent.args.value);
            });
        },
    });

    useEffect(() => {
        if (initialAllowance !== undefined) setAllowance(initialAllowance);
    }, [initialAllowance]);

    useEffect(() => {
        onAllowanceChange?.(allowance);
        resetTx?.();
    }, [allowance]);

    useEffect(() => {
        resetTx?.();
    }, [amountNeeded]);

    if (isSuccess || (amountNeeded > 0n && allowance >= amountNeeded))
        return (
            <Button
                variant="contained"
                color={"success"}
                fullWidth
                disableElevation
                disableRipple
                startIcon={<CheckOutlined color="inherit" />}
                sx={{ cursor: "default" }}
                disabled={disabled || amountNeeded == 0n}
            >
                {successLabel}
            </Button>
        );
    else if (disabled || amountNeeded <= BN_ZERO)
        return (
            <Button variant="contained" color={"primary"} fullWidth disabled>
                {label}
            </Button>
        );
    else if (isError)
        return (
            <Button
                variant="contained"
                color={"error"}
                fullWidth
                disabled
                startIcon={<ErrorOutlined color={"error"} />}
            >
                {label}
            </Button>
        );
    else if (isLoading)
        return (
            <>
                <Button
                    variant="contained"
                    color={"primary"}
                    fullWidth
                    disableElevation
                    startIcon={<CircularProgress size={16} color={"inherit"} />}
                    sx={{ cursor: "default" }}
                >
                    {label}
                </Button>
                <TransactionDialog txHash={txHash}></TransactionDialog>
            </>
        );
    else if (isPending) {
        return (
            <Button
                variant="contained"
                color={"primary"}
                disabled={disabled}
                fullWidth
                onClick={onButtonClick}
            >
                {label}
            </Button>
        );
    } else
        return (
            <>
                Unknown state...{" "}
                {console.log({ isLoading, isPending, isSuccess, isError })}
            </>
        );
}

Erc20ApproveButton.displayName = "Erc20ApproveButton";

export default Erc20ApproveButton;
