"use client";

import { useState } from "react";
import { AbiCoder } from "ethers";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "simple" | "mapping" | "nested";
type KeyType = "address" | "uint256" | "bytes32";

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return bytes;
}

function computeKeccak256(hexData: string): string {
  const bytes = hexToBytes(hexData);
  return "0x" + keccak256(bytes);
}

export default function StorageSlotCalculatorTool() {
  const [tab, setTab] = useState<Tab>("simple");

  const tabs: { key: Tab; label: string }[] = [
    { key: "simple", label: "Simple Slot" },
    { key: "mapping", label: "Mapping" },
    { key: "nested", label: "Nested Mapping" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "simple" && <SimpleSlotPanel />}
      {tab === "mapping" && <MappingPanel />}
      {tab === "nested" && <NestedMappingPanel />}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Solidity Storage Layout Reference
        </h3>
        <div className="space-y-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Simple Variables
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stored sequentially starting at slot 0. Each slot is 32 bytes.
              Multiple small variables can be packed into one slot.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Mappings
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The value for <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">mapping(keyType =&gt; valueType)</code> at
              slot <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">p</code> with
              key <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">k</code> is
              at: <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">keccak256(abi.encode(k, p))</code>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Nested Mappings
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">mapping(k1Type =&gt; mapping(k2Type =&gt; valueType))</code> at
              slot <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">p</code>:
              compute <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">keccak256(abi.encode(k2, keccak256(abi.encode(k1, p))))</code>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Dynamic Arrays
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Length is stored at slot <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">p</code>.
              Element <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">i</code> is
              at <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">keccak256(p) + i</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyTypeSelector({
  value,
  onChange,
  label,
}: {
  value: KeyType;
  onChange: (v: KeyType) => void;
  label: string;
}) {
  const types: KeyType[] = ["address", "uint256", "bytes32"];
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              value === t
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function encodeKey(key: string, keyType: KeyType): string {
  const coder = AbiCoder.defaultAbiCoder();
  if (keyType === "address") {
    return coder.encode(["address"], [key]);
  } else if (keyType === "uint256") {
    return coder.encode(["uint256"], [BigInt(key)]);
  } else {
    // bytes32
    const padded = key.startsWith("0x") ? key : `0x${key}`;
    return coder.encode(["bytes32"], [padded]);
  }
}

function encodeSlot(slot: string): string {
  const coder = AbiCoder.defaultAbiCoder();
  return coder.encode(["uint256"], [BigInt(slot)]);
}

function SimpleSlotPanel() {
  const [slot, setSlot] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setOutput("");

    try {
      const s = slot.trim();
      if (!s) {
        setError("Please enter a slot number.");
        return;
      }

      const slotNum = BigInt(s);
      const hex = "0x" + slotNum.toString(16).padStart(64, "0");
      setOutput(hex);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid slot number.");
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Slot Number"
        value={slot}
        onChange={setSlot}
        placeholder="e.g. 0, 1, 2"
      />

      <button
        onClick={handleCalculate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Calculate
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Storage Slot (hex, 32 bytes)" value={output} rows={2} />

      {output && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">Formula: </span>
            pad32(slot) = pad32({slot.trim()})
          </p>
        </div>
      )}
    </div>
  );
}

function MappingPanel() {
  const [slot, setSlot] = useState("");
  const [key, setKey] = useState("");
  const [keyType, setKeyType] = useState<KeyType>("address");
  const [output, setOutput] = useState("");
  const [formula, setFormula] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setOutput("");
    setFormula("");

    try {
      const s = slot.trim();
      const k = key.trim();

      if (!s) {
        setError("Please enter a slot number.");
        return;
      }
      if (!k) {
        setError("Please enter a mapping key.");
        return;
      }

      const encodedKey = encodeKey(k, keyType);
      const encodedSlot = encodeSlot(s);

      // keccak256(abi.encode(key, slot))
      // Concatenate encoded key + encoded slot (strip 0x prefixes for concat)
      const concat =
        encodedKey.slice(2) + encodedSlot.slice(2);

      const result = computeKeccak256(concat);
      setOutput(result);
      setFormula(`keccak256(abi.encode(${k}, ${s}))`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation failed.");
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Mapping Slot Number"
        value={slot}
        onChange={setSlot}
        placeholder="e.g. 0"
      />

      <KeyTypeSelector label="Key Type" value={keyType} onChange={setKeyType} />

      <InputField
        label="Mapping Key"
        value={key}
        onChange={setKey}
        placeholder={
          keyType === "address"
            ? "e.g. 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
            : keyType === "uint256"
            ? "e.g. 1"
            : "e.g. 0x00...01"
        }
      />

      <button
        onClick={handleCalculate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Calculate
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Computed Storage Slot" value={output} rows={2} />

      {formula && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">Formula: </span>
            {formula}
          </p>
        </div>
      )}
    </div>
  );
}

function NestedMappingPanel() {
  const [slot, setSlot] = useState("");
  const [key1, setKey1] = useState("");
  const [key1Type, setKey1Type] = useState<KeyType>("address");
  const [key2, setKey2] = useState("");
  const [key2Type, setKey2Type] = useState<KeyType>("address");
  const [output, setOutput] = useState("");
  const [formula, setFormula] = useState("");
  const [intermediateSlot, setIntermediateSlot] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setOutput("");
    setFormula("");
    setIntermediateSlot("");

    try {
      const s = slot.trim();
      const k1 = key1.trim();
      const k2 = key2.trim();

      if (!s) {
        setError("Please enter a slot number.");
        return;
      }
      if (!k1) {
        setError("Please enter the first mapping key.");
        return;
      }
      if (!k2) {
        setError("Please enter the second mapping key.");
        return;
      }

      // Step 1: keccak256(abi.encode(key1, slot))
      const encodedKey1 = encodeKey(k1, key1Type);
      const encodedSlot = encodeSlot(s);
      const concat1 = encodedKey1.slice(2) + encodedSlot.slice(2);
      const intermediate = computeKeccak256(concat1);
      setIntermediateSlot(intermediate);

      // Step 2: keccak256(abi.encode(key2, intermediate))
      const encodedKey2 = encodeKey(k2, key2Type);
      // Intermediate is already 32 bytes hash, use it as a uint256 slot
      const encodedIntermediate = AbiCoder.defaultAbiCoder().encode(
        ["uint256"],
        [BigInt(intermediate)]
      );
      const concat2 =
        encodedKey2.slice(2) + encodedIntermediate.slice(2);
      const result = computeKeccak256(concat2);

      setOutput(result);
      setFormula(
        `keccak256(abi.encode(${k2}, keccak256(abi.encode(${k1}, ${s}))))`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation failed.");
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Mapping Slot Number"
        value={slot}
        onChange={setSlot}
        placeholder="e.g. 0"
      />

      <KeyTypeSelector
        label="Key 1 Type (outer mapping)"
        value={key1Type}
        onChange={setKey1Type}
      />

      <InputField
        label="Key 1 (outer mapping)"
        value={key1}
        onChange={setKey1}
        placeholder={
          key1Type === "address"
            ? "e.g. 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
            : key1Type === "uint256"
            ? "e.g. 1"
            : "e.g. 0x00...01"
        }
      />

      <KeyTypeSelector
        label="Key 2 Type (inner mapping)"
        value={key2Type}
        onChange={setKey2Type}
      />

      <InputField
        label="Key 2 (inner mapping)"
        value={key2}
        onChange={setKey2}
        placeholder={
          key2Type === "address"
            ? "e.g. 0x1234567890abcdef1234567890abcdef12345678"
            : key2Type === "uint256"
            ? "e.g. 42"
            : "e.g. 0x00...02"
        }
      />

      <button
        onClick={handleCalculate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Calculate
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Computed Storage Slot" value={output} rows={2} />

      {intermediateSlot && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Intermediate slot:{" "}
            </span>
            <code className="text-xs break-all">{intermediateSlot}</code>
          </p>
          {formula && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">Formula: </span>
              {formula}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
