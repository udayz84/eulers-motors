/**
 * On-demand revalidation tests.
 *
 * Guards the Strapi→Next instant-refresh contract:
 *   - the endpoint responds and accepts the POST shape the Strapi
 *     lifecycle hooks send ({ model })
 *   - every content model maps to a valid cache tag (catches tag-naming
 *     drift between cms/src/index.ts and lib/strapi/client.ts)
 *
 * Requires Next.js running at NEXT_URL. Skips otherwise.
 */
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { NEXT_URL, isServerUp, fetchJson } from "./helpers.mjs";

let nextUp = false;
before(async () => {
  nextUp = await isServerUp(NEXT_URL);
});

// Must stay in sync with REVALIDATABLE_MODELS in cms/src/index.ts and the
// fetchers in lib/strapi/client.ts (single types → singular, collections → plural).
const MODEL_TAGS = [
  "home-page",
  "about-page",
  "careers-page",
  "career-positions",
  "technology-page",
  "dealer-locator-page",
  "service-centers-page",
  "charging-stations-page",
  "faq-page",
  "in-press-page",
  "insights-page",
  "privacy-policy",
  "refund-policy",
  "terms-conditions",
  "products",
  "reviews",
  "articles",
  "dealers",
  "charging-stations",
  "service-centers",
  "leadership-members",
  "timeline-milestones",
  "awards",
  "esg-reports",
  "navbar",
  "footer",
];

test("revalidate endpoint is alive", async (t) => {
  if (!nextUp) return t.skip("Next.js not running");
  const { status, body } = await fetchJson(`${NEXT_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "home-page" }),
  });
  assert.equal(status, 200);
  assert.equal(body.revalidated, true);
  assert.ok(body.targets?.includes("strapi:home-page"), "tag naming drifted");
});

for (const model of MODEL_TAGS) {
  test(`revalidate accepts model "${model}"`, async (t) => {
    if (!nextUp) return t.skip("Next.js not running");
    const { status, body } = await fetchJson(`${NEXT_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model }),
    });
    assert.equal(status, 200, `model "${model}" rejected — tag naming drift?`);
    assert.equal(body.revalidated, true);
  });
}

test("revalidate rejects unauthorized calls when a secret is configured", async (t) => {
  if (!nextUp) return t.skip("Next.js not running");
  // Without knowing the configured secret we can only assert the endpoint
  // either allows the call (no secret set — dev default) or rejects it with
  // 401. Any other status means the auth path broke.
  const { status } = await fetchJson(`${NEXT_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-strapi-revalidation-token": "wrong" },
    body: JSON.stringify({ model: "home-page" }),
  });
  assert.ok([200, 401].includes(status), `unexpected status ${status} from auth path`);
});
