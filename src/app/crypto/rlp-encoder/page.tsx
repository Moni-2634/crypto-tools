import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import RlpEncoderTool from "./RlpEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "RLP Encoder / Decoder",
  description:
    "Encode and decode Recursive Length Prefix (RLP) data online. The serialization format used by Ethereum for transactions, blocks, and state.",
  path: "/crypto/rlp-encoder",
});

const faqs = [
  {
    question: "What is RLP encoding in Ethereum?",
    answer:
      "RLP (Recursive Length Prefix) is the main serialization method used by Ethereum to encode nested arrays of binary data. It is used to serialize transactions, blocks, account state, and wire protocol messages. RLP only encodes structure (nested byte arrays) and leaves interpretation of the data to higher-level protocols.",
  },
  {
    question: "How does RLP encoding work?",
    answer:
      "RLP encoding follows simple rules: a single byte between 0x00 and 0x7F is its own encoding. Strings of 0-55 bytes are prefixed with 0x80 plus the length. Longer strings use a multi-byte length prefix starting at 0xB7. Lists work similarly, with prefixes starting at 0xC0 for short lists and 0xF7 for longer lists. These rules apply recursively for nested data.",
  },
  {
    question: "Where is RLP used in Ethereum?",
    answer:
      "RLP is used throughout Ethereum: transaction serialization before signing and hashing, block header encoding, account state encoding in the state trie, receipt encoding, and the Ethereum devp2p wire protocol. Understanding RLP is essential for working at the protocol level and for computing transaction hashes.",
  },
  {
    question: "What is the difference between RLP and ABI encoding?",
    answer:
      "RLP encodes arbitrary nested byte arrays for protocol-level serialization (transactions, blocks, state). ABI encoding is specifically for smart contract function calls and follows a different specification with 32-byte padding, type information, and offset pointers. RLP is more compact, while ABI encoding is designed for the EVM's word-based architecture.",
  },
  {
    question: "How do I RLP-encode an Ethereum transaction?",
    answer:
      "A legacy Ethereum transaction is RLP-encoded as a list of [nonce, gasPrice, gasLimit, to, value, data, v, r, s]. Each field is converted to its minimal byte representation, then the list is RLP-encoded. EIP-1559 transactions use a different structure prefixed with a type byte (0x02) before the RLP encoding.",
  },
  {
    question: "Can RLP encode integers and strings?",
    answer:
      "RLP encodes raw bytes, not typed data. Integers must first be converted to their big-endian byte representation with no leading zeros. Strings must be converted to UTF-8 bytes. The RLP encoding itself does not distinguish between integers, strings, or addresses - it only sees byte sequences and nested lists.",
  },
];

export default function RlpEncoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "RLP Encoder / Decoder",
            url: "https://evmtools.dev/crypto/rlp-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode Recursive Length Prefix (RLP) data online. The serialization format used by Ethereum for transactions, blocks, and state.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="rlp-encoder">
        <RlpEncoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This RLP Encoder / Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online RLP encoder and decoder helps you work with
              Ethereum&apos;s core serialization format. Use it to encode data
              for protocol-level operations or decode raw RLP data from
              transactions and blocks.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>To encode</strong>, enter your data as a JSON-style
                array of hex strings and nested arrays. For example,{" "}
                <code>[&quot;0x04&quot;, [&quot;0x01&quot;, &quot;0x02&quot;]]</code> encodes a list with a
                single byte and a nested list.
              </li>
              <li>
                <strong>To decode</strong>, paste RLP-encoded hex data (with or
                without the 0x prefix) and the tool will parse it into its
                nested structure, showing each element.
              </li>
              <li>
                <strong>Inspect the result</strong> to understand the structure,
                verify transaction encoding, or debug protocol-level data.
              </li>
              <li>
                <strong>Copy the output</strong> using the copy button for use
                in your scripts, tests, or protocol implementations.
              </li>
            </ol>
            <p>
              All encoding and decoding runs entirely in your browser. No data
              is sent to any server, ensuring your transaction data stays
              private.
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
              <strong>Transaction debugging</strong> &mdash; Decode raw signed
              transactions to inspect nonce, gas parameters, value, and
              signature components (v, r, s).
            </li>
            <li>
              <strong>Contract address derivation</strong> &mdash; RLP-encode
              the sender address and nonce to compute the expected address of a
              contract deployed via CREATE.
            </li>
            <li>
              <strong>Protocol development</strong> &mdash; Test RLP encoding
              and decoding when implementing Ethereum clients or protocol-level
              tools.
            </li>
            <li>
              <strong>Block header parsing</strong> &mdash; Decode RLP-encoded
              block headers to extract parent hash, state root, timestamp, and
              other fields.
            </li>
            <li>
              <strong>State trie analysis</strong> &mdash; Decode RLP-encoded
              account state (nonce, balance, storageRoot, codeHash) from
              Patricia-Merkle trie nodes.
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
              href="/crypto/abi-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ABI Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Ethereum smart contract function calls using
                ABI specifications.
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
                Generate Keccak256 hashes used for Ethereum addresses,
                transaction hashes, and storage slots.
              </p>
            </Link>
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
