import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import DiffCheckerTool from "./DiffCheckerTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Diff Checker",
  description:
    "Compare two texts and see the differences highlighted line by line. Online diff tool with added, removed, and unchanged line detection. Free text comparison tool.",
  path: "/crypto/diff-checker",
});

const faqs = [
  {
    question: "How does the diff checker work?",
    answer:
      "The diff checker uses the Longest Common Subsequence (LCS) algorithm to compare two texts line by line. It identifies lines that were added (present only in the modified text), removed (present only in the original), and unchanged (identical in both). This is the same algorithm used by Git and other version control systems.",
  },
  {
    question: "What do the colors mean?",
    answer:
      "Green lines with a + prefix indicate lines that were added in the modified text. Red lines with a - prefix show lines that were removed from the original text. Lines without highlighting are unchanged between the two versions.",
  },
  {
    question: "Can I compare code with this tool?",
    answer:
      "Yes. The diff checker works with any text, including source code in any programming language. It uses a monospace font for proper code alignment and preserves whitespace. It is commonly used to compare code changes, configuration files, and documentation.",
  },
  {
    question: "What are the line numbers on the left?",
    answer:
      "The two columns of numbers show the line position in each text. The left column shows the line number in the original text, and the right column shows the line number in the modified text. Added lines only have a right number, removed lines only have a left number.",
  },
  {
    question: "Is there a size limit?",
    answer:
      "There is no strict size limit, but very large texts (over 10,000 lines) may cause slower performance since the diff algorithm runs in your browser. For typical use cases like comparing documents, config files, or code snippets, performance is instant.",
  },
];

export default function DiffCheckerPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Diff Checker",
            url: "https://evmtools.dev/crypto/diff-checker",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Compare two texts and see the differences highlighted line by line. Free online text diff and comparison tool.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="diff-checker">
        <DiffCheckerTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Diff Checker
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online diff checker helps you compare two texts and
              identify exactly what changed. Whether you are reviewing code
              changes, comparing document versions, or checking configuration
              updates, follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste the original text</strong> in the left text area.
                This is the base version you want to compare against.
              </li>
              <li>
                <strong>Paste the modified text</strong> in the right text area.
                This is the updated version with changes.
              </li>
              <li>
                <strong>Review the diff output</strong> below. Added lines are
                highlighted in green, removed lines in red, and unchanged lines
                are plain.
              </li>
              <li>
                <strong>Use the stats summary</strong> to quickly see how many
                lines were added, removed, and unchanged.
              </li>
            </ol>
            <p>
              Click &quot;Swap Sides&quot; to reverse the comparison direction.
              Everything runs locally in your browser.
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
              <strong>Code review</strong> &mdash; Compare two versions of source
              code to understand what changed between commits or branches.
            </li>
            <li>
              <strong>Configuration comparison</strong> &mdash; Find differences
              between development and production configuration files.
            </li>
            <li>
              <strong>Document versioning</strong> &mdash; Compare drafts of
              documents, contracts, or specifications to track edits.
            </li>
            <li>
              <strong>API response comparison</strong> &mdash; Diff API responses
              to detect changes in data structures or values.
            </li>
            <li>
              <strong>Smart contract auditing</strong> &mdash; Compare contract
              versions to identify modified functions and logic changes.
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
              href="/crypto/json-formatter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JSON Formatter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Format JSON before comparing to normalize indentation and
                structure.
              </p>
            </Link>
            <Link
              href="/crypto/html-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                HTML Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode or decode HTML entities before comparing HTML documents.
              </p>
            </Link>
            <Link
              href="/crypto/markdown-preview"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Markdown Preview
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Preview markdown documents before comparing different versions.
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
