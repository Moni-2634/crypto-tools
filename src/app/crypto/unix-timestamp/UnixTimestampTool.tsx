"use client";

import { useState, useEffect, useCallback } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "toDate" | "toTimestamp";

const ETH_TIMESTAMPS = [
  { name: "Ethereum Genesis", timestamp: 1438269973, date: "2015-07-30 15:26:13 UTC" },
  { name: "The DAO Fork", timestamp: 1468977640, date: "2016-07-20 01:20:40 UTC" },
  { name: "The Merge", timestamp: 1663224162, date: "2022-09-15 06:42:42 UTC" },
  { name: "Shanghai Upgrade", timestamp: 1681338455, date: "2023-04-12 22:27:35 UTC" },
  { name: "Dencun Upgrade", timestamp: 1710338135, date: "2024-03-13 13:55:35 UTC" },
];

function getRelativeTime(timestampSec: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestampSec;
  const absDiff = Math.abs(diff);
  const suffix = diff >= 0 ? "ago" : "from now";

  if (absDiff < 60) return `${absDiff} second${absDiff !== 1 ? "s" : ""} ${suffix}`;
  const minutes = Math.floor(absDiff / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ${suffix}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ${suffix}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ${suffix}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ${suffix}`;
  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""} ${suffix}`;
}

function padZero(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function UnixTimestampTool() {
  const [tab, setTab] = useState<Tab>("toDate");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => setCurrentTime(Math.floor(Date.now() / 1000).toString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Live current timestamp */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Unix Timestamp
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-gray-900 dark:text-white">
              {currentTime}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">UTC</p>
            <p className="mt-1 text-sm text-gray-500">{new Date().toUTCString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setTab("toDate")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "toDate"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Timestamp to Date
        </button>
        <button
          onClick={() => setTab("toTimestamp")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "toTimestamp"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Date to Timestamp
        </button>
      </div>

      {tab === "toDate" ? (
        <TimestampToDatePanel currentTime={currentTime} />
      ) : (
        <DateToTimestampPanel />
      )}

      {/* Ethereum timestamps reference */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Notable Ethereum Timestamps
        </h3>
        <div className="space-y-2">
          {ETH_TIMESTAMPS.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
              <span className="font-mono text-gray-500">
                {item.timestamp} ({item.date})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimestampToDatePanel({ currentTime }: { currentTime: string }) {
  const [timestamp, setTimestamp] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = useCallback((value: string) => {
    setTimestamp(value);
    setError("");
    setOutput("");

    if (!value.trim()) return;

    try {
      const trimmed = value.trim();
      if (!/^\d+$/.test(trimmed)) {
        setError("Please enter a valid Unix timestamp (positive integer).");
        return;
      }

      let seconds = Number(trimmed);

      // Auto-detect milliseconds (timestamps after year 10000 in seconds)
      const isMilliseconds = seconds > 9999999999;
      const milliseconds = isMilliseconds ? seconds : seconds * 1000;
      if (isMilliseconds) seconds = Math.floor(seconds / 1000);

      const date = new Date(milliseconds);
      if (isNaN(date.getTime())) {
        setError("Invalid timestamp value.");
        return;
      }

      const lines = [
        `UTC:        ${date.toUTCString()}`,
        `ISO 8601:   ${date.toISOString()}`,
        `Local:      ${date.toString()}`,
        ``,
        `Seconds:    ${seconds}`,
        `Milliseconds: ${milliseconds}`,
        ``,
        `Relative:   ${getRelativeTime(seconds)}`,
      ];

      if (isMilliseconds) {
        lines.push(``, `Note: Input was detected as milliseconds.`);
      }

      setOutput(lines.join("\n"));
    } catch {
      setError("Failed to convert timestamp.");
    }
  }, []);

  const fillCurrentTime = () => {
    convert(currentTime);
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Unix Timestamp"
        value={timestamp}
        onChange={convert}
        placeholder="e.g. 1438269973"
      />
      <button
        onClick={fillCurrentTime}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Current Timestamp
      </button>
      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <OutputField label="Converted Date" value={output} rows={8} />
    </div>
  );
}

function DateToTimestampPanel() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [dateString, setDateString] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [useFields, setUseFields] = useState(true);

  const convertFromFields = useCallback(() => {
    setError("");
    setOutput("");

    if (!year) {
      setError("Please enter at least a year.");
      return;
    }

    try {
      const y = parseInt(year, 10);
      const m = parseInt(month || "1", 10) - 1;
      const d = parseInt(day || "1", 10);
      const h = parseInt(hour || "0", 10);
      const min = parseInt(minute || "0", 10);
      const s = parseInt(second || "0", 10);

      const date = new Date(Date.UTC(y, m, d, h, min, s));
      if (isNaN(date.getTime())) {
        setError("Invalid date values.");
        return;
      }

      // Fix year for years 0-99
      if (y >= 0 && y < 100) {
        date.setUTCFullYear(y);
      }

      const seconds = Math.floor(date.getTime() / 1000);
      const milliseconds = date.getTime();

      const lines = [
        `Unix Timestamp (seconds):      ${seconds}`,
        `Unix Timestamp (milliseconds): ${milliseconds}`,
        ``,
        `UTC:        ${date.toUTCString()}`,
        `ISO 8601:   ${date.toISOString()}`,
        ``,
        `Relative:   ${getRelativeTime(seconds)}`,
      ];
      setOutput(lines.join("\n"));
    } catch {
      setError("Failed to convert date.");
    }
  }, [year, month, day, hour, minute, second]);

  const convertFromString = useCallback(() => {
    setError("");
    setOutput("");

    if (!dateString.trim()) {
      setError("Please enter a date string.");
      return;
    }

    try {
      const date = new Date(dateString.trim());
      if (isNaN(date.getTime())) {
        setError("Could not parse date string. Try formats like: 2023-09-15, Sep 15 2023, 2023-09-15T06:42:42Z");
        return;
      }

      const seconds = Math.floor(date.getTime() / 1000);
      const milliseconds = date.getTime();

      const lines = [
        `Unix Timestamp (seconds):      ${seconds}`,
        `Unix Timestamp (milliseconds): ${milliseconds}`,
        ``,
        `UTC:        ${date.toUTCString()}`,
        `ISO 8601:   ${date.toISOString()}`,
        ``,
        `Relative:   ${getRelativeTime(seconds)}`,
      ];
      setOutput(lines.join("\n"));
    } catch {
      setError("Failed to parse date string.");
    }
  }, [dateString]);

  return (
    <div className="space-y-4">
      {/* Toggle between field and string input */}
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setUseFields(true)}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            useFields
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Date Fields
        </button>
        <button
          onClick={() => setUseFields(false)}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            !useFields
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Date String
        </button>
      </div>

      {useFields ? (
        <>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Month</label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Day</label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Hour</label>
              <input
                type="number"
                min="0"
                max="23"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Minute</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Second</label>
              <input
                type="number"
                min="0"
                max="59"
                value={second}
                onChange={(e) => setSecond(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">All values are in UTC. Month and day default to 1, time defaults to 00:00:00.</p>
          <button
            onClick={convertFromFields}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Convert to Timestamp
          </button>
        </>
      ) : (
        <>
          <InputField
            label="Date String"
            value={dateString}
            onChange={setDateString}
            placeholder="e.g. 2023-09-15T06:42:42Z, Sep 15 2023, 2024-01-01"
          />
          <button
            onClick={convertFromString}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Convert to Timestamp
          </button>
        </>
      )}

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <OutputField label="Result" value={output} rows={7} />
    </div>
  );
}
