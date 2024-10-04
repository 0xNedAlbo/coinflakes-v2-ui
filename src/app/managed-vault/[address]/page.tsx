"use client";

import MainAppBar from "@/components/managed-vault/MainAppBar";
import EvmAddress from "@/utils/evmAddress";
import { CssBaseline } from "@mui/material";

type RouteParams = {
    address: EvmAddress;
};

function App({ params }: { params: { address: EvmAddress } }) {
    return (
        <>
            <CssBaseline />
            <MainAppBar vaultAddress={params.address}></MainAppBar>
        </>
    );
}

export default App;
