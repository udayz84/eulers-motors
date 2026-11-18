import Eyebrow from "@/components/ui/Eyebrow";
import MobilePageHero from "@/components/sections/MobilePageHero";
import type { StrapiFaqHero } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

/**
 * FAQ Hero / Banner Section — Figma node 3538:26147 (Desktop) & 2979:7907 (Mobile)
 * Blue tech grid gradient banner with Help Centre eyebrow, heading, and description.
 * Copy is powered by the Strapi `faq-page` single type (hero component).
 */
export default function FaqHero({ data }: { data?: StrapiFaqHero }) {
  const eyebrow = data?.eyebrow || "Help centre";
  const title = data?.title || "Frequently asked questions";
  const description =
    data?.description ||
    "Find answers to the most common questions about our vehicles, charging, service, warranty and more.";
  const heroImage = data?.image ? mediaUrl(data.image) : undefined;
  const heroMobileImage = data?.mobileImage ? mediaUrl(data.mobileImage) : heroImage;

  return (
    <>
    <div className="faq-mobile-hero lg:hidden">
      <MobilePageHero
        label={eyebrow}
        title={title}
        description={description}
        image={heroMobileImage}
      />
    </div>
    <div className="hidden lg:block">
    <section
      aria-label="FAQ Banner"
      className="relative w-full overflow-hidden bg-[linear-gradient(-84.34deg,#0e2f6d_63.51%,#1d6fff_87.23%)] lg:h-[480px] lg:w-full lg:max-w-full lg:overflow-x-clip lg:overflow-y-visible lg:bg-[repeating-linear-gradient(90deg,transparent_0,transparent_67px,rgba(0,0,0,.12)_68px),repeating-linear-gradient(0deg,transparent_0,transparent_67px,rgba(0,0,0,.12)_68px),linear-gradient(272deg,#0e2f6d_-63.51%,#1d6fff_87.23%)]"
    >
      {heroImage && (
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover"
          style={{ backgroundImage: `url('${heroImage}')`, backgroundPosition: "center 70%" }}
        />
      )}

      {/* Blueprint grid background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-12 bg-repeat bg-top-left lg:hidden"
        style={{
          backgroundImage: "url('/assets/faq/faq-banner-grid.png')",
          backgroundSize: "720px auto",
        }}
      />

      {/* Subtle bottom blur accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[1200px] -translate-x-1/2 rounded-full bg-white/10 blur-[100px] lg:hidden"
      />

      {/* Content Container — photo treatment (left-aligned black text) when a
          hero image is uploaded; centered white text on gradient otherwise */}
      <div
        className={`relative mx-auto flex w-full max-w-[1440px] flex-col px-5 pt-[108px] pb-8 text-center sm:px-8 sm:pt-[124px] sm:pb-12 md:px-12 md:pt-[140px] md:pb-16 lg:h-[480px] lg:w-full lg:max-w-full lg:justify-center lg:px-[max(80px,calc((100vw-1440px)/2+80px))] lg:pt-0 lg:pb-0 ${
          heroImage ? "items-start lg:text-left text-white lg:text-[#121212]" : "items-center text-white"
        }`}
      >
        <div className={`contents lg:inline-flex lg:flex-col lg:gap-6 ${heroImage ? "lg:items-start" : "lg:items-center"}`}>
          {/* Eyebrow */}
          <div className="mb-3 flex h-6 items-center sm:mb-4 md:mb-5 lg:mb-0">
            <Eyebrow label={eyebrow} dark={!heroImage} icons={heroImage ? "navy" : "white"} className="font-bold text-[12px] sm:text-[13px] lg:text-[14px] tracking-[0.6px] lg:tracking-[0.7px] uppercase" />
          </div>

          {/* Heading */}
          <h1 className={`font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] sm:text-[40px] md:text-[52px] md:tracking-[-1.04px] lg:text-[52px] lg:tracking-[-1.04px] ${heroImage ? "text-[#121212]" : "text-white lg:w-[788.543px]"}`}>
            {title}
          </h1>

          {/* Description */}
          <p className={`mt-3 max-w-[311px] font-sans text-[12px] font-normal leading-normal sm:mt-4 sm:max-w-[420px] sm:text-[14px] md:max-w-[493px] md:text-[16px] lg:mt-0 lg:max-w-none lg:text-[16px] md:leading-relaxed lg:leading-normal ${heroImage ? "text-[#121212]" : "text-white lg:w-[493.019px] sm:text-white/90"}`}>
            {description}
          </p>
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
