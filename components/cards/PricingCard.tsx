import type { PricingPackage } from "@/data/types";
import { ConsultationLink } from "@/components/ConsultationLink";

export function PricingCard({ plan }: { plan: PricingPackage }) {
  return (
    <article className={`pricing-card${plan.popular ? " pricing-card-popular" : ""}`}>
      {plan.popular && <span className="popular-label">MOST POPULAR</span>}
      <h3>{plan.name}</h3>
      <p className="price">{plan.price}</p>
      <p className="pricing-description">{plan.description}</p>
      <ul>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
      <ConsultationLink className={`button ${plan.popular ? "button-primary" : "button-secondary"}`}>{plan.cta}</ConsultationLink>
    </article>
  );
}
