import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationLink } from "@/components/ConsultationLink";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getService, services } from "@/data/services";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "www.neuraxai.co.uk";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const url = `${protocol}://${host}/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `${siteConfig.domain}/services/${service.slug}` },
    openGraph: { type: "website", locale: "en_GB", siteName: siteConfig.name, title: service.seoTitle, description: service.seoDescription, url, images: [] },
    twitter: { card: "summary", title: service.seoTitle, description: service.seoDescription, images: [] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${siteConfig.domain}/services/${service.slug}`,
    provider: { "@id": `${siteConfig.domain}/#organization` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    serviceType: service.title,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.domain}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteConfig.domain}/services/${service.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="page-hero">
        <Container className="page-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{service.title}</span></p>
            <p className="eyebrow eyebrow-light"><span />{service.eyebrow}</p>
            <h1>{service.title}<br /><em>built around your business.</em></h1>
            <p>{service.description}</p>
            <div className="hero-actions">
              <ConsultationLink>{service.cta}</ConsultationLink>
              <Link className="button button-text" href="/pricing"><span>View Starting Prices</span><b>→</b></Link>
            </div>
          </div>
          <div className="outcome-panel"><span>THE BUSINESS OUTCOME</span><h3>{service.outcome}</h3></div>
        </Container>
      </section>

      <section className="content-section">
        <Container className="content-grid">
          <div>
            <h2>What this service can include.</h2>
            <p>Scope is agreed around the requirements, priorities and budget we establish together.</p>
            {service.examples && <><h3>Useful examples</h3><p>{service.examples.join(" · ")}</p></>}
          </div>
          <ul className="feature-list">{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </Container>
      </section>

      {service.faqs && (
        <section className="section faq-section">
          <Container className="faq-grid">
            <div>
              <SectionHeading eyebrow="USEFUL ANSWERS" title={<>Questions about <em>{service.title.toLowerCase()}.</em></>} description="Straightforward guidance to help you decide whether this service fits your business." />
              <ConsultationLink className="button button-primary">Discuss Your Requirements</ConsultationLink>
            </div>
            <FAQAccordion items={service.faqs} />
          </Container>
        </section>
      )}

      <section className="section section-alt">
        <Container>
          <div className="section-heading"><p className="eyebrow"><span />RELATED SERVICES</p><h2>A connected solution may need <em>more than one part.</em></h2></div>
          <div className="related-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div>
        </Container>
      </section>
      <ConsultationCTA compact />
    </main>
  );
}
