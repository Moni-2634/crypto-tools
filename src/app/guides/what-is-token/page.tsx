import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is a Crypto Token? Types, Standards, and Tokenomics Explained | EVMTools",
  description:
    "Learn what a crypto token is, how tokens differ from coins, the major token types (utility, governance, security, stablecoin), token standards (ERC-20, ERC-721, ERC-1155), and tokenomics fundamentals.",
  keywords: [
    "crypto token",
    "what is a token",
    "token vs coin",
    "cryptocurrency token",
    "erc20 token",
    "token types",
    "tokenomics",
    "utility token",
    "governance token",
    "token standard",
  ],
  openGraph: {
    title:
      "What is a Crypto Token? Types, Standards, and Tokenomics Explained | EVMTools",
    description:
      "Learn what a crypto token is, how tokens differ from coins, the major token types (utility, governance, security, stablecoin), token standards (ERC-20, ERC-721, ERC-1155), and tokenomics fundamentals.",
    url: `${SITE_URL}/guides/what-is-token`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Crypto Token? Types, Standards, and Tokenomics Explained",
    description:
      "Learn what a crypto token is, how tokens differ from coins, the major token types, token standards, and tokenomics fundamentals.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-token`,
  },
};

export default function WhatIsTokenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What is a Crypto Token? Types, Standards, and Tokenomics Explained",
    description:
      "Learn what a crypto token is, how tokens differ from coins, the major token types, token standards (ERC-20, ERC-721, ERC-1155), and tokenomics fundamentals.",
    url: `${SITE_URL}/guides/what-is-token`,
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
      "@id": `${SITE_URL}/guides/what-is-token`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is the difference between a token and a coin?",
      answer:
        "A coin (like ETH or BTC) is the native currency of its own blockchain, used to pay transaction fees and secure the network. A token is built on top of an existing blockchain using a smart contract. For example, USDC is a token built on Ethereum using the ERC-20 standard, while ETH is Ethereum's native coin. Coins have their own blockchain; tokens ride on someone else's.",
    },
    {
      question: "How do I create my own token?",
      answer:
        "To create a basic ERC-20 token on Ethereum, you deploy a smart contract that implements the ERC-20 interface (totalSupply, balanceOf, transfer, approve, transferFrom, allowance). Using OpenZeppelin's library, this can be done in under 20 lines of Solidity code. You'll need a wallet with ETH for gas fees and a development tool like Hardhat or Foundry.",
    },
    {
      question: "Are all crypto tokens securities?",
      answer:
        "Not all tokens are securities. The classification depends on the token's characteristics and how it is marketed. Utility tokens that provide access to a service are generally not securities. Tokens sold as investments with expected profits from others' efforts may be classified as securities under the Howey Test. Governance tokens and stablecoins occupy gray areas that regulators continue to evaluate.",
    },
    {
      question: "What makes a token valuable?",
      answer:
        "Token value comes from utility (what you can do with it), scarcity (supply limits and burn mechanisms), demand (number of users and use cases), and tokenomics (distribution, vesting, inflation rate). A token used to pay for a popular service with limited supply and strong demand will naturally command higher value than one with unlimited supply and no utility.",
    },
    {
      question: "What is a soulbound token (SBT)?",
      answer:
        "A soulbound token is a non-transferable NFT permanently tied to a wallet address. Once received, it cannot be sold or transferred. SBTs are used for credentials, certifications, reputation scores, and identity verification. The concept was popularized by Vitalik Buterin in a 2022 paper proposing 'Decentralized Society' built on non-transferable tokens.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-token">
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
            A token is a digital asset created on an existing blockchain using a{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contract
            </Link>
            . Unlike native blockchain currencies (coins) such as ETH or BTC,
            tokens do not have their own blockchain &mdash; they live on top of
            one. Tokens can represent virtually anything: currency, voting
            rights, ownership of real-world assets, access to a service, or
            unique digital art. This guide covers the different token types,
            the technical standards that define them, and the economics that
            give them value.
          </p>
        </section>

        {/* Token vs Coin */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Token vs Coin: What is the Difference?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The terms &quot;token&quot; and &quot;coin&quot; are often used
            interchangeably, but they have a specific technical distinction in
            blockchain terminology:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Property
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Coin
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Token
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Blockchain</td>
                  <td className="px-4 py-3">Has its own (native)</td>
                  <td className="px-4 py-3">Built on another blockchain</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Creation</td>
                  <td className="px-4 py-3">Mining or staking rewards</td>
                  <td className="px-4 py-3">Smart contract deployment</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Primary use</td>
                  <td className="px-4 py-3">Gas fees, network security</td>
                  <td className="px-4 py-3">Application-specific utility</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Transfer mechanism</td>
                  <td className="px-4 py-3">Native protocol transactions</td>
                  <td className="px-4 py-3">Smart contract function calls</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Examples</td>
                  <td className="px-4 py-3">ETH, BTC, SOL, AVAX</td>
                  <td className="px-4 py-3">USDC, UNI, LINK, AAVE</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A simple way to remember: if a cryptocurrency is the native
            currency that pays for transactions on its own blockchain, it is a
            coin. If it was created by deploying a smart contract on someone
            else&apos;s blockchain, it is a token. ETH is a coin because it
            powers the Ethereum network. USDC is a token because it is an
            ERC-20 contract deployed on Ethereum.
          </p>
        </section>

        {/* Token Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of Tokens
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Utility Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Utility tokens provide access to a product or service within a
            specific ecosystem. They are not designed as investments but as
            functional tools. LINK (Chainlink) is used to pay oracle node
            operators for data feeds. FIL (Filecoin) is used to pay for
            decentralized file storage. BAT (Basic Attention Token) rewards
            users and advertisers in the Brave browser ecosystem.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Governance Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Governance tokens grant holders voting power over protocol
            decisions. UNI (Uniswap) holders vote on fee structures, treasury
            allocations, and protocol upgrades. AAVE holders govern risk
            parameters and new market listings. COMP (Compound) holders
            influence interest rate models and collateral factors. The more
            tokens you hold, the more voting weight you carry.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Security Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Security tokens represent ownership in real-world assets like
            company equity, real estate, or bonds. They are subject to
            securities regulations and must comply with frameworks like the
            SEC&apos;s Regulation D or Regulation S. Security tokens typically
            include transfer restrictions enforced at the smart contract level,
            such as whitelisted investor addresses and lockup periods.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Stablecoins
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Stablecoins are tokens designed to maintain a stable value, usually
            pegged to the US dollar. They come in three flavors:
            fiat-collateralized (USDC, USDT &mdash; backed by real dollars in
            bank accounts), crypto-collateralized (DAI &mdash; backed by
            over-collateralized crypto deposits), and algorithmic (which use
            supply/demand mechanisms to maintain the peg). Stablecoins are the
            backbone of{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              DeFi
            </Link>
            , facilitating lending, borrowing, and trading without exposure to
            crypto volatility.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            LP Tokens (Liquidity Provider Tokens)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When you deposit tokens into a decentralized exchange liquidity
            pool, you receive LP tokens representing your share of the pool.
            These tokens accrue trading fees over time and can be redeemed
            for your underlying deposit plus earned fees. LP tokens are
            themselves ERC-20 tokens, so they can be used as collateral in
            other DeFi protocols &mdash; a concept known as composability.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Soulbound Tokens (SBTs)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Soulbound tokens are non-transferable tokens permanently tied to
            a wallet. They cannot be sold, traded, or moved. SBTs are used
            for on-chain credentials (university degrees, professional
            certifications), reputation scores (credit history, participation
            records), and identity verification (KYC attestations). The
            concept was formalized by Vitalik Buterin in his 2022
            &quot;Decentralized Society&quot; paper.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Token Standards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Token Standards on Ethereum
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Token standards are interfaces that define how tokens behave. By
            following a standard, your token automatically works with every
            wallet, exchange, and DeFi protocol that supports that standard:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ERC-20: Fungible Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-erc20"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-20
            </Link>{" "}
            is the standard for fungible tokens where every unit is identical
            and interchangeable. It defines functions like{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              transfer
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              approve
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              balanceOf
            </code>
            . Nearly all DeFi tokens, stablecoins, and governance tokens are
            ERC-20 compliant.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ERC-721: Non-Fungible Tokens (NFTs)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-erc721"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-721
            </Link>{" "}
            is the standard for unique, non-fungible tokens. Each token has a
            unique ID and a single owner. It powers NFT collections like
            CryptoPunks and Bored Ape Yacht Club. Key functions include{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              ownerOf
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              safeTransferFrom
            </code>
            .
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ERC-1155: Multi-Token Standard
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <Link
              href="/guides/what-is-erc1155"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-1155
            </Link>{" "}
            supports both fungible and non-fungible tokens in a single
            contract. It was designed for gaming and includes native batch
            transfer operations for gas efficiency. A single ERC-1155 contract
            can manage currencies, unique items, and edition-based collectibles
            simultaneously.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Standard
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Use Case
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Example Tokens
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">Fungible</td>
                  <td className="px-4 py-3">Currencies, governance</td>
                  <td className="px-4 py-3">USDC, UNI, LINK</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">ERC-721</td>
                  <td className="px-4 py-3">Non-fungible</td>
                  <td className="px-4 py-3">Unique art, PFPs</td>
                  <td className="px-4 py-3">BAYC, Azuki, Nouns</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">ERC-1155</td>
                  <td className="px-4 py-3">Both</td>
                  <td className="px-4 py-3">Gaming, editions</td>
                  <td className="px-4 py-3">Enjin items, OpenSea collections</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Create a Token */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Create a Token (High-Level)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Creating an ERC-20 token involves deploying a smart contract that
            implements the ERC-20 interface. Using OpenZeppelin&apos;s battle-tested
            library, the code is surprisingly minimal:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This contract creates a token with a name (&quot;MyToken&quot;), a
            symbol (&quot;MTK&quot;), 18 decimal places (the default), and
            mints the entire initial supply to the deployer. In practice, you
            would add features like minting caps, burn functions, access
            control, and possibly pausability depending on your use case. To
            learn how to deploy this to a real network, see our{" "}
            <Link
              href="/guides/how-to-deploy-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              deployment guide
            </Link>
            .
          </p>
        </section>

        {/* Tokenomics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Understanding Tokenomics
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Tokenomics refers to the economic design of a token &mdash; how
            it is distributed, what controls its supply, and what incentives
            drive its value. Good tokenomics align the interests of users,
            investors, and the development team.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Supply Mechanics
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Fixed supply</strong>: A
              hard cap on the total number of tokens that can ever exist.
              Bitcoin has a 21 million cap. This creates scarcity similar to
              precious metals.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Inflationary supply</strong>:
              New tokens are continuously minted (often as{" "}
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                staking
              </Link>{" "}
              rewards). This incentivizes network participation but dilutes
              existing holders if demand does not keep pace.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Deflationary / burn mechanics</strong>:
              Tokens are permanently destroyed (burned) through usage. ETH
              burns a portion of gas fees via EIP-1559. BNB burns tokens
              quarterly. This reduces supply over time, creating upward price
              pressure if demand is constant.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Distribution and Vesting
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            How tokens are initially distributed matters enormously. A typical
            distribution might allocate 40% to the community (airdrops,
            liquidity mining, grants), 20% to the team with a 4-year vesting
            schedule and 1-year cliff, 20% to investors with similar vesting
            terms, and 20% to a treasury controlled by governance. Vesting
            prevents insiders from dumping tokens immediately after launch and
            ensures long-term alignment.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Inflation Rate
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The rate at which new tokens enter circulation directly impacts
            value. A token with 100% annual inflation needs to double its
            demand each year just to maintain its price. Most well-designed
            protocols target 1-5% annual inflation for staking rewards, with
            burn mechanisms that can offset or exceed inflation (making the
            token net deflationary).
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Popular Tokens */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notable Tokens by Category
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Token
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Standard
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">USDC</td>
                  <td className="px-4 py-3">Stablecoin</td>
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">USD-pegged dollar on-chain</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">UNI</td>
                  <td className="px-4 py-3">Governance</td>
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">Uniswap protocol governance</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">LINK</td>
                  <td className="px-4 py-3">Utility</td>
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">Pays Chainlink oracle operators</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">AAVE</td>
                  <td className="px-4 py-3">Governance + Utility</td>
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">Aave lending protocol governance</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">stETH</td>
                  <td className="px-4 py-3">Liquid staking</td>
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">Represents staked ETH via Lido</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">DAI</td>
                  <td className="px-4 py-3">Stablecoin</td>
                  <td className="px-4 py-3">ERC-20</td>
                  <td className="px-4 py-3">Crypto-collateralized stablecoin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Token Lifecycle */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Token Lifecycle
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding how a token goes from concept to a live, traded asset
            helps you evaluate projects and understand market dynamics:
          </p>
          <ol className="ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Design</strong>: Define the
              purpose, supply, distribution, and tokenomics model. Decide which
              standard to use (ERC-20, ERC-721, or ERC-1155).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Development</strong>: Write and
              audit the smart contract. Test extensively on testnets.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Deployment</strong>: Deploy the
              contract to mainnet and verify the source code on Etherscan.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Distribution</strong>: Distribute
              tokens through airdrops, liquidity mining, sales, or grants.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Listing</strong>: Add liquidity
              on decentralized exchanges (Uniswap) or get listed on centralized
              exchanges. This is when the token becomes freely tradable.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Governance</strong>: For
              governance tokens, activate voting and proposal systems. The
              community begins steering protocol decisions.
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
              What is the difference between a token and a coin?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A coin (like ETH or BTC) is the native currency of its own
              blockchain, used to pay transaction fees and secure the network.
              A token is built on top of an existing blockchain using a smart
              contract. For example, USDC is a token built on Ethereum, while
              ETH is Ethereum&apos;s native coin. Coins have their own
              blockchain; tokens ride on someone else&apos;s.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How do I create my own token?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              To create a basic ERC-20 token on Ethereum, you deploy a smart
              contract that implements the ERC-20 interface. Using
              OpenZeppelin&apos;s library, this can be done in under 20 lines
              of Solidity code. You will need a wallet with ETH for gas fees
              and a development tool like Hardhat or Foundry.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are all crypto tokens securities?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Not all tokens are securities. The classification depends on the
              token&apos;s characteristics and how it is marketed. Utility tokens
              that provide access to a service are generally not securities.
              Tokens sold as investments with expected profits from others&apos;
              efforts may be classified as securities under the Howey Test.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What makes a token valuable?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Token value comes from utility (what you can do with it), scarcity
              (supply limits and burn mechanisms), demand (number of users and
              use cases), and tokenomics (distribution, vesting, inflation
              rate). A token used to pay for a popular service with limited
              supply and strong demand will command higher value.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is a soulbound token (SBT)?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A soulbound token is a non-transferable NFT permanently tied to a
              wallet address. Once received, it cannot be sold or transferred.
              SBTs are used for credentials, certifications, reputation scores,
              and identity verification. The concept was popularized by Vitalik
              Buterin in 2022.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Work with Token Contracts
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Decode token transactions with our{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>
            , encode ERC-20 function calls with the{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>
            , or convert token amounts with the{" "}
            <Link
              href="/crypto/wei-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Wei Converter
            </Link>
            .
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
                href="/guides/what-is-erc20"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is ERC-20?
              </Link>{" "}
              &mdash; Deep dive into the fungible token standard
            </li>
            <li>
              <Link
                href="/guides/what-is-erc721"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is ERC-721?
              </Link>{" "}
              &mdash; The non-fungible token standard for unique assets
            </li>
            <li>
              <Link
                href="/guides/what-is-erc1155"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is ERC-1155?
              </Link>{" "}
              &mdash; The multi-token standard for gaming and editions
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; The foundation that makes tokens possible
            </li>
            <li>
              <Link
                href="/crypto/wei-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Wei Converter
              </Link>{" "}
              &mdash; Convert between ETH denominations and token amounts
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
