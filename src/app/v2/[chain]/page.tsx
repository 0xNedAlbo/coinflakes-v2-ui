"use client";

import { RequiredChainPrompt } from "@/components/inputs/RequiredChainPrompt";
import { MainAppBar } from "@/components/v2/MainAppBar";
import { ShareholderSection } from "@/components/v2/ShareholderSection";
import { VaultSummary } from "@/components/v2/VaultSummary";
import { CssBaseline } from "@mui/material";

export function App() {
    return (
        <>
            <CssBaseline />
            <MainAppBar></MainAppBar>
            <RequiredChainPrompt></RequiredChainPrompt>
            <VaultSummary></VaultSummary>
            <ShareholderSection></ShareholderSection>
        </>
    );
}
export default App;
