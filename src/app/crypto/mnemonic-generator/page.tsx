import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import MnemonicTool from "./MnemonicTool";

export const metadata: Metadata = generateToolMetadata({
  title: "BIP39 Mnemonic Generator",
  description:
    "Generate secure BIP39 mnemonic seed phrases (12 or 24 words) for cryptocurrency wallets. Offline-capable for maximum security.",
  path: "/crypto/mnemonic-generator",
});

export default function MnemonicGeneratorPage() {
  return (
    <ToolLayout slug="mnemonic-generator">
      <MnemonicTool />
    </ToolLayout>
  );
}
