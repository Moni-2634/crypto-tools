import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import ErrorDecoderTool from "./ErrorDecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Solidity Error Decoder",
  description:
    "Decode Solidity revert data into human-readable error messages. Supports Error(string), Panic(uint256) codes, and custom errors.",
  path: "/crypto/error-decoder",
});

const faqs = [
  {
    question: "What is Solidity revert data?",
    answer:
      "When a Solidity transaction fails, the EVM returns revert data as a hex-encoded byte string. This data contains an error selector (first 4 bytes) followed by ABI-encoded error parameters. The standard Error(string) reverts include a human-readable message, while Panic(uint256) codes indicate specific runtime failures.",
  },
  {
    question: "What are Solidity Panic codes?",
    answer:
      "Panic codes are standardized uint256 values returned when Solidity encounters runtime errors. Common codes include: 0x01 (assert failure), 0x11 (arithmetic overflow/underflow), 0x12 (division by zero), 0x21 (invalid enum value), 0x22 (storage encoding error), 0x31 (pop on empty array), and 0x32 (array index out of bounds).",
  },
  {
    question: "What are custom errors in Solidity?",
    answer:
      "Custom errors (introduced in Solidity 0.8.4) allow developers to define named error types with parameters, like 'error InsufficientBalance(uint256 available, uint256 required)'. They use a 4-byte selector (same as functions) and are more gas-efficient than Error(string) reverts because they avoid storing the error string on-chain.",
  },
  {
    question: "How do I decode a failed transaction's error?",
    answer:
      "Copy the revert data from the failed transaction (available on Etherscan under 'More Details' or from your RPC call response). Paste it into this tool. The decoder identifies the error type (Error, Panic, or custom error) and shows the decoded message or parameters in human-readable form.",
  },
  {
    question: "Why does my transaction revert with no data?",
    answer:
      "A revert with empty data typically means the contract used a plain 'revert()' without a message, or the failure occurred in a low-level call (like a transfer to a contract without a receive function). It can also happen when calling a non-existent function on a contract that does not have a fallback function.",
  },
];

export default function ErrorDecoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Solidity Error Decoder",
            url: "https://evmtools.dev/crypto/error-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode Solidity revert data into human-readable error messages. Supports Error(string), Panic(uint256) codes, and custom errors.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="error-decoder">
        <ErrorDecoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Solidity Error Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool decodes Solidity revert data from failed Ethereum
              transactions into human-readable error messages. It automatically
              detects and decodes standard errors, panic codes, and custom
              errors.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Get the revert data</strong> &mdash; copy the hex
                output from a failed transaction on Etherscan, from your
                development console, or from an eth_call RPC response.
              </li>
              <li>
                <strong>Paste the hex data</strong> into the input field. It
                should start with &quot;0x&quot; followed by the error selector
                and encoded parameters.
              </li>
              <li>
                <strong>View the decoded error</strong> &mdash; the tool
                identifies whether it is an Error(string), Panic(uint256), or
                custom error and displays the decoded message or parameters.
              </li>
              <li>
                <strong>For custom errors</strong>, optionally provide the error
                signature (e.g., &quot;InsufficientBalance(uint256,uint256)&quot;)
                to get fully labeled parameter decoding.
              </li>
            </ol>
            <p>
              All decoding runs locally in your browser. No error data is sent
              to any external server.
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
              <strong>Failed transaction debugging</strong> &mdash; Quickly
              understand why a transaction reverted by decoding the error data
              returned by the EVM.
            </li>
            <li>
              <strong>Smart contract development</strong> &mdash; Test and
              verify that your custom errors return the expected parameters
              during development and testing.
            </li>
            <li>
              <strong>User support</strong> &mdash; Decode error data from user
              reports to identify the root cause of failed transactions in your
              dApp.
            </li>
            <li>
              <strong>Panic code identification</strong> &mdash; Translate
              numeric Panic codes into meaningful descriptions like
              &quot;arithmetic overflow&quot; or &quot;array out of bounds&quot;.
            </li>
            <li>
              <strong>Security analysis</strong> &mdash; Analyze revert data
              from exploit attempts to understand what checks failed and where.
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
                Decode the calldata of the failed transaction to understand what
                function was called.
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
                Decode ERC-20 token function calls that may have triggered the
                error.
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
                Estimate gas costs for retrying failed transactions with correct
                parameters.
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
