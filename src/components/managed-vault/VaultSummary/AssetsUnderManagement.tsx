import Section from "@/components/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { numberFormat } from "@/utils/formats";

export default function AssetsUnderManagement() {
    const { totalAssets } = useManagedVault();
    const { symbol, decimals } = useUnderlying();

    return (
        <Section heading="Assets Under Management">
            {numberFormat(totalAssets, symbol, 2, decimals)}
        </Section>
    );
}
