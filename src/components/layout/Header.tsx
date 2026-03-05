import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          EVMTools
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-6 text-sm">
            <Link
              href="/#tools"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Crypto Tools
            </Link>
            <Link
              href="/#guides"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Guides
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
