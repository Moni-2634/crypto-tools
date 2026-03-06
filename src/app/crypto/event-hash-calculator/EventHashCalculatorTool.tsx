"use client";

import { useState, useMemo } from "react";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

interface EventExample {
  label: string;
  signature: string;
  description: string;
  indexedParams?: string;
}

const COMMON_EVENTS: EventExample[] = [
  {
    label: "Transfer (ERC-20/ERC-721)",
    signature: "Transfer(address,address,uint256)",
    description: "Emitted on token transfers. Most common event on Ethereum.",
    indexedParams: "from (indexed), to (indexed), value/tokenId",
  },
  {
    label: "Approval (ERC-20)",
    signature: "Approval(address,address,uint256)",
    description: "Emitted when an allowance is set via approve().",
    indexedParams: "owner (indexed), spender (indexed), value",
  },
  {
    label: "ApprovalForAll (ERC-721)",
    signature: "ApprovalForAll(address,address,bool)",
    description: "Emitted when an operator is approved/revoked for all tokens.",
    indexedParams: "owner (indexed), operator (indexed), approved",
  },
  {
    label: "Swap (Uniswap V2)",
    signature: "Swap(address,uint256,uint256,uint256,uint256,address)",
    description: "Emitted on every swap in a Uniswap V2 pair.",
    indexedParams:
      "sender (indexed), amount0In, amount1In, amount0Out, amount1Out, to (indexed)",
  },
  {
    label: "Deposit (WETH)",
    signature: "Deposit(address,uint256)",
    description: "Emitted when ETH is wrapped into WETH.",
    indexedParams: "dst (indexed), wad",
  },
  {
    label: "Withdrawal (WETH)",
    signature: "Withdrawal(address,uint256)",
    description: "Emitted when WETH is unwrapped back to ETH.",
    indexedParams: "src (indexed), wad",
  },
  {
    label: "OwnershipTransferred (Ownable)",
    signature: "OwnershipTransferred(address,address)",
    description: "Emitted when contract ownership changes.",
    indexedParams: "previousOwner (indexed), newOwner (indexed)",
  },
  {
    label: "Upgraded (Proxy)",
    signature: "Upgraded(address)",
    description:
      "Emitted when a proxy contract is upgraded to a new implementation.",
    indexedParams: "implementation (indexed)",
  },
];

export default function EventHashCalculatorTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const hash = useMemo(() => {
    setError("");
    if (!input.trim()) return "";

    try {
      const sig = input.trim();
      // Basic validation: should look like EventName(type1,type2,...)
      if (!/^\w+\(.*\)$/.test(sig)) {
        setError(
          'Invalid event signature format. Expected: EventName(type1,type2,...)'
        );
        return "";
      }
      return "0x" + keccak256(sig);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hashing failed.");
      return "";
    }
  }, [input]);

  // Parse the input signature to show parameter breakdown
  const paramBreakdown = useMemo(() => {
    if (!input.trim()) return null;
    const sig = input.trim();
    const match = sig.match(/^(\w+)\((.*)\)$/);
    if (!match) return null;

    const eventName = match[1];
    const paramsStr = match[2];
    if (!paramsStr) return { eventName, params: [] };

    // Simple parameter splitting (handles nested tuples)
    const params: string[] = [];
    let depth = 0;
    let current = "";
    for (const char of paramsStr) {
      if (char === "(") depth++;
      if (char === ")") depth--;
      if (char === "," && depth === 0) {
        params.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    if (current.trim()) params.push(current.trim());

    return { eventName, params };
  }, [input]);

  return (
    <div className="space-y-6">
      <InputField
        label="Event Signature"
        value={input}
        onChange={setInput}
        placeholder="e.g. Transfer(address,address,uint256)"
      />

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Event Topic (keccak256 hash)" value={hash} rows={2} />

      {paramBreakdown && paramBreakdown.params.length > 0 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Parameter Breakdown
          </h3>
          <div className="space-y-1">
            {paramBreakdown.params.map((param, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-mono text-xs text-gray-500 dark:text-gray-500">
                  [{i}]
                </span>
                <code className="text-gray-700 dark:text-gray-300">
                  {param}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {hash && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            How to Filter Logs
          </h3>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Use this hash as <code>topics[0]</code> when filtering event logs
            via eth_getLogs or similar RPC calls:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 dark:bg-gray-950 p-3 text-xs text-gray-200">
{`{
  "method": "eth_getLogs",
  "params": [{
    "topics": ["${hash}"],
    "fromBlock": "0x0",
    "toBlock": "latest"
  }]
}`}
          </pre>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Solidity Events
        </h3>
        <div className="space-y-2">
          {COMMON_EVENTS.map((ev) => (
            <button
              key={ev.signature}
              onClick={() => setInput(ev.signature)}
              className="flex w-full flex-col gap-1 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ev.label}
                </span>
                <code className="text-xs text-gray-500">
                  {("0x" + keccak256(ev.signature)).slice(0, 10)}...
                </code>
              </div>
              <code className="text-xs text-gray-500 dark:text-gray-500">
                {ev.signature}
              </code>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {ev.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Indexed vs Non-Indexed Parameters
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>
            In Solidity events, parameters marked as <code>indexed</code> are
            stored in log topics (topics[1], topics[2], topics[3]), while
            non-indexed parameters are ABI-encoded in the log data field.
          </p>
          <p>
            Topics are searchable, so indexed parameters can be used to filter
            logs efficiently. Ethereum allows a maximum of 3 indexed parameters
            per event (plus topics[0] which is always the event signature hash).
          </p>
          <p>
            Note: Anonymous events do not include the signature hash in
            topics[0], allowing them to have up to 4 indexed parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
