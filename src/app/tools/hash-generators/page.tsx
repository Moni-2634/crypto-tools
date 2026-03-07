import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import { tools } from "@/lib/tools";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `Free Online Hash Generators - SHA-256, MD5, Keccak256 | ${SITE_NAME}`,
  description:
    "Generate cryptographic hashes online for free. SHA-256, MD5, Keccak256, batch hashing, event hashes, and Merkle proofs. All tools run in your browser.",
  openGraph: {
    title: `Free Online Hash Generators - SHA-256, MD5, Keccak256 | ${SITE_NAME}`,
    description:
      "Generate cryptographic hashes online for free. SHA-256, MD5, Keccak256, batch hashing, event hashes, and Merkle proofs.",
    url: `${SITE_URL}/tools/hash-generators`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Online Hash Generators - SHA-256, MD5, Keccak256 | ${SITE_NAME}`,
    description:
      "Generate cryptographic hashes online for free. SHA-256, MD5, Keccak256, batch hashing, and more.",
  },
  alternates: {
    canonical: `${SITE_URL}/tools/hash-generators`,
  },
};

const hashToolSlugs = ["sha256-hash", "md5-hash", "keccak256-hash", "batch-keccak256"];

const relatedHashSlugs = [
  "event-hash-calculator",
  "function-selector",
  "eip712-hasher",
  "merkle-proof-generator",
];

const faqs = [
  {
    question: "What is a hash function?",
    answer:
      "A hash function takes an input of any size and produces a fixed-size output called a hash or digest. The same input always produces the same hash, but even a tiny change in the input produces a completely different hash. Hash functions are one-way: you cannot reverse a hash to get the original input.",
  },
  {
    question: "What is the difference between SHA-256 and Keccak256?",
    answer:
      "Both are cryptographic hash functions that produce 256-bit outputs. SHA-256 is part of the SHA-2 family standardized by NIST and is used in Bitcoin and TLS. Keccak256 is the version of SHA-3 used by Ethereum for address derivation, function selectors, event topics, and storage slot calculations. They use different internal algorithms and produce different outputs for the same input.",
  },
  {
    question: "Is MD5 secure?",
    answer:
      "No. MD5 is cryptographically broken and should not be used for security purposes like password hashing or digital signatures. Collision attacks can generate two different inputs that produce the same MD5 hash. MD5 is still commonly used for non-security purposes like checksums and cache keys.",
  },
  {
    question: "Why does Ethereum use Keccak256 instead of SHA-256?",
    answer:
      "Ethereum uses Keccak256 because it was selected during Ethereum's design phase as a more modern alternative to SHA-256. Keccak won the SHA-3 competition, though the final NIST SHA-3 standard has slightly different padding than the Keccak256 used by Ethereum. Keccak256 is used for address derivation, function selectors (first 4 bytes), event topics, and storage slot computation.",
  },
  {
    question: "What is batch hashing?",
    answer:
      "Batch hashing lets you hash multiple inputs at once instead of one at a time. This is useful when you need to compute function selectors for many Solidity functions, generate hashes for a whitelist, or compute multiple storage keys simultaneously.",
  },
  {
    question: "What is a Merkle proof?",
    answer:
      "A Merkle proof is a cryptographic proof that a specific piece of data is included in a Merkle tree without revealing the entire dataset. Merkle proofs are used in Ethereum for whitelists, airdrops, and state verification. They consist of sibling hashes along the path from a leaf to the root of the tree.",
  },
];

const hashTypeDetails = [
  {
    slug: "sha256-hash",
    title: "SHA-256",
    description:
      "SHA-256 (Secure Hash Algorithm 256-bit) is a member of the SHA-2 family designed by the NSA. It produces a 256-bit (32-byte) hash and is used in Bitcoin mining, TLS certificates, digital signatures, and data integrity verification. SHA-256 is considered cryptographically secure with no known practical attacks.",
  },
  {
    slug: "md5-hash",
    title: "MD5",
    description:
      "MD5 (Message-Digest Algorithm 5) produces a 128-bit (16-byte) hash. While fast, MD5 is cryptographically broken and vulnerable to collision attacks. It remains useful for non-security purposes such as file checksums, cache invalidation, and deduplication where collision resistance is not critical.",
  },
  {
    slug: "keccak256-hash",
    title: "Keccak256",
    description:
      "Keccak256 is the hash function used throughout Ethereum. It derives addresses from public keys, computes function selectors (first 4 bytes of the hash), generates event topic IDs, and calculates storage slots for mappings. If you are building on Ethereum or any EVM chain, Keccak256 is essential.",
  },
  {
    slug: "batch-keccak256",
    title: "Batch Keccak256",
    description:
      "Batch Keccak256 lets you hash multiple inputs at once. Paste a list of function signatures to get all selectors, or hash multiple addresses for a whitelist Merkle tree. This saves time when working with many values compared to hashing them one by one.",
  },
];

export default function HashGeneratorsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "All Tools", url: `${SITE_URL}/tools` },
    { name: "Hash Generators", url: `${SITE_URL}/tools/hash-generators` },
  ]);

  const faqJsonLd = generateFaqJsonLd(faqs);

  const hashTools = hashToolSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  const relatedTools = relatedHashSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]),
        }}
      />

      {/* Header */}
      <div>
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/tools"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            All Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">Hash Generators</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Free Online Hash Generators
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Generate SHA-256, MD5, and Keccak256 hashes online. All tools run
          entirely in your browser -- no data is sent to any server.
        </p>
      </div>

      <AdSlot slotId="hash-top" format="horizontal" className="my-4" />

      {/* Hash Tools Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Hash Generator Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {hashTools.map((tool) => (
            <Link
              key={tool!.slug}
              href={`/crypto/${tool!.slug}`}
              className="group rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {tool!.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{tool!.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed Explanations */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Understanding Hash Functions
        </h2>
        <div className="space-y-6">
          {hashTypeDetails.map((detail) => (
            <div
              key={detail.slug}
              className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <Link href={`/crypto/${detail.slug}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                  {detail.title}
                </h3>
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {detail.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slotId="hash-mid" format="horizontal" className="my-4" />

      {/* Related Tools */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Related Hashing Tools
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          These tools also use cryptographic hashing under the hood for Ethereum
          development workflows.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {relatedTools.map((tool) => (
            <Link
              key={tool!.slug}
              href={`/crypto/${tool!.slug}`}
              className="group rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {tool!.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{tool!.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
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

      {/* Back links */}
      <div className="flex gap-4 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/tools"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          &larr; All Tools
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          &larr; Homepage
        </Link>
      </div>
    </div>
  );
}
