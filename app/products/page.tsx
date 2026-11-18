import type { Metadata } from "next";
import ProductDetailView from "@/components/sections/products/ProductDetailView";
import { getProductDetail } from "@/lib/strapi/client";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductDetail("storm-ev-lr200");

  return {
    title: product?.metaTitle || "Storm EV LR 200 | Euler Motors - Commercial 4-Wheeler EV",
    description:
      product?.metaDescription ||
      "Built for long city and highway runs. 1,200 kg payload, 200 km range, and liquid-cooled battery technology.",
  };
}

export default function ProductsPage() {
  return (
    <>
      <SiteNavbar />
      <ProductDetailView slug="storm-ev-lr200" />
      <SiteFooter />
    </>
  );
}
