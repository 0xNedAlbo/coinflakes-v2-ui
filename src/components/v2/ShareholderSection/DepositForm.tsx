import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount } from "wagmi";
import { BN_ZERO } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { useVault } from "@/hooks/v2/useVault";
import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import Erc20ApproveButton from "@/components/inputs/Erc20ApproveButton";
import SendTxButton from "@/components/inputs/SendTxButton";
import { useUnderlying } from "@/hooks/v2/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { erc4626Abi } from "viem";
import { useShareholder } from "@/hooks/v2/useShareholder";

function DepositForm() {
    const [value, setValue] = useState(BN_ZERO);

    const underlying = useUnderlying();
    const account = useAccount();
    const vault = useVault();
    const shareholder = useShareholder();
    const balance = shareholder?.daiBalance;

    const allowance = shareholder?.daiAllowance;

    const onChangeInputValue = (newValue: bigint | null) => {
        if (!newValue) setValue(BN_ZERO);
        else setValue(newValue);
    };

    return (
        <Box mt="1em" textAlign={"left"}>
            {account &&
                vault &&
                underlying &&
                shareholder &&
                typeof balance !== "undefined" &&
                typeof allowance !== "undefined" && (
                    <Grid container spacing={1}>
                        <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                            Assets in Wallet:{" "}
                            {numberFormat(balance, underlying?.symbol)}
                        </Grid>
                        <Grid item xs={12} marginTop={"0.5em"}>
                            <AssetAmountTextField
                                label="You pay"
                                symbol={underlying.symbol || ""}
                                decimals={underlying.decimals}
                                defaultValue={BN_ZERO}
                                maxValue={balance}
                                onChange={onChangeInputValue}
                                disabled={!account.isConnected}
                                textFieldId="deposit-input-field"
                            ></AssetAmountTextField>
                        </Grid>

                        <Grid item xs={6}>
                            <Erc20ApproveButton
                                allowance={allowance}
                                token={underlying.address}
                                amountNeeded={value}
                                spender={vault.address}
                                disabled={balance ? value > balance : false}
                            ></Erc20ApproveButton>
                        </Grid>
                        <Grid item xs={6}>
                            {
                                <SendTxButton
                                    disabled={
                                        value <= BN_ZERO ||
                                        value > (balance ? balance : 0n) ||
                                        (allowance as bigint) < value
                                    }
                                    address={vault.address as EvmAddress}
                                    functionName="deposit"
                                    args={[value, account.address]}
                                    abi={erc4626Abi}
                                >
                                    <>Buy Shares</>
                                </SendTxButton>
                            }
                        </Grid>
                    </Grid>
                )}
        </Box>
    );
}

export default DepositForm;
