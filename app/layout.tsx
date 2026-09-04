import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host =
    incomingHeaders.get("x-forwarded-host") ??
    incomingHeaders.get("host") ??
    "www.neuraxai.co.uk";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(baseUrl),
    title: "NeuraXAI | Websites & AI Solutions",
    description:
      "Conversion-first websites and practical AI automation for ambitious businesses. Book a free 30-minute consultation.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      siteName: "NeuraXAI",
      title: "NeuraXAI | Websites & AI Solutions",
      description: "Websites that win attention. AI that saves time.",
      images: [{ url: `${baseUrl}/og.png`, alt: "NeuraXAI web development and AI solutions" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "NeuraXAI | Websites & AI Solutions",
      description: "Websites that win attention. AI that saves time.",
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
