import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import UnixTimestampTool from "./UnixTimestampTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Unix Timestamp Converter",
  description:
    "Convert between Unix timestamps and human-readable dates. Includes common Ethereum timestamps like genesis block and The Merge.",
  path: "/crypto/unix-timestamp",
});

const faqs = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970 at 00:00:00 UTC. It provides a simple, timezone-independent way to represent a point in time as a single integer. Ethereum block timestamps use Unix timestamps.",
  },
  {
    question: "How are timestamps used in Ethereum smart contracts?",
    answer:
      "Solidity provides block.timestamp which returns the Unix timestamp of the current block as a uint256. Smart contracts use timestamps for time-locked operations, vesting schedules, auction deadlines, governance voting periods, and token unlock schedules. The timestamp is set by the block proposer and must be greater than the parent block's timestamp.",
  },
  {
    question: "What is the Year 2038 problem for Unix timestamps?",
    answer:
      "The Year 2038 problem affects systems storing Unix timestamps as 32-bit signed integers, which overflow on January 19, 2038. Ethereum avoids this because Solidity uses uint256, which can represent timestamps far beyond any practical limit. However, some off-chain systems and databases using 32-bit timestamps will be affected.",
  },
  {
    question: "What is the Ethereum genesis block timestamp?",
    answer:
      "The Ethereum genesis block (block 0) has a Unix timestamp of 1438269973, which corresponds to July 30, 2015 at 15:26:13 UTC. This marks the official launch of the Ethereum mainnet. The Merge (transition to Proof of Stake) occurred at timestamp 1663224162 on September 15, 2022.",
  },
  {
    question:
      "How do I convert between seconds and milliseconds timestamps?",
    answer:
      "Unix timestamps are traditionally in seconds, but JavaScript's Date.now() returns milliseconds. To convert milliseconds to seconds, divide by 1000 and round down. To convert seconds to milliseconds, multiply by 1000. Ethereum block timestamps are always in seconds.",
  },
];

export default function UnixTimestampPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Unix Timestamp Converter",
            url: "https://evmtools.dev/crypto/unix-timestamp",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between Unix timestamps and human-readable dates. Includes common Ethereum timestamps like genesis block and The Merge.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="unix-timestamp">
        <UnixTimestampTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Unix Timestamp Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online Unix timestamp converter makes it easy to work
              with epoch time, blockchain timestamps, and human-readable dates.
              It includes quick references for key Ethereum milestones.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter a Unix timestamp</strong> (in seconds) to convert
                it to a human-readable date and time in UTC and your local
                timezone.
              </li>
              <li>
                <strong>Select a date and time</strong> using the date picker to
                convert it to its Unix timestamp equivalent.
              </li>
              <li>
                <strong>Use the live clock</strong> to see the current Unix
                timestamp updating in real time.
              </li>
              <li>
                <strong>Copy the result</strong> to use in your smart contracts,
                scripts, or configuration files.
              </li>
            </ol>
            <p>
              All conversions happen locally in your browser. No data is sent to
              any external server.
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
              <strong>Smart contract timelocks</strong> &mdash; Calculate future
              Unix timestamps for setting unlock times, vesting cliffs, and
              governance delays in Solidity contracts.
            </li>
            <li>
              <strong>Block timestamp analysis</strong> &mdash; Convert block
              timestamps from Etherscan or JSON-RPC responses to understand when
              transactions and events occurred.
            </li>
            <li>
              <strong>Debugging time-dependent logic</strong> &mdash; Verify
              that timestamp comparisons in your contracts will behave correctly
              by converting between formats.
            </li>
            <li>
              <strong>API and database timestamps</strong> &mdash; Convert
              between Unix seconds, milliseconds, and ISO 8601 date strings for
              backend development.
            </li>
            <li>
              <strong>Event log analysis</strong> &mdash; Correlate on-chain
              events with real-world dates by converting block timestamps.
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
              href="/crypto/hex-decimal-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Hex / Decimal Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert hex block timestamps from JSON-RPC responses to decimal
                Unix timestamps.
              </p>
            </Link>
            <Link
              href="/crypto/keccak256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Keccak256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate Keccak256 hashes used by Ethereum for block hashes,
                transaction hashes, and more.
              </p>
            </Link>
            <Link
              href="/crypto/bytes32-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Bytes32 / String Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert timestamps and numbers to bytes32 format for Solidity
                storage and function parameters.
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
