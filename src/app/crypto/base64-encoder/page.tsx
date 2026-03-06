import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Base64EncoderTool from "./Base64EncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Base64 Encoder / Decoder",
  description:
    "Encode and decode Base64 strings online. Supports text and hex input with URL-safe Base64 option for Ethereum development.",
  path: "/crypto/base64-encoder",
});

export default function Base64EncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Base64 Encoder / Decoder",
            url: "https://evmtools.dev/crypto/base64-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode Base64 strings online. Supports text and hex input with URL-safe Base64 option for Ethereum development.",
          }),
        }}
      />
      <ToolLayout slug="base64-encoder">
        <Base64EncoderTool />
      </ToolLayout>
    </>
  );
}
