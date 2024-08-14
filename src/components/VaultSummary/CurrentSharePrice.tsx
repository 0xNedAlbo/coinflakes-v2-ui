import { useUnderlying } from "../../hooks/useUnderlying";
import { useVault } from "../../hooks/useVault";
import { numberFormat } from "../../utils/formats";
import Section from "../Section";

export default function CurrentSharePrice() {
    const underlying = useUnderlying();
    const vault = useVault();

    return (
        <Section heading="Current Share Price">
            {vault && underlying
                ? numberFormat(
                      vault?.sharePrice,
                      underlying?.symbol,
                      2,
                      underlying?.decimals
                  )
                : ""}
        </Section>
    );
}
