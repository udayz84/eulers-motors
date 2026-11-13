import {
  HomePageData,
  StrapiMedia,
  StrapiResponse,
  DealerLocatorPageData,
  ChargingStationsPageData,
  StrapiDealer,
  StrapiChargingStation,
  StrapiServiceCenter,
  StrapiCareersPageData,
  StrapiTechnologyPageData,
  StrapiCareerPosition,
  StrapiAboutPageData,
  StrapiTimelineMilestone,
  StrapiLeadershipMember,
  StrapiAward,
  StrapiEsgReport,
} from "@/types/strapi";
import { DEFAULT_HOME_PAGE } from "./defaults/home";
import {
  DEFAULT_DEALER_LOCATOR_PAGE,
  DEFAULT_CHARGING_STATIONS_PAGE,
} from "./defaults/dealer-locator";
import {
  DEFAULT_ABOUT_PAGE,
  DEFAULT_AWARDS,
  DEFAULT_ESG_REPORTS,
  DEFAULT_LEADERSHIP_MEMBERS,
  DEFAULT_TIMELINE_MILESTONES,
} from "./defaults/about";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Robust zero-dependency query-string serializer for Strapi v5 deep population.
 */
export function stringifyQuery(obj: Record<string, unknown>, prefix = ""): string {
  const parts: string[] = [];

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === undefined || value === null) continue;

    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === "object" && !Array.isArray(value)) {
      const nested = stringifyQuery(value as Record<string, unknown>, fullKey);
      if (nested) parts.push(nested);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          const nested = stringifyQuery(item as Record<string, unknown>, `${fullKey}[${index}]`);
          if (nested) parts.push(nested);
        } else {
          parts.push(`${encodeURIComponent(`${fullKey}[${index}]`)}=${encodeURIComponent(String(item))}`);
        }
      });
    } else {
      parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.filter(Boolean).join("&");
}

/**
 * Builds a Strapi v5 population query string from a population specification object.
 */
export function buildPopulate(populateObj: Record<string, unknown>): string {
  return stringifyQuery({ populate: populateObj });
}

/**
 * Safely normalizes Strapi upload URLs or falls back to local / CDN assets.
 * 
 * In both local development and production deployments, all media files are
 * mirrored directly into Next.js `public/uploads/`.
 * Therefore, any Strapi upload path `/uploads/...` is served directly and statically
 * by Next.js from the same origin (HTTPS, no mixed content, no port 1337 firewall issues).
 */
export function mediaUrl(
  media: StrapiMedia | string | null | undefined,
  fallback = ""
): string {
  if (!media) return fallback;

  let rawUrl: string | undefined;

  if (typeof media === "string") {
    rawUrl = media;
  } else if (typeof media === "object" && media !== null) {
    if ("url" in media && typeof media.url === "string") {
      rawUrl = media.url;
    } else if ("data" in media && (media as any).data?.attributes?.url) {
      rawUrl = (media as any).data.attributes.url;
    }
  }

  if (!rawUrl || !rawUrl.trim()) return fallback;

  // If a full or partial URL contains /uploads/, always extract the relative
  // /uploads/... path so it is served statically by Next.js from public/uploads/.
  // This avoids issues with localhost, non-standard ports (e.g. :1337),
  // internal Docker hostnames, and HTTPS mixed-content blocks in production.
  if (rawUrl.includes("/uploads/")) {
    const uploadIdx = rawUrl.indexOf("/uploads/");
    return rawUrl.substring(uploadIdx);
  }

  // Fully-qualified external URLs (e.g. S3, Cloudinary, HTTPS CDNs) or data URIs
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("data:")) {
    return rawUrl;
  }

  // Next.js local static assets
  if (rawUrl.startsWith("/assets/") || rawUrl.startsWith("/images/")) {
    return rawUrl;
  }

  // Strapi uploads: served directly by Next.js from public/uploads/
  const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return cleanPath;
}

export interface StrapiFetchOptions {
  populate?: Record<string, unknown> | string;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: Record<string, unknown>;
  revalidate?: number;
  tags?: string[];
  headers?: Record<string, string>;
}

/**
 * Fail-safe HTTP fetch layer for Strapi v5.
 * Never throws fatal exceptions if Strapi is offline; returns null instead.
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options: StrapiFetchOptions = {}
): Promise<StrapiResponse<T> | null> {
  const {
    populate,
    filters,
    sort,
    pagination,
    revalidate = 60,
    tags = [],
    headers = {},
  } = options;

  const queryParams: Record<string, unknown> = {};

  if (populate) {
    queryParams.populate = populate;
  }

  if (filters) queryParams.filters = filters;
  if (sort) queryParams.sort = sort;
  if (pagination) queryParams.pagination = pagination;

  const queryString = stringifyQuery(queryParams);
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${STRAPI_BASE_URL}/api/${cleanEndpoint}${queryString ? `?${queryString}` : ""}`;

  try {
    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };
    if (STRAPI_API_TOKEN) {
      reqHeaders["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: reqHeaders,
      signal: AbortSignal.timeout(15000),
      next: {
        revalidate,
        tags: [cleanEndpoint, ...tags],
      },
    });

    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[Strapi] ${res.status} ${res.statusText} for ${url}`);
      }
      return null;
    }

    const json = (await res.json()) as StrapiResponse<T>;
    return json;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Strapi Offline] Unable to connect to ${url}. Using local fallbacks.`, (err as Error).message);
    }
    return null;
  }
}

/**
 * Merges Strapi Single Type data with fallback defaults.
 * Respects intentional empty values while filling missing/unpopulated sections.
 */
export function mergeWithFallback<T>(strapiData: Partial<T> | null | undefined, fallback: T): T {
  if (!strapiData) return fallback;

  const result: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };

  for (const key of Object.keys(strapiData)) {
    const val = (strapiData as Record<string, unknown>)[key];
    if (val !== undefined && val !== null) {
      // If it's an object (and not an array), do a shallow merge with the fallback section
      if (typeof val === "object" && !Array.isArray(val) && typeof result[key] === "object" && !Array.isArray(result[key])) {
        result[key] = {
          ...(result[key] as Record<string, unknown>),
          ...(val as Record<string, unknown>),
        };
      } else {
        result[key] = val;
      }
    }
  }

  return result as T;
}

/**
 * Fetch a Strapi Single Type with guaranteed fallback data.
 */
export async function getSingleType<T>(
  singularName: string,
  options: StrapiFetchOptions = {},
  fallback: T
): Promise<T> {
  const response = await fetchStrapi<T>(singularName, {
    tags: [`strapi:${singularName}`],
    ...options,
  });

  return mergeWithFallback<T>(response?.data, fallback);
}

/**
 * Fetch a Strapi Collection Type with guaranteed fallback data.
 */
export async function getCollection<T>(
  pluralName: string,
  options: StrapiFetchOptions = {},
  fallback: T[] = []
): Promise<T[]> {
  const response = await fetchStrapi<T[]>(pluralName, {
    tags: [`strapi:${pluralName}`],
    ...options,
  });

  if (!response) {
    return fallback;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return fallback;
}

/**
 * High-level fetcher for the full Homepage with all sections deeply populated.
 */
export async function getHomePageData(): Promise<HomePageData> {
  const populate = {
    seo: { populate: "*" },
    hero: {
      populate: {
        slides: {
          populate: {
            primaryCta: { populate: "*" },
            secondaryCta: { populate: "*" },
            desktopImage: { populate: "*" },
            mobileImage: { populate: "*" },
          },
        },
      },
    },
    statsBanner: {
      populate: {
        stats: { populate: "*" },
      },
    },
    productShowcase: {
      populate: {
        products: {
          populate: "*",
        },
      },
    },
    neoPromo: { populate: "*" },
    savingsCalculator: { populate: "*" },
    talkPromo: { populate: "*" },
    compareSection: {
      populate: {
        quizCta: { populate: "*" },
      },
    },
    technology: {
      populate: {
        cta: { populate: "*" },
        cards: { populate: "*" },
      },
    },
    reviewsSection: {
      populate: {
        reviews: {
          populate: "*",
        },
      },
    },
    primeBanner: { populate: "*" },
    insightsSection: {
      populate: {
        articles: {
          populate: "*",
        },
        viewAllCta: { populate: "*" },
      },
    },
    enterpriseDealer: { populate: "*" },
    contactSection: {
      populate: {
        form: {
          populate: {
            tabs: { populate: "*" },
            tab1: { populate: "*" },
            tab2: { populate: "*" },
            tab3: { populate: "*" },
          },
        },
      },
    },
    socialWall: {
      populate: {
        posts: { populate: "*" },
      },
    },
  };

  return getSingleType<HomePageData>(
    "home-page",
    {
      populate,
      revalidate: 60,
    },
    DEFAULT_HOME_PAGE
  );
}

/**
 * Fetch all authorized Dealers from Strapi collection.
 */
export async function getDealers(): Promise<StrapiDealer[]> {
  return getCollection<StrapiDealer>(
    "dealers",
    {
      sort: "order:asc",
      pagination: { pageSize: 500 },
      revalidate: 60,
    },
    DEFAULT_DEALER_LOCATOR_PAGE.hero?.dealers || []
  );
}

/**
 * Fetch all Charging Stations from Strapi collection.
 */
export async function getChargingStations(): Promise<StrapiChargingStation[]> {
  return getCollection<StrapiChargingStation>(
    "charging-stations",
    {
      sort: "order:asc",
      pagination: { pageSize: 500 },
      revalidate: 60,
    },
    DEFAULT_DEALER_LOCATOR_PAGE.hero?.chargingStations || []
  );
}

/**
 * Fetch all Service Centers from Strapi collection.
 */
export async function getServiceCenters(): Promise<StrapiServiceCenter[]> {
  return getCollection<StrapiServiceCenter>(
    "service-centers",
    {
      sort: "order:asc",
      pagination: { pageSize: 500 },
      revalidate: 60,
    },
    DEFAULT_DEALER_LOCATOR_PAGE.hero?.serviceCenters || []
  );
}

const DEALER_HERO_POPULATE = {
  mapImage: { populate: "*" },
  dealers: { populate: "*" },
  chargingStations: { populate: "*" },
  serviceCenters: { populate: "*" },
};

const CONTACT_CARDS_POPULATE = {
  populate: {
    iconMedia: { populate: "*" },
    mobileIconMedia: { populate: "*" },
  },
};

/**
 * Maps Strapi dealer hero content & live collections into DealerLocatorHero props.
 */
export function mapDealerLocatorHeroProps(
  hero?: DealerLocatorPageData["hero"],
  collections?: {
    dealers?: StrapiDealer[];
    chargingStations?: StrapiChargingStation[];
    serviceCenters?: StrapiServiceCenter[];
  }
) {
  const dealerSource = collections?.dealers ?? hero?.dealers;
  const stationSource = collections?.chargingStations ?? hero?.chargingStations;
  const serviceSource = collections?.serviceCenters ?? hero?.serviceCenters;

  return {
    supportBadgeText: hero?.supportBadge,
    tabContent: hero
      ? {
          dealer: {
            tabLabel: hero.dealerTabLabel,
            title: hero.dealerTabTitle,
            subtitle: hero.dealerTabSubtitle,
            searchLabel: hero.dealerSearchPlaceholder,
            resultsLabel: hero.dealerResultsLabel,
          },
          charging: {
            tabLabel: hero.chargingTabLabel,
            title: hero.chargingTabTitle,
            subtitle: hero.chargingTabSubtitle,
            searchLabel: hero.chargingSearchPlaceholder,
            resultsLabel: hero.chargingResultsLabel,
          },
          service: {
            tabLabel: hero.serviceTabLabel,
            title: hero.serviceTabTitle,
            subtitle: hero.serviceTabSubtitle,
            searchLabel: hero.serviceSearchPlaceholder,
            resultsLabel: hero.serviceResultsLabel,
          },
        }
      : undefined,
    cities: hero?.cities,
    defaultCity: hero?.defaultCity,
    locationButtonLabel: hero?.locationButtonLabel,
    directionsButtonLabel: hero?.directionsButtonLabel,
    distanceUnit: hero?.distanceUnit,
    emptyStateText: hero?.emptyStateText,
    mapImage: hero?.mapImage,
    dealers: dealerSource?.map((d) => ({
      id: d.slug || String(d.id),
      name: d.name,
      badges: d.badges || ["Dealer"],
      address: d.address,
      city: d.city,
      state: d.state,
      hours: d.hours || "Open until 7 pm",
      operatingDays: d.operatingDays,
      distance: d.distance || "1.3",
      phone: d.phone || "1800 000 0000",
    })),
    chargingStations: stationSource?.map((s) => ({
      id: s.slug || String(s.id),
      name: s.name,
      badges: s.badges || ["CCS2"],
      address: s.address,
      city: s.city,
      hours: s.hours || "Open 24 hours",
      operatingDays: s.operatingDays,
      distance: s.distance || "13",
      phone: s.phone || "1800 000 0000",
    })),
    serviceCenters: serviceSource?.map((sc) => ({
      id: sc.slug || String(sc.id),
      name: sc.name,
      badges: sc.badges || ["Service"],
      address: sc.address,
      city: sc.city,
      hours: sc.hours || "Open until 8 pm",
      operatingDays: sc.operatingDays,
      distance: sc.distance || "1.3",
      phone: sc.phone || "1800 000 0000",
    })),
  };
}

/**
 * High-level fetcher for the full Dealer Locator page with all components and relations deeply populated.
 */
export async function getDealerLocatorPageData(): Promise<DealerLocatorPageData> {
  const populate = {
    seo: { populate: "*" },
    hero: {
      populate: DEALER_HERO_POPULATE,
    },
    contactSection: {
      populate: {
        cards: CONTACT_CARDS_POPULATE,
        backgroundImage: { populate: "*" },
        form: {
          populate: {
            tabs: { populate: "*" },
          },
        },
      },
    },
  };

  return getSingleType<DealerLocatorPageData>(
    "dealer-locator-page",
    {
      populate,
      revalidate: 60,
    },
    DEFAULT_DEALER_LOCATOR_PAGE
  );
}

/**
 * Fetch Charging Stations Page Single Type
 */
export async function getChargingStationsPageData(): Promise<ChargingStationsPageData> {
  const populate = {
    seo: { populate: "*" },
    hero: {
      populate: DEALER_HERO_POPULATE,
    },
    chargingContactSection: {
      populate: {
        cards: CONTACT_CARDS_POPULATE,
        backgroundImage: { populate: "*" },
        form: { populate: "*" },
      },
    },
    partnersSection: {
      populate: {
        partners: {
          populate: {
            logo: { populate: "*" },
          },
        },
      },
    },
    faqSection: {
      populate: {
        items: { populate: "*" },
        image: { populate: "*" },
      },
    },
  };

  return getSingleType<ChargingStationsPageData>(
    "charging-stations-page",
    {
      populate,
      revalidate: 60,
    },
    DEFAULT_CHARGING_STATIONS_PAGE
  );
}

/**
 * Fetch Careers Page Single Type
 */
export async function getCareersPageData(): Promise<StrapiCareersPageData> {
  const populate = {
    hero: {
      populate: {
        cta: { populate: "*" },
        desktopImage: { populate: "*" },
        mobileImage: { populate: "*" },
      },
    },
    benefitsSection: {
      populate: {
        benefits: { populate: "*" },
      },
    },
    supportSection: {
      populate: {
        items: {
          populate: {
            icon: { populate: "*" },
          },
        },
      },
    },
    positionsSection: {
      populate: {
        positions: { populate: "*" },
      },
    },
    gallerySection: {
      populate: {
        images: { populate: "*" },
      },
    },
    testimonialsSection: {
      populate: {
        testimonials: {
          populate: {
            image: { populate: "*" },
          },
        },
      },
    },
    seo: { populate: "*" },
  };

  return getSingleType<StrapiCareersPageData>(
    "careers-page",
    {
      populate,
      revalidate: 60,
    },
    {} as StrapiCareersPageData
  );
}

/**
 * Fetch all Career Positions from Strapi collection.
 */
export async function getCareerPositions(): Promise<StrapiCareerPosition[]> {
  return getCollection<StrapiCareerPosition>(
    "career-positions",
    {
      sort: ["order:asc", "id:asc"],
      revalidate: 60,
    },
    []
  );
}

/**
 * Fetch Technology Page Single Type with deeply populated components & relations.
 */
export async function getTechnologyPageData(): Promise<StrapiTechnologyPageData> {
  const populate = {
    hero: {
      populate: {
        cta: { populate: "*" },
        desktopImage: { populate: "*" },
        mobileImage: { populate: "*" },
        philosophyCards: {
          populate: {
            icon: { populate: "*" },
          },
        },
      },
    },
    loadSection: {
      populate: {
        cards: {
          populate: {
            image: { populate: "*" },
          },
        },
      },
    },
    indianRoads: {
      populate: {
        cards: {
          populate: {
            icon: { populate: "*" },
          },
        },
      },
    },
    manufacturing: {
      populate: {
        mainImage: { populate: "*" },
        mobileImage: { populate: "*" },
      },
    },
    knowVehicle: {
      populate: {
        vehicleImage: { populate: "*" },
        parts: {
          populate: {
            icon: { populate: "*" },
          },
        },
      },
    },
    chargingSection: {
      populate: {
        homeImage: { populate: "*" },
        publicImage: { populate: "*" },
        actionTiles: { populate: "*" },
        dos: { populate: "*" },
        donts: { populate: "*" },
      },
    },
    faqSection: {
      populate: {
        image: { populate: "*" },
        items: { populate: "*" },
      },
    },
    shepherdSection: {
      populate: {
        appImage: { populate: "*" },
        cta: { populate: "*" },
        secondaryCta: { populate: "*" },
        features: {
          populate: {
            icon: { populate: "*" },
          },
        },
      },
    },
    proofSection: {
      populate: {
        stats: { populate: "*" },
      },
    },
    reviewsSection: {
      populate: {
        reviews: {
          populate: "*",
        },
      },
    },
    contactSection: {
      populate: {
        form: {
          populate: {
            tabs: { populate: "*" },
          },
        },
      },
    },
    seo: { populate: "*" },
  };

  return getSingleType<StrapiTechnologyPageData>(
    "technology-page",
    {
      populate,
      revalidate: 60,
    },
    {} as StrapiTechnologyPageData
  );
}

/**
 * Fetch About Page Single Type with deeply populated components and shared sections.
 */
export async function getAboutPageData(): Promise<StrapiAboutPageData> {
  const populate = {
    hero: {
      populate: {
        desktopImage: { populate: "*" },
        mobileImage: { populate: "*" },
        mobileOverlayImage: { populate: "*" },
      },
    },
    eulerSection: {
      populate: {
        cards: {
          populate: {
            desktopImage: { populate: "*" },
            mobileImage: { populate: "*" },
          },
        },
      },
    },
    beliefSection: {
      populate: {
        cards: {
          populate: {
            image: { populate: "*" },
          },
        },
      },
    },
    timelineSection: { populate: "*" },
    factorySection: {
      populate: {
        cta: { populate: "*" },
        desktopImage: { populate: "*" },
        mobileImage: { populate: "*" },
      },
    },
    leadershipSection: { populate: "*" },
    partnersSection: {
      populate: {
        partners: {
          populate: {
            logo: { populate: "*" },
          },
        },
      },
    },
    recognitionSection: {
      populate: {
        image: { populate: "*" },
      },
    },
    esgSection: {
      populate: {
        tabs: {
          populate: {
            image: { populate: "*" },
            stats: { populate: "*" },
            cards: { populate: "*" },
          },
        },
      },
    },
    reportsSection: {
      populate: {
        image: { populate: "*" },
        viewAllCta: { populate: "*" },
      },
    },
    hiringSection: {
      populate: {
        cta: { populate: "*" },
        desktopImage: { populate: "*" },
        mobileImage: { populate: "*" },
      },
    },
    contactSection: {
      populate: {
        form: {
          populate: {
            tabs: { populate: "*" },
          },
        },
      },
    },
    faqSection: {
      populate: {
        items: { populate: "*" },
        image: { populate: "*" },
      },
    },
    seo: { populate: "*" },
  };

  return getSingleType<StrapiAboutPageData>(
    "about-page",
    {
      populate,
      revalidate: 60,
    },
    DEFAULT_ABOUT_PAGE
  );
}

/**
 * Fetch active Timeline Milestones sorted chronologically/by order.
 */
export async function getTimelineMilestones(): Promise<StrapiTimelineMilestone[]> {
  return getCollection<StrapiTimelineMilestone>(
    "timeline-milestones",
    {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc", "year:asc", "id:asc"],
      pagination: { pageSize: 100 },
      populate: {
        desktopImage: { populate: "*" },
        mobileImage: { populate: "*" },
      },
      revalidate: 60,
    },
    DEFAULT_TIMELINE_MILESTONES
  );
}

/**
 * Fetch active Leadership Members ordered for display.
 */
export async function getLeadershipMembers(): Promise<StrapiLeadershipMember[]> {
  return getCollection<StrapiLeadershipMember>(
    "leadership-members",
    {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc", "id:asc"],
      pagination: { pageSize: 100 },
      populate: {
        desktopPhoto: { populate: "*" },
        mobilePhoto: { populate: "*" },
      },
      revalidate: 60,
    },
    DEFAULT_LEADERSHIP_MEMBERS
  );
}

/**
 * Fetch active Recognition Awards ordered for display.
 */
export async function getAwards(): Promise<StrapiAward[]> {
  return getCollection<StrapiAward>(
    "awards",
    {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc", "id:asc"],
      pagination: { pageSize: 100 },
      populate: {
        image: { populate: "*" },
      },
      revalidate: 60,
    },
    DEFAULT_AWARDS
  );
}

/**
 * Fetch active ESG Reports & Disclosures ordered for display.
 */
export async function getEsgReports(): Promise<StrapiEsgReport[]> {
  return getCollection<StrapiEsgReport>(
    "esg-reports",
    {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc", "id:asc"],
      pagination: { pageSize: 100 },
      populate: {
        file: { populate: "*" },
      },
      revalidate: 60,
    },
    DEFAULT_ESG_REPORTS
  );
}
