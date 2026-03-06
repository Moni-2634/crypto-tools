import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Sha256Tool from "./Sha256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "SHA-256 Hash Generator",
  description:
    "Generate SHA-256 hashes online. Compute secure cryptographic hashes from text or hex input using the Web Crypto API.",
  path: "/crypto/sha256-hash",
});

export default function Sha256HashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SHA-256 Hash Generator",
            url: "https://evmtools.dev/crypto/sha256-hash",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate SHA-256 hashes online. Compute secure cryptographic hashes from text or hex input using the Web Crypto API.",
          }),
        }}
      />
      <ToolLayout slug="sha256-hash">
        <Sha256Tool />
      </ToolLayout>
    </>
  );
}
