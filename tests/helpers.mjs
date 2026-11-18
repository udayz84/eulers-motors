/**
 * Shared helpers for the automated test suites.
 *
 * The suites run against live servers and SKIP (not fail) when a server is
 * not running, so `npm test` is safe in any environment:
 *   - CMS tests    need Strapi at STRAPI_URL (default http://localhost:1337)
 *   - Page tests   need Next.js at NEXT_URL   (default http://localhost:3100)
 */

export const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
export const NEXT_URL = process.env.NEXT_URL || "http://localhost:3100";

export async function isServerUp(url, { retries = 3, timeoutMs = 3000 } = {}) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
      if (res.status > 0 || res.ok) return true;
    } catch {
      // retry — servers can be briefly busy (dev compile, restarts)
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return false;
}

export async function fetchJson(url, options) {
  const res = await fetch(url, { signal: AbortSignal.timeout(30000), ...options });
  const body = await res.json();
  return { status: res.status, body };
}

export async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
  const body = await res.text();
  return { status: res.status, body };
}

/** URL-encodes a nested populate object for Strapi v5 query strings. */
export function qs(params) {
  const parts = [];
  const walk = (obj, prefix) => {
    for (const [key, value] of Object.entries(obj)) {
      const full = prefix ? `${prefix}[${key}]` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, full);
      } else {
        parts.push(`${encodeURIComponent(full)}=${encodeURIComponent(String(value))}`);
      }
    }
  };
  walk(params, "");
  return parts.join("&");
}
