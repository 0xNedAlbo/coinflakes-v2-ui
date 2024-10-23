"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, PaletteMode, Typography } from "@mui/material";
import { ColorModeContext } from "@/components/common/ColorModeContext";

import { useCookies } from "react-cookie";
import { ManagedVaultProvider } from "@/hooks/managed-vault/useManagedVault";
import { getConfig } from "@/wagmiConfig";
import { useParams } from "next/navigation";

import { UnderlyingProvider } from "@/hooks/managed-vault/useUnderlying";
import { ShareholderProvider } from "@/hooks/managed-vault/useShareholder";
import { ManagerProvider } from "@/hooks/managed-vault/useManager";
import { EvmAddress } from "@/utils/evmAddress";
import { ErrorBoundary } from "react-error-boundary";

export function Providers(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const [cookies, setCookie] = useCookies();
    const [mode, setMode] = useState<PaletteMode>("light");
    const [config] = useState(() => getConfig());
    const [queryClient] = useState(() => new QueryClient());
    const params = useParams();

    function toggleColorMode() {
        let expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        setCookie("theme", mode === "dark" ? "light" : "dark", { expires });
    }

    useEffect(() => {
        let cookieMode = cookies.theme;
        if (cookieMode === "light") setMode("light");
        else if (cookieMode === "dark") setMode("dark");
    }, [cookies]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    const initialState = props.initialState;

    function fallbackRender({ error }: { error: any }): ReactNode {
        return (
            <Grid container marginTop={"6em"}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8} textAlign={"center"}>
                    <Typography variant="h5" color={"inherit"}>
                        Error: {error?.message}
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        );
    }

    return (
        <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                <WagmiProvider config={config} initialState={initialState}>
                    <QueryClientProvider client={queryClient}>
                        <ConnectKitProvider
                            theme={mode == "light" ? "soft" : "midnight"}
                        >
                            <ErrorBoundary fallbackRender={fallbackRender}>
                                <ManagedVaultProvider
                                    address={params.address as EvmAddress}
                                >
                                    <UnderlyingProvider>
                                        <ShareholderProvider>
                                            <ManagerProvider>
                                                {props.children}
                                            </ManagerProvider>
                                        </ShareholderProvider>
                                    </UnderlyingProvider>
                                </ManagedVaultProvider>
                            </ErrorBoundary>
                        </ConnectKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
