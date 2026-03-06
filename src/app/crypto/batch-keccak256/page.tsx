import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import BatchKeccak256Tool from "./BatchKeccak256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "Batch Keccak256 Hasher",
  description:
    "Hash multiple inputs at once with Keccak256. Get hashes and function selectors for multiple function signatures, storage keys, or arbitrary text.",
  path: "/crypto/batch-keccak256",
});

const faqs = [
  {
    question: "Why would I need to hash multiple inputs at once?",
    answer:
      "Batch hashing saves time when working with smart contracts that have many functions or events. Instead of hashing signatures one at a time, you can paste an entire list and get all selectors and hashes instantly. This is useful when building ABI decoders, analyzing contract interfaces, or generating lookup tables.",
  },
  {
    question: "How do I batch-generate function selectors?",
    answer:
      "Enter one function signature per line (e.g., 'transfer(address,uint256)') and the tool computes the keccak256 hash and 4-byte selector for each. This is faster than hashing individually and lets you compare selectors side by side to check for collisions or build selector databases.",
  },
  {
    question: "What is a function selector collision?",
    answer:
      "A function selector collision occurs when two different function signatures produce the same 4-byte selector. Since selectors are only 4 bytes (2^32 possibilities), collisions are statistically possible. Solidity prevents collisions within a single contract at compile time, but cross-contract collisions can cause issues with proxy patterns and diamond proxies.",
  },
  {
    question: "Can I batch-hash storage keys for mappings?",
    answer:
      "Yes. You can enter pre-formatted keccak256 inputs (key concatenated with slot number in hex) one per line to compute multiple storage slot locations at once. This is useful when reading mapping values directly from contract storage using eth_getStorageAt.",
  },
  {
    question: "What input formats does the batch hasher support?",
    answer:
      "The batch hasher accepts plain text (UTF-8) inputs, one per line. Each line is independently hashed using Keccak256. For hex inputs, ensure you specify the hex input mode. Empty lines are ignored, making it easy to paste lists with spacing.",
  },
];

export default function BatchKeccak256Page() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Batch Keccak256 Hasher",
            url: "https://evmtools.dev/crypto/batch-keccak256",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Hash multiple inputs at once with Keccak256. Get hashes and function selectors for multiple function signatures, storage keys, or arbitrary text.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="batch-keccak256">
        <BatchKeccak256Tool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Batch Keccak256 Hasher
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online batch hasher lets you compute Keccak256 hashes
              for multiple inputs simultaneously. It is ideal for generating
              function selectors, event topics, and storage keys in bulk.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter multiple inputs</strong>, one per line. Each line
                is hashed independently using Keccak256.
              </li>
              <li>
                <strong>View results</strong> showing the full 32-byte hash and
                the 4-byte function selector for each input.
              </li>
              <li>
                <strong>Compare selectors</strong> side by side to check for
                collisions or verify your ABI specifications.
              </li>
              <li>
                <strong>Copy individual results</strong> or the entire output
                table for use in your development workflow.
              </li>
            </ol>
            <p>
              All hashing runs locally in your browser. No data is transmitted
              to any server, keeping your contract interfaces private.
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
              <strong>Contract ABI analysis</strong> &mdash; Paste all function
              signatures from a contract to generate a complete selector lookup
              table.
            </li>
            <li>
              <strong>Selector collision detection</strong> &mdash; Check
              multiple signatures to ensure no two produce the same 4-byte
              selector, critical for proxy contracts.
            </li>
            <li>
              <strong>Event topic generation</strong> &mdash; Hash multiple
              event signatures at once to build topic filters for log queries.
            </li>
            <li>
              <strong>Storage key computation</strong> &mdash; Batch-compute
              storage slot locations for multiple mapping keys or array indices.
            </li>
            <li>
              <strong>Whitelist hash generation</strong> &mdash; Hash multiple
              addresses or data entries for Merkle tree leaf construction.
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
              href="/crypto/keccak256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Keccak256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate a single Keccak256 hash with detailed output for
                Ethereum development.
              </p>
            </Link>
            <Link
              href="/crypto/function-selector"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Function Selector Lookup
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Look up function selectors and browse a table of common ERC-20
                and ERC-721 selectors.
              </p>
            </Link>
            <Link
              href="/crypto/event-hash-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Event Hash Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate keccak256 topic hashes for Solidity event signatures
                for filtering logs.
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
