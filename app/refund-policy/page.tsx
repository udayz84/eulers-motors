import type { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import PolicyHero from "@/components/sections/PolicyHero";
import MobilePageHero from "@/components/sections/MobilePageHero";
import FloatingWidget from "@/components/FloatingWidget";
import PolicyCallout from "@/components/sections/legal/PolicyCallout";
import { getRefundPolicyPageData, mediaUrl } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getRefundPolicyPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "Refund Policy | Euler Motors";
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

export default async function RefundPolicyPage() {
  const data = await getRefundPolicyPageData();

  const heroLabel = data?.hero?.label || "Refund policy";
  const heroTitle = data?.hero?.title || "Refund Policy";
  const heroDescription = data?.hero?.description || "We protect your data and respect your privacy.";
  const heroImage = data?.hero?.image ? mediaUrl(data.hero.image) : undefined;
  const heroMobileImage = data?.hero?.mobileImage ? mediaUrl(data.hero.mobileImage) : heroImage;
  const lastUpdated = data?.intro?.lastUpdated || "";
  const introParagraphs = (data?.intro?.paragraphs || "").split("\n\n").map((p) => p.trim()).filter(Boolean);
  const callouts = data?.callouts || [];
  const closingText = data?.closingText || "";

  return (
    <>
      <SiteNavbar />
      <main className="overflow-clip">
        <div className="lg:hidden">
          <MobilePageHero
            label={heroLabel}
            title={heroTitle}
            titleId="refund-title-mobile"
            description={heroDescription}
            image={heroMobileImage}
          />
        </div>
        <div className="hidden lg:block">
          <PolicyHero label={heroLabel} title={heroTitle} variant="refund" image={heroImage} />
        </div>
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:gap-0 lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]" aria-labelledby="refund-title">
          <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
            <div className="h-auto min-h-[204px] w-full flex-col self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:h-auto sm:min-h-0 sm:w-full sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:min-h-[275px] lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
              {lastUpdated && (
                <p className="font-normal" style={{ fontWeight: 400 }}>Last updated: <strong className="font-bold" style={{ fontWeight: 700 }}>{lastUpdated}</strong></p>
              )}
              {introParagraphs.map((paragraph, index) => (
                <p key={index} className="mt-4 sm:mt-5 md:mt-6 lg:mt-6 font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {callouts.length > 0 && (
              <div className="flex w-[373px] max-w-[calc(100vw_-_20px)] flex-col gap-4 self-center sm:w-full sm:max-w-full sm:gap-5 md:gap-6 lg:w-full lg:max-w-[1040px] lg:!gap-[40px] lg:self-stretch">
                {callouts.map((callout, index) => (
                  <PolicyCallout
                    key={callout.id ?? index}
                    title={callout.title}
                    className={index === 0 ? "lg:h-auto lg:min-h-[212px] lg:!p-[32px] lg:!gap-[20px] lg:!flex-col lg:!items-center lg:!self-stretch" : "lg:h-auto lg:min-h-[290px] lg:!flex lg:!p-[32px] lg:!flex-col lg:!items-center lg:!gap-[20px] lg:!self-stretch lg:!rounded-[16px] lg:!bg-[#F3F4F5]"}
                    contentClassName={index === 0 ? undefined : "lg:!mt-0"}
                  >
                    <ul className="list-none space-y-0 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:leading-[140%] [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-0 [&>li]:before:content-['•'] lg:self-stretch">
                      {(callout.items || []).map((item, itemIndex) => (
                        <li key={item.id ?? itemIndex}>{item.text}</li>
                      ))}
                    </ul>
                  </PolicyCallout>
                ))}
              </div>
            )}

            {closingText && (
              <p className="w-full self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
                {closingText}
              </p>
            )}
          </div>
        </div>
        <FloatingWidget sticky />
      </main>
      <SiteFooter />
    </>
  );
}
