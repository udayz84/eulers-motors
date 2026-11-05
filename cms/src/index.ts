import { seedStrapi } from './bootstrap-seed';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    // Only auto-seed if explicitly requested, to keep dev server restarts fast
    if (process.env.AUTO_SEED === 'true') {
      await seedStrapi(strapi);
    }
  },
};
