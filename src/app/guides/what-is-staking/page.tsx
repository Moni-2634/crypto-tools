import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is Staking? A Complete Guide to Crypto Staking | EVMTools",
  description:
    "Learn what staking is, how Ethereum Proof of Stake works, liquid staking options like Lido and Rocket Pool, staking rewards, risks, and how to stake ETH step by step.",
  keywords: [
    "staking",
    "what is staking",
    "ethereum staking",
    "proof of stake",
    "liquid staking",
    "staking rewards",
    "eth staking",
    "validator",
    "lido steth",
    "rocket pool",
    "restaking",
    "eigenlayer",
  ],
  openGraph: {
    title: "What is Staking? A Complete Guide to Crypto Staking | EVMTools",
    description:
      "Learn what staking is, how Ethereum Proof of Stake works, liquid staking options like Lido and Rocket Pool, staking rewards, risks, and how to stake ETH step by step.",
    url: `${SITE_URL}/guides/what-is-staking`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Staking? A Complete Guide to Crypto Staking",
    description:
      "Learn what staking is, how Ethereum Proof of Stake works, liquid staking options like Lido and Rocket Pool, staking rewards, risks, and how to stake ETH step by step.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-staking`,
  },
};

export default function WhatIsStakingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Staking? A Complete Guide to Crypto Staking",
    description:
      "Learn what staking is, how Ethereum Proof of Stake works, liquid staking options like Lido and Rocket Pool, staking rewards, risks, and how to stake ETH step by step.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-staking`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-staking`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "How much ETH do I need to stake?",
      answer:
        "To run a solo validator, you need exactly 32 ETH. However, liquid staking protocols like Lido and Rocket Pool allow you to stake any amount of ETH, even fractions. Centralized exchanges also offer staking with no minimum requirement.",
    },
    {
      question: "Can I unstake my ETH at any time?",
      answer:
        "Since the Shapella upgrade in April 2023, validators can withdraw their staked ETH. However, there is a withdrawal queue, and the time depends on how many validators are exiting simultaneously. Liquid staking tokens like stETH can be traded on the open market at any time for near-instant liquidity.",
    },
    {
      question: "What is the current ETH staking APR?",
      answer:
        "The ETH staking APR typically ranges from 3% to 5%, depending on network activity and the total amount of ETH staked. When network activity is high, validators earn more from priority fees and MEV. The APR decreases as more validators join the network.",
    },
    {
      question: "Is staking ETH safe?",
      answer:
        "Solo staking carries risks including slashing (losing ETH for validator misbehavior), downtime penalties, and technical complexity. Liquid staking adds smart contract risk. Centralized exchange staking adds counterparty risk. Each method has different risk-reward tradeoffs.",
    },
    {
      question: "What is the difference between APR and APY in staking?",
      answer:
        "APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding rewards. For Ethereum staking, rewards do not auto-compound on the beacon chain, so APR is the more accurate metric. However, liquid staking protocols may offer auto-compounding, making APY the relevant measure.",
    },
    {
      question: "What happens if my validator goes offline?",
      answer:
        "If your validator goes offline, you incur inactivity penalties. These penalties are designed to be roughly equal to the rewards you would have earned, so being offline for a day costs approximately the same as what you would have earned in a day. The penalties increase if a large number of validators go offline simultaneously (inactivity leak).",
    },
  ]);

  return (
    <ToolLayout slug="what-is-staking">
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
            Staking is one of the most important concepts in modern
            cryptocurrency. It allows you to earn rewards by locking up your
            tokens to help secure a blockchain network. Since Ethereum&apos;s
            transition to Proof of Stake in September 2022 (The Merge), staking
            has become central to how the world&apos;s largest smart contract
            platform operates. This guide explains everything you need to know
            about staking, from the basics to advanced strategies.
          </p>
        </section>

        {/* What is Staking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Staking?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Staking is the process of depositing cryptocurrency into a
            blockchain protocol to support network operations like validating
            transactions and producing new blocks. In return, stakers earn
            rewards, typically paid in the same token they staked.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Think of staking like a security deposit. You lock up your tokens as
            collateral to prove you have &quot;skin in the game.&quot; If you
            act honestly and keep your validator running, you earn rewards. If
            you try to cheat or go offline, you can lose part of your deposit
            through a process called{" "}
            <strong className="text-gray-900 dark:text-white">slashing</strong>.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Key point:</strong> Staking replaces the energy-intensive
              mining process used by Proof of Work chains like Bitcoin. Instead
              of competing with computational power, validators compete with
              economic stake.
            </p>
          </div>
        </section>

        {/* Proof of Stake */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Understanding Proof of Stake
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Proof of Stake (PoS) is a consensus mechanism that determines how a
            blockchain network agrees on the current state of the ledger. Unlike
            Proof of Work (PoW), which requires miners to solve complex
            mathematical puzzles, PoS selects validators based on the amount of
            cryptocurrency they have staked.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The core idea is simple: validators with more stake have more to
            lose from acting maliciously, so they are economically incentivized
            to behave honestly. Here is how the process works:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Deposit stake</strong>: Validators
              lock up tokens (32 ETH on Ethereum) as collateral.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Random selection</strong>: The
              protocol randomly selects a validator to propose the next block.
              The probability of selection is weighted by stake size.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Attestation</strong>: Other
              validators verify the proposed block and attest (vote) that it is
              valid.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Finalization</strong>: Once enough
              attestations are collected, the block is finalized and becomes a
              permanent part of the chain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Rewards</strong>: The block proposer
              and attestors earn rewards in ETH for their honest participation.
            </li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum&apos;s PoS implementation uses a system of{" "}
            <strong className="text-gray-900 dark:text-white">slots</strong> and{" "}
            <strong className="text-gray-900 dark:text-white">epochs</strong>. A
            slot occurs every 12 seconds (one chance to propose a block), and an
            epoch consists of 32 slots (6.4 minutes). Validators are assigned to
            committees within each epoch and must attest to blocks during their
            assigned slots.
          </p>
        </section>

        {/* How Ethereum Staking Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Ethereum Staking Works
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum staking centers around the Beacon Chain, the coordination
            layer that manages validators and the PoS protocol. Here are the key
            components:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            The 32 ETH Requirement
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            To run a solo validator on Ethereum, you must deposit exactly 32 ETH
            into the deposit contract. This amount was chosen to balance two
            competing goals:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Security</strong>: A higher minimum
              makes it expensive for attackers to control enough validators to
              compromise the network.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Decentralization</strong>: A lower
              minimum allows more people to participate as validators.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            At current prices, 32 ETH represents a significant investment,
            which is why alternative staking methods (liquid staking, pooled
            staking) have become so popular.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Validator Responsibilities
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Running a validator involves two pieces of software:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Execution client</strong> (e.g.,
              Geth, Nethermind, Besu): Processes transactions and maintains the
              state of the EVM.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Consensus client</strong> (e.g.,
              Prysm, Lighthouse, Teku, Nimbus, Lodestar): Implements the PoS
              protocol and manages the Beacon Chain.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Validators must keep both clients running 24/7. Going offline
            results in small penalties (inactivity leak), and producing
            conflicting blocks or attestations results in slashing.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Staking Rewards Breakdown
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Validator rewards come from several sources:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Reward Source
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Description
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Approximate Contribution
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Attestation rewards</td>
                  <td className="px-4 py-3">Voting on correct blocks</td>
                  <td className="px-4 py-3">~84% of base rewards</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Block proposals</td>
                  <td className="px-4 py-3">Proposing new blocks</td>
                  <td className="px-4 py-3">~16% of base rewards</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Sync committee</td>
                  <td className="px-4 py-3">Participating in sync committees</td>
                  <td className="px-4 py-3">Occasional bonus</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Priority fees (tips)</td>
                  <td className="px-4 py-3">Transaction tips from users</td>
                  <td className="px-4 py-3">Variable, depends on activity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">MEV rewards</td>
                  <td className="px-4 py-3">
                    Extracted value from transaction ordering
                  </td>
                  <td className="px-4 py-3">Variable, can be significant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* APR vs APY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Staking Rewards: APR vs APY
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding the difference between APR and APY is crucial for
            evaluating staking returns:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">APR (Annual Percentage Rate)</strong>
              : Simple interest without compounding. If you stake 32 ETH at 4%
              APR, you earn 1.28 ETH per year.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">APY (Annual Percentage Yield)</strong>
              : Includes the effect of compounding. If your rewards are
              automatically restaked, you earn interest on your interest.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            On Ethereum&apos;s consensus layer, rewards do not auto-compound
            because rewards accumulate in the validator&apos;s balance but cannot
            be restaked without withdrawing and depositing again. Therefore, the
            native staking rate is expressed as APR. Some liquid staking
            protocols implement auto-compounding, which justifies using APY.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`APR Example:
  Stake: 32 ETH
  APR: 4%
  Annual Reward: 32 × 0.04 = 1.28 ETH

APY Example (daily compounding):
  Stake: 32 ETH
  APR: 4%
  APY: (1 + 0.04/365)^365 - 1 = 4.08%
  Annual Reward: 32 × 0.0408 = 1.306 ETH`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Ethereum staking APR is inversely related to the total amount of
            ETH staked. More validators means rewards are split among more
            participants. As of early 2026, the base staking APR is approximately
            3.5&ndash;4.5%, with additional MEV and tips pushing effective rates
            higher. You can convert between ETH denominations to calculate your
            exact rewards using our{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>
            .
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Liquid Staking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Liquid Staking
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Liquid staking protocols solve the biggest drawback of traditional
            staking: illiquidity. When you stake through a liquid staking
            protocol, you receive a derivative token that represents your staked
            ETH plus accumulated rewards. This token can be freely traded, used
            as collateral in DeFi, or transferred to other wallets.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            How Liquid Staking Works
          </h3>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>You deposit ETH into the liquid staking protocol&apos;s smart contract.</li>
            <li>The protocol issues you a liquid staking token (LST) representing your deposit.</li>
            <li>The protocol pools deposited ETH and runs validators on behalf of all depositors.</li>
            <li>Staking rewards accrue to the LST, either through rebasing (balance increases) or exchange rate appreciation.</li>
            <li>You can use your LST in DeFi or sell it on the open market anytime.</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Liquid Staking Protocols Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Protocol
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Token
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Mechanism
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Min. Deposit
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Fee
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Decentralization
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Lido</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                      stETH
                    </code>
                  </td>
                  <td className="px-4 py-3">Rebase (balance grows daily)</td>
                  <td className="px-4 py-3">Any amount</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Medium (curated node operators)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Rocket Pool</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                      rETH
                    </code>
                  </td>
                  <td className="px-4 py-3">Exchange rate appreciation</td>
                  <td className="px-4 py-3">0.01 ETH</td>
                  <td className="px-4 py-3">~14%</td>
                  <td className="px-4 py-3">High (permissionless node operators)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Coinbase</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                      cbETH
                    </code>
                  </td>
                  <td className="px-4 py-3">Exchange rate appreciation</td>
                  <td className="px-4 py-3">Any amount</td>
                  <td className="px-4 py-3">25%</td>
                  <td className="px-4 py-3">Low (centralized)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Frax</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                      sfrxETH
                    </code>
                  </td>
                  <td className="px-4 py-3">Exchange rate appreciation</td>
                  <td className="px-4 py-3">Any amount</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Medium (curated operators)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Swell</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                      swETH
                    </code>
                  </td>
                  <td className="px-4 py-3">Exchange rate appreciation</td>
                  <td className="px-4 py-3">Any amount</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Medium (curated operators)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Rebase vs Exchange Rate Models
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            There are two primary approaches liquid staking tokens use to
            reflect staking rewards:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Rebase tokens (stETH)</strong>: Your
              token balance increases daily. If you hold 10 stETH today, you
              might hold 10.001 stETH tomorrow. One stETH is always roughly
              equal to one ETH.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Exchange rate tokens (rETH, cbETH)
              </strong>
              : Your token balance stays the same, but each token becomes worth
              more ETH over time. For example, 1 rETH might be worth 1.05 ETH
              today and 1.10 ETH a year from now.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Exchange rate tokens are generally simpler to integrate into DeFi
            protocols because the balance does not change unexpectedly. Rebase
            tokens require special handling in many smart contracts.
          </p>
        </section>

        {/* Staking Risks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Risks of Staking
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            While staking offers attractive rewards, it is not risk-free.
            Understanding the risks is essential before committing your ETH:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Slashing
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Slashing is the most severe penalty a validator can face. It occurs
            when a validator commits a provably malicious act, such as:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Double voting</strong>: Attesting to
              two different blocks for the same slot.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Surround voting</strong>: Making an
              attestation that contradicts a previous attestation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Double proposing</strong>: Proposing
              two different blocks for the same slot.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When slashed, a validator immediately loses 1/32 of their stake
            (about 1 ETH) and is forcibly exited. There is also a correlated
            penalty that increases if many validators are slashed around the
            same time, up to the full 32 ETH in extreme cases.
          </p>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Slashing is rare and typically caused by
              running the same validator keys on two machines simultaneously.
              Never run duplicate validator instances. Always use a proper key
              management setup.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Smart Contract Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Liquid staking protocols rely on smart contracts. A bug in the
            contract code could lead to loss of funds. While major protocols
            have been extensively audited, no audit guarantees perfect security.
            The more complex the protocol, the larger the attack surface.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Market and Liquidity Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Liquid staking tokens can trade at a discount to their underlying
            ETH value during market stress. For example, stETH briefly traded at
            a 5% discount during the Three Arrows Capital collapse in 2022.
            While these discounts typically recover, they can be problematic if
            you need to exit your position during a crisis.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Centralization Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Lido at its peak controlled over 30% of all staked ETH, raising
            concerns about centralization. If a single entity controls more
            than 33% of validators, it could theoretically halt finality. If it
            controls more than 66%, it could finalize invalid blocks. This is
            why the Ethereum community actively encourages staking diversity.
          </p>
        </section>

        {/* Solo vs Pooled vs CEX */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Solo Staking vs Pooled Staking vs CEX Staking
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            There are three main ways to stake ETH, each with different
            tradeoffs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Solo Staking
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Pooled / Liquid Staking
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    CEX Staking
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Minimum ETH</td>
                  <td className="px-4 py-3">32 ETH</td>
                  <td className="px-4 py-3">Any amount</td>
                  <td className="px-4 py-3">Any amount</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Technical difficulty</td>
                  <td className="px-4 py-3">High</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Very low</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Control of keys</td>
                  <td className="px-4 py-3">Full control</td>
                  <td className="px-4 py-3">Smart contract custody</td>
                  <td className="px-4 py-3">Exchange custody</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Reward rate</td>
                  <td className="px-4 py-3">Highest (no fees)</td>
                  <td className="px-4 py-3">Moderate (10-15% fee)</td>
                  <td className="px-4 py-3">Lowest (15-25% fee)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Liquidity</td>
                  <td className="px-4 py-3">Low (withdrawal queue)</td>
                  <td className="px-4 py-3">High (trade LST anytime)</td>
                  <td className="px-4 py-3">Medium (varies by exchange)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Slashing risk</td>
                  <td className="px-4 py-3">You bear full risk</td>
                  <td className="px-4 py-3">Socialized across pool</td>
                  <td className="px-4 py-3">Exchange bears risk</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Censorship resistance</td>
                  <td className="px-4 py-3">Highest</td>
                  <td className="px-4 py-3">Medium</td>
                  <td className="px-4 py-3">Lowest</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Restaking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Restaking and EigenLayer
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Restaking is a newer concept that allows staked ETH to secure
            additional protocols beyond Ethereum itself. EigenLayer, the
            pioneering restaking protocol, enables validators to opt into
            securing additional services (called Actively Validated Services, or
            AVSs) using the same staked ETH.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In practice, restaking works like this:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              You stake ETH normally (either solo or via a liquid staking
              protocol).
            </li>
            <li>
              You opt into EigenLayer by pointing your withdrawal credentials to
              EigenLayer&apos;s smart contracts (native restaking) or depositing
              your LST (liquid restaking).
            </li>
            <li>
              Your staked ETH now secures both Ethereum and the additional AVSs
              you choose.
            </li>
            <li>You earn extra rewards from the AVSs you secure.</li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The tradeoff is additional slashing risk: if you misbehave on any
            of the services you are securing, your stake can be slashed by that
            service in addition to Ethereum&apos;s own slashing conditions.
            Restaking amplifies both the reward potential and the risk profile of
            your staked ETH.
          </p>
        </section>

        {/* How to Stake ETH */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Stake ETH: Step by Step
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a step-by-step guide for the most common staking method
            (liquid staking through Lido):
          </p>
          <ol className="ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Get a wallet</strong>: Set up a
              self-custodial wallet like MetaMask, Rabby, or a hardware wallet
              (Ledger, Trezor).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Acquire ETH</strong>: Purchase ETH
              from an exchange and transfer it to your wallet.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Visit the staking protocol
              </strong>
              : Go to the protocol&apos;s official website (e.g., stake.lido.fi
              for Lido, stake.rocketpool.net for Rocket Pool).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Connect your wallet</strong>: Click
              &quot;Connect Wallet&quot; and authorize the connection.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Enter the amount</strong>: Specify
              how much ETH you want to stake.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Approve the transaction</strong>:
              Confirm the staking transaction in your wallet. You will pay a gas
              fee for this transaction.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Receive your LST
              </strong>
              : Your liquid staking token (stETH, rETH, etc.) will appear in
              your wallet automatically.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Start earning rewards
              </strong>
              : Rewards begin accruing immediately. For stETH, your balance
              increases daily. For rETH, the exchange rate increases over time.
            </li>
          </ol>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Security tip:</strong> Always verify you are on the
              official website. Bookmark the URL and never click links from
              social media or unsolicited messages. Phishing sites that mimic
              staking protocols are extremely common.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much ETH do I need to stake?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              To run a solo validator, you need exactly 32 ETH. However, liquid
              staking protocols like Lido and Rocket Pool allow you to stake any
              amount of ETH, even fractions. Centralized exchanges also offer
              staking with no minimum requirement.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can I unstake my ETH at any time?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Since the Shapella upgrade in April 2023, validators can withdraw
              their staked ETH. However, there is a withdrawal queue, and the
              time depends on how many validators are exiting simultaneously.
              Liquid staking tokens like stETH can be traded on the open market
              at any time for near-instant liquidity.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the current ETH staking APR?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The ETH staking APR typically ranges from 3% to 5%, depending on
              network activity and the total amount of ETH staked. When network
              activity is high, validators earn more from priority fees and MEV.
              The APR decreases as more validators join the network.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is staking ETH safe?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Solo staking carries risks including slashing (losing ETH for
              validator misbehavior), downtime penalties, and technical
              complexity. Liquid staking adds smart contract risk. Centralized
              exchange staking adds counterparty risk. Each method has different
              risk-reward tradeoffs.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between APR and APY in staking?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              APR (Annual Percentage Rate) is the simple interest rate without
              compounding. APY (Annual Percentage Yield) includes the effect of
              compounding rewards. For Ethereum staking, rewards do not
              auto-compound on the beacon chain, so APR is the more accurate
              metric. However, liquid staking protocols may offer
              auto-compounding, making APY the relevant measure.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What happens if my validator goes offline?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              If your validator goes offline, you incur inactivity penalties.
              These penalties are designed to be roughly equal to the rewards you
              would have earned, so being offline for a day costs approximately
              the same as what you would have earned in a day. The penalties
              increase if a large number of validators go offline simultaneously
              (inactivity leak).
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Calculate Your Staking Rewards
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Use our{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>{" "}
            to convert between Wei, Gwei, and ETH when calculating your staking
            returns, or explore how gas fees affect your staking transactions
            with the{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
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
                href="/crypto/eth-unit-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ETH Unit Converter
              </Link>{" "}
              &mdash; Convert between Wei, Gwei, and ETH for staking calculations
            </li>
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate transaction costs for staking deposits and withdrawals
            </li>
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Learn how liquid staking tokens are used in DeFi protocols
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
