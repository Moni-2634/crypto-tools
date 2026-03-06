"use client";

import { useState, useMemo } from "react";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "calculate" | "common";

interface SelectorEntry {
  signature: string;
  selector: string;
  category: string;
}

const COMMON_SELECTORS: SelectorEntry[] = [
  // ERC-20
  { signature: "name()", selector: "0x06fdde03", category: "ERC-20" },
  { signature: "symbol()", selector: "0x95d89b41", category: "ERC-20" },
  { signature: "decimals()", selector: "0x313ce567", category: "ERC-20" },
  { signature: "totalSupply()", selector: "0x18160ddd", category: "ERC-20" },
  {
    signature: "balanceOf(address)",
    selector: "0x70a08231",
    category: "ERC-20",
  },
  {
    signature: "transfer(address,uint256)",
    selector: "0xa9059cbb",
    category: "ERC-20",
  },
  {
    signature: "approve(address,uint256)",
    selector: "0x095ea7b3",
    category: "ERC-20",
  },
  {
    signature: "allowance(address,address)",
    selector: "0xdd62ed3e",
    category: "ERC-20",
  },
  {
    signature: "transferFrom(address,address,uint256)",
    selector: "0x23b872dd",
    category: "ERC-20",
  },
  // ERC-721
  {
    signature: "ownerOf(uint256)",
    selector: "0x6352211e",
    category: "ERC-721",
  },
  {
    signature: "safeTransferFrom(address,address,uint256)",
    selector: "0x42842e0e",
    category: "ERC-721",
  },
  {
    signature: "safeTransferFrom(address,address,uint256,bytes)",
    selector: "0xb88d4fde",
    category: "ERC-721",
  },
  {
    signature: "setApprovalForAll(address,bool)",
    selector: "0xa22cb465",
    category: "ERC-721",
  },
  {
    signature: "getApproved(uint256)",
    selector: "0x081812fc",
    category: "ERC-721",
  },
  {
    signature: "isApprovedForAll(address,address)",
    selector: "0xe985e9c5",
    category: "ERC-721",
  },
  {
    signature: "tokenURI(uint256)",
    selector: "0xc87b56dd",
    category: "ERC-721",
  },
  {
    signature: "mint(address,uint256)",
    selector: "0x40c10f19",
    category: "ERC-721",
  },
  {
    signature: "burn(uint256)",
    selector: "0x42966c68",
    category: "ERC-721",
  },
  // ERC-1155
  {
    signature: "balanceOfBatch(address[],uint256[])",
    selector: "0x4e1273f4",
    category: "ERC-1155",
  },
  {
    signature: "safeTransferFrom(address,address,uint256,uint256,bytes)",
    selector: "0xf242432a",
    category: "ERC-1155",
  },
  // Ownable / Access Control
  { signature: "owner()", selector: "0x8da5cb5b", category: "Ownable" },
  {
    signature: "renounceOwnership()",
    selector: "0x715018a6",
    category: "Ownable",
  },
  {
    signature: "transferOwnership(address)",
    selector: "0xf2fde38b",
    category: "Ownable",
  },
  // Pausable
  { signature: "pause()", selector: "0x8456cb59", category: "Pausable" },
  { signature: "unpause()", selector: "0x3f4ba83a", category: "Pausable" },
  { signature: "paused()", selector: "0x5c975abb", category: "Pausable" },
  // Common
  { signature: "withdraw()", selector: "0x3ccfd60b", category: "Common" },
  {
    signature: "withdraw(uint256)",
    selector: "0x2e1a7d4d",
    category: "Common",
  },
  { signature: "deposit()", selector: "0xd0e30db0", category: "Common" },
  {
    signature: "initialize()",
    selector: "0x8129fc1c",
    category: "Common",
  },
  {
    signature: "supportsInterface(bytes4)",
    selector: "0x01ffc9a7",
    category: "ERC-165",
  },
  {
    signature: "receive()",
    selector: "N/A",
    category: "Common",
  },
  {
    signature: "fallback()",
    selector: "N/A",
    category: "Common",
  },
];

export default function FunctionSelectorTool() {
  const [tab, setTab] = useState<Tab>("calculate");
  const [signature, setSignature] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const calculated = useMemo(() => {
    setError("");
    const sig = signature.trim();
    if (!sig) return { selector: "", fullHash: "" };

    try {
      // Basic validation: should look like functionName(type1,type2)
      if (!/^\w+\(.*\)$/.test(sig)) {
        setError(
          'Invalid function signature format. Expected format: functionName(type1,type2)'
        );
        return { selector: "", fullHash: "" };
      }

      const hash = "0x" + keccak256(sig);
      const selector = hash.slice(0, 10);
      return { selector, fullHash: hash };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hash calculation failed.");
      return { selector: "", fullHash: "" };
    }
  }, [signature]);

  const filteredSelectors = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return COMMON_SELECTORS;
    return COMMON_SELECTORS.filter(
      (entry) =>
        entry.signature.toLowerCase().includes(term) ||
        entry.selector.toLowerCase().includes(term) ||
        entry.category.toLowerCase().includes(term)
    );
  }, [search]);

  // Group by category
  const groupedSelectors = useMemo(() => {
    const groups: Record<string, SelectorEntry[]> = {};
    for (const entry of filteredSelectors) {
      if (!groups[entry.category]) {
        groups[entry.category] = [];
      }
      groups[entry.category].push(entry);
    }
    return groups;
  }, [filteredSelectors]);

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setTab("calculate")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "calculate"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Calculate
          </button>
          <button
            onClick={() => setTab("common")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "common"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Common Selectors
          </button>
        </div>
      </div>

      {tab === "calculate" ? (
        <div className="space-y-6">
          <InputField
            label="Function Signature"
            value={signature}
            onChange={setSignature}
            placeholder="e.g. transfer(address,uint256)"
          />

          {error && (
            <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {calculated.selector && (
            <>
              <OutputField
                label="Function Selector (first 4 bytes)"
                value={calculated.selector}
                rows={1}
              />
              <OutputField
                label="Full Keccak256 Hash"
                value={calculated.fullHash}
                rows={2}
              />
            </>
          )}

          {/* Quick examples */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Try These Signatures
            </h3>
            <div className="space-y-2">
              {[
                "transfer(address,uint256)",
                "approve(address,uint256)",
                "balanceOf(address)",
                "ownerOf(uint256)",
                "swap(uint256,uint256,address,bytes)",
              ].map((sig) => (
                <button
                  key={sig}
                  onClick={() => setSignature(sig)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                >
                  <code className="text-sm text-gray-700 dark:text-gray-300">
                    {sig}
                  </code>
                  <span className="text-xs text-gray-500">
                    0x{keccak256(sig).slice(0, 8)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <InputField
            label="Search selectors"
            value={search}
            onChange={setSearch}
            placeholder="Search by name, selector, or category..."
          />

          {Object.entries(groupedSelectors).map(([category, entries]) => (
            <div key={category}>
              <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {category}
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                        Selector
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                        Function Signature
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr
                        key={entry.signature}
                        className="border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                        onClick={() => {
                          setTab("calculate");
                          setSignature(entry.signature);
                        }}
                      >
                        <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">
                          {entry.selector}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300">
                          {entry.signature}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {filteredSelectors.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No selectors match your search.
            </p>
          )}
        </div>
      )}

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Function Selectors
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            A function selector is the first 4 bytes of the keccak256 hash of
            the function signature
          </li>
          <li>
            The EVM uses selectors to dispatch calls to the correct function
          </li>
          <li>
            Signature format: functionName(type1,type2) -- no spaces, no
            parameter names
          </li>
          <li>
            Selectors are used in calldata, event topics, and interface
            detection (ERC-165)
          </li>
        </ul>
      </div>
    </div>
  );
}
