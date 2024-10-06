import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import Section from "@/components/Section";
import {
    managedVaultAbi,
    useWatchManagedVaultReturnAssetsEvent,
    useWatchManagedVaultUseAssetsEvent,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useWatchContractEvent } from "wagmi";

function WithdrawAssets() {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    const [value, setValue] = useState<bigint>(0n);
    const [balance, setBalance] = useState<bigint>(0n);

    const { address: account } = useAccount();

    const { data: balanceData, refetch: refetchBalance } = useBalance({
        address: vault?.address,
        token: underlying?.address,
    });

    useEffect(() => {
        if (!balanceData) setBalance(0n);
        else setBalance(balanceData.value);
    }, [balanceData]);

    useWatchManagedVaultUseAssetsEvent({
        address: vault.address,
        onLogs: () => refetchBalance(),
    });

    useWatchManagedVaultReturnAssetsEvent({
        address: vault.address,
        onLogs: () => refetchBalance(),
    });

    useWatchContractEvent({
        address: underlying?.address,
        eventName: "Transfer",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { from, to } = logEvent.args as {
                    from: EvmAddress;
                    to: EvmAddress;
                };
                if (from === vault.address || to === vault.address)
                    refetchBalance();
            });
        },
        abi: erc20Abi,
    });

    const onChangeInputValue = useCallback(
        (newValue: bigint | null) => {
            if (newValue && newValue === value) return;
            if (!newValue) setValue(0n);
            else setValue(newValue);
        },
        [value]
    );

    return (
        <Section heading="Withdraw Funds from Vault" headingAlign="center">
            <Box mt="1em" textAlign={"left"}>
                <Grid container spacing={1}>
                    <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                        Max. Withdrawble:{" "}
                        {numberFormat(
                            balance,
                            underlying?.symbol,
                            2,
                            underlying?.decimals
                        )}
                    </Grid>
                    <Grid item xs={8}>
                        <AssetAmountTextField
                            label="You withdraw"
                            symbol={underlying?.symbol as string}
                            decimals={underlying?.decimals as number}
                            defaultValue={0n}
                            maxValue={balance}
                            onChange={onChangeInputValue}
                        ></AssetAmountTextField>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        marginTop={"0.5em"}
                        textAlign={"center"}
                    ></Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        <SendTxButton
                            disabled={
                                value <= 0n || value > (balance as bigint)
                            }
                            abi={managedVaultAbi}
                            address={vault?.address as EvmAddress}
                            functionName={"useAssets"}
                            args={[account, value]}
                        >
                            <>Withdraw</>
                        </SendTxButton>
                    </Grid>
                </Grid>
            </Box>
        </Section>
    );
}

export default WithdrawAssets;
