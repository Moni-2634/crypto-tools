import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import FunctionSelectorTool from "./FunctionSelectorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Function Selector Lookup",
  description:
    "Calculate Solidity function selectors from signatures using keccak256. Browse a table of 30+ common ERC-20, ERC-721, and Ownable selectors.",
  path: "/crypto/function-selector",
});

export default function FunctionSelectorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Function Selector Lookup",
            url: "https://evmtools.dev/crypto/function-selector",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate Solidity function selectors from signatures using keccak256. Browse a table of 30+ common ERC-20, ERC-721, and Ownable selectors.",
          }),
        }}
      />
      <ToolLayout slug="function-selector">
        <FunctionSelectorTool />
      </ToolLayout>
    </>
  );
}
