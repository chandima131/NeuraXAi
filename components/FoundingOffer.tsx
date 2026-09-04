"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { ConsultationLink } from "./ConsultationLink";

export function FoundingOffer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!siteConfig.showFoundingOffer || window.sessionStorage.getItem("neurax-founding-offer-dismissed")) return;
    const timer = window.setTimeout(() => setVisible(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!siteConfig.showFoundingOffer) return null;

  const dismiss = () => {
    window.sessionStorage.setItem("neurax-founding-offer-dismissed", "true");
    setVisible(false);
  };

  return (
    <aside className={`offer-popup${visible ? " is-visible" : ""}`} aria-hidden={!visible} aria-label="Founding client offer">
      <button type="button" className="offer-close" onClick={dismiss} aria-label="Dismiss offer">×</button>
      <span className="offer-tag">NEW CLIENT OFFER</span>
      <div><strong>Founding Client Pricing</strong><p>Limited introductory rates for suitable new projects.</p></div>
      <ConsultationLink className="offer-link">Discuss Your Project</ConsultationLink>
    </aside>
  );
}
