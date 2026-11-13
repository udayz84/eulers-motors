import path from 'path';
import fs from 'fs';

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream';
  }
}

/**
 * Helper to upload media into Strapi's Media Library if not already uploaded.
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
      mimetype: getMimeType(fullPath),
      size: stat.size,
    },
  });

  strapi.log.info(`[Seeder] Uploaded ${name} -> ${uploaded.url} (ID: ${uploaded.id})`);

  try {
    const nextUploadsDir = path.resolve(__dirname, '../../../public/uploads');
    if (!fs.existsSync(nextUploadsDir)) fs.mkdirSync(nextUploadsDir, { recursive: true });
    const cmsUploadFile = path.resolve(__dirname, '../../public', uploaded.url.replace(/^\//, ''));
    if (fs.existsSync(cmsUploadFile)) {
      fs.copyFileSync(cmsUploadFile, path.join(nextUploadsDir, path.basename(uploaded.url)));
    }
  } catch {
    // ignore sync errors
  }

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
    const careerHeroDesktopId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/hero-desktop.webp',
      'career-hero-desktop.webp',
      'Euler Motors Careers Hero Desktop'
    );
    const careerHeroMobileId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/hero-mobile.webp',
      'career-hero-mobile.webp',
      'Euler Motors Careers Hero Mobile'
    );
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
    const galleryDocShowcaseId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/doc-embedded-gallery.webp',
      'doc-embedded-gallery.webp',
      'Life at Euler Doc Showcase'
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

    // Careers Support Perks Icons
    const supportMedicalId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-medical.webp',
      'support-medical.webp',
      'Medical Cover'
    );
    const supportLearningId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-learning.webp',
      'support-learning.webp',
      'Learning Budget'
    );
    const supportLeaveId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-leave.webp',
      'support-leave.webp',
      'Flexible Leave'
    );
    const supportCounselingId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-counseling.webp',
      'support-counseling.webp',
      'Counseling'
    );
    const supportEquityId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-equity.webp',
      'support-equity.webp',
      'Equity Options'
    );
    const supportWorkspaceId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-workspace.webp',
      'support-workspace.webp',
      'Modern Workspace'
    );
    const supportParentalId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-parental.webp',
      'support-parental.webp',
      'Parental Support'
    );
    const supportRecognitionId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support/support-recognition.webp',
      'support-recognition.webp',
      'Recognition'
    );
    const heroDesktopCareersId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/hero-desktop.webp',
      'careers-hero-desktop.webp',
      'Careers Hero Desktop'
    );
    const heroMobileCareersId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/hero-mobile.webp',
      'careers-hero-mobile.webp',
      'Careers Hero Mobile'
    );
    const supportIllustrationsId = await uploadMediaIfMissing(
      strapi,
      'public/assets/careers/support-illustrations.webp',
      'careers-support-illustrations.webp',
      'Careers Support Illustrations'
    );

    // Charging Station & Partners WebP Assets
    const chargingFaqMapId = await uploadMediaIfMissing(
      strapi,
      'public/assets/charging-station-faq/location-map-hq.webp',
      'charging-faq-location-map-hq.webp',
      'Euler Charging Station Network Map'
    );
    const chargingContactBgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/charging-station-next-step/background.webp',
      'charging-contact-background.webp',
      'Euler Commercial Vehicle Interior'
    );
    const dealerContactBgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/dealer-contact/background.webp',
      'dealer-contact-background.webp',
      'Euler Showroom Commercial Vehicle Interior'
    );
    const dealerMapId = await uploadMediaIfMissing(
      strapi,
      'public/assets/dealer-locator/map-hq.webp',
      'dealer-locator-map-hq.webp',
      'Euler Motors India Locator Map'
    );
    const partnerQrgId = await uploadMediaIfMissing(
      strapi,
      'public/assets/partners-investors/qrg.webp',
      'partner-qrg.webp',
      'QRG'
    );
    const partnerMoglixId = await uploadMediaIfMissing(
      strapi,
      'public/assets/partners-investors/moglix.webp',
      'partner-moglix.webp',
      'Moglix'
    );
    const partnerJettyId = await uploadMediaIfMissing(
      strapi,
      'public/assets/partners-investors/jetty.webp',
      'partner-jetty.webp',
      'JETTY Ventures'
    );
    const partnerBlumeId = await uploadMediaIfMissing(
      strapi,
      'public/assets/partners-investors/blume.webp',
      'partner-blume.webp',
      'BLUME'
    );
    const partnerGicId = await uploadMediaIfMissing(
      strapi,
      'public/assets/partners-investors/gic.webp',
      'partner-gic.webp',
      'GIC'
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
        cta: {
          label: 'See how it works',
          href: '/technology',
          variant: 'primary',
        },
        cards: [
          {
            tag: '01 / Battery',
            title: 'Full range, even in garmi.',
            description:
              'Indian summers can be tough on batteries. Our liquid-cooled battery helps manage heat, so you can keep moving.',
          },
          {
            tag: '02 / Comfort & Safety',
            title: 'Comfortable for an 11-hour day.',
            description:
              'Spacious cabin, electronic power steering, comfortable seats, infotainment system, ADAS and reverse camera for a more comfortable, confident drive.',
          },
          {
            tag: '03 / Shepherd App',
            title: 'Your entire fleet, one app.',
            description:
              'Manage real-time vehicle tracking, locate charging stations and book slots, set geofences, manage fleet operations, use digital locks and receive regular service alerts with the Shepherd mobile app.',
          },
          {
            tag: '04 / Performance',
            title: 'Climbs a slope on a full load.',
            description:
              'Industry-leading torque and selectable driving modes deliver strong pulling power across steep slopes, flyovers and rough roads, even with a full load.',
          },
        ],
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
        enterpriseBullets:
          'Vehicle recommendations for your business\nCharging setup at your warehouse\nSpare parts support\nDedicated account manager',
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
        form: {
          heading: 'What are you looking for?',
          subheading: 'Two steps. We call you within one working day.',
          vehicleOptions:
            'Storm EV LongRange 200, Storm EV T1500, HiLoad EV, Turbo EV 1000, Neo HiRange, Neo HiCity',
          tabs: [
            {
              tabTitle: 'Test drive',
              nameLabel: 'Name',
              namePlaceholder: 'Full name',
              nameRequired: true,
              phoneLabel: 'Mobile number',
              phonePlaceholder: '10 digit',
              phoneRequired: true,
              vehicleLabel: 'Which vehicle',
              vehiclePlaceholder: 'Not sure, please suggest one',
              vehicleRequired: true,
              cityLabel: 'City',
              cityPlaceholder: 'Mumbai',
              cityRequired: true,
              customFieldLabel: 'Kilometres per day',
              customFieldPlaceholder: '150',
              customFieldRequired: true,
              ctaLabel: 'Confirm test drive',
            },
            {
              tabTitle: 'Price enquiry',
              nameLabel: 'Name',
              namePlaceholder: 'Full name',
              nameRequired: true,
              phoneLabel: 'Mobile number',
              phonePlaceholder: '10 digit',
              phoneRequired: true,
              vehicleLabel: 'Which vehicle',
              vehiclePlaceholder: 'Not sure, please suggest one',
              vehicleRequired: true,
              cityLabel: 'City',
              cityPlaceholder: 'Mumbai',
              cityRequired: true,
              customFieldLabel: 'Quantity of vehicles',
              customFieldPlaceholder: '5',
              customFieldRequired: true,
              ctaLabel: 'Get price list',
            },
            {
              tabTitle: 'Fleet solutions',
              nameLabel: 'Company name',
              namePlaceholder: 'Company',
              nameRequired: true,
              phoneLabel: 'Mobile number',
              phonePlaceholder: '10 digit',
              phoneRequired: true,
              vehicleLabel: 'Which vehicle',
              vehiclePlaceholder: 'Not sure, please suggest one',
              vehicleRequired: true,
              cityLabel: 'City',
              cityPlaceholder: 'Mumbai',
              cityRequired: true,
              customFieldLabel: 'Fleet size',
              customFieldPlaceholder: 'Number of vehicles',
              customFieldRequired: true,
              ctaLabel: 'Talk to our fleet team',
            },
          ],
          privacyNotice:
            'Euler Motors and its dealers may contact me about this enquiry. Privacy policy.',
          disclaimer: 'We never share your number with anyone else. No spam calls.',
        },
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

    // 4b. Seed Dealers, Charging Stations, Service Centers, and Dealer Locator Page
    strapi.log.info('[Seeder] Seeding Dealers, Charging Stations, and Service Centers...');

    const existingDealers = await strapi.documents('api::dealer.dealer').findMany();
    const dealerIds: string[] = [];
    const dealersToSeed = [
      {
        name: 'Euler Motors — Kandivali',
        slug: 'kandivali',
        badges: ['Dealer', 'Service'],
        address: 'Akurli Metro Station, Kandivali East',
        city: 'Mumbai',
        state: 'Maharashtra',
        hours: 'Open until 7 pm',
        operatingDays: 'Mon - Fri',
        distance: '1.3',
        phone: '1800 000 0000',
        order: 1,
      },
      {
        name: 'Euler Motors — Thane',
        slug: 'thane',
        badges: ['Dealer'],
        address: 'Arun Arcade, Chitalsar, Manpada',
        city: 'Mumbai',
        state: 'Maharashtra',
        hours: 'Open until 7 pm',
        operatingDays: 'Mon - Fri',
        distance: '52.5',
        phone: '1800 000 0000',
        order: 2,
      },
      {
        name: 'Euler Motors — Vasai',
        slug: 'vasai',
        badges: ['Dealer'],
        address: "Johnson's Compound, Golani Naka, Vasai East",
        city: 'Mumbai',
        state: 'Maharashtra',
        hours: 'Open until 7 pm',
        operatingDays: 'Mon - Fri',
        distance: '150',
        phone: '1800 000 0000',
        order: 3,
      },
      {
        name: 'Euler Motors, Ambattur',
        slug: 'ambattur',
        badges: ['Dealer', 'Service'],
        address: 'Ambattur Industrial Estate, Chennai 600058',
        city: 'Chennai',
        state: 'Tamil Nadu',
        hours: 'Open until 7 pm',
        operatingDays: 'Mon - Fri',
        distance: '1,338',
        phone: '1800 000 0000',
        order: 4,
      },
    ];

    for (const d of dealersToSeed) {
      let doc = existingDealers.find((ed: any) => ed.slug === d.slug || ed.name === d.name);
      if (!doc) {
        doc = await strapi.documents('api::dealer.dealer').create({
          data: d,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Created dealer: ${d.name}`);
      } else {
        doc = await strapi.documents('api::dealer.dealer').update({
          documentId: doc.documentId,
          data: d,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Updated dealer: ${d.name}`);
      }
      dealerIds.push(doc.documentId);
    }

    const existingChargingStations = await strapi.documents('api::charging-station.charging-station').findMany();
    const chargingStationIds: string[] = [];
    const chargingStationsToSeed = [
      {
        name: 'Euler Fast Charge, Andheri MIDC',
        slug: 'fast-charge-andheri',
        address: 'Marol MIDC, opposite Gate 2, Andheri East',
        city: 'Mumbai',
        hours: 'Open 24 hours',
        badges: ['CCS2', '60 kW', '4 of 6 free'],
        distance: '13',
        phone: '1800 000 0000',
        order: 1,
      },
      {
        name: 'Partner Hub, Bhiwandi',
        slug: 'partner-hub-bhiwandi',
        address: 'Marol MIDC, opposite Gate 2, Andheri East',
        city: 'Mumbai',
        hours: 'Open 24 hours',
        badges: ['CCS2', '11 of 14 free'],
        distance: '18.9',
        phone: '1800 000 0000',
        order: 2,
      },
      {
        name: 'Euler Depot Charge, Vashi',
        slug: 'depot-charge-vashi',
        address: 'Marol MIDC, opposite Gate 2, Andheri East',
        city: 'Mumbai',
        hours: 'Open 24 hours',
        badges: ['CCS2', 'Depot', '6 of 8 free'],
        distance: '22.5',
        phone: '1800 000 0000',
        order: 3,
      },
      {
        name: 'Euler Fast Charge, Andheri East',
        slug: 'fast-charge-andheri-east',
        address: 'Marol MIDC, opposite Gate 2, Andheri East',
        city: 'Mumbai',
        hours: 'Open 24 hours',
        badges: ['CCS2', '60 kW', '4 of 6 free'],
        distance: '13',
        phone: '1800 000 0000',
        order: 4,
      },
    ];

    for (const cs of chargingStationsToSeed) {
      let doc = existingChargingStations.find((ecs: any) => ecs.slug === cs.slug || ecs.name === cs.name);
      if (!doc) {
        doc = await strapi.documents('api::charging-station.charging-station').create({
          data: cs,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Created charging station: ${cs.name}`);
      } else {
        doc = await strapi.documents('api::charging-station.charging-station').update({
          documentId: doc.documentId,
          data: cs,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Updated charging station: ${cs.name}`);
      }
      chargingStationIds.push(doc.documentId);
    }

    const existingServiceCenters = await strapi.documents('api::service-center.service-center').findMany();
    const serviceCenterIds: string[] = [];
    const serviceCentersToSeed = [
      {
        name: 'Euler Motors — Kandivali Service Hub',
        slug: 'kandivali-service',
        address: 'Akurli Metro Station, Kandivali East, Mumbai',
        city: 'Mumbai',
        hours: 'Open until 8 pm',
        operatingDays: 'Mon - Sat',
        badges: ['Service', 'Spares', 'Express Bay'],
        distance: '1.3',
        phone: '1800 000 0000',
        order: 1,
      },
      {
        name: 'Euler Authorized Service Center, Andheri',
        slug: 'andheri-service',
        address: 'Saki Vihar Road, Marol MIDC, Andheri East, Mumbai',
        city: 'Mumbai',
        hours: 'Open 8 am to 8 pm',
        operatingDays: 'Mon - Sat',
        badges: ['Service', 'Battery Check', 'Body Shop'],
        distance: '5.8',
        phone: '1800 000 0000',
        order: 2,
      },
      {
        name: 'Euler Service Point, Navi Mumbai',
        slug: 'turbhe-service',
        address: 'MIDC Industrial Area, Turbhe, Navi Mumbai',
        city: 'Mumbai',
        hours: 'Open until 7 pm',
        operatingDays: 'Mon - Sat',
        badges: ['Service', 'Fleet Repair'],
        distance: '21.4',
        phone: '1800 000 0000',
        order: 3,
      },
      {
        name: 'Euler Central Workshop, Thane',
        slug: 'thane-service',
        address: 'Arun Arcade, Chitalsar, Manpada, Thane West',
        city: 'Mumbai',
        hours: 'Open 24 hours',
        operatingDays: 'Mon - Sat',
        badges: ['Service', 'Spares', 'Major Repairs'],
        distance: '32.0',
        phone: '1800 000 0000',
        order: 4,
      },
      {
        name: 'Euler Motors Service, Ambattur',
        slug: 'ambattur-service',
        address: 'Ambattur Industrial Estate, Chennai 600058',
        city: 'Chennai',
        hours: 'Open until 7 pm',
        operatingDays: 'Mon - Sat',
        badges: ['Service', 'Authorized'],
        distance: '1,338',
        phone: '1800 000 0000',
        order: 5,
      },
    ];

    for (const sc of serviceCentersToSeed) {
      let doc = existingServiceCenters.find((esc: any) => esc.slug === sc.slug || esc.name === sc.name);
      if (!doc) {
        doc = await strapi.documents('api::service-center.service-center').create({
          data: sc,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Created service center: ${sc.name}`);
      } else {
        doc = await strapi.documents('api::service-center.service-center').update({
          documentId: doc.documentId,
          data: sc,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Updated service center: ${sc.name}`);
      }
      serviceCenterIds.push(doc.documentId);
    }

    const CHARGING_POINT_FAQS = [
      // 1. General
      {
        question: 'What makes Euler Motors different from other commercial EV manufacturers?',
        answer: 'Euler Motors focuses on electric commercial vehicles designed for Indian business operations, combining high payload capacity, real-world range, connected technology, and reliable charging and service support.',
        category: 'General',
        order: 1,
      },
      {
        question: 'Which Euler electric goods vehicles can I choose from?',
        answer: 'Euler Motors’ current product portfolio is divided into two categories: 4-wheelers (4W) and 3-wheelers (3W). The 4W category includes the Turbo EV 1000, Storm EV LongRange 200, and Storm EV T1500, while the 3W category comprises the HiLoad EV. Each vehicle is designed to meet different cargo and operational requirements.',
        category: 'General',
        order: 2,
      },
      {
        question: 'How can I calculate whether an Euler EV will be profitable for my business?',
        answer: 'Use the Total Cost of Ownership (TCO) Calculator on the website. Enter your vehicle choice, daily distance and ownership period to compare estimated operating economics. Actual results depend on your inputs and operating conditions.',
        category: 'General',
        order: 3,
      },
      {
        question: 'How can I find the right Euler vehicle for my business needs?',
        answer: 'Share your daily running distance, load requirements and delivery routes with the Euler Motors team. You can also book a test drive to assess which vehicle best suits your business.',
        category: 'General',
        order: 4,
      },
      {
        question: 'How can I find charging stations or get service support for my Euler vehicle?',
        answer: 'Use the Charging Station Locator to find charging points near you. For service-related assistance and vehicle queries, explore Euler Prime or contact the customer support team.',
        category: 'General',
        order: 5,
      },
      {
        question: 'How can I contact Euler Motors for sales or service support?',
        answer: 'For new vehicle enquiries, call 1800-1238-1238. For service complaints, call 1800-2128-2128 or email customer.help@eulermotors.com',
        category: 'General',
        order: 6,
      },

      // 2. Vehicles
      {
        question: 'Which Euler EV is suitable for carrying loads of approximately one tonne?',
        answer: 'The Euler Turbo EV 1000 is designed for commercial cargo operations with a payload capacity of approximately 1,000 kg. It is suitable for businesses involved in deliveries, logistics and goods transportation. Explore its specifications to check whether it meets your load capacity, range and operational requirements.',
        category: 'Vehicles',
        order: 7,
      },
      {
        question: 'Which Euler vehicle should I consider for heavier cargo?',
        answer: 'The Storm EV LR200 and Storm EV T1500 both offer a payload capacity of up to 1,500 kg. The LR200 offers a 200+ km real-world range and a 10-foot load deck, while the T1500 offers a 140+ km real-world range and 220 or 260 cu. ft. cargo options. Choose based on your typical load, daily distance and cargo-space requirements.',
        category: 'Vehicles',
        order: 8,
      },
      {
        question: 'What is the advertised real-world range of Euler’s current goods vehicles?',
        answer: 'Euler Motors’ RealRange™ claims are based on certified payload and driving behaviour under real-world test conditions. The listed ranges are 180+ km* for the Turbo EV 1000, 200+ km* for the Storm EV LongRange200 and 140+ km* for the Storm EV T1500. Actual range may vary depending on load, driving behaviour and operating conditions.',
        category: 'Vehicles',
        order: 9,
      },
      {
        question: 'How do I choose between Storm EV LongRange200 and Storm EV T1500?',
        answer: 'Compare both vehicles based on RealRange™, deck length, charging infrastructure available on your routes, ground clearance and battery capacity. The Storm EV LongRange200 offers a listed RealRange™ of 200+ km*, while the Storm EV T1500 offers 140+ km*. Both are listed with a payload capacity of up to 1,500 kg. Consider your daily travel distance, cargo dimensions, road conditions and charging access before deciding.',
        category: 'Vehicles',
        order: 10,
      },
      {
        question: 'Can I book a test drive before purchasing an Euler vehicle?',
        answer: 'Yes. Use the Book a Test Ride page to submit an enquiry and connect with the team about a test drive near you.',
        category: 'Vehicles',
        order: 11,
      },
      {
        question: 'Where can I find the detailed specifications of an Euler vehicle?',
        answer: 'Visit the relevant product page or download the official brochure from Euler Motors for model-specific features and specifications.',
        category: 'Vehicles',
        order: 12,
      },

      // 3. Charging
      {
        question: 'Where can I find an Euler-compatible charging station near me?',
        answer: 'Use the Charging Network locator or Shepherd App to search for nearby stations, check location information and navigate to a selected charging point.',
        category: 'Charging',
        order: 13,
      },
      {
        question: 'How much range can I add in 15 minutes at an Euler fast charger?',
        answer: 'Euler Motors offers two fast-charging connector options: CCS2 and GB/T. The range added in 15 minutes varies by vehicle and connector type:\n- CCS2: Turbo EV 1000 adds up to 50 km, while Storm EV LongRange200 adds up to 100 km.\n- GB/T: Storm EV T1500 adds up to 50 km.\nActual range gained may vary depending on charging conditions, battery state of charge and operating conditions.',
        category: 'Charging',
        order: 14,
      },
      {
        question: 'Can I charge my Euler goods vehicle at home, at my shop or at my warehouse?',
        answer: 'Euler lists onboard charging for home charging. The vehicle’s charger specifications and your electrical setup determine what installation or connection is suitable. Confirm the requirements for your particular model.',
        category: 'Charging',
        order: 15,
      },
      {
        question: 'Which public charging connectors are supported by Euler vehicles?',
        answer: 'Euler Motors offers two public fast-charging connector options: CCS2 and GB/T. Compatibility varies by vehicle model, so check your vehicle’s specifications and the charging station’s connector type before charging.',
        category: 'Charging',
        order: 16,
      },
      {
        question: 'How do I plan charging stops for my delivery fleet?',
        answer: 'Use the charging locator and Shepherd App to identify stations around your routes. Factor in daily distance, load, charging time and operating schedules when planning stops.',
        category: 'Charging',
        order: 17,
      },
      {
        question: 'Who are Euler Motors’ charging network partners?',
        answer: 'Euler motors have charging network partners in multiple domains such as CPO, Charger manufacturers and Aggregators. This includes TATA Power EZ, Jio bp, Kazam, Delta Electronics, Exicom, Statiq, Pulse Energy, Spotcharge and more. Euler motors Shepherd application provides charging station locator for stations available at your route.',
        category: 'Charging',
        order: 18,
      },

      // 4. Service
      {
        question: 'What is Euler Prime?',
        answer: 'Euler Prime is Euler Motors’ doorstep service solution, bringing trained technicians and vehicle servicing directly to your location to help minimise downtime and keep your business moving.',
        category: 'Service',
        order: 19,
      },
      {
        question: 'Can Euler Motors service my vehicle at my warehouse/shop/store?',
        answer: 'Euler Prime is designed to bring service to your location. Contact Euler’s service team to confirm coverage and arrange support for your vehicle at warehouse/shop/store.',
        category: 'Service',
        order: 20,
      },
      {
        question: 'How do I request repair or maintenance support through Shepherd?',
        answer: 'Euler describes the Shepherd App as a way to request repair and maintenance support. Its connected features also include maintenance alerts and vehicle performance information.',
        category: 'Service',
        order: 21,
      },
      {
        question: 'How do I find the nearest authorised Euler service centre?',
        answer: 'Visit the Service Network page and search by city to find listed centres and their contact details.',
        category: 'Service',
        order: 22,
      },
      {
        question: 'How do I report a service complaint?',
        answer: 'Call Euler Motors’ service complaints helpline at 1800-2128-2128, or contact customer.help@eulermotors.com',
        category: 'Service',
        order: 23,
      },
      {
        question: 'Where can I check my Euler vehicle’s battery warranty?',
        answer: 'Check the warranty documentation for your specific model or contact an authorised Euler representative. Warranty coverage and duration should be confirmed against the applicable vehicle terms.',
        category: 'Service',
        order: 24,
      },
    ];

    strapi.log.info('[Seeder] Seeding 24 Charging Point FAQs into collection api::faq.faq...');
    for (const faq of CHARGING_POINT_FAQS) {
      const existing = await strapi.documents('api::faq.faq').findFirst({
        filters: { question: faq.question },
      });
      if (!existing) {
        await strapi.documents('api::faq.faq').create({
          data: faq,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Created FAQ: "${faq.question.slice(0, 45)}..."`);
      } else {
        await strapi.documents('api::faq.faq').update({
          documentId: existing.documentId,
          data: faq,
          status: 'published',
        });
        strapi.log.info(`[Seeder] Updated FAQ: "${faq.question.slice(0, 45)}..."`);
      }
    }

    const sharedChargingFaqSection = {
      eyebrow: 'FAQ',
      title: 'Frequently Asked Questions',
      image: chargingFaqMapId,
      items: CHARGING_POINT_FAQS.map((f) => ({
        question: f.question,
        answer: f.answer,
        category: f.category,
      })),
    };

    const sharedChargingContactSection = {
      eyebrow: 'NEXT STEP',
      title: 'Host a charging point.',
      mobileTitle: 'Host a charging point.',
      description:
        'Have land, a warehouse or a petrol pump on a freight route? Host an Euler charging point and earn from it.',
      mobileDescription:
        'Have land, a warehouse or a petrol pump on a freight route? Host an Euler charging point and earn from it.',
      backgroundImage: chargingContactBgId,
      cards: [
        {
          icon: 'phone',
          title: '1800 000 0000',
          detail: '9 am to 8 pm Monday to Saturday',
          mobileOrder: 'order-1',
        },
        {
          icon: 'email',
          title: 'partners@eulermotors.com',
          detail: 'For charging and depot partners',
          mobileOrder: 'order-2',
        },
        {
          icon: 'location',
          title: 'Find your nearest dealer',
          detail: '112 locations, 24 states',
          mobileOrder: 'order-3',
        },
      ],
      form: {
        heading: 'Book a test drive',
        subheading: 'Two steps. We call you within one working day.',
        nameLabel: 'Name',
        namePlaceholder: 'Full name',
        nameRequired: true,
        mobileLabel: 'Mobile number',
        mobilePlaceholder: '10 digit',
        mobileRequired: true,
        cityLabel: 'City',
        cityPlaceholder: 'Mumbai',
        cityRequired: true,
        dropdownLabel: 'What you have',
        dropdownOptions: 'Petrol Pump, Warehouse, Land',
        dropdownRequired: false,
        ctaLabel: 'Send enquiry',
        privacyNotice: 'Euler Motors may contact me about this enquiry.',
        disclaimer: 'We never share your number with anyone else. No spam calls.',
      },
      formHeading: 'Book a test drive',
      formSubheading: 'Two steps. We call you within one working day.',
      nameLabel: 'Name',
      namePlaceholder: 'Full name',
      nameRequired: true,
      mobileLabel: 'Mobile number',
      mobilePlaceholder: '10 digit',
      mobileRequired: true,
      cityLabel: 'City',
      cityPlaceholder: 'Mumbai',
      cityRequired: true,
      dropdownLabel: 'What you have',
      dropdownOptions: 'Petrol Pump, Warehouse, Land',
      dropdownRequired: false,
      ctaLabel: 'Send enquiry',
      privacyNotice: 'Euler Motors may contact me about this enquiry.',
      disclaimer: 'We never share your number with anyone else. No spam calls.',
    };

    const sharedPartnersSection = {
      eyebrow: 'PARTNERS AND INVESTORS',
      title: 'Trusted network partners',
      partners: [
        {
          name: 'QRG',
          logo: partnerQrgId,
        },
        {
          name: 'Moglix',
          logo: partnerMoglixId,
        },
        {
          name: 'JETTY Ventures',
          logo: partnerJettyId,
        },
        {
          name: 'BLUME',
          logo: partnerBlumeId,
        },
        {
          name: 'GIC',
          logo: partnerGicId,
        },
      ],
    };

    const dealerLocatorPageData = {
      hero: {
        supportBadge: 'Support',
        dealerTabLabel: 'Dealer Locator',
        dealerTabTitle: 'Find your nearest Euler showroom',
        dealerTabSubtitle:
          'Explore our showroom network to find the right team for vehicle enquiries, purchases, and support near you.',
        dealerSearchPlaceholder: 'Search dealers by area',
        chargingTabLabel: 'Charging Stations',
        chargingTabTitle: 'Find a charging station near you.',
        chargingTabSubtitle: 'Locate nearby charging points and plan your next stop with confidence.',
        chargingSearchPlaceholder: 'Search charging points by area',
        serviceTabLabel: 'Service Centers',
        serviceTabTitle: 'Find a service centre near you.',
        serviceTabSubtitle:
          'Get the right support for your Euler vehicle, from routine maintenance to service and repairs.',
        serviceSearchPlaceholder: 'Search service centers by area',
        cities: 'Hyderabad, Delhi NCR, Bengaluru, Mumbai, Ahmedabad, Kolkata',
        defaultCity: 'Mumbai',
        locationButtonLabel: 'Use my current location',
        dealerResultsLabel: 'Dealers Found',
        chargingResultsLabel: 'Charging Points',
        serviceResultsLabel: 'Service Centers Found',
        directionsButtonLabel: 'Get Directions',
        distanceUnit: 'km',
        emptyStateText: 'No matching locations found.',
        mapImage: dealerMapId,
        dealers: dealerIds,
        chargingStations: chargingStationIds,
        serviceCenters: serviceCenterIds,
      },
      contactSection: {
        eyebrow: 'Need help choosing the best',
        desktopTitle: 'Let’s find the right Euler showroom for you',
        mobileTitle: 'Let’s find the right Euler showroom for you',
        desktopDescription:
          'Share your location and contact details. We’ll help you find and connect with the nearest Euler Motors showroom.',
        mobileDescription:
          'Share your location and contact details. We’ll help you find and connect with the nearest Euler Motors showroom.',
        backgroundImage: dealerContactBgId,
        cards: [
          {
            icon: 'phone',
            title: '1800 000 0000',
            detail: '9 am to 8 pm Monday to Saturday',
            mobileOrder: 'order-1',
          },
          {
            icon: 'email',
            title: 'fleet@eulermotors.com',
            detail: 'For fleets over 50 vehicles',
            mobileOrder: 'order-2 lg:order-3',
          },
          {
            icon: 'location',
            title: 'Find your nearest dealer',
            detail: '112 locations, 24 states',
            mobileOrder: 'order-3 lg:order-2',
          },
        ],
        form: {
          heading: 'What are you looking for?',
          subheading: 'Two steps. We call you within one working day.',
          vehicleOptions:
            'Storm EV LongRange 200, Storm EV T1500, HiLoad EV, Turbo EV 1000, Neo HiRange, Neo HiCity',
          tabs: [
            {
              tabTitle: 'Test drive',
              nameLabel: 'Name',
              namePlaceholder: 'Full name',
              nameRequired: true,
              phoneLabel: 'Mobile number',
              phonePlaceholder: '10 digit',
              phoneRequired: true,
              vehicleLabel: 'Which vehicle',
              vehiclePlaceholder: 'Not sure, please suggest one',
              vehicleRequired: true,
              cityLabel: 'City',
              cityPlaceholder: 'Mumbai',
              cityRequired: true,
              customFieldLabel: 'Kilometres per day',
              customFieldPlaceholder: '150',
              customFieldRequired: true,
              ctaLabel: 'Confirm test drive',
            },
            {
              tabTitle: 'Price enquiry',
              nameLabel: 'Name',
              namePlaceholder: 'Full name',
              nameRequired: true,
              phoneLabel: 'Mobile number',
              phonePlaceholder: '10 digit',
              phoneRequired: true,
              vehicleLabel: 'Which vehicle',
              vehiclePlaceholder: 'Not sure, please suggest one',
              vehicleRequired: true,
              cityLabel: 'City',
              cityPlaceholder: 'Mumbai',
              cityRequired: true,
              customFieldLabel: 'Quantity of vehicles',
              customFieldPlaceholder: '5',
              customFieldRequired: true,
              ctaLabel: 'Get price list',
            },
            {
              tabTitle: 'Fleet solutions',
              nameLabel: 'Company name',
              namePlaceholder: 'Company',
              nameRequired: true,
              phoneLabel: 'Mobile number',
              phonePlaceholder: '10 digit',
              phoneRequired: true,
              vehicleLabel: 'Which vehicle',
              vehiclePlaceholder: 'Not sure, please suggest one',
              vehicleRequired: true,
              cityLabel: 'City',
              cityPlaceholder: 'Mumbai',
              cityRequired: true,
              customFieldLabel: 'Fleet size',
              customFieldPlaceholder: 'Number of vehicles',
              customFieldRequired: true,
              ctaLabel: 'Talk to our fleet team',
            },
          ],
          privacyNotice:
            'Euler Motors and its dealers may contact me about this enquiry. Privacy policy.',
          disclaimer: 'We never share your number with anyone else. No spam calls.',
          thankYouMessage: 'Thank you! We will call you within one working day.',
        },
      },
      seo: {
        metaTitle: 'Find an Euler Motors Dealer, Charging Station, or Service Center Near You',
        metaDescription: 'Locate authorized Euler Motors dealers, fast charging stations, and certified service centers across India. Book a doorstep test drive today.',
        keywords: 'euler dealer locator, euler service center, ev charging station, euler motors showroom',
      },
    };

    const existingDealerPage = await strapi.documents('api::dealer-locator-page.dealer-locator-page').findFirst({
      fields: ['documentId'],
    });
    if (!existingDealerPage) {
      const created = await strapi.documents('api::dealer-locator-page.dealer-locator-page').create({
        data: dealerLocatorPageData,
        status: 'published',
      });
      strapi.log.info(`[Seeder] Created Dealer Locator Page singleType successfully! (${created.documentId})`);
    } else {
      const updated = await strapi.documents('api::dealer-locator-page.dealer-locator-page').update({
        documentId: existingDealerPage.documentId,
        data: dealerLocatorPageData,
        status: 'published',
      });
      strapi.log.info(`[Seeder] Updated Dealer Locator Page singleType successfully! (${updated.documentId})`);
    }

    const chargingStationsPageData = {
      hero: {
        supportBadge: 'Support',
        dealerTabLabel: 'Dealer Locator',
        dealerTabTitle: 'Find your nearest Euler showroom',
        dealerTabSubtitle:
          'Explore our showroom network to find the right team for vehicle enquiries, purchases, and support near you.',
        dealerSearchPlaceholder: 'Search dealers by area',
        chargingTabLabel: 'Charging Stations',
        chargingTabTitle: 'Find a charging station near you.',
        chargingTabSubtitle: 'Locate nearby charging points and plan your next stop with confidence.',
        chargingSearchPlaceholder: 'Search charging points by area',
        serviceTabLabel: 'Service Centers',
        serviceTabTitle: 'Find a service centre near you.',
        serviceTabSubtitle:
          'Get the right support for your Euler vehicle, from routine maintenance to service and repairs.',
        serviceSearchPlaceholder: 'Search service centers by area',
        cities: 'Hyderabad, Delhi NCR, Bengaluru, Mumbai, Ahmedabad, Kolkata',
        defaultCity: 'Mumbai',
        locationButtonLabel: 'Use my current location',
        dealerResultsLabel: 'Dealers Found',
        chargingResultsLabel: 'Charging Points',
        serviceResultsLabel: 'Service Centers Found',
        directionsButtonLabel: 'Get Directions',
        distanceUnit: 'km',
        emptyStateText: 'No matching locations found.',
        mapImage: dealerMapId,
        dealers: dealerIds,
        chargingStations: chargingStationIds,
        serviceCenters: serviceCenterIds,
      },
      partnersSection: sharedPartnersSection,
      faqSection: sharedChargingFaqSection,
      chargingContactSection: sharedChargingContactSection,
      seo: {
        metaTitle: 'Find an EV Charging Point Across India | Euler Motors',
        metaDescription: '1,412 fast charging points across India, with live status on each one.',
        keywords: 'ev charging station, euler fast charge, commercial ev charger, ccs2 charging india',
      },
    };

    const existingChargingPage = await strapi.documents('api::charging-stations-page.charging-stations-page').findFirst({
      fields: ['documentId'],
    });
    if (!existingChargingPage) {
      const created = await strapi.documents('api::charging-stations-page.charging-stations-page').create({
        data: chargingStationsPageData,
        status: 'published',
      });
      strapi.log.info(`[Seeder] Created Charging Stations Page singleType successfully! (${created.documentId})`);
    } else {
      const updated = await strapi.documents('api::charging-stations-page.charging-stations-page').update({
        documentId: existingChargingPage.documentId,
        data: chargingStationsPageData,
        status: 'published',
      });
      strapi.log.info(`[Seeder] Updated Charging Stations Page singleType successfully! (${updated.documentId})`);
    }

    // 4.5. Seed Career Positions & Careers Page Single Type
    await seedCareersPage(strapi);

    // 4.6. Seed Technology Page Single Type
    await seedTechnologyPage(strapi);

    // 4.7. Seed About Page Single Type & Collections
    await seedAboutPage(strapi);

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
        'api::about-page.about-page.find',
        'api::timeline-milestone.timeline-milestone.find',
        'api::timeline-milestone.timeline-milestone.findOne',
        'api::leadership-member.leadership-member.find',
        'api::leadership-member.leadership-member.findOne',
        'api::award.award.find',
        'api::award.award.findOne',
        'api::esg-report.esg-report.find',
        'api::esg-report.esg-report.findOne',
        'api::careers-page.careers-page.find',
        'api::career-position.career-position.find',
        'api::career-position.career-position.findOne',
        'api::dealer-locator-page.dealer-locator-page.find',
        'api::charging-stations-page.charging-stations-page.find',
        'api::dealer.dealer.find',
        'api::dealer.dealer.findOne',
        'api::charging-station.charging-station.find',
        'api::charging-station.charging-station.findOne',
        'api::service-center.service-center.find',
        'api::service-center.service-center.findOne',
        'api::faq.faq.find',
        'api::faq.faq.findOne',
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

/**
 * Targeted Technology Page Seeder
 * Uploads Technology Page WebP assets and creates/publishes `api::technology-page.technology-page`
 * without disturbing existing data on other pages.
 */
export async function seedTechnologyPage(strapi: any) {
  strapi.log.info('[Seeder] Starting Technology Page singleType seeding...');

  async function resolveExistingOrUpload(relPath: string, targetFilename: string, altText: string) {
    const existing = await strapi.query('plugin::upload.file').findOne({
      where: { name: targetFilename },
    });
    if (existing) return existing.id;
    return uploadMediaIfMissing(strapi, relPath, targetFilename, altText);
  }

  // Reused Technology media IDs (17..23 if already uploaded)
  const mfgPlantImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/mfg__imgRectangle1618873365.png',
    'mfg-plant.webp',
    'Euler Motors Manufacturing Facility'
  );
  const shepDashboardImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/shep__imgImage749.png',
    'shepherd-dashboard.webp',
    'Shepherd Fleet Dashboard'
  );
  const loadDriveImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/load-card-drive-exact.png',
    'load-card-drive.webp',
    'Euler Full Load Drive Performance'
  );
  const loadPayloadImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/load-card-payload-exact.png',
    'load-card-payload.webp',
    'Euler Heavy Payload Handling'
  );
  const kvMotorImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/kv__imgChatGpt2.png',
    'kv-motor.webp',
    'Euler Electric Motor'
  );
  const kvBatteryImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/kv__imgChatGpt3.png',
    'kv-battery.webp',
    'Euler Liquid Cooled Battery'
  );
  const kvChargingImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/kv__imgChatGpt4.png',
    'kv-charging.webp',
    'Euler Fast Charging'
  );

  // Dedicated Technology Page WebP assets
  const techHeroDesktopImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/tech-hero-desktop.webp',
    'tech-hero-desktop.webp',
    'Euler Motors Technology Hero'
  );
  const techHeroMobileImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/tech-hero-mobile.webp',
    'tech-hero-mobile.webp',
    'Euler Motors Technology Mobile Hero'
  );
  const philCostIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/philosophy-cost.webp',
    'tech-philosophy-cost.webp',
    'Lower Running Cost'
  );
  const philDowntimeIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/philosophy-downtime.webp',
    'tech-philosophy-downtime.webp',
    'Less Downtime'
  );
  const philServiceIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/philosophy-service.webp',
    'tech-philosophy-service.webp',
    'Easy to Service'
  );
  const roadDustIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/road-dust.webp',
    'tech-road-dust.webp',
    'Dust Protection IP67'
  );
  const roadRainIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/road-rain.webp',
    'tech-road-rain.webp',
    'Monsoon & Water Sealing'
  );
  const roadLoadIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/road-load.webp',
    'tech-road-load.webp',
    'Heavy Load Steel Frame'
  );
  const roadDailyIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/road-daily.webp',
    'tech-road-daily.webp',
    'Daily Commercial Use'
  );
  const roadHeatIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/road-heat.webp',
    'tech-road-heat.webp',
    'Liquid Cooling Heat Management'
  );
  const kvDiagramImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/tech-kv-diagram.webp',
    'tech-kv-diagram.webp',
    'Euler Commercial EV Component Diagram'
  );
  const chargingShowcaseImgId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/tech-charging-showcase.webp',
    'tech-charging-showcase.webp',
    'Euler Charging Station Setup'
  );
  const techFaqImgId = await resolveExistingOrUpload(
    'public/assets/charging-station-faq/location-map.webp',
    'tech-faq-support.webp',
    'Customer support team member helping with a vehicle question'
  );
  const shepLiveTrackingIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/shep-live-tracking.webp',
    'shep-live-tracking.webp',
    'Live tracking icon'
  );
  const shepTripHistoryIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/shep-trip-history.webp',
    'shep-trip-history.webp',
    'Trip history icon'
  );
  const shepChargingStatusIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/shep-charging-status.webp',
    'shep-charging-status.webp',
    'Charging status icon'
  );
  const shepVehicleHealthIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/shep-vehicle-health.webp',
    'shep-vehicle-health.webp',
    'Vehicle Health & Service icon'
  );
  const shepRemoteDiagIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/shep-remote-diagnostics.webp',
    'shep-remote-diagnostics.webp',
    'Remote diagnostics icon'
  );
  const shepPerfReportsIconId = await resolveExistingOrUpload(
    'public/assets/technology-page/icons/shep-performance-reports.webp',
    'shep-performance-reports.webp',
    'Performance reports icon'
  );

  // Link published Customer Reviews cleanly
  const publishedReviews = await strapi.documents('api::review.review').findMany({
    status: 'published',
    sort: 'order:asc',
  });
  const reviewDocIds = Array.from(
    new Set(publishedReviews.map((r: any) => r.documentId).filter(Boolean))
  );

  const technologyPageData = {
    hero: {
      eyebrow: 'Technology',
      title: 'Built Smarter.\nBuilt for Business.',
      subtitle: 'Every innovation is designed for everyday business.',
      cta: {
        label: 'Book a test drive',
        href: '/products',
        variant: 'primary',
      },
      desktopImage: techHeroDesktopImgId,
      mobileImage: techHeroMobileImgId,
      uptimeValue: '96.4',
      uptimeUnit: '%',
      uptimeDescription: 'Fleet uptime last year, across 15,000 vehicles',
      philosophyEyebrow: 'Philosophy',
      philosophyTitle: 'Technology That Helps You Earn More',
      philosophyDescription:
        "A commercial vehicle is part of your business. That's why every technology we build is designed to reduce costs.",
      philosophyCards: [
        {
          title: 'Lower Running Cost',
          description: 'Spend less on every kilometre you drive.',
          icon: philCostIconId,
        },
        {
          title: 'Less Downtime',
          description: 'Built for reliable everyday performance.',
          icon: philDowntimeIconId,
        },
        {
          title: 'Easy to Service',
          description: 'Quick repairs and readily available support.',
          icon: philServiceIconId,
        },
      ],
    },
    loadSection: {
      eyebrow: 'Load',
      title: 'Rated with weight on it.',
      subtitle: 'Payload, range and gradient are quoted loaded. Empty numbers help nobody.',
      cards: [
        {
          eyebrow: 'Load',
          title: 'Rated with weight on it.',
          description: 'Payload, range and gradient are quoted\nloaded. Empty numbers help nobody.',
          image: loadDriveImgId,
          statValue: '1,500',
          statUnit: 'kg',
          statLabel: 'payload, rated',
        },
        {
          eyebrow: 'Payload',
          title: 'Carry More Every Trip',
          description: 'Built to carry heavy loads without compromising performance.',
          image: loadPayloadImgId,
          statValue: '1,500',
          statUnit: 'kg',
          statLabel: 'Maximum Payload',
        },
      ],
    },
    indianRoads: {
      eyebrow: 'Built for here',
      title: 'Built for Indian roads.',
      subtitle:
        'From busy city streets to uneven roads and heavy loads, every detail is built to perform.',
      problemLabel: 'The problem',
      solutionLabel: 'What Euler does',
      cards: [
        {
          condition: 'Dust',
          problem: 'Dust gets into everything and kills electronics.',
          solution: 'The battery box and motor are sealed to IP67. Dust stays outside.',
          icon: roadDustIconId,
        },
        {
          condition: 'Rain',
          problem: 'Flooded roads stop work for days every monsoon.',
          solution: 'The pack is water sealed and the floor is raised. You keep running.',
          icon: roadRainIconId,
        },
        {
          condition: 'Heavy loads',
          problem: 'Overloading is normal, and it breaks lighter vehicles.',
          solution: 'A steel frame rated well past the load on the paperwork.',
          icon: roadLoadIconId,
        },
        {
          condition: 'Daily use',
          problem: 'Two shifts a day wears a vehicle out fast.',
          solution: 'Tested to 200,000 km. Service every 10,000, not every month.',
          icon: roadDailyIconId,
        },
        {
          condition: 'Heat',
          problem: 'Forty five degrees drains a battery and shortens its life.',
          solution: 'Liquid cooling holds the pack in its safe range all summer.',
          icon: roadHeatIconId,
        },
      ],
    },
    manufacturing: {
      eyebrow: 'Manufacturing',
      title: 'Where Every Vehicle Begins',
      description:
        'Packs, drivetrains and final assembly in one building, so a fault found in the field reaches the line that made it.',
      mainImage: mfgPlantImgId,
      mobileImage: mfgPlantImgId,
      videoUrl: '',
      videoBadgeLabel: 'Factory film',
      videoBadgeTag: '',
    },
    knowVehicle: {
      eyebrow: 'The parts',
      title: 'Know Your Vehicle Better',
      subtitle: 'Understand what each key part does and how it helps you on every trip.',
      vehicleImage: kvDiagramImgId,
      whatIsItLabel: 'WHAT IS IT',
      whyMatterLabel: 'WHY DOES IT MATTER',
      businessMeaningLabel: 'WHAT IT MEANS FOR YOUR BUSINESS',
      parts: [
        {
          partName: 'Motor',
          title: 'Full loads, from standstill.',
          whatIsIt: 'A motor that makes its pulling power from zero, with no gearbox.',
          whyDoesItMatter: 'City work is stop and start all day, with weight on board.',
          businessMeaning: 'Up a flyover loaded, without dropping a trip from the route.',
          icon: kvMotorImgId,
        },
        {
          partName: 'Battery',
          title: 'Full range, even in garmi.',
          whatIsIt: 'The Euler battery is water cooled.',
          whyDoesItMatter: 'Batteries lose range above 40 degrees.',
          businessMeaning: 'It maintains range year-round.',
          icon: kvBatteryImgId,
        },
        {
          partName: 'Charging',
          title: 'Where will I charge?',
          whatIsIt: 'Different businesses have different charging needs.',
          whyDoesItMatter: 'Choose the charging setup that works best for your operations.',
          businessMeaning: 'Find compatible charging stations in the Euler app.',
          icon: kvChargingImgId,
        },
      ],
    },
    chargingSection: {
      eyebrow: 'Charging',
      title: 'Where Will I Charge?',
      subtitle:
        'Different businesses have different needs. Choose the charging setup that works best for your operations.',
      homeTabLabel: 'Home',
      publicTabLabel: 'Public',
      homeImage: chargingShowcaseImgId,
      publicImage: chargingShowcaseImgId,
      actionTiles: [
        {
          title: 'How it works',
          subtitle: 'Find it on the app',
          href: '/products',
          iconType: 'app',
        },
        {
          title: 'Charging stations',
          subtitle: 'Find a charging point',
          href: '/charging-stations',
          iconType: 'station',
        },
      ],
      dosTitle: "Do's",
      dos: [
        { text: 'Charge conveniently at home or work whenever possible.' },
        { text: 'Always use verified and compatible charging points.' },
        { text: 'Plan your charging stops before the battery runs low.' },
      ],
      dontsTitle: "Don'ts",
      donts: [
        { text: 'Avoid using unsuitable sockets or unverified charging setups.' },
        { text: 'Never wait until the battery is completely empty.' },
        { text: "Don't skip planning your route around charging points." },
      ],
    },
    faqSection: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      subtitle:
        'Find answers to the most common questions about our vehicles, charging, service, warranty and more.',
      allCategoryLabel: 'All',
      image: techFaqImgId,
      items: [
        {
          question: 'How long does it take to fully charge an EV?',
          answer:
            'Charging time varies by battery capacity and charger type. Using a DC fast charger, you can reach 80% charge in about 30 to 45 minutes, while standard AC charging takes 4 to 6 hours.',
          category: 'General, Charging',
        },
        {
          question: 'What types of charging stations are available?',
          answer:
            'There are three main types: Level 1 (standard household outlet), Level 2 (dedicated home or public charger), and DC fast charging (rapid public stations).',
          category: 'Charging',
        },
        {
          question: 'Can I charge my EV at home?',
          answer:
            'Yes, you can charge your EV at home using a standard 15A wall socket or with an installed dedicated Level 2 wall-box charger for faster overnight charging.',
          category: 'General, Charging',
        },
        {
          question: 'How much does it cost to charge an electric vehicle?',
          answer:
            'Charging costs depend on local electricity tariffs. On average, commercial EV charging costs between ₹1.2 to ₹1.8 per kilometer, which is significantly lower than petrol or diesel.',
          category: 'General, Charging',
        },
        {
          question: 'How do I find nearby charging stations?',
          answer:
            'You can locate nearby compatible charging stations directly in the Euler mobile app with real-time station availability, navigation directions, and socket types.',
          category: 'Charging',
        },
        {
          question: 'Is it safe to charge in the rain?',
          answer:
            'Yes, it is completely safe. EV charging plugs and vehicle inlets are weatherproof (rated IP65/IP67) with built-in safety interlocks that prevent power flow until a secure seal is confirmed.',
          category: 'General, Charging',
        },
      ],
    },
    shepherdSection: {
      eyebrow: 'Shepherd app',
      title: 'Manage Everything in One Place',
      subtitle:
        'Track your vehicles, battery, trips, charging and service updates from one simple dashboard.',
      appImage: shepDashboardImgId,
      cta: {
        label: 'Download the app',
        href: '/products',
        variant: 'outline',
      },
      secondaryCta: {
        label: 'See how it connects',
        href: '/products',
        variant: 'primary',
      },
      features: [
        {
          title: 'Live tracking',
          description: 'Where every vehicle is, updated every ten seconds.',
          icon: shepLiveTrackingIconId,
        },
        {
          title: 'Trip history',
          description: 'Every trip, stop and time on site, per driver.',
          icon: shepTripHistoryIconId,
        },
        {
          title: 'Charging status',
          description: 'What is charging, how far along, and when it is done.',
          icon: shepChargingStatusIconId,
        },
        {
          title: 'Vehicle Health & Service',
          description: 'Monitor vehicle health and service reminders in one place.',
          icon: shepVehicleHealthIconId,
        },
        {
          title: 'Remote diagnostics',
          description: 'Fault codes read from your depot, not from a workshop.',
          icon: shepRemoteDiagIconId,
        },
        {
          title: 'Performance reports',
          description: 'Trips, distance, uptime and cost per kilometre.',
          icon: shepPerfReportsIconId,
        },
      ],
    },
    proofSection: {
      eyebrow: 'Proof',
      title: 'Why businesses trust Euler.',
      stats: [
        { value: '96.4', unit: '%', label: 'Fleet uptime' },
        { value: '1,412', unit: '', label: 'Charging points' },
        { value: '15,000', unit: '+', label: 'Vehicles on the road' },
        { value: '480', unit: 'M', label: 'Kilometres driven' },
      ],
    },
    reviewsSection: {
      eyebrow: 'Customers',
      title: 'Customer reviews',
      description: 'Watch real customers share their experience with Euler Motors.',
      reviews: reviewDocIds,
    },
    contactSection: {
      eyebrow: 'Next step',
      title: 'Tell us what you need!',
      description:
        'We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.',
      phone: '1800 000 0000',
      email: 'fleet@eulermotors.com',
      form: {
        heading: 'What are you looking for?',
        subheading: 'Two steps. We call you within one working day.',
        vehicleOptions:
          'Storm EV LongRange 200, Storm EV T1500, HiLoad EV, Turbo EV 1000, Neo HiRange, Neo HiCity',
        tabs: [
          {
            tabTitle: 'Test drive',
            nameLabel: 'Name',
            namePlaceholder: 'Full name',
            nameRequired: true,
            phoneLabel: 'Mobile number',
            phonePlaceholder: '10 digit',
            phoneRequired: true,
            vehicleLabel: 'Which vehicle',
            vehiclePlaceholder: 'Not sure, please suggest one',
            vehicleRequired: true,
            cityLabel: 'City',
            cityPlaceholder: 'Mumbai',
            cityRequired: true,
            customFieldLabel: 'Kilometres per day',
            customFieldPlaceholder: '150',
            customFieldRequired: true,
            ctaLabel: 'Confirm test drive',
          },
          {
            tabTitle: 'Price enquiry',
            nameLabel: 'Name',
            namePlaceholder: 'Full name',
            nameRequired: true,
            phoneLabel: 'Mobile number',
            phonePlaceholder: '10 digit',
            phoneRequired: true,
            vehicleLabel: 'Which vehicle',
            vehiclePlaceholder: 'Not sure, please suggest one',
            vehicleRequired: true,
            cityLabel: 'City',
            cityPlaceholder: 'Mumbai',
            cityRequired: true,
            customFieldLabel: 'Quantity of vehicles',
            customFieldPlaceholder: '5',
            customFieldRequired: true,
            ctaLabel: 'Get price list',
          },
          {
            tabTitle: 'Fleet solutions',
            nameLabel: 'Company name',
            namePlaceholder: 'Company',
            nameRequired: true,
            phoneLabel: 'Mobile number',
            phonePlaceholder: '10 digit',
            phoneRequired: true,
            vehicleLabel: 'Which vehicle',
            vehiclePlaceholder: 'Not sure, please suggest one',
            vehicleRequired: true,
            cityLabel: 'City',
            cityPlaceholder: 'Mumbai',
            cityRequired: true,
            customFieldLabel: 'Fleet size',
            customFieldPlaceholder: 'Number of vehicles',
            customFieldRequired: true,
            ctaLabel: 'Talk to our fleet team',
          },
        ],
        privacyNotice:
          'Euler Motors and its dealers may contact me about this enquiry. Privacy policy.',
        disclaimer: 'We never share your number with anyone else. No spam calls.',
      },
    },
    seo: {
      metaTitle: 'Technology | Euler Motors',
      metaDescription:
        'Commercial EV engineering built smarter for Indian roads, liquid-cooled battery reliability, fast charging, and the Shepherd fleet platform.',
      keywords:
        'euler motors technology, liquid cooled battery, commercial ev engineering, shepherd app, ip67 electric vehicle',
    },
  };

  const existingTechPage = await strapi.documents('api::technology-page.technology-page').findFirst({
    fields: ['documentId'],
  });
  if (!existingTechPage) {
    const created = await strapi.documents('api::technology-page.technology-page').create({
      data: technologyPageData,
      status: 'published',
    });
    strapi.log.info(`[Seeder] Created Technology Page singleType successfully! (${created.documentId})`);
  } else {
    const updated = await strapi.documents('api::technology-page.technology-page').update({
      documentId: existingTechPage.documentId,
      data: technologyPageData,
      status: 'published',
    });
    strapi.log.info(`[Seeder] Updated Technology Page singleType successfully! (${updated.documentId})`);
  }

  // Ensure Public Role has permission for Technology Page
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (publicRole) {
    const perm = await strapi.query('plugin::users-permissions.permission').findOne({
      where: { action: 'api::technology-page.technology-page.find' },
    });
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
      }
    }
  }
}

/**
 * Targeted About Page Seeder
 * Uploads About Page assets, creates/publishes About collections (`timeline-milestone`,
 * `leadership-member`, `award`, `esg-report`), and creates/publishes `api::about-page.about-page`
 * without disturbing existing data on other pages.
 */
export async function seedAboutPage(strapi: any) {
  strapi.log.info('[Seeder] Starting About Page & collections seeding...');

  async function resolveExistingOrUpload(relPath: string, targetFilename: string, altText: string) {
    const existing = await strapi.query('plugin::upload.file').findOne({
      where: { name: targetFilename },
    });
    if (existing) return existing.id;
    return uploadMediaIfMissing(strapi, relPath, targetFilename, altText);
  }

  // Hero media
  const heroDesktopId = await resolveExistingOrUpload(
    'public/assets/about-euler/desktop-bg-new.png',
    'about-hero-desktop.png',
    'Euler Motors electric vehicles for Indian logistics'
  );
  const heroMobileId = await resolveExistingOrUpload(
    'public/assets/about-euler/mobile-bg-new.png',
    'about-hero-mobile.png',
    'Euler Motors mobile hero background'
  );
  const heroMobileOverlayId = await resolveExistingOrUpload(
    'public/assets/about-euler/mobile-overlay-new.png',
    'about-hero-mobile-overlay.png',
    'Euler Motors commercial EV'
  );

  // Euler mission cards media
  const eulerCard1DesktopId = await resolveExistingOrUpload(
    'public/assets/about-euler/card-1-desktop.png',
    'about-euler-card-1-desktop.png',
    'Built for Businesses'
  );
  const eulerCard1MobileId = await resolveExistingOrUpload(
    'public/assets/about-euler/card-1-mobile.png',
    'about-euler-card-1-mobile.png',
    'Built for Businesses mobile'
  );
  const eulerCard2DesktopId = await resolveExistingOrUpload(
    'public/assets/about-euler/card-2-desktop.png',
    'about-euler-card-2-desktop.png',
    'Every Decision Starts Here'
  );
  const eulerCard2MobileId = await resolveExistingOrUpload(
    'public/assets/about-euler/card-2-mobile.png',
    'about-euler-card-2-mobile.png',
    'Every Decision Starts Here mobile'
  );
  const eulerCard3DesktopId = await resolveExistingOrUpload(
    'public/assets/about-euler/card-3-desktop.png',
    'about-euler-card-3-desktop.png',
    'We Own the Outcome'
  );
  const eulerCard3MobileId = await resolveExistingOrUpload(
    'public/assets/about-euler/card-3-mobile.png',
    'about-euler-card-3-mobile.png',
    'We Own the Outcome mobile'
  );

  // Belief cards media
  const beliefCard1Id = await resolveExistingOrUpload(
    'public/assets/about-euler/belief-card-1.png',
    'about-belief-card-1.png',
    'Built around real business needs'
  );
  const beliefCard2Id = await resolveExistingOrUpload(
    'public/assets/about-euler/belief-card-2.png',
    'about-belief-card-2.png',
    'Designed for Indian roads'
  );
  const beliefCard3Id = await resolveExistingOrUpload(
    'public/assets/about-euler/belief-card-3.png',
    'about-belief-card-3.png',
    'Customer feedback drives innovation'
  );
  const beliefCard4Id = await resolveExistingOrUpload(
    'public/assets/about-euler/belief-card-4.png',
    'about-belief-card-4.png',
    'Reliable performance'
  );

  // Timeline media
  const timeline1Id = await resolveExistingOrUpload(
    'public/assets/timeline/timeline-1.png',
    'about-timeline-1.png',
    'Euler Motors milestone'
  );
  const timeline3Id = await resolveExistingOrUpload(
    'public/assets/timeline/timeline-3.png',
    'about-timeline-3.png',
    'Euler Motors milestone'
  );
  const timelineMobile1Id = await resolveExistingOrUpload(
    'public/assets/timeline/mobile-timeline-1.png',
    'about-timeline-mobile-1.png',
    'Euler Motors milestone mobile'
  );

  // Factory media
  const factoryDesktopId = await resolveExistingOrUpload(
    'public/assets/factory/desktop-bg.png',
    'about-factory-desktop.png',
    'Euler Motors manufacturing facility'
  );
  const factoryMobileId = await resolveExistingOrUpload(
    'public/assets/factory/mobile-bg.png',
    'about-factory-mobile.png',
    'Euler Motors manufacturing facility mobile'
  );

  // Leadership media
  const leaderDesktopIds = [
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-1.png', 'about-leader-desktop-1.png', 'Tarun'),
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-2.png', 'about-leader-desktop-2.png', 'Ravneet'),
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-3.png', 'about-leader-desktop-3.png', 'Swapnil'),
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-4.png', 'about-leader-desktop-4.png', 'Sohil'),
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-5.png', 'about-leader-desktop-5.png', 'Milind'),
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-6.png', 'about-leader-desktop-6.png', 'Sanjeev K.'),
    await resolveExistingOrUpload('public/assets/about-euler/leader-desktop-7.png', 'about-leader-desktop-7.png', 'Harendra'),
  ];
  const leaderMob1Id = await resolveExistingOrUpload('public/assets/about-euler/leader-1-new.png', 'about-leader-mobile-1.png', 'Leadership portrait');
  const leaderMob2Id = await resolveExistingOrUpload('public/assets/about-euler/leader-2-new.png', 'about-leader-mobile-2.png', 'Leadership portrait');
  const leaderMob3Id = await resolveExistingOrUpload('public/assets/about-euler/leader-3-new.png', 'about-leader-mobile-3.png', 'Leadership portrait');
  const leaderMob4Id = await resolveExistingOrUpload('public/assets/about-euler/leader-4-new.png', 'about-leader-mobile-4.png', 'Leadership portrait');
  const leaderMob5Id = await resolveExistingOrUpload('public/assets/about-euler/leader-5-new.png', 'about-leader-mobile-5.png', 'Leadership portrait');

  // Partners logos
  const partnerQrgId = await resolveExistingOrUpload('public/assets/partners-investors/qrg.webp', 'about-partner-qrg.webp', 'QRG');
  const partnerMoglixId = await resolveExistingOrUpload('public/assets/partners-investors/moglix.webp', 'about-partner-moglix.webp', 'Moglix');
  const partnerJettyId = await resolveExistingOrUpload('public/assets/partners-investors/jetty.webp', 'about-partner-jetty.webp', 'JETTY Ventures');
  const partnerBlumeId = await resolveExistingOrUpload('public/assets/partners-investors/blume.webp', 'about-partner-blume.webp', 'BLUME');
  const partnerGicId = await resolveExistingOrUpload('public/assets/partners-investors/gic.webp', 'about-partner-gic.webp', 'GIC');

  // Recognition & Awards media
  const recognitionBgId = await resolveExistingOrUpload('public/assets/awards/desktop-bg.png', 'about-recognition-bg.png', 'Euler Motors recognition awards');
  const awardThumbId = await resolveExistingOrUpload('public/assets/awards/desktop-bg-2.png', 'about-award-thumb.png', 'Euler Motors award trophy');

  // ESG & Reports media
  const esgPhotoId = await resolveExistingOrUpload('public/assets/about-euler/esg-photo.png', 'about-esg-photo.png', 'Euler electric commercial vehicle on a delivery route');
  const reportsPhotoId = await resolveExistingOrUpload('public/assets/about-euler/reports-photo.png', 'about-reports-photo.png', 'Euler Motors ESG reports and disclosures');

  // Hiring media
  const hiringDesktopId = await resolveExistingOrUpload('public/assets/hiring/desktop-bg-new.png', 'about-hiring-desktop.png', 'Join Euler Motors');
  const hiringMobileId = await resolveExistingOrUpload('public/assets/hiring/mobile-bg-new.png', 'about-hiring-mobile.png', 'Join Euler Motors mobile');

  // FAQ map media
  const faqImageId = await resolveExistingOrUpload('public/assets/charging-station-faq/location-map-hq.webp', 'about-faq-location-map.webp', 'Euler charging station location network map');

  // 1. Seed Timeline Milestones collection
  const milestonesData = [
    {
      year: 2018,
      title: 'One thousand vehicles at work.',
      description: 'Enough data from enough routes to design the\nnext one with confidence.',
      badges: ['CCS2', '60 kW', '4 of 6 free'],
      desktopImage: timeline1Id,
      mobileImage: timelineMobile1Id,
      isActive: true,
      order: 1,
    },
    {
      year: 2020,
      title: 'One thousand vehicles at work.',
      description: 'Enough data from enough routes to design the\nnext one with confidence.',
      badges: ['CCS2', '60 kW', '4 of 6 free'],
      desktopImage: timeline3Id,
      mobileImage: timelineMobile1Id,
      isActive: true,
      order: 2,
    },
    {
      year: 2022,
      title: 'One thousand vehicles at work.',
      description: 'Enough data from enough routes to design the\nnext one with confidence.',
      badges: ['CCS2', '60 kW', '4 of 6 free'],
      desktopImage: timeline1Id,
      mobileImage: timelineMobile1Id,
      isActive: true,
      order: 3,
    },
    {
      year: 2024,
      title: 'One thousand vehicles at work.',
      description: 'Enough data from enough routes to design the\nnext one with confidence.',
      badges: ['CCS2', '60 kW', '4 of 6 free'],
      desktopImage: timeline3Id,
      mobileImage: timelineMobile1Id,
      isActive: true,
      order: 4,
    },
    {
      year: 2025,
      title: 'One thousand vehicles at work.',
      description: 'Enough data from enough routes to design the\nnext one with confidence.',
      badges: ['CCS2', '60 kW', '4 of 6 free'],
      desktopImage: timeline1Id,
      mobileImage: timelineMobile1Id,
      isActive: true,
      order: 5,
    },
    {
      year: 2026,
      title: 'One thousand vehicles at work.',
      description: 'Enough data from enough routes to design the\nnext one with confidence.',
      badges: ['CCS2', '60 kW', '4 of 6 free'],
      desktopImage: timeline3Id,
      mobileImage: timelineMobile1Id,
      isActive: true,
      order: 6,
    },
  ];

  for (const item of milestonesData) {
    const existing = await strapi.documents('api::timeline-milestone.timeline-milestone').findFirst({
      filters: { year: item.year },
    });
    if (!existing) {
      await strapi.documents('api::timeline-milestone.timeline-milestone').create({
        data: item,
        status: 'published',
      });
    } else {
      await strapi.documents('api::timeline-milestone.timeline-milestone').update({
        documentId: existing.documentId,
        data: item,
        status: 'published',
      });
    }
  }

  // 2. Seed Leadership Members collection
  const leadersData = [
    { name: 'Tarun', slug: 'tarun', desktopPhoto: leaderDesktopIds[0], mobilePhoto: leaderMob1Id, isActive: true, order: 1 },
    { name: 'Ravneet', slug: 'ravneet', desktopPhoto: leaderDesktopIds[1], mobilePhoto: leaderMob3Id, isActive: true, order: 2 },
    { name: 'Swapnil', slug: 'swapnil', desktopPhoto: leaderDesktopIds[2], mobilePhoto: leaderMob2Id, isActive: true, order: 3 },
    { name: 'Sohil', slug: 'sohil', desktopPhoto: leaderDesktopIds[3], mobilePhoto: leaderMob4Id, isActive: true, order: 4 },
    { name: 'Milind', slug: 'milind', desktopPhoto: leaderDesktopIds[4], mobilePhoto: leaderMob3Id, isActive: true, order: 5 },
    { name: 'Sanjeev K.', slug: 'sanjeev-k', desktopPhoto: leaderDesktopIds[5], mobilePhoto: leaderMob1Id, isActive: true, order: 6 },
    { name: 'Harendra', slug: 'harendra', desktopPhoto: leaderDesktopIds[6], mobilePhoto: leaderMob5Id, isActive: true, order: 7 },
  ];

  for (const member of leadersData) {
    const existing = await strapi.documents('api::leadership-member.leadership-member').findFirst({
      filters: { slug: member.slug },
    });
    if (!existing) {
      await strapi.documents('api::leadership-member.leadership-member').create({
        data: member,
        status: 'published',
      });
    } else {
      await strapi.documents('api::leadership-member.leadership-member').update({
        documentId: existing.documentId,
        data: member,
        status: 'published',
      });
    }
  }

  // 3. Seed Awards collection
  const awardsData = [
    {
      year: '2024',
      title: 'Commercial EV of the year',
      description: 'For moving from one product to a network of dealers and service centres.',
      image: awardThumbId,
      isActive: true,
      order: 1,
    },
    {
      year: '2024',
      title: 'Design award, commercial vehicles',
      description: 'For moving from one product to a network of dealers and service centres.',
      image: awardThumbId,
      isActive: true,
      order: 2,
    },
    {
      year: '2023',
      title: 'Startup of the year, mobility',
      description: 'For moving from one product to a network of dealers and service centres.',
      image: awardThumbId,
      isActive: true,
      order: 3,
    },
    {
      year: '2022',
      title: 'Innovation in battery engineering',
      description: 'For moving from one product to a network of dealers and service centres.',
      image: awardThumbId,
      isActive: true,
      order: 4,
    },
    {
      year: '2021',
      title: 'Best last mile vehicle',
      description: 'For moving from one product to a network of dealers and service centres.',
      image: awardThumbId,
      isActive: true,
      order: 5,
    },
  ];

  for (const award of awardsData) {
    const existing = await strapi.documents('api::award.award').findFirst({
      filters: { title: award.title },
    });
    if (!existing) {
      await strapi.documents('api::award.award').create({
        data: award,
        status: 'published',
      });
    } else {
      await strapi.documents('api::award.award').update({
        documentId: existing.documentId,
        data: award,
        status: 'published',
      });
    }
  }

  // 4. Seed ESG Reports collection
  const reportsData = [
    { title: 'Annual report.pdf', fileSize: '2.4', externalUrl: '/products', iconVariant: 'default', isActive: true, order: 1 },
    { title: 'Sustainability profile.pdf', fileSize: '2.4', externalUrl: '/products', iconVariant: 'default', isActive: true, order: 2 },
    { title: 'ESG Report.pdf', fileSize: '5.4', externalUrl: '/products', iconVariant: 'highlight', isActive: true, order: 3 },
    { title: 'CSR Report.pdf', fileSize: '8.4', externalUrl: '/products', iconVariant: 'default', isActive: true, order: 4 },
  ];

  for (const report of reportsData) {
    const existing = await strapi.documents('api::esg-report.esg-report').findFirst({
      filters: { title: report.title },
    });
    if (!existing) {
      await strapi.documents('api::esg-report.esg-report').create({
        data: report,
        status: 'published',
      });
    } else {
      await strapi.documents('api::esg-report.esg-report').update({
        documentId: existing.documentId,
        data: report,
        status: 'published',
      });
    }
  }

  // 5. Seed About Page Single Type
  const aboutPageData = {
    hero: {
      eyebrow: 'About Euler Motors',
      title: "Driving India's Electric Future",
      description:
        'Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.',
      desktopImage: heroDesktopId,
      mobileImage: heroMobileId,
      mobileOverlayImage: heroMobileOverlayId,
    },
    eulerSection: {
      eyebrow: 'About Euler',
      cards: [
        {
          badge: 'Purpose',
          title: 'Built for Businesses',
          description: 'We build electric commercial vehicles that help businesses move more and spend less.',
          stat: 'Founded in New Delhi, 2018',
          desktopImage: eulerCard1DesktopId,
          mobileImage: eulerCard1MobileId,
        },
        {
          badge: 'Customer First',
          title: 'Every Decision Starts Here',
          description: 'We build around real customer needs, not assumptions.',
          stat: '1000+ Daily Business Trips',
          desktopImage: eulerCard2DesktopId,
          mobileImage: eulerCard2MobileId,
        },
        {
          badge: 'Ownership',
          title: 'We Own the Outcome',
          description: 'We take responsibility for every vehicle on the road, end to end.',
          stat: '24/7 Roadside Support',
          desktopImage: eulerCard3DesktopId,
          mobileImage: eulerCard3MobileId,
        },
      ],
    },
    beliefSection: {
      eyebrow: 'Customers',
      mobileEyebrow: 'Our Belief',
      title: 'Building More Than Electric Vehicles',
      description:
        "At Euler Motors, we believe a commercial vehicle should do more than move goods. It should help businesses grow, reduce running costs and make every working day more productive. That's why every vehicle, every technology and every decision starts with the people who use it every day.",
      cards: [
        { title: 'Built around real business needs', image: beliefCard1Id },
        { title: 'Designed for Indian roads', image: beliefCard2Id },
        { title: 'Customer feedback drives innovation', image: beliefCard3Id },
        { title: 'Reliable performance', image: beliefCard4Id },
      ],
    },
    timelineSection: {
      eyebrow: 'Timeline',
      title: 'Milestones That\nShaped Euler',
      description:
        'Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.',
    },
    factorySection: {
      eyebrow: 'How we build',
      title: 'Inside Our Factory',
      description: 'See how every Euler vehicle is built and tested.',
      cta: {
        label: 'Learn about our technology',
        href: '/technology',
        variant: 'primary',
      },
      desktopImage: factoryDesktopId,
      mobileImage: factoryMobileId,
    },
    leadershipSection: {
      eyebrow: 'OUR LEADERSHIP',
      title: "The People Building\nWhat's Next",
    },
    partnersSection: {
      eyebrow: 'Partners and investors',
      title: 'Trusted by investors.',
      partners: [
        { name: 'QRG', logo: partnerQrgId },
        { name: 'Moglix', logo: partnerMoglixId },
        { name: 'JETTY Ventures', logo: partnerJettyId },
        { name: 'BLUME', logo: partnerBlumeId },
        { name: 'GIC', logo: partnerGicId },
      ],
    },
    recognitionSection: {
      eyebrow: 'Recognition',
      title: 'Awards and recognition.',
      image: recognitionBgId,
    },
    esgSection: {
      eyebrow: 'Esg in Action',
      title: 'Building a Better\nTomorrow',
      description:
        "See how we're creating a positive impact through sustainability, people and responsible business practices.",
      tabs: [
        {
          tabTitle: 'Environment',
          headline: 'Every kilometre driven electric is diesel never burned.',
          summary:
            'Our vehicles replace diesel on routes that run six days a week. The saving turns up in the fuel bill long before it turns up in a report.',
          image: esgPhotoId,
          stats: [
            { value: '480M', unit: 'km', label: 'driven electric' },
            { value: '1,000+', unit: '', label: 'EVs on road' },
            { value: '40', unit: 'cities', label: 'with charging' },
          ],
          cards: [
            {
              number: '01',
              title: 'Emissions cut at the source',
              description:
                'Every Euler on a route takes a diesel vehicle off it. Four hundred and eighty million kilometres so far, none of them burning fuel.',
            },
            {
              number: '02',
              title: 'A second life for every pack',
              description:
                'Packs come back to us at the end of their vehicle life. Cells that still hold charge go to stationary storage, the rest go to a licensed recycler.',
            },
            {
              number: '03',
              title: 'A plant that uses less to build more',
              description:
                'Rooftop solar, LED retrofits and a rebuilt compressed-air system cut the energy used for every vehicle we assemble.',
            },
          ],
        },
        {
          tabTitle: 'People',
          headline: 'Safer workdays on the factory floor and out on the road.',
          summary:
            'We design commercial EVs for driver ergonomics, lower cabin heat and vibration, and invest in continuous training across every plant and service depot.',
          image: esgPhotoId,
          stats: [
            { value: '480M', unit: 'km', label: 'driven electric' },
            { value: '1,000+', unit: '', label: 'EVs on road' },
            { value: '40', unit: 'cities', label: 'with charging' },
          ],
          cards: [
            {
              number: '01',
              title: 'Built for all-day driver comfort',
              description:
                'Zero engine vibration, reduced cabin noise and intuitive controls help commercial drivers finish long shifts with less fatigue.',
            },
            {
              number: '02',
              title: 'Skilling EV technicians across India',
              description:
                'Hands-on high-voltage safety and diagnostics certification programs prepare service teams across every region.',
            },
            {
              number: '03',
              title: 'Safe, inclusive manufacturing hubs',
              description:
                'Ergonomic assembly stations, air quality monitoring and workplace health support keep our teams protected.',
            },
          ],
        },
        {
          tabTitle: 'Governance',
          headline: 'Accountability across engineering, sourcing and compliance.',
          summary:
            'From AIS-156 certified battery packs to transparent supplier audits, every Euler vehicle is backed by measurable quality and safety standards.',
          image: esgPhotoId,
          stats: [
            { value: '480M', unit: 'km', label: 'driven electric' },
            { value: '1,000+', unit: '', label: 'EVs on road' },
            { value: '40', unit: 'cities', label: 'with charging' },
          ],
          cards: [
            {
              number: '01',
              title: 'Certified battery safety',
              description:
                'Multi-layer thermal management and cell-level telemetry exceed mandatory safety norms on every production pack.',
            },
            {
              number: '02',
              title: 'Responsible supply chain',
              description:
                'Vendor compliance reviews track material traceability, ethical labour standards and local component sourcing.',
            },
            {
              number: '03',
              title: 'Transparent fleet reporting',
              description:
                'Annual ESG disclosures and telematics-backed sustainability metrics keep customers and investors informed.',
            },
          ],
        },
      ],
    },
    reportsSection: {
      eyebrow: 'Reports and disclosures',
      title: 'ESG Reports & Policies',
      image: reportsPhotoId,
      viewAllCta: {
        label: 'View All',
        href: '/products',
        variant: 'secondary',
      },
    },
    hiringSection: {
      eyebrow: 'Join the journey',
      title: 'We are hiring, and we\nare selling.',
      description:
        'Either way, the same question applies. Does the work help somebody earn more than they did yesterday?',
      cta: {
        label: 'View Job openings',
        href: '/careers',
        variant: 'primary',
      },
      desktopImage: hiringDesktopId,
      mobileImage: hiringMobileId,
    },
    contactSection: {
      eyebrow: 'Next step',
      title: 'Tell us what you need!',
      description:
        'We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.',
      phone: '1800-1238-1238',
      email: 'customer.help@eulermotors.com',
      form: {
        heading: 'What are you looking for?',
        subheading: 'Two steps. We call you within one working day.',
        vehicleOptions:
          'Storm EV LongRange 200, Storm EV T1500, HiLoad EV, Turbo EV 1000, Neo HiRange, Neo HiCity',
        tabs: [
          {
            tabTitle: 'Test drive',
            nameLabel: 'Name',
            namePlaceholder: 'Full name',
            nameRequired: true,
            phoneLabel: 'Mobile number',
            phonePlaceholder: '10 digit',
            phoneRequired: true,
            vehicleLabel: 'Which vehicle',
            vehiclePlaceholder: 'Not sure, please suggest one',
            vehicleRequired: true,
            cityLabel: 'City',
            cityPlaceholder: 'Mumbai',
            cityRequired: true,
            customFieldLabel: 'Kilometres per day',
            customFieldPlaceholder: '150',
            customFieldRequired: true,
            ctaLabel: 'Confirm test drive',
          },
          {
            tabTitle: 'Price enquiry',
            nameLabel: 'Name',
            namePlaceholder: 'Full name',
            nameRequired: true,
            phoneLabel: 'Mobile number',
            phonePlaceholder: '10 digit',
            phoneRequired: true,
            vehicleLabel: 'Which vehicle',
            vehiclePlaceholder: 'Not sure, please suggest one',
            vehicleRequired: true,
            cityLabel: 'City',
            cityPlaceholder: 'Mumbai',
            cityRequired: true,
            customFieldLabel: 'Quantity of vehicles',
            customFieldPlaceholder: '5',
            customFieldRequired: true,
            ctaLabel: 'Get price list',
          },
          {
            tabTitle: 'Fleet solutions',
            nameLabel: 'Company name',
            namePlaceholder: 'Company',
            nameRequired: true,
            phoneLabel: 'Mobile number',
            phonePlaceholder: '10 digit',
            phoneRequired: true,
            vehicleLabel: 'Which vehicle',
            vehiclePlaceholder: 'Not sure, please suggest one',
            vehicleRequired: true,
            cityLabel: 'City',
            cityPlaceholder: 'Mumbai',
            cityRequired: true,
            customFieldLabel: 'Fleet size',
            customFieldPlaceholder: 'Number of vehicles',
            customFieldRequired: true,
            ctaLabel: 'Talk to our fleet team',
          },
        ],
        privacyNotice:
          'Euler Motors and its dealers may contact me about this enquiry. Privacy policy.',
        disclaimer: 'We never share your number with anyone else. No spam calls.',
      },
    },
    faqSection: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      image: faqImageId,
      items: [
        {
          question: 'How long does it take to fully charge an EV?',
          answer:
            'Charging time varies by battery capacity and charger type. Using a DC fast charger, you can reach 80% charge in about 30 to 45 minutes, while standard AC charging takes 4 to 6 hours.',
          category: 'Charging',
        },
        {
          question: 'What types of charging stations are available?',
          answer:
            'There are three main types: Level 1 (standard household outlet), Level 2 (dedicated home or public charger), and DC fast charging (rapid public stations).',
          category: 'Charging',
        },
        {
          question: 'Can I charge my EV at home?',
          answer:
            'Yes, you can charge your EV at home using a standard 15A wall socket or with an installed dedicated Level 2 wall-box charger for faster overnight charging.',
          category: 'General',
        },
        {
          question: 'How much does it cost to charge an electric vehicle?',
          answer:
            'Charging costs depend on local electricity tariffs. On average, commercial EV charging costs between ₹1.2 to ₹1.8 per kilometer, which is significantly lower than petrol or diesel.',
          category: 'General',
        },
        {
          question: 'How do I find nearby charging stations?',
          answer:
            'You can locate nearby compatible charging stations directly in the Euler mobile app with real-time station availability, navigation directions, and socket types.',
          category: 'Charging',
        },
        {
          question: 'Is it safe to charge in the rain?',
          answer:
            'Yes, it is completely safe. EV charging plugs and vehicle inlets are weatherproof (rated IP65/IP67) with built-in safety interlocks that prevent power flow until a secure seal is confirmed.',
          category: 'General',
        },
      ],
    },
    seo: {
      metaTitle: "About Euler Motors — Driving India's Electric Future",
      metaDescription:
        'Learn about Euler Motors, our leadership team, manufacturing excellence, ESG commitments, milestones, and commercial electric vehicle journey across India.',
      keywords:
        'about euler motors, euler motors leadership, commercial ev india, euler factory, euler esg',
    },
  };

  const existingAboutPage = await strapi.documents('api::about-page.about-page').findFirst({
    fields: ['documentId'],
  });
  if (!existingAboutPage) {
    const created = await strapi.documents('api::about-page.about-page').create({
      data: aboutPageData,
      status: 'published',
    });
    strapi.log.info(`[Seeder] Created About Page singleType successfully! (${created.documentId})`);
  } else {
    const updated = await strapi.documents('api::about-page.about-page').update({
      documentId: existingAboutPage.documentId,
      data: aboutPageData,
      status: 'published',
    });
    strapi.log.info(`[Seeder] Updated About Page singleType successfully! (${updated.documentId})`);
  }

  // Ensure Public Role has permission for About Page & its collection types
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (publicRole) {
    const aboutActions = [
      'api::about-page.about-page.find',
      'api::timeline-milestone.timeline-milestone.find',
      'api::timeline-milestone.timeline-milestone.findOne',
      'api::leadership-member.leadership-member.find',
      'api::leadership-member.leadership-member.findOne',
      'api::award.award.find',
      'api::award.award.findOne',
      'api::esg-report.esg-report.find',
      'api::esg-report.esg-report.findOne',
    ];
    for (const action of aboutActions) {
      let perm = await strapi.query('plugin::users-permissions.permission').findOne({
        where: { action },
      });
      if (!perm) {
        perm = await strapi.query('plugin::users-permissions.permission').create({
          data: { action },
        });
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
        }
      }
    }
  }
}

/**
 * Targeted Careers Page & Support Items Seeder
 * Uploads Hero desktop/mobile images and all 8 Support perks icons,
 * then updates `api::careers-page.careers-page` with published status.
 */
export async function seedCareersPage(strapi: any) {
  strapi.log.info('[Seeder] Starting Careers Page & Support icons seeding...');

  async function resolveExistingOrUpload(relPath: string, targetFilename: string, altText: string) {
    const existing = await strapi.query('plugin::upload.file').findOne({
      where: { name: targetFilename },
    });
    if (existing) return existing.id;
    return uploadMediaIfMissing(strapi, relPath, targetFilename, altText);
  }

  // 1. Upload Hero Images
  const careerHeroDesktopId = await resolveExistingOrUpload(
    'public/assets/careers/hero-desktop.webp',
    'career-hero-desktop.webp',
    'Euler Motors Careers Hero Desktop'
  );
  const careerHeroMobileId = await resolveExistingOrUpload(
    'public/assets/careers/hero-mobile.webp',
    'career-hero-mobile.webp',
    'Euler Motors Careers Hero Mobile'
  );

  // 2. Upload Support Perks Icons
  const supportMedicalId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-medical.webp',
    'support-medical.webp',
    'Medical Cover'
  );
  const supportLearningId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-learning.webp',
    'support-learning.webp',
    'Learning Budget'
  );
  const supportLeaveId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-leave.webp',
    'support-leave.webp',
    'Flexible Leave'
  );
  const supportCounselingId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-counseling.webp',
    'support-counseling.webp',
    'Counseling'
  );
  const supportEquityId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-equity.webp',
    'support-equity.webp',
    'Equity Options'
  );
  const supportWorkspaceId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-workspace.webp',
    'support-workspace.webp',
    'Modern Workspace'
  );
  const supportParentalId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-parental.webp',
    'support-parental.webp',
    'Parental Support'
  );
  const supportRecognitionId = await resolveExistingOrUpload(
    'public/assets/careers/support/support-recognition.webp',
    'support-recognition.webp',
    'Recognition'
  );

  // 3. Upload Gallery & Testimonials Images
  const galleryOfficeId = await resolveExistingOrUpload(
    'public/assets/careers/gallery-office.webp',
    'gallery-office.webp',
    'Euler Motors Office'
  );
  const galleryMeetingId = await resolveExistingOrUpload(
    'public/assets/careers/gallery-meeting-room.webp',
    'gallery-meeting-room.webp',
    'Euler Motors Meeting Space'
  );
  const galleryTeamId = await resolveExistingOrUpload(
    'public/assets/careers/gallery-team.webp',
    'gallery-team.webp',
    'Euler Motors Team'
  );
  const galleryTeamWorkId = await resolveExistingOrUpload(
    'public/assets/careers/gallery-team-work.webp',
    'gallery-team-work.webp',
    'Euler Motors Collaboration'
  );
  const galleryWorkspaceId = await resolveExistingOrUpload(
    'public/assets/careers/gallery-workspace.webp',
    'gallery-workspace.webp',
    'Euler Motors Workspace'
  );
  const testimonialRahulId = await resolveExistingOrUpload(
    'public/assets/careers/testimonial-rahul.webp',
    'testimonial-rahul.webp',
    'Rahul Deshmukh'
  );
  const testimonialJahanId = await resolveExistingOrUpload(
    'public/assets/careers/testimonial-jahan.webp',
    'testimonial-jahan.webp',
    'Jahan Melad'
  );
  const testimonialPriyaId = await resolveExistingOrUpload(
    'public/assets/careers/testimonial-priya.webp',
    'testimonial-priya.webp',
    'Priya Sharma'
  );

  const galleryImageIds = [
    galleryOfficeId,
    galleryMeetingId,
    galleryTeamId,
    galleryTeamWorkId,
    galleryWorkspaceId,
  ].filter(Boolean);

  // 4. Seed positions if missing
  const careerPositionsData = [
    {
      title: 'Senior Engineer, Battery Systems',
      department: 'Engineering',
      location: 'New Delhi',
      experience: '5 to 8 years',
      employmentType: 'Full time',
      description: 'Own the thermal and cell balancing behaviour of the pack across our range.',
      slug: 'senior-engineer-battery-systems',
      isActive: true,
      applyUrl: 'mailto:careers@eulermotors.com?subject=Application:%20Senior%20Engineer,%20Battery%20Systems',
      order: 1,
    },
    {
      title: 'Manufacturing Engineer, Assembly',
      department: 'Manufacturing',
      location: 'New Delhi',
      experience: '3 to 6 years',
      employmentType: 'Full time',
      description: 'Improve the assembly line that builds every Euler vehicle, one station at a time.',
      slug: 'manufacturing-engineer-assembly',
      isActive: true,
      applyUrl: 'mailto:careers@eulermotors.com?subject=Application:%20Manufacturing%20Engineer,%20Assembly',
      order: 2,
    },
    {
      title: 'Fleet Sales Manager',
      department: 'Sales',
      location: 'Chennai',
      experience: '4 to 8 years',
      employmentType: 'Full time',
      description: 'Drive commercial vehicle fleet adoption with enterprise logistics and cargo clients across South India.',
      slug: 'fleet-sales-manager',
      isActive: true,
      applyUrl: 'mailto:careers@eulermotors.com?subject=Application:%20Fleet%20Sales%20Manager',
      order: 3,
    },
    {
      title: 'Lead Firmware Engineer, IoT',
      department: 'Software',
      location: 'Bengaluru',
      experience: '5 to 8 years',
      employmentType: 'Full time',
      description: 'Architect vehicle telematics, BMS integration, and real-time charging telemetry platforms.',
      slug: 'lead-firmware-engineer-iot',
      isActive: true,
      applyUrl: 'mailto:careers@eulermotors.com?subject=Application:%20Lead%20Firmware%20Engineer,%20IoT',
      order: 4,
    },
    {
      title: 'Quality Assurance Engineer, Powertrain',
      department: 'Manufacturing',
      location: 'Pune',
      experience: '3 to 6 years',
      employmentType: 'Full time',
      description: 'Implement endurance testing and quality control for commercial electric drive trains.',
      slug: 'qa-engineer-powertrain',
      isActive: true,
      applyUrl: 'mailto:careers@eulermotors.com?subject=Application:%20QA%20Engineer,%20Powertrain',
      order: 5,
    },
    {
      title: 'Regional Service Operations Manager',
      department: 'Service',
      location: 'Mumbai',
      experience: '4 to 8 years',
      employmentType: 'Full time',
      description: 'Lead regional service depot operations, warranty resolution, and depot technician readiness.',
      slug: 'regional-service-manager',
      isActive: true,
      applyUrl: 'mailto:careers@eulermotors.com?subject=Application:%20Regional%20Service%20Operations%20Manager',
      order: 6,
    },
  ];

  const seededPositionDocIds: string[] = [];
  for (const pos of careerPositionsData) {
    const existing = await strapi.documents('api::career-position.career-position').findFirst({
      filters: { slug: pos.slug },
    });
    if (!existing) {
      const created = await strapi.documents('api::career-position.career-position').create({
        data: pos,
        status: 'published',
      });
      seededPositionDocIds.push(created.documentId);
    } else {
      const updated = await strapi.documents('api::career-position.career-position').update({
        documentId: existing.documentId,
        data: pos,
        status: 'published',
      });
      seededPositionDocIds.push(updated.documentId);
    }
  }

  // 5. Careers Page Single Type Data
  const careersPageData = {
    hero: {
      eyebrow: 'GROW WITH US',
      title: 'Shape the Future of Electric Mobility.',
      subtitle:
        'Be part of a team engineering electric mobility and shaping the future of commercial transportation.',
      cta: {
        label: 'Find Jobs',
        href: '#open-positions',
      },
      desktopImage: careerHeroDesktopId,
      mobileImage: careerHeroMobileId,
    },
    benefitsSection: {
      eyebrow: 'Why work with us',
      title: 'Build More Than a Career.',
      description:
        'At Euler Motors, you work on real engineering challenges, build technology for Indian conditions and contribute to the future of commercial mobility.',
      benefits: [
        {
          number: '01',
          title: 'Solve Real-World Challenges',
          description:
            'Work on electric vehicles designed for the everyday demands of businesses, roads and logistics.',
        },
        {
          number: '02',
          title: 'Work Across Disciplines',
          description:
            'Bring engineering, software, design and technology together to solve complex mobility challenges.',
        },
        {
          number: '03',
          title: 'Make Innovation Happen',
          description:
            'Turn ideas into practical solutions that improve how commercial vehicles perform and operate.',
        },
      ],
    },
    supportSection: {
      eyebrow: 'Our offering',
      title: 'Support That Matters',
      subtitle:
        'We focus on complete physical, mental, and professional growth support. No standard corporate fluff, just helpful baseline perks.',
      items: [
        {
          title: 'Medical Cover',
          description: 'Cover for you, spouse, children, and parents.',
          icon: supportMedicalId,
        },
        {
          title: 'Learning Budget',
          description: 'Paid courses, workshops, and global certs.',
          icon: supportLearningId,
        },
        {
          title: 'Flexible Leave',
          description: 'Take the time you need comfortably.',
          icon: supportLeaveId,
        },
        {
          title: 'Counseling',
          description: 'Confidential mental health support, free of cost.',
          icon: supportCounselingId,
        },
        {
          title: 'Equity Options',
          description: 'Own a stake in the mobility revolution.',
          icon: supportEquityId,
        },
        {
          title: 'Modern Workspace',
          description: 'Spacious hubs in Delhi & Bangalore.',
          icon: supportWorkspaceId,
        },
        {
          title: 'Parental Support',
          description: 'Helpful paid parent leave systems.',
          icon: supportParentalId,
        },
        {
          title: 'Recognition',
          description: 'Quarterly peer-voted awards & spot bonuses.',
          icon: supportRecognitionId,
        },
      ],
    },
    positionsSection: {
      eyebrow: 'Open positions',
      title: 'Find Your Place at Euler.',
      subtitle:
        'Explore opportunities across teams and locations. Find a role that matches your skills and helps shape the future of electric mobility.',
      positions: seededPositionDocIds,
    },
    gallerySection: {
      eyebrow: 'LIFE AT EULER',
      title: 'A Place to Build, Learn and Grow.',
      subtitle:
        'From the shop floor to collaborative workspaces, get a glimpse of the people, ideas and everyday experiences that shape life at Euler Motors.',
      images: galleryImageIds,
    },
    testimonialsSection: {
      eyebrow: 'Employee voices',
      title: 'Hear It from Our People.',
      subtitle:
        'Get a glimpse of life at Euler through the experiences and perspectives of the people building our electric mobility journey.',
      testimonials: [
        {
          quote:
            'Joined to work on advanced electric powertrains. Stayed because of the collaborative culture and freedom to innovate. The team here genuinely values engineering excellence and new ideas.',
          name: 'Rahul Deshmukh',
          role: 'Senior Engineer, Euler Motors',
          image: testimonialRahulId,
        },
        {
          quote:
            'Joined to build cutting-edge battery packs. Stayed because of the high trust and low bureaucracy. The ownership given to engineers here is rare in the EV sector.',
          name: 'Jahan Melad',
          role: 'Project Manager, Euler Motors',
          image: testimonialJahanId,
        },
        {
          quote:
            'Came here to solve real-world mobility challenges. Stayed because of the supportive leadership and meaningful work. Every project gives us the opportunity to build technology that makes a difference.',
          name: 'Priya Sharma',
          role: 'Manufacturing Lead, Euler Motors',
          image: testimonialPriyaId,
        },
      ],
    },
    seo: {
      metaTitle: 'Careers at Euler Motors — Shape the Future of Electric Mobility',
      metaDescription:
        'Be part of a team engineering electric mobility and shaping the future of commercial transportation.',
      keywords: 'euler motors careers, ev jobs india, commercial ev engineering, automotive jobs, clean tech careers',
    },
  };

  const existingCareersPage = await strapi.documents('api::careers-page.careers-page').findFirst({
    fields: ['documentId'],
  });
  if (!existingCareersPage) {
    const created = await strapi.documents('api::careers-page.careers-page').create({
      data: careersPageData,
      status: 'published',
    });
    strapi.log.info(`[Seeder] Created Careers Page singleType successfully! (${created.documentId})`);
  } else {
    const updated = await strapi.documents('api::careers-page.careers-page').update({
      documentId: existingCareersPage.documentId,
      data: careersPageData,
      status: 'published',
    });
    strapi.log.info(`[Seeder] Updated Careers Page singleType successfully! (${updated.documentId})`);
  }
}
