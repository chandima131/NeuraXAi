"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { ConsultationLink } from "@/components/ConsultationLink";
import { Logo } from "./Logo";

const navigationBenefits = ["UK-Based", "Free Initial Consultation", "Transparent Starting Prices", "Custom Solutions", "Ongoing Support"];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link href="/" className="logo-link" aria-label="NeuraX home"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <ConsultationLink className="nav-consultation"><span className="calendar-icon" aria-hidden="true">□</span> Free Consultation</ConsultationLink>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
          <span /><span /><span />
        </button>
      </div>
      <div className="benefit-ticker" aria-label="Why choose NeuraX">
        <div className="benefit-ticker-track">
          {[false, true].map((isDuplicate) => (
            <div className="benefit-ticker-items" key={String(isDuplicate)} aria-hidden={isDuplicate || undefined}>
              {navigationBenefits.map((benefit) => <span key={benefit}><b aria-hidden="true">✓</b>{benefit}</span>)}
            </div>
          ))}
        </div>
      </div>
      <nav className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation">
        <div className="container">
          {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span aria-hidden="true">↗</span></Link>)}
          <ConsultationLink className="button button-primary" />
        </div>
      </nav>
    </header>
  );
}
