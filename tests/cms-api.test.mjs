/**
 * CMS API contract tests.
 *
 * Guards against the classic Strapi accidents:
 *   - schema/permission changes that break public reads (403/404)
 *   - content wipe-outs (empty components where seeded content must exist)
 *   - relation breakage (products ↔ reviews / other-vehicles, showcase entries)
 *
 * Requires Strapi running at STRAPI_URL. Skips otherwise.
 */
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { STRAPI_URL, isServerUp, fetchJson, qs } from "./helpers.mjs";

let strapiUp = false;
before(async () => {
  strapiUp = await isServerUp(`${STRAPI_URL}/_health`);
});

const SINGLE_TYPES = [
  "home-page",
  "about-page",
  "careers-page",
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
];

const COLLECTIONS = [
  "products",
  "career-positions",
  "reviews",
  "articles",
  "charging-stations",
  "service-centers",
];

test("Strapi is reachable", (t) => {
  if (!strapiUp) return t.skip(`Strapi not running at ${STRAPI_URL}`);
  assert.ok(strapiUp, `Cannot reach Strapi at ${STRAPI_URL}`);
});

for (const endpoint of SINGLE_TYPES) {
  test(`single type "${endpoint}" is publicly readable and published`, async (t) => {
    if (!strapiUp) return t.skip("Strapi not running");
    const { status, body } = await fetchJson(`${STRAPI_URL}/api/${endpoint}?populate=*`);
    assert.equal(status, 200, `expected 200 for /api/${endpoint}`);
    assert.ok(body?.data, `"${endpoint}" returned no data (deleted or unpublished?)`);

    // Guard against accidentally publishing an EMPTY page
    const data = body.data.attributes ?? body.data;
    const serialized = JSON.stringify(data);
    assert.notEqual(serialized, "{}", `"${endpoint}" has no components at all`);
  });
}

for (const endpoint of COLLECTIONS) {
  test(`collection "${endpoint}" is publicly readable`, async (t) => {
    if (!strapiUp) return t.skip("Strapi not running");
    const { status, body } = await fetchJson(`${STRAPI_URL}/api/${endpoint}`);
    assert.equal(status, 200, `expected 200 for /api/${endpoint}`);
    assert.ok(Array.isArray(body?.data), `"${endpoint}" did not return a list`);
  });
}

test("every canonical product has specs, variants, hero and relations (seeded envs)", async (t) => {
  if (!strapiUp) return t.skip("Strapi not running");
  const query = qs({
    populate: {
      specs: { populate: { categories: { populate: { rows: { populate: "*" } } } } },
      variantsCompare: { populate: { variants: { populate: "*" } } },
      hero: { populate: { stats: { populate: "*" }, variants: { populate: "*" } } },
      otherVehicles: { populate: { vehicles: { populate: "*" } } },
      reviews: { populate: "*" },
    },
  });

  const { status, body } = await fetchJson(`${STRAPI_URL}/api/products?${query}`);
  assert.equal(status, 200);
  const products = body.data ?? [];
  assert.ok(products.length >= 4, `expected 4 products, found ${products.length}`);

  for (const entry of products) {
    const p = entry.attributes ?? entry;
    const slug = p.slug;
    const specCategories = p.specs?.categories ?? [];
    assert.ok(specCategories.length >= 5, `${slug}: specs missing categories (content wiped?)`);
    for (const category of specCategories) {
      assert.ok(category.rows?.length >= 3, `${slug}/${category.categoryName}: spec rows missing`);
      for (const row of category.rows ?? []) {
        assert.ok(row.label && row.value, `${slug}/${category.categoryName}: empty spec row`);
      }
    }
    assert.ok(p.variantsCompare?.variants?.length >= 2, `${slug}: compare variants missing`);
    assert.ok(p.hero?.stats?.length >= 3, `${slug}: hero stats missing`);
    assert.ok(p.hero?.variants?.length >= 2, `${slug}: hero variant options missing`);
    assert.ok(p.otherVehicles?.vehicles?.length >= 2, `${slug}: other-vehicles relation broken`);
    assert.ok(p.reviews?.length >= 1, `${slug}: reviews relation broken`);
  }
});

test("careers positions survive with required fields", async (t) => {
  if (!strapiUp) return t.skip("Strapi not running");
  const { status, body } = await fetchJson(`${STRAPI_URL}/api/career-positions`);
  assert.equal(status, 200);
  const positions = body.data ?? [];
  assert.ok(positions.length >= 5, "career positions were wiped");
  for (const entry of positions) {
    const pos = entry.attributes ?? entry;
    assert.ok(pos.title && pos.department && pos.location, "career position missing required fields");
    assert.ok(pos.slug, "career position missing slug (slug-page links break)");
  }
});

test("unknown product slug is rejected by the API", async (t) => {
  if (!strapiUp) return t.skip("Strapi not running");
  const query = qs({ filters: { slug: { $eq: "does-not-exist" } } });
  const { body } = await fetchJson(`${STRAPI_URL}/api/products?${query}`);
  assert.equal((body.data ?? []).length, 0);
});
