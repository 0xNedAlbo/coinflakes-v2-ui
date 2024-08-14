"use client";

import MainAppBar from "@/components/MainAppBar";
import ShareholderSection from "@/components/ShareholderSection";
import VaultSummary from "@/components/VaultSummary";

function App() {
    return (
        <>
            <MainAppBar></MainAppBar>
            <VaultSummary></VaultSummary>
            <ShareholderSection></ShareholderSection>
        </>
    );
}

export default App;
