"use client";

import { useState } from "react";
import { Wallet, verifyMessage, Signature } from "ethers";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "sign" | "verify";

export default function SignatureVerifierTool() {
  const [tab, setTab] = useState<Tab>("sign");

  return (
    <div className="space-y-6">
      {/* Security warning */}
      <div className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 px-4 py-3">
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
          This tool runs entirely in your browser. Never enter private keys that control real funds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setTab("sign")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "sign"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Sign
        </button>
        <button
          onClick={() => setTab("verify")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "verify"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Verify
        </button>
      </div>

      {tab === "sign" ? <SignPanel /> : <VerifyPanel />}

      {/* EIP-191 explanation */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About EIP-191 Signed Messages
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            Ethereum personal signatures use the EIP-191 standard, which prefixes the message with{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              &quot;\x19Ethereum Signed Message:\n&quot; + message.length
            </code>{" "}
            before hashing with Keccak256.
          </li>
          <li>This prefix prevents signed messages from being used as valid transactions.</li>
          <li>The signature is 65 bytes: r (32 bytes) + s (32 bytes) + v (1 byte).</li>
          <li>
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">v</code>{" "}
            is typically 27 or 28 (0x1b or 0x1c).
          </li>
        </ul>
      </div>
    </div>
  );
}

function SignPanel() {
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSign = async () => {
    setError("");
    setOutput("");

    try {
      const pk = privateKey.trim();
      const msg = message;

      if (!pk) {
        setError("Please enter a private key.");
        return;
      }
      if (!msg) {
        setError("Please enter a message to sign.");
        return;
      }

      // Normalize private key
      const normalizedPk = pk.startsWith("0x") ? pk : `0x${pk}`;

      // Validate hex
      const hexPart = normalizedPk.slice(2);
      if (!/^[0-9a-fA-F]{64}$/.test(hexPart)) {
        setError("Private key must be 64 hex characters (32 bytes).");
        return;
      }

      const wallet = new Wallet(normalizedPk);
      const signature = await wallet.signMessage(msg);

      // Parse signature components
      const sig = Signature.from(signature);

      const lines = [
        `Signer Address: ${wallet.address}`,
        ``,
        `Full Signature:`,
        `${signature}`,
        ``,
        `Components:`,
        `  r: ${sig.r}`,
        `  s: ${sig.s}`,
        `  v: ${sig.v}`,
      ];

      setOutput(lines.join("\n"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signing failed.");
    }
  };

  const generateRandom = () => {
    const wallet = Wallet.createRandom();
    setPrivateKey(wallet.privateKey.slice(2));
  };

  return (
    <div className="space-y-4">
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
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="64 hex characters (without 0x prefix)"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      <InputField
        label="Message"
        value={message}
        onChange={setMessage}
        placeholder="Enter message to sign"
        multiline
        rows={3}
      />

      <button
        onClick={handleSign}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Sign Message
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Signature Result" value={output} rows={10} />
    </div>
  );
}

function VerifyPanel() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    setError("");
    setOutput("");

    try {
      const msg = message;
      const sig = signature.trim();

      if (!msg) {
        setError("Please enter the original message.");
        return;
      }
      if (!sig) {
        setError("Please enter the signature.");
        return;
      }

      // Normalize signature
      const normalizedSig = sig.startsWith("0x") ? sig : `0x${sig}`;

      const recoveredAddress = verifyMessage(msg, normalizedSig);
      const parsedSig = Signature.from(normalizedSig);

      const lines = [
        `Recovered Signer Address:`,
        `${recoveredAddress}`,
        ``,
        `Signature Components:`,
        `  r: ${parsedSig.r}`,
        `  s: ${parsedSig.s}`,
        `  v: ${parsedSig.v}`,
        ``,
        `Signature is valid.`,
      ];

      setOutput(lines.join("\n"));
    } catch (e) {
      setError(
        e instanceof Error
          ? `Verification failed: ${e.message}`
          : "Verification failed. The signature may be invalid."
      );
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Original Message"
        value={message}
        onChange={setMessage}
        placeholder="Enter the message that was signed"
        multiline
        rows={3}
      />

      <InputField
        label="Signature (hex)"
        value={signature}
        onChange={setSignature}
        placeholder="0x... (65 bytes / 130 hex characters)"
        multiline
        rows={2}
      />

      <button
        onClick={handleVerify}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Verify & Recover Signer
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <OutputField label="Verification Result" value={output} rows={9} />
    </div>
  );
}
