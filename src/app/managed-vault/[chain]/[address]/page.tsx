"use client";

import { RequiredChainPrompt } from "@/components/inputs/RequiredChainPrompt";
import { DocumentTitle } from "@/components/managed-vault/DocumentTitle";
import { MainAppBar } from "@/components/managed-vault/MainAppBar";
import { ManagerSection } from "@/components/managed-vault/ManagerSection";
import { ShareholderSection } from "@/components/managed-vault/ShareholderSection";
import { VaultSummary } from "@/components/managed-vault/VaultSummary";
import { CHAIN_SLUGS } from "@/utils/constants";
import { CssBaseline } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function App() {
    const [isChainConnected, setChainConnected] = useState<boolean>(false);
    const [requiredChainId, setRequiredChainId] = useState<number>();

    const params = useParams();

    useEffect(() => {
        if (!params?.chain) {
            setRequiredChainId(undefined);
        } else {
            const _chainId = CHAIN_SLUGS[params?.chain as string];
            setRequiredChainId(_chainId);
        }
    }, [params]);

    return (
        <>
            <DocumentTitle />
            <CssBaseline />
            <MainAppBar></MainAppBar>
            {requiredChainId && (
                <RequiredChainPrompt
                    requiredChainId={requiredChainId}
                    onChainConnected={setChainConnected}
                ></RequiredChainPrompt>
            )}
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
