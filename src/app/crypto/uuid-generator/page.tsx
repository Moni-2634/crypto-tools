import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import UuidGeneratorTool from "./UuidGeneratorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "UUID Generator",
  description:
    "Generate UUID v4 identifiers online. Create single or bulk UUIDs with options for uppercase, lowercase, and with or without hyphens. Validate UUID format.",
  path: "/crypto/uuid-generator",
});

const faqs = [
  {
    question: "What is a UUID?",
    answer:
      "A UUID (Universally Unique Identifier) is a 128-bit identifier that is practically unique across all systems without requiring a central authority. UUIDs are formatted as 32 hexadecimal digits displayed in five groups separated by hyphens, such as 550e8400-e29b-41d4-a716-446655440000.",
  },
  {
    question: "What is the difference between UUID v4 and UUID v1?",
    answer:
      "UUID v4 is generated using random or pseudo-random numbers, making it the most commonly used version for general purposes. UUID v1 is based on the current timestamp and the MAC address of the generating machine, which can expose hardware information. UUID v4 is preferred when privacy and simplicity matter.",
  },
  {
    question: "What is the probability of a UUID collision?",
    answer:
      "UUID v4 uses 122 random bits, giving approximately 5.3 x 10^36 possible values. The probability of generating a duplicate is astronomically low. You would need to generate about 2.71 quintillion UUIDs to have a 50% chance of a single collision, making collisions practically impossible.",
  },
  {
    question: "How long is a UUID?",
    answer:
      "A UUID is 128 bits (16 bytes). In its standard string representation with hyphens, it is 36 characters long (32 hexadecimal digits plus 4 hyphens). Without hyphens, it is 32 characters long.",
  },
  {
    question: "What is the difference between UUID and GUID?",
    answer:
      "UUID and GUID (Globally Unique Identifier) are effectively the same thing. GUID is the term used by Microsoft, while UUID is the standard term defined in RFC 4122. Both refer to the same 128-bit identifier format and are interchangeable.",
  },
  {
    question: "Should I use UUIDs as database primary keys?",
    answer:
      "UUIDs work well as primary keys in distributed systems where you need to generate IDs without coordinating with a central database. However, random UUIDs can cause index fragmentation in B-tree indexes. Consider UUID v7 (time-ordered) or ULID for better database performance while keeping global uniqueness.",
  },
];

export default function UuidGeneratorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UUID Generator",
            url: "https://evmtools.dev/crypto/uuid-generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate UUID v4 identifiers online. Create single or bulk UUIDs with options for uppercase, lowercase, and with or without hyphens. Validate UUID format.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="uuid-generator">
        <UuidGeneratorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This UUID Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool generates cryptographically random UUID v4 identifiers
              directly in your browser. No data is sent to any server, and each
              UUID is generated using the Web Crypto API for high-quality
              randomness.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Generate a UUID</strong> &mdash; click the generate
                button to create a new random UUID v4. Each click produces a
                fresh, unique identifier.
              </li>
              <li>
                <strong>Configure format options</strong> &mdash; toggle between
                uppercase and lowercase output, and choose whether to include
                hyphens in the UUID string.
              </li>
              <li>
                <strong>Bulk generate</strong> &mdash; need multiple UUIDs at
                once? Use the bulk generation feature to create up to hundreds
                of UUIDs in a single click.
              </li>
              <li>
                <strong>Copy the result</strong> &mdash; click the copy button
                to copy the generated UUID (or all bulk UUIDs) to your clipboard
                for use in your code, database, or configuration.
              </li>
            </ol>
            <p>
              UUIDs generated here are compliant with RFC 4122 version 4. They
              contain 122 bits of randomness, with 6 bits reserved for the
              version and variant fields that identify them as v4 UUIDs.
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
              <strong>Database primary keys</strong> &mdash; Use UUIDs as
              primary keys in PostgreSQL, MySQL, or MongoDB to generate unique
              IDs without auto-increment coordination across distributed
              systems.
            </li>
            <li>
              <strong>Distributed systems</strong> &mdash; Generate globally
              unique identifiers across microservices, serverless functions, and
              edge workers without a central ID authority.
            </li>
            <li>
              <strong>API request tracking</strong> &mdash; Assign a UUID to
              each API request as a correlation ID for tracing requests through
              logs, queues, and services.
            </li>
            <li>
              <strong>Session identifiers</strong> &mdash; Create
              cryptographically random session IDs for user authentication,
              shopping carts, and temporary state management.
            </li>
            <li>
              <strong>File and resource naming</strong> &mdash; Generate unique
              filenames for uploads, temporary files, and cloud storage objects
              to avoid naming conflicts.
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
              href="/crypto/json-formatter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JSON Formatter / Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Format, validate, and minify JSON data for API debugging,
                configuration files, and Ethereum ABIs.
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
