import { Section } from "@/components/common/Section";
import { useShareholder } from "@/hooks/v2/useShareholder";
import { useUnderlying } from "@/hooks/v2/useUnderlying";
import { useVault } from "@/hooks/v2/useVault";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export function YourAssets() {
    //const [shares, setShares] = useState(0n);
    const [sharesValue, setSharesValue] = useState(0n);

    const vault = useVault();
    const underlying = useUnderlying();
    const shareholder = useShareholder();

    const shares = shareholder ? shareholder.shares : 0n;

    useEffect(() => {
        if (!vault || !shares) setSharesValue(0n);
        else
            setSharesValue((shares * vault.sharePrice) / BN_1E(vault.decimals));
    }, [vault, shares, setSharesValue]);

    return (
        <Section heading="Your Share Value">
            {vault && underlying && (
                <Box>
                    <Box component={"div"} mr={"0.3em"}>
                        {numberFormat(
                            sharesValue,
                            underlying.symbol,
                            2,
                            vault.decimals
                        )}
                    </Box>
                    <Box component={"div"} fontSize="0.8em">
                        {"(Total Assets: " +
                            numberFormat(
                                vault.totalAssets,
                                underlying.symbol,
                                2,
                                vault.decimals
                            ) +
                            ")"}
                    </Box>
                </Box>
            )}
        </Section>
    );
}
