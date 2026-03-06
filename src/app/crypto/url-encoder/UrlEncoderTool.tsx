"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "encode" | "decode";

const EXAMPLES = [
  {
    label: "Query parameter with spaces",
    input: "hello world & foo=bar",
    tab: "encode" as Tab,
    note: "hello%20world%20%26%20foo%3Dbar",
  },
  {
    label: "Full URL with query string",
    input: "https://example.com/path?q=hello world&lang=en",
    tab: "encode" as Tab,
    note: "Compare encodeURI vs encodeURIComponent",
  },
  {
    label: "Encoded URL parameter",
    input: "hello%20world%20%26%20foo%3Dbar",
    tab: "decode" as Tab,
    note: "hello world & foo=bar",
  },
  {
    label: "Unicode characters",
    input: "cafe\u0301 & re\u0301sume\u0301",
    tab: "encode" as Tab,
    note: "Handles accented characters",
  },
  {
    label: "Ethereum contract call URL",
    input:
      "https://api.etherscan.io/api?module=contract&action=getabi&address=0xdAC17F958D2ee523a2206206994597C13D831ec7",
    tab: "encode" as Tab,
    note: "API URL with hex address",
  },
];

export default function UrlEncoderTool() {
  const [tab, setTab] = useState<Tab>("encode");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const output = useMemo(() => {
    setError("");
    if (!input) return { component: "", uri: "" };

    try {
      if (tab === "encode") {
        return {
          component: encodeURIComponent(input),
          uri: encodeURI(input),
        };
      } else {
        // Try decodeURIComponent first, fall back to decodeURI
        try {
          return {
            component: decodeURIComponent(input),
            uri: decodeURI(input),
          };
        } catch {
          // If decodeURIComponent fails, try decodeURI alone
          return {
            component: "",
            uri: decodeURI(input),
          };
        }
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Conversion failed. Check your input."
      );
      return { component: "", uri: "" };
    }
  }, [input, tab]);

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setTab(ex.tab);
    setInput(ex.input);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => {
              setTab("encode");
              setInput("");
              setError("");
            }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "encode"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => {
              setTab("decode");
              setInput("");
              setError("");
            }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "decode"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <InputField
        label={tab === "encode" ? "Text to Encode" : "URL-Encoded Input"}
        value={input}
        onChange={setInput}
        placeholder={
          tab === "encode"
            ? "e.g. hello world & foo=bar"
            : "e.g. hello%20world%20%26%20foo%3Dbar"
        }
        multiline
        rows={3}
      />

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {tab === "encode" ? (
        <>
          <OutputField
            label="encodeURIComponent (recommended for query params)"
            value={output.component}
            rows={3}
          />
          <OutputField
            label="encodeURI (preserves URL structure characters)"
            value={output.uri}
            rows={3}
          />
        </>
      ) : (
        <>
          <OutputField
            label="decodeURIComponent Result"
            value={output.component}
            rows={3}
          />
          {output.uri !== output.component && (
            <OutputField
              label="decodeURI Result"
              value={output.uri}
              rows={3}
            />
          )}
        </>
      )}

      {/* Difference comparison */}
      {tab === "encode" && input && output.component !== output.uri && (
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h3 className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
            encodeURIComponent vs encodeURI
          </h3>
          <div className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
            <p>
              These two functions produced different results for your input.
              Characters preserved by <code className="font-mono">encodeURI</code>{" "}
              but encoded by <code className="font-mono">encodeURIComponent</code>:
            </p>
            <p className="font-mono">
              : / ? # [ ] @ ! $ & &apos; ( ) * + , ; =
            </p>
            <p>
              Use <code className="font-mono">encodeURIComponent</code> for individual
              query parameter values. Use <code className="font-mono">encodeURI</code>{" "}
              when encoding a full URL and you want to keep its structure intact.
            </p>
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
              onClick={() => loadExample(ex)}
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

      {/* Quick reference table */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common URL Encodings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Character
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Encoded
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Character
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Encoded
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">(space)</td>
                <td className="px-3 py-1.5 font-mono">%20</td>
                <td className="px-3 py-1.5 font-mono">&amp;</td>
                <td className="px-3 py-1.5 font-mono">%26</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">=</td>
                <td className="px-3 py-1.5 font-mono">%3D</td>
                <td className="px-3 py-1.5 font-mono">?</td>
                <td className="px-3 py-1.5 font-mono">%3F</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">#</td>
                <td className="px-3 py-1.5 font-mono">%23</td>
                <td className="px-3 py-1.5 font-mono">/</td>
                <td className="px-3 py-1.5 font-mono">%2F</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 font-mono">@</td>
                <td className="px-3 py-1.5 font-mono">%40</td>
                <td className="px-3 py-1.5 font-mono">+</td>
                <td className="px-3 py-1.5 font-mono">%2B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About URL Encoding
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            URL encoding (percent-encoding) replaces unsafe characters with{" "}
            <code className="font-mono">%HH</code> hex values per RFC 3986
          </li>
          <li>
            <code className="font-mono">encodeURIComponent</code> encodes everything
            except <code className="font-mono">A-Z a-z 0-9 - _ . ~ ! * &apos; ( )</code>
          </li>
          <li>
            <code className="font-mono">encodeURI</code> additionally preserves{" "}
            <code className="font-mono">: / ? # [ ] @ ! $ & &apos; ( ) * + , ; =</code>
          </li>
          <li>
            Use <code className="font-mono">encodeURIComponent</code> for query
            parameter values, form data, and API payloads
          </li>
          <li>
            Use <code className="font-mono">encodeURI</code> when encoding a
            complete URL while preserving its structure
          </li>
        </ul>
      </div>
    </div>
  );
}
