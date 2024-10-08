import { createContext, useContext, useEffect, useState } from "react";

import EvmAddress from "@/utils/evmAddress";

import {
    useReadManagedVaultAssetsInUse,
    useReadManagedVaultConvertToAssets,
    useReadManagedVaultDecimals,
    useReadManagedVaultManager,
    useReadManagedVaultName,
    useReadManagedVaultSymbol,
    useReadManagedVaultTotalAssets,
    useReadManagedVaultTotalSupply,
    useWatchManagedVaultDepositEvent,
    useWatchManagedVaultFeesEvent,
    useWatchManagedVaultGainsEvent,
    useWatchManagedVaultLossEvent,
    useWatchManagedVaultReturnAssetsEvent,
    useWatchManagedVaultUseAssetsEvent,
    useWatchManagedVaultWithdrawEvent,
} from "@/generated/wagmi";
import { isAddress } from "viem";
import { BN_1E } from "@/utils/constants";

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
    sharePrice?: bigint;
    manager?: EvmAddress;
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
    const { data: totalAssets, refetch: refetchTotalAssets } =
        useReadManagedVaultTotalAssets({ address });
    const { data: assetsInUse, refetch: refetchAssetsInUse } =
        useReadManagedVaultAssetsInUse({ address });
    const { data: totalSupply, refetch: refetchTotalSupply } =
        useReadManagedVaultTotalSupply({ address });

    const { data: sharePrice, refetch: refetchSharePrice } =
        useReadManagedVaultConvertToAssets({
            address: vault.address,
            args: [BN_1E(vault.decimals || 18)],
        });

    const { data: manager } = useReadManagedVaultManager({
        address: vault.address,
    });

    useWatchManagedVaultDepositEvent({
        address,
        onLogs: () => {
            refetchTotalAssets();
            refetchTotalSupply();
        },
    });

    useWatchManagedVaultWithdrawEvent({
        address,
        onLogs: () => {
            refetchTotalAssets();
            refetchTotalSupply();
        },
    });

    useWatchManagedVaultUseAssetsEvent({
        address,
        onLogs: () => {
            refetchAssetsInUse();
            refetchTotalAssets();
        },
    });

    useWatchManagedVaultReturnAssetsEvent({
        address,
        onLogs: () => {
            refetchAssetsInUse();
            refetchTotalAssets();
            refetchSharePrice();
        },
    });

    useWatchManagedVaultGainsEvent({
        address,
        onLogs: () => {
            refetchAssetsInUse();
            refetchTotalAssets();
            refetchSharePrice();
        },
    });

    useWatchManagedVaultLossEvent({
        address,
        onLogs: () => {
            refetchAssetsInUse();
            refetchTotalAssets();
            refetchSharePrice();
        },
    });

    useWatchManagedVaultFeesEvent({
        address,
        onLogs: () => {
            refetchAssetsInUse();
            refetchTotalAssets();
            refetchSharePrice();
        },
    });

    useEffect(() => {
        setVault({
            address,
            name,
            symbol,
            decimals,
            totalAssets,
            totalSupply,
            assetsInUse,
            sharePrice,
            manager,
        });
    }, [
        address,
        name,
        symbol,
        decimals,
        totalAssets,
        totalSupply,
        assetsInUse,
        sharePrice,
        manager,
    ]);

    return vault;
}
