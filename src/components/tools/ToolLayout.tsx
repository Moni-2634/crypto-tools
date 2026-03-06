import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import { getToolBySlug, getRelatedItems, getTryAlsoTools } from "@/lib/tools";
import { SITE_URL, generateBreadcrumbJsonLd } from "@/lib/seo";

interface ToolLayoutProps {
  slug: string;
  children: React.ReactNode;
}

export default function ToolLayout({ slug, children }: ToolLayoutProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const related = getRelatedItems(tool);
  const tryAlso = getTryAlsoTools(tool, 3);
  const isGuide = tool.category === "guides";
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    {
      name: isGuide ? "Guides" : "Crypto Tools",
      url: `${SITE_URL}/#${isGuide ? "guides" : "tools"}`,
    },
    {
      name: tool.name,
      url: `${SITE_URL}/${isGuide ? "guides" : "crypto"}/${tool.slug}`,
    },
  ]);

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AdSlot slotId="top-banner" format="horizontal" className="mb-4" />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{tool.description}</p>
      </div>

      <div>{children}</div>

      {!isGuide && (
        <AdSlot slotId="after-tool" format="horizontal" className="mt-8" />
      )}

      {related.length > 0 && (
        <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools & Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.category === "guides" ? "guides" : "crypto"}/${item.slug}`}
                className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-800/50"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {tryAlso.length > 0 && (
        <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Try Also
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {tryAlso.map((item) => (
              <Link
                key={item.slug}
                href={`/crypto/${item.slug}`}
                className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
