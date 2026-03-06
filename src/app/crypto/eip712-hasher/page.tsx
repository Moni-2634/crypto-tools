import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Eip712HasherTool from "./Eip712HasherTool";

export const metadata: Metadata = generateToolMetadata({
  title: "EIP-712 Typed Data Hasher",
  description:
    "Hash EIP-712 typed structured data online. Compute domain separator, struct hash, and final signing hash for permits and gasless transactions.",
  path: "/crypto/eip712-hasher",
});

export default function Eip712HasherPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "EIP-712 Typed Data Hasher",
            url: "https://evmtools.dev/crypto/eip712-hasher",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Hash EIP-712 typed structured data online. Compute domain separator, struct hash, and final signing hash for permits and gasless transactions.",
          }),
        }}
      />
      <ToolLayout slug="eip712-hasher">
        <Eip712HasherTool />
      </ToolLayout>
    </>
  );
}
