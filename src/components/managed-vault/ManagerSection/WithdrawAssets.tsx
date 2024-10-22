import { Section } from "@/components/common/Section";
import { AssetAmountTextField } from "@/components/inputs/AssetAmountTextField";
import { SendTxButton } from "@/components/inputs/SendTxButton";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useManager } from "@/hooks/managed-vault/useManager";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { EvmAddress } from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { Box, Grid } from "@mui/material";
import { useCallback, useState } from "react";

export function WithdrawAssets() {
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const manager = useManager();

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
            {vault && manager && underlying && (
                <Box mt="1em" textAlign={"left"}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                            Max. Withdrawble:{" "}
                            {numberFormat(
                                manager.withdrawableAssets,
                                underlying.symbol,
                                2,
                                underlying.decimals
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            <AssetAmountTextField
                                label="You withdraw"
                                symbol={underlying.symbol as string}
                                decimals={underlying.decimals as number}
                                defaultValue={0n}
                                maxValue={manager.withdrawableAssets}
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
                                    value >
                                        (manager.withdrawableAssets as bigint)
                                }
                                abi={managedVaultAbi}
                                address={vault.address as EvmAddress}
                                functionName={"useAssets"}
                                args={[manager.address, value]}
                            >
                                <>Withdraw</>
                            </SendTxButton>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Section>
    );
}
