import { Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useChains } from "wagmi";

export const CHAIN_SLUGS = {
    ethereum: 1,
    arbitrum: 42161,
    localhost: 1337,
} as { [key: string]: number };

export function RequiredChainPrompt() {
    const [requiredChainId, setRequiredChainId] = useState<number>();
    const [requiredChainName, setRequiredChainName] = useState<string>();

    const { isConnected, chainId } = useAccount();

    const chains = useChains();
    const params = useParams();
    const currentChainSlug = params?.chain;

    useEffect(() => {
        if (!currentChainSlug) {
            setRequiredChainId(undefined);
            setRequiredChainName(undefined);
        } else {
            const _chainId = CHAIN_SLUGS[currentChainSlug as string];
            setRequiredChainId(_chainId);
            setRequiredChainName(
                chains.find((chain) => chain.id == _chainId)?.name
            );
        }
    }, [chainId, currentChainSlug]);

    useEffect(() => {
        if (chainId === undefined || requiredChainId === undefined) {
            return;
        }
    }, [chainId, requiredChainId]);

    return (
        isConnected &&
        requiredChainId != chainId && (
            <Grid container mt={"1em"} marginTop={"3em"}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8} textAlign={"center"}>
                    <Typography variant="body1" color={"error"}>
                        Please switch your wallet to the {requiredChainName}{" "}
                        network.
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        )
    );
}
