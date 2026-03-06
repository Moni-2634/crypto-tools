"use client";

import { useState, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type UuidCase = "lowercase" | "uppercase";

const COUNT_OPTIONS = [1, 5, 10, 25] as const;

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_NO_HYPHENS_REGEX =
  /^[0-9a-f]{8}[0-9a-f]{4}4[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i;

function generateUuids(
  count: number,
  caseOption: UuidCase,
  hyphens: boolean
): string[] {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    let uuid = crypto.randomUUID();
    if (!hyphens) {
      uuid = uuid.replace(/-/g, "");
    }
    if (caseOption === "uppercase") {
      uuid = uuid.toUpperCase();
    }
    uuids.push(uuid);
  }
  return uuids;
}

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>(() => [crypto.randomUUID()]);
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(1);
  const [caseOption, setCaseOption] = useState<UuidCase>("lowercase");
  const [hyphens, setHyphens] = useState(true);

  // Validation state
  const [validateInput, setValidateInput] = useState("");

  const handleGenerate = useCallback(() => {
    setUuids(generateUuids(count, caseOption, hyphens));
  }, [count, caseOption, hyphens]);

  const validationResult = (() => {
    if (!validateInput.trim()) return null;

    const trimmed = validateInput.trim();

    // Check both formats
    if (UUID_REGEX.test(trimmed)) {
      return {
        valid: true,
        message: "Valid UUID v4 (with hyphens)",
      };
    }
    if (UUID_NO_HYPHENS_REGEX.test(trimmed)) {
      return {
        valid: true,
        message: "Valid UUID v4 (without hyphens)",
      };
    }

    // Check if it's a valid UUID format but not v4
    const generalUuid =
      /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
    if (generalUuid.test(trimmed)) {
      // Extract version digit (position 14 in hyphenated, 12 in non-hyphenated)
      const noHyphens = trimmed.replace(/-/g, "");
      const version = noHyphens[12];
      return {
        valid: true,
        message: `Valid UUID v${version} format`,
      };
    }

    return {
      valid: false,
      message: "Invalid UUID format. Expected 32 hex characters with optional hyphens (8-4-4-4-12).",
    };
  })();

  return (
    <div className="space-y-6">
      {/* Generator section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Count:</span>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  count === n
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Case:</span>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setCaseOption("lowercase")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                caseOption === "lowercase"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              lowercase
            </button>
            <button
              onClick={() => setCaseOption("uppercase")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                caseOption === "uppercase"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              UPPERCASE
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Hyphens:</span>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setHyphens(true)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                hyphens
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              With Hyphens
            </button>
            <button
              onClick={() => setHyphens(false)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                !hyphens
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Without Hyphens
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Generate UUID{count > 1 ? "s" : ""}
        </button>
      </div>

      <OutputField
        label={`Generated UUID${uuids.length > 1 ? "s" : ""}`}
        value={uuids.join("\n")}
        rows={Math.min(uuids.length + 1, 12)}
      />

      {/* Separator */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Validate UUID
        </h3>

        <InputField
          label="UUID to Validate"
          value={validateInput}
          onChange={setValidateInput}
          placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
        />

        {validationResult && (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                validationResult.valid
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {validationResult.valid ? "Valid" : "Invalid"}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {validationResult.message}
            </span>
          </div>
        )}
      </div>

      {/* UUID format reference */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          UUID v4 Format
        </h3>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <code className="block text-sm text-gray-700 dark:text-gray-300">
            xxxxxxxx-xxxx-<span className="text-blue-600 dark:text-blue-400 font-bold">4</span>xxx-<span className="text-green-600 dark:text-green-400 font-bold">y</span>xxx-xxxxxxxxxxxx
          </code>
          <div className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
            <p>
              <code className="text-blue-600 dark:text-blue-400">4</code> = version number (always 4 for UUID v4)
            </p>
            <p>
              <code className="text-green-600 dark:text-green-400">y</code> = variant (8, 9, a, or b)
            </p>
            <p>
              <code>x</code> = random hex digit (0-9, a-f)
            </p>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About UUIDs
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            A UUID (Universally Unique Identifier) is a 128-bit identifier that is
            practically unique across all systems without requiring a central authority.
            UUID v4 is generated using cryptographically secure random numbers.
          </p>
          <p>
            UUID v4 has 122 random bits, giving approximately 5.3 x 10^36 possible values.
            The probability of generating a duplicate is astronomically small -- you would
            need to generate about 2.71 quintillion UUIDs to have a 50% chance of a collision.
          </p>
          <p>
            UUIDs are commonly used as database primary keys, API request identifiers,
            session tokens, and anywhere globally unique IDs are needed. This tool uses the
            native <code>crypto.randomUUID()</code> API, which provides cryptographically
            secure random generation in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
