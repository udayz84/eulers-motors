import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CustomerReviews, { ReviewItem } from "@/components/sections/CustomerReviews";
import ContactSection from "@/components/sections/ContactSection";
import TechFaq from "@/components/sections/technology/TechFaq";
import TechHero from "@/components/sections/technology/TechHero";
import TechLoad from "@/components/sections/technology/TechLoad";
import TechIndianRoads from "@/components/sections/technology/TechIndianRoads";
import TechManufacturing from "@/components/sections/technology/TechManufacturing";
import TechKnowVehicle from "@/components/sections/technology/TechKnowVehicle";
import TechCharging from "@/components/sections/technology/TechCharging";
import TechShepherd from "@/components/sections/technology/TechShepherd";
import TechProof from "@/components/sections/technology/TechProof";
import { getTechnologyPageData, mediaUrl } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTechnologyPageData();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || "Technology | Euler Motors",
    description:
      seo?.metaDescription ||
      "Commercial EV engineering built smarter for Indian roads, charging reliability, and maximum fleet profitability.",
    keywords: seo?.keywords || "euler motors technology, commercial ev, liquid cooled battery, shepherd app",
  };
}

/**
 * TECHNOLOGY page (Figma 2968:6642) — Single Type powered by Strapi `technology-page`.
 * Sections: hero + philosophy · load · built for Indian roads · manufacturing ·
 * know your vehicle · charging · FAQ · Shepherd app · proof · reviews · contact.
 */
export default async function TechnologyPage() {
  const data = await getTechnologyPageData();

  const reviews: ReviewItem[] | undefined = data.reviewsSection?.reviews?.map((r) => ({
    id: r.id,
    documentId: r.documentId,
    customerName: r.customerName,
    roleOrCompany: r.roleOrCompany,
    location: r.location,
    quote: r.quote,
    rating: r.rating ?? 4.9,
    savingsMonthly: r.savingsMonthly ?? "₹41,000 saved a month",
    videoDuration: r.videoDuration ?? "02:32",
    storyImage: r.storyImage ? mediaUrl(r.storyImage as any) : "/assets/reviews/story-a.webp",
    overlayImage: r.overlayImage ? mediaUrl(r.overlayImage as any) : undefined,
    avatarImage: r.avatarImage ? mediaUrl(r.avatarImage as any) : "/assets/reviews/avatar.png",
    video: r.video ? mediaUrl(r.video as any) : undefined,
    videoUrl: r.videoUrl || undefined,
  }));

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <TechHero data={data.hero} />
        <TechLoad data={data.loadSection} />
        <TechIndianRoads data={data.indianRoads} />
        <TechManufacturing data={data.manufacturing} />
        <TechKnowVehicle data={data.knowVehicle} />
        <TechCharging data={data.chargingSection} />
        <TechFaq data={data.faqSection} />
        <TechShepherd data={data.shepherdSection} />
        <TechProof data={data.proofSection} />
        <CustomerReviews
          autoScrollOnMobile={false}
          eyebrow={data.reviewsSection?.eyebrow}
          title={data.reviewsSection?.title}
          description={data.reviewsSection?.description}
          reviews={reviews}
        />
        <ContactSection
          eyebrow={data.contactSection?.eyebrow}
          title={data.contactSection?.title}
          description={data.contactSection?.description}
          phone={data.contactSection?.phone}
          email={data.contactSection?.email}
          form={data.contactSection?.form}
        />
      </main>
      <Footer />
    </>
  );
}
