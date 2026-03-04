import Link from "next/link";
import { tools, guides } from "@/lib/tools";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav className="sticky top-4 space-y-6">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Crypto Tools
          </h3>
          <ul className="space-y-1">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/crypto/${tool.slug}`}
                  className="block rounded px-2 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Guides
          </h3>
          <ul className="space-y-1">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="block rounded px-2 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  {guide.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
