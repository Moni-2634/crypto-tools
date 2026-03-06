import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "How to Deploy a Smart Contract: Step-by-Step Guide | EVMTools",
  description:
    "Learn how to deploy a smart contract to Ethereum step by step. Covers Remix, Hardhat, and Foundry with code examples, testnet deployment, Etherscan verification, and mainnet considerations.",
  keywords: [
    "deploy smart contract",
    "how to deploy smart contract",
    "deploy ethereum contract",
    "hardhat deploy",
    "foundry deploy",
    "solidity deploy",
    "deploy to sepolia",
    "smart contract deployment",
    "etherscan verify",
    "remix deploy",
  ],
  openGraph: {
    title:
      "How to Deploy a Smart Contract: Step-by-Step Guide | EVMTools",
    description:
      "Learn how to deploy a smart contract to Ethereum step by step. Covers Remix, Hardhat, and Foundry with code examples, testnet deployment, Etherscan verification, and mainnet considerations.",
    url: `${SITE_URL}/guides/how-to-deploy-smart-contract`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Deploy a Smart Contract: Step-by-Step Guide",
    description:
      "Learn how to deploy a smart contract to Ethereum step by step. Covers Remix, Hardhat, and Foundry with code examples, testnet deployment, and Etherscan verification.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-deploy-smart-contract`,
  },
};

export default function HowToDeploySmartContractPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Deploy a Smart Contract: Step-by-Step Guide",
    description:
      "Learn how to deploy a smart contract to Ethereum step by step. Covers Remix, Hardhat, and Foundry with code examples, testnet deployment, Etherscan verification, and mainnet considerations.",
    url: `${SITE_URL}/guides/how-to-deploy-smart-contract`,
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
      "@id": `${SITE_URL}/guides/how-to-deploy-smart-contract`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "How much does it cost to deploy a smart contract?",
      answer:
        "Deployment cost depends on the contract size, the network, and current gas prices. A simple contract on Ethereum mainnet typically costs $50-$500 in gas fees. On L2 networks like Arbitrum or Base, the same deployment costs $0.50-$5. On testnets like Sepolia, deployment is free since test ETH has no real value.",
    },
    {
      question: "What is the difference between Hardhat and Foundry?",
      answer:
        "Hardhat uses JavaScript/TypeScript for scripts and tests, making it accessible to web developers. Foundry uses Solidity for tests and Rust-based tooling, offering faster compilation and execution. Hardhat has a larger plugin ecosystem, while Foundry is preferred for gas optimization and fuzz testing. Both are production-grade tools.",
    },
    {
      question: "Do I need to verify my smart contract on Etherscan?",
      answer:
        "Verification is not required but strongly recommended. Verified contracts show their source code on Etherscan, allowing users to read the code and interact with functions directly. Unverified contracts display only bytecode, which reduces trust and makes it harder for users and other developers to interact with your contract.",
    },
    {
      question: "Should I deploy to a testnet first?",
      answer:
        "Always deploy to a testnet first. Testnets like Sepolia replicate the Ethereum environment with free test ETH, letting you verify your contract works correctly before spending real money. Test all functions, edge cases, and integrations on the testnet before deploying to mainnet.",
    },
    {
      question: "Can I update a smart contract after deployment?",
      answer:
        "Standard smart contracts are immutable once deployed. However, you can use proxy patterns (like UUPS or Transparent Proxy) that separate the contract logic from its storage, allowing you to deploy updated logic contracts while preserving the state and address. This adds complexity and should be planned from the start.",
    },
  ]);

  return (
    <ToolLayout slug="how-to-deploy-smart-contract">
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
            Deploying a{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contract
            </Link>{" "}
            to Ethereum is the process of compiling your Solidity code into
            bytecode and broadcasting a special transaction that stores that
            bytecode on the blockchain. Once deployed, your contract gets a
            permanent address and can be called by anyone. This guide walks
            you through every step &mdash; from writing the contract to
            verifying it on Etherscan &mdash; using the three most popular
            development tools: Remix, Hardhat, and Foundry.
          </p>
        </section>

        {/* Prerequisites */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Prerequisites
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before deploying, make sure you have the following ready:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">MetaMask or another wallet</strong>{" "}
              with a private key you control. Never use your main wallet for
              development &mdash; create a dedicated development wallet.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Test ETH</strong> for testnet
              deployment. Get free Sepolia ETH from faucets like
              sepoliafaucet.com or the Alchemy Sepolia Faucet.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Node.js 18+</strong> installed
              (required for Hardhat). Not needed for Remix or Foundry.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">An RPC endpoint</strong> from
              providers like Alchemy, Infura, or QuickNode. These let your
              tools communicate with the Ethereum network.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">An Etherscan API key</strong>{" "}
              (free) for contract verification.
            </li>
          </ul>
        </section>

        {/* Tool Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Deployment Tools Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            There are three major tools for deploying Solidity contracts. Each
            has different strengths:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Remix
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Hardhat
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Foundry
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Setup</td>
                  <td className="px-4 py-3">Browser-based, no install</td>
                  <td className="px-4 py-3">npm install</td>
                  <td className="px-4 py-3">curl install (Rust-based)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Language</td>
                  <td className="px-4 py-3">GUI + Solidity</td>
                  <td className="px-4 py-3">JavaScript / TypeScript</td>
                  <td className="px-4 py-3">Solidity + shell commands</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Compile speed</td>
                  <td className="px-4 py-3">Moderate</td>
                  <td className="px-4 py-3">Moderate</td>
                  <td className="px-4 py-3">Very fast</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Testing</td>
                  <td className="px-4 py-3">Limited</td>
                  <td className="px-4 py-3">Mocha/Chai (JS)</td>
                  <td className="px-4 py-3">Solidity tests + fuzzing</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Best for</td>
                  <td className="px-4 py-3">Beginners, quick tests</td>
                  <td className="px-4 py-3">Full-stack dApps</td>
                  <td className="px-4 py-3">Protocol development</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Verification</td>
                  <td className="px-4 py-3">Plugin</td>
                  <td className="px-4 py-3">hardhat-verify plugin</td>
                  <td className="px-4 py-3">forge verify-contract</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 1: Write the Contract */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Step 1: Write the Solidity Contract
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Let us start with a simple but practical contract that demonstrates
            key Solidity features. This is a basic storage contract with an
            owner and event emissions:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title SimpleStorage
/// @notice A basic contract for storing and retrieving a value
contract SimpleStorage {
    address public owner;
    uint256 private storedValue;

    event ValueChanged(address indexed updater, uint256 newValue);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(uint256 initialValue) {
        owner = msg.sender;
        storedValue = initialValue;
        emit ValueChanged(msg.sender, initialValue);
    }

    function set(uint256 newValue) external onlyOwner {
        storedValue = newValue;
        emit ValueChanged(msg.sender, newValue);
    }

    function get() external view returns (uint256) {
        return storedValue;
    }
}`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This contract includes a constructor argument (
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              initialValue
            </code>
            ), an access control modifier, events, and both write and read
            functions &mdash; covering the most common patterns you will
            encounter in real contracts.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Step 2: Deploy with Hardhat */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Step 2a: Deploy with Hardhat
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Hardhat is the most popular Ethereum development framework.
            Initialize a project and install dependencies:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`mkdir my-contract && cd my-contract
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Choose "Create a TypeScript project"`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Save your contract as{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              contracts/SimpleStorage.sol
            </code>
            . Then configure your network in{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              hardhat.config.ts
            </code>
            :
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
};

export default config;`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Create a deployment script at{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              scripts/deploy.ts
            </code>
            :
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`import { ethers } from "hardhat";

async function main() {
  const initialValue = 42;
  const factory = await ethers.getContractFactory("SimpleStorage");
  const contract = await factory.deploy(initialValue);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("SimpleStorage deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Compile and deploy:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Compile
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia`}</code>
          </pre>
        </section>

        {/* Step 2b: Deploy with Foundry */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Step 2b: Deploy with Foundry
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Foundry is a blazing-fast Rust-based toolkit favored by protocol
            developers. Install it and initialize a project:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Create a new project
forge init my-contract
cd my-contract`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Save your contract in{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              src/SimpleStorage.sol
            </code>
            . Then compile and deploy with a single command:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Compile
forge build

# Deploy to Sepolia testnet
forge create src/SimpleStorage.sol:SimpleStorage \\
  --rpc-url $SEPOLIA_RPC_URL \\
  --private-key $PRIVATE_KEY \\
  --constructor-args 42

# Output:
# Deployer: 0xYourAddress
# Deployed to: 0xContractAddress
# Transaction hash: 0xTxHash`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Foundry also supports deployment scripts written in Solidity for
            more complex deployment workflows:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SimpleStorage.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        SimpleStorage store = new SimpleStorage(42);
        console.log("Deployed to:", address(store));
        vm.stopBroadcast();
    }
}

// Run with:
// forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL
//   --private-key $PRIVATE_KEY --broadcast`}</code>
          </pre>
        </section>

        {/* Step 3: Verify on Etherscan */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Step 3: Verify on Etherscan
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Verification publishes your source code on{" "}
            <Link
              href="/guides/how-to-read-etherscan"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Etherscan
            </Link>
            , letting anyone read and audit it. This builds trust and lets users
            interact with your contract directly through Etherscan&apos;s UI.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Verify with Hardhat
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Verify with constructor arguments
npx hardhat verify --network sepolia \\
  0xYourContractAddress 42`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Verify with Foundry
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`forge verify-contract 0xYourContractAddress \\
  src/SimpleStorage.sol:SimpleStorage \\
  --chain sepolia \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  --constructor-args $(cast abi-encode "constructor(uint256)" 42)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            After verification, navigate to your contract address on Etherscan.
            You will see a green checkmark on the &quot;Contract&quot; tab, and
            the &quot;Read Contract&quot; and &quot;Write Contract&quot; tabs
            become available for direct interaction.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Step 4: Mainnet Deployment */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Step 4: Deploying to Mainnet
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Once your contract works correctly on the testnet, you can deploy to
            mainnet. This involves real money, so take extra precautions:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Security audit</strong>: For
              contracts handling user funds, get a professional audit from firms
              like OpenZeppelin, Trail of Bits, or Cantina. At minimum, use
              automated tools like Slither and Mythril.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Gas estimation</strong>: Use{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                eth_estimateGas
              </code>{" "}
              or Hardhat&apos;s gas reporter to estimate deployment costs.
              Check current{" "}
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                gas prices
              </Link>{" "}
              and deploy during low-traffic periods (typically weekends or early
              UTC mornings) to save money.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Private key security</strong>:
              Never hardcode private keys. Use environment variables, hardware
              wallets (via Ledger/Trezor integration), or a secure key
              management service.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Contract size limit</strong>:
              Ethereum contracts cannot exceed 24,576 bytes (24 KB) of deployed
              bytecode per EIP-170. If your contract is too large, split it
              into libraries or use the diamond pattern (EIP-2535).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Immutability awareness</strong>:
              Once deployed, you cannot change the bytecode. If you need
              upgradability, implement a proxy pattern before deployment.
            </li>
          </ul>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Deploying to mainnet costs real ETH.
              A simple contract costs approximately $50&ndash;$500 depending on
              gas prices and contract complexity. Always deploy to a testnet
              first and thoroughly test every function.
            </p>
          </div>
        </section>

        {/* Using Remix */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quick Deploy with Remix (Browser-Based)
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Remix is the fastest way to deploy a contract without installing
            anything. It is ideal for beginners and quick prototyping:
          </p>
          <ol className="ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              Navigate to{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                remix.ethereum.org
              </code>{" "}
              in your browser.
            </li>
            <li>
              Create a new file in the &quot;contracts&quot; folder and paste
              your Solidity code.
            </li>
            <li>
              Open the &quot;Solidity Compiler&quot; tab (left sidebar) and
              click &quot;Compile.&quot; Ensure the compiler version matches
              your pragma statement.
            </li>
            <li>
              Switch to the &quot;Deploy &amp; Run&quot; tab. Under
              &quot;Environment,&quot; select &quot;Injected Provider -
              MetaMask&quot; to connect your wallet.
            </li>
            <li>
              Enter constructor arguments (e.g.,{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                42
              </code>
              ), then click &quot;Deploy.&quot;
            </li>
            <li>
              Confirm the transaction in MetaMask. Once mined, your contract
              address appears in the &quot;Deployed Contracts&quot; section.
            </li>
          </ol>
        </section>

        {/* Deployment Checklist */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pre-Deployment Checklist
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before deploying to any network, run through this checklist:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>All tests pass with 100% coverage of critical paths</li>
            <li>No compiler warnings (treat warnings as errors)</li>
            <li>Reentrancy guards on all external-calling functions</li>
            <li>Access control on sensitive functions (onlyOwner, etc.)</li>
            <li>Events emitted for all state changes</li>
            <li>Constructor arguments double-checked</li>
            <li>
              Gas optimizations reviewed (storage packing, calldata vs memory)
            </li>
            <li>
              Static analysis run (Slither:{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                slither .
              </code>
              )
            </li>
            <li>Testnet deployment verified and tested end-to-end</li>
            <li>Private key stored securely (not in code or git)</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much does it cost to deploy a smart contract?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Deployment cost depends on the contract size, the network, and
              current gas prices. A simple contract on Ethereum mainnet
              typically costs $50&ndash;$500 in gas fees. On L2 networks like
              Arbitrum or Base, the same deployment costs $0.50&ndash;$5. On
              testnets like Sepolia, deployment is free since test ETH has no
              real value.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between Hardhat and Foundry?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Hardhat uses JavaScript/TypeScript for scripts and tests, making
              it accessible to web developers. Foundry uses Solidity for tests
              and Rust-based tooling, offering faster compilation and execution.
              Hardhat has a larger plugin ecosystem, while Foundry is preferred
              for gas optimization and fuzz testing. Both are production-grade.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Do I need to verify my smart contract on Etherscan?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Verification is not required but strongly recommended. Verified
              contracts show their source code on Etherscan, allowing users to
              read the code and interact with functions directly. Unverified
              contracts display only bytecode, which reduces trust and makes
              integration harder.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Should I deploy to a testnet first?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Always deploy to a testnet first. Testnets like Sepolia replicate
              the Ethereum environment with free test ETH, letting you verify
              your contract works correctly before spending real money. Test all
              functions, edge cases, and integrations on the testnet before
              deploying to mainnet.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can I update a smart contract after deployment?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Standard smart contracts are immutable once deployed. However, you
              can use proxy patterns (like UUPS or Transparent Proxy) that
              separate the contract logic from its storage, allowing you to
              deploy updated logic while preserving the state and address. This
              adds complexity and should be planned from the start.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Debug Your Deployed Contracts
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            After deploying, use our{" "}
            <Link
              href="/crypto/calldata-decoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Calldata Decoder
            </Link>{" "}
            to inspect transaction data, the{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>{" "}
            to encode function calls, or the{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            to compute function selectors.
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Guides and Tools
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Understand the fundamentals before deploying
            </li>
            <li>
              <Link
                href="/guides/how-gas-fees-work"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How Gas Fees Work
              </Link>{" "}
              &mdash; Understand what you are paying for during deployment
            </li>
            <li>
              <Link
                href="/guides/abi-encoding-explained"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoding Explained
              </Link>{" "}
              &mdash; How constructor arguments and function calls are encoded
            </li>
            <li>
              <Link
                href="/guides/how-to-read-etherscan"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                How to Read Etherscan
              </Link>{" "}
              &mdash; Navigate and verify your deployed contracts
            </li>
            <li>
              <Link
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder / Decoder
              </Link>{" "}
              &mdash; Encode constructor arguments and function calls
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
