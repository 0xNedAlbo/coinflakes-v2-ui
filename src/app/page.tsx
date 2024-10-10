"use client";

import MainAppBar from "@/components/MainAppBar";
import MigrationSection from "@/components/MigrationSection";
import ShareholderSection from "@/components/ShareholderSection";
import VaultSummary from "@/components/VaultSummary";
import { CssBaseline } from "@mui/material";
import { Providers } from "./providers";

function App() {
    return (
        <>
            <Providers>
                <CssBaseline />
                <MainAppBar></MainAppBar>
                <VaultSummary></VaultSummary>
                <MigrationSection></MigrationSection>
                <ShareholderSection></ShareholderSection>
            </Providers>
        </>
    );
}

export default App;
