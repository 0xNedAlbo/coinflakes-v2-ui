import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, localhost, arbitrum } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export function getConfig() {
    return createConfig({
        chains:
            process.env.NODE_ENV == "production"
                ? [mainnet, arbitrum]
                : [localhost, mainnet, arbitrum],
        connectors: [
            injected(),
            walletConnect({
                projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
                showQrModal: false,
            }),
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_ENDPOINT!),
            [localhost.id]: http(process.env.NEXT_PUBLIC_RPC_ENDPOINT!),
            [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC_ENDPOINT!),
        },
    });
}

declare module "wagmi" {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}
