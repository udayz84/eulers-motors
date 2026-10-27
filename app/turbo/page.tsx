import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TurboHero from "@/components/sections/products/TurboHero";
import ProductSpecs, { TURBO_SPEC_CONTENT } from "@/components/sections/products/ProductSpecs";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import ProductVariantsCompare, { TURBO_VARIANTS } from "@/components/sections/products/ProductVariantsCompare";
import ProductLoanCalculator from "@/components/sections/products/ProductLoanCalculator";
import ProductOverview from "@/components/sections/products/ProductOverview";
import CustomerReviews from "@/components/sections/CustomerReviews";
import ProductOtherVehicles from "@/components/sections/products/ProductOtherVehicles";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Turbo EV 1000 | Euler Motors - World's First 1-Tonne Commercial EV Truck",
  description:
    "Euler Turbo EV 1000 offers 1,000 kg certified payload, up to 220 km ARAI certified range, fast charging, and electronic power steering starting from ₹5.99 Lakh.",
};

export default function TurboPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <TurboHero />
        <ProductSpecs specContent={TURBO_SPEC_CONTENT} />
        <SavingsCalculator />
        <ProductVariantsCompare
          variants={TURBO_VARIANTS}
          truckImg="/assets/products/vehicle-turbo-1000-clean.png"
        />
        <ProductLoanCalculator defaultVehicleIndex={2} />
        <CustomerReviews autoScrollOnMobile={false} />
        <ProductOverview />
        <ProductOtherVehicles currentVehicleId="turbo-ev-1000" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
