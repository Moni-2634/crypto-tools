import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is Ethereum? The Complete Beginner's Guide | EVMTools",
  description:
    "Learn what Ethereum is, how it works, its history from 2015 to The Merge, the Ethereum ecosystem (DeFi, NFTs, DAOs, L2s), ETH the asset, and the Ethereum roadmap.",
  keywords: [
    "ethereum",
    "what is ethereum",
    "eth",
    "ethereum explained",
    "ethereum blockchain",
    "how does ethereum work",
    "ethereum merge",
    "ethereum roadmap",
    "ethereum proof of stake",
    "smart contract platform",
  ],
  openGraph: {
    title:
      "What is Ethereum? The Complete Beginner's Guide | EVMTools",
    description:
      "Learn what Ethereum is, how it works, its history from 2015 to The Merge, the Ethereum ecosystem (DeFi, NFTs, DAOs, L2s), ETH the asset, and the Ethereum roadmap.",
    url: `${SITE_URL}/guides/what-is-ethereum`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Ethereum? The Complete Beginner's Guide",
    description:
      "Learn what Ethereum is, how it works, its history, ecosystem (DeFi, NFTs, DAOs), and the roadmap for Ethereum's future.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-ethereum`,
  },
};

export default function WhatIsEthereumPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Ethereum? The Complete Beginner's Guide",
    description:
      "Learn what Ethereum is, how it works, its history from 2015 to The Merge, the Ethereum ecosystem, ETH the asset, and the Ethereum roadmap.",
    url: `${SITE_URL}/guides/what-is-ethereum`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2026-03-06",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-ethereum`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is the difference between Ethereum and Bitcoin?",
      answer:
        "Bitcoin is primarily a digital currency and store of value with limited scripting capabilities. Ethereum is a programmable blockchain that supports smart contracts, enabling developers to build decentralized applications (dApps), DeFi protocols, NFTs, and DAOs. Bitcoin uses Proof of Work, while Ethereum transitioned to Proof of Stake in September 2022. For a detailed comparison, see our Ethereum vs Bitcoin guide.",
    },
    {
      question: "What is ETH used for?",
      answer:
        "ETH (Ether) is Ethereum's native cryptocurrency with three main uses: paying gas fees for transactions and smart contract execution, staking to secure the network and earn rewards (currently 3-4% APR), and serving as collateral and a medium of exchange across the DeFi ecosystem. ETH is also used as the base currency for purchasing NFTs.",
    },
    {
      question: "What was The Merge?",
      answer:
        "The Merge (September 15, 2022) was Ethereum's transition from Proof of Work to Proof of Stake consensus. It reduced Ethereum's energy consumption by approximately 99.95% and changed how new blocks are produced, from miners using GPUs to validators staking 32 ETH. The Merge did not directly reduce gas fees, but it laid the foundation for future scaling upgrades.",
    },
    {
      question: "Is Ethereum safe to use?",
      answer:
        "The Ethereum blockchain itself is highly secure, with billions of dollars in value secured by hundreds of thousands of validators. However, individual smart contracts can have vulnerabilities. Always interact with audited protocols, verify contract addresses, be cautious of phishing sites, and never share your private keys or seed phrase.",
    },
    {
      question: "What is Ethereum's roadmap?",
      answer:
        "Ethereum's roadmap consists of several phases: The Surge (scaling through rollups and data sharding to 100,000+ TPS), The Verge (Verkle trees for stateless clients), The Purge (reducing storage requirements by expiring old state), and The Splurge (miscellaneous improvements). The goal is a highly scalable, decentralized, and efficient blockchain.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-ethereum">
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
            Ethereum is a decentralized, open-source blockchain that introduced
            the world to programmable money through{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contracts
            </Link>
            . While Bitcoin proved that decentralized digital currency was
            possible, Ethereum expanded the vision to decentralized
            applications &mdash; programs that run exactly as coded without
            downtime, censorship, or third-party interference. Launched in
            2015, Ethereum has become the foundation for{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              decentralized finance (DeFi)
            </Link>
            , NFTs, DAOs, and an entire ecosystem of innovation built on
            trustless computation.
          </p>
        </section>

        {/* History */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The History of Ethereum
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum was proposed in late 2013 by Vitalik Buterin, a
            19-year-old programmer and Bitcoin Magazine co-founder who
            recognized that Bitcoin&apos;s scripting language was too limited
            for general-purpose applications. Rather than building features
            one by one onto Bitcoin, Buterin envisioned a blockchain with a
            built-in Turing-complete programming language that could power any
            conceivable application.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The project gathered a founding team including Gavin Wood (who
            wrote the Yellow Paper formally specifying the EVM), Joseph Lubin
            (who later founded ConsenSys), Charles Hoskinson (who later
            created Cardano), and several other co-founders. Ethereum held
            its crowdfunding sale in mid-2014, raising approximately 31,500
            BTC (worth roughly $18 million at the time). The genesis block
            was mined on July 30, 2015.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Major Milestones
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Event
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Significance
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Jul 2015</td>
                  <td className="px-4 py-3">Frontier launch</td>
                  <td className="px-4 py-3">First live Ethereum network</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Jun 2016</td>
                  <td className="px-4 py-3">The DAO hack</td>
                  <td className="px-4 py-3">Led to Ethereum/Ethereum Classic split</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Dec 2017</td>
                  <td className="px-4 py-3">ICO boom / CryptoKitties</td>
                  <td className="px-4 py-3">Proved demand for tokens and NFTs</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">2020</td>
                  <td className="px-4 py-3">DeFi Summer</td>
                  <td className="px-4 py-3">TVL exploded from $1B to $15B</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Aug 2021</td>
                  <td className="px-4 py-3">EIP-1559 (London)</td>
                  <td className="px-4 py-3">Introduced base fee burning</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Sep 2022</td>
                  <td className="px-4 py-3">The Merge</td>
                  <td className="px-4 py-3">Transition to Proof of Stake</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Mar 2024</td>
                  <td className="px-4 py-3">Dencun upgrade</td>
                  <td className="px-4 py-3">Proto-danksharding (EIP-4844) for L2 scaling</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">2025-26</td>
                  <td className="px-4 py-3">Pectra and beyond</td>
                  <td className="px-4 py-3">Account abstraction, further L2 improvements</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How Ethereum Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Ethereum Works
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Nodes and the Network
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum runs on a global network of thousands of computers
            (nodes) that each maintain a copy of the entire blockchain. Anyone
            can run a node, which makes the network censorship-resistant
            &mdash; no single entity controls it. There are three types of
            nodes: full nodes (store complete blockchain state), archive nodes
            (store all historical states), and light nodes (store only block
            headers and request data on demand).
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transactions and the EVM
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every action on Ethereum is a transaction: sending ETH, calling a
            smart contract function, or deploying a new contract. Transactions
            are broadcast to the network, included in blocks by validators,
            and executed by the Ethereum Virtual Machine (EVM). The EVM is a
            sandboxed runtime environment that processes bytecode
            deterministically &mdash; every node running the same transaction
            gets the same result, guaranteeing consensus.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Consensus: Proof of Stake
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Since The Merge in September 2022, Ethereum uses Proof of Stake
            (PoS) for consensus. Validators{" "}
            <Link
              href="/guides/what-is-staking"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              stake
            </Link>{" "}
            32 ETH as collateral and are randomly selected to propose new
            blocks. Other validators attest (vote) on the validity of
            proposed blocks. Validators who act honestly earn rewards;
            validators who act maliciously or go offline get slashed (lose a
            portion of their stake). This replaced the energy-intensive Proof
            of Work mining that Ethereum used for its first seven years.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Blocks and Slots
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum produces a new block every 12 seconds (one slot). Slots
            are grouped into epochs of 32 slots (6.4 minutes). Each block
            contains a list of transactions, a reference to its parent block
            (forming the chain), and the state root (a cryptographic summary
            of all account balances and contract storage). The block proposer
            earns priority fees (tips) from transactions plus a protocol
            reward for participating in consensus.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* ETH the Asset */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ETH: The Native Asset
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ETH (Ether) is the native cryptocurrency of Ethereum. It serves
            multiple roles in the ecosystem:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Gas payments</strong>: Every
              transaction and smart contract execution requires{" "}
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                gas fees
              </Link>{" "}
              paid in ETH. This is the primary utility that creates constant
              demand for ETH.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Staking</strong>: Validators lock
              up 32 ETH to participate in consensus. This secures the network
              and earns validators approximately 3-4% annual rewards.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Store of value</strong>: With
              EIP-1559 burning a portion of every transaction&apos;s base fee,
              ETH can become deflationary during high network activity
              &mdash; more ETH is burned than issued, reducing total supply.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">DeFi collateral</strong>: ETH is
              the most widely used collateral in DeFi lending protocols,
              enabling users to borrow stablecoins against their ETH holdings.
            </li>
          </ul>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Metric
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Block time</td>
                  <td className="px-4 py-3">12 seconds</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Consensus mechanism</td>
                  <td className="px-4 py-3">Proof of Stake (since Sep 2022)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Validator requirement</td>
                  <td className="px-4 py-3">32 ETH minimum stake</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Active validators</td>
                  <td className="px-4 py-3">1,000,000+ (as of 2025)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Total supply</td>
                  <td className="px-4 py-3">~120 million ETH (variable due to burns)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Smallest unit</td>
                  <td className="px-4 py-3">1 wei = 10^-18 ETH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ecosystem */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Ethereum Ecosystem
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Decentralized Finance (DeFi)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              DeFi
            </Link>{" "}
            protocols on Ethereum enable lending (Aave, Compound), trading
            (Uniswap, Curve), derivatives (GMX, dYdX), and asset management
            without intermediaries. Hundreds of billions of dollars in value
            are locked in DeFi smart contracts. DeFi was the first &quot;killer
            app&quot; that demonstrated Ethereum&apos;s value beyond simple
            token transfers.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            NFTs and Digital Art
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum hosts the vast majority of high-value NFTs through the{" "}
            <Link
              href="/guides/what-is-erc721"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-721
            </Link>{" "}
            and{" "}
            <Link
              href="/guides/what-is-erc1155"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-1155
            </Link>{" "}
            standards. From generative art (Art Blocks) to profile pictures
            (CryptoPunks, BAYC) to music and photography, NFTs represent a
            new paradigm for digital ownership and creator monetization.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            DAOs (Decentralized Autonomous Organizations)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DAOs use smart contracts and governance tokens to enable
            collective decision-making without traditional corporate
            structures. Members vote on proposals using their tokens.
            Examples include MakerDAO (which governs the DAI stablecoin),
            Nouns DAO (which allocates treasury funds to community projects),
            and Gitcoin DAO (which funds public goods in the Ethereum
            ecosystem).
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Layer 2 Networks
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-layer2"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Layer 2 (L2)
            </Link>{" "}
            networks like Arbitrum, Optimism, Base, and zkSync process
            transactions off-chain and post compressed proofs back to
            Ethereum. They inherit Ethereum&apos;s security while providing
            10-100x lower fees and higher throughput. L2s are a core part of
            Ethereum&apos;s scaling strategy and are where most new user
            activity is concentrated.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* The Merge */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Merge: Ethereum&apos;s Biggest Upgrade
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            On September 15, 2022, Ethereum completed The Merge &mdash; a
            transition from Proof of Work (PoW) to Proof of Stake (PoS) that
            had been planned since Ethereum&apos;s inception. This was one of
            the most significant technical achievements in blockchain history:
            migrating a live network securing hundreds of billions of dollars
            without any downtime.
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Energy reduction</strong>:
              Ethereum&apos;s energy consumption dropped by approximately
              99.95%, from the equivalent of a medium-sized country to a small
              town.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Issuance reduction</strong>: ETH
              issuance dropped by roughly 90%, from ~13,000 ETH/day (mining
              rewards) to ~1,700 ETH/day (staking rewards). Combined with
              EIP-1559 burning, ETH became net deflationary during periods of
              high activity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Validator accessibility</strong>:
              Anyone with 32 ETH can become a validator (or use liquid staking
              protocols like Lido for smaller amounts). This is more
              accessible than buying specialized mining hardware.
            </li>
          </ul>
        </section>

        {/* Ethereum Roadmap */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ethereum Roadmap: The Future
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum&apos;s development continues with several major phases
            designed to scale the network to millions of users:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">The Surge</strong>: Massively
              scale transaction throughput through rollups and data sharding.
              EIP-4844 (proto-danksharding), shipped in March 2024 with
              Dencun, introduced blob transactions that reduced L2 fees by
              up to 100x. Full danksharding will further expand data
              availability for rollups.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">The Verge</strong>: Introduce
              Verkle trees to replace Merkle Patricia tries, enabling
              stateless clients that can verify blocks without storing the
              entire state. This makes running a node much lighter and more
              accessible.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">The Purge</strong>: Reduce the
              storage burden on nodes by expiring old historical data. Nodes
              would no longer need to store the entire history of the
              blockchain, only recent and relevant state.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">The Splurge</strong>: A collection
              of miscellaneous improvements including account abstraction
              (ERC-4337), proposer-builder separation, and other protocol
              refinements that improve user experience and network efficiency.
            </li>
          </ul>
        </section>

        {/* Ethereum vs Bitcoin */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ethereum vs Bitcoin at a Glance
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            For a comprehensive comparison, read our dedicated{" "}
            <Link
              href="/guides/ethereum-vs-bitcoin"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Ethereum vs Bitcoin guide
            </Link>
            . Here is a quick summary:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Aspect
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Bitcoin
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Ethereum
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Purpose</td>
                  <td className="px-4 py-3">Digital gold, store of value</td>
                  <td className="px-4 py-3">Programmable world computer</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Consensus</td>
                  <td className="px-4 py-3">Proof of Work</td>
                  <td className="px-4 py-3">Proof of Stake</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Smart contracts</td>
                  <td className="px-4 py-3">Limited scripting</td>
                  <td className="px-4 py-3">Turing-complete (Solidity)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Block time</td>
                  <td className="px-4 py-3">~10 minutes</td>
                  <td className="px-4 py-3">12 seconds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Supply</td>
                  <td className="px-4 py-3">Fixed at 21 million</td>
                  <td className="px-4 py-3">Variable (with burns)</td>
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
              What is the difference between Ethereum and Bitcoin?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Bitcoin is primarily a digital currency and store of value.
              Ethereum is a programmable blockchain that supports smart
              contracts, enabling developers to build decentralized applications,
              DeFi protocols, NFTs, and DAOs. Bitcoin uses Proof of Work, while
              Ethereum uses Proof of Stake. See our{" "}
              <Link
                href="/guides/ethereum-vs-bitcoin"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                detailed comparison
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is ETH used for?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ETH (Ether) is Ethereum&apos;s native cryptocurrency with three
              main uses: paying gas fees for transactions and smart contract
              execution, staking to secure the network and earn rewards
              (approximately 3-4% APR), and serving as collateral and a medium
              of exchange across the DeFi ecosystem.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What was The Merge?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The Merge (September 15, 2022) was Ethereum&apos;s transition from
              Proof of Work to Proof of Stake consensus. It reduced
              Ethereum&apos;s energy consumption by approximately 99.95% and
              changed how new blocks are produced &mdash; from miners using GPUs
              to validators staking 32 ETH.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is Ethereum safe to use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The Ethereum blockchain itself is highly secure, with billions of
              dollars in value secured by hundreds of thousands of validators.
              However, individual smart contracts can have vulnerabilities.
              Always interact with audited protocols, verify contract addresses,
              and never share your private keys or seed phrase.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is Ethereum&apos;s roadmap?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Ethereum&apos;s roadmap consists of several phases: The Surge
              (scaling through rollups and data sharding), The Verge (Verkle
              trees for stateless clients), The Purge (reducing storage
              requirements), and The Splurge (miscellaneous improvements). The
              goal is a highly scalable, decentralized, and efficient blockchain.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore Ethereum Data
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Use our{" "}
            <Link
              href="/crypto/wei-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Wei Converter
            </Link>{" "}
            to convert ETH units, the{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            to compute Ethereum function selectors, or the{" "}
            <Link
              href="/crypto/checksum-address"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Checksum Address Converter
            </Link>{" "}
            to validate Ethereum addresses.
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Guides and Tools
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/ethereum-vs-bitcoin"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Ethereum vs Bitcoin
              </Link>{" "}
              &mdash; Detailed comparison of the two largest blockchains
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Ethereum&apos;s core innovation explained
            </li>
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Explore Ethereum&apos;s largest ecosystem
            </li>
            <li>
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Staking?
              </Link>{" "}
              &mdash; How Ethereum validators secure the network
            </li>
            <li>
              <Link
                href="/guides/what-is-layer2"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Layer 2?
              </Link>{" "}
              &mdash; How Ethereum scales through rollups
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
