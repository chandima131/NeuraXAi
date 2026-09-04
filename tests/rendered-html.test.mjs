import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function request(path = "/", init = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`https://www.neuraxai.co.uk${path}`, { headers: { accept: "text/html", host: "www.neuraxai.co.uk", ...(init.headers || {}) }, ...init }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("homepage communicates the offer without fake proof", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Websites, web apps &amp; AI automation/);
  assert.match(html, /Websites from £249/);
  assert.match(html, /Book Your FREE 30-Minute Consultation/i);
  assert.match(html, /Shanti Haven/);
  assert.match(html, /Chandima Industries/);
  assert.match(html, /projects\/shanti-haven-homepage\.jpg/);
  assert.match(html, /projects\/chandima-industries-homepage\.jpg/);
  assert.match(html, /icon\.svg\?/);
  assert.match(html, /favicon\.ico\?/);
  assert.match(html, /wa\.me\/447443797893/);
  assert.match(html, /Chat with NeuraX on WhatsApp/);
  assert.match(html, /og-neurax\.png/);
  assert.doesNotMatch(html, /award-winning|thousands of happy clients|guaranteed results/i);
});

test("all requested pages render", async () => {
  const routes = ["/about", "/services", "/services/web-development", "/services/website-redesign", "/services/web-applications", "/services/ai-automation", "/services/business-automation", "/services/ecommerce", "/services/maintenance", "/pricing", "/work", "/work/shanti-haven", "/work/chandima-industries", "/contact", "/privacy-policy", "/cookie-policy", "/terms", "/sitemap.xml", "/robots.txt"];
  for (const route of routes) {
    const response = await request(route);
    assert.equal(response.status, 200, `${route} should render`);
  }
});

test("detail pages use record-specific metadata and clear the site-wide image", async () => {
  const service = await request("/services/ai-automation");
  const serviceHtml = await service.text();
  assert.match(serviceHtml, /<title>AI Automation Services UK \| NeuraX<\/title>/i);
  assert.match(serviceHtml, /Stop doing repetitive work/i);
  assert.doesNotMatch(serviceHtml, /og-neurax\.png/);

  const project = await request("/work/shanti-haven");
  const projectHtml = await project.text();
  assert.match(projectHtml, /<title>Shanti Haven Case Study \| NeuraX<\/title>/i);
  assert.match(projectHtml, /Wellness Website/);
  assert.match(projectHtml, /projects\/shanti-haven-homepage\.jpg/);
  assert.doesNotMatch(projectHtml, /og-neurax\.png/);
});

test("contact endpoint rejects incomplete submissions on the server", async () => {
  const response = await request("/api/contact", { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ fullName: "", email: "invalid", service: "" }) });
  assert.equal(response.status, 400);
});

test("configuration keeps booking and analytics values outside repeated components", async () => {
  const config = await readFile(new URL("../lib/config.ts", import.meta.url), "utf8");
  const form = await readFile(new URL("../app/api/contact/route.ts", import.meta.url), "utf8");
  const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");
  assert.match(config, /NEXT_PUBLIC_CALENDLY_URL/);
  assert.match(config, /NEXT_PUBLIC_SHOW_FOUNDING_OFFER/);
  assert.match(envExample, /CONTACT_RECIPIENT=chandibloom@gmail\.com/);
  assert.match(envExample, /RESEND_API_KEY=/);
  assert.match(form, /CONTACT_RECIPIENT/);
  assert.match(form, /api\.resend\.com\/emails/);
  assert.doesNotMatch(form, /formsubmit\.co/);
});
