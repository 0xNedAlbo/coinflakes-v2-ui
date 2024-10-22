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
    useWatchManagedVaultEvent,
} from "@/generated/wagmi";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { erc20Abi } from "viem";
import { EvmAddress } from "@/utils/evmAddress";

export type Shareholder = {
    address: EvmAddress;
    isShareholder: Boolean;
    isManager: Boolean;
    shares: bigint;
    underlyingBalance: bigint;
    underlyingAllowance: bigint;
    shareValue: bigint;
    maxRedeem: bigint;
};
export type UseShareholderReturnType = Shareholder | undefined;

const ShareholderContext = createContext<UseShareholderReturnType>(undefined);

export function useShareholder() {
    const shareholder = useContext(ShareholderContext);
    return shareholder;
}

export function ShareholderProvider(props: { children: ReactNode }): ReactNode {
    const [shareholder, setShareholder] = useState<UseShareholderReturnType>();
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const { address: account } = useAccount();

    const vaultAddress = vault?.address;
    const sharePrice = vault?.sharePrice;
    const underlyingAddress = underlying?.address;

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

    const { data: underlyingAllowance, refetch: refetchUnderlyingAllowance } =
        useReadContract({
            address: underlyingAddress,
            abi: erc20Abi,
            functionName: "allowance",
            args: [account as EvmAddress, vault?.address as EvmAddress],
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

    useWatchManagedVaultEvent({
        address: vaultAddress,
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                if (
                    logEvent.eventName === "Deposit" ||
                    logEvent.eventName === "Withdraw"
                ) {
                    const { owner } = logEvent.args as { owner: EvmAddress };
                    if (owner === account) {
                        refetchVaultBalance();
                        refetchMaxRedeem();
                    }
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
                if (from === account || to == account) {
                    refetchUnderlyingBalance();
                    if (from == vault?.address || to == vault?.address)
                        refetchUnderlyingAllowance();
                }
            });
        },
        abi: erc20Abi,
    });

    useWatchContractEvent({
        address: underlyingAddress,
        abi: erc20Abi,
        eventName: "Approval",
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.owner == account &&
                    logEvent.args.spender == vault?.address
                ) {
                    refetchUnderlyingAllowance();
                }
            });
        },
    });

    useEffect(() => {
        refetchShareValue();
        refetchVaultBalance();
    }, [sharePrice, shares]);

    useEffect(() => {
        if (
            !account ||
            !manager ||
            typeof underlyingBalance === "undefined" ||
            typeof underlyingAllowance === "undefined" ||
            typeof shares === "undefined" ||
            typeof shareValue === "undefined" ||
            typeof maxRedeem === "undefined" ||
            typeof isShareholder === "undefined"
        )
            setShareholder(undefined);
        else
            setShareholder({
                address: account,
                underlyingBalance,
                underlyingAllowance,
                shares,
                isShareholder,
                isManager: manager == account,
                shareValue,
                maxRedeem,
            });
    }, [
        account,
        underlyingBalance,
        underlyingAllowance,
        shares,
        isShareholder,
        manager,
        shareValue,
        maxRedeem,
    ]);

    return (
        <ShareholderContext.Provider value={shareholder}>
            {props.children}
        </ShareholderContext.Provider>
    );
}
