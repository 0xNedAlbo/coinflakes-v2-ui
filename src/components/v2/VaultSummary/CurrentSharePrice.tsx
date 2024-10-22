import { Section } from "@/components/common/Section";
import { useUnderlying } from "@/hooks/v2/useUnderlying";
import { useVault } from "@/hooks/v2/useVault";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";

export function CurrentSharePrice() {
    const underlying = useUnderlying();
    const vault = useVault();

    return (
        <Section heading="Current Share Price">
            {vault && underlying && (
                <Box>
                    <Box component={"div"} mr={"0.3em"}>
                        {vault && underlying
                            ? numberFormat(
                                  vault.sharePrice,
                                  underlying.symbol,
                                  2,
                                  underlying.decimals
                              )
                            : ""}
                    </Box>
                    <Box component={"div"} fontSize="0.8em">
                        &nbsp;
                    </Box>
                </Box>
            )}
        </Section>
    );
}
