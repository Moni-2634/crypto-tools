import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is a Crypto Bridge? Cross-Chain Bridges Explained | EVMTools",
  description:
    "Learn what crypto bridges are, how cross-chain bridges work (lock-and-mint, burn-and-mint, liquidity pools), major bridges like Wormhole and LayerZero, bridge security risks, and famous bridge hacks.",
  keywords: [
    "crypto bridge",
    "what is a bridge",
    "cross-chain bridge",
    "blockchain bridge",
    "bridge hack",
    "wormhole bridge",
    "layerzero",
    "stargate bridge",
    "arbitrum bridge",
    "polygon bridge",
    "bridge security",
    "cross-chain",
  ],
  openGraph: {
    title:
      "What is a Crypto Bridge? Cross-Chain Bridges Explained | EVMTools",
    description:
      "Learn what crypto bridges are, how cross-chain bridges work (lock-and-mint, burn-and-mint, liquidity pools), major bridges like Wormhole and LayerZero, bridge security risks, and famous bridge hacks.",
    url: `${SITE_URL}/guides/what-is-bridge`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Crypto Bridge? Cross-Chain Bridges Explained",
    description:
      "Learn what crypto bridges are, how cross-chain bridges work (lock-and-mint, burn-and-mint, liquidity pools), major bridges like Wormhole and LayerZero, bridge security risks, and famous bridge hacks.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-bridge`,
  },
};

export default function WhatIsBridgePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Crypto Bridge? Cross-Chain Bridges Explained",
    description:
      "Learn what crypto bridges are, how cross-chain bridges work (lock-and-mint, burn-and-mint, liquidity pools), major bridges like Wormhole and LayerZero, bridge security risks, and famous bridge hacks.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-bridge`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-bridge`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Are crypto bridges safe?",
      answer:
        "Crypto bridges carry significant security risks. Bridges are among the most-attacked targets in crypto, with over $2.5 billion lost to bridge hacks since 2021. The risks include smart contract vulnerabilities, compromised validator keys, and flawed verification logic. To stay safe, use well-established bridges with strong security track records, start with small amounts, use official canonical bridges when possible (like the Arbitrum or Optimism native bridges), and wait for sufficient confirmations before considering a transfer complete.",
    },
    {
      question: "How long does bridging take?",
      answer:
        "Bridge transfer times vary significantly. Third-party bridges using liquidity pools (like Stargate or Across) can complete in minutes. Canonical L2 bridges to Layer 2 networks (Arbitrum, Optimism) typically take about 10-20 minutes for deposits. However, withdrawals from optimistic rollups back to Ethereum take 7 days due to the challenge period. ZK rollup withdrawals can be faster (hours) once the proof is generated. Native bridges between L1 chains can take from minutes to hours depending on confirmation requirements.",
    },
    {
      question: "What is the cheapest way to bridge crypto?",
      answer:
        "The cheapest bridging option depends on the route. For L2 to L2 transfers, bridges like Across, Stargate, and Hop Protocol often offer competitive rates. Using the native canonical bridge is usually cheapest for deposits from Ethereum to L2s but can be slow for withdrawals. DEX aggregators like LI.FI, Socket, and Bungee compare multiple bridges and routes to find the cheapest option. Always account for gas fees on both the source and destination chains, plus any bridge fees.",
    },
    {
      question:
        "What is the difference between a canonical bridge and a third-party bridge?",
      answer:
        "A canonical bridge is the official bridge built and maintained by the Layer 2 or blockchain team itself (like the Arbitrum Bridge or Polygon PoS Bridge). It inherits the security guarantees of the underlying protocol. A third-party bridge (like Wormhole, Stargate, or Across) is built by independent teams and uses its own security mechanisms (multisigs, relayers, or liquidity pools). Canonical bridges are generally considered more secure but may be slower, while third-party bridges offer speed and convenience at the cost of additional trust assumptions.",
    },
    {
      question: "Can I bridge any token to any chain?",
      answer:
        "Not all tokens can be bridged to all chains. Bridging depends on the bridge supporting the specific token and having liquidity on both the source and destination chains. Major tokens like ETH, USDC, USDT, and WBTC are widely supported across most bridges and chains. Less popular tokens may only be available on specific bridges or may need to be swapped to a more common token first. Some bridges support arbitrary message passing, which enables bridging of any token through smart contract interactions.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-bridge">
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
            Cross-chain bridges are the infrastructure that connects separate
            blockchain networks, allowing users to move assets and data between
            chains. As the blockchain ecosystem has expanded across Ethereum,{" "}
            <Link
              href="/guides/what-is-layer2"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Layer 2 networks
            </Link>
            , Solana, Cosmos, and dozens of other chains, bridges have become
            essential for accessing{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              DeFi
            </Link>{" "}
            opportunities, moving liquidity, and participating in multi-chain
            ecosystems. However, bridges are also the most-attacked
            infrastructure in crypto, with over $2.5 billion stolen in bridge
            hacks. This guide explains how bridges work, the different types,
            major bridges, security risks, and how to use them safely.
          </p>
        </section>

        {/* What is a Bridge */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a Cross-Chain Bridge?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A{" "}
            <strong className="text-gray-900 dark:text-white">
              cross-chain bridge
            </strong>{" "}
            is a protocol that enables the transfer of assets, data, or
            messages between two or more blockchain networks. Each blockchain
            is an isolated system with its own consensus, state, and rules.
            Bridges create a connection between these isolated systems.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The fundamental challenge is that blockchains cannot natively read
            each other&apos;s state. Ethereum has no way to verify what
            happened on Solana, and vice versa. Bridges solve this by
            implementing various verification mechanisms to prove that an
            action occurred on one chain before executing a corresponding
            action on another.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Cross-Chain Bridge Flow:

  Ethereum                   Bridge                    Arbitrum
  ┌──────────┐            ┌──────────┐            ┌──────────┐
  │          │  Lock ETH  │          │  Mint ETH  │          │
  │  User    │───────────>│  Bridge  │───────────>│  User    │
  │  has ETH │            │  Contract│            │  has ETH │
  │  on L1   │            │          │            │  on L2   │
  └──────────┘            └──────────┘            └──────────┘

  To bridge back:
  ┌──────────┐            ┌──────────┐            ┌──────────┐
  │          │  Burn ETH  │          │ Unlock ETH │          │
  │  User    │───────────>│  Bridge  │───────────>│  User    │
  │  has ETH │            │  Contract│            │  has ETH │
  │  on L2   │            │          │            │  on L1   │
  └──────────┘            └──────────┘            └──────────┘`}</code>
          </pre>
        </section>

        {/* Types of Bridges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of Cross-Chain Bridges
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Bridges use different mechanisms to move assets between chains.
            Each approach has distinct security properties and trade-offs:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lock-and-Mint
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most common bridge mechanism. The user locks their tokens in a{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contract
            </Link>{" "}
            on the source chain, and the bridge mints an equivalent
            &quot;wrapped&quot; representation on the destination chain. To
            bridge back, the wrapped tokens are burned, and the originals are
            unlocked. Examples: Wormhole, Polygon PoS Bridge.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Risk:</strong> The locked tokens on the source chain are a
              honeypot. If the bridge contract is compromised, all locked funds
              can be stolen. The security of every wrapped token depends
              entirely on the security of the bridge contract holding the
              originals.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Burn-and-Mint
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Used when the token issuer controls minting on multiple chains.
            Instead of locking tokens, they are burned on the source chain and
            freshly minted on the destination chain. There is no pool of locked
            tokens to attack. Circle&apos;s CCTP (Cross-Chain Transfer
            Protocol) for USDC is the prime example: USDC is burned on one
            chain and natively minted on another.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Liquidity Pool Bridges
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Instead of lock-and-mint, these bridges maintain liquidity pools of
            native tokens on both chains. When a user wants to bridge, they
            deposit tokens into the pool on the source chain and receive tokens
            from the pool on the destination chain. This approach avoids
            wrapped tokens entirely. Examples: Stargate, Across Protocol, Hop
            Protocol.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Message Passing Bridges
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Rather than just moving tokens, these bridges enable arbitrary
            cross-chain communication. Smart contracts on one chain can call
            functions on contracts on another chain. This unlocks cross-chain
            DeFi, governance, and complex multi-chain applications. Examples:
            LayerZero, Chainlink CCIP, Axelar, Hyperlane.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Canonical (Native) Bridges
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            These are the official bridges built by L2 teams as part of their
            rollup infrastructure. They inherit the security of the underlying
            L1 (Ethereum) and do not require additional trust assumptions
            beyond the rollup itself. Examples: Arbitrum Bridge, Optimism
            Bridge, zkSync Bridge, Polygon zkEVM Bridge.
          </p>
        </section>

        {/* Major Bridges Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Major Cross-Chain Bridges
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Bridge
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Chains
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Trust Model
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Wormhole
                  </td>
                  <td className="px-4 py-3">Lock-and-mint + message passing</td>
                  <td className="px-4 py-3">30+ chains</td>
                  <td className="px-4 py-3">
                    Guardian network (19 validators)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    LayerZero
                  </td>
                  <td className="px-4 py-3">Message passing</td>
                  <td className="px-4 py-3">50+ chains</td>
                  <td className="px-4 py-3">
                    Ultra Light Nodes + configurable DVNs
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Axelar
                  </td>
                  <td className="px-4 py-3">Message passing + lock-and-mint</td>
                  <td className="px-4 py-3">50+ chains</td>
                  <td className="px-4 py-3">
                    Proof of Stake validator set
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Stargate
                  </td>
                  <td className="px-4 py-3">Liquidity pool (unified)</td>
                  <td className="px-4 py-3">20+ chains</td>
                  <td className="px-4 py-3">
                    LayerZero messaging layer
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Across Protocol
                  </td>
                  <td className="px-4 py-3">Intent-based + optimistic</td>
                  <td className="px-4 py-3">10+ EVM chains</td>
                  <td className="px-4 py-3">
                    UMA optimistic oracle verification
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Arbitrum Bridge
                  </td>
                  <td className="px-4 py-3">Canonical rollup bridge</td>
                  <td className="px-4 py-3">Ethereum &harr; Arbitrum</td>
                  <td className="px-4 py-3">
                    Rollup fraud proofs (Ethereum security)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Optimism Bridge
                  </td>
                  <td className="px-4 py-3">Canonical rollup bridge</td>
                  <td className="px-4 py-3">Ethereum &harr; OP Mainnet</td>
                  <td className="px-4 py-3">
                    Rollup fraud proofs (Ethereum security)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Chainlink CCIP
                  </td>
                  <td className="px-4 py-3">Message passing + token transfer</td>
                  <td className="px-4 py-3">15+ chains</td>
                  <td className="px-4 py-3">
                    Chainlink DON + Risk Management Network
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Bridge Security & Hacks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bridge Security Risks and Major Hacks
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Cross-chain bridges are the most-attacked category of smart
            contracts in crypto. The reason is simple: bridges hold massive
            amounts of locked tokens, and their cross-chain verification
            logic is inherently complex. A single vulnerability can drain
            hundreds of millions of dollars.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Notable Bridge Hacks
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Bridge
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Amount Lost
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Cause
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                    Ronin Bridge
                  </td>
                  <td className="px-4 py-3">Mar 2022</td>
                  <td className="px-4 py-3 font-semibold">$625M</td>
                  <td className="px-4 py-3">
                    5 of 9 validator private keys compromised (Lazarus Group)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                    Wormhole
                  </td>
                  <td className="px-4 py-3">Feb 2022</td>
                  <td className="px-4 py-3 font-semibold">$325M</td>
                  <td className="px-4 py-3">
                    Signature verification bypass: minted wETH without deposit
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                    Nomad
                  </td>
                  <td className="px-4 py-3">Aug 2022</td>
                  <td className="px-4 py-3 font-semibold">$190M</td>
                  <td className="px-4 py-3">
                    Faulty Merkle root update: any message accepted as valid
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                    BNB Bridge
                  </td>
                  <td className="px-4 py-3">Oct 2022</td>
                  <td className="px-4 py-3 font-semibold">$586M</td>
                  <td className="px-4 py-3">
                    Proof verification bug: forged proof to mint BNB
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                    Multichain
                  </td>
                  <td className="px-4 py-3">Jul 2023</td>
                  <td className="px-4 py-3 font-semibold">$126M</td>
                  <td className="px-4 py-3">
                    MPC key compromise by CEO (single point of failure)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Common bridge attack patterns:</strong> Private key
              compromise (Ronin, Multichain, Harmony), smart contract bugs in
              verification logic (Wormhole, Nomad, BNB Bridge), and
              insufficient validator decentralization. These are not just
              theoretical risks &mdash; they have caused billions in losses.
            </p>
          </div>
        </section>

        {/* Trust Assumptions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trust Assumptions Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every bridge makes trust assumptions about who verifies
            cross-chain messages. These assumptions determine the security
            model:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Trust Model
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Security Level
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Example
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Trade-off
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Rollup proof (canonical)</td>
                  <td className="px-4 py-3 text-green-600 dark:text-green-400">
                    Highest
                  </td>
                  <td className="px-4 py-3">
                    Arbitrum Bridge, OP Bridge
                  </td>
                  <td className="px-4 py-3">
                    7-day withdrawal delay (optimistic) or proof generation time (ZK)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Decentralized oracle network</td>
                  <td className="px-4 py-3 text-green-600 dark:text-green-400">
                    High
                  </td>
                  <td className="px-4 py-3">
                    Chainlink CCIP
                  </td>
                  <td className="px-4 py-3">
                    Dependent on oracle network security
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Optimistic verification</td>
                  <td className="px-4 py-3 text-yellow-600 dark:text-yellow-400">
                    Medium-High
                  </td>
                  <td className="px-4 py-3">
                    Across Protocol
                  </td>
                  <td className="px-4 py-3">
                    Relies on watchers to dispute fraudulent messages
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">PoS validator set</td>
                  <td className="px-4 py-3 text-yellow-600 dark:text-yellow-400">
                    Medium
                  </td>
                  <td className="px-4 py-3">
                    Axelar, Wormhole
                  </td>
                  <td className="px-4 py-3">
                    Trust majority of validators are honest and not compromised
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Multisig</td>
                  <td className="px-4 py-3 text-red-600 dark:text-red-400">
                    Lower
                  </td>
                  <td className="px-4 py-3">
                    Many early bridges
                  </td>
                  <td className="px-4 py-3">
                    Small set of signers; key compromise drains all funds
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* How to Use Bridges Safely */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use Bridges Safely
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Given the significant risks, here are best practices for using
            cross-chain bridges:
          </p>
          <ol className="ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Use canonical bridges when possible
              </strong>
              : For Ethereum to L2 transfers, the official rollup bridge is
              the most secure option. It inherits Ethereum&apos;s security
              guarantees.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Start with small test amounts
              </strong>
              : Before bridging a significant amount, send a small test
              transaction first. Verify it arrives correctly on the
              destination chain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Check bridge TVL and track record
              </strong>
              : Established bridges with high TVL and long track records
              without incidents are generally safer. Check DeFiLlama for TVL
              data.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Verify the bridge URL
              </strong>
              : Phishing sites mimicking popular bridges are common. Bookmark
              official URLs and always verify you are on the correct domain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Use bridge aggregators
              </strong>
              : Tools like LI.FI, Socket, and Bungee compare routes across
              multiple bridges to find the best rates and safest paths.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Avoid bridging more than necessary
              </strong>
              : Keep the minimum amount needed on each chain. If a bridge
              gets exploited, your exposure is limited to what you have
              bridged.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Prefer native tokens
              </strong>
              : When possible, use bridges that deliver native tokens (via
              liquidity pools or burn-and-mint) rather than wrapped tokens.
              Native USDC via CCTP is safer than wrapped USDC via a
              lock-and-mint bridge.
            </li>
          </ol>
        </section>

        {/* The Future of Bridges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Future: Intent-Based and ZK Bridges
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Bridge technology is rapidly evolving to address security and UX
            challenges:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Intent-based bridges
              </strong>
              : Instead of users directly interacting with bridge contracts,
              they express an &quot;intent&quot; (I want 1 ETH on Arbitrum)
              and professional solvers compete to fill it. This abstracts away
              the bridging complexity. Examples: Across Protocol, UniswapX
              cross-chain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                ZK-verified bridges
              </strong>
              : Zero-knowledge proofs can cryptographically verify that a
              transaction occurred on the source chain without trusting any
              external validators. This is the highest possible security model
              for bridges (trustless verification). Projects like zkBridge and
              Polymer Labs are developing this approach.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Chain abstraction
              </strong>
              : The ultimate goal is to make bridging invisible to users.
              Instead of manually bridging assets, wallets and dApps will
              automatically route transactions across chains. The user simply
              interacts with an application, and the infrastructure handles
              cross-chain movement behind the scenes.
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
              Are crypto bridges safe?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Crypto bridges carry significant security risks, with over $2.5
              billion lost to bridge hacks since 2021. To stay safe, use
              well-established bridges with strong security track records,
              start with small amounts, use official canonical bridges when
              possible, and wait for sufficient confirmations before
              considering a transfer complete.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How long does bridging take?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Bridge transfer times vary significantly. Liquidity pool bridges
              can complete in minutes. Canonical L2 bridge deposits take about
              10&ndash;20 minutes. Withdrawals from optimistic rollups back to
              Ethereum take 7 days due to the challenge period. ZK rollup
              withdrawals can be faster once the proof is generated.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the cheapest way to bridge crypto?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The cheapest option depends on the route. For L2 to L2
              transfers, bridges like Across and Stargate often offer
              competitive rates. Native canonical bridges are usually cheapest
              for deposits but slow for withdrawals. DEX aggregators like
              LI.FI and Bungee compare multiple bridges to find the best
              option. Always account for gas fees on both chains.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between a canonical bridge and a
              third-party bridge?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A canonical bridge is the official bridge built by the L2 team
              (like the Arbitrum Bridge). It inherits the security of the
              underlying protocol. A third-party bridge (like Wormhole or
              Stargate) is built by independent teams with their own security
              mechanisms. Canonical bridges are generally more secure but may
              be slower, while third-party bridges offer speed at the cost of
              additional trust assumptions.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can I bridge any token to any chain?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Not all tokens can be bridged to all chains. Bridging depends on
              bridge support and liquidity on both chains. Major tokens like
              ETH, USDC, and USDT are widely supported. Less popular tokens
              may need to be swapped to a common token first. Some bridges
              support arbitrary message passing, enabling bridging of any
              token through smart contract interactions.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore Multi-Chain Tools
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Working with tokens across multiple chains? Use our{" "}
            <Link
              href="/crypto/checksum-address"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Checksum Address Converter
            </Link>{" "}
            to verify bridge contract addresses, and explore our{" "}
            <Link
              href="/guides/what-is-layer2"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              What is Layer 2?
            </Link>{" "}
            guide to understand the L2 networks you are bridging to.
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
                href="/guides/what-is-layer2"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Layer 2?
              </Link>{" "}
              &mdash; Understand the L2 networks that bridges connect to
            </li>
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Explore the DeFi ecosystem that drives cross-chain demand
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Learn how bridge contracts work under the hood
            </li>
            <li>
              <Link
                href="/crypto/checksum-address"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Checksum Address Converter
              </Link>{" "}
              &mdash; Verify bridge and token contract addresses
            </li>
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate gas costs for bridge transactions
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
