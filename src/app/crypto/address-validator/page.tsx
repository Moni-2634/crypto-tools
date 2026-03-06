import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import AddressValidatorTool from "./AddressValidatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Address Validator",
  description:
    "Validate cryptocurrency wallet addresses for Ethereum, Bitcoin, and Solana. Check if an address is valid before sending funds.",
  path: "/crypto/address-validator",
});

const faqs = [
  {
    question: "How do I validate an Ethereum address?",
    answer:
      "A valid Ethereum address is a 42-character hexadecimal string starting with '0x'. This tool checks the format, length, and EIP-55 checksum to ensure the address is correctly formed. Simply paste any address and the tool instantly tells you whether it is valid.",
  },
  {
    question: "What is EIP-55 checksum validation?",
    answer:
      "EIP-55 is a mixed-case checksum standard for Ethereum addresses. It uses uppercase and lowercase hex characters to encode a checksum directly into the address string. This helps catch typos and copy-paste errors before you send funds to the wrong address.",
  },
  {
    question: "Can this tool validate Bitcoin and Solana addresses?",
    answer:
      "Yes. This tool supports multiple blockchain address formats including Ethereum (0x-prefixed hex), Bitcoin (Base58Check for legacy addresses and Bech32 for SegWit addresses), and Solana (Base58-encoded 32-byte public keys). It automatically detects the address type.",
  },
  {
    question: "Why should I validate an address before sending crypto?",
    answer:
      "Cryptocurrency transactions are irreversible. Sending funds to an invalid or mistyped address means permanent loss. Validating addresses before sending ensures the destination is correctly formatted and reduces the risk of losing funds due to typos or clipboard malware.",
  },
  {
    question: "What is the difference between a valid and a checksummed address?",
    answer:
      "A valid address has the correct format and length. A checksummed address (EIP-55) additionally encodes error detection into the capitalization of hex characters. An address can be valid in lowercase but fail checksum verification if the mixed-case encoding is incorrect.",
  },
];

export default function AddressValidatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Address Validator",
            url: "https://evmtools.dev/crypto/address-validator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Validate cryptocurrency wallet addresses for Ethereum, Bitcoin, and Solana. Check if an address is valid before sending funds.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="address-validator">
        <AddressValidatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Address Validator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online address validator lets you instantly check whether
              a cryptocurrency address is correctly formatted. It supports
              Ethereum, Bitcoin, and Solana addresses. Follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste your address</strong> into the input field. The
                tool accepts Ethereum (0x...), Bitcoin (1..., 3..., bc1...),
                and Solana addresses.
              </li>
              <li>
                <strong>View the validation result</strong> &mdash; the tool
                instantly checks the format, length, and checksum (where
                applicable) and displays whether the address is valid.
              </li>
              <li>
                <strong>Check the address type</strong> &mdash; the tool
                identifies whether the address is Ethereum, Bitcoin legacy,
                Bitcoin SegWit, or Solana.
              </li>
              <li>
                <strong>Copy the checksummed address</strong> for Ethereum
                addresses to ensure you are using the correct EIP-55 format.
              </li>
            </ol>
            <p>
              Everything runs locally in your browser. No addresses are sent to
              any server, making this tool safe for validating addresses holding
              significant funds.
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
              <strong>Pre-transfer validation</strong> &mdash; Verify addresses
              before sending any cryptocurrency to avoid irreversible loss of
              funds.
            </li>
            <li>
              <strong>Smart contract integration</strong> &mdash; Validate user
              input addresses in dApp frontends before passing them to contract
              calls.
            </li>
            <li>
              <strong>Checksum conversion</strong> &mdash; Convert lowercase
              Ethereum addresses to their EIP-55 checksummed versions for safer
              storage and display.
            </li>
            <li>
              <strong>Multi-chain support</strong> &mdash; Quickly determine
              which blockchain network an address belongs to based on its
              format.
            </li>
            <li>
              <strong>Security auditing</strong> &mdash; Verify that addresses
              in configuration files and deployment scripts are valid before
              going to production.
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
                Derive Ethereum addresses from private keys to verify key-address
                pairs.
              </p>
            </Link>
            <Link
              href="/crypto/signature-verifier"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Signature Verifier
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Verify Ethereum signatures and recover the signer address from
                signed messages.
              </p>
            </Link>
            <Link
              href="/crypto/create2-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                CREATE2 Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate deterministic contract deployment addresses using the
                CREATE2 opcode.
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
