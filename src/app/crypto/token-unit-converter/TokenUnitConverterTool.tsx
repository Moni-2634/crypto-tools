"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

const PRESETS = [
  { label: "USDC / USDT", decimals: 6 },
  { label: "WBTC", decimals: 8 },
  { label: "SUI / Gala", decimals: 9 },
  { label: "ETH / Most Tokens", decimals: 18 },
] as const;

const COMMON_TOKENS = [
  { name: "Ether", symbol: "ETH", decimals: 18 },
  { name: "USD Coin", symbol: "USDC", decimals: 6 },
  { name: "Tether", symbol: "USDT", decimals: 6 },
  { name: "Wrapped Bitcoin", symbol: "WBTC", decimals: 8 },
  { name: "Dai", symbol: "DAI", decimals: 18 },
  { name: "Chainlink", symbol: "LINK", decimals: 18 },
  { name: "Uniswap", symbol: "UNI", decimals: 18 },
  { name: "Aave", symbol: "AAVE", decimals: 18 },
  { name: "SUI", symbol: "SUI", decimals: 9 },
  { name: "Shiba Inu", symbol: "SHIB", decimals: 18 },
];

type Direction = "toRaw" | "toHuman";

function decimalToRaw(value: string, decimals: number): bigint {
  const trimmed = value.trim();
  if (!/^\d*\.?\d*$/.test(trimmed) || trimmed === "" || trimmed === ".") {
    throw new Error("Invalid number");
  }
  const parts = trimmed.split(".");
  const whole = parts[0] || "0";
  const frac = (parts[1] || "").padEnd(decimals, "0").slice(0, decimals);

  if (parts[1] && parts[1].length > decimals) {
    const extra = parts[1].slice(decimals);
    if (extra.replace(/0/g, "") !== "") {
      throw new Error(
        `Too many decimal places. Maximum ${decimals} for this token.`
      );
    }
  }

  return BigInt(whole) * BigInt(10) ** BigInt(decimals) + BigInt(frac || "0");
}

function rawToDecimal(raw: bigint, decimals: number): string {
  if (decimals === 0) return raw.toString();
  const divisor = BigInt(10) ** BigInt(decimals);
  const whole = raw / divisor;
  const remainder = raw % divisor;
  if (remainder === BigInt(0)) return whole.toString();
  const fracStr = remainder.toString().padStart(decimals, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}`;
}

function toScientific(raw: bigint): string {
  if (raw === BigInt(0)) return "0";
  const str = raw.toString();
  if (str.length <= 1) return str;
  const exp = str.length - 1;
  const mantissa = str[0] + (str.length > 1 ? "." + str.slice(1).replace(/0+$/, "") : "");
  const cleanMantissa = mantissa.endsWith(".") ? mantissa.slice(0, -1) : mantissa;
  return `${cleanMantissa}e+${exp}`;
}

function toHexValue(raw: bigint): string {
  if (raw === BigInt(0)) return "0x0";
  return "0x" + raw.toString(16);
}

export default function TokenUnitConverterTool() {
  const [direction, setDirection] = useState<Direction>("toRaw");
  const [humanValue, setHumanValue] = useState("");
  const [rawValue, setRawValue] = useState("");
  const [decimals, setDecimals] = useState(18);
  const [customDecimals, setCustomDecimals] = useState("");
  const [error, setError] = useState("");

  const activeDecimals = customDecimals !== "" ? parseInt(customDecimals, 10) : decimals;

  const results = useMemo(() => {
    setError("");

    if (direction === "toRaw") {
      if (!humanValue.trim()) return null;
      try {
        if (isNaN(activeDecimals) || activeDecimals < 0 || activeDecimals > 77) {
          throw new Error("Decimals must be between 0 and 77.");
        }
        const raw = decimalToRaw(humanValue, activeDecimals);
        return {
          raw: raw.toString(),
          scientific: toScientific(raw),
          hex: toHexValue(raw),
          human: humanValue,
        };
      } catch (e) {
        setError(e instanceof Error ? e.message : "Conversion failed.");
        return null;
      }
    } else {
      if (!rawValue.trim()) return null;
      try {
        if (isNaN(activeDecimals) || activeDecimals < 0 || activeDecimals > 77) {
          throw new Error("Decimals must be between 0 and 77.");
        }
        const cleaned = rawValue.trim();
        if (!/^\d+$/.test(cleaned)) {
          throw new Error("Raw value must be a positive integer.");
        }
        const raw = BigInt(cleaned);
        return {
          raw: raw.toString(),
          scientific: toScientific(raw),
          hex: toHexValue(raw),
          human: rawToDecimal(raw, activeDecimals),
        };
      } catch (e) {
        setError(e instanceof Error ? e.message : "Conversion failed.");
        return null;
      }
    }
  }, [humanValue, rawValue, activeDecimals, direction]);

  return (
    <div className="space-y-6">
      {/* Direction toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Direction:
        </span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setDirection("toRaw")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              direction === "toRaw"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Human &rarr; Raw
          </button>
          <button
            onClick={() => setDirection("toHuman")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              direction === "toHuman"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Raw &rarr; Human
          </button>
        </div>
      </div>

      {/* Preset buttons */}
      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Token Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.decimals}
              onClick={() => {
                setDecimals(p.decimals);
                setCustomDecimals("");
              }}
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                activeDecimals === p.decimals
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
              }`}
            >
              {p.label} ({p.decimals})
            </button>
          ))}
        </div>
      </div>

      {/* Custom decimals */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom Decimals
        </label>
        <input
          type="number"
          min="0"
          max="77"
          value={customDecimals}
          onChange={(e) => setCustomDecimals(e.target.value)}
          placeholder={`Currently: ${decimals}`}
          className="w-32 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Input */}
      {direction === "toRaw" ? (
        <InputField
          label={`Human-Readable Amount (${activeDecimals} decimals)`}
          value={humanValue}
          onChange={setHumanValue}
          placeholder="e.g. 1000.50"
        />
      ) : (
        <InputField
          label={`Raw Value (smallest unit, ${activeDecimals} decimals)`}
          value={rawValue}
          onChange={setRawValue}
          placeholder="e.g. 1000500000"
        />
      )}

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {results && (
        <div className="space-y-4">
          {direction === "toRaw" ? (
            <>
              <OutputField label="Raw Value (smallest unit)" value={results.raw} rows={2} />
              <OutputField label="Scientific Notation" value={results.scientific} rows={1} />
              <OutputField label="Hex Value" value={results.hex} rows={1} />
            </>
          ) : (
            <>
              <OutputField label="Human-Readable Amount" value={results.human} rows={2} />
              <OutputField label="Scientific Notation" value={results.scientific} rows={1} />
              <OutputField label="Hex Value" value={results.hex} rows={1} />
            </>
          )}
        </div>
      )}

      {/* Common tokens table */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Token Decimals
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="py-2 pr-4 text-left font-medium text-gray-700 dark:text-gray-300">
                  Token
                </th>
                <th className="py-2 pr-4 text-left font-medium text-gray-700 dark:text-gray-300">
                  Symbol
                </th>
                <th className="py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Decimals
                </th>
              </tr>
            </thead>
            <tbody>
              {COMMON_TOKENS.map((token) => (
                <tr
                  key={token.symbol}
                  className="border-b border-gray-100 dark:border-gray-800/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  onClick={() => {
                    setDecimals(token.decimals);
                    setCustomDecimals("");
                  }}
                >
                  <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                    {token.name}
                  </td>
                  <td className="py-2 pr-4 font-mono text-gray-700 dark:text-gray-300">
                    {token.symbol}
                  </td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    {token.decimals}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
