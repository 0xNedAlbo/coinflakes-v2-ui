import { useEffect, useState } from "react";

import EvmAddress from "@/utils/evmAddress";

import { useReadManagedVaultAsset } from "@/generated/wagmi";
import { erc20Abi } from "viem";
import { useManagedVault } from "./useManagedVault";
import { useReadContract } from "wagmi";

export type UnderlyingType = {
    address?: EvmAddress;
    name?: string;
    symbol?: string;
    decimals?: number;
};

export function useUnderlying(): UnderlyingType {
    const vault = useManagedVault();

    const [underlying, setUnderlying] = useState<UnderlyingType>({});

    const { data: address } = useReadManagedVaultAsset({
        address: vault?.address,
    });
    const erc20Config = {
        address: address,
        abi: erc20Abi,
    };
    const { data: name } = useReadContract({
        ...erc20Config,
        functionName: "name",
    });
    const { data: symbol } = useReadContract({
        ...erc20Config,
        functionName: "symbol",
    });
    const { data: decimals } = useReadContract({
        ...erc20Config,
        functionName: "decimals",
    });

    useEffect(() => {
        if (!address) return;
        if (!name) return;
        if (!symbol) return;
        if (!decimals) return;
        setUnderlying({
            address,
            name,
            symbol,
            decimals,
        });
    }, [address, name, symbol, decimals]);

    return underlying;
}
