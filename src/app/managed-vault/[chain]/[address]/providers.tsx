"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { ColorModeContext } from "@/components/ColorModeContext";

import { useCookies } from "react-cookie";
import { ManagedVaultContext } from "@/hooks/managed-vault/useManagedVault";
import { getConfig } from "@/wagmiConfig";
import { useParams } from "next/navigation";
import EvmAddress from "@/utils/evmAddress";

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
    if (initialState) {
        if (params.chain === "ethereum") initialState.chainId = 1;
        else if (params.chain === "arbitrum") initialState.chainId = 42161;
        else if (params.chain === "localhost") initialState.chainId = 1337;
        else throw new Error("Unsupported chain: " + params.chain);
    }
    return (
        <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                <WagmiProvider config={config} initialState={initialState}>
                    <QueryClientProvider client={queryClient}>
                        <ManagedVaultContext.Provider
                            value={params.address as EvmAddress}
                        >
                            <ConnectKitProvider
                                theme={mode == "light" ? "soft" : "midnight"}
                            >
                                {props.children}
                            </ConnectKitProvider>
                        </ManagedVaultContext.Provider>
                    </QueryClientProvider>
                </WagmiProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
