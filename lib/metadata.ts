import type { Metadata } from "next";
import { siteConfig } from "./config";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = `${siteConfig.domain}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: `${siteConfig.domain}/og-neurax.png`, alt: "NeuraX web development and AI automation services" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.domain}/og-neurax.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}
