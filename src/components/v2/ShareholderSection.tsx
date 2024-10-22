import { Grid } from "@mui/material";
import { BuyShares } from "./ShareholderSection/BuyShares";
import { SellShares } from "./ShareholderSection/SellShares";

export function ShareholderSection() {
    return (
        <Grid container mt={"4em"} mb={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <BuyShares></BuyShares>
                    </Grid>
                    <Grid item xs={6}>
                        <SellShares></SellShares>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
