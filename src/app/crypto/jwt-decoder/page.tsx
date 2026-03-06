import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import JwtDecoderTool from "./JwtDecoderTool";

export const metadata: Metadata = generateToolMetadata({
  title: "JWT Decoder",
  description:
    "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, claims, expiration time, and validate token structure.",
  path: "/crypto/jwt-decoder",
});

const faqs = [
  {
    question: "What is a JSON Web Token (JWT)?",
    answer:
      "A JSON Web Token is a compact, URL-safe token format defined by RFC 7519. It consists of three Base64URL-encoded parts separated by dots: a header specifying the algorithm, a payload containing claims (like user ID and expiration), and a cryptographic signature that verifies the token has not been tampered with.",
  },
  {
    question: "What is the difference between JWT and session cookies?",
    answer:
      "Session cookies store a session ID on the client while the actual session data lives on the server. JWTs are self-contained tokens that carry all the data in the payload, so the server does not need to look up a session store. JWTs are stateless and scale well across distributed systems, but they cannot be easily revoked before expiration.",
  },
  {
    question: "What are the three parts of a JWT (header, payload, signature)?",
    answer:
      "The header declares the token type and signing algorithm (e.g., HS256 or RS256). The payload contains claims such as sub (subject), iat (issued at), exp (expiration), and any custom data. The signature is created by signing the encoded header and payload with a secret key or private key to ensure integrity.",
  },
  {
    question: "How does JWT expiration work?",
    answer:
      "The exp claim in the payload is a Unix timestamp indicating when the token expires. Servers should reject tokens where the current time exceeds this value. The iat (issued at) and nbf (not before) claims provide additional time-based validation.",
  },
  {
    question: "Is it secure to decode a JWT in the browser?",
    answer:
      "Decoding a JWT (reading the header and payload) is safe because these sections are only Base64URL-encoded, not encrypted. Anyone with the token can read its contents. Security comes from the signature, which prevents tampering. Never put sensitive secrets in the payload unless the token is also encrypted (JWE).",
  },
  {
    question: "How are JWTs used in Web3 and decentralized applications?",
    answer:
      "In Web3, JWTs are often issued after a user proves wallet ownership through a message signature (Sign-In with Ethereum / EIP-4361). The JWT then serves as a session token for off-chain APIs, combining wallet-based authentication with traditional backend authorization.",
  },
];

export default function JwtDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JWT Decoder",
            url: "https://evmtools.dev/crypto/jwt-decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, claims, expiration time, and validate token structure.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqJsonLd(faqs)),
        }}
      />
      <ToolLayout slug="jwt-decoder">
        <JwtDecoderTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This JWT Decoder
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This tool decodes JSON Web Tokens instantly in your browser,
              letting you inspect the header, payload, and signature of any JWT
              without installing libraries or writing code. It is useful for
              debugging authentication flows, verifying token claims, and
              checking expiration times during development.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Paste your JWT token</strong> into the input field. The
                token should be in the standard three-part format:
                header.payload.signature. You can copy it from browser
                DevTools, an API response, or your application logs.
              </li>
              <li>
                <strong>View the decoded header</strong> to see the signing
                algorithm (such as HS256, RS256, or ES256) and the token type.
                This tells you how the token was signed and what key type is
                needed for verification.
              </li>
              <li>
                <strong>Inspect the payload</strong> to read all claims
                including sub (subject/user ID), iss (issuer), aud (audience),
                iat (issued at), and exp (expiration). Custom claims added by
                your application are also displayed.
              </li>
              <li>
                <strong>Check the expiration</strong> &mdash; the tool converts
                Unix timestamps to human-readable dates and shows whether the
                token is currently valid or expired.
              </li>
              <li>
                <strong>Review the signature</strong> section. While this tool
                does not verify signatures (that requires the secret or public
                key), it shows the raw signature data for reference.
              </li>
            </ol>
            <p>
              All decoding happens client-side. Your tokens never leave your
              browser, so it is safe to decode production tokens containing
              user data or authentication claims during debugging sessions.
            </p>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>API authentication debugging</strong> &mdash; Decode
              access tokens and refresh tokens to verify they contain the
              correct scopes, roles, and user identifiers when troubleshooting
              401/403 errors.
            </li>
            <li>
              <strong>OAuth token inspection</strong> &mdash; Examine ID tokens
              and access tokens from OAuth 2.0 / OpenID Connect providers to
              confirm issuer, audience, and claim values match your
              configuration.
            </li>
            <li>
              <strong>Web3 authentication</strong> &mdash; Inspect JWTs issued
              after Sign-In with Ethereum (SIWE) flows to verify the wallet
              address, chain ID, and session duration are correct.
            </li>
            <li>
              <strong>Token expiration verification</strong> &mdash; Quickly
              check whether a JWT has expired or is about to expire, which is
              essential when debugging token refresh logic or session timeout
              issues.
            </li>
            <li>
              <strong>Security auditing</strong> &mdash; Review token payloads
              to ensure sensitive information is not exposed and that tokens use
              strong signing algorithms like RS256 or ES256 instead of the
              weaker HS256 with short secrets.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/crypto/base64-encoder"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Base64 Encoder / Decoder
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encode and decode Base64 strings used in JWT token segments.
              </p>
            </Link>
            <Link
              href="/crypto/json-formatter"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                JSON Formatter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Format and validate the JSON payload extracted from JWT tokens.
              </p>
            </Link>
            <Link
              href="/crypto/sha256-hash"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                SHA-256 Hash Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate SHA-256 hashes used in JWT signature algorithms like
                HS256 and RS256.
              </p>
            </Link>
          </div>
        </section>

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
