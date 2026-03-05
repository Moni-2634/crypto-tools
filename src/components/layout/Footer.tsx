import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EVMTools. All rights
            reserved.
          </p>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
              Home
            </Link>
            <Link href="/#tools" className="hover:text-gray-700 dark:hover:text-gray-300">
              Tools
            </Link>
            <Link href="/#guides" className="hover:text-gray-700 dark:hover:text-gray-300">
              Guides
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
