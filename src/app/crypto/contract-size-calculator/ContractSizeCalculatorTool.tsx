"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

const MAX_CONTRACT_SIZE = 24576; // 24 KB in bytes (EIP-170)

const SAMPLE_BYTECODE =
  "0x608060405234801561001057600080fd5b506040518060400160405280600581526020017f48656c6c6f0000000000000000000000000000000000000000000000000000008152505f908161005491906102a2565b5061036f565b5f81519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000";

interface SizeResult {
  bytes: number;
  kilobytes: string;
  percentage: string;
  percentageNum: number;
  remaining: number;
  remainingKb: string;
  isOverLimit: boolean;
}

function getBarColor(percent: number): string {
  if (percent > 80) return "bg-red-500";
  if (percent > 60) return "bg-yellow-500";
  return "bg-green-500";
}

function getStatusColor(percent: number): string {
  if (percent > 100) return "text-red-600 dark:text-red-400";
  if (percent > 80) return "text-red-500 dark:text-red-400";
  if (percent > 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-green-600 dark:text-green-400";
}

export default function ContractSizeCalculatorTool() {
  const [bytecode, setBytecode] = useState("");
  const [error, setError] = useState("");

  const result: SizeResult | null = useMemo(() => {
    setError("");
    if (!bytecode.trim()) return null;

    try {
      let hex = bytecode.trim();

      // Strip 0x prefix
      if (hex.startsWith("0x") || hex.startsWith("0X")) {
        hex = hex.slice(2);
      }

      // Remove whitespace and newlines
      hex = hex.replace(/\s/g, "");

      // Validate hex characters
      if (!/^[0-9a-fA-F]*$/.test(hex)) {
        throw new Error(
          "Invalid bytecode. Only hexadecimal characters (0-9, a-f) are allowed."
        );
      }

      if (hex.length % 2 !== 0) {
        throw new Error(
          "Invalid bytecode. Hex string must have an even number of characters."
        );
      }

      const bytes = hex.length / 2;
      const kilobytes = (bytes / 1024).toFixed(2);
      const percentageNum = (bytes / MAX_CONTRACT_SIZE) * 100;
      const percentage = percentageNum.toFixed(1);
      const remaining = MAX_CONTRACT_SIZE - bytes;
      const remainingKb = (remaining / 1024).toFixed(2);
      const isOverLimit = bytes > MAX_CONTRACT_SIZE;

      return {
        bytes,
        kilobytes,
        percentage,
        percentageNum,
        remaining,
        remainingKb,
        isOverLimit,
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse bytecode.");
      return null;
    }
  }, [bytecode]);

  return (
    <div className="space-y-6">
      <InputField
        label="Contract Bytecode (hex)"
        value={bytecode}
        onChange={setBytecode}
        placeholder="0x608060405234801561001057600080fd5b50..."
        multiline
        rows={6}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setBytecode(SAMPLE_BYTECODE)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Load Example
        </button>
        <button
          onClick={() => setBytecode("")}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-4">
          {/* Visual progress bar */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                EIP-170 Size Limit Usage
              </span>
              <span
                className={`text-sm font-bold ${getStatusColor(result.percentageNum)}`}
              >
                {result.percentage}%
              </span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getBarColor(result.percentageNum)}`}
                style={{ width: `${Math.min(result.percentageNum, 100)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>0 KB</span>
              <span>12 KB</span>
              <span>24 KB (limit)</span>
            </div>
          </div>

          {/* Over limit warning */}
          {result.isOverLimit && (
            <div className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                Contract exceeds the 24,576 byte EIP-170 limit!
              </p>
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                This contract is {Math.abs(result.remaining).toLocaleString()} bytes (
                {Math.abs(parseFloat(result.remainingKb)).toFixed(2)} KB) over the limit
                and will fail to deploy on mainnet.
              </p>
            </div>
          )}

          {/* Size details */}
          <div className="grid gap-3 sm:grid-cols-2">
            <OutputField
              label="Size (bytes)"
              value={result.bytes.toLocaleString()}
              rows={1}
            />
            <OutputField label="Size (KB)" value={`${result.kilobytes} KB`} rows={1} />
            <OutputField
              label="Limit Usage"
              value={`${result.percentage}% of 24,576 bytes`}
              rows={1}
            />
            <OutputField
              label={result.isOverLimit ? "Over Limit By" : "Remaining"}
              value={
                result.isOverLimit
                  ? `${Math.abs(result.remaining).toLocaleString()} bytes (${Math.abs(parseFloat(result.remainingKb)).toFixed(2)} KB)`
                  : `${result.remaining.toLocaleString()} bytes (${result.remainingKb} KB)`
              }
              rows={1}
            />
          </div>
        </div>
      )}

      {/* EIP-170 explanation */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          What is EIP-170?
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            EIP-170 introduced a maximum deployed contract size of{" "}
            <strong>24,576 bytes (24 KB)</strong> as part of the Spurious Dragon
            hard fork (Nov 2016).
          </li>
          <li>
            This limit prevents denial-of-service attacks through excessively
            large contracts that would slow down the network.
          </li>
          <li>
            The limit applies to the <em>deployed</em> bytecode (runtime code),
            not the creation/constructor bytecode.
          </li>
          <li>
            EIP-3860 (Shanghai upgrade) also limits <em>initcode</em> to 49,152
            bytes (2x the runtime limit).
          </li>
        </ul>
      </div>

      {/* Tips for reducing size */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Tips for Reducing Contract Size
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            <strong>Use libraries:</strong> Extract shared logic into external
            libraries to reduce duplicated bytecode.
          </li>
          <li>
            <strong>Split contracts:</strong> Use the proxy pattern or diamond
            pattern (EIP-2535) to split logic across multiple contracts.
          </li>
          <li>
            <strong>Shorter error messages:</strong> Replace long
            require/revert strings with custom errors (saves significant bytes).
          </li>
          <li>
            <strong>Optimizer:</strong> Enable the Solidity optimizer with a low
            &quot;runs&quot; value (e.g., 200) to optimize for deployment size.
          </li>
          <li>
            <strong>Remove unused code:</strong> Remove dead functions, unused
            imports, and debugging utilities before deployment.
          </li>
          <li>
            <strong>Use via-IR:</strong> The Solidity via-IR pipeline can
            sometimes produce smaller bytecode.
          </li>
        </ul>
      </div>
    </div>
  );
}
