import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://www.neuraxai.co.uk/", {
      headers: { accept: "text/html", host: "www.neuraxai.co.uk" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the NeuraXAI marketing site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>NeuraXAI \| Websites &amp; AI Solutions<\/title>/i);
  assert.match(html, /Websites that/);
  assert.match(html, /AI that saves time/);
  assert.match(html, /Free consultation/);
  assert.match(html, /chandibloom@gmail\.com/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("booking flow is configured for the requested inbox", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(page, /formsubmit\.co\/ajax\/chandibloom@gmail\.com/);
  assert.match(page, /Preferred date/);
  assert.match(page, /Preferred time \(UK\)/);
  assert.match(page, /Request my free consultation/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /x-forwarded-host/);
});
