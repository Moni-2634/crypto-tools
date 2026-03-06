import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Utf8HexConverterTool from "./Utf8HexConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "UTF-8 / Hex / Bytes Converter",
  description:
    "Convert between UTF-8 text, hexadecimal strings, and byte arrays. Essential for encoding and debugging Ethereum data.",
  path: "/crypto/utf8-hex-converter",
});

export default function Utf8HexConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UTF-8 / Hex / Bytes Converter",
            url: "https://evmtools.dev/crypto/utf8-hex-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between UTF-8 text, hexadecimal strings, and byte arrays. Essential for encoding and debugging Ethereum data.",
          }),
        }}
      />
      <ToolLayout slug="utf8-hex-converter">
        <Utf8HexConverterTool />
      </ToolLayout>
    </>
  );
}
