"use client";

import { useState, useCallback } from "react";

const UNITS = [
  { name: "Wei", decimals: 0 },
  { name: "Gwei", decimals: 9 },
  { name: "Finney", decimals: 15 },
  { name: "ETH", decimals: 18 },
] as const;

type UnitName = (typeof UNITS)[number]["name"];

export default function EthUnitConverterTool() {
  const [values, setValues] = useState<Record<UnitName, string>>({
    Wei: "",
    Gwei: "",
    Finney: "",
    ETH: "",
  });
  const [error, setError] = useState("");

  const convert = useCallback((value: string, fromUnit: UnitName) => {
    setError("");

    if (!value || value === "." || value === "0.") {
      const empty: Record<UnitName, string> = { Wei: "", Gwei: "", Finney: "", ETH: "" };
      empty[fromUnit] = value;
      setValues(empty);
      return;
    }

    try {
      const fromDecimals = UNITS.find((u) => u.name === fromUnit)!.decimals;
      const weiValue = decimalToWei(value, fromDecimals);

      const newValues: Record<string, string> = {};
      for (const unit of UNITS) {
        if (unit.name === fromUnit) {
          newValues[unit.name] = value;
        } else {
          newValues[unit.name] = weiToDecimal(weiValue, unit.decimals);
        }
      }
      setValues(newValues as Record<UnitName, string>);
    } catch {
      setError("Invalid number. Enter a valid positive number.");
      setValues((prev) => ({ ...prev, [fromUnit]: value }));
    }
  }, []);

  return (
    <div className="space-y-4">
      {UNITS.map((unit) => (
        <div key={unit.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {unit.name}
            {unit.decimals > 0 && (
              <span className="ml-2 text-xs text-gray-500">
                (10^{unit.decimals} Wei)
              </span>
            )}
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={values[unit.name]}
            onChange={(e) => convert(e.target.value, unit.name)}
            placeholder={`Enter value in ${unit.name}`}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ))}
      {error && (
        <p className="rounded-lg border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-300">
          Quick Reference
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>1 ETH = 1,000 Finney = 1,000,000,000 Gwei = 10^18 Wei</li>
          <li>1 Finney = 10^15 Wei (also called milliether)</li>
          <li>1 Gwei = 10^9 Wei</li>
          <li>Gas prices are typically expressed in Gwei</li>
        </ul>
      </div>
    </div>
  );
}

function decimalToWei(value: string, fromDecimals: number): bigint {
  const trimmed = value.trim();
  if (!/^\d*\.?\d*$/.test(trimmed) || trimmed === "" || trimmed === ".") {
    throw new Error("Invalid number");
  }

  const parts = trimmed.split(".");
  const whole = parts[0] || "0";
  const frac = (parts[1] || "").padEnd(fromDecimals, "0").slice(0, fromDecimals);

  if (parts[1] && parts[1].length > fromDecimals) {
    const extra = parts[1].slice(fromDecimals);
    if (extra.replace(/0/g, "") !== "") {
      throw new Error("Too many decimal places for this unit");
    }
  }

  return BigInt(whole) * BigInt(10) ** BigInt(fromDecimals) + BigInt(frac || "0");
}

function weiToDecimal(wei: bigint, toDecimals: number): string {
  if (toDecimals === 0) return wei.toString();

  const divisor = BigInt(10) ** BigInt(toDecimals);
  const whole = wei / divisor;
  const remainder = wei % divisor;

  if (remainder === BigInt(0)) return whole.toString();

  const fracStr = remainder.toString().padStart(toDecimals, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}`;
}
