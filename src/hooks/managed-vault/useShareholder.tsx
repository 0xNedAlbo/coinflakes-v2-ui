import EvmAddress from "@/utils/evmAddress";
import { useEffect, useState } from "react";
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

export function useShareholder(): ShareholderType {
    const { address: vaultAddress, sharePrice } = useManagedVault();
    const { address: underlyingAddress } = useUnderlying();
    const { address: account } = useAccount();
    const [shareholder, setShareholder] = useState<ShareholderType>({});

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

    useEffect(() => {
        if (!account) setShareholder({});
        else if (underlyingBalance === undefined) setShareholder({});
        else if (shares === undefined) setShareholder({});
        else if (sharePrice === undefined) setShareholder({});
        else {
            setShareholder({
                address: account,
                underlyingBalance,
                shares,
                isShareholder: Boolean(isShareholder),
                isManager: manager === account,
                shareValue,
                maxRedeem,
            });
        }
    }, [
        account,
        shares,
        underlyingBalance,
        isShareholder,
        manager,
        shares,
        shareValue,
        maxRedeem,
    ]);

    return shareholder;
}
