import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount } from "wagmi";
import { BN_ZERO } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { useVault } from "@/hooks/v2/useVault";
import { useUnderlying } from "@/hooks/v2/useUnderlying";
import { erc4626Abi } from "viem";
import { useShareholder } from "@/hooks/v2/useShareholder";
import { AssetAmountTextField } from "@/components/inputs/AssetAmountTextField";
import { SendTxButton } from "@/components/inputs/SendTxButton";

export function WithdrawForm() {
    const [value, setValue] = useState(BN_ZERO);

    const account = useAccount();
    const vault = useVault();
    const shareholder = useShareholder();
    const underlying = useUnderlying();

    const onChangeInputValue = (newValue: bigint | null) => {
        if (!newValue) setValue(BN_ZERO);
        else setValue(newValue);
    };

    return (
        <Box mt="1em" textAlign={"left"}>
            {vault && underlying && account && shareholder && (
                <Grid container spacing={1}>
                    <Grid item xs={12} mb={"1em"} mt={"-0.8em"}>
                        Max. withdraw:{" "}
                        {numberFormat(
                            shareholder.maxWithdraw,
                            underlying.symbol
                        )}
                    </Grid>
                    <Grid item xs={12} marginTop={"0.5em"}>
                        <AssetAmountTextField
                            label="You withdraw"
                            symbol={underlying.symbol || ""}
                            decimals={underlying.decimals}
                            defaultValue={BN_ZERO}
                            maxValue={shareholder.maxWithdraw}
                            onChange={onChangeInputValue}
                            disabled={!account.isConnected}
                            textFieldId="withdraw-input-field"
                        ></AssetAmountTextField>
                    </Grid>

                    <Grid item xs={6}>
                        {" "}
                    </Grid>
                    <Grid item xs={6}>
                        {
                            <SendTxButton
                                disabled={
                                    value <= BN_ZERO ||
                                    value > (shareholder.maxWithdraw ?? 0n)
                                }
                                address={vault.address}
                                functionName="withdraw"
                                args={[value, account.address, account.address]}
                                abi={erc4626Abi}
                            >
                                <>Sell Shares</>
                            </SendTxButton>
                        }
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
