"use client";

import MainAppBar from "@/components/managed-vault/MainAppBar";
import ManagerSection from "@/components/managed-vault/ManagerSection";
import ShareholderSection from "@/components/managed-vault/ShareholderSection";
import VaultSummary from "@/components/managed-vault/VaultSummary";
import { ManagedVaultContext } from "@/hooks/managed-vault/useManagedVault";
import EvmAddress from "@/utils/evmAddress";
import { CssBaseline } from "@mui/material";

function App({ params }: { params: { address: EvmAddress } }) {
    return (
        <>
            <ManagedVaultContext.Provider value={params.address}>
                <CssBaseline />
                <MainAppBar></MainAppBar>
                <VaultSummary></VaultSummary>
                {<ManagerSection></ManagerSection>}
                {<ShareholderSection></ShareholderSection>}
            </ManagedVaultContext.Provider>
        </>
    );
}

export default App;
