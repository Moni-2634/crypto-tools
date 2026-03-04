"use client";

import { useState, useMemo } from "react";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type InputMode = "utf8" | "hex";

const EXAMPLES = [
  {
    label: "transfer(address,uint256)",
    input: "transfer(address,uint256)",
    note: "Selector: 0xa9059cbb",
  },
  {
    label: "approve(address,uint256)",
    input: "approve(address,uint256)",
    note: "Selector: 0x095ea7b3",
  },
  {
    label: "balanceOf(address)",
    input: "balanceOf(address)",
    note: "Selector: 0x70a08231",
  },
];

export default function Keccak256Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<InputMode>("utf8");
  const [error, setError] = useState("");

  const hash = useMemo(() => {
    setError("");
    if (!input) return "";

    try {
      if (mode === "utf8") {
        return "0x" + keccak256(input);
      } else {
        // Hex mode: strip 0x prefix, validate hex
        const hex = input.startsWith("0x") ? input.slice(2) : input;
        if (!/^[0-9a-fA-F]*$/.test(hex)) {
          setError("Invalid hex string. Use characters 0-9, a-f only.");
          return "";
        }
        if (hex.length % 2 !== 0) {
          setError("Hex string must have an even number of characters.");
          return "";
        }
        // Convert hex string to byte array
        const bytes = new Uint8Array(
          hex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
        );
        return "0x" + keccak256(bytes);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hashing failed.");
      return "";
    }
  }, [input, mode]);

  const selector = useMemo(() => {
    if (!hash || mode !== "utf8") return "";
    // Show 4-byte function selector if input looks like a function signature
    if (/^\w+\(.*\)$/.test(input.trim())) {
      return hash.slice(0, 10);
    }
    return "";
  }, [hash, input, mode]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Input mode:</span>
        <div className="flex gap-1 rounded-lg bg-gray-800 p-1">
          <button
            onClick={() => setMode("utf8")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "utf8"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            UTF-8 Text
          </button>
          <button
            onClick={() => setMode("hex")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "hex"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
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
            ? "e.g. transfer(address,uint256)"
            : "e.g. 0x68656c6c6f"
        }
        multiline
        rows={3}
      />

      {error && (
        <p className="rounded-lg border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Keccak256 Hash" value={hash} rows={2} />

      {selector && (
        <div className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3">
          <span className="text-sm text-gray-400">
            Function Selector (first 4 bytes):{" "}
          </span>
          <code className="text-sm font-medium text-blue-400">{selector}</code>
        </div>
      )}

      <div className="border-t border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-300">
          Common Solidity Function Signatures
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => {
                setMode("utf8");
                setInput(ex.input);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-600 hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-300">{ex.label}</code>
              <span className="text-xs text-gray-500">{ex.note}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
