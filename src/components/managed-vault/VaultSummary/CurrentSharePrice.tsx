import Section from "@/components/Section";
import { useReadManagedVaultConvertToAssets } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";

export default function CurrentSharePrice() {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    const { data: sharePrice } = useReadManagedVaultConvertToAssets({
        address: vault.address,
        args: [BN_1E(vault.decimals || 18)],
    });

    return (
        <Section heading="Current Share Price">
            {numberFormat(
                sharePrice,
                underlying.symbol,
                2,
                underlying.decimals
            )}
        </Section>
    );
}
