import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is a Crypto Wallet? A Complete Guide to Cryptocurrency Wallets | EVMTools",
  description:
    "Learn what crypto wallets are, how they work with private and public keys, types of wallets (hot, cold, hardware, browser), security best practices, and how to choose the right wallet.",
  keywords: [
    "crypto wallet",
    "what is a crypto wallet",
    "best crypto wallet",
    "metamask",
    "hardware wallet",
    "hot wallet cold wallet",
    "ledger",
    "trezor",
    "crypto wallet explained",
    "private key",
    "seed phrase",
    "non-custodial wallet",
  ],
  openGraph: {
    title:
      "What is a Crypto Wallet? A Complete Guide to Cryptocurrency Wallets | EVMTools",
    description:
      "Learn what crypto wallets are, how they work with private and public keys, types of wallets (hot, cold, hardware, browser), security best practices, and how to choose the right wallet.",
    url: `${SITE_URL}/guides/what-is-crypto-wallet`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "What is a Crypto Wallet? A Complete Guide to Cryptocurrency Wallets",
    description:
      "Learn what crypto wallets are, how they work with private and public keys, types of wallets (hot, cold, hardware, browser), security best practices, and how to choose the right wallet.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-crypto-wallet`,
  },
};

export default function WhatIsCryptoWalletPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What is a Crypto Wallet? A Complete Guide to Cryptocurrency Wallets",
    description:
      "Learn what crypto wallets are, how they work with private and public keys, types of wallets (hot, cold, hardware, browser), security best practices, and how to choose the right wallet.",
    url: `${SITE_URL}/guides/what-is-crypto-wallet`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-crypto-wallet`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What happens if I lose my seed phrase?",
      answer:
        "If you lose your seed phrase and do not have any other backup of your private keys, your funds are permanently lost. No one can recover them for you. There is no 'forgot password' option in crypto. This is why it is critical to write down your seed phrase on paper (not digitally) and store it in a secure, fireproof location. Consider using a metal seed phrase backup for extra durability.",
    },
    {
      question: "Is MetaMask safe to use?",
      answer:
        "MetaMask is one of the most widely used and battle-tested browser wallets. It is open source and has been audited multiple times. However, as a hot wallet (connected to the internet), it is inherently less secure than a hardware wallet. The main risks come from phishing attacks, malicious dApp approvals, and browser-based malware. For significant holdings, pair MetaMask with a hardware wallet like Ledger for maximum security.",
    },
    {
      question: "What is the difference between a wallet address and a private key?",
      answer:
        "Your wallet address (like 0xABC...123) is public and safe to share. It is like a bank account number that people use to send you funds. Your private key is a secret 256-bit number that proves ownership and authorizes transactions. Sharing your private key gives someone complete control over all assets at that address. Never share your private key or seed phrase with anyone.",
    },
    {
      question: "Can I use one wallet for multiple blockchains?",
      answer:
        "Many modern wallets support multiple blockchains. MetaMask natively supports Ethereum and any EVM-compatible chain (Polygon, Arbitrum, BSC, Avalanche, etc.). Multi-chain wallets like Phantom support both Solana and Ethereum. Hardware wallets like Ledger support hundreds of different blockchains through their companion apps. However, a single wallet address format typically works only within its own ecosystem.",
    },
    {
      question: "Do I need a hardware wallet?",
      answer:
        "For small amounts and learning, a browser or mobile wallet is fine. However, if you hold significant value in cryptocurrency (a common threshold is $1,000+), a hardware wallet is strongly recommended. Hardware wallets keep your private keys offline, making them immune to phishing, malware, and remote hacking. The cost ($60-$200) is minimal compared to the security it provides.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-crypto-wallet">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="prose-custom space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            A crypto wallet is your gateway to the blockchain world. It stores
            the cryptographic keys that control your digital assets, lets you
            send and receive cryptocurrency, and serves as your identity in
            Web3 applications. Unlike a physical wallet that holds cash, a
            crypto wallet does not actually store your coins &mdash; it stores
            the private keys that prove you own them. This guide covers how
            wallets work, the different types available, popular options, and
            essential security practices.
          </p>
        </section>

        {/* How Wallets Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Crypto Wallets Work
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Crypto wallets are built on public-key cryptography. Understanding
            the relationship between private keys, public keys, and addresses
            is fundamental to understanding how wallets secure your assets:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Private Key (secret - NEVER share)
  │
  ├── 256-bit random number
  │   Example: 0x4c0883a6...9b6d1882 (64 hex characters)
  │
  ▼
Public Key (derived from private key via elliptic curve math)
  │
  ├── secp256k1 curve multiplication
  │   Cannot reverse: public key → private key is computationally impossible
  │
  ▼
Wallet Address (derived from public key via Keccak256 hash)
  │
  ├── Last 20 bytes of Keccak256(public key)
  │   Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18
  │
  ▼
Safe to share publicly (like a bank account number)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Your <strong className="text-gray-900 dark:text-white">private key</strong> is
            a 256-bit random number that serves as your ultimate proof of
            ownership. Anyone with your private key has full control over your
            funds. Your{" "}
            <strong className="text-gray-900 dark:text-white">public key</strong> is
            derived mathematically from the private key using elliptic curve
            cryptography (secp256k1 on Ethereum). Your{" "}
            <strong className="text-gray-900 dark:text-white">wallet address</strong> is
            derived from the public key using{" "}
            <Link
              href="/guides/what-is-keccak256"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 hashing
            </Link>
            . This one-way process means you can always derive the address from
            the private key, but never the reverse.
          </p>
        </section>

        {/* Seed Phrases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Seed Phrases (Mnemonic Phrases)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Managing raw 256-bit private keys is impractical for humans. The{" "}
            <Link
              href="/guides/bip39-explained"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              BIP39 standard
            </Link>{" "}
            solves this by encoding your private key as a sequence of 12 or 24
            English words called a <strong className="text-gray-900 dark:text-white">seed phrase</strong> (or
            mnemonic phrase):
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Example 12-word seed phrase:
abandon ability able about above absent absorb abstract absurd abuse access accident

This single phrase can derive:
  → Master private key
    → Child private key #1 → Address #1 (m/44'/60'/0'/0/0)
    → Child private key #2 → Address #2 (m/44'/60'/0'/0/1)
    → Child private key #3 → Address #3 (m/44'/60'/0'/0/2)
    → ... unlimited addresses

BIP44 derivation path for Ethereum: m/44'/60'/0'/0/n`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A single seed phrase can generate an unlimited number of addresses
            using deterministic derivation (BIP32/BIP44). This means backing up
            one seed phrase protects all accounts derived from it. If your
            device breaks, you can restore all accounts on a new device using
            the same seed phrase.
          </p>
          <div className="rounded-lg border border-red-300 dark:border-red-800/50 bg-red-50 dark:bg-red-950/30 p-4">
            <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">
              <strong>Critical security rule:</strong> Never share your seed
              phrase with anyone. Never type it into a website. Never store it
              digitally (screenshots, notes apps, email, cloud storage). Write
              it on paper and store it in a secure, offline location. No
              legitimate service will ever ask for your seed phrase.
            </p>
          </div>
        </section>

        {/* Custodial vs Non-Custodial */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Custodial vs Non-Custodial Wallets
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most important distinction in crypto wallets is who controls the
            private keys:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Custodial
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Non-Custodial
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Private key control</td>
                  <td className="px-4 py-3">Company holds keys</td>
                  <td className="px-4 py-3">You hold keys</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Examples</td>
                  <td className="px-4 py-3">Coinbase, Binance, Kraken</td>
                  <td className="px-4 py-3">MetaMask, Ledger, Trezor</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Account recovery</td>
                  <td className="px-4 py-3">Password reset via email</td>
                  <td className="px-4 py-3">Seed phrase only (no recovery if lost)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Censorship</td>
                  <td className="px-4 py-3">Can freeze your account</td>
                  <td className="px-4 py-3">Cannot be frozen by anyone</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">dApp access</td>
                  <td className="px-4 py-3">Limited or none</td>
                  <td className="px-4 py-3">Full access to all dApps</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Ease of use</td>
                  <td className="px-4 py-3">Beginner-friendly</td>
                  <td className="px-4 py-3">Requires more knowledge</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Counterparty risk</td>
                  <td className="px-4 py-3">Company can go bankrupt (e.g., FTX)</td>
                  <td className="px-4 py-3">No counterparty risk</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The crypto community often says &quot;not your keys, not your
            coins.&quot; The collapse of FTX in 2022 demonstrated this principle
            when billions in customer funds held on a custodial exchange were
            lost. Non-custodial wallets eliminate this counterparty risk, but
            place full responsibility for security on the user.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Hot vs Cold */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hot Wallets vs Cold Wallets
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Wallets are also categorized by their connectivity:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Hot Wallets (Internet-Connected)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Hot wallets are always connected to the internet, making them
            convenient for frequent transactions but more vulnerable to attacks.
            Browser extensions (MetaMask), mobile apps (Rainbow, Trust Wallet),
            and desktop apps (Exodus) are all hot wallets. They are ideal for
            daily use, small amounts, and active DeFi participation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Cold Wallets (Offline)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Cold wallets store private keys completely offline, making them
            immune to online attacks. Hardware wallets (Ledger, Trezor) are the
            most common type. They sign transactions on the physical device
            itself &mdash; private keys never touch your computer or the
            internet. Paper wallets (printed private keys) are another form of
            cold storage, though less practical.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Hot Wallet
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Cold Wallet
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Internet connection</td>
                  <td className="px-4 py-3">Always online</td>
                  <td className="px-4 py-3">Offline (air-gapped)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Convenience</td>
                  <td className="px-4 py-3">High (instant transactions)</td>
                  <td className="px-4 py-3">Lower (requires physical device)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Security level</td>
                  <td className="px-4 py-3">Good (vulnerable to malware)</td>
                  <td className="px-4 py-3">Excellent (immune to remote attacks)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Best for</td>
                  <td className="px-4 py-3">Daily transactions, small amounts</td>
                  <td className="px-4 py-3">Long-term storage, large amounts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Cost</td>
                  <td className="px-4 py-3">Free</td>
                  <td className="px-4 py-3">$60&ndash;$200+ (hardware wallets)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The recommended approach is to use both: a hot wallet with small
            amounts for daily use and dApp interactions, and a cold wallet for
            long-term storage of significant holdings. Many users connect their
            hardware wallet to MetaMask for the best of both worlds &mdash;
            hardware security with browser convenience.
          </p>
        </section>

        {/* Popular Wallets Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Popular Wallet Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a comparison of the most popular crypto wallets across
            different categories:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Wallet
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Platforms
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Chains
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">MetaMask</td>
                  <td className="px-4 py-3">Browser / Mobile</td>
                  <td className="px-4 py-3">Chrome, Firefox, iOS, Android</td>
                  <td className="px-4 py-3">EVM chains</td>
                  <td className="px-4 py-3">DeFi, dApp interaction</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Ledger Nano</td>
                  <td className="px-4 py-3">Hardware</td>
                  <td className="px-4 py-3">USB device + Ledger Live</td>
                  <td className="px-4 py-3">5,000+ coins</td>
                  <td className="px-4 py-3">Long-term storage, security</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Trezor</td>
                  <td className="px-4 py-3">Hardware</td>
                  <td className="px-4 py-3">USB device + Trezor Suite</td>
                  <td className="px-4 py-3">1,000+ coins</td>
                  <td className="px-4 py-3">Open-source security</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Rainbow</td>
                  <td className="px-4 py-3">Mobile / Browser</td>
                  <td className="px-4 py-3">iOS, Android, Chrome</td>
                  <td className="px-4 py-3">Ethereum, L2s</td>
                  <td className="px-4 py-3">NFTs, user-friendly UI</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Phantom</td>
                  <td className="px-4 py-3">Browser / Mobile</td>
                  <td className="px-4 py-3">Chrome, iOS, Android</td>
                  <td className="px-4 py-3">Solana, Ethereum, Polygon</td>
                  <td className="px-4 py-3">Multi-chain, Solana ecosystem</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Rabby</td>
                  <td className="px-4 py-3">Browser</td>
                  <td className="px-4 py-3">Chrome, Brave, Edge</td>
                  <td className="px-4 py-3">EVM chains</td>
                  <td className="px-4 py-3">Multi-chain DeFi, security alerts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Safe (Gnosis Safe)</td>
                  <td className="px-4 py-3">Smart Contract</td>
                  <td className="px-4 py-3">Web app</td>
                  <td className="px-4 py-3">EVM chains</td>
                  <td className="px-4 py-3">Multi-sig, DAO treasuries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Security Best Practices */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Wallet Security Best Practices
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Securing your crypto wallet is entirely your responsibility. Follow
            these practices to protect your assets:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Seed Phrase Protection
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Write your seed phrase on physical paper or a metal backup plate.
              Never store it digitally.
            </li>
            <li>
              Store in a fireproof, waterproof location (safe deposit box, home
              safe).
            </li>
            <li>
              Consider splitting across locations (e.g., Shamir&apos;s Secret
              Sharing or multiple physical copies in different secure locations).
            </li>
            <li>
              Never take a photo or screenshot of your seed phrase.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction Safety
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Always verify the receiving address before sending. Send a small
              test transaction first for large transfers.
            </li>
            <li>
              Double-check the URL of any dApp before connecting your wallet.
              Bookmark trusted sites.
            </li>
            <li>
              Review token approvals carefully. Only approve the amount you
              actually need, not unlimited.
            </li>
            <li>
              Regularly revoke unnecessary token approvals using tools like
              revoke.cash.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Device Security
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Keep your browser and wallet extension up to date.
            </li>
            <li>
              Use a dedicated browser profile for crypto activities.
            </li>
            <li>
              Be wary of browser extensions &mdash; malicious ones can read and
              modify wallet interactions.
            </li>
            <li>
              Consider using a hardware wallet for any amount you would be
              upset to lose.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Social Engineering
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              No legitimate project will ever DM you first asking to connect
              your wallet.
            </li>
            <li>
              Never click links in Discord DMs, Telegram messages, or
              suspicious emails.
            </li>
            <li>
              &quot;Support staff&quot; will never ask for your seed phrase or
              private key.
            </li>
            <li>
              Be skeptical of &quot;free mint&quot; and airdrop links on social
              media.
            </li>
          </ul>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Golden rule:</strong> If someone asks for your seed phrase
              or private key, it is always a scam. No exceptions. Legitimate
              services never need your seed phrase.
            </p>
          </div>
        </section>

        {/* Choosing a Wallet */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Choose the Right Wallet
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The right wallet depends on your needs:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Beginners</strong>: Start with
              MetaMask (browser) or Rainbow (mobile). Both are free, well
              documented, and widely supported by dApps.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Active DeFi users</strong>: Use
              Rabby for its built-in security alerts and multi-chain support, or
              MetaMask connected to a hardware wallet.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Long-term holders</strong>: A
              Ledger or Trezor hardware wallet is essential. Connect it to
              MetaMask for the best balance of security and convenience.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">DAOs and teams</strong>: Safe
              (Gnosis Safe) provides multi-signature security where multiple
              approvals are needed for each transaction.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Multi-chain users</strong>: Phantom
              supports Solana and EVM chains in one wallet. For maximum
              coverage, a Ledger supports thousands of assets.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What happens if I lose my seed phrase?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              If you lose your seed phrase and do not have any other backup of
              your private keys, your funds are permanently lost. No one can
              recover them for you. There is no &quot;forgot password&quot; option in
              crypto. This is why it is critical to write down your seed phrase
              on paper (not digitally) and store it in a secure, fireproof
              location. Consider using a metal seed phrase backup for extra
              durability.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is MetaMask safe to use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              MetaMask is one of the most widely used and battle-tested browser
              wallets. It is open source and has been audited multiple times.
              However, as a hot wallet (connected to the internet), it is
              inherently less secure than a hardware wallet. The main risks come
              from phishing attacks, malicious dApp approvals, and
              browser-based malware. For significant holdings, pair MetaMask
              with a hardware wallet like Ledger for maximum security.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between a wallet address and a private key?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Your wallet address (like 0xABC...123) is public and safe to
              share. It is like a bank account number that people use to send
              you funds. Your private key is a secret 256-bit number that proves
              ownership and authorizes transactions. Sharing your private key
              gives someone complete control over all assets at that address.
              Never share your private key or seed phrase with anyone.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can I use one wallet for multiple blockchains?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Many modern wallets support multiple blockchains. MetaMask
              natively supports Ethereum and any EVM-compatible chain (Polygon,
              Arbitrum, BSC, Avalanche, etc.). Multi-chain wallets like Phantom
              support both Solana and Ethereum. Hardware wallets like Ledger
              support hundreds of different blockchains through their companion
              apps. However, a single wallet address format typically works only
              within its own ecosystem.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Do I need a hardware wallet?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              For small amounts and learning, a browser or mobile wallet is
              fine. However, if you hold significant value in cryptocurrency (a
              common threshold is $1,000+), a hardware wallet is strongly
              recommended. Hardware wallets keep your private keys offline,
              making them immune to phishing, malware, and remote hacking. The
              cost ($60&ndash;$200) is minimal compared to the security it
              provides.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try Wallet Tools
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Explore how crypto wallets work under the hood. Use our{" "}
            <Link
              href="/crypto/private-key-to-address"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Private Key to Address
            </Link>{" "}
            tool to see key derivation in action, or generate a{" "}
            <Link
              href="/crypto/mnemonic-generator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              BIP39 Mnemonic Phrase
            </Link>{" "}
            to understand seed creation. Validate any address with our{" "}
            <Link
              href="/crypto/checksum-address"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Checksum Address Converter
            </Link>
            .
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Guides &amp; Tools
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/bip39-explained"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                BIP39 Mnemonic Phrases Explained
              </Link>{" "}
              &mdash; Deep dive into seed phrase generation
            </li>
            <li>
              <Link
                href="/crypto/private-key-to-address"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Private Key to Address
              </Link>{" "}
              &mdash; See key-to-address derivation live
            </li>
            <li>
              <Link
                href="/crypto/checksum-address"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Checksum Address Converter
              </Link>{" "}
              &mdash; Verify and format Ethereum addresses
            </li>
            <li>
              <Link
                href="/crypto/mnemonic-generator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                BIP39 Mnemonic Generator
              </Link>{" "}
              &mdash; Generate test seed phrases
            </li>
            <li>
              <Link
                href="/guides/what-is-web3"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Web3?
              </Link>{" "}
              &mdash; The decentralized internet that wallets unlock
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
