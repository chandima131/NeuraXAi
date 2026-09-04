"use client";

import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface ConsultationLinkProps {
  children?: ReactNode;
  className?: string;
}

export function ConsultationLink({ children = "Book Your FREE 30-Minute Consultation", className = "button button-primary" }: ConsultationLinkProps) {
  const isExternal = Boolean(siteConfig.calendlyUrl);
  return (
    <a className={className} href={siteConfig.calendlyUrl || "/contact#consultation"} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} onClick={() => trackAnalyticsEvent("consultation_click", { destination: isExternal ? "calendly" : "contact_form" })}>
      <span>{children}</span><b aria-hidden="true">↗</b>
    </a>
  );
}
