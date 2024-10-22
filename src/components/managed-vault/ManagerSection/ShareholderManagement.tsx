import { Section } from "@/components/common/Section";
import { AddressTextField } from "@/components/inputs/AddressTextField";
import { SendTxButton } from "@/components/inputs/SendTxButton";
import {
    managedVaultAbi,
    useReadManagedVaultIsShareholder,
    useWatchManagedVaultAddShareholderEvent,
    useWatchManagedVaultRemoveShareholderEvent,
} from "@/generated/wagmi";
import { useAllowList } from "@/hooks/managed-vault/useAllowList";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { EvmAddress } from "@/utils/evmAddress";
import {
    AddOutlined,
    CheckOutlined,
    RemoveOutlined,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { isAddress } from "viem";

export function ShareholderManagement() {
    const vault = useManagedVault();
    const { isAllowed } = useAllowList();
    const [address, setAddress] = useState<string | null>(null);
    const [isShareholder, setShareholder] = useState<boolean>(false);

    /* const { data: isShareholder, refetch: refetchIsShareholder } =
        useReadManagedVaultIsShareholder({
            address: vault?.address,
            args: [address as EvmAddress],
        });
        */

    useEffect(() => {
        if (!address) setShareholder(false);
        else if (!isAddress(address)) setShareholder(false);
        else
            isAllowed(address).then((result: boolean) => {
                setShareholder(result);
            });
    }, [address]);

    const onValueChange = useCallback(
        (newValue: string | null) => {
            if (newValue == vault?.manager) setAddress(null);
            else setAddress(newValue);
        },
        [vault]
    );

    /* useWatchManagedVaultAddShareholderEvent({
        address: vault?.address,
        onLogs: () => {
            refetchIsShareholder();
        },
    });

    useWatchManagedVaultRemoveShareholderEvent({
        address: vault?.address,
        onLogs: () => {
            refetchIsShareholder();
        },
    });
    */

    return (
        <Section heading="Shareholder Management">
            <Box mt="1em" textAlign={"left"}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AddressTextField
                            label="Shareholder Address"
                            defaultValue=""
                            onValueChange={onValueChange}
                        ></AddressTextField>
                    </Grid>
                    <Grid item xs={3}>
                        <SendTxButton
                            address={vault?.address as EvmAddress}
                            functionName="addShareholder"
                            args={[address]}
                            disabled={!address || !!isShareholder}
                            icon={<AddOutlined />}
                            abi={managedVaultAbi}
                            onSuccess={() => setShareholder(true)}
                        >
                            Add&nbsp;Shareholder
                        </SendTxButton>
                    </Grid>
                    <Grid item xs={3}>
                        <SendTxButton
                            address={vault?.address as EvmAddress}
                            functionName="removeShareholder"
                            args={[address]}
                            abi={managedVaultAbi}
                            disabled={!isShareholder}
                            icon={<RemoveOutlined />}
                            onSuccess={() => setShareholder(false)}
                        >
                            Remove&nbsp;Shareholder
                        </SendTxButton>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display:
                                !!address && isShareholder ? "inherit" : "none",
                        }}
                    >
                        <>
                            <CheckOutlined color="success" />
                            <Typography variant="body1">
                                <b>{address}</b> is a shareholder.
                            </Typography>
                        </>
                    </Grid>
                </Grid>
            </Box>
        </Section>
    );
}
