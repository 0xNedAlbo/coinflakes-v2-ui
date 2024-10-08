import AssetAmountTextField from "@/components/inputs/AssetAmountTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import Section from "@/components/Section";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { BN_1E } from "@/utils/constants";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { CalculateOutlined, RestartAltOutlined } from "@mui/icons-material";
import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function SharePriceManagement() {
    const {
        address: vaultAddress,
        assetsInUse,
        sharePrice,
        totalSupply,
        totalAssets,
        decimals: vaultDecimals,
    } = useManagedVault();
    const { decimals: underlyingDecimals, symbol: underlyingSymbol } =
        useUnderlying();
    const [assets, setAssets] = useState<bigint | null>(null);
    const [currentAssetsInUse, setCurrentAssetsInUse] = useState<bigint>(0n);

    useEffect(() => {
        setCurrentAssetsInUse(assetsInUse as bigint);
    }, [assetsInUse]);

    function isValueValid(): boolean {
        if (!assets) return false;
        if (assets < 0n) return false;
        return true;
    }

    function newSharePrice() {
        if (!isValueValid()) return sharePrice;
        if (!assets) return sharePrice;
        if (totalSupply == 0n) return BN_1E(underlyingDecimals as number);
        if (totalAssets === undefined)
            return BN_1E(underlyingDecimals as number);
        const newTotalAssets = totalAssets - currentAssetsInUse + assets;
        if (newTotalAssets == 0n) return BN_1E(underlyingDecimals as number);
        return (
            (newTotalAssets * BN_1E(vaultDecimals as number)) /
            (totalSupply as bigint)
        );
    }

    return (
        <Section heading="Share Price And Asset Composition">
            <Box mt="1em" textAlign={"left"}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AssetAmountTextField
                            label="Assets in Use"
                            onChange={setAssets}
                            symbol={underlyingSymbol as string}
                            decimals={underlyingDecimals as number}
                            defaultValue={currentAssetsInUse}
                        ></AssetAmountTextField>
                    </Grid>
                    <Grid item xs={3}>
                        <SendTxButton
                            disabled={!isValueValid()}
                            icon={<CalculateOutlined />}
                            abi={managedVaultAbi}
                            address={vaultAddress as EvmAddress}
                            functionName={"setAssetsInUse"}
                            args={[assets]}
                        >
                            Set Assets in Use
                        </SendTxButton>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <Grid item xs={12} mt={"1em"}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    <Typography variant="body1">
                                        Current Assets in Use:
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                    align={"right"}
                                >
                                    <Typography variant="body1">
                                        {numberFormat(
                                            currentAssetsInUse,
                                            underlyingSymbol,
                                            2,
                                            underlyingDecimals
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    <Typography variant="body1">
                                        New Assets in Use:
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                    align={"right"}
                                >
                                    <Typography variant="body1">
                                        {assets ? (
                                            numberFormat(
                                                assets,
                                                underlyingSymbol,
                                                2,
                                                underlyingDecimals
                                            )
                                        ) : (
                                            <i>invalid value</i>
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    <Typography variant="body1">
                                        {!assets ? (
                                            <></>
                                        ) : assets >= currentAssetsInUse ? (
                                            <Box
                                                color={"green"}
                                                component={"span"}
                                            >
                                                <b>Gain</b>
                                            </Box>
                                        ) : (
                                            <Box
                                                color={"red"}
                                                component={"span"}
                                            >
                                                <b>Loss</b>
                                            </Box>
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                    align={"right"}
                                >
                                    <Typography variant="body1">
                                        {!assets || assets < 0n ? (
                                            <i>invalid value</i>
                                        ) : assets - currentAssetsInUse ==
                                          0n ? (
                                            <i>unchanged</i>
                                        ) : (
                                            numberFormat(
                                                assets - currentAssetsInUse,
                                                underlyingSymbol,
                                                2,
                                                underlyingDecimals
                                            )
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    <Typography variant="body1">
                                        New Share Price:
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    width={"1%"}
                                    sx={{ whiteSpace: "nowrap" }}
                                    align={"right"}
                                >
                                    <Typography variant="body1">
                                        {numberFormat(
                                            newSharePrice(),
                                            underlyingSymbol,
                                            2,
                                            underlyingDecimals
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Box>
        </Section>
    );
}

export default SharePriceManagement;
