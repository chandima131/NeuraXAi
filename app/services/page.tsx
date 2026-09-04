/* eslint-disable @next/next/no-html-link-for-pages */
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Digital Services for UK Businesses | NeuraX", "Explore professional websites, redesigns, custom web applications, AI automation, integrations, e-commerce and ongoing digital support from NeuraX.", "/services");

export default function ServicesPage() {
  return <main><section className="page-hero"><Container className="page-hero-grid"><div><p className="breadcrumb"><a href="/">Home</a><span>/</span><span>Services</span></p><p className="eyebrow eyebrow-light"><span />OUR SERVICES</p><h1>Your business has a problem. <em>We build the digital solution.</em></h1><p>Professional websites, useful custom software and practical automation — designed around the outcome your business needs.</p></div><div className="page-hero-aside"><strong>Not sure where to start?</strong><p>A free 30-minute consultation helps us understand the challenge and point you towards a sensible next step.</p></div></Container></section><section className="section"><Container><SectionHeading eyebrow="BUILD. IMPROVE. AUTOMATE." title={<>Practical technology for the way your <em>business really works.</em></>} description="Every engagement starts with your goal rather than a preferred tool or platform." /><div className="all-services-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} featured={service.slug === "ai-automation"} />)}</div></Container></section><ConsultationCTA /></main>;
}
