import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import WordCounterTool from "./WordCounterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Word Counter",
  description:
    "Count words, characters, sentences, and paragraphs instantly. Get reading time estimates, character counts with and without spaces, and word frequency analysis.",
  path: "/crypto/word-counter",
});

const faqs = [
  {
    question: "How does the word counter work?",
    answer:
      "The word counter splits your text by whitespace to count words, uses punctuation marks (periods, exclamation marks, question marks) to count sentences, and detects blank lines to count paragraphs. Character counts include all characters including spaces, with a separate count excluding spaces.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated using an average reading speed of 238 words per minute, based on research by Brysbaert (2019). Speaking time uses 150 words per minute, which is the average pace for presentations and speeches.",
  },
  {
    question: "What counts as a word?",
    answer:
      "A word is defined as any sequence of non-whitespace characters separated by spaces, tabs, or line breaks. Hyphenated words like 'well-known' count as one word. Numbers and abbreviations are also counted as words.",
  },
  {
    question: "What counts as a sentence?",
    answer:
      "A sentence is detected by splitting text on periods (.), exclamation marks (!), and question marks (?). Multiple consecutive punctuation marks (like '...' or '?!') are treated as a single sentence boundary.",
  },
  {
    question: "Is my text stored or sent to a server?",
    answer:
      "No. All counting happens entirely in your browser using JavaScript. Your text never leaves your device and is not stored, logged, or transmitted anywhere.",
  },
  {
    question: "What is the character limit for Twitter and meta descriptions?",
    answer:
      "Twitter/X posts have a 280-character limit. Google meta descriptions typically display up to 155-160 characters. Meta titles should be under 60 characters. You can use this word counter to check your text fits within these limits.",
  },
];

export default function WordCounterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Word Counter",
            url: "https://evmtools.dev/crypto/word-counter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Count words, characters, sentences, and paragraphs instantly. Get reading time estimates and word frequency analysis.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="word-counter">
        <WordCounterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Word Counter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online word counter gives you instant statistics about
              your text. Whether you are writing a blog post, academic essay,
              social media post, or meta description, follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Type or paste your text</strong> into the text area. The
                word count, character count, sentence count, and paragraph count
                update in real time as you type.
              </li>
              <li>
                <strong>Check the summary cards</strong> at the top for the four
                main metrics: words, characters, sentences, and paragraphs.
              </li>
              <li>
                <strong>View detailed statistics</strong> below the text area,
                including characters without spaces, line count, estimated
                reading time, and speaking time.
              </li>
              <li>
                <strong>Review word frequency</strong> to see which words appear
                most often in your text, useful for SEO keyword analysis.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. Your text is never sent
              to a server, making this tool safe for confidential content.
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
              <strong>Blog post writing</strong> &mdash; Check word count to
              meet target lengths for SEO (1,500-2,500 words for long-form
              content).
            </li>
            <li>
              <strong>Academic essays</strong> &mdash; Verify your essay meets
              minimum or maximum word count requirements.
            </li>
            <li>
              <strong>Social media posts</strong> &mdash; Ensure posts fit
              within platform character limits (280 for Twitter/X, 2,200 for
              Instagram).
            </li>
            <li>
              <strong>SEO meta descriptions</strong> &mdash; Keep meta
              descriptions under 160 characters and titles under 60 characters.
            </li>
            <li>
              <strong>Presentation preparation</strong> &mdash; Estimate
              speaking time based on word count for timed presentations.
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
              href="/crypto/character-counter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Character Counter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Count characters with and without spaces, with limits for
                Twitter, meta descriptions, and more.
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
            <Link
              href="/crypto/lorem-ipsum-generator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Lorem Ipsum Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate placeholder text by paragraphs, sentences, or words.
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
