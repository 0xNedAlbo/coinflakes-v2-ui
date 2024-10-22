import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAccount, useReadContract } from "wagmi";
import {
    useReadDaiAllowance,
    useReadDaiBalanceOf,
    useReadVaultMaxWithdraw,
    useWatchDaiApprovalEvent,
    useWatchDaiTransferEvent,
    useWatchVaultTransferEvent,
    vaultAbi,
    vaultAddress,
} from "@/generated/wagmi";
import { EvmAddress } from "@/utils/evmAddress";

export type Shareholder = {
    address: EvmAddress;
    shares: bigint;
    daiAllowance: bigint; // This is the allowance of underlying for vault as a spender.
    daiBalance: bigint;
    maxWithdraw: bigint;
};
export type UseShareholderReturnType = Shareholder | undefined;

const ShareholderContext = createContext<UseShareholderReturnType>(undefined);

export function useShareholder(): UseShareholderReturnType {
    const shareholder = useContext(ShareholderContext);
    return shareholder;
}

export function ShareholderProvider(props: { children: ReactNode }): ReactNode {
    const [shareholder, setShareholder] = useState<UseShareholderReturnType>();
    const { address } = useAccount();

    const { data: shares, refetch: refetchShares } = useReadContract({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: "balanceOf",
        args: [address as EvmAddress],
    });

    const { data: maxWithdraw, refetch: refetchMaxWithdraw } =
        // @ts-ignore
        useReadVaultMaxWithdraw({
            args: [address as EvmAddress],
        });

    const { data: daiAllowance, refetch: refetchDaiAllowance } =
        useReadDaiAllowance({
            args: [address as EvmAddress, vaultAddress],
        });

    const { data: daiBalance, refetch: refetchDaiBalance } =
        useReadDaiBalanceOf({
            args: [address as EvmAddress],
        });

    useWatchDaiTransferEvent({
        onLogs: (logs) =>
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.from == address ||
                    logEvent.args.to == address
                ) {
                    refetchDaiBalance();
                    if (
                        logEvent.args.from == vaultAddress ||
                        logEvent.args.to == vaultAddress
                    )
                        refetchDaiAllowance();
                }
            }),
    });

    useWatchDaiApprovalEvent({
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.owner == address &&
                    logEvent.args.spender == vaultAddress
                ) {
                    refetchDaiAllowance();
                }
            });
        },
    });

    useWatchVaultTransferEvent({
        onLogs: (logs) =>
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.sender == address ||
                    logEvent.args.receiver == address
                )
                    refetchShares();
                refetchMaxWithdraw();
            }),
    });

    useEffect(() => {
        if (
            !address ||
            typeof shares === "undefined" ||
            typeof daiAllowance === "undefined" ||
            typeof daiBalance === "undefined" ||
            typeof maxWithdraw === "undefined"
        )
            setShareholder(undefined);
        else
            setShareholder({
                address,
                shares: shares,
                daiAllowance,
                daiBalance,
                maxWithdraw,
            });
    }, [address, shares, daiAllowance, daiBalance, maxWithdraw]);

    return (
        <ShareholderContext.Provider value={shareholder}>
            {props.children}
        </ShareholderContext.Provider>
    );
}
