"use client";

import { useState, useMemo, useCallback } from "react";
import OutputField from "@/components/tools/OutputField";

type GenerateMode = "paragraphs" | "sentences" | "words";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "cras", "justo", "odio",
  "dapibus", "ac", "facilisis", "egestas", "maecenas", "faucibus", "interdum",
  "posuere", "viverra", "accumsan", "lacus", "vel", "augue", "laoreet",
  "hendrerit", "malesuada", "blandit", "turpis", "cursus", "leo", "integer",
  "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc", "faucibus",
  "vitae", "aliquet", "nec", "ullamcorper", "arcu", "bibendum", "at",
  "volutpat", "diam", "sollicitudin", "proin", "gravida", "porta", "nibh",
  "tellus", "molestie", "nunc", "neque", "aliquam", "vestibulum", "lectus",
  "mauris", "ultrices", "eros", "tincidunt", "euismod", "pellentesque",
  "habitant", "senectus", "netus", "massa", "pretium", "vulputate", "sapien",
  "ornare", "aenean", "pharetra", "convallis", "risus", "sagittis", "orci",
  "tortor", "dignissim", "condimentum", "elementum", "pulvinar", "etiam",
  "placerat", "libero", "suspendisse", "potenti", "nullam", "congue",
  "mattis", "rhoncus", "urna", "donec", "purus", "semper", "quis",
  "venenatis", "tristique", "magna", "eget", "felis", "imperdiet",
  "sodales", "natoque", "penatibus", "magnis", "dis", "parturient", "montes",
  "nascetur", "ridiculus", "mus", "sociis",
];

const FIRST_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function getRandomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateSentence(minWords: number, maxWords: number): string {
  const length = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(getRandomWord());
  }
  // Add a comma in longer sentences
  if (length > 6 && Math.random() > 0.4) {
    const commaPos = 3 + Math.floor(Math.random() * (length - 5));
    words[commaPos] = words[commaPos] + ",";
  }
  return capitalize(words.join(" ")) + ".";
}

function generateParagraph(sentenceCount: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(6, 15));
  }
  return sentences.join(" ");
}

function generateText(
  mode: GenerateMode,
  count: number,
  startWithLorem: boolean
): string {
  if (count <= 0) return "";

  if (mode === "words") {
    const words: string[] = [];
    if (startWithLorem) {
      words.push("Lorem", "ipsum", "dolor", "sit", "amet");
    }
    while (words.length < count) {
      words.push(getRandomWord());
    }
    return capitalize(words.slice(0, count).join(" ")) + ".";
  }

  if (mode === "sentences") {
    const sentences: string[] = [];
    if (startWithLorem) {
      sentences.push(FIRST_SENTENCE);
    }
    while (sentences.length < count) {
      sentences.push(generateSentence(6, 15));
    }
    return sentences.slice(0, count).join(" ");
  }

  // paragraphs
  const paragraphs: string[] = [];
  if (startWithLorem) {
    const firstParagraph = FIRST_SENTENCE + " " + generateParagraph(3);
    paragraphs.push(firstParagraph);
  }
  while (paragraphs.length < count) {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    paragraphs.push(generateParagraph(sentenceCount));
  }
  return paragraphs.slice(0, count).join("\n\n");
}

export default function LoremIpsumGeneratorTool() {
  const [mode, setMode] = useState<GenerateMode>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [seed, setSeed] = useState(0);

  const output = useMemo(
    () => generateText(mode, count, startWithLorem),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, count, startWithLorem, seed]
  );

  const wordCount = useMemo(
    () =>
      output
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length,
    [output]
  );

  const charCount = output.length;
  const paragraphCount = output.split("\n\n").filter((p) => p.trim()).length;

  const handleRegenerate = useCallback(() => {
    setSeed((s) => s + 1);
  }, []);

  const maxCount = mode === "words" ? 500 : mode === "sentences" ? 50 : 20;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Generate:
        </span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {(["paragraphs", "sentences", "words"] as GenerateMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                if (m === "words" && count < 10) setCount(50);
                else if (m === "sentences" && count > 50) setCount(5);
                else if (m === "paragraphs" && count > 20) setCount(3);
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Count and options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Count:
          </label>
          <input
            type="number"
            min={1}
            max={maxCount}
            value={count}
            onChange={(e) =>
              setCount(
                Math.max(1, Math.min(maxCount, parseInt(e.target.value) || 1))
              )
            }
            className="w-20 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-mono text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (max {maxCount})
          </span>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          Start with &quot;Lorem ipsum...&quot;
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleRegenerate}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Regenerate
        </button>
      </div>

      {/* Output */}
      <OutputField label="Generated Text" value={output} rows={12} />

      {/* Stats */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Output Stats
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Words</span>
            <p className="font-mono text-blue-600 dark:text-blue-400">
              {wordCount.toLocaleString()}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Characters</span>
            <p className="font-mono text-blue-600 dark:text-blue-400">
              {charCount.toLocaleString()}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Paragraphs</span>
            <p className="font-mono text-blue-600 dark:text-blue-400">
              {paragraphCount}
            </p>
          </div>
        </div>
      </div>

      {/* Quick presets */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Presets
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "1 Paragraph", mode: "paragraphs" as GenerateMode, count: 1 },
            { label: "3 Paragraphs", mode: "paragraphs" as GenerateMode, count: 3 },
            { label: "5 Paragraphs", mode: "paragraphs" as GenerateMode, count: 5 },
            { label: "5 Sentences", mode: "sentences" as GenerateMode, count: 5 },
            { label: "50 Words", mode: "words" as GenerateMode, count: 50 },
            { label: "100 Words", mode: "words" as GenerateMode, count: 100 },
            { label: "200 Words", mode: "words" as GenerateMode, count: 200 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMode(preset.mode);
                setCount(preset.count);
                setSeed((s) => s + 1);
              }}
              className="rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Lorem Ipsum Generator
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Lorem ipsum is placeholder text commonly used in the printing and typesetting
            industry since the 1500s. It is derived from a work by Cicero written in 45 BC,
            making it over 2000 years old. Designers and developers use it to fill layouts
            with realistic-looking text before final content is available.
          </p>
          <p>
            This generator creates random lorem ipsum text by paragraphs, sentences, or word
            count. All text is generated locally in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
