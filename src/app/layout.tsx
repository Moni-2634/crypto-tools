import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://evmtools.dev"),
  title: "EVMTools - Free Ethereum & Crypto Developer Tools",
  description:
    "Free online tools for Ethereum developers: ABI encoder, Keccak256 hash, BIP39 mnemonic generator, gas calculator, unit converter, and more.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3427954361578062"
          crossOrigin="anonymous"
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100`}
      >
        <ThemeProvider>
          <Header />
          <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
            <Sidebar />
            <main className="min-w-0 flex-1">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
