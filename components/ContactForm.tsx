"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackAnalyticsEvent } from "@/lib/analytics";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm({ consultation = false }: { consultation?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const startedAt = useRef(0);
  const [minDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, kind: consultation ? "consultation" : "enquiry", startedAt: startedAt.current }) });
      if (!response.ok) throw new Error("Unable to send");
      trackAnalyticsEvent("generate_lead", { lead_type: consultation ? "consultation" : "project_enquiry" });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h3>Thanks for getting in touch.</h3><p>We&apos;ve received your {consultation ? "consultation request" : "enquiry"} and will get back to you soon.</p><button type="button" onClick={() => setStatus("idle")}>Send another message</button></div>;
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate={false}>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-row"><label>Full Name *<input name="fullName" required autoComplete="name" /></label><label>Business Name<input name="businessName" autoComplete="organization" /></label></div>
      <div className="form-row"><label>Email *<input type="email" name="email" required autoComplete="email" /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label></div>
      <label>Service Required *<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Website Development</option><option>Website Redesign</option><option>AI Automation</option><option>Custom Web Application</option><option>Business Automation</option><option>E-Commerce</option><option>Website Maintenance</option><option>IT Consultation</option><option>Other</option></select></label>
      {consultation ? <div className="form-row"><label>Preferred Date *<input type="date" name="preferredDate" min={minDate} required /></label><label>Preferred Time (UK) *<select name="preferredTime" required defaultValue=""><option value="" disabled>Choose a time</option><option>09:00</option><option>10:00</option><option>11:00</option><option>12:00</option><option>14:00</option><option>15:00</option><option>16:00</option><option>17:00</option></select></label></div> : <label>Budget<select name="budget" defaultValue="Not Sure Yet"><option>Under £500</option><option>£500–£1,000</option><option>£1,000–£2,500</option><option>£2,500–£5,000</option><option>£5,000+</option><option>Not Sure Yet</option></select></label>}
      <label>{consultation ? "Tell us what you would like to discuss" : "Project Description *"}<textarea name="description" rows={5} required={!consultation} placeholder="Tell us about your business, idea or challenge…" /></label>
      {!consultation && <label className="checkbox-label"><input type="checkbox" name="privacy" value="agreed" required /><span>I agree to the <Link href="/privacy-policy">privacy policy</Link>.</span></label>}
      {status === "error" && <p className="form-error" role="alert">We couldn&apos;t send your message. Please try again or email <a href="mailto:chandibloom@gmail.com">chandibloom@gmail.com</a>.</p>}
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}><span>{status === "sending" ? "Sending…" : consultation ? "Request My Free Consultation" : "Send My Enquiry"}</span><b aria-hidden="true">↗</b></button>
    </form>
  );
}
