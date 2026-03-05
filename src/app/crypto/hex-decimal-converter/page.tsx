import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import HexDecimalConverterTool from "./HexDecimalConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Hex / Decimal Converter",
  description:
    "Convert between hexadecimal and decimal numbers. Useful for Ethereum block numbers, transaction values, and calldata.",
  path: "/crypto/hex-decimal-converter",
});

export default function HexDecimalConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Hex / Decimal Converter",
            url: "https://evmtools.dev/crypto/hex-decimal-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between hexadecimal and decimal numbers. Useful for Ethereum block numbers, transaction values, and calldata.",
          }),
        }}
      />
      <ToolLayout slug="hex-decimal-converter">
        <HexDecimalConverterTool />
      </ToolLayout>
    </>
  );
}
