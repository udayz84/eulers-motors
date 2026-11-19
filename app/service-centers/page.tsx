import { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import ServiceNextStep from "@/components/sections/ServiceNextStep";
import ServicePreventiveAdvice from "@/components/sections/ServicePreventiveAdvice";
import PrimeBanner from "@/components/sections/PrimeBanner";
import ServiceInstantChat from "@/components/sections/ServiceInstantChat";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import ServiceGuidelines from "@/components/sections/ServiceGuidelines";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import {
  getServiceCenters,
  getServiceCentersPageData,
  mapDealerLocatorHeroProps,
} from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getServiceCentersPageData();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || data?.hero?.title || "Find an Euler Motors Authorized Service Center",
    description:
      seo?.metaDescription ||
      data?.hero?.subtitle ||
      "Authorized Euler service centers with genuine parts and certified experts across India.",
    keywords: seo?.keywords || "euler service center, commercial ev repairs, euler workshop, euler parts",
  };
}

export default async function ServiceCentersPage() {
  const [data, serviceCenters] = await Promise.all([
    getServiceCentersPageData(),
    getServiceCenters(),
  ]);

  const heroProps = mapDealerLocatorHeroProps(undefined, { serviceCenters }, data?.hero);

  return (
    <>
      <SiteNavbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="service" {...heroProps} />
        <ServiceNextStep />
        <ServicePreventiveAdvice />
        <PrimeBanner isServicePage={true} />
        <ServiceInstantChat />
        <ChargingStationFaq />
        <ServiceGuidelines />
      </main>
      <SiteFooter />
    </>
  );
}
