import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import RlpEncoderTool from "./RlpEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "RLP Encoder / Decoder",
  description:
    "Encode and decode Recursive Length Prefix (RLP) data online. The serialization format used by Ethereum for transactions, blocks, and state.",
  path: "/crypto/rlp-encoder",
});

export default function RlpEncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "RLP Encoder / Decoder",
            url: "https://evmtools.dev/crypto/rlp-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode Recursive Length Prefix (RLP) data online. The serialization format used by Ethereum for transactions, blocks, and state.",
          }),
        }}
      />
      <ToolLayout slug="rlp-encoder">
        <RlpEncoderTool />
      </ToolLayout>
    </>
  );
}
