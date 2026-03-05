import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "What is Keccak256? A Complete Guide for Developers | EVMTools",
  description:
    "Learn how Keccak256 hashing works, why Ethereum uses it instead of SHA-3, and how it secures addresses, function selectors, and storage slots.",
  keywords: [
    "keccak256",
    "what is keccak256",
    "keccak256 hash",
    "keccak256 vs sha3",
    "ethereum keccak256",
    "solidity keccak256",
    "keccak256 function selector",
    "ethereum hash function",
  ],
  openGraph: {
    title: "What is Keccak256? A Complete Guide for Developers | EVMTools",
    description:
      "Learn how Keccak256 hashing works, why Ethereum uses it instead of SHA-3, and how it secures addresses, function selectors, and storage slots.",
    url: `${SITE_URL}/guides/what-is-keccak256`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Keccak256? A Complete Guide for Developers",
    description:
      "Learn how Keccak256 hashing works, why Ethereum uses it instead of SHA-3, and how it secures addresses, function selectors, and storage slots.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-keccak256`,
  },
};

export default function WhatIsKeccak256Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Keccak256? A Complete Guide for Developers",
    description:
      "Learn how Keccak256 hashing works, why Ethereum uses it instead of SHA-3, and how it secures addresses, function selectors, and storage slots.",
    url: `${SITE_URL}/guides/what-is-keccak256`,
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-keccak256`,
    },
  };

  return (
    <ToolLayout slug="what-is-keccak256">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose-custom space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            If you have ever written a Solidity smart contract or inspected an
            Ethereum transaction, you have encountered Keccak256. It is the
            cryptographic hash function at the heart of Ethereum, used for
            everything from generating function selectors to verifying data
            integrity on-chain. This guide explains what Keccak256 is, how it
            works, and why Ethereum chose it over standard SHA-3.
          </p>
        </section>

        {/* What is a cryptographic hash function */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a Cryptographic Hash Function?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before diving into Keccak256, it helps to understand what a
            cryptographic hash function does. A hash function takes an input of
            any size and produces a fixed-size output, called a digest or hash. A
            good cryptographic hash function has three properties:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Deterministic</strong>: The same
              input always produces the same output.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Pre-image resistant</strong>: Given
              a hash, it is computationally infeasible to find the original
              input.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Collision resistant</strong>: It is
              extremely difficult to find two different inputs that produce the
              same hash.
            </li>
          </ol>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            These properties make hash functions essential for digital
            signatures, data integrity checks, and blockchain systems.
          </p>
        </section>

        {/* Keccak256: The Hash Behind Ethereum */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Keccak256: The Hash Behind Ethereum
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Keccak256 is a member of the Keccak family of hash functions,
            designed by Guido Bertoni, Joan Daemen, Michael Peeters, and Gilles
            Van Assche. In 2012, the Keccak algorithm won the NIST hash function
            competition and was selected as the basis for the SHA-3 standard.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            However, here is where it gets confusing:{" "}
            <strong className="text-gray-900 dark:text-white">
              Ethereum uses Keccak256, not SHA-3 (FIPS 202)
            </strong>
            . When NIST standardized SHA-3, they made a small but significant
            change to the padding scheme. Keccak256 uses a padding byte of{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              0x01
            </code>
            , while the finalized SHA-3-256 uses{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              0x06
            </code>
            . This means the two functions produce different outputs for the same
            input.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Keccak256 vs SHA-3-256: The Key Difference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Property
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Keccak256
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    SHA-3-256 (FIPS 202)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Algorithm</td>
                  <td className="px-4 py-3">Keccak sponge construction</td>
                  <td className="px-4 py-3">Same algorithm</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Output size</td>
                  <td className="px-4 py-3">256 bits (32 bytes)</td>
                  <td className="px-4 py-3">256 bits (32 bytes)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Padding byte</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                      0x01
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                      0x06
                    </code>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Used by</td>
                  <td className="px-4 py-3">Ethereum, Solidity</td>
                  <td className="px-4 py-3">NIST standard applications</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Same output?</td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This distinction matters. If you use a standard SHA-3 library to
            compute what you think is a Keccak256 hash, you will get the wrong
            result. Always use a library that explicitly implements Keccak256,
            such as{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              js-sha3
            </code>{" "}
            in JavaScript or{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              pysha3
            </code>{" "}
            in Python.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Example</h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Hashing the string{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              &quot;hello&quot;
            </code>{" "}
            with both functions:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Keccak256("hello") = 0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8
SHA-3-256("hello") = 0x3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Same input, completely different outputs. This is why the distinction
            matters. You can verify this yourself using our{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            &mdash; paste{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              hello
            </code>{" "}
            and confirm the hash matches the Keccak256 result above.
          </p>
        </section>

        {/* How Keccak256 Works Internally */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Keccak256 Works Internally
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Keccak256 uses a construction called the{" "}
            <strong className="text-gray-900 dark:text-white">sponge construction</strong>. Unlike
            traditional Merkle-Damgard hash functions (like SHA-1 and SHA-2),
            the sponge construction works in two phases:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Absorb Phase
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The input message is padded and divided into blocks. Each block is
            XORed into a portion of the internal state, and then the entire state
            is permuted using a function called Keccak-f.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Squeeze Phase
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            After all input blocks have been absorbed, output blocks are
            extracted from the state. For Keccak256, only one squeeze iteration
            is needed because the output size (256 bits) is smaller than the
            rate.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">The State</h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Keccak operates on a state of 1600 bits, organized as a 5 x 5 x 64
            three-dimensional array. The state is divided into two parts:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Rate (r)</strong>: 1088 bits
              &mdash; the portion that interacts with input and output
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Capacity (c)</strong>: 512 bits
              &mdash; the portion that provides security
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The security level is determined by the capacity: Keccak256 provides
            128-bit security against collision attacks and 256-bit security
            against pre-image attacks.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`State (1600 bits)
\u251C\u2500\u2500 Rate (1088 bits): absorbs input, produces output
\u2514\u2500\u2500 Capacity (512 bits): security parameter, never directly exposed`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* How Ethereum Uses Keccak256 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Ethereum Uses Keccak256
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Keccak256 is deeply embedded in Ethereum&apos;s architecture. Here are
            the most important uses:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Function Selectors
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            When you call a function on a smart contract, Ethereum needs a way to
            identify which function you are calling. It does this by taking the
            Keccak256 hash of the function signature and using the first 4 bytes
            as the selector.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Function signature: "transfer(address,uint256)"
// Keccak256 hash: 0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b
// Function selector (first 4 bytes): 0xa9059cbb`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            This is why when you look at raw transaction data on Etherscan, the
            first 4 bytes of the input data tell you which function was called.
            Try it yourself: paste{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              transfer(address,uint256)
            </code>{" "}
            into our{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            and check the function selector output.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Event Topics
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Solidity events use Keccak256 to generate topic hashes. The first
            topic of a logged event is the Keccak256 hash of the event
            signature.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Event: Transfer(address indexed from, address indexed to, uint256 value)
// Topic 0: keccak256("Transfer(address,address,uint256)")
//         = 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Storage Slot Computation
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Solidity uses Keccak256 to determine where dynamic data (mappings
            and dynamic arrays) is stored in contract storage.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// For a mapping: mapping(address => uint256) balances;
// Storage slot for balances[addr] = keccak256(abi.encode(addr, slot_of_balances))`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Address Derivation
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Ethereum addresses are derived from public keys using Keccak256. The
            process takes the last 20 bytes of the Keccak256 hash of the public
            key.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Public Key (64 bytes) \u2192 Keccak256 \u2192 Last 20 bytes \u2192 Ethereum Address`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. EIP-55 Checksum Addresses
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The mixed-case checksum encoding of Ethereum addresses (EIP-55) also
            uses Keccak256. The hash of the lowercase hex address determines
            which characters should be capitalized.
          </p>
        </section>

        {/* Keccak256 in Solidity */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Keccak256 in Solidity
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Solidity provides{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              keccak256()
            </code>{" "}
            as a built-in function. It is one of the most commonly used functions
            in smart contract development.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// Hashing a string
bytes32 hash = keccak256(abi.encodePacked("hello"));

// Hashing multiple values (packed encoding)
bytes32 hash = keccak256(abi.encodePacked(addr, amount, nonce));

// Hashing structured data (standard encoding)
bytes32 hash = keccak256(abi.encode(addr, amount));`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            abi.encode vs abi.encodePacked
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A common source of bugs is choosing between{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              abi.encode
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              abi.encodePacked
            </code>
            :
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">abi.encode</strong>: Pads each
              argument to 32 bytes. Unambiguous. Use for hashing structured data.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">abi.encodePacked</strong>:
              Concatenates arguments without padding. More gas efficient but can
              cause hash collisions with dynamic types.
            </li>
          </ul>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// These produce different hashes:
keccak256(abi.encode("ab", "c"))        // Different from below
keccak256(abi.encode("a", "bc"))        // Different \u2014 padded to 32 bytes each

// DANGER: These produce the SAME hash:
keccak256(abi.encodePacked("ab", "c"))  // Same as below!
keccak256(abi.encodePacked("a", "bc"))  // Same! Both pack to "abc"`}</code>
          </pre>
          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> This is a well-known vulnerability. When
              hashing multiple dynamic-length values, use{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                abi.encode
              </code>{" "}
              to avoid collisions. Learn more in our{" "}
              <Link
                href="/guides/abi-encoding-explained"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoding guide
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Using Keccak256 in JavaScript */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Using Keccak256 in JavaScript
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            For frontend and Node.js applications, you can compute Keccak256
            hashes using the{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
              js-sha3
            </code>{" "}
            library:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`import { keccak256 } from 'js-sha3';

// Hash a UTF-8 string
const hash = '0x' + keccak256('hello');
// 0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8

// Hash hex bytes
const hash = '0x' + keccak256(Buffer.from('48656c6c6f', 'hex'));`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">Or using ethers.js:</p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`import { keccak256, toUtf8Bytes } from 'ethers';

const hash = keccak256(toUtf8Bytes('hello'));`}</code>
          </pre>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Common Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Common Use Cases</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Use Case
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Input
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Output
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Function selector</td>
                  <td className="px-4 py-3">
                    <code className="text-amber-600 dark:text-amber-400">
                      &quot;transfer(address,uint256)&quot;
                    </code>
                  </td>
                  <td className="px-4 py-3">First 4 bytes of hash</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Commit-reveal scheme</td>
                  <td className="px-4 py-3">
                    <code className="text-amber-600 dark:text-amber-400">
                      keccak256(value, secret)
                    </code>
                  </td>
                  <td className="px-4 py-3">Commitment hash</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Merkle tree leaf</td>
                  <td className="px-4 py-3">
                    <code className="text-amber-600 dark:text-amber-400">
                      keccak256(abi.encode(data))
                    </code>
                  </td>
                  <td className="px-4 py-3">Leaf node hash</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">CREATE2 address</td>
                  <td className="px-4 py-3">
                    <code className="text-amber-600 dark:text-amber-400">
                      keccak256(0xff, deployer, salt, initCodeHash)
                    </code>
                  </td>
                  <td className="px-4 py-3">Contract address</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">EIP-712 typed data</td>
                  <td className="px-4 py-3">
                    <code className="text-amber-600 dark:text-amber-400">
                      keccak256(structured_data)
                    </code>
                  </td>
                  <td className="px-4 py-3">Signing hash</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Security Considerations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Security Considerations
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Keccak256 is considered cryptographically secure. No practical
            attacks have been found against the full-round Keccak256. However,
            there are important implementation considerations:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Do not use for passwords</strong>:
              Hash functions alone are not suitable for password storage. Use
              bcrypt, scrypt, or Argon2 instead.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Beware of hash collisions with encodePacked
              </strong>
              : As shown above, packing dynamic types can lead to unintended
              collisions.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">On-chain randomness</strong>:{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                keccak256(block.timestamp, block.prevrandao)
              </code>{" "}
              is not truly random. Miners and validators can influence these
              values.
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is Keccak256 the same as SHA-3?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              No. While Keccak won the SHA-3 competition, NIST modified the
              padding before standardizing it as SHA-3 (FIPS 202). Ethereum uses
              the original Keccak256, which produces different hashes than
              SHA-3-256.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Why did Ethereum choose Keccak256 over SHA-256?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Ethereum was designed before SHA-3 was finalized. The developers
              chose Keccak256 because it was the competition winner and
              considered the most secure option. SHA-256 (used by Bitcoin) is
              from the SHA-2 family, which uses a fundamentally different
              construction (Merkle-Damgard vs sponge).
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can Keccak256 be reversed?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              No. Like all secure cryptographic hash functions, Keccak256 is a
              one-way function. Given a hash output, it is computationally
              infeasible to determine the original input. This property is
              essential for its use in blockchain systems.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How much gas does keccak256 cost in Solidity?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The{" "}
              <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-amber-600 dark:text-amber-400">
                KECCAK256
              </code>{" "}
              opcode costs 30 gas plus 6 gas per 32-byte word of input data. For
              a 32-byte input, the total cost is 36 gas &mdash; making it one of
              the cheaper operations in the EVM.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Try It Yourself</h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Ready to compute some Keccak256 hashes? Use our free{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            to hash any text or hex input instantly in your browser.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Related Tools</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/crypto/keccak256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Keccak256 Hash Generator
              </Link>{" "}
              &mdash; Compute Keccak256 hashes online
            </li>
            <li>
              <Link
                href="/crypto/abi-encoder"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                ABI Encoder/Decoder
              </Link>{" "}
              &mdash; Encode and decode smart contract function calls
            </li>
            <li>
              <Link
                href="/crypto/checksum-address"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Checksum Address Converter
              </Link>{" "}
              &mdash; Convert Ethereum addresses to EIP-55 checksum format
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
