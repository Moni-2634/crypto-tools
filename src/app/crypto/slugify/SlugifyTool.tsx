"use client";

import { useState, useMemo, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

interface SlugOptions {
  separator: string;
  lowercase: boolean;
  stripNumbers: boolean;
  maxLength: number;
}

function slugify(text: string, options: SlugOptions): string {
  let result = text;

  // Normalize unicode characters
  result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace common special characters
  const replacements: Record<string, string> = {
    "&": "and",
    "@": "at",
    "#": "hash",
    "%": "percent",
    "+": "plus",
    "=": "equals",
  };
  for (const [char, replacement] of Object.entries(replacements)) {
    result = result.split(char).join(` ${replacement} `);
  }

  // Convert to lowercase if option is set
  if (options.lowercase) {
    result = result.toLowerCase();
  }

  // Strip numbers if option is set
  if (options.stripNumbers) {
    result = result.replace(/[0-9]/g, "");
  }

  // Replace non-alphanumeric characters with separator
  result = result.replace(/[^a-zA-Z0-9]+/g, options.separator);

  // Remove leading/trailing separators
  result = result.replace(
    new RegExp(`^${escapeRegex(options.separator)}+|${escapeRegex(options.separator)}+$`, "g"),
    ""
  );

  // Collapse multiple separators
  result = result.replace(
    new RegExp(`${escapeRegex(options.separator)}{2,}`, "g"),
    options.separator
  );

  // Enforce max length (break at separator boundary)
  if (options.maxLength > 0 && result.length > options.maxLength) {
    result = result.substring(0, options.maxLength);
    const lastSep = result.lastIndexOf(options.separator);
    if (lastSep > 0) {
      result = result.substring(0, lastSep);
    }
  }

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const EXAMPLES = [
  { label: "Blog title", input: "How to Build a REST API with Node.js", note: "Common blog post" },
  { label: "Product name", input: "iPhone 15 Pro Max - 256GB (Space Black)", note: "E-commerce" },
  { label: "Unicode", input: "Cafe con leche y creme brulee", note: "Special characters" },
  { label: "Special chars", input: "Rock & Roll: The #1 Music Genre!", note: "Symbols" },
  { label: "Long title", input: "The Complete Guide to Understanding Ethereum Gas Fees and How to Save Money on Transactions", note: "Truncation" },
];

export default function SlugifyTool() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [stripNumbers, setStripNumbers] = useState(false);
  const [maxLength, setMaxLength] = useState(0);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return slugify(input, { separator, lowercase, stripNumbers, maxLength });
  }, [input, separator, lowercase, stripNumbers, maxLength]);

  const stats = useMemo(() => {
    if (!output) return null;
    return {
      inputLength: input.length,
      outputLength: output.length,
      wordCount: output.split(separator).filter(Boolean).length,
    };
  }, [input, output, separator]);

  const handleClear = useCallback(() => setInput(""), []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // Clipboard API not available
    }
  }, []);

  return (
    <div className="space-y-6">
      <InputField
        label="Text Input"
        value={input}
        onChange={setInput}
        placeholder="Enter text to convert to a URL-friendly slug..."
        multiline
        rows={3}
      />

      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Separator:</label>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            {[
              { label: "Hyphen", value: "-" },
              { label: "Underscore", value: "_" },
              { label: "Dot", value: "." },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSeparator(s.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  separator === s.value
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          Lowercase
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={stripNumbers}
            onChange={(e) => setStripNumbers(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          Strip numbers
        </label>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Max length:</label>
          <input
            type="number"
            value={maxLength || ""}
            onChange={(e) => setMaxLength(Number(e.target.value) || 0)}
            placeholder="None"
            min={0}
            className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
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
      </div>

      {output && (
        <OutputField label="Slug Output" value={output} rows={2} />
      )}

      {/* Stats */}
      {stats && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Stats
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Input Length</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.inputLength}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Output Length</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.outputLength}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Word Count</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.wordCount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Batch mode */}
      {input.includes("\n") && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Batch Results (line by line)
          </h3>
          <div className="space-y-1.5">
            {input
              .split("\n")
              .filter((line) => line.trim())
              .map((line, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400 w-6 text-right">{i + 1}.</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {slugify(line, { separator, lowercase, stripNumbers, maxLength })}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.input)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="text-xs text-gray-500">{ex.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Slugify Tool
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            A slug is a URL-friendly version of a string, typically used in web addresses
            for blog posts, product pages, and routes. Slugs use only lowercase letters,
            numbers, and hyphens (or other separators), making them clean and readable.
          </p>
          <p>
            This tool converts any text into a clean slug by lowercasing, removing special
            characters, replacing spaces with separators, normalizing unicode characters
            (accents, diacritics), and optionally enforcing a maximum length.
          </p>
          <p>
            All processing happens client-side in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
