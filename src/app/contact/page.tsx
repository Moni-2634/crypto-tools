import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = {
  title: "Contact Us | EVMTools",
  description:
    "Get in touch with the EVMTools team for support, feature requests, bug reports, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <ToolLayout slug="contact">
      <div className="prose-custom max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            We&apos;d love to hear from you. Reach out with questions, feedback, or ideas.
          </p>
        </div>

        <section className="space-y-4">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Whether you&apos;ve found a bug in one of our tools, have a suggestion for a new
            feature, or just want to say hello, we are always open to feedback from the
            community.
          </p>
        </section>

        <section className="space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              General Inquiries & Support
            </h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
              For general questions about how to use a tool, business inquiries, or
              support requests, please email us directly:
            </p>
            <a 
              href="mailto:hello@evmtools.dev" 
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Email hello@evmtools.dev
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Before reaching out, your question might already be answered:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Are the tools safe for private keys?</strong> Yes. All our
              cryptographic and Ethereum tools execute entirely in your local browser.
              Try turning off your Wi-Fi—the tools will still work!
            </li>
            <li>
              <strong>Can I request a new tool?</strong> Absolutely. Send us an email
              with the tool you&apos;d like to see, and we&apos;ll add it to our roadmap.
            </li>
            <li>
              <strong>I found a calculation error.</strong> Please email us immediately
              with the steps to reproduce the error so we can fix the underlying logic.
            </li>
          </ul>
        </section>

      </div>
    </ToolLayout>
  );
}
