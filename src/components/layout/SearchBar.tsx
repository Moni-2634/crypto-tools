"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tools, guides, type Tool } from "@/lib/tools";

interface SearchResult {
  tool: Tool;
  href: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback((q: string): { tools: SearchResult[]; guides: SearchResult[] } => {
    const trimmed = q.trim().toLowerCase();
    if (!trimmed) return { tools: [], guides: [] };

    const matchTool = (t: Tool): boolean =>
      t.name.toLowerCase().includes(trimmed) ||
      t.description.toLowerCase().includes(trimmed);

    const matchedTools = tools
      .filter(matchTool)
      .map((t) => ({ tool: t, href: `/crypto/${t.slug}` }));

    const matchedGuides = guides
      .filter(matchTool)
      .map((t) => ({ tool: t, href: `/guides/${t.slug}` }));

    return { tools: matchedTools, guides: matchedGuides };
  }, []);

  const results = search(query);
  const allResults = [...results.tools, ...results.guides];
  const hasResults = allResults.length > 0;
  const hasQuery = query.trim().length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < allResults.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : allResults.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < allResults.length) {
          router.push(allResults[activeIndex].href);
          setIsOpen(false);
          setQuery("");
          inputRef.current?.blur();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0) return;
    const el = containerRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search tools & guides..."
          className="w-48 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:w-64 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-600 dark:focus:bg-gray-900 dark:focus:ring-blue-600"
        />
      </div>

      {/* Dropdown */}
      {isOpen && hasQuery && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {!hasResults ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No results for &ldquo;{query.trim()}&rdquo;
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {/* Tools section */}
              {results.tools.length > 0 && (
                <div>
                  <div className="sticky top-0 bg-gray-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    Tools
                  </div>
                  {results.tools.map((item, i) => {
                    const globalIndex = i;
                    return (
                      <Link
                        key={item.tool.slug}
                        href={item.href}
                        data-index={globalIndex}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery("");
                        }}
                        className={`block px-3 py-2 transition-colors ${
                          activeIndex === globalIndex
                            ? "bg-blue-50 dark:bg-blue-950"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.tool.name}
                        </div>
                        <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                          {item.tool.description}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Guides section */}
              {results.guides.length > 0 && (
                <div>
                  <div className="sticky top-0 bg-gray-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    Guides
                  </div>
                  {results.guides.map((item, i) => {
                    const globalIndex = results.tools.length + i;
                    return (
                      <Link
                        key={item.tool.slug}
                        href={item.href}
                        data-index={globalIndex}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery("");
                        }}
                        className={`block px-3 py-2 transition-colors ${
                          activeIndex === globalIndex
                            ? "bg-blue-50 dark:bg-blue-950"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.tool.name}
                        </div>
                        <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                          {item.tool.description}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
