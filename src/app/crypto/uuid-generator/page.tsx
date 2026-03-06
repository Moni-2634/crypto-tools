import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import UuidGeneratorTool from "./UuidGeneratorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "UUID Generator",
  description:
    "Generate UUID v4 identifiers online. Create single or bulk UUIDs with options for uppercase, lowercase, and with or without hyphens. Validate UUID format.",
  path: "/crypto/uuid-generator",
});

export default function UuidGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UUID Generator",
            url: "https://evmtools.dev/crypto/uuid-generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate UUID v4 identifiers online. Create single or bulk UUIDs with options for uppercase, lowercase, and with or without hyphens. Validate UUID format.",
          }),
        }}
      />
      <ToolLayout slug="uuid-generator">
        <UuidGeneratorTool />
      </ToolLayout>
    </>
  );
}
