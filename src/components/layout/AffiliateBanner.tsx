"use client";

import { getAffiliate, getAffiliatesByCategory, type AffiliateProgram } from "@/lib/affiliates";

interface AffiliateBannerProps {
  affiliateKey?: string;
  category?: AffiliateProgram["category"];
  variant?: "inline" | "card" | "minimal";
  className?: string;
}

export default function AffiliateBanner({
  affiliateKey,
  category,
  variant = "card",
  className = "",
}: AffiliateBannerProps) {
  // Get affiliate(s) to display
  const items: AffiliateProgram[] = affiliateKey
    ? ([getAffiliate(affiliateKey)].filter(Boolean) as AffiliateProgram[])
    : category
      ? getAffiliatesByCategory(category)
      : [];

  if (items.length === 0) return null;

  if (variant === "minimal") {
    // Simple text link with disclosure
    const item = items[0];
    return (
      <span className={className}>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
        >
          {item.name}
        </a>
      </span>
    );
  }

  if (variant === "inline") {
    // Single inline CTA
    const item = items[0];
    return (
      <div className={`rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4 ${className}`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Learn More
          </a>
        </div>
        <p className="mt-2 text-xs text-gray-500">Affiliate link — we may earn a commission at no extra cost to you.</p>
      </div>
    );
  }

  // Card variant - can show multiple
  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Recommended Tools</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:border-blue-400 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {item.name}
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
            <span className="mt-2 inline-block text-sm font-medium text-blue-600 dark:text-blue-400">
              Get Started &rarr;
            </span>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500">Affiliate links — we may earn a commission at no extra cost to you.</p>
    </div>
  );
}
