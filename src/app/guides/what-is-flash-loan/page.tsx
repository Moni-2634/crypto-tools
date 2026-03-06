import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is a Flash Loan? DeFi Flash Loans Explained | EVMTools",
  description:
    "Learn what flash loans are, how they work as atomic transactions, flash loan platforms like Aave and dYdX, use cases including arbitrage and collateral swaps, famous flash loan attacks, and Solidity code examples.",
  keywords: [
    "flash loan",
    "what is a flash loan",
    "flash loan attack",
    "aave flash loan",
    "defi flash loan",
    "flash loan arbitrage",
    "flash loan solidity",
    "atomic transaction",
    "uncollateralized loan",
    "flash loan exploit",
    "dydx flash loan",
    "balancer flash loan",
  ],
  openGraph: {
    title: "What is a Flash Loan? DeFi Flash Loans Explained | EVMTools",
    description:
      "Learn what flash loans are, how they work as atomic transactions, flash loan platforms like Aave and dYdX, use cases including arbitrage and collateral swaps, famous flash loan attacks, and Solidity code examples.",
    url: `${SITE_URL}/guides/what-is-flash-loan`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Flash Loan? DeFi Flash Loans Explained",
    description:
      "Learn what flash loans are, how they work as atomic transactions, flash loan platforms like Aave and dYdX, use cases including arbitrage and collateral swaps, famous flash loan attacks, and Solidity code examples.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-flash-loan`,
  },
};

export default function WhatIsFlashLoanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Flash Loan? DeFi Flash Loans Explained",
    description:
      "Learn what flash loans are, how they work as atomic transactions, flash loan platforms like Aave and dYdX, use cases including arbitrage and collateral swaps, famous flash loan attacks, and Solidity code examples.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    url: `${SITE_URL}/guides/what-is-flash-loan`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-flash-loan`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Are flash loans free?",
      answer:
        "Flash loans are not entirely free. While they require no collateral, most platforms charge a small fee. Aave charges 0.05% on V3 flash loans (previously 0.09% on V2). Balancer flash loans are currently fee-free (0% fee). dYdX flash loans also have no explicit fee but require you to repay slightly more than borrowed. You also pay gas fees for the transaction, which can be significant on Ethereum mainnet due to the complexity of flash loan transactions.",
    },
    {
      question: "Can anyone use flash loans?",
      answer:
        "Flash loans require writing or interacting with smart contracts, so they are primarily accessible to developers. You cannot use a flash loan through a normal wallet interface like MetaMask. However, some platforms like Furucombo and DeFi Saver provide no-code interfaces that let non-developers execute flash loan strategies through a drag-and-drop interface, making them more accessible.",
    },
    {
      question: "What happens if a flash loan cannot be repaid?",
      answer:
        "If a flash loan cannot be repaid within the same transaction, the entire transaction reverts. This means everything that happened in the transaction is undone as if it never occurred. No funds are lost (except the gas fee for the failed transaction). This atomic property is what makes flash loans possible without collateral: the lender never risks losing funds because non-repayment is literally impossible.",
    },
    {
      question: "Are flash loan attacks illegal?",
      answer:
        "The legality of flash loan attacks is a gray area. The flash loan itself is a legitimate tool. However, using it to exploit vulnerabilities in protocols could potentially be considered unauthorized access or manipulation depending on the jurisdiction. Some attackers have been identified and prosecuted (like the Mango Markets exploiter), while others remain anonymous. Bug bounty programs offer legal alternatives for discovering vulnerabilities.",
    },
    {
      question: "How much can you borrow with a flash loan?",
      answer:
        "You can borrow up to the total available liquidity in the lending pool. On Aave V3, this can be hundreds of millions or even billions of dollars worth of assets. For example, if Aave has $500 million in USDC deposits, you could theoretically borrow up to that amount in a single flash loan transaction. The only limiting factor is the available liquidity at the moment of the transaction.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-flash-loan">
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
            Flash loans are one of the most revolutionary innovations in{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              decentralized finance (DeFi)
            </Link>
            . They allow anyone to borrow millions of dollars with zero
            collateral, as long as the loan is repaid within the same
            blockchain transaction. If the borrower cannot repay, the entire
            transaction is reversed as if it never happened. This guide
            explains how flash loans work technically, the platforms that offer
            them, legitimate use cases, famous attacks, and includes a
            simplified Solidity code example.
          </p>
        </section>

        {/* What is a Flash Loan */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a Flash Loan?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A{" "}
            <strong className="text-gray-900 dark:text-white">
              flash loan
            </strong>{" "}
            is an uncollateralized loan that must be borrowed and repaid within
            a single atomic transaction on the blockchain. The word
            &quot;flash&quot; refers to the fact that the loan exists only for
            the duration of one transaction &mdash; typically a few seconds.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In traditional finance, loans require collateral, credit checks,
            and time. Flash loans eliminate all of these requirements through a
            clever use of blockchain transaction mechanics. The key property
            that makes flash loans possible is{" "}
            <strong className="text-gray-900 dark:text-white">
              atomicity
            </strong>
            : either every step in the transaction succeeds, or the entire
            transaction reverts. The lending protocol never risks losing
            funds because non-repayment is literally impossible at the protocol
            level.
          </p>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
              <strong>Key insight:</strong> Flash loans democratize access to
              capital. Previously, only well-capitalized traders could execute
              large arbitrage or liquidation strategies. Flash loans allow
              anyone with the technical skill to write a{" "}
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                smart contract
              </Link>{" "}
              to access millions in liquidity with zero upfront capital.
            </p>
          </div>
        </section>

        {/* How Flash Loans Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Flash Loans Work: Atomic Transactions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Understanding flash loans requires understanding how Ethereum
            transactions work. Every transaction on Ethereum is{" "}
            <strong className="text-gray-900 dark:text-white">atomic</strong>:
            it either completes all its operations successfully, or it reverts
            entirely (all state changes are rolled back). Flash loans exploit
            this property:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Flash Loan Execution Flow (single transaction):

  Step 1: Your contract calls flashLoan() on the lending protocol
  Step 2: Protocol transfers the borrowed tokens to your contract
  Step 3: Protocol calls your executeOperation() callback function
  Step 4: Your contract performs actions (arbitrage, swaps, etc.)
  Step 5: Your contract repays the loan + fee to the protocol
  Step 6: Protocol verifies repayment

  If Step 6 fails (loan not fully repaid):
    → The ENTIRE transaction reverts
    → Steps 1-5 are undone as if they never happened
    → Only gas fee for the failed transaction is lost

  Timeline: All steps happen in ONE transaction (~12 seconds block time)
  Cost: Only gas fees + flash loan fee (0.05% on Aave V3)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This atomicity guarantee is what makes flash loans safe for the
            lender. There is no scenario where the borrower keeps the funds
            without repaying. The EVM (Ethereum Virtual Machine) enforces this
            at the protocol level &mdash; it is not a trust-based system.
          </p>
        </section>

        {/* Flash Loan Platforms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Flash Loan Platforms
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Several major DeFi protocols offer flash loan functionality. Each
            has different fee structures, available assets, and implementation
            details:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Platform
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Fee
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Available Liquidity
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Aave V3
                  </td>
                  <td className="px-4 py-3">0.05%</td>
                  <td className="px-4 py-3">Billions USD</td>
                  <td className="px-4 py-3">
                    Most popular, multi-chain, supports batch flash loans
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Balancer
                  </td>
                  <td className="px-4 py-3">0%</td>
                  <td className="px-4 py-3">Hundreds of millions USD</td>
                  <td className="px-4 py-3">
                    Fee-free flash loans from vault liquidity
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    dYdX
                  </td>
                  <td className="px-4 py-3">~0%</td>
                  <td className="px-4 py-3">Hundreds of millions USD</td>
                  <td className="px-4 py-3">
                    Uses &quot;flash actions&quot; with deposit/withdraw pattern
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Uniswap V3
                  </td>
                  <td className="px-4 py-3">Pool fee tier</td>
                  <td className="px-4 py-3">Billions USD</td>
                  <td className="px-4 py-3">
                    Flash swaps (borrow one token, repay with either token)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    MakerDAO
                  </td>
                  <td className="px-4 py-3">0%</td>
                  <td className="px-4 py-3">DAI supply</td>
                  <td className="px-4 py-3">
                    Flash mint: create DAI from nothing, must be burned in same tx
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Legitimate Flash Loan Use Cases
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Flash loans enable several powerful strategies that were previously
            only available to well-capitalized traders:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Arbitrage
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The most common use case. When the price of a token differs between
            two DEXs, a flash loan can be used to borrow funds, buy on the
            cheaper exchange, sell on the more expensive one, repay the loan,
            and pocket the difference. This is a form of{" "}
            <Link
              href="/guides/what-is-mev"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              MEV extraction
            </Link>{" "}
            that helps equalize prices across markets.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Flash Loan Arbitrage Example:

  1. Flash borrow 1,000,000 USDC from Aave (fee: 0.05% = $500)
  2. Buy ETH on Uniswap at $2,000 per ETH → 500 ETH
  3. Sell 500 ETH on SushiSwap at $2,012 per ETH → 1,006,000 USDC
  4. Repay 1,000,500 USDC to Aave (principal + fee)
  5. Profit: 1,006,000 - 1,000,500 = $5,500 (minus gas ~$50)

  Total risk: only the gas cost if arbitrage is no longer profitable`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Collateral Swaps
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you have an open loan on Aave collateralized with ETH but want
            to switch to WBTC collateral, you would normally need to repay the
            loan first. With a flash loan, you can do it in a single
            transaction: borrow enough to repay your loan, withdraw your ETH
            collateral, swap ETH for WBTC, deposit WBTC as new collateral,
            re-borrow, and repay the flash loan.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Self-Liquidation
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If your lending position is close to liquidation and you do not
            have funds to repay, a flash loan lets you close or reduce your
            position before a liquidator takes a 5&ndash;10% penalty. Flash
            borrow enough to repay part of your debt, withdraw freed
            collateral, swap it to the debt token, repay the flash loan.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Liquidations
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Flash loans allow anyone to participate in liquidating
            undercollateralized positions on lending protocols. The liquidator
            borrows the required funds via flash loan, repays the
            undercollateralized borrower&apos;s debt, receives the discounted
            collateral, sells the collateral, and repays the flash loan with
            profit.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Interest Rate Switching
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Move a lending position between protocols to take advantage of
            better interest rates. Flash borrow to repay Protocol A, withdraw
            collateral, deposit into Protocol B with a lower rate, borrow from
            Protocol B, and repay the flash loan.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Solidity Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Simplified Solidity Code Example
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Here is a simplified example of a flash loan contract using Aave V3.
            This demonstrates the basic structure &mdash; a real production
            contract would include additional safety checks and optimizations:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IFlashLoanSimpleReceiver} from "@aave/v3-core/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/v3-core/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "@aave/v3-core/contracts/interfaces/IPool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleFlashLoan is IFlashLoanSimpleReceiver {
    IPool public immutable POOL;

    constructor(address _poolProvider) {
        POOL = IPool(
            IPoolAddressesProvider(_poolProvider).getPool()
        );
    }

    // Step 1: Initiate the flash loan
    function executeFlashLoan(
        address token,
        uint256 amount
    ) external {
        POOL.flashLoanSimple(
            address(this), // receiverAddress
            token,         // asset to borrow
            amount,        // amount to borrow
            "",            // params (passed to callback)
            0              // referralCode
        );
    }

    // Step 2: Aave calls this function after sending you the tokens
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,   // the flash loan fee
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // ============================================
        // YOUR CUSTOM LOGIC GOES HERE
        // You now have 'amount' of 'asset' tokens
        // Do arbitrage, collateral swaps, etc.
        // ============================================

        // Step 3: Approve repayment (principal + fee)
        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);

        return true; // Signals successful execution
    }
}`}</code>
          </pre>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> This is a simplified example for
              educational purposes. Production flash loan contracts require
              thorough auditing, access controls, slippage protection, and
              careful handling of edge cases. Never deploy unaudited flash loan
              contracts with real funds.
            </p>
          </div>
        </section>

        {/* Famous Flash Loan Attacks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Famous Flash Loan Attacks
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            While flash loans are a legitimate financial tool, they have been
            used to amplify attacks against vulnerable DeFi protocols. The flash
            loan itself is not the vulnerability &mdash; it merely provides the
            capital needed to exploit existing bugs or design flaws:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Protocol
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Loss
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Attack Vector
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">bZx</td>
                  <td className="px-4 py-3">Feb 2020</td>
                  <td className="px-4 py-3">$1M</td>
                  <td className="px-4 py-3">
                    Oracle manipulation via flash loan to manipulate Uniswap price
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Harvest Finance</td>
                  <td className="px-4 py-3">Oct 2020</td>
                  <td className="px-4 py-3">$34M</td>
                  <td className="px-4 py-3">
                    Repeated flash loan swaps to manipulate Curve pool prices
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Pancake Bunny</td>
                  <td className="px-4 py-3">May 2021</td>
                  <td className="px-4 py-3">$45M</td>
                  <td className="px-4 py-3">
                    Flash loan used to inflate BNB price in PancakeSwap pool
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Cream Finance</td>
                  <td className="px-4 py-3">Oct 2021</td>
                  <td className="px-4 py-3">$130M</td>
                  <td className="px-4 py-3">
                    Flash loan to manipulate oracle pricing of yUSD collateral
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Euler Finance</td>
                  <td className="px-4 py-3">Mar 2023</td>
                  <td className="px-4 py-3">$197M</td>
                  <td className="px-4 py-3">
                    Flash loan exploited a donation-based accounting flaw
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Anatomy of a Flash Loan Attack
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most flash loan attacks follow a common pattern:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Typical Flash Loan Attack Pattern:

  1. Flash borrow a large amount (e.g., $50M USDC)
  2. Use borrowed funds to manipulate an on-chain price oracle
     - Large swap on a DEX to move the spot price
     - Deposit into a pool to change reserve ratios
  3. Interact with a vulnerable protocol that reads the manipulated price
     - Borrow against inflated collateral value
     - Trigger a liquidation at a favorable price
     - Mint tokens at an incorrect exchange rate
  4. Reverse the price manipulation
  5. Repay the flash loan
  6. Keep the extracted profit

  The root cause is NEVER the flash loan itself.
  It is always a vulnerability in the target protocol:
  - Using on-chain spot prices as oracles (instead of Chainlink/TWAP)
  - Lack of reentrancy guards
  - Incorrect accounting logic`}</code>
          </pre>
        </section>

        {/* Risks and Defenses */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Risks and Defenses Against Flash Loan Attacks
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            For Protocol Developers
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you are building a{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contract
            </Link>{" "}
            that handles value, these defenses protect against flash loan-based
            exploits:
          </p>
          <ul className="ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Use decentralized oracles
              </strong>
              : Never use on-chain spot prices (like Uniswap reserves) as
              price feeds. Use Chainlink price feeds or time-weighted average
              prices (TWAPs) that are resistant to single-transaction
              manipulation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Add reentrancy guards
              </strong>
              : Use OpenZeppelin&apos;s{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                ReentrancyGuard
              </code>{" "}
              to prevent contracts from being called recursively within a
              single transaction.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Implement delay mechanisms
              </strong>
              : Require actions to span multiple blocks. If a price must be
              sampled across multiple blocks, flash loans (which operate within
              one block) cannot manipulate it.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Validate economic invariants
              </strong>
              : Check that key economic properties (like collateral ratios,
              total supply, reserve balances) remain valid before and after
              critical operations.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Audit thoroughly
              </strong>
              : Get multiple independent security audits and run formal
              verification where possible. Use established libraries and
              patterns.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            For Users
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Use protocols that have been audited and battle-tested with
              significant TVL over time.
            </li>
            <li>
              Check if the protocol uses reliable oracle solutions like
              Chainlink rather than on-chain spot prices.
            </li>
            <li>
              Monitor protocol governance for security-related proposals and
              risk parameter changes.
            </li>
            <li>
              Diversify across multiple protocols to limit exposure to any
              single vulnerability.
            </li>
          </ul>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Flash Loans vs Traditional Loans */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Flash Loans vs Traditional Loans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Traditional Loan
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    DeFi Collateralized Loan
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Flash Loan
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Collateral</td>
                  <td className="px-4 py-3">Required (property, assets)</td>
                  <td className="px-4 py-3">Required (150%+ crypto)</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Credit check</td>
                  <td className="px-4 py-3">Required</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3">None</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Duration</td>
                  <td className="px-4 py-3">Months to years</td>
                  <td className="px-4 py-3">Indefinite (until liquidated)</td>
                  <td className="px-4 py-3">One transaction (~12 seconds)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Max amount</td>
                  <td className="px-4 py-3">Based on creditworthiness</td>
                  <td className="px-4 py-3">Based on collateral value</td>
                  <td className="px-4 py-3">Up to total pool liquidity</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Lender risk</td>
                  <td className="px-4 py-3">Default risk</td>
                  <td className="px-4 py-3">Smart contract risk</td>
                  <td className="px-4 py-3">Zero (atomic repayment)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Technical skill</td>
                  <td className="px-4 py-3">None required</td>
                  <td className="px-4 py-3">Basic wallet usage</td>
                  <td className="px-4 py-3">Solidity/smart contract development</td>
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
              Are flash loans free?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Flash loans are not entirely free. While they require no
              collateral, most platforms charge a small fee. Aave charges 0.05%
              on V3 flash loans. Balancer flash loans are currently fee-free.
              You also pay gas fees for the transaction, which can be
              significant on Ethereum mainnet due to the complexity of flash
              loan transactions.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can anyone use flash loans?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Flash loans require writing or interacting with smart contracts,
              so they are primarily accessible to developers. You cannot use a
              flash loan through a normal wallet interface like MetaMask.
              However, platforms like Furucombo and DeFi Saver provide no-code
              interfaces that let non-developers execute flash loan strategies
              through a drag-and-drop interface.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What happens if a flash loan cannot be repaid?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              If a flash loan cannot be repaid within the same transaction, the
              entire transaction reverts. Everything that happened in the
              transaction is undone as if it never occurred. No funds are lost
              except the gas fee for the failed transaction. This atomic
              property is what makes flash loans possible without collateral.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are flash loan attacks illegal?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The legality of flash loan attacks is a gray area. The flash loan
              itself is a legitimate tool. However, using it to exploit
              vulnerabilities in protocols could potentially be considered
              unauthorized access or manipulation depending on the
              jurisdiction. Some attackers have been prosecuted, while others
              remain anonymous. Bug bounty programs offer legal alternatives
              for discovering vulnerabilities.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much can you borrow with a flash loan?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              You can borrow up to the total available liquidity in the lending
              pool. On Aave V3, this can be hundreds of millions or even
              billions of dollars worth of assets. The only limiting factor is
              the available liquidity at the moment of the transaction.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Build with Smart Contracts
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Flash loans require smart contract development skills. Learn the
            fundamentals in our{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              What is a Smart Contract?
            </Link>{" "}
            guide, and use our{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder / Decoder
            </Link>{" "}
            to encode calldata for your flash loan contract interactions.
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools &amp; Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; Comprehensive overview of decentralized finance
            </li>
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; Understand the smart contracts that power flash loans
            </li>
            <li>
              <Link
                href="/guides/what-is-mev"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is MEV?
              </Link>{" "}
              &mdash; Learn about MEV extraction and how flash loans enable
              arbitrage
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
                href="/crypto/gas-calculator"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Gas Fee Calculator
              </Link>{" "}
              &mdash; Estimate gas costs for flash loan transactions
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
