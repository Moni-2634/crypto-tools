import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | EVMTools",
  description:
    "Privacy Policy for EVMTools. Learn how we handle your data, use cookies for analytics and advertising, and protect your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <ToolLayout slug="privacy-policy">
      <div className="prose-custom max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <section className="space-y-4">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            At EVMTools ("we", "our", or "us"), your privacy is important to us.
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our website (https://evmtools.dev).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong>Client-Side Processing:</strong> The vast majority of the tools on
            EVMTools run entirely client-side in your web browser. This means that data
            such as private keys, mnemonics, input text, and decoded smart contract
            calldata are processed on your device and are <strong>never</strong> transmitted
            to our servers. We do not store or track the specific inputs you use within
            our local developer tools.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong>Automatically Collected Information:</strong> We may collect certain
            aggregated, non-personally identifiable information automatically when you
            visit, use, or navigate the site. This information does not reveal your
            specific identity but may include device and usage information, such as your
            IP address, browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location, information
            about how and when you use our site, and other technical information. This
            is primarily gathered through Google Analytics.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Cookies and Tracking Technologies
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            We use cookies and similar tracking technologies to access or store
            information. We use these technologies for analytics (Google Analytics) to
            understand how visitors interact with our website, and for advertising (Google
            AdSense) to serve relevant ads.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Google Analytics:</strong> We use Google Analytics to help us
              understand how our customers use the site. You can read more about how
              Google uses your Personal Information here:{" "}
              <a
                href="https://www.google.com/intl/en/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://www.google.com/intl/en/policies/privacy/
              </a>
              . You can also opt-out of Google Analytics here:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </li>
            <li>
              <strong>Google AdSense:</strong> We use Google AdSense to display ads.
              Google uses cookies to serve ads based on your prior visits to our
              website or other websites. Google's use of advertising cookies enables
              it and its partners to serve ads to you based on your visit to our
              sites and/or other sites on the Internet. You may opt out of personalized
              advertising by visiting{" "}
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ads Settings
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Third-Party Links
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Our website may contain links to third-party websites. We have no control
            over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites or services. We encourage you to review
            the privacy policy of any site you visit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            We may update our Privacy Policy from time to time. We will notify you of any
            changes by posting the new Privacy Policy on this page and updating the
            "Last updated" date. You are advised to review this Privacy Policy
            periodically for any changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Contact Us
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy, you can contact us at{" "}
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
