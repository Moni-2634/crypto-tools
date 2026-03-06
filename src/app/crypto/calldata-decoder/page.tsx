import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import CalldataDecoderTool from "./CalldataDecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Calldata Decoder",
  description:
    "Decode raw Ethereum calldata hex into human-readable function calls and parameters. Paste calldata and an optional function signature to decode.",
  path: "/crypto/calldata-decoder",
});

const faqs = [
  {
    question: "What is Ethereum calldata?",
    answer:
      "Calldata is the hex-encoded data sent along with an Ethereum transaction to invoke a function on a smart contract. It contains the 4-byte function selector (derived from keccak256 of the function signature) followed by ABI-encoded parameters. For example, an ERC-20 transfer encodes the recipient address and amount in the calldata.",
  },
  {
    question: "How is a function selector calculated?",
    answer:
      "A function selector is the first 4 bytes of the keccak256 hash of the function's canonical signature. For example, keccak256('transfer(address,uint256)') produces a hash whose first 4 bytes (0xa9059cbb) identify the transfer function. The selector is always the first 4 bytes (8 hex characters) of the calldata.",
  },
  {
    question: "How do I decode calldata without the ABI?",
    answer:
      "If you know the function signature (e.g., 'transfer(address,uint256)'), you can provide it to decode the parameters. Without any ABI or signature, you can still identify the function selector (first 4 bytes) and look it up in databases like 4byte.directory. The remaining bytes can be split into 32-byte chunks to inspect raw parameter values.",
  },
  {
    question: "What is ABI encoding?",
    answer:
      "ABI (Application Binary Interface) encoding is the standard way Ethereum encodes function calls and their parameters into bytes. Each parameter is padded to 32 bytes. Static types (uint256, address, bool) are encoded inline, while dynamic types (string, bytes, arrays) use an offset pointer to their data location.",
  },
  {
    question: "Can I decode multi-call or batch transaction calldata?",
    answer:
      "Yes, if you know the outer function signature (such as multicall(bytes[]) or aggregate((address,bytes)[])), the tool can decode the top-level parameters. The inner calls are encoded as bytes arrays that can each be decoded separately by pasting them back into the tool.",
  },
];

export default function CalldataDecoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calldata Decoder",
            url: "https://evmtools.dev/crypto/calldata-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode raw Ethereum calldata hex into human-readable function calls and parameters. Paste calldata and an optional function signature to decode.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="calldata-decoder">
        <CalldataDecoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Calldata Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool decodes raw Ethereum transaction calldata into
              human-readable function calls and parameters. It is essential for
              debugging transactions and understanding what a contract call
              actually does.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste the calldata</strong> &mdash; copy the hex-encoded
                calldata from a transaction on Etherscan or from your
                development tools. It should start with &quot;0x&quot;.
              </li>
              <li>
                <strong>Optionally provide the function signature</strong>{" "}
                &mdash; if you know the function (e.g.,
                &quot;transfer(address,uint256)&quot;), enter it to get fully
                labeled parameter decoding.
              </li>
              <li>
                <strong>View decoded parameters</strong> &mdash; the tool
                displays the function selector, each parameter with its type and
                decoded value.
              </li>
              <li>
                <strong>Copy the decoded output</strong> for documentation,
                debugging, or sharing with your team.
              </li>
            </ol>
            <p>
              All decoding runs locally in your browser. No transaction data is
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
              <strong>Transaction debugging</strong> &mdash; Decode failed
              transaction calldata to understand what function was called and
              with what parameters.
            </li>
            <li>
              <strong>Security analysis</strong> &mdash; Inspect calldata from
              suspicious transactions to verify what actions are being performed
              on a contract.
            </li>
            <li>
              <strong>Multi-sig review</strong> &mdash; Decode pending multi-sig
              transaction calldata to verify the proposed action before signing.
            </li>
            <li>
              <strong>Governance proposal inspection</strong> &mdash; Decode the
              calldata in DAO proposals to verify the exact on-chain actions
              before voting.
            </li>
            <li>
              <strong>MEV research</strong> &mdash; Analyze transaction calldata
              in mempool data to understand arbitrage and liquidation bot
              behavior.
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
              href="/crypto/erc20-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ERC-20 Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode ERC-20 token transfer, approve, and other standard
                function calls from calldata.
              </p>
            </Link>
            <Link
              href="/crypto/error-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Error Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode Solidity revert data to understand why a transaction
                failed.
              </p>
            </Link>
            <Link
              href="/crypto/abi-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ABI Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Ethereum ABI data for function calls,
                constructor arguments, and events.
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
