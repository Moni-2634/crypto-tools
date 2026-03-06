import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Base64EncoderTool from "./Base64EncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Base64 Encoder / Decoder",
  description:
    "Encode and decode Base64 strings online. Supports text and hex input with URL-safe Base64 option for Ethereum development.",
  path: "/crypto/base64-encoder",
});

const faqs = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 is a binary-to-text encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, /). It converts every 3 bytes of input into 4 ASCII characters, making binary data safe for transmission through text-based protocols like HTTP, email, and JSON. The output is approximately 33% larger than the input.",
  },
  {
    question: "What is URL-safe Base64?",
    answer:
      "URL-safe Base64 replaces the + and / characters with - and _ respectively, and typically omits the = padding. This variant is safe for use in URLs and filenames without percent-encoding. It is commonly used in JWTs (JSON Web Tokens), data URIs, and API parameters where standard Base64 characters would cause issues.",
  },
  {
    question: "How is Base64 used in NFTs and on-chain data?",
    answer:
      "On-chain NFTs use Base64 to encode metadata and SVG images directly in the token URI. The tokenURI returns a data URI like 'data:application/json;base64,...' containing the Base64-encoded JSON metadata, which itself may contain Base64-encoded SVG or image data. This enables fully on-chain NFTs without external storage.",
  },
  {
    question: "What is the difference between Base64 and hex encoding?",
    answer:
      "Base64 uses 64 characters and is more space-efficient, producing output that is 33% larger than the input. Hex encoding uses only 16 characters (0-9, A-F) and doubles the size of the input. Ethereum primarily uses hex encoding for addresses, hashes, and calldata, while Base64 is more common for metadata, images, and web APIs.",
  },
  {
    question: "Can I encode binary files with Base64?",
    answer:
      "Yes. Base64 can encode any binary data including images, PDFs, and compiled bytecode. However, be aware that Base64 increases the data size by approximately 33%. For on-chain storage, this overhead translates directly to higher gas costs, so it is important to minimize data before Base64 encoding.",
  },
];

export default function Base64EncoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Base64 Encoder / Decoder",
            url: "https://evmtools.dev/crypto/base64-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode Base64 strings online. Supports text and hex input with URL-safe Base64 option for Ethereum development.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="base64-encoder">
        <Base64EncoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Base64 Encoder / Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online Base64 tool lets you encode and decode data in
              both standard and URL-safe Base64 formats. It supports text and
              hex input modes for maximum flexibility.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select your input mode</strong> &mdash; choose between
                text (UTF-8) or hex input depending on your data format.
              </li>
              <li>
                <strong>Enter or paste your data</strong> into the input field.
                For hex input, you can include or omit the 0x prefix.
              </li>
              <li>
                <strong>Click Encode</strong> to convert your input to Base64,
                or <strong>click Decode</strong> to convert Base64 back to its
                original form.
              </li>
              <li>
                <strong>Toggle URL-safe mode</strong> if you need Base64 output
                that is safe for URLs and filenames.
              </li>
              <li>
                <strong>Copy the result</strong> for use in your code, APIs, or
                on-chain metadata.
              </li>
            </ol>
            <p>
              All encoding and decoding happens locally in your browser. No data
              leaves your machine.
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
              <strong>On-chain NFT metadata</strong> &mdash; Encode JSON
              metadata and SVG images as Base64 data URIs for fully on-chain
              NFTs.
            </li>
            <li>
              <strong>JWT token inspection</strong> &mdash; Decode Base64
              segments of JWT tokens to inspect claims and payloads.
            </li>
            <li>
              <strong>API data encoding</strong> &mdash; Encode binary data or
              complex objects for safe transmission in HTTP headers, query
              parameters, or JSON payloads.
            </li>
            <li>
              <strong>Smart contract bytecode</strong> &mdash; Convert between
              hex bytecode and Base64 for storage or display in different
              contexts.
            </li>
            <li>
              <strong>Data URI creation</strong> &mdash; Generate data URIs for
              embedding images, fonts, or other assets directly in HTML or
              contract metadata.
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
                encoding Ethereum data.
              </p>
            </Link>
            <Link
              href="/crypto/jwt-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JWT Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode and inspect JSON Web Tokens to view header, payload, and
                signature claims.
              </p>
            </Link>
            <Link
              href="/crypto/url-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                URL Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode URL components for safe transmission in query
                strings and API requests.
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
