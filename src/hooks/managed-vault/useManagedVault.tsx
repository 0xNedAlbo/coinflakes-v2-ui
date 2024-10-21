import { createContext, useContext, useEffect, useState } from "react";

import EvmAddress from "@/utils/evmAddress";

import {
    managedVaultAbi,
    useReadManagedVaultConvertToAssets,
} from "@/generated/wagmi";
import { BN_1E } from "@/utils/constants";
import { useReadContracts, useWatchContractEvent } from "wagmi";

export type ManagedVault = {
    address: EvmAddress;
    name: string;
    symbol: string;
    decimals: number;
    totalAssets: bigint;
    totalSupply: bigint;
    assetsInUse: bigint;
    sharePrice: bigint;
    manager: EvmAddress;
};

export type UseManagedVaultReturnType = ManagedVault | undefined;
export const ManagedVaultContext =
    createContext<UseManagedVaultReturnType>(undefined);

export function useManagedVault() {
    const vault = useContext(ManagedVaultContext);
    return vault;
}

export function ManagedVaultProvider(props: {
    children: React.ReactNode;
    address: EvmAddress;
}): React.ReactNode {
    const [vault, setVault] = useState<UseManagedVaultReturnType>();
    const [name, setName] = useState<string>();
    const [symbol, setSymbol] = useState<string>();
    const [decimals, setDecimals] = useState<number>();
    const [manager, setManager] = useState<EvmAddress>();
    const [totalAssets, setTotalAssets] = useState<bigint>();
    const [assetsInUse, setAssetsInUse] = useState<bigint>();
    const [totalSupply, setTotalSupply] = useState<bigint>();

    const managedVaultContext = {
        address: props.address,
        abi: managedVaultAbi,
    };

    const { data: contractData } = useReadContracts({
        contracts: [
            {
                ...managedVaultContext,
                functionName: "name",
                args: [],
            },
            {
                ...managedVaultContext,
                functionName: "symbol",
                args: [],
            },
            {
                ...managedVaultContext,
                functionName: "decimals",
                args: [],
            },
            {
                ...managedVaultContext,
                functionName: "manager",
                args: [],
            },
        ],
    });

    useEffect(() => {
        if (!contractData) return;
        setName(contractData[0].result);
        setSymbol(contractData[1].result);
        setDecimals(contractData[2].result);
        setManager(contractData[3]?.result);
    }, [contractData]);

    const { data: tokenomics, refetch: refetchTokennomics } = useReadContracts({
        contracts: [
            { ...managedVaultContext, functionName: "totalAssets", args: [] },
            { ...managedVaultContext, functionName: "assetsInUse", args: [] },
            { ...managedVaultContext, functionName: "totalSupply", args: [] },
        ],
    });

    useEffect(() => {
        if (!tokenomics) return;
        setTotalAssets(tokenomics[0].result);
        setAssetsInUse(tokenomics[1].result);
        setTotalSupply(tokenomics[2].result);
    }, [tokenomics]);

    const { data: sharePrice, refetch: refetchSharePrice } =
        useReadManagedVaultConvertToAssets({
            address: props.address,
            args: [BN_1E(decimals || 18)],
        });

    useWatchContractEvent({
        address: props.address,
        abi: managedVaultAbi,
        onLogs: (events) => {
            let triggerRefetch = false;
            events.forEach((event) => {
                if (
                    event.eventName == "ReturnAssets" ||
                    event.eventName == "UseAssets" ||
                    event.eventName == "Deposit" ||
                    event.eventName == "Withdraw" ||
                    event.eventName == "Gains" ||
                    event.eventName == "Loss" ||
                    event.eventName == "Fees"
                )
                    triggerRefetch = true;
            });
            if (triggerRefetch) {
                refetchTokennomics();
                refetchSharePrice();
            }
        },
    });

    useEffect(() => {
        if (
            !props.address ||
            !manager ||
            !name ||
            !symbol ||
            typeof decimals === "undefined" ||
            typeof totalAssets === "undefined" ||
            typeof assetsInUse === "undefined" ||
            typeof totalSupply === "undefined" ||
            typeof sharePrice === "undefined"
        )
            setVault(undefined);
        else {
            setVault({
                address: props.address,
                name,
                symbol,
                decimals,
                totalAssets,
                assetsInUse,
                totalSupply,
                sharePrice,
                manager,
            });
        }
    }, [
        props.address,
        name,
        symbol,
        decimals,
        totalAssets,
        assetsInUse,
        totalSupply,
        sharePrice,
        manager,
    ]);

    return (
        <ManagedVaultContext.Provider value={vault}>
            {props.children}
        </ManagedVaultContext.Provider>
    );
}
