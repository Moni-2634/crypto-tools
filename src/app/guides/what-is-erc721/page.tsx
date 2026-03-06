import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is ERC-721? The Complete Guide to NFT Smart Contracts | EVMTools",
  description:
    "Learn what ERC-721 is, how NFT smart contracts work, the required interface functions, metadata standards, minting, and popular NFT collections.",
  keywords: [
    "erc721",
    "nft",
    "non-fungible token",
    "what is erc721",
    "nft standard",
    "ethereum nft",
    "nft smart contract",
    "erc721 interface",
    "nft metadata",
    "nft minting",
  ],
  openGraph: {
    title:
      "What is ERC-721? The Complete Guide to NFT Smart Contracts | EVMTools",
    description:
      "Learn what ERC-721 is, how NFT smart contracts work, the required interface functions, metadata standards, minting, and popular NFT collections.",
    url: `${SITE_URL}/guides/what-is-erc721`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is ERC-721? The Complete Guide to NFT Smart Contracts",
    description:
      "Learn what ERC-721 is, how NFT smart contracts work, the required interface functions, metadata standards, minting, and popular NFT collections.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-erc721`,
  },
};

export default function WhatIsERC721Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is ERC-721? The Complete Guide to NFT Smart Contracts",
    description:
      "Learn what ERC-721 is, how NFT smart contracts work, the required interface functions, metadata standards, minting, and popular NFT collections.",
    url: `${SITE_URL}/guides/what-is-erc721`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-erc721`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What is the difference between ERC-721 and ERC-20?",
      answer:
        "ERC-20 tokens are fungible, meaning every token is identical and interchangeable (like dollars). ERC-721 tokens are non-fungible, meaning each token has a unique ID and can represent a distinct asset (like a deed to a house). ERC-20 tracks balances per address, while ERC-721 tracks ownership of individual token IDs.",
    },
    {
      question: "What does 'non-fungible' mean?",
      answer:
        "Non-fungible means unique and not interchangeable. A dollar bill is fungible because any dollar is worth the same as any other dollar. A painting is non-fungible because each painting is unique and has different value. NFTs bring this concept to digital assets by assigning unique token IDs on the blockchain.",
    },
    {
      question: "Where is NFT metadata stored?",
      answer:
        "NFT metadata (name, description, image) can be stored on-chain (directly in the smart contract), off-chain on decentralized storage (IPFS, Arweave), or on centralized servers. The tokenURI function returns a URL pointing to a JSON file containing the metadata. IPFS and Arweave are preferred because they are immutable and censorship-resistant.",
    },
    {
      question: "What is the difference between ERC-721 and ERC-1155?",
      answer:
        "ERC-721 assigns one unique owner per token ID, making it ideal for one-of-a-kind assets. ERC-1155 is a multi-token standard that supports both fungible and non-fungible tokens in a single contract, with built-in batch transfer support. ERC-1155 is more gas efficient for collections with many similar items, like gaming assets.",
    },
    {
      question: "Can NFTs be copied or duplicated?",
      answer:
        "While anyone can copy the image or media associated with an NFT, the blockchain ownership record cannot be duplicated. The smart contract maintains an immutable record of which address owns each token ID. Copying the image does not transfer ownership, just as photographing a painting does not make you the owner.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-erc721">
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
            ERC-721 is the Ethereum standard that makes NFTs (Non-Fungible
            Tokens) possible. It defines how unique digital assets are
            created, owned, and transferred on the blockchain. From digital
            art and collectibles to real estate deeds and gaming items,
            ERC-721 provides the technical foundation for representing
            ownership of one-of-a-kind assets. This guide explains how the
            standard works, its required functions, metadata handling, and
            how it compares to other token standards.
          </p>
        </section>

        {/* What are NFTs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What are NFTs and Why Do They Need a Standard?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A{" "}
            <strong className="text-gray-900 dark:text-white">
              Non-Fungible Token (NFT)
            </strong>{" "}
            is a blockchain-based token that represents a unique asset. Unlike
            ERC-20 tokens where every unit is identical, each NFT has a
            distinct token ID that differentiates it from all others in the
            same collection.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before ERC-721, early NFT projects like CryptoPunks used custom
            contracts with non-standard interfaces. This made it difficult
            for wallets, marketplaces, and other applications to interact
            with them. ERC-721, proposed by William Entriken, Dieter Shirley,
            Jacob Evans, and Nastassia Sachs in January 2018 (EIP-721),
            established a universal interface that all NFT contracts could
            implement.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            With a standard interface, any marketplace (like OpenSea or Blur)
            can list any ERC-721 token, any wallet (like MetaMask) can display
            it, and any smart contract can interact with it &mdash; without
            needing custom integration code for each collection.
          </p>
        </section>

        {/* ERC-721 Interface */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The ERC-721 Interface
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The ERC-721 standard defines the following required functions and
            events that every compliant contract must implement:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Ownership Functions
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Returns the owner of a specific token
function ownerOf(uint256 tokenId) external view returns (address);

// Returns the number of tokens owned by an address
function balanceOf(address owner) external view returns (uint256);`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Unlike ERC-20 where{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              balanceOf
            </code>{" "}
            returns a token amount,{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              ownerOf
            </code>{" "}
            is the primary query function in ERC-721, returning the specific
            address that owns a given token ID.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transfer Functions
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Safe transfer - checks if receiver can handle NFTs
function safeTransferFrom(address from, address to, uint256 tokenId) external;
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) external;

// Unsafe transfer - does not check receiver
function transferFrom(address from, address to, uint256 tokenId) external;`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              safeTransferFrom
            </code>{" "}
            function is preferred because it checks whether the recipient
            address (if it is a contract) implements the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              IERC721Receiver
            </code>{" "}
            interface. This prevents tokens from being permanently locked in
            contracts that cannot handle them.
          </p>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Using{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                transferFrom
              </code>{" "}
              to send an NFT to a contract that does not implement{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                IERC721Receiver
              </code>{" "}
              will permanently lock the token. Always use{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                safeTransferFrom
              </code>{" "}
              unless you have a specific reason not to.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Approval Functions
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Approve a single token to a specific address
function approve(address to, uint256 tokenId) external;

// Approve or revoke an operator for ALL tokens
function setApprovalForAll(address operator, bool approved) external;

// Get the approved address for a single token
function getApproved(uint256 tokenId) external view returns (address);

// Check if an operator is approved for all tokens of an owner
function isApprovedForAll(address owner, address operator) external view returns (bool);`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The approval system in ERC-721 is more nuanced than ERC-20.
            You can approve a specific address for a single token, or use{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              setApprovalForAll
            </code>{" "}
            to grant an operator (like a marketplace) permission to transfer
            any of your tokens. Marketplaces rely on{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              setApprovalForAll
            </code>{" "}
            so they can execute sales without requiring a new approval for
            each listing.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Required Events
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
event ApprovalForAll(address indexed owner, address indexed operator, bool approved);`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Token URI and Metadata */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Token URI and Metadata
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The ERC-721 standard includes an optional metadata extension that
            most collections implement. The key function is{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              tokenURI(uint256 tokenId)
            </code>
            , which returns a URL pointing to a JSON file describing the token.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// ERC-721 Metadata JSON Schema
{
  "name": "CryptoKitty #42",
  "description": "A unique digital kitten.",
  "image": "ipfs://QmXyz.../42.png",
  "attributes": [
    { "trait_type": "Fur", "value": "Calico" },
    { "trait_type": "Eyes", "value": "Blue" },
    { "trait_type": "Generation", "value": 3, "display_type": "number" }
  ]
}`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Where is Metadata Stored?
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The metadata JSON and associated media files can be stored in
            several ways, each with trade-offs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Storage
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Permanence
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Cost
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">On-chain</td>
                  <td className="px-4 py-3">Permanent</td>
                  <td className="px-4 py-3">Very high</td>
                  <td className="px-4 py-3">Base64 encoded SVG in contract</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">IPFS</td>
                  <td className="px-4 py-3">Permanent (if pinned)</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      ipfs://QmXyz...
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Arweave</td>
                  <td className="px-4 py-3">Permanent</td>
                  <td className="px-4 py-3">One-time fee</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      ar://abc123...
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Centralized (AWS, etc.)</td>
                  <td className="px-4 py-3">Not guaranteed</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-amber-600 dark:text-amber-400">
                      https://api.example.com/42
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Decentralized storage (IPFS, Arweave) is strongly preferred
            because centralized servers can go offline, and the project team
            can modify or delete the metadata. On-chain storage is the most
            permanent but is only practical for small assets like SVGs.
          </p>
        </section>

        {/* Minting Process */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How NFT Minting Works
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Minting is the process of creating a new NFT on the blockchain.
            Under the hood, it assigns a new token ID to an owner address and
            emits a Transfer event from the zero address.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.08 ether;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    function mint(uint256 quantity) external payable {
        require(_nextTokenId + quantity <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= MINT_PRICE * quantity, "Insufficient payment");

        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, _nextTokenId);
            _nextTokenId++;
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
}`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Common minting patterns include public mints (anyone can mint),
            allowlist mints (using Merkle proofs to restrict access), and
            lazy minting (metadata is set at mint time). Gas-optimized
            implementations like ERC-721A allow minting multiple tokens in
            a single transaction at near the cost of minting one.
          </p>
        </section>

        {/* Popular NFT Collections */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notable NFT Collections
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            These collections helped define the NFT space and showcase
            different approaches to the ERC-721 standard:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Collection
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Supply
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Notable Feature
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">CryptoPunks</td>
                  <td className="px-4 py-3">10,000</td>
                  <td className="px-4 py-3">Pre-ERC-721, later wrapped</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Bored Ape Yacht Club</td>
                  <td className="px-4 py-3">10,000</td>
                  <td className="px-4 py-3">IP rights granted to holders</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Azuki</td>
                  <td className="px-4 py-3">10,000</td>
                  <td className="px-4 py-3">Pioneered ERC-721A for gas savings</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Art Blocks</td>
                  <td className="px-4 py-3">Varies</td>
                  <td className="px-4 py-3">Generative art, on-chain scripts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Nouns</td>
                  <td className="px-4 py-3">Unlimited (1/day)</td>
                  <td className="px-4 py-3">Fully on-chain SVG, DAO governance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ERC-721 vs ERC-1155 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ERC-721 vs ERC-1155
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            ERC-1155 is a newer multi-token standard that can handle both
            fungible and non-fungible tokens in a single contract. Here is
            how they compare:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
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
                  <td className="px-4 py-3">Token types</td>
                  <td className="px-4 py-3">Non-fungible only</td>
                  <td className="px-4 py-3">Fungible + non-fungible</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Batch transfers</td>
                  <td className="px-4 py-3">Not built-in</td>
                  <td className="px-4 py-3">Native support</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Gas per transfer</td>
                  <td className="px-4 py-3">Higher</td>
                  <td className="px-4 py-3">Lower (batch optimized)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Marketplace support</td>
                  <td className="px-4 py-3">Universal</td>
                  <td className="px-4 py-3">Widespread</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Best for</td>
                  <td className="px-4 py-3">1-of-1 art, PFPs</td>
                  <td className="px-4 py-3">Gaming items, editions</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Complexity</td>
                  <td className="px-4 py-3">Simpler</td>
                  <td className="px-4 py-3">More complex</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Choose ERC-721 when each token needs to be truly unique (profile
            pictures, 1-of-1 art). Choose ERC-1155 when you need editions
            (multiple copies of the same item) or a mix of fungible and
            non-fungible tokens (like in-game currencies alongside unique
            weapons).
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Gas Optimization */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gas Optimization Techniques
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            NFT minting and transfers can be expensive. Here are proven
            techniques to reduce gas costs:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">ERC-721A</strong>: Developed by the
              Azuki team, this implementation allows minting multiple tokens
              for nearly the same gas cost as minting one. It uses lazy
              initialization of ownership data.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Merkle tree allowlists</strong>:
              Instead of storing a list of allowed addresses on-chain (which
              is expensive), store only the Merkle root and let users provide
              proofs during minting.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Lazy minting</strong>: Defer on-chain
              minting until the first buyer purchases the NFT. The creator
              signs the metadata off-chain, and the buyer pays the gas.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Batch metadata reveals</strong>:
              Set all token URIs to a placeholder during minting, then update
              the base URI in a single transaction to reveal all metadata at
              once.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">L2 deployment</strong>: Deploy on
              Layer 2 networks (Arbitrum, Optimism, Base) where gas costs are
              significantly lower than Ethereum mainnet.
            </li>
          </ul>
        </section>

        {/* NFT Marketplaces */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            NFT Marketplaces
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Marketplaces allow users to buy, sell, and discover NFTs. They
            interact with ERC-721 contracts through the standard interface,
            using approval functions to facilitate sales:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">OpenSea</strong>: The largest NFT
              marketplace by volume. Uses the Seaport protocol for order
              matching.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Blur</strong>: A trader-focused
              marketplace with zero platform fees and advanced portfolio
              management tools.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Foundation</strong>: Curated
              platform focused on digital art with auction-based sales.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Magic Eden</strong>: Originally a
              Solana marketplace that expanded to support Ethereum, Polygon,
              and Bitcoin (Ordinals).
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
              What is the difference between ERC-721 and ERC-20?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ERC-20 tokens are fungible, meaning every token is identical and
              interchangeable (like dollars). ERC-721 tokens are non-fungible,
              meaning each token has a unique ID and can represent a distinct
              asset. ERC-20 tracks balances per address, while ERC-721 tracks
              ownership of individual token IDs.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What does &quot;non-fungible&quot; mean?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Non-fungible means unique and not interchangeable. A dollar bill
              is fungible because any dollar is worth the same as any other
              dollar. A painting is non-fungible because each painting is
              unique and has different value. NFTs bring this concept to
              digital assets by assigning unique token IDs on the blockchain.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Where is NFT metadata stored?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              NFT metadata (name, description, image) can be stored on-chain
              (directly in the smart contract), off-chain on decentralized
              storage (IPFS, Arweave), or on centralized servers. The tokenURI
              function returns a URL pointing to a JSON file containing the
              metadata. IPFS and Arweave are preferred because they are
              immutable and censorship-resistant.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between ERC-721 and ERC-1155?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              ERC-721 assigns one unique owner per token ID, making it ideal
              for one-of-a-kind assets. ERC-1155 is a multi-token standard
              that supports both fungible and non-fungible tokens in a single
              contract, with built-in batch transfer support. ERC-1155 is more
              gas efficient for collections with many similar items.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can NFTs be copied or duplicated?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              While anyone can copy the image or media associated with an NFT,
              the blockchain ownership record cannot be duplicated. The smart
              contract maintains an immutable record of which address owns
              each token ID. Copying the image does not transfer ownership,
              just as photographing a painting does not make you the owner.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Want to decode NFT contract data? Use our{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>{" "}
            to encode and decode ERC-721 function calls, or try the{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>{" "}
            to inspect raw NFT transaction data.
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
                href="/crypto/calldata-decoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Calldata Decoder
              </Link>{" "}
              &mdash; Decode raw transaction calldata into readable parameters
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
