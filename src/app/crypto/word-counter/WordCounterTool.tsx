"use client";

import { useState, useMemo, useCallback } from "react";

interface Stats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
}

function countStats(text: string): Stats {
  if (!text.trim()) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: "0 sec",
      speakingTime: "0 sec",
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;
  const lines = text.split("\n").length;

  // Average reading speed: 238 words per minute
  const readingMinutes = words / 238;
  const readingTime =
    readingMinutes < 1
      ? `${Math.max(1, Math.round(readingMinutes * 60))} sec`
      : `${Math.round(readingMinutes)} min`;

  // Average speaking speed: 150 words per minute
  const speakingMinutes = words / 150;
  const speakingTime =
    speakingMinutes < 1
      ? `${Math.max(1, Math.round(speakingMinutes * 60))} sec`
      : `${Math.round(speakingMinutes)} min`;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
  };
}

function getTopWords(text: string, limit: number): { word: string; count: number }[] {
  if (!text.trim()) return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

const SAMPLE_TEXTS = [
  {
    label: "Short paragraph",
    text: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet. It is commonly used for font testing and typing practice.",
  },
  {
    label: "Multi-paragraph",
    text: "Web development has evolved significantly over the past decade. Modern frameworks like React and Next.js have changed how developers build user interfaces.\n\nTypeScript has become the standard for large codebases, offering type safety and better developer experience. Tools like ESLint and Prettier ensure consistent code quality.\n\nThe shift toward serverless architecture and edge computing continues to shape the industry, making applications faster and more scalable than ever before.",
  },
];

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => countStats(text), [text]);
  const topWords = useMemo(() => getTopWords(text, 10), [text]);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText(t);
    } catch {
      // Clipboard not available
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.characters },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
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
          placeholder="Start typing or paste your text here to count words, characters, sentences, and paragraphs..."
          rows={10}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 resize-y"
        />
      </div>

      {/* Detailed stats */}
      {text.trim() && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Detailed Statistics
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Characters (no spaces)</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.charactersNoSpaces.toLocaleString()}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Lines</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.lines.toLocaleString()}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Reading time</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.readingTime}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Speaking time</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {stats.speakingTime}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top words */}
      {topWords.length > 0 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Top Words by Frequency
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {topWords.map((item) => (
              <div
                key={item.word}
                className="flex items-center justify-between rounded border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm"
              >
                <span className="text-gray-700 dark:text-gray-300 truncate mr-2">
                  {item.word}
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400 text-xs">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
        </h3>
        <div className="space-y-2">
          {SAMPLE_TEXTS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setText(ex.text)}
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
          About Word Counter
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This word counter provides instant statistics as you type or paste text.
            It counts words, characters (with and without spaces), sentences, paragraphs,
            and lines. It also estimates reading and speaking time based on average rates
            of 238 and 150 words per minute respectively.
          </p>
          <p>
            All processing happens locally in your browser. No text is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
