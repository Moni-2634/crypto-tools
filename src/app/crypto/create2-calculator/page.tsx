import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import Create2CalculatorTool from "./Create2CalculatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "CREATE2 Address Calculator",
  description:
    "Calculate deterministic smart contract addresses using CREATE2. Input deployer address, salt, and init code hash to predict deployment addresses.",
  path: "/crypto/create2-calculator",
});

const faqs = [
  {
    question: "What is CREATE2 in Ethereum?",
    answer:
      "CREATE2 is an EVM opcode (0xf5) introduced in the Constantinople upgrade that allows deploying smart contracts to deterministic addresses. Unlike the regular CREATE opcode, the resulting address depends only on the deployer address, a salt value, and the init code hash, not on the deployer's nonce.",
  },
  {
    question: "How is a CREATE2 address calculated?",
    answer:
      "A CREATE2 address is computed as: keccak256(0xff ++ deployerAddress ++ salt ++ keccak256(initCode))[12:]. The 0xff prefix prevents collisions with CREATE addresses. The deployer address is the contract calling CREATE2, the salt is a 32-byte value chosen by the deployer, and the init code is the contract creation bytecode.",
  },
  {
    question: "What is the difference between CREATE and CREATE2?",
    answer:
      "CREATE calculates the contract address from the deployer's address and nonce, making the address depend on transaction ordering. CREATE2 uses a salt and init code hash instead of the nonce, so the address is deterministic and can be predicted before deployment. This enables counterfactual interactions with contracts before they exist.",
  },
  {
    question: "What are vanity addresses with CREATE2?",
    answer:
      "By iterating over different salt values, developers can find a salt that produces a contract address with desired properties, such as leading zeros or a specific prefix. This is called salt mining or vanity address generation. It is commonly used for gas-efficient addresses (leading zeros save gas in calldata) or branding purposes.",
  },
  {
    question: "What is counterfactual deployment?",
    answer:
      "Counterfactual deployment means interacting with a contract address before the contract is actually deployed. Because CREATE2 addresses are deterministic, users can send funds or grant permissions to the address in advance. The contract can be deployed later when needed. This pattern is used in state channels, account abstraction (ERC-4337), and factory contracts.",
  },
];

export default function Create2CalculatorPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "CREATE2 Address Calculator",
            url: "https://evmtools.dev/crypto/create2-calculator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Calculate deterministic smart contract addresses using CREATE2. Input deployer address, salt, and init code hash to predict deployment addresses.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="create2-calculator">
        <Create2CalculatorTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This CREATE2 Address Calculator
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool computes the deterministic address where a smart
              contract will be deployed when using the CREATE2 opcode. Provide
              three inputs and the tool instantly calculates the resulting
              address.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter the deployer address</strong> &mdash; this is the
                address of the factory contract that will call CREATE2 (not your
                EOA address, unless deploying directly).
              </li>
              <li>
                <strong>Enter the salt</strong> &mdash; a 32-byte hex value
                that you choose. Different salts produce different deployment
                addresses.
              </li>
              <li>
                <strong>Enter the init code hash</strong> &mdash; the
                keccak256 hash of the contract creation bytecode (init code).
                You can get this from your compiler output or by hashing the
                bytecode with a keccak256 tool.
              </li>
              <li>
                <strong>View the computed address</strong> &mdash; the tool
                shows the resulting contract address in checksummed format,
                ready to use in your deployment scripts.
              </li>
            </ol>
            <p>
              All calculations run locally in your browser using standard
              keccak256 hashing.
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
              <strong>Factory contract deployment</strong> &mdash; Predict
              addresses before deploying contracts through factory patterns like
              Uniswap V2/V3 pair creation.
            </li>
            <li>
              <strong>Cross-chain deterministic addresses</strong> &mdash;
              Deploy contracts to the same address on multiple EVM chains by
              using the same deployer, salt, and init code.
            </li>
            <li>
              <strong>Account abstraction (ERC-4337)</strong> &mdash; Calculate
              smart account addresses before deployment for counterfactual
              wallet creation.
            </li>
            <li>
              <strong>Vanity address mining</strong> &mdash; Find salt values
              that produce contract addresses with desired properties like
              leading zeros.
            </li>
            <li>
              <strong>Deployment verification</strong> &mdash; Verify that a
              deployed contract address matches your expected CREATE2
              calculation before interacting with it.
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
              href="/crypto/address-validator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address Validator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Validate the computed CREATE2 address format and EIP-55
                checksum.
              </p>
            </Link>
            <Link
              href="/crypto/contract-size-calculator"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Contract Size Calculator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Check that your contract bytecode fits within the 24KB EIP-170
                limit before deploying.
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
                Calculate storage slot locations for deployed contract state
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
