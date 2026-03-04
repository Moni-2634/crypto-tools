import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import HexDecimalConverterTool from "./HexDecimalConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Hex / Decimal Converter",
  description:
    "Convert between hexadecimal and decimal numbers. Useful for Ethereum block numbers, transaction values, and calldata.",
  path: "/crypto/hex-decimal-converter",
});

export default function HexDecimalConverterPage() {
  return (
    <ToolLayout slug="hex-decimal-converter">
      <HexDecimalConverterTool />
    </ToolLayout>
  );
}
