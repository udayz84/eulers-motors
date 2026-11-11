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
  thankYouMessage?: string;
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
  operatingDays?: string;
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
  operatingDays?: string;
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
  operatingDays?: string;
  distance?: string;
  phone?: string;
  badges?: string[];
  order?: number;
}

export interface DealerContactCard {
  id?: number;
  icon: string;
  iconMedia?: StrapiMedia | string;
  mobileIconMedia?: StrapiMedia | string;
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
  thankYouMessage?: string;
}

export interface DealerLocatorHeroData {
  supportBadge?: string;
  dealerTabLabel?: string;
  dealerTabTitle?: string;
  dealerTabSubtitle?: string;
  dealerSearchPlaceholder?: string;
  chargingTabLabel?: string;
  chargingTabTitle?: string;
  chargingTabSubtitle?: string;
  chargingSearchPlaceholder?: string;
  serviceTabLabel?: string;
  serviceTabTitle?: string;
  serviceTabSubtitle?: string;
  serviceSearchPlaceholder?: string;
  cities?: string[] | string;
  defaultCity?: string;
  locationButtonLabel?: string;
  dealerResultsLabel?: string;
  chargingResultsLabel?: string;
  serviceResultsLabel?: string;
  directionsButtonLabel?: string;
  distanceUnit?: string;
  emptyStateText?: string;
  mapImage?: StrapiMedia | string;
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
  thankYouMessage?: string;
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
  thankYouMessage?: string;
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
  seo?: StrapiSEO;
}

export interface ChargingStationsPageData {
  id?: number;
  documentId?: string;
  hero?: DealerLocatorHeroData;
  partnersSection?: PartnersSectionData;
  faqSection?: StrapiFaqSection;
  chargingContactSection?: ChargingContactSectionData;
  seo?: StrapiSEO;
}

/**
 * Careers Page Component Types
 */
export interface StrapiCareerBenefitItem {
  id?: number;
  number: string;
  title: string;
  description: string;
}

export interface StrapiCareerBenefitsSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  benefits?: StrapiCareerBenefitItem[];
}

export interface StrapiCareerSupportItem {
  id?: number;
  title: string;
  description: string;
}

export interface StrapiCareerSupportSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: StrapiCareerSupportItem[];
}

export interface StrapiCareerPositionsSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  positions?: StrapiCareerPosition[];
}

export interface StrapiCareerGallerySection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  images?: StrapiMedia[];
}

export interface StrapiCareerTestimonialItem {
  id?: number;
  quote: string;
  name: string;
  role: string;
  image?: StrapiMedia | null;
}

export interface StrapiCareerTestimonialsSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  testimonials?: StrapiCareerTestimonialItem[];
}

export interface StrapiCareerHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: StrapiCTA;
}

export interface StrapiCareersPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiCareerHero;
  benefitsSection?: StrapiCareerBenefitsSection;
  supportSection?: StrapiCareerSupportSection;
  positionsSection?: StrapiCareerPositionsSection;
  gallerySection?: StrapiCareerGallerySection;
  testimonialsSection?: StrapiCareerTestimonialsSection;
  seo?: StrapiSEO;
}

export interface StrapiCareerPosition {
  id?: number;
  documentId?: string;
  title: string;
  department: string;
  location: string;
  experience?: string;
  employmentType?: string;
  description: string;
  slug: string;
  isActive?: boolean;
  applyUrl?: string;
  order?: number;
}

/**
 * Technology Page Single Type Types
 */
export interface StrapiTechnologyPhilosophyCard {
  id?: number;
  title: string;
  description: string;
  icon?: StrapiMedia | string;
}

export interface StrapiTechnologyHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: StrapiCTA;
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
  uptimeValue?: string;
  uptimeUnit?: string;
  uptimeDescription?: string;
  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyDescription?: string;
  philosophyCards?: StrapiTechnologyPhilosophyCard[];
}

export interface StrapiTechnologyLoadCard {
  id?: number;
  eyebrow?: string;
  title: string;
  description: string;
  image?: StrapiMedia | string;
  statValue?: string;
  statUnit?: string;
  statLabel?: string;
}

export interface StrapiTechnologyLoadSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: StrapiTechnologyLoadCard[];
}

export interface StrapiTechnologyRoadConditionCard {
  id?: number;
  condition: string;
  problem: string;
  solution: string;
  icon?: StrapiMedia | string;
}

export interface StrapiTechnologyIndianRoadsSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  problemLabel?: string;
  solutionLabel?: string;
  cards?: StrapiTechnologyRoadConditionCard[];
}

export interface StrapiTechnologyManufacturingSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  mainImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
  videoUrl?: string;
  videoBadgeLabel?: string;
  videoBadgeTag?: string;
}

export interface StrapiTechnologyVehiclePart {
  id?: number;
  partName: string;
  title: string;
  whatIsIt: string;
  whyDoesItMatter: string;
  businessMeaning: string;
  icon?: StrapiMedia | string;
}

export interface StrapiTechnologyKnowVehicleSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  vehicleImage?: StrapiMedia | string;
  whatIsItLabel?: string;
  whyMatterLabel?: string;
  businessMeaningLabel?: string;
  parts?: StrapiTechnologyVehiclePart[];
}

export interface StrapiTechnologyChargingTile {
  id?: number;
  title: string;
  subtitle?: string;
  href: string;
  iconType?: "app" | "station";
}

export interface StrapiTechnologyChargingRule {
  id?: number;
  text: string;
}

export interface StrapiTechnologyChargingSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  homeTabLabel?: string;
  publicTabLabel?: string;
  homeImage?: StrapiMedia | string;
  publicImage?: StrapiMedia | string;
  actionTiles?: StrapiTechnologyChargingTile[];
  dosTitle?: string;
  dos?: StrapiTechnologyChargingRule[];
  dontsTitle?: string;
  donts?: StrapiTechnologyChargingRule[];
}

export interface StrapiTechnologyFaqItem {
  id?: number;
  question: string;
  answer: string;
  category?: string;
}

export interface StrapiTechnologyFaqSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  allCategoryLabel?: string;
  image?: StrapiMedia | string;
  items?: StrapiTechnologyFaqItem[];
}

export interface StrapiTechnologyShepherdFeature {
  id?: number;
  title: string;
  description: string;
  icon?: StrapiMedia | string;
}

export interface StrapiTechnologyShepherdSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  appImage?: StrapiMedia | string;
  cta?: StrapiCTA;
  secondaryCta?: StrapiCTA;
  features?: StrapiTechnologyShepherdFeature[];
}

export interface StrapiTechnologyProofSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  stats?: StrapiStat[];
}

export interface StrapiTechnologyPageData {
  hero?: StrapiTechnologyHero;
  loadSection?: StrapiTechnologyLoadSection;
  indianRoads?: StrapiTechnologyIndianRoadsSection;
  manufacturing?: StrapiTechnologyManufacturingSection;
  knowVehicle?: StrapiTechnologyKnowVehicleSection;
  chargingSection?: StrapiTechnologyChargingSection;
  faqSection?: StrapiTechnologyFaqSection;
  shepherdSection?: StrapiTechnologyShepherdSection;
  proofSection?: StrapiTechnologyProofSection;
  reviewsSection?: HomePageData["reviewsSection"];
  contactSection?: HomePageData["contactSection"];
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
