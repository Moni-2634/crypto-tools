import type { Metadata } from "next";
import Link from "next/link";
import { tools, guides } from "@/lib/tools";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "EVMTools - Free Ethereum & Crypto Developer Tools",
  description:
    "Free online tools for Ethereum developers: ABI encoder, Keccak256 hash, BIP39 mnemonic generator, gas calculator, unit converter, and more.",
  openGraph: {
    title: "EVMTools - Free Ethereum & Crypto Developer Tools",
    description:
      "Free online tools for Ethereum developers: ABI encoder, Keccak256 hash, BIP39 mnemonic generator, gas calculator, unit converter, and more.",
    url: SITE_URL,
    siteName: "EVMTools",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EVMTools - Free Ethereum & Crypto Developer Tools",
    description:
      "Free online tools for Ethereum developers: ABI encoder, Keccak256 hash, BIP39 mnemonic generator, gas calculator, unit converter, and more.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-white">EVMTools</h1>
        <p className="mt-3 text-lg text-gray-400">
          Free online tools for Ethereum and cryptocurrency developers. No
          sign-up required.
        </p>
      </div>

      <section id="tools">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Crypto Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/crypto/${tool.slug}`}
              className="group rounded-lg border border-gray-800 p-5 transition-colors hover:border-gray-600 hover:bg-gray-900"
            >
              <h3 className="font-semibold text-white group-hover:text-blue-400">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="guides">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Developer Guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-lg border border-gray-800 p-5 transition-colors hover:border-gray-600 hover:bg-gray-900"
            >
              <h3 className="font-semibold text-white group-hover:text-blue-400">
                {guide.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
