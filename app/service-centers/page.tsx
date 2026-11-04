import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import Footer from "@/components/sections/Footer";
import DealerContactSection from "@/components/sections/DealerContactSection";
import { getDealerLocatorPageData } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDealerLocatorPageData();
  const hero = data?.hero;
  return {
    title: hero?.serviceTabTitle || "Find an Euler Motors Authorized Service Center",
    description:
      hero?.serviceTabSubtitle ||
      "Authorized Euler service centers with genuine parts and certified experts across India.",
    keywords: "euler service center, commercial ev repairs, euler workshop, euler parts",
  };
}

export default async function ServiceCentersPage() {
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
          variant="service"
          supportBadgeText={hero?.supportBadge}
          tabContent={tabContent}
          cities={hero?.cities}
          dealers={mappedDealers}
          chargingStations={mappedStations}
          serviceCenters={mappedServiceCenters}
        />
        <DealerContactSection
          eyebrow={contact?.eyebrow}
          desktopTitle={contact?.desktopTitle}
          mobileTitle={contact?.mobileTitle}
          desktopDescription={contact?.desktopDescription}
          mobileDescription={contact?.mobileDescription}
          cards={contact?.cards}
          formHeading={contact?.formHeading}
          formSubheading={contact?.formSubheading}
          formTabs={contact?.formTabs}
          vehicleOptions={contact?.vehicleOptions}
          ctaLabel={contact?.ctaLabel}
          privacyNotice={contact?.privacyNotice}
          disclaimer={contact?.disclaimer}
        />
      </main>
      <Footer />
    </>
  );
}
