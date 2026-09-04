import { ConsultationLink } from "@/components/ConsultationLink";
import { Container } from "@/components/ui/Container";

export function ConsultationCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`consultation-cta${compact ? " consultation-cta-compact" : ""}`}>
      <Container>
        <div className="consultation-copy"><p className="eyebrow"><span />NO OBLIGATION</p><h2>Let&apos;s talk about your idea.</h2><p>Book a completely free 30-minute consultation. Whether you are considering a new website, custom software or AI automation, we will help you understand the options and recommend a sensible next step.</p><ConsultationLink className="button button-light">Book My Free Consultation</ConsultationLink><div className="reassurance"><span>✓ No obligation</span><span>✓ No sales pressure</span><span>✓ Practical advice</span><span>✓ 30 minutes</span></div></div>
        {!compact && <ol className="consultation-steps"><li><span>01</span><div><h3>Book</h3><p>Choose a convenient 30-minute time.</p></div></li><li><span>02</span><div><h3>Tell us about your business</h3><p>Explain your challenge, idea or existing process.</p></div></li><li><span>03</span><div><h3>Explore your options</h3><p>Discuss suitable technology, likely scope and next steps.</p></div></li></ol>}
      </Container>
    </section>
  );
}
