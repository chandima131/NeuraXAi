const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT = process.env.CONTACT_RECIPIENT || "chandibloom@gmail.com";
const RESEND_API_URL = "https://api.resend.com/emails";

function clean(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return Array.from(value.trim().replace(/[<>]/g, "")).filter((character) => {
    const code = character.charCodeAt(0);
    return code === 9 || code === 10 || code === 13 || code >= 32;
  }).join("").slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (clean(body.website)) return Response.json({ ok: true });

    const fullName = clean(body.fullName, 100);
    const email = clean(body.email, 160);
    const service = clean(body.service, 120);
    const kind = clean(body.kind, 30) === "consultation" ? "consultation" : "enquiry";
    const startedAt = Number(body.startedAt);

    if (!fullName || !EMAIL_PATTERN.test(email) || !service) return Response.json({ error: "Please complete the required fields." }, { status: 400 });
    if (Number.isFinite(startedAt) && Date.now() - startedAt < 1500) return Response.json({ error: "Please take a moment to review your details." }, { status: 429 });
    if (kind === "enquiry" && (!clean(body.description) || clean(body.privacy) !== "agreed")) return Response.json({ error: "Please add a project description and accept the privacy policy." }, { status: 400 });
    if (kind === "consultation" && (!clean(body.preferredDate, 20) || !clean(body.preferredTime, 20))) return Response.json({ error: "Please choose a preferred date and time." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim() || "NeuraX Website <onboarding@resend.dev>";
    if (!apiKey) return Response.json({ error: "Email delivery is not configured." }, { status: 503 });

    const fields = [
      ["Enquiry type", kind],
      ["Full name", fullName],
      ["Business name", clean(body.businessName, 120)],
      ["Email", email],
      ["Phone", clean(body.phone, 60)],
      ["Service required", service],
      ["Budget", clean(body.budget, 60)],
      ["Preferred date", clean(body.preferredDate, 20)],
      ["Preferred time (UK)", clean(body.preferredTime, 20)],
      ["Project details", clean(body.description)],
    ].filter(([, value]) => value);

    const subject = kind === "consultation" ? "New Free Consultation Request - NeuraX" : "New Project Enquiry - NeuraX";
    const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
    const delivery = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({ from, to: [RECIPIENT], reply_to: email, subject, text }),
    });
    if (!delivery.ok) {
      let reason = `HTTP ${delivery.status}`;
      try {
        const error = await delivery.json() as { name?: string; message?: string };
        reason = [error.name, error.message].filter(Boolean).join(": ") || reason;
      } catch {
        // Keep the HTTP status when Resend does not return JSON.
      }
      console.error(`Resend delivery failed (${reason}).`);
      return Response.json({ error: "Delivery is temporarily unavailable." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We could not process this request." }, { status: 400 });
  }
}
