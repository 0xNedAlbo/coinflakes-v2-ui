import { createContext, useContext, useEffect, useState } from "react";

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

const UnderlyingContext = createContext<UnderlyingType>({});

export function useUnderlying() {
    const underlying = useContext(UnderlyingContext);
    return underlying;
}

export function UnderlyingProvider(props: {
    children: React.ReactNode;
}): React.ReactNode {
    const vault = useManagedVault();

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

    return (
        <UnderlyingContext.Provider
            value={{
                address,
                name,
                symbol,
                decimals,
            }}
        >
            {props.children}
        </UnderlyingContext.Provider>
    );
}
