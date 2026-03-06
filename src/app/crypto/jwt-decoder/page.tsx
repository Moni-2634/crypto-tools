import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import JwtDecoderTool from "./JwtDecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "JWT Decoder",
  description:
    "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, claims, expiration time, and validate token structure.",
  path: "/crypto/jwt-decoder",
});

export default function JwtDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JWT Decoder",
            url: "https://evmtools.dev/crypto/jwt-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, claims, expiration time, and validate token structure.",
          }),
        }}
      />
      <ToolLayout slug="jwt-decoder">
        <JwtDecoderTool />
      </ToolLayout>
    </>
  );
}
