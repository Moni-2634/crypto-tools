"use client";

import { useState, useMemo, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Mode = "json-to-csv" | "csv-to-json";

function escapeCSV(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function jsonToCsv(jsonStr: string, delimiter: string): { output: string; error: string } {
  try {
    const data = JSON.parse(jsonStr);
    if (!Array.isArray(data) || data.length === 0) {
      return { output: "", error: "Input must be a non-empty JSON array of objects." };
    }

    // Collect all unique keys
    const keys = new Set<string>();
    for (const item of data) {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return {
          output: "",
          error: "Each array element must be a plain object (not an array or null).",
        };
      }
      Object.keys(item).forEach((k) => keys.add(k));
    }

    const headers = Array.from(keys);
    const rows = [headers.map((h) => escapeCSV(h)).join(delimiter)];

    for (const item of data) {
      const row = headers.map((h) => {
        const val = item[h];
        if (val === null || val === undefined) return "";
        if (typeof val === "object") return escapeCSV(JSON.stringify(val));
        return escapeCSV(String(val));
      });
      rows.push(row.join(delimiter));
    }

    return { output: rows.join("\n"), error: "" };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

function csvToJson(csvStr: string, delimiter: string): { output: string; error: string } {
  try {
    const lines = csvStr.trim().split(/\r?\n/);
    if (lines.length < 2) {
      return {
        output: "",
        error: "CSV must have at least a header row and one data row.",
      };
    }

    const parseCSVLine = (line: string): string[] => {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"') {
            if (i + 1 < line.length && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = false;
            }
          } else {
            current += ch;
          }
        } else {
          if (ch === '"') {
            inQuotes = true;
          } else if (ch === delimiter) {
            values.push(current);
            current = "";
          } else {
            current += ch;
          }
        }
      }
      values.push(current);
      return values;
    };

    const headers = parseCSVLine(lines[0]);
    const result: Record<string, string | number | boolean | null>[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = parseCSVLine(lines[i]);
      const obj: Record<string, string | number | boolean | null> = {};
      for (let j = 0; j < headers.length; j++) {
        const val = values[j] !== undefined ? values[j] : "";
        // Try to parse as number or boolean
        if (val === "") {
          obj[headers[j]] = null;
        } else if (val === "true") {
          obj[headers[j]] = true;
        } else if (val === "false") {
          obj[headers[j]] = false;
        } else if (!isNaN(Number(val)) && val.trim() !== "") {
          obj[headers[j]] = Number(val);
        } else {
          obj[headers[j]] = val;
        }
      }
      result.push(obj);
    }

    return {
      output: JSON.stringify(result, null, 2),
      error: "",
    };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Invalid CSV",
    };
  }
}

const JSON_EXAMPLES = [
  {
    label: "Users",
    input: '[{"name":"Alice","age":30,"email":"alice@example.com"},{"name":"Bob","age":25,"email":"bob@example.com"},{"name":"Charlie","age":35,"email":"charlie@example.com"}]',
    note: "Simple user data",
  },
  {
    label: "Tokens",
    input: '[{"symbol":"ETH","decimals":18,"price":3500},{"symbol":"USDC","decimals":6,"price":1},{"symbol":"WBTC","decimals":8,"price":65000}]',
    note: "Crypto token list",
  },
];

const CSV_EXAMPLES = [
  {
    label: "Products",
    input: "name,price,category\nWidget,9.99,Tools\nGadget,24.99,Electronics\nDoohickey,4.99,Tools",
    note: "Product catalog",
  },
  {
    label: "Scores",
    input: "student,math,science,english\nAlice,95,88,92\nBob,78,85,90\nCharlie,92,94,87",
    note: "Student scores",
  },
];

export default function JsonToCsvTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("json-to-csv");
  const [delimiter, setDelimiter] = useState(",");

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    if (mode === "json-to-csv") {
      return jsonToCsv(input, delimiter);
    }
    return csvToJson(input, delimiter);
  }, [input, mode, delimiter]);

  const stats = useMemo(() => {
    if (!result.output) return null;
    if (mode === "json-to-csv") {
      const lines = result.output.split("\n");
      return { rows: lines.length - 1, columns: lines[0]?.split(delimiter).length || 0 };
    } else {
      try {
        const parsed = JSON.parse(result.output);
        return {
          rows: parsed.length,
          columns: parsed.length > 0 ? Object.keys(parsed[0]).length : 0,
        };
      } catch {
        return null;
      }
    }
  }, [result.output, mode, delimiter]);

  const handleClear = useCallback(() => setInput(""), []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // Clipboard API not available
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!result.output) return;
    const ext = mode === "json-to-csv" ? "csv" : "json";
    const type = mode === "json-to-csv" ? "text/csv" : "application/json";
    const blob = new Blob([result.output], { type });
    const link = document.createElement("a");
    link.download = `converted.${ext}`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }, [result.output, mode]);

  const examples = mode === "json-to-csv" ? JSON_EXAMPLES : CSV_EXAMPLES;

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">Mode:</span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {(["json-to-csv", "csv-to-json"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setInput("");
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {m === "json-to-csv" ? "JSON to CSV" : "CSV to JSON"}
            </button>
          ))}
        </div>

        <span className="text-sm text-gray-600 dark:text-gray-400">Delimiter:</span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {[
            { label: "Comma", value: "," },
            { label: "Tab", value: "\t" },
            { label: "Semicolon", value: ";" },
          ].map((d) => (
            <button
              key={d.label}
              onClick={() => setDelimiter(d.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                delimiter === d.value
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
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
          onClick={handleDownload}
          disabled={!result.output}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download {mode === "json-to-csv" ? "CSV" : "JSON"}
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear
        </button>
      </div>

      <InputField
        label={mode === "json-to-csv" ? "JSON Input" : "CSV Input"}
        value={input}
        onChange={setInput}
        placeholder={
          mode === "json-to-csv"
            ? '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]'
            : "name,age\nAlice,30\nBob,25"
        }
        multiline
        rows={8}
      />

      {result.error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {result.error}
        </p>
      )}

      {result.output && (
        <OutputField
          label={mode === "json-to-csv" ? "CSV Output" : "JSON Output"}
          value={result.output}
          rows={10}
        />
      )}

      {/* Stats */}
      {stats && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Stats
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Rows</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.rows}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Columns</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.columns}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Output Size</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {new TextEncoder().encode(result.output).length.toLocaleString()} B
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
          {examples.map((ex) => (
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
          About JSON to CSV Converter
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This tool converts between JSON arrays and CSV (Comma-Separated Values) format.
            JSON is the standard for APIs and web development, while CSV is widely used for
            spreadsheets, data analysis, and database imports.
          </p>
          <p>
            The converter handles nested objects by serializing them as JSON strings in CSV
            cells, properly escapes quotes and commas, and supports custom delimiters
            (comma, tab, semicolon). When converting CSV to JSON, it auto-detects numbers
            and booleans.
          </p>
          <p>
            All processing happens client-side in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
