import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import Md5HashTool from "./Md5HashTool";

export const metadata: Metadata = generateToolMetadata({
  title: "MD5 Hash Generator",
  description:
    "Generate MD5 hashes from text online. Fast client-side MD5 hash calculator with no server processing. For checksums, fingerprinting, and legacy compatibility.",
  path: "/crypto/md5-hash",
});

export default function Md5HashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "MD5 Hash Generator",
            url: "https://evmtools.dev/crypto/md5-hash",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate MD5 hashes from text online. Fast client-side MD5 hash calculator with no server processing. For checksums, fingerprinting, and legacy compatibility.",
          }),
        }}
      />
      <ToolLayout slug="md5-hash">
        <Md5HashTool />
      </ToolLayout>
    </>
  );
}
