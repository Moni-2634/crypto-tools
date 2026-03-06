import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is DeFi? A Complete Guide to Decentralized Finance | EVMTools",
  description:
    "Learn what DeFi is, how decentralized finance works, major protocols like Uniswap and Aave, AMMs, liquidity pools, yield farming, flash loans, and DeFi risks.",
  keywords: [
    "defi",
    "decentralized finance",
    "what is defi",
    "defi explained",
    "defi protocols",
    "yield farming",
    "liquidity pool",
    "amm",
    "automated market maker",
    "impermanent loss",
    "flash loans",
    "tvl",
  ],
  openGraph: {
    title:
      "What is DeFi? A Complete Guide to Decentralized Finance | EVMTools",
    description:
      "Learn what DeFi is, how decentralized finance works, major protocols like Uniswap and Aave, AMMs, liquidity pools, yield farming, flash loans, and DeFi risks.",
    url: `${SITE_URL}/guides/what-is-defi`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is DeFi? A Complete Guide to Decentralized Finance",
    description:
      "Learn what DeFi is, how decentralized finance works, major protocols like Uniswap and Aave, AMMs, liquidity pools, yield farming, flash loans, and DeFi risks.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-defi`,
  },
};

export default function WhatIsDeFiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is DeFi? A Complete Guide to Decentralized Finance",
    description:
      "Learn what DeFi is, how decentralized finance works, major protocols like Uniswap and Aave, AMMs, liquidity pools, yield farming, flash loans, and DeFi risks.",
    url: `${SITE_URL}/guides/what-is-defi`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-defi`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Is DeFi safe?",
      answer:
        "DeFi carries significant risks including smart contract bugs, oracle manipulation, rug pulls, and impermanent loss. While established protocols like Uniswap and Aave have been battle-tested, even audited contracts can have vulnerabilities. Never invest more than you can afford to lose, and stick to well-established protocols with proven track records.",
    },
    {
      question: "How do I get started with DeFi?",
      answer:
        "To get started: (1) Set up a wallet like MetaMask, (2) Buy ETH from a centralized exchange and transfer it to your wallet, (3) Start with a simple swap on Uniswap or Curve, (4) Consider providing liquidity with stablecoins first to minimize risk, (5) Always start with small amounts while learning.",
    },
    {
      question: "What is impermanent loss?",
      answer:
        "Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when you deposited them. If you had simply held the tokens, you would have more value than what the pool returned. It is called 'impermanent' because the loss only becomes permanent when you withdraw. Trading fees can offset this loss over time.",
    },
    {
      question: "What is TVL in DeFi?",
      answer:
        "TVL (Total Value Locked) is the total value of crypto assets deposited in a DeFi protocol's smart contracts. It is the most common metric for measuring a protocol's size and adoption. Higher TVL generally indicates more trust and usage, but it should not be the only factor in evaluating a protocol's safety.",
    },
    {
      question: "What are flash loans?",
      answer:
        "Flash loans are uncollateralized loans that must be borrowed and repaid within a single blockchain transaction. If the loan is not repaid by the end of the transaction, the entire transaction reverts as if it never happened. They enable advanced strategies like arbitrage and liquidations without requiring capital, but have also been used in exploits.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-defi">
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
            DeFi (Decentralized Finance) is a movement to rebuild
            traditional financial services &mdash; lending, borrowing,
            trading, insurance &mdash; using open-source smart contracts on
            public blockchains. Instead of banks and brokers, DeFi uses
            transparent code that anyone can inspect, audit, and use. This
            guide explains how DeFi works, its core primitives, major
            protocols, and the risks you need to understand before
            participating.
          </p>
        </section>

        {/* What is DeFi */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is DeFi?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              Decentralized Finance (DeFi)
            </strong>{" "}
            refers to financial applications built on blockchain networks,
            primarily Ethereum. These applications replace traditional
            financial intermediaries (banks, exchanges, brokerages) with
            smart contracts &mdash; self-executing programs that operate
            transparently and without centralized control.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The core principles of DeFi are:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Permissionless</strong>: Anyone
              with an internet connection and a wallet can access DeFi
              services. No ID verification, credit checks, or minimum
              balances required.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Transparent</strong>: All
              transactions and smart contract code are publicly visible on
              the blockchain. You can verify exactly how a protocol works.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Non-custodial</strong>: You
              maintain control of your assets. DeFi protocols interact with
              your wallet through approvals, not by taking custody of your
              funds.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Composable</strong>: DeFi
              protocols can be combined like building blocks. A loan from
              Aave can be deposited into Curve to earn yield, which can be
              auto-compounded by Yearn. This is often called &quot;money legos.&quot;
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Global</strong>: DeFi operates
              24/7, 365 days a year, across all borders. No business hours
              or holiday closures.
            </li>
          </ul>
        </section>

        {/* DeFi vs TradFi */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            DeFi vs Traditional Finance
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding DeFi is easiest when compared to the traditional
            financial system it aims to replace:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Traditional Finance
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    DeFi
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Intermediaries</td>
                  <td className="px-4 py-3">Banks, brokers, clearinghouses</td>
                  <td className="px-4 py-3">Smart contracts (code)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Access</td>
                  <td className="px-4 py-3">KYC/AML required, geographic limits</td>
                  <td className="px-4 py-3">Anyone with a wallet</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Operating hours</td>
                  <td className="px-4 py-3">Business hours, Mon-Fri</td>
                  <td className="px-4 py-3">24/7/365</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Settlement</td>
                  <td className="px-4 py-3">T+2 days (stocks)</td>
                  <td className="px-4 py-3">Seconds to minutes</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Transparency</td>
                  <td className="px-4 py-3">Opaque, limited public data</td>
                  <td className="px-4 py-3">Fully transparent on-chain</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Custody</td>
                  <td className="px-4 py-3">Bank holds your funds</td>
                  <td className="px-4 py-3">You control your wallet</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Insurance</td>
                  <td className="px-4 py-3">FDIC insured (up to $250k)</td>
                  <td className="px-4 py-3">No government insurance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Regulation</td>
                  <td className="px-4 py-3">Heavily regulated</td>
                  <td className="px-4 py-3">Evolving regulatory landscape</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Core DeFi Primitives */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Core DeFi Primitives
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DeFi is built from several fundamental building blocks. Each
            serves a specific financial function:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Decentralized Exchanges (DEXs)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DEXs allow peer-to-peer token trading without a centralized
            order book. Instead of matching buyers and sellers, most DEXs
            use{" "}
            <strong className="text-gray-900 dark:text-white">
              Automated Market Makers (AMMs)
            </strong>{" "}
            &mdash; liquidity pools with algorithmic pricing. When you swap
            tokens on Uniswap, you are trading against a pool of tokens,
            not another person.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lending and Borrowing
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Lending protocols let you deposit crypto to earn interest or
            borrow against your deposited collateral. Interest rates are
            determined algorithmically based on supply and demand. All loans
            are over-collateralized &mdash; you must deposit more value
            than you borrow.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Stablecoins
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Stablecoins are tokens pegged to a stable asset, usually the
            US dollar. They serve as the backbone of DeFi by providing a
            stable unit of account for trading and lending:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Fiat-backed</strong>: USDC,
              USDT &mdash; backed by real USD in bank accounts
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Crypto-backed</strong>: DAI
              &mdash; backed by over-collateralized crypto deposits
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Algorithmic</strong>: Use
              algorithms and incentives to maintain the peg (higher risk)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Yield Farming
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Yield farming (or liquidity mining) involves depositing tokens
            into DeFi protocols to earn rewards. These rewards come from
            trading fees, interest payments, and protocol token incentives.
            Yield farmers often move funds between protocols to maximize
            returns.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Major Protocols */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Major DeFi Protocols
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The DeFi ecosystem has grown to include hundreds of protocols.
            Here are the most important ones that define the space:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Protocol
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Category
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    What It Does
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Uniswap</td>
                  <td className="px-4 py-3">DEX</td>
                  <td className="px-4 py-3">
                    Largest AMM-based decentralized exchange. Swap any
                    ERC-20 token pair.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Aave</td>
                  <td className="px-4 py-3">Lending</td>
                  <td className="px-4 py-3">
                    Deposit crypto to earn interest, borrow against
                    collateral. Flash loans.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Compound</td>
                  <td className="px-4 py-3">Lending</td>
                  <td className="px-4 py-3">
                    Algorithmic money market protocol. Interest rates set
                    by supply/demand curves.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">MakerDAO</td>
                  <td className="px-4 py-3">Stablecoin</td>
                  <td className="px-4 py-3">
                    Issues DAI stablecoin. Users lock collateral (ETH,
                    WBTC, etc.) to mint DAI.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Curve</td>
                  <td className="px-4 py-3">DEX</td>
                  <td className="px-4 py-3">
                    Optimized for stablecoin and pegged-asset swaps with
                    minimal slippage.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Lido</td>
                  <td className="px-4 py-3">Staking</td>
                  <td className="px-4 py-3">
                    Liquid staking protocol. Stake ETH and receive stETH
                    to use in DeFi.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Yearn Finance</td>
                  <td className="px-4 py-3">Yield</td>
                  <td className="px-4 py-3">
                    Automated yield optimization. Deposits are
                    automatically moved to highest-yield strategies.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* AMMs Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How AMMs (Automated Market Makers) Work
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Traditional exchanges use order books where buyers place bids
            and sellers place asks. AMMs replace this with a mathematical
            formula. The most common is the{" "}
            <strong className="text-gray-900 dark:text-white">
              constant product formula
            </strong>{" "}
            used by Uniswap:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`x * y = k

Where:
  x = quantity of Token A in the pool
  y = quantity of Token B in the pool
  k = constant (product must remain the same after every trade)

Example: A pool with 100 ETH and 200,000 USDC
  k = 100 * 200,000 = 20,000,000

To buy 1 ETH:
  New ETH in pool = 99
  New USDC = 20,000,000 / 99 = 202,020.20
  Cost = 202,020.20 - 200,000 = 2,020.20 USDC per ETH`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The price is determined by the ratio of tokens in the pool.
            Larger trades cause more price impact (slippage) because they
            shift the ratio more significantly. Concentrated liquidity
            (Uniswap V3) improves capital efficiency by allowing liquidity
            providers to specify price ranges.
          </p>
        </section>

        {/* Liquidity Pools and Impermanent Loss */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Liquidity Pools and Impermanent Loss
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Liquidity pools are smart contracts that hold reserves of two
            (or more) tokens. Liquidity Providers (LPs) deposit equal
            values of both tokens and earn a share of trading fees
            proportional to their contribution.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Deposit: 1 ETH ($2,000) + 2,000 USDC = $4,000 total
Pool share: 10% of the pool

Traders swap through the pool...
You earn 0.3% of every swap (Uniswap V2 fee tier)

Withdraw: 0.8 ETH ($2,400 each) + 2,200 USDC
Pool value: $4,120
If you held: 1 ETH ($2,400) + 2,000 USDC = $4,400
Impermanent loss: $4,400 - $4,120 = $280 (offset by fees earned)`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Understanding Impermanent Loss
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Impermanent loss occurs when the price ratio of your deposited
            tokens changes. The pool automatically rebalances, selling the
            token that is increasing in value and buying the one that is
            decreasing. If you had simply held the tokens, you would have
            had more value.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The loss is &quot;impermanent&quot; because it only becomes permanent
            when you withdraw. If the prices return to their original ratio,
            the loss disappears. Trading fees can offset impermanent loss
            over time, especially in high-volume pools.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Price Change
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Impermanent Loss
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1.25x (25% increase)</td>
                  <td className="px-4 py-3">0.6%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1.50x (50% increase)</td>
                  <td className="px-4 py-3">2.0%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">2x (100% increase)</td>
                  <td className="px-4 py-3">5.7%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">3x (200% increase)</td>
                  <td className="px-4 py-3">13.4%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5x (400% increase)</td>
                  <td className="px-4 py-3">25.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Flash Loans */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Flash Loans
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Flash loans are one of the most innovative DeFi primitives.
            They allow you to borrow any amount of tokens with{" "}
            <strong className="text-gray-900 dark:text-white">
              zero collateral
            </strong>
            , as long as you repay the loan within the same transaction. If
            you cannot repay, the entire transaction reverts as if nothing
            happened.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Flash loan flow (single transaction):
1. Borrow 1,000,000 USDC from Aave (no collateral)
2. Swap USDC for ETH on Uniswap (price: $2,000)
3. Swap ETH for USDC on SushiSwap (price: $2,010)
4. Repay 1,000,000 USDC + 0.09% fee to Aave
5. Keep the profit (~$5,000 minus gas)

// If any step fails, everything reverts
// Risk: only the gas cost of a failed transaction`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Legitimate uses include arbitrage (exploiting price differences
            between DEXs), collateral swaps (changing loan collateral
            without repaying first), and self-liquidation (repaying loans
            to avoid liquidation penalties). However, flash loans have also
            been used in attacks to manipulate oracle prices.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* TVL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TVL (Total Value Locked)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            TVL measures the total value of crypto assets deposited in a
            DeFi protocol&apos;s smart contracts. It is the most widely used
            metric for evaluating DeFi protocols, similar to AUM (Assets
            Under Management) in traditional finance.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            However, TVL has limitations:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Double counting</strong>: The same
              dollar can be counted multiple times as it moves through
              composable protocols.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Price sensitivity</strong>: TVL
              rises and falls with token prices, not just deposits.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Mercenary capital</strong>: High
              TVL can be temporary, driven by yield incentives that will
              eventually end.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Track DeFi TVL across protocols on sites like DeFiLlama
            (defillama.com), which provides comprehensive and non-biased
            TVL data across all chains and protocols.
          </p>
        </section>

        {/* Risks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            DeFi Risks
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DeFi offers powerful financial tools, but it comes with
            significant risks that every user must understand:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Smart Contract Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Bugs in smart contracts can lead to permanent loss of funds.
            Even audited contracts can have vulnerabilities. The 2016 DAO
            hack ($60M), the 2022 Wormhole bridge exploit ($320M), and the
            2023 Euler Finance hack ($197M) are reminders that code is not
            infallible.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Oracle Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DeFi protocols rely on oracles (like Chainlink) to get off-chain
            price data. If an oracle is manipulated or provides stale data,
            protocols can be exploited. Flash loan attacks often target
            oracle dependencies.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Rug Pulls
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Malicious developers create seemingly legitimate protocols, attract
            deposits, and then drain the funds. Warning signs include
            unaudited code, anonymous teams, locked contract admin keys, and
            too-good-to-be-true yields.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Impermanent Loss
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            As discussed above, providing liquidity to AMMs exposes you to
            impermanent loss when token prices diverge. This can exceed the
            fees earned, resulting in a net loss compared to simply holding.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Liquidation Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When borrowing in DeFi, if the value of your collateral drops
            below the required threshold, your position is automatically
            liquidated. Liquidation typically incurs a penalty (5-15% of
            the borrowed amount).
          </p>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> Never invest more than you can
              afford to lose in DeFi. Start with small amounts, use
              established protocols, and always verify contract addresses.
              Phishing sites that impersonate popular DeFi protocols are
              extremely common.
            </p>
          </div>
        </section>

        {/* Getting Started */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Get Started Safely
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you are new to DeFi, follow these steps to minimize risk:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Set up a wallet</strong>: Install
              MetaMask or a hardware wallet (Ledger, Trezor). Never share
              your seed phrase.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Start with established protocols</strong>:
              Use Uniswap, Aave, or Curve. These have been battle-tested
              with billions of dollars.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Begin with stablecoins</strong>:
              Your first DeFi experience should use stablecoins (USDC/DAI)
              to eliminate price volatility risk.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Use small amounts</strong>: Treat
              your first DeFi transactions as learning experiences, not
              investments.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Verify contract addresses</strong>:
              Always navigate to DeFi sites directly (bookmark them) and
              verify you are on the correct URL. Check contract addresses
              against official documentation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Manage approvals</strong>: Review
              and revoke unnecessary token approvals regularly. Only approve
              the amount you need.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Consider L2 networks</strong>: Use
              Layer 2 networks (Arbitrum, Optimism, Base) for lower gas
              fees while learning.
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is DeFi safe?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              DeFi carries significant risks including smart contract bugs,
              oracle manipulation, rug pulls, and impermanent loss. While
              established protocols like Uniswap and Aave have been
              battle-tested, even audited contracts can have vulnerabilities.
              Never invest more than you can afford to lose, and stick to
              well-established protocols with proven track records.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How do I get started with DeFi?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              To get started: set up a wallet like MetaMask, buy ETH from a
              centralized exchange and transfer it to your wallet, start
              with a simple swap on Uniswap or Curve, consider providing
              liquidity with stablecoins first to minimize risk, and always
              start with small amounts while learning.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is impermanent loss?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Impermanent loss occurs when the price ratio of tokens in a
              liquidity pool changes compared to when you deposited them. If
              you had simply held the tokens, you would have more value than
              what the pool returned. It is called &quot;impermanent&quot; because the
              loss only becomes permanent when you withdraw. Trading fees
              can offset this loss over time.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is TVL in DeFi?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              TVL (Total Value Locked) is the total value of crypto assets
              deposited in a DeFi protocol&apos;s smart contracts. It is the
              most common metric for measuring a protocol&apos;s size and
              adoption. Higher TVL generally indicates more trust and usage,
              but it should not be the only factor in evaluating a
              protocol&apos;s safety.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What are flash loans?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Flash loans are uncollateralized loans that must be borrowed
              and repaid within a single blockchain transaction. If the loan
              is not repaid by the end of the transaction, the entire
              transaction reverts as if it never happened. They enable
              advanced strategies like arbitrage and liquidations without
              requiring capital upfront.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Working with DeFi transactions? Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to estimate transaction costs, or the{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>{" "}
            to convert between Wei, Gwei, and ETH. Check out our{" "}
            <Link
              href="/guides/what-is-erc20"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-20 guide
            </Link>{" "}
            to understand the token standard that powers DeFi.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate Ethereum transaction costs
            </li>
            <li>
              <Link
                href="/crypto/eth-unit-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ETH Unit Converter
              </Link>{" "}
              &mdash; Convert between Wei, Gwei, and ETH
            </li>
            <li>
              <Link
                href="/crypto/calldata-decoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Calldata Decoder
              </Link>{" "}
              &mdash; Decode DeFi transaction data
            </li>
            <li>
              <Link
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder / Decoder
              </Link>{" "}
              &mdash; Encode and decode smart contract calls
            </li>
            <li>
              <Link
                href="/crypto/checksum-address"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Checksum Address Converter
              </Link>{" "}
              &mdash; Verify DeFi contract addresses
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
