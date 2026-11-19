import type { StrapiServiceCentersPageData } from "@/types/strapi";

export const defaultServiceCentersPageData: StrapiServiceCentersPageData = {
  hero: {
    supportBadge: "Support",
    tabDealerLabel: "Dealer Locator",
    tabChargingLabel: "Charging Stations",
    tabServiceLabel: "Service Centers",
    title: "Find an Euler Motors Authorized Service Center",
    subtitle:
      "Authorized Euler service centers with genuine parts and certified experts across India.",
    searchPlaceholder: "Search service centers by city",
    resultsLabel: "service centers near you",
    defaultCity: "New Delhi",
    locationButtonLabel: "Use my current location",
    directionsButtonLabel: "Get Directions",
    distanceUnit: "km",
    emptyStateText: "No service centers found. Try another city.",
    helplineLabel: "Toll-Free Helpline",
    helplineNumber: "1800-2128-2128",
  },
  seo: {
    metaTitle: "Find an Euler Motors Authorized Service Center",
    metaDescription:
      "Authorized Euler service centers with genuine parts and certified experts across India.",
  },
};
