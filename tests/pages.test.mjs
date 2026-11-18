/**
 * Frontend page smoke tests.
 *
 * Guards against the classic frontend/CMS-merge accidents:
 *   - a route crashing (500) or 404ing after a refactor
 *   - a page rendering EMPTY because a CMS field or fallback broke
 *   - the double-path image regression ("/assets/products//uploads/...")
 *     caused by prefixing absolute CMS image URLs
 *   - Next.js error overlay leaking into production HTML
 *
 * Requires Next.js running at NEXT_URL. Skips otherwise.
 */
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { NEXT_URL, isServerUp, fetchText } from "./helpers.mjs";

let nextUp = false;
before(async () => {
  nextUp = await isServerUp(NEXT_URL);
});

/** [path, markers that MUST appear in the rendered HTML] */
const PAGES = [
  ["/", ["Euler Motors", "vehicle"]],
  ["/products", ["Turbo EV 1000", "Know Your Vehicle Better", "Key Use Cases"]],
  ["/products/storm-ev-lr200", ["RealRange"]],
  ["/products/hiload-ev", ["HiLoad"]],
  ["/products/turbo-ev-1000", ["Turbo EV 1000"]],
  ["/products/storm-ev-t1500", ["T1500"]],
  ["/products/lr200", ["RealRange"]],
  ["/products/turbo", ["Turbo EV 1000"]],
  ["/hiload", ["HiLoad"]],
  ["/turbo", ["Turbo EV 1000"]],
  ["/storm-ev-t1500", ["T1500"]],
  ["/careers", ["Shape the Future", "Support That Matters"]],
  ["/faq", ["Frequently asked questions", "Quick help"]],
  ["/in-press", ["In the News", "Featured story"]],
  ["/insights", ["Stories", "Editor"]],
  ["/insights/charging-network", ["Charging"]],
  ["/about", ["Euler"]],
  ["/technology", ["Euler"]],
  ["/dealer-locator", ["Euler"]],
  ["/charging-stations", ["Euler"]],
  ["/service-centers", ["Euler"]],
  ["/privacy-policy", ["Privacy Policy", "Cookies"]],
  ["/refund-policy", ["Refund Policy", "Cancellation"]],
  ["/terms-conditions", ["Terms of Use", "Overview"]],
];

for (const [path, markers] of PAGES) {
  test(`page "${path}" renders with content`, async (t) => {
    if (!nextUp) return t.skip("Next.js not running");
    const { status, body } = await fetchText(`${NEXT_URL}${path}`);

    assert.equal(status, 200, `${path} returned ${status}`);
    for (const marker of markers) {
      assert.ok(
        body.includes(marker),
        `${path}: expected marker "${marker}" not found — page may be rendering empty`
      );
    }

    // Regression: double-prefixed image URLs (/assets/products/ + /uploads/...)
    assert.ok(
      !body.includes("/assets/products//uploads/") &&
        !body.includes("%2Fassets%2Fproducts%2F%2Fuploads"),
      `${path}: double-path image regression detected`
    );

    // Regression: Next.js dev error overlay must never leak
    assert.ok(!body.includes("nextjs-portal"), `${path}: error overlay present`);
    assert.ok(
      !body.includes("Application error") && !body.includes("Internal Server Error"),
      `${path}: server error text in HTML`
    );

    // Every page must have a heading (never a fully blank render)
    assert.ok(/<h1[^>]*>/.test(body), `${path}: no <h1> rendered`);
  });
}

test("unknown product slug 404s cleanly", async (t) => {
  if (!nextUp) return t.skip("Next.js not running");
  const { status } = await fetchText(`${NEXT_URL}/products/not-a-real-vehicle`);
  assert.equal(status, 404);
});

test("product pages render CMS variant data end-to-end", async (t) => {
  if (!nextUp) return t.skip("Next.js not running");
  const { body } = await fetchText(`${NEXT_URL}/products/turbo-ev-1000`);
  // Hero variant names (CMS hero.variants or fallback) + compare table (CMS or fallback)
  assert.ok(body.includes("Turbo EV 1000 City"), "hero variant names missing");
  assert.ok(body.includes("Turbo EV 1000 Maxx"), "hero variant names missing");
  assert.ok(/₹[\d,.]+\s*L/.test(body), "variant pricing missing");
});
