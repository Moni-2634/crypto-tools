import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/layout/AdSlot";
import ToolLayout from "@/components/tools/ToolLayout";
import { generateFaqJsonLd } from "@/lib/seo";

const SITE_URL = "https://evmtools.dev";

export const metadata: Metadata = {
  title:
    "What is a DAO? A Complete Guide to Decentralized Autonomous Organizations | EVMTools",
  description:
    "Learn what DAOs are, how decentralized governance works with tokens and voting, famous DAOs like MakerDAO and Uniswap, DAO types, governance tools, and legal considerations.",
  keywords: [
    "dao",
    "what is a dao",
    "decentralized autonomous organization",
    "dao governance",
    "dao voting",
    "governance token",
    "makerdao",
    "uniswap dao",
    "snapshot voting",
    "on-chain governance",
    "dao treasury",
    "dao tools",
  ],
  openGraph: {
    title:
      "What is a DAO? A Complete Guide to Decentralized Autonomous Organizations | EVMTools",
    description:
      "Learn what DAOs are, how decentralized governance works with tokens and voting, famous DAOs like MakerDAO and Uniswap, DAO types, governance tools, and legal considerations.",
    url: `${SITE_URL}/guides/what-is-dao`,
    siteName: "EVMTools",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "What is a DAO? A Complete Guide to Decentralized Autonomous Organizations",
    description:
      "Learn what DAOs are, how decentralized governance works with tokens and voting, famous DAOs like MakerDAO and Uniswap, DAO types, governance tools, and legal considerations.",
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-dao`,
  },
};

export default function WhatIsDaoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What is a DAO? A Complete Guide to Decentralized Autonomous Organizations",
    description:
      "Learn what DAOs are, how decentralized governance works with tokens and voting, famous DAOs like MakerDAO and Uniswap, DAO types, governance tools, and legal considerations.",
    url: `${SITE_URL}/guides/what-is-dao`,
    author: { "@type": "Organization", name: "EVMTools" },
    publisher: {
      "@type": "Organization",
      name: "EVMTools",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    dateModified: "2026-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/what-is-dao`,
    },
  };

  const faqJsonLd = generateFaqJsonLd([
    {
      question: "How do I join a DAO?",
      answer:
        "Most DAOs are open to anyone. To participate in governance, you typically need to acquire the DAO's governance token. You can buy tokens on decentralized exchanges like Uniswap, or sometimes earn them through protocol participation. Once you hold tokens, you can vote on proposals, participate in forum discussions, and even submit your own proposals. Many DAOs also welcome non-token-holder contributions through grants and bounties.",
    },
    {
      question: "Are DAOs legal?",
      answer:
        "The legal status of DAOs varies by jurisdiction and is still evolving. Wyoming became the first US state to recognize DAOs as legal entities in 2021. Some DAOs operate as unincorporated associations, while others wrap their operations in a legal entity like a foundation (Cayman Islands, Switzerland) or an LLC. Without a legal wrapper, DAO members may face unlimited personal liability. The legal landscape is rapidly developing as regulators catch up with the technology.",
    },
    {
      question: "What is the difference between a DAO and a regular company?",
      answer:
        "A traditional company has a hierarchical structure with executives making decisions, shareholders having limited voting rights, and operations being opaque. A DAO is flat: governance power is distributed among all token holders, all financial transactions are transparent on-chain, smart contracts enforce rules automatically, and participation is permissionless. However, DAOs can be slower to make decisions and may struggle with coordination at scale.",
    },
    {
      question: "Can DAOs be hacked?",
      answer:
        "Yes. The most famous example is 'The DAO' hack in 2016, where an attacker exploited a reentrancy vulnerability to drain $60 million in ETH. Modern DAOs use extensively audited governance contracts (like OpenZeppelin Governor), timelocks that delay execution of passed proposals, and multi-sig safeguards. However, governance attacks (accumulating enough tokens to pass malicious proposals) remain a risk for DAOs with low voter participation.",
    },
    {
      question: "What are governance tokens?",
      answer:
        "Governance tokens are ERC-20 tokens that grant voting power in a DAO. One token typically equals one vote, though some DAOs use quadratic voting or other mechanisms. Examples include UNI (Uniswap), AAVE (Aave), COMP (Compound), and MKR (MakerDAO). Governance tokens can also represent a claim on the DAO's treasury or future revenue, making them both governance instruments and financial assets.",
    },
  ]);

  return (
    <ToolLayout slug="what-is-dao">
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
            A DAO (Decentralized Autonomous Organization) is an internet-native
            organization governed by its members through transparent rules
            encoded in{" "}
            <Link
              href="/guides/what-is-smart-contract"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              smart contracts
            </Link>
            . Instead of a CEO and board of directors, DAOs use token-based
            voting to make collective decisions about treasury management,
            protocol upgrades, and organizational strategy. This guide explains
            how DAOs work, the different types, famous examples, governance
            tools, and the legal landscape surrounding decentralized
            organizations.
          </p>
        </section>

        {/* What is a DAO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a DAO?
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            A <strong className="text-gray-900 dark:text-white">Decentralized Autonomous
            Organization</strong> is a community-led entity with no central
            authority. It is fully owned and managed by its members, with rules
            enforced by smart contracts on a blockchain. The key properties that
            define a DAO are:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Decentralized</strong>: No single
              person or small group has unilateral control. Power is distributed
              among token holders.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Autonomous</strong>: Core rules
              are encoded in smart contracts that execute automatically. A passed
              proposal can trigger on-chain actions without manual intervention.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Transparent</strong>: All
              proposals, votes, and treasury transactions are publicly visible
              on the blockchain. Anyone can audit how funds are spent.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Permissionless</strong>: Anyone
              can acquire governance tokens and participate in decision-making.
              No approval or membership application needed.
            </li>
          </ul>
        </section>

        {/* How DAOs Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How DAOs Work: The Governance Process
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most DAOs follow a structured governance process that moves from
            informal discussion to binding on-chain execution:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <code>{`DAO Governance Lifecycle:

1. Forum Discussion
   └── Community member posts idea on governance forum (Discourse)
   └── Open discussion, feedback, and iteration

2. Temperature Check (off-chain)
   └── Snapshot poll to gauge community sentiment
   └── No gas fees, signature-based voting
   └── Typically 3-5 day voting period

3. Formal Proposal (on-chain)
   └── Proposal submitted to Governor contract
   └── Requires minimum token threshold (e.g., 10,000 UNI to propose)
   └── Includes executable code (calldata) for on-chain actions

4. Voting Period
   └── Token holders cast votes: For / Against / Abstain
   └── Typically 5-7 day voting window
   └── Votes weighted by token holdings (1 token = 1 vote)

5. Timelock
   └── Passed proposals enter a delay period (24-48 hours)
   └── Allows community to react if something is wrong
   └── Security mechanism against governance attacks

6. Execution
   └── Smart contract automatically executes the proposal
   └── Treasury transfers, parameter changes, contract upgrades`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Governance Tokens
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Governance tokens are{" "}
            <Link
              href="/guides/what-is-erc20"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-20 tokens
            </Link>{" "}
            that represent voting power within a DAO. Holding more tokens means
            more votes. Most governance tokens also support{" "}
            <strong className="text-gray-900 dark:text-white">delegation</strong> &mdash;
            you can delegate your voting power to another address without
            transferring the tokens themselves. This allows passive holders to
            have their votes counted by active community members (delegates).
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Voting Mechanisms
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DAOs use several voting models:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Token-weighted voting</strong>: 1
              token = 1 vote. Simple but can concentrate power in large holders
              (whales).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Quadratic voting</strong>: Voting
              power scales with the square root of tokens, reducing whale
              influence. 100 tokens = 10 votes, not 100.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Conviction voting</strong>: Votes
              accumulate strength over time. The longer you support a proposal,
              the stronger your vote becomes.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Optimistic governance</strong>:
              Proposals pass automatically unless vetoed. Reduces governance
              overhead for routine decisions.
            </li>
          </ul>
        </section>

        <AdSlot slotId="guide-mid-1" format="auto" className="my-8" />

        {/* Types of DAOs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Types of DAOs
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            DAOs have evolved into several distinct categories, each serving a
            different purpose:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    DAO Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Purpose
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Protocol DAO</td>
                  <td className="px-4 py-3">Govern a DeFi protocol or network</td>
                  <td className="px-4 py-3">Uniswap, Aave, Compound, MakerDAO</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Investment DAO</td>
                  <td className="px-4 py-3">Pool capital for collective investing</td>
                  <td className="px-4 py-3">The LAO, MetaCartel Ventures, BitDAO</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Grant DAO</td>
                  <td className="px-4 py-3">Fund public goods and ecosystem development</td>
                  <td className="px-4 py-3">Gitcoin, Moloch DAO, Optimism RetroPGF</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Social DAO</td>
                  <td className="px-4 py-3">Community membership and coordination</td>
                  <td className="px-4 py-3">Friends With Benefits, Developer DAO</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Collector DAO</td>
                  <td className="px-4 py-3">Collectively acquire assets (NFTs, art)</td>
                  <td className="px-4 py-3">PleasrDAO, FlamingoDAO, ConstitutionDAO</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Service DAO</td>
                  <td className="px-4 py-3">Provide services (development, auditing)</td>
                  <td className="px-4 py-3">RaidGuild, DXdao, LexDAO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Famous DAOs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Famous DAOs and Their Impact
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            MakerDAO
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            MakerDAO governs the Maker Protocol, which issues the DAI
            stablecoin. MKR token holders vote on critical parameters like
            collateral types, stability fees (interest rates), and risk
            parameters. MakerDAO manages one of the largest{" "}
            <Link
              href="/guides/what-is-defi"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              DeFi
            </Link>{" "}
            treasuries and has been operating since 2017, making it one of the
            longest-running DAOs.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Uniswap DAO
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Uniswap DAO governs the largest decentralized exchange. UNI
            token holders control the protocol&apos;s treasury (worth billions),
            vote on fee switches, and approve protocol upgrades. Notable
            decisions include the deployment to new chains and the activation of
            protocol fee sharing.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Aave DAO
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Aave&apos;s DAO manages the leading lending protocol. AAVE holders
            vote on risk parameters, new asset listings, and protocol upgrades.
            The Aave governance process is one of the most active in DeFi, with
            multiple proposals passing each month.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ENS DAO
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The Ethereum Name Service DAO governs the .eth domain name system.
            ENS airdropped governance tokens to all .eth domain holders in
            November 2021, creating one of the largest and most diverse DAOs.
            The DAO manages protocol revenue, sets pricing policies, and funds
            ecosystem development.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            ConstitutionDAO (historic)
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In November 2021, ConstitutionDAO raised $47 million in ETH within
            a week to bid on a rare copy of the US Constitution at Sotheby&apos;s.
            Although it lost the auction, ConstitutionDAO demonstrated how DAOs
            can rapidly coordinate large-scale collective action with complete
            transparency.
          </p>
        </section>

        <AdSlot slotId="guide-mid-2" format="auto" className="my-8" />

        {/* DAO Tools */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            DAO Governance Tools
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Several tools power DAO governance infrastructure:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Tool
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Snapshot</td>
                  <td className="px-4 py-3">Off-chain voting</td>
                  <td className="px-4 py-3">
                    Gasless voting via signed messages. Most popular off-chain
                    governance tool.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Tally</td>
                  <td className="px-4 py-3">On-chain governance</td>
                  <td className="px-4 py-3">
                    Interface for on-chain Governor contracts. Proposal creation,
                    voting, and delegation.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">OpenZeppelin Governor</td>
                  <td className="px-4 py-3">Smart contract</td>
                  <td className="px-4 py-3">
                    Battle-tested governance contract framework. Used by most
                    major DAOs.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Safe (Gnosis Safe)</td>
                  <td className="px-4 py-3">Treasury management</td>
                  <td className="px-4 py-3">
                    Multi-signature wallet for DAO treasury. Requires multiple
                    approvals for transactions.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">Discourse</td>
                  <td className="px-4 py-3">Forum</td>
                  <td className="px-4 py-3">
                    Governance forum for proposal discussion and community
                    deliberation.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Aragon</td>
                  <td className="px-4 py-3">DAO framework</td>
                  <td className="px-4 py-3">
                    Complete toolkit for DAO creation, governance, and treasury
                    management.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* DAO Challenges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Challenges and Risks of DAOs
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Voter Apathy
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most DAOs struggle with low voter participation. Typical turnout is
            5&ndash;15% of eligible tokens. Many token holders acquired tokens
            for speculation, not governance. Delegation helps, but finding
            committed delegates remains a challenge.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Plutocracy Risk
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Token-weighted voting means large holders (whales) can dominate
            decisions. A single address with millions of tokens can outvote
            thousands of smaller holders. Quadratic voting and reputation-based
            systems aim to address this, but no perfect solution exists yet.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Governance Attacks
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Malicious actors can accumulate tokens (or use flash loans) to pass
            harmful proposals. The Beanstalk governance attack in 2022 used a
            flash loan to acquire enough tokens to drain $182 million.
            Timelocks, quorum requirements, and vote escrow mechanisms provide
            defense layers.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Legal Uncertainty
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Most jurisdictions lack clear legal frameworks for DAOs. Without a
            legal wrapper, DAO members may be treated as a general partnership
            with unlimited personal liability. States like Wyoming and countries
            like the Marshall Islands are creating DAO-specific legislation, but
            global legal clarity is still years away.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Coordination Overhead
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Decentralized decision-making is inherently slower than centralized
            leadership. A simple parameter change that a CEO could approve in
            minutes may take weeks through a DAO governance process (discussion,
            vote, timelock, execution). Some DAOs address this by using
            sub-committees or working groups with delegated authority.
          </p>

          <div className="rounded-lg border border-yellow-300 dark:border-yellow-800/50 bg-yellow-50 dark:bg-yellow-950/30 p-4">
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>Tip:</strong> Before joining a DAO, read its constitution
              or governance documentation. Understand the proposal threshold,
              voting period, quorum requirements, and timelock delay. Check
              voter participation history on tools like Tally or Snapshot.
            </p>
          </div>
        </section>

        {/* Creating a DAO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Create a DAO
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Building a DAO involves several steps:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-white">Define the mission</strong>:
              Clearly articulate the DAO&apos;s purpose, scope, and goals. A
              DAO needs a compelling reason for people to contribute governance
              attention.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Choose a governance framework</strong>:
              Use OpenZeppelin Governor contracts for on-chain governance.
              Configure voting delay, voting period, proposal threshold, and
              quorum percentage.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Deploy the governance token</strong>:
              Create an ERC-20 token with ERC20Votes extension for on-chain
              voting and delegation. Carefully design the token distribution to
              ensure broad participation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Set up treasury management</strong>:
              Deploy a Safe (multi-sig) to hold the DAO treasury. Configure the
              Governor to control the Safe.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Establish communication</strong>:
              Set up a governance forum (Discourse), connect Snapshot for
              off-chain polls, and create community channels (Discord).
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Consider legal structure</strong>:
              Consult a crypto-native legal firm about wrapping the DAO in a
              legal entity to limit member liability.
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
              How do I join a DAO?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Most DAOs are open to anyone. To participate in governance, you
              typically need to acquire the DAO&apos;s governance token on a
              decentralized exchange like Uniswap, or sometimes earn tokens
              through protocol participation. Once you hold tokens, you can
              vote on proposals, join forum discussions, and submit your own
              proposals. Many DAOs also welcome non-token-holder contributions
              through grants and bounties.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are DAOs legal?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The legal status of DAOs varies by jurisdiction and is still
              evolving. Wyoming became the first US state to recognize DAOs as
              legal entities in 2021. Some DAOs operate as unincorporated
              associations, while others wrap their operations in a legal entity
              like a foundation (Cayman Islands, Switzerland) or an LLC.
              Without a legal wrapper, DAO members may face unlimited personal
              liability.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is the difference between a DAO and a regular company?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              A traditional company has a hierarchical structure with executives
              making decisions, shareholders having limited voting rights, and
              operations being opaque. A DAO is flat: governance power is
              distributed among all token holders, all financial transactions
              are transparent on-chain, smart contracts enforce rules
              automatically, and participation is permissionless. However, DAOs
              can be slower to make decisions and may struggle with coordination
              at scale.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Can DAOs be hacked?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yes. The most famous example is &quot;The DAO&quot; hack in 2016,
              where an attacker exploited a reentrancy vulnerability to drain
              $60 million in ETH. Modern DAOs use extensively audited governance
              contracts (like OpenZeppelin Governor), timelocks that delay
              execution of passed proposals, and multi-sig safeguards. However,
              governance attacks remain a risk for DAOs with low voter
              participation.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What are governance tokens?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Governance tokens are ERC-20 tokens that grant voting power in a
              DAO. One token typically equals one vote, though some DAOs use
              quadratic voting or other mechanisms. Examples include UNI
              (Uniswap), AAVE (Aave), COMP (Compound), and MKR (MakerDAO).
              Governance tokens can also represent a claim on the DAO&apos;s
              treasury or future revenue, making them both governance
              instruments and financial assets.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Explore DAO Building Blocks
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            Understand the technology behind DAOs. Use our{" "}
            <Link
              href="/crypto/abi-encoder"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ABI Encoder
            </Link>{" "}
            to inspect governance contract calls, or the{" "}
            <Link
              href="/crypto/keccak256-hash"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              Keccak256 Hash Generator
            </Link>{" "}
            to verify proposal hashes. Learn about the{" "}
            <Link
              href="/guides/what-is-erc20"
              className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
            >
              ERC-20 standard
            </Link>{" "}
            that powers governance tokens.
          </p>
        </section>

        {/* Related */}
        <section className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Related Guides
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/guides/what-is-smart-contract"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is a Smart Contract?
              </Link>{" "}
              &mdash; The code that powers DAO governance
            </li>
            <li>
              <Link
                href="/guides/what-is-defi"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is DeFi?
              </Link>{" "}
              &mdash; The protocols that DAOs govern
            </li>
            <li>
              <Link
                href="/guides/what-is-erc20"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is ERC-20?
              </Link>{" "}
              &mdash; The token standard for governance tokens
            </li>
            <li>
              <Link
                href="/guides/what-is-web3"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Web3?
              </Link>{" "}
              &mdash; The decentralized web that DAOs enable
            </li>
            <li>
              <Link
                href="/guides/what-is-staking"
                className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400"
              >
                What is Staking?
              </Link>{" "}
              &mdash; Another form of on-chain participation
            </li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  );
}
