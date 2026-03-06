import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import TokenUnitConverterTool from "./TokenUnitConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Token Unit Converter",
  description:
    "Convert between human-readable token amounts and raw values for any ERC-20 token. Supports custom decimals for USDC, WBTC, ETH, and more.",
  path: "/crypto/token-unit-converter",
});

const faqs = [
  {
    question: "What are ERC-20 token decimals?",
    answer:
      "ERC-20 token decimals define how many decimal places a token supports. Since the EVM only works with integers, decimals are a display convention. A token with 18 decimals stores 1.0 tokens as 1000000000000000000 (10^18) in its raw uint256 form. Common values: 18 (ETH, DAI, LINK), 6 (USDC, USDT), 8 (WBTC).",
  },
  {
    question: "How do I convert raw token values to human-readable amounts?",
    answer:
      "Divide the raw uint256 value by 10^decimals. For example, a USDC balance of 1500000 (6 decimals) equals 1.5 USDC (1500000 / 10^6). For ETH with 18 decimals, 2500000000000000000 equals 2.5 ETH. In code, use ethers.js formatUnits() or viem's formatUnits() to avoid floating-point errors.",
  },
  {
    question: "Why do different tokens have different decimals?",
    answer:
      "Token creators choose decimals based on the token's use case and precision requirements. ETH and most DeFi tokens use 18 decimals for maximum precision. Stablecoins like USDC and USDT use 6 decimals to mirror traditional currency precision. WBTC uses 8 decimals to match Bitcoin's satoshi subdivision.",
  },
  {
    question: "What happens if I use the wrong decimals?",
    answer:
      "Using incorrect decimals can result in sending the wrong amount of tokens. For example, if you enter a USDC amount assuming 18 decimals instead of 6, the actual value will be 10^12 times larger than intended. Always verify the token's decimals by checking the contract's decimals() function before making transfers.",
  },
  {
    question: "Can a token have 0 decimals?",
    answer:
      "Yes. Some tokens have 0 decimals, meaning each unit is indivisible. This is common for NFT-like fungible tokens, governance tokens where fractional voting is not desired, or tokens representing whole items. With 0 decimals, the raw value and the display value are identical.",
  },
];

export default function TokenUnitConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Token Unit Converter",
            url: "https://evmtools.dev/crypto/token-unit-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between human-readable token amounts and raw values for any ERC-20 token. Supports custom decimals for USDC, WBTC, ETH, and more.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="token-unit-converter">
        <TokenUnitConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Token Unit Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool converts between human-readable token amounts and their
              raw uint256 values for any ERC-20 token. It supports all decimal
              configurations from 0 to 18 and beyond.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select or enter the token decimals</strong> &mdash;
                choose a preset (18 for ETH/DAI, 6 for USDC/USDT, 8 for WBTC)
                or enter a custom decimal value.
              </li>
              <li>
                <strong>Enter a human-readable amount</strong> (e.g., 1.5) to
                see the raw uint256 value, or enter a raw value to see the
                human-readable equivalent.
              </li>
              <li>
                <strong>View the conversion</strong> &mdash; the tool shows
                both representations instantly, handling arbitrary precision
                without rounding errors.
              </li>
              <li>
                <strong>Copy the result</strong> for use in smart contract
                calls, test scripts, or transaction parameters.
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
              <strong>Smart contract parameters</strong> &mdash; Convert
              human-readable token amounts to raw uint256 values for function
              call arguments like transfer amounts and allowances.
            </li>
            <li>
              <strong>Event log interpretation</strong> &mdash; Convert raw
              uint256 values from Transfer and Approval events into
              human-readable token amounts.
            </li>
            <li>
              <strong>DeFi development</strong> &mdash; Calculate precise token
              amounts for swap parameters, liquidity amounts, and fee
              calculations across tokens with different decimals.
            </li>
            <li>
              <strong>Testing and debugging</strong> &mdash; Quickly convert
              between display amounts and raw values when writing tests or
              debugging token-related smart contract logic.
            </li>
            <li>
              <strong>Cross-token calculations</strong> &mdash; Compare amounts
              across tokens with different decimal configurations (e.g., USDC
              with 6 decimals vs DAI with 18 decimals).
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
                Convert between Wei, Gwei, and ETH for native Ethereum unit
                calculations.
              </p>
            </Link>
            <Link
              href="/crypto/erc20-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ERC-20 Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode ERC-20 token function calls and events to see raw
                transfer amounts and approvals.
              </p>
            </Link>
            <Link
              href="/crypto/gas-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Gas Fee Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate transaction costs for token transfers and DeFi
                interactions.
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
