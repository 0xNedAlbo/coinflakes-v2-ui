"use client";

import MainAppBar from "@/components/managed-vault/MainAppBar";
import { ManagedVaultContext } from "@/hooks/useManagedVault";
import EvmAddress from "@/utils/evmAddress";
import { CssBaseline } from "@mui/material";

type RouteParams = {
    address: EvmAddress;
};

function App({ params }: { params: { address: EvmAddress } }) {
    return (
        <>
            <ManagedVaultContext.Provider value={params.address}>
                <CssBaseline />
                <MainAppBar></MainAppBar>
            </ManagedVaultContext.Provider>
        </>
    );
}

export default App;
