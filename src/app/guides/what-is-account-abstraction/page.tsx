import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is Account Abstraction? ERC-4337 Explained | EVMTools",
  description:
    "Learn what account abstraction is, how ERC-4337 works with UserOperations, Bundlers, EntryPoint, and Paymasters, smart contract wallets, social recovery, gas sponsorship, session keys, and wallet implementations.",
  keywords: [
    "account abstraction",
    "erc-4337",
    "what is account abstraction",
    "smart contract wallet",
    "erc 4337",
    "account abstraction ethereum",
    "userOperation",
    "bundler",
    "paymaster",
    "entrypoint",
    "social recovery",
    "gasless transactions",
  ],
  openGraph: {
    title:
      "What is Account Abstraction? ERC-4337 Explained | EVMTools",
    description:
      "Learn what account abstraction is, how ERC-4337 works with UserOperations, Bundlers, EntryPoint, and Paymasters, smart contract wallets, social recovery, gas sponsorship, session keys, and wallet implementations.",
    url: `${SITE_URL}/guides/what-is-account-abstraction`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Account Abstraction? ERC-4337 Explained",
    description:
      "Learn what account abstraction is, how ERC-4337 works with UserOperations, Bundlers, EntryPoint, and Paymasters, smart contract wallets, social recovery, gas sponsorship, session keys, and wallet implementations.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-account-abstraction`,
  },
};

export default function WhatIsAccountAbstractionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Account Abstraction? ERC-4337 Explained",
    description:
      "Learn what account abstraction is, how ERC-4337 works with UserOperations, Bundlers, EntryPoint, and Paymasters, smart contract wallets, social recovery, gas sponsorship, session keys, and wallet implementations.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-account-abstraction`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-account-abstraction`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is the difference between EOA and smart contract accounts?",
      answer:
        "An EOA (Externally Owned Account) is controlled by a private key and can initiate transactions but has no programmable logic. A smart contract account is a smart contract that can hold assets and execute transactions based on arbitrary programmatic rules. EOAs are simple but inflexible: you lose the private key, you lose access forever. Smart contract accounts can implement social recovery, multisig authorization, spending limits, session keys, and other features that make them far more flexible and user-friendly.",
    },
    {
      question: "Do I need to hold ETH to use account abstraction?",
      answer:
        "No, one of the key benefits of account abstraction is gas sponsorship through Paymasters. A Paymaster is a smart contract that pays gas fees on behalf of the user. This means users can interact with dApps without holding any ETH for gas. The dApp or a third party sponsors the gas cost. Users can also pay gas in ERC-20 tokens like USDC instead of ETH. This removes one of the biggest friction points for new users entering Web3.",
    },
    {
      question: "Is ERC-4337 already live on Ethereum?",
      answer:
        "Yes, ERC-4337 has been live on Ethereum mainnet since March 2023, and it is deployed on most major EVM chains including Arbitrum, Optimism, Base, Polygon, Avalanche, and BNB Chain. The EntryPoint contract is a singleton deployed at the same address across all supported chains. Adoption has been growing rapidly, with millions of UserOperations processed and hundreds of thousands of smart accounts deployed.",
    },
    {
      question: "What is a Bundler in ERC-4337?",
      answer:
        "A Bundler is a node that collects UserOperations from a separate mempool (not the regular transaction mempool), bundles multiple UserOperations into a single regular Ethereum transaction, and submits it to the EntryPoint contract. Bundlers serve a similar role to block builders in the regular transaction pipeline. They earn fees from processing UserOperations. Multiple bundler implementations exist, including those from Stackup, Pimlico, Alchemy, and Biconomy.",
    },
    {
      question: "How does social recovery work with account abstraction?",
      answer:
        "Social recovery allows you to regain access to your wallet without a seed phrase by designating trusted 'guardians' (friends, family members, or institutions). If you lose access to your wallet, a majority of your guardians can authorize a new signing key. For example, you might set up 3 of 5 guardians: if you lose your phone, any 3 of your 5 guardians can approve restoring access to a new device. This is only possible with smart contract wallets because the recovery logic is programmable.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-account-abstraction">
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
            Account abstraction is one of the most significant upgrades to the
            Ethereum user experience. It transforms how wallets work by
            replacing rigid private key accounts with programmable{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contract
            </Link>{" "}
            wallets that can implement any authentication or authorization
            logic. With account abstraction, users no longer need to manage
            seed phrases, hold ETH for gas, or sign every single transaction.
            This guide explains the problem account abstraction solves, how
            ERC-4337 works technically, the benefits it brings, and the leading
            wallet implementations building on it.
          </p>
        </section>

        {/* The Problem: EOAs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Problem: Externally Owned Accounts (EOAs)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Today, most Ethereum users interact through{" "}
            <strong className="text-gray-900 dark:text-white">
              Externally Owned Accounts (EOAs)
            </strong>{" "}
            &mdash; the accounts created by wallets like MetaMask. An EOA is
            controlled by a single private key (represented as a seed phrase),
            and it has severe limitations:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Single point of failure
              </strong>
              : Lose your private key or seed phrase, and your funds are gone
              forever. There is no recovery mechanism. An estimated $100+
              billion in crypto is permanently lost due to lost keys.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Must hold ETH for gas
              </strong>
              : Every transaction requires ETH to pay gas fees, even if you
              only want to transfer USDC. New users must first acquire ETH
              before they can do anything on-chain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                One signature per transaction
              </strong>
              : EOAs can only sign one transaction at a time. Approving a
              token and then swapping it requires two separate transactions,
              two gas payments, and two confirmations.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                No programmable logic
              </strong>
              : EOAs cannot enforce spending limits, require multisig
              approval, schedule transactions, or implement any custom rules.
              Every transaction has the same unlimited authority.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                ECDSA only
              </strong>
              : EOAs are locked into a single cryptographic signature scheme
              (secp256k1 ECDSA). You cannot use biometrics, passkeys,
              multi-party computation, or post-quantum signatures.
            </li>
          </ul>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>The fundamental issue:</strong> EOAs conflate identity
              (who you are) with authorization (what you can do) into a single
              private key. Account abstraction decouples these, allowing
              programmable authorization rules while keeping your identity
              flexible and recoverable.
            </p>
          </div>
        </section>

        {/* EOA vs Smart Contract Accounts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            EOA vs Smart Contract Accounts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    EOA (MetaMask)
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Smart Contract Account
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Controlled by</td>
                  <td className="px-4 py-3">Single private key</td>
                  <td className="px-4 py-3">Programmable logic (code)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Recovery</td>
                  <td className="px-4 py-3">Seed phrase only (no recovery)</td>
                  <td className="px-4 py-3">
                    Social recovery, guardian-based
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Gas payment</td>
                  <td className="px-4 py-3">Must hold ETH</td>
                  <td className="px-4 py-3">
                    Paymaster can sponsor or pay in ERC-20
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Batch transactions</td>
                  <td className="px-4 py-3">One per tx (approve + swap = 2 tx)</td>
                  <td className="px-4 py-3">
                    Multiple actions in one tx (approve + swap = 1 tx)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Signature scheme</td>
                  <td className="px-4 py-3">ECDSA only</td>
                  <td className="px-4 py-3">
                    Any: passkeys, multisig, MPC, biometrics
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Spending limits</td>
                  <td className="px-4 py-3">No (full access always)</td>
                  <td className="px-4 py-3">
                    Programmable daily/per-tx limits
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Session keys</td>
                  <td className="px-4 py-3">Not possible</td>
                  <td className="px-4 py-3">
                    Temporary keys with limited permissions
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ERC-4337 Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ERC-4337 Explained
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              ERC-4337
            </strong>{" "}
            is the standard that brings account abstraction to Ethereum
            without requiring changes to the core protocol. It was authored by
            Vitalik Buterin, Yoav Weiss, and others, and the singleton{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              EntryPoint
            </code>{" "}
            contract was deployed on Ethereum mainnet in March 2023.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-4337 introduces a parallel transaction pipeline alongside
            Ethereum&apos;s existing one. Instead of sending regular
            transactions, users create{" "}
            <strong className="text-gray-900 dark:text-white">
              UserOperations
            </strong>{" "}
            that are processed through a specialized flow:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            The Four Key Components
          </h3>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. UserOperation
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A UserOperation (UserOp) is a pseudo-transaction object that
            describes what the user wants to do. It replaces the traditional
            Ethereum transaction and includes fields like{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              sender
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              callData
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              callGasLimit
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              signature
            </code>
            . The signature can use any verification logic defined by the
            smart account.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Bundler
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A Bundler collects UserOperations from a separate mempool (the
            &quot;alt mempool&quot;), validates them, and bundles multiple
            UserOps into a single on-chain transaction that calls the
            EntryPoint contract. Bundlers earn fees for processing UserOps,
            similar to how block builders earn from regular transactions.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. EntryPoint
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The EntryPoint is a singleton smart contract that orchestrates
            the execution of UserOperations. It verifies each UserOp&apos;s
            signature (by calling the smart account&apos;s{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              validateUserOp
            </code>{" "}
            function), handles gas payment (from the account or a Paymaster),
            and executes the operation. The same EntryPoint contract is
            deployed at the same address on every EVM chain.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Paymaster
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A Paymaster is an optional smart contract that sponsors gas fees
            for UserOperations. It enables gasless transactions (the dApp pays
            gas), gas payment in ERC-20 tokens (user pays in USDC), or
            subscription-based gas models. The EntryPoint calls the
            Paymaster&apos;s{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              validatePaymasterUserOp
            </code>{" "}
            function to confirm sponsorship before execution.
          </p>

          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`ERC-4337 Transaction Flow:

  User                Bundler              EntryPoint           Smart Account
   │                    │                      │                     │
   │  UserOperation     │                      │                     │
   │──────────────────> │                      │                     │
   │                    │  handleOps([userOp])  │                     │
   │                    │─────────────────────> │                     │
   │                    │                      │  validateUserOp()   │
   │                    │                      │────────────────────>│
   │                    │                      │  (verify signature) │
   │                    │                      │<────────────────────│
   │                    │                      │                     │
   │                    │                      │  [If Paymaster]     │
   │                    │                      │  validatePaymaster()│
   │                    │                      │                     │
   │                    │                      │  execute(callData)  │
   │                    │                      │────────────────────>│
   │                    │                      │  (swap, transfer,   │
   │                    │                      │   batch operations) │
   │                    │                      │<────────────────────│
   │                    │                      │                     │

  Gas paid by: Smart Account balance OR Paymaster
  Signature: Any scheme the Smart Account validates`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Key Benefits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Key Benefits of Account Abstraction
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Social Recovery
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Instead of relying solely on a seed phrase, smart contract wallets
            can implement guardian-based recovery. You designate trusted people
            or institutions as guardians. If you lose access to your wallet, a
            threshold of guardians (e.g., 3 of 5) can authorize a new signing
            key. This is similar to how you can reset a bank password by
            verifying your identity, but decentralized.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Social Recovery Example:

  Your Guardians (3 of 5 required):
    1. Your hardware wallet (Ledger)
    2. Your friend Alice's wallet
    3. Your brother Bob's wallet
    4. A trusted recovery service
    5. Your company multisig

  Recovery scenario:
    - You lose your phone (primary signing key)
    - You contact Alice, Bob, and the recovery service
    - They each sign a recovery transaction
    - 3 of 5 threshold met → new signing key authorized
    - You regain full access to your wallet

  Your funds were NEVER at risk of permanent loss.`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gas Sponsorship (Paymasters)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Paymasters eliminate the requirement for users to hold ETH. A dApp
            can sponsor gas for its users (onboarding new users without
            requiring them to buy ETH), or users can pay gas in stablecoins
            like USDC. This removes one of the biggest barriers to mainstream
            crypto adoption.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Batched Transactions
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart accounts can execute multiple operations in a single
            transaction. Instead of approve + swap (2 transactions, 2
            signatures, 2 gas payments), a smart account batches them into one.
            This saves gas and improves UX.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`EOA Flow (2 transactions):
  Tx 1: approve(USDC, uniswap, 1000)  → gas: ~$2, confirm, wait...
  Tx 2: swap(USDC, ETH, 1000)         → gas: ~$5, confirm, wait...
  Total: 2 signatures, 2 confirmations, ~$7 gas

Smart Account Flow (1 transaction):
  UserOp: [approve(USDC, uniswap, 1000), swap(USDC, ETH, 1000)]
  Total: 1 signature, 1 confirmation, ~$5 gas`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Session Keys
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Session keys are temporary, limited-permission signing keys that
            allow dApps to execute transactions on your behalf without needing
            approval for each one. You can grant a gaming dApp a session key
            that only allows in-game transactions, expires after 1 hour, and
            has a maximum spending limit of $10. This enables a seamless UX
            similar to Web2 sessions without compromising security.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Flexible Authentication
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart accounts can validate signatures using any scheme:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Passkeys</strong>:
              Log in with Face ID or fingerprint (WebAuthn/FIDO2)
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Multisig</strong>:
              Require 2 of 3 signers for high-value transactions
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">MPC</strong>:
              Distribute key shares across multiple devices
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Spending limits
              </strong>
              : Small transactions auto-approve, large ones require additional
              verification
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Time-based rules
              </strong>
              : Different permissions at different times or conditions
            </li>
          </ul>
        </section>

        {/* Wallet Implementations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Smart Wallet Implementations
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Several teams are building smart contract wallets and
            infrastructure on top of ERC-4337:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Project
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Key Features
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Safe (formerly Gnosis Safe)
                  </td>
                  <td className="px-4 py-3">Smart account platform</td>
                  <td className="px-4 py-3">
                    Multisig, modular plugins, $100B+ secured, most battle-tested
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ZeroDev (Kernel)
                  </td>
                  <td className="px-4 py-3">SDK + smart account</td>
                  <td className="px-4 py-3">
                    Modular kernel account, session keys, passkey support
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Biconomy
                  </td>
                  <td className="px-4 py-3">Full-stack AA platform</td>
                  <td className="px-4 py-3">
                    Bundler, Paymaster, smart account SDK, session keys
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Alchemy Account Kit
                  </td>
                  <td className="px-4 py-3">Developer SDK</td>
                  <td className="px-4 py-3">
                    Modular accounts, gas manager, embedded wallets, Signer integration
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Pimlico
                  </td>
                  <td className="px-4 py-3">AA infrastructure</td>
                  <td className="px-4 py-3">
                    Alto bundler, Paymaster service, multi-chain support
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Coinbase Smart Wallet
                  </td>
                  <td className="px-4 py-3">Consumer wallet</td>
                  <td className="px-4 py-3">
                    Passkey-based, gasless on Base, mainstream UX
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* ERC-4337 vs Native AA */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ERC-4337 vs Native Account Abstraction
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-4337 is not the only approach to account abstraction. Some
            chains implement AA at the protocol level (native AA), which has
            different trade-offs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ERC-4337 (Ethereum)
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Native AA (zkSync Era)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Implementation</td>
                  <td className="px-4 py-3">
                    Smart contract layer (no protocol changes)
                  </td>
                  <td className="px-4 py-3">
                    Built into the protocol itself
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">All accounts are smart</td>
                  <td className="px-4 py-3">
                    No (EOAs still exist alongside)
                  </td>
                  <td className="px-4 py-3">
                    Yes (every account is a smart contract)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Gas overhead</td>
                  <td className="px-4 py-3">
                    Higher (extra validation through EntryPoint)
                  </td>
                  <td className="px-4 py-3">
                    Lower (native support, no wrapper)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Compatibility</td>
                  <td className="px-4 py-3">
                    Works on any EVM chain without changes
                  </td>
                  <td className="px-4 py-3">
                    Specific to chains that implement it
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Paymaster support</td>
                  <td className="px-4 py-3">Via Paymaster contracts</td>
                  <td className="px-4 py-3">
                    Native protocol-level support
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Adoption</td>
                  <td className="px-4 py-3">
                    Broad (Ethereum, Arbitrum, Optimism, Base, Polygon, etc.)
                  </td>
                  <td className="px-4 py-3">
                    Limited (zkSync Era, StarkNet with Cairo AA)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The ERC-4337 approach was chosen for Ethereum because it does not
            require any changes to the Ethereum protocol itself (a hard fork).
            It works as a smart contract layer on top of existing
            infrastructure. Over time, some components of ERC-4337 may be
            enshrined into the Ethereum protocol for better efficiency, with
            proposals like EIP-7702 (allowing EOAs to temporarily become
            smart accounts) already being implemented.
          </p>
        </section>

        {/* How AA Improves UX */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Account Abstraction Improves User Experience
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Account abstraction enables a Web2-like user experience on Web3:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Traditional Web3 Onboarding:
  1. Download MetaMask browser extension
  2. Write down 12-word seed phrase (and store it safely)
  3. Go to a centralized exchange
  4. Complete KYC verification (days)
  5. Buy ETH with fiat
  6. Wait for deposit to clear
  7. Transfer ETH to MetaMask (pay gas)
  8. Now you can interact with a dApp (pay gas again)
  Total: 8 steps, multiple days, significant friction

Account Abstraction Onboarding:
  1. Click "Sign up" on a dApp
  2. Authenticate with Face ID / fingerprint (passkey)
  3. Start using the dApp (gas is sponsored)
  Total: 3 steps, under 30 seconds, zero friction

  No seed phrases. No ETH needed. No browser extensions.`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This is not a theoretical improvement &mdash; it is already live.
            Coinbase Smart Wallet uses passkeys for authentication and
            sponsors gas on Base. Users can onboard in seconds without ever
            seeing a seed phrase or buying ETH. Learn more about how{" "}
            <Link
              href="/guides/what-is-layer2"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Layer 2 networks
            </Link>{" "}
            make gas sponsorship economically viable.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between EOA and smart contract accounts?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              An EOA is controlled by a private key and has no programmable
              logic. A smart contract account is a smart contract that can hold
              assets and execute transactions based on arbitrary rules. EOAs
              are simple but inflexible: lose the key, lose access forever.
              Smart contract accounts can implement social recovery, multisig,
              spending limits, session keys, and more.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Do I need to hold ETH to use account abstraction?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              No. One of the key benefits is gas sponsorship through
              Paymasters. A Paymaster can pay gas on your behalf, meaning you
              can interact with dApps without holding ETH. You can also pay
              gas in ERC-20 tokens like USDC. This removes one of the biggest
              friction points for new Web3 users.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is ERC-4337 already live on Ethereum?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes, ERC-4337 has been live on Ethereum mainnet since March
              2023. It is deployed on most major EVM chains including Arbitrum,
              Optimism, Base, Polygon, Avalanche, and BNB Chain. Adoption is
              growing rapidly, with millions of UserOperations processed and
              hundreds of thousands of smart accounts deployed.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is a Bundler in ERC-4337?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A Bundler collects UserOperations from a separate mempool,
              bundles multiple UserOps into a single Ethereum transaction, and
              submits it to the EntryPoint contract. Bundlers earn fees for
              processing UserOps. Multiple implementations exist from Stackup,
              Pimlico, Alchemy, and Biconomy.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How does social recovery work with account abstraction?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Social recovery lets you regain wallet access without a seed
              phrase by designating trusted guardians. If you lose access, a
              majority of guardians can authorize a new signing key. For
              example, 3 of your 5 guardians can approve restoring access to a
              new device. This is only possible with smart contract wallets
              because the recovery logic is programmable.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Build with Smart Accounts
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Account abstraction is transforming how users interact with
            Ethereum. Learn the smart contract fundamentals in our{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              What is a Smart Contract?
            </Link>{" "}
            guide, and use our{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>{" "}
            to encode UserOperation calldata for testing and debugging.
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools &amp; Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Understand the smart contracts that power account
              abstraction
            </li>
            <li>
              <Link
                href="/guides/what-is-layer2"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Layer 2?
              </Link>{" "}
              &mdash; Learn about L2 networks where AA is most actively adopted
            </li>
            <li>
              <Link
                href="/guides/what-is-erc20"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is ERC-20?
              </Link>{" "}
              &mdash; Understand the token standard used for gas payment via
              Paymasters
            </li>
            <li>
              <Link
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder / Decoder
              </Link>{" "}
              &mdash; Encode UserOperation calldata for testing
            </li>
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate gas costs for UserOperations and Paymaster
              sponsorship
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
