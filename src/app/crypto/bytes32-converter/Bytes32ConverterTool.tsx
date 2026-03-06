"use client";

import { useState, useCallback } from "react";

type FieldName = "bytes32" | "string" | "number" | "address";

interface FieldState {
  bytes32: string;
  string: string;
  number: string;
  address: string;
}

function hexToUtf8(hex: string): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  // Strip trailing zeros for string conversion
  let stripped = clean.replace(/0+$/, "");
  if (stripped.length % 2 !== 0) stripped += "0";
  if (!stripped) return "";

  const bytes = new Uint8Array(stripped.length / 2);
  for (let i = 0; i < stripped.length; i += 2) {
    bytes[i / 2] = parseInt(stripped.substring(i, i + 2), 16);
  }
  const decoder = new TextDecoder("utf-8", { fatal: false });
  return decoder.decode(bytes);
}

function utf8ToHex(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  if (bytes.length > 32) {
    throw new Error("String too long. Maximum 32 bytes for bytes32.");
  }
  let hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // Right-pad with zeros to 64 chars (32 bytes)
  hex = hex.padEnd(64, "0");
  return "0x" + hex;
}

function hexToNumber(hex: string): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (!clean || /^0+$/.test(clean)) return "0";
  const num = BigInt("0x" + clean);
  return num.toString();
}

function numberToHex(num: string): string {
  const trimmed = num.trim();
  if (!trimmed || trimmed === "0") {
    return "0x" + "0".repeat(64);
  }
  const big = BigInt(trimmed);
  if (big < BigInt(0)) {
    throw new Error("Negative numbers are not supported for bytes32.");
  }
  const hex = big.toString(16);
  if (hex.length > 64) {
    throw new Error("Number too large for bytes32 (max 2^256 - 1).");
  }
  // Left-pad with zeros to 64 chars
  return "0x" + hex.padStart(64, "0");
}

function hexToAddress(hex: string): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  // Check if first 24 chars (12 bytes) are zeros - then it's a padded address
  if (clean.length === 64 && clean.slice(0, 24) === "0".repeat(24)) {
    return "0x" + clean.slice(24);
  }
  return "";
}

function addressToHex(addr: string): string {
  const clean = addr.startsWith("0x") ? addr.slice(2) : addr;
  if (!/^[0-9a-fA-F]{40}$/.test(clean)) {
    throw new Error("Invalid Ethereum address. Must be 20 bytes (40 hex chars).");
  }
  // Left-pad with zeros to 64 chars (32 bytes)
  return "0x" + clean.toLowerCase().padStart(64, "0");
}

function getDataBytes(hex: string): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  return clean;
}

export default function Bytes32ConverterTool() {
  const [values, setValues] = useState<FieldState>({
    bytes32: "",
    string: "",
    number: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [padding, setPadding] = useState<{ data: string; type: string } | null>(
    null
  );

  const convert = useCallback((value: string, fromField: FieldName) => {
    setError("");
    setPadding(null);

    if (!value.trim()) {
      setValues({ bytes32: "", string: "", number: "", address: "" });
      return;
    }

    try {
      let bytes32Hex: string;

      switch (fromField) {
        case "bytes32": {
          const clean = value.trim();
          const hex = clean.startsWith("0x") ? clean.slice(2) : clean;
          if (!/^[0-9a-fA-F]*$/.test(hex)) {
            setError("Invalid hex characters. Use 0-9, a-f only.");
            setValues((prev) => ({ ...prev, bytes32: value }));
            return;
          }
          if (hex.length > 64) {
            setError("bytes32 cannot exceed 32 bytes (64 hex characters).");
            setValues((prev) => ({ ...prev, bytes32: value }));
            return;
          }
          bytes32Hex = "0x" + hex.padStart(64, "0");

          const strVal = hexToUtf8(hex.padEnd(64, "0"));
          const numVal = hexToNumber(hex);
          const addrVal = hexToAddress(bytes32Hex);

          setValues({
            bytes32: value,
            string: strVal,
            number: numVal,
            address: addrVal,
          });
          setPadding({
            data: getDataBytes(bytes32Hex),
            type: "raw",
          });
          return;
        }
        case "string": {
          bytes32Hex = utf8ToHex(value);
          const encoder = new TextEncoder();
          const byteLen = encoder.encode(value).length;

          setValues({
            bytes32: bytes32Hex,
            string: value,
            number: hexToNumber(bytes32Hex),
            address: hexToAddress(bytes32Hex),
          });
          setPadding({
            data: getDataBytes(bytes32Hex),
            type: `string (${byteLen} byte${byteLen !== 1 ? "s" : ""}, right-padded)`,
          });
          return;
        }
        case "number": {
          const trimmed = value.trim();
          if (!/^\d+$/.test(trimmed)) {
            setError("Enter a valid non-negative integer.");
            setValues((prev) => ({ ...prev, number: value }));
            return;
          }
          bytes32Hex = numberToHex(trimmed);

          setValues({
            bytes32: bytes32Hex,
            string: hexToUtf8(bytes32Hex),
            number: value,
            address: hexToAddress(bytes32Hex),
          });
          setPadding({
            data: getDataBytes(bytes32Hex),
            type: "number (left-padded)",
          });
          return;
        }
        case "address": {
          const trimmed = value.trim();
          if (!trimmed) {
            setValues({ bytes32: "", string: "", number: "", address: "" });
            return;
          }
          bytes32Hex = addressToHex(trimmed);

          setValues({
            bytes32: bytes32Hex,
            string: hexToUtf8(bytes32Hex),
            number: hexToNumber(bytes32Hex),
            address: value,
          });
          setPadding({
            data: getDataBytes(bytes32Hex),
            type: "address (left-padded, 12 zero bytes + 20 address bytes)",
          });
          return;
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
      setValues((prev) => ({ ...prev, [fromField]: value }));
    }
  }, []);

  const fields: { name: FieldName; label: string; placeholder: string }[] = [
    {
      name: "bytes32",
      label: "Bytes32 (hex)",
      placeholder: "0x48656c6c6f000000000000000000000000000000000000000000000000000000",
    },
    {
      name: "string",
      label: "UTF-8 String",
      placeholder: "Hello",
    },
    {
      name: "number",
      label: "Number (uint256)",
      placeholder: "12345",
    },
    {
      name: "address",
      label: "Address (20 bytes)",
      placeholder: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    },
  ];

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          <input
            type="text"
            value={values[field.name]}
            onChange={(e) => convert(e.target.value, field.name)}
            placeholder={field.placeholder}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-mono text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ))}

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Padding visualization */}
      {padding && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Padding Visualization ({padding.type})
          </label>
          <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 overflow-x-auto">
            <div className="font-mono text-xs leading-relaxed">
              {/* Byte position header */}
              <div className="text-gray-400 mb-1 flex">
                {Array.from({ length: 32 }, (_, i) => (
                  <span
                    key={i}
                    className="inline-block w-[1.6em] text-center"
                  >
                    {i.toString().padStart(2, "0")}
                  </span>
                ))}
              </div>
              {/* Byte values */}
              <div className="flex">
                {Array.from({ length: 32 }, (_, i) => {
                  const byteHex = padding.data.substring(i * 2, i * 2 + 2);
                  const isZero = byteHex === "00";
                  return (
                    <span
                      key={i}
                      className={`inline-block w-[1.6em] text-center ${
                        isZero
                          ? "text-gray-400 dark:text-gray-600"
                          : "text-blue-600 dark:text-blue-400 font-semibold"
                      }`}
                    >
                      {byteHex}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Bytes32 Encoding
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            Strings are right-padded with zeros (UTF-8 bytes followed by 0x00)
          </li>
          <li>
            Numbers are left-padded with zeros (big-endian representation)
          </li>
          <li>
            Addresses are left-padded with 12 zero bytes (20 bytes to 32 bytes)
          </li>
          <li>
            Solidity uses bytes32 for storage slots, mapping keys, and fixed-size
            data
          </li>
          <li>
            Strings longer than 32 bytes cannot be stored in a single bytes32
            slot
          </li>
        </ul>
      </div>
    </div>
  );
}
