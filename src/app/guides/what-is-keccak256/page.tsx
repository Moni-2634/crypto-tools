import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = generateToolMetadata({
  title: "What is Keccak256?",
  description:
    "Learn how Keccak256 hashing works, why Ethereum uses it instead of SHA-3, and how it secures addresses, signatures, and storage.",
  path: "/guides/what-is-keccak256",
});

export default function WhatIsKeccak256Page() {
  return (
    <ToolLayout slug="what-is-keccak256">
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <p className="text-gray-400">Guide coming soon.</p>
      </div>
    </ToolLayout>
  );
}
