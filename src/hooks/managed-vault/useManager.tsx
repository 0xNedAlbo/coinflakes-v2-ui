import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useManagedVault } from "./useManagedVault";
import { useUnderlying } from "./useUnderlying";
import { useReadManagedVaultManager } from "@/generated/wagmi";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { erc20Abi } from "viem";
import { EvmAddress } from "@/utils/evmAddress";

export type Manager = {
    address?: EvmAddress;
    balance?: bigint;
    withdrawableAssets?: bigint;
    isAccount?: Boolean;
};

export type UseManagerReturnType = Manager | undefined;

const ManagerContext = createContext<UseManagerReturnType>({});

export function useManager() {
    const manager = useContext(ManagerContext);
    return manager;
}

export function ManagerProvider(props: { children: ReactNode }): ReactNode {
    const [manager, setManager] = useState<UseManagerReturnType>();

    const vault = useManagedVault();
    const underlying = useUnderlying();

    const { address: account } = useAccount();

    const vaultAddress = vault?.address;
    const underlyingAddress = underlying?.address;

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

    useEffect(() => {
        if (
            !managerAddress ||
            !account ||
            typeof balance === "undefined" ||
            typeof withdrawableAssets === "undefined"
        )
            setManager(undefined);
        else
            setManager({
                address: managerAddress,
                balance,
                isAccount: Boolean(managerAddress == account),
                withdrawableAssets,
            });
    }, [managerAddress, balance, account, withdrawableAssets]);

    return (
        <ManagerContext.Provider value={manager}>
            {props.children}
        </ManagerContext.Provider>
    );
}
