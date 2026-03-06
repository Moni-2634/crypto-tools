import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is a Smart Contract? A Beginner's Guide | EVMTools",
  description:
    "Learn what smart contracts are, how they work on Ethereum, the lifecycle from writing to deployment, Solidity basics, real-world use cases, and security considerations.",
  keywords: [
    "smart contract",
    "what is a smart contract",
    "ethereum smart contract",
    "solidity",
    "smart contract explained",
    "blockchain contract",
    "smart contract deployment",
    "smart contract security",
    "evm",
    "decentralized application",
  ],
  openGraph: {
    title: "What is a Smart Contract? A Beginner's Guide | EVMTools",
    description:
      "Learn what smart contracts are, how they work on Ethereum, the lifecycle from writing to deployment, Solidity basics, real-world use cases, and security considerations.",
    url: `${SITE_URL}/guides/what-is-smart-contract`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Smart Contract? A Beginner's Guide",
    description:
      "Learn what smart contracts are, how they work on Ethereum, the lifecycle from writing to deployment, Solidity basics, real-world use cases, and security considerations.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-smart-contract`,
  },
};

export default function WhatIsSmartContractPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Smart Contract? A Beginner's Guide",
    description:
      "Learn what smart contracts are, how they work on Ethereum, the lifecycle from writing to deployment, Solidity basics, real-world use cases, and security considerations.",
    url: `${SITE_URL}/guides/what-is-smart-contract`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-smart-contract`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Can a smart contract be changed after deployment?",
      answer:
        "Standard smart contracts are immutable once deployed. The bytecode on the blockchain cannot be modified. However, developers can use proxy patterns (like UUPS or Transparent Proxy) to create upgradeable contracts, where the logic can be swapped while preserving the contract's address and state. This adds complexity and trust assumptions.",
    },
    {
      question: "How much does it cost to deploy a smart contract?",
      answer:
        "Deployment cost depends on the contract size (bytecode length) and network gas prices. On Ethereum mainnet, deploying a simple contract might cost $10-50, while complex contracts like Uniswap V3 can cost hundreds of dollars. Layer 2 networks like Arbitrum and Optimism reduce costs by 10-100x.",
    },
    {
      question: "What programming language are smart contracts written in?",
      answer:
        "The most popular language is Solidity, used by the vast majority of Ethereum smart contracts. Vyper is an alternative that prioritizes simplicity and security. Huff is a low-level language for maximum gas optimization. All compile to EVM bytecode, which is what actually runs on the blockchain.",
    },
    {
      question: "Are smart contracts legally binding?",
      answer:
        "Smart contracts are not legal contracts in the traditional sense. They are self-executing programs, not legal agreements. However, some jurisdictions are beginning to recognize smart contracts as enforceable agreements, and they can be used alongside traditional legal contracts to automate enforcement of agreed-upon terms.",
    },
    {
      question: "What happens if there is a bug in a smart contract?",
      answer:
        "Because smart contracts are immutable, bugs cannot be patched like traditional software. If a vulnerability is exploited, funds can be permanently lost. This is why security audits, formal verification, extensive testing, and bug bounty programs are critical before deploying contracts that handle significant value.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-smart-contract">
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
            A smart contract is a program that runs on a blockchain. Once
            deployed, it executes exactly as written &mdash; no one can alter
            it, censor it, or shut it down. Smart contracts power everything
            from decentralized exchanges and lending protocols to NFTs and
            DAOs. This guide explains what smart contracts are, how they
            work, and how to build and interact with them.
          </p>
        </section>

        {/* What is a Smart Contract */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a Smart Contract?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A{" "}
            <strong className="text-gray-900 dark:text-white">
              smart contract
            </strong>{" "}
            is self-executing code stored on a blockchain that automatically
            enforces the terms of an agreement. Think of it as a vending
            machine: you insert the right input (coins + selection), and it
            automatically produces the output (your snack). No human
            intermediary is needed.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In technical terms, a smart contract is a program deployed at a
            specific address on the blockchain. It has its own storage
            (persistent state), can hold ETH and tokens, and exposes
            functions that anyone can call by sending a transaction. The
            code is executed by every node in the network, and the results
            are verified through consensus.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Key properties of smart contracts:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Immutable</strong>: Once deployed,
              the code cannot be changed (unless using proxy patterns).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Deterministic</strong>: Given the
              same input and state, the output is always identical.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Transparent</strong>: The code is
              publicly visible and verifiable by anyone.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Trustless</strong>: No central
              authority controls execution; the blockchain enforces the rules.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Composable</strong>: Contracts can
              call other contracts, enabling complex applications built from
              simple building blocks.
            </li>
          </ul>
        </section>

        {/* History */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            A Brief History
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The concept of smart contracts was first described by computer
            scientist and cryptographer{" "}
            <strong className="text-gray-900 dark:text-white">Nick Szabo</strong>{" "}
            in 1994. Szabo envisioned digital protocols that could
            automatically execute the terms of a contract, reducing the need
            for trusted intermediaries.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            However, Szabo&apos;s vision could not be fully realized until
            blockchain technology provided a decentralized, tamper-proof
            execution environment. Bitcoin (2009) introduced limited scripting
            capabilities, but it was{" "}
            <strong className="text-gray-900 dark:text-white">Ethereum</strong>{" "}
            (2015), created by Vitalik Buterin, that brought Turing-complete
            smart contracts to life. Ethereum&apos;s{" "}
            <strong className="text-gray-900 dark:text-white">
              Ethereum Virtual Machine (EVM)
            </strong>{" "}
            can execute arbitrary programs, making it a &quot;world computer&quot;
            capable of running any logic.
          </p>
        </section>

        {/* How They Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Smart Contracts Work
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Under the hood, smart contracts work through a cycle of
            compilation, deployment, and interaction:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Write the Code
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Developers write smart contract logic in a high-level language
            (usually Solidity). The code defines state variables (storage),
            functions (logic), and events (logs).
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Compile to Bytecode
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Solidity compiler (solc) converts the source code into EVM
            bytecode &mdash; the low-level instruction set that the Ethereum
            Virtual Machine understands. The compiler also generates the ABI
            (Application Binary Interface), which describes the contract&apos;s
            functions and how to encode/decode calls.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Solidity Source Code (.sol)
    |
    v  [solc compiler]
    |
    +-- Bytecode (deployed on-chain)
    +-- ABI (JSON interface for interaction)`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Deploy to the Blockchain
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Deployment is a special transaction with no &quot;to&quot; address. The
            transaction data contains the contract bytecode and any
            constructor arguments. When processed, the EVM creates a new
            contract account at a deterministic address and stores the
            bytecode.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Interact via Transactions
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Users and other contracts interact by sending transactions to
            the contract&apos;s address. The transaction includes calldata that
            specifies which function to call and what arguments to pass.
            The EVM executes the function, updates state, emits events,
            and returns results.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Transaction Calldata:
0xa9059cbb                                                         <- function selector
0000000000000000000000001234567890abcdef1234567890abcdef12345678     <- address parameter
0000000000000000000000000000000000000000000000000000000000000064     <- uint256 parameter (100)

This calls: transfer(0x1234...5678, 100)`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Smart Contract Languages */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Smart Contract Languages
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Several programming languages can be used to write smart
            contracts for the EVM:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Language
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Style
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Use Case
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Adoption
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Solidity</td>
                  <td className="px-4 py-3">C++/JavaScript-like</td>
                  <td className="px-4 py-3">General purpose</td>
                  <td className="px-4 py-3">~90% of contracts</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Vyper</td>
                  <td className="px-4 py-3">Python-like</td>
                  <td className="px-4 py-3">Security-focused</td>
                  <td className="px-4 py-3">~5% of contracts</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Huff</td>
                  <td className="px-4 py-3">Assembly-like</td>
                  <td className="px-4 py-3">Gas optimization</td>
                  <td className="px-4 py-3">Niche</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Yul</td>
                  <td className="px-4 py-3">Intermediate language</td>
                  <td className="px-4 py-3">Inline assembly in Solidity</td>
                  <td className="px-4 py-3">Used within Solidity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Simple Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            A Simple Smart Contract
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a basic Solidity smart contract that stores and retrieves
            a number. It demonstrates the essential components of every
            contract:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title SimpleStorage - A minimal smart contract example
contract SimpleStorage {
    // State variable - stored permanently on the blockchain
    uint256 private storedValue;

    // Event - emitted when the value changes (for off-chain tracking)
    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Write function - costs gas (modifies state)
    function set(uint256 newValue) external {
        uint256 oldValue = storedValue;
        storedValue = newValue;
        emit ValueChanged(oldValue, newValue);
    }

    // Read function - free to call (does not modify state)
    function get() external view returns (uint256) {
        return storedValue;
    }
}`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This contract has three key elements:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">State variable</strong>{" "}
              (<code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                storedValue
              </code>): Persistent data stored on the blockchain.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Event</strong>{" "}
              (<code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                ValueChanged
              </code>): A log entry that off-chain applications can listen to.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Functions</strong>{" "}
              (<code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                set
              </code> and{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                get
              </code>): Entry points for interaction. Write functions cost
              gas; read functions are free.
            </li>
          </ul>
        </section>

        {/* Interacting with Contracts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Interacting with Smart Contracts
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Developers interact with smart contracts through JavaScript
            libraries. The two most popular are ethers.js and viem:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Using ethers.js v6
import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contract = new ethers.Contract(
  '0xContractAddress...',
  ['function set(uint256)', 'function get() view returns (uint256)'],
  signer
);

// Read (free - no gas)
const value = await contract.get();
console.log('Current value:', value);

// Write (costs gas)
const tx = await contract.set(42);
await tx.wait();
console.log('Value updated!');`}</code>
          </pre>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Using viem
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Read a contract value
const value = await client.readContract({
  address: '0xContractAddress...',
  abi: contractABI,
  functionName: 'get',
});`}</code>
          </pre>
        </section>

        {/* Real-World Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Real-World Use Cases
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart contracts enable a wide range of applications that were
            previously impossible without trusted intermediaries:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Decentralized Finance (DeFi)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart contracts power lending protocols (Aave, Compound),
            decentralized exchanges (Uniswap, Curve), and stablecoins (DAI).
            They replace banks, brokers, and clearinghouses with transparent,
            auditable code.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            NFTs and Digital Ownership
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-721 and ERC-1155 smart contracts enable verifiable ownership
            of unique digital assets, from art and music to real estate deeds
            and academic credentials.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            DAOs (Decentralized Autonomous Organizations)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart contracts enable governance systems where token holders
            vote on proposals that are automatically executed when approved.
            No board of directors or legal entity is required.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gaming and Metaverse
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In-game items, characters, and currencies can be represented as
            tokens on the blockchain, giving players true ownership of their
            digital assets that can be traded or used across games.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Supply Chain and Identity
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart contracts can track goods from manufacturer to consumer,
            verify product authenticity, and manage digital identity
            credentials without centralized authorities.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Gas Costs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gas Costs and Optimization
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every operation in a smart contract costs gas. Understanding gas
            is essential for writing efficient contracts:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Operation
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Gas Cost
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Addition/Subtraction</td>
                  <td className="px-4 py-3">3 gas</td>
                  <td className="px-4 py-3">Cheapest operations</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Keccak256</td>
                  <td className="px-4 py-3">30 + 6/word</td>
                  <td className="px-4 py-3">Common for hashing</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Storage read (cold)</td>
                  <td className="px-4 py-3">2,100 gas</td>
                  <td className="px-4 py-3">First read of a slot</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Storage write (new)</td>
                  <td className="px-4 py-3">20,000 gas</td>
                  <td className="px-4 py-3">Most expensive operation</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">ETH transfer</td>
                  <td className="px-4 py-3">21,000 gas</td>
                  <td className="px-4 py-3">Base transaction cost</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Contract deployment</td>
                  <td className="px-4 py-3">32,000 + bytecode</td>
                  <td className="px-4 py-3">200 gas per byte</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Common optimization techniques include packing multiple variables
            into single storage slots, using{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              calldata
            </code>{" "}
            instead of{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              memory
            </code>{" "}
            for read-only function parameters, minimizing storage writes, and
            using events instead of storage for data that only needs to be
            read off-chain. Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to estimate costs.
          </p>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Security Considerations
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Smart contract security is critical because bugs can lead to
            permanent loss of funds. Billions of dollars have been lost to
            smart contract exploits. Here are the key areas to consider:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Reentrancy attacks</strong>: When a
              contract makes an external call before updating its state, the
              called contract can re-enter the original function. The infamous
              DAO hack (2016) exploited this, leading to the Ethereum/Ethereum
              Classic fork.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Integer overflow/underflow</strong>:
              Before Solidity 0.8.0, arithmetic could silently wrap around.
              Solidity 0.8+ includes built-in overflow checks.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Access control</strong>: Ensure that
              sensitive functions (like minting, pausing, or upgrading) can
              only be called by authorized addresses.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Oracle manipulation</strong>:
              Contracts that rely on external price feeds can be exploited if
              the oracle data is manipulated (common in flash loan attacks).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Front-running</strong>: Miners and
              MEV bots can see pending transactions and insert their own
              transactions before or after yours to extract profit.
            </li>
          </ul>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Best practices:</strong> Always have your contracts
              audited by reputable firms before deploying with significant
              funds. Use established libraries like OpenZeppelin. Write
              comprehensive tests. Consider formal verification for critical
              contracts. Run a bug bounty program.
            </p>
          </div>
        </section>

        {/* Development Tools */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Development Tools and Frameworks
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The smart contract development ecosystem has mature tooling:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Foundry</strong>: A fast,
              Rust-based framework for compiling, testing, and deploying
              Solidity contracts. Tests are written in Solidity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Hardhat</strong>: A JavaScript-based
              development environment with extensive plugin ecosystem. Tests
              are written in JavaScript/TypeScript.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Remix IDE</strong>: A browser-based
              IDE ideal for learning and quick prototyping. No installation
              required.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">OpenZeppelin</strong>: A library of
              audited, reusable smart contract components (ERC-20, ERC-721,
              access control, etc.).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Tenderly</strong>: A debugging and
              monitoring platform that provides transaction simulation,
              gas profiling, and alerting.
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
              Can a smart contract be changed after deployment?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Standard smart contracts are immutable once deployed. The
              bytecode on the blockchain cannot be modified. However,
              developers can use proxy patterns (like UUPS or Transparent
              Proxy) to create upgradeable contracts, where the logic can be
              swapped while preserving the contract&apos;s address and state.
              This adds complexity and trust assumptions.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much does it cost to deploy a smart contract?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Deployment cost depends on the contract size (bytecode length)
              and network gas prices. On Ethereum mainnet, deploying a simple
              contract might cost $10-50, while complex contracts can cost
              hundreds of dollars. Layer 2 networks like Arbitrum and Optimism
              reduce costs by 10-100x.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What programming language are smart contracts written in?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The most popular language is Solidity, used by the vast majority
              of Ethereum smart contracts. Vyper is an alternative that
              prioritizes simplicity and security. Huff is a low-level
              language for maximum gas optimization. All compile to EVM
              bytecode, which is what actually runs on the blockchain.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are smart contracts legally binding?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Smart contracts are not legal contracts in the traditional
              sense. They are self-executing programs, not legal agreements.
              However, some jurisdictions are beginning to recognize smart
              contracts as enforceable agreements, and they can be used
              alongside traditional legal contracts to automate enforcement.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What happens if there is a bug in a smart contract?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Because smart contracts are immutable, bugs cannot be patched
              like traditional software. If a vulnerability is exploited,
              funds can be permanently lost. This is why security audits,
              formal verification, extensive testing, and bug bounty programs
              are critical before deploying contracts that handle significant
              value.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Ready to work with smart contract data? Use our{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>{" "}
            to encode function calls, or compute function selectors with the{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>
            .
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
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder / Decoder
              </Link>{" "}
              &mdash; Encode and decode smart contract function calls
            </li>
            <li>
              <Link
                href="/crypto/keccak256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Keccak256 Hash Generator
              </Link>{" "}
              &mdash; Compute Keccak256 hashes and function selectors
            </li>
            <li>
              <Link
                href="/crypto/calldata-decoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Calldata Decoder
              </Link>{" "}
              &mdash; Decode raw transaction calldata
            </li>
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate Ethereum transaction costs
            </li>
            <li>
              <Link
                href="/crypto/storage-slot-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Storage Slot Calculator
              </Link>{" "}
              &mdash; Calculate storage layout for smart contracts
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
