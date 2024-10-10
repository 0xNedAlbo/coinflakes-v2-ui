import { Grid, IconButton, Typography } from "@mui/material";
import { ConnectKitButton } from "connectkit";
import { useContext } from "react";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { ColorModeContext } from "../ColorModeContext";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import SwitchChainMenu from "../inputs/SwitchChainMenu";

export default function MainAppBar() {
    const vault = useManagedVault();

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
            <Grid item xs={2} textAlign={"right"}>
                <SwitchChainMenu></SwitchChainMenu>
                <IconButton
                    onClick={changeColorMode}
                    style={{ marginLeft: "0.2em", marginRight: "0.2em" }}
                >
                    {mode == "dark" ? (
                        <LightModeOutlined></LightModeOutlined>
                    ) : (
                        <DarkModeOutlined></DarkModeOutlined>
                    )}
                </IconButton>
            </Grid>
            <Grid item xs={2} textAlign="right">
                <ConnectKitButton></ConnectKitButton>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}
