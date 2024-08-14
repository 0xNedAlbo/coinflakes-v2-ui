import { Box, Grid } from "@mui/material";
import Section from "./Section";
import {
    migrationAbi,
    migrationAddress,
    oldVaultAddress,
    useReadOldVaultAllowance,
    useReadOldVaultBalanceOf,
    useWatchMigrationEvent,
} from "@/generated/wagmi";
import { useAccount } from "wagmi";
import EvmAddress from "@/utils/evmAddress";
import { numberFormat } from "@/utils/formats";
import { useUnderlying } from "@/hooks/useUnderlying";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import SendTxButton from "./inputs/SendTxButton";
import Erc20ApproveButton from "./inputs/Erc20ApproveButton";

function MigrationSection() {
    const [canMigrate, setCanMigrate] = useState(false);
    const [allowance, setAllowance] = useState(0n);

    const account = useAccount();

    const { data: shares } = useReadOldVaultBalanceOf({
        args: [account?.address as EvmAddress],
    });

    const { data: initialAllowance } = useReadOldVaultAllowance({
        args: [account?.address as EvmAddress, oldVaultAddress],
    });

    useEffect(() => {
        if (shares === undefined) return;
        setCanMigrate(shares >= parseEther("1"));
    }, [shares, setCanMigrate]);

    useEffect(() => {
        if (initialAllowance !== undefined) setAllowance(initialAllowance);
    }, [initialAllowance]);

    const onAllowanceChange = (newAllowance: bigint) => {
        setAllowance(newAllowance);
    };

    useWatchMigrationEvent({
        eventName: "Migrated",
        onLogs: (logs) => {
            if (!logs?.length) return;
            if (!account) return;
            logs.forEach((logEvent) => {
                if (logEvent.args.receiver == account.address)
                    setTimeout(() => setCanMigrate(false), 5000);
            });
        },
    });

    return canMigrate ? (
        <Grid container mt={"4em"} mb={"4em"}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Section
                            heading="Share Migration"
                            headingAlign="center"
                        >
                            <Box mt="1em" textAlign={"left"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} textAlign={"center"}>
                                        You can migrate{" "}
                                        {numberFormat(shares, "", 2, 18)} shares
                                        from the old vault.
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={2} textAlign={"right"}>
                                        <Erc20ApproveButton
                                            amountNeeded={shares as bigint}
                                            owner={
                                                account?.address as EvmAddress
                                            }
                                            spender={migrationAddress}
                                            token={oldVaultAddress}
                                            onAllowanceChange={
                                                onAllowanceChange
                                            }
                                        ></Erc20ApproveButton>
                                    </Grid>
                                    <Grid item xs={2} textAlign={"left"}>
                                        <SendTxButton
                                            disabled={
                                                !allowance ||
                                                !shares ||
                                                allowance < shares
                                            }
                                            abi={migrationAbi}
                                            address={migrationAddress}
                                            functionName={"migrate"}
                                            args={[shares, account?.address]}
                                        >
                                            <>Migrate</>
                                        </SendTxButton>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                </Grid>
                            </Box>
                        </Section>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <></>
    );
}

export default MigrationSection;
