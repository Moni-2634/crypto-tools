import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import EventHashCalculatorTool from "./EventHashCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Solidity Event Hash Calculator",
  description:
    "Calculate keccak256 hashes for Solidity event signatures. Get topic 0 values for filtering Ethereum logs and understanding event indexing.",
  path: "/crypto/event-hash-calculator",
});

const faqs = [
  {
    question: "What are Ethereum event logs?",
    answer:
      "Event logs are a way for smart contracts to emit data that is stored on the blockchain but not accessible to other contracts. Logs are indexed by topics (up to 4) and stored in the transaction receipt. They are significantly cheaper than storage writes and are the primary mechanism for dApps to track on-chain activity using filters and subscriptions.",
  },
  {
    question: "What is topic 0 in Ethereum event logs?",
    answer:
      "Topic 0 (also called topic[0]) is the keccak256 hash of the event signature. For example, the Transfer(address,address,uint256) event has topic 0 = 0xddf252ad... This hash uniquely identifies the event type and is used to filter logs. Anonymous events do not have a topic 0.",
  },
  {
    question: "How are indexed parameters stored in event topics?",
    answer:
      "Indexed parameters are stored in topics 1 through 3 (up to 3 indexed parameters per event). Value types like address, uint256, and bool are stored directly as 32-byte padded values. Reference types like string and bytes are stored as their keccak256 hash, which means the original value cannot be recovered from the log alone.",
  },
  {
    question: "What is the difference between indexed and non-indexed event parameters?",
    answer:
      "Indexed parameters are stored in log topics and can be used as filters when querying logs (e.g., find all Transfer events to a specific address). Non-indexed parameters are ABI-encoded together in the log data field and cannot be filtered. You can have at most 3 indexed parameters per event (4 topics total including topic 0).",
  },
  {
    question: "How do I filter Ethereum logs by event?",
    answer:
      "To filter logs, use the eth_getLogs or eth_subscribe JSON-RPC methods with a topics filter. Set topics[0] to the keccak256 hash of the event signature. You can also filter by indexed parameter values in topics[1] through topics[3]. This tool calculates the topic 0 hash you need for filtering.",
  },
  {
    question: "What are anonymous events in Solidity?",
    answer:
      "Anonymous events are declared with the 'anonymous' keyword and do not include the event signature hash as topic 0. This allows them to have up to 4 indexed parameters instead of 3. However, anonymous events cannot be filtered by event type using topic 0, making them harder to identify in log queries.",
  },
];

export default function EventHashCalculatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Solidity Event Hash Calculator",
            url: "https://evmtools.dev/crypto/event-hash-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate keccak256 hashes for Solidity event signatures. Get topic 0 values for filtering Ethereum logs and understanding event indexing.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="event-hash-calculator">
        <EventHashCalculatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Event Hash Calculator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool calculates the keccak256 hash (topic 0) for
              Solidity event signatures. Use it to build log filters, verify
              event topics, and understand how Ethereum logs are indexed.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter an event signature</strong> such as{" "}
                <code>Transfer(address,address,uint256)</code>. Use the
                canonical form with parameter types only (no parameter names or
                spaces).
              </li>
              <li>
                <strong>View the topic 0 hash</strong> &mdash; the full
                keccak256 hash of the event signature that identifies this event
                type in logs.
              </li>
              <li>
                <strong>Copy the hash</strong> to use in your log filter
                queries, subgraph definitions, or indexing code.
              </li>
              <li>
                <strong>Browse common events</strong> in the reference table to
                quickly find topic hashes for standard ERC-20 and ERC-721
                events.
              </li>
            </ol>
            <p>
              All hashing runs locally in your browser. No data is sent to any
              server.
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
              <strong>Log filtering</strong> &mdash; Get the topic 0 hash to
              filter specific events using eth_getLogs or eth_subscribe RPC
              calls.
            </li>
            <li>
              <strong>Subgraph development</strong> &mdash; Verify event topic
              hashes when defining event handlers in The Graph subgraph
              manifests.
            </li>
            <li>
              <strong>Block explorer analysis</strong> &mdash; Identify unknown
              events by comparing topic 0 values from transaction logs with
              known event signatures.
            </li>
            <li>
              <strong>Monitoring and alerting</strong> &mdash; Set up on-chain
              monitoring by filtering for specific event topics in real-time log
              subscriptions.
            </li>
            <li>
              <strong>Smart contract testing</strong> &mdash; Verify that
              emitted events match expected topic hashes in your test
              assertions.
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
              href="/crypto/function-selector"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Function Selector Lookup
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate 4-byte function selectors from Solidity function
                signatures using the same keccak256 method.
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
                Generate Keccak256 hashes for any input including event
                signatures, function signatures, and arbitrary data.
              </p>
            </Link>
            <Link
              href="/crypto/abi-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ABI Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode the non-indexed data field of event logs using ABI
                specifications.
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
