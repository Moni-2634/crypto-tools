import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import LoremIpsumGeneratorTool from "./LoremIpsumGeneratorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Lorem Ipsum Generator",
  description:
    "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free online dummy text generator for design and development projects.",
  path: "/crypto/lorem-ipsum-generator",
});

const faqs = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is placeholder text derived from a Latin work by Cicero written in 45 BC. It has been used as standard dummy text in the printing and typesetting industry since the 1500s. The standard passage begins with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'",
  },
  {
    question: "Why do developers and designers use Lorem Ipsum?",
    answer:
      "Lorem Ipsum provides realistic-looking text for layouts and mockups without distracting from the design. Unlike using 'content here' or repeating letters, Lorem Ipsum has a natural distribution of letters and word lengths that mimics real text, giving a more accurate visual representation.",
  },
  {
    question: "Can I generate a specific number of words?",
    answer:
      "Yes. Switch to 'words' mode and enter your desired word count (up to 500 words). The generator will produce exactly that many words of lorem ipsum text. You can also generate by paragraphs (up to 20) or sentences (up to 50).",
  },
  {
    question: "Is the generated text the same every time?",
    answer:
      "No. Each generation produces randomized text from a pool of Latin words. While the structure follows standard Lorem Ipsum patterns, the exact word combinations vary. Click 'Regenerate' to get a new variation with the same settings.",
  },
  {
    question: "What does 'Start with Lorem ipsum' mean?",
    answer:
      "When this option is enabled, the generated text begins with the classic 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' opening. This is the traditional way Lorem Ipsum is used. Disable it if you want fully randomized text from the start.",
  },
];

export default function LoremIpsumGeneratorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Lorem Ipsum Generator",
            url: "https://evmtools.dev/crypto/lorem-ipsum-generator",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate lorem ipsum placeholder text by paragraphs, sentences, or words for design and development projects.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="lorem-ipsum-generator">
        <LoremIpsumGeneratorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Lorem Ipsum Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online Lorem Ipsum generator creates placeholder text
              for your design and development projects. Generate text by
              paragraphs, sentences, or word count:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Choose your generation mode</strong> &mdash; select
                paragraphs, sentences, or words depending on how much text you
                need.
              </li>
              <li>
                <strong>Set the count</strong> &mdash; enter how many
                paragraphs, sentences, or words to generate.
              </li>
              <li>
                <strong>Toggle the Lorem ipsum option</strong> &mdash; enable to
                start with the classic opening, or disable for fully random
                text.
              </li>
              <li>
                <strong>Copy the output</strong> using the copy button and paste
                it into your design tool, code editor, or CMS.
              </li>
            </ol>
            <p>
              Use the quick presets for common configurations, or click
              Regenerate to get a new random variation.
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
              <strong>Web design mockups</strong> &mdash; Fill page layouts with
              realistic text to evaluate typography, spacing, and visual
              hierarchy.
            </li>
            <li>
              <strong>UI prototyping</strong> &mdash; Add placeholder content to
              component libraries and design systems.
            </li>
            <li>
              <strong>Content management</strong> &mdash; Populate CMS templates
              and blog layouts while waiting for final content.
            </li>
            <li>
              <strong>Font testing</strong> &mdash; Compare how different fonts
              look with varying amounts of text.
            </li>
            <li>
              <strong>Presentation slides</strong> &mdash; Fill slide layouts
              with placeholder text during the design phase.
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
              href="/crypto/word-counter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Word Counter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Count words, characters, sentences, and paragraphs in any text.
              </p>
            </Link>
            <Link
              href="/crypto/character-counter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Character Counter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Count characters with and without spaces with platform limit
                checking.
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
                Write markdown and see a live rendered preview side by side.
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
