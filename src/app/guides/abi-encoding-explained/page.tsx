import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = generateToolMetadata({
  title: "ABI Encoding Explained",
  description:
    "Understand how Ethereum ABI encoding works, from function selectors to parameter encoding. A complete guide for Solidity developers.",
  path: "/guides/abi-encoding-explained",
});

export default function AbiEncodingExplainedPage() {
  return (
    <ToolLayout slug="abi-encoding-explained">
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <p className="text-gray-400">Guide coming soon.</p>
      </div>
    </ToolLayout>
  );
}
