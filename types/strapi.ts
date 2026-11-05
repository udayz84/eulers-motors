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
  backgroundImage?: StrapiMedia | string;
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

export interface FormTabFields {
  tab1Title?: string;
  tab1NameLabel?: string;
  tab1NamePlaceholder?: string;
  tab1PhoneLabel?: string;
  tab1PhonePlaceholder?: string;
  tab1VehicleLabel?: string;
  tab1VehiclePlaceholder?: string;
  tab1CityLabel?: string;
  tab1CityPlaceholder?: string;
  tab1CustomLabel?: string;
  tab1CustomPlaceholder?: string;
  tab1CtaLabel?: string;

  tab2Title?: string;
  tab2NameLabel?: string;
  tab2NamePlaceholder?: string;
  tab2PhoneLabel?: string;
  tab2PhonePlaceholder?: string;
  tab2VehicleLabel?: string;
  tab2VehiclePlaceholder?: string;
  tab2CityLabel?: string;
  tab2CityPlaceholder?: string;
  tab2CustomLabel?: string;
  tab2CustomPlaceholder?: string;
  tab2CtaLabel?: string;

  tab3Title?: string;
  tab3NameLabel?: string;
  tab3NamePlaceholder?: string;
  tab3PhoneLabel?: string;
  tab3PhonePlaceholder?: string;
  tab3VehicleLabel?: string;
  tab3VehiclePlaceholder?: string;
  tab3CityLabel?: string;
  tab3CityPlaceholder?: string;
  tab3CustomLabel?: string;
  tab3CustomPlaceholder?: string;
  tab3CtaLabel?: string;
}

export interface FormTabConfig {
  id?: number;
  tabTitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  nameRequired?: boolean;
  phoneLabel?: string;
  phonePlaceholder?: string;
  phoneRequired?: boolean;
  vehicleLabel?: string;
  vehiclePlaceholder?: string;
  vehicleRequired?: boolean;
  cityLabel?: string;
  cityPlaceholder?: string;
  cityRequired?: boolean;
  customFieldLabel?: string;
  customFieldPlaceholder?: string;
  customFieldRequired?: boolean;
  ctaLabel?: string;
}

export interface HomeContactFormData extends Partial<FormTabFields> {
  heading?: string;
  subheading?: string;
  vehicleOptions?: string[] | string;
  tabs?: FormTabConfig[];
  tab1?: FormTabConfig;
  tab2?: FormTabConfig;
  tab3?: FormTabConfig;
  options?: string[] | string;
  ctaLabel?: string;
  privacyNotice?: string;
  disclaimer?: string;
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
    form?: HomeContactFormData;
  };
  enterpriseDealer?: {
    enterpriseEyebrow?: string;
    enterpriseTitle?: string;
    enterpriseDesc?: string;
    enterpriseCta?: StrapiCTA;
    enterpriseCtaLabel?: string;
    enterpriseCtaHref?: string;
    enterpriseBullets?: string[] | string;
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

export interface DealerContactSectionData extends Partial<FormTabFields> {
  eyebrow?: string;
  desktopTitle?: string;
  mobileTitle?: string;
  desktopDescription?: string;
  mobileDescription?: string;
  backgroundImage?: StrapiMedia | string;
  cards?: DealerContactCard[];
  form?: HomeContactFormData;
  formHeading?: string;
  formSubheading?: string;
  vehicleOptions?: string[] | string;
  tabs?: FormTabConfig[];
  tab1?: FormTabConfig;
  tab2?: FormTabConfig;
  tab3?: FormTabConfig;
  formTabs?: string[] | string;
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
  cities?: string[] | string;
  dealers?: StrapiDealer[];
  chargingStations?: StrapiChargingStation[];
  serviceCenters?: StrapiServiceCenter[];
}

export interface StrapiFaqItem {
  id?: number;
  question: string;
  answer: string;
  category?: string;
  categories?: string[];
  order?: number;
}

export interface StrapiFaqSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  image?: StrapiMedia;
  items?: StrapiFaqItem[];
}

export interface ChargingFormData {
  id?: number;
  heading?: string;
  subheading?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  nameRequired?: boolean;
  mobileLabel?: string;
  mobilePlaceholder?: string;
  mobileRequired?: boolean;
  cityLabel?: string;
  cityPlaceholder?: string;
  cityRequired?: boolean;
  dropdownLabel?: string;
  dropdownOptions?: string[] | string;
  dropdownRequired?: boolean;
  ctaLabel?: string;
  privacyNotice?: string;
  disclaimer?: string;
}

export interface ChargingContactSectionData {
  id?: number;
  eyebrow?: string;
  title?: string;
  mobileTitle?: string;
  description?: string;
  mobileDescription?: string;
  backgroundImage?: StrapiMedia | string;
  cards?: DealerContactCard[];
  form?: ChargingFormData;
  formHeading?: string;
  formSubheading?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  nameRequired?: boolean;
  mobileLabel?: string;
  mobilePlaceholder?: string;
  mobileRequired?: boolean;
  cityLabel?: string;
  cityPlaceholder?: string;
  cityRequired?: boolean;
  dropdownLabel?: string;
  dropdownOptions?: string[] | string;
  dropdownRequired?: boolean;
  ctaLabel?: string;
  privacyNotice?: string;
  disclaimer?: string;
}

export interface PartnerLogoItem {
  id?: number;
  name: string;
  logoUrl?: string;
  logo?: StrapiMedia;
  width?: number;
  desktopWidth?: number;
}

export interface PartnersSectionData {
  id?: number;
  eyebrow?: string;
  title?: string;
  partners?: PartnerLogoItem[];
}

export interface DealerLocatorPageData {
  id?: number;
  documentId?: string;
  hero?: DealerLocatorHeroData;
  contactSection?: DealerContactSectionData;
  chargingContactSection?: ChargingContactSectionData;
  partnersSection?: PartnersSectionData;
  faqSection?: StrapiFaqSection;
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
