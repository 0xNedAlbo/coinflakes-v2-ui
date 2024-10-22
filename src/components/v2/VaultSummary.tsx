import { Grid } from "@mui/material";
import { CurrentSharePrice } from "./VaultSummary/CurrentSharePrice";
import { ShareholderShares } from "./VaultSummary/ShareholderShares";
import { YourAssets } from "./VaultSummary/ShareholderAssets";

export function VaultSummary() {
    return (
        <Grid container mt={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <YourAssets></YourAssets>
                    </Grid>
                    <Grid item xs={4}>
                        <CurrentSharePrice></CurrentSharePrice>
                    </Grid>
                    <Grid item xs={4}>
                        <ShareholderShares></ShareholderShares>
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Grid>
    );
}
