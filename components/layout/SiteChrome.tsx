import type { ReactNode } from "react";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { FoundingOffer } from "@/components/FoundingOffer";
import { Footer } from "./Footer";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { Navbar } from "./Navbar";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteChrome({ children }: { children: ReactNode }) {
  return <><Navbar />{children}<Footer /><FoundingOffer /><WhatsAppButton /><MobileStickyCTA /><CookieConsent /></>;
}
