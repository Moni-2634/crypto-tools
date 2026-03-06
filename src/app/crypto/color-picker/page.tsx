import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import ColorPickerTool from "./ColorPickerTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Color Picker / Converter",
  description:
    "Pick colors and convert between HEX, RGB, and HSL formats. Check WCAG contrast ratios, generate shades, and get CSS values. Free online color tool.",
  path: "/crypto/color-picker",
});

const faqs = [
  {
    question: "What is the difference between HEX, RGB, and HSL?",
    answer:
      "HEX is a 6-digit hexadecimal representation of color (e.g., #3B82F6). RGB defines color using Red, Green, and Blue values from 0-255 (e.g., rgb(59, 130, 246)). HSL uses Hue (0-360 degrees), Saturation (0-100%), and Lightness (0-100%) which is more intuitive for adjusting colors (e.g., hsl(217, 91%, 60%)).",
  },
  {
    question: "What is WCAG contrast ratio?",
    answer:
      "WCAG (Web Content Accessibility Guidelines) contrast ratio measures the luminance difference between foreground and background colors. The minimum ratio for normal text is 4.5:1 (AA level) and 7:1 for enhanced contrast (AAA level). Large text requires a minimum of 3:1.",
  },
  {
    question: "How do I pick a color from my screen?",
    answer:
      "Click the large color preview area to open your browser's native color picker. On most modern browsers, this includes an eyedropper tool that lets you pick any color visible on your screen.",
  },
  {
    question: "What color format should I use in CSS?",
    answer:
      "HEX is the most common format in CSS and is supported everywhere. RGB is useful when you need alpha transparency (rgba). HSL is the most developer-friendly for creating color variations, as you can easily adjust lightness and saturation while keeping the same hue.",
  },
  {
    question: "How do I generate color shades for a design system?",
    answer:
      "Select your base color using the picker or by entering a HEX value. The tool automatically generates 9 shades from lightest to darkest by varying the lightness value in HSL. Click any shade to use it as your new base color.",
  },
];

export default function ColorPickerPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Picker / Converter",
            url: "https://evmtools.dev/crypto/color-picker",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Pick colors and convert between HEX, RGB, and HSL formats. Check WCAG contrast ratios and generate color shades.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="color-picker">
        <ColorPickerTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Color Picker
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online color picker and converter makes it easy to work
              with colors in any format. Whether you are designing a website,
              checking accessibility compliance, or creating a color palette,
              follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select a color</strong> by clicking the color preview to
                open the native color picker, entering a HEX value, adjusting
                RGB sliders, or clicking a preset color.
              </li>
              <li>
                <strong>Copy color values</strong> in HEX, RGB, or HSL format
                using the copy buttons next to each value.
              </li>
              <li>
                <strong>Check accessibility</strong> &mdash; review the WCAG
                contrast ratios against black and white to ensure your color
                meets accessibility standards.
              </li>
              <li>
                <strong>Generate shades</strong> &mdash; use the shade strip to
                find lighter or darker variations of your color for consistent
                design palettes.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. No data is sent to any
              server.
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
              <strong>Web design</strong> &mdash; Convert brand colors between
              HEX, RGB, and HSL for CSS stylesheets.
            </li>
            <li>
              <strong>Accessibility testing</strong> &mdash; Check if text color
              meets WCAG AA or AAA contrast requirements against backgrounds.
            </li>
            <li>
              <strong>Design systems</strong> &mdash; Generate consistent shade
              scales for primary, secondary, and accent colors.
            </li>
            <li>
              <strong>Tailwind CSS</strong> &mdash; Get arbitrary color values
              for Tailwind utility classes like bg-[#hex] and text-[#hex].
            </li>
            <li>
              <strong>Brand consistency</strong> &mdash; Quickly convert colors
              between formats for different design tools and platforms.
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
              href="/crypto/hex-decimal-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Hex / Decimal Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between hexadecimal and decimal numbers for color values
                and development.
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
                Format and validate JSON data including design token
                configuration files.
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
