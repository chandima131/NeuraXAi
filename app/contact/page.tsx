/* eslint-disable @next/next/no-html-link-for-pages */
import { ContactForm } from "@/components/ContactForm";
import { ConsultationLink } from "@/components/ConsultationLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact NeuraX | Tell Us About Your Project", "Tell NeuraX about your website, custom application, e-commerce or automation project, or request a free 30-minute consultation.", "/contact");

export default function ContactPage() {
  const hasCalendly = Boolean(siteConfig.calendlyUrl);
  return <main><section className="page-hero"><Container className="page-hero-grid"><div><p className="breadcrumb"><a href="/">Home</a><span>/</span><span>Contact</span></p><p className="eyebrow eyebrow-light"><span />START A CONVERSATION</p><h1>Tell us about <em>your project.</em></h1><p>Share where your business is now, what you want to improve and what a useful result would look like.</p></div><div className="page-hero-aside"><strong>Prefer email?</strong><p><a className="text-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></div></Container></section><section className="section"><Container className="contact-page-grid"><div><h2>Send an enquiry.</h2><p>Use the form for websites, redesigns, software, integrations, e-commerce, maintenance or general digital consultation.</p><ContactForm /></div><aside id="consultation"><p className="eyebrow"><span />FREE 30-MINUTE CONSULTATION</p><h2>Prefer to talk?</h2><p>Book a no-obligation conversation and explain your idea, challenge or repetitive process.</p>{hasCalendly ? <ConsultationLink className="button button-primary">Choose a Time</ConsultationLink> : <><div className="calendar-setup-note"><strong>Online booking request</strong><p>Select a preferred UK date and time below. We will confirm availability and send meeting details by email.</p></div><ContactForm consultation /></>}</aside></Container></section></main>;
}
