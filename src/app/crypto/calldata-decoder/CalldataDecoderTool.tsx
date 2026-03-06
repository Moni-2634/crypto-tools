"use client";

import { useState } from "react";
import { Interface, AbiCoder } from "ethers";
import InputField from "@/components/tools/InputField";

const EXAMPLES = [
  {
    label: "ERC-20 transfer(address,uint256)",
    calldata:
      "0xa9059cbb000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000",
    signature: "transfer(address,uint256)",
  },
  {
    label: "ERC-20 approve(address,uint256)",
    calldata:
      "0x095ea7b3000000000000000000000000spender0000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffff".slice(
        0,
        138
      ),
    signature: "approve(address,uint256)",
  },
  {
    label: "ERC-20 transferFrom(address,address,uint256)",
    calldata:
      "0x23b872dd000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000001234567890abcdef1234567890abcdef123456780000000000000000000000000000000000000000000000000de0b6b3a7640000",
    signature: "transferFrom(address,address,uint256)",
  },
];

interface DecodedParam {
  index: number;
  name: string;
  type: string;
  value: string;
}

export default function CalldataDecoderTool() {
  const [calldata, setCalldata] = useState("");
  const [signature, setSignature] = useState("");
  const [selector, setSelector] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [params, setParams] = useState<DecodedParam[]>([]);
  const [rawParams, setRawParams] = useState("");
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setSelector("");
    setFunctionName("");
    setParams([]);
    setRawParams("");

    try {
      const data = calldata.trim();
      if (!data) {
        setError("Please enter calldata to decode.");
        return;
      }

      const hex = data.startsWith("0x") ? data : `0x${data}`;

      // Validate hex
      if (!/^0x[0-9a-fA-F]*$/.test(hex)) {
        setError("Invalid hex string. Only characters 0-9, a-f are allowed.");
        return;
      }

      if (hex.length < 10) {
        setError(
          "Calldata must be at least 4 bytes (8 hex chars) to contain a function selector."
        );
        return;
      }

      const fnSelector = hex.slice(0, 10);
      setSelector(fnSelector);

      const sig = signature.trim();

      if (sig) {
        // Decode with provided signature
        const fullSig = sig.startsWith("function ")
          ? sig
          : `function ${sig}`;
        const iface = new Interface([fullSig]);
        const decoded = iface.parseTransaction({ data: hex });

        if (!decoded) {
          setError(
            "Could not decode calldata with the provided function signature."
          );
          return;
        }

        setFunctionName(decoded.name);

        const decodedParams: DecodedParam[] = decoded.fragment.inputs.map(
          (input, i) => ({
            index: i,
            name: input.name || `param${i}`,
            type: input.type,
            value: formatValue(decoded.args[i]),
          })
        );
        setParams(decodedParams);
      } else {
        // No signature - show raw parameter data
        const paramData = hex.slice(10);
        if (paramData.length > 0) {
          // Try to split into 32-byte words
          const words: string[] = [];
          for (let i = 0; i < paramData.length; i += 64) {
            const word = paramData.slice(i, i + 64);
            words.push(word.padEnd(64, "0"));
          }

          // Attempt to guess common decodings for each word
          const lines = words.map((word, i) => {
            const guesses: string[] = [];

            // Try as uint256
            try {
              const num = BigInt("0x" + word);
              guesses.push(`uint256: ${num.toString()}`);
            } catch {
              /* ignore */
            }

            // Try as address (check if first 12 bytes are zero)
            if (word.slice(0, 24) === "000000000000000000000000") {
              guesses.push(`address: 0x${word.slice(24)}`);
            }

            return `[${i}] 0x${word}\n    ${guesses.join(" | ")}`;
          });

          setRawParams(lines.join("\n\n"));
        } else {
          setRawParams("No parameter data (selector only).");
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed.");
    }
  };

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setCalldata(ex.calldata);
    setSignature(ex.signature);
    setError("");
    setSelector("");
    setFunctionName("");
    setParams([]);
    setRawParams("");
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Raw Calldata (hex)"
        value={calldata}
        onChange={setCalldata}
        placeholder="0xa9059cbb000000000000000000000000..."
        multiline
        rows={3}
      />

      <InputField
        label="Function Signature (optional)"
        value={signature}
        onChange={setSignature}
        placeholder='e.g. transfer(address,uint256)'
      />

      <button
        onClick={handleDecode}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Decode
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {selector && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Function Selector:
                </span>
                <code className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {selector}
                </code>
              </div>
              {functionName && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Function Name:
                  </span>
                  <code className="text-sm font-medium text-gray-900 dark:text-white">
                    {functionName}
                  </code>
                </div>
              )}
            </div>
          </div>

          {params.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      #
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {params.map((p) => (
                    <tr
                      key={p.index}
                      className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                    >
                      <td className="px-4 py-2.5 text-gray-500 dark:text-gray-500">
                        {p.index}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                        {p.name}
                      </td>
                      <td className="px-4 py-2.5 text-blue-600 dark:text-blue-400">
                        {p.type}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300 break-all">
                        {p.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rawParams && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Raw Parameter Words (32-byte each)
              </label>
              <pre className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
                {rawParams}
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Examples
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="text-xs text-gray-500">Click to load</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatValue(value: unknown): string {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(", ")}]`;
  }
  return String(value);
}
