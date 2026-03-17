import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = {
  title: "Terms of Service | EVMTools",
  description:
    "Terms of Service for EVMTools. Read the rules, guidelines, and disclaimers for using our free crypto and developer tools.",
};

export default function TermsOfServicePage() {
  return (
    <ToolLayout slug="terms-of-service">
      <div className="prose-custom max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <section className="space-y-4">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Welcome to EVMTools ("we," "our," or "us"). By accessing or using our
            website (https://evmtools.dev) and the tools provided, you agree to comply
            with and be bound by these Terms of Service. If you do not agree with
            these terms, please do not use our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Use of Tools and Services
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            EVMTools provides a collection of free online tools for developers and
            cryptocurrency users. The tools are provided for educational and
            informational purposes only. 
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            You agree to use the site only for lawful purposes. You are solely
            responsible for any data, code, or inputs you process using our tools.
            While our tools process data client-side in your browser, you should
            always exercise caution when handling sensitive information like private
            keys or seed phrases.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Disclaimer of Warranties
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 uppercase text-sm font-semibold tracking-wide">
            The materials and tools on EVMTools are provided on an "as is" and "as available" basis. 
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            We make no warranties, expressed or implied, and hereby disclaim and negate
            all other warranties including, without limitation, implied warranties or
            conditions of merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property or other violation of rights.
            We do not warrant or make any representations concerning the accuracy, likely
            results, or reliability of the use of the tools on our website or otherwise
            relating to such materials or on any sites linked to this site.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 border-l-4 border-red-500 pl-4">
            Financial Disclaimer: None of the information on this website constitutes
            financial, investment, or trading advice. You are solely responsible for
            your own financial decisions and interactions with blockchain networks.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Limitation of Liability
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            In no event shall EVMTools or its contributors be liable for any damages
            (including, without limitation, damages for loss of data or profit, or due
            to business interruption, or loss of digital assets/cryptocurrency) arising
            out of the use or inability to use the materials and tools on EVMTools, even
            if we have been notified orally or in writing of the possibility of such
            damage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Intellectual Property
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            The design, text, graphics, and structure of EVMTools are our intellectual
            property. Some underlying logic or libraries used in our client-side tools
            may be open-source and subject to their respective licenses. You may not
            reproduce, distribute, or create derivative works from the site content
            without express permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Modifications
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            We may revise these Terms of Service at any time without notice. By using
            this website, you are agreeing to be bound by the then-current version of
            these Terms of Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            6. Contact Us
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you have questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:hello@evmtools.dev" className="text-blue-500 hover:underline">
              hello@evmtools.dev
            </a>
            .
          </p>
        </section>
      </div>
    </ToolLayout>
  );
}
