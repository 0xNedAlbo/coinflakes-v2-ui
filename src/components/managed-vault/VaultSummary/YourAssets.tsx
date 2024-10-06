import Section from "@/components/Section";
import {
    useReadManagedVaultBalanceOf,
    useReadManagedVaultConvertToAssets,
    useWatchManagedVaultDepositEvent,
    useWatchManagedVaultWithdrawEvent,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useUnderlying } from "@/hooks/managed-vault/useUnderlying";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { Box } from "@mui/material";
import { useAccount } from "wagmi";

export default function YourAssets() {
    const vault = useManagedVault();
    const underlying = useUnderlying();

    const { address: account } = useAccount();

    const { data: balance, refetch: refetchBalance } =
        useReadManagedVaultBalanceOf({
            address: vault.address,
            args: [account as EvmAddress],
        });

    const { data: shareValue } = useReadManagedVaultConvertToAssets({
        address: vault.address,
        args: [balance as bigint],
    });

    useWatchManagedVaultDepositEvent({
        address: vault.address,
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { owner } = logEvent.args as { owner: EvmAddress };
                if (owner === account) refetchBalance();
            });
        },
    });

    useWatchManagedVaultWithdrawEvent({
        address: vault.address,
        onLogs: (logs) => {
            logs.forEach((logEvent) => {
                const { owner } = logEvent.args as { owner: EvmAddress };
                if (owner === account) refetchBalance();
            });
        },
    });
    return (
        <Section heading="Your Share Value">
            <Box>
                <Box component={"div"} mr={"0.3em"}>
                    {numberFormat(
                        shareValue,
                        underlying?.symbol,
                        2,
                        underlying?.decimals
                    )}
                </Box>
                <Box component={"div"} fontSize="0.8em">
                    (Total Assets:{" "}
                    {numberFormat(
                        vault.totalAssets,
                        underlying?.symbol,
                        2,
                        underlying?.decimals
                    )}
                    )
                </Box>
            </Box>
        </Section>
    );
}
