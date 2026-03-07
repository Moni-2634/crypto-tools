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
  title: `Free Online Converters - JSON, CSV, Base64, Hex, Color | ${SITE_NAME}`,
  description:
    "Free online converter tools: JSON to CSV, JSON formatter, Base64 encoder, hex/decimal converter, color picker, number base converter, image to Base64, HTML encoder, URL encoder.",
  openGraph: {
    title: `Free Online Converters - JSON, CSV, Base64, Hex, Color | ${SITE_NAME}`,
    description:
      "Free online converter tools: JSON to CSV, Base64, hex/decimal, color, number base, image to Base64, HTML encoder, URL encoder.",
    url: `${SITE_URL}/tools/converters`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Online Converters - JSON, CSV, Base64, Hex, Color | ${SITE_NAME}`,
    description:
      "Free online converter tools: JSON, CSV, Base64, hex, color, number base, and more.",
  },
  alternates: {
    canonical: `${SITE_URL}/tools/converters`,
  },
};

const converterSlugs = [
  "json-to-csv",
  "json-formatter",
  "base64-encoder",
  "hex-decimal-converter",
  "color-picker",
  "number-base-converter",
  "image-to-base64",
  "html-encoder",
  "url-encoder",
];

const faqs = [
  {
    question: "How do I convert JSON to CSV online?",
    answer:
      "Paste your JSON array into the JSON to CSV tool. It automatically detects the structure, flattens nested objects, and generates a CSV file with proper escaping. You can customize the delimiter (comma, tab, semicolon) and download the result as a .csv file.",
  },
  {
    question: "What is Base64 encoding used for?",
    answer:
      "Base64 encoding converts binary data into ASCII text, making it safe to transmit through text-based protocols like email (MIME), URLs, and JSON. Common uses include embedding images in HTML/CSS (data URIs), encoding API authentication tokens, and transmitting binary data in REST APIs.",
  },
  {
    question: "How do I convert between hex and decimal?",
    answer:
      "Use the Hex / Decimal Converter to instantly convert numbers between hexadecimal (base 16) and decimal (base 10). This is essential for Ethereum development where block numbers, gas values, and addresses are often displayed in hex format.",
  },
  {
    question: "What color formats does the Color Picker support?",
    answer:
      "The Color Picker converts between HEX (#FF5733), RGB (rgb(255, 87, 51)), and HSL (hsl(11, 100%, 60%)) color formats. It also checks WCAG contrast ratios for accessibility, generates shade variations, and provides ready-to-use CSS values.",
  },
  {
    question: "How do I convert an image to Base64?",
    answer:
      "Drag and drop an image file (PNG, JPG, GIF, SVG, or WebP) into the Image to Base64 tool. It generates a Base64-encoded data URI string that you can embed directly in HTML img tags, CSS background properties, or JSON payloads without needing a separate image file.",
  },
  {
    question: "What is the difference between URL encoding and HTML encoding?",
    answer:
      "URL encoding (percent-encoding) converts special characters into %XX format for use in URLs and query strings. HTML encoding converts characters like <, >, &, and quotes into HTML entities (&lt;, &gt;, &amp;) for safe display in web pages. They serve different purposes but both prevent injection attacks.",
  },
];

const toolDetails = [
  {
    slug: "json-to-csv",
    title: "JSON to CSV Converter",
    description:
      "Convert JSON arrays to CSV spreadsheet format and vice versa. Handles nested objects, custom delimiters, proper CSV escaping, and file downloads. Works with API responses, database exports, and any structured JSON data.",
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter / Validator",
    description:
      "Format, minify, and validate JSON data. Pretty-print with configurable indentation or compress to a single line. Get detailed error messages pointing to the exact line and character of syntax errors.",
  },
  {
    slug: "base64-encoder",
    title: "Base64 Encoder / Decoder",
    description:
      "Encode text or hex data to Base64 and decode Base64 back to the original format. Supports standard Base64 and URL-safe Base64 variants used in JWTs, data URIs, and API authentication.",
  },
  {
    slug: "hex-decimal-converter",
    title: "Hex / Decimal Converter",
    description:
      "Convert between hexadecimal and decimal numbers instantly. Handles arbitrarily large numbers using BigInt. Essential for working with Ethereum block numbers, gas values, and raw transaction data.",
  },
  {
    slug: "color-picker",
    title: "Color Picker / Converter",
    description:
      "Pick colors visually and convert between HEX, RGB, and HSL formats. Check WCAG contrast ratios for accessibility compliance, generate shade variations, and copy CSS-ready color values.",
  },
  {
    slug: "number-base-converter",
    title: "Number Base Converter",
    description:
      "Convert numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Supports arbitrarily large numbers with BigInt for working with cryptographic values and large integers.",
  },
  {
    slug: "image-to-base64",
    title: "Image to Base64 Converter",
    description:
      "Convert images to Base64-encoded data URI strings. Drag and drop PNG, JPG, GIF, SVG, or WebP files and get inline-ready strings for HTML, CSS, and JSON. Shows file size and encoded size.",
  },
  {
    slug: "html-encoder",
    title: "HTML Encoder / Decoder",
    description:
      "Encode special characters to HTML entities and decode entities back to characters. Prevents XSS vulnerabilities when displaying user-generated content in web pages. Handles named entities, decimal, and hexadecimal references.",
  },
  {
    slug: "url-encoder",
    title: "URL Encoder / Decoder",
    description:
      "Encode and decode URL components using percent-encoding. Compare the behavior of encodeURIComponent and encodeURI. Includes a reference table of common URL-encoded characters.",
  },
];

export default function ConvertersPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "All Tools", url: `${SITE_URL}/tools` },
    { name: "Converters", url: `${SITE_URL}/tools/converters` },
  ]);

  const faqJsonLd = generateFaqJsonLd(faqs);

  const converterTools = converterSlugs
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
          <span className="text-gray-900 dark:text-white">Converters</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Free Online Converters
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Convert between JSON, CSV, Base64, hex, colors, number bases, and
          more. All tools run entirely in your browser.
        </p>
      </div>

      <AdSlot slotId="converters-top" format="horizontal" className="my-4" />

      {/* Converter Tools Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Converter Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {converterTools.map((tool) => (
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
          About Each Converter
        </h2>
        <div className="space-y-6">
          {toolDetails.map((detail) => (
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

      <AdSlot slotId="converters-mid" format="horizontal" className="my-4" />

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
