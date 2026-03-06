import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Erc20DecoderTool from "./Erc20DecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ERC-20 Token Info Decoder",
  description:
    "Decode ERC-20 token function calls and event logs from raw data. Supports transfer, approve, transferFrom, and all standard ERC-20 functions and events.",
  path: "/crypto/erc20-decoder",
});

export default function Erc20DecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ERC-20 Token Info Decoder",
            url: "https://evmtools.dev/crypto/erc20-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode ERC-20 token function calls and event logs from raw data. Supports transfer, approve, transferFrom, and all standard ERC-20 functions and events.",
          }),
        }}
      />
      <ToolLayout slug="erc20-decoder">
        <Erc20DecoderTool />
      </ToolLayout>
    </>
  );
}
