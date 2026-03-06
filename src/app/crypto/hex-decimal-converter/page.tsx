import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import HexDecimalConverterTool from "./HexDecimalConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Hex / Decimal Converter",
  description:
    "Convert between hexadecimal and decimal numbers. Useful for Ethereum block numbers, transaction values, and calldata.",
  path: "/crypto/hex-decimal-converter",
});

const faqs = [
  {
    question: "Why does Ethereum use hexadecimal numbers?",
    answer:
      "Ethereum uses hexadecimal (base-16) because it maps directly to binary data at the byte level. Each hex digit represents exactly 4 bits, making it compact and easy to read raw blockchain data. Block numbers, transaction values, gas limits, and calldata are all represented in hex in JSON-RPC responses and on block explorers.",
  },
  {
    question: "How do I convert a hex number to decimal?",
    answer:
      "To convert hex to decimal, each digit is multiplied by 16 raised to its positional power. For example, 0xFF = 15 x 16^1 + 15 x 16^0 = 255. This tool handles the conversion instantly for numbers of any size, including large uint256 values used in Ethereum.",
  },
  {
    question: "What is the 0x prefix in Ethereum?",
    answer:
      "The 0x prefix indicates that the following characters are a hexadecimal number. It is a convention used across all EVM chains to distinguish hex values from decimal. For example, 0x10 is hex for 16 in decimal, not the number ten. Most Ethereum tools and libraries require the 0x prefix for hex inputs.",
  },
  {
    question: "How do I convert Wei to Ether using hex?",
    answer:
      "First convert the hex Wei value to decimal, then divide by 10^18. For example, 0xDE0B6B3A7640000 converts to 1,000,000,000,000,000,000 Wei, which equals 1 ETH. This tool handles the hex-to-decimal step, and you can then use a Wei converter for the unit conversion.",
  },
  {
    question: "What is the maximum value of a uint256 in hex?",
    answer:
      "The maximum uint256 value is 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF (64 hex digits), which equals 2^256 - 1 in decimal. This is approximately 1.16 x 10^77. This tool can convert the full range of uint256 values between hex and decimal.",
  },
];

export default function HexDecimalConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Hex / Decimal Converter",
            url: "https://evmtools.dev/crypto/hex-decimal-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between hexadecimal and decimal numbers. Useful for Ethereum block numbers, transaction values, and calldata.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="hex-decimal-converter">
        <HexDecimalConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Hex / Decimal Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online converter instantly translates between
              hexadecimal and decimal number formats. It is essential for
              Ethereum developers who need to interpret block numbers, gas
              values, token amounts, and raw calldata.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter a hex value</strong> (with or without the 0x
                prefix) to convert it to its decimal equivalent.
              </li>
              <li>
                <strong>Enter a decimal number</strong> to convert it to
                hexadecimal format with the 0x prefix.
              </li>
              <li>
                <strong>Copy the result</strong> using the copy button and use
                it in your code, RPC calls, or block explorer queries.
              </li>
            </ol>
            <p>
              The converter supports arbitrarily large numbers including full
              uint256 values. Everything runs locally in your browser with no
              data sent to any server.
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
              <strong>Block number conversion</strong> &mdash; Convert hex block
              numbers from JSON-RPC responses (e.g., 0x1234AB) to
              human-readable decimal format.
            </li>
            <li>
              <strong>Gas and Wei values</strong> &mdash; Translate hex gas
              prices, gas limits, and Wei amounts from transaction receipts into
              decimal for analysis.
            </li>
            <li>
              <strong>Calldata inspection</strong> &mdash; Convert hex values
              embedded in calldata parameters to understand numeric arguments
              passed to smart contracts.
            </li>
            <li>
              <strong>Token amounts</strong> &mdash; Decode hex-encoded token
              transfer amounts from event logs and transaction data.
            </li>
            <li>
              <strong>Storage slot values</strong> &mdash; Interpret raw storage
              slot reads from eth_getStorageAt which return values in hex.
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
              href="/crypto/utf8-hex-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                UTF-8 / Hex / Bytes Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between UTF-8 text, hex strings, and byte arrays for
                encoding and debugging Ethereum data.
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
                Convert between bytes32 hex, UTF-8 strings, numbers, and
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
