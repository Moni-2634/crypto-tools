import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AbiEncoderTool from "./AbiEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ABI Encoder / Decoder",
  description:
    "Encode and decode Ethereum ABI data online. Input function signatures and parameters to generate calldata for smart contract interactions.",
  path: "/crypto/abi-encoder",
});

export default function AbiEncoderPage() {
  return (
    <ToolLayout slug="abi-encoder">
      <AbiEncoderTool />
    </ToolLayout>
  );
}
