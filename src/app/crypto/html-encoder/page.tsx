import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import HtmlEncoderTool from "./HtmlEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "HTML Encoder / Decoder",
  description:
    "Encode and decode HTML entities online. Convert special characters to HTML entities for safe display in web pages. Supports named and numeric entities. Free HTML entity tool.",
  path: "/crypto/html-encoder",
});

const faqs = [
  {
    question: "What is HTML encoding?",
    answer:
      "HTML encoding converts special characters into their HTML entity equivalents so they display correctly in web pages. For example, < becomes &lt;, > becomes &gt;, and & becomes &amp;. Without encoding, the browser would interpret these characters as HTML tags.",
  },
  {
    question: "Why is HTML encoding important for security?",
    answer:
      "HTML encoding prevents Cross-Site Scripting (XSS) attacks. If user input is displayed on a web page without encoding, an attacker could inject malicious HTML or JavaScript code (like <script>alert('XSS')</script>). Encoding neutralizes these injections by converting < and > to their entity equivalents.",
  },
  {
    question: "What is the difference between named and numeric entities?",
    answer:
      "Named entities use descriptive names like &amp; for &, &lt; for <, and &copy; for the copyright symbol. Numeric entities use decimal (&amp;#38;) or hexadecimal (&amp;#x26;) character codes. Both produce the same result, but named entities are more readable.",
  },
  {
    question: "When should I use HTML encoding?",
    answer:
      "You should encode text when displaying user-generated content on web pages, embedding text in HTML attributes, including special characters in XML/HTML documents, and when storing HTML content in databases or APIs that will later be rendered on web pages.",
  },
  {
    question: "What does 'encode all characters' do?",
    answer:
      "The 'encode all characters' option converts every character to its numeric HTML entity (e.g., 'A' becomes &#65;). This is useful for obfuscating email addresses to prevent spam bots, or for ensuring all characters are safely encoded regardless of the document's character encoding.",
  },
  {
    question: "Is my text stored or sent to a server?",
    answer:
      "No. All encoding and decoding happens entirely in your browser using JavaScript. Your text never leaves your device and is not stored, logged, or transmitted anywhere.",
  },
];

export default function HtmlEncoderPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "HTML Encoder / Decoder",
            url: "https://evmtools.dev/crypto/html-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode HTML entities online. Convert special characters to HTML entities for safe web display.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="html-encoder">
        <HtmlEncoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This HTML Encoder / Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online HTML encoder and decoder converts between raw
              text and HTML entities. Use it to safely display special
              characters in web pages or to decode HTML entities back to
              readable text:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Choose encode or decode mode</strong> using the mode
                tabs at the top.
              </li>
              <li>
                <strong>Paste or type your text</strong> in the input area.
              </li>
              <li>
                <strong>View the result</strong> in the output area below. The
                conversion happens instantly.
              </li>
              <li>
                <strong>Copy the output</strong> using the copy button to use in
                your HTML, JavaScript, or other code.
              </li>
            </ol>
            <p>
              Enable &quot;Encode all characters&quot; to convert every
              character to numeric entities, useful for email obfuscation and
              maximum compatibility.
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
              <strong>XSS prevention</strong> &mdash; Encode user input before
              displaying it in HTML to prevent cross-site scripting attacks.
            </li>
            <li>
              <strong>Code display</strong> &mdash; Encode HTML code snippets so
              they display as text rather than being rendered by the browser.
            </li>
            <li>
              <strong>XML/HTML documents</strong> &mdash; Ensure special
              characters in content do not break document structure.
            </li>
            <li>
              <strong>Email obfuscation</strong> &mdash; Encode email addresses
              using numeric entities to hide them from spam bots.
            </li>
            <li>
              <strong>API development</strong> &mdash; Decode HTML entities
              received from APIs or web scrapers back to readable text.
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
                Encode and decode URL components for safe transmission in query
                strings.
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
                Encode and decode Base64 strings for data transmission and
                embedding.
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
                Write markdown and see a live preview with proper HTML
                rendering.
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
