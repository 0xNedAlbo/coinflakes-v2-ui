import { Section } from "@/components/common/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { numberFormat } from "@/utils/formats";

export function CurrentSharePrice() {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    return (
        <Section heading="Current Share Price">
            {numberFormat(
                vault?.sharePrice,
                underlying?.symbol,
                2,
                underlying?.decimals
            )}
        </Section>
    );
}
