import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, localhost } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export function getConfig() {
    return createConfig({
        chains: process.env.NODE_ENV == "production" ? [mainnet] : [localhost],
        connectors: [
            injected(),
            coinbaseWallet(),
            /*walletConnect({
                projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
            }),*/
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_ENDPOINT!),
            [localhost.id]: http(process.env.NEXT_PUBLIC_RPC_ENDPOINT!),
        },
    });
}

declare module "wagmi" {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}
