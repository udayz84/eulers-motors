import type { Metadata } from "next";
import ProductDetailView from "@/components/sections/products/ProductDetailView";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";

export const metadata: Metadata = {
  title: "Turbo EV 1000 | Euler Motors - World's First 1-Tonne Commercial EV Truck",
  description:
    "Euler Turbo EV 1000 offers 1,000 kg certified payload, up to 220 km ARAI certified range, fast charging, and electronic power steering starting from ₹5.99 Lakh.",
};

export default function TurboPage() {
  return (
    <>
      <SiteNavbar />
      <ProductDetailView slug="turbo-ev-1000" />
      <SiteFooter />
    </>
  );
}
