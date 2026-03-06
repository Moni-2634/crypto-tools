import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is MEV? Maximal Extractable Value Explained | EVMTools",
  description:
    "Learn about MEV (Maximal Extractable Value): frontrunning, sandwich attacks, arbitrage, Flashbots, MEV-Boost, the MEV supply chain, and how to protect yourself.",
  keywords: [
    "mev",
    "maximal extractable value",
    "miner extractable value",
    "frontrunning",
    "sandwich attack",
    "flashbots",
    "mev boost",
    "mev protection",
    "searcher",
    "builder",
    "proposer",
    "arbitrage",
    "defi mev",
  ],
  openGraph: {
    title: "What is MEV? Maximal Extractable Value Explained | EVMTools",
    description:
      "Learn about MEV (Maximal Extractable Value): frontrunning, sandwich attacks, arbitrage, Flashbots, MEV-Boost, the MEV supply chain, and how to protect yourself.",
    url: `${SITE_URL}/guides/what-is-mev`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is MEV? Maximal Extractable Value Explained",
    description:
      "Learn about MEV (Maximal Extractable Value): frontrunning, sandwich attacks, arbitrage, Flashbots, MEV-Boost, the MEV supply chain, and how to protect yourself.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-mev`,
  },
};

export default function WhatIsMevPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is MEV? Maximal Extractable Value Explained",
    description:
      "Learn about MEV (Maximal Extractable Value): frontrunning, sandwich attacks, arbitrage, Flashbots, MEV-Boost, the MEV supply chain, and how to protect yourself.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-mev`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-mev`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Is MEV illegal?",
      answer:
        "MEV extraction is not illegal in most jurisdictions. Unlike traditional financial markets where frontrunning is regulated, blockchain transactions occur in a permissionless environment without equivalent regulations. However, the ethics of MEV extraction, particularly sandwich attacks that harm retail users, are widely debated in the crypto community.",
    },
    {
      question: "How much MEV is extracted on Ethereum?",
      answer:
        "Hundreds of millions of dollars in MEV have been extracted on Ethereum since DeFi became popular. The exact amount is difficult to measure because not all MEV is visible on-chain. According to Flashbots data, billions of dollars in cumulative MEV have been extracted since 2020, with daily extraction ranging from hundreds of thousands to millions of dollars during high-activity periods.",
    },
    {
      question: "How can I protect myself from MEV?",
      answer:
        "You can protect yourself by: (1) using MEV-protected RPC endpoints like Flashbots Protect or MEV Blocker, which send your transactions through private mempools; (2) setting low slippage tolerance on DEX swaps; (3) using DEX aggregators with MEV protection built in; (4) breaking large trades into smaller ones; and (5) using L2 networks where MEV is less prevalent.",
    },
    {
      question: "What is the difference between MEV and front-running?",
      answer:
        "Frontrunning is one specific type of MEV extraction. MEV (Maximal Extractable Value) is the broad concept of any profit that can be extracted by controlling transaction ordering within a block. Frontrunning specifically means placing your transaction before another user's transaction to profit from the price impact. Other forms of MEV include backrunning, sandwich attacks, liquidations, and cross-DEX arbitrage.",
    },
    {
      question: "Does MEV exist on Layer 2 networks?",
      answer:
        "Yes, MEV exists on L2 networks, but it is less prevalent because most L2s use a centralized sequencer that processes transactions in first-come-first-served (FCFS) order. This reduces opportunities for frontrunning. However, as L2s decentralize their sequencers, MEV may become more relevant. Some L2s are exploring MEV-resistant designs like encrypted mempools and fair ordering protocols.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-mev">
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
            MEV (Maximal Extractable Value) is one of the most important and
            misunderstood concepts in Ethereum. It refers to the profit that can
            be extracted by anyone who has the power to include, exclude, or
            reorder transactions within a block. MEV affects every user of
            decentralized finance, often invisibly adding costs to swaps,
            trades, and other on-chain activities. This guide explains what MEV
            is, how it works, who extracts it, and how you can protect yourself.
          </p>
        </section>

        {/* What is MEV */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is MEV?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Maximal Extractable Value (MEV) is the total value that can be
            extracted from block production beyond the standard block reward and
            gas fees. It is the profit available to whoever controls the
            ordering of transactions in a block.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The key insight is that{" "}
            <strong className="text-gray-900 dark:text-white">
              transaction order matters
            </strong>
            . On Ethereum, the order in which transactions are executed within a
            block can create profit opportunities. If someone buys a large
            amount of a token on a DEX, the price increases. Knowing this trade
            is about to happen allows someone to buy the token first (at the
            lower price) and sell it after (at the higher price).
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Think of it this way:</strong> Imagine you are in a
              physical marketplace and you overhear someone about to place a
              massive buy order for a commodity. If you can rush to buy that
              commodity before them and sell it to them at a higher price,
              that is MEV.
            </p>
          </div>
        </section>

        {/* History */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            From Miner to Maximal Extractable Value
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The term &quot;MEV&quot; was originally coined as &quot;Miner
            Extractable Value&quot; in the 2019 paper &quot;Flash Boys 2.0&quot;
            by Phil Daian and colleagues at Cornell. The paper documented how
            miners on Proof of Work Ethereum could reorder, insert, or censor
            transactions to extract profit.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            After Ethereum&apos;s transition to Proof of Stake in September
            2022, the term was retroactively renamed to &quot;Maximal
            Extractable Value&quot; since validators (not miners) now have the
            power to order transactions within blocks. The concept remains the
            same: whoever controls block production can extract value from
            transaction ordering.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MEV has grown enormously alongside DeFi. As more value flows
            through on-chain protocols, the opportunities for profitable
            reordering have multiplied. It has become a multi-billion dollar
            phenomenon that shapes Ethereum&apos;s infrastructure, economics,
            and user experience.
          </p>
        </section>

        {/* Types of MEV */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of MEV
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MEV comes in several forms, some beneficial for the ecosystem and
            others harmful to users:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frontrunning
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A frontrunner detects a profitable pending transaction in the
            mempool and submits their own transaction with a higher gas price to
            be executed first. The frontrunner profits from the price impact of
            the victim&apos;s transaction.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Frontrunning Example:
1. Alice submits: Buy 100 ETH worth of TOKEN-X on Uniswap
   (Expected price: $1.00 per token)
2. Bot detects Alice's pending transaction in the mempool
3. Bot submits: Buy TOKEN-X before Alice (higher gas price)
   Bot buys at $1.00
4. Alice's transaction executes at $1.02 (worse price)
5. Bot sells TOKEN-X at $1.02 → profit = $0.02 per token`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sandwich Attacks
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A sandwich attack is a more sophisticated form of frontrunning. The
            attacker places two transactions around the victim&apos;s
            transaction: one before (to push the price up) and one after (to
            sell at the inflated price).
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Sandwich Attack Example:
1. Alice submits: Swap 10 ETH for TOKEN-X (2% slippage tolerance)
2. Bot detects Alice's pending swap

Transaction order in block:
  → Bot buys TOKEN-X (pushes price up by ~1%)
  → Alice's swap executes at 1% worse price
  → Bot sells TOKEN-X (captures the price difference)

Result: Bot profits ~$50-200, Alice gets fewer tokens than expected`}</code>
          </pre>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Sandwich attacks are the most common
              form of harmful MEV affecting everyday users. Setting a lower
              slippage tolerance on DEX swaps reduces your exposure, but may
              cause your transaction to fail during volatile markets.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Backrunning
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Backrunning involves placing a transaction immediately after another
            transaction to profit from the state change it creates. This is
            generally considered less harmful than frontrunning because it does
            not worsen the price for the original transaction.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A common backrunning scenario is arbitrage: after a large swap moves
            the price on one DEX, a backrunner arbitrages the price difference
            between that DEX and another, restoring price equilibrium.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Liquidations
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DeFi lending protocols like Aave and Compound allow anyone to
            liquidate undercollateralized positions and earn a liquidation bonus
            (typically 5&ndash;10% of the collateral). MEV searchers compete to
            be the first to liquidate these positions, often paying high gas
            fees to ensure their liquidation transaction is included before
            competitors.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            DEX Arbitrage
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When the price of a token differs across DEXes, arbitrageurs profit
            by buying on the cheaper DEX and selling on the more expensive one
            in a single transaction. Unlike frontrunning, DEX arbitrage is
            generally beneficial because it corrects price inefficiencies and
            improves price consistency across markets.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`DEX Arbitrage Example:
  TOKEN-X price on Uniswap:  $1.00
  TOKEN-X price on Sushiswap: $1.05

  Arbitrageur:
    1. Buy TOKEN-X on Uniswap at $1.00
    2. Sell TOKEN-X on Sushiswap at $1.05
    3. Profit: $0.05 per token (minus gas fees)

  After: Both DEXes now show ~$1.025 (prices converge)`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* How MEV Extraction Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How MEV Extraction Works
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MEV extraction follows a general pattern regardless of the specific
            strategy:
          </p>
          <ol className="ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Mempool monitoring
              </strong>
              : Searchers run nodes and monitor the public mempool (the pool of
              pending transactions) for profitable opportunities. They analyze
              every pending transaction to determine if it creates an MEV
              opportunity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Opportunity identification
              </strong>
              : Sophisticated algorithms simulate the state changes of pending
              transactions to identify profitable reorderings, insertions, or
              exclusions.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Bundle construction
              </strong>
              : The searcher creates a &quot;bundle&quot; &mdash; a set of
              transactions in a specific order that captures the MEV
              opportunity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Gas bidding</strong>: Before
              Flashbots, searchers competed by submitting transactions with
              extremely high gas prices. This &quot;priority gas auction&quot;
              (PGA) caused gas price spikes for all users. Today, searchers
              compete by bidding directly to block builders.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Execution</strong>: If the
              searcher&apos;s transaction is included in the right position
              within the block, they capture the profit.
            </li>
          </ol>
        </section>

        {/* MEV Supply Chain */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The MEV Supply Chain: Searchers, Builders, Proposers
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Post-Merge Ethereum has a structured MEV supply chain with three
            distinct roles:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Searchers
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Searchers are specialized actors who monitor the mempool and
            identify MEV opportunities. They write custom software to detect
            profitable patterns and construct transaction bundles. Searchers
            compete fiercely: margins are razor-thin, and latency advantages
            measured in milliseconds can determine who captures the opportunity.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Block Builders
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Block builders are entities that aggregate transaction bundles from
            multiple searchers, combine them with regular user transactions, and
            construct the most profitable possible block. They optimize for
            total block value and compete to have their block selected by the
            proposer. Major builders include Flashbots, BeaverBuild, and
            Titan Builder.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Proposers (Validators)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Proposers are Ethereum validators who have been selected to propose
            the next block. Using MEV-Boost, they receive bids from multiple
            builders and select the highest-paying block. The proposer earns the
            builder&apos;s bid as payment, which typically exceeds what they
            would earn from building the block themselves.
          </p>

          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`MEV Supply Chain:

Searchers     →    Builders      →    Proposers
(find MEV)         (build blocks)      (propose blocks)

1. Searchers identify MEV opportunities
2. Searchers send bundles to builders (with bids)
3. Builders construct optimal blocks from multiple bundles
4. Builders bid for block inclusion via MEV-Boost relay
5. Proposer selects the highest-paying block
6. Block is proposed to the network

Revenue split:
  Searcher keeps: MEV profit - bid to builder
  Builder keeps:  Sum of searcher bids - bid to proposer
  Proposer keeps: Builder's bid (on top of base consensus rewards)`}</code>
          </pre>
        </section>

        {/* Flashbots and MEV-Boost */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Flashbots and MEV-Boost
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Flashbots
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Flashbots is a research and development organization focused on
            mitigating the negative externalities of MEV. They created several
            key pieces of infrastructure:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Flashbots Auction</strong>: A
              private channel between searchers and miners/validators that
              eliminates the need for gas price wars in the public mempool.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Flashbots Protect</strong>: A free
              RPC endpoint that users can add to their wallets to send
              transactions through a private mempool, protecting them from
              sandwich attacks.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">MEV-Boost</strong>: The middleware
              that enables validators to outsource block building to
              specialized builders via an open marketplace.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">SUAVE</strong>: Flashbots&apos;
              research into a future decentralized block building architecture.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            MEV-Boost
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MEV-Boost is an open-source middleware that implements Proposer-Builder
            Separation (PBS) for Ethereum validators. Over 90% of Ethereum
            blocks are now built through MEV-Boost. Here is how it works:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Builders construct blocks and submit them to relays.</li>
            <li>Relays validate the blocks and forward the highest bids to the proposer.</li>
            <li>The proposer selects the most profitable block (they only see the bid amount, not the block contents).</li>
            <li>The proposer signs the block header, committing to the selected block.</li>
            <li>The relay reveals the full block to the proposer, who broadcasts it to the network.</li>
          </ol>
        </section>

        {/* PBS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Proposer-Builder Separation (PBS)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            PBS is the design principle of separating the roles of block
            building (transaction ordering and MEV extraction) from block
            proposing (consensus participation). This separation has several
            benefits:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Validator neutrality</strong>:
              Validators do not need to run sophisticated MEV extraction
              strategies. They simply select the highest-bidding block.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Reduced centralization pressure</strong>:
              Without PBS, validators with advanced MEV strategies would earn
              disproportionately more, leading to centralization.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">MEV democratization</strong>: All
              validators benefit from MEV through builder bids, not just those
              running searcher bots.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Currently, PBS is implemented through MEV-Boost as a voluntary,
            out-of-protocol solution. Ethereum&apos;s roadmap includes plans to
            enshrine PBS into the protocol itself (ePBS), making it a native
            feature of the consensus layer.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Impact on Users */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impact on Users
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MEV has tangible costs for everyday Ethereum users:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Higher slippage</strong>: Sandwich
              attacks cause your DEX swaps to execute at worse prices than
              expected. A swap that should give you 1,000 tokens might only give
              you 980 tokens.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Failed transactions</strong>:
              During periods of intense MEV competition, transactions can fail
              if a searcher&apos;s competing transaction changes the state
              before yours executes. You still pay gas for the failed
              transaction.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Gas price inflation</strong>:
              Before Flashbots, MEV searchers engaged in priority gas auctions,
              driving up gas prices for everyone. This has been significantly
              mitigated by private transaction channels.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Hidden costs</strong>: MEV costs
              are often invisible. Users see their swap execute within their
              slippage tolerance and assume they got a fair price, not
              realizing they could have received more tokens without MEV.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Real Example with Numbers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Step
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Action
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    TOKEN-X Price
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Cost/Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">Alice wants to buy 10 ETH worth</td>
                  <td className="px-4 py-3">$1.00</td>
                  <td className="px-4 py-3">Expected: ~10,000 tokens</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">Bot frontrun: buys $50K worth</td>
                  <td className="px-4 py-3">$1.00 &rarr; $1.015</td>
                  <td className="px-4 py-3">Bot spent $50,000</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3">Alice&apos;s swap executes</td>
                  <td className="px-4 py-3">$1.015 &rarr; $1.025</td>
                  <td className="px-4 py-3">Alice gets ~9,750 tokens (2.5% less)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">Bot backrun: sells tokens</td>
                  <td className="px-4 py-3">$1.025 &rarr; $1.01</td>
                  <td className="px-4 py-3">Bot profit: ~$375 (minus gas)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In this example, Alice paid ~$250 more than she should have
            (received fewer tokens), while the bot profited ~$375 minus gas
            costs. The gas cost for executing this sandwich on L1 might be $20
            &ndash; $50. Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to estimate the gas costs involved in MEV transactions.
          </p>
        </section>

        {/* MEV Protection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            MEV Protection Strategies
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Several tools and strategies exist to protect users from harmful
            MEV:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Private Mempools
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Instead of broadcasting your transaction to the public mempool
            (where searchers can see it), private mempools send your transaction
            directly to block builders. Popular options include:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Flashbots Protect</strong>: Free
              RPC endpoint that sends transactions through a private channel.
              Add it to MetaMask as a custom RPC.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">MEV Blocker</strong>: A protection
              service by CoW Protocol and other partners that also refunds
              some MEV back to users.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            MEV-Aware DEXes
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some decentralized exchanges have built-in MEV protection:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">CoW Swap</strong>: Uses batch
              auctions that match orders off-chain, eliminating frontrunning
              opportunities.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">1inch Fusion</strong>: Routes
              orders through a network of professional market makers rather
              than on-chain AMMs.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">UniswapX</strong>: Uses Dutch
              auctions and off-chain order routing to provide MEV-protected
              swaps.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            User Best Practices
          </h3>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Set tight slippage</strong>: Use
              the lowest slippage tolerance you are comfortable with (0.5% for
              stablecoins, 1&ndash;2% for volatile tokens).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Split large trades</strong>:
              Breaking a $100K swap into multiple smaller swaps reduces the
              profit available to sandwich attackers.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Use limit orders</strong>: Limit
              orders on DEX aggregators execute at your specified price or
              better, avoiding MEV.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Trade on L2</strong>: Layer 2
              networks with centralized sequencers (FCFS ordering) have less MEV.
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
              Is MEV illegal?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              MEV extraction is not illegal in most jurisdictions. Unlike
              traditional financial markets where frontrunning is regulated,
              blockchain transactions occur in a permissionless environment
              without equivalent regulations. However, the ethics of MEV
              extraction, particularly sandwich attacks that harm retail users,
              are widely debated in the crypto community.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much MEV is extracted on Ethereum?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Hundreds of millions of dollars in MEV have been extracted on
              Ethereum since DeFi became popular. The exact amount is difficult
              to measure because not all MEV is visible on-chain. According to
              Flashbots data, billions of dollars in cumulative MEV have been
              extracted since 2020, with daily extraction ranging from hundreds
              of thousands to millions of dollars during high-activity periods.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How can I protect myself from MEV?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              You can protect yourself by: using MEV-protected RPC endpoints
              like Flashbots Protect or MEV Blocker, which send your
              transactions through private mempools; setting low slippage
              tolerance on DEX swaps; using DEX aggregators with MEV protection
              built in; breaking large trades into smaller ones; and using L2
              networks where MEV is less prevalent.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between MEV and front-running?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Frontrunning is one specific type of MEV extraction. MEV (Maximal
              Extractable Value) is the broad concept of any profit that can be
              extracted by controlling transaction ordering within a block.
              Frontrunning specifically means placing your transaction before
              another user&apos;s transaction to profit from the price impact.
              Other forms of MEV include backrunning, sandwich attacks,
              liquidations, and cross-DEX arbitrage.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Does MEV exist on Layer 2 networks?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes, MEV exists on L2 networks, but it is less prevalent because
              most L2s use a centralized sequencer that processes transactions in
              first-come-first-served (FCFS) order. This reduces opportunities
              for frontrunning. However, as L2s decentralize their sequencers,
              MEV may become more relevant. Some L2s are exploring MEV-resistant
              designs like encrypted mempools and fair ordering protocols.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Understand Your Transaction Costs
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            MEV adds hidden costs to your transactions. Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to estimate your gas costs, and learn more about how DeFi works in
            our{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              What is DeFi?
            </Link>{" "}
            guide.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools &amp; Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate gas costs for transactions that may be affected by MEV
            </li>
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Understand the DeFi ecosystem where MEV operates
            </li>
            <li>
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How Gas Fees Work
              </Link>{" "}
              &mdash; Learn how gas pricing and transaction ordering interact
            </li>
            <li>
              <Link
                href="/guides/eip-1559-explained"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                EIP-1559 Explained
              </Link>{" "}
              &mdash; Understand the fee market that determines transaction priority
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
