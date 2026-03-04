"use client";

import { useState } from "react";
import { getAddress } from "ethers";
import InputField from "@/components/tools/InputField";

type Chain = "eth" | "btc" | "sol";

interface ValidationResult {
  valid: boolean;
  chain: Chain;
  message: string;
  details?: string;
}

export default function AddressValidatorTool() {
  const [input, setInput] = useState("");
  const [chain, setChain] = useState<Chain>("eth");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = () => {
    const addr = input.trim();
    if (!addr) {
      setResult(null);
      return;
    }

    switch (chain) {
      case "eth":
        setResult(validateEth(addr));
        break;
      case "btc":
        setResult(validateBtc(addr));
        break;
      case "sol":
        setResult(validateSol(addr));
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Chain:</span>
        <div className="flex gap-1 rounded-lg bg-gray-800 p-1">
          {(
            [
              { key: "eth", label: "Ethereum" },
              { key: "btc", label: "Bitcoin" },
              { key: "sol", label: "Solana" },
            ] as const
          ).map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setChain(c.key);
                setResult(null);
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                chain === c.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <InputField
        label="Wallet Address"
        value={input}
        onChange={(v) => {
          setInput(v);
          setResult(null);
        }}
        placeholder={
          chain === "eth"
            ? "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38"
            : chain === "btc"
              ? "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4"
              : "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
        }
      />

      <button
        onClick={handleValidate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Validate
      </button>

      {result && (
        <div
          className={`rounded-lg border px-4 py-3 ${
            result.valid
              ? "border-green-800 bg-green-900/30"
              : "border-red-800 bg-red-900/30"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              result.valid ? "text-green-400" : "text-red-400"
            }`}
          >
            {result.message}
          </p>
          {result.details && (
            <p
              className={`mt-1 text-sm ${
                result.valid ? "text-green-500/70" : "text-red-500/70"
              }`}
            >
              {result.details}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function validateEth(addr: string): ValidationResult {
  // Basic format check
  if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
    return {
      valid: false,
      chain: "eth",
      message: "Invalid Ethereum address",
      details:
        "Must be 42 characters long, starting with 0x, followed by 40 hex characters.",
    };
  }

  // Check EIP-55 checksum if mixed case
  const hasUpper = /[A-F]/.test(addr.slice(2));
  const hasLower = /[a-f]/.test(addr.slice(2));

  if (hasUpper && hasLower) {
    try {
      const checksummed = getAddress(addr);
      if (checksummed !== addr) {
        return {
          valid: false,
          chain: "eth",
          message: "Invalid checksum",
          details: `The address has mixed case but doesn't match EIP-55 checksum. Expected: ${checksummed}`,
        };
      }
      return {
        valid: true,
        chain: "eth",
        message: "Valid Ethereum address",
        details: "EIP-55 checksum verified.",
      };
    } catch {
      return {
        valid: false,
        chain: "eth",
        message: "Invalid checksum",
        details: "The mixed-case address does not match EIP-55 checksum.",
      };
    }
  }

  return {
    valid: true,
    chain: "eth",
    message: "Valid Ethereum address",
    details: hasUpper
      ? "All uppercase hex — format is valid but no checksum verification."
      : "All lowercase hex — format is valid but no checksum verification.",
  };
}

function validateBtc(addr: string): ValidationResult {
  // P2PKH: starts with 1, 25-34 chars, base58
  if (/^1[13-9A-HJ-NP-Za-km-z]{24,33}$/.test(addr)) {
    return {
      valid: true,
      chain: "btc",
      message: "Valid Bitcoin address (P2PKH)",
      details: "Legacy address starting with 1.",
    };
  }

  // P2SH: starts with 3, 25-34 chars, base58
  if (/^3[13-9A-HJ-NP-Za-km-z]{24,33}$/.test(addr)) {
    return {
      valid: true,
      chain: "btc",
      message: "Valid Bitcoin address (P2SH)",
      details: "Script hash address starting with 3.",
    };
  }

  // Bech32 (SegWit): starts with bc1, lowercase
  if (/^bc1[a-z0-9]{8,87}$/.test(addr.toLowerCase())) {
    // Basic bech32 format validation
    if (addr !== addr.toLowerCase() && addr !== addr.toUpperCase()) {
      return {
        valid: false,
        chain: "btc",
        message: "Invalid Bitcoin address",
        details: "Bech32 addresses must not mix uppercase and lowercase.",
      };
    }
    return {
      valid: true,
      chain: "btc",
      message: "Valid Bitcoin address (Bech32/SegWit)",
      details: addr.toLowerCase().startsWith("bc1p")
        ? "Taproot (P2TR) address."
        : "Native SegWit address.",
    };
  }

  return {
    valid: false,
    chain: "btc",
    message: "Invalid Bitcoin address",
    details:
      "Expected P2PKH (starts with 1), P2SH (starts with 3), or Bech32 (starts with bc1).",
  };
}

function validateSol(addr: string): ValidationResult {
  // Solana addresses are base58, 32-44 characters
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr)) {
    return {
      valid: false,
      chain: "sol",
      message: "Invalid Solana address",
      details:
        "Must be 32-44 characters of base58 (no 0, O, I, l characters).",
    };
  }

  // Try to decode base58 and check it's 32 bytes
  try {
    const decoded = base58Decode(addr);
    if (decoded.length !== 32) {
      return {
        valid: false,
        chain: "sol",
        message: "Invalid Solana address",
        details: `Decoded to ${decoded.length} bytes, expected 32.`,
      };
    }
    return {
      valid: true,
      chain: "sol",
      message: "Valid Solana address",
      details: "32-byte Ed25519 public key in base58 encoding.",
    };
  } catch {
    return {
      valid: false,
      chain: "sol",
      message: "Invalid Solana address",
      details: "Failed to decode base58.",
    };
  }
}

const BASE58_ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function base58Decode(str: string): Uint8Array {
  const bytes: number[] = [0];
  for (const char of str) {
    const idx = BASE58_ALPHABET.indexOf(char);
    if (idx < 0) throw new Error("Invalid base58 character");
    let carry = idx;
    for (let j = 0; j < bytes.length; j++) {
      carry += bytes[j] * 58;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }
  // Handle leading 1s
  for (const char of str) {
    if (char !== "1") break;
    bytes.push(0);
  }
  return new Uint8Array(bytes.reverse());
}
