import { useEffect, useState } from "react";

import EvmAddress from "../utils/evmAddress";

import {
    useReadVaultDecimals,
    useReadVaultName,
    useReadVaultPricePerShare,
    useReadVaultSymbol,
    useReadVaultTotalAssets,
    vaultAddress,
} from "@/generated/wagmi";

export type UseVaultReturnType =
    | {
          address: EvmAddress;
          name: string;
          symbol: string;
          decimals: number;
          totalAssets: bigint;
          totalSupply: bigint;
          sharePrice: bigint;
      }
    | undefined;

export function useVault(): UseVaultReturnType {
    const address = vaultAddress as EvmAddress;

    const [vault, setVault] = useState<UseVaultReturnType>();

    const { data: name } = useReadVaultName();
    const { data: symbol } = useReadVaultSymbol();
    const { data: decimals } = useReadVaultDecimals();
    const { data: totalAssets } = useReadVaultTotalAssets();
    const { data: sharePrice } = useReadVaultPricePerShare();
    const { data: totalSupply } = useReadVaultTotalAssets();

    useEffect(() => {
        if (!address) return;
        if (!name) return;
        if (!symbol) return;
        if (!decimals) return;
        if (!totalAssets) return;
        if (!totalSupply) return;
        if (!sharePrice) return;
        setVault({
            address,
            name,
            symbol,
            decimals,
            totalAssets,
            totalSupply,
            sharePrice,
        });
    }, [address, name, symbol, decimals, totalAssets, totalSupply, sharePrice]);

    return vault;
}
