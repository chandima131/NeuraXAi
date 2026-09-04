"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Conversion-first websites",
    copy: "Distinctive, mobile-ready websites that make your offer clear and turn attention into enquiries.",
    tags: ["UX/UI design", "React builds", "SEO foundations"],
    tone: "violet",
  },
  {
    number: "02",
    title: "AI assistants & chatbots",
    copy: "Useful AI experiences that answer questions, qualify leads and support your customers around the clock.",
    tags: ["AI chat", "Lead qualification", "Knowledge bases"],
    tone: "mint",
  },
  {
    number: "03",
    title: "Workflow automation",
    copy: "Connect the repetitive parts of your business so information moves faster and your team gets time back.",
    tags: ["Process design", "Integrations", "Smart workflows"],
    tone: "coral",
  },
];

const faqs = [
  {
    q: "What can we cover in the free consultation?",
    a: "Your goals, current website, ideal customers, useful AI opportunities, likely scope and the best next step. There is no obligation to continue.",
  },
  {
    q: "Can you improve an existing website?",
    a: "Yes. We can refresh the design, rebuild slow or outdated areas, sharpen the messaging, or add new functionality without losing what already works.",
  },
  {
    q: "Do I need to understand AI?",
    a: "Not at all. We start with the business problem, explain everything in plain English and only recommend AI where it creates a practical benefit.",
  },
  {
    q: "How quickly can a project start?",
    a: "That depends on the scope and current schedule. Share your ideal timing when you book and we will discuss a realistic plan on the call.",
  },
];

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function Home() {
  const bookingDialog = useRef<HTMLDialogElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const [offerVisible, setOfferVisible] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [minDate] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const hasDismissed = window.sessionStorage.getItem("neurax-consultation-dismissed");
    const timer = window.setTimeout(() => {
      if (!hasDismissed && !bookingDialog.current?.open) setOfferVisible(true);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  function openBooking() {
    setOfferVisible(false);
    setSubmitState("idle");
    bookingDialog.current?.showModal();
    window.setTimeout(() => firstField.current?.focus(), 50);
  }

  function closeBooking() {
    bookingDialog.current?.close();
  }

  function dismissOffer() {
    setOfferVisible(false);
    window.sessionStorage.setItem("neurax-consultation-dismissed", "true");
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (payload._honey) return;

    try {
      const response = await fetch("https://formsubmit.co/ajax/chandibloom@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Booking request failed");
      setSubmitState("sent");
      form.reset();
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <main id="top">
      <div className="announcement">
        <p><span>FREE</span> 30-minute website &amp; AI consultation</p>
        <button type="button" onClick={openBooking}>Choose a time <span aria-hidden="true">↗</span></button>
      </div>

      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="NeuraXAI home">
          <span className="brand-mark">N</span>
          <span>Neura<span className="brand-accent">X</span>AI</span>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#about">Why us</a>
          <button className="nav-cta" type="button" onClick={openBooking}>
            Free consultation <span aria-hidden="true">↗</span>
          </button>
        </div>
      </nav>

      <section className="hero section-shell" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span /> WEB DEVELOPMENT + AI SOLUTIONS</p>
          <h1 id="hero-heading">Websites that<br />win attention.<br /><em>AI that saves time.</em></h1>
          <p className="hero-lede">
            We create high-converting digital experiences and practical AI
            systems that help ambitious businesses grow with less friction.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={openBooking}>
              Book your free 30-min call <span aria-hidden="true">↗</span>
            </button>
            <a className="text-link" href="#services">Explore services <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof">
            <div className="proof-monogram" aria-hidden="true">NX</div>
            <p><strong>One partner, from idea to launch</strong><br />Strategy, design, development &amp; automation</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Web design and AI automation working together">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-glow" />
          <div className="browser-card">
            <div className="browser-top"><span /><span /><span /><b>yourbusiness.co.uk</b></div>
            <div className="mock-content">
              <div className="mock-nav"><span>YOUR BRAND</span><i>Menu</i></div>
              <div className="mock-label">BUILT FOR MOMENTUM</div>
              <div className="mock-title">Your next big move<br /><i>starts here.</i></div>
              <div className="mock-button">Start a project <span>↗</span></div>
            </div>
            <div className="mock-stat"><strong>Clear.</strong><span>Fast. Focused. Ready to convert.</span></div>
          </div>
          <div className="float-chip chip-ai"><span className="pulse" /> AI assistant active</div>
          <div className="float-chip chip-speed"><b>FAST</b><span>Built for performance</span></div>
          <p className="visual-note">DESIGN × TECHNOLOGY × MOMENTUM</p>
        </div>
      </section>

      <section className="marquee" aria-label="Our capabilities">
        <div>WEB DESIGN <span>✦</span> REACT DEVELOPMENT <span>✦</span> AI AUTOMATION <span>✦</span> SMARTER EXPERIENCES <span>✦</span></div>
      </section>

      <section className="services-section section-shell" id="services" aria-labelledby="services-heading">
        <div className="section-intro">
          <p className="section-kicker">WHAT WE DO <span>03</span></p>
          <div>
            <h2 id="services-heading">Digital solutions made to <em>move you forward.</em></h2>
            <p>Thoughtful strategy, sharp creative and reliable technology — shaped around your business rather than a template.</p>
          </div>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className={`service-row ${service.tone}`} key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className="service-title-wrap"><span className="service-glyph" aria-hidden="true">{service.number === "01" ? "↗" : service.number === "02" ? "✦" : "↻"}</span><h3>{service.title}</h3></div>
              <p>{service.copy}</p>
              <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-shell about-grid">
          <div className="about-visual" aria-hidden="true">
            <div className="code-window">
              <div className="code-top"><span /><span /><span /><b>smart-workflow.js</b></div>
              <pre><code><span className="code-purple">const</span> growth = <span className="code-mint">await</span> NeuraXAI.<span className="code-coral">build</span>({`{`}<br />  website: <span className="code-yellow">&quot;remarkable&quot;</span>,<br />  automation: <span className="code-yellow">&quot;useful&quot;</span>,<br />  experience: <span className="code-yellow">&quot;effortless&quot;</span><br />{`}`});</code></pre>
            </div>
            <div className="idea-card"><span>✦</span><p>Less busywork.<br /><strong>More momentum.</strong></p></div>
            <div className="about-sticker">MADE<br />WITH<br />INTENT</div>
          </div>
          <div className="about-copy">
            <p className="section-kicker light">WHY NEURAXAI <span>✓</span></p>
            <h2>Technology should make business feel <em>simpler.</em></h2>
            <p className="about-lede">We blend creative web design with thoughtful AI implementation, giving you one practical partner for the whole digital journey.</p>
            <ul className="check-list">
              <li><span>01</span><div><strong>Clarity before complexity</strong><p>We find the shortest path to a useful result.</p></div></li>
              <li><span>02</span><div><strong>Made around your business</strong><p>Your goals shape the solution — not the other way round.</p></div></li>
              <li><span>03</span><div><strong>Plain-English partnership</strong><p>Clear advice, honest scope and no unnecessary jargon.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="approach-section section-shell" id="approach" aria-labelledby="approach-heading">
        <div className="section-intro compact">
          <p className="section-kicker">HOW IT WORKS <span>→</span></p>
          <div>
            <h2 id="approach-heading">From first conversation to <em>real progress.</em></h2>
          </div>
        </div>
        <div className="steps">
          <article><span className="step-num">01</span><div className="step-line" /><h3>Discover</h3><p>We unpack your goals, audience and the friction holding your business back.</p></article>
          <article><span className="step-num">02</span><div className="step-line" /><h3>Design &amp; build</h3><p>We shape the experience, develop the solution and keep decisions clear.</p></article>
          <article><span className="step-num">03</span><div className="step-line" /><h3>Launch &amp; improve</h3><p>We launch with confidence, learn from real use and help you keep moving.</p></article>
        </div>
      </section>

      <section className="consultation-section section-shell" id="book" aria-labelledby="book-heading">
        <div className="consultation-card">
          <div className="consultation-copy">
            <p className="section-kicker light">YOUR FIRST STEP IS FREE <span>30 MIN</span></p>
            <h2 id="book-heading">Let&apos;s find the smartest next move for your business.</h2>
            <p>Bring your website idea, an inefficient process or simply a business goal. You&apos;ll leave with clearer options and a sensible next step.</p>
            <button className="button button-mint" type="button" onClick={openBooking}>Choose your preferred time <span aria-hidden="true">↗</span></button>
          </div>
          <div className="consultation-details">
            <div><span className="detail-icon">30</span><p><strong>30 focused minutes</strong><br />No sales pressure</p></div>
            <div><span className="detail-icon">UK</span><p><strong>Online consultation</strong><br />Join from anywhere</p></div>
            <div><span className="detail-icon">£0</span><p><strong>Completely free</strong><br />Practical advice included</p></div>
          </div>
        </div>
      </section>

      <section className="faq-section section-shell" aria-labelledby="faq-heading">
        <div className="faq-title">
          <p className="section-kicker">GOOD TO KNOW <span>?</span></p>
          <h2 id="faq-heading">A few questions,<br /><em>answered.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.q} open={index === 0}>
              <summary>{faq.q}<span aria-hidden="true">+</span></summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <div>
            <a className="brand brand-footer" href="#top" aria-label="NeuraXAI home"><span className="brand-mark">N</span><span>Neura<span className="brand-accent">X</span>AI</span></a>
            <p>Remarkable websites.<br />Useful AI. Real momentum.</p>
          </div>
          <div className="footer-links"><strong>Explore</strong><a href="#services">Services</a><a href="#approach">Approach</a><a href="#about">Why us</a></div>
          <div className="footer-contact"><strong>Start a conversation</strong><a href="mailto:chandibloom@gmail.com">chandibloom@gmail.com</a><button type="button" onClick={openBooking}>Book a free consultation ↗</button></div>
        </div>
        <div className="footer-bottom section-shell"><span>© 2026 NeuraXAI. All rights reserved.</span><span>Web development &amp; AI solutions · United Kingdom</span></div>
      </footer>

      <aside className={`offer-popup ${offerVisible ? "is-visible" : ""}`} aria-label="Free consultation offer" aria-hidden={!offerVisible}>
        <button className="offer-close" type="button" onClick={dismissOffer} aria-label="Dismiss consultation offer">×</button>
        <span className="offer-badge">30 MIN</span>
        <div><p>YOUR FIRST SMART MOVE IS FREE</p><h2>Got a website idea?</h2><span>Let&apos;s turn it into a clear plan.</span></div>
        <button className="offer-button" type="button" onClick={openBooking}>Reserve my free call <span aria-hidden="true">↗</span></button>
      </aside>

      <dialog className="booking-dialog" ref={bookingDialog} onCancel={closeBooking}>
        <button className="dialog-close" type="button" onClick={closeBooking} aria-label="Close booking form">×</button>
        {submitState === "sent" ? (
          <div className="booking-success">
            <span className="success-mark">✓</span>
            <p className="section-kicker">REQUEST RECEIVED</p>
            <h2>You&apos;re one step closer.</h2>
            <p>Your consultation request is on its way. We&apos;ll reply to your email to confirm the time and send the meeting details.</p>
            <button className="button button-primary" type="button" onClick={closeBooking}>Back to the website</button>
          </div>
        ) : (
          <div className="booking-grid">
            <div className="booking-aside">
              <p className="section-kicker light">FREE CONSULTATION <span>30 MIN</span></p>
              <h2>Tell us what you&apos;re working on.</h2>
              <p>Choose a preferred time and share a few details. We&apos;ll confirm by email with your meeting link.</p>
              <ul><li><span>✓</span> Website &amp; AI opportunity review</li><li><span>✓</span> Clear, practical recommendations</li><li><span>✓</span> No obligation or sales pressure</li></ul>
              <a href="mailto:chandibloom@gmail.com">Prefer email? chandibloom@gmail.com</a>
            </div>
            <form className="booking-form" onSubmit={submitBooking} action="https://formsubmit.co/chandibloom@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="New free consultation request — NeuraXAI" />
              <input className="honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="field-row">
                <label>Your name<input ref={firstField} type="text" name="Name" placeholder="Alex Morgan" required autoComplete="name" /></label>
                <label>Work email<input type="email" name="Email" placeholder="alex@company.co.uk" required autoComplete="email" /></label>
              </div>
              <div className="field-row">
                <label>Phone <span>(optional)</span><input type="tel" name="Phone" placeholder="+44 7700 900000" autoComplete="tel" /></label>
                <label>Business name <span>(optional)</span><input type="text" name="Business" placeholder="Your company" autoComplete="organization" /></label>
              </div>
              <label>What would you like to discuss?
                <select name="Service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>New website</option><option>Website redesign</option><option>AI assistant or chatbot</option><option>Workflow automation</option><option>Not sure yet</option>
                </select>
              </label>
              <div className="field-row">
                <label>Preferred date<input type="date" name="Preferred date" min={minDate} required /></label>
                <label>Preferred time <span>(UK)</span>
                  <select name="Preferred time (UK)" required defaultValue=""><option value="" disabled>Choose a time</option><option>09:00</option><option>10:00</option><option>11:00</option><option>12:00</option><option>14:00</option><option>15:00</option><option>16:00</option><option>17:00</option></select>
                </label>
              </div>
              <label>What&apos;s on your mind? <span>(optional)</span><textarea name="Project details" rows={3} placeholder="A short note about your idea, challenge or goal..." /></label>
              {submitState === "error" && <p className="form-error">We couldn&apos;t send that just now. Please email <a href="mailto:chandibloom@gmail.com">chandibloom@gmail.com</a>.</p>}
              <button className="button button-primary form-submit" type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? "Sending your request…" : "Request my free consultation"}<span aria-hidden="true">↗</span></button>
              <p className="privacy-note">By submitting, you agree that NeuraXAI may contact you about this consultation.</p>
            </form>
          </div>
        )}
      </dialog>
    </main>
  );
}
