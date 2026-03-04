export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: "crypto" | "guides";
  relatedTools?: string[];
  relatedGuide?: string;
}

export const tools: Tool[] = [
  {
    slug: "abi-encoder",
    name: "ABI Encoder / Decoder",
    description:
      "Encode and decode Ethereum ABI data. Input function signatures and parameters to generate calldata.",
    category: "crypto",
    relatedGuide: "abi-encoding-explained",
    relatedTools: ["keccak256-hash", "hex-decimal-converter"],
  },
  {
    slug: "keccak256-hash",
    name: "Keccak256 Hash Generator",
    description:
      "Generate Keccak256 hashes from text input. The hash function used by Ethereum and Solidity.",
    category: "crypto",
    relatedGuide: "what-is-keccak256",
    relatedTools: ["abi-encoder", "checksum-address"],
  },
  {
    slug: "mnemonic-generator",
    name: "BIP39 Mnemonic Generator",
    description:
      "Generate secure BIP39 mnemonic seed phrases (12 or 24 words) for cryptocurrency wallets.",
    category: "crypto",
    relatedGuide: "bip39-explained",
    relatedTools: ["address-validator", "checksum-address"],
  },
  {
    slug: "eth-unit-converter",
    name: "ETH Unit Converter",
    description:
      "Convert between Ethereum units: Wei, Gwei, and ETH. Essential for gas and transaction calculations.",
    category: "crypto",
    relatedTools: ["gas-calculator", "hex-decimal-converter"],
  },
  {
    slug: "gas-calculator",
    name: "Gas Fee Calculator",
    description:
      "Calculate Ethereum transaction costs from gas limit and gas price. Estimate fees in ETH and USD.",
    category: "crypto",
    relatedGuide: "how-gas-fees-work",
    relatedTools: ["eth-unit-converter"],
  },
  {
    slug: "checksum-address",
    name: "Checksum Address Converter",
    description:
      "Convert Ethereum addresses to EIP-55 checksummed format for safe usage in transactions.",
    category: "crypto",
    relatedTools: ["address-validator", "keccak256-hash"],
  },
  {
    slug: "address-validator",
    name: "Address Validator",
    description:
      "Validate cryptocurrency wallet addresses for Ethereum, Bitcoin, and Solana.",
    category: "crypto",
    relatedTools: ["checksum-address", "mnemonic-generator"],
  },
  {
    slug: "hex-decimal-converter",
    name: "Hex / Decimal Converter",
    description:
      "Convert between hexadecimal and decimal numbers. Useful for Ethereum block numbers, values, and calldata.",
    category: "crypto",
    relatedTools: ["abi-encoder", "eth-unit-converter"],
  },
];

export const guides: Tool[] = [
  {
    slug: "what-is-keccak256",
    name: "What is Keccak256?",
    description:
      "Learn how Keccak256 hashing works, why Ethereum uses it, and how it differs from SHA-3.",
    category: "guides",
    relatedTools: ["keccak256-hash"],
  },
  {
    slug: "abi-encoding-explained",
    name: "ABI Encoding Explained",
    description:
      "Understand how Ethereum ABI encoding works, from function selectors to parameter encoding.",
    category: "guides",
    relatedTools: ["abi-encoder"],
  },
  {
    slug: "how-gas-fees-work",
    name: "How Gas Fees Work",
    description:
      "A complete guide to Ethereum gas fees: what they are, how they're calculated, and how to optimize them.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter"],
  },
  {
    slug: "bip39-explained",
    name: "BIP39 Mnemonic Phrases Explained",
    description:
      "Learn how BIP39 mnemonic seed phrases work, how they generate keys, and best practices for security.",
    category: "guides",
    relatedTools: ["mnemonic-generator"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return [...tools, ...guides].find((t) => t.slug === slug);
}

export function getRelatedItems(tool: Tool): Tool[] {
  const allItems = [...tools, ...guides];
  const relatedSlugs = [
    ...(tool.relatedTools || []),
    ...(tool.relatedGuide ? [tool.relatedGuide] : []),
  ];
  return allItems.filter((t) => relatedSlugs.includes(t.slug));
}
