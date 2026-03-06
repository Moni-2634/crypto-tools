import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import SlugifyTool from "./SlugifyTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Slugify Tool - URL Slug Generator",
  description:
    "Convert text to URL-friendly slugs online. Customize separator, case, max length, and handle unicode characters. Free slug generator for blog posts, products, and routes.",
  path: "/crypto/slugify",
});

const faqs = [
  {
    question: "What is a URL slug?",
    answer:
      "A URL slug is the part of a web address that identifies a specific page in a human-readable form. For example, in 'example.com/blog/how-to-build-a-rest-api', the slug is 'how-to-build-a-rest-api'. Slugs use only lowercase letters, numbers, and hyphens, making URLs clean, readable, and SEO-friendly.",
  },
  {
    question: "Why are slugs important for SEO?",
    answer:
      "URL slugs are important for SEO because search engines use them to understand page content. A descriptive slug like '/best-javascript-frameworks' is more informative than '/page?id=123'. Clean slugs improve click-through rates in search results, are easier to share, and help search engines index your content more effectively.",
  },
  {
    question: "How does this slugify tool handle special characters?",
    answer:
      "The tool normalizes unicode characters by removing diacritics (accents like e, n, u), replaces common symbols with words (& becomes 'and', @ becomes 'at', # becomes 'hash'), removes all other non-alphanumeric characters, and collapses multiple separators into one. This ensures the output is safe for use in any URL.",
  },
  {
    question: "What separator should I use for slugs?",
    answer:
      "Hyphens (-) are the most common and recommended separator for URL slugs. Google treats hyphens as word separators, which is better for SEO than underscores. Underscores (_) are commonly used in file names and variable names. Dots (.) are sometimes used in versioning or special naming conventions.",
  },
  {
    question: "What is the ideal length for a URL slug?",
    answer:
      "The ideal URL slug length is between 3-5 words (roughly 30-60 characters). Google can handle URLs up to about 2,000 characters, but shorter slugs are more readable, easier to share, and better for SEO. Use the max length option to enforce a character limit for your slugs.",
  },
];

export default function SlugifyPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Slugify Tool",
            url: "https://evmtools.dev/crypto/slugify",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert text to URL-friendly slugs online. Customize separator, case, and max length.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="slugify">
        <SlugifyTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Slugify Tool
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online slug generator converts any text into a clean,
              URL-friendly slug. Perfect for blog post URLs, product pages,
              and API endpoints.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your text</strong> &mdash; type or paste a
                title, heading, or any text you want to convert to a slug.
              </li>
              <li>
                <strong>Customize options</strong> &mdash; choose your
                separator (hyphen, underscore, or dot), toggle lowercase
                conversion, optionally strip numbers, and set a maximum
                length.
              </li>
              <li>
                <strong>Copy the result</strong> &mdash; use the copy button
                to copy the generated slug to your clipboard.
              </li>
              <li>
                <strong>Batch mode</strong> &mdash; enter multiple lines to
                convert them all at once. Each line produces a separate slug.
              </li>
            </ol>
            <p>
              All processing happens locally in your browser. No data is sent
              to any server.
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
              <strong>Blog post URLs</strong> &mdash; Convert article titles
              into SEO-friendly slugs for WordPress, Ghost, Next.js, or any
              CMS.
            </li>
            <li>
              <strong>E-commerce products</strong> &mdash; Generate clean
              product page URLs from product names for better SEO and user
              experience.
            </li>
            <li>
              <strong>API endpoint design</strong> &mdash; Create consistent,
              readable endpoint names for REST APIs.
            </li>
            <li>
              <strong>File naming</strong> &mdash; Convert titles to
              filesystem-safe file names using underscores or hyphens.
            </li>
            <li>
              <strong>Database identifiers</strong> &mdash; Generate unique,
              readable identifiers from user-provided names.
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
              href="/crypto/url-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                URL Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode URL components for safe transmission.
              </p>
            </Link>
            <Link
              href="/crypto/text-case-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Text Case Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between camelCase, snake_case, kebab-case, and more.
              </p>
            </Link>
            <Link
              href="/crypto/regex-tester"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Regex Tester
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Test regular expressions with real-time matching and pattern
                examples.
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
