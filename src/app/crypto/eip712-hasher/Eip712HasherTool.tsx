"use client";

import { useState, useMemo } from "react";
import { keccak256 } from "js-sha3";
import { AbiCoder } from "ethers";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

const SAMPLE_DATA = {
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  },
  primaryType: "Permit",
  domain: {
    name: "USD Coin",
    version: "2",
    chainId: 1,
    verifyingContract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  message: {
    owner: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    spender: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    value: "1000000000",
    nonce: "0",
    deadline: "1716000000",
  },
};

const SOLIDITY_TYPES = [
  "address",
  "bool",
  "string",
  "bytes",
  "uint8",
  "uint16",
  "uint32",
  "uint64",
  "uint128",
  "uint256",
  "int8",
  "int16",
  "int32",
  "int64",
  "int128",
  "int256",
  "bytes1",
  "bytes2",
  "bytes4",
  "bytes8",
  "bytes16",
  "bytes32",
];

interface TypeField {
  name: string;
  type: string;
}

interface TypedData {
  types: Record<string, TypeField[]>;
  primaryType: string;
  domain: Record<string, unknown>;
  message: Record<string, unknown>;
}

function isAtomicType(type: string): boolean {
  return SOLIDITY_TYPES.includes(type);
}

function isDynamicType(type: string): boolean {
  return type === "string" || type === "bytes";
}

function encodeType(
  primaryType: string,
  types: Record<string, TypeField[]>
): string {
  // Find all referenced types (excluding EIP712Domain)
  const deps = new Set<string>();

  function findDeps(typeName: string) {
    const fields = types[typeName];
    if (!fields) return;
    for (const field of fields) {
      const baseType = field.type.replace("[]", "");
      if (types[baseType] && baseType !== primaryType && !deps.has(baseType)) {
        deps.add(baseType);
        findDeps(baseType);
      }
    }
  }

  findDeps(primaryType);

  // Sort referenced types alphabetically and prepend the primary type
  const sortedDeps = Array.from(deps).sort();
  const allTypes = [primaryType, ...sortedDeps];

  return allTypes
    .map((t) => {
      const fields = types[t];
      const fieldStr = fields.map((f) => `${f.type} ${f.name}`).join(",");
      return `${t}(${fieldStr})`;
    })
    .join("");
}

function typeHash(
  primaryType: string,
  types: Record<string, TypeField[]>
): string {
  const encoded = encodeType(primaryType, types);
  return "0x" + keccak256(encoded);
}

function encodeValue(
  type: string,
  value: unknown,
  types: Record<string, TypeField[]>
): { abiType: string; abiValue: unknown } {
  if (isDynamicType(type)) {
    if (type === "string") {
      return {
        abiType: "bytes32",
        abiValue: "0x" + keccak256(String(value)),
      };
    }
    // bytes
    const hex = String(value).startsWith("0x")
      ? String(value).slice(2)
      : String(value);
    const bytes = new Uint8Array(
      hex.match(/.{2}/g)!.map((b) => parseInt(b, 16))
    );
    return { abiType: "bytes32", abiValue: "0x" + keccak256(bytes) };
  }

  if (type.endsWith("[]")) {
    const baseType = type.slice(0, -2);
    const arr = value as unknown[];
    const encodedItems = arr.map((item) => {
      const encoded = encodeValue(baseType, item, types);
      const coder = AbiCoder.defaultAbiCoder();
      return coder.encode([encoded.abiType], [encoded.abiValue]);
    });
    const concatenated = encodedItems
      .map((e) => e.slice(2))
      .join("");
    return {
      abiType: "bytes32",
      abiValue:
        "0x" +
        keccak256(
          new Uint8Array(
            concatenated.match(/.{2}/g)!.map((b) => parseInt(b, 16))
          )
        ),
    };
  }

  if (types[type]) {
    // Struct type - recursively hash
    const hash = hashStruct(type, value as Record<string, unknown>, types);
    return { abiType: "bytes32", abiValue: hash };
  }

  if (isAtomicType(type)) {
    return { abiType: type, abiValue: value };
  }

  // Fallback for fixed-size bytes
  if (type.startsWith("bytes")) {
    return { abiType: type, abiValue: value };
  }

  return { abiType: type, abiValue: value };
}

function hashStruct(
  typeName: string,
  data: Record<string, unknown>,
  types: Record<string, TypeField[]>
): string {
  const fields = types[typeName];
  if (!fields) throw new Error(`Unknown type: ${typeName}`);

  const tHash = typeHash(typeName, types);

  const abiTypes: string[] = ["bytes32"];
  const abiValues: unknown[] = [tHash];

  for (const field of fields) {
    const val = data[field.name];
    const encoded = encodeValue(field.type, val, types);
    abiTypes.push(encoded.abiType);
    abiValues.push(encoded.abiValue);
  }

  const coder = AbiCoder.defaultAbiCoder();
  const encodedData = coder.encode(abiTypes, abiValues);
  const encodedHex = encodedData.startsWith("0x")
    ? encodedData.slice(2)
    : encodedData;
  const bytes = new Uint8Array(
    encodedHex.match(/.{2}/g)!.map((b) => parseInt(b, 16))
  );

  return "0x" + keccak256(bytes);
}

export default function Eip712HasherTool() {
  const [input, setInput] = useState(JSON.stringify(SAMPLE_DATA, null, 2));
  const [error, setError] = useState("");

  const results = useMemo(() => {
    setError("");
    if (!input.trim()) return null;

    try {
      const data: TypedData = JSON.parse(input);

      if (!data.types || !data.primaryType || !data.domain || !data.message) {
        throw new Error(
          "JSON must have: types, primaryType, domain, message"
        );
      }

      if (!data.types.EIP712Domain) {
        throw new Error("types must include EIP712Domain");
      }

      if (!data.types[data.primaryType]) {
        throw new Error(`types must include ${data.primaryType}`);
      }

      // Compute domain separator
      const domainSeparator = hashStruct(
        "EIP712Domain",
        data.domain as Record<string, unknown>,
        data.types
      );

      // Compute struct hash of message
      const structHash = hashStruct(
        data.primaryType,
        data.message as Record<string, unknown>,
        data.types
      );

      // Compute encodeType strings
      const domainEncodeType = encodeType("EIP712Domain", data.types);
      const messageEncodeType = encodeType(data.primaryType, data.types);

      // Compute type hashes
      const domainTypeHash = typeHash("EIP712Domain", data.types);
      const messageTypeHash = typeHash(data.primaryType, data.types);

      // Final signing hash: keccak256("\x19\x01" + domainSeparator + structHash)
      const prefix = new Uint8Array([0x19, 0x01]);
      const domainBytes = new Uint8Array(
        domainSeparator
          .slice(2)
          .match(/.{2}/g)!
          .map((b) => parseInt(b, 16))
      );
      const structBytes = new Uint8Array(
        structHash
          .slice(2)
          .match(/.{2}/g)!
          .map((b) => parseInt(b, 16))
      );
      const combined = new Uint8Array(
        prefix.length + domainBytes.length + structBytes.length
      );
      combined.set(prefix, 0);
      combined.set(domainBytes, prefix.length);
      combined.set(structBytes, prefix.length + domainBytes.length);
      const signingHash = "0x" + keccak256(combined);

      return {
        domainEncodeType,
        messageEncodeType,
        domainTypeHash,
        messageTypeHash,
        domainSeparator,
        structHash,
        signingHash,
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to process typed data.");
      return null;
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <InputField
        label="EIP-712 Typed Data (JSON)"
        value={input}
        onChange={setInput}
        placeholder='{"types": {...}, "primaryType": "...", "domain": {...}, "message": {...}}'
        multiline
        rows={14}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setInput(JSON.stringify(SAMPLE_DATA, null, 2))}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Load Permit Example
        </button>
        <button
          onClick={() => setInput("")}
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

      {results && (
        <div className="space-y-4">
          <OutputField
            label="Domain Separator (hashStruct of EIP712Domain)"
            value={results.domainSeparator}
            rows={2}
          />
          <OutputField
            label={`Struct Hash (hashStruct of message)`}
            value={results.structHash}
            rows={2}
          />
          <OutputField
            label="Final Signing Hash (keccak256(0x1901 + domainSep + structHash))"
            value={results.signingHash}
            rows={2}
          />

          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Intermediate Values
            </h3>
            <OutputField
              label="Domain encodeType"
              value={results.domainEncodeType}
              rows={2}
            />
            <OutputField
              label="Domain typeHash"
              value={results.domainTypeHash}
              rows={2}
            />
            <OutputField
              label="Message encodeType"
              value={results.messageEncodeType}
              rows={2}
            />
            <OutputField
              label="Message typeHash"
              value={results.messageTypeHash}
              rows={2}
            />
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          What is EIP-712?
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            EIP-712 defines a standard for signing typed structured data in
            Ethereum, making signatures human-readable in wallets.
          </li>
          <li>
            <strong>Permit (ERC-2612):</strong> Approve token spending via
            signatures instead of on-chain transactions, saving gas.
          </li>
          <li>
            <strong>Gasless transactions:</strong> Users sign typed data
            off-chain; relayers submit transactions and pay gas.
          </li>
          <li>
            <strong>Governance:</strong> Protocols like Compound use EIP-712
            for off-chain vote signing.
          </li>
          <li>
            <strong>Hash formula:</strong>{" "}
            <code className="text-xs">
              keccak256(&quot;\x19\x01&quot; || domainSeparator || hashStruct(message))
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
