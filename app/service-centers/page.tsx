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
  VERIFY_CMS,
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
        <ServiceNextStep data={data.nextStep} />
        <ServicePreventiveAdvice data={data.preventiveAdvice} />
        <PrimeBanner
          isServicePage={true}
          eyebrow="EULER PRIME"
          title={data.primeBanner?.title}
          description={data.primeBanner?.body}
          ctaLabel={data.primeBanner?.ctaLabel}
          features={(data.primeBanner?.stats ?? []).map((s) => ({ value: s.value, label: s.label ?? "" }))}
        />
        <ServiceInstantChat data={data.supportSection} />
        <ChargingStationFaq
          eyebrow={data.faqSection?.eyebrow}
          title={data.faqSection?.title}
          items={data.faqSection?.items}
          image={data.faqSection?.image}
        />
        <ServiceGuidelines data={data.guidelines} />
      </main>
      <SiteFooter />
    </>
  );
}
