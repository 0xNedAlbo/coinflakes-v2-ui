"use client";

import { RequiredChainPrompt } from "@/components/inputs/RequiredChainPrompt";
import { DocumentTitle } from "@/components/managed-vault/DocumentTitle";
import { MainAppBar } from "@/components/managed-vault/MainAppBar";
import { ManagerSection } from "@/components/managed-vault/ManagerSection";
import { ShareholderSection } from "@/components/managed-vault/ShareholderSection";
import { VaultSummary } from "@/components/managed-vault/VaultSummary";
import { CssBaseline } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

function App() {
    const [isChainConnected, setChainConnected] = useState<boolean>(false);

    return (
        <>
            <DocumentTitle />
            <CssBaseline />
            <MainAppBar></MainAppBar>
            <RequiredChainPrompt
                onChainConnected={setChainConnected}
            ></RequiredChainPrompt>
            {isChainConnected && (
                <>
                    <VaultSummary></VaultSummary>
                    <ManagerSection></ManagerSection>
                    <ShareholderSection></ShareholderSection>
                </>
            )}
        </>
    );
}
export default App;
