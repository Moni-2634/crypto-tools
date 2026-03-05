import type { Metadata } from "next";
import Link from "next/link";
import { tools, guides } from "@/lib/tools";
import { SITE_URL, SITE_NAME, generateBreadcrumbJsonLd } from "@/lib/seo";

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
    title: "EVMTools - Free Ethereum & Crypto Developer Tools",
    description:
      "Free online tools for Ethereum developers: ABI encoder, Keccak256 hash, BIP39 mnemonic generator, gas calculator, unit converter, and more.",
    images: ["/og/home.svg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

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
    description:
      "Free online tools for Ethereum developers: ABI encoder, Keccak256 hash, BIP39 mnemonic generator, gas calculator, unit converter, and more.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
  ]);

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd, websiteJsonLd, breadcrumbJsonLd]),
        }}
      />
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">EVMTools</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Free online tools for Ethereum and cryptocurrency developers. No
          sign-up required.
        </p>
      </div>

      <section id="tools">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Crypto Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/crypto/${tool.slug}`}
              className="group rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

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
    </div>
  );
}
