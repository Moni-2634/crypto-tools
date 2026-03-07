import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import { tools } from "@/lib/tools";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `50 Free Online Developer Tools | ${SITE_NAME}`,
  description:
    "Browse all 50 free online developer tools: hash generators, text tools, converters, encoding utilities, smart contract analysis, and more. No sign-up required.",
  openGraph: {
    title: `50 Free Online Developer Tools | ${SITE_NAME}`,
    description:
      "Browse all 50 free online developer tools: hash generators, text tools, converters, encoding utilities, smart contract analysis, and more.",
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `50 Free Online Developer Tools | ${SITE_NAME}`,
    description:
      "Browse all 50 free online developer tools: hash generators, text tools, converters, encoding utilities, and more.",
  },
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
};

const categories = [
  {
    heading: "Hash Generators",
    description:
      "Generate cryptographic hashes with SHA-256, MD5, Keccak256, and more. Batch hashing, event hashes, and function selectors.",
    link: "/tools/hash-generators",
    slugs: [
      "keccak256-hash",
      "sha256-hash",
      "md5-hash",
      "batch-keccak256",
      "event-hash-calculator",
      "function-selector",
      "eip712-hasher",
      "merkle-proof-generator",
    ],
  },
  {
    heading: "Text Tools",
    description:
      "Count words and characters, convert text case, compare diffs, generate lorem ipsum, and preview markdown.",
    link: "/tools/text-tools",
    slugs: [
      "word-counter",
      "character-counter",
      "text-case-converter",
      "diff-checker",
      "lorem-ipsum-generator",
      "markdown-preview",
    ],
  },
  {
    heading: "Converters",
    description:
      "Convert between JSON, CSV, Base64, hex, color formats, number bases, and more.",
    link: "/tools/converters",
    slugs: [
      "json-to-csv",
      "json-formatter",
      "base64-encoder",
      "hex-decimal-converter",
      "color-picker",
      "number-base-converter",
      "image-to-base64",
      "html-encoder",
      "url-encoder",
    ],
  },
  {
    heading: "Encoding & Conversion",
    description:
      "Encode and decode ABI data, RLP, UTF-8/hex, bytes32, and Unix timestamps for Ethereum development.",
    slugs: [
      "abi-encoder",
      "utf8-hex-converter",
      "rlp-encoder",
      "unix-timestamp",
      "bytes32-converter",
    ],
  },
  {
    heading: "Address & Keys",
    description:
      "Validate addresses, convert checksums, generate mnemonics, derive keys, verify signatures, and calculate CREATE2 addresses.",
    slugs: [
      "checksum-address",
      "address-validator",
      "private-key-to-address",
      "mnemonic-generator",
      "signature-verifier",
      "create2-calculator",
    ],
  },
  {
    heading: "Smart Contract Analysis",
    description:
      "Decode calldata, analyze ERC-20 transfers, decode Solidity errors, calculate storage slots, and check contract sizes.",
    slugs: [
      "calldata-decoder",
      "storage-slot-calculator",
      "erc20-decoder",
      "error-decoder",
      "contract-size-calculator",
    ],
  },
  {
    heading: "Gas & Units",
    description:
      "Convert ETH units, calculate gas fees, convert token amounts, and look up beacon chain epochs and slots.",
    slugs: [
      "eth-unit-converter",
      "gas-calculator",
      "token-unit-converter",
      "epoch-calculator",
    ],
  },
  {
    heading: "Developer Utilities",
    description:
      "Decode JWTs, generate UUIDs, test regex patterns, parse cron expressions, generate slugs, QR codes, and passwords.",
    slugs: [
      "jwt-decoder",
      "uuid-generator",
      "regex-tester",
      "cron-parser",
      "slugify",
      "qr-code-generator",
      "password-generator",
    ],
  },
];

export default function AllToolsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "All Tools", url: `${SITE_URL}/tools` },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Developer Tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/crypto/${tool.slug}`,
      description: tool.description,
    })),
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, itemListJsonLd]),
        }}
      />

      {/* Header */}
      <div>
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">All Tools</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          All Developer Tools
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Browse all {tools.length} free online tools. Every tool runs entirely
          in your browser with no sign-up required.
        </p>
      </div>

      <AdSlot slotId="tools-top" format="horizontal" className="my-4" />

      {/* Categories */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryTools = category.slugs
            .map((slug) => tools.find((t) => t.slug === slug))
            .filter(Boolean);

          return (
            <section key={category.heading}>
              <div className="mb-4">
                {category.link ? (
                  <Link href={category.link}>
                    <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                      {category.heading}
                    </h2>
                  </Link>
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {category.heading}
                  </h2>
                )}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool!.slug}
                    href={`/crypto/${tool!.slug}`}
                    className="group rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {tool!.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {tool!.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <AdSlot slotId="tools-bottom" format="horizontal" className="my-4" />

      {/* Back to Home */}
      <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          &larr; Back to Homepage
        </Link>
      </div>
    </div>
  );
}
