import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StormT1500Hero from "@/components/sections/products/StormT1500Hero";
import ProductSpecs, { STORM_T1500_SPEC_CONTENT } from "@/components/sections/products/ProductSpecs";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import ProductVariantsCompare, { STORM_T1500_VARIANTS } from "@/components/sections/products/ProductVariantsCompare";
import ProductLoanCalculator from "@/components/sections/products/ProductLoanCalculator";
import ProductOverview from "@/components/sections/products/ProductOverview";
import CustomerReviews from "@/components/sections/CustomerReviews";
import ProductOtherVehicles from "@/components/sections/products/ProductOtherVehicles";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Storm EV T1500 | Euler Motors - 1.5-Tonne Electric Goods Carrier Pickup",
  description:
    "Euler Storm EV T1500 is India's leading 1.5-tonne commercial electric goods carrier with 1,500 kg payload, 8-foot deck length, and liquid-cooled battery technology.",
};

export default function StormT1500Page() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <StormT1500Hero />
        <ProductSpecs specContent={STORM_T1500_SPEC_CONTENT} />
        <SavingsCalculator />
        <ProductVariantsCompare
          variants={STORM_T1500_VARIANTS}
          truckImg="/assets/products/vehicle-storm-t1500-clean.png"
        />
        <ProductLoanCalculator defaultVehicleIndex={1} />
        <CustomerReviews autoScrollOnMobile={false} />
        <ProductOverview />
        <ProductOtherVehicles currentVehicleId="storm-ev-t1500" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
