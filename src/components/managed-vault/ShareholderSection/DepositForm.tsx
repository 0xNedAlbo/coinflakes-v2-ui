import { AssetAmountTextField } from "@/components/inputs/AssetAmountTextField";
import { Erc20ApproveButton } from "@/components/inputs/Erc20ApproveButton";
import { SendTxButton } from "@/components/inputs/SendTxButton";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export type DepositFormProps = {};

export function DepositForm({}: DepositFormProps) {
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const shareholder = useShareholder();

    const [value, setValue] = useState<bigint>(0n);

    const mintValue =
        underlying && vault && vault.sharePrice
            ? (value * BN_1E(vault.decimals)) / vault.sharePrice
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
                        Assets in Wallet:{" "}
                        {numberFormat(
                            shareholder.underlyingBalance,
                            underlying.symbol,
                            2,
                            underlying.decimals
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <AssetAmountTextField
                            label="You pay"
                            symbol={underlying.symbol as string}
                            decimals={underlying.decimals as number}
                            defaultValue={0n}
                            maxValue={shareholder.underlyingBalance}
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
                            {numberFormat(mintValue as bigint, vault.symbol)}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Erc20ApproveButton
                            token={underlying.address}
                            allowance={shareholder.underlyingAllowance}
                            amountNeeded={value}
                            spender={vault.address}
                            disabled={
                                value === 0n ||
                                value > shareholder.underlyingBalance
                            }
                        ></Erc20ApproveButton>
                    </Grid>
                    <Grid item xs={6}>
                        <SendTxButton
                            disabled={
                                value <= 0n ||
                                value > shareholder.underlyingBalance ||
                                value > shareholder.underlyingAllowance
                            }
                            abi={managedVaultAbi}
                            address={vault.address}
                            functionName={"deposit"}
                            args={[value, shareholder.address]}
                        >
                            <>Buy Shares</>
                        </SendTxButton>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
