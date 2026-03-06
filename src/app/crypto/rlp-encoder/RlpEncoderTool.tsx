"use client";

import { useState, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "encode" | "decode";

// --- RLP Encoding (from scratch) ---

type RlpInput = string | RlpInput[];

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (clean.length === 0) return new Uint8Array(0);
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function encodeLength(len: number, offset: number): Uint8Array {
  if (len < 56) {
    return new Uint8Array([offset + len]);
  }
  // Encode the length as a big-endian byte array
  const hexLen = len.toString(16);
  const paddedHexLen = hexLen.length % 2 === 0 ? hexLen : "0" + hexLen;
  const lenBytes = hexToBytes(paddedHexLen);
  const prefix = new Uint8Array(1 + lenBytes.length);
  prefix[0] = offset + 55 + lenBytes.length;
  prefix.set(lenBytes, 1);
  return prefix;
}

function stringToBytes(str: string): Uint8Array {
  // If input looks like hex (0x-prefixed), treat as raw bytes
  if (/^0x[0-9a-fA-F]*$/i.test(str)) {
    return hexToBytes(str);
  }
  // Otherwise encode as UTF-8
  return new TextEncoder().encode(str);
}

function rlpEncodeItem(input: RlpInput): Uint8Array {
  if (typeof input === "string") {
    const bytes = stringToBytes(input);

    // Single byte in [0x00, 0x7f] range
    if (bytes.length === 1 && bytes[0] < 0x80) {
      return bytes;
    }

    // String 0-55 bytes: 0x80 + length prefix
    // String >55 bytes: 0xb7 + length of length prefix
    const prefix = encodeLength(bytes.length, 0x80);
    const result = new Uint8Array(prefix.length + bytes.length);
    result.set(prefix, 0);
    result.set(bytes, prefix.length);
    return result;
  }

  // It's a list - encode each item, then wrap with list prefix
  const encodedItems = input.map(rlpEncodeItem);
  const totalLength = encodedItems.reduce((sum, item) => sum + item.length, 0);

  const prefix = encodeLength(totalLength, 0xc0);
  const result = new Uint8Array(prefix.length + totalLength);
  result.set(prefix, 0);
  let offset = prefix.length;
  for (const item of encodedItems) {
    result.set(item, offset);
    offset += item.length;
  }
  return result;
}

function rlpEncode(input: RlpInput): string {
  const encoded = rlpEncodeItem(input);
  return "0x" + bytesToHex(encoded);
}

// --- RLP Decoding (from scratch) ---

interface DecodeResult {
  data: RlpInput;
  remainder: Uint8Array;
}

function rlpDecodeBytes(input: Uint8Array): DecodeResult {
  if (input.length === 0) {
    throw new Error("Empty RLP input");
  }

  const prefix = input[0];

  if (prefix < 0x80) {
    // Single byte
    return {
      data: "0x" + prefix.toString(16).padStart(2, "0"),
      remainder: input.slice(1),
    };
  }

  if (prefix <= 0xb7) {
    // Short string (0-55 bytes)
    const strLen = prefix - 0x80;
    if (input.length < 1 + strLen) {
      throw new Error("Invalid RLP: insufficient data for short string");
    }
    const data = input.slice(1, 1 + strLen);
    return {
      data: strLen === 0 ? "0x" : "0x" + bytesToHex(data),
      remainder: input.slice(1 + strLen),
    };
  }

  if (prefix <= 0xbf) {
    // Long string (>55 bytes)
    const lenOfLen = prefix - 0xb7;
    if (input.length < 1 + lenOfLen) {
      throw new Error("Invalid RLP: insufficient data for length of string");
    }
    let strLen = 0;
    for (let i = 0; i < lenOfLen; i++) {
      strLen = strLen * 256 + input[1 + i];
    }
    if (input.length < 1 + lenOfLen + strLen) {
      throw new Error("Invalid RLP: insufficient data for long string");
    }
    const data = input.slice(1 + lenOfLen, 1 + lenOfLen + strLen);
    return {
      data: "0x" + bytesToHex(data),
      remainder: input.slice(1 + lenOfLen + strLen),
    };
  }

  if (prefix <= 0xf7) {
    // Short list (0-55 bytes total payload)
    const listLen = prefix - 0xc0;
    if (input.length < 1 + listLen) {
      throw new Error("Invalid RLP: insufficient data for short list");
    }
    const listData = input.slice(1, 1 + listLen);
    const items = decodeList(listData);
    return {
      data: items,
      remainder: input.slice(1 + listLen),
    };
  }

  // Long list (>55 bytes total payload)
  const lenOfLen = prefix - 0xf7;
  if (input.length < 1 + lenOfLen) {
    throw new Error("Invalid RLP: insufficient data for length of list");
  }
  let listLen = 0;
  for (let i = 0; i < lenOfLen; i++) {
    listLen = listLen * 256 + input[1 + i];
  }
  if (input.length < 1 + lenOfLen + listLen) {
    throw new Error("Invalid RLP: insufficient data for long list");
  }
  const listData = input.slice(1 + lenOfLen, 1 + lenOfLen + listLen);
  const items = decodeList(listData);
  return {
    data: items,
    remainder: input.slice(1 + lenOfLen + listLen),
  };
}

function decodeList(data: Uint8Array): RlpInput[] {
  const items: RlpInput[] = [];
  let remaining = data;
  while (remaining.length > 0) {
    const result = rlpDecodeBytes(remaining);
    items.push(result.data);
    remaining = result.remainder;
  }
  return items;
}

function rlpDecode(hex: string): RlpInput {
  const clean = hex.trim();
  if (!/^0x[0-9a-fA-F]*$/i.test(clean)) {
    throw new Error("Input must be a valid hex string starting with 0x");
  }
  if (clean.length % 2 !== 0) {
    throw new Error("Hex string must have an even number of characters");
  }
  const bytes = hexToBytes(clean);
  const result = rlpDecodeBytes(bytes);
  if (result.remainder.length > 0) {
    throw new Error(
      `Extra ${result.remainder.length} byte(s) after decoded data`
    );
  }
  return result.data;
}

// --- Parse JSON-like input for encoding ---

function parseInput(text: string): RlpInput {
  const trimmed = text.trim();

  // Try JSON parse first (for arrays and strings)
  try {
    const parsed = JSON.parse(trimmed);
    return convertParsed(parsed);
  } catch {
    // Not valid JSON - treat as a plain string
    return trimmed;
  }
}

function convertParsed(value: unknown): RlpInput {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    if (value === 0) return "0x";
    return "0x" + value.toString(16);
  }
  if (Array.isArray(value)) {
    return value.map(convertParsed);
  }
  throw new Error(`Unsupported type: ${typeof value}. Use strings or arrays.`);
}

// --- Example data ---

const ENCODE_EXAMPLES = [
  {
    label: "Simple string",
    input: '"hello"',
  },
  {
    label: "Empty string",
    input: '""',
  },
  {
    label: "Simple list",
    input: '["cat", "dog"]',
  },
  {
    label: "Nested list",
    input: '[["cat", "dog"], "fish"]',
  },
  {
    label: "Transaction-like",
    input: '["0x09", "0x04a817c800", "0x5208", "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "0x0de0b6b3a7640000", "0x"]',
  },
];

// --- Component ---

export default function RlpEncoderTool() {
  const [tab, setTab] = useState<Tab>("encode");

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setTab("encode")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "encode"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setTab("decode")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "decode"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Decode
        </button>
      </div>

      {tab === "encode" ? <EncodePanel /> : <DecodePanel />}

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          RLP Encoding Rules
        </h3>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <code className="text-xs">0x00-0x7f</code> - Single byte: encoded
            as itself
          </li>
          <li>
            <code className="text-xs">0x80-0xb7</code> - String 0-55 bytes:
            0x80 + length, then data
          </li>
          <li>
            <code className="text-xs">0xb8-0xbf</code> - String &gt;55 bytes:
            0xb7 + length-of-length, length, then data
          </li>
          <li>
            <code className="text-xs">0xc0-0xf7</code> - List 0-55 bytes
            payload: 0xc0 + length, then items
          </li>
          <li>
            <code className="text-xs">0xf8-0xff</code> - List &gt;55 bytes
            payload: 0xf7 + length-of-length, length, then items
          </li>
        </ul>
      </div>
    </div>
  );
}

function EncodePanel() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = useCallback(() => {
    setError("");
    setOutput("");

    try {
      const trimmed = input.trim();
      if (!trimmed) {
        setError("Please enter a value to encode.");
        return;
      }

      const parsed = parseInput(trimmed);
      const encoded = rlpEncode(parsed);
      setOutput(encoded);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encoding failed.");
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <InputField
        label="Input (JSON string, array, or plain text)"
        value={input}
        onChange={setInput}
        placeholder='e.g. ["hello", "world"] or "hello"'
        multiline
        rows={4}
      />

      <button
        onClick={handleEncode}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Encode
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="RLP Encoded (hex)" value={output} rows={3} />

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
        </h3>
        <div className="space-y-2">
          {ENCODE_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.input)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </span>
              <code className="text-xs text-gray-500 truncate ml-4 max-w-[60%]">
                {ex.input}
              </code>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecodePanel() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleDecode = useCallback(() => {
    setError("");
    setOutput("");

    try {
      const trimmed = input.trim();
      if (!trimmed) {
        setError("Please enter RLP hex data to decode.");
        return;
      }

      const decoded = rlpDecode(trimmed);
      setOutput(JSON.stringify(decoded, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed.");
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <InputField
        label="RLP Hex Data"
        value={input}
        onChange={setInput}
        placeholder="0xc88363617483646f67"
        multiline
        rows={4}
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

      <OutputField label="Decoded Result (JSON)" value={output} rows={8} />
    </div>
  );
}
