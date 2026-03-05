import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import EthUnitConverterTool from "./EthUnitConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ETH Unit Converter",
  description:
    "Convert between Ethereum units: Wei, Gwei, and ETH. Essential for gas and transaction calculations.",
  path: "/crypto/eth-unit-converter",
});

export default function EthUnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ETH Unit Converter",
            url: "https://evmtools.dev/crypto/eth-unit-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between Ethereum units: Wei, Gwei, and ETH. Essential for gas and transaction calculations.",
          }),
        }}
      />
      <ToolLayout slug="eth-unit-converter">
        <EthUnitConverterTool />
      </ToolLayout>
    </>
  );
}
