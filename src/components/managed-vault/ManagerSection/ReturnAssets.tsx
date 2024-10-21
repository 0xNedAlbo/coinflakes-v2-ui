import Section from "@/components/common/Section";
import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import Erc20ApproveButton from "@/components/inputs/Erc20ApproveButton";
import SendTxButton from "@/components/inputs/SendTxButton";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

function ReturnAssets() {
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const shareholder = useShareholder();

    const [value, setValue] = useState<bigint>(0n);
    const [allowance, setAllowance] = useState<bigint>(0n);

    const { data: allowanceData } = useReadContract({
        address: underlying?.address,
        functionName: "allowance",
        args: [
            shareholder?.address as EvmAddress,
            vault?.address as EvmAddress,
        ],
        abi: erc20Abi,
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
        <Section heading="Return Funds to Vault" headingAlign="center">
            {vault && underlying && shareholder && (
                <Box mt="1em" textAlign={"left"}>
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
                        <Grid item xs={8}>
                            <AssetAmountTextField
                                label="You deposit"
                                symbol={underlying.symbol}
                                decimals={underlying.decimals}
                                defaultValue={0n}
                                maxValue={shareholder.underlyingBalance}
                                onChange={onChangeInputValue}
                            ></AssetAmountTextField>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            marginTop={"0.5em"}
                            textAlign={"center"}
                        ></Grid>

                        <Grid item xs={6}>
                            <Erc20ApproveButton
                                allowance={shareholder.underlyingAllowance}
                                token={underlying.address}
                                amountNeeded={value}
                                spender={vault.address}
                                onAllowanceChange={onAllowanceChange}
                                disabled={
                                    value === 0n ||
                                    value >
                                        (shareholder.underlyingBalance as bigint)
                                }
                            ></Erc20ApproveButton>
                        </Grid>
                        <Grid item xs={6}>
                            <SendTxButton
                                disabled={
                                    value <= 0n ||
                                    value > shareholder.underlyingBalance ||
                                    value > allowance
                                }
                                abi={managedVaultAbi}
                                address={vault.address as EvmAddress}
                                functionName={"returnAssets"}
                                args={[shareholder.address, value]}
                            >
                                <>Return Assets</>
                            </SendTxButton>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Section>
    );
}

export default ReturnAssets;
