import { numberFormat } from "../../utils/formats";
import { useVault } from "../../hooks/useVault";
import Section from "../Section";
import { useShareholder } from "../../hooks/useShareholder";
import { useEffect, useState } from "react";
import { BN_1E } from "../../utils/constants";
import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import EvmAddress from "../../utils/evmAddress";

export default function ShareholderShares() {
    const [percentage, setPercentage] = useState(0n);

    const account = useAccount();
    const vault = useVault();
    const shareholder = useShareholder({
        address: account?.address as EvmAddress,
    });

    useEffect(() => {
        if (!account || !vault || !shareholder) {
            setPercentage(0n);
            return;
        }

        setPercentage(
            (shareholder.shares * BN_1E(vault.decimals + 2)) / vault.totalSupply
        );
    }, [account, vault, shareholder, setPercentage]);

    return (
        <Section heading="Your Shares">
            <Box component={"div"} mr={"0.3em"}>
                {numberFormat(
                    shareholder?.shares,
                    vault?.symbol,
                    2,
                    vault?.decimals
                )}
            </Box>
            <Box component={"div"} fontSize="0.8em">
                (Your percentage: {numberFormat(percentage, "%", 2, 18)})
            </Box>
        </Section>
    );
}
