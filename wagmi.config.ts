import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import vaultAbi from "@/abis/vault.abi.json";
import migrationAbi from "@/abis/migration.abi.json";
import v1VaultAbi from "@/abis/v1Vault.abi.json";
import managedVaultAbi from "@/abis/managedVault.abi.json";

import { Abi, erc20Abi } from "viem";

export default defineConfig({
    out: "src/generated/wagmi.ts",
    contracts: [
        {
            address: "0x254bd33e2f62713f893f0842c99e68f855cda315",
            name: "Vault",
            abi: vaultAbi as Abi,
        },
        {
            address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            name: "DAI",
            abi: erc20Abi,
        },
        {
            address: "0xBf24F7580c99Aae5A4872639E97C1083Fee70AD7",
            name: "Migration",
            abi: migrationAbi as Abi,
        },
        {
            address: "0x430fD367dBbaebDAe682060e0fd2b2B1583E0639",
            name: "OldVault",
            abi: v1VaultAbi as Abi,
        },
        {
            name: "ManagedVault",
            abi: managedVaultAbi as Abi,
        },
    ],
    plugins: [react()],
});
