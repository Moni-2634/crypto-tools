import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import PrivateKeyToAddressTool from "./PrivateKeyToAddressTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Private Key to Address",
  description:
    "Derive Ethereum public key and address from a private key. Shows uncompressed and compressed public keys with checksummed address.",
  path: "/crypto/private-key-to-address",
});

export default function PrivateKeyToAddressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Private Key to Address",
            url: "https://evmtools.dev/crypto/private-key-to-address",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Derive Ethereum public key and address from a private key. Shows uncompressed and compressed public keys with checksummed address.",
          }),
        }}
      />
      <ToolLayout slug="private-key-to-address">
        <PrivateKeyToAddressTool />
      </ToolLayout>
    </>
  );
}
