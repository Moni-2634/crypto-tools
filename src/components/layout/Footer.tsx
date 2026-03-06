import Link from "next/link";
import DonationButton from "./DonationButton";
import NewsletterSignup from "./NewsletterSignup";

const POPULAR_TOOLS = [
  { name: "ABI Encoder / Decoder", href: "/crypto/abi-encoder" },
  { name: "Keccak256 Hash Generator", href: "/crypto/keccak256-hash" },
  { name: "Gas Fee Calculator", href: "/crypto/gas-calculator" },
  { name: "Calldata Decoder", href: "/crypto/calldata-decoder" },
  { name: "Unix Timestamp Converter", href: "/crypto/unix-timestamp" },
  { name: "Signature Verifier", href: "/crypto/signature-verifier" },
];

const POPULAR_GUIDES = [
  { name: "What is DeFi?", href: "/guides/what-is-defi" },
  { name: "What is Staking?", href: "/guides/what-is-staking" },
  { name: "Ethereum vs Bitcoin", href: "/guides/ethereum-vs-bitcoin" },
  { name: "What is a Smart Contract?", href: "/guides/what-is-smart-contract" },
  { name: "EIP-1559 Explained", href: "/guides/eip-1559-explained" },
  { name: "What is a Layer 2?", href: "/guides/what-is-layer2" },
];

const RESOURCES = [
  { name: "All Tools", href: "/#tools" },
  { name: "All Guides", href: "/#guides" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Newsletter Signup */}
        <div className="mb-10">
          <NewsletterSignup />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Popular Tools */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Popular Tools
            </h4>
            <ul className="space-y-2">
              {POPULAR_TOOLS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Guides */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Popular Guides
            </h4>
            <ul className="space-y-2">
              {POPULAR_GUIDES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Resources
            </h4>
            <ul className="space-y-2">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row dark:border-gray-800">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EVMTools. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <DonationButton />
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Built for Ethereum developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
