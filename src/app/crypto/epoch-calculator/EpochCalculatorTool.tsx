"use client";

import { useState, useEffect, useMemo } from "react";
import OutputField from "@/components/tools/OutputField";

// Beacon chain constants
const SECONDS_PER_SLOT = 12;
const SLOTS_PER_EPOCH = 32;
const BEACON_GENESIS_TIMESTAMP = 1606824023; // Dec 1, 2020 12:00:23 UTC

type InputType = "epoch" | "slot" | "timestamp" | "date";

const NOTABLE_EPOCHS = [
  {
    name: "Beacon Chain Genesis",
    epoch: 0,
    date: "Dec 1, 2020",
    description: "Beacon chain launched",
  },
  {
    name: "The Merge (Bellatrix)",
    epoch: 144896,
    date: "Sep 6, 2022",
    description: "Bellatrix upgrade activated",
  },
  {
    name: "The Merge (Paris)",
    epoch: 146875,
    date: "Sep 15, 2022",
    description: "Ethereum transitioned to Proof of Stake",
  },
  {
    name: "Shanghai / Capella",
    epoch: 194048,
    date: "Apr 12, 2023",
    description: "Staking withdrawals enabled",
  },
  {
    name: "Dencun / Deneb",
    epoch: 269568,
    date: "Mar 13, 2024",
    description: "Proto-danksharding (EIP-4844) activated",
  },
];

function epochToSlot(epoch: number): number {
  return epoch * SLOTS_PER_EPOCH;
}

function slotToEpoch(slot: number): number {
  return Math.floor(slot / SLOTS_PER_EPOCH);
}

function slotToTimestamp(slot: number): number {
  return BEACON_GENESIS_TIMESTAMP + slot * SECONDS_PER_SLOT;
}

function timestampToSlot(timestamp: number): number {
  return Math.floor((timestamp - BEACON_GENESIS_TIMESTAMP) / SECONDS_PER_SLOT);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toUTCString();
}

function formatLocalDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

export default function EpochCalculatorTool() {
  const [inputType, setInputType] = useState<InputType>("epoch");
  const [inputValue, setInputValue] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState("");
  const [currentSlot, setCurrentSlot] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [now, setNow] = useState(0);

  // Live update current epoch/slot
  useEffect(() => {
    const update = () => {
      const timestamp = Math.floor(Date.now() / 1000);
      setNow(timestamp);
      const slot = timestampToSlot(timestamp);
      setCurrentSlot(slot);
      setCurrentEpoch(slotToEpoch(slot));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const result = useMemo(() => {
    setError("");

    if (inputType === "date") {
      if (!dateInput) return null;
      try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) throw new Error("Invalid date");
        const timestamp = Math.floor(date.getTime() / 1000);
        if (timestamp < BEACON_GENESIS_TIMESTAMP) {
          throw new Error("Date is before Beacon Chain genesis (Dec 1, 2020)");
        }
        const slot = timestampToSlot(timestamp);
        const epoch = slotToEpoch(slot);
        const slotInEpoch = slot % SLOTS_PER_EPOCH;
        return { epoch, slot, slotInEpoch, timestamp, utcDate: formatDate(timestamp), localDate: formatLocalDate(timestamp) };
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid date");
        return null;
      }
    }

    if (!inputValue.trim()) return null;

    try {
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 0) throw new Error("Enter a non-negative integer.");

      let epoch: number, slot: number, timestamp: number;

      if (inputType === "epoch") {
        epoch = num;
        slot = epochToSlot(epoch);
        timestamp = slotToTimestamp(slot);
      } else if (inputType === "slot") {
        slot = num;
        epoch = slotToEpoch(slot);
        timestamp = slotToTimestamp(slot);
      } else {
        // timestamp
        timestamp = num;
        if (timestamp < BEACON_GENESIS_TIMESTAMP) {
          throw new Error("Timestamp is before Beacon Chain genesis (1606824023)");
        }
        slot = timestampToSlot(timestamp);
        epoch = slotToEpoch(slot);
      }

      const slotInEpoch = slot % SLOTS_PER_EPOCH;

      return {
        epoch,
        slot,
        slotInEpoch,
        timestamp,
        utcDate: formatDate(timestamp),
        localDate: formatLocalDate(timestamp),
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation failed.");
      return null;
    }
  }, [inputType, inputValue, dateInput]);

  const inputTypes: { value: InputType; label: string }[] = [
    { value: "epoch", label: "Epoch" },
    { value: "slot", label: "Slot" },
    { value: "timestamp", label: "Timestamp" },
    { value: "date", label: "Date" },
  ];

  return (
    <div className="space-y-6">
      {/* Live current values */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Current Epoch
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {currentEpoch.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Current Slot
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {currentSlot.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Slot in Epoch
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {currentSlot % SLOTS_PER_EPOCH} / {SLOTS_PER_EPOCH}
          </p>
        </div>
      </div>

      {/* Input type selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Convert from:
        </span>
        <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          {inputTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setInputType(t.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                inputType === t.value
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input field */}
      {inputType === "date" ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {inputType === "epoch"
              ? "Epoch Number"
              : inputType === "slot"
              ? "Slot Number"
              : "Unix Timestamp"}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              inputType === "epoch"
                ? `e.g. ${currentEpoch}`
                : inputType === "slot"
                ? `e.g. ${currentSlot}`
                : `e.g. ${now}`
            }
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Quick fill current */}
      <button
        onClick={() => {
          if (inputType === "epoch") setInputValue(String(currentEpoch));
          else if (inputType === "slot") setInputValue(String(currentSlot));
          else if (inputType === "timestamp") setInputValue(String(now));
          else {
            const d = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            setDateInput(
              `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
            );
          }
        }}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Use Current Value
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-4">
          <OutputField label="Epoch" value={result.epoch.toLocaleString()} rows={1} />
          <OutputField
            label={`Slot (slot ${result.slotInEpoch} of epoch)`}
            value={result.slot.toLocaleString()}
            rows={1}
          />
          <OutputField label="Unix Timestamp" value={String(result.timestamp)} rows={1} />
          <OutputField label="UTC Date" value={result.utcDate} rows={1} />
          <OutputField label="Local Date" value={result.localDate} rows={1} />
        </div>
      )}

      {/* Notable epochs */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Notable Ethereum Epochs
        </h3>
        <div className="space-y-2">
          {NOTABLE_EPOCHS.map((ne) => (
            <button
              key={ne.epoch}
              onClick={() => {
                setInputType("epoch");
                setInputValue(String(ne.epoch));
              }}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ne.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {ne.description}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                  Epoch {ne.epoch.toLocaleString()}
                </span>
                <span className="ml-2 text-xs text-gray-500">{ne.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Reference
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>1 slot = {SECONDS_PER_SLOT} seconds</li>
          <li>1 epoch = {SLOTS_PER_EPOCH} slots = {SLOTS_PER_EPOCH * SECONDS_PER_SLOT / 60} minutes</li>
          <li>~225 epochs per day</li>
          <li>Beacon Chain genesis: Dec 1, 2020 12:00:23 UTC (timestamp {BEACON_GENESIS_TIMESTAMP})</li>
        </ul>
      </div>
    </div>
  );
}
