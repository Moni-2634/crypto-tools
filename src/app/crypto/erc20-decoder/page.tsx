import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Erc20DecoderTool from "./Erc20DecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ERC-20 Token Info Decoder",
  description:
    "Decode ERC-20 token function calls and event logs from raw data. Supports transfer, approve, transferFrom, and all standard ERC-20 functions and events.",
  path: "/crypto/erc20-decoder",
});

const faqs = [
  {
    question: "What is the ERC-20 token standard?",
    answer:
      "ERC-20 is the most widely used token standard on Ethereum and EVM-compatible chains. It defines a set of functions (transfer, approve, transferFrom, balanceOf, allowance, totalSupply) and events (Transfer, Approval) that all compliant tokens must implement. This standard enables interoperability between tokens, wallets, and DeFi protocols.",
  },
  {
    question: "How do I decode an ERC-20 transfer?",
    answer:
      "An ERC-20 transfer call has the function selector 0xa9059cbb followed by two ABI-encoded parameters: the recipient address (32 bytes) and the amount (32 bytes as uint256). Paste the full calldata into this tool to see the decoded recipient and token amount in human-readable form.",
  },
  {
    question: "What is the difference between transfer and transferFrom?",
    answer:
      "transfer(address,uint256) sends tokens from the caller's balance. transferFrom(address,address,uint256) sends tokens from a specified address to another, requiring the caller to have an allowance via approve(). transferFrom is used by DEXes and DeFi protocols to move tokens on behalf of users.",
  },
  {
    question: "How do ERC-20 event logs work?",
    answer:
      "ERC-20 events (Transfer and Approval) are emitted during function execution and stored in transaction logs. Transfer events have three indexed topics: the event signature hash, from address, and to address, plus the amount as non-indexed data. Event logs are not stored in contract storage but are accessible via eth_getLogs.",
  },
  {
    question: "What are token decimals and why do they matter?",
    answer:
      "ERC-20 tokens use integer arithmetic with a decimals value (typically 18 for ETH-like tokens, 6 for USDC/USDT, 8 for WBTC). The raw uint256 value in calldata must be divided by 10^decimals to get the human-readable amount. For example, 1000000 in USDC (6 decimals) represents 1.0 USDC.",
  },
];

export default function Erc20DecoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ERC-20 Token Info Decoder",
            url: "https://evmtools.dev/crypto/erc20-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode ERC-20 token function calls and event logs from raw data. Supports transfer, approve, transferFrom, and all standard ERC-20 functions and events.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="erc20-decoder">
        <Erc20DecoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This ERC-20 Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool decodes raw calldata and event logs from ERC-20 token
              transactions into human-readable function calls and parameter
              values. It automatically recognizes all standard ERC-20 functions
              and events.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste the raw data</strong> &mdash; copy calldata from
                a token transaction (from Etherscan or your development tools)
                and paste it into the input field.
              </li>
              <li>
                <strong>Automatic detection</strong> &mdash; the tool
                identifies the function selector and matches it against known
                ERC-20 functions (transfer, approve, transferFrom, etc.).
              </li>
              <li>
                <strong>View decoded parameters</strong> &mdash; see the
                recipient address, token amount, spender, allowance, and other
                parameters in a clear format.
              </li>
              <li>
                <strong>Copy the decoded output</strong> for documentation,
                debugging, or audit reports.
              </li>
            </ol>
            <p>
              All decoding runs locally in your browser. No transaction data is
              sent to any server.
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
              <strong>Token transfer verification</strong> &mdash; Decode
              transfer calldata to confirm the correct recipient and amount
              before or after execution.
            </li>
            <li>
              <strong>Approval inspection</strong> &mdash; Verify approve()
              calldata to check what allowance is being granted to which
              spender address.
            </li>
            <li>
              <strong>DeFi debugging</strong> &mdash; Decode token interactions
              within complex DeFi transactions involving swaps, lending, and
              liquidity provision.
            </li>
            <li>
              <strong>Event log analysis</strong> &mdash; Parse Transfer and
              Approval event logs to track token movements and permission
              changes.
            </li>
            <li>
              <strong>Security review</strong> &mdash; Inspect token-related
              calldata in multi-sig proposals or governance actions before
              signing.
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
              href="/crypto/calldata-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Calldata Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode any Ethereum calldata with custom function signatures
                beyond ERC-20 standard functions.
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
                Convert between raw token amounts and human-readable values for
                any ERC-20 decimal configuration.
              </p>
            </Link>
            <Link
              href="/crypto/error-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Error Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode Solidity revert data when ERC-20 transactions fail to
                understand the error reason.
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
