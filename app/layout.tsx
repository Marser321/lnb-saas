import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

import { COMPANY_INFO, SEO_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: {
        default: SEO_CONFIG.defaultTitle,
        template: SEO_CONFIG.titleTemplate,
    },
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.keywords,
    authors: [{ name: COMPANY_INFO.name }],
    creator: COMPANY_INFO.name,
    metadataBase: new URL(COMPANY_INFO.url),
    openGraph: {
        type: "website",
        locale: "es_UY",
        url: COMPANY_INFO.url,
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        siteName: COMPANY_INFO.name,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: COMPANY_INFO.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/icon.png",
        shortcut: "/icon.png",
        apple: "/icon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.className} bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors`}>
                {children}
                <CartDrawer />
                <WhatsAppButton />
            </body>
        </html>
    );
}
