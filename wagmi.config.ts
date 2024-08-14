import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import vaultAbi from "@/abis/vault.abi.json";
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
    ],
    plugins: [react()],
});
