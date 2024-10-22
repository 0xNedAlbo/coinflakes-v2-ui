import { Grid } from "@mui/material";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { AssetsUnderManagement } from "./VaultSummary/AssetsUnderManagement";
import { CurrentSharePrice } from "./VaultSummary/CurrentSharePrice";
import { VaultTotalSupply } from "./VaultSummary/VaultTotalSupply";
import { YourAssets } from "./VaultSummary/YourAssets";
import { YourShares } from "./VaultSummary/YourShares";

export function VaultSummary() {
    const shareholder = useShareholder();
    return (
        <Grid container mt={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        {shareholder?.isShareholder ? (
                            <YourAssets></YourAssets>
                        ) : (
                            <AssetsUnderManagement></AssetsUnderManagement>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <CurrentSharePrice></CurrentSharePrice>
                    </Grid>
                    <Grid item xs={4}>
                        {shareholder?.isShareholder ? (
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
