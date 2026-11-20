import type { ComponentType } from "react";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import CustomerReviews, { type ReviewItem as ReviewsReviewItem } from "@/components/sections/CustomerReviews";
import ContactSection from "@/components/sections/ContactSection";
import ProductHero from "@/components/sections/products/ProductHero";
import HiLoadHero from "@/components/sections/products/HiLoadHero";
import TurboHero from "@/components/sections/products/TurboHero";
import StormT1500Hero from "@/components/sections/products/StormT1500Hero";
import ProductSpecs, {
  SPEC_CONTENT,
  HILOAD_SPEC_CONTENT,
  TURBO_SPEC_CONTENT,
  STORM_T1500_SPEC_CONTENT,
  type SpecContent,
} from "@/components/sections/products/ProductSpecs";
import ProductVariantsCompare, {
  STORM_LR200_VARIANTS,
  HILOAD_VARIANTS,
  TURBO_VARIANTS,
  STORM_T1500_VARIANTS,
  type VariantData,
} from "@/components/sections/products/ProductVariantsCompare";
import ProductLoanCalculator from "@/components/sections/products/ProductLoanCalculator";
import ProductOverview from "@/components/sections/products/ProductOverview";
import ProductOtherVehicles, { type VehicleCard } from "@/components/sections/products/ProductOtherVehicles";
import { getProductDetail, mediaUrl, VERIFY_CMS } from "@/lib/strapi/client";
import { mapSpecContent, mapVariants, mapTruckImage } from "./mapProduct";

export type ProductKey = "storm-ev-lr200" | "hiload-ev" | "turbo-ev-1000" | "storm-ev-t1500";

/**
 * Per-product presentation config: the bespoke hero component and the
 * hardcoded spec/variant fallbacks used when Strapi is offline or a product
 * has no CMS content yet. CMS data (when present) always takes precedence.
 */
const PRODUCT_CONFIG: Record<
  ProductKey,
  {
    Hero: ComponentType<{ data?: import("@/types/strapi").StrapiProductHero }>;
    specFallback: SpecContent;
    variantsFallback: VariantData[];
    truckImgFallback: string;
    loanDefaultVehicleIndex: number;
  }
> = {
  "storm-ev-lr200": {
    Hero: ProductHero,
    specFallback: SPEC_CONTENT,
    variantsFallback: STORM_LR200_VARIANTS,
    truckImgFallback: "/assets/products/vehicle-storm-lr200-clean.png",
    loanDefaultVehicleIndex: 0,
  },
  "hiload-ev": {
    Hero: HiLoadHero,
    specFallback: HILOAD_SPEC_CONTENT,
    variantsFallback: HILOAD_VARIANTS,
    truckImgFallback: "/assets/products/vehicle-hiload-ev-clean.png",
    loanDefaultVehicleIndex: 3,
  },
  "turbo-ev-1000": {
    Hero: TurboHero,
    specFallback: TURBO_SPEC_CONTENT,
    variantsFallback: TURBO_VARIANTS,
    truckImgFallback: "/assets/products/vehicle-turbo-1000-clean.png",
    loanDefaultVehicleIndex: 2,
  },
  "storm-ev-t1500": {
    Hero: StormT1500Hero,
    specFallback: STORM_T1500_SPEC_CONTENT,
    variantsFallback: STORM_T1500_VARIANTS,
    truckImgFallback: "/assets/products/vehicle-storm-t1500-clean.png",
    loanDefaultVehicleIndex: 1,
  },
};

/** Hardcoded other-vehicle cards kept as fallback stats/colors per canonical slug. */
const OTHER_VEHICLE_FALLBACKS: Record<string, VehicleCard> = {
  "storm-ev-lr200": {
    id: "storm-ev-lr200",
    name: "Storm EV LR 200",
    image: "/assets/other-vehicles/storm-ev-lr200.webp",
    ground: "#4B423F",
    href: "/products/lr200",
    stats: [
      { label: "on one charge", value: "200+", unit: "km" },
      { label: "Load capacity", value: "1,500", unit: "kg" },
      { label: "Running cost", value: "₹1.05", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
  "turbo-ev-1000": {
    id: "turbo-ev-1000",
    name: "TURBO EV 1000",
    image: "/assets/other-vehicles/turbo-ev-1000.png",
    ground: "#4B423F",
    href: "/products/turbo-ev-1000",
    stats: [
      { label: "on one charge", value: "220", unit: "km" },
      { label: "Load capacity", value: "1,000", unit: "kg" },
      { label: "Running cost", value: "₹0.98", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
  "hiload-ev": {
    id: "hiload-ev",
    name: "HiLoad EV",
    image: "/assets/other-vehicles/hiload-ev.png",
    ground: "#524F56",
    href: "/products/hiload-ev",
    stats: [
      { label: "on one charge", value: "170", unit: "km" },
      { label: "Load capacity", value: "688", unit: "kg" },
      { label: "Running cost", value: "₹0.85", unit: "/km" },
      { label: "Charging Time", value: "60", unit: "min" },
    ],
  },
  "storm-ev-t1500": {
    id: "storm-ev-t1500",
    name: "Storm EV T1500",
    image: "/assets/other-vehicles/storm-ev-t1500.png",
    ground: "#4B423F",
    href: "/products/storm-ev-t1500",
    stats: [
      { label: "on one charge", value: "210", unit: "km" },
      { label: "Load capacity", value: "1,500", unit: "kg" },
      { label: "Running cost", value: "₹1.15", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
};

function mapOtherVehicles(
  items:
    | import("@/types/strapi").StrapiOtherVehicleItem[]
    | undefined
): VehicleCard[] | undefined {
  if (!items || items.length === 0) return undefined;

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const fb = OTHER_VEHICLE_FALLBACKS[item.slug] || Object.values(OTHER_VEHICLE_FALLBACKS)[0];
      const cmsImageUrl = item.image ? mediaUrl(item.image, "") : "";
      // If CMS has the duplicate generic cutout or is missing, use the dedicated local artwork
      const isPlaceholderCutout =
        !cmsImageUrl ||
        cmsImageUrl.includes("vehicle_storm_lr200_clean") ||
        cmsImageUrl.includes("vehicle_storm_t1500_clean");
      const image = isPlaceholderCutout ? (fb?.image || "") : cmsImageUrl;
      return {
        id: item.slug,
        name: fb?.name || item.slug,
        image,
        ground: fb?.ground || "#4B423F",
        href: fb?.href || `/products/${item.slug}`,
        stats: fb?.stats || [],
      };
    });
}

function mapReviews(
  reviews: import("@/types/strapi").ReviewItem[] | undefined
): ReviewsReviewItem[] | undefined {
  if (!reviews || reviews.length === 0) return undefined;

  return reviews.map((r) => ({
    id: r.id,
    documentId: r.documentId,
    customerName: r.customerName,
    roleOrCompany: r.roleOrCompany,
    location: r.location,
    quote: r.quote,
    rating: r.rating ?? 4.9,
    savingsMonthly: r.savingsMonthly ?? "₹41,000 saved a month",
    videoDuration: r.videoDuration ?? "02:32",
    storyImage: r.storyImage ? mediaUrl(r.storyImage as never) : "/assets/reviews/story-a.webp",
    overlayImage: r.overlayImage ? mediaUrl(r.overlayImage as never) : undefined,
    avatarImage: r.avatarImage ? mediaUrl(r.avatarImage as never) : "/assets/reviews/avatar.png",
    video: r.video ? mediaUrl(r.video as never) : undefined,
    videoUrl: r.videoUrl || undefined,
  }));
}

/**
 * Canonical product alias map — every historical URL keeps working and
 * resolves to its canonical CMS product slug.
 */
export const PRODUCT_ALIASES: Record<string, ProductKey> = {
  lr200: "storm-ev-lr200",
  "storm-ev-lr200": "storm-ev-lr200",
  "storm-lr200": "storm-ev-lr200",
  "storm-ev-lr-200": "storm-ev-lr200",
  hiload: "hiload-ev",
  "hiload-ev": "hiload-ev",
  turbo: "turbo-ev-1000",
  "turbo-ev-1000": "turbo-ev-1000",
  "storm-t1500": "storm-ev-t1500",
  "storm-ev-t1500": "storm-ev-t1500",
};

/**
 * Unified product detail page. Hero copy/stats/variants, spec and variant
 * data, overview cards, other vehicles, and reviews come from the Strapi
 * `product` collection; the per-product hardcoded constants act as offline
 * fallbacks, exactly like the careers page.
 */
export default async function ProductDetailView({ slug }: { slug: ProductKey }) {
  const config = PRODUCT_CONFIG[slug];
  const product = await getProductDetail(slug);

  const specContent = VERIFY_CMS
    ? mapSpecContent(product?.specs) ?? {}
    : mapSpecContent(product?.specs) ?? config.specFallback;
  const variants = VERIFY_CMS
    ? mapVariants(product?.variantsCompare) ?? []
    : mapVariants(product?.variantsCompare) ?? config.variantsFallback;
  const truckImg = mapTruckImage(product?.variantsCompare, config.truckImgFallback);
  const otherVehicles = VERIFY_CMS
    ? mapOtherVehicles(product?.otherVehicles?.items) ?? []
    : mapOtherVehicles(product?.otherVehicles?.items);
  const reviews = VERIFY_CMS
    ? mapReviews(product?.reviews) ?? []
    : mapReviews(product?.reviews);
  const { Hero } = config;

  return (
    <>
      <main className="overflow-clip">
        <Hero data={product?.hero} />
        <ProductSpecs specContent={specContent} />
        <SavingsCalculator />
        <ProductVariantsCompare variants={variants} truckImg={truckImg} />
        <ProductLoanCalculator defaultVehicleIndex={config.loanDefaultVehicleIndex} />
        <CustomerReviews
          autoScrollOnMobile={false}
          reviews={reviews}
          eyebrow={product?.reviews?.length ? "Customer stories" : undefined}
          title={product?.reviews?.length ? "What our customers say" : undefined}
        />
        <ProductOverview data={product?.overview} />
        <ProductOtherVehicles currentVehicleId={slug} vehicles={otherVehicles} />
        <ContactSection />
      </main>
    </>
  );
}
