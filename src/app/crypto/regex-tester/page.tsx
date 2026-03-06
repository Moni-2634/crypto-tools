import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import RegexTesterTool from "./RegexTesterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Regex Tester",
  description:
    "Test regular expressions online with real-time matching, group capture, and flag support. Includes common regex patterns for email, URL, IP address, Ethereum address, and more.",
  path: "/crypto/regex-tester",
});

const faqs = [
  {
    question: "What is a regular expression (regex)?",
    answer:
      "A regular expression is a sequence of characters that defines a search pattern. It is used in programming and text editors to find, match, and manipulate strings based on specific rules such as character classes, quantifiers, and anchors.",
  },
  {
    question: "What is the difference between regex and simple string matching?",
    answer:
      "Simple string matching looks for an exact sequence of characters, while regex allows pattern-based matching with wildcards, repetition, optional characters, and alternation. Regex can match complex patterns like email addresses or IP addresses in a single expression.",
  },
  {
    question: "What do the common regex flags (g, i, m, s) mean?",
    answer:
      "The 'g' flag enables global matching (find all matches, not just the first). The 'i' flag makes the pattern case-insensitive. The 'm' flag enables multiline mode so ^ and $ match line boundaries. The 's' flag makes the dot (.) match newline characters as well.",
  },
  {
    question: "What are regex lookahead and lookbehind assertions?",
    answer:
      "Lookahead (?=...) and lookbehind (?<=...) are zero-width assertions that check if a pattern exists ahead of or behind the current position without consuming characters. For example, \\d+(?= USD) matches digits only when followed by ' USD'.",
  },
  {
    question: "Can I use regex to validate email addresses?",
    answer:
      "Yes, a common pattern is ^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$, though fully RFC-compliant email validation is extremely complex. For production use, combine a reasonable regex with server-side verification.",
  },
  {
    question: "How does regex performance impact my application?",
    answer:
      "Poorly written regex patterns with excessive backtracking can cause catastrophic performance issues (ReDoS). Avoid nested quantifiers like (a+)+ and use atomic groups or possessive quantifiers when possible. Always test patterns against edge-case inputs before deploying.",
  },
];

export default function RegexTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Regex Tester",
            url: "https://evmtools.dev/crypto/regex-tester",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Test regular expressions online with real-time matching, group capture, and flag support. Includes common regex patterns for email, URL, IP address, Ethereum address, and more.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqJsonLd(faqs)),
        }}
      />
      <ToolLayout slug="regex-tester">
        <RegexTesterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Regex Tester
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This online regex tester lets you build, test, and debug regular
              expressions in real time. Whether you are validating user input,
              parsing log files, or extracting data from blockchain transactions,
              you can iterate on your pattern instantly without writing any code.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your regex pattern</strong> in the pattern input
                field. The tool supports standard JavaScript regex syntax
                including character classes, quantifiers, groups, and
                assertions.
              </li>
              <li>
                <strong>Paste or type your test string</strong> in the text
                area below. This is the content your regex will be evaluated
                against.
              </li>
              <li>
                <strong>Toggle flags</strong> such as global (g),
                case-insensitive (i), multiline (m), and dotAll (s) to adjust
                how the engine processes your pattern.
              </li>
              <li>
                <strong>View matches highlighted</strong> directly in the test
                string. Captured groups are displayed separately so you can
                verify that your pattern extracts the right data.
              </li>
              <li>
                <strong>Use preset patterns</strong> for common tasks like
                matching Ethereum addresses, email addresses, URLs, and IP
                addresses to save time.
              </li>
            </ol>
            <p>
              All processing happens entirely in your browser. No data is sent
              to any server, making this tool safe for testing patterns against
              sensitive strings such as private keys, API tokens, or personal
              data.
            </p>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Input validation</strong> &mdash; Verify that form fields
              contain valid emails, phone numbers, URLs, or Ethereum addresses
              before submitting data.
            </li>
            <li>
              <strong>Log parsing</strong> &mdash; Extract timestamps, error
              codes, and transaction hashes from server or node logs using
              capture groups.
            </li>
            <li>
              <strong>Data extraction</strong> &mdash; Pull structured values
              like contract addresses, token amounts, or function signatures
              from raw blockchain data.
            </li>
            <li>
              <strong>Search and replace</strong> &mdash; Refactor code by
              finding patterns across files and replacing them with updated
              syntax or variable names.
            </li>
            <li>
              <strong>Solidity event parsing</strong> &mdash; Match and decode
              event signatures and indexed parameters from Ethereum transaction
              logs.
            </li>
          </ul>
        </section>

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
                Format, validate, and minify JSON data with syntax highlighting.
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
                Generate Keccak-256 hashes used in Ethereum for addresses and
                signatures.
              </p>
            </Link>
            <Link
              href="/guides/how-to-read-etherscan"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                How to Read Etherscan
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Learn how to navigate and interpret transaction data on
                Etherscan.
              </p>
            </Link>
          </div>
        </section>

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
