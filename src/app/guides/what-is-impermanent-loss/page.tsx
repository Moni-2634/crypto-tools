import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is Impermanent Loss? IL Explained with Math & Examples | EVMTools",
  description:
    "Learn what impermanent loss is, how to calculate it with the IL formula, see real examples with numbers, an IL table by price change ratio, and strategies to mitigate liquidity pool risk.",
  keywords: [
    "impermanent loss",
    "what is impermanent loss",
    "impermanent loss calculator",
    "impermanent loss explained",
    "liquidity pool risk",
    "impermanent loss formula",
    "il defi",
    "amm impermanent loss",
    "uniswap impermanent loss",
    "liquidity provider risk",
    "defi risk",
    "concentrated liquidity",
  ],
  openGraph: {
    title:
      "What is Impermanent Loss? IL Explained with Math & Examples | EVMTools",
    description:
      "Learn what impermanent loss is, how to calculate it with the IL formula, see real examples with numbers, an IL table by price change ratio, and strategies to mitigate liquidity pool risk.",
    url: `${SITE_URL}/guides/what-is-impermanent-loss`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Impermanent Loss? IL Explained with Math & Examples",
    description:
      "Learn what impermanent loss is, how to calculate it with the IL formula, see real examples with numbers, an IL table by price change ratio, and strategies to mitigate liquidity pool risk.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-impermanent-loss`,
  },
};

export default function WhatIsImpermanentLossPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What is Impermanent Loss? IL Explained with Math & Examples",
    description:
      "Learn what impermanent loss is, how to calculate it with the IL formula, see real examples with numbers, an IL table by price change ratio, and strategies to mitigate liquidity pool risk.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-impermanent-loss`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-impermanent-loss`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is impermanent loss in simple terms?",
      answer:
        "Impermanent loss is the difference in value between holding tokens in a liquidity pool versus simply holding them in your wallet. When the price ratio of the two tokens in the pool changes, the AMM rebalances your position, leaving you with less total value than if you had just held the tokens. It is called 'impermanent' because the loss disappears if prices return to their original ratio.",
    },
    {
      question: "How much impermanent loss occurs with a 2x price change?",
      answer:
        "If one token in the pool doubles in price (2x change) relative to the other, the impermanent loss is approximately 5.7%. This means your pool position is worth 5.7% less than if you had simply held both tokens. For a 3x price change the loss is about 13.4%, and for a 5x change it is about 25.5%.",
    },
    {
      question: "Can impermanent loss be avoided completely?",
      answer:
        "Impermanent loss cannot be entirely eliminated when providing liquidity to standard AMM pools, but it can be minimized. Strategies include providing liquidity to stablecoin pairs (where prices rarely diverge), using concentrated liquidity with tight ranges, choosing pools with high trading volume where fees offset IL, and using protocols that offer IL protection like Bancor (when available).",
    },
    {
      question:
        "Does impermanent loss apply to concentrated liquidity in Uniswap V3?",
      answer:
        "Yes, impermanent loss still applies to concentrated liquidity positions in Uniswap V3, and it can actually be amplified. When you concentrate your liquidity into a narrow price range, you earn more fees per dollar of capital, but if the price moves outside your range, your position is converted entirely into the less valuable token. The tighter the range, the higher the potential IL if the price moves away.",
    },
    {
      question: "When does impermanent loss become permanent?",
      answer:
        "Impermanent loss becomes a realized (permanent) loss when you withdraw your liquidity from the pool at a time when the token price ratio is different from when you deposited. As long as you stay in the pool, the loss remains unrealized and can theoretically recover if prices return to the original ratio. However, in practice, many tokens never return to their original ratio, making the loss effectively permanent even without withdrawing.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-impermanent-loss">
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
            Impermanent loss (IL) is the most important risk that liquidity
            providers face in{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              decentralized finance (DeFi)
            </Link>
            . When you deposit tokens into an Automated Market Maker (AMM)
            liquidity pool, the pool continuously rebalances your holdings as
            prices change. If the price ratio of your deposited tokens shifts,
            you end up with less value than you would have had by simply holding
            the tokens in your wallet. This guide explains exactly how
            impermanent loss works, provides the mathematical formula, walks
            through real-world examples with numbers, and covers strategies
            to protect yourself.
          </p>
        </section>

        {/* What is IL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Impermanent Loss?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              Impermanent loss
            </strong>{" "}
            is the opportunity cost of providing liquidity to an AMM pool
            compared to simply holding the underlying tokens. It occurs because
            AMMs use a mathematical formula (like{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              x * y = k
            </code>
            ) to maintain the price ratio of tokens in the pool. When external
            market prices change, arbitrageurs trade against the pool to bring
            its price in line with the market, and this rebalancing happens at
            the expense of liquidity providers.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The loss is called &quot;impermanent&quot; because it only becomes
            realized when you withdraw your liquidity. If the token prices
            return to their original ratio, the loss disappears entirely.
            However, in practice, prices rarely return to exactly the same
            ratio, and many liquidity providers experience this loss as a
            permanent reduction in value.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Key insight:</strong> Impermanent loss is not a bug in the
              system. It is a fundamental consequence of how AMMs work. Every
              time the price changes and an arbitrageur rebalances the pool,
              they extract value from liquidity providers. This is the price LPs
              pay for earning trading fees.
            </p>
          </div>
        </section>

        {/* How AMMs Cause IL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How AMMs Cause Impermanent Loss
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            To understand impermanent loss, you need to understand how AMM pools
            work. The most common model is the constant product formula used by
            Uniswap V2:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Constant Product Formula:

  x * y = k

Where:
  x = amount of Token A in the pool
  y = amount of Token B in the pool
  k = constant (stays the same after every trade)

The price of Token A in terms of Token B = y / x`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When the price of Token A rises on external exchanges, arbitrageurs
            buy Token A from the pool (where it is cheaper) and sell Token B
            into the pool. This removes Token A and adds Token B, shifting the
            ratio. The pool now holds{" "}
            <strong className="text-gray-900 dark:text-white">
              less of the appreciating token
            </strong>{" "}
            and{" "}
            <strong className="text-gray-900 dark:text-white">
              more of the depreciating token
            </strong>
            . As a liquidity provider, you effectively sold the winning token
            and bought the losing one.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This is the core mechanism behind impermanent loss: the AMM
            automatically sells your appreciating assets and buys depreciating
            ones to maintain the constant product invariant.
          </p>
        </section>

        {/* The IL Formula */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Impermanent Loss Formula
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Impermanent loss can be calculated precisely using the following
            formula. Let{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              r
            </code>{" "}
            be the price ratio change (new price / old price) of one token
            relative to the other:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Impermanent Loss Formula:

  IL = (2 * sqrt(r)) / (1 + r) - 1

Where:
  r = price ratio change (new_price / original_price)
  IL = impermanent loss as a decimal (negative = loss)

Example: Token A doubles in price (r = 2)
  IL = (2 * sqrt(2)) / (1 + 2) - 1
  IL = (2 * 1.4142) / 3 - 1
  IL = 2.8284 / 3 - 1
  IL = 0.9428 - 1
  IL = -0.0572 = -5.72%

You have 5.72% less value than if you had just held.`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Notice that the formula only depends on the{" "}
            <strong className="text-gray-900 dark:text-white">
              price ratio change
            </strong>
            , not the direction. Whether Token A goes up 2x or down to 0.5x
            relative to Token B, the impermanent loss is the same 5.72%. This
            is because the formula is symmetric: what matters is how far the
            ratio moves from 1:1, not which direction it moves.
          </p>
        </section>

        {/* IL Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impermanent Loss by Price Change
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The following table shows the impermanent loss for various price
            change ratios. This assumes a standard 50/50 constant product AMM
            pool (like Uniswap V2) with no trading fees:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Price Change Ratio
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Price Change %
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Impermanent Loss
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Pool Value vs HODL
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1.00x</td>
                  <td className="px-4 py-3">0% (no change)</td>
                  <td className="px-4 py-3">0.0%</td>
                  <td className="px-4 py-3">100.0%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1.25x</td>
                  <td className="px-4 py-3">+25%</td>
                  <td className="px-4 py-3">0.6%</td>
                  <td className="px-4 py-3">99.4%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1.50x</td>
                  <td className="px-4 py-3">+50%</td>
                  <td className="px-4 py-3">2.0%</td>
                  <td className="px-4 py-3">98.0%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1.75x</td>
                  <td className="px-4 py-3">+75%</td>
                  <td className="px-4 py-3">3.8%</td>
                  <td className="px-4 py-3">96.2%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    2.00x
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    +100%
                  </td>
                  <td className="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400">
                    5.7%
                  </td>
                  <td className="px-4 py-3">94.3%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    3.00x
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    +200%
                  </td>
                  <td className="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400">
                    13.4%
                  </td>
                  <td className="px-4 py-3">86.6%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">4.00x</td>
                  <td className="px-4 py-3">+300%</td>
                  <td className="px-4 py-3">20.0%</td>
                  <td className="px-4 py-3">80.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    5.00x
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    +400%
                  </td>
                  <td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                    25.5%
                  </td>
                  <td className="px-4 py-3">74.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> These numbers represent loss
              <em> before </em> accounting for trading fees earned. In
              high-volume pools, trading fee revenue can offset or even exceed
              the impermanent loss. A pool with 0.3% fees and heavy trading
              volume may generate 20-50% APR in fees, easily covering a 5.7% IL
              from a 2x price move.
            </p>
          </div>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Real World Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Real-World Example with Numbers
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Let us walk through a complete example to see exactly how
            impermanent loss plays out in practice:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Step 1: Initial Deposit
  You deposit into an ETH/USDC pool:
    - 1 ETH (price: $2,000) = $2,000
    - 2,000 USDC             = $2,000
    - Total deposited         = $4,000
    - Pool constant: k = 1 * 2,000 = 2,000

Step 2: ETH Price Doubles to $4,000
  Arbitrageurs rebalance the pool.
  New pool balances (using x * y = k):
    - New ETH amount = sqrt(k / new_price) = sqrt(2000 / 4000) = 0.7071 ETH
    - New USDC amount = sqrt(k * new_price) = sqrt(2000 * 4000) = 2,828.43 USDC

Step 3: Your Position Value
  Pool value:
    - 0.7071 ETH * $4,000 = $2,828.43
    - 2,828.43 USDC        = $2,828.43
    - Total pool value      = $5,656.85

  HODL value (if you had just held):
    - 1 ETH * $4,000  = $4,000
    - 2,000 USDC      = $2,000
    - Total HODL value = $6,000

Step 4: Impermanent Loss
  IL = $5,656.85 - $6,000 = -$343.15
  IL % = -343.15 / 6,000 = -5.72%

  You lost $343.15 compared to just holding.`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In this example, you still made money overall (your $4,000 grew to
            $5,656.85), but you would have had $6,000 if you had simply held.
            The $343.15 difference is the impermanent loss. Add trading fees
            earned during this period, and the net result may be positive or
            negative depending on the pool&apos;s volume.
          </p>
        </section>

        {/* When IL Becomes Permanent */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            When Impermanent Loss Becomes Permanent
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The term &quot;impermanent&quot; can be misleading. While the loss
            is technically unrealized as long as you remain in the pool, several
            scenarios make it effectively permanent:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Withdrawing at the wrong time
              </strong>
              : If you remove liquidity when the price ratio has diverged
              significantly from your entry point, the loss is locked in. You
              receive fewer of the appreciated token and more of the
              depreciated one.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Token price never recovers
              </strong>
              : If one token in the pair loses value permanently (a failed
              project, a depeg event), the price ratio will never return to
              the original, and your loss is permanent even without
              withdrawing.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Concentrated liquidity out of range
              </strong>
              : In Uniswap V3 or similar, if the price moves entirely outside
              your liquidity range, your position is 100% in the less
              valuable token. This is an extreme form of IL.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Pool incentives end
              </strong>
              : If you were earning reward tokens that offset your IL and
              those incentives stop, you may be left with net negative
              returns.
            </li>
          </ul>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Practical reality:</strong> For volatile token pairs (like
              ETH/altcoin), impermanent loss is often effectively permanent
              because altcoin prices can shift dramatically and never return.
              Stablecoin pairs (USDC/USDT) have minimal IL since prices barely
              diverge.
            </p>
          </div>
        </section>

        {/* Strategies to Mitigate */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Strategies to Mitigate Impermanent Loss
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            While impermanent loss cannot be eliminated entirely in standard AMM
            pools, several strategies can help minimize its impact:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Choose Correlated Token Pairs
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Pairs where both tokens move together experience less IL. The best
            options are stablecoin pairs (USDC/DAI, USDC/USDT) where prices
            stay nearly 1:1, or pairs of correlated assets like ETH/stETH or
            WBTC/renBTC. Curve Finance is specifically designed for these types
            of swaps with its StableSwap algorithm.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Concentrated Liquidity (Uniswap V3)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Concentrated liquidity lets you provide liquidity within a specific
            price range. If the price stays within your range, you earn
            significantly more fees per dollar of capital (sometimes 10-100x
            more efficient). However, if the price moves outside your range,
            your position stops earning fees and becomes 100% the less valuable
            token. This is a double-edged sword that amplifies both fee income
            and IL.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Concentrated Liquidity Example:
  Full range (V2 style):  $10,000 capital earns ~$500/year in fees
  Tight range (+/- 5%):   $10,000 capital earns ~$5,000/year in fees

  But if price moves outside your range:
  - You stop earning fees completely
  - Your position is 100% the depreciating token
  - IL is amplified compared to full-range positions`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Single-Sided Staking and IL Protection
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some protocols have introduced mechanisms to reduce or eliminate IL
            exposure:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Single-sided staking
              </strong>
              : Protocols like Lido and Rocket Pool let you{" "}
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                stake
              </Link>{" "}
              a single token without pairing it, eliminating IL entirely.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                IL protection protocols
              </strong>
              : Bancor V2.1 introduced single-sided deposits with IL
              protection that accrued over time (reaching 100% after 100 days).
              Other protocols have experimented with similar insurance
              mechanisms.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Automated vault strategies
              </strong>
              : Protocols like Gamma, Arrakis, and Maverick offer automated
              concentrated liquidity management that dynamically adjusts
              ranges to minimize IL while maximizing fee capture.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Focus on High-Fee Pools
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Pools with high trading volume generate more fees for liquidity
            providers. These fees can offset impermanent loss. When evaluating a
            pool, compare the estimated fee APR against the expected IL for the
            likely price range of the token pair. A pool earning 30% APR in
            fees can absorb significant IL.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Time Your Entry and Exit
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Avoid entering pools right before expected high-volatility events
            (token unlocks, major protocol upgrades, macroeconomic announcements).
            If the price ratio has already shifted significantly, consider
            waiting for it to stabilize before withdrawing. Monitor your
            positions regularly and set alerts for significant price movements.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* IL vs Fees */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impermanent Loss vs Trading Fees: Net Position
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The decision to provide liquidity ultimately comes down to whether
            the trading fees you earn exceed the impermanent loss you incur.
            Here is a framework for thinking about it:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Net LP Return = Trading Fees Earned - Impermanent Loss

Example Scenario:
  Deposit: $10,000 in ETH/USDC pool (0.3% fee tier)
  Period: 6 months
  ETH price change: +80% (1.8x)

  Trading Fees Earned: ~$1,200 (12% over 6 months)
  Impermanent Loss:    ~$340  (3.4% from 1.8x price change)

  Net Return:          +$860  (8.6% profit)
  vs HODL Return:      +$4,000 (holding 50% ETH / 50% USDC)

  Pool value:          $14,660  ($10,000 + $4,000 HODL gain - $340 IL + $1,200 fees)
  HODL value:          $14,000  ($10,000 + $4,000 appreciation)

  In this case, LP was better by $660 thanks to fee income.`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The breakeven point depends on pool volume, fee tier, and price
            volatility. High-volume stablecoin pools often have the best
            risk-adjusted returns because they generate consistent fees with
            minimal IL. Volatile pairs can be profitable but require careful
            monitoring and active management.
          </p>
        </section>

        {/* IL in Different AMM Designs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impermanent Loss Across AMM Designs
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Different AMM designs handle impermanent loss differently:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    AMM Design
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Example
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    IL Behavior
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Constant Product (x*y=k)</td>
                  <td className="px-4 py-3">Uniswap V2, SushiSwap</td>
                  <td className="px-4 py-3">
                    Standard IL, full price range
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Concentrated Liquidity</td>
                  <td className="px-4 py-3">Uniswap V3, PancakeSwap V3</td>
                  <td className="px-4 py-3">
                    Amplified IL in range, zero fees out of range
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">StableSwap</td>
                  <td className="px-4 py-3">Curve Finance</td>
                  <td className="px-4 py-3">
                    Minimal IL for pegged assets, higher IL if depeg occurs
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Weighted Pools</td>
                  <td className="px-4 py-3">Balancer (80/20 pools)</td>
                  <td className="px-4 py-3">
                    Reduced IL with asymmetric weighting
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Virtual AMM / Oracle-based</td>
                  <td className="px-4 py-3">Maverick, Trader Joe V2</td>
                  <td className="px-4 py-3">
                    IL depends on oracle accuracy and bin placement
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is impermanent loss in simple terms?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Impermanent loss is the difference in value between holding tokens
              in a liquidity pool versus simply holding them in your wallet.
              When the price ratio of the two tokens changes, the AMM
              rebalances your position, leaving you with less total value than
              if you had just held. It is called &quot;impermanent&quot; because
              the loss disappears if prices return to their original ratio.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much impermanent loss occurs with a 2x price change?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              If one token in the pool doubles in price (2x change) relative to
              the other, the impermanent loss is approximately 5.7%. This means
              your pool position is worth 5.7% less than if you had simply held
              both tokens. For a 3x price change the loss is about 13.4%, and
              for a 5x change it is about 25.5%.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can impermanent loss be avoided completely?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Impermanent loss cannot be entirely eliminated when providing
              liquidity to standard AMM pools, but it can be minimized.
              Strategies include providing liquidity to stablecoin pairs (where
              prices rarely diverge), using concentrated liquidity with tight
              ranges, choosing pools with high trading volume where fees offset
              IL, and using protocols that offer IL protection.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Does impermanent loss apply to concentrated liquidity in Uniswap
              V3?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes, impermanent loss still applies to concentrated liquidity
              positions in Uniswap V3, and it can actually be amplified. When
              you concentrate your liquidity into a narrow price range, you earn
              more fees per dollar of capital, but if the price moves outside
              your range, your position is converted entirely into the less
              valuable token. The tighter the range, the higher the potential IL
              if the price moves away.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              When does impermanent loss become permanent?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Impermanent loss becomes a realized (permanent) loss when you
              withdraw your liquidity from the pool at a time when the token
              price ratio is different from when you deposited. As long as you
              stay in the pool, the loss remains unrealized and can
              theoretically recover if prices return to the original ratio.
              However, in practice, many tokens never return to their original
              ratio, making the loss effectively permanent even without
              withdrawing.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore DeFi Tools
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding impermanent loss is critical before providing
            liquidity. Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to estimate the cost of entering and exiting liquidity positions,
            and explore our{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              What is DeFi?
            </Link>{" "}
            guide for a broader overview of the decentralized finance ecosystem.
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
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Complete guide to decentralized finance protocols and
              concepts
            </li>
            <li>
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Staking?
              </Link>{" "}
              &mdash; Earn yield without impermanent loss through staking
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Learn how AMM pools are powered by smart contracts
            </li>
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate the cost of entering and exiting LP positions
            </li>
            <li>
              <Link
                href="/crypto/eth-unit-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ETH Unit Converter
              </Link>{" "}
              &mdash; Convert between Wei, Gwei, and ETH for DeFi calculations
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
