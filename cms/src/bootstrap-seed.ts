import path from 'path';
import fs from 'fs';

/**
 * Helper to upload WebP media into Strapi's Media Library if not already uploaded.
 * Returns the media ID (number).
 */
async function uploadMediaIfMissing(
  strapi: any,
  relPath: string,
  name: string,
  alternativeText: string = ''
): Promise<number | null> {
  const fullPath = path.resolve(__dirname, '../../..', relPath);
  if (!fs.existsSync(fullPath)) {
    strapi.log.warn(`[Seeder] Media file not found: ${fullPath}`);
    return null;
  }

  // Check if file already exists in Strapi database
  const knex = strapi.db.connection;
  const existing = await knex('files').where({ name }).first();
  if (existing) {
    return existing.id;
  }

  const stat = fs.statSync(fullPath);
  const uploadService = strapi.plugin('upload').service('upload');
  const [uploaded] = await uploadService.upload({
    data: {
      fileInfo: {
        name,
        alternativeText,
        caption: name,
      },
    },
    files: {
      filepath: fullPath,
      originalFilename: path.basename(fullPath),
      mimetype: 'image/webp',
      size: stat.size,
    },
  });

  strapi.log.info(`[Seeder] Uploaded ${name} -> ${uploaded.url} (ID: ${uploaded.id})`);
  return uploaded.id;
}

/**
 * Strapi v5 Homepage & Collection Seeder
 * Populates all homepage components and full product slug pages from approved specifications.
 */
export async function seedStrapi(strapi: any) {
  strapi.log.info('[Seeder] Starting homepage and product slug pages seeding...');

  try {
    // 0. Upload all Homepage & Product WebP Images
    strapi.log.info('[Seeder] Ensuring WebP images are uploaded in Media Library...');
    const heroDesktopId = await uploadMediaIfMissing(
      strapi,
      'public/images/hero_desktop_clean.webp',
      'hero_desktop_clean.webp',
      'Euler Motors Hero Desktop Truck'
    );

    const stormLrImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/products/vehicle-storm-lr200-clean.webp',
      'vehicle-storm-lr200-clean.webp',
      'Storm EV LongRange 200'
    );
    const stormT1500ImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/products/vehicle-storm-t1500-clean.webp',
      'vehicle-storm-t1500-clean.webp',
      'Storm EV T1500'
    );
    const turbo1000ImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/products/vehicle-turbo-1000-clean.webp',
      'vehicle-turbo-1000-clean.webp',
      'Turbo EV 1000'
    );
    const hiloadImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/products/vehicle-hiload-ev-clean.webp',
      'vehicle-hiload-ev-clean.webp',
      'HiLoad EV'
    );

    const neoPromoImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/neo/product.webp',
      'neo-product.webp',
      'Neo by Euler 3-wheeler'
    );
    const talkPromoImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/talk/desktop-bg.webp',
      'talk-desktop-bg.webp',
      'Euler expert assisting customer'
    );

    const storyAImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/reviews/story-a.webp',
      'review-story-a.webp',
      'Customer story Saurabh Patil'
    );
    const storyBImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/reviews/story-b.webp',
      'review-story-b.webp',
      'Customer story overlay B'
    );
    const storyCImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/reviews/story-c.webp',
      'review-story-c.webp',
      'Customer story overlay C'
    );
    const storyDImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/reviews/story-d.webp',
      'review-story-d.webp',
      'Customer story overlay D'
    );

    const article1ImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/insights/article-1.webp',
      'insights-article-1.webp',
      'What an electric fleet really costs'
    );
    const article2ImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/insights/article-2.webp',
      'insights-article-2.webp',
      'How much EV subsidy will you get'
    );
    const article3ImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/insights/article-3.webp',
      'insights-article-3.webp',
      'Depot or public charging'
    );

    // Technology Page Main Images
    const mfgPlantImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/mfg__imgRectangle1618873365.webp',
      'mfg-plant.webp',
      'Euler Motors Manufacturing Facility'
    );
    const shepDashboardImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/shep__imgImage749.webp',
      'shepherd-dashboard.webp',
      'Shepherd Fleet Dashboard'
    );
    const loadDriveImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/load-card-drive-exact.webp',
      'load-card-drive.webp',
      'Euler Full Load Drive Performance'
    );
    const loadPayloadImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/load-card-payload-exact.webp',
      'load-card-payload.webp',
      'Euler Heavy Payload Handling'
    );
    const kvMotorImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/kv__imgChatGpt2.webp',
      'kv-motor.webp',
      'Euler Electric Motor'
    );
    const kvBatteryImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/kv__imgChatGpt3.webp',
      'kv-battery.webp',
      'Euler Liquid Cooled Battery'
    );
    const kvChargingImgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/technology-page/kv__imgChatGpt4.webp',
      'kv-charging.webp',
      'Euler Fast Charging'
    );

    // Careers Page Main Images
    const galleryOfficeId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/gallery-office.webp',
      'gallery-office.webp',
      'Euler Motors Office'
    );
    const galleryMeetingId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/gallery-meeting-room.webp',
      'gallery-meeting-room.webp',
      'Euler Motors Meeting Space'
    );
    const galleryTeamId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/gallery-team.webp',
      'gallery-team.webp',
      'Euler Motors Team'
    );
    const galleryTeamWorkId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/gallery-team-work.webp',
      'gallery-team-work.webp',
      'Euler Motors Collaboration'
    );
    const galleryWorkspaceId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/gallery-workspace.webp',
      'gallery-workspace.webp',
      'Euler Motors Workspace'
    );
    const testimonialRahulId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/testimonial-rahul.webp',
      'testimonial-rahul.webp',
      'Rahul Deshmukh'
    );
    const testimonialJahanId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/testimonial-jahan.webp',
      'testimonial-jahan.webp',
      'Jahan Melad'
    );
    const testimonialPriyaId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/testimonial-priya.webp',
      'testimonial-priya.webp',
      'Priya Sharma'
    );

    // 1. Seed Customer Reviews (Reused by Home Page, Products, and Technology Pages)
    const existingReviews = await strapi.documents('api::review.review').findMany();
    const reviewIds: string[] = [];

    const reviewsToSeed = [
      {
        customerName: 'Saurabh Patil',
        roleOrCompany: 'Fleet Owner',
        location: 'Mumbai',
        quote: '14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.',
        order: 1,
        storyImage: storyAImgId,
        overlayImage: storyBImgId,
      },
      {
        customerName: 'Ramesh Sharma',
        roleOrCompany: 'Fleet Owner, Delhi NCR',
        location: 'Delhi',
        quote: 'Our operating costs dropped significantly since transitioning our delivery fleet to Euler.',
        order: 2,
        storyImage: storyAImgId,
        overlayImage: storyCImgId,
      },
      {
        customerName: 'Anil Verma',
        roleOrCompany: 'Logistics Partner, Bengaluru',
        location: 'Bengaluru',
        quote: 'The liquid cooled battery handles heat and steep gradients with zero power drop.',
        order: 3,
        storyImage: storyAImgId,
        overlayImage: storyDImgId,
      },
    ];

    for (const r of reviewsToSeed) {
      let doc = existingReviews.find((er: any) => er.customerName === r.customerName);
      if (!doc) {
        doc = await strapi.documents('api::review.review').create({
          data: r,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Created review: ${r.customerName}`);
      } else {
        doc = await strapi.documents('api::review.review').update({
          documentId: doc.documentId,
          data: r,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Updated review: ${r.customerName}`);
      }
      reviewIds.push(doc.documentId);
    }

    // 2. Seed Articles with WebP Cover Images
    const existingArticles = await strapi.documents('api::article.article').findMany();
    const articleIds: string[] = [];

    const articlesToSeed = [
      {
        title: 'What an electric fleet really costs',
        slug: 'what-an-electric-fleet-really-costs',
        description:
          'Electricity, servicing, insurance, battery, and resale value. Everything calculated for fleets driving 80km to 200 km per day.',
        publishDate: '2024-04-10',
        category: 'Economics',
        readingTime: '09 Min',
        coverImage: article1ImgId,
      },
      {
        title: 'How much EV subsidy will you get?',
        slug: 'how-much-ev-subsidy-will-you-get',
        description: 'Which states still offer subsidies, what ended in April, and how to claim them.',
        publishDate: '2024-03-22',
        category: 'Government Policy',
        readingTime: '07 Min',
        coverImage: article2ImgId,
      },
      {
        title: 'Depot or public charging?',
        slug: 'depot-or-public-charging',
        description: 'Under 9 vehicles, public charging works out cheaper. The full working is inside.',
        publishDate: '2024-02-15',
        category: 'Charging Infrastructure',
        readingTime: '05 Min',
        coverImage: article3ImgId,
      },
    ];

    for (const a of articlesToSeed) {
      let doc = existingArticles.find((ea: any) => ea.slug === a.slug);
      if (!doc) {
        doc = await strapi.documents('api::article.article').create({
          data: a,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Created article: ${a.title}`);
      } else {
        doc = await strapi.documents('api::article.article').update({
          documentId: doc.documentId,
          data: a,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Updated article: ${a.title}`);
      }
      articleIds.push(doc.documentId);
    }

    // 3. Get Products Collection IDs for Product Showcase
    const existingProducts = await strapi.documents('api::product.product').findMany({
      fields: ['slug', 'documentId'],
    });
    const productMap: Record<string, string> = {};
    for (const p of existingProducts) {
      productMap[p.slug] = p.documentId;
    }

    // 4. Seed Single Type: Home Page with all components & WebP images filled
    const homePageData = {
      seo: {
        metaTitle: 'Euler Motors — Electric Goods Vehicles, India Ke Liye',
        metaDescription:
          'Electric commercial goods vehicles built for Indian roads. Discover Turbo EV, Storm EV, and HiLoad EV.',
        keywords: 'Euler Motors, commercial EV, electric three wheeler, electric four wheeler, Storm EV, Turbo EV',
        preventIndexing: false,
        shareImage: heroDesktopId,
      },
      hero: {
        slides: [
          {
            tag: 'PERFORMANCE',
            headline: 'Designed for demanding loads and everyday commercial operations.',
            subheading: '',
            primaryCta: {
              label: 'Explore our vehicles',
              href: '/products',
              variant: 'primary',
            },
          },
          {
            tag: 'PERFORMANCE',
            headline:
              'From different cargo requirements to diverse business needs, find your fit in our electric vehicle portfolio.',
            subheading: '',
            primaryCta: {
              label: 'View all vehicles',
              href: '/products',
              variant: 'primary',
            },
          },
          {
            tag: 'TECHNOLOGY',
            headline:
              'Purpose-built technology, thoughtful engineering, and safety-focused design for commercial mobility.',
            subheading: '',
            primaryCta: {
              label: 'Discover our technology',
              href: '/technology',
              variant: 'primary',
            },
          },
          {
            tag: 'BUSINESS VALUE',
            headline:
              'Find the right balance of capability, operating needs, and value for your business.',
            subheading: '',
            primaryCta: {
              label: 'Find your vehicle',
              href: '/products',
              variant: 'primary',
            },
          },
        ],
      },
      statsBanner: {
        heading: 'Euler Motors in numbers',
        stats: [
          {
            value: '10,000+',
            unit: '',
            label: 'Units sold',
          },
          {
            value: '52',
            unit: 'Crore+',
            label: 'Kilometres driven',
          },
          {
            value: '20',
            unit: 'Crore+',
            label: 'CO₂ emissions saved',
          },
          {
            value: '6000+',
            unit: '',
            label: 'Compatible charging points PAN India',
          },
        ],
      },
      productShowcase: {
        eyebrow: 'FIND YOUR FIT',
        title: 'The right vehicle for every business move.',
        subtitle:
          'From last-mile deliveries to heavier commercial operations, explore electric vehicles designed around your business needs.',
        products: Object.values(productMap),
      },
      neoPromo: {
        eyebrow: 'ELECTRIC 3-WHEELER COMMERCIAL MOBILITY',
        title: 'Meet Neo by Euler.',
        body: 'Discover HiLoad, HiRange and HiCity, designed for urban and semi-urban passenger mobility and cargo deliveries.',
        ctaLabel: 'Explore Neo',
        ctaHref: '/products',
        image: neoPromoImgId,
        imageAlt: 'Neo by Euler electric 3-wheelers',
        wash: 'blue',
        align: 'left',
      },
      savingsCalculator: {
        eyebrow: 'SAVINGS CALCULATOR',
        title: 'Save more on operating costs.',
        defaultDailyKm: 80,
        defaultYears: 3,
        chartImageAlt: 'Bar chart comparing monthly profit with petrol, diesel, CNG and Euler EV',
      },
      talkPromo: {
        eyebrow: 'EXPERT ASSISTANCE',
        title: 'Talk to an expert',
        body: 'Have questions about our electric vehicles? Request a callback and our team will help you explore the right options for your business.',
        ctaLabel: 'Request a callback',
        ctaHref: '#book-test-drive',
        image: talkPromoImgId,
        imageAlt: 'Euler expert assisting customer',
        wash: 'mobile-blue',
        align: 'right',
      },
      compareSection: {
        eyebrow: 'WHY EULER',
        title: 'What changes when you switch?',
        quizTitle: 'Which vehicle fits your work?',
        quizSubtitle:
          'Answer 5 quick questions to find the right vehicle for your business. No phone number needed.',
        quizCta: {
          label: 'Take the 30-second test',
          href: '#vehicle-compare',
          variant: 'primary',
        },
        withoutEulerPoints: [
          {
            persona: 'Fleet owner',
            points: ['Vehicle downtime', 'Fewer trips', '₹4–5/km running cost'],
          },
          {
            persona: 'Transport company',
            points: ['₹4–6/km running cost', 'Margin pressure', 'Fleet inefficiencies'],
          },
          {
            persona: 'Small business',
            points: ['High delivery costs', 'Limited delivery capacity', 'Cost pressure'],
          },
          {
            persona: 'Driver',
            points: ['Breakdowns disrupt work', 'Fewer trips', 'Time off the road'],
          },
          {
            persona: 'Dealer',
            points: ['Limited EV opportunities', 'Changing market demands', 'Business expansion challenges'],
          },
        ],
        withEulerPoints: [
          {
            persona: 'Fleet owner',
            points: [
              '90-minute doorstep service with Euler Prime',
              '2 to 3 More trips',
              'Approx. ₹1/km running cost',
            ],
          },
          {
            persona: 'Transport company',
            points: [
              'Less than ₹1/km running cost',
              'Better operating economics',
              'Efficient fleet operations',
            ],
          },
          {
            persona: 'Small business',
            points: [
              'Potential savings',
              'Vehicles for your needs',
              'Better cost management',
            ],
          },
          {
            persona: 'Driver',
            points: [
              'Service support',
              'More earning opportunities',
              'More time for work',
            ],
          },
          {
            persona: 'Dealer',
            points: [
              'EV dealership opportunity',
              'Growing EV category',
              'Partnership with Euler',
            ],
          },
        ],
      },
      technology: {
        eyebrow: 'MADE FOR THE MILES',
        title: 'Built for Indian roads.',
        description:
          'Full range in every weather condition. Purpose-built technology, thoughtful engineering, and safety-focused design for commercial mobility.',
      },
      reviewsSection: {
        eyebrow: 'CUSTOMERS',
        title: 'Hear it from those who drive Euler.',
        description:
          'Real customers. Real experiences. Hear how Euler Motors fits into their everyday business.',
        reviews: reviewIds,
      },
      primeBanner: {
        title: 'Aap Jahan. Service Wahan',
        description:
          '90-minute service, 24×7 RSA support, predictive maintenance, and doorstep service. Dedicated technicians bring service support right to your location.',
        cta: {
          label: 'Explore Euler Prime',
          href: '/products',
          variant: 'primary',
        },
      },
      insightsSection: {
        eyebrow: 'insights',
        title: 'Learn more about EVs',
        viewAllCta: {
          label: 'Read all insights',
          href: '/faq',
          variant: 'primary',
        },
        articles: articleIds,
      },
      enterpriseDealer: {
        enterpriseEyebrow: 'ENTERPRISE',
        enterpriseTitle: 'Need 50+ vehicles?',
        enterpriseDesc:
          'We assess your business needs and recommend the right vehicle for your operations.',
        enterpriseBullets: [
          'Vehicle recommendations for your business',
          'Charging setup at your warehouse',
          'Spare parts support',
          'Dedicated account manager',
        ],
        enterpriseCta: {
          label: 'Talk to our team',
          href: '/products',
          variant: 'primary',
        },
        dealerEyebrow: 'DEALERSHIP OPPORTUNITIES',
        dealerTitle: 'Want to become a dealer?',
        dealerDesc:
          'Bring Euler Motors to your city. Get support with the showroom with Service Setup and training.',
        dealerPrimaryCta: {
          label: 'Apply now',
          href: '/products',
          variant: 'primary',
        },
        dealerSecondaryCta: {
          label: 'Download details',
          href: '/products',
          variant: 'outline',
        },
      },
      contactSection: {
        eyebrow: 'NEXT STEP',
        title: 'Ready to make the switch?',
        description:
          'Tell us about your business. We’ll help you find the right Euler vehicle for your daily runs.',
        phone: '1800-1238-1238',
        email: 'customer.help@eulermotors.com',
      },
      socialWall: {
        eyebrow: 'From the road',
        title: 'See how Euler vehicle is effective for your business',
        subtitle:
          'Real drivers. Real journeys. A closer look at life with Euler.',
        posts: [
          {
            duration: '02:14',
            authorHandle: '@eulermotors',
            isOfficial: true,
            likes: '4,820 likes',
            timeAgo: '1 day ago',
            videoUrl: 'https://instagram.com/eulermotors',
          },
          {
            duration: '01:48',
            authorHandle: '@eulermotors_drivers',
            isOfficial: true,
            likes: '3,150 likes',
            timeAgo: '3 days ago',
            videoUrl: 'https://instagram.com/eulermotors',
          },
          {
            duration: '00:58',
            authorHandle: '@eulermotors',
            isOfficial: true,
            likes: '9,480 likes',
            timeAgo: '5 days ago',
            videoUrl: 'https://instagram.com/eulermotors',
          },
        ],
      },
    };

    const existingHome = await strapi.documents('api::home-page.home-page').findFirst({
      fields: ['documentId'],
    });
    if (!existingHome) {
      const created = await strapi.documents('api::home-page.home-page').create({
        data: homePageData,
        status: 'published',
      });
      strapi.log.info(`[Seeder] Created Home Page singleType successfully! (${created.documentId})`);
    } else {
      const updated = await strapi.documents('api::home-page.home-page').update({
        documentId: existingHome.documentId,
        data: homePageData,
        status: 'published',
      });
      strapi.log.info(`[Seeder] Updated Home Page singleType successfully! (${updated.documentId})`);
    }

    // 5. Grant Public Read Permissions in users-permissions plugin
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      const actionsToEnable = [
        'api::home-page.home-page.find',
        'api::product.product.find',
        'api::product.product.findOne',
        'api::review.review.find',
        'api::review.review.findOne',
        'api::article.article.find',
        'api::article.article.findOne',
        'api::technology-page.technology-page.find',
        'api::careers-page.careers-page.find',
        'api::career-position.career-position.find',
        'api::career-position.career-position.findOne',
        'plugin::upload.content-api.find',
        'plugin::upload.content-api.findOne',
      ];

      for (const action of actionsToEnable) {
        let perm = await strapi.query('plugin::users-permissions.permission').findOne({
          where: { action },
        });

        if (!perm) {
          perm = await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action,
            },
          });
          strapi.log.info(`[Seeder] Created permission: ${action}`);
        }

        if (perm) {
          const knex = strapi.db.connection;
          const link = await knex('up_permissions_role_lnk')
            .where({ permission_id: perm.id, role_id: publicRole.id })
            .first();
          if (!link) {
            await knex('up_permissions_role_lnk').insert({
              permission_id: perm.id,
              role_id: publicRole.id,
            });
            strapi.log.info(`[Seeder] Linked permission ${action} to Public role`);
          }
        }
      }
    }

    strapi.log.info('[Seeder] All homepage & product slug components successfully seeded into Strapi!');
    fs.writeFileSync('./seed.log', 'SUCCESS\n');
  } catch (error: any) {
    strapi.log.error(`[Seeder] Error during seeding: ${error.message}`);
    fs.writeFileSync('./seed.log', `ERROR: ${error.message}\n${error.stack}\n`);
    console.error(error);
  }
}
