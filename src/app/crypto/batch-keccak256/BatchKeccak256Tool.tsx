"use client";

import { useState, useMemo } from "react";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import CopyButton from "@/components/tools/CopyButton";

type InputMode = "utf8" | "hex";

interface HashResult {
  input: string;
  hash: string;
  selector: string;
  error?: string;
}

const EXAMPLE_INPUT = `transfer(address,uint256)
approve(address,uint256)
balanceOf(address)
transferFrom(address,address,uint256)
totalSupply()
allowance(address,address)`;

export default function BatchKeccak256Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<InputMode>("utf8");
  const [copied, setCopied] = useState(false);

  const results: HashResult[] = useMemo(() => {
    if (!input.trim()) return [];

    const lines = input.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line) => {
      const trimmed = line.trim();
      try {
        let hash: string;
        if (mode === "utf8") {
          hash = "0x" + keccak256(trimmed);
        } else {
          const hex = trimmed.startsWith("0x") ? trimmed.slice(2) : trimmed;
          if (!/^[0-9a-fA-F]*$/.test(hex)) {
            return {
              input: trimmed,
              hash: "",
              selector: "",
              error: "Invalid hex",
            };
          }
          if (hex.length % 2 !== 0) {
            return {
              input: trimmed,
              hash: "",
              selector: "",
              error: "Odd hex length",
            };
          }
          const bytes = new Uint8Array(
            hex.match(/.{2}/g)!.map((b) => parseInt(b, 16))
          );
          hash = "0x" + keccak256(bytes);
        }

        const selector =
          mode === "utf8" && /^\w+\(.*\)$/.test(trimmed)
            ? hash.slice(0, 10)
            : "";

        return { input: trimmed, hash, selector };
      } catch {
        return { input: trimmed, hash: "", selector: "", error: "Hash failed" };
      }
    });
  }, [input, mode]);

  const allHashes = results
    .filter((r) => r.hash)
    .map((r) => r.hash)
    .join("\n");

  const csvContent = useMemo(() => {
    if (results.length === 0) return "";
    const header = "Input,Keccak256 Hash,Function Selector";
    const rows = results.map(
      (r) =>
        `"${r.input.replace(/"/g, '""')}","${r.hash}","${r.selector}"`
    );
    return [header, ...rows].join("\n");
  }, [results]);

  const handleExportCsv = () => {
    if (!csvContent) return;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "keccak256_hashes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(allHashes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = allHashes;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        label="Input (one per line)"
        value={input}
        onChange={setInput}
        placeholder={
          mode === "utf8"
            ? "transfer(address,uint256)\napprove(address,uint256)\nbalanceOf(address)"
            : "0x68656c6c6f\n0x776f726c64"
        }
        multiline
        rows={6}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setInput(EXAMPLE_INPUT)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Load ERC-20 Signatures
        </button>
        <button
          onClick={() => setInput("")}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Results ({results.length} {results.length === 1 ? "hash" : "hashes"})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopyAll}
                className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {copied ? "Copied!" : "Copy All Hashes"}
              </button>
              <button
                onClick={handleExportCsv}
                className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <th className="px-4 py-2.5 text-left font-medium text-gray-700 dark:text-gray-300">
                    Input
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-700 dark:text-gray-300">
                    Keccak256 Hash
                  </th>
                  {mode === "utf8" && (
                    <th className="px-4 py-2.5 text-left font-medium text-gray-700 dark:text-gray-300">
                      Selector
                    </th>
                  )}
                  <th className="px-4 py-2.5 text-right font-medium text-gray-700 dark:text-gray-300">
                    Copy
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-800/50"
                  >
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                      {r.input}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-600 dark:text-gray-400 max-w-[300px] truncate">
                      {r.error ? (
                        <span className="text-red-500">{r.error}</span>
                      ) : (
                        r.hash
                      )}
                    </td>
                    {mode === "utf8" && (
                      <td className="px-4 py-2.5 font-mono text-xs text-blue-400">
                        {r.selector}
                      </td>
                    )}
                    <td className="px-4 py-2.5 text-right">
                      {r.hash && <CopyButton text={r.hash} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Use Cases
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            Hash multiple Solidity function signatures to get selectors at once
          </li>
          <li>Compute keccak256 for multiple storage keys in one step</li>
          <li>
            Generate event topic hashes for filtering Ethereum logs
          </li>
          <li>
            Batch hash inputs for Merkle tree construction or verification
          </li>
        </ul>
      </div>
    </div>
  );
}
