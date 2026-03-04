"use client";

import CopyButton from "./CopyButton";

interface OutputFieldProps {
  label: string;
  value: string;
  rows?: number;
}

export default function OutputField({
  label,
  value,
  rows = 4,
}: OutputFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        {value && <CopyButton text={value} />}
      </div>
      <textarea
        readOnly
        value={value}
        rows={rows}
        className="w-full resize-y rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm font-mono text-gray-300 focus:outline-none"
      />
    </div>
  );
}
