import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import ChecksumAddressTool from "./ChecksumAddressTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Checksum Address Converter",
  description:
    "Convert Ethereum addresses to EIP-55 checksummed format. Ensure your addresses are safe for transactions.",
  path: "/crypto/checksum-address",
});

export default function ChecksumAddressPage() {
  return (
    <ToolLayout slug="checksum-address">
      <ChecksumAddressTool />
    </ToolLayout>
  );
}
