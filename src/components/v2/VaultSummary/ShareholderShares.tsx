import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import { useShareholder } from "@/hooks/v2/useShareholder";
import { useVault } from "@/hooks/v2/useVault";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { Section } from "@/components/common/Section";

export function ShareholderShares() {
    const [percentage, setPercentage] = useState(0n);

    const account = useAccount();
    const vault = useVault();
    const shareholder = useShareholder();

    useEffect(() => {
        if (!account || !vault || !shareholder) setPercentage(0n);
        else {
            let _p = shareholder.shares * BN_1E(vault.decimals + 2);
            _p /= vault.totalSupply;
            setPercentage(_p);
        }
    }, [account, vault, shareholder]);

    return (
        <Section heading="Your Shares">
            {account && shareholder && vault && (
                <>
                    <Box component={"div"} mr={"0.3em"}>
                        {numberFormat(
                            shareholder.shares,
                            vault.symbol,
                            2,
                            vault.decimals
                        )}
                    </Box>
                    <Box component={"div"} fontSize="0.8em">
                        {"Your percentage: " +
                            numberFormat(percentage, "%", 2, 18)}
                    </Box>
                </>
            )}
        </Section>
    );
}
