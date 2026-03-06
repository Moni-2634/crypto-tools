import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import MerkleProofTool from "./MerkleProofTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Merkle Proof Generator",
  description:
    "Generate and verify Merkle proofs online. Build Merkle trees from leaf values, compute roots, and generate inclusion proofs for whitelists and allowlists.",
  path: "/crypto/merkle-proof-generator",
});

const faqs = [
  {
    question: "What is a Merkle tree?",
    answer:
      "A Merkle tree is a binary tree where each leaf node is a hash of a data block, and each non-leaf node is a hash of its two children. The root hash (Merkle root) uniquely represents all the data in the tree. Changing any single leaf changes the root, making Merkle trees ideal for data integrity verification and efficient proofs.",
  },
  {
    question: "What is a Merkle proof and how does it work?",
    answer:
      "A Merkle proof is a list of sibling hashes along the path from a leaf to the root. It allows anyone to verify that a specific leaf belongs to the tree by recomputing the root from the leaf and proof hashes. The proof size is O(log n), meaning you only need log2(n) hashes to verify membership in a tree with n leaves.",
  },
  {
    question: "How are Merkle trees used for NFT allowlists?",
    answer:
      "NFT projects create a Merkle tree from all whitelisted addresses. The Merkle root is stored on-chain in the smart contract (a single bytes32 value). During minting, a user submits their Merkle proof, and the contract verifies it against the stored root using OpenZeppelin's MerkleProof library. This is far cheaper than storing all addresses on-chain.",
  },
  {
    question: "What is the difference between a Merkle tree and a Patricia trie?",
    answer:
      "A standard Merkle tree is a complete binary tree used for membership proofs. Ethereum's state trie is a Modified Merkle Patricia Trie, which is a radix trie where each node includes a hash. The Patricia trie supports key-value lookups and updates, while a standard Merkle tree only supports membership proofs. Allowlists typically use standard Merkle trees.",
  },
  {
    question: "How do I verify a Merkle proof in Solidity?",
    answer:
      "Use OpenZeppelin's MerkleProof.verify(proof, root, leaf) function. The leaf should be computed as keccak256(abi.encodePacked(address)) for address allowlists. Pass the proof as a bytes32[] array and the root as a bytes32 value stored in the contract. The function recomputes the root from the leaf and proof and compares it.",
  },
  {
    question: "How many addresses can a Merkle tree handle efficiently?",
    answer:
      "Merkle trees scale logarithmically. A tree with 1,000 addresses needs proofs of about 10 hashes (10 x 32 bytes = 320 bytes). A tree with 1,000,000 addresses needs only about 20 hashes. The on-chain cost is the same regardless of tree size - just one bytes32 root stored in the contract. This makes Merkle trees practical for allowlists of any size.",
  },
];

export default function MerkleProofGeneratorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Merkle Proof Generator",
            url: "https://evmtools.dev/crypto/merkle-proof-generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate and verify Merkle proofs online. Build Merkle trees from leaf values, compute roots, and generate inclusion proofs for whitelists and allowlists.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="merkle-proof-generator">
        <MerkleProofTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Merkle Proof Generator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online Merkle proof generator helps you build Merkle
              trees, compute roots, and generate inclusion proofs for smart
              contract allowlists, airdrops, and data verification.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your leaf values</strong>, one per line. These can
                be Ethereum addresses, hex values, or any data to include in the
                tree.
              </li>
              <li>
                <strong>View the computed Merkle root</strong> &mdash; this is
                the single bytes32 value you store on-chain in your smart
                contract.
              </li>
              <li>
                <strong>Select a specific leaf</strong> to generate its Merkle
                proof &mdash; the array of sibling hashes needed to verify
                membership.
              </li>
              <li>
                <strong>Verify a proof</strong> by entering a leaf, proof, and
                root to confirm membership without rebuilding the entire tree.
              </li>
              <li>
                <strong>Copy the root or proof</strong> for use in your Solidity
                contract deployment or frontend minting logic.
              </li>
            </ol>
            <p>
              All tree construction and proof generation run locally in your
              browser. No data is sent to any server.
            </p>
          </div>
        </section>

        {/* Use Cases section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>NFT allowlist minting</strong> &mdash; Generate Merkle
              roots for whitelist addresses and proofs for individual users to
              submit during minting.
            </li>
            <li>
              <strong>Token airdrops</strong> &mdash; Create Merkle trees of
              eligible addresses and amounts for gas-efficient claim-based
              airdrop contracts.
            </li>
            <li>
              <strong>Governance voting</strong> &mdash; Build trees of eligible
              voters with their voting power for snapshot-based governance
              systems.
            </li>
            <li>
              <strong>Data integrity verification</strong> &mdash; Generate
              Merkle proofs to verify that specific data is included in a
              committed dataset without revealing the entire dataset.
            </li>
            <li>
              <strong>Cross-chain proofs</strong> &mdash; Generate proofs for
              verifying state or events across different blockchains using
              Merkle inclusion proofs.
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/crypto/keccak256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Keccak256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate Keccak256 hashes, the hash function used to build
                Merkle tree nodes and compute leaf hashes.
              </p>
            </Link>
            <Link
              href="/crypto/checksum-address"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Checksum Address Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert addresses to checksum format before adding them to your
                Merkle tree allowlist.
              </p>
            </Link>
            <Link
              href="/crypto/bytes32-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Bytes32 / String Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Inspect and convert bytes32 Merkle root and proof values for
                Solidity contract integration.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ToolLayout>
    </>
  );
}
