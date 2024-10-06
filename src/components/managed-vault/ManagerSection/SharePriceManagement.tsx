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
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const [assets, setAssets] = useState<bigint | null>(null);
    const [currentAssetsInUse, setCurrentAssetsInUse] = useState<bigint>(0n);

    useEffect(() => {
        setCurrentAssetsInUse(vault.assetsInUse as bigint);
    }, [vault.assetsInUse]);

    function isValueValid(): boolean {
        if (!assets) return false;
        if (assets < 0n) return false;
        return true;
    }

    function newSharePrice() {
        if (!isValueValid()) return vault.sharePrice;
        if (!assets) return vault.sharePrice;
        if (vault.totalSupply == 0n)
            return BN_1E(underlying.decimals as number);
        if (vault?.totalAssets === undefined)
            return BN_1E(underlying.decimals as number);
        const newTotalAssets = vault.totalAssets - currentAssetsInUse + assets;
        if (newTotalAssets == 0n) return BN_1E(underlying.decimals as number);
        return (
            (newTotalAssets * BN_1E(vault.decimals as number)) /
            (vault.totalSupply as bigint)
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
                            symbol={underlying.symbol as string}
                            decimals={underlying.decimals as number}
                            defaultValue={currentAssetsInUse}
                        ></AssetAmountTextField>
                    </Grid>
                    <Grid item xs={3}>
                        <SendTxButton
                            disabled={!isValueValid()}
                            icon={<CalculateOutlined />}
                            abi={managedVaultAbi}
                            address={vault.address as EvmAddress}
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
                                            underlying.symbol,
                                            2,
                                            underlying.decimals
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
                                                underlying.symbol,
                                                2,
                                                underlying.decimals
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
                                                underlying.symbol,
                                                2,
                                                underlying.decimals
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
                                            underlying.symbol,
                                            2,
                                            underlying.decimals
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
