/**
 * Strapi server entry.
 *
 * SAFETY: there are NO seeders anymore. Booting the server performs ZERO
 * database writes — all content is managed manually in the admin panel.
 * The website renders fully even with an empty CMS because every frontend
 * page has built-in offline fallback content.
 *
 * The only behavior registered here is instant cache invalidation: content
 * changes notify the Next.js /api/revalidate endpoint (no-op unless
 * NEXT_APP_URL is configured; ISR refreshes within 60s regardless).
 */

/**
 * Content types whose changes must invalidate the Next.js ISR cache.
 * Kept in sync with the frontend fetchers in lib/strapi/client.ts.
 */
const REVALIDATABLE_MODELS = [
  'api::home-page.home-page',
  'api::about-page.about-page',
  'api::careers-page.careers-page',
  'api::career-position.career-position',
  'api::technology-page.technology-page',
  'api::dealer-locator-page.dealer-locator-page',
  'api::charging-stations-page.charging-stations-page',
  'api::faq-page.faq-page',
  'api::in-press-page.in-press-page',
  'api::insights-page.insights-page',
  'api::privacy-policy.privacy-policy',
  'api::refund-policy.refund-policy',
  'api::terms-conditions.terms-conditions',
  'api::product.product',
  'api::review.review',
  'api::article.article',
  'api::dealer.dealer',
  'api::charging-station.charging-station',
  'api::service-center.service-center',
  'api::leadership-member.leadership-member',
  'api::timeline-milestone.timeline-milestone',
  'api::award.award',
  'api::esg-report.esg-report',
  'api::navbar.navbar',
  'api::footer.footer',
];

/**
 * Maps a Strapi UID to the cache tag the Next.js fetchers use:
 * single types are fetched by singularName, collections by pluralName
 * (see getSingleType / getCollection in lib/strapi/client.ts).
 */
function nextCacheTag(uid: string, strapi: any): string | null {
  const contentType = strapi.contentTypes[uid];
  if (!contentType) return null;
  return contentType.kind === 'singleType'
    ? contentType.info.singularName
    : contentType.info.pluralName;
}

// Minimal logger that works before bootstrap completes
let strapiInstance: any = null;
function strapiLog(message: string) {
  if (strapiInstance?.log?.info) strapiInstance.log.info(message);
}

/**
 * Notifies the Next.js on-demand revalidation endpoint (app/api/revalidate).
 * No-op unless NEXT_APP_URL is configured; failures are non-fatal because
 * ISR still refreshes every page within 60 seconds.
 */
async function notifyNextRevalidate(model: string | null) {
  if (!model) return;
  const baseUrl = process.env.NEXT_APP_URL;
  if (!baseUrl) return;

  const secret = process.env.STRAPI_REVALIDATE_SECRET;
  try {
    await fetch(`${baseUrl.replace(/\/+$/, '')}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(secret ? { 'x-strapi-revalidation-token': secret } : {}),
      },
      body: JSON.stringify({ model }),
    });
    strapiLog(`[Revalidate] Notified Next.js for "${model}"`);
  } catch (error: any) {
    // Next app unreachable — ISR fallback keeps content fresh within 60s
    strapiInstance?.log?.warn?.(`[Revalidate] Could not notify Next.js for "${model}": ${error?.message || error}`);
  }
}

export default {
  register({ strapi }: { strapi: any }) {
    strapiInstance = strapi;

    // Instant ISR invalidation: publish/update/delete in Strapi -> revalidateTag in Next.js
    strapi.db.lifecycles.subscribe({
      models: REVALIDATABLE_MODELS,
      afterCreate: (event: any) => {
        void notifyNextRevalidate(nextCacheTag(event.model?.uid, strapi));
      },
      afterUpdate: (event: any) => {
        void notifyNextRevalidate(nextCacheTag(event.model?.uid, strapi));
      },
      afterDelete: (event: any) => {
        void notifyNextRevalidate(nextCacheTag(event.model?.uid, strapi));
      },
    });
  },

  async bootstrap() {
    // Intentionally empty — no seeding, no writes, ever.
  },
};
