import type { Metadata } from "next";
import ProductDetailView from "@/components/sections/products/ProductDetailView";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";

export const metadata: Metadata = {
  title: "HiLoad EV | Euler Motors - India's Most Powerful Electric 3-Wheeler",
  description:
    "Euler HiLoad EV is India's highest payload electric 3-wheeler cargo vehicle with 688 kg payload, 170 km ARAI certified range, and ArcReactor™ liquid cooling.",
};

export default function HiLoadPage() {
  return (
    <>
      <SiteNavbar />
      <ProductDetailView slug="hiload-ev" />
      <SiteFooter />
    </>
  );
}
