/**
 * Script to align Strapi Content Manager edit layout order with UI order and place SEO last.
 */
const { createStrapi } = require('@strapi/strapi');

async function updateLayouts() {
  process.env.SKIP_SEED = 'true';
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    // 1. Home Page
    const homeKey = 'plugin_content_manager_configuration_content_types::api::home-page.home-page';
    const homeConfigRow = await app.db.query('strapi::core-store').findOne({ where: { key: homeKey } });
    if (homeConfigRow) {
      const config = JSON.parse(homeConfigRow.value);
      const homeOrder = [
        'hero',
        'statsBanner',
        'productShowcase',
        'neoPromo',
        'savingsCalculator',
        'talkPromo',
        'compareSection',
        'technology',
        'reviewsSection',
        'primeBanner',
        'insightsSection',
        'enterpriseDealer',
        'contactSection',
        'socialWall',
        'seo',
      ];
      config.layouts.edit = homeOrder.map((name) => [{ name, size: 12 }]);
      await app.db.query('strapi::core-store').update({
        where: { key: homeKey },
        data: { value: JSON.stringify(config) },
      });
      console.log('✅ Updated Home Page Content Manager layout in core_store');
    }

    // 2. Technology Page
    const techKey = 'plugin_content_manager_configuration_content_types::api::technology-page.technology-page';
    const techConfigRow = await app.db.query('strapi::core-store').findOne({ where: { key: techKey } });
    if (techConfigRow) {
      const config = JSON.parse(techConfigRow.value);
      const techOrder = [
        'hero',
        'loadSection',
        'indianRoads',
        'manufacturing',
        'knowVehicle',
        'chargingSection',
        'faqSection',
        'shepherdSection',
        'proofSection',
        'reviewsSection',
        'contactSection',
        'seo',
      ];
      config.layouts.edit = techOrder.map((name) => [{ name, size: 12 }]);
      await app.db.query('strapi::core-store').update({
        where: { key: techKey },
        data: { value: JSON.stringify(config) },
      });
      console.log('✅ Updated Technology Page Content Manager layout in core_store');
    }

    // 3. Careers Page
    const careersKey = 'plugin_content_manager_configuration_content_types::api::careers-page.careers-page';
    const careersConfigRow = await app.db.query('strapi::core-store').findOne({ where: { key: careersKey } });
    if (careersConfigRow) {
      const config = JSON.parse(careersConfigRow.value);
      const careersOrder = [
        'hero',
        'benefitsSection',
        'supportSection',
        'gallerySection',
        'testimonialsSection',
        'seo',
      ];
      config.layouts.edit = careersOrder.map((name) => [{ name, size: 12 }]);
      await app.db.query('strapi::core-store').update({
        where: { key: careersKey },
        data: { value: JSON.stringify(config) },
      });
      console.log('✅ Updated Careers Page Content Manager layout in core_store');
    }

    // 4. Product (Showcase only: title, tabLabel, slug, image, specsRange, specsCapacity, specsChargeTime, productUrl, order)
    const productKey = 'plugin_content_manager_configuration_content_types::api::product.product';
    const productConfigRow = await app.db.query('strapi::core-store').findOne({ where: { key: productKey } });
    if (productConfigRow) {
      const config = JSON.parse(productConfigRow.value);
      config.layouts.edit = [
        [{ name: 'title', size: 6 }, { name: 'tabLabel', size: 6 }],
        [{ name: 'slug', size: 6 }, { name: 'image', size: 6 }],
        [{ name: 'specsRange', size: 6 }, { name: 'specsCapacity', size: 6 }],
        [{ name: 'specsChargeTime', size: 6 }, { name: 'productUrl', size: 6 }],
        [{ name: 'order', size: 6 }],
      ];
      // Clean up metadatas
      const allowedFields = new Set([
        'id', 'documentId', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy',
        'title', 'tabLabel', 'slug', 'image', 'specsRange', 'specsCapacity', 'specsChargeTime', 'productUrl', 'order'
      ]);
      for (const field of Object.keys(config.metadatas)) {
        if (!allowedFields.has(field)) {
          delete config.metadatas[field];
        }
      }
      await app.db.query('strapi::core-store').update({
        where: { key: productKey },
        data: { value: JSON.stringify(config) },
      });
      console.log('✅ Updated Product Content Manager layout in core_store (clean showcase layout)');
    }

    console.log('🎉 All Content Manager layouts successfully updated to match UI order with SEO last!');
  } finally {
    await app.destroy();
  }
}

updateLayouts();

