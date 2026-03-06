import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import RegexTesterTool from "./RegexTesterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Regex Tester",
  description:
    "Test regular expressions online with real-time matching, group capture, and flag support. Includes common regex patterns for email, URL, IP address, Ethereum address, and more.",
  path: "/crypto/regex-tester",
});

export default function RegexTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Regex Tester",
            url: "https://evmtools.dev/crypto/regex-tester",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Test regular expressions online with real-time matching, group capture, and flag support. Includes common regex patterns for email, URL, IP address, Ethereum address, and more.",
          }),
        }}
      />
      <ToolLayout slug="regex-tester">
        <RegexTesterTool />
      </ToolLayout>
    </>
  );
}
