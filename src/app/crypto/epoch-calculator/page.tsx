import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import EpochCalculatorTool from "./EpochCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Ethereum Epoch / Slot Calculator",
  description:
    "Convert between Ethereum beacon chain epochs, slots, timestamps, and dates. Live current epoch and slot display with notable epoch references.",
  path: "/crypto/epoch-calculator",
});

const faqs = [
  {
    question: "What is an Ethereum epoch?",
    answer:
      "An epoch on the Ethereum beacon chain consists of 32 slots (approximately 6.4 minutes). Epochs are the fundamental time unit for validator duties, attestations, and finality. At the end of each epoch, the beacon chain processes attestations and may finalize blocks. Epoch numbering starts from 0 at the beacon chain genesis.",
  },
  {
    question: "What is a slot in Ethereum?",
    answer:
      "A slot is a 12-second time window during which a validator can propose a block. Each epoch contains 32 slots, numbered sequentially. Not every slot produces a block (missed slots occur when the proposer is offline). Slot numbers are used to reference specific points in the beacon chain timeline.",
  },
  {
    question: "How do I convert between epochs and timestamps?",
    answer:
      "To convert an epoch to a Unix timestamp: timestamp = beaconGenesisTime + (epoch x 32 x 12). The beacon chain genesis time is 1606824023 (December 1, 2020 12:00:23 UTC). To convert a timestamp to an epoch: epoch = floor((timestamp - beaconGenesisTime) / (32 x 12)). This tool handles the conversion automatically.",
  },
  {
    question: "What is finality in Ethereum?",
    answer:
      "Finality means a block and its transactions cannot be reversed without burning at least 1/3 of the total staked ETH. Ethereum achieves finality every 2 epochs (~12.8 minutes) under normal conditions. A block is considered finalized when it has been justified in one epoch and then confirmed in the next. The Casper FFG protocol governs this process.",
  },
  {
    question: "What are notable Ethereum epochs?",
    answer:
      "Notable epochs include: Epoch 0 (Beacon Chain genesis, Dec 1 2020), Epoch 74240 (Altair upgrade), Epoch 144896 (Bellatrix/Merge, Sep 2022 - transition to proof of stake), Epoch 194048 (Shapella/Shanghai, enabling staked ETH withdrawals), and Epoch 269568 (Dencun, introducing proto-danksharding with EIP-4844).",
  },
  {
    question: "How does the beacon chain relate to the execution layer?",
    answer:
      "Since The Merge (September 2022), the beacon chain (consensus layer) drives block production for the execution layer. Validators on the beacon chain propose blocks that contain both consensus data (attestations, slashings) and execution data (transactions). The execution layer handles EVM transaction processing, while the consensus layer manages validator duties and finality.",
  },
];

export default function EpochCalculatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Ethereum Epoch / Slot Calculator",
            url: "https://evmtools.dev/crypto/epoch-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between Ethereum beacon chain epochs, slots, timestamps, and dates. Live current epoch and slot display with notable epoch references.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="epoch-calculator">
        <EpochCalculatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Epoch / Slot Calculator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool converts between Ethereum beacon chain epochs, slots,
              Unix timestamps, and human-readable dates. It also displays the
              current live epoch and slot numbers.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter an epoch number</strong> to see its corresponding
                slot range, start timestamp, and human-readable date.
              </li>
              <li>
                <strong>Enter a slot number</strong> to find which epoch it
                belongs to and its exact timestamp.
              </li>
              <li>
                <strong>Enter a timestamp or date</strong> to find the
                corresponding epoch and slot at that point in time.
              </li>
              <li>
                <strong>View the live display</strong> showing the current
                epoch, slot, and time until the next epoch boundary.
              </li>
            </ol>
            <p>
              All calculations are based on the beacon chain genesis time
              (December 1, 2020 12:00:23 UTC) with 12-second slots and
              32-slot epochs. Everything runs locally in your browser.
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
              <strong>Validator monitoring</strong> &mdash; Convert between
              epochs and timestamps to schedule and verify validator duties
              like attestations and block proposals.
            </li>
            <li>
              <strong>Upgrade tracking</strong> &mdash; Look up notable epochs
              for network upgrades (Merge, Shapella, Dencun) to understand
              when consensus changes took effect.
            </li>
            <li>
              <strong>Finality verification</strong> &mdash; Calculate how many
              epochs ago a block was finalized to verify settlement for
              exchanges and bridges.
            </li>
            <li>
              <strong>Historical research</strong> &mdash; Convert dates to
              epoch/slot numbers for querying beacon chain APIs about
              historical validator performance and network state.
            </li>
            <li>
              <strong>Staking analytics</strong> &mdash; Map epoch numbers to
              dates for analyzing staking rewards, validator uptime, and
              slashing events over time.
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
              href="/crypto/eth-unit-converter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                ETH Unit Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between Wei, Gwei, and ETH for staking reward
                calculations and validator balances.
              </p>
            </Link>
            <Link
              href="/crypto/gas-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Gas Fee Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Estimate transaction costs on the execution layer for
                validator operations and withdrawals.
              </p>
            </Link>
            <Link
              href="/crypto/address-validator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Validate Ethereum addresses for validator withdrawal
                credentials and fee recipients.
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
