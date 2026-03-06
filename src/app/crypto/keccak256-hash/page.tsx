import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Keccak256Tool from "./Keccak256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "Keccak256 Hash Generator",
  description:
    "Generate Keccak256 hashes online. The hash function used by Ethereum and Solidity for signatures, addresses, and storage.",
  path: "/crypto/keccak256-hash",
});

const faqs = [
  {
    question: "What is Keccak256 and how is it used in Ethereum?",
    answer:
      "Keccak256 is the cryptographic hash function at the core of Ethereum. It takes an arbitrary input and produces a fixed 32-byte (256-bit) hash. Ethereum uses Keccak256 for computing addresses from public keys, generating function selectors, calculating storage slots, creating event topic hashes, and building Merkle trees. It is technically different from the NIST SHA-3 standard, which uses different padding.",
  },
  {
    question: "What is the difference between Keccak256 and SHA-3?",
    answer:
      "Keccak256 and SHA-3 use the same underlying algorithm (Keccak) but different padding schemes. NIST added domain separation bits when standardizing SHA-3, so identical inputs produce different hashes. Ethereum was developed before SHA-3 was finalized and adopted the original Keccak256. This is why Solidity's keccak256() produces different output from a SHA-3 library.",
  },
  {
    question: "How does Solidity use keccak256 for function selectors?",
    answer:
      "Solidity computes a function selector by taking the first 4 bytes of the keccak256 hash of the function's canonical signature. For example, keccak256('transfer(address,uint256)') produces a hash, and the first 4 bytes (0xa9059cbb) become the selector. This selector is prepended to the encoded arguments in calldata to identify which function to call.",
  },
  {
    question: "How are Ethereum addresses derived from Keccak256?",
    answer:
      "An Ethereum address is derived by taking the keccak256 hash of the public key (64 bytes, without the 0x04 prefix) and then taking the last 20 bytes of the resulting hash. This creates the 40-character hex address. The EIP-55 checksum is also computed using keccak256 of the lowercase hex address.",
  },
  {
    question: "Can Keccak256 hashes be reversed?",
    answer:
      "No. Keccak256 is a one-way cryptographic hash function. It is computationally infeasible to determine the original input from a hash output. This property (preimage resistance) is what makes it suitable for commitments, proofs, and security-critical operations in Ethereum. You can only verify a hash by hashing the suspected input and comparing.",
  },
  {
    question: "How is Keccak256 used for Solidity storage slots?",
    answer:
      "Solidity uses keccak256 to compute storage slot locations for dynamic data. Mapping values are stored at keccak256(key . slot), where '.' is concatenation. Dynamic arrays store elements starting at keccak256(slot). This ensures storage locations are spread uniformly across the 2^256 address space, avoiding collisions.",
  },
];

export default function Keccak256HashPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Keccak256 Hash Generator",
            url: "https://evmtools.dev/crypto/keccak256-hash",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate Keccak256 hashes online. The hash function used by Ethereum and Solidity for signatures, addresses, and storage.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="keccak256-hash">
        <Keccak256Tool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Keccak256 Hash Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online Keccak256 hash generator computes hashes
              instantly for any input. It is the same hash function used
              throughout Ethereum for addresses, selectors, storage, and more.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter text or hex input</strong> into the input field.
                Select the input mode (UTF-8 text or hex bytes) depending on
                your data.
              </li>
              <li>
                <strong>View the hash output</strong> &mdash; the 32-byte
                Keccak256 hash appears instantly as you type.
              </li>
              <li>
                <strong>Copy the full hash</strong> or the first 4 bytes
                (function selector) using the copy buttons.
              </li>
              <li>
                <strong>Use the result</strong> for computing function
                selectors, verifying storage slots, or any other Ethereum
                development task.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. No data is sent to any
              server, making this safe for hashing sensitive data.
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
              <strong>Function selector calculation</strong> &mdash; Hash a
              Solidity function signature to get the 4-byte selector used in
              calldata.
            </li>
            <li>
              <strong>Storage slot computation</strong> &mdash; Calculate
              mapping and array storage slot locations for reading contract
              state directly.
            </li>
            <li>
              <strong>Event topic generation</strong> &mdash; Hash event
              signatures to get topic[0] for filtering logs in Ethereum nodes
              and subgraphs.
            </li>
            <li>
              <strong>Commit-reveal schemes</strong> &mdash; Generate commitment
              hashes for on-chain commit-reveal patterns in voting, auctions,
              and games.
            </li>
            <li>
              <strong>Address derivation verification</strong> &mdash; Verify
              that an Ethereum address is correctly derived from a public key by
              hashing and comparing.
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
              href="/crypto/batch-keccak256"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Batch Keccak256 Hasher
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Hash multiple inputs at once to quickly generate selectors and
                hashes for multiple function signatures.
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
                Calculate function selectors and browse a reference table of
                common ERC-20 and ERC-721 selectors.
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
                for log filtering.
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
