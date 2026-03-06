import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "How to Read Etherscan: A Complete Tutorial | EVMTools",
  description:
    "Learn how to read Etherscan like a pro. Understand transactions, contract data, event logs, token transfers, and how to use the blockchain explorer for research and debugging.",
  keywords: [
    "etherscan",
    "how to read etherscan",
    "blockchain explorer",
    "ethereum explorer",
    "etherscan tutorial",
    "read transaction etherscan",
    "etherscan contract",
    "etherscan events",
    "etherscan api",
    "block explorer",
  ],
  openGraph: {
    title: "How to Read Etherscan: A Complete Tutorial | EVMTools",
    description:
      "Learn how to read Etherscan like a pro. Understand transactions, contract data, event logs, token transfers, and how to use the blockchain explorer for research and debugging.",
    url: `${SITE_URL}/guides/how-to-read-etherscan`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Read Etherscan: A Complete Tutorial",
    description:
      "Learn how to read Etherscan like a pro. Understand transactions, contract data, event logs, token transfers, and how to use the blockchain explorer for research and debugging.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-read-etherscan`,
  },
};

export default function HowToReadEtherscanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Read Etherscan: A Complete Tutorial",
    description:
      "Learn how to read Etherscan like a pro. Understand transactions, contract data, event logs, token transfers, and how to use the blockchain explorer for research and debugging.",
    url: `${SITE_URL}/guides/how-to-read-etherscan`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/how-to-read-etherscan`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is Etherscan?",
      answer:
        "Etherscan is the most widely used blockchain explorer for Ethereum. It allows anyone to search and verify transactions, addresses, tokens, smart contracts, and other on-chain data. It provides a web interface for reading the public blockchain data without running your own node.",
    },
    {
      question: "Is Etherscan free to use?",
      answer:
        "Yes, Etherscan is free for basic usage including searching transactions, viewing contracts, and reading on-chain data. They also offer a free API tier with rate limits. Premium API plans are available for developers who need higher request limits.",
    },
    {
      question: "Can Etherscan see my wallet balance?",
      answer:
        "Yes. All Ethereum blockchain data is public, including wallet balances, transaction history, and token holdings. Etherscan simply provides a user-friendly interface to view this data. Anyone can look up any address. This is a fundamental property of public blockchains.",
    },
    {
      question: "What does 'verified contract' mean on Etherscan?",
      answer:
        "A verified contract means the developer has uploaded the original Solidity source code and it has been confirmed to produce the same bytecode as what is deployed on-chain. This allows anyone to read the source code, understand what the contract does, and interact with it through Etherscan's read/write interface.",
    },
    {
      question: "Are there Etherscan alternatives for other networks?",
      answer:
        "Yes. Etherscan operates explorers for multiple networks (Ethereum, Goerli, Sepolia, etc.). Alternative explorers include Blockscout (open source, used by many L2s), Tenderly (developer-focused with debugging tools), Arbiscan (for Arbitrum), Basescan (for Base), and Polygonscan (for Polygon).",
    },
  ]);

  return (
    <ToolLayout slug="how-to-read-etherscan">
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
            Etherscan is the most popular blockchain explorer for Ethereum.
            Whether you are debugging a failed transaction, researching a{" "}
            <Link href="/guides/what-is-smart-contract" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">smart contract</Link>,
            or tracking token transfers, knowing how to read Etherscan is an
            essential skill for anyone working in the Ethereum ecosystem. This guide walks you through every section
            of Etherscan, from basic transaction lookups to advanced event
            log analysis.
          </p>
        </section>

        {/* What is Etherscan */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Etherscan?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Etherscan (etherscan.io) is a{" "}
            <strong className="text-gray-900 dark:text-white">
              blockchain explorer
            </strong>{" "}
            &mdash; a web application that indexes and displays data from
            the Ethereum blockchain. Think of it as a search engine for the
            blockchain. Every transaction, every contract deployment, every
            token transfer is recorded on-chain and can be viewed through
            Etherscan.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Key capabilities of Etherscan:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Look up any transaction by its hash</li>
            <li>View any address&apos;s balance, transactions, and token holdings</li>
            <li>Read and interact with verified smart contracts</li>
            <li>Track token transfers and approvals</li>
            <li>Monitor gas prices and network activity</li>
            <li>Verify contract source code</li>
            <li>Access blockchain data via API</li>
          </ul>
        </section>

        {/* Reading a Transaction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reading a Transaction
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When you look up a transaction on Etherscan, you see a detailed
            page with multiple fields. Here is what each one means:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Basic Fields
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Field
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Transaction Hash</td>
                  <td className="px-4 py-3">
                    Unique 66-character identifier (0x + 64 hex chars). This
                    is the &quot;receipt&quot; for the transaction.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Status</td>
                  <td className="px-4 py-3">
                    Success (green checkmark) or Fail (red X). Failed
                    transactions still consume gas.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Block</td>
                  <td className="px-4 py-3">
                    The block number that includes this transaction. Higher
                    block numbers mean more confirmations.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">From</td>
                  <td className="px-4 py-3">
                    The sender&apos;s address. This is the account that signed
                    and paid for the transaction.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">To</td>
                  <td className="px-4 py-3">
                    The recipient address. For contract interactions, this
                    is the contract address. For deployments, this shows
                    &quot;Contract Creation&quot;.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Value</td>
                  <td className="px-4 py-3">
                    Amount of ETH sent with the transaction. Can be 0 for
                    pure contract interactions.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Input Data</td>
                  <td className="px-4 py-3">
                    The calldata sent to the contract. The first 4 bytes are
                    the function selector; the rest are encoded parameters.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gas Information
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Field
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Gas Limit</td>
                  <td className="px-4 py-3">
                    Maximum gas units the sender is willing to spend. Set
                    by the sender.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Gas Used</td>
                  <td className="px-4 py-3">
                    Actual gas consumed. Always less than or equal to gas
                    limit. Unused gas is refunded.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">Gas Price</td>
                  <td className="px-4 py-3">
                    Price per gas unit in Gwei. After{" "}
                    <Link href="/guides/eip-1559-explained" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">EIP-1559</Link>,
                    this shows the effective gas price (base fee + priority
                    fee).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Transaction Fee</td>
                  <td className="px-4 py-3">
                    Gas Used x Gas Price. The total ETH paid for the
                    transaction.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Understanding Input Data
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Input Data field contains the raw calldata. For contract
            interactions, it follows this format:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`0xa9059cbb  <- Function selector (first 4 bytes = keccak256("transfer(address,uint256)")[:4])
000000000000000000000000abcdef1234567890abcdef1234567890abcdef12  <- Parameter 1: address
0000000000000000000000000000000000000000000000000de0b6b3a7640000  <- Parameter 2: uint256 (1 ETH in wei)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If the contract is verified, Etherscan will decode this into
            human-readable form. If not, you can use our{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>{" "}
            to decode it manually.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Reading a Contract */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reading a Smart Contract
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When you navigate to a contract address on Etherscan, you will
            see several tabs that provide different views of the contract:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contract Tab
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If the contract is verified, you can view the full Solidity
            source code, compiler settings, and ABI. Verified contracts show
            a green checkmark. Key sections include:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Code</strong>: The verified
              Solidity source code. Read this to understand what the contract
              does.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">ABI</strong>: The JSON interface
              that describes all functions and events. Copy this to interact
              with the contract programmatically.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Creation Code</strong>: The
              bytecode used to deploy the contract, including constructor
              arguments.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Read Contract
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The &quot;Read Contract&quot; tab lists all view/pure functions that can
            be called without gas. You can query values like:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                name()
              </code>{" "}
              &mdash; Token name
            </li>
            <li>
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                symbol()
              </code>{" "}
              &mdash; Token symbol
            </li>
            <li>
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                totalSupply()
              </code>{" "}
              &mdash; Total tokens in existence
            </li>
            <li>
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                balanceOf(address)
              </code>{" "}
              &mdash; Token balance for an address
            </li>
            <li>
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                owner()
              </code>{" "}
              &mdash; Contract owner (if applicable)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Write Contract
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The &quot;Write Contract&quot; tab lists state-changing functions. You can
            connect your wallet (MetaMask, etc.) and execute functions like
            transfer, approve, mint, and more directly from the Etherscan
            interface. This requires gas and signing a transaction.
          </p>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Caution:</strong> Always verify the contract address and
              function before executing write operations through Etherscan.
              Phishing sites sometimes mimic Etherscan&apos;s interface to trick
              users into signing malicious transactions.
            </p>
          </div>
        </section>

        {/* Reading an Address */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reading an Address
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Looking up an address shows a wealth of information about that
            account:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Overview
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">ETH Balance</strong>: Current
              balance in ETH and its USD value.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Token Holdings</strong>: All ERC-20
              tokens held by the address with USD values.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">NFTs</strong>: Any ERC-721 or
              ERC-1155 tokens owned.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction Tabs
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Transactions</strong>: All
              standard external transactions (EOA to EOA or EOA to contract).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Internal Txns</strong>: Transactions
              triggered by smart contract execution (contract-to-contract
              calls). These are not separate transactions but sub-calls
              within a transaction.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Token Transfers (ERC-20)</strong>:
              All ERC-20 token transfers involving this address. Shows
              incoming and outgoing token movements.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">NFT Transfers</strong>: All ERC-721
              and ERC-1155 token transfers.
            </li>
          </ul>
        </section>

        {/* Understanding Event Logs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Understanding Event Logs
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Event logs are one of the most powerful features of Etherscan
            for developers. When a smart contract emits an event, it creates
            a log entry with topics and data:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Solidity event
event Transfer(address indexed from, address indexed to, uint256 value);

// Resulting log on Etherscan:
Topic 0: 0xddf252ad...  <- Event signature hash (keccak256 of event name + types)
Topic 1: 0x000...sender <- Indexed parameter: "from" address
Topic 2: 0x000...recipient <- Indexed parameter: "to" address
Data:    0x000...amount  <- Non-indexed parameter: "value"`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Key points about event logs:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Topic 0</strong> is always the
              Keccak256 hash of the event signature (unless the event is
              anonymous).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Indexed parameters</strong> appear
              as Topics 1, 2, and 3. You can filter logs by these values.
              Maximum of 3 indexed parameters.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Non-indexed parameters</strong>{" "}
              appear in the Data field, ABI-encoded together.
            </li>
            <li>
              Events are cheaper than storage writes, making them ideal for
              data that only needs to be read off-chain.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Use the{" "}
            <Link
              href="/crypto/event-hash-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Event Hash Calculator
            </Link>{" "}
            to compute event signature hashes, or the{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            to verify Topic 0 values.
          </p>
        </section>

        {/* Token Transfers and Approvals */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Token Transfers and Approvals
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Etherscan has dedicated tabs for tracking token movements,
            including{" "}
            <Link href="/guides/what-is-erc20" className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400">ERC-20 token</Link> transfers.
            This is essential for verifying that tokens arrived, checking
            approval status, and auditing token flows.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Reading a Token Transfer
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Each token transfer shows:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>The transaction hash that triggered the transfer</li>
            <li>From and To addresses</li>
            <li>Token name, symbol, and amount (with proper decimal formatting)</li>
            <li>Whether it was a direct transfer or triggered by another contract</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Checking Token Approvals
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            To see which contracts have permission to spend your tokens,
            look at Approval events in the Events tab. An Approval event
            with a large value (like{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              type(uint256).max
            </code>
            ) means you have granted unlimited spending permission. You can
            revoke approvals by calling{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              approve(spender, 0)
            </code>{" "}
            on the token contract.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Contract Verification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contract Verification
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Contract verification is the process of uploading the original
            source code to Etherscan and proving it compiles to the exact
            same bytecode deployed on-chain. Verified contracts are more
            trustworthy because anyone can read the source code and
            understand what the contract does.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            How to verify a contract:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Navigate to the contract address on Etherscan</li>
            <li>Click the &quot;Contract&quot; tab, then &quot;Verify and Publish&quot;</li>
            <li>Select the compiler version, optimization settings, and license</li>
            <li>Paste the source code (or upload via Standard JSON Input)</li>
            <li>If using constructor arguments, provide them in ABI-encoded form</li>
            <li>Submit for verification</li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most modern frameworks (Foundry, Hardhat) have built-in commands
            for Etherscan verification:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Foundry
forge verify-contract <address> <ContractName> --etherscan-api-key <key>

# Hardhat
npx hardhat verify --network mainnet <address> <constructor-args>`}</code>
          </pre>
        </section>

        {/* Advanced Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Etherscan Features
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gas Tracker
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Etherscan&apos;s Gas Tracker (etherscan.io/gastracker) shows real-time
            gas prices in three tiers (Low, Average, High) and estimated
            costs for common operations like ETH transfers, ERC-20 transfers,
            and Uniswap swaps. Use this to time your transactions for lower
            fees.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Etherscan API
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Etherscan API provides programmatic access to blockchain
            data. Common endpoints include:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Get ETH balance
GET /api?module=account&action=balance&address=0x...&apikey=KEY

// Get transaction list
GET /api?module=account&action=txlist&address=0x...&apikey=KEY

// Get ERC-20 token transfers
GET /api?module=account&action=tokentx&address=0x...&apikey=KEY

// Get contract ABI
GET /api?module=contract&action=getabi&address=0x...&apikey=KEY

// Get gas price
GET /api?module=gastracker&action=gasoracle&apikey=KEY`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ENS Lookup
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Etherscan resolves ENS (Ethereum Name Service) names. You can
            search for{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              vitalik.eth
            </code>{" "}
            in the search bar and it will take you to the resolved address.
            Addresses with ENS names display the name for easier
            identification.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Token Tracker
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Token Tracker pages show rankings of ERC-20 tokens by market
            cap and number of holders. Each token page shows transfers,
            holders, and the contract information.
          </p>
        </section>

        {/* Alternative Explorers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Alternative Block Explorers
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            While Etherscan is the most popular, several alternatives offer
            unique features:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Explorer
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Networks
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Key Feature
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Blockscout</td>
                  <td className="px-4 py-3">Many EVM chains</td>
                  <td className="px-4 py-3">Open source, self-hostable</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Tenderly</td>
                  <td className="px-4 py-3">Ethereum, L2s</td>
                  <td className="px-4 py-3">Transaction simulation and debugging</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Arbiscan</td>
                  <td className="px-4 py-3">Arbitrum</td>
                  <td className="px-4 py-3">Etherscan-like for Arbitrum</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Basescan</td>
                  <td className="px-4 py-3">Base</td>
                  <td className="px-4 py-3">Etherscan-like for Base</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Polygonscan</td>
                  <td className="px-4 py-3">Polygon</td>
                  <td className="px-4 py-3">Etherscan-like for Polygon</td>
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
              What is Etherscan?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Etherscan is the most widely used blockchain explorer for
              Ethereum. It allows anyone to search and verify transactions,
              addresses, tokens, smart contracts, and other on-chain data.
              It provides a web interface for reading the public blockchain
              without running your own node.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is Etherscan free to use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes, Etherscan is free for basic usage including searching
              transactions, viewing contracts, and reading on-chain data.
              They also offer a free API tier with rate limits (5 calls/sec).
              Premium API plans are available for developers who need higher
              request limits.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can Etherscan see my wallet balance?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes. All Ethereum blockchain data is public, including wallet
              balances, transaction history, and token holdings. Etherscan
              simply provides a user-friendly interface to view this public
              data. Anyone can look up any address. This is a fundamental
              property of public blockchains.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What does &quot;verified contract&quot; mean on Etherscan?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A verified contract means the developer has uploaded the
              original Solidity source code and it has been confirmed to
              produce the same bytecode deployed on-chain. This allows
              anyone to read the source code, understand what the contract
              does, and interact with it through Etherscan&apos;s read/write
              interface.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are there Etherscan alternatives for other networks?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes. Etherscan operates explorers for multiple networks.
              Alternative explorers include Blockscout (open source, used by
              many L2s), Tenderly (developer-focused with debugging tools),
              Arbiscan (Arbitrum), Basescan (Base), and Polygonscan (Polygon).
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Found some raw calldata on Etherscan? Paste it into our{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>{" "}
            to decode it into readable function calls and parameters. Or use
            the{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder
            </Link>{" "}
            to construct calldata for contract interactions.
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
                href="/crypto/calldata-decoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Calldata Decoder
              </Link>{" "}
              &mdash; Decode raw transaction calldata from Etherscan
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
                href="/crypto/event-hash-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Event Hash Calculator
              </Link>{" "}
              &mdash; Compute event signature hashes for log filtering
            </li>
            <li>
              <Link
                href="/crypto/hex-decimal-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Hex / Decimal Converter
              </Link>{" "}
              &mdash; Convert hex values from Etherscan to decimal
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
