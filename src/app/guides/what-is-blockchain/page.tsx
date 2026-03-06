import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is a Blockchain? How Distributed Ledgers Work | EVMTools",
  description:
    "Learn what a blockchain is, how blocks are chained together, consensus mechanisms (PoW vs PoS), types of blockchains, the blockchain trilemma, and real-world use cases beyond cryptocurrency.",
  keywords: [
    "blockchain",
    "what is blockchain",
    "blockchain explained",
    "how does blockchain work",
    "blockchain technology",
    "distributed ledger",
    "consensus mechanism",
    "proof of work",
    "proof of stake",
    "blockchain trilemma",
  ],
  openGraph: {
    title:
      "What is a Blockchain? How Distributed Ledgers Work | EVMTools",
    description:
      "Learn what a blockchain is, how blocks are chained together, consensus mechanisms (PoW vs PoS), types of blockchains, the blockchain trilemma, and real-world use cases beyond cryptocurrency.",
    url: `${SITE_URL}/guides/what-is-blockchain`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Blockchain? How Distributed Ledgers Work",
    description:
      "Learn what a blockchain is, how blocks are linked, consensus mechanisms, blockchain types, the trilemma, and use cases beyond crypto.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-blockchain`,
  },
};

export default function WhatIsBlockchainPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Blockchain? How Distributed Ledgers Work",
    description:
      "Learn what a blockchain is, how blocks are chained together, consensus mechanisms, types of blockchains, the blockchain trilemma, and real-world use cases beyond cryptocurrency.",
    url: `${SITE_URL}/guides/what-is-blockchain`,
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
      "@id": `${SITE_URL}/guides/what-is-blockchain`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Can a blockchain be hacked?",
      answer:
        "The blockchain itself is extremely difficult to hack due to its distributed nature and cryptographic security. To alter a block, an attacker would need to control more than 50% of the network's computing power (PoW) or staked value (PoS), known as a 51% attack. However, applications built on top of blockchains (smart contracts, bridges, exchanges) can have vulnerabilities. Most crypto hacks target these application-layer weaknesses, not the underlying blockchain.",
    },
    {
      question: "What is the difference between a blockchain and a database?",
      answer:
        "Traditional databases are centralized, controlled by a single organization, and can be modified or deleted by administrators. Blockchains are decentralized, maintained by thousands of independent nodes, and are append-only (data can be added but never modified or deleted). Databases are faster and more flexible, while blockchains provide trustlessness, censorship resistance, and immutability.",
    },
    {
      question: "Is Bitcoin a blockchain?",
      answer:
        "Bitcoin is both a cryptocurrency (BTC) and a blockchain. The Bitcoin blockchain is the specific distributed ledger that records all BTC transactions. It was the first blockchain, created by Satoshi Nakamoto in 2009. Other blockchains like Ethereum, Solana, and Polygon are separate networks with different features and capabilities.",
    },
    {
      question: "What is the blockchain trilemma?",
      answer:
        "The blockchain trilemma, coined by Vitalik Buterin, states that a blockchain can only fully achieve two out of three properties: decentralization, security, and scalability. Bitcoin and Ethereum prioritize decentralization and security at the cost of scalability. Solana prioritizes scalability and security with higher hardware requirements for nodes. Layer 2 solutions attempt to solve the trilemma by inheriting L1 security while adding scalability.",
    },
    {
      question: "Do I need cryptocurrency to use a blockchain?",
      answer:
        "For public blockchains, yes. You need the native cryptocurrency (ETH for Ethereum, SOL for Solana, etc.) to pay transaction fees (gas). However, some applications and Layer 2 networks offer gasless transactions through meta-transactions, where a third party (relayer) pays the gas on your behalf. Private and permissioned blockchains may not require cryptocurrency at all.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-blockchain">
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
            A blockchain is a distributed, immutable ledger that records
            transactions across a network of computers. Instead of trusting a
            single company or government to maintain records, a blockchain
            distributes that responsibility across thousands of independent
            participants who collectively agree on what is true. Every piece
            of data is cryptographically linked to the previous entry,
            forming an unbreakable chain of blocks &mdash; hence the name.
            This guide explains how blockchains work from the ground up,
            the different types that exist, and why this technology matters
            far beyond cryptocurrency.
          </p>
        </section>

        {/* How Blocks are Chained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Blocks Are Chained Together
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A blockchain is literally a chain of blocks. Each block contains
            three critical components: a list of transactions, a timestamp,
            and the cryptographic hash of the previous block. This last
            element &mdash; the previous block&apos;s hash &mdash; is what
            creates the &quot;chain&quot; and makes the data tamper-proof.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Block #100                    Block #101                    Block #102
+-----------------------+     +-----------------------+     +-----------------------+
| Hash: 0xa3f2...       |     | Hash: 0x7b1c...       |     | Hash: 0xd4e8...       |
| Prev: 0x5e9d...       | <-- | Prev: 0xa3f2...       | <-- | Prev: 0x7b1c...       |
| Timestamp: 1709...    |     | Timestamp: 1709...    |     | Timestamp: 1709...    |
| Transactions:         |     | Transactions:         |     | Transactions:         |
|   Alice -> Bob: 1 ETH |     |   Carol -> Dave: 5 ETH|     |   Eve -> Frank: 2 ETH |
|   Bob -> Carol: 0.5   |     |   Dave -> Eve: 1 ETH  |     |   Frank -> Alice: 3   |
+-----------------------+     +-----------------------+     +-----------------------+`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A hash is a fixed-size digital fingerprint created by a
            cryptographic function (like{" "}
            <Link
              href="/guides/what-is-keccak256"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256
            </Link>{" "}
            used by Ethereum or SHA-256 used by Bitcoin). Even the smallest
            change to a block&apos;s data completely changes its hash. Since
            each block includes the hash of the previous block, changing any
            historical block would invalidate every subsequent block in the
            chain. An attacker would need to recompute the hash for every
            block after the modified one &mdash; and do so faster than the
            rest of the network is producing new blocks.
          </p>
          <div className="rounded-lg border border-blue-300 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Key insight:</strong> The cryptographic linking of blocks
              means that the security of recent blocks is reinforced by every
              new block added on top. A transaction buried under 100 blocks is
              exponentially more secure than one in the latest block.
            </p>
          </div>
        </section>

        {/* Decentralization */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Decentralization: Nodes and Consensus
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            What makes a blockchain different from a regular database is
            decentralization. Instead of one server owned by a company,
            thousands of independent computers (nodes) around the world each
            maintain a complete copy of the ledger. No single node is in
            charge. For a transaction to be recorded, the network must reach
            consensus &mdash; a majority of nodes must agree that the
            transaction is valid.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This architecture provides several guarantees:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Censorship resistance</strong>:
              No single entity can prevent a valid transaction from being
              processed. Even if some nodes refuse a transaction, others will
              include it.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Immutability</strong>: Once
              recorded, data cannot be altered without consensus from the
              majority of the network. Historical records are permanent.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Trustlessness</strong>: You do
              not need to trust any individual participant. The system&apos;s
              rules are enforced by code and cryptography, not by
              institutions.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Fault tolerance</strong>: The
              network continues operating even if many nodes go offline. There
              is no single point of failure.
            </li>
          </ul>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Consensus Mechanisms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Consensus Mechanisms: How Networks Agree
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The consensus mechanism is the protocol that determines how nodes
            agree on the current state of the blockchain. It solves the
            fundamental problem of distributed systems: how do independent
            participants agree on truth without a central authority?
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Proof of Work (PoW)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In Proof of Work, miners compete to solve computationally
            intensive mathematical puzzles. The first miner to find a valid
            solution gets to propose the next block and earns a reward.
            The difficulty adjusts to maintain a target block time. PoW is
            extremely secure but energy-intensive. Bitcoin uses PoW with
            a ~10 minute block time.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Proof of Stake (PoS)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In Proof of Stake, validators lock up (stake) cryptocurrency as
            collateral. The protocol randomly selects validators to propose
            and attest to blocks, weighted by their stake. Validators who
            act honestly earn rewards; those who misbehave get slashed (lose
            part of their stake).{" "}
            <Link
              href="/guides/what-is-ethereum"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Ethereum
            </Link>{" "}
            and most modern blockchains use PoS. It is far more
            energy-efficient than PoW.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Delegated Proof of Stake (DPoS)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DPoS allows token holders to vote for delegates (validators) who
            produce blocks on their behalf. This creates faster block times
            and higher throughput, but concentrates power in fewer validators.
            Networks like EOS and Tron use DPoS with a small set of elected
            block producers.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Mechanism
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Security Source
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Energy Use
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Throughput
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Proof of Work</td>
                  <td className="px-4 py-3">Computational power</td>
                  <td className="px-4 py-3">Very high</td>
                  <td className="px-4 py-3">Low (~7 TPS)</td>
                  <td className="px-4 py-3">Bitcoin, Litecoin</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Proof of Stake</td>
                  <td className="px-4 py-3">Economic stake</td>
                  <td className="px-4 py-3">Very low</td>
                  <td className="px-4 py-3">Moderate (~30 TPS)</td>
                  <td className="px-4 py-3">Ethereum, Cardano</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">DPoS</td>
                  <td className="px-4 py-3">Delegated stake</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">High (~1000+ TPS)</td>
                  <td className="px-4 py-3">EOS, Tron</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Types of Blockchains */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of Blockchains
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Public Blockchains
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Public blockchains are open to anyone. Anyone can read the data,
            submit transactions, and participate in consensus. Bitcoin and
            Ethereum are public blockchains. They offer maximum
            decentralization and censorship resistance but have lower
            throughput compared to centralized systems.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Private Blockchains
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Private blockchains restrict access to a single organization.
            Only authorized participants can read data and submit
            transactions. They are used by enterprises for internal record
            keeping, supply chain tracking, and compliance. Hyperledger Fabric
            is a popular private blockchain framework. They sacrifice
            decentralization for speed and privacy.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Consortium Blockchains
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Consortium blockchains are governed by a group of organizations
            rather than a single entity. They are semi-decentralized: a
            predefined set of nodes participate in consensus, but the data
            may be publicly readable. R3 Corda is used by banks for
            inter-bank settlements. These are common in industries where
            multiple competitors need to share data (healthcare, finance,
            logistics).
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Hybrid Blockchains
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Hybrid blockchains combine elements of public and private chains.
            Some data is public and verifiable, while other data remains
            private to authorized participants. This model is useful for
            organizations that need public transparency for some operations
            (like supply chain provenance) while keeping sensitive business
            data private.
          </p>
        </section>

        {/* Major Blockchains Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Major Public Blockchains Compared
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Blockchain
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Consensus
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Block Time
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Smart Contracts
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Key Strength
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Bitcoin</td>
                  <td className="px-4 py-3">PoW</td>
                  <td className="px-4 py-3">~10 min</td>
                  <td className="px-4 py-3">Limited (Script)</td>
                  <td className="px-4 py-3">Maximum security and decentralization</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Ethereum</td>
                  <td className="px-4 py-3">PoS</td>
                  <td className="px-4 py-3">12 sec</td>
                  <td className="px-4 py-3">Turing-complete (Solidity)</td>
                  <td className="px-4 py-3">Largest smart contract ecosystem</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Solana</td>
                  <td className="px-4 py-3">PoS + PoH</td>
                  <td className="px-4 py-3">~0.4 sec</td>
                  <td className="px-4 py-3">Yes (Rust)</td>
                  <td className="px-4 py-3">High throughput, low fees</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Polygon PoS</td>
                  <td className="px-4 py-3">PoS</td>
                  <td className="px-4 py-3">~2 sec</td>
                  <td className="px-4 py-3">Yes (EVM compatible)</td>
                  <td className="px-4 py-3">Ethereum scaling, low fees</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Avalanche</td>
                  <td className="px-4 py-3">Avalanche consensus</td>
                  <td className="px-4 py-3">~2 sec</td>
                  <td className="px-4 py-3">Yes (EVM compatible)</td>
                  <td className="px-4 py-3">Subnet architecture, fast finality</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Blockchain Trilemma */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Blockchain Trilemma
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The blockchain trilemma, articulated by Vitalik Buterin, describes
            the fundamental trade-off that every blockchain faces. A network
            can optimize for at most two of these three properties at the
            expense of the third:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Decentralization</strong>:
              The degree to which the network avoids central points of control.
              Measured by the number and diversity of nodes, the hardware
              requirements to run a node, and the distribution of stake or
              mining power. Bitcoin and Ethereum prioritize this with low
              hardware requirements for running nodes.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Security</strong>: The cost of
              attacking the network. A secure blockchain requires enormous
              resources (computational power for PoW, economic stake for PoS)
              to forge transactions or rewrite history. Bitcoin&apos;s security
              cost is the electricity needed for a 51% attack. Ethereum&apos;s
              is the billions of dollars worth of staked ETH.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Scalability</strong>: The number
              of transactions the network can process per second (TPS) and the
              associated cost per transaction. High scalability means fast,
              cheap transactions. Solana achieves high TPS but requires
              powerful hardware for validators, reducing decentralization.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-layer2"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Layer 2 solutions
            </Link>{" "}
            are the leading approach to resolving the trilemma. By processing
            transactions off-chain and posting proofs to a secure, decentralized
            Layer 1 (like Ethereum), L2s inherit the security and
            decentralization of the base layer while dramatically increasing
            throughput and reducing fees.
          </p>
        </section>

        {/* Use Cases Beyond Crypto */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Use Cases Beyond Cryptocurrency
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            While cryptocurrency and DeFi are the most prominent blockchain
            applications, the technology has potential far beyond finance:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Supply Chain Management
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Blockchain provides an immutable record of a product&apos;s journey
            from origin to consumer. Walmart uses blockchain to track produce
            from farm to shelf, reducing the time to trace contamination
            sources from 7 days to 2.2 seconds. De Beers tracks diamonds from
            mine to retail to certify they are conflict-free. Every handoff
            is recorded on-chain, creating a trustworthy provenance trail.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Voting and Governance
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Blockchain-based voting systems can provide verifiable, tamper-proof
            elections. Each vote is recorded as a transaction that anyone can
            audit, while cryptographic techniques (like zero-knowledge proofs)
            can preserve voter privacy. Several pilot programs have tested
            blockchain voting in local elections and shareholder votes.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Digital Identity
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Self-sovereign identity (SSI) on blockchain lets individuals own
            and control their personal data instead of relying on centralized
            identity providers. Users can selectively share verified
            credentials (age, citizenship, qualifications) without revealing
            unnecessary information. This is particularly valuable for the
            estimated 1 billion people worldwide who lack formal
            identification.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Healthcare Records
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Medical records on a blockchain can be shared securely between
            providers while giving patients control over who accesses their
            data. This solves the interoperability problem where patient
            records are siloed across different hospital systems. Each access
            request is logged immutably, creating a complete audit trail.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Intellectual Property and Royalties
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Blockchain can automate royalty payments through{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contracts
            </Link>
            . When a song is streamed or a digital asset is resold, the smart
            contract automatically distributes payments to all rights holders
            according to predefined rules. This eliminates intermediaries and
            ensures creators are paid instantly and transparently.
          </p>
        </section>

        {/* How a Transaction Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Anatomy of a Blockchain Transaction
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding the lifecycle of a transaction demystifies how
            blockchains actually process data:
          </p>
          <ol className="ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Creation</strong>: A user creates
              a transaction (e.g., &quot;send 1 ETH to 0xBob&quot;) and signs
              it with their private key. The signature proves they authorized
              the transfer without revealing the key itself.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Broadcasting</strong>: The signed
              transaction is broadcast to the network and enters the mempool
              (memory pool) &mdash; a waiting area of pending transactions on
              each node.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Validation</strong>: Nodes verify
              the transaction: Is the signature valid? Does the sender have
              sufficient balance? Is the nonce correct? Invalid transactions
              are rejected.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Block inclusion</strong>: A
              validator (PoS) or miner (PoW) selects transactions from the
              mempool and assembles them into a new block. Transactions that
              pay higher fees are typically prioritized.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Consensus</strong>: The proposed
              block is validated by other network participants. In PoS,
              attestors vote on the block&apos;s validity. In PoW, other
              miners verify the proof and accept the block.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Finalization</strong>: Once the
              block is accepted and additional blocks are built on top of it,
              the transaction is considered final. On Ethereum, finality takes
              about 12-15 minutes (2 epochs).
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
              Can a blockchain be hacked?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The blockchain itself is extremely difficult to hack due to its
              distributed nature and cryptographic security. To alter a block,
              an attacker would need to control more than 50% of the
              network&apos;s power (a 51% attack). However, applications built
              on top of blockchains (smart contracts, bridges, exchanges) can
              have vulnerabilities. Most crypto hacks target these
              application-layer weaknesses.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between a blockchain and a database?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Traditional databases are centralized, controlled by a single
              organization, and can be modified or deleted by administrators.
              Blockchains are decentralized, maintained by thousands of nodes,
              and are append-only &mdash; data can be added but never modified
              or deleted. Databases are faster and more flexible, while
              blockchains provide trustlessness, censorship resistance, and
              immutability.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is Bitcoin a blockchain?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Bitcoin is both a cryptocurrency (BTC) and a blockchain. The
              Bitcoin blockchain is the specific distributed ledger that
              records all BTC transactions. It was the first blockchain,
              created by Satoshi Nakamoto in 2009. Other blockchains like
              Ethereum, Solana, and Polygon are separate networks with
              different features and capabilities.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the blockchain trilemma?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The blockchain trilemma states that a blockchain can only fully
              achieve two out of three properties: decentralization, security,
              and scalability. Bitcoin and Ethereum prioritize decentralization
              and security. Solana prioritizes scalability and security. Layer
              2 solutions attempt to solve the trilemma by inheriting L1
              security while adding scalability.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Do I need cryptocurrency to use a blockchain?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              For public blockchains, yes &mdash; you need the native
              cryptocurrency (ETH for Ethereum, SOL for Solana) to pay
              transaction fees. However, some applications offer gasless
              transactions through meta-transactions, where a third party pays
              the gas on your behalf. Private blockchains may not require
              cryptocurrency at all.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore Blockchain Data
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Use our{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            to see how Ethereum computes cryptographic hashes, the{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>{" "}
            to decode raw blockchain transactions, or the{" "}
            <Link
              href="/crypto/checksum-address"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Checksum Address Converter
            </Link>{" "}
            to validate blockchain addresses.
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
                href="/guides/what-is-ethereum"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Ethereum?
              </Link>{" "}
              &mdash; Deep dive into the most popular smart contract blockchain
            </li>
            <li>
              <Link
                href="/guides/ethereum-vs-bitcoin"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Ethereum vs Bitcoin
              </Link>{" "}
              &mdash; Compare the two largest blockchain networks
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Programs that run on blockchains
            </li>
            <li>
              <Link
                href="/guides/what-is-layer2"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Layer 2?
              </Link>{" "}
              &mdash; How blockchains scale through off-chain computation
            </li>
            <li>
              <Link
                href="/crypto/keccak256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Keccak256 Hash Generator
              </Link>{" "}
              &mdash; Compute the hashes that link blocks together
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
