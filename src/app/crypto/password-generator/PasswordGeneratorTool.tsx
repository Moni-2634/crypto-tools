"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/tools/CopyButton";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  uppercaseNoAmbiguous: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  lowercaseNoAmbiguous: "abcdefghjkmnpqrstuvwxyz",
  numbers: "0123456789",
  numbersNoAmbiguous: "23456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(options: PasswordOptions): string {
  let chars = "";
  const required: string[] = [];

  if (options.uppercase) {
    const set = options.excludeAmbiguous
      ? CHAR_SETS.uppercaseNoAmbiguous
      : CHAR_SETS.uppercase;
    chars += set;
    required.push(set[Math.floor(Math.random() * set.length)]);
  }
  if (options.lowercase) {
    const set = options.excludeAmbiguous
      ? CHAR_SETS.lowercaseNoAmbiguous
      : CHAR_SETS.lowercase;
    chars += set;
    required.push(set[Math.floor(Math.random() * set.length)]);
  }
  if (options.numbers) {
    const set = options.excludeAmbiguous
      ? CHAR_SETS.numbersNoAmbiguous
      : CHAR_SETS.numbers;
    chars += set;
    required.push(set[Math.floor(Math.random() * set.length)]);
  }
  if (options.symbols) {
    chars += CHAR_SETS.symbols;
    required.push(
      CHAR_SETS.symbols[Math.floor(Math.random() * CHAR_SETS.symbols.length)]
    );
  }

  if (!chars) return "";

  // Generate random characters
  const password: string[] = [];
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password.push(chars[array[i] % chars.length]);
  }

  // Ensure at least one character from each required set
  const positions = new Set<number>();
  const posArray = new Uint32Array(required.length);
  crypto.getRandomValues(posArray);

  for (let i = 0; i < required.length; i++) {
    let pos = posArray[i] % options.length;
    while (positions.has(pos)) {
      pos = (pos + 1) % options.length;
    }
    positions.add(pos);
    password[pos] = required[i];
  }

  return password.join("");
}

function getPasswordStrength(
  password: string,
  options: PasswordOptions
): { label: string; score: number; color: string } {
  if (!password) return { label: "None", score: 0, color: "bg-gray-300" };

  let poolSize = 0;
  if (options.uppercase) poolSize += 26;
  if (options.lowercase) poolSize += 26;
  if (options.numbers) poolSize += 10;
  if (options.symbols) poolSize += 26;

  // Entropy = length * log2(poolSize)
  const entropy = password.length * Math.log2(poolSize || 1);

  if (entropy < 28) return { label: "Very Weak", score: 1, color: "bg-red-500" };
  if (entropy < 36) return { label: "Weak", score: 2, color: "bg-orange-500" };
  if (entropy < 60) return { label: "Fair", score: 3, color: "bg-yellow-500" };
  if (entropy < 80) return { label: "Strong", score: 4, color: "bg-green-500" };
  return { label: "Very Strong", score: 5, color: "bg-emerald-500" };
}

function getTimeToCrack(password: string, options: PasswordOptions): string {
  let poolSize = 0;
  if (options.uppercase) poolSize += 26;
  if (options.lowercase) poolSize += 26;
  if (options.numbers) poolSize += 10;
  if (options.symbols) poolSize += 26;

  if (poolSize === 0 || !password) return "N/A";

  // Assume 10 billion guesses per second (modern hardware)
  const combinations = Math.pow(poolSize, password.length);
  const seconds = combinations / 10_000_000_000 / 2; // Average case

  if (seconds < 1) return "Instant";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1_000_000)
    return `${Math.round(seconds / 31536000 / 1000)}K years`;
  if (seconds < 31536000 * 1_000_000_000)
    return `${Math.round(seconds / 31536000 / 1_000_000)}M years`;
  return `${(seconds / 31536000 / 1_000_000_000).toExponential(1)} billion years`;
}

export default function PasswordGeneratorTool() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });

  const [password, setPassword] = useState(() => generatePassword({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  }));

  const [bulkCount, setBulkCount] = useState(5);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);

  const strength = getPasswordStrength(password, options);
  const timeToCrack = getTimeToCrack(password, options);

  const handleGenerate = useCallback(() => {
    setPassword(generatePassword(options));
    setBulkPasswords([]);
  }, [options]);

  const handleBulkGenerate = useCallback(() => {
    const passwords: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      passwords.push(generatePassword(options));
    }
    setBulkPasswords(passwords);
  }, [options, bulkCount]);

  const updateOption = useCallback(
    <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
      const newOptions = { ...options, [key]: value };
      // Ensure at least one character set is selected
      if (
        !newOptions.uppercase &&
        !newOptions.lowercase &&
        !newOptions.numbers &&
        !newOptions.symbols
      ) {
        return;
      }
      setOptions(newOptions);
      setPassword(generatePassword(newOptions));
      setBulkPasswords([]);
    },
    [options]
  );

  return (
    <div className="space-y-6">
      {/* Generated password display */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3">
          <code className="flex-1 break-all text-lg sm:text-xl font-mono font-bold text-gray-900 dark:text-white tracking-wider">
            {password || "Select at least one option"}
          </code>
          {password && <CopyButton text={password} />}
        </div>

        {/* Strength bar */}
        {password && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Strength: <strong>{strength.label}</strong>
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Crack time: <strong>{timeToCrack}</strong>
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    i <= strength.score
                      ? strength.color
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Generate New Password
      </button>

      {/* Options */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Options
        </h3>

        {/* Length slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Length
            </label>
            <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
              {options.length}
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={128}
            value={options.length}
            onChange={(e) => updateOption("length", parseInt(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>4</span>
            <span>128</span>
          </div>
        </div>

        {/* Character type toggles */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "uppercase" as const, label: "Uppercase (A-Z)" },
            { key: "lowercase" as const, label: "Lowercase (a-z)" },
            { key: "numbers" as const, label: "Numbers (0-9)" },
            { key: "symbols" as const, label: "Symbols (!@#$...)" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={options[item.key]}
                onChange={(e) => updateOption(item.key, e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 accent-blue-600"
              />
              {item.label}
            </label>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={options.excludeAmbiguous}
            onChange={(e) => updateOption("excludeAmbiguous", e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 accent-blue-600"
          />
          Exclude ambiguous characters (0, O, l, 1, I)
        </label>
      </div>

      {/* Bulk generate */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Bulk Generate
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={2}
            max={25}
            value={bulkCount}
            onChange={(e) =>
              setBulkCount(Math.max(2, Math.min(25, parseInt(e.target.value) || 2)))
            }
            className="w-20 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-mono text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleBulkGenerate}
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Generate {bulkCount} Passwords
          </button>
        </div>

        {bulkPasswords.length > 0 && (
          <div className="space-y-1">
            {bulkPasswords.map((pw, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border border-gray-200 dark:border-gray-700 px-4 py-2"
              >
                <code className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                  {pw}
                </code>
                <CopyButton text={pw} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Password Generator
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This password generator uses the browser&apos;s <code>crypto.getRandomValues()</code> API,
            which provides cryptographically secure random numbers. This is the same source of
            randomness used by security libraries and cryptocurrency wallets.
          </p>
          <p>
            The strength meter calculates password entropy based on the character pool size and
            length. The crack time estimate assumes an attacker making 10 billion guesses per
            second, representing modern GPU-based brute force capabilities.
          </p>
          <p>
            All passwords are generated locally in your browser. Nothing is stored or transmitted.
          </p>
        </div>
      </div>
    </div>
  );
}
