import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Bytes32ConverterTool from "./Bytes32ConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Bytes32 / String Converter",
  description:
    "Convert between bytes32 hex, UTF-8 strings, numbers, and addresses. Visualize padding for Solidity bytes32 values.",
  path: "/crypto/bytes32-converter",
});

const faqs = [
  {
    question: "What is bytes32 in Solidity?",
    answer:
      "bytes32 is a fixed-size value type in Solidity that stores exactly 32 bytes (256 bits) of data. It is the most commonly used fixed-size byte type because it matches the EVM's native word size. bytes32 is used for storage keys, hashes, identifiers, and packed data in smart contracts.",
  },
  {
    question: "How do I convert a string to bytes32 in Solidity?",
    answer:
      "In Solidity, you can convert a string to bytes32 using bytes32(bytes(myString)), but only if the string is 32 bytes or shorter. The string is left-padded (UTF-8 bytes start from the left, remaining bytes are zeros). For strings longer than 32 bytes, you need to use the dynamic bytes or string type instead.",
  },
  {
    question: "What is the difference between left-padding and right-padding?",
    answer:
      "Left-padding adds zeros to the beginning of the value (used for numbers and addresses in the EVM), while right-padding adds zeros to the end (used for strings and fixed-size byte arrays). In Solidity, bytes32 values from strings are right-padded, while bytes32 values from numbers are left-padded.",
  },
  {
    question: "Why is bytes32 more gas-efficient than string?",
    answer:
      "bytes32 fits in a single EVM storage slot (32 bytes) and is a value type, so operations are simple and cheap. The string type is dynamically-sized and can span multiple storage slots, requiring more complex (and expensive) storage operations. If your string is 32 characters or fewer, using bytes32 saves significant gas.",
  },
  {
    question: "How are Ethereum addresses stored in bytes32?",
    answer:
      "Ethereum addresses are 20 bytes long. When stored in a bytes32 slot, they are left-padded with 12 zero bytes to fill the 32-byte slot. For example, address 0xAbC...123 becomes 0x000000000000000000000000AbC...123 in bytes32 format. This is the same padding used in ABI encoding.",
  },
  {
    question: "Can I use bytes32 for ENS names?",
    answer:
      "ENS (Ethereum Name Service) uses bytes32 extensively. The namehash algorithm produces a bytes32 node identifier from domain names. Labels are stored as keccak256 hashes (also bytes32). This tool helps you inspect and convert between the hex representation and the readable form of these values.",
  },
];

export default function Bytes32ConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Bytes32 / String Converter",
            url: "https://evmtools.dev/crypto/bytes32-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between bytes32 hex, UTF-8 strings, numbers, and addresses. Visualize padding for Solidity bytes32 values.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="bytes32-converter">
        <Bytes32ConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Bytes32 / String Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online converter helps you work with Solidity bytes32
              values. Convert between hex, UTF-8 strings, numbers, and
              addresses while visualizing exactly how the data is padded in a
              32-byte slot.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter a hex value</strong> (with or without 0x prefix)
                to see it formatted as a full bytes32 value with padding
                visualized.
              </li>
              <li>
                <strong>Enter a UTF-8 string</strong> to see how it would be
                represented as a right-padded bytes32 value.
              </li>
              <li>
                <strong>Enter a number</strong> to see its left-padded bytes32
                representation as used in the EVM.
              </li>
              <li>
                <strong>Enter an address</strong> to see how it is left-padded
                to fill a 32-byte slot.
              </li>
              <li>
                <strong>Copy the result</strong> for use in your Solidity code,
                tests, or calldata construction.
              </li>
            </ol>
            <p>
              All conversions run locally in your browser. No data is
              transmitted to any server.
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
              <strong>Storage slot inspection</strong> &mdash; Decode bytes32
              values read from contract storage to understand what data they
              represent.
            </li>
            <li>
              <strong>Short string encoding</strong> &mdash; Convert strings of
              32 characters or fewer to bytes32 for gas-efficient on-chain
              storage.
            </li>
            <li>
              <strong>Hash comparison</strong> &mdash; Format Keccak256 hashes
              and other 32-byte values for comparison and debugging.
            </li>
            <li>
              <strong>ABI parameter preparation</strong> &mdash; Convert values
              to their padded bytes32 format to understand ABI encoding layout.
            </li>
            <li>
              <strong>ENS namehash inspection</strong> &mdash; Inspect bytes32
              node identifiers and label hashes used by the Ethereum Name
              Service.
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
                Convert between hex and decimal numbers for block numbers, gas
                values, and numeric bytes32 values.
              </p>
            </Link>
            <Link
              href="/crypto/utf8-hex-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                UTF-8 / Hex / Bytes Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between UTF-8 text, hex strings, and byte arrays for
                Ethereum data encoding.
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
                Generate 32-byte Keccak256 hashes for storage slots, selectors,
                and identifiers.
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
