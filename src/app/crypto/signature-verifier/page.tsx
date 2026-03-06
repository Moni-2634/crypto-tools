import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";
import SignatureVerifierTool from "./SignatureVerifierTool";

export const metadata: Metadata = generateToolMetadata({
  title: "Signature Signer & Verifier",
  description:
    "Sign messages with a private key and verify Ethereum signatures. Recover signer addresses from EIP-191 signed messages.",
  path: "/crypto/signature-verifier",
});

export default function SignatureVerifierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Signature Signer & Verifier",
            url: "https://evmtools.dev/crypto/signature-verifier",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Sign messages with a private key and verify Ethereum signatures. Recover signer addresses from EIP-191 signed messages.",
          }),
        }}
      />
      <ToolLayout slug="signature-verifier">
        <SignatureVerifierTool />
      </ToolLayout>
    </>
  );
}
