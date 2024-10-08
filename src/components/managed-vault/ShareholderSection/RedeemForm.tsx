import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import {
    managedVaultAbi,
    useReadManagedVaultConvertToAssets,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export type DepositFormProps = {};

function RedeemForm({}: DepositFormProps) {
    const { address: vaultAddress, symbol, decimals } = useManagedVault();
    const { symbol: underlyingSymbol, decimals: underlyingDecimals } =
        useUnderlying();
    const { address: account, maxRedeem } = useShareholder();

    const [value, setValue] = useState<bigint>(0n);

    const { data: withdrawValue } = useReadManagedVaultConvertToAssets({
        address: vaultAddress,
        args: [value],
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
        <Box mt="1em" textAlign={"left"}>
            <Grid container spacing={1}>
                <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                    Max. Sell Amount:{" "}
                    {numberFormat(maxRedeem, symbol, 2, decimals)}
                </Grid>
                <Grid item xs={6}>
                    <AssetAmountTextField
                        label="You sell"
                        symbol={symbol as string}
                        decimals={decimals as number}
                        defaultValue={0n}
                        maxValue={maxRedeem}
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
                            underlyingSymbol,
                            2,
                            underlyingDecimals
                        )}
                    </Typography>
                </Grid>

                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <SendTxButton
                        disabled={value <= 0n || value > (maxRedeem as bigint)}
                        abi={managedVaultAbi}
                        address={vaultAddress as EvmAddress}
                        functionName={"redeem"}
                        args={[value, account, account]}
                    >
                        <>Sell Shares</>
                    </SendTxButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RedeemForm;
