import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          EVMTools
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link
            href="/#tools"
            className="text-gray-400 transition-colors hover:text-white"
          >
            Crypto Tools
          </Link>
          <Link
            href="/#guides"
            className="text-gray-400 transition-colors hover:text-white"
          >
            Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}
