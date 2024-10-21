import Section from "@/components/common/Section";
import AddressTextField from "@/components/inputs/AddressTextField";
import SendTxButton from "@/components/inputs/SendTxButton";
import {
    managedVaultAbi,
    useReadManagedVaultIsShareholder,
    useWatchManagedVaultAddShareholderEvent,
    useWatchManagedVaultRemoveShareholderEvent,
} from "@/generated/wagmi";
import { useManagedVault } from "@/hooks/managed-vault/useManagedVault";
import { useShareholder } from "@/hooks/managed-vault/useShareholder";
import EvmAddress from "@/utils/evmAddress";
import {
    AddOutlined,
    CheckOutlined,
    RemoveOutlined,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

function ShareholderManagement() {
    const vault = useManagedVault();
    const [address, setAddress] = useState<string | null>(null);

    const account = useShareholder();

    const { data: isShareholder, refetch: refetchIsShareholder } =
        useReadManagedVaultIsShareholder({
            address: vault?.address,
            args: [address as EvmAddress],
        });

    useEffect(() => {
        refetchIsShareholder();
    }, [address, refetchIsShareholder]);

    const onValueChange = useCallback(
        (newValue: string | null) => {
            if (newValue == vault?.manager) setAddress(null);
            else setAddress(newValue);
        },
        [vault]
    );

    useWatchManagedVaultAddShareholderEvent({
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

export default ShareholderManagement;
