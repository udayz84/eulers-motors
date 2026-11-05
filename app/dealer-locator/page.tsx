import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import Footer from "@/components/sections/Footer";
import DealerContactSection from "@/components/sections/DealerContactSection";
import { getDealerLocatorPageData } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDealerLocatorPageData();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || "Find an Euler Motors Dealer, Charging Station, or Service Center Near You",
    description:
      seo?.metaDescription ||
      "Locate authorized Euler Motors dealers, fast charging stations, and certified service centers across India. Book a doorstep test drive today.",
    keywords: seo?.keywords || "euler dealer locator, euler service center, ev charging station, euler motors showroom",
  };
}

export default async function DealerLocatorPage() {
  const data = await getDealerLocatorPageData();
  const hero = data?.hero;
  const contact = data?.contactSection;

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
          variant="dealer"
          supportBadgeText={hero?.supportBadge}
          tabContent={tabContent}
          cities={hero?.cities}
          dealers={mappedDealers}
          chargingStations={mappedStations}
          serviceCenters={mappedServiceCenters}
        />
        <DealerContactSection {...contact} />
      </main>
      <Footer />
    </>
  );
}
