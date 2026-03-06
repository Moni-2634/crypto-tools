import type { Metadata } from "next";
import Link from "next/link";
import { tools, guides } from "@/lib/tools";
import {
  SITE_URL,
  SITE_NAME,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";

const updatedDescription =
  "35 free online developer tools and 33 in-depth guides. ABI encoder, Keccak256/SHA-256/MD5 hash, JSON formatter, JWT decoder, UUID generator, regex tester, calldata decoder, gas calculator, and more. Guides on DeFi, staking, hardware wallets, exchanges, and blockchain.";

export const metadata: Metadata = {
  title: "EVMTools - 35 Free Developer & Crypto Tools | Online",
  description: updatedDescription,
  keywords: [
    "ethereum tools",
    "crypto developer tools",
    "solidity tools",
    "abi encoder",
    "keccak256 hash",
    "sha256 hash generator",
    "md5 hash generator",
    "json formatter",
    "jwt decoder",
    "uuid generator",
    "regex tester",
    "url encoder",
    "gas calculator",
    "erc20 decoder",
    "calldata decoder",
    "merkle proof generator",
    "ethereum developer",
    "smart contract tools",
    "web3 tools",
    "best hardware wallets",
    "best crypto exchanges",
  ],
  openGraph: {
    title: "EVMTools - 35 Free Developer & Crypto Tools | Online",
    description: updatedDescription,
    url: SITE_URL,
    siteName: "EVMTools",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/home.svg",
        width: 1200,
        height: 630,
        alt: "EVMTools - Free Ethereum & Crypto Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EVMTools - 35 Free Developer & Crypto Tools | Online",
    description: updatedDescription,
    images: ["/og/home.svg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const toolCategories = [
  {
    heading: "Encoding & Conversion",
    slugs: [
      "abi-encoder",
      "hex-decimal-converter",
      "utf8-hex-converter",
      "rlp-encoder",
      "unix-timestamp",
      "base64-encoder",
      "bytes32-converter",
      "url-encoder",
    ],
  },
  {
    heading: "Hashing & Cryptography",
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
    heading: "Address & Keys",
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
    slugs: [
      "eth-unit-converter",
      "gas-calculator",
      "token-unit-converter",
      "epoch-calculator",
    ],
  },
  {
    heading: "Developer Utilities",
    slugs: [
      "json-formatter",
      "jwt-decoder",
      "uuid-generator",
      "regex-tester",
    ],
  },
];

const faqs = [
  {
    question: "What is EVMTools?",
    answer:
      "EVMTools is a free, open-source collection of online developer tools for Ethereum and EVM-compatible blockchains. All tools run entirely in your browser \u2014 no data is sent to any server.",
  },
  {
    question: "Are these tools safe to use?",
    answer:
      "Yes. All tools run client-side in your browser. No private keys, seed phrases, or sensitive data is ever transmitted to our servers. The source code is open and auditable.",
  },
  {
    question: "What blockchains do these tools work with?",
    answer:
      "Most tools work with any EVM-compatible blockchain including Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche, and more.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. All tools work directly in your web browser. No downloads, extensions, or sign-ups required.",
  },
];

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og/home.svg`,
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: updatedDescription,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ethereum Developer Tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/crypto/${tool.slug}`,
      description: tool.description,
    })),
  };

  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationJsonLd,
            websiteJsonLd,
            breadcrumbJsonLd,
            itemListJsonLd,
            faqJsonLd,
          ]),
        }}
      />

      {/* Hero / Intro */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          EVMTools
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Free online tools for Ethereum and cryptocurrency developers. No
          sign-up required.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          EVMTools provides 35 free online tools for developers and
          crypto builders. Generate SHA-256, Keccak256, and MD5 hashes, format
          JSON, decode JWTs, test regex, generate UUIDs, encode URLs, decode
          ABI calldata, calculate gas fees, verify signatures, build Merkle
          trees, and more &mdash; all running locally in your browser with no
          sign-up required. Plus, explore our 33 comprehensive guides covering
          DeFi, staking, hardware wallets, crypto exchanges, smart contracts,
          DAOs, oracles, and blockchain basics.
        </p>
      </div>

      {/* Tools by Category */}
      <section id="tools">
        <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
          Crypto Tools
        </h2>
        <div className="space-y-10">
          {toolCategories.map((category) => {
            const categoryTools = category.slugs
              .map((slug) => tools.find((t) => t.slug === slug))
              .filter(Boolean);

            return (
              <div key={category.heading}>
                <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {category.heading}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool!.slug}
                      href={`/crypto/${tool!.slug}`}
                      className="group rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                    >
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {tool!.name}
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        {tool!.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guides */}
      <section id="guides">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Developer Guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {guide.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
