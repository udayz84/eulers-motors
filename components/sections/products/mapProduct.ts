import type {
  StrapiProductSpecs,
  StrapiVariantsCompare,
} from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";
import type { SpecContent } from "./ProductSpecs";
import type { VariantData } from "./ProductVariantsCompare";

const FALLBACK_SPEC_IMAGE = "/assets/products/spec-image.png";
const FALLBACK_ROW_ICON = "spec-ic-target.svg";

/**
 * Maps the Strapi `product.specs` component to the SpecContent record shape
 * consumed by ProductSpecs. Returns null when no categories exist so callers
 * can fall back to their per-product hardcoded spec content.
 */
export function mapSpecContent(data?: StrapiProductSpecs): SpecContent | null {
  const categories = data?.categories || [];
  if (categories.length === 0) return null;

  const content: SpecContent = {};
  for (const category of categories) {
    if (!category.categoryName) continue;
    content[category.categoryName] = {
      rows: (category.rows || []).map((row) => ({
        icon: row.icon || FALLBACK_ROW_ICON,
        label: row.label,
        value: row.value,
      })),
      image: category.image
        ? mediaUrl(category.image, FALLBACK_SPEC_IMAGE)
        : FALLBACK_SPEC_IMAGE,
      imageAlt: category.imageAlt || "Euler Motors specifications",
    };
  }

  return Object.keys(content).length ? content : null;
}

/**
 * Maps the Strapi `product.variants-compare` variants to the VariantData[]
 * shape consumed by ProductVariantsCompare. Returns null when empty so callers
 * can fall back to their per-product hardcoded variant lists.
 */
export function mapVariants(data?: StrapiVariantsCompare): VariantData[] | null {
  const variants = data?.variants || [];
  if (variants.length === 0) return null;

  return variants.map((variant) => ({
    name: variant.name,
    price: variant.priceNumeric ?? 0,
    bodyType: variant.bodyType || "",
    payload: variant.payload || "",
    range: variant.range || "",
    runningCost: variant.runningCost || "",
    fullCharge: variant.fullCharge || "",
    cargoSpace: variant.cargoSpace || "",
  }));
}

/**
 * Resolves the comparison truck image, preferring the CMS media with the
 * per-product local asset as fallback.
 */
export function mapTruckImage(data: StrapiVariantsCompare | undefined, fallback: string): string {
  return data?.truckImage ? mediaUrl(data.truckImage, fallback) : fallback;
}
