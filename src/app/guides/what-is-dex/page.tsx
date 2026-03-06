import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is a DEX? A Complete Guide to Decentralized Exchanges | EVMTools",
  description:
    "Learn what decentralized exchanges are, how AMMs work, DEX vs CEX comparison, Uniswap, liquidity pools, slippage, price impact, MEV, and how to swap tokens safely.",
  keywords: [
    "dex",
    "decentralized exchange",
    "what is a dex",
    "uniswap",
    "dex vs cex",
    "amm",
    "automated market maker",
    "liquidity pool",
    "token swap",
    "slippage",
    "dex aggregator",
    "mev",
  ],
  openGraph: {
    title:
      "What is a DEX? A Complete Guide to Decentralized Exchanges | EVMTools",
    description:
      "Learn what decentralized exchanges are, how AMMs work, DEX vs CEX comparison, Uniswap, liquidity pools, slippage, price impact, MEV, and how to swap tokens safely.",
    url: `${SITE_URL}/guides/what-is-dex`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "What is a DEX? A Complete Guide to Decentralized Exchanges",
    description:
      "Learn what decentralized exchanges are, how AMMs work, DEX vs CEX comparison, Uniswap, liquidity pools, slippage, price impact, MEV, and how to swap tokens safely.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-dex`,
  },
};

export default function WhatIsDexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What is a DEX? A Complete Guide to Decentralized Exchanges",
    description:
      "Learn what decentralized exchanges are, how AMMs work, DEX vs CEX comparison, Uniswap, liquidity pools, slippage, price impact, MEV, and how to swap tokens safely.",
    url: `${SITE_URL}/guides/what-is-dex`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-dex`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Is it safe to use a DEX?",
      answer:
        "Established DEXs like Uniswap, Curve, and SushiSwap have been battle-tested with billions of dollars and are generally considered safe. However, risks include interacting with malicious tokens (scam tokens, honeypots), setting slippage too high, and MEV attacks (sandwich attacks). Always verify token contract addresses, use reasonable slippage settings (0.5-1% for major tokens), and consider using MEV-protected RPC endpoints like Flashbots Protect.",
    },
    {
      question: "Why are DEX prices sometimes different from centralized exchanges?",
      answer:
        "DEX prices are determined by the ratio of tokens in liquidity pools, not by a central order book. Price differences (arbitrage opportunities) naturally occur between exchanges but are quickly corrected by arbitrage bots that buy on the cheaper exchange and sell on the more expensive one. For large-cap tokens, the price difference is usually less than 0.1%. For smaller tokens, differences can be larger due to lower liquidity.",
    },
    {
      question: "What is slippage and how do I set it?",
      answer:
        "Slippage is the difference between the expected price of a swap and the actual execution price. It occurs because pool ratios change between when you submit a transaction and when it executes. For major tokens (ETH, USDC), 0.5% slippage is usually sufficient. For smaller tokens with less liquidity, you may need 1-3%. Setting slippage too low causes transactions to fail; setting it too high makes you vulnerable to sandwich attacks.",
    },
    {
      question: "What is impermanent loss for liquidity providers?",
      answer:
        "Impermanent loss occurs when you provide liquidity to an AMM pool and the price ratio of the tokens changes. The pool rebalances automatically, selling the appreciating token and buying the depreciating one. If you had simply held the tokens instead, you would have more value. The loss is 'impermanent' because it reverses if prices return to the original ratio. Trading fees earned can offset the loss, but for volatile pairs, impermanent loss can be significant.",
    },
    {
      question: "Should I use a DEX or a centralized exchange?",
      answer:
        "It depends on your needs. Use a DEX when you want to trade tokens not listed on centralized exchanges, maintain self-custody of your funds, interact with DeFi protocols, or trade without KYC. Use a centralized exchange when you need fiat on/off ramps, want lower fees for high-volume trading, need advanced order types (limit, stop-loss), or prefer a simpler user experience. Many users use both depending on the situation.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-dex">
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
            A DEX (Decentralized Exchange) is a peer-to-peer marketplace where
            users can trade cryptocurrency directly from their wallets without
            an intermediary. Unlike centralized exchanges like Coinbase or
            Binance, DEXs use{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contracts
            </Link>{" "}
            to facilitate trades automatically. This guide explains how DEXs
            work, the different types (AMMs, order books, aggregators), major
            platforms, and important concepts like slippage, price impact, and{" "}
            <Link
              href="/guides/what-is-mev"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              MEV
            </Link>
            .
          </p>
        </section>

        {/* What is a DEX */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a Decentralized Exchange?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A <strong className="text-gray-900 dark:text-white">Decentralized Exchange
            (DEX)</strong> is a cryptocurrency exchange that operates without a
            central authority. Instead of a company matching orders and holding
            your funds, DEXs use smart contracts deployed on a blockchain to
            execute trades. The key advantages are:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Non-custodial</strong>: You
              maintain control of your assets at all times. Tokens move directly
              from your wallet to the smart contract and back. No need to
              deposit funds on an exchange.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Permissionless</strong>: Anyone
              can trade without creating an account, providing ID, or waiting
              for approval. Connect your wallet and trade immediately.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Permissionless listing</strong>:
              Anyone can create a trading pair for any{" "}
              <Link href="/guides/what-is-erc20" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">ERC-20 token</Link>.
              No listing fees or approval process required.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Transparent</strong>: All trades,
              liquidity, and smart contract code are publicly verifiable on the
              blockchain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Composable</strong>: DEXs can be
              integrated into other{" "}
              <Link href="/guides/what-is-defi" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">DeFi</Link>{" "}
              protocols, enabling complex strategies like flash loan arbitrage
              and automated yield farming.
            </li>
          </ul>
        </section>

        {/* DEX vs CEX */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            DEX vs CEX: A Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding the differences between decentralized and centralized
            exchanges is essential for choosing the right platform:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    CEX (Centralized)
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    DEX (Decentralized)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Custody</td>
                  <td className="px-4 py-3">Exchange holds your funds</td>
                  <td className="px-4 py-3">You hold your funds (wallet)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">KYC required</td>
                  <td className="px-4 py-3">Yes (ID verification)</td>
                  <td className="px-4 py-3">No (just connect wallet)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Trading mechanism</td>
                  <td className="px-4 py-3">Order book matching</td>
                  <td className="px-4 py-3">AMM or on-chain order book</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Speed</td>
                  <td className="px-4 py-3">Instant (off-chain matching)</td>
                  <td className="px-4 py-3">Block confirmation time (~12s on ETH)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Fees</td>
                  <td className="px-4 py-3">Trading fee (0.1&ndash;0.5%)</td>
                  <td className="px-4 py-3">Swap fee (0.01&ndash;1%) + gas fee</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Available tokens</td>
                  <td className="px-4 py-3">Curated listings (hundreds)</td>
                  <td className="px-4 py-3">Any token with a pool (thousands)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Fiat support</td>
                  <td className="px-4 py-3">Yes (bank transfers, cards)</td>
                  <td className="px-4 py-3">Limited (via on-ramp integrations)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Counterparty risk</td>
                  <td className="px-4 py-3">High (exchange can fail, e.g., FTX)</td>
                  <td className="px-4 py-3">Low (smart contract risk only)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Privacy</td>
                  <td className="px-4 py-3">Low (full identity required)</td>
                  <td className="px-4 py-3">High (pseudonymous, wallet only)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How AMMs Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Automated Market Makers (AMMs) Work
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most DEXs use <strong className="text-gray-900 dark:text-white">Automated Market
            Makers (AMMs)</strong> instead of traditional order books. An AMM
            replaces buyers and sellers with liquidity pools &mdash; smart
            contracts that hold reserves of two tokens and use a mathematical
            formula to determine the price.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            The Constant Product Formula
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Uniswap V2 pioneered the constant product formula, the simplest and
            most widely used AMM model:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`x * y = k

Where:
  x = reserve of Token A in the pool
  y = reserve of Token B in the pool
  k = constant product (must remain equal after every trade)

Example: ETH/USDC pool with 100 ETH and 200,000 USDC
  k = 100 * 200,000 = 20,000,000
  Price of 1 ETH = 200,000 / 100 = $2,000

Buying 1 ETH:
  New ETH reserve = 99
  New USDC reserve = 20,000,000 / 99 = 202,020.20
  Cost = 202,020.20 - 200,000 = $2,020.20 per ETH
  Price impact = ($2,020.20 - $2,000) / $2,000 = 1.01%

Buying 10 ETH:
  New ETH reserve = 90
  New USDC reserve = 20,000,000 / 90 = 222,222.22
  Cost = 222,222.22 - 200,000 = $22,222.22 total ($2,222 per ETH)
  Price impact = ($2,222 - $2,000) / $2,000 = 11.1%`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This illustrates a critical property of AMMs: larger trades have
            exponentially more price impact. This is why DEXs work best for
            pools with deep liquidity.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Concentrated Liquidity (Uniswap V3)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Uniswap V3 introduced concentrated liquidity, allowing liquidity
            providers to allocate capital to specific price ranges instead of
            across the entire price spectrum. A liquidity provider who believes
            ETH will stay between $1,800 and $2,200 can concentrate all their
            capital in that range, providing up to 4,000x more capital
            efficiency than V2. However, if the price moves outside the range,
            the position earns zero fees and suffers maximum impermanent loss.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            StableSwap (Curve)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Curve Finance uses a modified AMM formula optimized for tokens that
            should trade near parity (stablecoins like USDC/USDT/DAI, or
            pegged assets like stETH/ETH). The StableSwap invariant
            concentrates liquidity around the 1:1 price, enabling very low
            slippage for same-peg trades. Swapping $1M USDC to USDT on Curve
            might cost only 0.01% in slippage, compared to several percent on
            a constant product AMM.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Types of DEXs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of Decentralized Exchanges
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            AMM-Based DEXs
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most common type. Liquidity pools with algorithmic pricing
            replace order books. Examples include:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Uniswap</strong>: The largest DEX
              by volume. Pioneered the constant product AMM. Operates on
              Ethereum, Arbitrum, Polygon, Optimism, and Base.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Curve Finance</strong>: Optimized
              for stablecoin and pegged-asset swaps with minimal slippage.
              Dominates the stablecoin trading market.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">SushiSwap</strong>: Fork of
              Uniswap with additional features like yield farming and a broader
              multi-chain presence.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Balancer</strong>: Supports
              multi-token pools (up to 8 tokens) with custom weights, enabling
              portfolio-like liquidity pools.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">PancakeSwap</strong>: The largest
              DEX on BNB Smart Chain, with lower fees than Ethereum-based DEXs.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Order Book DEXs
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            These DEXs use traditional order book models but execute on-chain
            or in a hybrid manner:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">dYdX</strong>: Leading perpetual
              futures DEX. Uses an off-chain order book with on-chain
              settlement. Moved to its own Cosmos appchain for better
              performance.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Hyperliquid</strong>: High-performance
              perpetuals exchange running on its own L1 blockchain. Sub-second
              finality with fully on-chain order book.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            DEX Aggregators
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Aggregators route trades across multiple DEXs to find the best
            price. Instead of checking each DEX manually, an aggregator splits
            your trade across sources for optimal execution:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">1inch</strong>: The largest DEX
              aggregator. Routes across 400+ liquidity sources across multiple
              chains.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">ParaSwap</strong>: Multi-chain
              aggregator with MEV protection and limit order features.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">CowSwap</strong>: Uses batch
              auctions and Coincidence of Wants (CoW) to provide MEV
              protection and potentially better prices.
            </li>
          </ul>
        </section>

        {/* Slippage, Price Impact, and MEV */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Slippage, Price Impact, and MEV
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Slippage
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Slippage is the difference between the quoted price at the time you
            submit a trade and the actual execution price. It happens because
            the pool state can change between when you sign the transaction and
            when it is confirmed on-chain. You set a{" "}
            <strong className="text-gray-900 dark:text-white">slippage tolerance</strong>{" "}
            (e.g., 0.5%) to define the maximum acceptable price deviation. If
            the actual price moves beyond your tolerance, the transaction
            reverts.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Price Impact
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Price impact is the effect your trade has on the pool price. It is
            deterministic and depends on your trade size relative to the pool
            liquidity. A $1,000 swap in a $100M pool has negligible impact; the
            same swap in a $10,000 pool would move the price dramatically. DEX
            interfaces show the expected price impact before you confirm a swap.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            MEV (Maximal Extractable Value)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-mev"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              MEV
            </Link>{" "}
            is a significant concern for DEX traders. Because pending
            transactions are visible in the mempool before confirmation, bots
            can exploit this information:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Sandwich attacks</strong>: A bot
              places a buy order before your trade (frontrunning) and a sell
              order after (backrunning), profiting from the price movement your
              trade causes.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Frontrunning</strong>: A bot sees
              your profitable trade and submits the same trade with higher gas,
              taking the profit before you.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Just-in-time (JIT) liquidity</strong>:
              LPs add concentrated liquidity right before a large trade and
              remove it immediately after, capturing fees without long-term
              capital commitment.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            To protect against MEV, use private RPC endpoints (Flashbots
            Protect, MEV Blocker), aggregators with built-in protection
            (CowSwap), or keep slippage tolerance low.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Providing Liquidity */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Providing Liquidity on a DEX
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Anyone can become a liquidity provider (LP) by depositing tokens
            into a pool. In return, you earn a share of the trading fees
            proportional to your share of the pool:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Providing Liquidity Example (Uniswap V2):

Deposit: 1 ETH ($2,000) + 2,000 USDC → Total: $4,000
Pool total: 100 ETH + 200,000 USDC = $400,000
Your share: 1%

Fee tier: 0.3% of every swap goes to LPs
Daily volume: $2,000,000
Daily fees: $2,000,000 * 0.3% = $6,000
Your daily earnings: $6,000 * 1% = $60

Annual yield (if volume stays constant):
$60 * 365 = $21,900 on $4,000 = 547.5% APR

BUT: You must also account for impermanent loss
If ETH doubles to $4,000:
  Impermanent loss ≈ 5.7% of position value
  = $4,000 * 1.057 * 5.7% ≈ $240 loss
  Fees must exceed this to be profitable`}</code>
          </pre>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Providing liquidity carries risk. You
              are exposed to impermanent loss when token prices diverge. The
              trading fees you earn may or may not offset the impermanent loss.
              Start with stablecoin pairs (USDC/USDT) to minimize risk while
              learning.
            </p>
          </div>
        </section>

        {/* How to Swap Safely */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Swap Tokens Safely on a DEX
          </h2>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Verify the token contract</strong>:
              Always check the token&apos;s contract address on Etherscan or the
              project&apos;s official website. Scam tokens with similar names are
              extremely common.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Check liquidity</strong>: Ensure
              the pool has sufficient liquidity. Low liquidity means high price
              impact and potential manipulation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Review the price impact</strong>:
              The DEX UI shows expected price impact. If it exceeds 1&ndash;2%
              for a major token, the pool may have insufficient liquidity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Set appropriate slippage</strong>:
              Use 0.5% for major tokens, 1&ndash;3% for smaller tokens. Never
              use extremely high slippage (10%+) unless you understand why.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Use an aggregator</strong>: Route
              through 1inch or CowSwap for better prices across multiple DEXs.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Consider MEV protection</strong>:
              Use Flashbots Protect RPC or CowSwap to avoid sandwich attacks.
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
              Is it safe to use a DEX?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Established DEXs like Uniswap, Curve, and SushiSwap have been
              battle-tested with billions of dollars and are generally
              considered safe. However, risks include interacting with
              malicious tokens (scam tokens, honeypots), setting slippage too
              high, and MEV attacks (sandwich attacks). Always verify token
              contract addresses, use reasonable slippage settings, and consider
              using MEV-protected RPC endpoints.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Why are DEX prices sometimes different from centralized exchanges?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              DEX prices are determined by the ratio of tokens in liquidity
              pools, not by a central order book. Price differences (arbitrage
              opportunities) naturally occur but are quickly corrected by
              arbitrage bots. For large-cap tokens, the difference is usually
              less than 0.1%. For smaller tokens, differences can be larger due
              to lower liquidity.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is slippage and how do I set it?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Slippage is the difference between the expected price and the
              actual execution price. For major tokens (ETH, USDC), 0.5% is
              usually sufficient. For smaller tokens with less liquidity, you
              may need 1&ndash;3%. Setting slippage too low causes transactions
              to fail; setting it too high makes you vulnerable to sandwich
              attacks.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is impermanent loss for liquidity providers?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Impermanent loss occurs when you provide liquidity to an AMM pool
              and the price ratio of the tokens changes. The pool rebalances
              automatically, selling the appreciating token and buying the
              depreciating one. The loss is &quot;impermanent&quot; because it
              reverses if prices return to the original ratio. Trading fees can
              offset the loss, but for volatile pairs, it can be significant.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Should I use a DEX or a centralized exchange?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              It depends on your needs. Use a DEX for tokens not listed on
              centralized exchanges, to maintain self-custody, or to interact
              with DeFi. Use a CEX for fiat on/off ramps, lower fees on
              high-volume trades, advanced order types, or simpler UX. Many
              users use both depending on the situation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore DEX Tools
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Analyze DEX transactions with our developer tools. Use the{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>{" "}
            to inspect swap transaction data, the{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to estimate swap costs, or learn how to{" "}
            <Link
              href="/guides/how-to-read-etherscan"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              read DEX transactions on Etherscan
            </Link>
            .
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; The ecosystem that DEXs power
            </li>
            <li>
              <Link
                href="/guides/what-is-mev"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is MEV?
              </Link>{" "}
              &mdash; Understanding frontrunning and sandwich attacks
            </li>
            <li>
              <Link
                href="/guides/what-is-yield-farming"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Yield Farming?
              </Link>{" "}
              &mdash; Earning yield by providing DEX liquidity
            </li>
            <li>
              <Link
                href="/guides/what-is-erc20"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is ERC-20?
              </Link>{" "}
              &mdash; The token standard traded on DEXs
            </li>
            <li>
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How Gas Fees Work
              </Link>{" "}
              &mdash; Understanding DEX transaction costs
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
