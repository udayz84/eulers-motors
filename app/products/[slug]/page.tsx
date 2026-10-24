import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProductHero from "@/components/sections/products/ProductHero";
import HiLoadHero from "@/components/sections/products/HiLoadHero";
import TurboHero from "@/components/sections/products/TurboHero";
import StormT1500Hero from "@/components/sections/products/StormT1500Hero";
import ProductSpecs, {
  HILOAD_SPEC_CONTENT,
  TURBO_SPEC_CONTENT,
  STORM_T1500_SPEC_CONTENT,
} from "@/components/sections/products/ProductSpecs";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import ProductVariantsCompare, {
  HILOAD_VARIANTS,
  TURBO_VARIANTS,
  STORM_T1500_VARIANTS,
} from "@/components/sections/products/ProductVariantsCompare";
import ProductLoanCalculator from "@/components/sections/products/ProductLoanCalculator";
import ProductOverview from "@/components/sections/products/ProductOverview";
import CustomerReviews from "@/components/sections/CustomerReviews";
import ProductOtherVehicles from "@/components/sections/products/ProductOtherVehicles";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "lr200" || slug === "storm-ev-lr200" || slug === "storm-lr200" || slug === "storm-ev-lr-200") {
    return {
      title: "Storm EV LR 200 | Euler Motors - Commercial 4-Wheeler EV",
      description:
        "Built for long city and highway runs. 1,200 kg payload, 200 km range, and liquid-cooled battery technology.",
    };
  }
  if (slug === "hiload-ev" || slug === "hiload") {
    return {
      title: "HiLoad EV | Euler Motors - India's Most Powerful Electric 3-Wheeler",
      description:
        "Euler HiLoad EV is India's highest payload electric 3-wheeler cargo vehicle with 688 kg payload, 170 km ARAI certified range, and ArcReactor™ liquid cooling.",
    };
  }
  if (slug === "turbo-ev-1000" || slug === "turbo") {
    return {
      title: "Turbo EV 1000 | Euler Motors - World's First 1-Tonne Commercial EV Truck",
      description:
        "Euler Turbo EV 1000 offers 1,000 kg certified payload, up to 220 km ARAI certified range, fast charging, and electronic power steering starting from ₹5.99 Lakh.",
    };
  }
  if (slug === "storm-ev-t1500" || slug === "storm-t1500") {
    return {
      title: "Storm EV T1500 | Euler Motors - 1.5-Tonne Electric Goods Carrier Pickup",
      description:
        "Euler Storm EV T1500 is India's leading 1.5-tonne commercial electric goods carrier with 1,500 kg payload, 8-foot deck length, and liquid-cooled battery technology.",
    };
  }
  return {
    title: "Product | Euler Motors",
  };
}

export function generateStaticParams() {
  return [
    { slug: "lr200" },
    { slug: "storm-ev-lr200" },
    { slug: "storm-lr200" },
    { slug: "storm-ev-lr-200" },
    { slug: "hiload-ev" },
    { slug: "hiload" },
    { slug: "turbo-ev-1000" },
    { slug: "turbo" },
    { slug: "storm-ev-t1500" },
    { slug: "storm-t1500" },
  ];
}

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "lr200" || slug === "storm-ev-lr200" || slug === "storm-lr200" || slug === "storm-ev-lr-200") {
    return (
      <>
        <Navbar />
        <main className="overflow-clip">
          <ProductHero />
          <ProductSpecs />
          <SavingsCalculator />
          <ProductVariantsCompare />
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

  if (slug === "hiload-ev" || slug === "hiload") {
    return (
      <>
        <Navbar />
        <main className="overflow-clip">
          <HiLoadHero />
          <ProductSpecs specContent={HILOAD_SPEC_CONTENT} />
          <SavingsCalculator />
          <ProductVariantsCompare
            variants={HILOAD_VARIANTS}
            truckImg="/assets/products/vehicle-hiload-ev-clean.png"
          />
          <ProductLoanCalculator defaultVehicleIndex={3} />
          <CustomerReviews autoScrollOnMobile={false} />
          <ProductOverview />
          <ProductOtherVehicles currentVehicleId="hiload-ev" />
          <ContactSection />
        </main>
        <Footer />
      </>
    );
  }

  if (slug === "turbo-ev-1000" || slug === "turbo") {
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

  if (slug === "storm-ev-t1500" || slug === "storm-t1500") {
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

  notFound();
}
