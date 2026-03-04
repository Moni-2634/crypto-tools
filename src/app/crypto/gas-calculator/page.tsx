import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import GasCalculatorTool from "./GasCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Gas Fee Calculator",
  description:
    "Calculate Ethereum transaction costs from gas limit and gas price. Estimate fees in ETH and USD.",
  path: "/crypto/gas-calculator",
});

export default function GasCalculatorPage() {
  return (
    <ToolLayout slug="gas-calculator">
      <GasCalculatorTool />
    </ToolLayout>
  );
}
