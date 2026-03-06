import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is ERC-20? The Complete Token Standard Guide | EVMTools",
  description:
    "Learn what ERC-20 tokens are, how the standard works, the 6 required functions, transfer patterns, popular tokens, and common vulnerabilities.",
  keywords: [
    "erc20",
    "erc-20 token",
    "what is erc20",
    "ethereum token standard",
    "erc20 contract",
    "erc20 functions",
    "fungible token",
    "erc20 solidity",
    "erc20 transfer",
    "erc20 approve",
  ],
  openGraph: {
    title: "What is ERC-20? The Complete Token Standard Guide | EVMTools",
    description:
      "Learn what ERC-20 tokens are, how the standard works, the 6 required functions, transfer patterns, popular tokens, and common vulnerabilities.",
    url: `${SITE_URL}/guides/what-is-erc20`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is ERC-20? The Complete Token Standard Guide",
    description:
      "Learn what ERC-20 tokens are, how the standard works, the 6 required functions, transfer patterns, popular tokens, and common vulnerabilities.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-erc20`,
  },
};

export default function WhatIsERC20Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is ERC-20? The Complete Token Standard Guide",
    description:
      "Learn what ERC-20 tokens are, how the standard works, the 6 required functions, transfer patterns, popular tokens, and common vulnerabilities.",
    url: `${SITE_URL}/guides/what-is-erc20`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-erc20`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What makes a token ERC-20 compliant?",
      answer:
        "A token is ERC-20 compliant if its smart contract implements all six required functions (totalSupply, balanceOf, transfer, allowance, approve, transferFrom) and two required events (Transfer, Approval) as defined in EIP-20. Optional functions like name, symbol, and decimals are also commonly implemented.",
    },
    {
      question: "Who created the ERC-20 standard?",
      answer:
        "The ERC-20 standard was proposed by Fabian Vogelsteller and Vitalik Buterin in November 2015 as EIP-20. It was formally accepted in September 2017 and has since become the most widely adopted token standard on Ethereum.",
    },
    {
      question: "Can anyone create their own ERC-20 token?",
      answer:
        "Yes. Anyone can deploy an ERC-20 token contract on Ethereum. You write a Solidity contract that implements the ERC-20 interface, compile it, and deploy it to the network. Libraries like OpenZeppelin provide audited base implementations you can extend.",
    },
    {
      question:
        "What is the difference between ERC-20 tokens and native ETH?",
      answer:
        "Native ETH is the base currency of the Ethereum network, built into the protocol itself. ERC-20 tokens are smart contracts that run on top of Ethereum. ETH transfers use a simple value transfer, while ERC-20 transfers require calling the transfer() function on the token contract. ETH does not conform to the ERC-20 interface, which is why Wrapped ETH (WETH) exists.",
    },
    {
      question: "What is the approve and transferFrom pattern?",
      answer:
        "The approve/transferFrom pattern allows a third party (like a DEX or smart contract) to spend tokens on your behalf. You first call approve() to grant an allowance, then the third party calls transferFrom() to move tokens from your address. This two-step pattern is necessary because smart contracts cannot pull tokens directly from your wallet without permission.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-erc20">
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
            ERC-20 is the technical standard that defines how fungible tokens
            work on the Ethereum blockchain. If you have ever traded USDT,
            USDC, LINK, or UNI, you have interacted with an ERC-20 token. This
            guide explains exactly what ERC-20 is, how its functions work
            under the hood, and why it became the foundation of the entire
            Ethereum token ecosystem.
          </p>
        </section>

        {/* What is ERC-20 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is ERC-20?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-20 stands for{" "}
            <strong className="text-gray-900 dark:text-white">
              Ethereum Request for Comments 20
            </strong>
            . It is a standard interface for fungible tokens &mdash; tokens
            where every unit is identical and interchangeable, just like
            dollars in a bank account. Proposed by Fabian Vogelsteller and
            Vitalik Buterin in November 2015 (EIP-20), it defines a common
            set of functions and events that all token contracts must
            implement.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before ERC-20, every token contract had its own unique interface.
            Wallets, exchanges, and other <Link href="/guides/what-is-smart-contract" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">smart contracts</Link> had
            to write custom code for each token. ERC-20 solved this by
            creating a universal API: any wallet or application that supports
            ERC-20 can automatically work with any ERC-20 token, whether it
            was deployed yesterday or five years ago.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Today, there are hundreds of thousands of ERC-20 tokens deployed
            on Ethereum, representing everything from stablecoins to
            governance tokens to utility tokens. The standard has also been
            adopted by every EVM-compatible chain, including Polygon, Arbitrum,
            Optimism, BSC, and Avalanche.
          </p>
        </section>

        {/* The 6 Required Functions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The 6 Required Functions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every ERC-20 token contract must implement the following six
            functions. These form the core interface that wallets, DEXs, and
            other contracts rely on.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. totalSupply()
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Returns the total number of tokens in existence. This includes all
            minted tokens minus any that have been burned.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function totalSupply() external view returns (uint256);`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. balanceOf(address)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Returns the token balance of a specific address. This is the most
            frequently called function on any ERC-20 contract.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function balanceOf(address account) external view returns (uint256);`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. transfer(address, uint256)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Moves tokens from the caller&apos;s address to the recipient. Returns
            a boolean indicating success. This is the function called when you
            send tokens directly from your wallet.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function transfer(address to, uint256 amount) external returns (bool);`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. allowance(address, address)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Returns the remaining number of tokens that a spender is allowed to
            spend on behalf of the owner. This value changes when{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              approve()
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              transferFrom()
            </code>{" "}
            is called.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function allowance(address owner, address spender) external view returns (uint256);`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. approve(address, uint256)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Grants a spender permission to withdraw up to a specified amount of
            tokens from the caller&apos;s account. This is the first step of the
            approve/transferFrom pattern used by DEXs and <Link href="/guides/what-is-defi" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">DeFi protocols</Link>.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function approve(address spender, uint256 amount) external returns (bool);`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            6. transferFrom(address, address, uint256)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Moves tokens from one address to another using the allowance
            mechanism. The caller must have been previously approved to spend
            at least the specified amount. This is used by smart contracts
            (like Uniswap) to pull tokens from your wallet after you approve.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function transferFrom(address from, address to, uint256 amount) external returns (bool);`}</code>
          </pre>
        </section>

        {/* The 2 Required Events */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The 2 Required Events
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-20 contracts must emit these events so that off-chain
            applications (wallets, block explorers, indexers) can track token
            movements.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transfer Event
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Emitted whenever tokens are moved, including minting (from the zero
            address) and burning (to the zero address).
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`event Transfer(address indexed from, address indexed to, uint256 value);`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Approval Event
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Emitted whenever{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              approve()
            </code>{" "}
            is called, indicating that an owner has authorized a spender to
            use a certain amount of tokens.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`event Approval(address indexed owner, address indexed spender, uint256 value);`}</code>
          </pre>
        </section>

        {/* Optional Functions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Optional Functions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            While not required by the standard, virtually all ERC-20 tokens
            implement these three additional functions:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`function name() external view returns (string);       // e.g., "USD Coin"
function symbol() external view returns (string);     // e.g., "USDC"
function decimals() external view returns (uint8);    // e.g., 6 or 18`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              decimals
            </code>{" "}
            function is especially important. Since Solidity does not support
            floating-point numbers, token amounts are stored as integers. A
            token with 18 decimals stores 1.0 token as{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              1000000000000000000
            </code>{" "}
            (10^18). USDC uses 6 decimals, so 1.0 USDC is stored as{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              1000000
            </code>
            .
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* How Token Transfers Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Token Transfers Work
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            There are two ways to transfer ERC-20 tokens, and understanding
            the difference is critical for working with DeFi protocols.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Direct Transfer
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The simplest method. You call{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              transfer(to, amount)
            </code>{" "}
            directly on the token contract. This is what happens when you send
            tokens from your wallet to another address.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Alice sends 100 USDC to Bob
// Alice calls: usdc.transfer(bob, 100_000_000)  // 100 * 10^6
// Flow: Alice -> Bob (direct)`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Approve + TransferFrom Pattern
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This two-step pattern is used when a smart contract needs to pull
            tokens from your wallet. For example, when you swap tokens on
            Uniswap:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Step 1 &mdash; Approve</strong>: You
              call{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                approve(uniswapRouter, amount)
              </code>{" "}
              on the token contract, granting the Uniswap router permission
              to spend your tokens.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Step 2 &mdash; TransferFrom</strong>:
              The Uniswap router calls{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                transferFrom(you, pool, amount)
              </code>{" "}
              to move tokens from your wallet into the liquidity pool.
            </li>
          </ol>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Step 1: Alice approves Uniswap Router to spend her USDC
usdc.approve(uniswapRouter, 100_000_000);

// Step 2: Uniswap Router pulls USDC from Alice to the pool
usdc.transferFrom(alice, pool, 100_000_000);`}</code>
          </pre>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Security tip:</strong> Avoid approving unlimited amounts
              (type(uint256).max) unless you trust the contract completely. If
              the contract is compromised, the attacker can drain all your
              approved tokens. Use exact amounts when possible.
            </p>
          </div>
        </section>

        {/* Complete Solidity Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Complete ERC-20 Contract Example
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a minimal but complete ERC-20 implementation in Solidity.
            In production, you would use OpenZeppelin&apos;s battle-tested
            implementation, but this shows the core logic:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleToken {
    string public name = "SimpleToken";
    string public symbol = "SIM";
    uint8  public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}`}</code>
          </pre>
        </section>

        {/* Popular ERC-20 Tokens */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Popular ERC-20 Tokens
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The following table lists some of the most widely used ERC-20 tokens
            on Ethereum mainnet:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Token
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Symbol
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Decimals
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Contract Address
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Tether USD</td>
                  <td className="px-4 py-3">USDT</td>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0xdAC17F958D2ee523a2206206994597C13D831ec7
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">USD Coin</td>
                  <td className="px-4 py-3">USDC</td>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Chainlink</td>
                  <td className="px-4 py-3">LINK</td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0x514910771AF9Ca656af840dff83E8264EcF986CA
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Uniswap</td>
                  <td className="px-4 py-3">UNI</td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Wrapped ETH</td>
                  <td className="px-4 py-3">WETH</td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Dai Stablecoin</td>
                  <td className="px-4 py-3">DAI</td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0x6B175474E89094C44Da98b954EedeAC495271d0F
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Aave</td>
                  <td className="px-4 py-3">AAVE</td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Notice that USDT and USDC use 6 decimals while most other tokens
            use 18. This is a common source of bugs when developers assume all
            tokens have 18 decimals. Always check the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              decimals()
            </code>{" "}
            value before performing arithmetic.
          </p>
        </section>

        {/* Common Vulnerabilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Common Vulnerabilities
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-20 tokens have been the target of numerous exploits. Here are
            the most common vulnerability patterns to watch for:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Approval Race Condition
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If Alice has approved Bob to spend 100 tokens and wants to change
            the allowance to 50, Bob can front-run the second{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              approve()
            </code>{" "}
            call. He spends the original 100, then the new approval sets 50,
            letting him spend 150 total. The mitigation is to first set the
            allowance to 0, then set it to the new value, or use{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              increaseAllowance/decreaseAllowance
            </code>{" "}
            (not part of the standard but widely supported).
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Reentrancy via Token Callbacks
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some token standards (like ERC-777, which is backward-compatible
            with ERC-20) include callback hooks that execute code on the
            recipient. If a contract does not follow the checks-effects-
            interactions pattern, an attacker can re-enter the function during
            a token transfer. Always update state before making external calls.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Missing Return Value
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some older tokens (notably USDT) do not return a boolean from{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              transfer()
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              transferFrom()
            </code>
            . This can cause contracts that check the return value to revert.
            Use OpenZeppelin&apos;s{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              SafeERC20
            </code>{" "}
            library to handle these edge cases safely.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Fee-on-Transfer Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some tokens deduct a fee on every transfer, meaning the recipient
            receives less than the amount sent. Contracts that assume{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              balanceOf(to)
            </code>{" "}
            increases by exactly{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              amount
            </code>{" "}
            after a transfer will miscalculate balances.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* ERC-20 vs ERC-721 vs ERC-1155 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ERC-20 vs ERC-721 vs ERC-1155
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum has multiple token standards for different use cases.
            Read our <Link href="/guides/what-is-erc721" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">complete guide to ERC-721</Link> for
            an in-depth look at the NFT standard. Here is how the three main standards compare:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ERC-20
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ERC-721
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    ERC-1155
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Token type</td>
                  <td className="px-4 py-3">Fungible</td>
                  <td className="px-4 py-3">Non-fungible</td>
                  <td className="px-4 py-3">Both</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Each token unique?</td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3">Yes (unique ID)</td>
                  <td className="px-4 py-3">Optional</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Decimal support</td>
                  <td className="px-4 py-3">Yes (0-18)</td>
                  <td className="px-4 py-3">No (whole units)</td>
                  <td className="px-4 py-3">No (whole units)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Batch transfer</td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3">Yes</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Use cases</td>
                  <td className="px-4 py-3">Currencies, stablecoins, governance</td>
                  <td className="px-4 py-3">Art, collectibles, identity</td>
                  <td className="px-4 py-3">Gaming items, mixed collections</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Gas efficiency</td>
                  <td className="px-4 py-3">Good</td>
                  <td className="px-4 py-3">Moderate</td>
                  <td className="px-4 py-3">Best (batch ops)</td>
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
              What makes a token ERC-20 compliant?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A token is ERC-20 compliant if its smart contract implements all
              six required functions (totalSupply, balanceOf, transfer,
              allowance, approve, transferFrom) and two required events
              (Transfer, Approval) as defined in EIP-20. Optional functions
              like name, symbol, and decimals are also commonly implemented
              but not strictly required.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Who created the ERC-20 standard?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The ERC-20 standard was proposed by Fabian Vogelsteller and
              Vitalik Buterin in November 2015 as EIP-20. It was formally
              accepted in September 2017 and has since become the most widely
              adopted token standard on Ethereum.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can anyone create their own ERC-20 token?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes. Anyone can deploy an ERC-20 token contract on Ethereum. You
              write a Solidity contract that implements the ERC-20 interface,
              compile it, and deploy it to the network. Libraries like
              OpenZeppelin provide audited base implementations you can extend.
              The cost of deployment is the gas fee for the transaction,
              typically a few dollars worth of ETH.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between ERC-20 tokens and native ETH?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Native ETH is the base currency of the Ethereum network, built
              into the protocol itself. ERC-20 tokens are smart contracts that
              run on top of Ethereum. ETH transfers use a simple value
              transfer, while ERC-20 transfers require calling the transfer()
              function on the token contract. ETH does not conform to the
              ERC-20 interface, which is why Wrapped ETH (WETH) exists as an
              ERC-20 representation of ETH.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the approve and transferFrom pattern?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The approve/transferFrom pattern allows a third party (like a DEX
              or smart contract) to spend tokens on your behalf. You first call
              approve() to grant an allowance, then the third party calls
              transferFrom() to move tokens from your address. This two-step
              pattern is necessary because smart contracts cannot pull tokens
              directly from your wallet without explicit permission.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Want to decode ERC-20 token data? Use our free{" "}
            <Link
              href="/crypto/erc20-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-20 Token Decoder
            </Link>{" "}
            to inspect token names, symbols, decimals, and balances. Or try the{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder
            </Link>{" "}
            to encode and decode ERC-20 function calls.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/crypto/erc20-decoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ERC-20 Token Info Decoder
              </Link>{" "}
              &mdash; Decode token name, symbol, decimals, and balances
            </li>
            <li>
              <Link
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder / Decoder
              </Link>{" "}
              &mdash; Encode and decode smart contract function calls
            </li>
            <li>
              <Link
                href="/crypto/calldata-decoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Calldata Decoder
              </Link>{" "}
              &mdash; Decode raw transaction calldata into readable parameters
            </li>
            <li>
              <Link
                href="/crypto/checksum-address"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Checksum Address Converter
              </Link>{" "}
              &mdash; Convert Ethereum addresses to EIP-55 format
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
