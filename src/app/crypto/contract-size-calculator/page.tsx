import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import ContractSizeCalculatorTool from "./ContractSizeCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Contract Size Calculator",
  description:
    "Check if your Solidity contract bytecode fits within the 24KB EIP-170 limit. Paste bytecode to see size, percentage used, and optimization tips.",
  path: "/crypto/contract-size-calculator",
});

export default function ContractSizeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Contract Size Calculator",
            url: "https://evmtools.dev/crypto/contract-size-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Check if your Solidity contract bytecode fits within the 24KB EIP-170 limit. Paste bytecode to see size, percentage used, and optimization tips.",
          }),
        }}
      />
      <ToolLayout slug="contract-size-calculator">
        <ContractSizeCalculatorTool />
      </ToolLayout>
    </>
  );
}
