import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import AddressValidatorTool from "./AddressValidatorTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Address Validator",
  description:
    "Validate cryptocurrency wallet addresses for Ethereum, Bitcoin, and Solana. Check if an address is valid before sending funds.",
  path: "/crypto/address-validator",
});

export default function AddressValidatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Address Validator",
            url: "https://evmtools.dev/crypto/address-validator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Validate cryptocurrency wallet addresses for Ethereum, Bitcoin, and Solana. Check if an address is valid before sending funds.",
          }),
        }}
      />
      <ToolLayout slug="address-validator">
        <AddressValidatorTool />
      </ToolLayout>
    </>
  );
}
