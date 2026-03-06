import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import ImageToBase64Tool from "./ImageToBase64Tool";

export const metadata: Metadata = generateToolMetadata({
  title: "Image to Base64 Converter",
  description:
    "Convert images to Base64 encoded strings online. Drag and drop PNG, JPG, GIF, SVG, or WebP files to get Data URIs for embedding in HTML, CSS, and JSON. Free, client-side tool.",
  path: "/crypto/image-to-base64",
});

const faqs = [
  {
    question: "What is Base64 image encoding?",
    answer:
      "Base64 encoding converts binary image data into an ASCII text string using 64 characters (A-Z, a-z, 0-9, +, /). This allows images to be embedded directly in HTML, CSS, JavaScript, and JSON files as text, eliminating the need for separate image file requests.",
  },
  {
    question: "What is a Data URI?",
    answer:
      "A Data URI is a scheme (data:) that allows you to include data inline in web pages as if they were external resources. For images, a Data URI looks like 'data:image/png;base64,iVBOR...' and can be used directly as the src attribute of an img tag or as a CSS background-image URL.",
  },
  {
    question: "Does Base64 encoding increase file size?",
    answer:
      "Yes, Base64 encoding increases the data size by approximately 33% compared to the original binary file. For example, a 30 KB image becomes roughly 40 KB when Base64 encoded. This trade-off is acceptable for small images (icons, thumbnails) but not recommended for large images.",
  },
  {
    question: "When should I use Base64 images?",
    answer:
      "Base64 images are ideal for small icons, thumbnails, or UI elements (under 10 KB) where eliminating an HTTP request improves performance. They are also useful in email templates where external images may be blocked, in single-file HTML documents, and in JSON payloads that need to include image data.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "This tool supports all common image formats including PNG, JPEG/JPG, GIF, SVG, WebP, ICO, BMP, and TIFF. The Data URI will use the correct MIME type for each format (e.g., data:image/png for PNG files).",
  },
  {
    question: "Is my image data sent to a server?",
    answer:
      "No. All processing happens entirely in your browser using the FileReader API. Your images never leave your device and are not uploaded to any server. This makes the tool safe for sensitive or private images.",
  },
];

export default function ImageToBase64Page() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Image to Base64 Converter",
            url: "https://evmtools.dev/crypto/image-to-base64",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert images to Base64 encoded strings online. Supports PNG, JPG, GIF, SVG, WebP.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="image-to-base64">
        <ImageToBase64Tool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Image to Base64 Converter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online tool converts any image file to a Base64 encoded
              string. Use the resulting Data URI to embed images directly in
              your HTML, CSS, or JavaScript code.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Upload your image</strong> &mdash; click the upload
                area or drag and drop an image file (PNG, JPG, GIF, SVG, WebP,
                up to 10 MB).
              </li>
              <li>
                <strong>Choose output format</strong> &mdash; select
                &quot;Data URI&quot; for a ready-to-use string with MIME type
                prefix, or &quot;Raw Base64&quot; for just the encoded data.
              </li>
              <li>
                <strong>Copy the output</strong> &mdash; use the copy button
                to copy the Base64 string to your clipboard.
              </li>
              <li>
                <strong>Use in your code</strong> &mdash; paste the Data URI
                directly into an HTML img src attribute, CSS
                background-image, or JSON payload.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser using the FileReader API.
              Your images are never uploaded to any server.
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
              <strong>Inline images in HTML</strong> &mdash; Embed small icons
              and logos directly in HTML without extra HTTP requests.
            </li>
            <li>
              <strong>CSS background images</strong> &mdash; Use Data URIs as
              background-image values for small UI elements and patterns.
            </li>
            <li>
              <strong>Email templates</strong> &mdash; Include images inline
              in HTML emails where external images may be blocked.
            </li>
            <li>
              <strong>API payloads</strong> &mdash; Send image data as Base64
              strings in JSON API requests and responses.
            </li>
            <li>
              <strong>NFT metadata</strong> &mdash; Embed small images
              directly in on-chain NFT metadata JSON to avoid external
              dependencies.
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
                Encode and decode Base64 strings for text and hex data.
              </p>
            </Link>
            <Link
              href="/crypto/qr-code-generator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                QR Code Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate QR codes from text, URLs, and other data.
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
                Format and validate JSON data for API responses and config files.
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
