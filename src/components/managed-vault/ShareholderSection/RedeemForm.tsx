import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import {
    managedVaultAbi,
    useReadManagedVaultConvertToAssets,
    useReadManagedVaultMaxRedeem,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useWatchContractEvent } from "wagmi";

export type DepositFormProps = {};

function RedeemForm({}: DepositFormProps) {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    const [value, setValue] = useState<bigint>(0n);
    const [maxValue, setMaxValue] = useState<bigint>(0n);
    const [balance, setBalance] = useState<bigint>(0n);

    const { address: account } = useAccount();

    const { data: maxRedeem, refetch: refetchMaxRedeem } =
        useReadManagedVaultMaxRedeem({
            address: vault?.address,
            args: [account as EvmAddress],
        });

    const { data: withdrawValue } = useReadManagedVaultConvertToAssets({
        address: vault.address,
        args: [value],
    });

    const { data: balanceData, refetch: refetchBalance } = useBalance({
        address: account,
        token: vault?.address,
    });

    useEffect(() => {
        if (!balanceData) setBalance(0n);
        else setBalance(balanceData.value);
    }, [balanceData]);

    useWatchContractEvent({
        address: vault?.address,
        eventName: "Deposit",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { owner } = logEvent.args as {
                    owner: EvmAddress;
                };
                if (owner === account) {
                    refetchBalance();
                    refetchMaxRedeem();
                }
            });
        },
        abi: managedVaultAbi,
    });

    useWatchContractEvent({
        address: vault?.address,
        eventName: "Withdraw",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { owner } = logEvent.args as {
                    owner: EvmAddress;
                };
                if (owner === account) {
                    refetchBalance();
                    refetchMaxRedeem();
                }
            });
        },
        abi: managedVaultAbi,
    });

    useWatchContractEvent({
        address: vault?.address,
        eventName: "Transfer",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { from, to } = logEvent.args as {
                    from: EvmAddress;
                    to: EvmAddress;
                };
                if (from === account || to === account) refetchBalance();
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
        <Box mt="1em" textAlign={"left"}>
            <Grid container spacing={1}>
                <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                    Max. Sell Amount:{" "}
                    {numberFormat(maxRedeem, vault?.symbol, 2, vault?.decimals)}
                </Grid>
                <Grid item xs={6}>
                    <AssetAmountTextField
                        label="You sell"
                        symbol={vault?.symbol as string}
                        decimals={vault?.decimals as number}
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
                        {numberFormat(
                            withdrawValue as bigint,
                            underlying?.symbol,
                            2,
                            underlying?.decimals
                        )}
                    </Typography>
                </Grid>

                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <SendTxButton
                        disabled={value <= 0n || value > (maxRedeem as bigint)}
                        abi={managedVaultAbi}
                        address={vault?.address as EvmAddress}
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
