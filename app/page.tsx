import Link from "next/link";
import { ConsultationLink } from "@/components/ConsultationLink";
import { ContactForm } from "@/components/ContactForm";
import { PricingCard } from "@/components/cards/PricingCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TrustBar } from "@/components/sections/TrustBar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPackages, pricingDisclaimer } from "@/data/pricing";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "NeuraX | Web Development, Web Apps & AI Automation UK",
  "NeuraX provides professional website development, custom web applications and AI automation solutions for UK businesses. Book a free 30-minute consultation.",
  "/",
);

const painPoints = [
  ["01", "Your website looks outdated", "It no longer reflects the quality of your business and may be costing you potential enquiries."],
  ["02", "Too much manual work", "Your team spends valuable time on repetitive emails, copying information and avoidable administration."],
  ["03", "Your systems do not talk", "Customer information, bookings, websites and internal tools are disconnected."],
  ["04", "You have an idea — but need it built", "You know what the business needs but do not have the technical resources to turn it into reality."],
];

const reasons = [
  ["Business first", "We understand the problem before recommending technology."],
  ["Clear communication", "No unnecessary technical jargon or hidden complexity."],
  ["Custom solutions", "Built around your requirements rather than a generic template."],
  ["Modern technology", "Designed with maintainability and future growth in mind."],
  ["Transparent pricing", "Understand the likely investment before starting."],
  ["Ongoing support", "Practical assistance remains available after launch."],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-section">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span />YOUR PARTNER IN A SMARTER DIGITAL FUTURE</p>
            <h1>Websites, web apps &amp; AI automation <em>built for growth.</em></h1>
            <p>NeuraX builds modern websites, custom applications and intelligent automations designed to save time, improve customer experience and help businesses grow digitally.</p>
            <div className="hero-actions"><ConsultationLink /><Button href="#work" variant="secondary">View Our Work</Button></div>
            <div className="hero-reassurance"><span>✓ Websites from £249</span><span>✓ No obligation</span><span>✓ 30-minute consultation</span><span>✓ Clear next steps</span></div>
          </div>
          <div className="hero-visual" aria-label="NeuraX digital solutions dashboard illustration">
            <div className="hero-glow" />
            <div className="hero-device">
              <div className="device-bar"><span /><span /><span /><b>NeuraX workspace</b></div>
              <div className="device-body"><aside><i /><i /><i /><i /></aside><div className="dashboard"><p>BUSINESS OVERVIEW</p><h2>Work smarter.</h2><div className="dash-chart"><span /><span /><span /><span /><span /><span /></div><div className="dash-tiles"><i /><i /><i /></div></div></div>
            </div>
            <div className="floating-solution floating-web"><b>W</b><div><strong>Web Development</strong><span>Modern. Responsive. Professional.</span></div></div>
            <div className="floating-solution floating-ai"><b>AI</b><div><strong>AI Automation</strong><span>Save time. Work smarter.</span></div></div>
            <div className="floating-solution floating-app"><b>↗</b><div><strong>Custom Web Apps</strong><span>Built around your business.</span></div></div>
            <div className="node-line node-one" /><div className="node-line node-two" />
          </div>
        </Container>
      </section>

      <TrustBar />

      <section className="section pain-section">
        <Container>
          <SectionHeading eyebrow="SOUND FAMILIAR?" title={<>Is technology holding your <em>business back?</em></>} description="The right digital solution starts with a clear understanding of the problem." />
          <div className="pain-grid">{painPoints.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <div className="pain-conclusion"><div><strong>That&apos;s where NeuraX comes in.</strong><p>We identify the problem first, then build the right technology around it.</p></div><ConsultationLink className="button button-primary">Talk to Us for Free</ConsultationLink></div>
        </Container>
      </section>

      <section className="section services-section" id="services">
        <Container>
          <SectionHeading eyebrow="PRACTICAL DIGITAL SOLUTIONS" title={<>Everything you need to build, improve &amp; <em>automate your business.</em></>} description="From your first business website to custom AI-powered systems, NeuraX can help you build the technology your business needs." />
          <div className="services-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} featured={service.slug === "ai-automation"} />)}</div>
          <div className="section-centre-cta"><ConsultationLink /><Link href="/services">Explore every service <span aria-hidden="true">→</span></Link></div>
        </Container>
      </section>

      <section className="ai-feature" id="ai-automation">
        <Container className="ai-feature-grid">
          <div>
            <p className="eyebrow eyebrow-light"><span />AI AUTOMATION</p>
            <h2>Stop doing repetitive work <em>manually.</em></h2>
            <p>NeuraX identifies sensible opportunities to reduce administration, organise information and keep customer or internal workflows moving.</p>
            <div className="ai-actions"><ConsultationLink className="button button-light">Free 30-Minute Automation Consultation</ConsultationLink><Link href="/services/ai-automation">Explore AI Automation <span aria-hidden="true">→</span></Link></div>
          </div>
          <div className="automation-map" aria-label="Example automation workflow">
            <div className="automation-node node-input"><span>01</span><div><strong>Enquiry arrives</strong><small>Website form or email</small></div></div>
            <i /><div className="automation-node node-process"><span>02</span><div><strong>Information organised</strong><small>Categorise and route</small></div></div>
            <i /><div className="automation-node node-output"><span>03</span><div><strong>Next step triggered</strong><small>Notify, update or report</small></div></div>
            <p>Every workflow is checked for suitability and technical feasibility before it is confirmed.</p>
          </div>
        </Container>
      </section>

      <section className="section work-section" id="work">
        <Container>
          <SectionHeading eyebrow="SELECTED WORK" title={<>Real projects. <em>Practical solutions.</em></>} description="Genuine work presented without invented statistics, reviews or outcomes." />
          <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}<article className="next-project-card"><span>NX</span><p>YOUR BUSINESS COULD BE NEXT</p><h3>Have a project in mind?</h3><p>Let&apos;s create something that works for your business.</p><ConsultationLink className="button button-light">Start Your Project</ConsultationLink></article></div>
        </Container>
      </section>

      <section className="section why-section">
        <Container>
          <div className="why-intro"><SectionHeading eyebrow="WHY NEURAX" title={<>Technology should make business easier — <em>not more complicated.</em></>} description="NeuraX is a UK digital solutions business. We start by understanding the problem, then recommend and build a solution around your goals, requirements and budget." /><ConsultationLink className="button button-primary">Let&apos;s Discuss Your Idea</ConsultationLink></div>
          <div className="reasons-grid">{reasons.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <p className="industries-line"><strong>Built for:</strong> Startups · Small businesses · Construction · Manufacturing · Health &amp; wellness · Professional services · Consultants · Retail · E-commerce · Local services</p>
        </Container>
      </section>

      <section className="section process-section">
        <Container><SectionHeading eyebrow="FROM IDEA TO LAUNCH" title={<>A clear process, from first conversation to <em>ongoing support.</em></>} /><ProcessTimeline /></Container>
      </section>

      <section className="section pricing-section" id="pricing">
        <Container>
          <SectionHeading eyebrow="CLEAR STARTING PRICES. NO SURPRISES." title={<>Understand the likely investment <em>before you start.</em></>} description="Every project is different, but you should not have to contact an agency just to understand whether something may be within budget." />
          <div className="pricing-grid home-pricing">{pricingPackages.slice(0, 4).map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div>
          <p className="pricing-note">{pricingDisclaimer}</p>
          <div className="section-centre-cta"><Button href="/pricing" variant="secondary">View All Pricing</Button><ConsultationLink /></div>
        </Container>
      </section>

      <section className="founding-section">
        <Container>
          <div className="founding-panel"><span className="founding-orbit" /><div><p className="eyebrow eyebrow-light"><span />STARTING SOMETHING NEW?</p><h2>Take advantage of our <em>Founding Client Offer.</em></h2><p>NeuraX is expanding its project portfolio and accepting a limited number of suitable new businesses at introductory rates. You receive the same professional approach while benefiting from launch pricing.</p><ConsultationLink className="button button-light">Claim a Free Consultation</ConsultationLink><small>Limited availability. Project suitability and pricing are confirmed after consultation.</small></div><div className="founding-badge"><span>NEW CLIENT</span><strong>INTRODUCTORY<br />PRICING</strong></div></div>
        </Container>
      </section>

      <ConsultationCTA />

      <section className="section faq-section" id="faq">
        <Container className="faq-grid"><div><SectionHeading eyebrow="QUESTIONS, ANSWERED" title={<>The useful details, <em>up front.</em></>} description="Still unsure? Bring your questions to a free consultation and we will help you find a clear next step." /><ConsultationLink className="button button-primary">Ask Us for Free</ConsultationLink></div><FAQAccordion limit={8} /></Container>
      </section>

      <section className="section contact-section" id="contact">
        <Container className="contact-grid"><div><p className="eyebrow eyebrow-light"><span />TELL US ABOUT YOUR PROJECT</p><h2>Where is your business now — and where do you want it to go?</h2><p>Share the challenge, idea or process you want to improve. We will help you explore the technology that could get you there.</p><div className="prefer-talk"><span>30</span><div><strong>Prefer to talk?</strong><p>Book your free 30-minute consultation directly.</p><ConsultationLink className="text-link">Choose a Time</ConsultationLink></div></div></div><div className="contact-form-panel"><ContactForm /></div></Container>
      </section>

      <section className="closing-cta"><Container><p>YOUR BUSINESS HAS A PROBLEM.</p><h2>We build the digital solution.</h2><div><ConsultationLink className="button button-light">Book Free Consultation</ConsultationLink><Button href="/contact" variant="text">Send an Enquiry</Button></div></Container></section>
    </main>
  );
}
