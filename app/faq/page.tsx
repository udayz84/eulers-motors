import type { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import FaqHero from "@/components/sections/faq/FaqHero";
import FaqContent from "@/components/sections/faq/FaqContent";
import FaqQuickHelp from "@/components/sections/faq/FaqQuickHelp";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import FloatingWidget from "@/components/FloatingWidget";
import { getFaqPageData } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFaqPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "Frequently Asked Questions | Euler Motors";
  const description =
    seo?.metaDescription ||
    "Find answers to the most common questions about Euler Motors electric vehicles, charging, service, warranty, and privacy policies.";

  return {
    title,
    description,
    keywords: seo?.keywords || "",
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

export default async function FaqPage() {
  const data = await getFaqPageData();

  return (
    <>
      <SiteNavbar />
      <main className="overflow-clip">
        <FaqHero data={data?.hero} />
        <FaqContent data={data?.faqsSection} />
        <FaqQuickHelp data={data?.quickHelpSection} />
        <ContactSection />
        <FloatingWidget sticky />
      </main>
      <SiteFooter />
    </>
  );
}
