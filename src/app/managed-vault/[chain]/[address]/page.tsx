"use client";

import MainAppBar from "@/components/managed-vault/MainAppBar";
import ManagerSection from "@/components/managed-vault/ManagerSection";
import ShareholderSection from "@/components/managed-vault/ShareholderSection";
import VaultSummary from "@/components/managed-vault/VaultSummary";
import EvmAddress from "@/utils/evmAddress";
import { CssBaseline } from "@mui/material";
import { Providers } from "./providers";

function App({ params }: { params: { chain: string; address: EvmAddress } }) {
    return (
        <>
            <Providers params={params}>
                <CssBaseline />
                <MainAppBar></MainAppBar>
                <VaultSummary></VaultSummary>
                {<ManagerSection></ManagerSection>}
                {<ShareholderSection></ShareholderSection>}
            </Providers>
        </>
    );
}

export default App;
