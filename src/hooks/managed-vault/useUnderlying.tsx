import { createContext, useContext, useEffect, useState } from "react";

import { useReadManagedVaultAsset } from "@/generated/wagmi";
import { erc20Abi } from "viem";
import { useManagedVault } from "./useManagedVault";
import { useReadContract } from "wagmi";
import { EvmAddress } from "@/utils/evmAddress";

export type Underlying = {
    address: EvmAddress;
    name: string;
    symbol: string;
    decimals: number;
};

export type UseUnderlyingReturnType = Underlying | undefined;
const UnderlyingContext = createContext<UseUnderlyingReturnType>(undefined);

export function useUnderlying() {
    const underlying = useContext(UnderlyingContext);
    return underlying;
}

export function UnderlyingProvider(props: {
    children: React.ReactNode;
}): React.ReactNode {
    const [underlying, setUnderlying] =
        useState<UseUnderlyingReturnType>(undefined);
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

    useEffect(() => {
        if (!address || !name || !symbol || typeof decimals === "undefined")
            setUnderlying(undefined);
        else
            setUnderlying({
                address,
                name,
                symbol,
                decimals,
            });
    }, [address, name, symbol, decimals]);

    return (
        <UnderlyingContext.Provider value={underlying}>
            {props.children}
        </UnderlyingContext.Provider>
    );
}
