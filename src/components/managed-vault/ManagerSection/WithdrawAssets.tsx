import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import Section from "@/components/Section";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useManager } from "@/hooks/managed-vault/useManager";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { Box, Grid } from "@mui/material";
import { useCallback, useState } from "react";

function WithdrawAssets() {
    const { address: vaultAddress } = useManagedVault();
    const { symbol, decimals } = useUnderlying();
    const { address: account, withdrawableAssets } = useManager();

    const [value, setValue] = useState<bigint>(0n);

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
                        {numberFormat(withdrawableAssets, symbol, 2, decimals)}
                    </Grid>
                    <Grid item xs={8}>
                        <AssetAmountTextField
                            label="You withdraw"
                            symbol={symbol as string}
                            decimals={decimals as number}
                            defaultValue={0n}
                            maxValue={withdrawableAssets}
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
                                value <= 0n ||
                                value > (withdrawableAssets as bigint)
                            }
                            abi={managedVaultAbi}
                            address={vaultAddress as EvmAddress}
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
