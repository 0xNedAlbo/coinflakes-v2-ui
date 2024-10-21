import Section from "@/components/common/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function YourShares() {
    const vault = useManagedVault();
    const shareholder = useShareholder();

    const [percentage, setPercentage] = useState<bigint>(0n);

    useEffect(() => {
        if (
            vault?.totalSupply === undefined ||
            shareholder?.shares === undefined
        )
            setPercentage(0n);
        else if (vault.totalSupply === 0n || shareholder.shares === 0n)
            setPercentage(0n);
        else
            setPercentage(
                (shareholder.shares * BN_1E(vault.decimals + 2)) /
                    vault.totalSupply
            );
    }, [vault, shareholder]);

    return (
        <Section heading="Your Shares">
            <Box>
                <Box mr={"0.3em"}>
                    {numberFormat(
                        shareholder?.shares,
                        vault?.symbol,
                        2,
                        vault?.decimals
                    )}
                </Box>
                {
                    <Box fontSize={"0.8em"}>
                        {"("}
                        {numberFormat(percentage, "%", 2, vault?.decimals)}
                        {")"}
                    </Box>
                }
            </Box>
        </Section>
    );
}

export default YourShares;
