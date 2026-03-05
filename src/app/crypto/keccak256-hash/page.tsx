import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Keccak256Tool from "./Keccak256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "Keccak256 Hash Generator",
  description:
    "Generate Keccak256 hashes online. The hash function used by Ethereum and Solidity for signatures, addresses, and storage.",
  path: "/crypto/keccak256-hash",
});

export default function Keccak256HashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Keccak256 Hash Generator",
            url: "https://evmtools.dev/crypto/keccak256-hash",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate Keccak256 hashes online. The hash function used by Ethereum and Solidity for signatures, addresses, and storage.",
          }),
        }}
      />
      <ToolLayout slug="keccak256-hash">
        <Keccak256Tool />
      </ToolLayout>
    </>
  );
}
