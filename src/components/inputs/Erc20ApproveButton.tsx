import { CheckOutlined, ErrorOutlined } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { erc20Abi } from "viem";
import { useCallback, useEffect, useState } from "react";
import {
    useAccount,
    useReadContract,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import { BN_ZERO } from "@/utils/constants";
import EvmAddress from "@/utils/evmAddress";
import { isWriteSettled, TxState } from "@/utils/txState";

export type Erc20ApproveButtonProps = {
    amountNeeded: bigint;
    disabled?: boolean;
    label?: string;
    successLabel?: string;
    token?: EvmAddress;
    spender?: EvmAddress;
};

export type Erc20ApproveButtonRef = {
    reset: () => void;
};

function Erc20ApproveButton({
    label,
    disabled,
    amountNeeded,
    successLabel,
    token,
    spender,
}: Erc20ApproveButtonProps) {
    label = label || "Approve";
    successLabel = successLabel || "Approved";
    const [state, setState] = useState<TxState>("idle");
    const [isDone, setIsDone] = useState<boolean>(false);

    const { address: owner } = useAccount();

    const { data: allowance } = useReadContract({
        address: !!owner && !disabled ? token : undefined,
        abi: erc20Abi,
        functionName: "allowance",
        args: [owner as EvmAddress, spender as EvmAddress],
    });

    const { writeContract: sendTx, data: txHash } = useWriteContract();

    const onButtonClick = useCallback(() => {
        sendTx({
            address: token as EvmAddress,
            abi: erc20Abi,
            functionName: "approve",
            args: [spender as EvmAddress, amountNeeded],
        });
    }, [token, erc20Abi, spender, amountNeeded]);

    const { status: txState, error: txError } = useWaitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    });

    useEffect(() => {
        if (!txHash) setState("idle");
        else setState(txState == "pending" ? "loading" : txState);
    }, [txState, txHash]);

    useEffect(() => {
        if (!allowance) setIsDone(false);
        else if (!amountNeeded) setIsDone(false);
        else if (allowance >= amountNeeded) setIsDone(true);
        else setIsDone(isWriteSettled(state));
    }, [state, allowance, amountNeeded]);

    useEffect(() => {
        if (txError) console.log(txError);
    }, [txError]);

    if (isDone || state === "success")
        return (
            <Button
                variant="contained"
                color={"success"}
                fullWidth
                disableElevation
                disableRipple
                startIcon={<CheckOutlined color="inherit" />}
                sx={{ cursor: "default" }}
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
    else if (state === "error")
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
    else if (state === "idle") {
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
    } else if (state === "loading")
        return (
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
        );
    else return <>Unknown state... {state}</>;
}

Erc20ApproveButton.displayName = "Erc20ApproveButton";

export default Erc20ApproveButton;
