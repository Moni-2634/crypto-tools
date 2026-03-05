import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import ChecksumAddressTool from "./ChecksumAddressTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Checksum Address Converter",
  description:
    "Convert Ethereum addresses to EIP-55 checksummed format. Ensure your addresses are safe for transactions.",
  path: "/crypto/checksum-address",
});

export default function ChecksumAddressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Checksum Address Converter",
            url: "https://evmtools.dev/crypto/checksum-address",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Convert Ethereum addresses to EIP-55 checksummed format. Ensure your addresses are safe for transactions.",
          }),
        }}
      />
      <ToolLayout slug="checksum-address">
        <ChecksumAddressTool />
      </ToolLayout>
    </>
  );
}
