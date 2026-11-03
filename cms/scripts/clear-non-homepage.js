const { createStrapi } = require('@strapi/strapi');

async function main() {
  console.log('🧹 [Euler Reset] Clearing all product components...');
  process.env.SKIP_SEED = 'true';

  let app;
  try {
    app = await createStrapi({ distDir: './dist' }).load();

    const products = await app.documents('api::product.product').findMany();
    for (const p of products) {
      await app.documents('api::product.product').update({
        documentId: p.documentId,
        data: {
          title: p.title,
          tabLabel: p.tabLabel,
          slug: p.slug,
          specsRange: p.specsRange,
          specsCapacity: p.specsCapacity,
          specsChargeTime: p.specsChargeTime,
          order: p.order,
          seo: null,
          hero: null,
          specs: null,
          savingsCalculator: null,
          variantsCompare: null,
          overview: null,
          loanCalculator: null,
          reviewsSection: null,
          otherVehiclesSection: null,
          contactSection: null,
        },
        status: 'published',
      });
      console.log(`Set all components to null for product: ${p.title} (${p.documentId})`);
    }

    console.log('✅ [Euler Reset] All product components are now completely blank/empty.');
    process.exitCode = 0;
  } catch (error) {
    console.error('❌ [Euler Reset] Failed with error:', error);
    process.exitCode = 1;
  } finally {
    if (app) {
      await app.destroy();
    }
  }
}

main();
