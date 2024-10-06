import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import Erc20ApproveButton from "@/components/inputs/Erc20ApproveButton";
import SendTxButton from "@/components/inputs/SendTxButton";
import {
    managedVaultAbi,
    useReadManagedVaultConvertToShares,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import {
    useAccount,
    useBalance,
    useReadContract,
    useWatchContractEvent,
} from "wagmi";

export type DepositFormProps = {};

function DepositForm({}: DepositFormProps) {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    const [value, setValue] = useState<bigint>(0n);
    const [balance, setBalance] = useState<bigint>(0n);
    const [allowance, setAllowance] = useState<bigint>(0n);

    const { address: account } = useAccount();

    const { data: allowanceData } = useReadContract({
        address: underlying?.address,
        functionName: "allowance",
        args: [account as EvmAddress, vault?.address as EvmAddress],
        abi: erc20Abi,
    });

    const { data: mintValue } = useReadManagedVaultConvertToShares({
        address: vault.address,
        args: [value],
    });

    useEffect(() => {
        if (!allowanceData) setAllowance(0n);
        else setAllowance(allowanceData as bigint);
    }, [allowanceData]);

    const { data: balanceData, refetch: refetchBalance } = useBalance({
        address: account,
        token: underlying?.address,
    });

    useEffect(() => {
        if (!balanceData) setBalance(0n);
        else setBalance(balanceData.value);
    }, [balanceData]);

    useWatchContractEvent({
        address: underlying?.address,
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

    const onAllowanceChange = (newAllowance: bigint) => {
        setAllowance(newAllowance);
    };

    return (
        <Box mt="1em" textAlign={"left"}>
            <Grid container spacing={1}>
                <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                    Assets in Wallet:{" "}
                    {numberFormat(
                        balance,
                        underlying?.symbol,
                        2,
                        underlying?.decimals
                    )}
                </Grid>
                <Grid item xs={6}>
                    <AssetAmountTextField
                        label="You pay"
                        symbol={underlying?.symbol as string}
                        decimals={underlying?.decimals as number}
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
                        {numberFormat(mintValue as bigint, vault.symbol)}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Erc20ApproveButton
                        token={underlying?.address}
                        owner={account as EvmAddress}
                        amountNeeded={value}
                        spender={vault.address}
                        onAllowanceChange={onAllowanceChange}
                        disabled={value === 0n || value > balance}
                    ></Erc20ApproveButton>
                </Grid>
                <Grid item xs={6}>
                    <SendTxButton
                        disabled={
                            value <= 0n || value > balance || value > allowance
                        }
                        abi={managedVaultAbi}
                        address={vault?.address as EvmAddress}
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
