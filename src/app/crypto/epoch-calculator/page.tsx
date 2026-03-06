import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import EpochCalculatorTool from "./EpochCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Ethereum Epoch / Slot Calculator",
  description:
    "Convert between Ethereum beacon chain epochs, slots, timestamps, and dates. Live current epoch and slot display with notable epoch references.",
  path: "/crypto/epoch-calculator",
});

export default function EpochCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Ethereum Epoch / Slot Calculator",
            url: "https://evmtools.dev/crypto/epoch-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between Ethereum beacon chain epochs, slots, timestamps, and dates. Live current epoch and slot display with notable epoch references.",
          }),
        }}
      />
      <ToolLayout slug="epoch-calculator">
        <EpochCalculatorTool />
      </ToolLayout>
    </>
  );
}
