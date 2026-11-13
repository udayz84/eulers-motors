/**
 * Standalone Homepage & Collection Seeder for Strapi v5
 * Populates all homepage components and collections from the approved specifications.
 * 
 * Usage:
 *   npm run seed (from cms directory)
 */

const { createStrapi } = require('@strapi/strapi');

async function main() {
  console.log('🌱 [Euler Seeder] Starting standalone Strapi seeder...');

  // Prevent bootstrap from running seedStrapi twice
  process.env.SKIP_SEED = 'true';

  let app;
  try {
    app = await createStrapi({ distDir: './dist' }).load();

    const { seedStrapi } = require('../dist/src/bootstrap-seed');
    await seedStrapi(app);

    console.log('✅ [Euler Seeder] All homepage & product components seeded successfully!');
    process.exitCode = 0;
  } catch (error) {
    console.error('❌ [Euler Seeder] Seeding failed with error:', error);
    process.exitCode = 1;
  } finally {
    if (app) {
      await app.destroy();
      console.log('🔒 [Euler Seeder] Strapi instance closed.');
    }
  }
}

main();
