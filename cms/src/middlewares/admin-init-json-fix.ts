import type { Core } from '@strapi/strapi';

/**
 * FIX: in develop mode the Vite admin dev server shadows GET /admin/init
 * (it serves a JS module instead of the JSON payload), which makes the admin
 * panel always fall back to the first-run Register screen even when an admin
 * account already exists. This middleware answers that exact route with the
 * correct JSON before Vite can intercept it.
 */
const adminInitJsonFix = (_config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    if (ctx.method === 'GET' && ctx.path === '/admin/init') {
      let hasAdmin = false;
      try {
        hasAdmin = (await strapi.db.query('admin::user').count()) > 0;
      } catch {
        hasAdmin = false;
      }
      ctx.type = 'application/json';
      ctx.body = {
        data: {
          hasAdmin,
          uuid: strapi.config.get('uuid') ?? null,
          menuLogo: null,
          authLogo: null,
        },
      };
      return;
    }
    await next();
  };
};

export default adminInitJsonFix;
