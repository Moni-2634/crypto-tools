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
  title: `Free Online Text Tools - Word Counter, Case Converter, Diff Checker | ${SITE_NAME}`,
  description:
    "Free online text tools: word counter, character counter, text case converter, diff checker, lorem ipsum generator, and markdown preview. All tools run in your browser.",
  openGraph: {
    title: `Free Online Text Tools - Word Counter, Case Converter, Diff Checker | ${SITE_NAME}`,
    description:
      "Free online text tools: word counter, character counter, text case converter, diff checker, lorem ipsum generator, and markdown preview.",
    url: `${SITE_URL}/tools/text-tools`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Online Text Tools - Word Counter, Case Converter, Diff Checker | ${SITE_NAME}`,
    description:
      "Free online text tools: word counter, character counter, case converter, diff checker, and more.",
  },
  alternates: {
    canonical: `${SITE_URL}/tools/text-tools`,
  },
};

const textToolSlugs = [
  "word-counter",
  "character-counter",
  "text-case-converter",
  "diff-checker",
  "lorem-ipsum-generator",
  "markdown-preview",
];

const faqs = [
  {
    question: "How do I count words in a text online?",
    answer:
      "Paste your text into the Word Counter tool and it instantly displays the word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. It works with any language and updates in real time as you type.",
  },
  {
    question: "What text case formats are supported?",
    answer:
      "The Text Case Converter supports camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, Title Case, CONSTANT_CASE, Sentence case, and dot.case. It is especially useful for converting between naming conventions used in different programming languages.",
  },
  {
    question: "How does the diff checker work?",
    answer:
      "The Diff Checker compares two blocks of text line by line and highlights added, removed, and unchanged lines. It uses a standard diff algorithm to show exactly what changed between two versions of a file, configuration, or any text content.",
  },
  {
    question: "What is lorem ipsum used for?",
    answer:
      "Lorem ipsum is placeholder text used in design and development to fill layouts before final content is available. It approximates the look and feel of real text without being distracting. Our generator lets you create placeholder paragraphs, sentences, or words on demand.",
  },
  {
    question: "Can I preview markdown in real time?",
    answer:
      "Yes. The Markdown Preview tool shows a live rendered preview side by side with your markdown source. It supports headers, bold, italic, code blocks (inline and fenced), ordered and unordered lists, links, images, tables, and blockquotes.",
  },
  {
    question: "What is the difference between word count and character count?",
    answer:
      "Word count measures the number of words separated by whitespace, while character count measures individual characters. Character count can include or exclude spaces. Many platforms have character limits (Twitter: 280, meta descriptions: 155-160), making character counting essential for content creation.",
  },
];

const toolDetails = [
  {
    slug: "word-counter",
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs in your text. Get estimated reading and speaking time, plus word frequency analysis to see which words appear most often. Perfect for essays, blog posts, and content that needs to hit a specific word count.",
  },
  {
    slug: "character-counter",
    title: "Character Counter",
    description:
      "Count characters with and without spaces. Check your text against platform-specific limits like Twitter (280 characters), Instagram bio (150), YouTube titles (100), and meta descriptions (155-160). See exactly how much room you have left.",
  },
  {
    slug: "text-case-converter",
    title: "Text Case Converter",
    description:
      "Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, Title Case, CONSTANT_CASE, and more. Essential for developers switching between naming conventions across languages and frameworks.",
  },
  {
    slug: "diff-checker",
    title: "Diff Checker",
    description:
      "Compare two texts and see differences highlighted line by line. Added lines are shown in green, removed lines in red, and unchanged lines in their default color. Useful for code reviews, document comparison, and tracking configuration changes.",
  },
  {
    slug: "lorem-ipsum-generator",
    title: "Lorem Ipsum Generator",
    description:
      "Generate placeholder text by paragraph, sentence, or word count. Use lorem ipsum to mock up layouts, test typography, or fill content areas during design and development. Copy the generated text with one click.",
  },
  {
    slug: "markdown-preview",
    title: "Markdown Preview",
    description:
      "Write markdown and see the rendered output in real time. Supports all standard markdown syntax including headings, emphasis, code blocks, lists, links, images, tables, and blockquotes. Great for drafting README files and documentation.",
  },
];

export default function TextToolsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "All Tools", url: `${SITE_URL}/tools` },
    { name: "Text Tools", url: `${SITE_URL}/tools/text-tools` },
  ]);

  const faqJsonLd = generateFaqJsonLd(faqs);

  const textTools = textToolSlugs
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
          <span className="text-gray-900 dark:text-white">Text Tools</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Free Online Text Tools
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Count words, convert text case, compare diffs, generate placeholder
          text, and preview markdown -- all in your browser.
        </p>
      </div>

      <AdSlot slotId="text-top" format="horizontal" className="my-4" />

      {/* Text Tools Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Text Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {textTools.map((tool) => (
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
          About Each Tool
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

      <AdSlot slotId="text-mid" format="horizontal" className="my-4" />

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
