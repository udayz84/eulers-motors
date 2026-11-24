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
  runningCost?: string;
  productUrl?: string;
  image?: StrapiMedia;
  mobileImage?: StrapiMedia;
  order?: number;
}

/**
 * Product Detail Page Component Types
 */
export interface StrapiSpecRow {
  id?: number;
  label: string;
  value: string;
  icon?: string;
}

export interface StrapiSpecCategory {
  id?: number;
  categoryName: string;
  image?: StrapiMedia | string;
  imageAlt?: string;
  rows?: StrapiSpecRow[];
}

export interface StrapiProductSpecs {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  categories?: StrapiSpecCategory[];
}

export interface StrapiVariantDetail {
  id?: number;
  name: string;
  price?: string;
  priceNumeric?: number;
  bodyType?: string;
  payload?: string;
  range?: string;
  runningCost?: string;
  fullCharge?: string;
  cargoSpace?: string;
  image?: StrapiMedia | string;
}

export interface StrapiVariantsCompare {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  truckImage?: StrapiMedia | string;
  variants?: StrapiVariantDetail[];
}

export interface StrapiVariantOption {
  id?: number;
  name: string;
  fullName?: string;
  range?: string;
  price?: string;
  image?: StrapiMedia | string;
}

export interface StrapiProductHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  tagline?: string;
  startingPrice?: string;
  priceNote?: string;
  stats?: StrapiStat[];
  primaryCta?: StrapiCTA;
  secondaryCta?: StrapiCTA;
  variants?: StrapiVariantOption[];
  mainImage?: StrapiMedia | string;
  gallery?: StrapiMedia[];
  brochureFile?: StrapiMedia | string;
}

export interface StrapiOverviewCard {
  id?: number;
  title: string;
  description: string;
  badge?: string;
  image?: StrapiMedia | string;
  imageAlt?: string;
  tags?: string;
}

export interface StrapiProductOverviewSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: StrapiOverviewCard[];
}

export interface StrapiProductLoanCalculator {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  defaultPrice?: number;
  defaultDownPayment?: number;
  defaultTenureMonths?: number;
  defaultInterestRate?: number;
  partners?: StrapiMedia[];
  cta?: StrapiCTA;
}

export interface StrapiPageHero {
  id?: number;
  supportBadge?: string;
  tabDealerLabel?: string;
  tabChargingLabel?: string;
  tabServiceLabel?: string;
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  resultsLabel?: string;
  cities?: string;
  defaultCity?: string;
  locationButtonLabel?: string;
  directionsButtonLabel?: string;
  distanceUnit?: string;
  emptyStateText?: string;
  mapImage?: StrapiMedia | string;
  helplineLabel?: string;
  helplineNumber?: string;
}

export interface StrapiServiceCentersPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiPageHero;
  seo?: StrapiSEO;
}

export interface StrapiOtherVehicleItem {
  id?: number;
  slug: string;
  image?: StrapiMedia | string;
}

export interface StrapiOtherVehiclesSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: StrapiOtherVehicleItem[];
}

export interface StrapiProductDetail extends ProductItem {
  metaTitle?: string;
  metaDescription?: string;
  specs?: StrapiProductSpecs;
  variantsCompare?: StrapiVariantsCompare;
  hero?: StrapiProductHero;
  overview?: StrapiProductOverviewSection;
  loanCalculator?: StrapiProductLoanCalculator;
  otherVehicles?: StrapiOtherVehiclesSection;
  reviews?: ReviewItem[];
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
  mobileImage?: StrapiMedia;
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
  mobileBackgroundImage?: StrapiMedia | string;
  features?: { value: string; label: string }[];
}

export interface ComparePersonaPoints {
  persona: string;
  points: string[];
}

export interface ComparePointItem {
  id?: number;
  text: string;
  icon?: string;
  iconMedia?: StrapiMedia | string;
  image?: StrapiMedia | string;
  persona?: "All" | "Fleet owner" | "Transport company" | "Small business" | "Driver" | "Dealer" | string;
}

export interface CompareSectionData {
  id?: number;
  eyebrow?: string;
  title?: string;
  quizTitle?: string;
  quizSubtitle?: string;
  quizCta?: StrapiCTA;
  withoutEulerPoints?: (ComparePointItem | ComparePersonaPoints)[];
  withEulerPoints?: (ComparePointItem | ComparePersonaPoints)[];
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
  image?: StrapiMedia;
  mobileImage?: StrapiMedia;
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
  mobileBackgroundImage?: StrapiMedia | string;
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
  mobileBackgroundImage?: StrapiMedia | string;
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
  pageHero?: StrapiPageHero;
}

export interface ChargingStationsPageData {
  id?: number;
  documentId?: string;
  hero?: DealerLocatorHeroData;
  partnersSection?: PartnersSectionData;
  faqSection?: StrapiFaqSection;
  chargingContactSection?: ChargingContactSectionData;
  seo?: StrapiSEO;
  pageHero?: StrapiPageHero;
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
  icon?: StrapiMedia | string;
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
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
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
 * FAQ Page Component Types
 */
export interface StrapiFaqHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiFaqCategory {
  id?: number;
  label: string;
}

export interface StrapiFaqPageItem {
  id?: number;
  question: string;
  answer: string;
  category: string;
  isFeatured?: boolean;
  order?: number;
}

export interface StrapiFaqQuickHelpCard {
  id?: number;
  icon?: StrapiMedia | string;
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
}

export interface StrapiFaqQuickHelpSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: StrapiFaqQuickHelpCard[];
}

export interface StrapiFaqFaqsSection {
  id?: number;
  searchPlaceholder?: string;
  lastUpdated?: string;
  introText?: string;
  categories?: StrapiFaqCategory[];
  items?: StrapiFaqPageItem[];
}

export interface StrapiFaqPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiFaqHero;
  faqsSection?: StrapiFaqFaqsSection;
  quickHelpSection?: StrapiFaqQuickHelpSection;
  seo?: StrapiSEO;
}

/**
 * In-Press Page Component Types
 */
export interface StrapiPressHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiPressStory {
  id?: number;
  source: string;
  date: string;
  title: string;
  summary: string;
  image?: StrapiMedia | string;
  url?: string;
}

export interface StrapiPressFeaturedSection {
  id?: number;
  title?: string;
  stories?: StrapiPressStory[];
}

export interface StrapiPressCategory {
  id?: number;
  label: string;
}

export interface StrapiPressArticle {
  id?: number;
  source: string;
  date: string;
  title: string;
  summary: string;
  category: string;
  url?: string;
}

export interface StrapiPressCoverageSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  categories?: StrapiPressCategory[];
  articles?: StrapiPressArticle[];
}

export interface StrapiPressMediaKitItem {
  id?: number;
  label: string;
  title: string;
  size?: string;
  filename: string;
}

export interface StrapiPressMediaKitSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: StrapiPressMediaKitItem[];
}

export interface StrapiPressContactSection {
  id?: number;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  email?: string;
}

export interface StrapiInPressPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiPressHero;
  featuredSection?: StrapiPressFeaturedSection;
  coverageSection?: StrapiPressCoverageSection;
  mediaKitSection?: StrapiPressMediaKitSection;
  contactSection?: StrapiPressContactSection;
  seo?: StrapiSEO;
}

/**
 * Insights Page Component Types
 */
export interface StrapiInsightsHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiInsightsCategory {
  id?: number;
  label: string;
}

export interface StrapiInsightsArticle {
  id?: number;
  title: string;
  slug: string;
  category?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  image?: StrapiMedia | string;
  author?: string;
  authorImage?: StrapiMedia | string;
}

export interface StrapiInsightsFeaturedSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  articles?: StrapiInsightsArticle[];
}

export interface StrapiInsightsListingSection {
  id?: number;
  searchPlaceholder?: string;
  categories?: StrapiInsightsCategory[];
  articles?: StrapiInsightsArticle[];
}

export interface StrapiInsightsPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiInsightsHero;
  featuredSection?: StrapiInsightsFeaturedSection;
  listingSection?: StrapiInsightsListingSection;
  seo?: StrapiSEO;
}

/**
 * Legal Policy Page Component Types
 * Shared by privacy-policy, refund-policy, and terms-conditions single types.
 */
export interface StrapiLegalHero {
  id?: number;
  label?: string;
  title?: string;
  description?: string;
  image?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiLegalIntro {
  id?: number;
  lastUpdated?: string;
  paragraphs?: string;
}

export interface StrapiLegalSectionItem {
  id?: number;
  title: string;
  body: string;
}

export interface StrapiLegalListItem {
  id?: number;
  text: string;
}

export interface StrapiLegalCallout {
  id?: number;
  title: string;
  items?: StrapiLegalListItem[];
}

export interface StrapiPrivacyPolicyPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiLegalHero;
  intro?: StrapiLegalIntro;
  sections?: StrapiLegalSectionItem[];
  seo?: StrapiSEO;
}

export interface StrapiRefundPolicyPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiLegalHero;
  intro?: StrapiLegalIntro;
  callouts?: StrapiLegalCallout[];
  closingText?: string;
  seo?: StrapiSEO;
}

export interface StrapiTermsConditionsPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiLegalHero;
  intro?: StrapiLegalIntro;
  sections?: StrapiLegalSectionItem[];
  seo?: StrapiSEO;
}

/**
 * Site Chrome (Navbar / Footer) Component Types
 */
export interface StrapiNavLink {
  id?: number;
  label: string;
  href: string;
}

export interface StrapiMenuItem {
  id?: number;
  label: string;
  desc?: string;
  href?: string;
}

export interface StrapiVehicleCard {
  id?: number;
  name: string;
  payload?: string;
  href: string;
  category?: "4-Wheelers" | "3-Wheelers";
  image?: StrapiMedia | string;
}

export interface StrapiNavbarData {
  id?: number;
  documentId?: string;
  logo?: string;
  links?: StrapiNavLink[];
  companyLinks?: StrapiMenuItem[];
  supportLinks?: StrapiMenuItem[];
  productLinks?: StrapiMenuItem[];
  megaVehicles?: StrapiVehicleCard[];
  ctaLabel?: string;
  ctaHref?: string;
  searchPlaceholder?: string;
}

export interface StrapiFooterLink {
  id?: number;
  label: string;
  href: string;
}

export interface StrapiFooterColumn {
  id?: number;
  title: string;
  openOnMobile?: boolean;
  links?: StrapiFooterLink[];
}

export interface StrapiSocialLink {
  id?: number;
  label: string;
  href: string;
  icon?: string;
  flip?: boolean;
}

export interface StrapiFooterData {
  id?: number;
  documentId?: string;
  logo?: string;
  columns?: StrapiFooterColumn[];
  socials?: StrapiSocialLink[];
  copyright?: string;
  cin?: string;
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
 * About Page Single Type & Collection Types
 */
export interface StrapiAboutHero {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
  mobileOverlayImage?: StrapiMedia | string;
}

export interface StrapiAboutEulerCard {
  id?: number;
  badge: string;
  title: string;
  description: string;
  stat?: string;
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiAboutEulerSection {
  id?: number;
  eyebrow?: string;
  cards?: StrapiAboutEulerCard[];
}

export interface StrapiAboutBeliefCard {
  id?: number;
  title: string;
  image?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiAboutBeliefSection {
  id?: number;
  eyebrow?: string;
  mobileEyebrow?: string;
  title?: string;
  description?: string;
  cards?: StrapiAboutBeliefCard[];
}

export interface StrapiAboutTimelineSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface StrapiAboutFactorySection {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: StrapiCTA;
  videoUrl?: string;
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiAboutLeadershipSection {
  id?: number;
  eyebrow?: string;
  title?: string;
}

export interface StrapiAboutRecognitionSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  image?: StrapiMedia | string;
}

export interface StrapiAboutEsgCard {
  id?: number;
  number: string;
  title: string;
  description: string;
}

export interface StrapiAboutEsgTab {
  id?: number;
  tabTitle: string;
  headline: string;
  summary: string;
  image?: StrapiMedia | string;
  stats?: StrapiStat[];
  cards?: StrapiAboutEsgCard[];
}

export interface StrapiAboutEsgSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  tabs?: StrapiAboutEsgTab[];
}

export interface StrapiAboutReportsSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  image?: StrapiMedia | string;
  viewAllCta?: StrapiCTA;
}

export interface StrapiAboutHiringSection {
  id?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: StrapiCTA;
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
}

export interface StrapiAboutPageData {
  id?: number;
  documentId?: string;
  hero?: StrapiAboutHero;
  eulerSection?: StrapiAboutEulerSection;
  beliefSection?: StrapiAboutBeliefSection;
  timelineSection?: StrapiAboutTimelineSection;
  factorySection?: StrapiAboutFactorySection;
  leadershipSection?: StrapiAboutLeadershipSection;
  partnersSection?: PartnersSectionData;
  recognitionSection?: StrapiAboutRecognitionSection;
  esgSection?: StrapiAboutEsgSection;
  reportsSection?: StrapiAboutReportsSection;
  hiringSection?: StrapiAboutHiringSection;
  contactSection?: HomePageData["contactSection"];
  faqSection?: StrapiFaqSection;
  seo?: StrapiSEO;
}

export interface StrapiTimelineMilestone {
  id?: number;
  documentId?: string;
  year: number;
  title: string;
  description: string;
  badges?: string[] | string;
  desktopImage?: StrapiMedia | string;
  mobileImage?: StrapiMedia | string;
  isActive?: boolean;
  order?: number;
}

export interface StrapiLeadershipMember {
  id?: number;
  documentId?: string;
  name: string;
  role?: string;
  slug: string;
  desktopPhoto?: StrapiMedia | string;
  mobilePhoto?: StrapiMedia | string;
  isActive?: boolean;
  order?: number;
}

export interface StrapiAward {
  id?: number;
  documentId?: string;
  year: string;
  title: string;
  description: string;
  image?: StrapiMedia | string;
  isActive?: boolean;
  order?: number;
}

export interface StrapiEsgReport {
  id?: number;
  documentId?: string;
  title: string;
  fileSize: string;
  file?: StrapiMedia | string;
  externalUrl?: string;
  iconVariant?: "default" | "highlight";
  isActive?: boolean;
  order?: number;
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
