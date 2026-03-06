import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import ErrorDecoderTool from "./ErrorDecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Solidity Error Decoder",
  description:
    "Decode Solidity revert data into human-readable error messages. Supports Error(string), Panic(uint256) codes, and custom errors.",
  path: "/crypto/error-decoder",
});

export default function ErrorDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Solidity Error Decoder",
            url: "https://evmtools.dev/crypto/error-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode Solidity revert data into human-readable error messages. Supports Error(string), Panic(uint256) codes, and custom errors.",
          }),
        }}
      />
      <ToolLayout slug="error-decoder">
        <ErrorDecoderTool />
      </ToolLayout>
    </>
  );
}
