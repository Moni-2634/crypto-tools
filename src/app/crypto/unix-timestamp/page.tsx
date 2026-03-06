import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import UnixTimestampTool from "./UnixTimestampTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Unix Timestamp Converter",
  description:
    "Convert between Unix timestamps and human-readable dates. Includes common Ethereum timestamps like genesis block and The Merge.",
  path: "/crypto/unix-timestamp",
});

export default function UnixTimestampPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Unix Timestamp Converter",
            url: "https://evmtools.dev/crypto/unix-timestamp",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert between Unix timestamps and human-readable dates. Includes common Ethereum timestamps like genesis block and The Merge.",
          }),
        }}
      />
      <ToolLayout slug="unix-timestamp">
        <UnixTimestampTool />
      </ToolLayout>
    </>
  );
}
