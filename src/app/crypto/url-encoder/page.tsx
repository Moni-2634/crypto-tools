import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import UrlEncoderTool from "./UrlEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "URL Encoder / Decoder",
  description:
    "Encode and decode URL components online. Compare encodeURIComponent vs encodeURI, decode percent-encoded strings, and handle special characters for web development.",
  path: "/crypto/url-encoder",
});

export default function UrlEncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "URL Encoder / Decoder",
            url: "https://evmtools.dev/crypto/url-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode URL components online. Compare encodeURIComponent vs encodeURI, decode percent-encoded strings, and handle special characters for web development.",
          }),
        }}
      />
      <ToolLayout slug="url-encoder">
        <UrlEncoderTool />
      </ToolLayout>
    </>
  );
}
