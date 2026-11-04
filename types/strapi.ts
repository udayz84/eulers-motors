/**
 * TypeScript definitions for Strapi v5 API responses and components.
 */

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
}

export interface StrapiMedia {
  id?: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiSEO {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiMedia;
  keywords?: string;
  preventIndexing?: boolean;
}

export interface StrapiCTA {
  id?: number;
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isExternal?: boolean;
}

export interface StrapiStat {
  id?: number;
  value: string;
  unit?: string;
  label: string;
  valueMobile?: string | null;
  unitMobile?: string | null;
}

export interface HeroSlide {
  id?: number;
  headline: string;
  subheading?: string;
  tag?: string;
  primaryCta?: StrapiCTA;
  secondaryCta?: StrapiCTA;
  desktopImage?: StrapiMedia;
  mobileImage?: StrapiMedia;
}

export interface ProductItem {
  id?: number;
  documentId?: string;
  title: string;
  tabLabel: string;
  slug: string;
  specsRange: string;
  specsCapacity: string;
  specsChargeTime: string;
  productUrl?: string;
  image?: StrapiMedia;
  order?: number;
}

export interface ReviewItem {
  id?: number;
  documentId?: string;
  customerName: string;
  roleOrCompany?: string;
  location?: string;
  quote?: string;
  rating?: number;
  savingsMonthly?: string;
  videoDuration?: string;
  storyImage?: StrapiMedia | { url: string } | string;
  overlayImage?: StrapiMedia | { url: string } | string | null;
  avatarImage?: StrapiMedia | { url: string } | string;
  video?: StrapiMedia | { url: string } | string;
  videoUrl?: string | null;
  order?: number;
}

export interface ArticleItem {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  coverImage?: StrapiMedia | { url: string };
  publishDate?: string;
  category?: string;
  readingTime?: string;
}

export interface PromoCardData {
  eyebrow?: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: StrapiMedia;
  imageAlt?: string;
  wash?: "blue" | "white" | "mobile-blue";
  align?: "left" | "right";
}

export interface PrimeBannerData {
  id?: number;
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: StrapiCTA;
  backgroundImage?: StrapiMedia;
  features?: { value: string; label: string }[];
}

export interface ComparePersonaPoints {
  persona: string;
  points: string[];
}

export interface CompareSectionData {
  id?: number;
  eyebrow?: string;
  title?: string;
  quizTitle?: string;
  quizSubtitle?: string;
  quizCta?: StrapiCTA;
  withoutEulerPoints?: ComparePersonaPoints[];
  withEulerPoints?: ComparePersonaPoints[];
}

export interface SavingsCalculatorData {
  id?: number;
  eyebrow?: string;
  title?: string;
  defaultDailyKm?: number;
  defaultYears?: number;
  chartImage?: StrapiMedia | { url: string };
  chartImageAlt?: string;
}

export interface TechnologyCardData {
  id?: number;
  tag?: string;
  title: string;
  description: string;
}

export interface TechnologySectionData {
  id?: number;
  eyebrow?: string;
  title?: string;
  subheading?: string;
  description?: string;
  cta?: StrapiCTA;
  cards?: TechnologyCardData[];
}

export interface HomePageData {
  seo?: StrapiSEO;
  hero?: {
    slides?: HeroSlide[];
  };
  statsBanner?: {
    heading?: string;
    stats?: StrapiStat[];
  };
  productShowcase?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    products?: ProductItem[];
  };
  neoPromo?: PromoCardData;
  talkPromo?: PromoCardData;
  savingsCalculator?: SavingsCalculatorData;
  compareSection?: CompareSectionData;
  technology?: TechnologySectionData;
  reviewsSection?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    reviews?: ReviewItem[];
  };
  primeBanner?: PrimeBannerData;
  insightsSection?: {
    eyebrow?: string;
    title?: string;
    viewAllCta?: StrapiCTA;
    articles?: ArticleItem[];
  };
  contactSection?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
    form?: {
      heading?: string;
      subheading?: string;
      options?: string[];
      ctaLabel?: string;
      disclaimer?: string;
    };
  };
  enterpriseDealer?: {
    enterpriseEyebrow?: string;
    enterpriseTitle?: string;
    enterpriseDesc?: string;
    enterpriseCta?: StrapiCTA;
    enterpriseCtaLabel?: string;
    enterpriseCtaHref?: string;
    enterpriseBullets?: string[];
    dealerEyebrow?: string;
    dealerTitle?: string;
    dealerDesc?: string;
    dealerPrimaryCta?: StrapiCTA;
    dealerPrimaryCtaLabel?: string;
    dealerPrimaryCtaHref?: string;
    dealerSecondaryCta?: StrapiCTA;
    dealerSecondaryCtaLabel?: string;
    dealerSecondaryCtaHref?: string;
  };
  socialWall?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    posts?: any[];
  };
}

/**
 * Dealer Locator TypeScript definitions
 */
export interface StrapiDealer {
  id?: number;
  documentId?: string;
  name: string;
  slug?: string;
  address: string;
  city?: string;
  state?: string;
  hours?: string;
  distance?: string;
  phone?: string;
  badges?: string[];
  order?: number;
}

export interface StrapiChargingStation {
  id?: number;
  documentId?: string;
  name: string;
  slug?: string;
  address: string;
  city?: string;
  hours?: string;
  distance?: string;
  phone?: string;
  badges?: string[];
  order?: number;
}

export interface StrapiServiceCenter {
  id?: number;
  documentId?: string;
  name: string;
  slug?: string;
  address: string;
  city?: string;
  hours?: string;
  distance?: string;
  phone?: string;
  badges?: string[];
  order?: number;
}

export interface DealerContactCard {
  id?: number;
  icon: string;
  title: string;
  detail: string;
  mobileOrder?: string;
}

export interface DealerContactSectionData {
  eyebrow?: string;
  desktopTitle?: string;
  mobileTitle?: string;
  desktopDescription?: string;
  mobileDescription?: string;
  cards?: DealerContactCard[];
  formHeading?: string;
  formSubheading?: string;
  formTabs?: string[];
  vehicleOptions?: string[];
  ctaLabel?: string;
  privacyNotice?: string;
  disclaimer?: string;
}

export interface DealerLocatorHeroData {
  supportBadge?: string;
  dealerTabTitle?: string;
  dealerTabSubtitle?: string;
  dealerSearchPlaceholder?: string;
  chargingTabTitle?: string;
  chargingTabSubtitle?: string;
  chargingSearchPlaceholder?: string;
  serviceTabTitle?: string;
  serviceTabSubtitle?: string;
  serviceSearchPlaceholder?: string;
  cities?: string[];
  dealers?: StrapiDealer[];
  chargingStations?: StrapiChargingStation[];
  serviceCenters?: StrapiServiceCenter[];
}

export interface DealerLocatorPageData {
  id?: number;
  documentId?: string;
  hero?: DealerLocatorHeroData;
  contactSection?: DealerContactSectionData;
  seo?: StrapiSEO;
}

/**
 * Standard Strapi v5 API single & collection envelope structures
 */
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}
