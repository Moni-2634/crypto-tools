"use client";

import { useState, useRef, useEffect } from "react";

const DONATION_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function DonationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text for manual copy
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        Support EVMTools
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 z-50 mb-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-3 text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Buy us a coffee!
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If EVMTools saves you time, consider sending a small tip to keep it
              running.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
              ETH / EVM Address
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-gray-100 px-2 py-1.5 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {DONATION_ADDRESS}
              </code>
              <button
                onClick={copyAddress}
                className="shrink-0 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500">
              Works on Ethereum, Polygon, Arbitrum, Base, etc.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
