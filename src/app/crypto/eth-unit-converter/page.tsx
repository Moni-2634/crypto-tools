import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import EthUnitConverterTool from "./EthUnitConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ETH Unit Converter",
  description:
    "Convert between Ethereum units: Wei, Gwei, and ETH. Essential for gas and transaction calculations.",
  path: "/crypto/eth-unit-converter",
});

export default function EthUnitConverterPage() {
  return (
    <ToolLayout slug="eth-unit-converter">
      <EthUnitConverterTool />
    </ToolLayout>
  );
}
