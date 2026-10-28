import Navbar from "@/components/Navbar";
import ProductHero from "@/components/sections/products/ProductHero";
import ProductSpecs from "@/components/sections/products/ProductSpecs";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import ProductVariantsCompare, {
  STORM_LR200_VARIANTS,
} from "@/components/sections/products/ProductVariantsCompare";
import ProductLoanCalculator from "@/components/sections/products/ProductLoanCalculator";
import ProductOverview from "@/components/sections/products/ProductOverview";
import CustomerReviews from "@/components/sections/CustomerReviews";
import ProductOtherVehicles from "@/components/sections/products/ProductOtherVehicles";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <ProductHero />
        <ProductSpecs />
        <SavingsCalculator />
        <ProductVariantsCompare
          variants={STORM_LR200_VARIANTS}
          truckImg="/assets/products/vehicle-storm-lr200-clean.png"
        />
        <ProductLoanCalculator defaultVehicleIndex={0} />
        <CustomerReviews autoScrollOnMobile={false} />
        <ProductOverview />
        <ProductOtherVehicles currentVehicleId="storm-ev-lr200" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
