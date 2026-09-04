import Link from "next/link";

export function LegalNav() {
  return <nav className="legal-nav" aria-label="Legal pages"><strong>Legal information</strong><Link href="/privacy-policy">Privacy Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></nav>;
}
