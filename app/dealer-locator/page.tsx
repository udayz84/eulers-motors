import { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import DealerContactSection from "@/components/sections/DealerContactSection";
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
      <SiteNavbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="dealer" {...heroProps} />
        <DealerContactSection {...data?.contactSection} />
      </main>
      <SiteFooter />
    </>
  );
}
