import { faqs } from "@/data/faq";
import type { FAQItem } from "@/data/types";

export function FAQAccordion({ limit, items = faqs }: { limit?: number; items?: FAQItem[] }) {
  const shown = limit ? items.slice(0, limit) : items;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: shown.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="faq-accordion">{shown.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></>;
}
