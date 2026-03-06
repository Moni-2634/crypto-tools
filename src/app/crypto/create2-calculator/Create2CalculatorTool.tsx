"use client";

import { useState } from "react";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type InitCodeMode = "hash" | "raw";

const EXAMPLES = [
  {
    label: "Uniswap V2 Pair (example)",
    deployer: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    salt: "0x0000000000000000000000000000000000000000000000000000000000000001",
    initCodeHash:
      "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f",
    mode: "hash" as InitCodeMode,
  },
  {
    label: "Simple CREATE2 deployment",
    deployer: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
    initCodeHash:
      "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    mode: "hash" as InitCodeMode,
  },
];

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

function checksumAddress(addr: string): string {
  const lower = addr.toLowerCase().replace("0x", "");
  const hash = keccak256(lower);
  let checksummed = "0x";
  for (let i = 0; i < 40; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      checksummed += lower[i].toUpperCase();
    } else {
      checksummed += lower[i];
    }
  }
  return checksummed;
}

export default function Create2CalculatorTool() {
  const [deployer, setDeployer] = useState("");
  const [salt, setSalt] = useState("");
  const [initCodeInput, setInitCodeInput] = useState("");
  const [initCodeMode, setInitCodeMode] = useState<InitCodeMode>("hash");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult("");
    setSteps([]);

    try {
      // Validate deployer address
      const deployerClean = deployer.trim();
      if (!deployerClean) {
        setError("Please enter a deployer address.");
        return;
      }
      const deployerHex = deployerClean.startsWith("0x")
        ? deployerClean.slice(2)
        : deployerClean;
      if (!/^[0-9a-fA-F]{40}$/.test(deployerHex)) {
        setError("Deployer must be a valid 20-byte Ethereum address.");
        return;
      }

      // Validate salt
      const saltClean = salt.trim();
      if (!saltClean) {
        setError("Please enter a salt (bytes32).");
        return;
      }
      const saltHex = saltClean.startsWith("0x")
        ? saltClean.slice(2)
        : saltClean;
      if (!/^[0-9a-fA-F]{1,64}$/.test(saltHex)) {
        setError("Salt must be a valid hex value (up to 32 bytes).");
        return;
      }
      const saltPadded = saltHex.padStart(64, "0");

      // Compute or validate init code hash
      let initCodeHashHex: string;
      const initCodeClean = initCodeInput.trim();
      if (!initCodeClean) {
        setError("Please enter init code or init code hash.");
        return;
      }

      if (initCodeMode === "hash") {
        const hashInput = initCodeClean.startsWith("0x")
          ? initCodeClean.slice(2)
          : initCodeClean;
        if (!/^[0-9a-fA-F]{64}$/.test(hashInput)) {
          setError("Init code hash must be exactly 32 bytes (64 hex chars).");
          return;
        }
        initCodeHashHex = hashInput;
      } else {
        // Raw init code - hash it
        const rawHex = initCodeClean.startsWith("0x")
          ? initCodeClean.slice(2)
          : initCodeClean;
        if (!/^[0-9a-fA-F]*$/.test(rawHex) || rawHex.length % 2 !== 0) {
          setError(
            "Raw init code must be a valid hex string with even length."
          );
          return;
        }
        const rawBytes = hexToBytes(rawHex);
        initCodeHashHex = keccak256(rawBytes);
      }

      // CREATE2 formula: keccak256(0xff ++ deployer ++ salt ++ keccak256(initCode))
      const prefix = "ff";
      const combined =
        prefix + deployerHex.toLowerCase() + saltPadded + initCodeHashHex;
      const combinedBytes = hexToBytes(combined);
      const hash = keccak256(combinedBytes);

      // Take last 20 bytes (40 hex chars)
      const addressHex = hash.slice(24); // 64 - 40 = 24
      const address = checksumAddress("0x" + addressHex);

      setResult(address);
      setSteps([
        `1. Prefix: 0xff`,
        `2. Deployer: 0x${deployerHex.toLowerCase()}`,
        `3. Salt: 0x${saltPadded}`,
        `4. Init code hash: 0x${initCodeHashHex}`,
        `5. Concatenated: 0x${combined}`,
        `6. keccak256(concat): 0x${hash}`,
        `7. Last 20 bytes: ${address}`,
      ]);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Calculation failed. Check your inputs."
      );
    }
  };

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setDeployer(ex.deployer);
    setSalt(ex.salt);
    setInitCodeInput(ex.initCodeHash);
    setInitCodeMode(ex.mode);
    setResult("");
    setSteps([]);
    setError("");
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Deployer Address"
        value={deployer}
        onChange={setDeployer}
        placeholder="0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
      />

      <InputField
        label="Salt (bytes32)"
        value={salt}
        onChange={setSalt}
        placeholder="0x0000000000000000000000000000000000000000000000000000000000000001"
      />

      {/* Init code mode selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Init code input:
        </span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setInitCodeMode("hash")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              initCodeMode === "hash"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Init Code Hash
          </button>
          <button
            onClick={() => setInitCodeMode("raw")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              initCodeMode === "raw"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Raw Init Code
          </button>
        </div>
      </div>

      <InputField
        label={
          initCodeMode === "hash"
            ? "Init Code Hash (bytes32)"
            : "Raw Init Code (hex)"
        }
        value={initCodeInput}
        onChange={setInitCodeInput}
        placeholder={
          initCodeMode === "hash"
            ? "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f"
            : "0x6080604052..."
        }
        multiline
        rows={initCodeMode === "raw" ? 4 : 2}
      />

      <button
        onClick={calculate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Calculate Address
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <OutputField label="CREATE2 Address" value={result} rows={1} />
      )}

      {/* Step-by-step calculation */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Calculation Steps
          </label>
          <pre className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
            {steps.join("\n")}
          </pre>
        </div>
      )}

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

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About CREATE2
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            CREATE2 (EIP-1014) enables deterministic contract deployment to
            predictable addresses
          </li>
          <li>
            Formula: address = keccak256(0xff ++ deployer ++ salt ++
            keccak256(initCode))[12:]
          </li>
          <li>
            Use cases: counterfactual addresses, factory patterns (Uniswap),
            CREATE2-based wallets
          </li>
          <li>
            The address depends only on the deployer, salt, and init code -- not
            on nonce
          </li>
        </ul>
      </div>
    </div>
  );
}
