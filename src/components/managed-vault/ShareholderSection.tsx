import { Grid } from "@mui/material";
import BuyShares from "./ShareholderSection/BuyShares";
import SellShares from "./ShareholderSection/SellShares";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";

function ShareholderSection() {
    const shareholder = useShareholder();
    const isShareholder = shareholder?.isShareholder;
    if (!isShareholder) return <></>;
    return (
        <Grid container mt={"4em"} mb={"12em"}>
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

export default ShareholderSection;
