import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import Erc20ApproveButton from "@/components/inputs/Erc20ApproveButton";
import SendTxButton from "@/components/inputs/SendTxButton";
import {
    managedVaultAbi,
    useReadManagedVaultConvertToShares,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export type DepositFormProps = {};

function DepositForm({}: DepositFormProps) {
    const { address: vaultAddress, symbol: vaultSymbol } = useManagedVault();
    const { address: underlyingAddress, symbol, decimals } = useUnderlying();
    const { address: account, underlyingBalance: balance } = useShareholder();

    const [value, setValue] = useState<bigint>(0n);
    const [allowance, setAllowance] = useState<bigint>(0n);

    const { data: allowanceData } = useReadContract({
        address: underlyingAddress,
        functionName: "allowance",
        args: [account as EvmAddress, vaultAddress as EvmAddress],
        abi: erc20Abi,
    });

    const { data: mintValue } = useReadManagedVaultConvertToShares({
        address: vaultAddress,
        args: [value],
    });

    useEffect(() => {
        if (!allowanceData) setAllowance(0n);
        else setAllowance(allowanceData as bigint);
    }, [allowanceData]);

    const onChangeInputValue = useCallback(
        (newValue: bigint | null) => {
            if (newValue && newValue === value) return;
            if (!newValue) setValue(0n);
            else setValue(newValue);
        },
        [value]
    );

    const onAllowanceChange = (newAllowance: bigint) => {
        setAllowance(newAllowance);
    };

    return (
        <Box mt="1em" textAlign={"left"}>
            <Grid container spacing={1}>
                <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                    Assets in Wallet:{" "}
                    {numberFormat(balance, symbol, 2, decimals)}
                </Grid>
                <Grid item xs={6}>
                    <AssetAmountTextField
                        label="You pay"
                        symbol={symbol as string}
                        decimals={decimals as number}
                        defaultValue={0n}
                        maxValue={balance}
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
                        {numberFormat(mintValue as bigint, vaultSymbol)}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Erc20ApproveButton
                        token={underlyingAddress}
                        owner={account as EvmAddress}
                        amountNeeded={value}
                        spender={vaultAddress}
                        onAllowanceChange={onAllowanceChange}
                        disabled={value === 0n || value > (balance as bigint)}
                    ></Erc20ApproveButton>
                </Grid>
                <Grid item xs={6}>
                    <SendTxButton
                        disabled={
                            value <= 0n ||
                            value > (balance as bigint) ||
                            value > allowance
                        }
                        abi={managedVaultAbi}
                        address={vaultAddress as EvmAddress}
                        functionName={"deposit"}
                        args={[value, account]}
                    >
                        <>Buy Shares</>
                    </SendTxButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DepositForm;
