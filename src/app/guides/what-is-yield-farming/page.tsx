import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is Yield Farming? A Complete Guide to DeFi Yield | EVMTools",
  description:
    "Learn what yield farming is, how liquidity mining works, APR vs APY, farming strategies, risks like impermanent loss and rug pulls, and popular platforms like Yearn, Convex, and Pendle.",
  keywords: [
    "yield farming",
    "what is yield farming",
    "liquidity mining",
    "defi yield",
    "farming crypto",
    "defi farming",
    "apr vs apy",
    "impermanent loss",
    "liquidity pool rewards",
    "yearn finance",
    "convex finance",
    "pendle finance",
  ],
  openGraph: {
    title:
      "What is Yield Farming? A Complete Guide to DeFi Yield | EVMTools",
    description:
      "Learn what yield farming is, how liquidity mining works, APR vs APY, farming strategies, risks like impermanent loss and rug pulls, and popular platforms like Yearn, Convex, and Pendle.",
    url: `${SITE_URL}/guides/what-is-yield-farming`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "What is Yield Farming? A Complete Guide to DeFi Yield",
    description:
      "Learn what yield farming is, how liquidity mining works, APR vs APY, farming strategies, risks like impermanent loss and rug pulls, and popular platforms like Yearn, Convex, and Pendle.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-yield-farming`,
  },
};

export default function WhatIsYieldFarmingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What is Yield Farming? A Complete Guide to DeFi Yield",
    description:
      "Learn what yield farming is, how liquidity mining works, APR vs APY, farming strategies, risks like impermanent loss and rug pulls, and popular platforms like Yearn, Convex, and Pendle.",
    url: `${SITE_URL}/guides/what-is-yield-farming`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-yield-farming`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Is yield farming still profitable in 2025?",
      answer:
        "Yes, but yields have normalized significantly since the 'DeFi Summer' of 2020. Sustainable yields on stablecoin strategies typically range from 3-10% APY, while more aggressive strategies with volatile assets can offer 15-50% APY with proportionally higher risk. The era of 1,000%+ APY farms is largely over, as those yields were subsidized by token inflation. Focus on real yield (fees and revenue) rather than token emission-based rewards.",
    },
    {
      question: "What is the difference between APR and APY?",
      answer:
        "APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding, which reinvests earned rewards to generate additional returns. For example, 100% APR compounded daily equals approximately 171.5% APY. The more frequently you compound, the higher the APY relative to APR. Many DeFi protocols show APY, which looks more attractive but requires active or automated compounding to achieve.",
    },
    {
      question: "What is impermanent loss and how does it affect farming?",
      answer:
        "Impermanent loss occurs when providing liquidity to AMM pools and the price ratio of deposited tokens changes. If one token appreciates significantly relative to the other, the pool rebalances by selling the appreciating token and buying the depreciating one. This means you end up with less value than if you had simply held the tokens. For a 2x price change, impermanent loss is approximately 5.7%. Trading fees earned must exceed this loss for LP farming to be profitable.",
    },
    {
      question: "How do I avoid yield farming scams?",
      answer:
        "Key red flags include: unaudited smart contracts, anonymous teams with no track record, unsustainably high APY (1,000%+ with no clear source of yield), contracts where the admin can drain funds (no timelock or multi-sig), tokens with no real utility beyond farming rewards, and projects that copy-paste code without changes. Stick to established protocols (Aave, Curve, Convex, Yearn), verify contracts on Etherscan, and never invest more than you can afford to lose.",
    },
    {
      question: "What is the safest yield farming strategy for beginners?",
      answer:
        "The safest approach is lending stablecoins (USDC, DAI) on established protocols like Aave or Compound. This avoids impermanent loss entirely and exposes you only to smart contract risk on battle-tested protocols. Yields are modest (3-8% APY) but predictable. As you gain experience, you can explore stablecoin LP pairs on Curve (low impermanent loss risk) or use auto-compounders like Yearn to optimize returns automatically.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-yield-farming">
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
            Yield farming is the practice of deploying crypto assets into{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              DeFi
            </Link>{" "}
            protocols to earn rewards. Sometimes called &quot;liquidity
            mining,&quot; it is the DeFi equivalent of earning interest on a
            savings account &mdash; except yields can range from 3% to over
            100% APY depending on the risk level. This guide explains how yield
            farming works, the different strategies available, how to evaluate
            opportunities, and the significant risks you need to understand
            before participating.
          </p>
        </section>

        {/* What is Yield Farming */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Yield Farming?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Yield farming</strong> is
            the process of depositing crypto assets into DeFi smart contracts
            to earn returns. These returns come from multiple sources:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Trading fees</strong>: When you
              provide liquidity to a DEX pool, you earn a percentage of every
              trade that goes through that pool.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Interest payments</strong>: When
              you lend your assets on protocols like Aave or Compound, borrowers
              pay interest that is distributed to lenders.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Token emissions</strong>:
              Protocols distribute their governance tokens to users who provide
              liquidity, incentivizing usage and bootstrapping liquidity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Protocol revenue</strong>: Some
              protocols share actual revenue (from fees, liquidations, etc.)
              with token holders and stakers.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The term &quot;yield farming&quot; comes from the agricultural
            metaphor: you &quot;plant&quot; your crypto assets in a protocol
            and &quot;harvest&quot; the rewards. Sophisticated farmers move
            their capital between protocols and strategies to maximize returns,
            similar to rotating crops for optimal yield.
          </p>
        </section>

        {/* How Yield Farming Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Yield Farming Works
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The basic yield farming flow involves depositing assets into a
            protocol and earning rewards over time:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Basic Yield Farming Flow:

1. Deposit assets into a DeFi protocol
   └── Example: Deposit 1,000 USDC into Aave lending pool

2. Protocol puts your assets to work
   └── Aave lends your USDC to borrowers
   └── Borrowers pay interest (e.g., 5% APY)

3. You earn rewards
   └── Interest: 5% APY = ~$50/year on $1,000
   └── Token incentives: Aave may also distribute AAVE tokens
   └── Combined yield: 5% + 3% AAVE rewards = 8% APY

Advanced LP Farming Flow:

1. Provide liquidity to a DEX pool
   └── Deposit ETH + USDC into Uniswap ETH/USDC pool
   └── Receive LP tokens representing your share

2. Stake LP tokens in a reward contract
   └── Protocol distributes reward tokens to LP stakers
   └── Earn trading fees + bonus token rewards

3. Compound rewards
   └── Sell reward tokens → buy more ETH + USDC
   └── Add liquidity → stake more LP tokens
   └── Repeat for compound growth`}</code>
          </pre>
        </section>

        {/* APR vs APY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            APR vs APY: Understanding Yield Metrics
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DeFi platforms display yields using two metrics that can look very
            different for the same underlying return:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`APR (Annual Percentage Rate):
  Simple interest, no compounding
  Formula: APR = (reward / principal) * (365 / days)
  Example: Earn 10 USDC on 100 USDC in 30 days
  APR = (10 / 100) * (365 / 30) = 121.67%

APY (Annual Percentage Yield):
  Includes compound interest
  Formula: APY = (1 + APR/n)^n - 1
  Where n = number of compounding periods per year

  APR = 100%, compounded:
    Annually (n=1):    APY = 100.00%
    Monthly (n=12):    APY = 161.30%
    Weekly (n=52):     APY = 169.26%
    Daily (n=365):     APY = 171.46%
    Continuously:      APY = 171.83%  (e^1 - 1)

Key insight: High APR with frequent compounding = much higher APY
  50% APR daily compounding ≈ 64.8% APY
  100% APR daily compounding ≈ 171.5% APY
  200% APR daily compounding ≈ 634.9% APY`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When evaluating farms, always check whether the displayed rate is
            APR or APY. A farm advertising 200% APY sounds impressive, but the
            underlying APR might be a more modest 70% that requires daily
            compounding to achieve. Auto-compounding vaults (Yearn, Beefy)
            handle compounding automatically.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Yield Farming Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Yield Farming Strategies
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Yield farming strategies range from conservative to aggressive,
            each with different risk-reward profiles:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Lending (Low Risk)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Deposit assets into lending protocols (Aave, Compound) to earn
            interest from borrowers. Stablecoins typically yield 3&ndash;8%
            APY. No impermanent loss risk. Your only exposure is smart contract
            risk on battle-tested protocols.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Stablecoin LP Farming (Low-Medium Risk)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Provide liquidity to stablecoin pairs on Curve (USDC/USDT/DAI).
            Minimal impermanent loss since all tokens target the same peg.
            Yields come from swap fees plus CRV token incentives. Typical yield:
            5&ndash;15% APY.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Blue-Chip LP Farming (Medium Risk)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Provide liquidity to major token pairs (ETH/USDC, WBTC/ETH) on
            Uniswap or Curve. Higher yields from trading fees and incentives
            (10&ndash;30% APY), but exposed to impermanent loss from price
            movements. Best for pairs you are comfortable holding long-term.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Leveraged Farming (High Risk)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Borrow against your deposits to farm with more capital than you own.
            For example: deposit ETH, borrow USDC, LP with ETH/USDC, use LP
            tokens as collateral to borrow more. This amplifies both yields and
            losses. Liquidation risk if prices move against you.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Vault Strategies (Variable Risk)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Auto-compounding vaults (Yearn, Beefy, Convex) automatically
            reinvest rewards to maximize APY. You deposit once and the vault
            handles claiming rewards, selling tokens, and redepositing. This
            saves gas costs and time, but adds a layer of smart contract risk
            from the vault contract itself.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            6. Fixed-Rate and Points Farming (Variable Risk)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Newer strategies involve Pendle Finance (separating yield into
            principal and yield tokens for fixed-rate exposure) and points
            farming (providing liquidity to earn protocol points that may
            convert to future token airdrops). These strategies require
            understanding tokenomics and speculative risk.
          </p>
        </section>

        {/* DeFi Yield Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            DeFi Yield Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a comparison of common yield farming strategies and their
            typical risk-reward profiles:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Strategy
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Typical APY
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Risk Level
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Key Risks
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Stablecoin lending (Aave)</td>
                  <td className="px-4 py-3">3&ndash;8%</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Smart contract risk</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">ETH staking (Lido)</td>
                  <td className="px-4 py-3">3&ndash;5%</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Slashing, smart contract risk</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Stablecoin LP (Curve)</td>
                  <td className="px-4 py-3">5&ndash;15%</td>
                  <td className="px-4 py-3">Low-Medium</td>
                  <td className="px-4 py-3">Depeg risk, smart contract risk</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Blue-chip LP (Uniswap V3)</td>
                  <td className="px-4 py-3">10&ndash;30%</td>
                  <td className="px-4 py-3">Medium</td>
                  <td className="px-4 py-3">Impermanent loss, price volatility</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Auto-compound vault (Yearn)</td>
                  <td className="px-4 py-3">5&ndash;20%</td>
                  <td className="px-4 py-3">Medium</td>
                  <td className="px-4 py-3">Strategy risk, vault contract risk</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">New token incentive farms</td>
                  <td className="px-4 py-3">50&ndash;500%</td>
                  <td className="px-4 py-3">High</td>
                  <td className="px-4 py-3">Token inflation, rug pulls, IL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Leveraged farming</td>
                  <td className="px-4 py-3">30&ndash;100%+</td>
                  <td className="px-4 py-3">Very High</td>
                  <td className="px-4 py-3">Liquidation, amplified IL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Popular Platforms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Popular Yield Farming Platforms
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Yearn Finance
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Yearn automates yield optimization through &quot;vaults.&quot; You
            deposit a single asset, and Yearn&apos;s strategy contracts
            automatically deploy your capital across multiple protocols,
            compound rewards, and rebalance positions. Yearn pioneered the
            concept of DeFi yield aggregation and remains one of the most
            trusted vault platforms.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Convex Finance
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Convex boosts Curve Finance yields by aggregating CRV tokens from
            users. Instead of locking CRV yourself (which requires a 4-year
            commitment for maximum boost), you deposit Curve LP tokens into
            Convex and receive boosted CRV rewards plus CVX tokens. Convex
            controls a massive portion of all locked CRV, making it the most
            efficient way to earn Curve yields.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Beefy Finance
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A multi-chain auto-compounder that supports hundreds of farming
            strategies across 20+ blockchains. Beefy handles reward claiming,
            selling, and redepositing automatically. It is particularly popular
            on L2 networks and alternative L1s where gas costs for manual
            compounding would eat into yields.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Pendle Finance
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Pendle introduced yield tokenization &mdash; splitting yield-bearing
            assets into Principal Tokens (PT) and Yield Tokens (YT). This
            allows users to lock in fixed yields (buy PT at a discount), or
            speculate on future yield changes (buy YT). Pendle has become a
            key platform for fixed-rate DeFi strategies and points farming.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            EigenLayer (Restaking)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A newer paradigm that lets staked ETH (via Lido stETH, Rocket Pool
            rETH, etc.) be &quot;restaked&quot; to secure additional protocols.
            This compounds the yield: base{" "}
            <Link
              href="/guides/what-is-staking"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              staking
            </Link>{" "}
            yield + restaking rewards from multiple actively validated services.
            Additional slashing risk applies.
          </p>
        </section>

        {/* Risks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Yield Farming Risks
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Yield farming is not free money. Every source of yield comes with
            corresponding risks:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Impermanent Loss
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most common risk for LP farmers. When the price ratio of tokens
            in your pool changes, you end up with less value than simply
            holding. A 2x price change causes ~5.7% impermanent loss; a 5x
            change causes ~25.5%. This loss becomes permanent when you withdraw.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Smart Contract Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every DeFi protocol you interact with is an additional layer of
            smart contract risk. A yield farming strategy might involve
            interacting with 3&ndash;4 different contracts (DEX, lending
            protocol, vault, reward distributor). A bug in any one of them
            could result in total loss of deposited funds.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Rug Pulls
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Malicious protocols designed to attract deposits and then drain
            them. Common patterns include: admin keys that can withdraw all
            funds, contracts with hidden mint functions that can inflate the
            reward token to zero, and migration contracts that redirect funds.
            Stick to audited, established protocols.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Token Inflation / Death Spiral
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Many high-APY farms pay rewards in their own governance token.
            These tokens are continuously minted and distributed, creating
            constant sell pressure. If the price of the reward token falls
            faster than you earn it, your real yield is negative despite a high
            displayed APY. When farmers dump rewards, the price drops further,
            causing more farmers to exit &mdash; a death spiral.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Liquidation Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Leveraged farming positions can be liquidated if collateral values
            drop below the required threshold. Flash crashes or oracle issues
            can trigger cascading liquidations. Never use leverage you do not
            fully understand.
          </p>

          <div className="rounded-lg border border-red-300 dark:border-red-800/50 bg-red-50 dark:bg-red-950/30 p-4">
            <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">
              <strong>Critical rule:</strong> If a yield looks too good to be
              true, it almost certainly is. Sustainable DeFi yields come from
              real economic activity (trading fees, borrowing interest). Yields
              of 100%+ that come purely from token emissions are not sustainable
              and will eventually collapse. Always ask: &quot;Where does the
              yield come from?&quot;
            </p>
          </div>
        </section>

        {/* Real Yield vs Token Emissions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Real Yield vs Token Emissions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A crucial distinction in yield farming is the source of your
            returns:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Aspect
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Real Yield
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Token Emissions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Source</td>
                  <td className="px-4 py-3">Protocol revenue (fees, interest)</td>
                  <td className="px-4 py-3">Newly minted governance tokens</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Sustainability</td>
                  <td className="px-4 py-3">Sustainable if protocol has users</td>
                  <td className="px-4 py-3">Temporary, decreases over time</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Paid in</td>
                  <td className="px-4 py-3">ETH, USDC, or fee tokens</td>
                  <td className="px-4 py-3">Protocol&apos;s own token</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Typical APY</td>
                  <td className="px-4 py-3">3&ndash;20%</td>
                  <td className="px-4 py-3">50&ndash;1,000%+</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Example</td>
                  <td className="px-4 py-3">Uniswap trading fees, Aave interest</td>
                  <td className="px-4 py-3">CRV rewards, farm token rewards</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The &quot;real yield&quot; movement in DeFi emphasizes protocols
            that distribute actual revenue to participants rather than inflating
            a token supply. Protocols like GMX (distributing ETH/AVAX from
            trading fees) and Lido (staking rewards in ETH) exemplify this
            approach. Long-term sustainable farming focuses on real yield
            sources.
          </p>
        </section>

        {/* Getting Started */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Getting Started with Yield Farming
          </h2>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Start with lending</strong>:
              Deposit USDC or DAI into Aave on Ethereum or an L2 (Arbitrum,
              Optimism). This is the simplest strategy with no impermanent loss.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Try a stablecoin pool</strong>:
              Provide liquidity to a Curve stablecoin pool (3pool: USDC/USDT/DAI).
              Low impermanent loss risk, steady returns.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Use auto-compounders</strong>:
              Deposit your Curve LP tokens into Convex or Beefy to
              auto-compound rewards and boost yields.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Monitor your positions</strong>:
              Track yields and impermanent loss using DeFiLlama, Zapper, or
              DeBank. Yields change constantly.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Account for gas costs</strong>:
              On Ethereum mainnet, gas costs can eat into yields for smaller
              positions. Consider{" "}
              <Link
                href="/guides/what-is-layer2"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Layer 2 networks
              </Link>{" "}
              for lower costs.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Never overexpose</strong>:
              Start with small amounts. Never put all your crypto into a single
              farm or protocol.
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
              Is yield farming still profitable in 2025?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes, but yields have normalized significantly since &quot;DeFi
              Summer&quot; of 2020. Sustainable yields on stablecoin strategies
              typically range from 3&ndash;10% APY, while more aggressive
              strategies can offer 15&ndash;50% APY with proportionally higher
              risk. Focus on real yield (fees and revenue) rather than token
              emission-based rewards.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between APR and APY?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              APR is the simple interest rate without compounding. APY includes
              compound interest, which reinvests earned rewards. For example,
              100% APR compounded daily equals approximately 171.5% APY. Many
              DeFi protocols show APY, which looks more attractive but requires
              active or automated compounding to achieve.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is impermanent loss and how does it affect farming?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Impermanent loss occurs when providing liquidity to AMM pools and
              the price ratio of deposited tokens changes. For a 2x price
              change, impermanent loss is approximately 5.7%. Trading fees must
              exceed this loss for LP farming to be profitable. The loss becomes
              permanent when you withdraw.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How do I avoid yield farming scams?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Key red flags include: unaudited smart contracts, anonymous teams,
              unsustainably high APY (1,000%+ with no clear yield source),
              contracts where the admin can drain funds, and tokens with no real
              utility. Stick to established protocols (Aave, Curve, Convex,
              Yearn), verify contracts on Etherscan, and never invest more than
              you can afford to lose.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the safest yield farming strategy for beginners?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The safest approach is lending stablecoins (USDC, DAI) on Aave or
              Compound. This avoids impermanent loss entirely and exposes you
              only to smart contract risk on battle-tested protocols. Yields
              are modest (3&ndash;8% APY) but predictable. As you gain
              experience, explore stablecoin LP pairs on Curve or use
              auto-compounders like Yearn.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tools for Yield Farmers
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Analyze farming transactions with our developer tools. Use the{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to determine if gas costs eat into your farming yields, or the{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>{" "}
            to calculate precise token amounts. Decode farming transactions with
            our{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
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
              &mdash; The ecosystem that enables yield farming
            </li>
            <li>
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Staking?
              </Link>{" "}
              &mdash; Earn yield by securing the network
            </li>
            <li>
              <Link
                href="/guides/what-is-dex"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a DEX?
              </Link>{" "}
              &mdash; Where liquidity pools and farming happen
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; The code that powers farming protocols
            </li>
            <li>
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How Gas Fees Work
              </Link>{" "}
              &mdash; Gas costs that eat into farming yields
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
