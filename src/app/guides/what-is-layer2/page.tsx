import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is a Layer 2? Ethereum Scaling Solutions Explained | EVMTools",
  description:
    "Understand Layer 2 scaling solutions: Optimistic Rollups, ZK Rollups, sidechains, and state channels. Compare Arbitrum, Optimism, Base, zkSync, and more.",
  keywords: [
    "layer 2",
    "what is layer 2",
    "l2 blockchain",
    "rollup",
    "optimistic rollup",
    "zk rollup",
    "ethereum scaling",
    "arbitrum",
    "optimism",
    "base",
    "zksync",
    "polygon zkevm",
    "scalability trilemma",
  ],
  openGraph: {
    title: "What is a Layer 2? Ethereum Scaling Solutions Explained | EVMTools",
    description:
      "Understand Layer 2 scaling solutions: Optimistic Rollups, ZK Rollups, sidechains, and state channels. Compare Arbitrum, Optimism, Base, zkSync, and more.",
    url: `${SITE_URL}/guides/what-is-layer2`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Layer 2? Ethereum Scaling Solutions Explained",
    description:
      "Understand Layer 2 scaling solutions: Optimistic Rollups, ZK Rollups, sidechains, and state channels. Compare Arbitrum, Optimism, Base, zkSync, and more.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-layer2`,
  },
};

export default function WhatIsLayer2Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Layer 2? Ethereum Scaling Solutions Explained",
    description:
      "Understand Layer 2 scaling solutions: Optimistic Rollups, ZK Rollups, sidechains, and state channels. Compare Arbitrum, Optimism, Base, zkSync, and more.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-layer2`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-layer2`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is the difference between a Layer 2 and a sidechain?",
      answer:
        "A Layer 2 derives its security from the Layer 1 (Ethereum) by posting transaction data or proofs to the main chain. A sidechain has its own consensus mechanism and security model independent of Ethereum. If the sidechain's validators are compromised, funds can be lost. Rollups (true L2s) guarantee that users can always withdraw their funds to L1 even if the L2 operators act maliciously.",
    },
    {
      question: "Are Layer 2 solutions safe?",
      answer:
        "Layer 2 rollups inherit the security of Ethereum L1, making them the safest L2 approach. However, many L2s currently rely on multisig upgradability and centralized sequencers, which introduces trust assumptions. As L2s mature, these training wheels are being gradually removed. Always check the L2's risk profile on resources like L2BEAT before depositing significant funds.",
    },
    {
      question: "How do I move assets from Ethereum to a Layer 2?",
      answer:
        "You use a bridge to transfer assets between L1 and L2. Most L2s have an official bridge on their website. The process typically involves: connecting your wallet, selecting the token and amount to bridge, approving the transaction on L1, and waiting for the deposit to be processed on L2. Deposits from L1 to L2 are usually fast (minutes), while withdrawals from Optimistic Rollups back to L1 take about 7 days due to the challenge period.",
    },
    {
      question: "Which Layer 2 should I use?",
      answer:
        "It depends on your use case. For the broadest DeFi ecosystem and lowest risk, Arbitrum and Optimism are the most battle-tested Optimistic Rollups. Base offers the lowest fees and is backed by Coinbase. For cutting-edge technology, zkSync and StarkNet use ZK proofs for faster finality. Consider factors like TVL, available applications, fees, and security maturity when choosing.",
    },
    {
      question: "What is EIP-4844 and how does it help Layer 2s?",
      answer:
        "EIP-4844, also known as Proto-Danksharding, introduced 'blob' transactions that provide a dedicated, cheaper data channel for rollups to post data to Ethereum L1. Before EIP-4844, rollups stored data in calldata, which is expensive because it competes with regular transactions. Blobs are automatically pruned after ~18 days, reducing costs by 10-100x for L2 users. This upgrade went live in March 2024 with the Dencun hard fork.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-layer2">
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
            Ethereum can process about 15&ndash;30 transactions per second on
            its base layer. For a global financial platform, that is far too
            slow. Layer 2 (L2) solutions solve this scalability problem by
            processing transactions off the main chain while still inheriting
            Ethereum&apos;s security. This guide explains the different types of
            Layer 2 solutions, compares the major L2 networks, and explores how
            they will shape the future of Ethereum.
          </p>
        </section>

        {/* Scalability Trilemma */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Blockchain Scalability Trilemma
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The scalability trilemma, coined by Vitalik Buterin, states that a
            blockchain can only optimize for two out of three properties
            simultaneously:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Decentralization</strong>: Anyone
              can run a node and validate transactions without requiring
              specialized hardware.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Security</strong>: The network is
              resistant to attacks and censorship.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Scalability</strong>: The network
              can handle a high volume of transactions at low cost.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum chose to prioritize decentralization and security at the
            base layer, which limits its throughput. Layer 2 solutions break
            the trilemma by adding scalability on top of a secure and
            decentralized L1. The L1 provides the security foundation, while
            the L2 provides the execution speed.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Ethereum&apos;s roadmap</strong> is explicitly
              &quot;rollup-centric,&quot; meaning the base layer is designed as
              a settlement and data availability layer, while L2 rollups handle
              execution. This is why Ethereum has invested heavily in upgrades
              like EIP-4844 (Proto-Danksharding) that make L2s cheaper.
            </p>
          </div>
        </section>

        {/* What are Layer 2 Solutions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What are Layer 2 Solutions?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Layer 2 solutions are protocols built on top of a base blockchain
            (Layer 1) that process transactions off-chain while leveraging the
            L1 for security and finality. They work by batching many
            transactions together, executing them in a faster environment, and
            then posting a compressed summary or proof back to the main chain.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The key property of a true L2 (as opposed to a sidechain) is
            that users can always withdraw their funds to L1 even if the L2
            operators become malicious or go offline. This is called the{" "}
            <strong className="text-gray-900 dark:text-white">escape hatch</strong> or{" "}
            <strong className="text-gray-900 dark:text-white">forced withdrawal</strong>{" "}
            mechanism.
          </p>
        </section>

        {/* Types of L2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of Layer 2 Solutions
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Optimistic Rollups
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Optimistic rollups assume all transactions are valid by default
            (&quot;optimistic&quot;) and only run computation in case of a
            dispute. A sequencer batches transactions, executes them, and posts
            the resulting state root along with the compressed transaction data
            to Ethereum L1.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            After the state root is posted, there is a{" "}
            <strong className="text-gray-900 dark:text-white">challenge period</strong> (typically 7
            days) during which anyone can submit a{" "}
            <strong className="text-gray-900 dark:text-white">fraud proof</strong> if they believe
            the state root is incorrect. If a fraud proof succeeds, the invalid
            state transition is reverted and the malicious sequencer is
            penalized.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Optimistic Rollup Flow:
1. Users submit transactions to the L2 sequencer
2. Sequencer batches and executes transactions off-chain
3. Sequencer posts state root + compressed data to L1
4. 7-day challenge period begins
5. If no valid fraud proof → state is finalized
6. If fraud proof succeeds → state is reverted`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Major Optimistic Rollups include{" "}
            <strong className="text-gray-900 dark:text-white">Arbitrum</strong>,{" "}
            <strong className="text-gray-900 dark:text-white">Optimism</strong>, and{" "}
            <strong className="text-gray-900 dark:text-white">Base</strong>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ZK Rollups
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ZK (Zero-Knowledge) rollups use cryptographic validity proofs to
            verify every batch of transactions before posting to L1. Instead of
            assuming transactions are valid and waiting for disputes, ZK rollups
            mathematically{" "}
            <strong className="text-gray-900 dark:text-white">prove</strong>{" "}
            that the new state is correct.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`ZK Rollup Flow:
1. Users submit transactions to the L2 sequencer
2. Sequencer batches and executes transactions off-chain
3. A prover generates a validity proof (ZK-SNARK or ZK-STARK)
4. Sequencer posts state root + validity proof to L1
5. L1 smart contract verifies the proof → state is finalized immediately`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The main advantage of ZK rollups is{" "}
            <strong className="text-gray-900 dark:text-white">instant finality</strong> on L1
            (no 7-day challenge period). The tradeoff is that generating ZK
            proofs is computationally expensive, and achieving full EVM
            equivalence with ZK circuits is technically challenging.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Major ZK Rollups include{" "}
            <strong className="text-gray-900 dark:text-white">zkSync Era</strong>,{" "}
            <strong className="text-gray-900 dark:text-white">Polygon zkEVM</strong>,{" "}
            <strong className="text-gray-900 dark:text-white">Scroll</strong>,{" "}
            <strong className="text-gray-900 dark:text-white">Linea</strong>, and{" "}
            <strong className="text-gray-900 dark:text-white">StarkNet</strong>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            State Channels
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            State channels allow participants to conduct multiple transactions
            off-chain by locking funds in a multisig contract on L1 and
            exchanging signed messages. Only the opening and closing
            transactions are posted on-chain. This is best suited for
            applications with a fixed set of participants, such as payment
            channels or turn-based games.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Bitcoin&apos;s Lightning Network is the most prominent example of
            state channels in production. On Ethereum, state channels have been
            largely superseded by rollups, which offer more general-purpose
            scalability.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sidechains
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Sidechains are independent blockchains with their own consensus
            mechanisms that run parallel to the main chain. They are connected
            to L1 via a bridge. Unlike true L2s, sidechains do{" "}
            <strong className="text-gray-900 dark:text-white">not</strong>{" "}
            derive their security from Ethereum.
          </p>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Important distinction:</strong> Sidechains like Polygon
              PoS are sometimes called &quot;Layer 2,&quot; but technically
              they are separate chains with their own validators. If the
              sidechain&apos;s validator set is compromised, user funds on the
              sidechain are at risk. True L2 rollups guarantee that users can
              always withdraw to L1 regardless of L2 operator behavior.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Optimistic Rollups vs ZK Rollups
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Optimistic Rollups
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ZK Rollups
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Proof mechanism</td>
                  <td className="px-4 py-3">Fraud proofs (reactive)</td>
                  <td className="px-4 py-3">Validity proofs (proactive)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Withdrawal time to L1</td>
                  <td className="px-4 py-3">~7 days (challenge period)</td>
                  <td className="px-4 py-3">Minutes to hours (after proof)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">EVM compatibility</td>
                  <td className="px-4 py-3">Full EVM equivalence</td>
                  <td className="px-4 py-3">Varies (some fully equivalent)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Proof generation cost</td>
                  <td className="px-4 py-3">Low (only on dispute)</td>
                  <td className="px-4 py-3">High (every batch)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Data posted to L1</td>
                  <td className="px-4 py-3">Full transaction data</td>
                  <td className="px-4 py-3">Compressed state diffs + proof</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Maturity</td>
                  <td className="px-4 py-3">More battle-tested</td>
                  <td className="px-4 py-3">Rapidly catching up</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Examples</td>
                  <td className="px-4 py-3">Arbitrum, Optimism, Base</td>
                  <td className="px-4 py-3">zkSync, Polygon zkEVM, Scroll, StarkNet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Major L2s Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Major Layer 2 Networks Compared
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a comparison of the most prominent Ethereum L2 networks as
            of early 2026:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Network
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Technology
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    EVM Compatible
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Avg. Tx Cost
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Arbitrum One</td>
                  <td className="px-4 py-3">Optimistic Rollup</td>
                  <td className="px-4 py-3">Nitro (WASM-based fraud proofs)</td>
                  <td className="px-4 py-3">Yes (EVM equivalent)</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.10</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Optimism (OP Mainnet)</td>
                  <td className="px-4 py-3">Optimistic Rollup</td>
                  <td className="px-4 py-3">OP Stack (Bedrock)</td>
                  <td className="px-4 py-3">Yes (EVM equivalent)</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.10</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Base</td>
                  <td className="px-4 py-3">Optimistic Rollup</td>
                  <td className="px-4 py-3">OP Stack (Coinbase)</td>
                  <td className="px-4 py-3">Yes (EVM equivalent)</td>
                  <td className="px-4 py-3">$0.001 &ndash; $0.01</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">zkSync Era</td>
                  <td className="px-4 py-3">ZK Rollup</td>
                  <td className="px-4 py-3">ZK-SNARKs (custom compiler)</td>
                  <td className="px-4 py-3">Yes (via compiler)</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.10</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Polygon zkEVM</td>
                  <td className="px-4 py-3">ZK Rollup</td>
                  <td className="px-4 py-3">ZK-SNARKs (bytecode-level)</td>
                  <td className="px-4 py-3">Yes (EVM equivalent)</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.05</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Scroll</td>
                  <td className="px-4 py-3">ZK Rollup</td>
                  <td className="px-4 py-3">ZK-SNARKs (bytecode-level)</td>
                  <td className="px-4 py-3">Yes (EVM equivalent)</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.05</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Linea</td>
                  <td className="px-4 py-3">ZK Rollup</td>
                  <td className="px-4 py-3">ZK-SNARKs (ConsenSys)</td>
                  <td className="px-4 py-3">Yes (EVM equivalent)</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.05</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">StarkNet</td>
                  <td className="px-4 py-3">ZK Rollup</td>
                  <td className="px-4 py-3">ZK-STARKs (Cairo VM)</td>
                  <td className="px-4 py-3">No (Cairo language)</td>
                  <td className="px-4 py-3">$0.005 &ndash; $0.05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How Rollups Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Rollups Work
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            At their core, rollups work by moving transaction execution off
            Ethereum while keeping transaction data on Ethereum. Here is a more
            detailed look at the process:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            The Sequencer
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The sequencer is the L2 entity responsible for ordering and
            executing transactions. When you submit a transaction to an L2,
            it goes to the sequencer, which:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Receives and orders incoming transactions</li>
            <li>Executes transactions against the current L2 state</li>
            <li>Produces L2 blocks with the resulting state changes</li>
            <li>Batches multiple L2 blocks together for efficiency</li>
            <li>Compresses the batch data and submits it to L1</li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Currently, most L2s use a{" "}
            <strong className="text-gray-900 dark:text-white">centralized sequencer</strong>{" "}
            operated by the L2 team. This is a known centralization risk, and
            most L2 teams have roadmaps to decentralize sequencing over time.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Data Availability
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A critical property of rollups is that they post transaction data to
            L1. This ensures that anyone can reconstruct the L2 state from L1
            data alone, which is necessary for fraud proofs (Optimistic) and for
            users to withdraw their funds independently.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before EIP-4844, rollups posted data in{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              calldata
            </code>
            , which is expensive because it is stored permanently by all
            Ethereum nodes. After EIP-4844, rollups can use{" "}
            <strong className="text-gray-900 dark:text-white">blobs</strong>,
            which are cheaper because they are pruned after ~18 days.
          </p>
        </section>

        {/* Bridge Mechanics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bridge Mechanics
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Bridges are the mechanisms that transfer assets between L1 and L2.
            Each rollup has a canonical bridge contract deployed on Ethereum
            that handles deposits and withdrawals:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Deposits (L1 to L2)
          </h3>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>User sends tokens to the L2 bridge contract on L1.</li>
            <li>The bridge contract locks the tokens on L1.</li>
            <li>The L2 detects the deposit event on L1.</li>
            <li>The L2 mints equivalent tokens to the user&apos;s L2 address.</li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Deposits are typically fast (minutes) because the L2 only needs to
            observe a confirmed L1 transaction.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Withdrawals (L2 to L1)
          </h3>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>User initiates a withdrawal on L2.</li>
            <li>The L2 burns the tokens and includes the withdrawal in the next batch.</li>
            <li>
              <strong className="text-gray-900 dark:text-white">Optimistic Rollups</strong>: Wait
              for the 7-day challenge period to pass, then claim tokens on L1.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">ZK Rollups</strong>: Wait for the
              validity proof to be generated and verified on L1, then claim
              tokens. This is usually minutes to hours.
            </li>
          </ol>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Tip:</strong> Third-party bridges (Across, Stargate,
              Hop Protocol) can provide faster withdrawals from Optimistic
              Rollups by advancing liquidity to the user on L1 immediately, at
              the cost of a small fee.
            </p>
          </div>
        </section>

        {/* Gas Savings */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gas Savings: L1 vs L2
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The primary benefit of L2s for users is dramatically lower
            transaction costs. Here is a comparison of typical costs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Operation
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Ethereum L1
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Optimistic Rollup
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ZK Rollup
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">ETH transfer</td>
                  <td className="px-4 py-3">$1 &ndash; $5</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.05</td>
                  <td className="px-4 py-3">$0.005 &ndash; $0.03</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">ERC-20 transfer</td>
                  <td className="px-4 py-3">$2 &ndash; $10</td>
                  <td className="px-4 py-3">$0.02 &ndash; $0.10</td>
                  <td className="px-4 py-3">$0.01 &ndash; $0.05</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">DEX swap</td>
                  <td className="px-4 py-3">$5 &ndash; $50</td>
                  <td className="px-4 py-3">$0.05 &ndash; $0.50</td>
                  <td className="px-4 py-3">$0.02 &ndash; $0.30</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">NFT mint</td>
                  <td className="px-4 py-3">$5 &ndash; $30</td>
                  <td className="px-4 py-3">$0.05 &ndash; $0.30</td>
                  <td className="px-4 py-3">$0.02 &ndash; $0.20</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            These cost reductions are the result of amortization: the fixed cost
            of posting data to L1 is spread across hundreds or thousands of
            transactions in each batch. Calculate exact gas costs for your
            transactions with our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>
            .
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* EIP-4844 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            EIP-4844: Proto-Danksharding and Blobs
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EIP-4844, activated in March 2024 with the Dencun hard fork, was a
            landmark upgrade for L2 scalability. It introduced a new transaction
            type that carries{" "}
            <strong className="text-gray-900 dark:text-white">blobs</strong>{" "}
            &mdash; large chunks of data (~128 KB each) specifically designed
            for rollup data.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Key improvements from EIP-4844:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Cheaper data</strong>: Blob data is
              priced separately from regular calldata with its own fee market,
              reducing L2 data costs by 10&ndash;100x.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Temporary storage</strong>: Blobs
              are pruned after ~18 days, so they do not permanently bloat the
              Ethereum state.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Separate fee market</strong>: Blob
              fees operate independently from execution gas fees, preventing L2
              costs from spiking during L1 congestion.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Future-proof</strong>: EIP-4844 is
              a stepping stone to full Danksharding, which will further increase
              blob capacity.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The result has been transformative: L2 fees dropped dramatically
            after the Dencun upgrade. Many L2s now offer sub-cent transactions
            for simple operations. Learn more about how gas fees work and the
            relationship between L1 and L2 costs in our{" "}
            <Link
              href="/guides/eip-1559-explained"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              EIP-1559 Explained
            </Link>{" "}
            guide.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between a Layer 2 and a sidechain?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A Layer 2 derives its security from the Layer 1 (Ethereum) by
              posting transaction data or proofs to the main chain. A sidechain
              has its own consensus mechanism and security model independent of
              Ethereum. If the sidechain&apos;s validators are compromised,
              funds can be lost. Rollups (true L2s) guarantee that users can
              always withdraw their funds to L1 even if the L2 operators act
              maliciously.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are Layer 2 solutions safe?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Layer 2 rollups inherit the security of Ethereum L1, making them
              the safest L2 approach. However, many L2s currently rely on
              multisig upgradability and centralized sequencers, which introduces
              trust assumptions. As L2s mature, these training wheels are being
              gradually removed. Always check the L2&apos;s risk profile on
              resources like L2BEAT before depositing significant funds.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How do I move assets from Ethereum to a Layer 2?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              You use a bridge to transfer assets between L1 and L2. Most L2s
              have an official bridge on their website. The process typically
              involves: connecting your wallet, selecting the token and amount to
              bridge, approving the transaction on L1, and waiting for the
              deposit to be processed on L2. Deposits from L1 to L2 are usually
              fast (minutes), while withdrawals from Optimistic Rollups back to
              L1 take about 7 days due to the challenge period.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Which Layer 2 should I use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              It depends on your use case. For the broadest DeFi ecosystem and
              lowest risk, Arbitrum and Optimism are the most battle-tested
              Optimistic Rollups. Base offers the lowest fees and is backed by
              Coinbase. For cutting-edge technology, zkSync and StarkNet use ZK
              proofs for faster finality. Consider factors like TVL, available
              applications, fees, and security maturity when choosing.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is EIP-4844 and how does it help Layer 2s?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              EIP-4844, also known as Proto-Danksharding, introduced
              &quot;blob&quot; transactions that provide a dedicated, cheaper
              data channel for rollups to post data to Ethereum L1. Before
              EIP-4844, rollups stored data in calldata, which is expensive
              because it competes with regular transactions. Blobs are
              automatically pruned after ~18 days, reducing costs by
              10&ndash;100x for L2 users. This upgrade went live in March 2024
              with the Dencun hard fork.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Compare L1 vs L2 Costs
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            See how much you can save by using Layer 2 networks. Try our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to compute exact transaction costs for different gas prices and
            compare L1 vs L2 savings.
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
              &mdash; Calculate transaction costs for L1 and L2 operations
            </li>
            <li>
              <Link
                href="/guides/eip-1559-explained"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                EIP-1559 Explained
              </Link>{" "}
              &mdash; Understand the fee market that underpins both L1 and L2 costs
            </li>
            <li>
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How Gas Fees Work
              </Link>{" "}
              &mdash; Complete guide to Ethereum gas fees and optimization
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
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
