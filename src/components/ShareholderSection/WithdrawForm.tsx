import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { BN_ZERO } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { useVault } from "@/hooks/useVault";
import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import { useUnderlying } from "@/hooks/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { erc20Abi, erc4626Abi } from "viem";
import { useReadVaultMaxWithdraw, vaultAbi } from "@/generated/wagmi";

function WithdrawForm() {
    const [value, setValue] = useState(BN_ZERO);

    const underlying = useUnderlying();
    const account = useAccount();
    const vault = useVault();

    const { data: maxWithdraw, refetch: refetchMaxWithdraw } =
        // @ts-ignore
        useReadVaultMaxWithdraw({
            args: [account?.address as EvmAddress],
        });

    const { data: onChainAllowance, refetch: refetchAllowance } =
        useReadContract({
            abi: erc20Abi,
            address: underlying?.address,
            functionName: "allowance",
            args: [
                account?.address as EvmAddress,
                vault?.address as EvmAddress,
            ],
        });

    useWatchContractEvent({
        address: underlying?.address,
        abi: erc20Abi,
        eventName: "Transfer",
        onLogs: (logs) => {
            if (!underlying?.address) return;
            if (!account?.address) return;
            if (!logs.length) return;
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.from == account.address ||
                    logEvent.args.to == account.address
                )
                    refetchMaxWithdraw();
            });
        },
    });

    useWatchContractEvent({
        address: underlying?.address,
        abi: vaultAbi,
        eventName: "Withdraw",
        onLogs: (logs) => {
            if (!underlying?.address) return;
            if (!account?.address) return;
            if (!vault?.address) return;
            if (!logs.length) return;
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.owner == account.address &&
                    logEvent.args.sender == account.address
                )
                    setValue(0n);
            });
        },
    });

    function onResetButtonClick() {
        refetchAllowance();
    }

    const onChangeInputValue = (newValue: bigint | null) => {
        if (!newValue) setValue(BN_ZERO);
        else setValue(newValue);
    };

    return (
        <Box mt="1em" textAlign={"left"}>
            <Grid container spacing={1}>
                <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                    Max. withdraw:{" "}
                    {numberFormat(maxWithdraw, underlying?.symbol)}
                </Grid>
                <Grid item xs={12} marginTop={"0.5em"}>
                    <AssetAmountTextField
                        label="You withdraw"
                        symbol={underlying?.symbol || ""}
                        decimals={underlying?.decimals}
                        defaultValue={BN_ZERO}
                        maxValue={maxWithdraw}
                        onChange={onChangeInputValue}
                        disabled={!account || !account.isConnected}
                        textFieldId="withdraw-input-field"
                    ></AssetAmountTextField>
                </Grid>

                <Grid item xs={6}>
                    {" "}
                </Grid>
                <Grid item xs={6}>
                    {
                        <SendTxButton
                            disabled={
                                value <= BN_ZERO || value > (maxWithdraw ?? 0n)
                            }
                            address={vault?.address as EvmAddress}
                            functionName="withdraw"
                            args={[value, account.address, account.address]}
                            abi={erc4626Abi}
                        >
                            <>Sell Shares</>
                        </SendTxButton>
                    }
                </Grid>
                {/*
                <Grid
                    item
                    xs={isWriteSettled(txState) ? 2 : 0}
                    display={isWriteSettled(txState) ? "inherit" : "none"}
                >
                    <Button
                        aria-label="Reset Form"
                        variant="contained"
                        color={"error"}
                        onClick={() => onResetButtonClick()}
                    >
                        <RestartAltOutlined />
                    </Button>
                </Grid>
                */}
            </Grid>
        </Box>
    );
}

export default WithdrawForm;
