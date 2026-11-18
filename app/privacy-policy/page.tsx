import type { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import PolicyHero from "@/components/sections/PolicyHero";
import MobilePageHero from "@/components/sections/MobilePageHero";
import FloatingWidget from "@/components/FloatingWidget";
import PolicyAccordion from "@/components/sections/legal/PolicyAccordion";
import { getPrivacyPolicyPageData, mediaUrl } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacyPolicyPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "Privacy Policy | Euler Motors";
  const description = seo?.metaDescription || "We protect your data and respect your privacy.";

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

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicyPageData();

  const heroLabel = data?.hero?.label || "Privacy policy";
  const heroTitle = data?.hero?.title || "Privacy Policy";
  const heroDescription = data?.hero?.description || "We protect your data and respect your privacy.";
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
            titleId="privacy-title-mobile"
            description={heroDescription}
            image={heroMobileImage}
          />
        </div>
        <div className="hidden lg:block">
          <PolicyHero label={heroLabel} title={heroTitle} image={heroImage} />
        </div>
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:gap-0 lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]" aria-labelledby="privacy-title">
          <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
            <div className="h-auto min-h-[272px] w-full flex-col self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:h-auto sm:min-h-0 sm:w-full sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:min-h-[275px] lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
              {lastUpdated && (
                <p className="font-normal">Last updated: <strong className="font-bold">{lastUpdated}</strong></p>
              )}
              <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4 md:mt-6 lg:space-y-0">
                {introParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <PolicyAccordion items={items} defaultOpenId={items[1]?.id ?? ""} />
          </div>
        </div>
        <FloatingWidget sticky />
      </main>
      <SiteFooter />
    </>
  );
}
