import { createContext, useContext, useEffect, useState } from "react";

import EvmAddress from "../utils/evmAddress";

import {
    useReadManagedVaultAssetsInUse,
    useReadManagedVaultDecimals,
    useReadManagedVaultName,
    useReadManagedVaultSymbol,
    useReadManagedVaultTotalAssets,
    useReadManagedVaultTotalSupply,
} from "@/generated/wagmi";
import { isAddress } from "viem";

export const ManagedVaultContext = createContext<EvmAddress | undefined>(
    undefined
);

export type ManagedVaultType = {
    address?: EvmAddress;
    name?: string;
    symbol?: string;
    decimals?: number;
    totalAssets?: bigint;
    totalSupply?: bigint;
    assetsInUse?: bigint;
};

export function useManagedVault(): ManagedVaultType {
    const address = useContext(ManagedVaultContext);

    if (!address) {
        throw new Error(
            "useManageVault must be used within ManagedVaultContext"
        );
    }
    if (!isAddress(address as string)) {
        throw new Error("vault address is not an EVM address");
    }

    const [vault, setVault] = useState<ManagedVaultType>({});

    const { data: name } = useReadManagedVaultName({ address });
    const { data: symbol } = useReadManagedVaultSymbol({ address });
    const { data: decimals } = useReadManagedVaultDecimals({ address });
    const { data: totalAssets } = useReadManagedVaultTotalAssets({ address });
    const { data: assetsInUse } = useReadManagedVaultAssetsInUse({ address });
    const { data: totalSupply } = useReadManagedVaultTotalSupply({ address });

    useEffect(() => {
        if (!address) return;
        if (!name) return;
        if (!symbol) return;
        if (!decimals) return;
        if (totalAssets === undefined) return;
        if (totalSupply === undefined) return;
        if (assetsInUse === undefined) return;
        setVault({
            address,
            name,
            symbol,
            decimals,
            totalAssets,
            totalSupply,
            assetsInUse,
        });
    }, [
        address,
        name,
        symbol,
        decimals,
        totalAssets,
        totalSupply,
        assetsInUse,
    ]);

    return vault;
}
