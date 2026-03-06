import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import CalldataDecoderTool from "./CalldataDecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Calldata Decoder",
  description:
    "Decode raw Ethereum calldata hex into human-readable function calls and parameters. Paste calldata and an optional function signature to decode.",
  path: "/crypto/calldata-decoder",
});

export default function CalldataDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calldata Decoder",
            url: "https://evmtools.dev/crypto/calldata-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode raw Ethereum calldata hex into human-readable function calls and parameters. Paste calldata and an optional function signature to decode.",
          }),
        }}
      />
      <ToolLayout slug="calldata-decoder">
        <CalldataDecoderTool />
      </ToolLayout>
    </>
  );
}
