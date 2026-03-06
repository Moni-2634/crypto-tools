import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import PrivateKeyToAddressTool from "./PrivateKeyToAddressTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Private Key to Address",
  description:
    "Derive Ethereum public key and address from a private key. Shows uncompressed and compressed public keys with checksummed address.",
  path: "/crypto/private-key-to-address",
});

const faqs = [
  {
    question: "How is an Ethereum address derived from a private key?",
    answer:
      "An Ethereum address is derived by first generating the public key from the private key using elliptic curve multiplication (secp256k1). The public key is then hashed with Keccak-256, and the last 20 bytes (40 hex characters) of the hash become the address, prefixed with '0x'.",
  },
  {
    question: "What is the difference between compressed and uncompressed public keys?",
    answer:
      "An uncompressed public key is 65 bytes (130 hex characters) starting with '04', containing both x and y coordinates of the elliptic curve point. A compressed public key is 33 bytes (66 hex characters) starting with '02' or '03', containing only the x coordinate and a parity flag. Ethereum uses the uncompressed key for address derivation.",
  },
  {
    question: "Is it safe to use this tool with a real private key?",
    answer:
      "This tool runs entirely in your browser and never sends your private key to any server. However, for maximum security with keys controlling real funds, consider using this tool offline by disconnecting from the internet before entering your private key, or use a hardware wallet instead.",
  },
  {
    question: "What format should the private key be in?",
    answer:
      "The private key should be a 64-character hexadecimal string (32 bytes), optionally prefixed with '0x'. It must be a valid scalar for the secp256k1 elliptic curve, meaning it must be between 1 and the curve order n-1.",
  },
  {
    question: "Can I derive the private key from an Ethereum address?",
    answer:
      "No. The derivation from private key to address is a one-way function. It involves elliptic curve multiplication and Keccak-256 hashing, both of which are computationally infeasible to reverse. This is a fundamental security property of public-key cryptography.",
  },
];

export default function PrivateKeyToAddressPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Private Key to Address",
            url: "https://evmtools.dev/crypto/private-key-to-address",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Derive Ethereum public key and address from a private key. Shows uncompressed and compressed public keys with checksummed address.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="private-key-to-address">
        <PrivateKeyToAddressTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Private Key to Address Tool
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool derives Ethereum public keys and addresses from a
              private key using standard elliptic curve cryptography. It is
              useful for verifying key pairs or understanding how Ethereum
              addresses are generated.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your private key</strong> as a 64-character hex
                string (with or without the 0x prefix).
              </li>
              <li>
                <strong>View the derived public keys</strong> &mdash; the tool
                shows both the uncompressed (65-byte) and compressed (33-byte)
                public key formats.
              </li>
              <li>
                <strong>Get the Ethereum address</strong> &mdash; the
                checksummed (EIP-55) Ethereum address is computed from the
                public key and displayed for copying.
              </li>
              <li>
                <strong>Copy any result</strong> using the copy buttons for use
                in your wallet, scripts, or smart contract configurations.
              </li>
            </ol>
            <p>
              All computations run locally in your browser using standard
              cryptographic libraries. Your private key is never transmitted
              over the network.
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
              <strong>Key pair verification</strong> &mdash; Confirm that a
              private key corresponds to the expected Ethereum address before
              importing it into a wallet.
            </li>
            <li>
              <strong>Development and testing</strong> &mdash; Generate
              addresses from test private keys for use in Hardhat, Foundry, or
              Ganache development environments.
            </li>
            <li>
              <strong>Education</strong> &mdash; Learn how Ethereum key
              derivation works, from private key to public key to address, step
              by step.
            </li>
            <li>
              <strong>Wallet recovery verification</strong> &mdash; Verify that
              a backup private key maps to the correct address without importing
              it into a wallet application.
            </li>
            <li>
              <strong>Multi-sig setup</strong> &mdash; Derive and verify
              addresses for each signer key when configuring multi-signature
              wallets.
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
              href="/crypto/address-validator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Validate cryptocurrency addresses for Ethereum, Bitcoin, and
                Solana with checksum verification.
              </p>
            </Link>
            <Link
              href="/crypto/mnemonic-generator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                BIP39 Mnemonic Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate secure BIP39 mnemonic seed phrases for cryptocurrency
                wallet creation and backup.
              </p>
            </Link>
            <Link
              href="/crypto/signature-verifier"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Signature Verifier
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Sign messages with a private key and verify Ethereum signatures
                to recover signer addresses.
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
