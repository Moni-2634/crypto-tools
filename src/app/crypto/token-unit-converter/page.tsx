import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import TokenUnitConverterTool from "./TokenUnitConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Token Unit Converter",
  description:
    "Convert between human-readable token amounts and raw values for any ERC-20 token. Supports custom decimals for USDC, WBTC, ETH, and more.",
  path: "/crypto/token-unit-converter",
});

export default function TokenUnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Token Unit Converter",
            url: "https://evmtools.dev/crypto/token-unit-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between human-readable token amounts and raw values for any ERC-20 token. Supports custom decimals for USDC, WBTC, ETH, and more.",
          }),
        }}
      />
      <ToolLayout slug="token-unit-converter">
        <TokenUnitConverterTool />
      </ToolLayout>
    </>
  );
}
