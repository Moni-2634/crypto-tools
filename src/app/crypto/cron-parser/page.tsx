import type { Metadata } from "next";
import Link from "next/link";
import { generateToolMetadata, generateFaqJsonLd } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AdSlot from "@/components/layout/AdSlot";
import CronParserTool from "./CronParserTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Cron Expression Parser",
  description:
    "Parse and explain cron expressions online. Get human-readable descriptions, see next scheduled run times, and learn cron syntax with a cheat sheet. Free, client-side tool.",
  path: "/crypto/cron-parser",
});

const faqs = [
  {
    question: "What is a cron expression?",
    answer:
      "A cron expression is a string of five fields separated by spaces that defines a schedule for recurring tasks. The fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Cron expressions are used in Unix/Linux cron jobs, CI/CD pipelines, cloud schedulers (AWS EventBridge, Google Cloud Scheduler), and task automation tools.",
  },
  {
    question: "How do I read a cron expression?",
    answer:
      "Read a cron expression from left to right: the first field is the minute, second is the hour, third is the day of month, fourth is the month, and fifth is the day of week. An asterisk (*) means 'every', a number means 'at that specific value', a range like 1-5 means 'from 1 through 5', and */5 means 'every 5th'. For example, '0 9 * * 1-5' means 'at 9:00 AM, Monday through Friday'.",
  },
  {
    question: "What does */5 mean in a cron expression?",
    answer:
      "The */5 syntax means 'every 5th value'. In the minute field, */5 means every 5 minutes (0, 5, 10, 15, ..., 55). In the hour field, */5 means every 5 hours (0, 5, 10, 15, 20). You can use any step value: */2 means every other value, */10 means every 10th value, and so on.",
  },
  {
    question: "What is the difference between 5-field and 6-field cron?",
    answer:
      "Standard Unix cron uses 5 fields (minute, hour, day of month, month, day of week). Some systems like Quartz Scheduler and Spring add a 6th field for seconds at the beginning. AWS EventBridge uses 6 fields with a year field at the end. This tool supports the standard 5-field format used by most cron implementations.",
  },
  {
    question: "How do I schedule a cron job for every Monday at 9 AM?",
    answer:
      "The cron expression for every Monday at 9 AM is '0 9 * * 1'. The fields break down as: minute=0 (at the start of the hour), hour=9 (9 AM), day of month=* (any), month=* (any), day of week=1 (Monday). In most cron implementations, 0=Sunday, 1=Monday, ..., 6=Saturday.",
  },
  {
    question: "Can I use this tool for AWS, GitHub Actions, or Kubernetes cron?",
    answer:
      "Yes, this tool parses the standard 5-field cron syntax used by GitHub Actions (schedule trigger), Kubernetes CronJobs, AWS CloudWatch Events (without the 6th year field), Google Cloud Scheduler, and traditional Unix cron. The core 5-field syntax is the same across all these platforms.",
  },
];

export default function CronParserPage() {
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cron Expression Parser",
            url: "https://evmtools.dev/crypto/cron-parser",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Parse and explain cron expressions online. Get human-readable descriptions and see next scheduled run times.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolLayout slug="cron-parser">
        <CronParserTool />

        <AdSlot slotId="tool-content-1" format="horizontal" className="my-8" />

        {/* How to Use section */}
        <section className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Cron Expression Parser
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              This free online cron expression parser helps you understand and
              debug cron schedules. It converts cron expressions into
              human-readable descriptions and shows upcoming run times.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enter your cron expression</strong> &mdash; type or
                paste a 5-field cron expression (e.g., <code>*/5 * * * *</code>
                ).
              </li>
              <li>
                <strong>Read the description</strong> &mdash; the tool
                instantly provides a human-readable explanation of the
                schedule.
              </li>
              <li>
                <strong>Check next run times</strong> &mdash; see the next 10
                scheduled execution times in your local timezone.
              </li>
              <li>
                <strong>Review field breakdown</strong> &mdash; each field is
                explained individually to help you understand the expression.
              </li>
            </ol>
            <p>
              Try the preset examples to learn common cron patterns, or use
              the cheat sheet as a reference for the syntax.
            </p>
          </div>
        </section>

        {/* Use Cases section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>CI/CD pipelines</strong> &mdash; Verify cron schedules
              for GitHub Actions, GitLab CI, or Jenkins scheduled builds.
            </li>
            <li>
              <strong>Cloud function triggers</strong> &mdash; Debug
              scheduling expressions for AWS Lambda, Google Cloud Functions,
              or Azure Functions.
            </li>
            <li>
              <strong>Kubernetes CronJobs</strong> &mdash; Validate cron
              schedules for Kubernetes batch workloads.
            </li>
            <li>
              <strong>Server cron jobs</strong> &mdash; Set up and verify
              Unix/Linux crontab entries for database backups, log rotation,
              and maintenance scripts.
            </li>
            <li>
              <strong>Blockchain automation</strong> &mdash; Schedule on-chain
              operations like price oracle updates, keeper bot executions,
              and governance proposal checks.
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/crypto/unix-timestamp"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Unix Timestamp Converter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Convert between Unix timestamps and human-readable dates.
              </p>
            </Link>
            <Link
              href="/crypto/regex-tester"
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Regex Tester
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Test regular expressions with real-time matching and capture
                groups.
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
                Format, minify, and validate JSON data for configs and APIs.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ section */}
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
