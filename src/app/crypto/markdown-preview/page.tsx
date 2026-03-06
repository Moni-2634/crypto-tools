import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import MarkdownPreviewTool from "./MarkdownPreviewTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Markdown Preview",
  description:
    "Write markdown and see a live rendered preview side by side. Supports headers, bold, italic, code blocks, lists, links, images, and more. Free online markdown editor.",
  path: "/crypto/markdown-preview",
});

const faqs = [
  {
    question: "What is Markdown?",
    answer:
      "Markdown is a lightweight markup language created by John Gruber in 2004. It allows you to write formatted text using simple plain text syntax. For example, **bold** for bold text, # for headings, and - for bullet points. Markdown files typically use the .md extension.",
  },
  {
    question: "What Markdown features are supported?",
    answer:
      "This tool supports headers (h1-h6), bold, italic, strikethrough, inline code, fenced code blocks, links, images, ordered and unordered lists, blockquotes, horizontal rules, and task lists. The preview updates in real time as you type.",
  },
  {
    question: "Where is Markdown used?",
    answer:
      "Markdown is used extensively on GitHub (README files, issues, pull requests), Stack Overflow, Reddit, Discord, documentation sites, static site generators (Jekyll, Hugo, Next.js), note-taking apps (Obsidian, Notion), and blog platforms.",
  },
  {
    question: "Can I copy the rendered HTML?",
    answer:
      "Yes. Click the 'Copy HTML' button above the preview pane to copy the generated HTML markup to your clipboard. This is useful for pasting into blog editors, email templates, or CMS platforms that accept HTML.",
  },
  {
    question: "Is my content saved?",
    answer:
      "No. All Markdown processing happens locally in your browser. Your content is not saved, stored, or transmitted to any server. If you refresh the page, your content will be replaced with the default example.",
  },
  {
    question: "What is the difference between Markdown and HTML?",
    answer:
      "Markdown is a simpler syntax that converts to HTML. Instead of writing <strong>bold</strong>, you write **bold**. Instead of <h1>heading</h1>, you write # heading. Markdown is faster to write and easier to read as plain text, while HTML offers more control over structure and styling.",
  },
];

export default function MarkdownPreviewPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Markdown Preview",
            url: "https://evmtools.dev/crypto/markdown-preview",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Write markdown and see a live rendered preview side by side. Free online markdown editor and previewer.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="markdown-preview">
        <MarkdownPreviewTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Markdown Preview
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online markdown editor and previewer lets you write
              markdown and see the rendered output in real time. Here is how to
              use it:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Type or paste markdown</strong> in the left editor pane.
                The preview on the right updates instantly as you type.
              </li>
              <li>
                <strong>Use the cheat sheet</strong> at the bottom for quick
                reference on markdown syntax for headers, bold, lists, links,
                and more.
              </li>
              <li>
                <strong>Copy the HTML output</strong> using the &quot;Copy
                HTML&quot; button to use the rendered HTML in blog editors, email
                templates, or CMS platforms.
              </li>
              <li>
                <strong>Load the example</strong> to see all supported markdown
                features demonstrated in a single document.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. Your markdown content is
              never sent to a server.
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
              <strong>GitHub README files</strong> &mdash; Preview your
              repository README before committing to see how it will render on
              GitHub.
            </li>
            <li>
              <strong>Documentation writing</strong> &mdash; Draft technical
              documentation with live preview of formatting.
            </li>
            <li>
              <strong>Blog post drafting</strong> &mdash; Write blog posts in
              markdown and preview the layout before publishing.
            </li>
            <li>
              <strong>Learning markdown</strong> &mdash; Use the cheat sheet and
              live preview to learn markdown syntax interactively.
            </li>
            <li>
              <strong>Email formatting</strong> &mdash; Draft formatted emails
              in markdown and copy the HTML output for email clients.
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
            <Link
              href="/crypto/word-counter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Word Counter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Count words, characters, sentences, and paragraphs in your
                markdown content.
              </p>
            </Link>
            <Link
              href="/crypto/diff-checker"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Diff Checker
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Compare two versions of markdown documents to see what changed.
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
