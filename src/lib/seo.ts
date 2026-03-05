import type { Metadata } from "next";

const SITE_NAME = "EVMTools";
const SITE_URL = "https://evmtools.dev";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function generateToolMetadata({
  title,
  description,
  path,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og/tools.svg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og/tools.svg"],
    },
    alternates: {
      canonical: url,
    },
  };
}
