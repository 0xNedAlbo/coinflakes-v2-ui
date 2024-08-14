//import { AccountBalanceOutlined, LinkOutlined } from "@mui/icons-material";
import { useVault } from "@/hooks/useVault";
import { Button, ButtonGroup, Grid, Link, Typography } from "@mui/material";
import { ConnectKitButton } from "connectkit";
//import { useVault } from "../hooks/useVault";
//import { useNetwork } from "wagmi";

export default function MainAppBar() {
    const vault = useVault();
    //  const { chain } = useNetwork();

    return (
        <Grid container mt={"1em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
                <Typography variant="h4">{vault?.name}</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
                <ConnectKitButton></ConnectKitButton>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}
