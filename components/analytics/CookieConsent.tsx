"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

type Consent = "accepted" | "rejected" | null;

function loadAnalytics(id: string) {
  if (!id || document.querySelector(`script[data-ga="${id}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.ga = id;
  document.head.appendChild(script);
  const analyticsWindow = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", id, { anonymize_ip: true, send_page_view: false });
}

export function CookieConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteConfig.gaId) return;
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("neurax-cookie-consent") as Consent;
      setConsent(saved);
      setReady(true);
      if (saved === "accepted") loadAnalytics(siteConfig.gaId);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || !siteConfig.gaId) return;
    const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
    analyticsWindow.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [consent, pathname]);

  if (!siteConfig.gaId || !ready || consent) return null;

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem("neurax-cookie-consent", value);
    setConsent(value);
    if (value === "accepted") loadAnalytics(siteConfig.gaId);
  };

  return (
    <section className="cookie-banner" aria-label="Cookie choices">
      <div><strong>Your privacy choices</strong><p>We only use optional analytics with your permission. Essential site functions do not require marketing cookies.</p><a href="/cookie-policy">Cookie settings</a></div>
      <div className="cookie-actions"><button type="button" onClick={() => choose("rejected")}>Reject Non-Essential</button><button type="button" className="button button-primary" onClick={() => choose("accepted")}>Accept</button></div>
    </section>
  );
}
