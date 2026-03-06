"use client";

import { useState, useCallback } from "react";

type Source = "utf8" | "hex" | "bytes";

const EXAMPLES = [
  { name: "Hello", utf8: "Hello", hex: "48656c6c6f", bytes: "72, 101, 108, 108, 111" },
  { name: "0xdead", utf8: "\u00de\u00ad", hex: "dead", bytes: "222, 173" },
  { name: "ERC-20", utf8: "transfer(address,uint256)", hex: "7472616e7366657228616464726573732c75696e7432353629", bytes: "116, 114, 97, 110, 115, 102, 101, 114, 40, 97, 100, 100, 114, 101, 115, 115, 44, 117, 105, 110, 116, 50, 53, 54, 41" },
];

export default function Utf8HexConverterTool() {
  const [utf8, setUtf8] = useState("");
  const [hex, setHex] = useState("");
  const [bytes, setBytes] = useState("");
  const [byteLength, setByteLength] = useState(0);
  const [error, setError] = useState("");

  const updateFromUtf8 = useCallback((value: string) => {
    setUtf8(value);
    setError("");

    if (!value) {
      setHex("");
      setBytes("");
      setByteLength(0);
      return;
    }

    try {
      const encoder = new TextEncoder();
      const encoded = encoder.encode(value);
      setByteLength(encoded.length);

      const hexStr = Array.from(encoded)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHex(hexStr);

      const bytesStr = Array.from(encoded).join(", ");
      setBytes(bytesStr);
    } catch {
      setError("Failed to encode UTF-8.");
    }
  }, []);

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    setError("");

    if (!value.trim()) {
      setUtf8("");
      setBytes("");
      setByteLength(0);
      return;
    }

    try {
      // Remove 0x prefix if present
      let clean = value.trim();
      if (clean.startsWith("0x") || clean.startsWith("0X")) {
        clean = clean.slice(2);
      }

      // Remove whitespace
      clean = clean.replace(/\s/g, "");

      if (!/^[0-9a-fA-F]*$/.test(clean)) {
        setError("Hex string contains invalid characters.");
        return;
      }

      if (clean.length % 2 !== 0) {
        // Odd length - show partial bytes but set error
        setError("Hex string has odd length. Each byte requires 2 hex characters.");
        return;
      }

      const byteArray = new Uint8Array(clean.length / 2);
      for (let i = 0; i < clean.length; i += 2) {
        byteArray[i / 2] = parseInt(clean.substr(i, 2), 16);
      }

      setByteLength(byteArray.length);

      const decoder = new TextDecoder("utf-8", { fatal: false });
      setUtf8(decoder.decode(byteArray));

      const bytesStr = Array.from(byteArray).join(", ");
      setBytes(bytesStr);
    } catch {
      setError("Failed to decode hex string.");
    }
  }, []);

  const updateFromBytes = useCallback((value: string) => {
    setBytes(value);
    setError("");

    if (!value.trim()) {
      setUtf8("");
      setHex("");
      setByteLength(0);
      return;
    }

    try {
      const parts = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      const nums = parts.map((s) => {
        const n = parseInt(s, 10);
        if (isNaN(n) || n < 0 || n > 255) {
          throw new Error(`Invalid byte value: ${s}. Each byte must be 0-255.`);
        }
        return n;
      });

      const byteArray = new Uint8Array(nums);
      setByteLength(byteArray.length);

      const hexStr = Array.from(byteArray)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHex(hexStr);

      const decoder = new TextDecoder("utf-8", { fatal: false });
      setUtf8(decoder.decode(byteArray));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse byte array.");
    }
  }, []);

  const loadExample = (example: typeof EXAMPLES[number]) => {
    setUtf8(example.utf8);
    setHex(example.hex);
    setBytes(example.bytes);
    setByteLength(example.hex.length / 2);
    setError("");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500";

  return (
    <div className="space-y-6">
      {/* UTF-8 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          UTF-8 Text
        </label>
        <textarea
          value={utf8}
          onChange={(e) => updateFromUtf8(e.target.value)}
          placeholder='e.g. Hello World'
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Hex */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hex String
          <span className="ml-2 text-xs text-gray-500">(with or without 0x prefix)</span>
        </label>
        <textarea
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          placeholder="e.g. 48656c6c6f or 0x48656c6c6f"
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Bytes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Byte Array
          <span className="ml-2 text-xs text-gray-500">(comma-separated decimals, 0-255)</span>
        </label>
        <textarea
          value={bytes}
          onChange={(e) => updateFromBytes(e.target.value)}
          placeholder="e.g. 72, 101, 108, 108, 111"
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Byte length */}
      {byteLength > 0 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Byte length: <span className="font-mono font-medium">{byteLength}</span> byte{byteLength !== 1 ? "s" : ""}
            {" "}({byteLength * 8} bits)
          </p>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Examples */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
        </h3>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example.name}
              onClick={() => loadExample(example)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
