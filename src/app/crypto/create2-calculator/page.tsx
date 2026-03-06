import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Create2CalculatorTool from "./Create2CalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "CREATE2 Address Calculator",
  description:
    "Calculate deterministic smart contract addresses using CREATE2. Input deployer address, salt, and init code hash to predict deployment addresses.",
  path: "/crypto/create2-calculator",
});

export default function Create2CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "CREATE2 Address Calculator",
            url: "https://evmtools.dev/crypto/create2-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate deterministic smart contract addresses using CREATE2. Input deployer address, salt, and init code hash to predict deployment addresses.",
          }),
        }}
      />
      <ToolLayout slug="create2-calculator">
        <Create2CalculatorTool />
      </ToolLayout>
    </>
  );
}
