import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import SignatureVerifierTool from "./SignatureVerifierTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Signature Signer & Verifier",
  description:
    "Sign messages with a private key and verify Ethereum signatures. Recover signer addresses from EIP-191 signed messages.",
  path: "/crypto/signature-verifier",
});

const faqs = [
  {
    question: "What is an Ethereum message signature?",
    answer:
      "An Ethereum message signature is a cryptographic proof that a specific Ethereum address holder approved a particular message. It uses the ECDSA algorithm on the secp256k1 curve. The signature consists of three components: r, s (the signature values), and v (the recovery identifier).",
  },
  {
    question: "What is EIP-191 (personal_sign)?",
    answer:
      "EIP-191 defines a standard for signing arbitrary data in Ethereum. It prepends the message with '\\x19Ethereum Signed Message:\\n' followed by the message length before hashing and signing. This prefix prevents signed messages from being mistaken for valid transactions, protecting users from phishing attacks.",
  },
  {
    question: "How do I verify who signed a message?",
    answer:
      "To verify a signature, provide the original message and the signature (65 bytes as a hex string). The tool uses ecrecover to mathematically derive the signer's Ethereum address from the signature. If the recovered address matches the expected signer, the signature is valid.",
  },
  {
    question: "What is the difference between signing and verifying?",
    answer:
      "Signing requires a private key and produces a signature for a given message. Verifying requires only the message and signature (no private key needed) and recovers the signer's public address. Anyone can verify a signature, but only the private key holder can create one.",
  },
  {
    question: "What are common use cases for message signing?",
    answer:
      "Message signing is used for wallet-based authentication (Sign-In with Ethereum), off-chain governance voting, gasless token approvals (EIP-2612 permits), proving ownership of an address, and creating verifiable attestations without on-chain transactions.",
  },
];

export default function SignatureVerifierPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Signature Signer & Verifier",
            url: "https://evmtools.dev/crypto/signature-verifier",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Sign messages with a private key and verify Ethereum signatures. Recover signer addresses from EIP-191 signed messages.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="signature-verifier">
        <SignatureVerifierTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Signature Signer &amp; Verifier
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool lets you sign messages with an Ethereum private key and
              verify signatures to recover the signer address. It supports
              EIP-191 (personal_sign) standard messages.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>To sign a message:</strong> Enter your private key and
                the message you want to sign. The tool produces a 65-byte
                signature (r, s, v) that anyone can verify.
              </li>
              <li>
                <strong>To verify a signature:</strong> Enter the original
                message and the signature hex string. The tool recovers the
                signer&apos;s Ethereum address.
              </li>
              <li>
                <strong>Compare addresses</strong> &mdash; check that the
                recovered address matches the expected signer to confirm
                authenticity.
              </li>
              <li>
                <strong>Copy the results</strong> for use in your dApp, smart
                contract verification, or authentication flow.
              </li>
            </ol>
            <p>
              All signing and verification happens locally in your browser.
              Private keys are never sent to any server.
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
              <strong>Sign-In with Ethereum (SIWE)</strong> &mdash; Test
              wallet-based authentication flows by signing and verifying login
              messages.
            </li>
            <li>
              <strong>Off-chain voting</strong> &mdash; Create and verify
              signed votes for governance proposals without paying gas fees.
            </li>
            <li>
              <strong>Permit signatures</strong> &mdash; Test EIP-2612 permit
              signatures for gasless token approvals.
            </li>
            <li>
              <strong>Address ownership proof</strong> &mdash; Generate a
              signed message to prove you control a specific Ethereum address.
            </li>
            <li>
              <strong>Smart contract testing</strong> &mdash; Create test
              signatures for contracts that verify off-chain signed data
              on-chain using ecrecover.
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
              href="/crypto/private-key-to-address"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Private Key to Address
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Derive the Ethereum address from a private key to verify your
                signing key.
              </p>
            </Link>
            <Link
              href="/crypto/address-validator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Validate the recovered signer address format and EIP-55
                checksum.
              </p>
            </Link>
            <Link
              href="/crypto/sha256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                SHA-256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Hash messages and data with SHA-256 for use in cryptographic
                operations and verification.
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
