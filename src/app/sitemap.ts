import type { MetadataRoute } from "next";
import { tools, guides } from "@/lib/tools";

const BASE_URL = "https://evmtools.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/crypto/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const landingPages = [
    { url: `${BASE_URL}/about`, priority: 0.6 },
    { url: `${BASE_URL}/contact`, priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, priority: 0.3 },
    { url: `${BASE_URL}/tools`, priority: 0.9 },
    { url: `${BASE_URL}/tools/hash-generators`, priority: 0.8 },
    { url: `${BASE_URL}/tools/text-tools`, priority: 0.8 },
    { url: `${BASE_URL}/tools/converters`, priority: 0.8 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...landingPages,
    ...toolPages,
    ...guidePages,
  ];
}
