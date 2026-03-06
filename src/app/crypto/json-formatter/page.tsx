import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import JsonFormatterTool from "./JsonFormatterTool";

export const metadata: Metadata = generateToolMetadata({
  title: "JSON Formatter / Validator",
  description:
    "Format, minify, and validate JSON online. Pretty-print JSON with indentation, compress to single line, and get detailed error messages for invalid JSON.",
  path: "/crypto/json-formatter",
});

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Formatter / Validator",
            url: "https://evmtools.dev/crypto/json-formatter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Format, minify, and validate JSON online. Pretty-print JSON with indentation, compress to single line, and get detailed error messages for invalid JSON.",
          }),
        }}
      />
      <ToolLayout slug="json-formatter">
        <JsonFormatterTool />
      </ToolLayout>
    </>
  );
}
