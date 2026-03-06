import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Bytes32ConverterTool from "./Bytes32ConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Bytes32 / String Converter",
  description:
    "Convert between bytes32 hex, UTF-8 strings, numbers, and addresses. Visualize padding for Solidity bytes32 values.",
  path: "/crypto/bytes32-converter",
});

export default function Bytes32ConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Bytes32 / String Converter",
            url: "https://evmtools.dev/crypto/bytes32-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between bytes32 hex, UTF-8 strings, numbers, and addresses. Visualize padding for Solidity bytes32 values.",
          }),
        }}
      />
      <ToolLayout slug="bytes32-converter">
        <Bytes32ConverterTool />
      </ToolLayout>
    </>
  );
}
