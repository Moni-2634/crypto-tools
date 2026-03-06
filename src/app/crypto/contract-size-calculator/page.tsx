import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import ContractSizeCalculatorTool from "./ContractSizeCalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Contract Size Calculator",
  description:
    "Check if your Solidity contract bytecode fits within the 24KB EIP-170 limit. Paste bytecode to see size, percentage used, and optimization tips.",
  path: "/crypto/contract-size-calculator",
});

const faqs = [
  {
    question: "What is the maximum smart contract size on Ethereum?",
    answer:
      "The maximum deployed contract bytecode size is 24,576 bytes (24KB), introduced by EIP-170 in the Spurious Dragon hard fork. This limit prevents excessively large contracts from degrading network performance. If your contract exceeds this limit, the deployment transaction will fail.",
  },
  {
    question: "What is the difference between init code and deployed bytecode?",
    answer:
      "Init code (creation bytecode) is the code that runs during contract deployment, including the constructor logic. It returns the runtime bytecode that is stored on-chain. The EIP-170 limit applies to the deployed (runtime) bytecode, not the init code. However, EIP-3860 introduced a separate 49,152-byte limit for init code.",
  },
  {
    question: "How can I reduce my contract size?",
    answer:
      "Common strategies include: enabling the Solidity optimizer with a low runs value (e.g., 200), using libraries for shared logic, splitting into multiple contracts with a proxy pattern, removing unused functions, using shorter error messages or custom errors, and minimizing the use of public variables (which generate getter functions).",
  },
  {
    question: "Does the optimizer always reduce contract size?",
    answer:
      "Not always. The Solidity optimizer's 'runs' parameter trades off between deployment cost (smaller bytecode) and runtime cost (cheaper execution). A low runs value (1-200) optimizes for smaller size, while a high value (10000+) optimizes for cheaper execution at the cost of larger bytecode. For size-constrained contracts, use a low runs value.",
  },
  {
    question: "What is the EIP-3860 init code size limit?",
    answer:
      "EIP-3860 (Shanghai upgrade) introduced a maximum init code size of 49,152 bytes (2x the runtime limit). It also adds a gas cost of 2 gas per word of init code. This prevents extremely large constructor logic from consuming excessive resources during deployment.",
  },
];

export default function ContractSizeCalculatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Contract Size Calculator",
            url: "https://evmtools.dev/crypto/contract-size-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Check if your Solidity contract bytecode fits within the 24KB EIP-170 limit. Paste bytecode to see size, percentage used, and optimization tips.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="contract-size-calculator">
        <ContractSizeCalculatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Contract Size Calculator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool measures your smart contract&apos;s bytecode size and
              checks whether it fits within the EIP-170 deployment limit. It
              helps you identify size issues before deploying to mainnet.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Get your contract bytecode</strong> &mdash; compile
                your contract with Hardhat, Foundry, or Remix and copy the
                deployed (runtime) bytecode hex string.
              </li>
              <li>
                <strong>Paste the bytecode</strong> into the input field. The
                tool accepts hex strings with or without the &quot;0x&quot;
                prefix.
              </li>
              <li>
                <strong>View the size analysis</strong> &mdash; the tool shows
                the bytecode size in bytes, the percentage of the 24KB limit
                used, and a clear pass/fail indicator.
              </li>
              <li>
                <strong>Optimize if needed</strong> &mdash; if your contract is
                close to or exceeds the limit, follow the optimization
                suggestions to reduce the bytecode size.
              </li>
            </ol>
            <p>
              All calculations run locally in your browser. Your bytecode is
              never sent to any server.
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
              <strong>Pre-deployment check</strong> &mdash; Verify that your
              contract bytecode fits within the 24KB limit before spending gas
              on a mainnet deployment.
            </li>
            <li>
              <strong>Optimizer tuning</strong> &mdash; Compare bytecode sizes
              across different Solidity optimizer settings to find the best
              runs value for your contract.
            </li>
            <li>
              <strong>CI/CD integration</strong> &mdash; Quickly check contract
              sizes during code review to catch size regressions before merging.
            </li>
            <li>
              <strong>Contract splitting decisions</strong> &mdash; Determine
              when a contract needs to be split into multiple contracts or use
              a diamond/proxy pattern.
            </li>
            <li>
              <strong>Gas cost estimation</strong> &mdash; Larger bytecode
              means higher deployment gas costs. Use this tool to estimate
              deployment costs based on bytecode size.
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
              href="/crypto/gas-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Gas Fee Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Estimate the gas cost of deploying your contract based on
                bytecode size and current gas prices.
              </p>
            </Link>
            <Link
              href="/crypto/create2-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                CREATE2 Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate deterministic deployment addresses using your
                contract&apos;s init code hash.
              </p>
            </Link>
            <Link
              href="/crypto/storage-slot-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Storage Slot Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calculate storage slot locations for your contract&apos;s state
                variables and mappings.
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
