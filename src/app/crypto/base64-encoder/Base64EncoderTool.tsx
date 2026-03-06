"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "encode" | "decode";
type InputMode = "text" | "hex";

const EXAMPLES = [
  {
    label: "Hello, World!",
    input: "Hello, World!",
    mode: "text" as InputMode,
    tab: "encode" as Tab,
    note: "SGVsbG8sIFdvcmxkIQ==",
  },
  {
    label: "Hex bytes (deadbeef)",
    input: "0xdeadbeef",
    mode: "hex" as InputMode,
    tab: "encode" as Tab,
    note: "3q2+7w==",
  },
  {
    label: "Decode SGVsbG8=",
    input: "SGVsbG8=",
    mode: "text" as InputMode,
    tab: "decode" as Tab,
    note: "Hello",
  },
];

function textToBase64(text: string, urlSafe: boolean): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const binary = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join("");
  let result = btoa(binary);
  if (urlSafe) {
    result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return result;
}

function hexToBase64(hex: string, urlSafe: boolean): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (!/^[0-9a-fA-F]*$/.test(clean)) {
    throw new Error("Invalid hex string. Use characters 0-9, a-f only.");
  }
  if (clean.length % 2 !== 0) {
    throw new Error("Hex string must have an even number of characters.");
  }
  const binary = clean
    .match(/.{2}/g)!
    .map((byte) => String.fromCharCode(parseInt(byte, 16)))
    .join("");
  let result = btoa(binary);
  if (urlSafe) {
    result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return result;
}

function base64ToText(b64: string, urlSafe: boolean): string {
  let input = b64;
  if (urlSafe) {
    input = input.replace(/-/g, "+").replace(/_/g, "/");
    while (input.length % 4 !== 0) {
      input += "=";
    }
  }
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

function base64ToHex(b64: string, urlSafe: boolean): string {
  let input = b64;
  if (urlSafe) {
    input = input.replace(/-/g, "+").replace(/_/g, "/");
    while (input.length % 4 !== 0) {
      input += "=";
    }
  }
  const binary = atob(input);
  const hex = Array.from(binary)
    .map((ch) => ch.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
  return "0x" + hex;
}

export default function Base64EncoderTool() {
  const [tab, setTab] = useState<Tab>("encode");
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState("");

  const output = useMemo(() => {
    setError("");
    if (!input.trim()) return { primary: "", secondary: "" };

    try {
      if (tab === "encode") {
        if (inputMode === "hex") {
          return { primary: hexToBase64(input.trim(), urlSafe), secondary: "" };
        }
        return { primary: textToBase64(input.trim(), urlSafe), secondary: "" };
      } else {
        const text = base64ToText(input.trim(), urlSafe);
        const hex = base64ToHex(input.trim(), urlSafe);
        return { primary: text, secondary: hex };
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Conversion failed. Check your input."
      );
      return { primary: "", secondary: "" };
    }
  }, [input, tab, inputMode, urlSafe]);

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setTab(ex.tab);
    setInputMode(ex.mode);
    setInput(ex.input);
    setUrlSafe(false);
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

      {/* Input mode selector (encode only) */}
      {tab === "encode" && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Input format:
          </span>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setInputMode("text")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                inputMode === "text"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setInputMode("hex")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                inputMode === "hex"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Hex
            </button>
          </div>
        </div>
      )}

      {/* URL-safe toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={urlSafe}
          onChange={(e) => setUrlSafe(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          URL-safe Base64 (use - and _ instead of + and /, no padding)
        </span>
      </label>

      <InputField
        label={
          tab === "encode"
            ? inputMode === "hex"
              ? "Hex Input"
              : "Text Input"
            : "Base64 Input"
        }
        value={input}
        onChange={setInput}
        placeholder={
          tab === "encode"
            ? inputMode === "hex"
              ? "e.g. 0xdeadbeef"
              : "e.g. Hello, World!"
            : "e.g. SGVsbG8sIFdvcmxkIQ=="
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
        <OutputField label="Base64 Output" value={output.primary} rows={3} />
      ) : (
        <>
          <OutputField label="Text Output" value={output.primary} rows={3} />
          <OutputField label="Hex Output" value={output.secondary} rows={2} />
        </>
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

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Base64 Encoding
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            Base64 encodes binary data into ASCII text using 64 characters (A-Z,
            a-z, 0-9, +, /)
          </li>
          <li>
            URL-safe variant replaces + with - and / with _ (RFC 4648)
          </li>
          <li>
            Common uses: encoding ABI data, JWT tokens, data URIs, API payloads
          </li>
          <li>
            Encoded output is ~33% larger than the original binary data
          </li>
        </ul>
      </div>
    </div>
  );
}
