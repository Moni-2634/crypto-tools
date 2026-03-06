"use client";

import { useState, useMemo, useCallback } from "react";
import OutputField from "@/components/tools/OutputField";

type Mode = "encode" | "decode";

const HTML_ENTITIES: [string, string][] = [
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ['"', "&quot;"],
  ["'", "&#39;"],
  ["\u00A0", "&nbsp;"],
  ["\u00A9", "&copy;"],
  ["\u00AE", "&reg;"],
  ["\u2122", "&trade;"],
  ["\u20AC", "&euro;"],
  ["\u00A3", "&pound;"],
  ["\u00A5", "&yen;"],
  ["\u00B0", "&deg;"],
  ["\u00B1", "&plusmn;"],
  ["\u00D7", "&times;"],
  ["\u00F7", "&divide;"],
  ["\u2013", "&ndash;"],
  ["\u2014", "&mdash;"],
  ["\u2018", "&lsquo;"],
  ["\u2019", "&rsquo;"],
  ["\u201C", "&ldquo;"],
  ["\u201D", "&rdquo;"],
  ["\u2022", "&bull;"],
  ["\u2026", "&hellip;"],
  ["\u2190", "&larr;"],
  ["\u2191", "&uarr;"],
  ["\u2192", "&rarr;"],
  ["\u2193", "&darr;"],
];

function encodeHtml(text: string, encodeAll: boolean): string {
  if (!text) return "";

  if (encodeAll) {
    // Encode all characters to numeric entities
    return text
      .split("")
      .map((char) => `&#${char.charCodeAt(0)};`)
      .join("");
  }

  // Standard encoding
  let result = text;
  result = result.replace(/&/g, "&amp;");
  result = result.replace(/</g, "&lt;");
  result = result.replace(/>/g, "&gt;");
  result = result.replace(/"/g, "&quot;");
  result = result.replace(/'/g, "&#39;");
  return result;
}

function decodeHtml(text: string): string {
  if (!text) return "";

  let result = text;

  // Decode named entities
  result = result.replace(/&amp;/g, "&");
  result = result.replace(/&lt;/g, "<");
  result = result.replace(/&gt;/g, ">");
  result = result.replace(/&quot;/g, '"');
  result = result.replace(/&#39;/g, "'");
  result = result.replace(/&apos;/g, "'");
  result = result.replace(/&nbsp;/g, "\u00A0");
  result = result.replace(/&copy;/g, "\u00A9");
  result = result.replace(/&reg;/g, "\u00AE");
  result = result.replace(/&trade;/g, "\u2122");
  result = result.replace(/&euro;/g, "\u20AC");
  result = result.replace(/&pound;/g, "\u00A3");
  result = result.replace(/&yen;/g, "\u00A5");
  result = result.replace(/&deg;/g, "\u00B0");
  result = result.replace(/&plusmn;/g, "\u00B1");
  result = result.replace(/&times;/g, "\u00D7");
  result = result.replace(/&divide;/g, "\u00F7");
  result = result.replace(/&ndash;/g, "\u2013");
  result = result.replace(/&mdash;/g, "\u2014");
  result = result.replace(/&lsquo;/g, "\u2018");
  result = result.replace(/&rsquo;/g, "\u2019");
  result = result.replace(/&ldquo;/g, "\u201C");
  result = result.replace(/&rdquo;/g, "\u201D");
  result = result.replace(/&bull;/g, "\u2022");
  result = result.replace(/&hellip;/g, "\u2026");
  result = result.replace(/&larr;/g, "\u2190");
  result = result.replace(/&uarr;/g, "\u2191");
  result = result.replace(/&rarr;/g, "\u2192");
  result = result.replace(/&darr;/g, "\u2193");

  // Decode numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_match, dec) =>
    String.fromCharCode(parseInt(dec, 10))
  );

  // Decode numeric entities (hex)
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_match, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  return result;
}

const EXAMPLES = [
  {
    label: "HTML tags",
    input: '<div class="container"><p>Hello & welcome!</p></div>',
    mode: "encode" as Mode,
  },
  {
    label: "Script injection",
    input: '<script>alert("XSS")</script>',
    mode: "encode" as Mode,
  },
  {
    label: "Special characters",
    input: 'Price: $49.99 < $99.99 & includes "free" shipping',
    mode: "encode" as Mode,
  },
  {
    label: "Encoded HTML",
    input: "&lt;h1&gt;Hello &amp; World&lt;/h1&gt;",
    mode: "decode" as Mode,
  },
];

export default function HtmlEncoderTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeAll, setEncodeAll] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return mode === "encode" ? encodeHtml(input, encodeAll) : decodeHtml(input);
  }, [input, mode, encodeAll]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // Clipboard not available
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">Mode:</span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === "encode" && (
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={encodeAll}
              onChange={(e) => setEncodeAll(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            Encode all characters (numeric entities)
          </label>
        )}
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
        <button
          onClick={() => {
            setInput(output);
            setMode(mode === "encode" ? "decode" : "encode");
          }}
          disabled={!output}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Use Output as Input
        </button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {mode === "encode" ? "Text to Encode" : "HTML Entities to Decode"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? 'Enter text containing HTML characters like <, >, &, "...'
              : "Enter encoded HTML entities like &lt;, &gt;, &amp;..."
          }
          rows={6}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 resize-y"
        />
      </div>

      {/* Output */}
      {output && (
        <OutputField
          label={mode === "encode" ? "Encoded Output" : "Decoded Output"}
          value={output}
          rows={6}
        />
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
              onClick={() => {
                setMode(ex.mode);
                setInput(ex.input);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="text-xs text-gray-500 capitalize">
                {ex.mode}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Entity reference table */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common HTML Entities Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">
                  Character
                </th>
                <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">
                  Entity
                </th>
                <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">
                  Decimal
                </th>
                <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { char: "<", entity: "&lt;", decimal: "&#60;", desc: "Less than" },
                { char: ">", entity: "&gt;", decimal: "&#62;", desc: "Greater than" },
                { char: "&", entity: "&amp;", decimal: "&#38;", desc: "Ampersand" },
                { char: '"', entity: "&quot;", decimal: "&#34;", desc: "Double quote" },
                { char: "'", entity: "&#39;", decimal: "&#39;", desc: "Single quote" },
                { char: "\u00A0", entity: "&nbsp;", decimal: "&#160;", desc: "Non-breaking space" },
                { char: "\u00A9", entity: "&copy;", decimal: "&#169;", desc: "Copyright" },
                { char: "\u00AE", entity: "&reg;", decimal: "&#174;", desc: "Registered" },
                { char: "\u2122", entity: "&trade;", decimal: "&#8482;", desc: "Trademark" },
                { char: "\u20AC", entity: "&euro;", decimal: "&#8364;", desc: "Euro sign" },
                { char: "\u2014", entity: "&mdash;", decimal: "&#8212;", desc: "Em dash" },
                { char: "\u2013", entity: "&ndash;", decimal: "&#8211;", desc: "En dash" },
              ].map((row) => (
                <tr
                  key={row.entity}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">
                    {row.char}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700 dark:text-gray-300">
                    {row.entity}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">
                    {row.decimal}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About HTML Encoder / Decoder
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            HTML encoding converts special characters like &lt;, &gt;, &amp;, and &quot;
            into their HTML entity equivalents. This is essential for displaying these
            characters in web pages without the browser interpreting them as HTML tags.
            It also helps prevent XSS (Cross-Site Scripting) attacks by neutralizing
            injected HTML and JavaScript.
          </p>
          <p>
            Decoding reverses this process, converting HTML entities back to their
            original characters. This tool supports both named entities (like &amp;amp;)
            and numeric entities (like &amp;#38; and &amp;#x26;).
          </p>
          <p>
            All processing happens locally in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
