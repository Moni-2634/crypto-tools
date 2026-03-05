import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AbiEncoderTool from "./AbiEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ABI Encoder / Decoder",
  description:
    "Encode and decode Ethereum ABI data online. Input function signatures and parameters to generate calldata for smart contract interactions.",
  path: "/crypto/abi-encoder",
});

export default function AbiEncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ABI Encoder / Decoder",
            url: "https://evmtools.dev/crypto/abi-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode Ethereum ABI data online. Input function signatures and parameters to generate calldata for smart contract interactions.",
          }),
        }}
      />
      <ToolLayout slug="abi-encoder">
        <AbiEncoderTool />
      </ToolLayout>
    </>
  );
}
