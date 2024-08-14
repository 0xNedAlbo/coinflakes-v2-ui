import { CheckOutlined, ErrorOutlined } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
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
    } = props as React.PropsWithChildren<SendTxButtonProps>;

    const {
        writeContract: sendTx,
        data: txHash,
        reset: resetTx,
    } = useWriteContract();
    const { isLoading, isPending, isSuccess, isError } =
        useWaitForTransactionReceipt({
            hash: txHash,
            confirmations: 1,
        });

    function onButtonClick() {
        if (disabled) return;
        if (!address || !args) return;
        if (isSuccess || isLoading || isError) return;

        sendTx({
            address,
            abi,
            functionName,
            value,
            args,
        });
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => resetTx?.(), 5000);
    }, [isSuccess]);

    return (
        <Button
            variant="contained"
            disabled={disabled}
            color={isSuccess ? "success" : "primary"}
            fullWidth
            onClick={() => onButtonClick()}
            disableElevation={!isLoading && !isPending}
            disableRipple={!isLoading && !isPending}
            startIcon={
                isLoading ? (
                    <CircularProgress size={16} color={"inherit"} />
                ) : isSuccess ? (
                    <CheckOutlined />
                ) : isError ? (
                    <ErrorOutlined />
                ) : (
                    (icon ?? <></>)
                )
            }
            sx={{
                cursor: !isLoading || !isPending ? "pointer" : "default",
            }}
        >
            {children}
        </Button>
    );
}

SendTxButton.displayName = "SendTxButton";

export default SendTxButton;
