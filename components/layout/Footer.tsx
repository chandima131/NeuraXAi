import Link from "next/link";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/config";
import { ConsultationLink } from "@/components/ConsultationLink";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  const footerServices = services.slice(0, 7);
  const socialLinks = [
    ["LinkedIn", siteConfig.social.linkedin],
    ["Facebook", siteConfig.social.facebook],
    ["Instagram", siteConfig.social.instagram],
  ].filter((item) => item[1]);
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="NeuraX home"><Logo light /></Link>
          <p>Web development, custom software and intelligent automation designed to help businesses work smarter.</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          {socialLinks.length > 0 && <div className="footer-socials">{socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div>}
        </div>
        <div className="footer-column"><h2>Services</h2>{footerServices.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}</div>
        <div className="footer-column"><h2>Company</h2><Link href="/about">About</Link><Link href="/work">Our Work</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-column"><h2>Resources</h2><Link href="/#faq">FAQ</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></div>
      </Container>
      <Container className="footer-cta"><div><p>HAVE A PROJECT IN MIND?</p><h2>Let&apos;s build something useful.</h2></div><ConsultationLink className="button button-light">Book Free Consultation</ConsultationLink></Container>
      <Container className="footer-bottom"><span>© {new Date().getFullYear()} NeuraX. All rights reserved.</span><span>Practical digital solutions for UK businesses.</span></Container>
    </footer>
  );
}
