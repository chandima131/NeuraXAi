import Link from "next/link";
import type { Service } from "@/data/types";

const serviceMarks: Record<string, string> = {
  "web-development": "W",
  "website-redesign": "R",
  "web-applications": "A",
  "ai-automation": "AI",
  "business-automation": "↔",
  ecommerce: "£",
  maintenance: "M",
  "digital-consultation": "?",
};

export function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  return (
    <article className={`service-card${featured ? " service-card-featured" : ""}`}>
      <span className="service-mark" aria-hidden="true">{serviceMarks[service.slug]}</span>
      <p className="card-eyebrow">{service.eyebrow}</p>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}>{service.cta}<span aria-hidden="true">↗</span></Link>
    </article>
  );
}
