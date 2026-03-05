"use client";

import { useState } from "react";
import { getAddress } from "ethers";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

export default function ChecksumAddressTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setOutput("");

    const addr = input.trim();
    if (!addr) {
      setError("Please enter an Ethereum address.");
      return;
    }

    // Must be 42 chars starting with 0x
    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
      setError(
        "Invalid Ethereum address. Must be 42 characters starting with 0x."
      );
      return;
    }

    try {
      const checksummed = getAddress(addr);
      setOutput(checksummed);
    } catch {
      setError("Failed to compute checksum address.");
    }
  };

  const isChanged =
    output && input.trim().toLowerCase() !== output.toLowerCase()
      ? false
      : output && input.trim() !== output;

  return (
    <div className="space-y-4">
      <InputField
        label="Ethereum Address"
        value={input}
        onChange={setInput}
        placeholder="0x742d35cc6634c0532925a3b844bc9e7595f2bd38"
      />
      <button
        onClick={handleConvert}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Convert to Checksum
      </button>
      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <OutputField label="EIP-55 Checksum Address" value={output} rows={2} />
      {isChanged && (
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          The casing has been updated to include the EIP-55 checksum.
        </p>
      )}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          What is EIP-55?
        </h3>
        <p className="text-sm text-gray-500">
          EIP-55 is a checksum standard for Ethereum addresses that uses mixed
          casing to detect typos. Each letter in the address is uppercased or
          lowercased based on the Keccak256 hash of the lowercase address. This
          provides a simple way to verify address integrity without changing the
          address itself.
        </p>
      </div>
    </div>
  );
}
