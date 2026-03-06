import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Eip712HasherTool from "./Eip712HasherTool";

export const metadata: Metadata = generateToolMetadata({
  title: "EIP-712 Typed Data Hasher",
  description:
    "Hash EIP-712 typed structured data online. Compute domain separator, struct hash, and final signing hash for permits and gasless transactions.",
  path: "/crypto/eip712-hasher",
});

const faqs = [
  {
    question: "What is EIP-712 typed structured data?",
    answer:
      "EIP-712 is an Ethereum standard for hashing and signing typed structured data. Instead of signing raw bytes (which users cannot verify), EIP-712 defines a schema for structured data that wallets can display in a human-readable format. This enables users to understand what they are signing, improving security for permits, orders, and gasless transactions.",
  },
  {
    question: "What is a domain separator in EIP-712?",
    answer:
      "The domain separator is a hash that uniquely identifies the signing context, typically including the contract name, version, chain ID, and verifying contract address. It prevents signatures from being replayed across different contracts or chains. The domain separator is computed as keccak256(abi.encode(typeHash, nameHash, versionHash, chainId, verifyingContract)).",
  },
  {
    question: "How is the EIP-712 signing hash computed?",
    answer:
      "The final signing hash follows the formula: keccak256('\\x19\\x01' + domainSeparator + structHash). The '\\x19\\x01' prefix prevents collision with other signed data formats. The domainSeparator identifies the contract context, and the structHash is the keccak256 of the encoded typed data. This hash is what gets signed by the user's private key.",
  },
  {
    question: "What is ERC-2612 Permit and how does it use EIP-712?",
    answer:
      "ERC-2612 Permit allows ERC-20 token approvals via signatures instead of on-chain transactions. Users sign an EIP-712 message containing the spender, value, nonce, and deadline. The contract verifies the signature and sets the approval. This enables gasless approvals and is widely used in DeFi protocols like Uniswap, Aave, and OpenSea.",
  },
  {
    question: "What are common EIP-712 use cases in DeFi?",
    answer:
      "EIP-712 is used extensively in DeFi: ERC-20 Permit for gasless approvals, limit orders on DEXs (Uniswap, 1inch), NFT marketplace listings (OpenSea Seaport), meta-transactions for gasless interactions, governance voting (Compound Governor), and EIP-4337 account abstraction user operations.",
  },
  {
    question: "How do I debug EIP-712 signature verification failures?",
    answer:
      "Common issues include: wrong chain ID in the domain separator, incorrect type hashes (ensure canonical type ordering), wrong encoding of nested structs, mismatched verifying contract address, or nonce issues. Use this tool to compute each component separately (domain separator, struct hash, final hash) and compare against your contract's values.",
  },
];

export default function Eip712HasherPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "EIP-712 Typed Data Hasher",
            url: "https://evmtools.dev/crypto/eip712-hasher",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Hash EIP-712 typed structured data online. Compute domain separator, struct hash, and final signing hash for permits and gasless transactions.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="eip712-hasher">
        <Eip712HasherTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This EIP-712 Typed Data Hasher
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool computes all the intermediate and final
              hashes for EIP-712 typed structured data. Use it to debug
              signature verification, build permit flows, and understand the
              EIP-712 hashing process.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter the domain data</strong> including the contract
                name, version, chain ID, and verifying contract address.
              </li>
              <li>
                <strong>Define your typed data</strong> with the primary type
                and its fields. The tool supports nested struct types.
              </li>
              <li>
                <strong>Provide the message values</strong> matching the defined
                types.
              </li>
              <li>
                <strong>View the computed hashes</strong> &mdash; domain
                separator, struct hash, and the final EIP-712 signing hash are
                all displayed for inspection and debugging.
              </li>
              <li>
                <strong>Copy any hash</strong> to compare against your
                contract&apos;s on-chain values or use in testing.
              </li>
            </ol>
            <p>
              All computation runs locally in your browser. No private keys or
              sensitive data are transmitted to any server.
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
              <strong>Permit debugging</strong> &mdash; Compute ERC-2612 Permit
              hashes to debug why signature verification is failing in your
              token contract.
            </li>
            <li>
              <strong>Order signing</strong> &mdash; Verify EIP-712 hashes for
              DEX limit orders, NFT marketplace listings, and other off-chain
              order structures.
            </li>
            <li>
              <strong>Meta-transaction development</strong> &mdash; Compute
              signing hashes for gasless transaction forwarders and relayer
              infrastructure.
            </li>
            <li>
              <strong>Domain separator verification</strong> &mdash; Confirm
              that your contract&apos;s domain separator matches the expected
              value for the correct chain and address.
            </li>
            <li>
              <strong>Security auditing</strong> &mdash; Verify EIP-712
              implementations by independently computing hashes and comparing
              against the contract&apos;s behavior.
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
                Generate Keccak256 hashes, the underlying hash function used in
                all EIP-712 computations.
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
                Encode and decode ABI data used in the abi.encode step of
                EIP-712 struct hashing.
              </p>
            </Link>
            <Link
              href="/crypto/checksum-address"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Checksum Address Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert addresses to EIP-55 checksum format for use in EIP-712
                domain separators and messages.
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
