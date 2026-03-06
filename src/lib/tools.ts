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
    relatedTools: ["abi-encoder", "eth-unit-converter", "utf8-hex-converter"],
  },
  {
    slug: "unix-timestamp",
    name: "Unix Timestamp Converter",
    description:
      "Convert between Unix timestamps and human-readable dates. Includes notable Ethereum timestamps and relative time display.",
    category: "crypto",
    relatedTools: ["hex-decimal-converter", "eth-unit-converter"],
  },
  {
    slug: "utf8-hex-converter",
    name: "UTF-8 / Hex / Bytes Converter",
    description:
      "Convert between UTF-8 text, hexadecimal strings, and byte arrays. Essential for encoding and debugging Ethereum data.",
    category: "crypto",
    relatedTools: ["hex-decimal-converter", "keccak256-hash", "abi-encoder"],
  },
  {
    slug: "signature-verifier",
    name: "Signature Signer & Verifier",
    description:
      "Sign messages with a private key and verify Ethereum EIP-191 signatures. Recover signer addresses from signed messages.",
    category: "crypto",
    relatedTools: ["private-key-to-address", "keccak256-hash", "address-validator"],
  },
  {
    slug: "private-key-to-address",
    name: "Private Key to Address",
    description:
      "Derive Ethereum public key and checksummed address from a private key. Shows uncompressed and compressed public keys.",
    category: "crypto",
    relatedTools: ["signature-verifier", "checksum-address", "mnemonic-generator"],
  },
  {
    slug: "calldata-decoder",
    name: "Calldata Decoder",
    description:
      "Decode raw Ethereum calldata hex into human-readable function calls and parameters.",
    category: "crypto",
    relatedTools: ["abi-encoder", "erc20-decoder", "keccak256-hash"],
  },
  {
    slug: "storage-slot-calculator",
    name: "Storage Slot Calculator",
    description:
      "Calculate Solidity storage slots for variables, mappings, and nested mappings using keccak256.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "hex-decimal-converter"],
  },
  {
    slug: "erc20-decoder",
    name: "ERC-20 Token Info Decoder",
    description:
      "Decode ERC-20 token function calls and event logs from raw transaction data.",
    category: "crypto",
    relatedGuide: "what-is-erc20",
    relatedTools: ["calldata-decoder", "abi-encoder"],
  },
  {
    slug: "merkle-proof-generator",
    name: "Merkle Proof Generator",
    description:
      "Generate and verify Merkle proofs for whitelists and allowlists. Build Merkle trees with keccak256 hashing.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "checksum-address"],
  },
  {
    slug: "rlp-encoder",
    name: "RLP Encoder / Decoder",
    description:
      "Encode and decode Recursive Length Prefix (RLP) data. The serialization format used by Ethereum transactions and blocks.",
    category: "crypto",
    relatedTools: ["hex-decimal-converter", "utf8-hex-converter"],
  },
  {
    slug: "event-hash-calculator",
    name: "Solidity Event Hash Calculator",
    description:
      "Calculate keccak256 hashes for Solidity event signatures. Get topic 0 values for filtering Ethereum logs.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "abi-encoder", "erc20-decoder"],
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
  {
    slug: "what-is-erc20",
    name: "What is ERC-20?",
    description:
      "Learn what ERC-20 tokens are, how the standard works, the 6 required functions, transfer patterns, and common vulnerabilities.",
    category: "guides",
    relatedTools: ["erc20-decoder", "abi-encoder", "calldata-decoder"],
  },
  {
    slug: "what-is-erc721",
    name: "What is ERC-721 (NFTs)?",
    description:
      "Learn what ERC-721 is, how NFT smart contracts work, the required interface, metadata standards, and minting.",
    category: "guides",
    relatedTools: ["abi-encoder", "calldata-decoder", "keccak256-hash"],
  },
  {
    slug: "what-is-smart-contract",
    name: "What is a Smart Contract?",
    description:
      "Learn what smart contracts are, how they work on Ethereum, Solidity basics, real-world use cases, and security considerations.",
    category: "guides",
    relatedTools: ["abi-encoder", "keccak256-hash", "gas-calculator", "storage-slot-calculator"],
  },
  {
    slug: "how-to-read-etherscan",
    name: "How to Read Etherscan",
    description:
      "Learn how to read Etherscan: understand transactions, contracts, event logs, token transfers, and advanced features.",
    category: "guides",
    relatedTools: ["calldata-decoder", "abi-encoder", "event-hash-calculator", "hex-decimal-converter"],
  },
  {
    slug: "what-is-defi",
    name: "What is DeFi?",
    description:
      "Learn what DeFi is, how decentralized finance works, major protocols, AMMs, liquidity pools, and DeFi risks.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter", "checksum-address"],
  },
  {
    slug: "what-is-staking",
    name: "What is Staking?",
    description:
      "Learn how Ethereum staking works, liquid staking options, validator requirements, staking rewards, and risks.",
    category: "guides",
    relatedTools: ["eth-unit-converter", "gas-calculator"],
  },
  {
    slug: "ethereum-vs-bitcoin",
    name: "Ethereum vs Bitcoin",
    description:
      "A comprehensive comparison of Ethereum and Bitcoin: consensus, smart contracts, tokenomics, and Layer 2 solutions.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter"],
  },
  {
    slug: "what-is-layer2",
    name: "What is a Layer 2?",
    description:
      "Understand Layer 2 scaling solutions: optimistic rollups, ZK rollups, and how they reduce Ethereum gas costs.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter"],
  },
  {
    slug: "what-is-mev",
    name: "What is MEV?",
    description:
      "Learn about Maximal Extractable Value: frontrunning, sandwich attacks, Flashbots, and how to protect yourself.",
    category: "guides",
    relatedTools: ["gas-calculator", "event-hash-calculator"],
  },
  {
    slug: "eip-1559-explained",
    name: "EIP-1559 Explained",
    description:
      "Understand Ethereum's fee market reform: base fee, priority tips, ETH burn, and how gas pricing works post-London.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter"],
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
