import type { Metadata } from "next";
import ProductDetailView from "@/components/sections/products/ProductDetailView";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";

export const metadata: Metadata = {
  title: "Storm EV T1500 | Euler Motors - 1.5-Tonne Electric Goods Carrier Pickup",
  description:
    "Euler Storm EV T1500 is India's leading 1.5-tonne commercial electric goods carrier with 1,500 kg payload, 8-foot deck length, and liquid-cooled battery technology.",
};

export default function StormT1500Page() {
  return (
    <>
      <SiteNavbar />
      <ProductDetailView slug="storm-ev-t1500" />
      <SiteFooter />
    </>
  );
}
