"use client";

import { useState, useEffect, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type InputMode = "utf8" | "hex";

async function sha256Hex(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", data.buffer as ArrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const EXAMPLES = [
  {
    label: "hello",
    input: "hello",
    note: "2cf24dba...71372",
  },
  {
    label: "Hello, World!",
    input: "Hello, World!",
    note: "dffd6021...f4686",
  },
  {
    label: "Empty string",
    input: "",
    note: "e3b0c442...b855",
  },
];

export default function Sha256Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<InputMode>("utf8");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  const computeHash = useCallback(async () => {
    setError("");

    // Handle empty string explicitly -- it's a valid SHA-256 input
    if (!input && mode !== "utf8") {
      setHash("");
      return;
    }

    try {
      let data: Uint8Array;

      if (mode === "utf8") {
        data = new TextEncoder().encode(input);
      } else {
        // Hex mode
        const hex = input.startsWith("0x") ? input.slice(2) : input;
        if (!/^[0-9a-fA-F]*$/.test(hex)) {
          setError("Invalid hex string. Use characters 0-9, a-f only.");
          setHash("");
          return;
        }
        if (hex.length % 2 !== 0) {
          setError("Hex string must have an even number of characters.");
          setHash("");
          return;
        }
        if (hex.length === 0) {
          setHash("");
          return;
        }
        data = new Uint8Array(
          hex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
        );
      }

      const result = await sha256Hex(data);
      setHash(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hashing failed.");
      setHash("");
    }
  }, [input, mode]);

  useEffect(() => {
    computeHash();
  }, [computeHash]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Input mode:
        </span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setMode("utf8")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "utf8"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            UTF-8 Text
          </button>
          <button
            onClick={() => setMode("hex")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "hex"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Hex Bytes
          </button>
        </div>
      </div>

      <InputField
        label={mode === "utf8" ? "Text Input" : "Hex Input"}
        value={input}
        onChange={setInput}
        placeholder={
          mode === "utf8"
            ? "e.g. Hello, World!"
            : "e.g. 0x48656c6c6f"
        }
        multiline
        rows={3}
      />

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="SHA-256 Hash (hex)" value={hash} rows={2} />

      {hash && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Hash length</span>
              <code className="font-mono text-blue-600 dark:text-blue-400">
                {hash.length} hex chars (256 bits)
              </code>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Input size</span>
              <code className="font-mono text-blue-600 dark:text-blue-400">
                {mode === "utf8"
                  ? `${new TextEncoder().encode(input).length} bytes`
                  : `${(input.startsWith("0x") ? input.slice(2) : input).length / 2} bytes`}
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Examples
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => {
                setMode("utf8");
                setInput(ex.input);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label || '""'}
              </code>
              <span className="text-xs text-gray-500">{ex.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About SHA-256
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function from
            the SHA-2 family, designed by the NSA and published by NIST. It produces a
            fixed 256-bit (32-byte) hash from any input.
          </p>
          <p>
            SHA-256 is widely used in security applications, TLS/SSL certificates, digital
            signatures, and blockchain technology. Bitcoin uses SHA-256 for its proof-of-work
            mining algorithm, while Ethereum uses Keccak256 (a different SHA-3 candidate).
          </p>
          <p>
            This tool uses the native Web Crypto API (<code>crypto.subtle.digest</code>)
            for computation, which runs entirely in your browser. No data is sent to any
            server.
          </p>
        </div>
      </div>
    </div>
  );
}
