import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import PasswordGeneratorTool from "./PasswordGeneratorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Password Generator",
  description:
    "Generate strong, random passwords with customizable length, uppercase, lowercase, numbers, and symbols. Cryptographically secure with strength meter and crack time estimate.",
  path: "/crypto/password-generator",
});

const faqs = [
  {
    question: "How secure are the generated passwords?",
    answer:
      "The passwords are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. This is the same randomness source used by security libraries, TLS/SSL, and cryptocurrency wallets. The generated passwords are never stored or transmitted.",
  },
  {
    question: "What makes a strong password?",
    answer:
      "A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols. Longer passwords are exponentially harder to crack. A 16-character password with all character types has approximately 105 bits of entropy, which would take billions of years to brute force.",
  },
  {
    question: "What does 'exclude ambiguous characters' mean?",
    answer:
      "Ambiguous characters are letters and numbers that look similar in many fonts: 0 (zero) and O (letter O), 1 (one) and l (lowercase L) and I (uppercase i). Excluding them prevents confusion when manually typing passwords, which is useful for printed passwords or shared credentials.",
  },
  {
    question: "How is the crack time calculated?",
    answer:
      "The crack time estimate assumes an attacker performing 10 billion guesses per second, which represents modern GPU-based brute force capabilities. The calculation is based on the total number of possible combinations (character pool size raised to the power of password length), divided by the guessing rate.",
  },
  {
    question: "How long should my password be?",
    answer:
      "For most purposes, 16 characters is a good balance between security and usability. For high-security accounts (banking, cryptocurrency), use 20-24 characters or more. For Wi-Fi passwords, 20+ characters are recommended since they only need to be entered once.",
  },
  {
    question: "Are the passwords stored anywhere?",
    answer:
      "No. All passwords are generated entirely in your browser using the Web Crypto API. Nothing is stored in cookies, local storage, or sent to any server. Once you close or refresh the page, the generated passwords are gone.",
  },
];

export default function PasswordGeneratorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Password Generator",
            url: "https://evmtools.dev/crypto/password-generator",
            applicationCategory: "SecurityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate strong, random passwords with customizable options. Cryptographically secure using the Web Crypto API.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="password-generator">
        <PasswordGeneratorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Password Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online password generator creates strong, random
              passwords using cryptographically secure randomness. Follow these
              steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Set the password length</strong> using the slider. We
                recommend at least 16 characters for standard accounts and 24+
                for high-security accounts.
              </li>
              <li>
                <strong>Choose character types</strong> &mdash; enable or disable
                uppercase letters, lowercase letters, numbers, and symbols.
                Using all four types maximizes password strength.
              </li>
              <li>
                <strong>Check the strength meter</strong> to see the entropy
                level and estimated time to crack your password.
              </li>
              <li>
                <strong>Copy the password</strong> using the copy button and
                store it in your password manager.
              </li>
            </ol>
            <p>
              All passwords are generated locally in your browser using the Web
              Crypto API. Nothing is ever stored or sent to a server.
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
              <strong>Account registration</strong> &mdash; Generate unique,
              strong passwords for new online accounts.
            </li>
            <li>
              <strong>Password rotation</strong> &mdash; Create new passwords
              when updating credentials for security compliance.
            </li>
            <li>
              <strong>Cryptocurrency wallets</strong> &mdash; Generate strong
              passwords for wallet encryption and exchange accounts.
            </li>
            <li>
              <strong>API keys and tokens</strong> &mdash; Create random strings
              for API authentication secrets and tokens.
            </li>
            <li>
              <strong>Wi-Fi passwords</strong> &mdash; Generate long, secure
              passwords for wireless network access.
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
              href="/crypto/uuid-generator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                UUID Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate UUID v4 identifiers for unique database keys and
                identifiers.
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
                Generate SHA-256 hashes for password verification and data
                integrity checks.
              </p>
            </Link>
            <Link
              href="/crypto/base64-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Base64 Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Base64 strings for credentials and
                authentication tokens.
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
