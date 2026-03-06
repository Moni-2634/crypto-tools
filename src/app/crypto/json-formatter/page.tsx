import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import JsonFormatterTool from "./JsonFormatterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "JSON Formatter / Validator",
  description:
    "Format, minify, and validate JSON online. Pretty-print JSON with indentation, compress to single line, and get detailed error messages for invalid JSON.",
  path: "/crypto/json-formatter",
});

const faqs = [
  {
    question: "What is JSON and what is it used for?",
    answer:
      "JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is the most common format for transmitting data in web APIs, configuration files, and blockchain ABIs.",
  },
  {
    question: "How do I validate JSON online?",
    answer:
      "Paste your JSON into the input field and the tool will automatically check for syntax errors. If your JSON is invalid, you will see a detailed error message pointing to the exact location of the problem, such as a missing comma, unclosed bracket, or trailing comma.",
  },
  {
    question: "What is the difference between JSON and XML?",
    answer:
      "JSON is more compact and easier to read than XML. JSON uses key-value pairs and arrays, while XML uses tags and attributes. JSON is natively supported in JavaScript and is the standard for modern REST APIs, whereas XML is more common in legacy SOAP services and enterprise systems.",
  },
  {
    question: "What does pretty-print JSON mean?",
    answer:
      "Pretty-printing JSON adds indentation, line breaks, and spacing to make the data structure easy to read. Minified JSON removes all whitespace to reduce file size for transmission. This tool lets you switch between both formats instantly.",
  },
  {
    question: "What are the most common JSON syntax errors?",
    answer:
      "The most frequent JSON errors include trailing commas after the last item in an array or object, using single quotes instead of double quotes, unescaped special characters in strings, and missing closing brackets or braces.",
  },
  {
    question: "Can I use JSON for Ethereum smart contract ABIs?",
    answer:
      "Yes. Ethereum smart contract ABIs are defined in JSON format. You can use this formatter to pretty-print and validate ABI files before using them with ethers.js, viem, or web3.js to ensure they are correctly structured.",
  },
];

export default function JsonFormatterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Formatter / Validator",
            url: "https://evmtools.dev/crypto/json-formatter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Format, minify, and validate JSON online. Pretty-print JSON with indentation, compress to single line, and get detailed error messages for invalid JSON.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="json-formatter">
        <JsonFormatterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This JSON Formatter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online JSON formatter and validator makes it easy to
              work with raw JSON data. Whether you are debugging an API
              response, cleaning up a configuration file, or preparing an
              Ethereum ABI, follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste your JSON</strong> into the input area on the
                left. You can paste any JSON string, including API responses,
                package.json files, or smart contract ABIs.
              </li>
              <li>
                <strong>Choose your action</strong> &mdash; click{" "}
                <em>Format</em> to pretty-print the JSON with proper
                indentation, or click <em>Minify</em> to compress it into a
                single line for production use.
              </li>
              <li>
                <strong>Check for errors</strong> &mdash; if the JSON is
                invalid, the tool highlights the exact line and character where
                the syntax error occurs, so you can fix it quickly.
              </li>
              <li>
                <strong>Copy the output</strong> using the copy button and paste
                it into your code editor, terminal, or API client.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. Your data is never sent
              to a server, making this tool safe for sensitive configuration
              files and private keys.
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
              <strong>API debugging</strong> &mdash; Format messy API responses
              to quickly inspect nested objects, arrays, and field values.
            </li>
            <li>
              <strong>Configuration file formatting</strong> &mdash;
              Pretty-print package.json, tsconfig.json, or Docker Compose files
              for readability.
            </li>
            <li>
              <strong>Data validation</strong> &mdash; Verify that JSON payloads
              are syntactically correct before sending them to a backend or
              smart contract.
            </li>
            <li>
              <strong>Ethereum ABI formatting</strong> &mdash; Pretty-print
              smart contract ABIs to review function signatures, event
              definitions, and parameter types.
            </li>
            <li>
              <strong>Minification for production</strong> &mdash; Compress JSON
              to reduce payload size in APIs, webhooks, and on-chain metadata.
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
              href="/crypto/abi-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ABI Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Ethereum smart contract function calls and
                parameters using ABI specifications.
              </p>
            </Link>
            <Link
              href="/crypto/jwt-decoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JWT Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decode and inspect JSON Web Tokens to view header, payload, and
                signature claims.
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
                Encode and decode URL components for safe transmission in query
                strings and API requests.
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
