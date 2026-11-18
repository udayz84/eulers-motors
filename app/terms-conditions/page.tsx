import type { Metadata } from "next";
import FloatingWidget from "@/components/FloatingWidget";
import MobilePageHero from "@/components/sections/MobilePageHero";
import PolicyHero from "@/components/sections/PolicyHero";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import PolicyAccordion from "@/components/sections/legal/PolicyAccordion";
import { getTermsConditionsPageData, mediaUrl } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTermsConditionsPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "Terms & Conditions | Euler Motors";
  const description =
    seo?.metaDescription || "Please read these terms carefully before using our services.";

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

export default async function TermsConditionsPage() {
  const data = await getTermsConditionsPageData();

  const heroLabel = data?.hero?.label || "Terms & Conditions";
  const heroTitle = data?.hero?.title || "Terms of Use";
  const heroDescription =
    data?.hero?.description || "Please read these terms carefully before using our services.";
  const heroImage = data?.hero?.image ? mediaUrl(data.hero.image) : undefined;
  const heroMobileImage = data?.hero?.mobileImage ? mediaUrl(data.hero.mobileImage) : heroImage;
  const lastUpdated = data?.intro?.lastUpdated || "";
  const introParagraphs = (data?.intro?.paragraphs || "").split("\n\n").map((p) => p.trim()).filter(Boolean);
  const items = (data?.sections || []).map((section, index) => ({
    id: String(section.id ?? index),
    title: section.title,
    body: section.body,
  }));

  return (
    <>
      <SiteNavbar />
      <main className="overflow-clip">
        <div className="lg:hidden">
          <MobilePageHero
            label={heroLabel}
            title={heroTitle}
            titleId="terms-title-mobile"
            description={heroDescription}
            image={heroMobileImage}
          />
        </div>
        <div className="hidden lg:block">
          <PolicyHero
            label={heroLabel}
            title={heroTitle}
            description={heroDescription}
            image={heroMobileImage}
          />
        </div>
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:gap-0 lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]" aria-labelledby="terms-title">
          <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
            <div className="h-auto min-h-[323px] w-full flex-col self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:h-auto sm:min-h-0 sm:w-full sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:min-h-[275px] lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
              {lastUpdated && (
                <p className="font-normal">Last updated: <strong className="font-bold">{lastUpdated}</strong></p>
              )}
              {introParagraphs.map((paragraph, index) => (
                <p key={index} className="mt-4 sm:mt-5 md:mt-6">
                  {paragraph}
                </p>
              ))}
            </div>
            <PolicyAccordion items={items} />
          </div>
        </div>
        <FloatingWidget sticky />
      </main>
      <SiteFooter />
    </>
  );
}
