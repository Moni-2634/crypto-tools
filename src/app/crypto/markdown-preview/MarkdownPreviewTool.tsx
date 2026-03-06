"use client";

import { useState, useMemo, useCallback } from "react";
import CopyButton from "@/components/tools/CopyButton";

// Simple markdown parser - no external dependencies
function parseMarkdown(md: string): string {
  let html = md;

  // Escape HTML entities first (but preserve markdown syntax)
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Code blocks (```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm">${code.trim()}</code></pre>`;
  });

  // Inline code (`)
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400">$1</code>'
  );

  // Images ![alt](url)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full rounded my-2" />'
  );

  // Links [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Headers (must be processed line by line to handle properly)
  html = html.replace(
    /^######\s+(.+)$/gm,
    '<h6 class="text-sm font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h6>'
  );
  html = html.replace(
    /^#####\s+(.+)$/gm,
    '<h5 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h5>'
  );
  html = html.replace(
    /^####\s+(.+)$/gm,
    '<h4 class="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h4>'
  );
  html = html.replace(
    /^###\s+(.+)$/gm,
    '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h3>'
  );
  html = html.replace(
    /^##\s+(.+)$/gm,
    '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">$1</h2>'
  );
  html = html.replace(
    /^#\s+(.+)$/gm,
    '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-3">$1</h1>'
  );

  // Horizontal rule
  html = html.replace(
    /^---+$/gm,
    '<hr class="border-gray-300 dark:border-gray-700 my-6" />'
  );

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Blockquotes
  html = html.replace(
    /^&gt;\s+(.+)$/gm,
    '<blockquote class="border-l-4 border-blue-400 dark:border-blue-600 pl-4 py-1 my-2 text-gray-600 dark:text-gray-400 italic">$1</blockquote>'
  );

  // Unordered lists
  html = html.replace(
    /^[\-\*]\s+(.+)$/gm,
    '<li class="ml-4 list-disc text-gray-700 dark:text-gray-300">$1</li>'
  );

  // Ordered lists
  html = html.replace(
    /^\d+\.\s+(.+)$/gm,
    '<li class="ml-4 list-decimal text-gray-700 dark:text-gray-300">$1</li>'
  );

  // Wrap consecutive <li> elements in <ul> or <ol>
  html = html.replace(
    /(<li class="ml-4 list-disc[^"]*">[\s\S]*?<\/li>\n?)+/g,
    (match) => `<ul class="my-2 space-y-1">${match}</ul>`
  );
  html = html.replace(
    /(<li class="ml-4 list-decimal[^"]*">[\s\S]*?<\/li>\n?)+/g,
    (match) => `<ol class="my-2 space-y-1">${match}</ol>`
  );

  // Task list items
  html = html.replace(
    /\[x\]/gi,
    '<input type="checkbox" checked disabled class="mr-2" />'
  );
  html = html.replace(
    /\[ \]/g,
    '<input type="checkbox" disabled class="mr-2" />'
  );

  // Paragraphs: wrap lines that aren't already HTML elements
  const lines = html.split("\n");
  const processed: string[] = [];
  let inPre = false;

  for (const line of lines) {
    if (line.includes("<pre")) inPre = true;
    if (line.includes("</pre>")) inPre = false;

    if (
      inPre ||
      line.startsWith("<h") ||
      line.startsWith("<ul") ||
      line.startsWith("</ul") ||
      line.startsWith("<ol") ||
      line.startsWith("</ol") ||
      line.startsWith("<li") ||
      line.startsWith("<pre") ||
      line.startsWith("<hr") ||
      line.startsWith("<blockquote") ||
      line.trim() === ""
    ) {
      processed.push(line);
    } else {
      processed.push(
        `<p class="text-gray-700 dark:text-gray-300 leading-relaxed my-2">${line}</p>`
      );
    }
  }

  return processed.join("\n");
}

const SAMPLE_MARKDOWN = `# Markdown Preview Demo

## Features

This tool supports **bold**, *italic*, ***bold italic***, and ~~strikethrough~~ text.

### Code

Inline \`code\` looks like this. Code blocks:

\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

### Lists

- Item one
- Item two
- Item three

1. First step
2. Second step
3. Third step

### Blockquotes

> This is a blockquote. It can span multiple words and contains *formatted* text.

### Links and Images

[Visit EVMTools](https://evmtools.dev)

---

That's it! Start editing on the left to see the preview update in real time.`;

export default function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  const handleClear = useCallback(() => {
    setMarkdown("");
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setMarkdown(text);
    } catch {
      // Clipboard not available
    }
  }, []);

  const wordCount = useMemo(
    () =>
      markdown
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length,
    [markdown]
  );

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handlePaste}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Paste from Clipboard
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear
        </button>
        <button
          onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Load Example
        </button>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton text={html} className="text-xs" />
          <span className="text-xs text-gray-400">Copy HTML</span>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Markdown Input
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            rows={20}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 resize-y"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preview
          </label>
          <div
            className="min-h-[480px] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 overflow-y-auto prose-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Words</span>
            <p className="font-mono text-blue-600 dark:text-blue-400">
              {wordCount}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Characters</span>
            <p className="font-mono text-blue-600 dark:text-blue-400">
              {markdown.length}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Lines</span>
            <p className="font-mono text-blue-600 dark:text-blue-400">
              {markdown.split("\n").length}
            </p>
          </div>
        </div>
      </div>

      {/* Cheat sheet */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Markdown Cheat Sheet
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { syntax: "# Heading 1", desc: "Largest heading" },
            { syntax: "## Heading 2", desc: "Second heading" },
            { syntax: "**bold**", desc: "Bold text" },
            { syntax: "*italic*", desc: "Italic text" },
            { syntax: "~~strikethrough~~", desc: "Strikethrough" },
            { syntax: "`inline code`", desc: "Inline code" },
            { syntax: "```code block```", desc: "Code block" },
            { syntax: "[text](url)", desc: "Link" },
            { syntax: "![alt](url)", desc: "Image" },
            { syntax: "> blockquote", desc: "Blockquote" },
            { syntax: "- item", desc: "Unordered list" },
            { syntax: "1. item", desc: "Ordered list" },
            { syntax: "---", desc: "Horizontal rule" },
          ].map((item) => (
            <div
              key={item.syntax}
              className="flex items-center justify-between rounded border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm"
            >
              <code className="text-gray-700 dark:text-gray-300">
                {item.syntax}
              </code>
              <span className="text-xs text-gray-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Markdown Preview
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Markdown is a lightweight markup language created by John Gruber in 2004. It
            lets you write formatted text using plain text syntax. Markdown is widely used
            for README files, documentation, blog posts, and comments on platforms like
            GitHub, Stack Overflow, and Reddit.
          </p>
          <p>
            This previewer supports headers, bold, italic, strikethrough, code blocks,
            links, images, lists, blockquotes, and horizontal rules. All rendering happens
            locally in your browser with no external dependencies.
          </p>
        </div>
      </div>
    </div>
  );
}
