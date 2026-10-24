import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HiLoadHero from "@/components/sections/products/HiLoadHero";
import ProductSpecs, { HILOAD_SPEC_CONTENT } from "@/components/sections/products/ProductSpecs";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import ProductVariantsCompare, { HILOAD_VARIANTS } from "@/components/sections/products/ProductVariantsCompare";
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
  if (slug === "hiload-ev" || slug === "hiload") {
    return {
      title: "HiLoad EV | Euler Motors - India's Most Powerful Electric 3-Wheeler",
      description:
        "Euler HiLoad EV is India's highest payload electric 3-wheeler cargo vehicle with 688 kg payload, 170 km ARAI certified range, and ArcReactor™ liquid cooling.",
    };
  }
  return {
    title: "Product | Euler Motors",
  };
}

export function generateStaticParams() {
  return [
    { slug: "hiload-ev" },
    { slug: "hiload" },
  ];
}

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "hiload-ev" && slug !== "hiload") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <HiLoadHero />
        <ProductSpecs specContent={HILOAD_SPEC_CONTENT} />
        <SavingsCalculator />
        <ProductVariantsCompare
          variants={HILOAD_VARIANTS}
          truckImg="/assets/products/vehicle-hiload-ev.png"
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
