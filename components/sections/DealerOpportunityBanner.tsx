"use client";

import Image from "next/image";
import Link from "next/link";

export interface DealerOpportunityBannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  imageSrc?: string;
}

export default function DealerOpportunityBanner({
  eyebrow = "DEALERSHIP OPPORTUNITIES",
  title = "Want to become a dealer?",
  description = "Bring Euler Motors to your city. Get support with the showroom with Service Setup and training.",
  secondaryCtaLabel = "Download details",
  secondaryCtaHref = "#contact",
  primaryCtaLabel = "Apply now",
  primaryCtaHref = "#contact",
  imageSrc = "/assets/enterprise/dealer-photo.png",
}: DealerOpportunityBannerProps) {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      aria-label="Dealership Opportunities"
      className="w-full bg-white py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20">
        <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[20px] lg:rounded-[28px] border border-white/80 bg-[linear-gradient(175deg,#dbe8fb_0%,#c2d5f4_45%,#a5c8f2_100%)] shadow-[0_16px_48px_rgba(29,111,255,0.07)]">
          {/* Subtle light glow elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 size-[260px] rounded-full bg-white/40 blur-[70px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/3 top-1/2 size-[300px] -translate-y-1/2 rounded-full bg-[#1d6fff]/10 blur-[90px]"
          />

          <div className="relative grid grid-cols-1 items-end gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Content Column */}
            <div className="z-10 flex flex-col items-start p-6 sm:p-10 lg:p-14 lg:pb-14">
              {/* Eyebrow */}
              <div className="mb-3.5 flex items-center gap-2">
                <span className="block h-[15px] w-[5.5px] -skew-x-[20deg] rounded-[1px] bg-[#0c2c66]" />
                <span className="font-sans text-xs font-bold uppercase tracking-[0.9px] text-[#0c2c66] sm:text-sm">
                  {eyebrow}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-3 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.6px] text-ink sm:text-[38px] lg:text-[46px] lg:tracking-[-0.92px]">
                {title}
              </h2>

              {/* Description */}
              <p className="mb-6 max-w-[520px] font-sans text-sm leading-relaxed text-ink/85 sm:text-base lg:text-[17px] lg:leading-[1.55]">
                {description}
              </p>

              {/* Benefit Badges */}
              <div className="mb-8 flex flex-wrap gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 font-sans text-xs font-semibold text-[#0c2c66] backdrop-blur-sm shadow-xs">
                  <svg className="size-3.5 text-[#1d6fff]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Turnkey Showroom Setup
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 font-sans text-xs font-semibold text-[#0c2c66] backdrop-blur-sm shadow-xs">
                  <svg className="size-3.5 text-[#1d6fff]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Service Setup & Training
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 font-sans text-xs font-semibold text-[#0c2c66] backdrop-blur-sm shadow-xs">
                  <svg className="size-3.5 text-[#1d6fff]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  38+ Cities & Growing
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:gap-4">
                {secondaryCtaLabel && (
                  <Link
                    href={secondaryCtaHref}
                    onClick={(e) => scrollToContact(e, secondaryCtaHref)}
                    className="flex h-11 flex-1 items-center justify-center rounded-[6px] border border-ink/40 bg-surface/70 px-6 font-display text-xs font-semibold leading-none text-ink backdrop-blur-md transition-all hover:bg-white hover:border-ink hover:shadow-xs sm:h-12 sm:flex-initial sm:text-sm"
                  >
                    {secondaryCtaLabel}
                  </Link>
                )}

                {primaryCtaLabel && (
                  <Link
                    href={primaryCtaHref}
                    onClick={(e) => scrollToContact(e, primaryCtaHref)}
                    className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-[6px] bg-[#121212] px-6 font-display text-xs font-semibold leading-none text-white shadow-md transition-all hover:bg-black hover:shadow-lg sm:h-12 sm:flex-initial sm:px-7 sm:text-sm"
                  >
                    {primaryCtaLabel}
                    <Image
                      src="/assets/enterprise/btn-arrow2.svg"
                      alt=""
                      width={22}
                      height={14}
                      aria-hidden="true"
                      className="h-3 w-[18px] transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-[22px]"
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Visual Image - seamlessly anchored to the bottom edge */}
            <div className="relative flex h-[260px] w-full items-end justify-center overflow-hidden sm:h-[340px] lg:h-[460px] xl:h-[490px] lg:justify-end">
              <Image
                src={imageSrc}
                alt="Euler Motors Dealership Showroom"
                width={1254}
                height={1254}
                className="pointer-events-none h-full w-auto max-w-none select-none object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
