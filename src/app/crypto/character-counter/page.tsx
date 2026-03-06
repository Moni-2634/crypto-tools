import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import CharacterCounterTool from "./CharacterCounterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Character Counter",
  description:
    "Count characters with and without spaces online. Check text against Twitter, meta description, and other platform character limits. Real-time character breakdown.",
  path: "/crypto/character-counter",
});

const faqs = [
  {
    question: "What is the difference between characters and characters without spaces?",
    answer:
      "Characters count includes every single character in your text: letters, numbers, spaces, punctuation, and special characters. Characters without spaces excludes all whitespace characters (spaces, tabs, line breaks), giving you the count of actual visible characters.",
  },
  {
    question: "What is the Twitter/X character limit?",
    answer:
      "Twitter/X has a 280-character limit for standard posts. This includes all characters: letters, numbers, spaces, emojis, and punctuation. URLs are shortened to 23 characters regardless of their actual length. Twitter Blue/Premium subscribers can post up to 25,000 characters.",
  },
  {
    question: "What is the ideal length for a meta description?",
    answer:
      "Google typically displays 155-160 characters of a meta description in search results. Descriptions longer than this get truncated with an ellipsis. For best results, keep your meta descriptions between 120-160 characters and include your target keyword near the beginning.",
  },
  {
    question: "How are special characters counted?",
    answer:
      "Special characters include punctuation marks, symbols, and any character that is not a letter, digit, or whitespace. Examples include: @, #, $, %, &, !, ?, commas, periods, brackets, and quotes. Each special character counts as one character.",
  },
  {
    question: "Does this tool count Unicode and emoji characters?",
    answer:
      "Yes. This tool counts each character as JavaScript sees it. Most emojis count as 2 characters due to their UTF-16 encoding. Some complex emojis (like skin-tone variants or family emojis) may count as more. The tool uses the standard JavaScript string length property.",
  },
  {
    question: "Is my text stored or sent anywhere?",
    answer:
      "No. All character counting happens entirely in your browser using JavaScript. Your text never leaves your device and is not stored, logged, or transmitted to any server.",
  },
];

export default function CharacterCounterPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Character Counter",
            url: "https://evmtools.dev/crypto/character-counter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Count characters with and without spaces online. Check text against platform character limits with real-time breakdown.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="character-counter">
        <CharacterCounterTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Character Counter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online character counter helps you check if your text
              meets specific character limits for social media, SEO, and other
              platforms. Here is how to use it:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Type or paste your text</strong> into the text area. All
                counts update instantly as you type.
              </li>
              <li>
                <strong>Select a character limit</strong> by clicking one of the
                platform buttons (Twitter, Meta Description, etc.) to see a
                progress bar and remaining character count.
              </li>
              <li>
                <strong>Check the summary cards</strong> for total characters,
                characters without spaces, word count, and sentence count.
              </li>
              <li>
                <strong>Review the breakdown</strong> to see how many letters,
                digits, spaces, and special characters your text contains.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. Your text is never sent
              to a server.
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
              <strong>Twitter/X posts</strong> &mdash; Ensure your tweets fit
              within the 280-character limit before posting.
            </li>
            <li>
              <strong>SEO meta descriptions</strong> &mdash; Keep descriptions
              under 160 characters to avoid truncation in Google search results.
            </li>
            <li>
              <strong>SEO title tags</strong> &mdash; Keep titles under 60
              characters for proper display in search results.
            </li>
            <li>
              <strong>SMS messages</strong> &mdash; Check that text messages fit
              within the 160-character SMS limit.
            </li>
            <li>
              <strong>Form validation</strong> &mdash; Verify text lengths
              before submitting to APIs or databases with character limits.
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
                Count words, sentences, paragraphs with reading and speaking
                time estimates.
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
            <Link
              href="/crypto/html-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                HTML Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode HTML entities for safe display in web pages.
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
