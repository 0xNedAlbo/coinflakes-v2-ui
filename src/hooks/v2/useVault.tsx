import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useReadVaultDecimals,
    useReadVaultName,
    useReadVaultPricePerShare,
    useReadVaultSymbol,
    useReadVaultTotalAssets,
    vaultAddress,
} from "@/generated/wagmi";
import { EvmAddress } from "@/utils/evmAddress";

export type Vault = {
    address: EvmAddress;
    name: string;
    symbol: string;
    decimals: number;
    totalAssets: bigint;
    totalSupply: bigint;
    sharePrice: bigint;
};

export type UseVaultReturnType = Vault | undefined;

const VaultContext = createContext<UseVaultReturnType | undefined>(undefined);

export function useVault(): UseVaultReturnType | undefined {
    return useContext(VaultContext);
}

export function VaultProvider(props: { children: ReactNode }): ReactNode {
    const address = vaultAddress as EvmAddress;
    const [vault, setVault] = useState<UseVaultReturnType>();

    const { data: name } = useReadVaultName();
    const { data: symbol } = useReadVaultSymbol();
    const { data: decimals } = useReadVaultDecimals();
    const { data: totalAssets } = useReadVaultTotalAssets();
    const { data: sharePrice } = useReadVaultPricePerShare();
    const { data: totalSupply } = useReadVaultTotalAssets();

    useEffect(() => {
        if (!name) setVault(undefined);
        else if (!symbol) setVault(undefined);
        else if (!decimals) setVault(undefined);
        else if (!totalAssets) setVault(undefined);
        else if (!sharePrice) setVault(undefined);
        else if (!totalSupply) setVault(undefined);
        else
            setVault({
                address,
                name,
                symbol,
                decimals,
                sharePrice,
                totalAssets,
                totalSupply,
            });
    }, [name, symbol, decimals, totalAssets, sharePrice, totalSupply]);

    return (
        <VaultContext.Provider value={vault}>
            {props.children}
        </VaultContext.Provider>
    );
}
