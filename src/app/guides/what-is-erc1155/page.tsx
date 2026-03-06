import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is ERC-1155? The Multi-Token Standard Explained | EVMTools",
  description:
    "Learn what ERC-1155 is, how the multi-token standard works, batch transfers, gas efficiency, and how it compares to ERC-20 and ERC-721. Complete developer guide.",
  keywords: [
    "erc1155",
    "erc-1155",
    "what is erc1155",
    "multi token standard",
    "erc 1155",
    "nft standard comparison",
    "semi-fungible token",
    "batch transfer",
    "ethereum token standard",
    "erc1155 vs erc721",
  ],
  openGraph: {
    title:
      "What is ERC-1155? The Multi-Token Standard Explained | EVMTools",
    description:
      "Learn what ERC-1155 is, how the multi-token standard works, batch transfers, gas efficiency, and how it compares to ERC-20 and ERC-721. Complete developer guide.",
    url: `${SITE_URL}/guides/what-is-erc1155`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is ERC-1155? The Multi-Token Standard Explained",
    description:
      "Learn what ERC-1155 is, how the multi-token standard works, batch transfers, gas efficiency, and how it compares to ERC-20 and ERC-721. Complete developer guide.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-erc1155`,
  },
};

export default function WhatIsERC1155Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is ERC-1155? The Multi-Token Standard Explained",
    description:
      "Learn what ERC-1155 is, how the multi-token standard works, batch transfers, gas efficiency, and how it compares to ERC-20 and ERC-721. Complete developer guide.",
    url: `${SITE_URL}/guides/what-is-erc1155`,
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
      "@id": `${SITE_URL}/guides/what-is-erc1155`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is the difference between ERC-1155 and ERC-721?",
      answer:
        "ERC-721 creates one unique token per ID with a single owner, ideal for one-of-a-kind NFTs. ERC-1155 allows each token ID to have multiple copies (editions), supports both fungible and non-fungible tokens in a single contract, and includes native batch transfer operations that are significantly more gas efficient.",
    },
    {
      question: "Why is ERC-1155 more gas efficient than ERC-721?",
      answer:
        "ERC-1155 achieves gas savings through batch operations. Instead of calling transfer once per token (as ERC-721 requires), ERC-1155's safeBatchTransferFrom can move hundreds of different tokens in a single transaction. The contract also uses a more compact storage layout with a single mapping for balances across all token IDs.",
    },
    {
      question: "What is a semi-fungible token?",
      answer:
        "A semi-fungible token starts as fungible (interchangeable with others of the same ID) but can become non-fungible after a certain event. For example, a concert ticket token might be fungible before the event (any ticket for the same section is equivalent) but becomes a unique collectible after use. ERC-1155 naturally supports this pattern.",
    },
    {
      question: "Can ERC-1155 replace both ERC-20 and ERC-721?",
      answer:
        "Technically yes, ERC-1155 can represent both fungible tokens (like ERC-20) and non-fungible tokens (like ERC-721) in a single contract. However, ERC-20 and ERC-721 remain widely used because of their simplicity, tooling maturity, and universal support across wallets, exchanges, and DeFi protocols. ERC-1155 is best suited for applications that need multiple token types.",
    },
    {
      question: "How does ERC-1155 metadata work?",
      answer:
        "ERC-1155 uses a URI-based metadata system where a single uri(uint256 id) function returns the metadata URL for any token ID. The standard supports a {id} substitution pattern in the URI string, allowing a single base URL to serve metadata for all tokens by replacing {id} with the hex-encoded token ID. This is more efficient than storing individual URIs per token.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-erc1155">
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
            ERC-1155 is the Ethereum multi-token standard that allows a single{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contract
            </Link>{" "}
            to manage an unlimited number of fungible and non-fungible token
            types simultaneously. Proposed by Witek Radomski (co-founder of
            Enjin) in June 2018 via EIP-1155, it was designed to solve the
            inefficiency of deploying separate contracts for each token type.
            Whether you need in-game currencies, unique weapons, edition-based
            art, or event tickets, ERC-1155 handles them all from one contract
            with dramatically lower gas costs through native batch operations.
          </p>
        </section>

        {/* Why ERC-1155 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why Was ERC-1155 Created?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before ERC-1155, blockchain game developers faced a painful choice.
            If they wanted fungible in-game currency, they needed an{" "}
            <Link
              href="/guides/what-is-erc20"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-20 contract
            </Link>
            . For unique items like legendary swords, they needed an{" "}
            <Link
              href="/guides/what-is-erc721"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-721 contract
            </Link>
            . A game with 100 different item types would require 100 separate
            smart contract deployments, each consuming gas and adding
            complexity.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-1155 eliminates this problem by introducing a multi-token
            architecture. A single contract can define token ID 1 as a fungible
            gold coin (with millions of copies), token ID 2 as a semi-fungible
            health potion (with 10,000 copies), and token ID 3 as a unique
            legendary item (with exactly one copy). All live in the same
            contract, share the same interface, and can be transferred together
            in a single transaction.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Beyond gaming, ERC-1155 has found widespread adoption in music NFT
            platforms (where artists sell multiple editions), event ticketing
            systems, membership passes, and DeFi protocols that need to track
            multiple position types.
          </p>
        </section>

        {/* Token Standard Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ERC-20 vs ERC-721 vs ERC-1155
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding how the three major Ethereum token standards compare
            is essential for choosing the right one for your project:
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
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Fungibility</td>
                  <td className="px-4 py-3">Fungible only</td>
                  <td className="px-4 py-3">Non-fungible only</td>
                  <td className="px-4 py-3">Both fungible and non-fungible</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Tokens per contract</td>
                  <td className="px-4 py-3">1 token type</td>
                  <td className="px-4 py-3">1 collection (unique IDs)</td>
                  <td className="px-4 py-3">Unlimited token types</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Batch transfers</td>
                  <td className="px-4 py-3">Not supported</td>
                  <td className="px-4 py-3">Not built-in</td>
                  <td className="px-4 py-3">Native support</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Balance query</td>
                  <td className="px-4 py-3">balanceOf(address)</td>
                  <td className="px-4 py-3">balanceOf(address) / ownerOf(id)</td>
                  <td className="px-4 py-3">balanceOf(address, id)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Gas efficiency</td>
                  <td className="px-4 py-3">Moderate</td>
                  <td className="px-4 py-3">Higher per transfer</td>
                  <td className="px-4 py-3">Lowest (batch optimized)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Metadata</td>
                  <td className="px-4 py-3">name, symbol, decimals</td>
                  <td className="px-4 py-3">tokenURI per token</td>
                  <td className="px-4 py-3">URI with &#123;id&#125; substitution</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Best for</td>
                  <td className="px-4 py-3">Currencies, governance</td>
                  <td className="px-4 py-3">1-of-1 art, PFPs</td>
                  <td className="px-4 py-3">Gaming, editions, mixed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">EIP number</td>
                  <td className="px-4 py-3">EIP-20 (2015)</td>
                  <td className="px-4 py-3">EIP-721 (2018)</td>
                  <td className="px-4 py-3">EIP-1155 (2018)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Batch Transfers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Batch Transfers and Gas Efficiency
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The headline feature of ERC-1155 is batch operations. When you need
            to transfer 50 different items to another player in a game, ERC-721
            would require 50 separate transactions, each paying a base gas cost
            of 21,000 gas plus the transfer logic. ERC-1155 does it in one
            transaction with a single base gas cost.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The gas savings are substantial. In benchmarks, transferring 10
            different token types via ERC-1155{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              safeBatchTransferFrom
            </code>{" "}
            costs roughly 50-80% less gas compared to 10 individual ERC-721{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              safeTransferFrom
            </code>{" "}
            calls. This makes a meaningful difference when{" "}
            <Link
              href="/guides/how-gas-fees-work"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              gas fees
            </Link>{" "}
            are high on Ethereum mainnet.
          </p>
          <div className="rounded-lg border border-green-300 dark:border-green-800/50 bg-green-50 dark:bg-green-950/30 p-4">
            <p className="text-sm leading-relaxed text-green-800 dark:text-green-200">
              <strong>Gas comparison example:</strong> Transferring 20 tokens
              individually via ERC-721 costs approximately 1,400,000 gas. The
              same 20 tokens via ERC-1155 batch transfer costs approximately
              350,000 gas &mdash; a 75% reduction.
            </p>
          </div>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* ERC-1155 Interface */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The ERC-1155 Interface
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Every ERC-1155 contract must implement these core functions and
            events:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Balance Functions
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Get the balance of a specific token ID for an address
function balanceOf(address account, uint256 id)
    external view returns (uint256);

// Get balances for multiple account/token pairs in one call
function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids)
    external view returns (uint256[] memory);`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              balanceOf
            </code>{" "}
            function takes both an address and a token ID, since a single
            contract manages many token types. The{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              balanceOfBatch
            </code>{" "}
            function lets you query multiple balances in one call, avoiding
            multiple RPC requests.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transfer Functions
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Transfer a single token type
function safeTransferFrom(
    address from, address to,
    uint256 id, uint256 amount, bytes calldata data
) external;

// Transfer multiple token types in one transaction
function safeBatchTransferFrom(
    address from, address to,
    uint256[] calldata ids, uint256[] calldata amounts,
    bytes calldata data
) external;`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Both transfer functions include a{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              data
            </code>{" "}
            parameter for passing arbitrary bytes to the receiver, and both
            check that the recipient implements{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              IERC1155Receiver
            </code>{" "}
            if it is a contract. Unlike ERC-721, there is no &quot;unsafe&quot;
            transfer variant &mdash; all ERC-1155 transfers are safe by default.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Approval Functions
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Approve or revoke an operator for ALL token types
function setApprovalForAll(address operator, bool approved) external;

// Check if an operator is approved
function isApprovedForAll(address account, address operator)
    external view returns (bool);`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-1155 simplifies approvals compared to ERC-721. There is no
            per-token approval &mdash; operators are either approved for all
            token types or none. This is a deliberate design choice that reduces
            complexity and gas costs, though it means you cannot grant
            fine-grained permissions for individual token IDs.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Required Events
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`event TransferSingle(
    address indexed operator, address indexed from,
    address indexed to, uint256 id, uint256 value
);

event TransferBatch(
    address indexed operator, address indexed from,
    address indexed to, uint256[] ids, uint256[] values
);

event ApprovalForAll(
    address indexed account, address indexed operator, bool approved
);

event URI(string value, uint256 indexed id);`}</code>
          </pre>
        </section>

        {/* URI Metadata Pattern */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            URI Metadata Pattern
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-1155 uses a URI-based metadata system with a powerful
            substitution mechanism. Instead of storing a separate URI per token
            (as ERC-721 does), ERC-1155 can use a single template URI with an{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              &#123;id&#125;
            </code>{" "}
            placeholder:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// The URI function returns metadata URL for a given token ID
function uri(uint256 id) external view returns (string memory);

// Example URI template:
// https://api.example.com/tokens/{id}.json
//
// For token ID 42 (hex: 0x000...002a), this resolves to:
// https://api.example.com/tokens/000...002a.json
//
// The {id} is substituted with the lowercase hex token ID,
// zero-padded to 64 characters (uint256 in hex)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The metadata JSON for each token follows this schema:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`{
  "name": "Gold Coin",
  "description": "In-game currency for purchasing items",
  "image": "https://example.com/tokens/gold-coin.png",
  "decimals": 18,
  "properties": {
    "type": "currency",
    "rarity": "common"
  }
}`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The optional{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              decimals
            </code>{" "}
            field is particularly useful for fungible token types, telling
            clients how to display the balance (similar to ERC-20 decimals). For
            non-fungible tokens where the supply is 1, the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              decimals
            </code>{" "}
            field is typically omitted or set to 0.
          </p>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Real-World Use Cases
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gaming Items
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-1155 was born from the gaming world, and it remains the dominant
            standard for blockchain games. A single game contract can manage
            gold coins (fungible, high supply), health potions (semi-fungible,
            limited supply), and legendary weapons (non-fungible, supply of 1).
            Players can trade bundles of items in one transaction, making
            marketplace experiences smooth and affordable.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Mixed Collections and Editions
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Artists and creators use ERC-1155 to sell edition-based works. An
            artist might create token ID 1 as a &quot;Gold Edition&quot; print
            with 10 copies, token ID 2 as a &quot;Silver Edition&quot; with 100
            copies, and token ID 3 as a &quot;1-of-1 Original.&quot; All exist
            in the same contract, simplifying management and reducing deployment
            costs.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Semi-Fungible Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some tokens start as fungible and become non-fungible after an event.
            Concert tickets are a classic example: before the show, all floor
            section tickets are interchangeable. After the show, each ticket
            becomes a unique collectible tied to the specific event experience.
            ERC-1155 handles this transition naturally &mdash; the token ID
            remains the same, but the application layer can treat it differently
            based on state.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            DeFi Position Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Some DeFi protocols use ERC-1155 to represent liquidity positions,
            option contracts, or other financial instruments where multiple
            position types need to coexist in one contract. This avoids the
            overhead of deploying separate ERC-20 contracts for each position
            type.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Implementation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ERC-1155 Implementation Example
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a practical ERC-1155 contract using OpenZeppelin that
            demonstrates a gaming item system with multiple token types:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameItems is ERC1155, Ownable {
    // Token IDs
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant SWORD = 2;
    uint256 public constant SHIELD = 3;
    uint256 public constant LEGENDARY_CROWN = 4;

    // Track supply for limited items
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public totalMinted;

    constructor() ERC1155("https://game.example/api/item/{id}.json")
                  Ownable(msg.sender) {
        // Fungible currencies - mint initial supply
        _mint(msg.sender, GOLD, 10_000_000 * 1e18, "");
        _mint(msg.sender, SILVER, 1_000_000 * 1e18, "");

        // Set max supply for limited items
        maxSupply[SWORD] = 10000;
        maxSupply[SHIELD] = 5000;
        maxSupply[LEGENDARY_CROWN] = 1; // Unique item
    }

    function mint(address to, uint256 id, uint256 amount)
        external onlyOwner
    {
        require(
            maxSupply[id] == 0 ||
            totalMinted[id] + amount <= maxSupply[id],
            "Exceeds max supply"
        );
        totalMinted[id] += amount;
        _mint(to, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            require(
                maxSupply[ids[i]] == 0 ||
                totalMinted[ids[i]] + amounts[i] <= maxSupply[ids[i]],
                "Exceeds max supply"
            );
            totalMinted[ids[i]] += amounts[i];
        }
        _mintBatch(to, ids, amounts, "");
    }
}`}</code>
          </pre>
        </section>

        {/* The Receiver Interface */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The ERC-1155 Receiver Interface
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Any smart contract that wants to receive ERC-1155 tokens must
            implement the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              IERC1155Receiver
            </code>{" "}
            interface. This prevents tokens from being permanently locked in
            contracts that do not know how to handle them:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`interface IERC1155Receiver {
    function onERC1155Received(
        address operator, address from,
        uint256 id, uint256 value, bytes calldata data
    ) external returns (bytes4);

    function onERC1155BatchReceived(
        address operator, address from,
        uint256[] calldata ids, uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4);
}`}</code>
          </pre>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> Both callback functions must return
              their respective function selectors (
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                bytes4(keccak256(&quot;onERC1155Received(...)&quot;))
              </code>
              ) to confirm successful receipt. Returning any other value or
              reverting will cause the transfer to fail.
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
              What is the difference between ERC-1155 and ERC-721?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ERC-721 creates one unique token per ID with a single owner, ideal
              for one-of-a-kind NFTs. ERC-1155 allows each token ID to have
              multiple copies (editions), supports both fungible and non-fungible
              tokens in a single contract, and includes native batch transfer
              operations that are significantly more gas efficient.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Why is ERC-1155 more gas efficient than ERC-721?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ERC-1155 achieves gas savings through batch operations. Instead of
              calling transfer once per token (as ERC-721 requires),
              safeBatchTransferFrom can move hundreds of different tokens in a
              single transaction. The contract also uses a more compact storage
              layout with a single mapping for balances across all token IDs.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is a semi-fungible token?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A semi-fungible token starts as fungible (interchangeable with
              others of the same ID) but can become non-fungible after a certain
              event. For example, a concert ticket token might be fungible before
              the event but becomes a unique collectible after use. ERC-1155
              naturally supports this pattern.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can ERC-1155 replace both ERC-20 and ERC-721?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Technically yes, ERC-1155 can represent both fungible and
              non-fungible tokens in a single contract. However, ERC-20 and
              ERC-721 remain widely used because of their simplicity, tooling
              maturity, and universal support across wallets, exchanges, and DeFi
              protocols. ERC-1155 is best for applications needing multiple token
              types.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How does ERC-1155 metadata work?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ERC-1155 uses a URI-based metadata system where a single{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                uri(uint256 id)
              </code>{" "}
              function returns the metadata URL for any token ID. The standard
              supports a &#123;id&#125; substitution pattern in the URI string,
              allowing a single base URL to serve metadata for all tokens by
              replacing the placeholder with the hex-encoded token ID.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore ERC-1155 On-Chain
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Use our{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>{" "}
            to encode and decode ERC-1155 function calls like{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              balanceOfBatch
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              safeBatchTransferFrom
            </code>
            , or inspect raw transaction data with the{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>
            .
          </p>
        </section>

        {/* Related Tools */}
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
              &mdash; The fungible token standard for cryptocurrencies
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
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Understand the foundation behind all token standards
            </li>
            <li>
              <Link
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder / Decoder
              </Link>{" "}
              &mdash; Encode and decode ERC-1155 function calls
            </li>
            <li>
              <Link
                href="/crypto/keccak256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Keccak256 Hash Generator
              </Link>{" "}
              &mdash; Compute function selectors and event signatures
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
