import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailView, {
  PRODUCT_ALIASES,
  type ProductKey,
} from "@/components/sections/products/ProductDetailView";
import { getProductDetail } from "@/lib/strapi/client";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";

export const revalidate = 60;

const FALLBACK_METADATA: Record<ProductKey, { title: string; description: string }> = {
  "storm-ev-lr200": {
    title: "Storm EV LR 200 | Euler Motors - Commercial 4-Wheeler EV",
    description:
      "Built for long city and highway runs. 1,200 kg payload, 200 km range, and liquid-cooled battery technology.",
  },
  "hiload-ev": {
    title: "HiLoad EV | Euler Motors - India's Most Powerful Electric 3-Wheeler",
    description:
      "Euler HiLoad EV is India's highest payload electric 3-wheeler cargo vehicle with 688 kg payload, 170 km ARAI certified range, and ArcReactor™ liquid cooling.",
  },
  "turbo-ev-1000": {
    title: "Turbo EV 1000 | Euler Motors - World's First 1-Tonne Commercial EV Truck",
    description:
      "Euler Turbo EV 1000 offers 1,000 kg certified payload, up to 220 km ARAI certified range, fast charging, and electronic power steering starting from ₹5.99 Lakh.",
  },
  "storm-ev-t1500": {
    title: "Storm EV T1500 | Euler Motors - 1.5-Tonne Electric Goods Carrier Pickup",
    description:
      "Euler Storm EV T1500 is India's leading 1.5-tonne commercial electric goods carrier with 1,500 kg payload, 8-foot deck length, and liquid-cooled battery technology.",
  },
};

function resolveCanonical(slug: string): ProductKey | null {
  return PRODUCT_ALIASES[slug] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = resolveCanonical(slug);

  if (!canonical) return { title: "Product | Euler Motors" };

  const product = await getProductDetail(canonical);
  const fallback = FALLBACK_METADATA[canonical];

  return {
    title: product?.metaTitle || fallback.title,
    description: product?.metaDescription || fallback.description,
  };
}

export function generateStaticParams() {
  return Object.keys(PRODUCT_ALIASES).map((slug) => ({ slug }));
}

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonical = resolveCanonical(slug);

  if (!canonical) notFound();

  return (
    <>
      <SiteNavbar />
      <ProductDetailView slug={canonical} />
      <SiteFooter />
    </>
  );
}
