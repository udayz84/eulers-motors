import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import ServiceNextStep from "@/components/sections/ServiceNextStep";
import ServicePreventiveAdvice from "@/components/sections/ServicePreventiveAdvice";
import PrimeBanner from "@/components/sections/PrimeBanner";
import ServiceInstantChat from "@/components/sections/ServiceInstantChat";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import ServiceGuidelines from "@/components/sections/ServiceGuidelines";
import Footer from "@/components/sections/Footer";
import {
  getChargingStations,
  getDealerLocatorPageData,
  getDealers,
  getServiceCenters,
  mapDealerLocatorHeroProps,
} from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDealerLocatorPageData();
  const hero = data?.hero;
  const seo = data?.seo;
  return {
    title: hero?.serviceTabTitle || seo?.metaTitle || "Find an Euler Motors Authorized Service Center",
    description:
      hero?.serviceTabSubtitle ||
      seo?.metaDescription ||
      "Authorized Euler service centers with genuine parts and certified experts across India.",
    keywords: seo?.keywords || "euler service center, commercial ev repairs, euler workshop, euler parts",
  };
}

export default async function ServiceCentersPage() {
  const [data, dealers, chargingStations, serviceCenters] = await Promise.all([
    getDealerLocatorPageData(),
    getDealers(),
    getChargingStations(),
    getServiceCenters(),
  ]);

  const heroProps = mapDealerLocatorHeroProps(data?.hero, {
    dealers,
    chargingStations,
    serviceCenters,
  });

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="service" {...heroProps} />
        <ServiceNextStep />
        <ServicePreventiveAdvice />
        <PrimeBanner isServicePage={true} />
        <ServiceInstantChat />
        <ChargingStationFaq />
        <ServiceGuidelines />
      </main>
      <Footer />
    </>
  );
}
