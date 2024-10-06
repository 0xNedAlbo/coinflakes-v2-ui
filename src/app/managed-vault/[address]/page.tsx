"use client";

import MainAppBar from "@/components/managed-vault/MainAppBar";
import ManagerSection from "@/components/managed-vault/ManagerSection";
import ShareholderSection from "@/components/managed-vault/ShareholderSection";
import VaultSummary from "@/components/managed-vault/VaultSummary";
import {
    useReadManagedVaultIsShareholder,
    useReadManagedVaultManager,
} from "@/generated/wagmi";
import { ManagedVaultContext } from "@/hooks/managed-vault/useManagedVault";
import EvmAddress from "@/utils/evmAddress";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function App({ params }: { params: { address: EvmAddress } }) {
    const { address: account } = useAccount();
    const [isManager, setManager] = useState<boolean>(false);
    const { data: isShareholder } = useReadManagedVaultIsShareholder({
        address: params.address as EvmAddress,
        args: [account as EvmAddress],
    });
    const { data: manager } = useReadManagedVaultManager({
        address: params.address as EvmAddress,
    });

    useEffect(() => {
        if (!account) return;
        if (!manager) return;
        setManager(account === manager);
    }, [manager, account]);

    return (
        <>
            <ManagedVaultContext.Provider value={params.address}>
                <CssBaseline />
                <MainAppBar></MainAppBar>
                <VaultSummary></VaultSummary>
                {isManager && <ManagerSection></ManagerSection>}
                {isShareholder && <ShareholderSection></ShareholderSection>}
            </ManagedVaultContext.Provider>
        </>
    );
}

export default App;
