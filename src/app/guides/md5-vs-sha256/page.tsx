import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "MD5 vs SHA-256: What's the Difference? | EVMTools",
  description:
    "Compare MD5 and SHA-256 hash algorithms: speed, security, output size, collision resistance, and real-world use cases. Learn which hashing algorithm to use.",
  keywords: [
    "md5 vs sha256",
    "sha256 vs md5",
    "md5 or sha256",
    "hash algorithm comparison",
    "md5 security",
    "sha256 security",
    "hashing algorithms",
    "cryptographic hash function",
    "md5 collision",
    "sha256 bitcoin",
  ],
  openGraph: {
    title: "MD5 vs SHA-256: What's the Difference? | EVMTools",
    description:
      "Compare MD5 and SHA-256 hash algorithms: speed, security, output size, collision resistance, and real-world use cases. Learn which hashing algorithm to use.",
    url: `${SITE_URL}/guides/md5-vs-sha256`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD5 vs SHA-256: What's the Difference?",
    description:
      "Compare MD5 and SHA-256 hash algorithms: speed, security, output size, collision resistance, and real-world use cases. Learn which hashing algorithm to use.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/md5-vs-sha256`,
  },
};

export default function Md5VsSha256Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MD5 vs SHA-256: What's the Difference?",
    description:
      "Compare MD5 and SHA-256 hash algorithms: speed, security, output size, collision resistance, and real-world use cases. Learn which hashing algorithm to use.",
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    url: `${SITE_URL}/guides/md5-vs-sha256`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/md5-vs-sha256`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Is MD5 still safe to use?",
      answer:
        "MD5 is not safe for any security-critical purpose. It has known collision vulnerabilities since 2004, and practical collision attacks can be performed in seconds on modern hardware. However, MD5 is still acceptable for non-security uses like checksums for data integrity verification (when not under adversarial conditions), cache keys, and deduplication.",
    },
    {
      question: "Why is SHA-256 slower than MD5?",
      answer:
        "SHA-256 is slower because it performs 64 rounds of compression (vs 64 simpler rounds in MD5), operates on 32-bit words with more complex operations, and produces a 256-bit output (vs 128-bit). This additional computation is what makes SHA-256 far more resistant to collision and preimage attacks.",
    },
    {
      question: "Can you reverse an MD5 or SHA-256 hash?",
      answer:
        "Hash functions are one-way by design and cannot be mathematically reversed. However, MD5 hashes of common strings can be found using rainbow tables or brute-force lookups. SHA-256 is much harder to attack this way due to its larger output space (2^256 possible values). Neither can be truly 'reversed,' but MD5 is far more vulnerable to practical lookup attacks.",
    },
    {
      question: "Which hash does Bitcoin use?",
      answer:
        "Bitcoin uses SHA-256 (specifically double-SHA-256, or SHA-256d) for its proof-of-work mining algorithm. The block header is hashed twice with SHA-256, and miners compete to find a nonce that produces a hash below the target difficulty. SHA-256 was chosen for its security properties and resistance to length-extension attacks.",
    },
    {
      question: "Should I use SHA-256 for password hashing?",
      answer:
        "No. While SHA-256 is cryptographically secure, it is too fast for password hashing. Attackers can test billions of SHA-256 hashes per second using GPUs. Instead, use purpose-built password hashing algorithms like bcrypt, scrypt, or Argon2, which are deliberately slow and memory-hard to resist brute-force attacks.",
    },
  ]);

  return (
    <ToolLayout slug="md5-vs-sha256">
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
            MD5 and SHA-256 are both cryptographic hash functions that take an
            input and produce a fixed-size output, but they differ dramatically in
            security, speed, and suitability for modern applications. MD5 was
            once the go-to hash for everything from file verification to password
            storage, but known vulnerabilities have relegated it to non-security
            contexts. SHA-256 remains the gold standard for cryptographic
            hashing, underpinning Bitcoin, TLS certificates, and digital
            signatures. This guide covers exactly when to use each one.
          </p>
        </section>

        {/* What Is a Hash Function */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Is a Hash Function?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A hash function maps arbitrary-length input data to a fixed-length
            output (the &quot;digest&quot; or &quot;hash&quot;). Good
            cryptographic hash functions have three key properties:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Preimage resistance
              </strong>
              : Given a hash, it should be infeasible to find the original input.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Second preimage resistance
              </strong>
              : Given an input, it should be infeasible to find a different input
              with the same hash.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Collision resistance
              </strong>
              : It should be infeasible to find any two different inputs that
              produce the same hash.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MD5 fails collision resistance (and arguably second preimage
            resistance), while SHA-256 remains strong on all three properties.
            Try both algorithms with our{" "}
            <Link
              href="/crypto/md5-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              MD5 Hash Generator
            </Link>{" "}
            and{" "}
            <Link
              href="/crypto/sha256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              SHA-256 Hash Generator
            </Link>
            .
          </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            MD5 vs SHA-256: Comparison Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    MD5
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    SHA-256
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Published</td>
                  <td className="px-4 py-3">1992 (RFC 1321)</td>
                  <td className="px-4 py-3">2001 (NIST FIPS 180-4)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Designer</td>
                  <td className="px-4 py-3">Ronald Rivest</td>
                  <td className="px-4 py-3">NSA</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Output size</td>
                  <td className="px-4 py-3">128 bits (32 hex chars)</td>
                  <td className="px-4 py-3">256 bits (64 hex chars)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Block size</td>
                  <td className="px-4 py-3">512 bits</td>
                  <td className="px-4 py-3">512 bits</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Rounds</td>
                  <td className="px-4 py-3">64 (4 groups of 16)</td>
                  <td className="px-4 py-3">64</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Speed</td>
                  <td className="px-4 py-3">~600 MB/s (software)</td>
                  <td className="px-4 py-3">~250 MB/s (software)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Collision resistance</td>
                  <td className="px-4 py-3">Broken (2004)</td>
                  <td className="px-4 py-3">Secure</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Preimage resistance</td>
                  <td className="px-4 py-3">Weakened</td>
                  <td className="px-4 py-3">Secure</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Suitable for security</td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Output Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Output Examples
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Hashing the same input with both algorithms produces very different
            results. The most visible difference is the output length:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`Input: "hello world"

MD5:    5eb63bbbe01eeed093cb22bb8f5acdc3
        (32 hex characters = 128 bits)

SHA-256: b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
         (64 hex characters = 256 bits)`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The longer SHA-256 output means a vastly larger output space: 2^256
            possible values versus 2^128 for MD5. This makes brute-force
            collision search exponentially harder. Even with the birthday
            paradox, finding a SHA-256 collision requires approximately 2^128
            operations, while MD5 collisions can be found in seconds.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Security Deep Dive */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Security: Why MD5 Is Broken
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MD5&apos;s collision resistance was first theoretically questioned in
            1996 by Hans Dobbertin, then definitively broken in 2004 by
            Xiaoyun Wang and Hongbo Yu. Here is a timeline of MD5&apos;s
            security degradation:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">1996</strong>:
              Dobbertin finds collisions in MD5&apos;s compression function
              (not the full hash, but a serious warning).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">2004</strong>:
              Wang and Yu demonstrate practical collision attacks. Two different
              messages can produce the same MD5 hash.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">2008</strong>:
              Researchers create a rogue SSL certificate using MD5 collisions,
              proving real-world exploitability.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">2012</strong>:
              The Flame malware used an MD5 collision to forge a Microsoft
              digital signature, enabling it to spread via Windows Update.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Today</strong>:
              MD5 collisions can be generated in under a second on a standard
              laptop. Tools like HashClash make this trivial.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            SHA-256, by contrast, has no known practical attacks against any of
            its security properties. The best known attack against SHA-256 is
            a theoretical preimage attack reduced to 2^254.9 operations (versus
            the ideal 2^256), which remains computationally infeasible.
          </p>
        </section>

        {/* Speed Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Speed Comparison
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MD5 is roughly 2-3 times faster than SHA-256 in software
            implementations. This speed advantage is one reason MD5 remains
            popular for non-security tasks:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Scenario
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    MD5
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    SHA-256
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Small text (&lt;1 KB)</td>
                  <td className="px-4 py-3">~0.001 ms</td>
                  <td className="px-4 py-3">~0.002 ms</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1 MB file</td>
                  <td className="px-4 py-3">~1.5 ms</td>
                  <td className="px-4 py-3">~4 ms</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">1 GB file</td>
                  <td className="px-4 py-3">~1.5 s</td>
                  <td className="px-4 py-3">~4 s</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Throughput (x86_64)</td>
                  <td className="px-4 py-3">~600 MB/s</td>
                  <td className="px-4 py-3">~250 MB/s</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Note that modern CPUs with SHA-NI (SHA Extensions) hardware
            acceleration can compute SHA-256 at speeds approaching or exceeding
            MD5 software speeds, narrowing this gap significantly. On ARM
            processors with crypto extensions (common in Apple Silicon and modern
            servers), SHA-256 is also hardware-accelerated.
          </p>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            When to Use Each Algorithm
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Use MD5 For
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Non-cryptographic checksums
              </strong>
              : Verifying file integrity during transfers where tampering is not
              a concern (e.g., checking if a download completed correctly).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Cache keys and deduplication
              </strong>
              : Generating quick hash keys for content-addressable storage or
              cache busting.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Legacy system compatibility
              </strong>
              : When interfacing with older systems that require MD5 checksums.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                ETags and content hashing
              </strong>
              : HTTP ETags and similar identifiers where collision risk is
              acceptable.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Use SHA-256 For
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Digital signatures and certificates
              </strong>
              : TLS/SSL certificates, code signing, and document signatures all
              rely on SHA-256.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Blockchain and cryptocurrency
              </strong>
              : Bitcoin mining, Merkle trees, and transaction hashing use
              SHA-256.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                File integrity in adversarial contexts
              </strong>
              : When you need to verify that a file has not been tampered with
              by a malicious actor.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                HMAC and key derivation
              </strong>
              : SHA-256 is used in HMAC-SHA256 for API authentication and in
              HKDF for deriving encryption keys.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Git commit hashes
              </strong>
              : Git is migrating from SHA-1 to SHA-256 for object hashing.
            </li>
          </ul>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* Neither for passwords */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Neither Is Ideal for Password Hashing
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A common misconception is that SHA-256 should replace MD5 for
            password storage. In reality, neither MD5 nor SHA-256 is appropriate
            for hashing passwords. Both are designed to be fast, which is the
            opposite of what you want when an attacker is trying to brute-force
            password hashes.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Instead, use purpose-built password hashing functions:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">bcrypt</strong>:
              Adaptive cost factor, widely supported, battle-tested since 1999.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">scrypt</strong>:
              Memory-hard, resistant to GPU and ASIC attacks.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Argon2</strong>:
              Winner of the Password Hashing Competition (2015), configurable
              memory, time, and parallelism costs.
            </li>
          </ul>
        </section>

        {/* Ethereum/Keccak note */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What About Keccak256?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you work with Ethereum, you may wonder where Keccak256 fits in.
            Keccak256 is a variant of SHA-3 (the same family that won the NIST
            hash function competition). It is different from both MD5 and
            SHA-256. Ethereum chose Keccak256 over SHA-256 because it uses
            a fundamentally different construction (sponge construction vs
            Merkle-Damg&aring;rd), providing diversity in cryptographic
            assumptions.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            For Ethereum development, use our{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>
            . For general-purpose secure hashing, SHA-256 remains the standard
            choice.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Is MD5 still safe to use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              MD5 is not safe for any security-critical purpose. It has known
              collision vulnerabilities since 2004, and practical collision
              attacks can be performed in seconds on modern hardware. However,
              MD5 is still acceptable for non-security uses like checksums for
              data integrity verification (when not under adversarial
              conditions), cache keys, and deduplication.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Why is SHA-256 slower than MD5?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              SHA-256 is slower because it performs 64 rounds of compression
              (vs 64 simpler rounds in MD5), operates on 32-bit words with more
              complex operations, and produces a 256-bit output (vs 128-bit).
              This additional computation is what makes SHA-256 far more
              resistant to collision and preimage attacks.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can you reverse an MD5 or SHA-256 hash?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Hash functions are one-way by design and cannot be mathematically
              reversed. However, MD5 hashes of common strings can be found using
              rainbow tables or brute-force lookups. SHA-256 is much harder to
              attack this way due to its larger output space (2^256 possible
              values). Neither can be truly &quot;reversed,&quot; but MD5 is far
              more vulnerable to practical lookup attacks.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Which hash does Bitcoin use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Bitcoin uses SHA-256 (specifically double-SHA-256, or SHA-256d) for
              its proof-of-work mining algorithm. The block header is hashed
              twice with SHA-256, and miners compete to find a nonce that
              produces a hash below the target difficulty. SHA-256 was chosen for
              its security properties and resistance to length-extension attacks.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Should I use SHA-256 for password hashing?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              No. While SHA-256 is cryptographically secure, it is too fast for
              password hashing. Attackers can test billions of SHA-256 hashes per
              second using GPUs. Instead, use purpose-built password hashing
              algorithms like bcrypt, scrypt, or Argon2, which are deliberately
              slow and memory-hard to resist brute-force attacks.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Try Our Hash Generators
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Generate hashes instantly with our free online tools. Try the{" "}
            <Link
              href="/crypto/md5-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              MD5 Hash Generator
            </Link>{" "}
            for quick checksums, the{" "}
            <Link
              href="/crypto/sha256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              SHA-256 Hash Generator
            </Link>{" "}
            for cryptographic hashing, or the{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            for Ethereum development.
          </p>
        </section>

        {/* Related Tools */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Tools &amp; Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/crypto/md5-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                MD5 Hash Generator
              </Link>{" "}
              &mdash; Generate MD5 hashes from text input
            </li>
            <li>
              <Link
                href="/crypto/sha256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                SHA-256 Hash Generator
              </Link>{" "}
              &mdash; Generate SHA-256 hashes from text or hex input
            </li>
            <li>
              <Link
                href="/crypto/keccak256-hash"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Keccak256 Hash Generator
              </Link>{" "}
              &mdash; Generate Keccak256 hashes used by Ethereum
            </li>
            <li>
              <Link
                href="/guides/what-is-keccak256"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Keccak256?
              </Link>{" "}
              &mdash; Learn how Keccak256 hashing works and why Ethereum uses it
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
