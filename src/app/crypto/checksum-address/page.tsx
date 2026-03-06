import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import ChecksumAddressTool from "./ChecksumAddressTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Checksum Address Converter",
  description:
    "Convert Ethereum addresses to EIP-55 checksummed format. Ensure your addresses are safe for transactions.",
  path: "/crypto/checksum-address",
});

const faqs = [
  {
    question: "What is an EIP-55 checksum address?",
    answer:
      "EIP-55 is a standard for mixed-case Ethereum address checksumming. It converts a lowercase hex address into a mixed-case format where uppercase letters serve as a checksum. For example, 0xab5801a7d398351b8be11c439e05c5b3259aec9b becomes 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B. If any character is wrong, the checksum fails, catching typos before funds are sent.",
  },
  {
    question: "How does EIP-55 checksumming work?",
    answer:
      "EIP-55 takes the keccak256 hash of the lowercase address (without 0x). For each character in the address: if the character is a letter (a-f) and the corresponding hex digit in the hash is 8 or higher, the character is uppercased. This creates a deterministic checksum that detects about 99.986% of random character changes.",
  },
  {
    question: "Why are Ethereum addresses case-insensitive?",
    answer:
      "Ethereum addresses are derived from public keys and are fundamentally hexadecimal numbers where case does not affect the value (0xAB equals 0xab). EIP-55 repurposes the case to encode checksum information. Wallets and tools validate the checksum to catch typos, but the blockchain itself treats addresses as case-insensitive.",
  },
  {
    question: "What happens if I use a non-checksummed address?",
    answer:
      "Using a non-checksummed address does not cause a transaction to fail on-chain. However, many wallets and tools (including MetaMask, ethers.js, and Solidity) issue warnings or errors when they encounter addresses that fail EIP-55 checksum validation. Using checksummed addresses is a best practice to prevent sending funds to mistyped addresses.",
  },
  {
    question: "Do all EVM chains use EIP-55 checksumming?",
    answer:
      "Yes. EIP-55 checksumming is universal across all EVM-compatible chains including Ethereum, Polygon, Arbitrum, Optimism, BSC, and Avalanche. The checksum is computed from the address alone (not the chain ID), so the same checksummed address is valid on all chains. Some chains like RSK use a chain-specific variant (EIP-1191).",
  },
  {
    question: "How do I validate an Ethereum address checksum?",
    answer:
      "To validate, compute the EIP-55 checksum of the lowercase address and compare it character-by-character with the provided mixed-case address. If they match, the checksum is valid. If the address is all-lowercase or all-uppercase, it is considered valid but not checksummed. Libraries like ethers.js and viem provide getAddress() functions that validate and convert automatically.",
  },
];

export default function ChecksumAddressPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Checksum Address Converter",
            url: "https://evmtools.dev/crypto/checksum-address",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert Ethereum addresses to EIP-55 checksummed format. Ensure your addresses are safe for transactions.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="checksum-address">
        <ChecksumAddressTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Checksum Address Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool converts Ethereum addresses to their EIP-55
              checksummed format and validates existing checksums. Use it to
              ensure your addresses are correctly formatted before sending
              transactions.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste an Ethereum address</strong> in any format
                (lowercase, uppercase, or mixed-case) into the input field.
              </li>
              <li>
                <strong>View the checksummed result</strong> &mdash; the tool
                converts the address to EIP-55 format with the correct
                mixed-case checksum.
              </li>
              <li>
                <strong>Check the validation status</strong> &mdash; if the
                input address was already mixed-case, the tool tells you whether
                the checksum is valid or invalid.
              </li>
              <li>
                <strong>Copy the checksummed address</strong> for use in your
                transactions, smart contracts, or configuration files.
              </li>
            </ol>
            <p>
              All computation runs locally in your browser using keccak256. No
              addresses are sent to any server.
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
              <strong>Transaction safety</strong> &mdash; Convert addresses to
              checksum format before sending ETH or tokens to catch typos that
              could result in lost funds.
            </li>
            <li>
              <strong>Smart contract deployment</strong> &mdash; Ensure all
              addresses in constructor arguments and configuration are properly
              checksummed.
            </li>
            <li>
              <strong>Code quality</strong> &mdash; Fix Solidity compiler
              warnings about non-checksummed addresses in your contract code.
            </li>
            <li>
              <strong>Allowlist preparation</strong> &mdash; Convert a list of
              addresses to checksum format before building a Merkle tree for
              minting whitelists.
            </li>
            <li>
              <strong>Address comparison</strong> &mdash; Normalize addresses to
              the same checksum format for reliable string comparison in
              scripts and databases.
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
              href="/crypto/keccak256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Keccak256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate Keccak256 hashes, the same function used internally by
                EIP-55 checksumming.
              </p>
            </Link>
            <Link
              href="/crypto/merkle-proof-generator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Merkle Proof Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Build Merkle trees from checksummed addresses for NFT allowlists
                and token airdrops.
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
                See how addresses are left-padded to bytes32 format for ABI
                encoding and storage slots.
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
