import {
  HomePageData,
  StrapiMedia,
  StrapiResponse,
  DealerLocatorPageData,
  StrapiDealer,
  StrapiChargingStation,
  StrapiServiceCenter,
} from "@/types/strapi";
import { DEFAULT_HOME_PAGE } from "./defaults/home";
import { DEFAULT_DEALER_LOCATOR_PAGE } from "./defaults/dealer-locator";

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
        form: { populate: "*" },
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
      revalidate: 60,
    },
    DEFAULT_DEALER_LOCATOR_PAGE.hero?.serviceCenters || []
  );
}

/**
 * High-level fetcher for the full Dealer Locator page with all components and relations deeply populated.
 */
export async function getDealerLocatorPageData(): Promise<DealerLocatorPageData> {
  const populate = {
    seo: { populate: "*" },
    hero: {
      populate: {
        dealers: { populate: "*" },
        chargingStations: { populate: "*" },
        serviceCenters: { populate: "*" },
      },
    },
    contactSection: {
      populate: {
        cards: { populate: "*" },
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
