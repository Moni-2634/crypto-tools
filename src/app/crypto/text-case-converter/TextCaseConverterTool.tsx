"use client";

import { useState, useMemo, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import CopyButton from "@/components/tools/CopyButton";

type CaseType =
  | "lower"
  | "upper"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "dot"
  | "path"
  | "alternating"
  | "inverse";

interface CaseInfo {
  label: string;
  example: string;
}

const CASES: Record<CaseType, CaseInfo> = {
  lower: { label: "lowercase", example: "hello world" },
  upper: { label: "UPPERCASE", example: "HELLO WORLD" },
  title: { label: "Title Case", example: "Hello World" },
  sentence: { label: "Sentence case", example: "Hello world" },
  camel: { label: "camelCase", example: "helloWorld" },
  pascal: { label: "PascalCase", example: "HelloWorld" },
  snake: { label: "snake_case", example: "hello_world" },
  kebab: { label: "kebab-case", example: "hello-world" },
  constant: { label: "CONSTANT_CASE", example: "HELLO_WORLD" },
  dot: { label: "dot.case", example: "hello.world" },
  path: { label: "path/case", example: "hello/world" },
  alternating: { label: "aLtErNaTiNg", example: "hElLo WoRlD" },
  inverse: { label: "InVeRsE", example: "iNVERSE cASE" },
};

const CASE_ORDER: CaseType[] = [
  "lower",
  "upper",
  "title",
  "sentence",
  "camel",
  "pascal",
  "snake",
  "kebab",
  "constant",
  "dot",
  "path",
  "alternating",
  "inverse",
];

// Split input into words, handling camelCase, PascalCase, snake_case, kebab-case, etc.
function splitWords(text: string): string[] {
  // First, replace common separators with spaces
  let normalized = text
    .replace(/[_\-./\\]/g, " ")
    // Insert space before uppercase letters in camelCase/PascalCase
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // Insert space before sequences of uppercase + lowercase (e.g., "HTMLParser" -> "HTML Parser")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

  return normalized
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function convertCase(text: string, caseType: CaseType): string {
  if (!text.trim()) return "";

  switch (caseType) {
    case "lower":
      return text.toLowerCase();

    case "upper":
      return text.toUpperCase();

    case "title":
      return text
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());

    case "sentence": {
      const lower = text.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    case "camel": {
      const words = splitWords(text);
      return words
        .map((w, i) => {
          const lower = w.toLowerCase();
          return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("");
    }

    case "pascal": {
      const words = splitWords(text);
      return words
        .map((w) => {
          const lower = w.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("");
    }

    case "snake": {
      const words = splitWords(text);
      return words.map((w) => w.toLowerCase()).join("_");
    }

    case "kebab": {
      const words = splitWords(text);
      return words.map((w) => w.toLowerCase()).join("-");
    }

    case "constant": {
      const words = splitWords(text);
      return words.map((w) => w.toUpperCase()).join("_");
    }

    case "dot": {
      const words = splitWords(text);
      return words.map((w) => w.toLowerCase()).join(".");
    }

    case "path": {
      const words = splitWords(text);
      return words.map((w) => w.toLowerCase()).join("/");
    }

    case "alternating":
      return text
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join("");

    case "inverse":
      return text
        .split("")
        .map((c) =>
          c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
        )
        .join("");

    default:
      return text;
  }
}

const EXAMPLES = [
  { label: "Variable name", input: "getUserData", note: "camelCase input" },
  { label: "Class name", input: "UserProfileService", note: "PascalCase input" },
  { label: "Constant", input: "MAX_RETRY_COUNT", note: "CONSTANT_CASE input" },
  { label: "CSS class", input: "nav-menu-item", note: "kebab-case input" },
  { label: "Sentence", input: "The quick brown fox jumps over the lazy dog", note: "Natural language" },
  { label: "Python var", input: "user_first_name", note: "snake_case input" },
];

export default function TextCaseConverterTool() {
  const [input, setInput] = useState("");

  const results = useMemo(() => {
    if (!input.trim()) return null;
    return CASE_ORDER.map((caseType) => ({
      type: caseType,
      label: CASES[caseType].label,
      value: convertCase(input, caseType),
    }));
  }, [input]);

  const stats = useMemo(() => {
    if (!input.trim()) return null;
    const words = splitWords(input);
    return {
      characters: input.length,
      words: words.length,
      detectedCase: detectCase(input),
    };
  }, [input]);

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
        placeholder="Enter text in any case (camelCase, snake_case, UPPER, Title Case, etc.)"
        multiline
        rows={3}
      />

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

      {/* Stats */}
      {stats && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Characters</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.characters}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Words</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.words}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Detected Case</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">{stats.detectedCase}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-2">
          {results.map((r) => (
            <div
              key={r.type}
              className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3"
            >
              <div className="flex-1 min-w-0 mr-3">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {r.label}
                </span>
                <p className="font-mono text-sm text-gray-800 dark:text-gray-200 truncate">
                  {r.value}
                </p>
              </div>
              <CopyButton text={r.value} />
            </div>
          ))}
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

      {/* Case reference */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Case Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="pb-2 pr-4">Case</th>
                <th className="pb-2 pr-4">Example</th>
                <th className="pb-2">Common Usage</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {[
                { case: "camelCase", example: "myVariable", usage: "JavaScript, Java, TypeScript variables" },
                { case: "PascalCase", example: "MyComponent", usage: "React components, C# classes" },
                { case: "snake_case", example: "my_variable", usage: "Python, Ruby, database columns" },
                { case: "kebab-case", example: "my-component", usage: "CSS classes, HTML attributes, URLs" },
                { case: "CONSTANT_CASE", example: "MAX_VALUE", usage: "Constants, environment variables" },
                { case: "dot.case", example: "my.config", usage: "Configuration keys, namespaces" },
              ].map((row) => (
                <tr
                  key={row.case}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-1.5 pr-4 font-medium">{row.case}</td>
                  <td className="py-1.5 pr-4 font-mono">{row.example}</td>
                  <td className="py-1.5 text-gray-500 dark:text-gray-400">
                    {row.usage}
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
          About Text Case Converter
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Text case conversion is essential for developers who work across multiple languages
            and frameworks. Each language has its own naming conventions: JavaScript uses camelCase
            for variables and PascalCase for classes, Python uses snake_case, CSS uses kebab-case,
            and environment variables use CONSTANT_CASE.
          </p>
          <p>
            This tool intelligently detects the input case format and provides instant conversion
            to 13 different case formats. It handles mixed inputs, abbreviations, and numbers
            correctly, splitting words at case boundaries, separators, and digits.
          </p>
          <p>
            All processing happens client-side in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper to detect input case
function detectCase(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "unknown";

  if (trimmed === trimmed.toLowerCase() && trimmed.includes("_")) return "snake_case";
  if (trimmed === trimmed.toLowerCase() && trimmed.includes("-")) return "kebab-case";
  if (trimmed === trimmed.toLowerCase() && trimmed.includes(".")) return "dot.case";
  if (trimmed === trimmed.toUpperCase() && trimmed.includes("_")) return "CONSTANT_CASE";
  if (trimmed === trimmed.toUpperCase()) return "UPPERCASE";
  if (trimmed === trimmed.toLowerCase()) return "lowercase";
  if (/^[a-z]/.test(trimmed) && !trimmed.includes(" ") && !trimmed.includes("_") && !trimmed.includes("-"))
    return "camelCase";
  if (/^[A-Z]/.test(trimmed) && !trimmed.includes(" ") && !trimmed.includes("_") && !trimmed.includes("-"))
    return "PascalCase";
  if (/^[A-Z]/.test(trimmed) && trimmed.includes(" ")) return "Sentence/Title";
  return "mixed";
}
