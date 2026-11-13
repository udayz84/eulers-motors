import Image from "next/image";
import Link from "next/link";
import type { StrapiAboutHiringSection } from "@/types/strapi";
import { DEFAULT_ABOUT_PAGE } from "@/lib/strapi/defaults/about";
import { mediaUrl } from "@/lib/strapi/client";

export interface HiringProps {
  data?: StrapiAboutHiringSection;
}

/**
 * Hiring/Join the journey section (Figma desktop: 3538:20555, mobile: 2937:16069).
 * Background image + gradient wash with the hiring call-to-action.
 */
export default function Hiring({ data }: HiringProps = {}) {
  const fallback = DEFAULT_ABOUT_PAGE.hiringSection!;
  const eyebrow = data?.eyebrow || fallback.eyebrow || "Join the journey";
  const title = data?.title || "We are hiring, and we\nare selling.";
  const description = data?.description || fallback.description || "";
  const ctaLabel = data?.cta?.label || fallback.cta?.label || "View Job openings";
  const ctaHref = data?.cta?.href || fallback.cta?.href || "/careers";
  const desktopBg = mediaUrl(data?.desktopImage, "/assets/hiring/desktop-bg-new.png");
  const mobileBg = mediaUrl(data?.mobileImage, "/assets/hiring/mobile-bg-new.png");

  return (
    <section className="relative overflow-hidden" aria-label="Hiring">
      {/* Mobile Layout */}
      <div
        className="flex flex-col items-center px-5 sm:px-8 py-8 sm:py-12 pb-[302px] sm:pb-[340px] lg:hidden"
        style={{
          minHeight: "530px",
          backgroundColor: "#000",
          backgroundImage: `url('${mobileBg}')`,
          backgroundPosition: "-45.675px -238.97px",
          backgroundSize: "123.244% 162.552%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex w-full max-w-[680px] flex-col items-start gap-[14px] sm:gap-4">
          <div className="relative flex w-full items-center gap-[4px]">
            <div className="absolute left-[3.43px] top-[0.33px] h-[16px] w-[116.978px] overflow-hidden">
              <Image
                src="/assets/hiring/mobile-rect-1-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[16px] w-[14.794px] shrink-0 overflow-hidden">
              <Image
                src="/assets/hiring/mobile-rect-2-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="relative shrink-0 font-sans text-[12px] sm:text-[13px] font-bold uppercase leading-normal tracking-[0.6px] text-white whitespace-nowrap">
              {eyebrow}
            </p>
          </div>
          <div className="relative shrink-0 whitespace-pre-line font-display font-semibold text-[28px] sm:text-[36px] not-italic leading-[1.15] tracking-[-0.56px] text-white">
            {title}
          </div>
          <p className="relative w-full shrink-0 font-sans text-[12px] sm:text-[14px] font-normal leading-normal text-white">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="relative flex h-[42px] sm:h-[48px] shrink-0 items-center justify-center gap-[5.333px] sm:gap-2 rounded-[2px] sm:rounded-[4px] bg-white px-[12px] sm:px-[18px] py-[10.667px] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <p className="relative shrink-0 font-display text-[12px] sm:text-[14px] font-semibold not-italic leading-none text-[#121212] whitespace-nowrap">
              {ctaLabel}
            </p>
            <div className="relative h-[9.333px] sm:h-[11px] w-[14.667px] sm:w-[17px] shrink-0">
              <div className="absolute inset-[-16.39%_-1.68%_-22.9%_-3.41%]">
                <Image
                  src="/assets/hiring/mobile-arrow-new.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div
        className="hidden items-center lg:flex"
        style={{
          minHeight: "487px",
          padding: "102.322px 724px 102.322px 80px",
          background:
            `linear-gradient(270deg, #000 -1.6%, rgba(0, 0, 0, 0) 9.55%), linear-gradient(90deg, #000 23.82%, rgba(0, 0, 0, 0) 51.07%), url('${desktopBg}') lightgray 342.61px -673.924px / 83.437% 279.284% no-repeat`,
        }}
      >
        <div className="flex w-full flex-col items-start gap-[16px]">
          <div className="relative flex items-center gap-[6px]">
            <div className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px] overflow-hidden">
              <Image
                src="/assets/hiring/desktop-rect-1-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[20.355px] w-[18.821px] shrink-0 overflow-hidden">
              <Image
                src="/assets/hiring/desktop-rect-2-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="relative shrink-0 font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-white whitespace-nowrap">
              {eyebrow}
            </p>
          </div>
          <div className="relative w-[575.92px] shrink-0 whitespace-pre-line font-display font-semibold text-[52px] not-italic leading-[1.15] tracking-[-1.04px] text-white">
            {title}
          </div>
          <p className="relative w-[531px] shrink-0 font-sans text-[16px] font-normal leading-normal text-white">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="relative flex h-[50px] shrink-0 items-center justify-center gap-[8px] rounded-[4px] border-[0.5px] border-solid border-white bg-[#f2f2f2] px-[24px] hover:bg-white transition-colors cursor-pointer"
          >
            <p className="relative shrink-0 font-display text-[16px] font-semibold not-italic leading-none text-[#121212] whitespace-nowrap">
              {ctaLabel}
            </p>
            <div className="relative h-[14px] w-[22px] shrink-0">
              <div className="absolute inset-[-23.05%_-3474.41%_-16.24%_-3.41%]">
                <Image
                  src="/assets/hiring/desktop-arrow-new.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
