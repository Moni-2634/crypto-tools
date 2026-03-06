import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Sha256Tool from "./Sha256Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "SHA-256 Hash Generator",
  description:
    "Generate SHA-256 hashes online. Compute secure cryptographic hashes from text or hex input using the Web Crypto API.",
  path: "/crypto/sha256-hash",
});

const faqs = [
  {
    question: "What is SHA-256?",
    answer:
      "SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a fixed 256-bit (32-byte) hash value. It is part of the SHA-2 family designed by the NSA and is widely used in Bitcoin, SSL certificates, and data integrity verification.",
  },
  {
    question: "What is the difference between SHA-256 and MD5?",
    answer:
      "SHA-256 produces a 256-bit hash while MD5 produces a 128-bit hash. SHA-256 is cryptographically secure and collision-resistant, whereas MD5 has known vulnerabilities and should not be used for security purposes. SHA-256 is slower but far more secure.",
  },
  {
    question: "What is the difference between SHA-256 and Keccak-256?",
    answer:
      "Both produce 256-bit hashes, but they use different algorithms. SHA-256 is used in Bitcoin and TLS, while Keccak-256 is used in Ethereum for address generation, transaction hashing, and the EVM. Keccak-256 was selected as the basis for the SHA-3 standard.",
  },
  {
    question: "Is SHA-256 secure?",
    answer:
      "Yes. SHA-256 is considered cryptographically secure as of today. No practical collision attacks or preimage attacks have been found. It is used to secure billions of dollars in Bitcoin and is recommended by NIST for sensitive applications.",
  },
  {
    question: "How is SHA-256 used in Bitcoin?",
    answer:
      "Bitcoin uses double SHA-256 (SHA-256 applied twice) for block header hashing, proof-of-work mining, transaction IDs, and Merkle tree construction. Miners compete to find a hash below a target difficulty by varying the block nonce.",
  },
  {
    question: "How long is a SHA-256 hash?",
    answer:
      "A SHA-256 hash is always 256 bits, which is 32 bytes. When represented as a hexadecimal string, it is exactly 64 characters long regardless of the input size.",
  },
];

export default function Sha256HashPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SHA-256 Hash Generator",
            url: "https://evmtools.dev/crypto/sha256-hash",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate SHA-256 hashes online. Compute secure cryptographic hashes from text or hex input using the Web Crypto API.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="sha256-hash">
        <Sha256Tool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This SHA-256 Hash Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool computes SHA-256 cryptographic hashes instantly in your
              browser using the Web Crypto API. No data is sent to any server,
              ensuring complete privacy for sensitive inputs.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your input</strong> &mdash; type or paste the text
                you want to hash into the input field. You can also switch to
                hex mode to hash raw byte sequences.
              </li>
              <li>
                <strong>View the hash</strong> &mdash; the SHA-256 hash is
                computed in real time as you type. The output is displayed as a
                64-character hexadecimal string.
              </li>
              <li>
                <strong>Copy the result</strong> &mdash; click the copy button
                to copy the hash to your clipboard for use in your application,
                terminal, or documentation.
              </li>
            </ol>
            <p>
              The hash is deterministic: the same input always produces the same
              output. Even a single-character change in the input produces a
              completely different hash, which is the avalanche effect that makes
              SHA-256 useful for data integrity checks.
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
              <strong>File integrity verification</strong> &mdash; Compare
              SHA-256 checksums to verify that downloaded files have not been
              tampered with or corrupted during transfer.
            </li>
            <li>
              <strong>Bitcoin and blockchain</strong> &mdash; Understand how
              Bitcoin uses double-SHA-256 for proof-of-work mining, transaction
              IDs, and Merkle tree construction.
            </li>
            <li>
              <strong>Password hashing</strong> &mdash; SHA-256 is used as a
              building block in password hashing schemes like PBKDF2, which
              derives cryptographic keys from passwords.
            </li>
            <li>
              <strong>Digital signatures</strong> &mdash; Hash a document or
              message before signing it with RSA or ECDSA to create a
              fixed-length digest for efficient signature computation.
            </li>
            <li>
              <strong>Data deduplication</strong> &mdash; Generate content-based
              identifiers by hashing file contents to detect duplicates without
              comparing raw data.
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
                Keccak-256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate Keccak-256 hashes used in Ethereum for addresses,
                transaction hashes, and smart contract storage.
              </p>
            </Link>
            <Link
              href="/crypto/md5-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                MD5 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate MD5 hashes for checksums, fingerprinting, and legacy
                system compatibility.
              </p>
            </Link>
            <Link
              href="/guides/what-is-keccak256"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                What Is Keccak-256? (Guide)
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Learn how Keccak-256 works, why Ethereum chose it over SHA-256,
                and its role in the EVM.
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
