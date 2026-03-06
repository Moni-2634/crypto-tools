import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import GasCalculatorTool from "./GasCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Gas Fee Calculator",
  description:
    "Calculate Ethereum transaction costs from gas limit and gas price. Estimate fees in ETH and USD.",
  path: "/crypto/gas-calculator",
});

const faqs = [
  {
    question: "How are Ethereum gas fees calculated?",
    answer:
      "Ethereum gas fees are calculated as: gasUsed x gasPrice. Since EIP-1559, the fee structure is: gasUsed x (baseFee + priorityFee). The base fee is burned and adjusts dynamically based on network demand, while the priority fee (tip) goes to the block proposer. Total cost = gasUsed x effectiveGasPrice, converted from Wei to ETH.",
  },
  {
    question: "What is gas limit vs gas used?",
    answer:
      "Gas limit is the maximum amount of gas you are willing to spend on a transaction. Gas used is the actual gas consumed during execution. You set the gas limit when sending a transaction; unused gas is refunded. A simple ETH transfer uses exactly 21,000 gas, while contract interactions vary based on computation complexity.",
  },
  {
    question: "What is EIP-1559 and how does it affect gas fees?",
    answer:
      "EIP-1559 (London upgrade) introduced a base fee that adjusts automatically based on block utilization and a priority fee (tip) that users set. The base fee is burned, reducing ETH supply. Blocks target 50% capacity; if a block is more than 50% full, the base fee increases, and vice versa. This makes gas prices more predictable.",
  },
  {
    question: "How much gas does a typical transaction use?",
    answer:
      "A simple ETH transfer uses 21,000 gas. An ERC-20 token transfer typically uses 45,000-65,000 gas. A Uniswap swap uses around 150,000-300,000 gas. An NFT mint can use 100,000-250,000 gas. Complex DeFi interactions with multiple contract calls can use 500,000+ gas.",
  },
  {
    question: "How can I reduce gas costs?",
    answer:
      "Strategies to reduce gas costs include: timing transactions during low-demand periods (weekends, early morning UTC), using layer 2 solutions (Arbitrum, Optimism, Base) for cheaper execution, batching multiple operations into a single transaction, setting appropriate gas limits, and using gas tokens or meta-transactions where available.",
  },
];

export default function GasCalculatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gas Fee Calculator",
            url: "https://evmtools.dev/crypto/gas-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate Ethereum transaction costs from gas limit and gas price. Estimate fees in ETH and USD.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="gas-calculator">
        <GasCalculatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Gas Fee Calculator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool calculates the total cost of an Ethereum transaction
              based on gas usage and gas price. It shows the result in both ETH
              and USD for easy cost estimation.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter the gas limit or gas used</strong> &mdash; this
                is the number of gas units for your transaction (e.g., 21000
                for a simple transfer, 150000 for a swap).
              </li>
              <li>
                <strong>Enter the gas price</strong> in Gwei &mdash; check
                current gas prices on Etherscan or your wallet to input the
                base fee plus priority fee.
              </li>
              <li>
                <strong>View the total cost</strong> &mdash; the calculator
                shows the fee in ETH and estimates the USD equivalent using
                current ETH prices.
              </li>
              <li>
                <strong>Compare different scenarios</strong> by adjusting gas
                price or gas limit to find the optimal timing for your
                transaction.
              </li>
            </ol>
            <p>
              All calculations run locally in your browser. This tool is useful
              for budgeting transactions and comparing costs across different
              network conditions.
            </p>
          </div>
        </section>

        {/* Use Cases section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Transaction cost estimation</strong> &mdash; Calculate
              how much a swap, mint, or deployment will cost before executing
              it on mainnet.
            </li>
            <li>
              <strong>Budget planning</strong> &mdash; Estimate costs for
              batches of transactions like airdrops, multi-sig executions, or
              contract deployments.
            </li>
            <li>
              <strong>L1 vs L2 comparison</strong> &mdash; Compare gas costs
              between Ethereum mainnet and layer 2 networks to decide where to
              execute transactions.
            </li>
            <li>
              <strong>Development testing</strong> &mdash; Estimate gas costs
              for new smart contract functions during development to optimize
              before deployment.
            </li>
            <li>
              <strong>Historical analysis</strong> &mdash; Calculate what a
              transaction cost at historical gas prices for reporting and
              accounting purposes.
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/crypto/eth-unit-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ETH Unit Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between Wei, Gwei, and ETH for precise gas price and
                fee calculations.
              </p>
            </Link>
            <Link
              href="/crypto/contract-size-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Contract Size Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Check bytecode size to estimate deployment gas costs and
                ensure EIP-170 compliance.
              </p>
            </Link>
            <Link
              href="/crypto/token-unit-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Token Unit Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert token amounts between raw values and human-readable
                format for accurate fee calculations.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ToolLayout>
    </>
  );
}
