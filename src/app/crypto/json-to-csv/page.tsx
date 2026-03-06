import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import JsonToCsvTool from "./JsonToCsvTool";

export const metadata: Metadata = generateToolMetadata({
  title: "JSON to CSV Converter",
  description:
    "Convert JSON arrays to CSV and CSV to JSON online. Supports custom delimiters, proper escaping, nested objects, and file download. Free, client-side tool.",
  path: "/crypto/json-to-csv",
});

const faqs = [
  {
    question: "How do I convert JSON to CSV?",
    answer:
      "Paste your JSON array of objects into the input field and the tool will automatically extract all keys as CSV column headers and convert each object into a row. Nested objects are serialized as JSON strings in the CSV cell. You can download the result as a .csv file.",
  },
  {
    question: "How do I convert CSV to JSON?",
    answer:
      "Switch to 'CSV to JSON' mode, then paste your CSV data with headers in the first row. The tool will parse each row into a JSON object using the headers as keys. Numbers and booleans are automatically detected and converted to their proper JSON types.",
  },
  {
    question: "What delimiters are supported?",
    answer:
      "The tool supports three delimiters: comma (,) which is the standard CSV format, tab (\\t) for TSV (Tab-Separated Values), and semicolon (;) which is common in European locales where commas are used as decimal separators.",
  },
  {
    question: "How are nested objects handled in CSV?",
    answer:
      "When converting JSON to CSV, nested objects and arrays are serialized as JSON strings within the CSV cell. For example, {\"address\": {\"city\": \"NYC\"}} becomes a cell containing the JSON string {\"city\": \"NYC\"}. Values containing commas or quotes are properly escaped with double quotes.",
  },
  {
    question: "Can I use this tool for large datasets?",
    answer:
      "Yes, the tool processes data entirely in your browser and can handle datasets with thousands of rows. However, for very large files (over 50 MB), you may experience slower performance depending on your device. Consider splitting large datasets into smaller chunks.",
  },
  {
    question: "Is my data secure when converting JSON to CSV?",
    answer:
      "Absolutely. All conversion happens client-side in your browser. No data is sent to any server. This makes the tool safe for sensitive business data, personal information, and proprietary datasets.",
  },
];

export default function JsonToCsvPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON to CSV Converter",
            url: "https://evmtools.dev/crypto/json-to-csv",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert JSON arrays to CSV and CSV to JSON online. Supports custom delimiters and nested objects.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="json-to-csv">
        <JsonToCsvTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This JSON to CSV Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool lets you convert between JSON and CSV
              formats instantly. Whether you need to export API data to a
              spreadsheet or import CSV data into a web application, this
              converter handles it all.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Choose your mode</strong> &mdash; select &quot;JSON to
                CSV&quot; to convert a JSON array into CSV format, or &quot;CSV
                to JSON&quot; to parse CSV data into a JSON array.
              </li>
              <li>
                <strong>Select a delimiter</strong> &mdash; choose comma,
                tab, or semicolon based on your needs.
              </li>
              <li>
                <strong>Paste your data</strong> into the input area. For JSON
                to CSV, input must be a JSON array of objects. For CSV to JSON,
                the first row should contain column headers.
              </li>
              <li>
                <strong>Copy or download</strong> &mdash; use the copy button
                for the converted output, or click &quot;Download&quot; to save
                as a file.
              </li>
            </ol>
            <p>
              All processing happens locally in your browser. Your data is
              never sent to a server.
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
              <strong>API data export</strong> &mdash; Convert JSON API
              responses to CSV for analysis in Excel, Google Sheets, or
              data visualization tools.
            </li>
            <li>
              <strong>Database import</strong> &mdash; Convert CSV data
              exports into JSON format for importing into MongoDB, Firebase,
              or other document databases.
            </li>
            <li>
              <strong>Data migration</strong> &mdash; Transform data between
              formats when migrating between systems that use different
              formats.
            </li>
            <li>
              <strong>Report generation</strong> &mdash; Convert structured
              JSON data into CSV for generating reports and sharing with
              non-technical stakeholders.
            </li>
            <li>
              <strong>Blockchain data analysis</strong> &mdash; Export
              on-chain data (transactions, events, token transfers) from
              JSON to CSV for spreadsheet analysis.
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
                JSON Formatter / Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Format, minify, and validate JSON data with detailed error
                messages.
              </p>
            </Link>
            <Link
              href="/crypto/base64-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Base64 Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Base64 strings for data transmission.
              </p>
            </Link>
            <Link
              href="/crypto/url-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                URL Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode URL components for safe data transmission.
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
