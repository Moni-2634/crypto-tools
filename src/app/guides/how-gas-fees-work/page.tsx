import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "How Ethereum Gas Fees Work: A Complete Guide | EVMTools",
  description:
    "A complete guide to Ethereum gas fees: what they are, how they are calculated with EIP-1559, and how to optimize transaction costs.",
  keywords: [
    "ethereum gas fees",
    "how gas fees work",
    "gas limit",
    "gas price",
    "gwei",
    "ethereum transaction fee",
    "eip-1559 gas",
    "base fee",
    "priority fee",
    "gas optimization",
  ],
  openGraph: {
    title:
      "How Ethereum Gas Fees Work: A Complete Guide | EVMTools",
    description:
      "A complete guide to Ethereum gas fees: what they are, how they are calculated with EIP-1559, and how to optimize transaction costs.",
    url: `${SITE_URL}/guides/how-gas-fees-work`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Ethereum Gas Fees Work: A Complete Guide",
    description:
      "A complete guide to Ethereum gas fees: what they are, how they are calculated with EIP-1559, and how to optimize transaction costs.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/how-gas-fees-work`,
  },
};

export default function HowGasFeesWorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Ethereum Gas Fees Work: A Complete Guide",
    description:
      "A complete guide to Ethereum gas fees: what they are, how they are calculated with EIP-1559, and how to optimize transaction costs.",
    url: `${SITE_URL}/guides/how-gas-fees-work`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/how-gas-fees-work`,
    },
  };

  return (
    <ToolLayout slug="how-gas-fees-work">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose-custom space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-300">
            Gas fees are one of the most important concepts in Ethereum. Every
            transaction, every smart contract call, and every token transfer
            requires gas. Yet gas fees remain one of the most confusing topics
            for newcomers. This guide breaks down exactly how Ethereum gas fees
            work, how they are calculated, and how you can optimize them.
          </p>
        </section>

        {/* What is Gas */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What is Gas?</h2>
          <p className="leading-relaxed text-gray-300">
            Gas is a unit of measurement for the computational work required to
            execute operations on the Ethereum network. Every operation in the
            Ethereum Virtual Machine (EVM) has a fixed gas cost. Simple
            operations cost less gas; complex operations cost more.
          </p>
          <p className="leading-relaxed text-gray-300">
            Think of gas like fuel for a car. The more complex your journey
            (transaction), the more fuel (gas) you need. But unlike fuel, the
            price of gas fluctuates based on network demand.
          </p>
          <div className="rounded-lg border border-blue-800/50 bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-200">
              <strong>Key distinction:</strong> Gas is not ETH. Gas is a unit of
              computation. You pay for gas using ETH, but the two are different
              concepts. The amount of ETH you pay depends on the gas price, which
              changes constantly.
            </p>
          </div>
        </section>

        {/* The Gas Fee Formula */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            The Gas Fee Formula
          </h2>
          <p className="leading-relaxed text-gray-300">
            The total fee for a transaction is calculated as:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Transaction Fee = Gas Used \u00d7 Gas Price`}</code>
          </pre>
          <p className="leading-relaxed text-gray-300">
            Let&apos;s break down each component.
          </p>

          <h3 className="text-xl font-semibold text-white">Gas Limit</h3>
          <p className="leading-relaxed text-gray-300">
            The gas limit is the maximum amount of gas you are willing to spend
            on a transaction. You set this value when submitting a transaction.
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-300">
            <li>
              If your transaction uses less gas than the limit, you are refunded
              the difference.
            </li>
            <li>
              If your transaction runs out of gas before completing, the
              transaction fails and you lose the gas that was consumed. The
              remaining gas is refunded, but the used gas is not.
            </li>
          </ul>

          <p className="leading-relaxed text-gray-300">
            Common gas limits for typical operations:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Operation
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Typical Gas Limit
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Simple ETH transfer</td>
                  <td className="px-4 py-3">21,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">ERC-20 token transfer</td>
                  <td className="px-4 py-3">65,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">ERC-20 token approval</td>
                  <td className="px-4 py-3">46,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Uniswap swap</td>
                  <td className="px-4 py-3">150,000 &ndash; 300,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">NFT mint</td>
                  <td className="px-4 py-3">80,000 &ndash; 150,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Complex DeFi interaction</td>
                  <td className="px-4 py-3">200,000 &ndash; 500,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Contract deployment</td>
                  <td className="px-4 py-3">1,000,000 &ndash; 5,000,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-300">
            A simple ETH transfer always costs exactly 21,000 gas because it
            performs a fixed set of operations. Smart contract interactions vary
            because the gas cost depends on the specific code path executed. Try
            calculating costs for these operations with our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>
            .
          </p>
        </section>

        {/* Gas Price and EIP-1559 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Gas Price and EIP-1559
          </h2>
          <p className="leading-relaxed text-gray-300">
            Before August 2021, Ethereum used a simple auction model: users bid
            a gas price in Gwei, and miners prioritized higher-paying
            transactions. This led to unpredictable fees and frequent
            overpayment.
          </p>
          <p className="leading-relaxed text-gray-300">
            EIP-1559, activated in the London hard fork, replaced this system
            with a more predictable fee structure. Under EIP-1559, the gas price
            has two components:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Total Gas Price = Base Fee + Priority Fee (Tip)`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-white">Base Fee</h3>
          <p className="leading-relaxed text-gray-300">
            The base fee is determined algorithmically by the protocol. It
            adjusts automatically based on network congestion:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-300">
            <li>
              If the previous block was more than 50% full, the base fee
              increases (up to 12.5% per block).
            </li>
            <li>
              If the previous block was less than 50% full, the base fee
              decreases.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-300">
            The base fee is{" "}
            <strong className="text-white">burned</strong> &mdash; it is
            destroyed and does not go to validators. This is the mechanism that
            makes ETH deflationary during periods of high usage.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Priority Fee (Tip)
          </h3>
          <p className="leading-relaxed text-gray-300">
            The priority fee is a tip you pay directly to the validator who
            includes your transaction in a block. Higher tips incentivize
            validators to prioritize your transaction. During normal network
            conditions, a tip of 1-2 Gwei is sufficient. During congestion, you
            may need to increase your tip to get faster inclusion.
          </p>

          <h3 className="text-xl font-semibold text-white">Max Fee</h3>
          <p className="leading-relaxed text-gray-300">
            When submitting a transaction, you also specify a max fee &mdash; the
            absolute maximum gas price you are willing to pay. This protects you
            from unexpected fee spikes:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`Actual Price Paid = min(Max Fee, Base Fee + Priority Fee)
Refund = (Max Fee - Actual Price Paid) \u00d7 Gas Used`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Gas Price Units */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Gas Price Units: Wei, Gwei, ETH
          </h2>
          <p className="leading-relaxed text-gray-300">
            Gas prices are typically expressed in Gwei, a subunit of ETH:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Unit
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Value in Wei
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Value in ETH
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Wei</td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">0.000000000000000001</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Gwei</td>
                  <td className="px-4 py-3">1,000,000,000</td>
                  <td className="px-4 py-3">0.000000001</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">ETH</td>
                  <td className="px-4 py-3">1,000,000,000,000,000,000</td>
                  <td className="px-4 py-3">1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-300">
            <strong className="text-white">
              1 Gwei = 1 billion Wei = 0.000000001 ETH
            </strong>
          </p>
          <p className="leading-relaxed text-gray-300">
            When someone says &quot;gas is 30 Gwei,&quot; they mean the gas
            price is 30 Gwei per unit of gas. For a simple ETH transfer (21,000
            gas), the fee would be:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`21,000 gas \u00d7 30 Gwei = 630,000 Gwei = 0.00063 ETH`}</code>
          </pre>
          <p className="leading-relaxed text-gray-300">
            At an ETH price of $3,000, that equals about $1.89. Use our{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to compute exact costs for any gas limit and gas price combination,
            or convert between units with the{" "}
            <Link
              href="/crypto/eth-unit-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ETH Unit Converter
            </Link>
            .
          </p>
        </section>

        {/* Why Do Gas Fees Change */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Why Do Gas Fees Change?
          </h2>
          <p className="leading-relaxed text-gray-300">
            Gas fees are driven by supply and demand. Ethereum blocks have a
            target size of 15 million gas (with a maximum of 30 million gas).
            When demand for block space exceeds the target:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-300">
            <li>More transactions compete for limited block space</li>
            <li>The base fee automatically increases</li>
            <li>Users bid higher priority fees to get included faster</li>
            <li>Total fees rise</li>
          </ol>
          <p className="leading-relaxed text-gray-300">
            Common causes of fee spikes:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Popular NFT mints</strong>: A hyped
              NFT drop can cause thousands of users to submit transactions
              simultaneously
            </li>
            <li>
              <strong className="text-white">DeFi liquidations</strong>: Market
              crashes trigger cascading liquidations that congest the network
            </li>
            <li>
              <strong className="text-white">Token launches</strong>: New token
              launches on DEXes attract high trading volume
            </li>
            <li>
              <strong className="text-white">Airdrop claims</strong>: When a
              major airdrop goes live, thousands of users rush to claim
            </li>
          </ul>
        </section>

        {/* EVM Opcode Gas Costs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            EVM Opcode Gas Costs
          </h2>
          <p className="leading-relaxed text-gray-300">
            Every operation in the EVM has a defined gas cost. Here are some
            common ones:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Opcode
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Operation
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Gas Cost
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">ADD</code>
                  </td>
                  <td className="px-4 py-3">Addition</td>
                  <td className="px-4 py-3">3</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">MUL</code>
                  </td>
                  <td className="px-4 py-3">Multiplication</td>
                  <td className="px-4 py-3">5</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">SLOAD</code>
                  </td>
                  <td className="px-4 py-3">Read from storage</td>
                  <td className="px-4 py-3">2,100 (cold) / 100 (warm)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">SSTORE</code>
                  </td>
                  <td className="px-4 py-3">Write to storage</td>
                  <td className="px-4 py-3">20,000 (new) / 5,000 (update)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">CALL</code>
                  </td>
                  <td className="px-4 py-3">Call another contract</td>
                  <td className="px-4 py-3">2,600 (cold) / 100 (warm)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">CREATE</code>
                  </td>
                  <td className="px-4 py-3">Deploy a contract</td>
                  <td className="px-4 py-3">32,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <code className="text-amber-400">KECCAK256</code>
                  </td>
                  <td className="px-4 py-3">Compute hash</td>
                  <td className="px-4 py-3">30 + 6 per word</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-amber-400">LOG</code>
                  </td>
                  <td className="px-4 py-3">Emit event</td>
                  <td className="px-4 py-3">375 + 375 per topic</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-300">
            Notice the massive cost difference between computation (ADD: 3 gas)
            and storage (SSTORE: 20,000 gas). This is by design: storage
            operations modify the global state that every node must maintain, so
            they are priced much higher to discourage excessive state growth.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Cold vs Warm Access
          </h3>
          <p className="leading-relaxed text-gray-300">
            EIP-2929 introduced the concept of cold and warm storage access:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Cold access</strong>: First time
              accessing a storage slot or address in a transaction. Costs more.
            </li>
            <li>
              <strong className="text-white">Warm access</strong>: Subsequent
              accesses to the same slot or address in the same transaction. Costs
              less.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-300">
            This incentivizes batching reads to the same storage slots, which is
            more efficient for node implementation.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Gas Optimization Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Gas Optimization Tips
          </h2>

          <h3 className="text-xl font-semibold text-white">For Users</h3>
          <ol className="ml-6 list-decimal space-y-3 text-gray-300">
            <li>
              <strong className="text-white">Time your transactions</strong>:
              Gas fees are typically lowest during weekends and late night UTC.
              Monitor gas trackers to find low-fee windows.
            </li>
            <li>
              <strong className="text-white">
                Set appropriate gas limits
              </strong>
              : Most wallets estimate gas limits automatically. Avoid setting
              excessively high limits &mdash; while unused gas is refunded, a
              high limit can signal to validators that your transaction is
              complex.
            </li>
            <li>
              <strong className="text-white">
                Use EIP-1559 transactions
              </strong>
              : Set a reasonable max fee and let the base fee adjust. The
              protocol refunds the difference between your max fee and the actual
              price.
            </li>
            <li>
              <strong className="text-white">
                Consider Layer 2 solutions
              </strong>
              : For frequent transactions, L2 networks like Arbitrum and
              Optimism offer fees that are 10-100x cheaper than Ethereum mainnet.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-white">For Developers</h3>
          <ol className="ml-6 list-decimal space-y-3 text-gray-300">
            <li>
              <strong className="text-white">Minimize storage writes</strong>:
              Each SSTORE costs 20,000 gas for new slots. Pack multiple values
              into a single{" "}
              <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-amber-400">
                uint256
              </code>{" "}
              when possible.
            </li>
          </ol>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`// Expensive: 3 storage slots (60,000 gas for new writes)
uint256 public a;
uint256 public b;
uint256 public c;

// Cheaper: 1 storage slot (20,000 gas for new write)
// Pack three uint80 values into one uint256
uint256 public packed; // a | (b << 80) | (c << 160)`}</code>
          </pre>

          <ol className="ml-6 list-decimal space-y-3 text-gray-300" start={2}>
            <li>
              <strong className="text-white">
                Use calldata instead of memory for function parameters
              </strong>
              :
            </li>
          </ol>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm leading-relaxed text-gray-200">
            <code>{`// More gas (copies data to memory)
function process(uint256[] memory data) external { ... }

// Less gas (reads directly from calldata)
function process(uint256[] calldata data) external { ... }`}</code>
          </pre>

          <ol className="ml-6 list-decimal space-y-3 text-gray-300" start={3}>
            <li>
              <strong className="text-white">Short-circuit conditions</strong>:
              Place the most likely condition first in{" "}
              <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-amber-400">
                require
              </code>{" "}
              chains.
            </li>
            <li>
              <strong className="text-white">
                Use events instead of storage for historical data
              </strong>
              : Emitting an event (LOG) is much cheaper than writing to storage
              (SSTORE).
            </li>
            <li>
              <strong className="text-white">Batch operations</strong>: Combine
              multiple operations into a single transaction using multicall
              patterns.
            </li>
          </ol>
        </section>

        {/* Gas on Layer 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Gas on Layer 2</h2>
          <p className="leading-relaxed text-gray-300">
            Layer 2 solutions like Arbitrum, Optimism, and Base process
            transactions off the main Ethereum chain and post compressed data
            back to L1. This dramatically reduces gas costs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Network
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Simple Transfer Cost
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-200">
                    Compared to L1
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Ethereum L1</td>
                  <td className="px-4 py-3">~$1-5</td>
                  <td className="px-4 py-3">Baseline</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Arbitrum</td>
                  <td className="px-4 py-3">~$0.01-0.10</td>
                  <td className="px-4 py-3">~50-100x cheaper</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Optimism</td>
                  <td className="px-4 py-3">~$0.01-0.10</td>
                  <td className="px-4 py-3">~50-100x cheaper</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Base</td>
                  <td className="px-4 py-3">~$0.001-0.01</td>
                  <td className="px-4 py-3">~100-500x cheaper</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-300">
            L2 fees still include a small L1 component (for posting data to
            Ethereum) and an L2 execution fee. The L1 component fluctuates with
            Ethereum mainnet gas prices.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              What happens if my transaction runs out of gas?
            </h3>
            <p className="leading-relaxed text-gray-300">
              The transaction reverts (fails), and all state changes are undone.
              However, you still pay for the gas that was consumed up to the
              point of failure. The remaining gas (gas limit minus gas used) is
              refunded to your wallet.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              Why is my gas estimate sometimes wrong?
            </h3>
            <p className="leading-relaxed text-gray-300">
              Gas estimates are based on simulating the transaction against the
              current state of the blockchain. If the state changes between when
              you estimate and when the transaction executes (for example,
              another user modifies the same contract), the actual gas
              consumption may differ.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              Can gas fees ever be zero?
            </h3>
            <p className="leading-relaxed text-gray-300">
              On Ethereum mainnet, no. Every transaction requires a minimum of
              21,000 gas. However, some L2 networks and sidechains offer
              sponsored transactions where a third party pays the gas on your
              behalf, making the fee effectively zero for the user.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              What is the gas limit for a block?
            </h3>
            <p className="leading-relaxed text-gray-300">
              The target block size is 15 million gas, with a maximum of 30
              million gas. If a block uses more than 15 million gas, the base fee
              increases for the next block. If it uses less, the base fee
              decreases.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white">
              How much ETH is burned through EIP-1559?
            </h3>
            <p className="leading-relaxed text-gray-300">
              Since EIP-1559 launched in August 2021, billions of dollars worth
              of ETH have been burned. During periods of high network activity,
              more ETH is burned than is issued to validators, making ETH
              temporarily deflationary.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-800/50 bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-white">
            Calculate Your Gas Costs
          </h2>
          <p className="mt-2 leading-relaxed text-gray-300">
            Ready to estimate the cost of your next transaction? Use our free{" "}
            <Link
              href="/crypto/gas-calculator"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Gas Fee Calculator
            </Link>{" "}
            to compute the exact cost in Wei, Gwei, ETH, and USD for any gas
            limit and gas price.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-white">Related Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Calculate Ethereum transaction costs instantly
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
            <li>
              <Link
                href="/crypto/hex-decimal-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Hex/Decimal Converter
              </Link>{" "}
              &mdash; Convert gas values between hex and decimal
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
