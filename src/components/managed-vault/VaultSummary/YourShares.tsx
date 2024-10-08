import Section from "@/components/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function YourShares() {
    const { symbol, decimals, totalSupply: totalShares } = useManagedVault();
    const { shares } = useShareholder();

    const [percentage, setPercentage] = useState<bigint>(0n);

    useEffect(() => {
        if (totalShares === undefined || shares === undefined)
            setPercentage(0n);
        else if (decimals === undefined) setPercentage(0n);
        else if (totalShares === 0n || shares === 0n) setPercentage(0n);
        else setPercentage((shares * BN_1E(decimals + 2)) / totalShares);
    }, [totalShares, shares, decimals]);

    return (
        <Section heading="Your Shares">
            <Box>
                <Box mr={"0.3em"}>
                    {numberFormat(shares, symbol, 2, decimals)}
                </Box>
                {
                    <Box fontSize={"0.8em"}>
                        {"("}
                        {numberFormat(percentage, "%", 2, decimals)}
                        {")"}
                    </Box>
                }
            </Box>
        </Section>
    );
}

export default YourShares;
