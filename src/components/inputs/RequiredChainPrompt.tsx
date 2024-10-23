import { CHAIN_SLUGS } from "@/utils/constants";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import { Section } from "../common/Section";

export type RequiredChainPromptProps = {
    onChainConnected?: (connected: boolean) => void;
};

export function RequiredChainPrompt(props: RequiredChainPromptProps) {
    const [requiredChainId, setRequiredChainId] = useState<number>();
    const [requiredChainName, setRequiredChainName] = useState<string>();

    const { isConnected, chainId } = useAccount();

    const chains = useChains();
    const params = useParams();

    const { switchChain } = useSwitchChain();

    useEffect(() => {
        if (!params?.chain) {
            setRequiredChainId(undefined);
            setRequiredChainName(undefined);
        } else {
            const _chainId = CHAIN_SLUGS[params?.chain as string];
            setRequiredChainId(_chainId);
            setRequiredChainName(
                chains.find((chain) => chain.id == _chainId)?.name
            );
        }
    }, [chainId, params]);

    useEffect(() => {
        if (chainId === undefined || requiredChainId === undefined)
            props.onChainConnected?.(false);
        if (chainId != requiredChainId) props.onChainConnected?.(false);
        else props.onChainConnected?.(true);
    }, [chainId, requiredChainId]);

    function switchNetwork() {
        if (requiredChainId) {
            switchChain({ chainId: requiredChainId as any });
        }
    }

    return (
        isConnected &&
        chainId &&
        requiredChainId &&
        requiredChainId != chainId && (
            <Grid container mt={"1em"} marginTop={"3em"}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6} textAlign={"center"}>
                    <Section heading="You are connected to the wrong network...">
                        <Box textAlign={"center"}>
                            <Button variant="contained" onClick={switchNetwork}>
                                Switch to {requiredChainName}
                            </Button>
                        </Box>
                    </Section>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        )
    );
}
