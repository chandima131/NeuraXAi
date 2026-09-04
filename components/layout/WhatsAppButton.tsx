"use client";

import { siteConfig } from "@/lib/config";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={siteConfig.whatsapp.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackAnalyticsEvent("whatsapp_click", { contact_method: "whatsapp" })}
      aria-label={`Chat with NeuraX on WhatsApp at ${siteConfig.whatsapp.displayNumber}`}
    >
      <span className="whatsapp-icon" aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
