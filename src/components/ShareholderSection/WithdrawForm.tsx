import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
    useAccount,
    useBalance,
    useReadContract,
    useWatchContractEvent,
} from "wagmi";
import { BN_ZERO } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { useVault } from "@/hooks/useVault";
import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import Erc20ApproveButton from "@/components/inputs/Erc20ApproveButton";
import SendTxButton from "@/components/inputs/SendTxButton";
import { useUnderlying } from "@/hooks/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { erc20Abi, erc4626Abi } from "viem";
import { vaultAbi } from "@/generated/wagmi";

function WithdrawForm() {
    const [value, setValue] = useState(BN_ZERO);
    const [allowance, setAllowance] = useState(0n);

    const underlying = useUnderlying();
    const account = useAccount();
    const vault = useVault();

    const { data: balance, refetch: refetchBalance } = useBalance({
        address: account?.address,
        token: underlying?.address,
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
                    refetchBalance();
            });
        },
    });

    useWatchContractEvent({
        address: underlying?.address,
        abi: vaultAbi,
        eventName: "Deposit",
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

    useEffect(() => {
        if (onChainAllowance) setAllowance(onChainAllowance as bigint);
    }, [onChainAllowance]);

    function onResetButtonClick() {
        refetchAllowance();
    }

    const onChangeInputValue = (newValue: bigint | null) => {
        if (!newValue) setValue(BN_ZERO);
        else setValue(newValue);
    };

    const onAllowanceChange = (newAllowance: bigint) => {
        setAllowance(newAllowance);
    };

    return (
        <Box mt="1em" textAlign={"left"}>
            <Grid container spacing={1}>
                <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                    Assets in Wallet:{" "}
                    {numberFormat(balance?.value, underlying?.symbol)}
                </Grid>
                <Grid item xs={6}>
                    <AssetAmountTextField
                        label="You pay"
                        symbol={underlying?.symbol || ""}
                        decimals={underlying?.decimals}
                        defaultValue={BN_ZERO}
                        maxValue={balance?.value}
                        onChange={onChangeInputValue}
                        disabled={false}
                        textFieldId="deposit-input-field"
                    ></AssetAmountTextField>
                </Grid>
                <Grid item xs={2} textAlign={"center"}></Grid>
                <Grid
                    item
                    xs={4}
                    marginTop={"0.5em"}
                    textAlign={"center"}
                ></Grid>

                <Grid item xs={6}>
                    <Erc20ApproveButton
                        token={underlying?.address}
                        amountNeeded={value}
                        owner={account?.address}
                        spender={vault?.address}
                        disabled={
                            balance?.value ? value > balance.value : false
                        }
                        onAllowanceChange={onAllowanceChange}
                    ></Erc20ApproveButton>
                </Grid>
                <Grid item xs={6}>
                    {
                        <SendTxButton
                            disabled={
                                value <= BN_ZERO ||
                                value > (balance ? balance.value : 0n) ||
                                (allowance as bigint) < value
                            }
                            address={vault?.address as EvmAddress}
                            functionName="deposit"
                            args={[value, account.address]}
                            abi={erc4626Abi}
                        >
                            <>Buy Shares</>
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
