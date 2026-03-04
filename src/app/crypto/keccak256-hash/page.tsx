import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Keccak256Tool from "./Keccak256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "Keccak256 Hash Generator",
  description:
    "Generate Keccak256 hashes online. The hash function used by Ethereum and Solidity for signatures, addresses, and storage.",
  path: "/crypto/keccak256-hash",
});

export default function Keccak256HashPage() {
  return (
    <ToolLayout slug="keccak256-hash">
      <Keccak256Tool />
    </ToolLayout>
  );
}
