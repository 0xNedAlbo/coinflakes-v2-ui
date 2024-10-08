import { Grid } from "@mui/material";
import CurrentSharePrice from "./VaultSummary/CurrentSharePrice";
import YourAssets from "./VaultSummary/YourAssets";
import AssetsUnderManagement from "./VaultSummary/AssetsUnderManagement";
import VaultTotalSupply from "./VaultSummary/VaultTotalSupply";
import YourShares from "./VaultSummary/YourShares";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";

export default function VaultSummary() {
    const { isShareholder } = useShareholder();
    return (
        <Grid container mt={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        {isShareholder ? (
                            <YourAssets></YourAssets>
                        ) : (
                            <AssetsUnderManagement></AssetsUnderManagement>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <CurrentSharePrice></CurrentSharePrice>
                    </Grid>
                    <Grid item xs={4}>
                        {isShareholder ? (
                            <YourShares></YourShares>
                        ) : (
                            <VaultTotalSupply></VaultTotalSupply>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Grid>
    );
}
