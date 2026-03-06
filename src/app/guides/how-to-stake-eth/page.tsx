import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import AffiliateBanner from "@/components/layout/AffiliateBanner";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "How to Stake ETH: Complete Step-by-Step Ethereum Staking Guide 2025 | EVMTools",
  description:
    "Learn how to stake Ethereum step by step. Compare solo staking, liquid staking (Lido, Rocket Pool), and exchange staking. Current APR, risks, rewards, and which method is best for you.",
  keywords: [
    "how to stake ethereum",
    "eth staking guide",
    "ethereum staking",
    "stake eth",
    "liquid staking",
    "lido staking",
    "rocket pool",
    "eth staking apr",
    "solo staking ethereum",
    "staking rewards",
    "steth",
    "reth",
  ],
  openGraph: {
    title:
      "How to Stake ETH: Complete Step-by-Step Ethereum Staking Guide 2025 | EVMTools",
    description:
      "Learn how to stake Ethereum step by step. Compare solo staking, liquid staking (Lido, Rocket Pool), and exchange staking. Current APR, risks, rewards, and which method is best for you.",
    url: `${SITE_URL}/guides/how-to-stake-eth`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Stake ETH: Complete Step-by-Step Ethereum Staking Guide 2025",
    description:
      "Learn how to stake Ethereum step by step. Compare solo staking, liquid staking (Lido, Rocket Pool), and exchange staking. Current APR, risks, rewards, and which method is best for you.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-stake-eth`,
  },
};

export default function HowToStakeEthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How to Stake ETH: Complete Step-by-Step Ethereum Staking Guide 2025",
    description:
      "Learn how to stake Ethereum step by step. Compare solo staking, liquid staking (Lido, Rocket Pool), and exchange staking. Current APR, risks, rewards, and which method is best for you.",
    datePublished: "2025-01-20",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/how-to-stake-eth`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/how-to-stake-eth`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "How much ETH do I need to start staking?",
      answer:
        "It depends on the method. Solo staking requires exactly 32 ETH. Liquid staking protocols like Lido and Rocket Pool have no minimum, so you can stake any amount, even 0.01 ETH. Exchange staking on platforms like Coinbase and Binance also has very low or no minimums. Most people start with liquid or exchange staking due to the much lower entry barrier.",
    },
    {
      question: "What is the current ETH staking APR?",
      answer:
        "As of early 2025, ETH staking APR typically ranges from 3% to 5%. Solo validators earn about 3.5% to 4.5% depending on network activity. Liquid staking protocols like Lido (stETH) offer around 3% to 4% after the protocol fee. Exchange staking rates vary but are generally in the 2.5% to 4% range. The APR fluctuates based on the total amount of ETH staked and network activity.",
    },
    {
      question: "Can I unstake my ETH at any time?",
      answer:
        "Since the Shapella upgrade in April 2023, staked ETH can be withdrawn. For solo validators, there is a withdrawal queue that typically takes a few days but can be longer during high-demand periods. Liquid staking tokens like stETH or rETH can be sold on the open market at any time for near-instant liquidity, though the price may be slightly below the underlying ETH value. Exchange staking withdrawal times vary by platform.",
    },
    {
      question: "Is ETH staking risky?",
      answer:
        "ETH staking carries several risks depending on the method. Solo staking risks include slashing (losing ETH for validator misbehavior or downtime), technical complexity, and hardware failure. Liquid staking adds smart contract risk (bugs in the protocol) and potential de-peg risk (the liquid staking token trading below ETH value). Exchange staking adds counterparty risk (the exchange could be hacked or go bankrupt). All methods carry ETH price risk, as the value of your staked ETH fluctuates with the market.",
    },
    {
      question: "What is the difference between stETH and rETH?",
      answer:
        "stETH (Lido) and rETH (Rocket Pool) are both liquid staking tokens that represent staked ETH plus accrued rewards. stETH uses a rebasing model where your token balance increases daily. rETH uses a value-accruing model where the token price increases relative to ETH over time. stETH has significantly more liquidity and DeFi integrations. rETH is more decentralized since Rocket Pool uses permissionless node operators.",
    },
    {
      question: "Do I have to pay taxes on staking rewards?",
      answer:
        "In most jurisdictions including the US, staking rewards are considered taxable income at the time they are received, valued at fair market value. This means you owe income tax on the USD value of ETH rewards when they are earned. Additionally, when you sell or trade the rewarded ETH, any gain is subject to capital gains tax. Tax laws vary by country, and the treatment of liquid staking tokens may differ. Consult a tax professional familiar with crypto for your specific situation.",
    },
    {
      question: "Is liquid staking better than solo staking?",
      answer:
        "It depends on your goals and resources. Solo staking maximizes decentralization, gives you full control, and earns slightly higher rewards (no protocol fee). However, it requires 32 ETH, technical knowledge, and dedicated hardware running 24/7. Liquid staking requires no minimum investment, no technical setup, and provides DeFi composability (you can use stETH/rETH in DeFi). The trade-off is smart contract risk and a protocol fee (typically 10% of rewards).",
    },
    {
      question: "Can I stake ETH on a hardware wallet?",
      answer:
        "You cannot directly stake ETH through a hardware wallet alone, but you can use a hardware wallet to securely interact with staking services. For example, you can connect your Ledger or Trezor to MetaMask and then use Lido or Rocket Pool through the wallet. The liquid staking tokens (stETH, rETH) are held in your hardware wallet. This gives you the security of hardware key storage combined with the convenience of liquid staking.",
    },
  ]);

  return (
    <ToolLayout slug="how-to-stake-eth">
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
            Staking Ethereum is one of the most popular ways to earn passive
            yield in crypto. By locking up your ETH to help secure the
            network, you earn staking rewards &mdash; currently around 3% to
            5% APR. Since Ethereum&apos;s transition to Proof of Stake and
            the Shapella upgrade enabling withdrawals, staking has become
            more accessible than ever. This guide walks you through every
            staking method step by step, compares the APR and risks, and
            helps you choose the approach that fits your situation.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>New to staking?</strong> Read our comprehensive{" "}
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Staking?
              </Link>{" "}
              guide first for a deep dive into how Proof of Stake works, then
              come back here for the practical how-to steps.
            </p>
          </div>
        </section>

        {/* Staking Methods Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Three Ways to Stake ETH
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            There are three primary methods for staking Ethereum, each with
            different requirements, rewards, and risk profiles:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Method
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Minimum
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Typical APR
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Liquidity
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Solo Staking</td>
                  <td className="px-4 py-3">32 ETH</td>
                  <td className="px-4 py-3">3.5% - 4.5%</td>
                  <td className="px-4 py-3">Withdrawal queue</td>
                  <td className="px-4 py-3">Advanced</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Liquid Staking</td>
                  <td className="px-4 py-3">No minimum</td>
                  <td className="px-4 py-3">3.0% - 4.0%</td>
                  <td className="px-4 py-3">Instant (tradeable)</td>
                  <td className="px-4 py-3">Easy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Exchange Staking</td>
                  <td className="px-4 py-3">No minimum</td>
                  <td className="px-4 py-3">2.5% - 4.0%</td>
                  <td className="px-4 py-3">Varies by platform</td>
                  <td className="px-4 py-3">Easiest</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Method 1: Solo Staking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Method 1: Solo Staking (32 ETH)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Solo staking means running your own validator node on the
            Ethereum network. This is the most decentralized and
            censorship-resistant way to stake. You maintain full control of
            your keys and earn the highest rewards since there is no
            protocol fee. However, it requires a significant investment and
            technical expertise.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Requirements
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">32 ETH</strong>:
              The exact amount required by the Ethereum deposit contract. No
              more, no less per validator.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Dedicated hardware</strong>:
              A computer running 24/7. A NUC (Intel) or mini-PC with 16+ GB
              RAM, 2+ TB SSD, and a reliable internet connection (10+ Mbps).
              Estimated cost: $500 to $1,000.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Two client software packages</strong>:
              An execution client (Geth, Nethermind, or Besu) and a consensus
              client (Prysm, Lighthouse, Teku, Nimbus, or Lodestar).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Technical knowledge</strong>:
              Comfort with command line, Linux administration, networking,
              and monitoring.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Step-by-Step Solo Staking
          </h3>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Set up hardware</strong>:
              Install a Linux distribution (Ubuntu LTS is popular) on
              dedicated hardware with a 2+ TB SSD.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Install execution client</strong>:
              Download and configure Geth, Nethermind, or Besu. Sync the
              execution layer (takes several hours to days).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Install consensus client</strong>:
              Download and configure your chosen consensus client. It
              communicates with the execution client via the Engine API.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Generate validator keys</strong>:
              Use the official{" "}
              <code className="rounded bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 text-sm">
                staking-deposit-cli
              </code>{" "}
              tool on an air-gapped machine. This creates your validator
              signing key and a deposit data file. Back up the mnemonic phrase
              securely.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Submit the 32 ETH deposit</strong>:
              Use the official Ethereum Launchpad (launchpad.ethereum.org) to
              submit your deposit transaction. Verify the deposit contract
              address carefully.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Import validator keys</strong>:
              Import the validator keys into your consensus client. The
              validator will enter the activation queue.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Monitor and maintain</strong>:
              Set up monitoring (Grafana, Prometheus) and alerting. Keep both
              clients updated and ensure high uptime.
            </li>
          </ol>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> Run minority clients to improve
              network diversity. If the majority client (currently Geth +
              Prysm) has a bug, all validators running it could be slashed
              simultaneously. Using minority clients (Nethermind/Besu +
              Lighthouse/Teku) protects you and the network.
            </p>
          </div>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Method 2: Liquid Staking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Method 2: Liquid Staking (Lido, Rocket Pool)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Liquid staking lets you stake any amount of ETH through a
            protocol and receive a liquid staking token (LST) in return.
            This token represents your staked ETH plus accrued rewards and
            can be freely traded, used in{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              DeFi
            </Link>{" "}
            protocols, or held in your wallet. There is no minimum deposit
            and no technical setup required.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lido (stETH) &mdash; Largest Liquid Staking Protocol
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Lido is the dominant liquid staking protocol, holding
            approximately 30% of all staked ETH. When you deposit ETH into
            Lido, you receive stETH, a rebasing token whose balance
            increases daily as staking rewards accrue. The current APR is
            approximately 3.0% to 3.5% after Lido&apos;s 10% protocol fee.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">How to stake with Lido:</strong>
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Connect your wallet (MetaMask, Ledger, etc.) to{" "}
              <code className="rounded bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 text-sm">
                stake.lido.fi
              </code>
            </li>
            <li>Enter the amount of ETH you want to stake</li>
            <li>Approve the transaction in your wallet</li>
            <li>Receive stETH in your wallet (appears automatically)</li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Your stETH balance increases daily. You can use stETH in DeFi
            protocols (Aave, Curve, Maker) for additional yield, or simply
            hold it and watch your balance grow.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Rocket Pool (rETH) &mdash; Most Decentralized Option
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Rocket Pool is the most decentralized liquid staking protocol,
            using permissionless node operators. When you deposit ETH, you
            receive rETH, a value-accruing token. Unlike stETH, the rETH
            balance stays the same but its price relative to ETH increases
            over time as rewards accumulate. Current APR is approximately
            2.8% to 3.5% after the protocol fee.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">How to stake with Rocket Pool:</strong>
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Connect your wallet to{" "}
              <code className="rounded bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 text-sm">
                stake.rocketpool.net
              </code>
            </li>
            <li>Enter the amount of ETH to stake</li>
            <li>Approve the transaction</li>
            <li>Receive rETH in your wallet</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lido vs Rocket Pool Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Lido (stETH)
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Rocket Pool (rETH)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Token Model</td>
                  <td className="px-4 py-3">Rebasing (balance grows)</td>
                  <td className="px-4 py-3">Value-accruing (price grows)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">APR (approx.)</td>
                  <td className="px-4 py-3">3.0% - 3.5%</td>
                  <td className="px-4 py-3">2.8% - 3.5%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Protocol Fee</td>
                  <td className="px-4 py-3">10% of rewards</td>
                  <td className="px-4 py-3">14% of rewards</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">DeFi Liquidity</td>
                  <td className="px-4 py-3">Very high</td>
                  <td className="px-4 py-3">Moderate</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Decentralization</td>
                  <td className="px-4 py-3">Curated operators</td>
                  <td className="px-4 py-3">Permissionless operators</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">TVL</td>
                  <td className="px-4 py-3">~$15B+</td>
                  <td className="px-4 py-3">~$3B+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Method 3: Exchange Staking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Method 3: Exchange Staking (Coinbase, Binance)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Exchange staking is the simplest option. Major centralized
            exchanges like Coinbase and Binance offer one-click ETH staking.
            You deposit ETH on the exchange, enable staking, and start
            earning rewards. There is no minimum (or a very low one), no
            technical setup, and the exchange handles everything.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Coinbase ETH Staking
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Coinbase offers ETH staking through cbETH (Coinbase Wrapped
            Staked ETH). When you stake ETH on Coinbase, you receive cbETH
            which can be traded or transferred. Coinbase charges a 25%
            commission on staking rewards, resulting in a net APR of
            approximately 2.5% to 3.0%. The process is straightforward:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Log into Coinbase and navigate to ETH</li>
            <li>Click &quot;Stake&quot; and enter the amount</li>
            <li>Confirm the transaction</li>
            <li>Receive cbETH and start earning rewards</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Binance ETH Staking
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Binance offers ETH staking through BETH (Binance Beacon ETH) and
            WBETH (Wrapped BETH). Binance takes a smaller commission than
            Coinbase, resulting in a net APR of approximately 3.0% to 3.5%.
            The staking process on Binance:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Log into Binance and go to &quot;Earn&quot;</li>
            <li>Select ETH staking</li>
            <li>Enter the amount and confirm</li>
            <li>WBETH is credited to your account</li>
          </ol>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Trade-off:</strong> Exchange staking is the easiest
              method but adds counterparty risk. Your staked ETH is held by
              the exchange, which means you are trusting them with custody.
              The collapse of FTX demonstrated that even major exchanges can
              fail. For long-term staking, consider liquid staking protocols
              where you maintain self-custody of your LST tokens.
            </p>
          </div>
        </section>

        <AffiliateBanner category="exchange" />

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* APR Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Current ETH Staking APR Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Staking rewards vary by method due to different fee structures
            and operational models. Here is a comparison of approximate
            annual returns as of early 2025:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Platform
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Net APR
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Fee
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Token
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Solo Validator</td>
                  <td className="px-4 py-3">~3.5% - 4.5%</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3">ETH</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Lido</td>
                  <td className="px-4 py-3">~3.0% - 3.5%</td>
                  <td className="px-4 py-3">10% of rewards</td>
                  <td className="px-4 py-3">stETH</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Rocket Pool</td>
                  <td className="px-4 py-3">~2.8% - 3.5%</td>
                  <td className="px-4 py-3">14% of rewards</td>
                  <td className="px-4 py-3">rETH</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Coinbase</td>
                  <td className="px-4 py-3">~2.5% - 3.0%</td>
                  <td className="px-4 py-3">25% of rewards</td>
                  <td className="px-4 py-3">cbETH</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Binance</td>
                  <td className="px-4 py-3">~3.0% - 3.5%</td>
                  <td className="px-4 py-3">~10% of rewards</td>
                  <td className="px-4 py-3">WBETH</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            APR values are approximate and fluctuate based on network
            activity, total ETH staked, and MEV rewards. Check current
            rates on each platform before staking.
          </p>
        </section>

        {/* Risks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Risks of ETH Staking
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every staking method carries risks. Understanding these risks
            helps you make informed decisions:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Slashing Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Slashing is a penalty that destroys part of a validator&apos;s
            stake for provably malicious behavior (like signing two different
            blocks for the same slot). For solo stakers, slashing penalties
            start at 1 ETH and can increase if many validators are slashed
            simultaneously. Liquid staking protocols have insurance
            mechanisms and diversify across many validators to minimize this
            risk.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Smart Contract Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Liquid staking protocols are smart contracts. While Lido and
            Rocket Pool have been audited extensively and hold billions in
            TVL, smart contract bugs are always a possibility. The Ethereum
            deposit contract itself is battle-tested and holds over 30
            million ETH. For exchange staking, smart contract risk is
            replaced by counterparty risk.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Market and Price Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Staking rewards are paid in ETH. If the price of ETH drops
            significantly, the dollar value of your staked position
            (including rewards) decreases. Staking does not protect against
            market downturns. Additionally, liquid staking tokens can
            temporarily trade at a discount to ETH during market stress.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Counterparty Risk (Exchange Staking)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When you stake through an exchange, you are trusting the
            exchange to custody your assets and honor withdrawals. If the
            exchange is hacked, goes bankrupt, or freezes withdrawals, your
            staked ETH could be at risk. This is the most significant risk
            unique to exchange staking.
          </p>
        </section>

        {/* Tax Implications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tax Implications of ETH Staking
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Staking rewards have tax implications in most jurisdictions. In
            the United States, the IRS treats staking rewards as taxable
            income at the time they are received, valued at fair market
            value. This means:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Income tax</strong>:
              Staking rewards are taxed as ordinary income when received. If
              you earn 1 ETH in staking rewards and ETH is worth $3,000 at
              that time, you owe income tax on $3,000.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Capital gains</strong>:
              When you later sell the rewarded ETH, any appreciation (or
              depreciation) from the time of receipt is subject to capital
              gains tax.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Liquid staking tokens</strong>:
              The tax treatment of receiving stETH or rETH in exchange for
              ETH is still evolving. Some interpretations treat the swap as a
              taxable event, while others view it as a deposit.
            </li>
          </ul>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Disclaimer:</strong> This is general information, not
              tax advice. Tax laws vary by jurisdiction and are evolving
              rapidly for crypto. Consult a qualified tax professional
              familiar with cryptocurrency for your specific situation.
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
              How much ETH do I need to start staking?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Solo staking requires 32 ETH. Liquid staking protocols like
              Lido and Rocket Pool have no minimum. Exchange staking also has
              very low or no minimums. Most people start with liquid or
              exchange staking due to the lower entry barrier.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the current ETH staking APR?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ETH staking APR typically ranges from 3% to 5%. Solo
              validators earn about 3.5% to 4.5%. Liquid staking protocols
              offer around 3% to 3.5% after fees. Exchange staking rates
              are generally 2.5% to 4%. The APR fluctuates based on network
              activity and total ETH staked.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can I unstake my ETH at any time?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Since the Shapella upgrade, staked ETH can be withdrawn
              through a queue that typically takes a few days. Liquid
              staking tokens like stETH and rETH can be traded on the open
              market at any time for near-instant liquidity. Exchange
              unstaking times vary by platform.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is ETH staking risky?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Each method has different risks. Solo staking: slashing and
              technical complexity. Liquid staking: smart contract risk and
              potential de-peg. Exchange staking: counterparty risk. All
              methods carry ETH price risk. Diversifying across methods can
              help mitigate these risks.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between stETH and rETH?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              stETH (Lido) is a rebasing token whose balance increases
              daily. rETH (Rocket Pool) is value-accruing where the token
              price increases relative to ETH. stETH has more DeFi
              liquidity. rETH is more decentralized with permissionless
              node operators.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Do I have to pay taxes on staking rewards?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              In most jurisdictions, staking rewards are taxable income at
              the time they are received. When you later sell, any gains are
              subject to capital gains tax. Tax laws vary by country.
              Consult a tax professional familiar with crypto for your
              specific situation.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is liquid staking better than solo staking?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              It depends on your resources. Solo staking earns higher
              rewards and maximizes decentralization but requires 32 ETH and
              technical expertise. Liquid staking has no minimum, no
              technical setup, and provides DeFi composability. The
              trade-off is smart contract risk and a protocol fee.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can I stake ETH on a hardware wallet?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              You can use a hardware wallet to securely interact with
              staking services. Connect your Ledger or Trezor to MetaMask,
              then use Lido or Rocket Pool. The liquid staking tokens are
              held in your hardware wallet, combining hardware security
              with staking convenience.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore Ethereum Tools
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Dive deeper into{" "}
            <Link
              href="/guides/what-is-ethereum"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              how Ethereum works
            </Link>
            . Use our{" "}
            <Link
              href="/crypto/unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Ethereum Unit Converter
            </Link>{" "}
            to convert between wei, gwei, and ETH, or learn about{" "}
            <Link
              href="/guides/how-gas-fees-work"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              how gas fees work
            </Link>{" "}
            to understand the costs of on-chain transactions.
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
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Staking?
              </Link>{" "}
              &mdash; Complete guide to Proof of Stake
            </li>
            <li>
              <Link
                href="/guides/what-is-ethereum"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Ethereum?
              </Link>{" "}
              &mdash; Understanding the Ethereum platform
            </li>
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Use your liquid staking tokens in DeFi
            </li>
            <li>
              <Link
                href="/guides/best-crypto-exchanges"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Best Crypto Exchanges 2025
              </Link>{" "}
              &mdash; Compare exchange staking options
            </li>
            <li>
              <Link
                href="/guides/best-hardware-wallets"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Best Hardware Wallets 2025
              </Link>{" "}
              &mdash; Secure your staking tokens
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
