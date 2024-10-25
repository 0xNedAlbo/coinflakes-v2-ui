import { Button, Grid, IconButton } from "@mui/material";
import { ConnectButton } from "../common/ConnectButton";
import {
    DarkModeOutlined,
    ForwardOutlined,
    LightModeOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { ColorModeContext } from "../common/ColorModeContext";
import Link from "next/link";

export function NavigationMenu() {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    function changeColorMode() {
        toggleColorMode();
    }

    return (
        <Grid container spacing={1} marginTop={"1em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
                <Link href={"/managed-vault"} passHref legacyBehavior>
                    <Button
                        variant="text"
                        color={"inherit"}
                        startIcon={<ForwardOutlined />}
                    >
                        Other Vaults...
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={2} textAlign={"right"}>
                <IconButton
                    onClick={changeColorMode}
                    style={{ marginLeft: "0.2em", marginRight: "0.6em" }}
                >
                    {mode == "dark" ? (
                        <LightModeOutlined></LightModeOutlined>
                    ) : (
                        <DarkModeOutlined></DarkModeOutlined>
                    )}
                </IconButton>{" "}
                <ConnectButton></ConnectButton>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}
