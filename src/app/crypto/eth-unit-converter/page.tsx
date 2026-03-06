import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import EthUnitConverterTool from "./EthUnitConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ETH Unit Converter",
  description:
    "Convert between Ethereum units: Wei, Gwei, and ETH. Essential for gas and transaction calculations.",
  path: "/crypto/eth-unit-converter",
});

const faqs = [
  {
    question: "What are the different Ethereum units?",
    answer:
      "Ethereum has several denominations of its native currency, similar to how dollars have cents. The smallest unit is Wei (1 ETH = 10^18 Wei). Gwei (gigawei) equals 10^9 Wei and is commonly used for gas prices. Other units include Kwei (10^3), Mwei (10^6), and Finney (10^15), though Wei, Gwei, and ETH are used most frequently.",
  },
  {
    question: "Why is Gwei used for gas prices?",
    answer:
      "Gas prices are expressed in Gwei because it provides a human-readable number for typical gas costs. A gas price of 20 Gwei is much easier to understand and compare than 20,000,000,000 Wei or 0.00000002 ETH. Gwei strikes the right balance for the range of values typically seen in gas pricing.",
  },
  {
    question: "How do I convert Wei to ETH?",
    answer:
      "To convert Wei to ETH, divide the Wei value by 10^18 (1,000,000,000,000,000,000). For example, 1,500,000,000,000,000,000 Wei = 1.5 ETH. In code, use libraries like ethers.js (formatEther) or viem (formatEther) to handle the large numbers accurately without floating-point errors.",
  },
  {
    question: "Why do smart contracts use Wei instead of ETH?",
    answer:
      "Smart contracts and the EVM use Wei (unsigned 256-bit integers) because the EVM does not support floating-point arithmetic. Using the smallest denomination avoids rounding errors and ensures exact calculations. All msg.value amounts, balances, and transfer values in Solidity are denominated in Wei.",
  },
  {
    question: "What is the maximum value in Wei?",
    answer:
      "Wei values are stored as uint256, which can hold up to 2^256 - 1 (approximately 1.16 x 10^77). The total ETH supply is around 120 million ETH (1.2 x 10^26 Wei), which is well within the uint256 range. This ensures there can never be an overflow in ETH-denominated calculations.",
  },
];

export default function EthUnitConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ETH Unit Converter",
            url: "https://evmtools.dev/crypto/eth-unit-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between Ethereum units: Wei, Gwei, and ETH. Essential for gas and transaction calculations.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="eth-unit-converter">
        <EthUnitConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This ETH Unit Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool converts between all Ethereum unit denominations
              instantly. Enter a value in any unit and see the equivalent in
              all other units. It handles arbitrarily large numbers without
              floating-point precision loss.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter a value</strong> in any field &mdash; Wei, Gwei,
                or ETH. The other fields update automatically in real time.
              </li>
              <li>
                <strong>Use Wei for smart contract values</strong> &mdash;
                paste raw uint256 values from contract calls or events to see
                the human-readable ETH equivalent.
              </li>
              <li>
                <strong>Use Gwei for gas prices</strong> &mdash; enter gas
                prices to convert them to Wei (for contract calls) or ETH (for
                cost estimation).
              </li>
              <li>
                <strong>Copy the converted value</strong> for use in your code,
                transactions, or calculations.
              </li>
            </ol>
            <p>
              All conversions run locally in your browser with arbitrary
              precision arithmetic. No data is sent to any server.
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
              <strong>Gas price conversion</strong> &mdash; Convert between
              Gwei and Wei when configuring transaction gas prices in code or
              wallet interfaces.
            </li>
            <li>
              <strong>Smart contract development</strong> &mdash; Convert
              ETH amounts to Wei for use in Solidity test assertions, contract
              parameters, and deployment scripts.
            </li>
            <li>
              <strong>Transaction analysis</strong> &mdash; Convert raw Wei
              values from transaction data and event logs into human-readable
              ETH amounts.
            </li>
            <li>
              <strong>DeFi calculations</strong> &mdash; Convert between units
              when calculating swap amounts, liquidity positions, and yield
              values.
            </li>
            <li>
              <strong>Documentation</strong> &mdash; Quickly convert values for
              technical documentation, blog posts, and developer tutorials.
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
              href="/crypto/gas-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Gas Fee Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate total transaction costs from gas limit and gas price
                in ETH and USD.
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
                Convert between raw and human-readable amounts for any ERC-20
                token with custom decimals.
              </p>
            </Link>
            <Link
              href="/crypto/epoch-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Epoch / Slot Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between Ethereum beacon chain epochs, slots, and
                timestamps.
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
