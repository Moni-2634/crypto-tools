"use client";

import { useState } from "react";
import OutputField from "@/components/tools/OutputField";

export default function HexDecimalConverterTool() {
  const [hexInput, setHexInput] = useState("");
  const [decInput, setDecInput] = useState("");
  const [hexResult, setHexResult] = useState("");
  const [decResult, setDecResult] = useState("");
  const [error, setError] = useState("");

  const handleHexToDec = (value: string) => {
    setHexInput(value);
    setError("");
    setDecResult("");

    const hex = value.trim();
    if (!hex) return;

    const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
    if (!/^[0-9a-fA-F]+$/.test(clean)) {
      setError("Invalid hex. Use characters 0-9, a-f only.");
      return;
    }

    try {
      const dec = BigInt("0x" + clean).toString(10);
      setDecResult(dec);
    } catch {
      setError("Failed to convert hex to decimal.");
    }
  };

  const handleDecToHex = (value: string) => {
    setDecInput(value);
    setError("");
    setHexResult("");

    const dec = value.trim();
    if (!dec) return;

    if (!/^\d+$/.test(dec)) {
      setError("Invalid decimal. Use digits 0-9 only.");
      return;
    }

    try {
      const hex = "0x" + BigInt(dec).toString(16);
      setHexResult(hex);
    } catch {
      setError("Failed to convert decimal to hex.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hex to Decimal */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Hex to Decimal
        </h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Hexadecimal
          </label>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexToDec(e.target.value)}
            placeholder="e.g. 0xff or 1a2b3c"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm font-mono text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <OutputField label="Decimal" value={decResult} rows={2} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800" />

      {/* Decimal to Hex */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Decimal to Hex
        </h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Decimal
          </label>
          <input
            type="text"
            value={decInput}
            onChange={(e) => handleDecToHex(e.target.value)}
            placeholder="e.g. 255 or 1000000"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm font-mono text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <OutputField label="Hexadecimal" value={hexResult} rows={2} />
      </div>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Ethereum Values
        </h3>
        <div className="space-y-1 text-sm text-gray-500">
          <p>Block numbers, nonces, and values in Ethereum JSON-RPC are returned as hex.</p>
          <p>Example: <code className="text-gray-600 dark:text-gray-400">0x1e8480</code> = <code className="text-gray-600 dark:text-gray-400">2,000,000</code> (gas limit)</p>
        </div>
      </div>
    </div>
  );
}
