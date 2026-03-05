import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import GasCalculatorTool from "./GasCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Gas Fee Calculator",
  description:
    "Calculate Ethereum transaction costs from gas limit and gas price. Estimate fees in ETH and USD.",
  path: "/crypto/gas-calculator",
});

export default function GasCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gas Fee Calculator",
            url: "https://evmtools.dev/crypto/gas-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate Ethereum transaction costs from gas limit and gas price. Estimate fees in ETH and USD.",
          }),
        }}
      />
      <ToolLayout slug="gas-calculator">
        <GasCalculatorTool />
      </ToolLayout>
    </>
  );
}
