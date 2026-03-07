import Link from "next/link";
import { tools } from "@/lib/tools";

const popularSlugs = [
  "json-formatter",
  "sha256-hash",
  "password-generator",
  "qr-code-generator",
  "word-counter",
  "uuid-generator",
];

export default function NotFound() {
  const popularTools = popularSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Page Not Found
      </h2>
      <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
        The page you are looking for does not exist or has been moved. Try one of
        our popular tools below or head back to the homepage.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Back to Homepage
      </Link>

      <div className="mt-12 w-full max-w-2xl">
        <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
          Popular Tools
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {popularTools.map((tool) => (
            <Link
              key={tool!.slug}
              href={`/crypto/${tool!.slug}`}
              className="group rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {tool!.name}
              </h4>
              <p className="mt-1 text-sm text-gray-500">{tool!.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
