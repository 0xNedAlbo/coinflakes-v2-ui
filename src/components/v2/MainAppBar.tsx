import { useVault } from "@/hooks/v2/useVault";
import { ColorModeContext } from "@/components/common/ColorModeContext";
import { Grid, IconButton, Typography } from "@mui/material";
import { ConnectKitButton } from "connectkit";
import { useContext } from "react";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { ConnectButton } from "../common/ConnectButton";

export function MainAppBar() {
    const vault = useVault();
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    function changeColorMode() {
        toggleColorMode();
    }
    return (
        <Grid container mt={"1em"} marginTop={"3em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <Typography variant="h4">{vault?.name}</Typography>
            </Grid>
            <Grid item xs={4} textAlign={"right"}></Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}
