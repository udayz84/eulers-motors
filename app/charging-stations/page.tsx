import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import PartnersInvestors from "@/components/sections/PartnersInvestors";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import ChargingStationNextStep from "@/components/sections/ChargingStationNextStep";
import Footer from "@/components/sections/Footer";
import { getChargingStationsPageData } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getChargingStationsPageData();
  const hero = data?.hero;
  return {
    title: hero?.chargingTabTitle || "Find an EV Charging Point Across India",
    description:
      hero?.chargingTabSubtitle ||
      "1,412 fast charging points across India, with live status on each one.",
    keywords: "ev charging station, euler fast charge, commercial ev charger, ccs2 charging india",
  };
}

export default async function ChargingStationsPage() {
  const data = await getChargingStationsPageData();
  const hero = data?.hero;
  const faqSection = data?.faqSection;

  const tabContent = hero
    ? {
        dealer: {
          title: hero.dealerTabTitle,
          subtitle: hero.dealerTabSubtitle,
          searchLabel: hero.dealerSearchPlaceholder,
        },
        charging: {
          title: hero.chargingTabTitle,
          subtitle: hero.chargingTabSubtitle,
          searchLabel: hero.chargingSearchPlaceholder,
        },
        service: {
          title: hero.serviceTabTitle,
          subtitle: hero.serviceTabSubtitle,
          searchLabel: hero.serviceSearchPlaceholder,
        },
      }
    : undefined;

  const mappedDealers = hero?.dealers?.map((d) => ({
    id: d.slug || String(d.id),
    name: d.name,
    badges: d.badges || ["Dealer"],
    address: d.address,
    hours: d.hours || "Open until 7 pm",
    distance: d.distance || "1.3",
    phone: d.phone || "1800 000 0000",
  }));

  const mappedStations = hero?.chargingStations?.map((s) => ({
    id: s.slug || String(s.id),
    name: s.name,
    badges: s.badges || ["CCS2"],
    address: s.address,
    hours: s.hours || "Open 24 hours",
    distance: s.distance || "13",
    phone: s.phone || "1800 000 0000",
  }));

  const mappedServiceCenters = hero?.serviceCenters?.map((sc) => ({
    id: sc.slug || String(sc.id),
    name: sc.name,
    badges: sc.badges || ["Service"],
    address: sc.address,
    hours: sc.hours || "Open until 8 pm",
    distance: sc.distance || "1.3",
    phone: sc.phone || "1800 000 0000",
  }));

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero
          variant="charging"
          supportBadgeText={hero?.supportBadge}
          tabContent={tabContent}
          cities={hero?.cities}
          dealers={mappedDealers}
          chargingStations={mappedStations}
          serviceCenters={mappedServiceCenters}
        />
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
