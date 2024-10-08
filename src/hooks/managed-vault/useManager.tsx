import EvmAddress from "@/utils/evmAddress";
import { useEffect, useState } from "react";
import { useManagedVault } from "./useManagedVault";
import { useUnderlying } from "./useUnderlying";
import { managedVaultAbi, useReadManagedVaultManager } from "@/generated/wagmi";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { erc20Abi } from "viem";

export type ManagerType = {
    address?: EvmAddress;
    balance?: bigint;
    withdrawableAssets?: bigint;
    isAccount?: Boolean;
};

export function useManager(): ManagerType {
    const { address: vaultAddress, sharePrice } = useManagedVault();
    const { address: underlyingAddress } = useUnderlying();
    const { address: account } = useAccount();
    const [manager, setManager] = useState<ManagerType>({});

    const { data: managerAddress } = useReadManagedVaultManager({
        address: vaultAddress,
    });

    const { data: balance, refetch: refetchBalance } = useReadContract({
        address: underlyingAddress,
        functionName: "balanceOf",
        args: [manager as EvmAddress],
        abi: erc20Abi,
    });

    const { data: withdrawableAssets, refetch: refetchWithdrawable } =
        useReadContract({
            address: underlyingAddress,
            functionName: "balanceOf",
            args: [vaultAddress as EvmAddress],
            abi: erc20Abi,
        });

    useWatchContractEvent({
        address: underlyingAddress,
        eventName: "Transfer",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { from, to } = logEvent.args as {
                    from: EvmAddress;
                    to: EvmAddress;
                };
                if (from === managerAddress || to == managerAddress)
                    refetchBalance();
            });
        },
        abi: erc20Abi,
    });

    useWatchContractEvent({
        address: underlyingAddress,
        eventName: "Transfer",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { from, to } = logEvent.args as {
                    from: EvmAddress;
                    to: EvmAddress;
                };
                if (from === vaultAddress || to == vaultAddress)
                    refetchWithdrawable();
            });
        },
        abi: managedVaultAbi,
    });

    useEffect(() => {
        if (!account) setManager({});
        else if (balance === undefined) setManager({});
        else {
            setManager({
                address: managerAddress,
                balance,
                isAccount: Boolean(managerAddress == account),
                withdrawableAssets,
            });
        }
    }, [account, managerAddress, balance, withdrawableAssets]);

    return manager;
}
