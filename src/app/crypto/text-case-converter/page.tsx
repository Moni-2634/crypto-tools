import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import TextCaseConverterTool from "./TextCaseConverterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Text Case Converter",
  description:
    "Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, Title Case, CONSTANT_CASE, and more. Free online case converter for developers.",
  path: "/crypto/text-case-converter",
});

const faqs = [
  {
    question: "What is text case conversion?",
    answer:
      "Text case conversion is the process of transforming text from one naming convention to another. Different programming languages and frameworks use different conventions: JavaScript uses camelCase for variables (myVariable), React uses PascalCase for components (MyComponent), Python uses snake_case (my_variable), CSS uses kebab-case (my-class), and environment variables use CONSTANT_CASE (MAX_RETRIES).",
  },
  {
    question: "What is camelCase?",
    answer:
      "camelCase is a naming convention where words are joined without spaces, the first word starts with a lowercase letter, and each subsequent word starts with an uppercase letter (e.g., getUserName, firstName, isActive). It is the standard convention for variables and function names in JavaScript, TypeScript, Java, and C#.",
  },
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter (myVariable), while PascalCase starts with an uppercase letter (MyVariable). camelCase is used for variables and functions, while PascalCase is used for class names, React components, TypeScript interfaces, and C# methods. PascalCase is sometimes called UpperCamelCase.",
  },
  {
    question: "When should I use snake_case vs kebab-case?",
    answer:
      "snake_case (words separated by underscores) is the convention in Python, Ruby, Rust, and SQL/database columns. kebab-case (words separated by hyphens) is used in CSS class names, HTML attributes, URL slugs, and CLI arguments. kebab-case cannot be used as variable names in most programming languages because the hyphen is treated as a minus operator.",
  },
  {
    question: "How does this tool detect the input case?",
    answer:
      "The tool analyzes the input text for patterns: it checks for separators (underscores, hyphens, dots), case transitions (lowercase to uppercase for camelCase/PascalCase), and character casing (all upper, all lower). It then displays the detected case to help you understand how your input will be parsed before conversion.",
  },
  {
    question: "Does this tool handle abbreviations and numbers?",
    answer:
      "Yes, the tool intelligently handles abbreviations and numbers. For example, 'HTMLParser' is split into 'HTML' and 'Parser', 'getUserID' becomes 'get', 'user', 'ID', and 'item2Count' is handled correctly. This ensures accurate conversion between all supported case formats.",
  },
];

export default function TextCaseConverterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Text Case Converter",
            url: "https://evmtools.dev/crypto/text-case-converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, Title Case, and more.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="text-case-converter">
        <TextCaseConverterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Text Case Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool converts text between 13 different case
              formats used in programming. It automatically detects the input
              format and provides instant conversion to all supported cases.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your text</strong> &mdash; type or paste
                text in any format (camelCase, snake_case, natural sentence,
                etc.).
              </li>
              <li>
                <strong>View all conversions</strong> &mdash; the tool
                instantly shows the text converted to all 13 case formats.
              </li>
              <li>
                <strong>Copy any result</strong> &mdash; click the copy
                button next to any conversion to copy it to your clipboard.
              </li>
              <li>
                <strong>Check detected case</strong> &mdash; the stats
                section shows the detected input case, character count, and
                word count.
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
              <strong>Cross-language development</strong> &mdash; Convert
              variable names when porting code between JavaScript (camelCase),
              Python (snake_case), and other languages.
            </li>
            <li>
              <strong>API integration</strong> &mdash; Transform JSON field
              names from snake_case API responses to camelCase for JavaScript
              usage.
            </li>
            <li>
              <strong>CSS class naming</strong> &mdash; Convert component
              names from PascalCase to kebab-case for CSS class names
              following BEM or other conventions.
            </li>
            <li>
              <strong>Database schema design</strong> &mdash; Convert entity
              names from PascalCase to snake_case for database column naming.
            </li>
            <li>
              <strong>Environment variables</strong> &mdash; Convert
              configuration keys to CONSTANT_CASE for .env files.
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
              href="/crypto/slugify"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Slugify Tool
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert text to URL-friendly slugs with customizable
                separators.
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
                Test regular expressions with real-time matching and common
                pattern examples.
              </p>
            </Link>
            <Link
              href="/crypto/json-formatter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JSON Formatter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Format and validate JSON data with pretty-printing and
                minification.
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
