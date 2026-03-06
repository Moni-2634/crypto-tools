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
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description:
      "Encode and decode Base64 strings online. Supports text and hex input with URL-safe Base64 option for Ethereum development.",
    category: "crypto",
    relatedTools: ["utf8-hex-converter", "hex-decimal-converter"],
  },
  {
    slug: "create2-calculator",
    name: "CREATE2 Address Calculator",
    description:
      "Calculate deterministic smart contract addresses using CREATE2. Input deployer address, salt, and init code hash to predict deployment addresses.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "checksum-address"],
  },
  {
    slug: "function-selector",
    name: "Function Selector Lookup",
    description:
      "Calculate Solidity function selectors from signatures using keccak256. Browse a table of 30+ common ERC-20, ERC-721, and Ownable selectors.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "event-hash-calculator", "abi-encoder"],
  },
  {
    slug: "error-decoder",
    name: "Solidity Error Decoder",
    description:
      "Decode Solidity revert data into human-readable error messages. Supports Error(string), Panic(uint256) codes, and custom errors.",
    category: "crypto",
    relatedTools: ["calldata-decoder", "abi-encoder"],
  },
  {
    slug: "bytes32-converter",
    name: "Bytes32 / String Converter",
    description:
      "Convert between bytes32 hex, UTF-8 strings, numbers, and addresses. Visualize padding for Solidity bytes32 values.",
    category: "crypto",
    relatedTools: ["utf8-hex-converter", "hex-decimal-converter"],
  },
  {
    slug: "eip712-hasher",
    name: "EIP-712 Typed Data Hasher",
    description:
      "Hash EIP-712 typed structured data online. Compute domain separator, struct hash, and final signing hash for permits and gasless transactions.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "signature-verifier", "abi-encoder"],
  },
  {
    slug: "token-unit-converter",
    name: "Token Unit Converter",
    description:
      "Convert between human-readable token amounts and raw values for any ERC-20 token. Supports custom decimals for USDC, WBTC, ETH, and more.",
    category: "crypto",
    relatedTools: ["eth-unit-converter", "hex-decimal-converter", "erc20-decoder"],
  },
  {
    slug: "batch-keccak256",
    name: "Batch Keccak256 Hasher",
    description:
      "Hash multiple inputs at once with Keccak256. Get hashes and function selectors for multiple function signatures, storage keys, or arbitrary text.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "event-hash-calculator", "abi-encoder"],
  },
  {
    slug: "epoch-calculator",
    name: "Ethereum Epoch / Slot Calculator",
    description:
      "Convert between Ethereum beacon chain epochs, slots, timestamps, and dates. Live current epoch and slot display with notable epoch references.",
    category: "crypto",
    relatedTools: ["unix-timestamp", "hex-decimal-converter"],
  },
  {
    slug: "contract-size-calculator",
    name: "Contract Size Calculator",
    description:
      "Check if your Solidity contract bytecode fits within the 24KB EIP-170 limit. Paste bytecode to see size, percentage used, and optimization tips.",
    category: "crypto",
    relatedTools: ["hex-decimal-converter", "keccak256-hash"],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description:
      "Decode JSON Web Tokens into header, payload, and signature. View claims, check expiration, and validate JWT structure.",
    category: "crypto",
    relatedTools: ["base64-encoder", "json-formatter"],
  },
  {
    slug: "sha256-hash",
    name: "SHA-256 Hash Generator",
    description:
      "Generate SHA-256 hashes from text or hex input using the Web Crypto API. Compare SHA-256 with Keccak256 for Ethereum development.",
    category: "crypto",
    relatedTools: ["keccak256-hash", "md5-hash"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter / Validator",
    description:
      "Format, minify, and validate JSON data online. Pretty-print with configurable indentation and see detailed error positions for invalid JSON.",
    category: "crypto",
    relatedTools: ["abi-encoder", "jwt-decoder"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate UUID v4 identifiers online. Bulk generate up to 25 UUIDs with options for uppercase, lowercase, and with or without hyphens.",
    category: "crypto",
    relatedTools: ["keccak256-hash"],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description:
      "Encode and decode URL components online. Compare encodeURIComponent vs encodeURI with a common URL encodings reference table.",
    category: "crypto",
    relatedTools: ["base64-encoder", "utf8-hex-converter"],
  },
  {
    slug: "md5-hash",
    name: "MD5 Hash Generator",
    description:
      "Generate MD5 hashes from text input online. Pure JavaScript implementation with RFC 1321 test vectors. Note: MD5 is not cryptographically secure.",
    category: "crypto",
    relatedTools: ["sha256-hash", "keccak256-hash"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description:
      "Test regular expressions with real-time matching, capture group display, and flag toggles. Includes common patterns for email, URL, Ethereum addresses, and more.",
    category: "crypto",
    relatedTools: ["json-formatter"],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs instantly. Get reading time estimates, character counts, and word frequency analysis.",
    category: "crypto",
    relatedTools: ["character-counter", "lorem-ipsum-generator", "markdown-preview"],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    description:
      "Count characters with and without spaces. Check text against Twitter, meta description, and other platform character limits in real time.",
    category: "crypto",
    relatedTools: ["word-counter", "lorem-ipsum-generator", "html-encoder"],
  },
  {
    slug: "color-picker",
    name: "Color Picker / Converter",
    description:
      "Pick colors and convert between HEX, RGB, and HSL formats. Check WCAG contrast ratios, generate shades, and get CSS values.",
    category: "crypto",
    relatedTools: ["hex-decimal-converter", "json-formatter"],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description:
      "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free dummy text generator for design and development.",
    category: "crypto",
    relatedTools: ["word-counter", "character-counter", "markdown-preview"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate strong, random passwords with customizable length, uppercase, lowercase, numbers, and symbols. Cryptographically secure with strength meter.",
    category: "crypto",
    relatedTools: ["uuid-generator", "sha256-hash", "base64-encoder"],
  },
  {
    slug: "diff-checker",
    name: "Diff Checker",
    description:
      "Compare two texts and see the differences highlighted line by line. Online diff tool with added, removed, and unchanged line detection.",
    category: "crypto",
    relatedTools: ["json-formatter", "html-encoder", "markdown-preview"],
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description:
      "Write markdown and see a live rendered preview side by side. Supports headers, bold, italic, code blocks, lists, links, and more.",
    category: "crypto",
    relatedTools: ["html-encoder", "word-counter", "diff-checker"],
  },
  {
    slug: "html-encoder",
    name: "HTML Encoder / Decoder",
    description:
      "Encode and decode HTML entities online. Convert special characters to HTML entities for safe display in web pages.",
    category: "crypto",
    relatedTools: ["url-encoder", "base64-encoder", "markdown-preview"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description:
      "Generate QR codes from text, URLs, emails, or Wi-Fi credentials online. Customize colors, download as PNG. Free, client-side tool.",
    category: "crypto",
    relatedTools: ["base64-encoder", "url-encoder", "image-to-base64"],
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64 Converter",
    description:
      "Convert images to Base64 encoded strings online. Drag and drop PNG, JPG, GIF, SVG, or WebP files to get Data URIs for HTML, CSS, and JSON.",
    category: "crypto",
    relatedTools: ["base64-encoder", "qr-code-generator", "json-formatter"],
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    description:
      "Convert JSON arrays to CSV and CSV to JSON online. Supports custom delimiters, proper escaping, nested objects, and file download.",
    category: "crypto",
    relatedTools: ["json-formatter", "base64-encoder", "url-encoder"],
  },
  {
    slug: "cron-parser",
    name: "Cron Expression Parser",
    description:
      "Parse and explain cron expressions online. Get human-readable descriptions, see next scheduled run times, and learn cron syntax.",
    category: "crypto",
    relatedTools: ["unix-timestamp", "regex-tester", "json-formatter"],
  },
  {
    slug: "slugify",
    name: "Slugify Tool",
    description:
      "Convert text to URL-friendly slugs online. Customize separator, case, max length, and handle unicode characters. Free slug generator.",
    category: "crypto",
    relatedTools: ["url-encoder", "text-case-converter", "regex-tester"],
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    description:
      "Convert numbers between binary, octal, decimal, and hexadecimal online. Supports arbitrarily large numbers with BigInt.",
    category: "crypto",
    relatedTools: ["hex-decimal-converter", "utf8-hex-converter", "base64-encoder"],
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    description:
      "Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, Title Case, CONSTANT_CASE, and more.",
    category: "crypto",
    relatedTools: ["slugify", "regex-tester", "json-formatter"],
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
  {
    slug: "what-is-web3",
    name: "What is Web3?",
    description:
      "Learn what Web3 is, how it differs from Web1 and Web2, the role of decentralization and blockchain, dApps, wallets, and digital ownership.",
    category: "guides",
    relatedTools: ["mnemonic-generator", "checksum-address"],
  },
  {
    slug: "what-is-crypto-wallet",
    name: "What is a Crypto Wallet?",
    description:
      "Learn what crypto wallets are, how they work with private and public keys, hot vs cold wallets, security best practices, and how to choose the right wallet.",
    category: "guides",
    relatedTools: ["private-key-to-address", "mnemonic-generator", "checksum-address"],
  },
  {
    slug: "what-is-dao",
    name: "What is a DAO?",
    description:
      "Learn what DAOs are, how decentralized governance works with tokens and voting, famous DAOs, DAO types, tools, and legal considerations.",
    category: "guides",
    relatedTools: ["abi-encoder", "keccak256-hash"],
  },
  {
    slug: "what-is-dex",
    name: "What is a DEX?",
    description:
      "Learn what decentralized exchanges are, how AMMs work, DEX vs CEX comparison, liquidity pools, slippage, price impact, and MEV.",
    category: "guides",
    relatedTools: ["calldata-decoder", "gas-calculator", "eth-unit-converter"],
  },
  {
    slug: "what-is-yield-farming",
    name: "What is Yield Farming?",
    description:
      "Learn what yield farming is, how liquidity mining works, APR vs APY, farming strategies, risks, and popular platforms like Yearn and Convex.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter", "calldata-decoder"],
  },
  {
    slug: "what-is-impermanent-loss",
    name: "What is Impermanent Loss?",
    description:
      "Learn what impermanent loss is, the IL formula, real examples with numbers, an IL table by price change, and strategies to mitigate liquidity pool risk.",
    category: "guides",
    relatedTools: ["gas-calculator", "eth-unit-converter"],
  },
  {
    slug: "what-is-flash-loan",
    name: "What is a Flash Loan?",
    description:
      "Learn what flash loans are, how atomic transactions work, platforms like Aave, use cases including arbitrage, famous flash loan attacks, and Solidity code examples.",
    category: "guides",
    relatedTools: ["abi-encoder", "gas-calculator"],
  },
  {
    slug: "what-is-oracle",
    name: "What is a Blockchain Oracle?",
    description:
      "Learn what blockchain oracles are, the oracle problem, types of oracles, major providers like Chainlink and Pyth, oracle attacks, and DeFi use cases.",
    category: "guides",
    relatedTools: ["abi-encoder", "checksum-address"],
  },
  {
    slug: "what-is-bridge",
    name: "What is a Crypto Bridge?",
    description:
      "Learn what cross-chain bridges are, bridge types, major bridges like Wormhole and LayerZero, bridge security risks, and famous bridge hacks.",
    category: "guides",
    relatedTools: ["checksum-address", "gas-calculator"],
  },
  {
    slug: "what-is-account-abstraction",
    name: "What is Account Abstraction?",
    description:
      "Learn what account abstraction is, how ERC-4337 works, smart contract wallets, social recovery, gas sponsorship, session keys, and wallet implementations.",
    category: "guides",
    relatedTools: ["abi-encoder", "gas-calculator"],
  },
  {
    slug: "what-is-erc1155",
    name: "What is ERC-1155?",
    description:
      "Learn what ERC-1155 is, how the multi-token standard works, batch transfers, gas efficiency, and how it compares to ERC-20 and ERC-721.",
    category: "guides",
    relatedTools: ["abi-encoder", "calldata-decoder", "keccak256-hash"],
  },
  {
    slug: "how-to-deploy-smart-contract",
    name: "How to Deploy a Smart Contract",
    description:
      "Step-by-step guide to deploying smart contracts using Remix, Hardhat, and Foundry. Covers testnet deployment, Etherscan verification, and mainnet considerations.",
    category: "guides",
    relatedTools: ["abi-encoder", "calldata-decoder", "gas-calculator"],
  },
  {
    slug: "what-is-token",
    name: "What is a Crypto Token?",
    description:
      "Learn what crypto tokens are, token vs coin differences, token types (utility, governance, security, stablecoin), token standards, and tokenomics.",
    category: "guides",
    relatedTools: ["erc20-decoder", "abi-encoder", "eth-unit-converter"],
  },
  {
    slug: "what-is-ethereum",
    name: "What is Ethereum?",
    description:
      "Comprehensive Ethereum guide covering history, how it works, The Merge, ETH the asset, the ecosystem (DeFi, NFTs, DAOs, L2s), and the roadmap.",
    category: "guides",
    relatedTools: ["eth-unit-converter", "gas-calculator", "checksum-address"],
  },
  {
    slug: "what-is-blockchain",
    name: "What is a Blockchain?",
    description:
      "Beginner-friendly guide to blockchain technology: how blocks are chained, consensus mechanisms, blockchain types, the trilemma, and use cases beyond crypto.",
    category: "guides",
    relatedTools: ["keccak256-hash", "calldata-decoder", "checksum-address"],
  },
  {
    slug: "best-hardware-wallets",
    name: "Best Hardware Wallets 2025",
    description:
      "Compare the best hardware wallets: Ledger Nano X, Nano S Plus, Trezor Model T, and Safe 3. Prices, features, security, and buying guide.",
    category: "guides",
    relatedTools: ["private-key-to-address", "mnemonic-generator", "checksum-address"],
  },
  {
    slug: "best-crypto-exchanges",
    name: "Best Crypto Exchanges 2025",
    description:
      "Compare top crypto exchanges: Binance, Bybit, Coinbase, Kraken, and OKX. Fees, security, features, and recommendations for beginners and advanced traders.",
    category: "guides",
    relatedTools: ["eth-unit-converter", "gas-calculator"],
  },
  {
    slug: "how-to-stake-eth",
    name: "How to Stake ETH (Step-by-Step)",
    description:
      "Complete guide to staking Ethereum: solo staking, liquid staking with Lido and Rocket Pool, exchange staking, APR comparison, risks, and tax implications.",
    category: "guides",
    relatedTools: ["eth-unit-converter", "gas-calculator"],
  },
  {
    slug: "ledger-vs-trezor",
    name: "Ledger vs Trezor 2025",
    description:
      "Detailed Ledger vs Trezor comparison: security architecture, user experience, price, features, controversies, and which to buy for your use case.",
    category: "guides",
    relatedTools: ["private-key-to-address", "mnemonic-generator"],
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

/**
 * Returns up to 3 "Try Also" tool recommendations that are NOT already
 * in the tool's direct relatedTools/relatedGuide list.
 * Uses second-degree connections (tools that share relatedTools) first,
 * then falls back to other tools in the same category.
 */
export function getTryAlsoTools(tool: Tool, count = 3): Tool[] {
  const directSlugs = new Set([
    tool.slug,
    ...(tool.relatedTools || []),
    ...(tool.relatedGuide ? [tool.relatedGuide] : []),
  ]);

  // Score tools by how many relatedTools they share with the current tool
  const scored: { tool: Tool; score: number }[] = [];
  for (const candidate of tools) {
    if (directSlugs.has(candidate.slug)) continue;
    const shared = (candidate.relatedTools || []).filter((s) =>
      (tool.relatedTools || []).includes(s)
    ).length;
    scored.push({ tool: candidate, score: shared });
  }

  // Sort by shared connections (descending), then by array position for stability
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.tool);
}
