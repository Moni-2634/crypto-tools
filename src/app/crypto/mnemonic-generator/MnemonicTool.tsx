"use client";

import { useState } from "react";
import * as bip39 from "bip39";
import CopyButton from "@/components/tools/CopyButton";
import InputField from "@/components/tools/InputField";

type WordCount = 12 | 24;

export default function MnemonicTool() {
  const [wordCount, setWordCount] = useState<WordCount>(12);
  const [mnemonic, setMnemonic] = useState("");
  const [validateInput, setValidateInput] = useState("");
  const [validationResult, setValidationResult] = useState<
    "valid" | "invalid" | null
  >(null);

  const handleGenerate = () => {
    const strength = wordCount === 12 ? 128 : 256;
    const m = bip39.generateMnemonic(strength);
    setMnemonic(m);
  };

  const handleValidate = () => {
    const input = validateInput.trim();
    if (!input) {
      setValidationResult(null);
      return;
    }
    setValidationResult(bip39.validateMnemonic(input) ? "valid" : "invalid");
  };

  const words = mnemonic ? mnemonic.split(" ") : [];

  return (
    <div className="space-y-6">
      {/* Security Warning */}
      <div className="rounded-lg border border-yellow-400 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3">
        <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
          Warning: For educational purposes only
        </p>
        <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-500/80">
          Do not use this tool to generate mnemonics for real wallets. Browser
          environments are not cryptographically secure enough for key
          generation. Use a hardware wallet or offline tool instead.
        </p>
      </div>

      {/* Generator Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Word count:</span>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            {([12, 24] as WordCount[]).map((count) => (
              <button
                key={count}
                onClick={() => setWordCount(count)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  wordCount === count
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {count} words
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Generate Mnemonic
        </button>

        {words.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated Mnemonic
              </span>
              <CopyButton text={mnemonic} />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {words.map((word, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2"
                >
                  <span className="mr-2 text-xs text-gray-500">{i + 1}.</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Validator Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Validate Mnemonic
        </h3>
        <div className="space-y-4">
          <InputField
            label="Paste your mnemonic phrase"
            value={validateInput}
            onChange={(v) => {
              setValidateInput(v);
              setValidationResult(null);
            }}
            placeholder="Enter 12 or 24 word mnemonic phrase..."
            multiline
            rows={3}
          />
          <button
            onClick={handleValidate}
            className="rounded-lg bg-gray-200 dark:bg-gray-700 px-6 py-2.5 text-sm font-medium text-gray-900 dark:text-white transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Validate
          </button>
          {validationResult === "valid" && (
            <p className="rounded-lg border border-green-300 dark:border-green-800 bg-green-100 dark:bg-green-900/30 px-4 py-3 text-sm text-green-600 dark:text-green-400">
              Valid BIP39 mnemonic phrase.
            </p>
          )}
          {validationResult === "invalid" && (
            <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              Invalid mnemonic. Check the words and word count (must be 12, 15,
              18, 21, or 24 words from the BIP39 wordlist).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
