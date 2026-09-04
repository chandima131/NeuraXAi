import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "www.neuraxai.co.uk";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = "NeuraX | Web Development, Web Apps & AI Automation UK";
  const description = "NeuraX provides professional website development, custom web applications and AI automation solutions for UK businesses. Book a free 30-minute consultation.";
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(baseUrl),
    applicationName: siteConfig.name,
    title,
    description,
    alternates: { canonical: siteConfig.domain },
    category: "technology",
    creator: siteConfig.name,
    publisher: siteConfig.name,
    verification: googleVerification ? { google: googleVerification } : undefined,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", locale: "en_GB", url: siteConfig.domain, siteName: siteConfig.name, title, description, images: [{ url: `${baseUrl}/og-neurax.png`, alt: "NeuraX digital solutions for growing businesses" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${baseUrl}/og-neurax.png`] },
  };
}

const socialProfiles = Object.values(siteConfig.social).filter(Boolean);
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteConfig.domain}/#organization`, name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email, telephone: siteConfig.whatsapp.displayNumber, logo: `${siteConfig.domain}/favicon.svg`, sameAs: socialProfiles, contactPoint: { "@type": "ContactPoint", contactType: "customer enquiries", email: siteConfig.email, telephone: siteConfig.whatsapp.displayNumber, areaServed: "GB", availableLanguage: "English" } },
    { "@type": "ProfessionalService", "@id": `${siteConfig.domain}/#service`, name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email, telephone: siteConfig.whatsapp.displayNumber, areaServed: { "@type": "Country", name: "United Kingdom" }, serviceType: services.map((service) => service.title), hasOfferCatalog: { "@type": "OfferCatalog", name: "Digital services", itemListElement: services.map((service) => ({ "@type": "OfferCatalog", name: service.title, url: `${siteConfig.domain}/services/${service.slug}` })) } },
    { "@type": "WebSite", "@id": `${siteConfig.domain}/#website`, name: siteConfig.name, url: siteConfig.domain, inLanguage: "en-GB", publisher: { "@id": `${siteConfig.domain}/#organization` } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /><SiteChrome>{children}</SiteChrome></body></html>;
}
