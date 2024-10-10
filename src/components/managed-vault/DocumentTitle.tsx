import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";

export function DocumentTitle() {
    const { name } = useManagedVault();
    return <title>{name}</title>;
}
