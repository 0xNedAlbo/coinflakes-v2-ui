import { Box } from "@mui/material";
import { BN_1E } from "../../utils/constants";
import { numberFormat } from "../../utils/formats";
import { useVault } from "../../hooks/useVault";
import Section from "../Section";
import { useShareholder } from "../../hooks/useShareholder";
import { useEffect, useState } from "react";
import { useUnderlying } from "../../hooks/useUnderlying";
import { useAccount } from "wagmi";
import EvmAddress from "../../utils/evmAddress";

export default function YourAssets() {
    const [shares, setShares] = useState(0n);
    const [sharesValue, setSharesValue] = useState(0n);

    const vault = useVault();
    const { address } = useAccount();

    const shareholder = useShareholder({ address: address as EvmAddress });
    const underlying = useUnderlying();

    useEffect(() => {
        if (!vault || !shareholder) setSharesValue(0n);
        else setShares(shareholder.shares);
    }, [vault, shareholder]);

    useEffect(() => {
        if (!vault) setSharesValue(0n);
        else
            setSharesValue((shares * vault.sharePrice) / BN_1E(vault.decimals));
    }, [vault, shares, setSharesValue]);

    return (
        <Section heading="Your Share Value">
            {vault && underlying ? (
                <Box>
                    <Box component={"div"} mr={"0.3em"}>
                        {numberFormat(
                            sharesValue,
                            underlying?.symbol,
                            2,
                            vault.decimals
                        )}
                    </Box>
                    <Box component={"div"} fontSize="0.8em">
                        (Total Assets:{" "}
                        {numberFormat(
                            vault.totalAssets,
                            underlying?.symbol,
                            2,
                            vault.decimals
                        )}
                        )
                    </Box>
                </Box>
            ) : (
                <></>
            )}
        </Section>
    );
}
