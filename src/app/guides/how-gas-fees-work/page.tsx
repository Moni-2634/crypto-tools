import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = generateToolMetadata({
  title: "How Gas Fees Work",
  description:
    "A complete guide to Ethereum gas fees: what they are, how they are calculated, and how to optimize transaction costs.",
  path: "/guides/how-gas-fees-work",
});

export default function HowGasFeesWorkPage() {
  return (
    <ToolLayout slug="how-gas-fees-work">
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <p className="text-gray-400">Guide coming soon.</p>
      </div>
    </ToolLayout>
  );
}
