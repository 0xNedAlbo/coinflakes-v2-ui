import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import EvmAddress from "@/utils/evmAddress";

import {
    daiAddress,
    useReadDaiDecimals,
    useReadDaiName,
    useReadDaiSymbol,
} from "@/generated/wagmi";

export type Underlying = {
    address: EvmAddress;
    name: string;
    symbol: string;
    decimals: number;
};

export type UseUnderlyingReturnType = Underlying | undefined;

const UnderlyingContext = createContext<UseUnderlyingReturnType>(undefined);

export function useUnderlying(): UseUnderlyingReturnType {
    const underlying = useContext(UnderlyingContext);
    return underlying;
}

export function UnderlyingProvider(props: { children: ReactNode }): ReactNode {
    const [underlying, setUnderlying] = useState<Underlying>();
    const address = daiAddress;
    const { data: name } = useReadDaiName();
    const { data: symbol } = useReadDaiSymbol();
    const { data: decimals } = useReadDaiDecimals();

    useEffect(() => {
        if (!address) setUnderlying(undefined);
        else if (!name) setUnderlying(undefined);
        else if (!symbol) setUnderlying(undefined);
        else if (!decimals) setUnderlying(undefined);
        else setUnderlying({ address, name, symbol, decimals });
    }, [address, name, symbol, decimals]);

    return (
        <UnderlyingContext.Provider value={underlying}>
            {props.children}
        </UnderlyingContext.Provider>
    );
}
