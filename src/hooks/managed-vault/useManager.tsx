import EvmAddress from "@/utils/evmAddress";
import { createContext, ReactNode, useContext } from "react";
import { useManagedVault } from "./useManagedVault";
import { useUnderlying } from "./useUnderlying";
import { useReadManagedVaultManager } from "@/generated/wagmi";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { erc20Abi } from "viem";

export type ManagerType = {
    address?: EvmAddress;
    balance?: bigint;
    withdrawableAssets?: bigint;
    isAccount?: Boolean;
};

const ManagerContext = createContext<ManagerType>({});

export function useManager() {
    const manager = useContext(ManagerContext);
    return manager;
}

export function ManagerProvider(props: { children: ReactNode }): ReactNode {
    const { address: vaultAddress } = useManagedVault();
    const { address: underlyingAddress } = useUnderlying();
    const { address: account } = useAccount();

    const { data: managerAddress } = useReadManagedVaultManager({
        address: vaultAddress,
    });

    const { data: balance, refetch: refetchBalance } = useReadContract({
        address: underlyingAddress,
        functionName: "balanceOf",
        args: [managerAddress as EvmAddress],
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
        abi: erc20Abi,
    });

    return (
        <ManagerContext.Provider
            value={{
                address: managerAddress,
                balance,
                isAccount: Boolean(managerAddress == account),
                withdrawableAssets,
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
}
