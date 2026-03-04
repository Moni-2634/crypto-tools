import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = generateToolMetadata({
  title: "BIP39 Mnemonic Phrases Explained",
  description:
    "Learn how BIP39 mnemonic seed phrases work, how they generate private keys, and best practices for securing your crypto wallet.",
  path: "/guides/bip39-explained",
});

export default function Bip39ExplainedPage() {
  return (
    <ToolLayout slug="bip39-explained">
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <p className="text-gray-400">Guide coming soon.</p>
      </div>
    </ToolLayout>
  );
}
