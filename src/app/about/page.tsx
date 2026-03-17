import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = {
  title: "About Us | EVMTools",
  description:
    "Learn about EVMTools, our mission, and why we build free, open-source, client-side tools for Ethereum and Web3 developers.",
};

export default function AboutPage() {
  return (
    <ToolLayout slug="about">
      <div className="prose-custom max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About EVMTools
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Empowering Ethereum and Web3 developers with free, secure tooling.
          </p>
        </div>

        <section className="space-y-4">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EVMTools is a comprehensive suite of online utilities designed specifically
            for blockchain developers, crypto enthusiasts, and smart contract engineers
            working within the Ethereum Virtual Machine (EVM) ecosystem.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Our platform provides over 50 essential tools—from basic text converters
            and JSON formatters to advanced ABI encoders, calldata decoders, and
            cryptographic hash generators. In addition to our tools, we offer a growing
            library of educational guides covering fundamental Web3 concepts, DeFi
            protocols, and network architecture.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Developing for Ethereum and EVM-compatible chains is complex. Developers
            often need to juggle multiple tabs, command-line scripts, and fragmented
            websites just to encode a simple transaction, compute a Keccak256 hash, or
            calculate gas limits.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Our mission is to simplify the Web3 development workflow by providing a
            single, reliable, and completely free hub for all the little utilities
            developers need on a daily basis. 
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Security and Privacy First
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In the crypto space, security isn&apos;t a feature&mdash;it&apos;s a requirement. We
            built EVMTools with a strict &quot;client-side first&quot; philosophy. 
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 font-semibold text-blue-600 dark:text-blue-400">
            When you paste a private key, mnemonic, or sensitive smart contract data
            into our tools, that data never leaves your browser. 
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The computations happen locally on your device, ensuring maximum privacy
            and security. We do not operate backend servers that store or log your
            tool inputs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Who is this for?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Smart Contract Developers:</strong> Easily decode calldata,
              compute function selectors, and format ABI JSONs.
            </li>
            <li>
              <strong>Frontend Web3 Engineers:</strong> Convert units (Wei to ETH),
              validate checksum addresses, and transform strings.
            </li>
            <li>
              <strong>Crypto Enthusiasts & Analysts:</strong> Read our comprehensive
              guides to understand what DeFi, Layer 2s, and Staking actually mean.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Support the Project
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EVMTools is free to use. If you find our tools helpful in your daily
            workflow, consider supporting us. Your support helps keep the servers
            running and allows us to build even more utilities for the community.
          </p>
        </section>
      </div>
    </ToolLayout>
  );
}
