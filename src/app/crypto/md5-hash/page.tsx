import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Md5HashTool from "./Md5HashTool";

export const metadata: Metadata = generateToolMetadata({
  title: "MD5 Hash Generator",
  description:
    "Generate MD5 hashes from text online. Fast client-side MD5 hash calculator with no server processing. For checksums, fingerprinting, and legacy compatibility.",
  path: "/crypto/md5-hash",
});

const faqs = [
  {
    question: "What is MD5?",
    answer:
      "MD5 (Message-Digest Algorithm 5) is a widely used hash function that produces a 128-bit (16-byte) hash value, typically expressed as a 32-character hexadecimal string. It was designed by Ronald Rivest in 1991 and is commonly used for checksums and file fingerprinting.",
  },
  {
    question: "Is MD5 secure for passwords or cryptography?",
    answer:
      "No. MD5 is not considered cryptographically secure. Collision attacks have been demonstrated since 2004, meaning two different inputs can produce the same hash. Never use MD5 for password hashing, digital signatures, or any security-critical application. Use SHA-256 or bcrypt instead.",
  },
  {
    question: "What is the difference between MD5 and SHA-256?",
    answer:
      "MD5 produces a 128-bit hash (32 hex characters) while SHA-256 produces a 256-bit hash (64 hex characters). SHA-256 is cryptographically secure with no known collision attacks, while MD5 has been broken. SHA-256 is slower but should be used whenever security matters.",
  },
  {
    question: "How long is an MD5 hash?",
    answer:
      "An MD5 hash is always 128 bits, which is 16 bytes. When represented as a hexadecimal string, it is exactly 32 characters long, regardless of the size of the input data.",
  },
  {
    question: "Why is MD5 still used if it is insecure?",
    answer:
      "MD5 remains useful for non-security purposes where speed matters more than collision resistance. Common uses include file checksum verification, cache key generation, data deduplication, and legacy system compatibility where changing the hash algorithm is not feasible.",
  },
  {
    question: "What is an MD5 collision?",
    answer:
      "An MD5 collision occurs when two different inputs produce the same MD5 hash output. Researchers have demonstrated practical collision attacks, making it possible to create two distinct files with the same MD5 hash. This is why MD5 should not be used for security or integrity verification in adversarial contexts.",
  },
];

export default function Md5HashPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "MD5 Hash Generator",
            url: "https://evmtools.dev/crypto/md5-hash",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate MD5 hashes from text online. Fast client-side MD5 hash calculator with no server processing. For checksums, fingerprinting, and legacy compatibility.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="md5-hash">
        <Md5HashTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This MD5 Hash Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool generates MD5 hashes entirely in your browser with no
              data sent to any server. It is ideal for quick checksum
              generation, file fingerprinting, and verifying data integrity in
              non-security contexts.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your text</strong> &mdash; type or paste the
                string you want to hash into the input field. The MD5 hash is
                computed instantly as you type.
              </li>
              <li>
                <strong>View the hash</strong> &mdash; the 32-character
                hexadecimal MD5 hash appears in the output field in real time.
              </li>
              <li>
                <strong>Copy the result</strong> &mdash; click the copy button
                to copy the hash to your clipboard for use in scripts, database
                queries, or documentation.
              </li>
            </ol>
            <p>
              MD5 is deterministic, meaning the same input always produces the
              same hash. This makes it useful for comparing files, generating
              cache keys, and creating consistent identifiers from string data.
              However, do not rely on MD5 for any security-related purpose.
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
              <strong>Checksum verification</strong> &mdash; Verify the
              integrity of downloaded files by comparing the MD5 hash provided
              by the source with the hash of the file you received.
            </li>
            <li>
              <strong>Legacy system compatibility</strong> &mdash; Many older
              systems, databases, and APIs still use MD5 for hashing. Generate
              compatible hashes when integrating with these systems.
            </li>
            <li>
              <strong>Non-security hashing</strong> &mdash; Use MD5 as a fast
              hash for cache keys, ETags, content addressing, or data
              partitioning where collision resistance is not critical.
            </li>
            <li>
              <strong>File deduplication</strong> &mdash; Hash file contents to
              quickly identify duplicate files without performing byte-by-byte
              comparisons across large datasets.
            </li>
            <li>
              <strong>Gravatar URLs</strong> &mdash; Gravatar uses MD5 hashes of
              email addresses to generate avatar URLs, making MD5 still relevant
              in everyday web development.
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
              href="/crypto/sha256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                SHA-256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate cryptographically secure SHA-256 hashes for data
                integrity, Bitcoin, and digital signatures.
              </p>
            </Link>
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
