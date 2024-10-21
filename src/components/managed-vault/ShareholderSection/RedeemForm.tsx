import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { BN_1E } from "@/utils/constants";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export type DepositFormProps = {};

function RedeemForm({}: DepositFormProps) {
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const shareholder = useShareholder();

    const [value, setValue] = useState<bigint>(0n);
    const withdrawValue = vault
        ? (vault.sharePrice * value) / BN_1E(vault.decimals)
        : 0n;

    const onChangeInputValue = useCallback(
        (newValue: bigint | null) => {
            if (newValue && newValue === value) return;
            if (!newValue) setValue(0n);
            else setValue(newValue);
        },
        [value]
    );

    return (
        <Box mt="1em" textAlign={"left"}>
            {vault && underlying && shareholder && (
                <Grid container spacing={1}>
                    <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                        Max. Sell Amount:{" "}
                        {numberFormat(
                            shareholder.maxRedeem,
                            vault.symbol,
                            2,
                            vault.decimals
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <AssetAmountTextField
                            label="You sell"
                            symbol={vault.symbol as string}
                            decimals={vault.decimals as number}
                            defaultValue={0n}
                            maxValue={shareholder.maxRedeem}
                            onChange={onChangeInputValue}
                        ></AssetAmountTextField>
                    </Grid>
                    <Grid item xs={2} textAlign={"center"}>
                        <Button variant="text" disableRipple>
                            <SwapHorizOutlined></SwapHorizOutlined>
                        </Button>
                    </Grid>
                    <Grid item xs={4} marginTop={"0.5em"} textAlign={"center"}>
                        <Typography variant="body1">
                            {numberFormat(
                                withdrawValue as bigint,
                                underlying.symbol,
                                2,
                                underlying.decimals
                            )}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        <SendTxButton
                            disabled={
                                value <= 0n ||
                                value > (shareholder.maxRedeem as bigint)
                            }
                            abi={managedVaultAbi}
                            address={vault.address as EvmAddress}
                            functionName={"redeem"}
                            args={[
                                value,
                                shareholder.address,
                                shareholder.address,
                            ]}
                        >
                            <>Sell Shares</>
                        </SendTxButton>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export default RedeemForm;
