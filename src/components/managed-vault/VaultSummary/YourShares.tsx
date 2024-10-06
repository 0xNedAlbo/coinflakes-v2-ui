import Section from "@/components/Section";
import { useReadManagedVaultBalanceOf } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { BN_1E } from "@/utils/constants";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function YourShares() {
    const vault = useManagedVault();
    const { address: account } = useAccount();

    const [percentage, setPercentage] = useState<bigint>(0n);

    const { data: balance, refetch: refetchBalance } =
        useReadManagedVaultBalanceOf({
            address: vault.address,
            args: [account as EvmAddress],
        });
    const { symbol, decimals, totalSupply } = vault;

    useEffect(() => {
        if (totalSupply === undefined || balance === undefined)
            setPercentage(0n);
        else if (decimals === undefined) setPercentage(0n);
        else if (totalSupply === 0n || balance === 0n) setPercentage(0n);
        else setPercentage((balance * BN_1E(decimals + 2)) / totalSupply);
        refetchBalance();
    }, [totalSupply, balance, decimals]);

    return (
        <Section heading="Your Shares">
            <Box>
                <Box mr={"0.3em"}>
                    {numberFormat(balance, symbol, 2, decimals)}
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
