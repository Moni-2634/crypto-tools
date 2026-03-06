import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import QrCodeGeneratorTool from "./QrCodeGeneratorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "QR Code Generator",
  description:
    "Generate QR codes from text, URLs, emails, or Wi-Fi credentials online. Customize colors and module size, then download as PNG. Free, client-side, no sign-up required.",
  path: "/crypto/qr-code-generator",
});

const faqs = [
  {
    question: "What is a QR code?",
    answer:
      "A QR (Quick Response) code is a two-dimensional barcode that can be scanned by smartphones and barcode readers. It can encode URLs, plain text, email addresses, Wi-Fi credentials, phone numbers, and more. QR codes were invented in 1994 by Denso Wave for tracking automotive parts and have since become ubiquitous for sharing information.",
  },
  {
    question: "How do I generate a QR code online?",
    answer:
      "Simply type or paste your text, URL, or data into the input field and the QR code is generated instantly. You can customize the foreground and background colors, adjust the module size for resolution, and then download the QR code as a PNG image or copy it to your clipboard.",
  },
  {
    question: "Is this QR code generator free?",
    answer:
      "Yes, this QR code generator is completely free with no sign-up, watermarks, or usage limits. The QR code is generated entirely in your browser using a pure JavaScript implementation, so your data never leaves your device.",
  },
  {
    question: "What types of data can I encode in a QR code?",
    answer:
      "You can encode any text-based data including website URLs, plain text, email addresses (mailto:), phone numbers (tel:), SMS messages, Wi-Fi network configurations (WIFI:T:WPA;S:NetworkName;P:Password;;), geographic coordinates, calendar events, and vCard contact information.",
  },
  {
    question: "What is the maximum data a QR code can hold?",
    answer:
      "This tool supports up to approximately 271 characters in byte mode (QR version 10). Standard QR codes can hold up to 4,296 alphanumeric characters at the largest version (40), but higher versions produce very dense codes that may be difficult to scan. For most URLs and text, version 10 is more than sufficient.",
  },
  {
    question: "Can I customize the colors of my QR code?",
    answer:
      "Yes, you can change both the foreground (module) color and the background color using the color pickers. Make sure to maintain sufficient contrast between foreground and background for reliable scanning. Dark modules on a light background typically work best.",
  },
];

export default function QrCodeGeneratorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "QR Code Generator",
            url: "https://evmtools.dev/crypto/qr-code-generator",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate QR codes from text, URLs, emails, or Wi-Fi credentials online. Customize colors, download as PNG.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="qr-code-generator">
        <QrCodeGeneratorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This QR Code Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online QR code generator lets you create QR codes
              instantly from any text or URL. Everything runs locally in your
              browser with no server requests.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your data</strong> &mdash; type or paste a URL,
                text, email address, or Wi-Fi configuration into the input
                field.
              </li>
              <li>
                <strong>Customize appearance</strong> &mdash; adjust the module
                size for resolution, and pick custom foreground and background
                colors.
              </li>
              <li>
                <strong>Download or copy</strong> &mdash; click &quot;Download
                PNG&quot; to save the QR code as an image file, or &quot;Copy
                Image&quot; to copy it to your clipboard.
              </li>
              <li>
                <strong>Test your code</strong> &mdash; scan the generated QR
                code with your phone camera to verify it works correctly.
              </li>
            </ol>
            <p>
              Your data is never sent to a server. The QR code is generated
              entirely in your browser using a pure JavaScript implementation.
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
              <strong>Website links</strong> &mdash; Share URLs for websites,
              landing pages, app download links, or social media profiles.
            </li>
            <li>
              <strong>Wi-Fi sharing</strong> &mdash; Generate QR codes for
              Wi-Fi network credentials so guests can connect by scanning.
            </li>
            <li>
              <strong>Business cards</strong> &mdash; Add QR codes to business
              cards linking to your portfolio, LinkedIn, or contact info.
            </li>
            <li>
              <strong>Crypto wallet addresses</strong> &mdash; Share
              cryptocurrency wallet addresses via QR code for easy sending.
            </li>
            <li>
              <strong>Event tickets and check-in</strong> &mdash; Generate
              unique QR codes for event registration and ticket validation.
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
              href="/crypto/base64-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Base64 Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Base64 strings for embedding data in URLs
                and documents.
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
                Encode and decode URL components for safe transmission in
                query strings.
              </p>
            </Link>
            <Link
              href="/crypto/image-to-base64"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Image to Base64
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert image files to Base64 encoded strings for embedding
                in HTML, CSS, and JSON.
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
