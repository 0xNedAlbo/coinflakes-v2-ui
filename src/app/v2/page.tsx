"use client";

import { RequiredChainPrompt } from "@/components/inputs/RequiredChainPrompt";
import { MainAppBar } from "@/components/v2/MainAppBar";
import { ShareholderSection } from "@/components/v2/ShareholderSection";
import { VaultSummary } from "@/components/v2/VaultSummary";
import { CssBaseline } from "@mui/material";
import { useState } from "react";

function App() {
    const [isChainConnected, setChainConnected] = useState<boolean>(false);

    return (
        <>
            <CssBaseline />
            <MainAppBar></MainAppBar>
            <RequiredChainPrompt
                requiredChainId={1}
                onChainConnected={setChainConnected}
                heading="The Coinflakes Investment Vault is on Ethereum!"
            ></RequiredChainPrompt>
            {isChainConnected && (
                <>
                    <VaultSummary></VaultSummary>
                    <ShareholderSection></ShareholderSection>
                </>
            )}
        </>
    );
}
export default App;
