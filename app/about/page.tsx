import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/sections/AboutHero";
import AboutEuler from "@/components/sections/AboutEuler";
import AboutBelief from "@/components/sections/AboutBelief";
import Timeline from "@/components/sections/Timeline";
import Factory from "@/components/sections/Factory";
import Leadership from "@/components/sections/Leadership";
import PartnersInvestors from "@/components/sections/PartnersInvestors";
import Recognition from "@/components/sections/Recognition";
import AboutEsG from "@/components/sections/AboutEsG";
import AboutReports from "@/components/sections/AboutReports";
import Hiring from "@/components/sections/Hiring";
import ContactSection from "@/components/sections/ContactSection";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import Footer from "@/components/sections/Footer";
import {
  getAboutPageData,
  getAwards,
  getEsgReports,
  getLeadershipMembers,
  getTimelineMilestones,
  mediaUrl,
} from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "About Euler Motors — Driving India's Electric Future";
  const description =
    seo?.metaDescription ||
    "Learn about Euler Motors, our leadership team, manufacturing excellence, ESG commitments, milestones, and commercial electric vehicle journey across India.";
  const shareImageUrl = seo?.shareImage ? mediaUrl(seo.shareImage) : "";

  return {
    title,
    description,
    keywords: seo?.keywords || "",
    openGraph: {
      title,
      description,
      ...(shareImageUrl
        ? {
          images: [
            {
              url: shareImageUrl,
              ...(seo?.shareImage?.alternativeText ? { alt: seo.shareImage.alternativeText } : {}),
              ...(seo?.shareImage?.width ? { width: seo.shareImage.width } : {}),
              ...(seo?.shareImage?.height ? { height: seo.shareImage.height } : {}),
            },
          ],
        }
        : {}),
    },
    ...(shareImageUrl
      ? {
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [shareImageUrl],
        },
      }
      : {}),
    ...(seo?.preventIndexing
      ? {
        robots: {
          index: false,
          follow: false,
        },
      }
      : {}),
  };
}

export default async function AboutPage() {
  const [data, milestones, members, awards, reports] = await Promise.all([
    getAboutPageData(),
    getTimelineMilestones(),
    getLeadershipMembers(),
    getAwards(),
    getEsgReports(),
  ]);

  const faqItems = data?.faqSection?.items?.map((item) => ({
    question: item.question,
    answer: item.answer,
    category: item.category,
  }));

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <AboutHero data={data?.hero} />
        <AboutEuler data={data?.eulerSection} />
        <AboutBelief data={data?.beliefSection} />
        <Timeline sectionData={data?.timelineSection} milestones={milestones} />
        <Factory data={data?.factorySection} />
        <Leadership sectionData={data?.leadershipSection} members={members} />
        <PartnersInvestors data={data?.partnersSection} />
        <Recognition sectionData={data?.recognitionSection} awards={awards} />
        <AboutEsG data={data?.esgSection} />
        <AboutReports sectionData={data?.reportsSection} reports={reports} />
        <Hiring data={data?.hiringSection} />
        <ContactSection
          eyebrow={data?.contactSection?.eyebrow}
          title={data?.contactSection?.title}
          description={data?.contactSection?.description}
          phone={data?.contactSection?.phone}
          email={data?.contactSection?.email}
          form={data?.contactSection?.form}
        />
        <ChargingStationFaq
          eyebrow={data?.faqSection?.eyebrow}
          title={data?.faqSection?.title}
          items={faqItems}
          image={data?.faqSection?.image}
        />
      </main>
      <Footer />
    </>
  );
}
