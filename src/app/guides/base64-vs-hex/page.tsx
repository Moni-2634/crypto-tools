import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "Base64 vs Hex Encoding: Complete Comparison | EVMTools",
  description:
    "Compare Base64 and hexadecimal encoding: size overhead, character sets, use cases, and when to choose each. Essential guide for developers working with binary data.",
  keywords: [
    "base64 vs hex",
    "hex vs base64",
    "base64 or hexadecimal",
    "encoding comparison",
    "base64 encoding",
    "hexadecimal encoding",
    "binary to text encoding",
    "base64 overhead",
    "hex encoding size",
    "data encoding formats",
  ],
  openGraph: {
    title: "Base64 vs Hex Encoding: Complete Comparison | EVMTools",
    description:
      "Compare Base64 and hexadecimal encoding: size overhead, character sets, use cases, and when to choose each. Essential guide for developers working with binary data.",
    url: `${SITE_URL}/guides/base64-vs-hex`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 vs Hex Encoding: Complete Comparison",
    description:
      "Compare Base64 and hexadecimal encoding: size overhead, character sets, use cases, and when to choose each. Essential guide for developers working with binary data.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/base64-vs-hex`,
  },
};

export default function Base64VsHexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Base64 vs Hex Encoding: Complete Comparison",
    description:
      "Compare Base64 and hexadecimal encoding: size overhead, character sets, use cases, and when to choose each. Essential guide for developers working with binary data.",
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    url: `${SITE_URL}/guides/base64-vs-hex`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/base64-vs-hex`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Which is more space-efficient, Base64 or hex?",
      answer:
        "Base64 is more space-efficient. Base64 expands data by approximately 33% (4 characters per 3 bytes), while hexadecimal doubles the data size (2 characters per byte, or a 100% increase). For 1 MB of binary data, hex encoding produces ~2 MB while Base64 produces ~1.33 MB.",
    },
    {
      question: "Why does Ethereum use hex encoding instead of Base64?",
      answer:
        "Ethereum uses hexadecimal encoding because hex maps directly to bytes (2 hex chars = 1 byte), making it trivial to inspect individual bytes in addresses, transaction data, and storage values. This byte-level visibility is essential for debugging smart contracts and understanding ABI-encoded data. The 0x prefix convention also makes hex values immediately recognizable.",
    },
    {
      question: "When should I use Base64 encoding?",
      answer:
        "Use Base64 when you need to embed binary data in text-based formats: data URIs in HTML/CSS, email attachments (MIME), JSON payloads containing binary data, JWTs, and HTTP basic authentication. Base64 is also preferred when size efficiency matters more than human readability.",
    },
    {
      question: "Can Base64 and hex represent the same data?",
      answer:
        "Yes, both are lossless encodings of binary data. Any binary data can be encoded as either hex or Base64, and converted between the two without data loss. They are just different text representations of the same underlying bytes. For example, the bytes [0x48, 0x65, 0x6C] can be represented as '48656C' in hex or 'SGVs' in Base64.",
    },
    {
      question: "Is Base64 encoding the same as encryption?",
      answer:
        "No. Base64 is an encoding scheme, not encryption. It provides zero security — anyone can decode a Base64 string instantly. Base64 merely converts binary data to a text-safe format for transport. Never use Base64 to 'hide' sensitive data like passwords or API keys.",
    },
  ]);

  return (
    <ToolLayout slug="base64-vs-hex">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="prose-custom space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Base64 and hexadecimal (hex) are the two most common ways to
            represent binary data as text. Both are essential tools in a
            developer&apos;s toolkit, but they serve different purposes and have
            different tradeoffs. Hex is the language of blockchain, networking,
            and low-level debugging. Base64 is the language of web data
            transfer, email, and embedded media. This guide explains how each
            works, compares their overhead, and helps you choose the right one.
          </p>
        </section>

        {/* How They Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Each Encoding Works
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Hexadecimal Encoding
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Hexadecimal represents each byte as two characters from a 16-symbol
            alphabet: 0-9 and a-f (or A-F). Each hex character encodes exactly 4
            bits (a nibble), so one byte requires exactly two hex characters:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Binary:  01001000  01100101  01101100  01101100  01101111
Hex:        48        65        6c        6c        6f
Text:        H         e         l         l         o

"Hello" = 48656c6c6f (10 hex chars for 5 bytes)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Try it yourself with our{" "}
            <Link
              href="/crypto/hex-decimal-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Hex / Decimal Converter
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Base64 Encoding
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Base64 uses a 64-symbol alphabet (A-Z, a-z, 0-9, +, /) to encode
            binary data. It processes 3 bytes (24 bits) at a time, splitting
            them into four 6-bit groups, each mapped to one Base64 character:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Binary: 01001000 01100101 01101100 01101100 01101111
        |  6 bits |  6 bits |  6 bits |  6 bits | ...

3 bytes "Hel" → 4 Base64 chars "SGVs"
2 bytes "lo"  → 4 Base64 chars "bG8=" (padded with =)

"Hello" = SGVsbG8= (8 Base64 chars for 5 bytes)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Try it with our{" "}
            <Link
              href="/crypto/base64-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Base64 Encoder / Decoder
            </Link>
            .
          </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Base64 vs Hex: Comparison Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Hexadecimal
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Base64
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Alphabet</td>
                  <td className="px-4 py-3">16 symbols (0-9, a-f)</td>
                  <td className="px-4 py-3">64 symbols (A-Z, a-z, 0-9, +, /)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Bits per character</td>
                  <td className="px-4 py-3">4 bits</td>
                  <td className="px-4 py-3">6 bits</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Size overhead</td>
                  <td className="px-4 py-3">100% (doubles the size)</td>
                  <td className="px-4 py-3">~33% increase</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Encoding of 1 byte</td>
                  <td className="px-4 py-3">2 characters</td>
                  <td className="px-4 py-3">~1.33 characters (+ padding)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Padding</td>
                  <td className="px-4 py-3">None needed</td>
                  <td className="px-4 py-3">= padding (for 3-byte alignment)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Byte-level readability</td>
                  <td className="px-4 py-3">Excellent (2 chars = 1 byte)</td>
                  <td className="px-4 py-3">Poor (no byte alignment)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">URL safe</td>
                  <td className="px-4 py-3">Yes</td>
                  <td className="px-4 py-3">No (+ and / need encoding; use base64url)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Case sensitive</td>
                  <td className="px-4 py-3">No (0xAB = 0xab)</td>
                  <td className="px-4 py-3">Yes (A differs from a)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Size Overhead */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Size Overhead Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most practical difference is size. Here is how the same binary
            data compares across both encodings:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Raw Data Size
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Hex Encoded
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Base64 Encoded
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">20 bytes (ETH address)</td>
                  <td className="px-4 py-3">40 chars (+ 0x prefix)</td>
                  <td className="px-4 py-3">28 chars</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">32 bytes (hash)</td>
                  <td className="px-4 py-3">64 chars</td>
                  <td className="px-4 py-3">44 chars</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">256 bytes</td>
                  <td className="px-4 py-3">512 chars</td>
                  <td className="px-4 py-3">344 chars</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1 KB</td>
                  <td className="px-4 py-3">2 KB</td>
                  <td className="px-4 py-3">1.33 KB</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">1 MB</td>
                  <td className="px-4 py-3">2 MB</td>
                  <td className="px-4 py-3">1.33 MB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            For data-heavy applications like embedded images or file transfers,
            Base64&apos;s 33% overhead is significantly better than hex&apos;s
            100%. However, hex&apos;s simplicity makes it preferred when human
            readability and debugging are priorities.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            When to Use Each Encoding
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Use Hex When
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Working with blockchain
              </strong>
              : Ethereum addresses, transaction hashes, calldata, and storage
              values are all hex-encoded with the 0x prefix. The byte-level
              readability of hex is essential for understanding ABI encoding
              and debugging transactions.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Debugging network protocols
              </strong>
              : Packet dumps, hex editors, and protocol analyzers use hex
              because each byte is visually distinct and easy to count.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Color codes and low-level values
              </strong>
              : CSS colors (#FF5733), memory addresses, and hardware registers
              use hexadecimal natively.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Cryptographic output
              </strong>
              : Hash digests (SHA-256, MD5, Keccak256) are conventionally
              displayed in hex for easy byte-level inspection.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Use Base64 When
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Embedding binary in text
              </strong>
              : Data URIs for images in HTML/CSS, inline fonts, and SVGs all use
              Base64 because it is more size-efficient than hex.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Email attachments
              </strong>
              : MIME encoding for email attachments uses Base64 to safely
              transmit binary files through text-only email protocols.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                JWTs and API tokens
              </strong>
              : JSON Web Tokens use Base64url encoding for their header and
              payload sections.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Sending binary in JSON
              </strong>
              : Since JSON has no binary type, Base64 is the standard way to
              include binary data in JSON payloads (e.g., file uploads,
              cryptographic keys).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                HTTP Basic Authentication
              </strong>
              : The Authorization header encodes username:password in Base64.
            </li>
          </ul>
        </section>

        {/* Base64 Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Base64 Variants
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Standard Base64 uses + and / characters, which are not safe in URLs.
            There are several variants to know about:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Standard Base64
              </strong>
              : Uses A-Z, a-z, 0-9, +, / with = padding. Defined in RFC 4648.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Base64url
              </strong>
              : Replaces + with - and / with _. No padding. Used in JWTs, URL
              parameters, and filenames. Also defined in RFC 4648.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                MIME Base64
              </strong>
              : Same alphabet as standard, but inserts line breaks every 76
              characters. Used in email encoding.
            </li>
          </ul>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Hex in Blockchain */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hex Encoding in Blockchain Development
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In Ethereum and EVM-compatible blockchains, hexadecimal is the
            standard encoding. Every piece of on-chain data is represented in
            hex:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Address:     0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18
Tx Hash:     0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060
Calldata:    0xa9059cbb000000000000000000000000...
Block Number: 0x10F447 (= 1,111,111 in decimal)
Storage Slot: 0x0000000000000000000000000000000000000000000000000000000000000001`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The 0x prefix is a convention (not part of the encoding itself)
            that distinguishes hex values from decimal numbers. Without it,
            &quot;100&quot; could mean 100 (decimal) or 256 (hex). Use our{" "}
            <Link
              href="/crypto/hex-decimal-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Hex / Decimal Converter
            </Link>{" "}
            to translate between these representations.
          </p>
        </section>

        {/* Not Encryption */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Encoding Is Not Encryption
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A critical distinction: neither Base64 nor hex provides any
            security. Both are fully reversible transformations with no secret
            key involved. Anyone who sees a Base64 or hex string can decode it
            instantly. Never use encoding as a substitute for encryption. If
            you need to protect data:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Use <strong className="text-gray-900 dark:text-white">AES-256</strong> or{" "}
              <strong className="text-gray-900 dark:text-white">ChaCha20</strong> for
              symmetric encryption.
            </li>
            <li>
              Use <strong className="text-gray-900 dark:text-white">RSA</strong> or{" "}
              <strong className="text-gray-900 dark:text-white">ECDSA</strong> for
              asymmetric encryption and signatures.
            </li>
            <li>
              The encrypted ciphertext can then be encoded in Base64 or hex for
              safe text transport.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Which is more space-efficient, Base64 or hex?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Base64 is more space-efficient. Base64 expands data by
              approximately 33% (4 characters per 3 bytes), while hexadecimal
              doubles the data size (2 characters per byte, or a 100% increase).
              For 1 MB of binary data, hex encoding produces ~2 MB while Base64
              produces ~1.33 MB.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Why does Ethereum use hex encoding instead of Base64?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Ethereum uses hexadecimal encoding because hex maps directly to
              bytes (2 hex chars = 1 byte), making it trivial to inspect
              individual bytes in addresses, transaction data, and storage
              values. This byte-level visibility is essential for debugging
              smart contracts and understanding ABI-encoded data. The 0x prefix
              convention also makes hex values immediately recognizable.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              When should I use Base64 encoding?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Use Base64 when you need to embed binary data in text-based
              formats: data URIs in HTML/CSS, email attachments (MIME), JSON
              payloads containing binary data, JWTs, and HTTP basic
              authentication. Base64 is also preferred when size efficiency
              matters more than human readability.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can Base64 and hex represent the same data?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes, both are lossless encodings of binary data. Any binary data
              can be encoded as either hex or Base64, and converted between the
              two without data loss. They are just different text
              representations of the same underlying bytes. For example, the
              bytes [0x48, 0x65, 0x6C] can be represented as
              &quot;48656C&quot; in hex or &quot;SGVs&quot; in Base64.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is Base64 encoding the same as encryption?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              No. Base64 is an encoding scheme, not encryption. It provides zero
              security &mdash; anyone can decode a Base64 string instantly.
              Base64 merely converts binary data to a text-safe format for
              transport. Never use Base64 to &quot;hide&quot; sensitive data
              like passwords or API keys.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try Our Encoding Tools
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Encode and decode data with our free online tools. Use the{" "}
            <Link
              href="/crypto/base64-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Base64 Encoder / Decoder
            </Link>{" "}
            for Base64 conversion, the{" "}
            <Link
              href="/crypto/hex-decimal-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Hex / Decimal Converter
            </Link>{" "}
            for number base conversions, or the{" "}
            <Link
              href="/crypto/utf8-hex-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              UTF-8 / Hex / Bytes Converter
            </Link>{" "}
            for text-to-hex transformations.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools &amp; Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/crypto/base64-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Base64 Encoder / Decoder
              </Link>{" "}
              &mdash; Encode and decode Base64 strings with URL-safe option
            </li>
            <li>
              <Link
                href="/crypto/hex-decimal-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Hex / Decimal Converter
              </Link>{" "}
              &mdash; Convert between hexadecimal and decimal numbers
            </li>
            <li>
              <Link
                href="/crypto/utf8-hex-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                UTF-8 / Hex / Bytes Converter
              </Link>{" "}
              &mdash; Convert between text, hex, and byte arrays
            </li>
            <li>
              <Link
                href="/crypto/number-base-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Number Base Converter
              </Link>{" "}
              &mdash; Convert between binary, octal, decimal, and hex
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
