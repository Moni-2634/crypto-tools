import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import StorageSlotCalculatorTool from "./StorageSlotCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Storage Slot Calculator",
  description:
    "Calculate Solidity storage slots for variables, mappings, and nested mappings. Computes keccak256-based slot locations for EVM smart contracts.",
  path: "/crypto/storage-slot-calculator",
});

const faqs = [
  {
    question: "How does EVM storage work?",
    answer:
      "The EVM stores contract state in a key-value store where both keys (slots) and values are 32 bytes (256 bits). Each slot is addressed by a 256-bit integer. State variables declared in Solidity are assigned sequential slot numbers starting from 0, with multiple small variables packed into a single slot when possible.",
  },
  {
    question: "How are mapping storage slots calculated?",
    answer:
      "For a mapping at slot p, the storage slot for a key k is computed as keccak256(abi.encode(k, p)). The key and slot number are concatenated (ABI-encoded) and hashed with keccak256. This produces a unique slot for each key that is virtually guaranteed not to collide with other storage slots.",
  },
  {
    question: "How do nested mapping slots work?",
    answer:
      "For a nested mapping like mapping(address => mapping(uint256 => value)), the slot is computed in two steps. First, compute the slot for the outer key: slot1 = keccak256(abi.encode(outerKey, baseSlot)). Then compute the final slot using the inner key: slot2 = keccak256(abi.encode(innerKey, slot1)).",
  },
  {
    question: "How are dynamic array elements stored?",
    answer:
      "For a dynamic array at slot p, the array length is stored at slot p itself. The array elements start at slot keccak256(p), with element i located at slot keccak256(p) + i. Each element occupies one or more consecutive slots depending on the element size.",
  },
  {
    question: "What is storage variable packing in Solidity?",
    answer:
      "Solidity packs multiple state variables into a single 32-byte storage slot when they fit. For example, two uint128 variables declared consecutively share one slot. Variables larger than 16 bytes (like address or uint256) always start a new slot. Understanding packing is essential for gas optimization and correct slot calculation.",
  },
];

export default function StorageSlotCalculatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Storage Slot Calculator",
            url: "https://evmtools.dev/crypto/storage-slot-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate Solidity storage slots for variables, mappings, and nested mappings. Computes keccak256-based slot locations for EVM smart contracts.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="storage-slot-calculator">
        <StorageSlotCalculatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Storage Slot Calculator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool calculates the exact storage slot location for Solidity
              state variables, including simple variables, mappings, and nested
              mappings. It uses keccak256 hashing to replicate the EVM&apos;s
              storage layout rules.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select the storage type</strong> &mdash; choose between
                a simple variable (direct slot number), a mapping, or a nested
                mapping.
              </li>
              <li>
                <strong>Enter the base slot number</strong> &mdash; this is the
                position of the variable in your contract&apos;s storage layout
                (starting from 0 for the first state variable).
              </li>
              <li>
                <strong>Enter the mapping key(s)</strong> &mdash; for mappings,
                provide the key value (address, uint256, etc.) to calculate the
                specific storage location.
              </li>
              <li>
                <strong>View the computed slot</strong> &mdash; the tool shows
                the resulting 32-byte slot hash that you can use with
                eth_getStorageAt to read the value directly from the blockchain.
              </li>
            </ol>
            <p>
              All calculations run locally in your browser using standard
              keccak256 hashing and ABI encoding.
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
              <strong>Reading contract state directly</strong> &mdash; Calculate
              slot locations to read private variables using eth_getStorageAt
              RPC calls without needing public getter functions.
            </li>
            <li>
              <strong>Security auditing</strong> &mdash; Verify storage layouts
              during smart contract audits to ensure variables are stored where
              expected and proxy storage does not collide.
            </li>
            <li>
              <strong>Proxy contract verification</strong> &mdash; Confirm that
              implementation and proxy contracts use compatible storage layouts
              to prevent storage collision bugs.
            </li>
            <li>
              <strong>Forensic analysis</strong> &mdash; Investigate contract
              state at specific block heights by reading raw storage slots for
              post-incident analysis.
            </li>
            <li>
              <strong>Gas optimization</strong> &mdash; Understand variable
              packing to optimize storage layout and reduce gas costs for
              SSTORE and SLOAD operations.
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
                Decode raw transaction calldata to understand what function
                calls modify contract storage.
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
                Check contract bytecode size against the EIP-170 limit to
                ensure deployability.
              </p>
            </Link>
            <Link
              href="/crypto/create2-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                CREATE2 Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate deterministic contract deployment addresses using the
                CREATE2 opcode.
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
