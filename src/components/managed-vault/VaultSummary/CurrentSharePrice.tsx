import Section from "@/components/Section";
import {
    useReadManagedVaultConvertToAssets,
    useWatchManagedVaultFeesEvent,
    useWatchManagedVaultGainsEvent,
    useWatchManagedVaultLossEvent,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import { BN_1E } from "@/utils/constants";
import { numberFormat } from "@/utils/formats";

export default function CurrentSharePrice() {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    return (
        <Section heading="Current Share Price">
            {numberFormat(
                vault?.sharePrice,
                underlying.symbol,
                2,
                underlying.decimals
            )}
        </Section>
    );
}
