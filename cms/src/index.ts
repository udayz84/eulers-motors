import { seedStrapi, seedTechnologyPage, seedAboutPage, seedCareersPage } from './bootstrap-seed';

export default {
  register() { },

  async bootstrap({ strapi }: { strapi: any }) {
    // Seed careers page to populate hero images and support perk icons into the CMS
    await seedCareersPage(strapi);

    // Only auto-seed if explicitly requested, to keep dev server restarts fast
    if (process.env.AUTO_SEED === 'true') {
      await seedStrapi(strapi);
    } else if (process.env.SEED_TECHNOLOGY === 'true') {
      await seedTechnologyPage(strapi);
    } else if (process.env.SEED_ABOUT === 'true') {
      await seedAboutPage(strapi);
    }
  },
};
