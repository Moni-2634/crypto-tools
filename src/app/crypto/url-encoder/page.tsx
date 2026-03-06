import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import UrlEncoderTool from "./UrlEncoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "URL Encoder / Decoder",
  description:
    "Encode and decode URL components online. Compare encodeURIComponent vs encodeURI, decode percent-encoded strings, and handle special characters for web development.",
  path: "/crypto/url-encoder",
});

const faqs = [
  {
    question: "What is URL encoding (percent encoding)?",
    answer:
      "URL encoding, also called percent encoding, replaces unsafe or reserved characters in a URL with a percent sign (%) followed by two hexadecimal digits representing the character's ASCII value. For example, a space becomes %20 and an ampersand becomes %26.",
  },
  {
    question:
      "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI encodes a full URI but preserves characters that have special meaning in URLs like ://?#@. encodeURIComponent encodes everything except letters, digits, and - _ . ~ making it suitable for encoding individual query parameter values.",
  },
  {
    question: "Why do URLs need to be encoded?",
    answer:
      "URLs can only contain a limited set of ASCII characters. Special characters like spaces, ampersands, and non-ASCII characters (such as Unicode) must be percent-encoded so that servers and browsers interpret the URL correctly without ambiguity.",
  },
  {
    question: "Which characters are safe to use in a URL without encoding?",
    answer:
      "Unreserved characters that do not require encoding include uppercase and lowercase letters (A-Z, a-z), digits (0-9), and four special characters: hyphen (-), underscore (_), period (.), and tilde (~). All other characters should be percent-encoded when used in URL components.",
  },
  {
    question: "What does %20 mean in a URL?",
    answer:
      "%20 is the percent-encoded representation of a space character. Some systems use a plus sign (+) instead of %20 to represent spaces in query strings, but %20 is the standard encoding defined by RFC 3986.",
  },
  {
    question: "How do I encode special characters in API query parameters?",
    answer:
      "Use encodeURIComponent on each parameter key and value before joining them with & and =. This ensures characters like &, =, and + within values are properly escaped and not mistaken for URL delimiters.",
  },
];

export default function UrlEncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "URL Encoder / Decoder",
            url: "https://evmtools.dev/crypto/url-encoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Encode and decode URL components online. Compare encodeURIComponent vs encodeURI, decode percent-encoded strings, and handle special characters for web development.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqJsonLd(faqs)),
        }}
      />
      <ToolLayout slug="url-encoder">
        <UrlEncoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This URL Encoder / Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool converts text to and from percent-encoded URL format
              instantly in your browser. It supports both{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm">
                encodeURIComponent
              </code>{" "}
              and{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm">
                encodeURI
              </code>{" "}
              modes, so you can handle everything from individual query
              parameters to full URLs containing Unicode characters.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste your URL or text</strong> into the input area.
                This can be a full URL, a query string value, or any text
                containing special characters.
              </li>
              <li>
                <strong>Select the operation</strong> &mdash; choose Encode to
                convert special characters to percent-encoded format, or Decode
                to convert percent-encoded strings back to readable text.
              </li>
              <li>
                <strong>Choose the encoding mode</strong> when encoding.
                Use encodeURIComponent for query parameter values and
                encodeURI for complete URLs where you want to preserve
                structural characters like :// and ?.
              </li>
              <li>
                <strong>Copy the result</strong> with a single click and paste
                it into your code, API client, or browser address bar.
              </li>
            </ol>
            <p>
              Everything runs client-side in your browser. Your URLs and data
              are never sent to any server, which is important when working with
              API keys, authentication tokens, or sensitive query parameters in
              blockchain RPC endpoints.
            </p>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>API query parameters</strong> &mdash; Encode values
              containing special characters like &amp;, =, and + before
              appending them to REST API or GraphQL request URLs.
            </li>
            <li>
              <strong>Form data encoding</strong> &mdash; Prepare user-submitted
              data for application/x-www-form-urlencoded POST requests by
              encoding each field value.
            </li>
            <li>
              <strong>Redirect URLs</strong> &mdash; Encode callback and
              redirect URLs passed as query parameters in OAuth flows to prevent
              breaking the outer URL structure.
            </li>
            <li>
              <strong>Webhook payloads</strong> &mdash; Encode URLs embedded in
              webhook configurations for services like Discord, Slack, or
              on-chain event notification systems.
            </li>
            <li>
              <strong>Ethereum JSON-RPC URLs</strong> &mdash; Encode API keys
              and special characters in Alchemy, Infura, or QuickNode RPC
              endpoint URLs used in wallet and dApp configurations.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/crypto/base64-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Base64 Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Base64 strings for data transport and
                embedding.
              </p>
            </Link>
            <Link
              href="/crypto/utf8-hex-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                UTF-8 / Hex Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between UTF-8 text and hexadecimal representations.
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
                Format, validate, and minify JSON data with syntax highlighting.
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
