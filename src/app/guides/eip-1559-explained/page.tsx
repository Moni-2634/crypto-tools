import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "EIP-1559 Explained: Ethereum's Fee Market Reform | EVMTools",
  description:
    "A complete guide to EIP-1559: how base fee and priority tip work, ETH burn mechanism, maxFeePerGas vs maxPriorityFeePerGas, Type 2 transactions, and the ultrasound money narrative.",
  keywords: [
    "eip 1559",
    "eip-1559",
    "ethereum gas",
    "base fee",
    "priority fee",
    "eth burn",
    "gas fee reform",
    "ethereum fee market",
    "maxFeePerGas",
    "maxPriorityFeePerGas",
    "type 2 transaction",
    "ultrasound money",
  ],
  openGraph: {
    title: "EIP-1559 Explained: Ethereum's Fee Market Reform | EVMTools",
    description:
      "A complete guide to EIP-1559: how base fee and priority tip work, ETH burn mechanism, maxFeePerGas vs maxPriorityFeePerGas, Type 2 transactions, and the ultrasound money narrative.",
    url: `${SITE_URL}/guides/eip-1559-explained`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EIP-1559 Explained: Ethereum's Fee Market Reform",
    description:
      "A complete guide to EIP-1559: how base fee and priority tip work, ETH burn mechanism, maxFeePerGas vs maxPriorityFeePerGas, Type 2 transactions, and the ultrasound money narrative.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/eip-1559-explained`,
  },
};

export default function EIP1559ExplainedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "EIP-1559 Explained: Ethereum's Fee Market Reform",
    description:
      "A complete guide to EIP-1559: how base fee and priority tip work, ETH burn mechanism, maxFeePerGas vs maxPriorityFeePerGas, Type 2 transactions, and the ultrasound money narrative.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/eip-1559-explained`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/eip-1559-explained`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is EIP-1559 in simple terms?",
      answer:
        "EIP-1559 is an upgrade to Ethereum's fee system that replaced the old auction-based model with a more predictable structure. Instead of bidding a single gas price, users now pay a base fee (set by the protocol and burned) plus an optional priority tip (paid to validators). The base fee adjusts automatically based on network congestion, making fees more predictable.",
    },
    {
      question: "Does EIP-1559 make gas fees lower?",
      answer:
        "EIP-1559 does not directly lower gas fees because fees are ultimately determined by supply and demand for block space. However, it makes fees more predictable by reducing fee spikes and overpayment. Users are less likely to overpay because the base fee is algorithmically determined. The real cost reduction for users came from Layer 2 solutions and EIP-4844 (Proto-Danksharding).",
    },
    {
      question: "How much ETH has been burned since EIP-1559?",
      answer:
        "Since EIP-1559 launched in August 2021, millions of ETH have been burned, worth billions of dollars. The burn rate varies with network activity. During periods of high activity like popular NFT mints or DeFi surges, the burn rate spikes dramatically. You can track the cumulative burn on sites like ultrasound.money.",
    },
    {
      question: "What is the difference between maxFeePerGas and maxPriorityFeePerGas?",
      answer:
        "maxFeePerGas is the absolute maximum gas price you are willing to pay per unit of gas, including both the base fee and priority tip. maxPriorityFeePerGas is the maximum tip you are willing to pay to the validator. Your actual cost is min(maxFeePerGas, baseFee + maxPriorityFeePerGas), and any difference between your maxFeePerGas and the actual cost is refunded.",
    },
    {
      question: "Is Ethereum deflationary because of EIP-1559?",
      answer:
        "Ethereum is not always deflationary. EIP-1559 creates a burn mechanism, but new ETH is also issued as staking rewards. When the burn rate exceeds the issuance rate, ETH supply decreases (deflationary). When issuance exceeds burn, supply increases (inflationary). During periods of high network activity, ETH tends to be deflationary. During quiet periods, it tends to be slightly inflationary.",
    },
    {
      question: "Can the base fee go to zero?",
      answer:
        "Theoretically, the base fee could decrease to a very small number if blocks were consistently less than 50% full, but it can never reach exactly zero. The minimum base fee is 1 Wei (0.000000001 Gwei). In practice, even during low-activity periods, the base fee stays well above zero because there is always some transaction demand on Ethereum mainnet.",
    },
  ]);

  return (
    <ToolLayout slug="eip-1559-explained">
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
            EIP-1559 is one of the most significant upgrades in Ethereum&apos;s
            history. Activated on August 5, 2021 as part of the London hard
            fork, it fundamentally changed{" "}
            <Link href="/guides/how-gas-fees-work" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">how transaction fees work</Link> on
            Ethereum. It replaced the unpredictable first-price auction model
            with an algorithmically determined base fee, introduced ETH burning,
            and made gas estimation dramatically more reliable. This guide
            explains every aspect of EIP-1559 in detail.
          </p>
        </section>

        {/* Before EIP-1559 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Before EIP-1559: The First-Price Auction Problem
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before EIP-1559, Ethereum used a simple first-price auction model
            for transaction fees. Users set a single gas price (in Gwei) when
            submitting a transaction, and miners selected the highest-paying
            transactions for inclusion in their blocks.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This system had several serious problems:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Fee unpredictability</strong>:
              Users had no way to know the &quot;right&quot; gas price. Wallets
              estimated based on recent blocks, but during rapid congestion
              changes, estimates quickly became outdated. Users either overpaid
              or waited hours for confirmation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Systematic overpayment</strong>:
              Rational users would set high gas prices as insurance against fee
              spikes, but if the network was not congested, they overpaid
              significantly. Unlike a second-price auction, they paid exactly
              what they bid, not the market-clearing price.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Fee volatility</strong>: Gas
              prices could swing wildly from block to block. One block might
              have a 20 Gwei average, and the next might have 200 Gwei during
              an NFT mint.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Miner manipulation
              </strong>
              : Miners could artificially inflate fees by including their own
              high-fee transactions or by colluding to keep block utilization
              high.
            </li>
          </ul>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Old Fee Model (Pre-EIP-1559):
  User sets: gasPrice = 50 Gwei
  Transaction fee = gasUsed × gasPrice
  Example: 21,000 gas × 50 Gwei = 1,050,000 Gwei = 0.00105 ETH

  Problem: If the market rate was 20 Gwei, user overpaid 2.5x
  All of the fee goes to the miner — nothing is burned`}</code>
          </pre>
        </section>

        {/* The New Fee Structure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The New Fee Structure: Base Fee + Priority Tip
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EIP-1559 replaced the single gas price with a two-component fee
            structure:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`EIP-1559 Fee Formula:
  Effective Gas Price = Base Fee + Priority Fee (Tip)
  Transaction Fee = Gas Used × Effective Gas Price

  Where:
    Base Fee     → Set by the protocol (burned, not paid to validators)
    Priority Fee → Set by the user (paid to the validator as a tip)`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Base Fee
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The base fee is the minimum price per unit of gas required for
            inclusion in a block. It is{" "}
            <strong className="text-gray-900 dark:text-white">
              determined algorithmically by the protocol
            </strong>
            , not by users or validators. No one can change it, and no one
            receives it &mdash; it is burned (permanently destroyed).
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The base fee is the same for every transaction in a given block.
            This means all transactions pay the same minimum rate, eliminating
            the overpayment problem of the old auction model.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Priority Fee (Tip)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The priority fee (also called the tip or{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxPriorityFeePerGas
            </code>
            ) is a voluntary payment from the user directly to the validator.
            It incentivizes validators to include your transaction in their
            block. During normal conditions, a tip of 1&ndash;2 Gwei is
            sufficient. During extreme congestion, higher tips may be needed for
            faster inclusion.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Key insight:</strong> Under EIP-1559, validators only
              receive the priority fee (tip). The base fee is burned. This
              fundamentally changes the economics: validators earn less per
              transaction than miners did under the old system, but users pay
              fairer prices.
            </p>
          </div>
        </section>

        {/* How Base Fee Adjusts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How the Base Fee Adjusts
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The base fee adjusts automatically based on how full the previous
            block was relative to a target. Ethereum blocks have a{" "}
            <strong className="text-gray-900 dark:text-white">target size</strong> of 15 million
            gas and a{" "}
            <strong className="text-gray-900 dark:text-white">maximum size</strong> of 30 million
            gas. The base fee adjusts to target 50% block utilization:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              If the previous block used{" "}
              <strong className="text-gray-900 dark:text-white">more than 15M gas</strong> (above
              target): the base fee{" "}
              <strong className="text-gray-900 dark:text-white">increases</strong>.
            </li>
            <li>
              If the previous block used{" "}
              <strong className="text-gray-900 dark:text-white">exactly 15M gas</strong> (at
              target): the base fee{" "}
              <strong className="text-gray-900 dark:text-white">stays the same</strong>.
            </li>
            <li>
              If the previous block used{" "}
              <strong className="text-gray-900 dark:text-white">less than 15M gas</strong> (below
              target): the base fee{" "}
              <strong className="text-gray-900 dark:text-white">decreases</strong>.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The maximum change per block is{" "}
            <strong className="text-gray-900 dark:text-white">12.5%</strong>.
            This creates predictable fee dynamics: even during the most intense
            congestion, you can predict the maximum possible base fee for the
            next few blocks.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Base Fee Adjustment Formula:

new_base_fee = parent_base_fee × (1 + (parent_gas_used - target_gas) / target_gas / 8)

Where:
  target_gas = 15,000,000 (15M)
  max_gas    = 30,000,000 (30M)
  max_change = 1/8 = 12.5%

Examples:
  Block 100% full (30M gas): base fee increases by 12.5%
  Block 50% full  (15M gas): base fee stays the same
  Block 0% full   (0 gas):   base fee decreases by 12.5%
  Block 75% full  (22.5M):   base fee increases by 6.25%

Starting at 10 Gwei with consecutive full blocks:
  Block 1: 10.00 Gwei
  Block 2: 11.25 Gwei (+12.5%)
  Block 3: 12.66 Gwei (+12.5%)
  Block 4: 14.24 Gwei (+12.5%)
  Block 5: 16.02 Gwei (+12.5%)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This exponential growth during congestion is by design. If blocks
            remain consistently full, the base fee doubles approximately every
            6 blocks (~72 seconds). This rapid increase quickly prices out
            lower-priority transactions, preventing sustained congestion.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* ETH Burn Mechanism */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The ETH Burn Mechanism
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most economically significant aspect of EIP-1559 is that the
            base fee is{" "}
            <strong className="text-gray-900 dark:text-white">burned</strong>{" "}
            &mdash; permanently removed from circulation. Every transaction on
            Ethereum destroys some ETH. This creates a direct link between
            network usage and ETH supply:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">More network activity</strong> =
              higher base fee = more ETH burned per block.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Less network activity</strong> =
              lower base fee = less ETH burned per block.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The burn competes with new ETH issuance (staking rewards). When the
            burn rate exceeds issuance, the total supply of ETH decreases,
            making it deflationary. When issuance exceeds burn, the supply
            increases slightly.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`ETH Supply Dynamics:

  Annual ETH Issuance (staking rewards): ~0.5-1.0% of supply
  Annual ETH Burn (EIP-1559):            Variable, depends on usage

  If burn > issuance → Supply decreases (deflationary)
  If burn < issuance → Supply increases (inflationary)

  Example at 30M ETH staked:
    Issuance: ~1,700 ETH/day
    Burn at 20 Gwei avg base fee: ~1,600 ETH/day → slightly inflationary
    Burn at 30 Gwei avg base fee: ~2,400 ETH/day → deflationary
    Burn at 50 Gwei avg base fee: ~4,000 ETH/day → strongly deflationary`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Why burn instead of paying validators? The burn serves several
            important purposes:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Prevents validator manipulation
              </strong>
              : If validators received the base fee, they could artificially
              inflate it by stuffing blocks with their own transactions (they
              would pay the fee to themselves).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Aligns ETH holder incentives
              </strong>
              : The burn makes ETH scarcer, benefiting all ETH holders
              proportionally. Network usage directly creates value for the
              asset.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Creates a fee floor
              </strong>
              : Validators cannot accept transactions below the base fee, even
              if they wanted to, creating a consistent minimum fee.
            </li>
          </ol>
        </section>

        {/* Practical Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Practical Example: Calculating a Transaction Fee
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Let&apos;s walk through exactly how a transaction fee is calculated
            under EIP-1559:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Scenario: Simple ETH transfer

Given:
  Gas Used:               21,000
  Current Base Fee:       25 Gwei
  maxPriorityFeePerGas:   2 Gwei (your tip)
  maxFeePerGas:           35 Gwei (your maximum)

Step 1: Determine effective gas price
  Effective Price = Base Fee + Priority Fee
  Effective Price = 25 + 2 = 27 Gwei

  Check: Is 27 ≤ maxFeePerGas (35)? Yes → proceed
  (If it exceeded maxFeePerGas, the tx would wait for a lower base fee)

Step 2: Calculate transaction fee
  Fee = Gas Used × Effective Gas Price
  Fee = 21,000 × 27 Gwei = 567,000 Gwei = 0.000567 ETH

Step 3: How the fee is distributed
  Burned:              21,000 × 25 = 525,000 Gwei (base fee × gas)
  To Validator:        21,000 × 2  = 42,000 Gwei  (tip × gas)

  Total:               567,000 Gwei = 0.000567 ETH
  Refunded to user:    21,000 × (35 - 27) = 168,000 Gwei = 0.000168 ETH

At ETH = $3,000:
  Total fee paid:  $1.70
  ETH burned:      $1.58
  Validator tip:   $0.13
  Refund:          $0.50`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Try calculating fees for different gas prices and gas limits with
            our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>
            , and convert between Wei, Gwei, and ETH with the{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>
            .
          </p>
        </section>

        {/* maxFeePerGas vs maxPriorityFeePerGas */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            maxFeePerGas vs maxPriorityFeePerGas
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When submitting a Type 2 (EIP-1559) transaction, you specify two
            fee parameters:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            maxFeePerGas
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The absolute maximum gas price (including both base fee and tip)
            you are willing to pay. This protects you from base fee spikes. If
            the current base fee + your tip exceeds your{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxFeePerGas
            </code>
            , your transaction will wait in the mempool until the base fee drops
            enough.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            maxPriorityFeePerGas
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The maximum tip you are willing to pay to the validator. This is
            the incentive for the validator to include your transaction. The
            actual priority fee paid is:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`actual_priority_fee = min(maxPriorityFeePerGas, maxFeePerGas - baseFee)

Example 1: Normal conditions
  maxFeePerGas = 50 Gwei, maxPriorityFeePerGas = 2 Gwei, baseFee = 30 Gwei
  actual_priority = min(2, 50 - 30) = min(2, 20) = 2 Gwei
  effective_price = 30 + 2 = 32 Gwei

Example 2: Base fee near your max
  maxFeePerGas = 50 Gwei, maxPriorityFeePerGas = 2 Gwei, baseFee = 49 Gwei
  actual_priority = min(2, 50 - 49) = min(2, 1) = 1 Gwei
  effective_price = 49 + 1 = 50 Gwei (capped at your max)

Example 3: Base fee exceeds your max
  maxFeePerGas = 50 Gwei, maxPriorityFeePerGas = 2 Gwei, baseFee = 55 Gwei
  Transaction CANNOT be included — waits in mempool`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This two-parameter system gives users fine-grained control. You can
            set a generous{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxFeePerGas
            </code>{" "}
            to survive base fee spikes while keeping your{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxPriorityFeePerGas
            </code>{" "}
            low. You will never overpay because the actual effective price is
            always{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              baseFee + actual_priority_fee
            </code>
            , and the difference is refunded.
          </p>
        </section>

        {/* Gas Estimation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Improved Gas Estimation
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            One of EIP-1559&apos;s biggest quality-of-life improvements is more
            reliable gas estimation. Since the base fee changes predictably
            (maximum 12.5% per block), wallets can make confident predictions:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Gas Estimation Strategy:

Current base fee: 20 Gwei

To guarantee inclusion in the next 6 blocks (worst case):
  Max possible base fee = 20 × (1.125)^6 = 20 × 2.027 = 40.5 Gwei

  Recommended maxFeePerGas: ~41 Gwei (covers 6 consecutive full blocks)
  Recommended maxPriorityFeePerGas: 1-2 Gwei

If blocks are not full, you pay much less:
  Actual cost ≈ 20 Gwei base + 2 Gwei tip = 22 Gwei
  Refund: (41 - 22) × gasUsed = 19 Gwei per gas`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most wallets now use this predictability to set safe defaults. Users
            can submit transactions with confidence that they will not grossly
            overpay, because the refund mechanism returns the difference
            between their max fee and the actual cost.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Type 0 vs Type 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Type 0 vs Type 2 Transactions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EIP-1559 introduced a new transaction type while maintaining
            backward compatibility with the old format:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Type 0 (Legacy Transactions)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The original Ethereum transaction format with a single{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              gasPrice
            </code>{" "}
            field. These are still valid and processed by the network. When a
            legacy transaction is submitted, the protocol treats the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              gasPrice
            </code>{" "}
            as both the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxFeePerGas
            </code>{" "}
            and the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxPriorityFeePerGas
            </code>
            . The base fee is still burned; the remainder goes to the validator.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Type 1 (EIP-2930 Access List Transactions)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Introduced before EIP-1559, Type 1 transactions added optional
            access lists (predefining which storage slots and addresses a
            transaction will touch) for gas savings on cross-contract calls.
            They still use the legacy{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              gasPrice
            </code>{" "}
            field.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Type 2 (EIP-1559 Transactions)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The new default transaction format with{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxFeePerGas
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              maxPriorityFeePerGas
            </code>{" "}
            fields. This is what you should use for all new transactions.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type 0 (Legacy)
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type 2 (EIP-1559)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Fee parameters</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">gasPrice</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">maxFeePerGas</code>
                    {" + "}
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">maxPriorityFeePerGas</code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Overpayment protection</td>
                  <td className="px-4 py-3">No (pay exactly gasPrice)</td>
                  <td className="px-4 py-3">Yes (refund difference)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Base fee handling</td>
                  <td className="px-4 py-3">Burned from gasPrice</td>
                  <td className="px-4 py-3">Burned separately</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Validator payment</td>
                  <td className="px-4 py-3">gasPrice - baseFee</td>
                  <td className="px-4 py-3">Explicit priority fee</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Recommended</td>
                  <td className="px-4 py-3">Legacy compatibility only</td>
                  <td className="px-4 py-3">Default for all new transactions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Impact on ETH */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impact on ETH as an Asset: The Ultrasound Money Narrative
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EIP-1559 fundamentally changed the economic properties of ETH. The
            burn mechanism created a direct connection between network utility
            and asset scarcity:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Before EIP-1559</strong>: ETH was
              purely inflationary. New ETH was constantly created through
              mining rewards with no offsetting mechanism.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">After EIP-1559</strong>: ETH has a
              burn mechanism that can make it deflationary during high-activity
              periods.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">After The Merge</strong>: Issuance
              dropped ~90% (from mining rewards to staking rewards). Combined
              with EIP-1559 burns, ETH became net deflationary during the
              initial post-Merge period.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This led to the &quot;ultrasound money&quot; narrative, a play on{" "}
            <Link href="/guides/ethereum-vs-bitcoin" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">Bitcoin&apos;s</Link> &quot;sound
            money&quot; concept. The argument is that ETH is superior to gold
            and Bitcoin as money because it is not just scarce (fixed or capped
            supply) but potentially{" "}
            <strong className="text-gray-900 dark:text-white">
              increasingly scarce
            </strong>{" "}
            as network usage grows.
          </p>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> ETH is not always deflationary. During
              periods of low network activity, issuance exceeds burn, and the
              supply grows. The deflationary narrative depends on sustained
              demand for Ethereum block space. With the shift of transaction
              activity to{" "}
              <Link href="/guides/what-is-layer2" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">Layer 2 networks</Link> (especially
              after EIP-4844), L1 base fees have decreased, reducing the burn
              rate.
            </p>
          </div>
        </section>

        {/* Developer Implications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Developer Implications
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you are building applications on Ethereum, EIP-1559 changes how
            you handle gas in your code:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// ethers.js v6 - Sending an EIP-1559 transaction
const tx = await wallet.sendTransaction({
  to: "0xRecipient...",
  value: ethers.parseEther("1.0"),

  // EIP-1559 fee parameters
  maxFeePerGas: ethers.parseUnits("50", "gwei"),
  maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),

  // Type 2 is the default in ethers.js v6
  type: 2,
});

// Getting fee data from the network
const feeData = await provider.getFeeData();
console.log("Base Fee:", feeData.gasPrice);       // current base fee
console.log("Max Fee:", feeData.maxFeePerGas);     // suggested max fee
console.log("Priority:", feeData.maxPriorityFeePerGas); // suggested tip`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Key considerations for developers:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Always use Type 2 transactions in new code. Type 0 still works
              but does not benefit from the refund mechanism.
            </li>
            <li>
              Use{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                eth_feeHistory
              </code>{" "}
              RPC method to analyze recent fee trends and set optimal parameters.
            </li>
            <li>
              Access the current base fee via{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                block.baseFeePerGas
              </code>{" "}
              in the block header (available in Solidity via{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                block.basefee
              </code>
              ).
            </li>
            <li>
              Smart contracts can read the base fee to make gas-aware decisions
              (e.g., deferring non-urgent operations to lower-fee periods).
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
              What is EIP-1559 in simple terms?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              EIP-1559 is an upgrade to Ethereum&apos;s fee system that replaced
              the old auction-based model with a more predictable structure.
              Instead of bidding a single gas price, users now pay a base fee
              (set by the protocol and burned) plus an optional priority tip
              (paid to validators). The base fee adjusts automatically based on
              network congestion, making fees more predictable.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Does EIP-1559 make gas fees lower?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              EIP-1559 does not directly lower gas fees because fees are
              ultimately determined by supply and demand for block space.
              However, it makes fees more predictable by reducing fee spikes and
              overpayment. Users are less likely to overpay because the base fee
              is algorithmically determined. The real cost reduction for users
              came from Layer 2 solutions and EIP-4844 (Proto-Danksharding).
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much ETH has been burned since EIP-1559?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Since EIP-1559 launched in August 2021, millions of ETH have been
              burned, worth billions of dollars. The burn rate varies with
              network activity. During periods of high activity like popular NFT
              mints or DeFi surges, the burn rate spikes dramatically. You can
              track the cumulative burn on sites like ultrasound.money.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between maxFeePerGas and
              maxPriorityFeePerGas?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                maxFeePerGas
              </code>{" "}
              is the absolute maximum gas price you are willing to pay per unit
              of gas, including both the base fee and priority tip.{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                maxPriorityFeePerGas
              </code>{" "}
              is the maximum tip you are willing to pay to the validator. Your
              actual cost is{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                min(maxFeePerGas, baseFee + maxPriorityFeePerGas)
              </code>
              , and any difference between your maxFeePerGas and the actual cost
              is refunded.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is Ethereum deflationary because of EIP-1559?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Ethereum is not always deflationary. EIP-1559 creates a burn
              mechanism, but new ETH is also issued as staking rewards. When the
              burn rate exceeds the issuance rate, ETH supply decreases
              (deflationary). When issuance exceeds burn, supply increases
              (inflationary). During periods of high network activity, ETH tends
              to be deflationary. During quiet periods, it tends to be slightly
              inflationary.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can the base fee go to zero?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Theoretically, the base fee could decrease to a very small number
              if blocks were consistently less than 50% full, but it can never
              reach exactly zero. In practice, even during low-activity periods,
              the base fee stays well above zero because there is always some
              transaction demand on Ethereum mainnet.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Calculate Your EIP-1559 Transaction Costs
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Put EIP-1559 into practice. Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to compute exact transaction costs for any base fee and gas limit,
            or convert between Wei, Gwei, and ETH with the{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>
            .
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
              &mdash; Calculate transaction costs with EIP-1559 fee parameters
            </li>
            <li>
              <Link
                href="/crypto/eth-unit-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ETH Unit Converter
              </Link>{" "}
              &mdash; Convert between Wei, Gwei, and ETH denominations
            </li>
            <li>
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How Gas Fees Work
              </Link>{" "}
              &mdash; Complete guide to Ethereum gas, opcodes, and optimization
            </li>
            <li>
              <Link
                href="/guides/what-is-layer2"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Layer 2?
              </Link>{" "}
              &mdash; Learn how L2 solutions reduce fees using EIP-1559 and EIP-4844
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
