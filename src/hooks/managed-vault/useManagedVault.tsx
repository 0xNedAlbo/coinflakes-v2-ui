import { createContext, useContext, useEffect, useMemo, useState } from "react";

import EvmAddress from "@/utils/evmAddress";

import {
    managedVaultAbi,
    useReadManagedVaultConvertToAssets,
} from "@/generated/wagmi";
import { isAddress } from "viem";
import { BN_1E } from "@/utils/constants";
import { useReadContracts, useWatchContractEvent } from "wagmi";

export type ManagedVaultType = {
    address?: EvmAddress;
    name?: string;
    symbol?: string;
    decimals?: number;
    totalAssets?: bigint;
    totalSupply?: bigint;
    assetsInUse?: bigint;
    sharePrice?: bigint;
    manager?: EvmAddress;
};

export const ManagedVaultContext = createContext<ManagedVaultType>({});

export function useManagedVault() {
    const vault = useContext(ManagedVaultContext);
    return vault;
}

export function ManagedVaultProvider(props: {
    children: React.ReactNode;
    address: EvmAddress;
}): React.ReactNode {
    const address = useContext(ManagedVaultContext);

    if (!props.address) {
        throw new Error(
            "useManageVault must be used within ManagedVaultContext"
        );
    }

    if (!isAddress(props.address as string)) {
        throw new Error("vault address is not an EVM address");
    }
    console.log("Managed Vault Provider");
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
                console.log("Refetch");
                refetchTokennomics();
                refetchSharePrice();
            }
        },
    });

    /*     useWatchManagedVaultDepositEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
        },
    });

    useWatchManagedVaultWithdrawEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
        },
    });

    useWatchManagedVaultUseAssetsEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
        },
    });

    useWatchManagedVaultReturnAssetsEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
            refetchSharePrice();
        },
    });

    useWatchManagedVaultGainsEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
            refetchSharePrice();
        },
    });

    useWatchManagedVaultLossEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
            refetchSharePrice();
        },
    });

    useWatchManagedVaultFeesEvent({
        address,
        onLogs: () => {
            refetchTokennomics();
            refetchSharePrice();
        },
    });
 */
    return (
        <ManagedVaultContext.Provider
            value={{
                address: props.address,
                name,
                symbol,
                decimals,
                totalAssets,
                assetsInUse,
                totalSupply,
                sharePrice,
                manager,
            }}
        >
            {props.children}
        </ManagedVaultContext.Provider>
    );
}
