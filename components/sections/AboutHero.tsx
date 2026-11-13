import Image from "next/image";
import FloatingWidget from "@/components/FloatingWidget";
import type { StrapiAboutHero } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

export interface AboutHeroProps {
  data?: StrapiAboutHero;
}

/**
 * About Hero section (Figma desktop: 3524:16430, mobile: 2894:10628).
 * Hero banner with background image, gradient overlay, and text content.
 * Exact implementation matching both mobile and desktop designs.
 */
export default function AboutHero({ data }: AboutHeroProps = {}) {
  const eyebrow = data?.eyebrow || "About Euler Motors";
  const title = data?.title || "Driving India's Electric Future";
  const description =
    data?.description ||
    "Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.";
  const desktopBg = mediaUrl(data?.desktopImage, "/assets/about-euler/desktop-bg-new.png");
  const mobileBg = mediaUrl(data?.mobileImage, "/assets/about-euler/mobile-bg-new.png");
  const mobileOverlay = mediaUrl(data?.mobileOverlayImage, "/assets/about-euler/mobile-overlay-new.png");

  return (
    <div className="relative">
      <section
        className="relative aspect-[393/594] w-full overflow-hidden sm:aspect-[16/11] lg:aspect-[9/5] lg:h-[800px]"
        aria-label="About Euler Motors"
      >
        {/* Mobile Background Image (Figma 2894:10628) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background:
              `linear-gradient(186deg, rgba(0, 0, 0, 0.00) 56.44%, rgba(0, 0, 0, 0.80) 99.95%), url('${mobileOverlay}') -8.049px -21.316px / 104.096% 103.547% no-repeat, url('${mobileBg}') lightgray -0.067px 0px / 100.034% 100% no-repeat`,
          }}
        />

        {/* Desktop Background — gradient + image per Figma
          (182deg · image 0.219px -25.662px / 99.985% 103.164%) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              `linear-gradient(182deg, rgba(0, 0, 0, 0) 56.69%, rgba(0, 0, 0, 0.80) 93.41%), url('${desktopBg}') lightgray 0.219px -25.662px / 99.985% 103.164% no-repeat`,
          }}
        />

        {/* Mobile Content */}
        <div className="absolute bottom-[28.67px] sm:bottom-[40px] left-1/2 -translate-x-1/2 w-[353px] sm:w-[540px] flex flex-col gap-[12px] sm:gap-4 items-start justify-center lg:hidden">
          {/* Mobile Eyebrow */}
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
              <Image
                src="/assets/about-euler/mobile-rect-1-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/about-euler/mobile-rect-2-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
              {eyebrow}
            </p>
          </div>
          <h1 className="w-[289px] sm:w-auto font-display text-[32px] sm:text-[42px] font-semibold leading-[1.15] tracking-[-0.64px] text-white">
            {title}
          </h1>
          <p className="w-[316px] sm:w-[480px] text-[12px] sm:text-[14px] font-normal leading-normal text-white">
            {description}
          </p>
        </div>

        {/* Desktop Content */}
        <div className="absolute bottom-[60.52px] left-1/2 -translate-x-1/2 hidden lg:flex lg:flex-col lg:gap-[20px] lg:items-center">
          {/* Desktop Eyebrow */}
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
            <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
              <Image
                src="/assets/about-euler/desktop-rect-1-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
              <Image
                src="/assets/about-euler/desktop-rect-2-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase whitespace-nowrap">
              {eyebrow}
            </p>
          </div>
          <h1 className="w-[788.543px] font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-center text-white">
            {title}
          </h1>
          <p className="w-[604.962px] text-[16px] font-normal leading-normal text-center text-white">
            {description}
          </p>
        </div>
      </section>

      {/* quick-action rail — on mobile it is centred on the hero / About-Euler seam */}
      <FloatingWidget boundary />
    </div>
  );
}
