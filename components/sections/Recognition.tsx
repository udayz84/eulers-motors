"use client";

import Image from "next/image";
import { useState } from "react";

const AWARDS = [
  { year: "2024", title: "Commercial EV of the year" },
  { year: "2024", title: "Design award, commercial vehicles" },
  { year: "2023", title: "Startup of the year, mobility" },
  { year: "2022", title: "Innovation in battery engineering" },
  { year: "2021", title: "Best last mile vehicle" },
];

const AWARD_DETAIL =
  "For moving from one product to a network of dealers and service centres.";

/**
 * Recognition/Awards section (Figma desktop: 3536:18588, mobile: 2937:15335).
 * Awards and recognition with a single-open accordion and a side pagination bar.
 */
export default function Recognition() {
  const [openAward, setOpenAward] = useState(2);
  const active = openAward < 0 ? 0 : openAward;
  const goTo = (index: number) =>
    setOpenAward(Math.min(Math.max(index, 0), AWARDS.length - 1));

  return (
    <section className="bg-white relative overflow-hidden" aria-label="Awards and Recognition">
      {/* Mobile Layout */}
      <div className="bg-white content-stretch flex flex-col gap-[20px] items-center px-[20px] py-[32px] relative size-full lg:hidden">
        <div className="content-stretch flex flex-col gap-[14px] items-start justify-center relative shrink-0 w-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="h-[16px] relative shrink-0 w-[14.794px]">
              <div className="absolute inset-[0_0_0_4.08%]">
                <Image
                  src="/assets/awards/mobile-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute h-[16px] left-0 top-0 w-[116.978px]">
              <div className="absolute inset-[0_1.03%]">
                <Image
                  src="/assets/awards/mobile-rect-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
              Recognition
            </p>
          </div>
          <p className="font-display text-[28px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.56px] w-full">
            Awards and recognition.
          </p>
          <div className="absolute h-[49.664px] right-[-19.99px] top-[145.71px] w-[54.598px]" style={{ backgroundImage: "linear-gradient(-89.9999956537512deg, rgb(255, 255, 255) 13.618%, rgba(255, 255, 255, 0) 100%)" }} />
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2024
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Commercial EV of the year
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2024
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Design award, commercial vehicles
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-w-px relative">
                  <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                    2023
                  </div>
                  <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                    Startup of the year, mobility
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <Image
                    src="/assets/awards/mobile-icon-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-end relative size-full">
                <div className="relative shrink-0 size-[68.185px]">
                  <Image
                    src="/assets/awards/mobile-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="font-sans font-normal leading-[1.4] min-w-px relative text-[12px] text-[rgba(18,18,18,0.8)]">
                  <p className="leading-[1.4] mb-0">For moving from one product to a network of</p>
                  <p className="leading-[1.4]">dealers and service centres.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2022
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Innovation in battery engineering
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2021
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Best last mile vehicle
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white px-5 lg:px-20 py-[40px] lg:py-[60px] relative">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[55px] lg:flex-row lg:items-start">
          <div className="flex flex-1 min-w-0 flex-col gap-[20px] items-start self-stretch">
            <div className="flex flex-col gap-[16px] items-start relative w-full">
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                  <Image
                    src="/assets/awards/desktop-rect-1.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                  <Image
                    src="/assets/awards/desktop-rect-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
                  Recognition
                </p>
              </div>
              <div className="flex flex-col items-start relative w-full">
                <p className="font-display text-[42px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.84px] w-full">
                  Awards and recognition.
                </p>
              </div>
            </div>
            <div
              className="flex-1 min-h-[320px] lg:min-h-[420px] w-full self-stretch rounded-[20.655px]"
              style={{
                backgroundImage: "url('/assets/awards/desktop-bg.png')",
                backgroundPosition: "50% 50%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-[55px] lg:w-auto lg:shrink-0 lg:flex-row lg:items-start lg:gap-[6px]">
            <div className="flex w-full max-w-[568px] flex-col gap-[10px] lg:w-[568px] lg:shrink-0">
              {AWARDS.map((award, index) => {
                const expanded = openAward === index;
                return (
                  <article
                    key={index}
                    className={`bg-[#f3f4f5] overflow-clip rounded-[16px] p-[20px] w-full shrink-0 ${
                      expanded ? "flex flex-col gap-[24px]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpenAward(expanded ? -1 : index)}
                      className="content-stretch flex w-full items-center gap-[24px] text-left cursor-pointer"
                    >
                      <span className="flex-[1_0_0] min-w-px">
                        <span className="block font-sans font-extrabold text-[#1d6fff] text-[16px] tracking-[-0.32px]">
                          {award.year}
                        </span>
                        <span className="block font-sans font-semibold text-[#121212] text-[20px] tracking-[-0.4px]">
                          {award.title}
                        </span>
                      </span>
                      <span className="relative shrink-0 size-[24px]">
                        <Image
                          src={
                            expanded
                              ? "/assets/awards/desktop-icon-2.svg"
                              : "/assets/awards/desktop-icon.svg"
                          }
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </span>
                    </button>
                    {expanded && (
                      <div className="content-stretch flex w-full gap-[10px] items-end">
                        <span className="relative shrink-0 size-[96.936px]">
                          <Image
                            src="/assets/awards/desktop-bg-2.png"
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </span>
                        <p className="font-sans font-normal leading-[1.4] min-w-px text-[16px] text-[rgba(18,18,18,0.8)]">
                          {AWARD_DETAIL}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="hidden w-fit shrink-0 flex-col items-center gap-[6px] self-stretch lg:flex">
              <button
                type="button"
                aria-label="Previous award"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                className="flex shrink-0 items-center justify-center p-[6px] cursor-pointer disabled:cursor-default disabled:opacity-40"
              >
                <span className="relative block shrink-0 w-[15.5px] h-[7.12px]">
                  <Image
                    src="/assets/awards/desktop-arrow-1.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
              </button>
              <div
                aria-hidden="true"
                className="relative w-[20px] flex-1 overflow-hidden rounded-[14.4px] bg-[#f3f4f5] p-[4px]"
              >
                <div
                  className="absolute rounded-[23.04px] bg-[#112750] transition-all duration-300 ease-out"
                  style={{
                    left: 4,
                    right: 4,
                    height: `calc((100% - 8px) / ${AWARDS.length})`,
                    top: `calc(4px + ${active} * (100% - 8px) / ${AWARDS.length})`,
                  }}
                />
              </div>
              <button
                type="button"
                aria-label="Next award"
                onClick={() => goTo(active + 1)}
                disabled={active === AWARDS.length - 1}
                className="flex shrink-0 items-center justify-center p-[6px] cursor-pointer disabled:cursor-default disabled:opacity-40"
              >
                <span className="relative block shrink-0 w-[15.5px] h-[7.12px] rotate-180">
                  <Image
                    src="/assets/awards/desktop-arrow-2.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
