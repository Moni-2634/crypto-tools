"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";

interface MatchResult {
  fullMatch: string;
  index: number;
  groups: string[];
  namedGroups: Record<string, string>;
}

const COMMON_PATTERNS = [
  {
    label: "Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    testString: "Contact us at hello@example.com or support@evmtools.dev",
    flags: { g: true, i: false, m: false, s: false },
  },
  {
    label: "URL",
    pattern: "https?://[\\w.-]+(?:\\.[a-zA-Z]{2,})(?:/[\\w./?%&=+-]*)?",
    testString:
      "Visit https://evmtools.dev/crypto or http://example.com/path?q=test",
    flags: { g: true, i: false, m: false, s: false },
  },
  {
    label: "IPv4 Address",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    testString: "Server IPs: 192.168.1.1, 10.0.0.255, 172.16.0.1",
    flags: { g: true, i: false, m: false, s: false },
  },
  {
    label: "Ethereum Address",
    pattern: "0x[0-9a-fA-F]{40}",
    testString:
      "Token: 0xdAC17F958D2ee523a2206206994597C13D831ec7 and 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    flags: { g: true, i: false, m: false, s: false },
  },
  {
    label: "Hex Color Code",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    testString: "Colors: #fff, #FF5733, #3498db, #000000",
    flags: { g: true, i: false, m: false, s: false },
  },
  {
    label: "Phone Number (US)",
    pattern: "(?:\\+?1[-.]?)?\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}",
    testString: "Call (555) 123-4567 or +1-800-555-0199 or 555.867.5309",
    flags: { g: true, i: false, m: false, s: false },
  },
  {
    label: "Solidity Function Signature",
    pattern: "function\\s+(\\w+)\\s*\\(([^)]*)\\)",
    testString:
      "function transfer(address to, uint256 amount) external returns (bool)\nfunction balanceOf(address account) view returns (uint256)",
    flags: { g: true, i: false, m: true, s: false },
  },
  {
    label: "JSON Key-Value Pair",
    pattern: '"(\\w+)"\\s*:\\s*"([^"]*)"',
    testString: '{"name": "EVMTools", "version": "1.0", "type": "webapp"}',
    flags: { g: true, i: false, m: false, s: false },
  },
];

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
  });

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as MatchResult[], error: "" };

    try {
      const flagStr =
        (flags.g ? "g" : "") +
        (flags.i ? "i" : "") +
        (flags.m ? "m" : "") +
        (flags.s ? "s" : "");

      const regex = new RegExp(pattern, flagStr);

      if (!testString) return { matches: [] as MatchResult[], error: "" };

      const results: MatchResult[] = [];

      if (flags.g) {
        let match: RegExpExecArray | null;
        // Safety limit to prevent infinite loops with zero-length matches
        let iterations = 0;
        const maxIterations = 10000;
        while (
          (match = regex.exec(testString)) !== null &&
          iterations < maxIterations
        ) {
          results.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups ? { ...match.groups } : {},
          });
          // Prevent infinite loop for zero-length matches
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
          iterations++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups ? { ...match.groups } : {},
          });
        }
      }

      return { matches: results, error: "" };
    } catch (e) {
      return {
        matches: [] as MatchResult[],
        error: e instanceof Error ? e.message : "Invalid regular expression",
      };
    }
  }, [pattern, testString, flags]);

  const loadExample = (ex: (typeof COMMON_PATTERNS)[number]) => {
    setPattern(ex.pattern);
    setTestString(ex.testString);
    setFlags(ex.flags);
  };

  // Build highlighted text with matches
  const highlightedSegments = useMemo(() => {
    if (!testString || !pattern || matches.length === 0) return null;

    const segments: { text: string; isMatch: boolean; matchIndex: number }[] =
      [];
    let lastEnd = 0;

    // Sort matches by index to ensure proper ordering
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    for (let i = 0; i < sortedMatches.length; i++) {
      const match = sortedMatches[i];
      // Add text before this match
      if (match.index > lastEnd) {
        segments.push({
          text: testString.slice(lastEnd, match.index),
          isMatch: false,
          matchIndex: -1,
        });
      }
      // Add the match itself
      segments.push({
        text: match.fullMatch,
        isMatch: true,
        matchIndex: i,
      });
      lastEnd = match.index + match.fullMatch.length;
    }

    // Add remaining text after last match
    if (lastEnd < testString.length) {
      segments.push({
        text: testString.slice(lastEnd),
        isMatch: false,
        matchIndex: -1,
      });
    }

    return segments;
  }, [testString, pattern, matches]);

  return (
    <div className="space-y-6">
      {/* Pattern input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Regular Expression
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-mono text-gray-400">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />
          <span className="text-lg font-mono text-gray-400">/</span>
          <span className="text-sm font-mono text-gray-500">
            {(flags.g ? "g" : "") +
              (flags.i ? "i" : "") +
              (flags.m ? "m" : "") +
              (flags.s ? "s" : "")}
          </span>
        </div>
      </div>

      {/* Flags */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Flags:
        </span>
        <div className="flex gap-2">
          {(
            [
              { key: "g" as const, label: "g", desc: "Global" },
              { key: "i" as const, label: "i", desc: "Case insensitive" },
              { key: "m" as const, label: "m", desc: "Multiline" },
              { key: "s" as const, label: "s", desc: "Dotall" },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFlag(f.key)}
              title={f.desc}
              className={`rounded-md px-3 py-1.5 text-sm font-mono font-medium transition-colors ${
                flags[f.key]
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {flags.g && "Global "}
          {flags.i && "Case-insensitive "}
          {flags.m && "Multiline "}
          {flags.s && "Dotall "}
        </span>
      </div>

      {/* Test string input */}
      <InputField
        label="Test String"
        value={testString}
        onChange={setTestString}
        placeholder="Enter text to test against the regex pattern..."
        multiline
        rows={4}
      />

      {/* Error */}
      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Match count */}
      {pattern && testString && !error && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {matches.length === 0 ? (
              "No matches found"
            ) : (
              <>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {matches.length}
                </span>{" "}
                match{matches.length !== 1 ? "es" : ""} found
              </>
            )}
          </span>
        </div>
      )}

      {/* Highlighted text */}
      {highlightedSegments && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Highlighted Matches
          </label>
          <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-mono whitespace-pre-wrap break-all">
            {highlightedSegments.map((seg, i) =>
              seg.isMatch ? (
                <mark
                  key={i}
                  className="rounded bg-yellow-200 dark:bg-yellow-700/50 px-0.5 text-gray-900 dark:text-yellow-100"
                  title={`Match ${seg.matchIndex + 1}`}
                >
                  {seg.text}
                </mark>
              ) : (
                <span
                  key={i}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {seg.text}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Match details */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Match Details
          </label>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {matches.map((match, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Match {i + 1}
                      </span>
                      <span className="text-xs text-gray-400">
                        index {match.index}
                      </span>
                    </div>
                    <code className="text-sm font-mono text-green-600 dark:text-green-400 break-all">
                      {match.fullMatch}
                    </code>
                  </div>
                </div>
                {match.groups.length > 0 && (
                  <div className="mt-2 border-t border-gray-100 dark:border-gray-800 pt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Capture Groups
                    </span>
                    <div className="mt-1 space-y-1">
                      {match.groups.map((group, gi) => (
                        <div key={gi} className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-mono">
                            ${gi + 1}:
                          </span>
                          <code className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                            {group ?? "(undefined)"}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {Object.keys(match.namedGroups).length > 0 && (
                  <div className="mt-2 border-t border-gray-100 dark:border-gray-800 pt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Named Groups
                    </span>
                    <div className="mt-1 space-y-1">
                      {Object.entries(match.namedGroups).map(([name, val]) => (
                        <div key={name} className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-mono">
                            {name}:
                          </span>
                          <code className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                            {val ?? "(undefined)"}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common patterns */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Regex Patterns
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {COMMON_PATTERNS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="flex flex-col items-start rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {ex.label}
              </span>
              <code className="mt-0.5 text-xs text-gray-500 truncate max-w-full">
                /{ex.pattern}/
              </code>
            </button>
          ))}
        </div>
      </div>

      {/* Regex cheat sheet */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Pattern
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Meaning
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Pattern
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">.</td>
                <td className="px-3 py-1.5">Any character</td>
                <td className="px-3 py-1.5 font-mono">*</td>
                <td className="px-3 py-1.5">0 or more</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">\d</td>
                <td className="px-3 py-1.5">Digit [0-9]</td>
                <td className="px-3 py-1.5 font-mono">+</td>
                <td className="px-3 py-1.5">1 or more</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">\w</td>
                <td className="px-3 py-1.5">Word char [a-zA-Z0-9_]</td>
                <td className="px-3 py-1.5 font-mono">?</td>
                <td className="px-3 py-1.5">0 or 1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">\s</td>
                <td className="px-3 py-1.5">Whitespace</td>
                <td className="px-3 py-1.5 font-mono">{"{n,m}"}</td>
                <td className="px-3 py-1.5">Between n and m</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">^</td>
                <td className="px-3 py-1.5">Start of string</td>
                <td className="px-3 py-1.5 font-mono">[abc]</td>
                <td className="px-3 py-1.5">Character set</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="px-3 py-1.5 font-mono">$</td>
                <td className="px-3 py-1.5">End of string</td>
                <td className="px-3 py-1.5 font-mono">[^abc]</td>
                <td className="px-3 py-1.5">Negated set</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 font-mono">(group)</td>
                <td className="px-3 py-1.5">Capture group</td>
                <td className="px-3 py-1.5 font-mono">a|b</td>
                <td className="px-3 py-1.5">Alternation (or)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Regular Expressions
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            Regular expressions (regex) are patterns used to match character
            combinations in strings
          </li>
          <li>
            <strong>g</strong> (global) finds all matches, <strong>i</strong>{" "}
            (case-insensitive) ignores case, <strong>m</strong> (multiline)
            makes ^ and $ match line boundaries, <strong>s</strong> (dotall)
            makes . match newlines
          </li>
          <li>
            Capture groups <code className="font-mono">()</code> extract parts
            of a match. Named groups use{" "}
            <code className="font-mono">{"(?<name>)"}</code> syntax
          </li>
          <li>
            This tool uses JavaScript&apos;s native RegExp engine and runs entirely in
            your browser
          </li>
          <li>
            Common web3 use cases: validating Ethereum addresses, parsing ABI
            signatures, extracting hex values from logs
          </li>
        </ul>
      </div>
    </div>
  );
}
