import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import AbiEncoderTool from "./AbiEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "ABI Encoder / Decoder",
  description:
    "Encode and decode Ethereum ABI data online. Input function signatures and parameters to generate calldata for smart contract interactions.",
  path: "/crypto/abi-encoder",
});

const faqs = [
  {
    question: "What is Ethereum ABI encoding?",
    answer:
      "ABI (Application Binary Interface) encoding is the standard way to encode data for Ethereum smart contract interactions. It converts human-readable function calls and parameters into the hexadecimal calldata format that the EVM (Ethereum Virtual Machine) understands. The encoding follows a strict specification defined in the Solidity ABI specification.",
  },
  {
    question: "How do I encode a function call for a smart contract?",
    answer:
      "To encode a function call, you need the function signature (e.g., 'transfer(address,uint256)') and the parameter values. The encoder computes the 4-byte function selector from the keccak256 hash of the signature, then ABI-encodes each parameter according to its type and appends them. The result is the complete calldata you can send in a transaction.",
  },
  {
    question: "What is the difference between ABI encoding and ABI decoding?",
    answer:
      "ABI encoding converts human-readable function names and parameters into raw hexadecimal calldata for the EVM. ABI decoding does the reverse — it takes raw calldata or return data and parses it back into readable types and values. Decoding requires knowing the function signature or ABI to interpret the data correctly.",
  },
  {
    question: "What types does ABI encoding support?",
    answer:
      "ABI encoding supports all Solidity types including uint8 through uint256, int8 through int256, address, bool, bytes1 through bytes32, fixed-size arrays, dynamic arrays, strings, bytes (dynamic), and tuples (structs). Each type has specific encoding rules for padding and alignment.",
  },
  {
    question: "How are dynamic types encoded in the ABI?",
    answer:
      "Dynamic types like strings, bytes, and dynamic arrays are encoded using an offset-pointer system. The head section contains a 32-byte offset pointing to where the data starts in the tail section. The tail section begins with a 32-byte length prefix followed by the actual data, padded to 32-byte boundaries.",
  },
  {
    question: "Can I use ABI encoding to interact with any EVM chain?",
    answer:
      "Yes. ABI encoding is a universal standard across all EVM-compatible blockchains including Ethereum, Polygon, Arbitrum, Optimism, BSC, Avalanche, and others. The same encoded calldata works on any chain that runs the EVM, making it the standard for cross-chain tooling.",
  },
];

export default function AbiEncoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ABI Encoder / Decoder",
            url: "https://evmtools.dev/crypto/abi-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode Ethereum ABI data online. Input function signatures and parameters to generate calldata for smart contract interactions.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="abi-encoder">
        <AbiEncoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This ABI Encoder / Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online ABI encoder and decoder helps you generate and
              parse Ethereum calldata for smart contract interactions. Whether
              you are preparing a transaction, debugging on-chain data, or
              building a dApp, follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter a function signature</strong> such as{" "}
                <code>transfer(address,uint256)</code> or paste a full JSON ABI
                to select from available functions.
              </li>
              <li>
                <strong>Provide parameter values</strong> for each argument in
                the function. The tool validates types and shows errors for
                invalid inputs like malformed addresses or out-of-range numbers.
              </li>
              <li>
                <strong>Click Encode</strong> to generate the complete calldata
                including the 4-byte function selector and encoded parameters.
              </li>
              <li>
                <strong>To decode</strong>, paste raw calldata into the decode
                tab along with the function signature, and the tool will parse
                each parameter back into its readable form.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. Your data is never sent
              to a server, making this tool safe for sensitive contract
              interactions and private key operations.
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
              <strong>Transaction preparation</strong> &mdash; Generate calldata
              for token transfers, approvals, and other contract interactions
              before sending through a wallet or multisig.
            </li>
            <li>
              <strong>Debugging failed transactions</strong> &mdash; Decode
              calldata from failed transactions on Etherscan to understand what
              parameters were passed and identify issues.
            </li>
            <li>
              <strong>Multisig proposals</strong> &mdash; Create encoded
              calldata for Gnosis Safe or other multisig wallet proposals that
              require raw transaction data.
            </li>
            <li>
              <strong>Smart contract testing</strong> &mdash; Verify that your
              encoding logic matches expected calldata before deploying
              contracts or scripts to mainnet.
            </li>
            <li>
              <strong>Cross-chain bridging</strong> &mdash; Encode messages and
              function calls for cross-chain protocols that require raw calldata
              payloads.
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
              href="/crypto/function-selector"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Function Selector Lookup
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate Solidity function selectors from signatures and browse
                common ERC-20 and ERC-721 selectors.
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
                Generate Keccak256 hashes used by Ethereum for function
                selectors, event topics, and storage slots.
              </p>
            </Link>
            <Link
              href="/crypto/json-formatter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JSON Formatter / Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Format and validate JSON ABI files before using them for
                encoding and decoding contract calls.
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
