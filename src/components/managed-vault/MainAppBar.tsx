import { Grid, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { ColorModeContext } from "@/components/common/ColorModeContext";
import { ConnectButton } from "../common/ConnectButton";

export function MainAppBar() {
    const vault = useManagedVault();

    const { mode, toggleColorMode } = useContext(ColorModeContext);
    function changeColorMode() {
        toggleColorMode();
    }
    return (
        <Grid container mt={"1em"} marginTop={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <Typography variant="h4">{vault?.name}</Typography>
            </Grid>
            <Grid item xs={4} textAlign={"right"}>
                <IconButton
                    onClick={changeColorMode}
                    style={{ marginLeft: "0.2em", marginRight: "0.6em" }}
                >
                    {mode == "dark" ? (
                        <LightModeOutlined></LightModeOutlined>
                    ) : (
                        <DarkModeOutlined></DarkModeOutlined>
                    )}
                </IconButton>
                <ConnectButton></ConnectButton>{" "}
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}
