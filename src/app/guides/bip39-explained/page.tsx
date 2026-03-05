import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "BIP39 Mnemonic Phrases Explained: How Crypto Wallets Generate Seed Phrases | EVMTools",
  description:
    "Learn how BIP39 mnemonic seed phrases work, how they generate private keys, and best practices for securing your crypto wallet backup.",
  keywords: [
    "bip39",
    "mnemonic phrase",
    "seed phrase",
    "bip39 wordlist",
    "mnemonic generator",
    "how seed phrases work",
    "wallet recovery phrase",
    "12 word seed phrase",
    "24 word seed phrase",
    "bip44 derivation path",
  ],
  openGraph: {
    title:
      "BIP39 Mnemonic Phrases Explained: How Crypto Wallets Generate Seed Phrases | EVMTools",
    description:
      "Learn how BIP39 mnemonic seed phrases work, how they generate private keys, and best practices for securing your crypto wallet backup.",
    url: `${SITE_URL}/guides/bip39-explained`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "BIP39 Mnemonic Phrases Explained: How Crypto Wallets Generate Seed Phrases",
    description:
      "Learn how BIP39 mnemonic seed phrases work, how they generate private keys, and best practices for securing your crypto wallet backup.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/bip39-explained`,
  },
};

export default function Bip39ExplainedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "BIP39 Mnemonic Phrases Explained: How Crypto Wallets Generate Seed Phrases",
    description:
      "Learn how BIP39 mnemonic seed phrases work, how they generate private keys, and best practices for securing your crypto wallet backup.",
    url: `${SITE_URL}/guides/bip39-explained`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/bip39-explained`,
    },
  };

  return (
    <ToolLayout slug="bip39-explained">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose-custom space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-300">
            If you have ever set up a cryptocurrency wallet, you have been asked
            to write down 12 or 24 words. Those words are your mnemonic phrase,
            also known as a seed phrase or recovery phrase. They are generated
            using a standard called BIP39, and they are the master key to all of
            your crypto assets. This guide explains exactly how BIP39 works, from
            random number generation to wallet derivation.
          </p>
        </section>

        {/* What is BIP39 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What is BIP39?</h2>
          <p className="leading-relaxed text-gray-300">
            BIP39 stands for{" "}
            <strong className="text-white">
              Bitcoin Improvement Proposal 39
            </strong>
            . Published in 2013 by Marek Palatinus (Slush), Pavol Rusnak, Aaron
            Voisine, and Sean Bowe, it defines a standard method for generating
            mnemonic sentences from random data and converting those sentences
            into a binary seed that can be used to create deterministic wallets.
          </p>
          <p className="leading-relaxed text-gray-300">
            Before BIP39, wallet backups required saving raw private keys or
            complex hex strings. BIP39 solved this by converting cryptographic
            randomness into human-readable words that are easier to write down,
            verify, and store.
          </p>
          <p className="leading-relaxed text-gray-300">
            The standard has been universally adopted. MetaMask, Ledger, Trezor,
            Trust Wallet, Phantom, and virtually every modern cryptocurrency
            wallet uses BIP39 mnemonic phrases.
          </p>
        </section>

        {/* How BIP39 Mnemonic Generation Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            How BIP39 Mnemonic Generation Works
          </h2>
          <p className="leading-relaxed text-gray-300">
            The process of generating a mnemonic phrase has four steps:
          </p>

          <h3 className="text-xl font-semibold text-white">
            Step 1: Generate Random Entropy
          </h3>
          <p className="leading-relaxed text-gray-300">
            The foundation of a mnemonic phrase is cryptographically secure
            random data, called entropy. The amount of entropy determines the
            number of words:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Entropy Bits
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Checksum Bits
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Total Bits
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Words
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">128</td>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">132</td>
                  <td className="px-4 py-3">12</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">160</td>
                  <td className="px-4 py-3">5</td>
                  <td className="px-4 py-3">165</td>
                  <td className="px-4 py-3">15</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">192</td>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3">198</td>
                  <td className="px-4 py-3">18</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">224</td>
                  <td className="px-4 py-3">7</td>
                  <td className="px-4 py-3">231</td>
                  <td className="px-4 py-3">21</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">256</td>
                  <td className="px-4 py-3">8</td>
                  <td className="px-4 py-3">264</td>
                  <td className="px-4 py-3">24</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-300">
            Most wallets use either 128 bits (12 words) or 256 bits (24 words).
            The 12-word format provides 128 bits of security, which is considered
            secure against brute-force attacks for the foreseeable future. The
            24-word format provides 256 bits, which is astronomically more
            secure.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Step 2: Add Checksum
          </h3>
          <p className="leading-relaxed text-gray-300">
            A checksum is appended to the entropy to enable error detection. The
            checksum is calculated by taking the SHA-256 hash of the entropy and
            using the first N bits, where N = entropy_bits / 32.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`For 128-bit entropy:
Entropy: 128 bits of random data
SHA-256(entropy): 256-bit hash
Checksum: first 4 bits of the hash
Total: 128 + 4 = 132 bits`}</code>
          </pre>
          <p className="leading-relaxed text-gray-300">
            This checksum allows wallets to verify whether a mnemonic phrase is
            valid. If you mistype a word, the checksum will not match, and the
            wallet can alert you to the error.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Step 3: Split Into 11-Bit Groups
          </h3>
          <p className="leading-relaxed text-gray-300">
            The combined entropy + checksum bits are divided into groups of 11
            bits. Each 11-bit value maps to an index in the BIP39 wordlist.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`132 bits / 11 bits per word = 12 words
264 bits / 11 bits per word = 24 words`}</code>
          </pre>
          <p className="leading-relaxed text-gray-300">
            Since 11 bits can represent values from 0 to 2047, the wordlist
            contains exactly 2,048 words.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Step 4: Map to Words
          </h3>
          <p className="leading-relaxed text-gray-300">
            Each 11-bit group is used as an index to look up a word from the
            BIP39 wordlist. The result is your mnemonic phrase.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Example (simplified):
Entropy + checksum bits: 00000000000 00001100100 ...
                         \u2193           \u2193
Word index:              0           100
Word:                    "abandon"   "blur"`}</code>
          </pre>
        </section>

        {/* Complete Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Complete Example</h2>
          <p className="leading-relaxed text-gray-300">
            Here is a concrete example of generating a 12-word mnemonic from 128
            bits of entropy:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`1. Entropy (128 bits, hex):
   0c1e24e5917779d297e14d45f14e1a1a

2. SHA-256 of entropy:
   2e17e5d2af3e8b97a4b028e8710d45ab...

3. Checksum (first 4 bits of SHA-256):
   0010

4. Entropy + checksum (132 bits), split into 11-bit groups:
   00001100000 11110001001 00111001011 ...

5. Word indices:
   96, 1929, 475, 2038, 1505, 1625, 580, 1997, 1063, 1950, 209, 1551

6. Mnemonic:
   army van deer turn pause ring estate match patrol voyage ring piece`}</code>
          </pre>
          <p className="leading-relaxed text-gray-300">
            You can generate your own mnemonic phrases using our{" "}
            <Link
              href="/crypto/mnemonic-generator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              BIP39 Mnemonic Generator
            </Link>
            . The generator runs entirely in your browser &mdash; no data is
            sent to any server.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* The BIP39 Wordlist */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            The BIP39 Wordlist
          </h2>
          <p className="leading-relaxed text-gray-300">
            The English BIP39 wordlist contains exactly 2,048 words. The words
            were carefully selected with several criteria:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Unique 4-letter prefix</strong>: No
              two words share the same first four characters. This means you can
              identify any word by its first four letters, which is useful for
              compact backup storage.
            </li>
            <li>
              <strong className="text-white">Common English words</strong>:
              Words are simple and widely known (e.g., &quot;apple,&quot;
              &quot;river,&quot; &quot;garden&quot;) to reduce transcription
              errors.
            </li>
            <li>
              <strong className="text-white">No offensive words</strong>:
              Potentially offensive or inappropriate words were excluded.
            </li>
            <li>
              <strong className="text-white">No similar words</strong>: Words
              that look or sound alike (e.g., &quot;woman&quot; and
              &quot;women&quot;) were avoided to prevent confusion.
            </li>
          </ol>
          <p className="leading-relaxed text-gray-300">
            BIP39 also defines wordlists for other languages including Japanese,
            Korean, Spanish, Chinese (Simplified and Traditional), French,
            Italian, and Czech. However, the English wordlist is by far the most
            widely used and is the default in most wallet software.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Sample Words from the Wordlist
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Index
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Word
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Index
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Word
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">abandon</td>
                  <td className="px-4 py-3">1024</td>
                  <td className="px-4 py-3">lottery</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">ability</td>
                  <td className="px-4 py-3">1337</td>
                  <td className="px-4 py-3">pioneer</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">able</td>
                  <td className="px-4 py-3">2046</td>
                  <td className="px-4 py-3">zoo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* From Mnemonic to Seed */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            From Mnemonic to Seed: PBKDF2
          </h2>
          <p className="leading-relaxed text-gray-300">
            The mnemonic phrase alone is not directly used as a cryptographic
            key. Instead, it is converted into a 512-bit binary seed using the
            PBKDF2 key-stretching function:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Seed = PBKDF2(
  password: mnemonic_sentence,    // words joined by spaces
  salt: "mnemonic" + passphrase,  // optional passphrase
  iterations: 2048,
  key_length: 512 bits,
  hash: HMAC-SHA512
)`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-white">
            The Optional Passphrase
          </h3>
          <p className="leading-relaxed text-gray-300">
            BIP39 supports an optional passphrase (sometimes called the
            &quot;25th word&quot;). This passphrase is appended to the salt
            during PBKDF2 derivation. Important properties:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-300">
            <li>
              <strong className="text-white">
                Different passphrase = completely different seed = completely
                different wallets
              </strong>
            </li>
            <li>
              The passphrase provides plausible deniability: you can have a decoy
              wallet (no passphrase) and a real wallet (with passphrase)
            </li>
            <li>
              There is no &quot;wrong&quot; passphrase. Any passphrase will
              generate a valid seed; it will just derive a different set of keys
            </li>
            <li>
              If you forget your passphrase, you cannot recover your wallet, even
              with the correct mnemonic
            </li>
          </ul>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Mnemonic: "army van deer turn pause ring estate match patrol voyage ring piece"

No passphrase:  Seed \u2192 Wallet A (with its own addresses and keys)
Passphrase "x": Seed \u2192 Wallet B (completely different addresses and keys)
Passphrase "y": Seed \u2192 Wallet C (yet another set of addresses and keys)`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* From Seed to Wallet */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            From Seed to Wallet: BIP32 and BIP44
          </h2>
          <p className="leading-relaxed text-gray-300">
            BIP39 generates the seed, but the actual wallet structure is defined
            by two companion standards:
          </p>

          <h3 className="text-xl font-semibold text-white">
            BIP32: Hierarchical Deterministic Wallets
          </h3>
          <p className="leading-relaxed text-gray-300">
            BIP32 defines how to derive a tree of key pairs from a single master
            seed. The seed is fed into HMAC-SHA512 to produce a master private
            key and a master chain code. From these, an unlimited number of child
            keys can be derived.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Seed (512 bits)
  \u2192 HMAC-SHA512
    \u2192 Master Private Key (256 bits) + Master Chain Code (256 bits)
      \u2192 Child Key 1
        \u2192 Grandchild Key 1a
        \u2192 Grandchild Key 1b
      \u2192 Child Key 2
        \u2192 ...`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-white">
            BIP44: Multi-Account Structure
          </h3>
          <p className="leading-relaxed text-gray-300">
            BIP44 defines a specific derivation path structure for organizing
            keys across different cryptocurrencies and accounts:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`m / purpose' / coin_type' / account' / change / address_index

m/44'/0'/0'/0/0    \u2192 First Bitcoin address
m/44'/60'/0'/0/0   \u2192 First Ethereum address
m/44'/501'/0'/0'   \u2192 First Solana address`}</code>
          </pre>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Path Component
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Meaning
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">m</code>
                  </td>
                  <td className="px-4 py-3">Master key</td>
                  <td className="px-4 py-3">&ndash;</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">44&apos;</code>
                  </td>
                  <td className="px-4 py-3">BIP44 purpose</td>
                  <td className="px-4 py-3">Fixed</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">coin_type&apos;</code>
                  </td>
                  <td className="px-4 py-3">Cryptocurrency</td>
                  <td className="px-4 py-3">0 = Bitcoin, 60 = Ethereum</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">account&apos;</code>
                  </td>
                  <td className="px-4 py-3">Account index</td>
                  <td className="px-4 py-3">0, 1, 2, ...</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">change</code>
                  </td>
                  <td className="px-4 py-3">
                    External (0) or internal/change (1)
                  </td>
                  <td className="px-4 py-3">0 for receiving</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-amber-400">address_index</code>
                  </td>
                  <td className="px-4 py-3">Address number</td>
                  <td className="px-4 py-3">0, 1, 2, ...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-300">
            This is why a single 12-word mnemonic can generate addresses for
            Bitcoin, Ethereum, Solana, and hundreds of other chains. Each chain
            uses a different{" "}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-amber-400">
              coin_type
            </code>{" "}
            value in the derivation path.
          </p>
        </section>

        {/* Security Considerations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Security Considerations
          </h2>

          <h3 className="text-xl font-semibold text-white">Entropy Quality</h3>
          <p className="leading-relaxed text-gray-300">
            The security of a mnemonic phrase depends entirely on the quality of
            the random number generator. A mnemonic generated from predictable
            data (timestamps, sequential numbers, weak PRNGs) can be
            brute-forced. Always use a cryptographically secure random number
            generator (CSPRNG). In browsers, this is{" "}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-amber-400">
              crypto.getRandomValues()
            </code>
            . In Node.js, use{" "}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-amber-400">
              crypto.randomBytes()
            </code>
            .
          </p>

          <h3 className="text-xl font-semibold text-white">
            Brute Force Resistance
          </h3>
          <p className="leading-relaxed text-gray-300">
            A 12-word mnemonic has 128 bits of entropy, which means there are
            2^128 (approximately 3.4 x 10^38) possible combinations. At one
            trillion guesses per second, it would take approximately 10^19 years
            to try all combinations. This is secure against any foreseeable
            computing capability.
          </p>
          <p className="leading-relaxed text-gray-300">
            A 24-word mnemonic has 256 bits of entropy, which is secure even
            against theoretical quantum computers using Grover&apos;s algorithm
            (which would reduce effective security to 128 bits).
          </p>

          <h3 className="text-xl font-semibold text-white">
            Storage Best Practices
          </h3>
          <ol className="ml-6 list-decimal space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Write on paper or metal</strong>:
              Never store your mnemonic phrase digitally (no screenshots, no
              cloud storage, no notes app).
            </li>
            <li>
              <strong className="text-white">
                Store in multiple locations
              </strong>
              : Keep copies in separate physical locations to protect against
              fire, flood, or theft.
            </li>
            <li>
              <strong className="text-white">Never share</strong>: No legitimate
              service will ever ask for your mnemonic phrase. Anyone who has your
              phrase has full control of your funds.
            </li>
            <li>
              <strong className="text-white">Consider metal backup</strong>:
              Paper can be destroyed by fire or water. Metal backup plates
              (stamped or engraved) provide more durable storage.
            </li>
            <li>
              <strong className="text-white">
                Use the passphrase feature
              </strong>
              : Adding a passphrase provides an additional layer of security and
              enables plausible deniability.
            </li>
          </ol>

          <div className="rounded-lg border border-yellow-800/50 bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-200">
              <strong>Browser-Based Generation Warning:</strong> While our{" "}
              <Link
                href="/crypto/mnemonic-generator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                BIP39 Mnemonic Generator
              </Link>{" "}
              runs entirely in your browser with no server communication,
              generating mnemonics for real wallets holding significant funds
              should ideally be done on an offline, air-gapped device. Browser
              extensions, clipboard managers, and screen recording software could
              potentially capture your phrase. For maximum security, use a
              hardware wallet (Ledger, Trezor) that generates the mnemonic on its
              secure element chip.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              Can I create my own mnemonic by picking random words?
            </h3>
            <p className="leading-relaxed text-gray-300">
              Technically you could pick 11 words randomly and calculate the 12th
              word to satisfy the checksum, but this is strongly discouraged.
              Human-chosen &quot;random&quot; words are far less random than they
              appear. Always use a proper CSPRNG to generate entropy.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              What if I lose one word of my mnemonic?
            </h3>
            <p className="leading-relaxed text-gray-300">
              If you know 11 out of 12 words, the missing word can be found by
              trying all 2,048 words in the wordlist and checking which one
              produces a valid checksum. This is computationally trivial.
              However, if you are missing 2 or more words, the search space grows
              significantly (2,048^2 = ~4 million combinations for 2 missing
              words).
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              Are 12 words enough, or should I use 24?
            </h3>
            <p className="leading-relaxed text-gray-300">
              For most users, 12 words (128 bits of entropy) provide more than
              sufficient security. The 24-word format is used by some hardware
              wallets as an extra precaution, but there is no practical attack
              that can break 128 bits of entropy.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              Can the same mnemonic work for Bitcoin and Ethereum?
            </h3>
            <p className="leading-relaxed text-gray-300">
              Yes. Thanks to BIP44, the same mnemonic generates different keys
              for different blockchains by using different derivation paths. Most
              multi-chain wallets derive all chain-specific keys from a single
              mnemonic.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              Is BIP39 the only mnemonic standard?
            </h3>
            <p className="leading-relaxed text-gray-300">
              BIP39 is the most widely used standard, but alternatives exist.
              Electrum wallet uses its own mnemonic format that is not compatible
              with BIP39. SLIP39 (Shamir&apos;s Secret Sharing) splits the
              mnemonic into multiple shares for more advanced backup schemes.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-800/50 bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-white">Try It Yourself</h2>
          <p className="mt-2 leading-relaxed text-gray-300">
            Generate a BIP39 mnemonic phrase using our free{" "}
            <Link
              href="/crypto/mnemonic-generator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              BIP39 Mnemonic Generator
            </Link>
            . Choose between 12 or 24 words, generate securely in your browser,
            and validate existing phrases.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-white">Related Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                href="/crypto/mnemonic-generator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                BIP39 Mnemonic Generator
              </Link>{" "}
              &mdash; Generate and validate BIP39 mnemonic phrases
            </li>
            <li>
              <Link
                href="/crypto/address-validator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Address Validator
              </Link>{" "}
              &mdash; Validate cryptocurrency addresses across chains
            </li>
            <li>
              <Link
                href="/crypto/keccak256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Keccak256 Hash Generator
              </Link>{" "}
              &mdash; Compute Keccak256 hashes online
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
