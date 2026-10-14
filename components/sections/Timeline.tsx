"use client";

import { useState } from "react";
import Image from "next/image";

const YEARS = [2018, 2020, 2022, 2024, 2025, 2026];

const MILESTONES = {
  2018: {
    year: "2018",
    title: "One thousand vehicles at work",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
  },
  2020: {
    year: "2020",
    title: "One thousand vehicles at work",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
  },
  2022: {
    year: "2022",
    title: "One thousand vehicles at work",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
  },
  2024: {
    year: "2024",
    title: "One thousand vehicles at work",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
  },
  2025: {
    year: "2025",
    title: "One thousand vehicles at work",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
  },
  2026: {
    year: "2026",
    title: "One thousand vehicles at work",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
  },
};

/**
 * Timeline section (Figma desktop: 3530:16872, mobile: 2929-14952).
 * Interactive timeline with year selection and milestone cards.
 * Desktop: Two cards with gradient background. Mobile: Single card with solid background.
 */
export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeDot, setActiveDot] = useState(0);

  const milestone = MILESTONES[selectedYear as keyof typeof MILESTONES];

  const handlePrevious = () => {
    const currentIndex = YEARS.indexOf(selectedYear);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : YEARS.length - 1;
    setSelectedYear(YEARS[newIndex]);
    setActiveDot(newIndex);
  };

  const handleNext = () => {
    const currentIndex = YEARS.indexOf(selectedYear);
    const newIndex = currentIndex < YEARS.length - 1 ? currentIndex + 1 : 0;
    setSelectedYear(YEARS[newIndex]);
    setActiveDot(newIndex);
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Timeline"
    >
      {/* Mobile Layout */}
      <div className="relative px-[20px] py-[42px] sm:hidden" style={{ backgroundImage: "linear-gradient(90deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%)" }}>
        <div className="flex flex-col gap-[31px] items-start">
          {/* Header */}
          <div className="flex flex-col gap-[14px] w-[353px]">
            {/* Eyebrow */}
            <div className="flex gap-[4px] items-center relative shrink-0 w-full">
              <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
                <Image
                  src="/assets/about-euler/timeline-mobile-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
                <Image
                  src="/assets/about-euler/timeline-mobile-rect-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
                Timeline
              </p>
            </div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white whitespace-nowrap">
              Milestones That Shaped Euler
            </h2>
            <p className="font-sans font-normal leading-normal text-[12px] text-white">
              Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.
            </p>
          </div>

          {/* Year Buttons */}
          <div className="h-[32px] relative w-full">
            <div className="absolute content-stretch flex gap-[12px] items-center justify-end left-0 top-0">
              {YEARS.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`backdrop-blur-[7.619px] border-[0.762px] border-solid content-stretch flex h-[32px] items-center justify-center px-[14px] relative rounded-[24.381px] shrink-0 ${
                    selectedYear === year
                      ? "bg-white border-[rgba(18,18,18,0.5)]"
                      : "bg-black border-[rgba(255,255,255,0.1)]"
                  }`}
                >
                  <span className="font-display text-[12px] font-semibold leading-none not-italic whitespace-nowrap" style={{ color: selectedYear === year ? "rgb(18,18,18)" : "white" }}>
                    {year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="bg-[rgba(255,255,255,0.04)] content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[11px] pt-[252px] px-[12px] relative rounded-[12px] shrink-0 w-[353px]">
            <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
              <p className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-white whitespace-nowrap">
                {milestone.year}
              </p>
              <p className="font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] text-white whitespace-nowrap">
                One thousand vehicles at work.
              </p>
              <div className="font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[12px] text-white w-[min-content]">
                <p className="leading-[normal] mb-0">Enough data from enough routes to design the</p>
                <p className="leading-[normal]">next one with confidence.</p>
              </div>
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                  <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                    <p className="leading-[normal]">CCS2</p>
                  </div>
                </div>
                <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                  <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                    <p className="leading-[normal]">60 kW</p>
                  </div>
                </div>
                <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                  <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                    <p className="leading-[normal]">4 of 6 free</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[235.284px] left-0 top-0 w-[353px]">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute bg-[#d9d9d9] inset-0" />
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/about-euler/timeline-mobile-bg.png"
                    alt=""
                    fill
                    className="h-[234.09%] left-[0.02%] top-[-53.68%] w-[99.95%]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="bg-[rgba(204,204,204,0.2)] content-stretch flex flex-col h-[20px] items-start justify-center p-[4px] relative rounded-[14.4px] shrink-0 w-[116.199px]">
            <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[23.04px] w-[29.891px]" />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block px-[80px] py-[60px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(-86.8825966818984deg, rgb(14, 47, 109) 63.511%, rgb(29, 111, 255) 87.226%)" }}>
        <div className="content-stretch flex flex-col gap-[52px] items-center w-full">
          {/* Header Row */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-[636px]">
              {/* Eyebrow */}
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                  <Image
                    src="/assets/about-euler/timeline-rect-1.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                  <Image
                    src="/assets/about-euler/timeline-rect-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase w-[96px]">
                  Timeline
                </p>
              </div>
              <div className="font-display leading-[0] not-italic relative shrink-0 text-[52px] text-white tracking-[-1.04px] w-[575.92px] whitespace-pre-wrap">
                <p className="leading-[1.15] mb-0">Milestones That </p>
                <p className="leading-[1.15]">Shaped Euler</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[31px] items-end justify-center relative shrink-0">
              <p className="font-sans font-normal leading-normal relative shrink-0 text-[16px] text-white w-[531px]">
                Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.
              </p>
              <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0">
                {YEARS.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={`backdrop-blur-[7.619px] border-[0.762px] border-solid content-stretch flex h-[42px] items-center justify-center px-[24px] relative rounded-[24.381px] shrink-0 ${
                      selectedYear === year
                        ? "bg-white border-[rgba(18,18,18,0.5)]"
                        : "bg-black border-[rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <span className="font-display text-[16px] font-semibold leading-none not-italic whitespace-nowrap" style={{ color: selectedYear === year ? "rgb(18,18,18)" : "white" }}>
                      {year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Row */}
          <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
            {/* Card 1 */}
            <div className="bg-[rgba(255,255,255,0.04)] content-stretch flex gap-[24px] h-[354.531px] items-start overflow-clip relative rounded-[12px] shrink-0">
              <div className="h-[354.531px] relative rounded-bl-[12px] rounded-tl-[12px] shrink-0 w-[642.09px]">
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-bl-[12px] rounded-tl-[12px]">
                  <div className="absolute bg-[#d9d9d9] inset-0 rounded-bl-[12px] rounded-tl-[12px]" />
                  <div className="absolute inset-0 overflow-hidden rounded-bl-[12px] rounded-tl-[12px]">
                    <Image
                      src="/assets/about-euler/timeline-card-bg.png"
                      alt=""
                      fill
                      className="h-[234.09%] left-[0.02%] top-[-53.68%] w-[99.95%]"
                    />
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-bl-[12px] rounded-tl-[12px]">
                    <Image
                      src="/assets/about-euler/timeline-overlay-1.png"
                      alt=""
                      fill
                      className="h-[135.14%] left-[-15.49%] top-0 w-[130.97%]"
                    />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col h-full items-start justify-between py-[24px] relative shrink-0 w-[329.5px]">
                <p className="font-display text-[42px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.84px] w-full">
                  {milestone.year}
                </p>
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-display text-[20px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.4px] whitespace-nowrap">
                    One thousand vehicles at work.
                  </p>
                  <div className="font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[14px] text-white w-[min-content]">
                    <p className="leading-[normal] mb-0">Enough data from enough routes to design the</p>
                    <p className="leading-[normal]">next one with confidence.</p>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">CCS2</p>
                      </div>
                    </div>
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">60 kW</p>
                      </div>
                    </div>
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">4 of 6 free</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[rgba(255,255,255,0.04)] content-stretch flex gap-[24px] h-[354.531px] items-start overflow-clip relative rounded-[12px] shrink-0">
              <div className="h-[354.531px] relative rounded-bl-[12px] rounded-tl-[12px] shrink-0 w-[642.09px]">
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-bl-[12px] rounded-tl-[12px]">
                  <div className="absolute bg-[#d9d9d9] inset-0 rounded-bl-[12px] rounded-tl-[12px]" />
                  <div className="absolute inset-0 overflow-hidden rounded-bl-[12px] rounded-tl-[12px]">
                    <Image
                      src="/assets/about-euler/timeline-card-bg.png"
                      alt=""
                      fill
                      className="h-[234.09%] left-[0.02%] top-[-53.68%] w-[99.95%]"
                    />
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-bl-[12px] rounded-tl-[12px]">
                    <Image
                      src="/assets/about-euler/timeline-overlay-1.png"
                      alt=""
                      fill
                      className="h-[135.14%] left-[-15.49%] top-0 w-[130.97%]"
                    />
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-bl-[12px] rounded-tl-[12px]">
                    <Image
                      src="/assets/about-euler/timeline-overlay-2.png"
                      alt=""
                      fill
                      className="h-[185.99%] left-0 top-0 w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col h-full items-start justify-between py-[24px] relative shrink-0 w-[329.5px]">
                <p className="font-display text-[42px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.84px] w-full">
                  {milestone.year}
                </p>
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-display text-[20px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.4px] whitespace-nowrap">
                    One thousand vehicles at work.
                  </p>
                  <div className="font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[14px] text-white w-[min-content]">
                    <p className="leading-[normal] mb-0">Enough data from enough routes to design the</p>
                    <p className="leading-[normal]">next one with confidence.</p>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">CCS2</p>
                      </div>
                    </div>
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">60 kW</p>
                      </div>
                    </div>
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">4 of 6 free</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="bg-[rgba(204,204,204,0.2)] content-stretch flex flex-col h-[20px] items-start justify-center p-[4px] relative rounded-[14.4px] shrink-0 w-[116.199px]">
            <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[23.04px] w-[29.891px]" />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute flex items-center justify-center left-[49.82px] size-[55px] top-[427.12px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="relative size-[55px]">
                <Image
                  src="/assets/about-euler/timeline-arrow-left.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute right-[49.82px] size-[55px] top-[427.12px]">
            <Image
              src="/assets/about-euler/timeline-arrow-right.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute backdrop-blur-[0px] bg-gradient-to-l from-[#041231] h-[442.531px] right-0 to-[rgba(4,18,49,0)] top-[225.36px] w-[210.811px]" />
        </div>
      </div>
    </section>
  );
}
