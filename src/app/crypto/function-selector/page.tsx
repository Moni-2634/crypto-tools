import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import FunctionSelectorTool from "./FunctionSelectorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Function Selector Lookup",
  description:
    "Calculate Solidity function selectors from signatures using keccak256. Browse a table of 30+ common ERC-20, ERC-721, and Ownable selectors.",
  path: "/crypto/function-selector",
});

const faqs = [
  {
    question: "What is a Solidity function selector?",
    answer:
      "A function selector is the first 4 bytes of the keccak256 hash of a function's canonical signature. It identifies which function to call in a smart contract. For example, the selector for 'transfer(address,uint256)' is 0xa9059cbb. When you send a transaction to a contract, the first 4 bytes of calldata are the function selector.",
  },
  {
    question: "How is a function selector calculated?",
    answer:
      "Take the function name followed by parameter types in parentheses with no spaces (e.g., 'balanceOf(address)'). Compute the keccak256 hash of this UTF-8 string, then take the first 4 bytes (8 hex characters). This produces the selector that the EVM uses for function dispatch.",
  },
  {
    question: "What is the canonical form of a function signature?",
    answer:
      "The canonical form uses only the function name and parameter types without parameter names, return types, or visibility modifiers. Tuple types are expanded to their component types in parentheses. For example, 'function transfer(address to, uint256 amount) external returns (bool)' has the canonical form 'transfer(address,uint256)'.",
  },
  {
    question: "Can two functions have the same selector?",
    answer:
      "Yes, this is called a selector collision. Since selectors are only 4 bytes, there are about 4.3 billion possible values, and collisions exist. Solidity prevents collisions within a single contract at compile time. However, collisions across different contracts can be exploited in proxy patterns, which is why EIP-1967 and diamond proxies include collision checks.",
  },
  {
    question: "What are the most common ERC-20 function selectors?",
    answer:
      "Common ERC-20 selectors include: transfer(address,uint256) = 0xa9059cbb, approve(address,uint256) = 0x095ea7b3, transferFrom(address,address,uint256) = 0x23b872dd, balanceOf(address) = 0x70a08231, totalSupply() = 0x18160ddd, and allowance(address,address) = 0xdd62ed3e.",
  },
  {
    question: "How do I look up an unknown function selector?",
    answer:
      "You can search for known selectors in databases like 4byte.directory or Openchain. If the selector is not in any database, you cannot reverse it (keccak256 is one-way). This tool lets you compute selectors from signatures you suspect, so you can compare against the unknown selector.",
  },
];

export default function FunctionSelectorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Function Selector Lookup",
            url: "https://evmtools.dev/crypto/function-selector",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate Solidity function selectors from signatures using keccak256. Browse a table of 30+ common ERC-20, ERC-721, and Ownable selectors.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="function-selector">
        <FunctionSelectorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Function Selector Lookup
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool calculates Solidity function selectors from
              function signatures and provides a reference table of common
              selectors for ERC-20, ERC-721, and other standard interfaces.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter a function signature</strong> in canonical form,
                such as <code>transfer(address,uint256)</code>. Use only type
                names without parameter names or spaces.
              </li>
              <li>
                <strong>View the 4-byte selector</strong> and full keccak256
                hash computed from your signature.
              </li>
              <li>
                <strong>Browse the reference table</strong> of 30+ common
                selectors for ERC-20, ERC-721, and Ownable functions to quickly
                find what you need.
              </li>
              <li>
                <strong>Copy any selector</strong> for use in calldata
                construction, proxy implementation, or transaction analysis.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. No data is transmitted to
              any server.
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
              <strong>Transaction decoding</strong> &mdash; Identify which
              function was called by matching the first 4 bytes of transaction
              calldata against known selectors.
            </li>
            <li>
              <strong>Proxy contract development</strong> &mdash; Check for
              selector collisions when building proxy patterns, diamond proxies
              (EIP-2535), or transparent proxies.
            </li>
            <li>
              <strong>Low-level calls</strong> &mdash; Construct calldata
              manually using abi.encodeWithSelector in Solidity or equivalent
              in other languages.
            </li>
            <li>
              <strong>Interface verification</strong> &mdash; Verify that your
              contract implements the correct selectors for ERC-165 interface
              detection.
            </li>
            <li>
              <strong>Security auditing</strong> &mdash; Identify functions in
              bytecode by matching known selectors from the JUMPI dispatch
              table.
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
                Generate full Keccak256 hashes for function signatures, storage
                keys, and arbitrary data.
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
                Calculate keccak256 topic hashes for Solidity event signatures,
                similar to function selectors but for events.
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
                Encode complete calldata by combining function selectors with
                ABI-encoded parameters.
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
