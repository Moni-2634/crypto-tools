"use client";

import { useState, useMemo, useCallback } from "react";
import InputField from "@/components/tools/InputField";

// Cron field definitions
const FIELD_NAMES = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"] as const;
const FIELD_RANGES: [number, number][] = [
  [0, 59],
  [0, 23],
  [1, 31],
  [1, 12],
  [0, 6],
];

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function parseField(field: string, min: number, max: number): number[] | null {
  const values = new Set<number>();

  for (const part of field.split(",")) {
    // Handle step values
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    const step = stepMatch ? parseInt(stepMatch[2], 10) : 1;
    const range = stepMatch ? stepMatch[1] : part;

    if (range === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes("-")) {
      const [startStr, endStr] = range.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) return null;
      for (let i = start; i <= end; i += step) values.add(i);
    } else {
      const val = parseInt(range, 10);
      if (isNaN(val) || val < min || val > max) return null;
      if (step === 1) {
        values.add(val);
      } else {
        for (let i = val; i <= max; i += step) values.add(i);
      }
    }
  }

  return Array.from(values).sort((a, b) => a - b);
}

function describeCronField(field: string, idx: number): string {
  const [min, max] = FIELD_RANGES[idx];
  const name = FIELD_NAMES[idx];

  if (field === "*") return `every ${name.toLowerCase()}`;

  const stepMatch = field.match(/^\*\/(\d+)$/);
  if (stepMatch) return `every ${stepMatch[1]} ${name.toLowerCase()}(s)`;

  const values = parseField(field, min, max);
  if (!values || values.length === 0) return `invalid ${name.toLowerCase()}`;

  if (idx === 4) {
    return values.map((v) => DAY_NAMES[v] || v).join(", ");
  }
  if (idx === 3) {
    return values.map((v) => MONTH_NAMES[v] || v).join(", ");
  }
  return values.join(", ");
}

function describeCron(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression. Expected 5 fields.";

  const [minute, hour, dom, month, dow] = parts;
  const descriptions: string[] = [];

  // Build human-readable description
  if (minute === "*" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Every minute";
  }

  if (minute === "0" && hour === "0" && dom === "*" && month === "*" && dow === "*") {
    return "Every day at midnight (00:00)";
  }

  if (minute === "0" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Every hour at minute 0";
  }

  // Minutes
  if (minute !== "*") {
    const stepMatch = minute.match(/^\*\/(\d+)$/);
    if (stepMatch) {
      descriptions.push(`every ${stepMatch[1]} minutes`);
    } else {
      descriptions.push(`at minute ${describeCronField(minute, 0)}`);
    }
  }

  // Hours
  if (hour !== "*") {
    const stepMatch = hour.match(/^\*\/(\d+)$/);
    if (stepMatch) {
      descriptions.push(`every ${stepMatch[1]} hours`);
    } else {
      descriptions.push(`at hour ${describeCronField(hour, 1)}`);
    }
  }

  // Day of month
  if (dom !== "*") {
    descriptions.push(`on day ${describeCronField(dom, 2)} of the month`);
  }

  // Month
  if (month !== "*") {
    descriptions.push(`in ${describeCronField(month, 3)}`);
  }

  // Day of week
  if (dow !== "*") {
    descriptions.push(`on ${describeCronField(dow, 4)}`);
  }

  return descriptions.join(", ") || "Every minute";
}

function getNextRuns(expression: string, count: number = 10): Date[] | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;

  const parsedFields = parts.map((p, i) =>
    parseField(p, FIELD_RANGES[i][0], FIELD_RANGES[i][1])
  );

  if (parsedFields.some((f) => f === null)) return null;

  const [minutes, hours, doms, months, dows] = parsedFields as number[][];
  const results: Date[] = [];
  const now = new Date();
  const current = new Date(now);
  current.setSeconds(0, 0);
  current.setMinutes(current.getMinutes() + 1);

  // Search up to 2 years ahead
  const limit = new Date(now);
  limit.setFullYear(limit.getFullYear() + 2);

  while (results.length < count && current < limit) {
    if (
      months.includes(current.getMonth() + 1) &&
      doms.includes(current.getDate()) &&
      dows.includes(current.getDay()) &&
      hours.includes(current.getHours()) &&
      minutes.includes(current.getMinutes())
    ) {
      results.push(new Date(current));
    }
    current.setMinutes(current.getMinutes() + 1);
  }

  return results;
}

const EXAMPLES = [
  { label: "Every minute", input: "* * * * *", note: "Runs every minute" },
  { label: "Every 5 minutes", input: "*/5 * * * *", note: "Common interval" },
  { label: "Every hour", input: "0 * * * *", note: "On the hour" },
  { label: "Daily at midnight", input: "0 0 * * *", note: "Once per day" },
  { label: "Daily at 9 AM", input: "0 9 * * *", note: "Business hours" },
  { label: "Every Monday", input: "0 0 * * 1", note: "Weekly" },
  { label: "First of month", input: "0 0 1 * *", note: "Monthly" },
  { label: "Weekdays at 6 PM", input: "0 18 * * 1-5", note: "Mon-Fri" },
];

export default function CronParserTool() {
  const [input, setInput] = useState("*/5 * * * *");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const parts = input.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { error: "Invalid cron expression. Expected 5 space-separated fields: minute hour day-of-month month day-of-week", description: "", nextRuns: null, fields: null };
    }

    const fields = parts.map((p, i) => ({
      name: FIELD_NAMES[i],
      value: p,
      range: `${FIELD_RANGES[i][0]}-${FIELD_RANGES[i][1]}`,
      parsed: parseField(p, FIELD_RANGES[i][0], FIELD_RANGES[i][1]),
      description: describeCronField(p, i),
    }));

    const hasError = fields.some((f) => f.parsed === null);
    if (hasError) {
      return { error: "One or more fields contain invalid values.", description: "", nextRuns: null, fields };
    }

    return {
      error: "",
      description: describeCron(input),
      nextRuns: getNextRuns(input),
      fields,
    };
  }, [input]);

  const handleClear = useCallback(() => setInput(""), []);

  return (
    <div className="space-y-6">
      <InputField
        label="Cron Expression"
        value={input}
        onChange={setInput}
        placeholder="*/5 * * * *"
      />

      {/* Quick reference */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Field Reference
        </h3>
        <div className="grid grid-cols-5 gap-2 text-xs text-center">
          {FIELD_NAMES.map((name, i) => (
            <div key={name}>
              <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {input.trim().split(/\s+/)[i] || "*"}
              </div>
              <div className="text-gray-500 dark:text-gray-400 mt-1">{name}</div>
              <div className="text-gray-400 dark:text-gray-500">
                ({FIELD_RANGES[i][0]}-{FIELD_RANGES[i][1]})
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Clear
        </button>
      </div>

      {result?.error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {result.error}
        </p>
      )}

      {/* Description */}
      {result?.description && !result.error && (
        <div className="rounded-lg border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-4 py-3">
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            {result.description}
          </span>
        </div>
      )}

      {/* Field breakdown */}
      {result?.fields && !result.error && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Field Breakdown
          </h3>
          <div className="space-y-2">
            {result.fields.map((f) => (
              <div
                key={f.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-500 dark:text-gray-400 w-32">
                  {f.name}
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400 w-16 text-center">
                  {f.value}
                </span>
                <span className="text-gray-700 dark:text-gray-300 flex-1 text-right">
                  {f.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next runs */}
      {result?.nextRuns && result.nextRuns.length > 0 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Next 10 Run Times
          </h3>
          <div className="space-y-1.5">
            {result.nextRuns.map((date, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm"
              >
                <span className="text-gray-400 dark:text-gray-500 w-6 text-right">
                  {i + 1}.
                </span>
                <span className="font-mono text-gray-700 dark:text-gray-300">
                  {date.toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cheat sheet */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Syntax Cheat Sheet
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {[
            { symbol: "*", meaning: "Any value" },
            { symbol: "5", meaning: "Exact value (e.g., 5)" },
            { symbol: "1-5", meaning: "Range (1 through 5)" },
            { symbol: "1,3,5", meaning: "List (1, 3, and 5)" },
            { symbol: "*/5", meaning: "Every 5th value" },
            { symbol: "1-10/2", meaning: "Every 2nd value from 1 to 10" },
          ].map((item) => (
            <div key={item.symbol} className="flex gap-3">
              <code className="font-mono text-blue-600 dark:text-blue-400 w-16">
                {item.symbol}
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                {item.meaning}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.input)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <div className="flex items-center gap-3">
                <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                  {ex.input}
                </code>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {ex.label}
                </span>
              </div>
              <span className="text-xs text-gray-500">{ex.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Cron Expression Parser
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Cron expressions are used to schedule recurring tasks in Unix-like operating systems,
            CI/CD pipelines, cloud functions, and job schedulers. A standard cron expression has
            5 fields: minute, hour, day of month, month, and day of week.
          </p>
          <p>
            This tool parses any standard 5-field cron expression, provides a human-readable
            description, shows the next 10 scheduled run times, and breaks down each field
            for easy understanding.
          </p>
          <p>
            All processing happens client-side in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
