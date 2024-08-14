import { CheckOutlined, ErrorOutlined } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { TxState } from "@/utils/txState";
import { Abi } from "viem";
import EvmAddress from "@/utils/evmAddress";

export type SendTxButtonProps = {
    disabled?: boolean;
    icon?: ReactElement;
    abi: Abi;
    address: EvmAddress;
    functionName: string;
    args?: any[];
    value?: bigint;
    onTxStateChange?: (txState: TxState) => void;
};

export type SendTxButtonRef = {
    reset: () => void;
};

export function SendTxButton(
    props: React.PropsWithChildren<SendTxButtonProps>
) {
    const {
        address,
        abi,
        functionName,
        args,
        value,
        children,
        disabled,
        icon,
        onTxStateChange,
    } = props as React.PropsWithChildren<SendTxButtonProps>;

    const [state, setState] = useState<TxState>("idle");

    const { writeContract: sendTx, data: txHash } = useWriteContract();
    const { status: txStatus } = useWaitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    });

    function onButtonClick() {
        if (disabled) return;
        if (state !== "idle") return;
        if (!address || !args) return;
        sendTx({
            address,
            abi,
            functionName,
            value,
            args,
        });
    }

    useEffect(() => {
        if (!txHash) setState("idle");
        else setState(txStatus == "pending" ? "loading" : txStatus);
    }, [txStatus, txHash]);

    useEffect(() => {
        onTxStateChange?.(state);
    }, [state]);

    return (
        <Button
            variant="contained"
            disabled={state === "idle" && disabled}
            color={state === "success" ? "success" : "primary"}
            fullWidth
            onClick={() => onButtonClick()}
            disableElevation={state !== "idle"}
            disableRipple={state !== "idle"}
            startIcon={
                state === "loading" ? (
                    <CircularProgress size={16} color={"inherit"} />
                ) : state === "success" ? (
                    <CheckOutlined />
                ) : state === "error" ? (
                    <ErrorOutlined />
                ) : (
                    (icon ?? <></>)
                )
            }
            sx={{
                cursor: state === "idle" ? "pointer" : "default",
            }}
        >
            {children}
        </Button>
    );
}

SendTxButton.displayName = "SendTxButton";

export default SendTxButton;
