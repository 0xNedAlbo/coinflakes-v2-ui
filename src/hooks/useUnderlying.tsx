import { useEffect, useState } from "react";

import EvmAddress from "../utils/evmAddress";

import {
    daiAddress,
    useReadDaiDecimals,
    useReadDaiName,
    useReadDaiSymbol,
} from "@/generated/wagmi";

export type UseUnderlyingReturnType =
    | {
          address: EvmAddress;
          name: string;
          symbol: string;
          decimals: number;
      }
    | undefined;

export function useUnderlying(): UseUnderlyingReturnType {
    const [underlying, setUnderlying] = useState<UseUnderlyingReturnType>();

    const { data: name } = useReadDaiName();
    const { data: symbol } = useReadDaiSymbol();
    const { data: decimals } = useReadDaiDecimals();

    useEffect(() => {
        if (!name || !symbol || !decimals) return;
        setUnderlying({
            address: daiAddress,
            name,
            symbol,
            decimals,
        });
    }, [name, symbol, decimals, setUnderlying]);

    return underlying;
}
