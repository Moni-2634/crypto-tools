import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import BatchKeccak256Tool from "./BatchKeccak256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "Batch Keccak256 Hasher",
  description:
    "Hash multiple inputs at once with Keccak256. Get hashes and function selectors for multiple function signatures, storage keys, or arbitrary text.",
  path: "/crypto/batch-keccak256",
});

export default function BatchKeccak256Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Batch Keccak256 Hasher",
            url: "https://evmtools.dev/crypto/batch-keccak256",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Hash multiple inputs at once with Keccak256. Get hashes and function selectors for multiple function signatures, storage keys, or arbitrary text.",
          }),
        }}
      />
      <ToolLayout slug="batch-keccak256">
        <BatchKeccak256Tool />
      </ToolLayout>
    </>
  );
}
