import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import PartnersInvestors from "@/components/sections/PartnersInvestors";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import ChargingStationNextStep from "@/components/sections/ChargingStationNextStep";
import Footer from "@/components/sections/Footer";
import {
  getChargingStations,
  getChargingStationsPageData,
  getDealers,
  getServiceCenters,
  mapDealerLocatorHeroProps,
} from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getChargingStationsPageData();
  const hero = data?.hero;
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || hero?.chargingTabTitle || "Find an EV Charging Point Across India",
    description:
      seo?.metaDescription ||
      hero?.chargingTabSubtitle ||
      "1,412 fast charging points across India, with live status on each one.",
    keywords: seo?.keywords || "ev charging station, euler fast charge, commercial ev charger, ccs2 charging india",
  };
}

export default async function ChargingStationsPage() {
  const [data, dealers, chargingStations, serviceCenters] = await Promise.all([
    getChargingStationsPageData(),
    getDealers(),
    getChargingStations(),
    getServiceCenters(),
  ]);

  const faqSection = data?.faqSection;
  const heroProps = mapDealerLocatorHeroProps(data?.hero, {
    dealers,
    chargingStations,
    serviceCenters,
  });

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="charging" {...heroProps} />
        <PartnersInvestors
          data={data?.partnersSection}
          title={data?.partnersSection?.title || "Trusted network partners"}
        />
        <ChargingStationFaq
          eyebrow={faqSection?.eyebrow}
          title={faqSection?.title}
          items={faqSection?.items}
          image={faqSection?.image}
        />
        <ChargingStationNextStep data={data?.chargingContactSection} />
      </main>
      <Footer />
    </>
  );
}
