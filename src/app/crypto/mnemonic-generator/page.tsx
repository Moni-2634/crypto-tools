import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import MnemonicTool from "./MnemonicTool";

export const metadata: Metadata = generateToolMetadata({
  title: "BIP39 Mnemonic Generator",
  description:
    "Generate secure BIP39 mnemonic seed phrases (12 or 24 words) for cryptocurrency wallets. Offline-capable for maximum security.",
  path: "/crypto/mnemonic-generator",
});

const faqs = [
  {
    question: "What is a BIP39 mnemonic seed phrase?",
    answer:
      "A BIP39 mnemonic seed phrase is a set of 12 or 24 words randomly selected from a standardized 2048-word list. It encodes the entropy (randomness) used to generate cryptocurrency private keys. The phrase serves as a human-readable backup for wallets across Ethereum, Bitcoin, and other blockchains.",
  },
  {
    question: "Should I use 12 or 24 words?",
    answer:
      "A 12-word mnemonic provides 128 bits of entropy, which is considered secure for most use cases. A 24-word mnemonic provides 256 bits of entropy for additional security. Most modern wallets (MetaMask, Ledger, Trezor) support both. Use 24 words if you want the highest level of security for long-term storage.",
  },
  {
    question: "How should I store my mnemonic phrase?",
    answer:
      "Never store your mnemonic digitally (no screenshots, no cloud storage, no text files). Write it down on paper or engrave it on metal for fire and water resistance. Store it in a secure physical location. Never share it with anyone. Anyone with your mnemonic has full access to your funds.",
  },
  {
    question: "Is it safe to generate a mnemonic online?",
    answer:
      "This tool runs entirely in your browser and never sends your mnemonic to any server. For maximum security when generating a mnemonic for real funds, disconnect from the internet before generating, use a private/incognito window, and close the tab immediately after copying your phrase.",
  },
  {
    question: "What is the checksum in a BIP39 mnemonic?",
    answer:
      "The last word (or part of it) in a BIP39 mnemonic contains a checksum derived from the SHA-256 hash of the entropy. This means not every combination of 12 or 24 words is a valid mnemonic. The checksum ensures that typos in the phrase are detected when restoring a wallet.",
  },
  {
    question: "Can I use the same mnemonic for Ethereum and Bitcoin?",
    answer:
      "Yes. BIP39 mnemonics are blockchain-agnostic. The same seed phrase can derive different keys for different networks using different derivation paths (BIP44). For example, Ethereum uses m/44'/60'/0'/0/0 while Bitcoin uses m/44'/0'/0'/0/0. Most multi-chain wallets handle this automatically.",
  },
];

export default function MnemonicGeneratorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "BIP39 Mnemonic Generator",
            url: "https://evmtools.dev/crypto/mnemonic-generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate secure BIP39 mnemonic seed phrases (12 or 24 words) for cryptocurrency wallets. Offline-capable for maximum security.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="mnemonic-generator">
        <MnemonicTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This BIP39 Mnemonic Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool generates cryptographically secure BIP39 mnemonic seed
              phrases that can be used to create or restore cryptocurrency
              wallets. Follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select the word count</strong> &mdash; choose between
                12 words (128-bit entropy) or 24 words (256-bit entropy)
                depending on your security requirements.
              </li>
              <li>
                <strong>Generate the mnemonic</strong> &mdash; click the
                generate button to create a new random seed phrase using a
                cryptographically secure random number generator.
              </li>
              <li>
                <strong>Write it down immediately</strong> &mdash; copy the
                words onto paper in the exact order shown. Do not store it
                digitally.
              </li>
              <li>
                <strong>Verify your backup</strong> &mdash; the tool may also
                show the derived seed, master key, or first address so you can
                confirm the phrase was recorded correctly.
              </li>
            </ol>
            <p>
              All generation happens locally in your browser using the Web
              Crypto API. For real wallets, consider disconnecting from the
              internet before generating your phrase.
            </p>
          </div>
        </section>

        {/* Use Cases section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>New wallet creation</strong> &mdash; Generate a fresh
              mnemonic to set up a new Ethereum, Bitcoin, or multi-chain wallet
              with a secure backup.
            </li>
            <li>
              <strong>Development and testing</strong> &mdash; Create test
              mnemonics for local development with Hardhat, Foundry, or Ganache
              without risking real funds.
            </li>
            <li>
              <strong>Cold storage setup</strong> &mdash; Generate a mnemonic
              offline for a cold wallet that will never be connected to the
              internet.
            </li>
            <li>
              <strong>Hardware wallet initialization</strong> &mdash; Generate
              a mnemonic to use when setting up Ledger, Trezor, or other
              hardware wallets.
            </li>
            <li>
              <strong>Education</strong> &mdash; Learn how BIP39 mnemonics work
              and how entropy maps to word sequences for wallet generation.
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/crypto/private-key-to-address"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Private Key to Address
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Derive Ethereum addresses from private keys generated by your
                mnemonic phrase.
              </p>
            </Link>
            <Link
              href="/crypto/address-validator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Validate that derived addresses are correctly formatted for
                Ethereum, Bitcoin, or Solana.
              </p>
            </Link>
            <Link
              href="/crypto/sha256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                SHA-256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate SHA-256 hashes used in the BIP39 checksum calculation
                and Bitcoin mining.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5"
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
      </ToolLayout>
    </>
  );
}
