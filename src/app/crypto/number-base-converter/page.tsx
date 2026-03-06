import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import NumberBaseConverterTool from "./NumberBaseConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Number Base Converter",
  description:
    "Convert numbers between binary, octal, decimal, and hexadecimal online. Supports arbitrarily large numbers with BigInt. Free, client-side base converter tool.",
  path: "/crypto/number-base-converter",
});

const faqs = [
  {
    question: "What is a number base (radix)?",
    answer:
      "A number base (or radix) is the number of unique digits used to represent numbers in a positional numeral system. The most common bases are binary (base 2, digits 0-1), octal (base 8, digits 0-7), decimal (base 10, digits 0-9), and hexadecimal (base 16, digits 0-9 and A-F). Each base represents the same values differently.",
  },
  {
    question: "How do I convert between binary and hexadecimal?",
    answer:
      "Each hexadecimal digit maps to exactly 4 binary digits (bits). To convert binary to hex, group the binary digits in sets of 4 from right to left and replace each group with the corresponding hex digit. For example, 1010 1111 in binary is AF in hexadecimal. This tool performs this conversion instantly for any number.",
  },
  {
    question: "Why is hexadecimal used in programming?",
    answer:
      "Hexadecimal is popular in programming because each hex digit represents exactly 4 bits, making it a compact way to represent binary data. It is used for memory addresses, color codes (e.g., #FF5733), character encoding, Ethereum addresses (0x...), transaction hashes, smart contract calldata, and low-level debugging.",
  },
  {
    question: "What is the largest number this tool can convert?",
    answer:
      "This tool uses JavaScript's BigInt, which supports arbitrarily large integers with no theoretical upper limit. You can convert numbers with hundreds or thousands of digits across all supported bases. This is especially useful for Ethereum development where 256-bit numbers (uint256) are common.",
  },
  {
    question: "How do I read binary numbers?",
    answer:
      "Binary numbers use only 0 and 1. Each position represents a power of 2, starting from the right: 1, 2, 4, 8, 16, 32, etc. For example, binary 1011 means (1x8) + (0x4) + (1x2) + (1x1) = 11 in decimal. The tool groups binary digits in sets of 4 for easier reading.",
  },
  {
    question: "What is the difference between this and the Hex/Decimal converter?",
    answer:
      "The Hex/Decimal converter is focused specifically on hexadecimal and decimal conversion with Ethereum-specific features. This Number Base Converter supports all four common bases (binary, octal, decimal, hexadecimal) and provides grouped digit display, bit/byte length information, and a common values reference table.",
  },
];

export default function NumberBaseConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Number Base Converter",
            url: "https://evmtools.dev/crypto/number-base-converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert numbers between binary, octal, decimal, and hexadecimal. Supports arbitrarily large numbers.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="number-base-converter">
        <NumberBaseConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Number Base Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool converts numbers between binary (base 2),
              octal (base 8), decimal (base 10), and hexadecimal (base 16)
              instantly. It supports arbitrarily large numbers.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select the input base</strong> &mdash; choose the
                number system of your input value (Binary, Octal, Decimal,
                or Hexadecimal).
              </li>
              <li>
                <strong>Enter your number</strong> &mdash; type or paste the
                number. You can include common prefixes (0x, 0b, 0o) which
                will be automatically stripped.
              </li>
              <li>
                <strong>View all conversions</strong> &mdash; the tool
                instantly shows the value in all four bases, with grouped
                digits for readability.
              </li>
              <li>
                <strong>Copy any result</strong> &mdash; use the copy button
                next to any conversion to copy it with the appropriate prefix.
              </li>
            </ol>
            <p>
              All processing happens client-side in your browser. No data is
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
              <strong>Programming and debugging</strong> &mdash; Convert
              between hex, binary, and decimal values when working with
              bitwise operations, memory addresses, or low-level code.
            </li>
            <li>
              <strong>Ethereum development</strong> &mdash; Convert hex
              values from calldata, storage slots, and transaction data to
              decimal or binary for analysis.
            </li>
            <li>
              <strong>Network and systems</strong> &mdash; Convert subnet
              masks, port numbers, and protocol values between different bases.
            </li>
            <li>
              <strong>Color codes</strong> &mdash; Convert hex color values
              to decimal RGB components.
            </li>
            <li>
              <strong>Education</strong> &mdash; Learn how number systems
              work by seeing the same value in all four common bases.
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
                Specialized hex to decimal converter with Ethereum-specific
                features.
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
                Convert between text, hexadecimal strings, and byte arrays.
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
                Encode and decode Base64 strings for data encoding.
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
