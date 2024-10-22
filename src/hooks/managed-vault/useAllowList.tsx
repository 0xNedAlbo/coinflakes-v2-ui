import { EvmAddress } from "@/utils/evmAddress";
import { useCallback } from "react";
import { useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { managedVaultAbi } from "@/generated/wagmi";
import { useManagedVault } from "./useManagedVault";

type AllowList = { [address: EvmAddress]: boolean };
type UseAllowListReturnType = {
    isAllowed: (address: EvmAddress) => Promise<boolean>;
};
export function useAllowList(): UseAllowListReturnType {
    const config = useConfig();
    const vault = useManagedVault();

    const isAllowed = useCallback(
        async (address: EvmAddress) => {
            // @ts-ignore
            const isAllowed = await readContract(config, {
                address: vault?.address,
                abi: managedVaultAbi,
                functionName: "isShareholder",
                args: [address],
            });
            return isAllowed;
        },
        [vault, config]
    );

    return { isAllowed };
}
