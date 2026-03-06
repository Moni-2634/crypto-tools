"use client";

import { useState, type FormEvent } from "react";

const STORAGE_KEY = "evmtools_newsletter_subscribers";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const existing = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      ) as string[];
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
    } catch {
      // localStorage unavailable
    }

    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mx-auto mb-2 h-8 w-8 text-green-600 dark:text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p className="font-semibold text-green-800 dark:text-green-200">
          You&apos;re subscribed!
        </p>
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">
          We&apos;ll send you the latest crypto dev tips and tool updates.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Stay up to date
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get weekly crypto dev tips and new tool updates.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 sm:flex-row flex-col">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Subscribe
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
