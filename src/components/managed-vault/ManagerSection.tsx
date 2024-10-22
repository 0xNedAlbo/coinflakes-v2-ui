import { Grid } from "@mui/material";
import { useManager } from "@/hooks/managed-vault/useManager";
import { ReturnAssets } from "./ManagerSection/ReturnAssets";
import { ShareholderManagement } from "./ManagerSection/ShareholderManagement";
import { SharePriceManagement } from "./ManagerSection/SharePriceManagement";
import { WithdrawAssets } from "./ManagerSection/WithdrawAssets";

export function ManagerSection() {
    const manager = useManager();
    const isManager = manager?.isAccount;

    if (!isManager) return <></>;
    return (
        <Grid container mt={"4em"} mb={"18em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <WithdrawAssets></WithdrawAssets>
                    </Grid>
                    <Grid item xs={6}>
                        <ReturnAssets></ReturnAssets>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={"4em"}>
                    <ShareholderManagement></ShareholderManagement>
                </Grid>
                <Grid item xs={12} mt={"4em"}>
                    <SharePriceManagement></SharePriceManagement>
                </Grid>
            </Grid>
        </Grid>
    );
}
