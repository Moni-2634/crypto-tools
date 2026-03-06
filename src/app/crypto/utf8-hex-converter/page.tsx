import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Utf8HexConverterTool from "./Utf8HexConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "UTF-8 / Hex / Bytes Converter",
  description:
    "Convert between UTF-8 text, hexadecimal strings, and byte arrays. Essential for encoding and debugging Ethereum data.",
  path: "/crypto/utf8-hex-converter",
});

const faqs = [
  {
    question: "What is UTF-8 encoding and why is it used in Ethereum?",
    answer:
      "UTF-8 is a variable-width character encoding that can represent every character in the Unicode standard. In Ethereum, UTF-8 is used when converting human-readable strings into bytes for storage in smart contracts, encoding function parameters, or creating metadata. Solidity's string type stores UTF-8 encoded data internally.",
  },
  {
    question: "How do I convert a string to hex for use in Solidity?",
    answer:
      "Enter your text in the UTF-8 input field and the tool converts each character to its hexadecimal byte representation. For example, 'hello' becomes 0x68656c6c6f. This hex value can be used directly in Solidity as a bytes literal or passed as calldata to a smart contract function that accepts bytes or string parameters.",
  },
  {
    question: "What is the difference between hex strings and byte arrays?",
    answer:
      "A hex string is a text representation of binary data using characters 0-9 and A-F, where each pair represents one byte. A byte array is the actual sequence of byte values (0-255). For example, the hex string '48656C6C6F' and the byte array [72, 101, 108, 108, 111] both represent the same data ('Hello' in ASCII/UTF-8).",
  },
  {
    question: "How are strings stored on the Ethereum blockchain?",
    answer:
      "Strings in Solidity are stored as dynamically-sized byte arrays using UTF-8 encoding. In contract storage, short strings (31 bytes or less) are stored in a single storage slot with the length encoded in the lowest-order byte. Longer strings use a separate storage layout with the length in the main slot and data in consecutive slots starting at the keccak256 hash of the slot number.",
  },
  {
    question: "Can I convert non-ASCII characters to hex?",
    answer:
      "Yes. This tool supports the full Unicode character set through UTF-8 encoding. Non-ASCII characters like emojis, Chinese characters, or accented letters are encoded as multi-byte sequences. For example, a single emoji can produce 4 bytes of hex data. This is important when calculating gas costs for storing strings on-chain.",
  },
];

export default function Utf8HexConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UTF-8 / Hex / Bytes Converter",
            url: "https://evmtools.dev/crypto/utf8-hex-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between UTF-8 text, hexadecimal strings, and byte arrays. Essential for encoding and debugging Ethereum data.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="utf8-hex-converter">
        <Utf8HexConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This UTF-8 / Hex / Bytes Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online converter translates between UTF-8 text,
              hexadecimal strings, and byte arrays. It is essential for
              Ethereum developers working with string encoding, calldata, and
              on-chain metadata.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter UTF-8 text</strong> to see its hexadecimal and
                byte array representations instantly.
              </li>
              <li>
                <strong>Paste a hex string</strong> (with or without 0x prefix)
                to decode it back to readable UTF-8 text and its byte values.
              </li>
              <li>
                <strong>Input byte values</strong> as a comma-separated list to
                convert them to hex and UTF-8.
              </li>
              <li>
                <strong>Copy any output</strong> using the copy button and use
                it in your smart contracts, scripts, or debugging tools.
              </li>
            </ol>
            <p>
              All conversions happen locally in your browser. No data is
              transmitted to any external server, keeping your information
              private and secure.
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
              <strong>Smart contract string encoding</strong> &mdash; Convert
              text to hex bytes for passing as calldata or storing in contract
              storage.
            </li>
            <li>
              <strong>Event log decoding</strong> &mdash; Decode hex data from
              non-indexed event parameters back to human-readable strings.
            </li>
            <li>
              <strong>NFT metadata</strong> &mdash; Convert metadata strings to
              hex for on-chain storage or decode hex metadata back to text.
            </li>
            <li>
              <strong>Transaction data inspection</strong> &mdash; Decode raw
              transaction input data to understand string parameters passed to
              contracts.
            </li>
            <li>
              <strong>Debugging encoding issues</strong> &mdash; Verify that
              strings are correctly encoded before submitting transactions to
              avoid failed calls.
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
                Convert between hexadecimal and decimal numbers for block
                numbers, gas values, and transaction data.
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
                Convert between bytes32 hex values, strings, numbers, and
                addresses with padding visualization.
              </p>
            </Link>
            <Link
              href="/crypto/base64-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Base64 Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Base64 strings with support for text and hex
                input modes.
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
