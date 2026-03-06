import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import MerkleProofTool from "./MerkleProofTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Merkle Proof Generator",
  description:
    "Generate and verify Merkle proofs online. Build Merkle trees from leaf values, compute roots, and generate inclusion proofs for whitelists and allowlists.",
  path: "/crypto/merkle-proof-generator",
});

export default function MerkleProofGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Merkle Proof Generator",
            url: "https://evmtools.dev/crypto/merkle-proof-generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate and verify Merkle proofs online. Build Merkle trees from leaf values, compute roots, and generate inclusion proofs for whitelists and allowlists.",
          }),
        }}
      />
      <ToolLayout slug="merkle-proof-generator">
        <MerkleProofTool />
      </ToolLayout>
    </>
  );
}
