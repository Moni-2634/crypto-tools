"use client";

import { useState, useMemo, useCallback } from "react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  leftNum: number | null;
  rightNum: number | null;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");

  // LCS-based diff algorithm
  const m = origLines.length;
  const n = modLines.length;

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find diff
  const result: DiffLine[] = [];
  let i = m;
  let j = n;

  const tempResult: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      tempResult.push({
        type: "unchanged",
        text: origLines[i - 1],
        leftNum: i,
        rightNum: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      tempResult.push({
        type: "added",
        text: modLines[j - 1],
        leftNum: null,
        rightNum: j,
      });
      j--;
    } else if (i > 0) {
      tempResult.push({
        type: "removed",
        text: origLines[i - 1],
        leftNum: i,
        rightNum: null,
      });
      i--;
    }
  }

  // Reverse since we backtracked
  for (let k = tempResult.length - 1; k >= 0; k--) {
    result.push(tempResult[k]);
  }

  return result;
}

const EXAMPLES = [
  {
    label: "Simple text change",
    original: "Hello World\nThis is a test\nLine three\nLine four",
    modified: "Hello World\nThis is modified\nLine three\nNew line added\nLine four",
  },
  {
    label: "Code change",
    original:
      'function greet(name) {\n  console.log("Hello " + name);\n  return true;\n}',
    modified:
      'function greet(name: string) {\n  console.log(`Hello ${name}`);\n  return name.length > 0;\n}',
  },
  {
    label: "Config change",
    original:
      '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "description": "Old description",\n  "main": "index.js"\n}',
    modified:
      '{\n  "name": "my-app",\n  "version": "1.1.0",\n  "description": "New description",\n  "main": "index.ts",\n  "type": "module"\n}',
  },
];

export default function DiffCheckerTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const diff = useMemo(() => {
    if (!original && !modified) return [];
    return computeDiff(original, modified);
  }, [original, modified]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const unchanged = diff.filter((d) => d.type === "unchanged").length;
    return { added, removed, unchanged, total: diff.length };
  }, [diff]);

  const handleClear = useCallback(() => {
    setOriginal("");
    setModified("");
  }, []);

  const handleSwap = useCallback(() => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  }, [original, modified]);

  return (
    <div className="space-y-6">
      {/* Input areas */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Original Text
          </label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste the original text here..."
            rows={10}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Modified Text
          </label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste the modified text here..."
            rows={10}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 resize-y"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSwap}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Swap Sides
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear Both
        </button>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
            + {stats.added} added
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
            - {stats.removed} removed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
            {stats.unchanged} unchanged
          </span>
        </div>
      )}

      {/* Diff output */}
      {diff.length > 0 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Diff Output
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="font-mono text-sm">
                {diff.map((line, idx) => (
                  <tr
                    key={idx}
                    className={
                      line.type === "added"
                        ? "bg-green-50 dark:bg-green-900/20"
                        : line.type === "removed"
                        ? "bg-red-50 dark:bg-red-900/20"
                        : ""
                    }
                  >
                    <td className="w-10 px-2 py-0.5 text-right text-xs text-gray-400 dark:text-gray-600 select-none border-r border-gray-200 dark:border-gray-700">
                      {line.leftNum ?? ""}
                    </td>
                    <td className="w-10 px-2 py-0.5 text-right text-xs text-gray-400 dark:text-gray-600 select-none border-r border-gray-200 dark:border-gray-700">
                      {line.rightNum ?? ""}
                    </td>
                    <td className="w-6 px-1 py-0.5 text-center select-none">
                      <span
                        className={
                          line.type === "added"
                            ? "text-green-600 dark:text-green-400"
                            : line.type === "removed"
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-300 dark:text-gray-700"
                        }
                      >
                        {line.type === "added"
                          ? "+"
                          : line.type === "removed"
                          ? "-"
                          : " "}
                      </span>
                    </td>
                    <td
                      className={`px-3 py-0.5 whitespace-pre-wrap ${
                        line.type === "added"
                          ? "text-green-800 dark:text-green-300"
                          : line.type === "removed"
                          ? "text-red-800 dark:text-red-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {line.text || "\u00A0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              onClick={() => {
                setOriginal(ex.original);
                setModified(ex.modified);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Diff Checker
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This diff checker compares two texts line by line using the Longest Common
            Subsequence (LCS) algorithm, the same approach used by Git and other version
            control systems. Added lines are shown in green, removed lines in red, and
            unchanged lines have no highlighting.
          </p>
          <p>
            All processing happens locally in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
