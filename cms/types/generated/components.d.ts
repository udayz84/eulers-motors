import type { Schema, Struct } from '@strapi/strapi';

export interface CareersBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_careers_benefit_items';
  info: {
    description: 'Value proposition card for careers';
    displayName: 'Benefit Item';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersBenefitsSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_benefits_sections';
  info: {
    description: 'Why work with us impact section';
    displayName: 'Benefits Section';
    icon: 'heart';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'careers.benefit-item', true>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why work with us'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineering Impact, Every Day'>;
  };
}

export interface CareersGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_careers_gallery_sections';
  info: {
    description: 'Life at Euler Motors photo gallery';
    displayName: 'Gallery Section';
    icon: 'picture';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Inside the depots'>;
    images: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'From the assembly lines in New Delhi to real road testing across state lines \u2014 see what our day-to-day looks like.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Life at Euler Motors'>;
  };
}

export interface CareersHero extends Struct.ComponentSchema {
  collectionName: 'components_careers_heroes';
  info: {
    description: 'Careers page hero banner and mission statement';
    displayName: 'Career Hero';
    icon: 'user';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Careers at Euler'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Join a passionate team of engineers, designers, and operators building electric commercial vehicles for India.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Build the future of commercial mobility.'>;
  };
}

export interface CareersSupportItem extends Struct.ComponentSchema {
  collectionName: 'components_careers_support_items';
  info: {
    description: 'Perks and employee benefits item';
    displayName: 'Support Item';
    icon: 'handHeart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersSupportSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_support_sections';
  info: {
    description: 'Employee support and workplace perks section';
    displayName: 'Support Section';
    icon: 'handHeart';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Benefits & Perks'>;
    items: Schema.Attribute.Component<'careers.support-item', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Comprehensive health, learning budgets, and equity support.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We take care of the team.'>;
  };
}

export interface CareersTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_careers_testimonial_items';
  info: {
    description: 'Employee testimonial and experience quote';
    displayName: 'Testimonial Item';
    icon: 'quote';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_testimonials_sections';
  info: {
    description: 'Employee quotes and testimonials carousel section';
    displayName: 'Testimonials Section';
    icon: 'quote';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our Team'>;
    testimonials: Schema.Attribute.Component<'careers.testimonial-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hear from the team.'>;
  };
}

export interface HomeCompareSection extends Struct.ComponentSchema {
  collectionName: 'components_home_compare_sections';
  info: {
    description: 'Comparison section showing with vs without Euler benefits and 30-sec test quiz';
    displayName: 'Compare Section';
    icon: 'layer';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHAT CHANGES'>;
    quizCta: Schema.Attribute.Component<'shared.cta-button', false>;
    quizSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sirf 5 questions, 30 seconds. No phone number needed.'>;
    quizTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Which vehicle fits your work?'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What changes when you switch?'>;
    withEulerPoints: Schema.Attribute.JSON;
    withoutEulerPoints: Schema.Attribute.JSON;
  };
}

export interface HomeContactSection extends Struct.ComponentSchema {
  collectionName: 'components_home_contact_sections';
  info: {
    description: 'Contact and callback prompts';
    displayName: 'Contact Section';
    icon: 'phone';
  };
  attributes: {
    description: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Connect'>;
    phone: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get in touch with Euler Motors'>;
  };
}

export interface HomeEnterpriseDealer extends Struct.ComponentSchema {
  collectionName: 'components_home_enterprise_dealers';
  info: {
    description: 'Enterprise fleet inquiries and dealership application split cards';
    displayName: 'Enterprise & Dealer Section';
    icon: 'briefcase';
  };
  attributes: {
    dealerDesc: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Your area, with clear numbers.\nWe manage showroom setup and training.'>;
    dealerEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'38 cities open'>;
    dealerPrimaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    dealerSecondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    dealerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Want to become a dealer?'>;
    enterpriseBullets: Schema.Attribute.JSON;
    enterpriseCta: Schema.Attribute.Component<'shared.cta-button', false>;
    enterpriseDesc: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We check your routes on your own data first. Then connect with you.'>;
    enterpriseEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enterprise'>;
    enterpriseTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Need 50+ trucks?'>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Hero section container';
    displayName: 'Hero Section';
    icon: 'crown';
  };
  attributes: {
    slides: Schema.Attribute.Component<'home.hero-slide', true>;
  };
}

export interface HomeHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_slides';
  info: {
    description: 'Carousel slide in the hero section';
    displayName: 'Hero Slide';
    icon: 'slideshow';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    subheading: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

export interface HomeInsightsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_insights_sections';
  info: {
    description: 'Learn more about EVs - educational articles';
    displayName: 'Insights Section';
    icon: 'book';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'insights'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn more about EVs'>;
    viewAllCta: Schema.Attribute.Component<'shared.cta-button', false>;
  };
}

export interface HomePrimeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_prime_banners';
  info: {
    description: 'Euler Prime loyalty and benefits banner';
    displayName: 'Prime Banner';
    icon: 'star';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Euler Prime'>;
  };
}

export interface HomeProductShowcase extends Struct.ComponentSchema {
  collectionName: 'components_home_product_showcases';
  info: {
    description: 'Featured vehicles and interactive switcher';
    displayName: 'Product Showcase';
    icon: 'car';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Vehicles'>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Powering every commercial delivery'>;
  };
}

export interface HomePromoCard extends Struct.ComponentSchema {
  collectionName: 'components_home_promo_cards';
  info: {
    description: 'Featured promotional section';
    displayName: 'Promo Card';
    icon: 'layer';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    wash: Schema.Attribute.Enumeration<['blue', 'white', 'mobile-blue']> &
      Schema.Attribute.DefaultTo<'blue'>;
  };
}

export interface HomeReviewsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_reviews_sections';
  info: {
    description: 'Customer stories and reviews marquee';
    displayName: 'Reviews Section';
    icon: 'thumbUp';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Watch real customers share their experience with Euler Motors.'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Customers'>;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Customer reviews'>;
  };
}

export interface HomeSocialPost extends Struct.ComponentSchema {
  collectionName: 'components_home_social_posts';
  info: {
    description: 'Individual community social post video card';
    displayName: 'Social Post';
    icon: 'play';
  };
  attributes: {
    authorHandle: Schema.Attribute.String & Schema.Attribute.Required;
    duration: Schema.Attribute.String;
    isOfficial: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    likes: Schema.Attribute.String;
    mediaImage: Schema.Attribute.Media<'images'>;
    timeAgo: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface HomeSocialWall extends Struct.ComponentSchema {
  collectionName: 'components_home_social_walls';
  info: {
    description: 'Social media community showcase wall';
    displayName: 'Social Wall';
    icon: 'earth';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR SOCIAL COMMUNITY'>;
    posts: Schema.Attribute.Component<'home.social-post', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'See how drivers and fleet owners are transforming their business with Euler across India.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Follow the movement'>;
  };
}

export interface HomeStatsBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_stats_banners';
  info: {
    description: 'Stats and KPI metric counters';
    displayName: 'Stats Banner';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
  };
}

export interface HomeTechnology extends Struct.ComponentSchema {
  collectionName: 'components_home_technologies';
  info: {
    description: 'Technology section headings and copy';
    displayName: 'Technology Section';
    icon: 'cog';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'technology'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineering that drives the future'>;
  };
}

export interface ProductHero extends Struct.ComponentSchema {
  collectionName: 'components_product_heroes';
  info: {
    description: 'Product detail page hero section with specs, price, and variant selector';
    displayName: 'Product Hero';
    icon: 'crown';
  };
  attributes: {
    brochureFile: Schema.Attribute.Media<'files' | 'images'>;
    eyebrow: Schema.Attribute.String;
    gallery: Schema.Attribute.Media<'images', true>;
    mainImage: Schema.Attribute.Media<'images'>;
    priceNote: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    startingPrice: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variants: Schema.Attribute.Component<'product.variant-option', true>;
  };
}

export interface ProductLoanCalculator extends Struct.ComponentSchema {
  collectionName: 'components_product_loan_calculators';
  info: {
    description: 'Interactive EMI and loan financing calculator section';
    displayName: 'Product Loan Calculator';
    icon: 'priceTag';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    defaultDownPayment: Schema.Attribute.Decimal;
    defaultInterestRate: Schema.Attribute.Decimal &
      Schema.Attribute.DefaultTo<9.5>;
    defaultPrice: Schema.Attribute.Decimal;
    defaultTenureMonths: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<48>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FINANCE'>;
    partners: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Calculate your loan EMI'>;
  };
}

export interface ProductOtherVehicles extends Struct.ComponentSchema {
  collectionName: 'components_product_other_vehicles';
  info: {
    description: 'Recommended alternative vehicles in the fleet';
    displayName: 'Other Vehicles Section';
    icon: 'car';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OTHER VEHICLES'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore other vehicles in our fleet'>;
    vehicles: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
  };
}

export interface ProductOverview extends Struct.ComponentSchema {
  collectionName: 'components_product_overviews';
  info: {
    description: 'What this vehicle is good at - 5-card Bento grid';
    displayName: 'Product Overview Section';
    icon: 'layout';
  };
  attributes: {
    cards: Schema.Attribute.Component<'product.overview-card', true>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'OVERVIEW'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What this vehicle is good at.'>;
  };
}

export interface ProductOverviewCard extends Struct.ComponentSchema {
  collectionName: 'components_product_overview_cards';
  info: {
    description: 'Bento grid card in the product overview section';
    displayName: 'Overview Card';
    icon: 'apps';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    tags: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductSpecCategory extends Struct.ComponentSchema {
  collectionName: 'components_product_spec_categories';
  info: {
    description: 'Tab category of specifications with image and rows';
    displayName: 'Spec Category';
    icon: 'folder';
  };
  attributes: {
    categoryName: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'product.spec-row', true>;
  };
}

export interface ProductSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_product_spec_rows';
  info: {
    description: 'Single key-value specification row';
    displayName: 'Spec Row';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductSpecs extends Struct.ComponentSchema {
  collectionName: 'components_product_specs';
  info: {
    description: 'Interactive specifications section with category tabs';
    displayName: 'Product Specs Section';
    icon: 'cog';
  };
  attributes: {
    categories: Schema.Attribute.Component<'product.spec-category', true>;
    description: Schema.Attribute.Text;
    downloadCta: Schema.Attribute.Component<'shared.cta-button', false>;
    downloadFile: Schema.Attribute.Media<'files' | 'images'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SPECIFICATIONS'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Technical Specifications'>;
  };
}

export interface ProductVariantDetail extends Struct.ComponentSchema {
  collectionName: 'components_product_variant_details';
  info: {
    description: 'Variant comparison row item with full pricing and specs';
    displayName: 'Variant Detail';
    icon: 'layer';
  };
  attributes: {
    bodyType: Schema.Attribute.String;
    cargoSpace: Schema.Attribute.String;
    fullCharge: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    payload: Schema.Attribute.String;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    priceNumeric: Schema.Attribute.Decimal;
    range: Schema.Attribute.String;
    runningCost: Schema.Attribute.String;
  };
}

export interface ProductVariantOption extends Struct.ComponentSchema {
  collectionName: 'components_product_variant_options';
  info: {
    description: 'Product model variant option for selector dropdown';
    displayName: 'Variant Option';
    icon: 'car';
  };
  attributes: {
    fullName: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
    range: Schema.Attribute.String;
  };
}

export interface ProductVariantsCompare extends Struct.ComponentSchema {
  collectionName: 'components_product_variants_compares';
  info: {
    description: 'Variant comparison table comparing trim levels and deck types';
    displayName: 'Variants Comparison Section';
    icon: 'dashboard';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'VARIANTS'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Compare variants'>;
    truckImage: Schema.Attribute.Media<'images'>;
    variants: Schema.Attribute.Component<'product.variant-detail', true>;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    description: 'Call-to-action button';
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedSavingsCalculator extends Struct.ComponentSchema {
  collectionName: 'components_shared_savings_calculators';
  info: {
    description: 'Interactive operational cost and savings comparison calculator';
    displayName: 'Savings Calculator';
    icon: 'calculator';
  };
  attributes: {
    chartImage: Schema.Attribute.Media<'images'>;
    chartImageAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Bar chart comparing monthly profit with petrol, diesel, CNG and Euler EV'>;
    defaultDailyKm: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<80>;
    defaultYears: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Savings calculator'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Calculate your savings'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Page SEO metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Metric or statistic counter';
    displayName: 'Stat Item';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String;
    unitMobile: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    valueMobile: Schema.Attribute.String;
  };
}

export interface TechnologyChargingSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_charging_sections';
  info: {
    description: 'Charging guidance with dos and donts';
    displayName: 'Charging Section';
    icon: 'lightning';
  };
  attributes: {
    donts: Schema.Attribute.JSON;
    dos: Schema.Attribute.JSON;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Charging'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Different businesses have different needs. Choose the charging setup that works best for your operations.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Where Will I Charge?'>;
  };
}

export interface TechnologyFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_technology_faq_items';
  info: {
    description: 'Technology question and answer item';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    category: Schema.Attribute.String & Schema.Attribute.DefaultTo<'General'>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_faq_sections';
  info: {
    description: 'Technology page categorized FAQ section';
    displayName: 'Technology FAQ Section';
    icon: 'question';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQ'>;
    items: Schema.Attribute.Component<'technology.faq-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Frequently Asked Questions'>;
  };
}

export interface TechnologyHero extends Struct.ComponentSchema {
  collectionName: 'components_technology_heroes';
  info: {
    description: 'Technology page hero and engineering philosophy section';
    displayName: 'Technology Hero';
    icon: 'shield';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Technology'>;
    philosophyDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Commercial electric vehicles don't get gentle treatment. They run 14 hours a day, through monsoon waterlogging and summer heat, carrying every kilogram they are rated for and sometimes more.">;
    philosophyEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR PHILOSOPHY'>;
    philosophyTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Designed for commercial reality.'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Every innovation is designed for everyday business.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built Smarter.\nBuilt for Business.'>;
  };
}

export interface TechnologyIndianRoads extends Struct.ComponentSchema {
  collectionName: 'components_technology_indian_roads';
  info: {
    description: 'Built for Indian roads problem-solution grid';
    displayName: 'Indian Roads Section';
    icon: 'car';
  };
  attributes: {
    cards: Schema.Attribute.Component<'technology.road-condition-card', true>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Made for India'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built for everyday commercial roads.'>;
  };
}

export interface TechnologyKnowVehicle extends Struct.ComponentSchema {
  collectionName: 'components_technology_know_vehicles';
  info: {
    description: 'Interactive technical teardown for motor, battery, and charging';
    displayName: 'Know Your Vehicle Section';
    icon: 'cog';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Know your vehicle'>;
    parts: Schema.Attribute.Component<'technology.vehicle-part', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built for the driver, engineered for the fleet.'>;
  };
}

export interface TechnologyLoadCard extends Struct.ComponentSchema {
  collectionName: 'components_technology_load_cards';
  info: {
    description: 'Card showing payload capability';
    displayName: 'Load Card';
    icon: 'truck';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyLoadSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_load_sections';
  info: {
    description: 'Rated with weight payload section';
    displayName: 'Load Section';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'technology.load-card', true>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Load'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Every range and performance number we publish is measured with rated payload on board \u2014 not on an empty flat track.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rated with weight on it.'>;
  };
}

export interface TechnologyManufacturing extends Struct.ComponentSchema {
  collectionName: 'components_technology_manufacturings';
  info: {
    description: 'Manufacturing plant and engineering film section';
    displayName: 'Manufacturing Section';
    icon: 'house';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Packs, drivetrains and final assembly in one building, so a fault found in the field reaches the line that made it.'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Manufacturing'>;
    mainImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Where Every Vehicle Begins'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface TechnologyProofSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_proof_sections';
  info: {
    description: 'Proof statistics demonstrating commercial EV uptime and scale';
    displayName: 'Proof Section';
    icon: 'check';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Proof'>;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why businesses trust Euler.'>;
  };
}

export interface TechnologyRoadConditionCard extends Struct.ComponentSchema {
  collectionName: 'components_technology_road_condition_cards';
  info: {
    description: 'Comparison between harsh Indian condition and Euler solution';
    displayName: 'Road Condition Card';
    icon: 'shield';
  };
  attributes: {
    condition: Schema.Attribute.String & Schema.Attribute.Required;
    problem: Schema.Attribute.Text & Schema.Attribute.Required;
    solution: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TechnologyShepherdSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_shepherd_sections';
  info: {
    description: 'Shepherd IoT fleet management app showcase';
    displayName: 'Shepherd Section';
    icon: 'phone';
  };
  attributes: {
    appImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Shepherd app'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Track your vehicles, battery, trips, charging and service updates from one simple dashboard.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Manage Everything in One Place'>;
  };
}

export interface TechnologyVehiclePart extends Struct.ComponentSchema {
  collectionName: 'components_technology_vehicle_parts';
  info: {
    description: 'Component part technical deep-dive';
    displayName: 'Vehicle Part';
    icon: 'cog';
  };
  attributes: {
    businessMeaning: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    partName: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    whatIsIt: Schema.Attribute.Text & Schema.Attribute.Required;
    whyDoesItMatter: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'careers.benefit-item': CareersBenefitItem;
      'careers.benefits-section': CareersBenefitsSection;
      'careers.gallery-section': CareersGallerySection;
      'careers.hero': CareersHero;
      'careers.support-item': CareersSupportItem;
      'careers.support-section': CareersSupportSection;
      'careers.testimonial-item': CareersTestimonialItem;
      'careers.testimonials-section': CareersTestimonialsSection;
      'home.compare-section': HomeCompareSection;
      'home.contact-section': HomeContactSection;
      'home.enterprise-dealer': HomeEnterpriseDealer;
      'home.hero': HomeHero;
      'home.hero-slide': HomeHeroSlide;
      'home.insights-section': HomeInsightsSection;
      'home.prime-banner': HomePrimeBanner;
      'home.product-showcase': HomeProductShowcase;
      'home.promo-card': HomePromoCard;
      'home.reviews-section': HomeReviewsSection;
      'home.social-post': HomeSocialPost;
      'home.social-wall': HomeSocialWall;
      'home.stats-banner': HomeStatsBanner;
      'home.technology': HomeTechnology;
      'product.hero': ProductHero;
      'product.loan-calculator': ProductLoanCalculator;
      'product.other-vehicles': ProductOtherVehicles;
      'product.overview': ProductOverview;
      'product.overview-card': ProductOverviewCard;
      'product.spec-category': ProductSpecCategory;
      'product.spec-row': ProductSpecRow;
      'product.specs': ProductSpecs;
      'product.variant-detail': ProductVariantDetail;
      'product.variant-option': ProductVariantOption;
      'product.variants-compare': ProductVariantsCompare;
      'shared.cta-button': SharedCtaButton;
      'shared.savings-calculator': SharedSavingsCalculator;
      'shared.seo': SharedSeo;
      'shared.stat-item': SharedStatItem;
      'technology.charging-section': TechnologyChargingSection;
      'technology.faq-item': TechnologyFaqItem;
      'technology.faq-section': TechnologyFaqSection;
      'technology.hero': TechnologyHero;
      'technology.indian-roads': TechnologyIndianRoads;
      'technology.know-vehicle': TechnologyKnowVehicle;
      'technology.load-card': TechnologyLoadCard;
      'technology.load-section': TechnologyLoadSection;
      'technology.manufacturing': TechnologyManufacturing;
      'technology.proof-section': TechnologyProofSection;
      'technology.road-condition-card': TechnologyRoadConditionCard;
      'technology.shepherd-section': TechnologyShepherdSection;
      'technology.vehicle-part': TechnologyVehiclePart;
    }
  }
}
