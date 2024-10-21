import EvmAddress from "@/utils/evmAddress";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useManagedVault } from "./useManagedVault";
import { useUnderlying } from "./useUnderlying";
import {
    useReadManagedVaultBalanceOf,
    useReadManagedVaultConvertToAssets,
    useReadManagedVaultIsShareholder,
    useReadManagedVaultManager,
    useReadManagedVaultMaxRedeem,
    useWatchManagedVaultDepositEvent,
    useWatchManagedVaultWithdrawEvent,
} from "@/generated/wagmi";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { erc20Abi } from "viem";

export type ShareholderType = {
    address?: EvmAddress;
    isShareholder?: Boolean;
    isManager?: Boolean;
    shares?: bigint;
    underlyingBalance?: bigint;
    shareValue?: bigint;
    maxRedeem?: bigint;
};

const ShareholderContext = createContext<ShareholderType>({});

export function useShareholder() {
    const shareholder = useContext(ShareholderContext);
    return shareholder;
}

export function ShareholderProvider(props: { children: ReactNode }): ReactNode {
    const { address: vaultAddress, sharePrice } = useManagedVault();
    const { address: underlyingAddress } = useUnderlying();
    const { address: account } = useAccount();
    console.log("Shareholder Provider");

    const { data: shares, refetch: refetchVaultBalance } =
        useReadManagedVaultBalanceOf({
            address: vaultAddress,
            args: [account as EvmAddress],
        });

    const { data: underlyingBalance, refetch: refetchUnderlyingBalance } =
        useReadContract({
            address: underlyingAddress,
            functionName: "balanceOf",
            args: [account as EvmAddress],
            abi: erc20Abi,
        });

    const { data: shareValue, refetch: refetchShareValue } =
        useReadManagedVaultConvertToAssets({
            address: vaultAddress,
            args: [shares as bigint],
        });

    const { data: isShareholder } = useReadManagedVaultIsShareholder({
        address: vaultAddress as EvmAddress,
        args: [account as EvmAddress],
    });

    const { data: manager } = useReadManagedVaultManager({
        address: vaultAddress as EvmAddress,
    });

    const { data: maxRedeem, refetch: refetchMaxRedeem } =
        useReadManagedVaultMaxRedeem({
            address: vaultAddress,
            args: [account as EvmAddress],
        });

    useWatchManagedVaultDepositEvent({
        address: vaultAddress,
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { owner } = logEvent.args as { owner: EvmAddress };
                if (owner === account) {
                    refetchVaultBalance();
                    refetchMaxRedeem();
                }
            });
        },
    });

    useWatchManagedVaultWithdrawEvent({
        address: vaultAddress,
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { owner } = logEvent.args as { owner: EvmAddress };
                if (owner === account) {
                    refetchVaultBalance();
                    refetchMaxRedeem();
                }
            });
        },
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
                if (from === account || to == account)
                    refetchUnderlyingBalance();
            });
        },
        abi: erc20Abi,
    });

    useEffect(() => {
        refetchShareValue();
    }, [sharePrice, shares]);

    return (
        <ShareholderContext.Provider
            value={{
                address: account,
                underlyingBalance,
                shares,
                isShareholder,
                isManager: manager == account,
                shareValue,
                maxRedeem,
            }}
        >
            {props.children}
        </ShareholderContext.Provider>
    );
}
