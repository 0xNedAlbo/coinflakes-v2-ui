"use client";

import MainAppBar from "@/components/MainAppBar";
import MigrationSection from "@/components/MigrationSection";
import ShareholderSection from "@/components/ShareholderSection";
import VaultSummary from "@/components/VaultSummary";
import { CssBaseline } from "@mui/material";

function App() {
    return (
        <>
            <CssBaseline />
            <MainAppBar></MainAppBar>
            <VaultSummary></VaultSummary>
            <MigrationSection></MigrationSection>
            <ShareholderSection></ShareholderSection>
        </>
    );
}

export default App;