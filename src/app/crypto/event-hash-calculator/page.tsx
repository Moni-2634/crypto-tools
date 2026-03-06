import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import EventHashCalculatorTool from "./EventHashCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Solidity Event Hash Calculator",
  description:
    "Calculate keccak256 hashes for Solidity event signatures. Get topic 0 values for filtering Ethereum logs and understanding event indexing.",
  path: "/crypto/event-hash-calculator",
});

export default function EventHashCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Solidity Event Hash Calculator",
            url: "https://evmtools.dev/crypto/event-hash-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate keccak256 hashes for Solidity event signatures. Get topic 0 values for filtering Ethereum logs and understanding event indexing.",
          }),
        }}
      />
      <ToolLayout slug="event-hash-calculator">
        <EventHashCalculatorTool />
      </ToolLayout>
    </>
  );
}
