"use client";

import { useState } from "react";
import { AbiCoder, Interface } from "ethers";
import InputField from "@/components/tools/InputField";

const PANIC_CODES: Record<string, string> = {
  "0x00": "Generic compiler panic",
  "0x01": "Assert condition failed",
  "0x11": "Arithmetic overflow or underflow",
  "0x12": "Division or modulo by zero",
  "0x21": "Conversion to invalid enum value",
  "0x22": "Incorrectly encoded storage byte array",
  "0x31": "Pop on empty array",
  "0x32": "Array index out of bounds",
  "0x41": "Too much memory allocated",
  "0x51": "Called zero-initialized function pointer",
};

const ERROR_SELECTOR = "0x08c379a0"; // Error(string)
const PANIC_SELECTOR = "0x4e487b71"; // Panic(uint256)

interface DecodedResult {
  type: "error" | "panic" | "custom" | "raw";
  selector: string;
  message: string;
  details: string[];
}

const EXAMPLES = [
  {
    label: 'Error(string) - "Insufficient balance"',
    data: "0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000014496e73756666696369656e742062616c616e6365000000000000000000000000",
  },
  {
    label: "Panic(uint256) - Overflow (0x11)",
    data: "0x4e487b710000000000000000000000000000000000000000000000000000000000000011",
  },
  {
    label: "Panic(uint256) - Division by zero (0x12)",
    data: "0x4e487b710000000000000000000000000000000000000000000000000000000000000012",
  },
  {
    label: 'Error(string) - "ERC20: transfer amount exceeds balance"',
    data: "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002645524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e63650000000000000000000000000000000000000000000000000000",
  },
];

export default function ErrorDecoderTool() {
  const [revertData, setRevertData] = useState("");
  const [customSignature, setCustomSignature] = useState("");
  const [result, setResult] = useState<DecodedResult | null>(null);
  const [error, setError] = useState("");

  const decode = () => {
    setError("");
    setResult(null);

    try {
      const data = revertData.trim();
      if (!data) {
        setError("Please enter revert data to decode.");
        return;
      }

      const hex = data.startsWith("0x") ? data : `0x${data}`;

      if (!/^0x[0-9a-fA-F]*$/.test(hex)) {
        setError("Invalid hex string. Only characters 0-9, a-f are allowed.");
        return;
      }

      if (hex.length < 10) {
        setError(
          "Revert data must be at least 4 bytes (8 hex chars) to contain an error selector."
        );
        return;
      }

      const selector = hex.slice(0, 10).toLowerCase();
      const paramData = "0x" + hex.slice(10);

      // Check for Error(string)
      if (selector === ERROR_SELECTOR) {
        try {
          const coder = AbiCoder.defaultAbiCoder();
          const decoded = coder.decode(["string"], paramData);
          setResult({
            type: "error",
            selector,
            message: decoded[0],
            details: [
              `Error type: Error(string)`,
              `Selector: ${selector}`,
              `Message: "${decoded[0]}"`,
            ],
          });
          return;
        } catch {
          setError(
            "Detected Error(string) selector but failed to decode the string parameter."
          );
          return;
        }
      }

      // Check for Panic(uint256)
      if (selector === PANIC_SELECTOR) {
        try {
          const coder = AbiCoder.defaultAbiCoder();
          const decoded = coder.decode(["uint256"], paramData);
          const panicCode = "0x" + decoded[0].toString(16).padStart(2, "0");
          const description =
            PANIC_CODES[panicCode] || `Unknown panic code: ${panicCode}`;

          setResult({
            type: "panic",
            selector,
            message: description,
            details: [
              `Error type: Panic(uint256)`,
              `Selector: ${selector}`,
              `Panic code: ${panicCode} (${decoded[0].toString()})`,
              `Description: ${description}`,
            ],
          });
          return;
        } catch {
          setError(
            "Detected Panic(uint256) selector but failed to decode the uint256 parameter."
          );
          return;
        }
      }

      // Try custom error signature if provided
      const customSig = customSignature.trim();
      if (customSig) {
        try {
          const fullSig = customSig.startsWith("error ")
            ? customSig
            : `error ${customSig}`;
          const iface = new Interface([fullSig]);

          // Find the error by selector
          const errorFragment = iface.getError(selector);
          if (errorFragment) {
            const coder = AbiCoder.defaultAbiCoder();
            const decoded = coder.decode(
              errorFragment.inputs.map((i) => i.type),
              paramData
            );

            const paramDetails = errorFragment.inputs.map(
              (input, i) =>
                `  ${input.name || `param${i}`} (${input.type}): ${formatValue(decoded[i])}`
            );

            setResult({
              type: "custom",
              selector,
              message: `${errorFragment.name}(${errorFragment.inputs.map((i) => i.type).join(",")})`,
              details: [
                `Error type: Custom error`,
                `Selector: ${selector}`,
                `Signature: ${errorFragment.name}(${errorFragment.inputs.map((i) => i.type).join(",")})`,
                `Parameters:`,
                ...paramDetails,
              ],
            });
            return;
          } else {
            setError(
              "The provided error signature does not match the selector in the revert data."
            );
            return;
          }
        } catch (e) {
          setError(
            `Failed to decode with custom signature: ${e instanceof Error ? e.message : "Unknown error"}`
          );
          return;
        }
      }

      // Unknown selector - show raw data
      const words: string[] = [];
      const rawParamHex = hex.slice(10);
      for (let i = 0; i < rawParamHex.length; i += 64) {
        const word = rawParamHex.slice(i, i + 64);
        words.push("0x" + word.padEnd(64, "0"));
      }

      setResult({
        type: "raw",
        selector,
        message: "Unknown error selector",
        details: [
          `Selector: ${selector}`,
          `This selector does not match Error(string) or Panic(uint256).`,
          `Provide a custom error signature above to decode.`,
          ``,
          `Raw parameter words (32 bytes each):`,
          ...words.map((w, i) => `  [${i}] ${w}`),
        ],
      });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Decoding failed. Check your input."
      );
    }
  };

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setRevertData(ex.data);
    setCustomSignature("");
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Revert Data (hex)"
        value={revertData}
        onChange={setRevertData}
        placeholder="0x08c379a0000000000000000000000000..."
        multiline
        rows={3}
      />

      <InputField
        label="Custom Error Signature (optional)"
        value={customSignature}
        onChange={setCustomSignature}
        placeholder="e.g. InsufficientBalance(address,uint256)"
      />

      <button
        onClick={decode}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Decode Error
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-4">
          {/* Result type badge */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  result.type === "error"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : result.type === "panic"
                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                      : result.type === "custom"
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {result.type === "error"
                  ? "Error(string)"
                  : result.type === "panic"
                    ? "Panic(uint256)"
                    : result.type === "custom"
                      ? "Custom Error"
                      : "Unknown"}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {result.message}
            </p>
            <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-x-auto">
              {result.details.join("\n")}
            </pre>
          </div>
        </div>
      )}

      {/* Panic codes reference */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Solidity Panic Codes Reference
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                  Code
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(PANIC_CODES).map(([code, desc]) => (
                <tr
                  key={code}
                  className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                >
                  <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">
                    {code}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
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
