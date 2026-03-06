"use client";

import { useState, useMemo, useCallback } from "react";

interface CharStats {
  total: number;
  withoutSpaces: number;
  letters: number;
  digits: number;
  spaces: number;
  specialChars: number;
  words: number;
  sentences: number;
  lines: number;
}

const LIMITS = [
  { label: "Twitter/X Post", limit: 280 },
  { label: "Meta Description", limit: 160 },
  { label: "Meta Title", limit: 60 },
  { label: "Instagram Caption", limit: 2200 },
  { label: "LinkedIn Post", limit: 3000 },
  { label: "YouTube Title", limit: 100 },
  { label: "SMS Message", limit: 160 },
  { label: "Reddit Title", limit: 300 },
];

function getCharStats(text: string): CharStats {
  if (!text) {
    return {
      total: 0,
      withoutSpaces: 0,
      letters: 0,
      digits: 0,
      spaces: 0,
      specialChars: 0,
      words: 0,
      sentences: 0,
      lines: 0,
    };
  }

  const total = text.length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const digits = (text.match(/[0-9]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  const withoutSpaces = total - spaces;
  const specialChars = total - letters - digits - spaces;
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const lines = text.split("\n").length;

  return {
    total,
    withoutSpaces,
    letters,
    digits,
    spaces,
    specialChars,
    words,
    sentences,
    lines,
  };
}

export default function CharacterCounterTool() {
  const [text, setText] = useState("");
  const [selectedLimit, setSelectedLimit] = useState<number | null>(null);

  const stats = useMemo(() => getCharStats(text), [text]);

  const handleClear = useCallback(() => {
    setText("");
    setSelectedLimit(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText(t);
    } catch {
      // Clipboard not available
    }
  }, []);

  const limitProgress = selectedLimit
    ? Math.min((stats.total / selectedLimit) * 100, 100)
    : null;
  const isOverLimit = selectedLimit ? stats.total > selectedLimit : false;

  return (
    <div className="space-y-6">
      {/* Main character count */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Characters", value: stats.total },
          { label: "Without Spaces", value: stats.withoutSpaces },
          { label: "Words", value: stats.words },
          { label: "Sentences", value: stats.sentences },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-center"
          >
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">
              {item.value.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Character limit selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Character Limit (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {LIMITS.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                setSelectedLimit(
                  selectedLimit === item.limit ? null : item.limit
                )
              }
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedLimit === item.limit
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label} ({item.limit})
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {selectedLimit && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {stats.total} / {selectedLimit} characters
            </span>
            <span
              className={`font-medium ${
                isOverLimit
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {isOverLimit
                ? `${stats.total - selectedLimit} over limit`
                : `${selectedLimit - stats.total} remaining`}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isOverLimit ? "bg-red-500" : "bg-blue-600"
              }`}
              style={{ width: `${limitProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handlePaste}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Paste from Clipboard
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear
        </button>
      </div>

      {/* Text input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to count characters..."
          rows={10}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 resize-y ${
            isOverLimit
              ? "border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10"
              : "border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white"
          }`}
        />
      </div>

      {/* Detailed breakdown */}
      {text.trim() && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Character Breakdown
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Letters</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.letters.toLocaleString()}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Digits</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.digits.toLocaleString()}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Spaces</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.spaces.toLocaleString()}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Special Characters</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.specialChars.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Platform limits reference */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Platform Character Limits Reference
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LIMITS.map((item) => (
            <div
              key={item.label}
              className="rounded border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <p className="font-mono text-blue-600 dark:text-blue-400 text-xs">
                {item.limit} chars
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Character Counter
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This character counter provides real-time statistics as you type. It breaks
            down your text into characters (with and without spaces), letters, digits,
            spaces, and special characters. Use the platform limit buttons to check if
            your text fits within specific character limits.
          </p>
          <p>
            All processing happens locally in your browser. No text is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
