import { Grid } from "@mui/material";
import CurrentSharePrice from "./VaultSummary/CurrentSharePrice";
import { useReadManagedVaultIsShareholder } from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useAccount } from "wagmi";
import EvmAddress from "@/utils/evmAddress";
import YourAssets from "./VaultSummary/YourAssets";
import AssetsUnderManagement from "./VaultSummary/AssetsUnderManagement";
import VaultTotalSupply from "./VaultSummary/VaultTotalSupply";
import YourShares from "./VaultSummary/YourShares";

export default function VaultSummary() {
    const vault = useManagedVault();
    const { address: account } = useAccount();
    const { data: isShareholder } = useReadManagedVaultIsShareholder({
        address: vault.address,
        args: [account as EvmAddress],
    });
    return (
        <Grid container mt={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        {isShareholder ? (
                            <YourAssets></YourAssets>
                        ) : (
                            <AssetsUnderManagement></AssetsUnderManagement>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <CurrentSharePrice></CurrentSharePrice>
                    </Grid>
                    <Grid item xs={4}>
                        {isShareholder ? (
                            <YourShares></YourShares>
                        ) : (
                            <VaultTotalSupply></VaultTotalSupply>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Grid>
    );
}
