import Section from "@/components/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/useUnderlying";
import { numberFormat } from "@/utils/formats";

export default function AssetsUnderManagement() {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    return (
        <Section heading="Assets Under Management">
            {numberFormat(
                vault.totalAssets,
                underlying?.symbol,
                2,
                underlying?.decimals
            )}
        </Section>
    );
}
