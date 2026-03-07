import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title: "camelCase vs snake_case: Naming Convention Guide | EVMTools",
  description:
    "Compare camelCase and snake_case naming conventions: which languages use which, readability studies, conversion rules, and best practices for JavaScript, Python, Go, and Rust.",
  keywords: [
    "camelcase vs snake_case",
    "snake_case vs camelcase",
    "naming conventions programming",
    "camelcase",
    "snake case",
    "PascalCase",
    "kebab-case",
    "javascript naming convention",
    "python naming convention",
    "code style guide",
  ],
  openGraph: {
    title: "camelCase vs snake_case: Naming Convention Guide | EVMTools",
    description:
      "Compare camelCase and snake_case naming conventions: which languages use which, readability studies, conversion rules, and best practices for JavaScript, Python, Go, and Rust.",
    url: `${SITE_URL}/guides/camelcase-vs-snake-case`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "camelCase vs snake_case: Naming Convention Guide",
    description:
      "Compare camelCase and snake_case naming conventions: which languages use which, readability studies, conversion rules, and best practices for JavaScript, Python, Go, and Rust.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/camelcase-vs-snake-case`,
  },
};

export default function CamelCaseVsSnakeCasePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "camelCase vs snake_case: Naming Convention Guide",
    description:
      "Compare camelCase and snake_case naming conventions: which languages use which, readability studies, conversion rules, and best practices for JavaScript, Python, Go, and Rust.",
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    url: `${SITE_URL}/guides/camelcase-vs-snake-case`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/camelcase-vs-snake-case`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Which is more readable, camelCase or snake_case?",
      answer:
        "Research studies (Binkley et al., 2009; Sharif & Maletic, 2010) found that snake_case identifiers are slightly faster to read accurately, especially for less experienced programmers, because the underscores provide clear word boundaries. However, experienced developers in camelCase-dominant languages (JavaScript, Java) show no significant difference. Readability largely depends on what you are accustomed to.",
    },
    {
      question: "What naming convention does JavaScript use?",
      answer:
        "JavaScript uses camelCase for variables, functions, and methods (e.g., getUserName, isActive). PascalCase is used for classes and constructor functions (e.g., UserProfile, EventEmitter). SCREAMING_SNAKE_CASE is used for constants (e.g., MAX_RETRIES, API_BASE_URL). These conventions are enforced by most ESLint configurations.",
    },
    {
      question: "What naming convention does Python use?",
      answer:
        "Python uses snake_case for variables, functions, and methods (e.g., get_user_name, is_active) as defined in PEP 8. PascalCase is used for class names (e.g., UserProfile). SCREAMING_SNAKE_CASE is used for constants (e.g., MAX_RETRIES). Python's strong community adherence to PEP 8 makes snake_case essentially mandatory.",
    },
    {
      question: "Why do JSON APIs use camelCase?",
      answer:
        "Most JSON APIs use camelCase because JavaScript is the dominant language for consuming APIs in web applications, and camelCase is JavaScript's native convention. This means API response keys can be used directly as JavaScript property names without conversion. However, some APIs (notably those built with Python/Ruby) use snake_case, requiring client-side conversion.",
    },
    {
      question: "How do I convert between camelCase and snake_case?",
      answer:
        "You can convert programmatically by inserting underscores before uppercase letters and lowercasing (for camelCase to snake_case), or by removing underscores and capitalizing the following letter (for snake_case to camelCase). EVMTools' Text Case Converter handles this automatically for any text, supporting camelCase, snake_case, PascalCase, kebab-case, and more.",
    },
    {
      question: "What is kebab-case and when is it used?",
      answer:
        "kebab-case uses hyphens to separate words (e.g., user-profile, background-color). It is primarily used in CSS property names, HTML attributes, URL slugs, CLI flags (--output-dir), and file names in some frameworks. Most programming languages cannot use kebab-case for variable names because the hyphen is the subtraction operator.",
    },
  ]);

  return (
    <ToolLayout slug="camelcase-vs-snake-case">
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
            Every programmer encounters the camelCase vs snake_case debate early
            in their career. These two naming conventions dominate the
            programming world, and the choice between them is rarely a matter of
            personal preference &mdash; it is determined by the language,
            framework, and ecosystem you are working in. This guide covers the
            conventions used by every major language, readability research,
            conversion techniques, and the reasoning behind each style.
          </p>
        </section>

        {/* The Conventions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Major Naming Conventions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before comparing camelCase and snake_case, here is a complete
            overview of all common naming conventions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Convention
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Example
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Typical Usage
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">camelCase</td>
                  <td className="px-4 py-3 font-mono">getUserName</td>
                  <td className="px-4 py-3">JS/TS variables, functions, methods</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">PascalCase</td>
                  <td className="px-4 py-3 font-mono">UserProfile</td>
                  <td className="px-4 py-3">Classes, types, React components</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">snake_case</td>
                  <td className="px-4 py-3 font-mono">get_user_name</td>
                  <td className="px-4 py-3">Python, Ruby, Rust variables</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">SCREAMING_SNAKE_CASE</td>
                  <td className="px-4 py-3 font-mono">MAX_RETRIES</td>
                  <td className="px-4 py-3">Constants in most languages</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">kebab-case</td>
                  <td className="px-4 py-3 font-mono">user-profile</td>
                  <td className="px-4 py-3">CSS, HTML, URLs, CLI flags</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">SCREAMING-KEBAB-CASE</td>
                  <td className="px-4 py-3 font-mono">CONTENT-TYPE</td>
                  <td className="px-4 py-3">HTTP headers</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Convert between all of these instantly with our{" "}
            <Link
              href="/crypto/text-case-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Text Case Converter
            </Link>
            .
          </p>
        </section>

        {/* By Language */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Conventions by Programming Language
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Language
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Variables / Functions
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Classes / Types
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Constants
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">JavaScript / TypeScript</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Python</td>
                  <td className="px-4 py-3 font-mono">snake_case</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Go</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase (exported)</td>
                  <td className="px-4 py-3 font-mono">PascalCase or camelCase</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Rust</td>
                  <td className="px-4 py-3 font-mono">snake_case</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Java</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">C#</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Ruby</td>
                  <td className="px-4 py-3 font-mono">snake_case</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">PHP</td>
                  <td className="px-4 py-3 font-mono">camelCase or snake_case</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Solidity</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">SCREAMING_SNAKE</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Swift</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                  <td className="px-4 py-3 font-mono">PascalCase</td>
                  <td className="px-4 py-3 font-mono">camelCase</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Notice a near-universal pattern: PascalCase for classes/types and
            SCREAMING_SNAKE_CASE for constants. The real split between languages
            is only in variables and functions, where the camelCase vs snake_case
            divide falls.
          </p>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Deep Dive: camelCase */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            camelCase in Detail
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            camelCase (also called lower camelCase) starts with a lowercase
            letter and capitalizes the first letter of each subsequent word.
            There are no separators between words:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`// JavaScript / TypeScript
const userName = "alice";
function getUserProfile(userId) { ... }
const isAuthenticated = true;
const handleClickEvent = () => { ... };

// Go (exported functions use PascalCase)
func getBlockNumber() uint64 { ... }
func (c *Client) sendTransaction(tx *Transaction) { ... }`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Advantages</strong>: Compact
            (no separator characters), widely used in the web ecosystem, and
            closely matches how APIs name JSON keys. Go takes this further by
            using capitalization to control visibility: PascalCase for exported
            (public) identifiers and camelCase for unexported (private) ones.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Challenges</strong>: Acronyms
            and abbreviations can be awkward. Should it be{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1">xmlHTTPRequest</code>,{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1">xmlHttpRequest</code>,
            or{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1">XMLHTTPRequest</code>?
            Style guides differ on this. Single-word boundaries can also be
            ambiguous: does{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1">parsedBToken</code>{" "}
            mean &quot;parsed B-token&quot; or &quot;parse dB token&quot;?
          </p>
        </section>

        {/* Deep Dive: snake_case */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            snake_case in Detail
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            snake_case uses underscores to separate words, with all letters in
            lowercase:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Python
user_name = "alice"
def get_user_profile(user_id):
    ...
is_authenticated = True
MAX_RETRIES = 3  # constant uses SCREAMING_SNAKE_CASE

// Rust
let user_name = "alice";
fn get_user_profile(user_id: u64) -> UserProfile { ... }
let is_authenticated = true;
const MAX_RETRIES: u32 = 3;`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Advantages</strong>:
            Unambiguous word boundaries (every underscore is a separator), easier
            to read for newcomers, handles acronyms naturally
            (parse_xml_http_request), and is arguably easier to read in
            identifiers with many words.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Challenges</strong>: Takes
            more horizontal space due to underscore characters, requires
            reaching for the underscore key (shift + hyphen on US keyboards),
            and looks unfamiliar to developers coming from JavaScript/Java
            backgrounds.
          </p>
        </section>

        {/* Readability Research */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Research Says About Readability
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Several academic studies have investigated the readability of
            different naming conventions:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Binkley et al. (2009)
              </strong>
              : Found that snake_case identifiers were identified more quickly
              and accurately by programmers with less training, while experienced
              programmers showed no significant difference.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Sharif &amp; Maletic (2010)
              </strong>
              : Using eye-tracking, they found that snake_case identifiers
              required fewer fixations and less time to accurately identify,
              suggesting lower cognitive load.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Bonita Sharif (2010)
              </strong>
              : Confirmed that underscored identifiers lead to higher accuracy
              in correctness of identification, though the speed difference was
              small.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The practical takeaway: snake_case may have a slight edge in raw
            readability, but the most important factor is{" "}
            <strong className="text-gray-900 dark:text-white">consistency</strong>.
            Mixing conventions within a codebase is far worse than either choice
            on its own.
          </p>
        </section>

        {/* The Cross-Language Problem */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Cross-Language Conversion Problem
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A common challenge arises when different parts of your stack use
            different conventions. Consider a typical web application:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`# Python API returns snake_case
{ "user_name": "alice", "created_at": "2026-01-01", "is_active": true }

// JavaScript frontend expects camelCase
{ userName: "alice", createdAt: "2026-01-01", isActive: true }

// Database column names are often snake_case
SELECT user_name, created_at, is_active FROM users;`}</code>
          </pre>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Solutions include: automatic conversion middleware (like{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1">humps</code> in
            JavaScript or{" "}
            <code className="rounded bg-gray-100 dark:bg-gray-800 px-1">djangorestframework-camel-case</code>),
            serializer-level transformation, or simply adopting one convention
            across the entire API boundary. Use our{" "}
            <Link
              href="/crypto/text-case-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Text Case Converter
            </Link>{" "}
            to quickly convert identifiers between conventions.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* URL and File Naming */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Naming in URLs and Files
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Outside of code, naming conventions also matter for URLs, file
            names, and slugs:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">URLs / slugs</strong>:
              kebab-case is the standard (/guides/camelcase-vs-snake-case). URLs
              are case-insensitive in practice, and hyphens are treated as word
              separators by search engines. Use our{" "}
              <Link
                href="/crypto/slugify"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Slugify Tool
              </Link>{" "}
              to generate URL-friendly slugs.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">File names</strong>:
              kebab-case (user-profile.ts) or snake_case (user_profile.py)
              depending on the language ecosystem. camelCase file names
              (userProfile.ts) are used in some JavaScript projects.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Environment variables
              </strong>
              : SCREAMING_SNAKE_CASE is universal
              (DATABASE_URL, API_SECRET_KEY).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">CSS</strong>: kebab-case is
              the only convention (background-color, font-size, border-radius).
              CSS custom properties also use kebab-case (--primary-color).
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Best Practices
          </h2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Follow your language&apos;s convention
              </strong>
              : Do not use snake_case in JavaScript or camelCase in Python. Your
              code will look foreign to other developers in that ecosystem.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Be consistent within a project
              </strong>
              : Mixing conventions is the worst option. Pick one and enforce it
              with a linter (ESLint, Pylint, clippy, golint).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Use a formatter
              </strong>
              : Prettier, Black, gofmt, and rustfmt enforce consistency
              automatically.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Convert at API boundaries
              </strong>
              : If your backend uses snake_case and frontend uses camelCase,
              convert at the serialization layer, not in business logic.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Handle acronyms consistently
              </strong>
              : Decide on a rule (e.g., treat acronyms as words: httpUrl,
              not hTTPURL) and document it.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Which is more readable, camelCase or snake_case?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Research studies (Binkley et al., 2009; Sharif &amp; Maletic,
              2010) found that snake_case identifiers are slightly faster to
              read accurately, especially for less experienced programmers,
              because the underscores provide clear word boundaries. However,
              experienced developers in camelCase-dominant languages (JavaScript,
              Java) show no significant difference. Readability largely depends
              on what you are accustomed to.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What naming convention does JavaScript use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              JavaScript uses camelCase for variables, functions, and methods
              (e.g., getUserName, isActive). PascalCase is used for classes and
              constructor functions (e.g., UserProfile, EventEmitter).
              SCREAMING_SNAKE_CASE is used for constants (e.g., MAX_RETRIES,
              API_BASE_URL). These conventions are enforced by most ESLint
              configurations.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What naming convention does Python use?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Python uses snake_case for variables, functions, and methods (e.g.,
              get_user_name, is_active) as defined in PEP 8. PascalCase is used
              for class names (e.g., UserProfile). SCREAMING_SNAKE_CASE is used
              for constants (e.g., MAX_RETRIES). Python&apos;s strong community
              adherence to PEP 8 makes snake_case essentially mandatory.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Why do JSON APIs use camelCase?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Most JSON APIs use camelCase because JavaScript is the dominant
              language for consuming APIs in web applications, and camelCase is
              JavaScript&apos;s native convention. This means API response keys
              can be used directly as JavaScript property names without
              conversion. However, some APIs (notably those built with
              Python/Ruby) use snake_case, requiring client-side conversion.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How do I convert between camelCase and snake_case?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              You can convert programmatically by inserting underscores before
              uppercase letters and lowercasing (for camelCase to snake_case), or
              by removing underscores and capitalizing the following letter (for
              snake_case to camelCase). EVMTools&apos;{" "}
              <Link
                href="/crypto/text-case-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Text Case Converter
              </Link>{" "}
              handles this automatically for any text, supporting camelCase,
              snake_case, PascalCase, kebab-case, and more.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is kebab-case and when is it used?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              kebab-case uses hyphens to separate words (e.g., user-profile,
              background-color). It is primarily used in CSS property names, HTML
              attributes, URL slugs, CLI flags (--output-dir), and file names in
              some frameworks. Most programming languages cannot use kebab-case
              for variable names because the hyphen is the subtraction operator.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Convert Text Cases Instantly
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Switch between naming conventions with our free tools. Use the{" "}
            <Link
              href="/crypto/text-case-converter"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Text Case Converter
            </Link>{" "}
            for camelCase, snake_case, PascalCase, kebab-case, and more. Need
            URL-friendly names? Try the{" "}
            <Link
              href="/crypto/slugify"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Slugify Tool
            </Link>
            .
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
                href="/crypto/text-case-converter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Text Case Converter
              </Link>{" "}
              &mdash; Convert between camelCase, snake_case, PascalCase, kebab-case, and more
            </li>
            <li>
              <Link
                href="/crypto/slugify"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Slugify Tool
              </Link>{" "}
              &mdash; Generate URL-friendly slugs from any text
            </li>
            <li>
              <Link
                href="/crypto/json-formatter"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                JSON Formatter / Validator
              </Link>{" "}
              &mdash; Format and validate JSON with camelCase or snake_case keys
            </li>
            <li>
              <Link
                href="/crypto/regex-tester"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                Regex Tester
              </Link>{" "}
              &mdash; Test regex patterns for case conversion and validation
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
