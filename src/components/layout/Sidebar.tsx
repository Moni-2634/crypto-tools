import Link from "next/link";
import { tools, guides, type Tool } from "@/lib/tools";

const TOOL_CATEGORIES = [
  {
    label: "Encoding & Conversion",
    slugs: [
      "abi-encoder",
      "hex-decimal-converter",
      "utf8-hex-converter",
      "rlp-encoder",
      "unix-timestamp",
      "base64-encoder",
      "bytes32-converter",
    ],
  },
  {
    label: "Hashing & Crypto",
    slugs: [
      "keccak256-hash",
      "batch-keccak256",
      "event-hash-calculator",
      "function-selector",
      "eip712-hasher",
      "merkle-proof-generator",
    ],
  },
  {
    label: "Address & Keys",
    slugs: [
      "checksum-address",
      "address-validator",
      "private-key-to-address",
      "mnemonic-generator",
      "signature-verifier",
      "create2-calculator",
    ],
  },
  {
    label: "Smart Contracts",
    slugs: [
      "calldata-decoder",
      "storage-slot-calculator",
      "erc20-decoder",
      "error-decoder",
      "contract-size-calculator",
    ],
  },
  {
    label: "Gas & Units",
    slugs: [
      "eth-unit-converter",
      "gas-calculator",
      "token-unit-converter",
      "epoch-calculator",
    ],
  },
];

const GUIDE_CATEGORIES = [
  {
    label: "Blockchain Basics",
    slugs: [
      "what-is-blockchain",
      "what-is-ethereum",
      "ethereum-vs-bitcoin",
      "what-is-web3",
    ],
  },
  {
    label: "Ethereum Core",
    slugs: [
      "what-is-smart-contract",
      "eip-1559-explained",
      "how-gas-fees-work",
      "what-is-layer2",
      "what-is-mev",
      "what-is-account-abstraction",
    ],
  },
  {
    label: "Token Standards",
    slugs: [
      "what-is-token",
      "what-is-erc20",
      "what-is-erc721",
      "what-is-erc1155",
    ],
  },
  {
    label: "DeFi",
    slugs: [
      "what-is-defi",
      "what-is-staking",
      "what-is-dex",
      "what-is-yield-farming",
      "what-is-impermanent-loss",
      "what-is-flash-loan",
      "what-is-oracle",
      "what-is-bridge",
    ],
  },
  {
    label: "Wallets & Governance",
    slugs: [
      "what-is-crypto-wallet",
      "what-is-dao",
    ],
  },
  {
    label: "Developer",
    slugs: [
      "what-is-keccak256",
      "abi-encoding-explained",
      "bip39-explained",
      "how-to-read-etherscan",
      "how-to-deploy-smart-contract",
    ],
  },
];

function getItemsBySlug(items: Tool[], slugs: string[]): Tool[] {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is Tool => item !== undefined);
}

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav className="sticky top-4 max-h-[calc(100vh-2rem)] space-y-6 overflow-y-auto">
        {/* Tools Section */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Crypto Tools
          </h3>
          {TOOL_CATEGORIES.map((category) => {
            const categoryTools = getItemsBySlug(tools, category.slugs);
            if (categoryTools.length === 0) return null;
            return (
              <div key={category.label}>
                <p className="mt-3 mb-1 pl-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                  {category.label}
                </p>
                <ul className="space-y-0.5">
                  {categoryTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/crypto/${tool.slug}`}
                        className="block rounded px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Guides Section */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Guides
          </h3>
          {GUIDE_CATEGORIES.map((category) => {
            const categoryGuides = getItemsBySlug(guides, category.slugs);
            if (categoryGuides.length === 0) return null;
            return (
              <div key={category.label}>
                <p className="mt-3 mb-1 pl-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                  {category.label}
                </p>
                <ul className="space-y-0.5">
                  {categoryGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="block rounded px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        {guide.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
