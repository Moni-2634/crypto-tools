"use client";

import { useState, useMemo, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Mode = "format" | "minify" | "validate";

const INDENT_OPTIONS = [2, 4] as const;

const EXAMPLES = [
  {
    label: "Simple object",
    input: '{"name":"John","age":30,"active":true}',
    note: "Basic key-value pairs",
  },
  {
    label: "Nested object",
    input:
      '{"user":{"id":1,"name":"Alice","roles":["admin","editor"]},"meta":{"created":"2024-01-01"}}',
    note: "Objects within objects",
  },
  {
    label: "Array of objects",
    input:
      '[{"id":1,"token":"USDC","decimals":6},{"id":2,"token":"WETH","decimals":18},{"id":3,"token":"DAI","decimals":18}]',
    note: "Token list example",
  },
  {
    label: "ABI fragment",
    input:
      '[{"type":"function","name":"transfer","inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}]}]',
    note: "Solidity ABI JSON",
  },
];

function getJsonErrorPosition(
  jsonString: string,
  errorMessage: string
): { line: number; column: number } | null {
  // Try to extract position from the error message
  const posMatch = errorMessage.match(/position\s+(\d+)/i);
  if (!posMatch) return null;

  const position = parseInt(posMatch[1], 10);
  const lines = jsonString.substring(0, position).split("\n");
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [indent, setIndent] = useState<(typeof INDENT_OPTIONS)[number]>(2);

  const result = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: "", isValid: null as boolean | null };
    }

    try {
      const parsed = JSON.parse(input);

      if (mode === "format") {
        return {
          output: JSON.stringify(parsed, null, indent),
          error: "",
          isValid: true,
        };
      }
      if (mode === "minify") {
        return {
          output: JSON.stringify(parsed),
          error: "",
          isValid: true,
        };
      }
      // validate mode
      return {
        output: JSON.stringify(parsed, null, indent),
        error: "",
        isValid: true,
      };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON";
      const pos = getJsonErrorPosition(input, message);
      const errorDetail = pos
        ? `${message} (line ${pos.line}, column ${pos.column})`
        : message;

      return {
        output: "",
        error: errorDetail,
        isValid: false,
      };
    }
  }, [input, mode, indent]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // Clipboard API not available or denied
    }
  }, []);

  // Compute stats
  const stats = useMemo(() => {
    if (!input.trim() || result.isValid !== true) return null;

    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    const minified = JSON.stringify(parsed);

    return {
      originalSize: new TextEncoder().encode(input).length,
      formattedSize: new TextEncoder().encode(formatted).length,
      minifiedSize: new TextEncoder().encode(minified).length,
      type: Array.isArray(parsed) ? "Array" : typeof parsed === "object" && parsed !== null ? "Object" : typeof parsed,
      keys: typeof parsed === "object" && parsed !== null
        ? Array.isArray(parsed)
          ? parsed.length
          : Object.keys(parsed).length
        : 0,
    };
  }, [input, result.isValid, indent]);

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">Mode:</span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {(["format", "minify", "validate"] as Mode[]).map((m) => (
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

        {mode === "format" && (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-400">Indent:</span>
            <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
              {INDENT_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setIndent(n)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    indent === n
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {n} spaces
                </button>
              ))}
            </div>
          </>
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
      </div>

      <InputField
        label="JSON Input"
        value={input}
        onChange={setInput}
        placeholder='{"key": "value", "numbers": [1, 2, 3]}'
        multiline
        rows={8}
      />

      {/* Validation status */}
      {result.isValid !== null && (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              result.isValid
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {result.isValid ? "Valid JSON" : "Invalid JSON"}
          </span>
        </div>
      )}

      {result.error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {result.error}
        </p>
      )}

      {result.output && (
        <OutputField
          label={mode === "minify" ? "Minified JSON" : "Formatted JSON"}
          value={result.output}
          rows={12}
        />
      )}

      {/* Stats */}
      {stats && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            JSON Stats
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Type</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.type}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {stats.type === "Array" ? "Items" : "Top-level Keys"}
              </span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.keys}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Formatted size</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.formattedSize.toLocaleString()} B
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Minified size</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.minifiedSize.toLocaleString()} B
              </p>
            </div>
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
              onClick={() => {
                setMode("format");
                setInput(ex.input);
              }}
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

      {/* Info section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About JSON Formatter
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            JSON (JavaScript Object Notation) is a lightweight data-interchange format that
            is easy for humans to read and write, and easy for machines to parse and generate.
            It is the standard format for REST APIs, configuration files, and data storage.
          </p>
          <p>
            <strong>Format</strong> mode pretty-prints your JSON with proper indentation,
            making it easy to read and understand nested structures. <strong>Minify</strong>{" "}
            mode removes all whitespace to produce the smallest possible output, ideal for
            network transfer and storage. <strong>Validate</strong> mode checks if your JSON
            is well-formed and shows the exact error location if not.
          </p>
          <p>
            All processing happens client-side in your browser using the native{" "}
            <code>JSON.parse()</code> and <code>JSON.stringify()</code> methods. No data is
            sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
