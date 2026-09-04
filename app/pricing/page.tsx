/* eslint-disable @next/next/no-html-link-for-pages */
import { PricingCard } from "@/components/cards/PricingCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addOns, pricingDisclaimer, pricingPackages } from "@/data/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Website & AI Automation Starting Prices | NeuraX", "Clear starting prices for professional websites, redesigns, e-commerce, custom web applications, AI automation and website care.", "/pricing");

const groups = [{ id: "websites", title: "Websites & Redesign", category: "website" as const }, { id: "automation", title: "Automation & Applications", category: "automation" as const }, { id: "support", title: "Website Care", category: "support" as const }];

export default function PricingPage() {
  return <main><section className="page-hero"><Container className="page-hero-grid"><div><p className="breadcrumb"><a href="/">Home</a><span>/</span><span>Pricing</span></p><p className="eyebrow eyebrow-light"><span />CLEAR STARTING PRICES. NO SURPRISES.</p><h1>Understand the likely investment <em>before you start.</em></h1><p>These starting prices provide a useful guide. After your free consultation, we provide a clear quotation based on your actual requirements.</p></div><div className="page-hero-aside"><strong>Every project is different.</strong><p>Functionality, content, integrations and technical condition all affect scope. Starting prices are not fixed-price promises.</p></div></Container></section><section className="section"><Container><nav className="pricing-tabs" aria-label="Pricing categories">{groups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}<a href="#extras">Optional Extras</a></nav>{groups.map((group) => <section key={group.id} id={group.id} className="pricing-group"><SectionHeading eyebrow="PRICING GUIDE" title={<>{group.title} <em>starting prices.</em></>} /><div className="pricing-grid">{pricingPackages.filter((plan) => plan.category === group.category).map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div></section>)}<section id="extras" className="pricing-group"><SectionHeading eyebrow="OPTIONAL EXTRAS" title={<>Add the functionality your <em>project needs.</em></>} description="Prices depend on the requirements and technical feasibility of each project." /><div className="add-ons-grid">{addOns.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}</div></section><p className="pricing-note pricing-note-large">{pricingDisclaimer}</p></Container></section><ConsultationCTA /></main>;
}
