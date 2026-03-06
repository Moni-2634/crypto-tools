import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import StorageSlotCalculatorTool from "./StorageSlotCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Storage Slot Calculator",
  description:
    "Calculate Solidity storage slots for variables, mappings, and nested mappings. Computes keccak256-based slot locations for EVM smart contracts.",
  path: "/crypto/storage-slot-calculator",
});

export default function StorageSlotCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Storage Slot Calculator",
            url: "https://evmtools.dev/crypto/storage-slot-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate Solidity storage slots for variables, mappings, and nested mappings. Computes keccak256-based slot locations for EVM smart contracts.",
          }),
        }}
      />
      <ToolLayout slug="storage-slot-calculator">
        <StorageSlotCalculatorTool />
      </ToolLayout>
    </>
  );
}
