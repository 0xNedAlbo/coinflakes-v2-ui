import { Section } from "@/components/common/Section";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { numberFormat } from "@/utils/formats";

export function VaultTotalSupply() {
    const vault = useManagedVault();
    return (
        <Section heading="Total Shares">
            {numberFormat(
                vault?.totalSupply,
                vault?.symbol,
                2,
                vault?.decimals
            )}
        </Section>
    );
}
