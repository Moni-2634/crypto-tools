"use client";

import { useState, useMemo, useCallback } from "react";
import CopyButton from "@/components/tools/CopyButton";

type Base = 2 | 8 | 10 | 16;

interface BaseInfo {
  label: string;
  prefix: string;
  placeholder: string;
  regex: RegExp;
}

const BASES: Record<Base, BaseInfo> = {
  2: {
    label: "Binary",
    prefix: "0b",
    placeholder: "e.g., 10110110",
    regex: /^[01]+$/,
  },
  8: {
    label: "Octal",
    prefix: "0o",
    placeholder: "e.g., 266",
    regex: /^[0-7]+$/,
  },
  10: {
    label: "Decimal",
    prefix: "",
    placeholder: "e.g., 182",
    regex: /^[0-9]+$/,
  },
  16: {
    label: "Hexadecimal",
    prefix: "0x",
    placeholder: "e.g., B6",
    regex: /^[0-9a-fA-F]+$/,
  },
};

const BASE_LIST: Base[] = [2, 8, 10, 16];

function cleanInput(value: string, base: Base): string {
  // Remove common prefixes
  let cleaned = value.trim();
  if (base === 16) cleaned = cleaned.replace(/^0x/i, "");
  if (base === 2) cleaned = cleaned.replace(/^0b/i, "");
  if (base === 8) cleaned = cleaned.replace(/^0o/i, "");
  // Remove spaces and underscores (visual separators)
  cleaned = cleaned.replace(/[\s_]/g, "");
  return cleaned;
}

function convertBigInt(value: string, fromBase: Base): bigint | null {
  const cleaned = cleanInput(value, fromBase);
  if (!cleaned || !BASES[fromBase].regex.test(cleaned)) return null;
  try {
    return BigInt(`${fromBase === 16 ? "0x" : fromBase === 8 ? "0o" : fromBase === 2 ? "0b" : ""}${cleaned}`);
  } catch {
    return null;
  }
}

function formatOutput(value: bigint, base: Base): string {
  return value.toString(base).toUpperCase();
}

function groupDigits(str: string, groupSize: number): string {
  const reversed = str.split("").reverse();
  const groups: string[] = [];
  for (let i = 0; i < reversed.length; i += groupSize) {
    groups.push(reversed.slice(i, i + groupSize).reverse().join(""));
  }
  return groups.reverse().join(" ");
}

const EXAMPLES = [
  { label: "255 (max byte)", input: "255", base: 10 as Base, note: "0xFF" },
  { label: "0xDEADBEEF", input: "DEADBEEF", base: 16 as Base, note: "Classic hex" },
  { label: "10101010", input: "10101010", base: 2 as Base, note: "Binary pattern" },
  { label: "42", input: "42", base: 10 as Base, note: "Answer to everything" },
  { label: "0x100", input: "100", base: 16 as Base, note: "256 in decimal" },
];

export default function NumberBaseConverterTool() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState<Base>(10);

  const results = useMemo((): {
    error: string;
    value?: bigint;
    conversions?: { base: Base; label: string; prefix: string; value: string; grouped: string }[];
    bitLength?: number;
    byteLength?: number;
  } | null => {
    if (!input.trim()) return null;
    const value = convertBigInt(input, fromBase);
    if (value === null) return { error: "Invalid input for the selected base." };

    return {
      error: "",
      value,
      conversions: BASE_LIST.map((base) => ({
        base,
        label: BASES[base].label,
        prefix: BASES[base].prefix,
        value: formatOutput(value, base),
        grouped:
          base === 2
            ? groupDigits(formatOutput(value, base), 4)
            : base === 16
              ? groupDigits(formatOutput(value, base), 2)
              : base === 10
                ? groupDigits(formatOutput(value, base), 3)
                : formatOutput(value, base),
      })),
      bitLength: value.toString(2).length,
      byteLength: Math.ceil(value.toString(2).length / 8),
    };
  }, [input, fromBase]);

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
      {/* From base selection */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">Input Base:</span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {BASE_LIST.map((base) => (
            <button
              key={base}
              onClick={() => {
                // Try to convert current input to the new base
                if (input.trim()) {
                  const val = convertBigInt(input, fromBase);
                  if (val !== null) {
                    setInput(formatOutput(val, base));
                  }
                }
                setFromBase(base);
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                fromBase === base
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {BASES[base].label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {BASES[fromBase].label} Input
        </label>
        <div className="flex items-center gap-2">
          {BASES[fromBase].prefix && (
            <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
              {BASES[fromBase].prefix}
            </span>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={BASES[fromBase].placeholder}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
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

      {results && results.error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {results.error}
        </p>
      )}

      {/* Conversion results */}
      {results && results.conversions && (
        <div className="space-y-3">
          {results.conversions.map((conv) => (
            <div
              key={conv.base}
              className={`rounded-lg border p-4 ${
                conv.base === fromBase
                  ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {conv.label}{" "}
                  <span className="text-gray-400 dark:text-gray-500">
                    (base {conv.base})
                  </span>
                </span>
                <CopyButton text={`${conv.prefix}${conv.value}`} />
              </div>
              <div className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                <span className="text-gray-400 dark:text-gray-500">
                  {conv.prefix}
                </span>
                {conv.grouped}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {results && results.bitLength !== undefined && results.value !== undefined && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Stats
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Bit Length</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {results.bitLength} bits
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Byte Length</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {results.byteLength} bytes
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Decimal Value</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {results.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Common values reference */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Values
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="pb-2 pr-4">Decimal</th>
                <th className="pb-2 pr-4">Hex</th>
                <th className="pb-2 pr-4">Binary</th>
                <th className="pb-2">Description</th>
              </tr>
            </thead>
            <tbody className="font-mono text-gray-700 dark:text-gray-300">
              {[
                { dec: "0", hex: "0", bin: "0", desc: "Zero" },
                { dec: "255", hex: "FF", bin: "1111 1111", desc: "Max uint8" },
                { dec: "256", hex: "100", bin: "1 0000 0000", desc: "2^8" },
                { dec: "1024", hex: "400", bin: "100 0000 0000", desc: "1 KB" },
                { dec: "65535", hex: "FFFF", bin: "1111 1111 1111 1111", desc: "Max uint16" },
              ].map((row) => (
                <tr key={row.dec} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-1.5 pr-4">{row.dec}</td>
                  <td className="py-1.5 pr-4">0x{row.hex}</td>
                  <td className="py-1.5 pr-4">{row.bin}</td>
                  <td className="py-1.5 text-gray-500 dark:text-gray-400 font-sans">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                setFromBase(ex.base);
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

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Number Base Converter
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Number base conversion is the process of converting a number from one positional
            numeral system to another. The most common bases are binary (base 2), octal (base 8),
            decimal (base 10), and hexadecimal (base 16).
          </p>
          <p>
            <strong>Binary (base 2)</strong> is the native language of computers, using only 0 and 1.{" "}
            <strong>Octal (base 8)</strong> was historically used in computing for compact binary
            representation. <strong>Decimal (base 10)</strong> is the everyday human number system.{" "}
            <strong>Hexadecimal (base 16)</strong> is widely used in programming, memory addresses,
            color codes, and Ethereum (addresses, calldata, transaction hashes).
          </p>
          <p>
            This tool supports arbitrarily large numbers using BigInt and processes everything
            client-side in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
