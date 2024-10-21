import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";

export function DocumentTitle() {
    const vault = useManagedVault();
    return <title>{vault?.name}</title>;
}
