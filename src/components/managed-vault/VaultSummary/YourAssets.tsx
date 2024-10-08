import Section from "@/components/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";

export default function YourAssets() {
    const vault = useManagedVault();
    const underlying = useUnderlying();
    const { shareValue } = useShareholder();

    return (
        <Section heading="Your Share Value">
            <Box>
                <Box component={"div"} mr={"0.3em"}>
                    {numberFormat(
                        shareValue,
                        underlying?.symbol,
                        2,
                        underlying?.decimals
                    )}
                </Box>
                <Box component={"div"} fontSize="0.8em">
                    (Total Assets:{" "}
                    {numberFormat(
                        vault.totalAssets,
                        underlying?.symbol,
                        2,
                        underlying?.decimals
                    )}
                    )
                </Box>
            </Box>
        </Section>
    );
}
