"use client";

import { DocumentTitle } from "@/components/managed-vault/DocumentTitle";
import MainAppBar from "@/components/managed-vault/MainAppBar";
import ManagerSection from "@/components/managed-vault/ManagerSection";
import ShareholderSection from "@/components/managed-vault/ShareholderSection";
import VaultSummary from "@/components/managed-vault/VaultSummary";
import { CssBaseline } from "@mui/material";

function App() {
    return (
        <>
            <DocumentTitle />
            <CssBaseline />
            <MainAppBar></MainAppBar>
            <VaultSummary></VaultSummary>
            {<ManagerSection></ManagerSection>}
            {<ShareholderSection></ShareholderSection>}
        </>
    );
}

export default App;
