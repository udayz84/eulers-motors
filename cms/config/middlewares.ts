import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  {
    // FIX: in develop mode the Vite admin dev server shadows GET /admin/init
    // (serves a JS module instead of the JSON payload), which makes the admin
    // panel always fall back to the first-run Register screen even when an
    // admin account already exists. Implementation:
    //   src/middlewares/admin-init-json-fix.ts
    resolve: './src/middlewares/admin-init-json-fix',
  },
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      headers: ['*'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
