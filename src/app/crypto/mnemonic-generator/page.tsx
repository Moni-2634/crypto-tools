import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import MnemonicTool from "./MnemonicTool";

export const metadata: Metadata = generateToolMetadata({
  title: "BIP39 Mnemonic Generator",
  description:
    "Generate secure BIP39 mnemonic seed phrases (12 or 24 words) for cryptocurrency wallets. Offline-capable for maximum security.",
  path: "/crypto/mnemonic-generator",
});

export default function MnemonicGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "BIP39 Mnemonic Generator",
            url: "https://evmtools.dev/crypto/mnemonic-generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate secure BIP39 mnemonic seed phrases (12 or 24 words) for cryptocurrency wallets. Offline-capable for maximum security.",
          }),
        }}
      />
      <ToolLayout slug="mnemonic-generator">
        <MnemonicTool />
      </ToolLayout>
    </>
  );
}
