"use client";

import { useState, useCallback } from "react";
import { keccak256 } from "js-sha3";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "generate" | "verify";

// --- Merkle tree helpers (OpenZeppelin-style sorted pairs) ---

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return (
    "0x" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

function hashLeaf(leaf: string): string {
  const trimmed = leaf.trim();
  // If the input is a hex value (address or bytes), hash the bytes directly
  if (/^0x[0-9a-fA-F]+$/i.test(trimmed)) {
    const bytes = hexToBytes(trimmed);
    return "0x" + keccak256(bytes);
  }
  // Otherwise hash as UTF-8 text
  return "0x" + keccak256(trimmed);
}

function sortAndHash(a: string, b: string): string {
  // Sort the pair lexicographically (lowercase comparison like OpenZeppelin)
  const [first, second] = a.toLowerCase() < b.toLowerCase() ? [a, b] : [b, a];
  const bytesA = hexToBytes(first);
  const bytesB = hexToBytes(second);
  const combined = new Uint8Array(bytesA.length + bytesB.length);
  combined.set(bytesA, 0);
  combined.set(bytesB, bytesA.length);
  return "0x" + keccak256(combined);
}

interface TreeLevel {
  hashes: string[];
}

function buildMerkleTree(leaves: string[]): TreeLevel[] {
  if (leaves.length === 0) return [];

  // Hash each leaf
  const leafHashes = leaves.map(hashLeaf);
  const levels: TreeLevel[] = [{ hashes: leafHashes }];

  let currentLevel = leafHashes;

  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      if (i + 1 < currentLevel.length) {
        nextLevel.push(sortAndHash(currentLevel[i], currentLevel[i + 1]));
      } else {
        // Odd element: promote to next level
        nextLevel.push(currentLevel[i]);
      }
    }
    levels.push({ hashes: nextLevel });
    currentLevel = nextLevel;
  }

  return levels;
}

function generateProof(
  levels: TreeLevel[],
  leafIndex: number
): string[] {
  const proof: string[] = [];
  let idx = leafIndex;

  for (let i = 0; i < levels.length - 1; i++) {
    const level = levels[i].hashes;
    const isRight = idx % 2 === 1;
    const siblingIdx = isRight ? idx - 1 : idx + 1;

    if (siblingIdx < level.length) {
      proof.push(level[siblingIdx]);
    }

    idx = Math.floor(idx / 2);
  }

  return proof;
}

function verifyProof(
  root: string,
  leaf: string,
  proof: string[]
): boolean {
  let hash = leaf.toLowerCase();

  for (const sibling of proof) {
    hash = sortAndHash(hash, sibling).toLowerCase();
  }

  return hash === root.toLowerCase();
}

// --- Component ---

export default function MerkleProofTool() {
  const [tab, setTab] = useState<Tab>("generate");

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setTab("generate")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "generate"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Generate Proof
        </button>
        <button
          onClick={() => setTab("verify")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "verify"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Verify Proof
        </button>
      </div>

      {tab === "generate" ? <GeneratePanel /> : <VerifyPanel />}
    </div>
  );
}

function GeneratePanel() {
  const [leavesInput, setLeavesInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [root, setRoot] = useState("");
  const [leafHash, setLeafHash] = useState("");
  const [proof, setProof] = useState("");
  const [treeVis, setTreeVis] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = useCallback(() => {
    setError("");
    setRoot("");
    setLeafHash("");
    setProof("");
    setTreeVis("");

    try {
      const lines = leavesInput
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      if (lines.length === 0) {
        setError("Please enter at least one leaf value.");
        return;
      }

      if (lines.length < 2) {
        setError("Please enter at least two leaf values to build a tree.");
        return;
      }

      if (selectedIndex < 0 || selectedIndex >= lines.length) {
        setError(
          `Selected index ${selectedIndex} is out of range. Valid range: 0 to ${lines.length - 1}.`
        );
        return;
      }

      const levels = buildMerkleTree(lines);
      const merkleRoot = levels[levels.length - 1].hashes[0];
      const selectedLeafHash = levels[0].hashes[selectedIndex];
      const merkleProof = generateProof(levels, selectedIndex);

      setRoot(merkleRoot);
      setLeafHash(selectedLeafHash);
      setProof(JSON.stringify(merkleProof, null, 2));

      // Build tree visualization
      const visLines: string[] = [];
      for (let i = levels.length - 1; i >= 0; i--) {
        const levelName =
          i === levels.length - 1
            ? "Root"
            : i === 0
              ? "Leaves"
              : `Level ${i}`;
        visLines.push(`--- ${levelName} ---`);
        levels[i].hashes.forEach((h, j) => {
          const marker =
            i === 0 && j === selectedIndex ? " <-- selected" : "";
          visLines.push(`  [${j}] ${h}${marker}`);
        });
      }
      setTreeVis(visLines.join("\n"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build Merkle tree.");
    }
  }, [leavesInput, selectedIndex]);

  const leaves = leavesInput
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <InputField
        label="Leaf Values (one per line - addresses or hex values)"
        value={leavesInput}
        onChange={setLeavesInput}
        placeholder={`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045\n0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B\n0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984\n0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8`}
        multiline
        rows={5}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Leaf Index for Proof
        </label>
        {leaves.length > 0 ? (
          <div className="space-y-1">
            {leaves.map((leaf, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-2 text-left text-sm transition-colors ${
                  i === selectedIndex
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <span className="font-mono text-xs text-gray-500 dark:text-gray-500">
                  [{i}]
                </span>
                <span className="truncate font-mono">{leaf}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Enter leaf values above to select one.
          </p>
        )}
      </div>

      <button
        onClick={handleGenerate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Generate Proof
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {root && (
        <>
          <OutputField label="Merkle Root" value={root} rows={2} />
          <OutputField label="Leaf Hash" value={leafHash} rows={2} />
          <OutputField label="Proof (JSON array)" value={proof} rows={6} />
          <OutputField label="Tree Visualization" value={treeVis} rows={12} />
        </>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          How It Works
        </h3>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>1. Each leaf is hashed with keccak256.</li>
          <li>
            2. Pairs are sorted lexicographically before hashing (OpenZeppelin
            style).
          </li>
          <li>3. Pairs are concatenated and hashed to form the next level.</li>
          <li>4. This continues until a single root hash remains.</li>
          <li>
            5. A proof is the list of sibling hashes needed to reconstruct the
            root from a leaf.
          </li>
        </ul>
      </div>
    </div>
  );
}

function VerifyPanel() {
  const [rootInput, setRootInput] = useState("");
  const [leafInput, setLeafInput] = useState("");
  const [proofInput, setProofInput] = useState("");
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);
  const [error, setError] = useState("");

  const handleVerify = useCallback(() => {
    setError("");
    setResult(null);

    try {
      const root = rootInput.trim();
      const leaf = leafInput.trim();
      const proofText = proofInput.trim();

      if (!root || !leaf || !proofText) {
        setError("Please fill in all fields: root, leaf hash, and proof.");
        return;
      }

      if (!/^0x[0-9a-fA-F]{64}$/.test(root)) {
        setError("Root must be a 32-byte hex string (0x + 64 hex characters).");
        return;
      }

      if (!/^0x[0-9a-fA-F]{64}$/.test(leaf)) {
        setError(
          "Leaf hash must be a 32-byte hex string (0x + 64 hex characters)."
        );
        return;
      }

      let proofArray: string[];
      try {
        proofArray = JSON.parse(proofText);
        if (!Array.isArray(proofArray)) throw new Error("Not an array");
      } catch {
        setError("Proof must be a valid JSON array of hex strings.");
        return;
      }

      for (const item of proofArray) {
        if (!/^0x[0-9a-fA-F]{64}$/.test(item)) {
          setError(
            `Invalid proof element: ${item}. Each must be a 32-byte hex string.`
          );
          return;
        }
      }

      const isValid = verifyProof(root, leaf, proofArray);
      setResult(isValid ? "valid" : "invalid");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed.");
    }
  }, [rootInput, leafInput, proofInput]);

  return (
    <div className="space-y-4">
      <InputField
        label="Merkle Root"
        value={rootInput}
        onChange={setRootInput}
        placeholder="0x..."
      />
      <InputField
        label="Leaf Hash"
        value={leafInput}
        onChange={setLeafInput}
        placeholder="0x..."
      />
      <InputField
        label="Proof (JSON array)"
        value={proofInput}
        onChange={setProofInput}
        placeholder='["0x...", "0x..."]'
        multiline
        rows={4}
      />

      <button
        onClick={handleVerify}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Verify Proof
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {result === "valid" && (
        <div className="rounded-lg border border-green-300 dark:border-green-800 bg-green-100 dark:bg-green-900/30 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-400">
          Proof is valid. The leaf is included in the Merkle tree.
        </div>
      )}

      {result === "invalid" && (
        <div className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
          Proof is invalid. The leaf is NOT included in the Merkle tree with
          this root.
        </div>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Usage
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Paste the Merkle root, the keccak256 hash of your leaf, and the proof
          array from the Generate tab. The verifier will recompute the root from
          the leaf and proof, and check if it matches. This is the same
          verification used in Solidity via OpenZeppelin&apos;s MerkleProof
          library.
        </p>
      </div>
    </div>
  );
}
