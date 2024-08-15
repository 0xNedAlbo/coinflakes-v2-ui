import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";

const robotoFont = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Coinflakes Vault v2",
    description: "Coinflakes Investment Vault",
    icons: [
        { rel: "icon", url: "/favicon.ico" },
        {
            rel: "apple-touch-icon",
            url: "/apple-touch-icon.png",
            sizes: "180x180",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/favicon-16x16.png",
        },
    ],
};

export default function RootLayout(props: { children: ReactNode }) {
    const initialState = cookieToInitialState(
        getConfig(),
        headers().get("cookie")
    );
    return (
        <html lang="en">
            <body className={robotoFont.className}>
                <Providers initialState={initialState}>
                    {props.children}
                </Providers>
            </body>
        </html>
    );
}
