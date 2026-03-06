"use client";

import { useState } from "react";
import { SigningKey, computeAddress } from "ethers";
import OutputField from "@/components/tools/OutputField";

export default function PrivateKeyToAddressTool() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKeyUncompressed, setPublicKeyUncompressed] = useState("");
  const [publicKeyCompressed, setPublicKeyCompressed] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const derive = (pk: string) => {
    setError("");
    setPublicKeyUncompressed("");
    setPublicKeyCompressed("");
    setAddress("");

    if (!pk.trim()) return;

    try {
      // Normalize private key
      const normalized = pk.trim().startsWith("0x") ? pk.trim() : `0x${pk.trim()}`;

      // Validate hex
      const hexPart = normalized.slice(2);
      if (!/^[0-9a-fA-F]{64}$/.test(hexPart)) {
        setError("Private key must be 64 hex characters (32 bytes).");
        return;
      }

      const signingKey = new SigningKey(normalized);

      setPublicKeyUncompressed(signingKey.publicKey);
      setPublicKeyCompressed(signingKey.compressedPublicKey);
      setAddress(computeAddress(signingKey.publicKey));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to derive keys.");
    }
  };

  const generateRandom = () => {
    // Generate 32 random bytes
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const hexKey = Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setPrivateKey(hexKey);
    derive(hexKey);
  };

  const handleChange = (value: string) => {
    setPrivateKey(value);
    derive(value);
  };

  return (
    <div className="space-y-6">
      {/* Security warning */}
      <div className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 px-4 py-3">
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
          This tool runs entirely in your browser. Never enter private keys that control real funds. Use &quot;Generate Random&quot; for testing.
        </p>
      </div>

      {/* Private key input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Private Key
          </label>
          <button
            onClick={generateRandom}
            className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Generate Random
          </button>
        </div>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="64 hex characters (with or without 0x prefix)"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Results */}
      <OutputField label="Ethereum Address (EIP-55 Checksummed)" value={address} rows={1} />
      <OutputField label="Public Key (Uncompressed, 65 bytes)" value={publicKeyUncompressed} rows={2} />
      <OutputField label="Public Key (Compressed, 33 bytes)" value={publicKeyCompressed} rows={1} />

      {/* Derivation explanation */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Derivation Steps
        </h3>
        <ol className="space-y-2 text-sm text-gray-500">
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">1. Private Key</span>{" "}
            &mdash; A random 256-bit (32-byte) number. Must be less than the secp256k1 curve order.
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">2. Public Key</span>{" "}
            &mdash; Derived by multiplying the private key by the secp256k1 generator point{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              G
            </code>
            . The uncompressed form is 65 bytes (prefix{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              0x04
            </code>{" "}
            + 32 bytes X + 32 bytes Y). Compressed form is 33 bytes (prefix{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              0x02
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              0x03
            </code>{" "}
            + 32 bytes X).
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">3. Ethereum Address</span>{" "}
            &mdash; Take the Keccak256 hash of the uncompressed public key (without the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              0x04
            </code>{" "}
            prefix), then take the last 20 bytes. The EIP-55 checksum applies mixed-case encoding based on another Keccak256 hash of the lowercase address.
          </li>
        </ol>
      </div>
    </div>
  );
}
