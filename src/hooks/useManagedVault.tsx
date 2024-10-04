import { useEffect, useState } from "react";

import EvmAddress from "../utils/evmAddress";

import {
    useReadManagedVaultAssetsInUse,
    useReadManagedVaultDecimals,
    useReadManagedVaultName,
    useReadManagedVaultSymbol,
    useReadManagedVaultTotalAssets,
    useReadManagedVaultTotalSupply,
    useReadVaultDecimals,
    useReadVaultName,
    useReadVaultPricePerShare,
    useReadVaultSymbol,
    useReadVaultTotalAssets,
    vaultAddress,
} from "@/generated/wagmi";

export type UseManagedVaultParams = {
    address: EvmAddress;
};

export type UseManagedVaultReturnType =
    | {
          address: EvmAddress;
          name: string;
          symbol: string;
          decimals: number;
          totalAssets: bigint;
          totalSupply: bigint;
          assetsInUse: bigint;
      }
    | undefined;

export function useManagedVault(
    params: UseManagedVaultParams
): UseManagedVaultReturnType {
    const address = params.address;

    const [vault, setVault] = useState<UseManagedVaultReturnType>();

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
        console.log("TEST");
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
