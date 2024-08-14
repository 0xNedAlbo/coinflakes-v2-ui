import { useEffect, useState } from "react";

import EvmAddress from "../utils/evmAddress";
import { useBalance, useWatchContractEvent } from "wagmi";
import { useVault } from "./useVault";
import { vaultAbi } from "@/generated/wagmi";

export type UseShareholderReturnType =
    | {
          address: EvmAddress;
          shares: bigint;
      }
    | undefined;

export type UseShareholderParams = {
    address?: EvmAddress;
};
export function useShareholder(
    params: UseShareholderParams
): UseShareholderReturnType {
    const address = params.address;
    const [shareholder, setShareholder] = useState<UseShareholderReturnType>();
    const vault = useVault();

    const { data: balance, refetch: refetchBalance } = useBalance({
        address: address,
        token: vault?.address,
    });

    useEffect(() => {
        if (!address) return;
        if (!balance) return;
        setShareholder({
            address,
            shares: balance.value,
        });
    }, [balance]);

    useWatchContractEvent({
        address: vault?.address,
        abi: vaultAbi,
        eventName: "Transfer",
        onLogs: (logs) => {
            if (!logs.length) return;
            logs.forEach((logEvent) => {
                if (
                    logEvent.args.sender == address ||
                    logEvent.args.receiver == address
                )
                    refetchBalance();
            });
        },
    });
    return shareholder;
}
