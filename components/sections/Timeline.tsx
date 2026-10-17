"use client";

import { useEffect, useRef, useState } from "react";
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

/* Card image = 642.09×354.531 rounded-left, CSS background layers transcribed
   from Figma (image order: last background paints underneath). */
const CARD_BG_BASE =
  "url('/assets/timeline/timeline-2.png') -99.486px 0 / 130.973% 135.138% no-repeat, url('/assets/timeline/timeline-1.png') 0.151px -190.305px / 99.953% 234.094% no-repeat, #D9D9D9";
const CARD_BG_TOP =
  "url('/assets/timeline/timeline-3.png') 0 0 / 100% 185.99% no-repeat, " + CARD_BG_BASE;

const TIMELINE_CARDS = [
  { id: "card-1", background: CARD_BG_BASE },
  { id: "card-2", background: CARD_BG_TOP },
  { id: "card-3", background: CARD_BG_TOP },
];

/**
 * Timeline section (Figma desktop: 3530:16872, mobile: 2929-14952).
 * Interactive timeline with year selection and milestone cards.
 * Desktop: Two cards with gradient background. Mobile: Single card with solid background.
 */
export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [slideIndex, setSlideIndex] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [cardStep, setCardStep] = useState(1015.59);
  const [mobileProgress, setMobileProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement>(null);

  const milestone = MILESTONES[selectedYear as keyof typeof MILESTONES];

  const maxSlide = TIMELINE_CARDS.length - 1;
  const offset = Math.min(slideIndex * cardStep, maxOffset);
  const progress = maxSlide > 0 ? slideIndex / maxSlide : 0;

  useEffect(() => {
    const measure = () => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!section || !wrapper || !track) return;
      const firstCard = track.firstElementChild as HTMLElement | null;
      const lastCard = track.lastElementChild as HTMLElement | null;
      const step = firstCard ? firstCard.offsetWidth + 20 : 1015.59;
      const wrapperStyle = getComputedStyle(wrapper);
      // clientWidth/padding are CSS px (rects are scaled by the tablet html zoom)
      const visibleWidth =
        wrapper.clientWidth -
        parseFloat(wrapperStyle.paddingLeft || "0") -
        parseFloat(wrapperStyle.paddingRight || "0");
      const contentWidth = lastCard
        ? lastCard.offsetLeft + lastCard.offsetWidth
        : track.scrollWidth;
      setCardStep(step);
      setMaxOffset(Math.max(0, contentWidth - visibleWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const changeSlide = (direction: number) => {
    setSlideIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return maxSlide;
      if (next > maxSlide) return 0;
      return next;
    });
  };

  const onMobileCardsScroll = () => {
    const el = mobileCardsRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setMobileProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Timeline"
    >
      {/* Mobile Layout */}
      <div className="relative px-5 sm:px-8 py-[42px] sm:py-[52px] lg:hidden" style={{ backgroundImage: "linear-gradient(0deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(272deg, rgb(14, 47, 109) -63.51%, rgb(29, 111, 255) 87.23%)" }}>
        <div className="mx-auto flex w-full max-w-[680px] flex-col gap-[31px] items-start">
          {/* Header */}
          <div className="flex flex-col gap-[14px] w-full max-w-[680px]">
            {/* Eyebrow */}
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
              <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
                <Image
                  src="/assets/timeline/mobile-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
                <Image
                  src="/assets/timeline/mobile-rect-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
                Timeline
              </p>
            </div>
            <h2 className="font-display text-[28px] sm:text-[36px] font-semibold leading-[1.15] tracking-[-0.56px] text-white w-full">
              Milestones That
              <br />
              Shaped Euler
            </h2>
            <p className="font-sans font-normal leading-normal text-[12px] sm:text-[14px] text-white">
              Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.
            </p>
          </div>

          {/* Year Buttons — moveable (horizontal scroll) */}
          <div className="snap-row -mx-5 sm:-mx-8 w-[calc(100%+40px)] sm:w-[calc(100%+64px)] gap-[12px] px-5 sm:px-8 scroll-pl-5 sm:scroll-pl-8">
            {YEARS.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`backdrop-blur-[7.619px] border-[0.762px] border-solid content-stretch flex h-[32px] sm:h-[36px] items-center justify-center px-[14px] sm:px-[18px] relative rounded-[24.381px] shrink-0 ${
                  selectedYear === year
                    ? "bg-white border-[rgba(18,18,18,0.5)]"
                    : "bg-black border-[rgba(255,255,255,0.1)]"
                }`}
              >
                <span className="font-display text-[12px] sm:text-[14px] font-semibold leading-none not-italic whitespace-nowrap" style={{ color: selectedYear === year ? "rgb(18,18,18)" : "white" }}>
                  {year}
                </span>
              </button>
            ))}
          </div>

          {/* Cards — moveable (horizontal scroll carousel) */}
          <div
            ref={mobileCardsRef}
            onScroll={onMobileCardsScroll}
            className="snap-row -mx-5 sm:-mx-8 w-[calc(100%+40px)] sm:w-[calc(100%+64px)] gap-[12px] sm:gap-[16px] px-5 sm:px-8 scroll-pl-5 sm:scroll-pl-8"
          >
            {TIMELINE_CARDS.map((card) => (
              <div
                key={card.id}
                className="border border-white/20 bg-[rgba(255,255,255,0.04)] content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[11px] pt-[252px] sm:pt-[295px] px-[12px] sm:px-[16px] relative rounded-[12px] shrink-0 w-[353px] sm:w-[420px]"
              >
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  <p className="font-display text-[42px] sm:text-[48px] font-semibold leading-[1.15] tracking-[-0.84px] text-white whitespace-nowrap">
                    {milestone.year}
                  </p>
                  <p className="font-display text-[18px] sm:text-[20px] font-semibold leading-[1.15] tracking-[-0.36px] text-white whitespace-nowrap">
                    One thousand vehicles at work.
                  </p>
                  <div className="font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[12px] sm:text-[14px] text-white w-[min-content]">
                    <p className="leading-[normal] mb-0">Enough data from enough routes to design the</p>
                    <p className="leading-[normal]">next one with confidence.</p>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] sm:px-[14px] py-[4px] sm:py-[6px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] sm:text-[13px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">CCS2</p>
                      </div>
                    </div>
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] sm:px-[14px] py-[4px] sm:py-[6px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] sm:text-[13px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">60 kW</p>
                      </div>
                    </div>
                    <div className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] sm:px-[14px] py-[4px] sm:py-[6px] relative rounded-[50px] shrink-0">
                      <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] sm:text-[13px] text-black whitespace-nowrap">
                        <p className="leading-[normal]">4 of 6 free</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[235.284px] sm:h-[280px] left-0 top-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none">
                    <div className="absolute bg-[#d9d9d9] inset-0" />
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src="/assets/timeline/mobile-timeline-1.png"
                        alt=""
                        fill
                        className="h-[234.09%] left-[0.02%] top-[-53.68%] w-[99.95%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="bg-[rgba(204,204,204,0.2)] content-stretch flex flex-col h-[20px] items-start justify-center p-[4px] relative rounded-[14.4px] self-center shrink-0 w-[116.199px]">
            <div
              className="bg-white relative h-[12px] w-[29.891px] rounded-[23.04px]"
              style={{ transform: `translateX(${mobileProgress * 78.308}px)` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout — outer frame: 1440 → padding 60/80, centered column */}
      <div className="relative hidden lg:block" style={{ backgroundImage: "linear-gradient(0deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(272deg, rgb(14, 47, 109) -63.51%, rgb(29, 111, 255) 87.23%)" }}>
        <div ref={wrapperRef} className="content-stretch relative mx-auto flex w-full max-w-[1440px] flex-col gap-[52px] items-center px-[80px] py-[60px]">
          {/* Header Row */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-[636px]">
              {/* Eyebrow */}
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                  <Image
                    src="/assets/timeline/desktop-rect-1.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                  <Image
                    src="/assets/timeline/desktop-rect-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase w-[96px]">
                  Timeline
                </p>
              </div>
              <div className="font-display font-semibold leading-[0] not-italic relative shrink-0 text-[52px] text-white tracking-[-1.04px] w-[575.92px] whitespace-pre-wrap">
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

          {/* Cards Row — clipped to the content area like About Euler */}
          <div className="relative w-full shrink-0 overflow-hidden lg:w-[max(calc(100%+160px),100vw)] lg:px-[max(80px,calc(50vw-640px))]">
            <div
              ref={trackRef}
              className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {TIMELINE_CARDS.map((card) => (
                <div key={card.id} className="border border-white/20 bg-[rgba(255,255,255,0.04)] content-stretch flex gap-[24px] h-[354.531px] items-start overflow-clip relative rounded-[12px] shrink-0">
                  <div
                    aria-hidden
                    className="h-[354.531px] shrink-0 w-[642.09px] rounded-l-[12px]"
                    style={{ background: card.background }}
                  />
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
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-[rgba(204,204,204,0.2)] relative h-[20px] shrink-0 w-[116.199px] rounded-[14.4px]">
            <div
              className="absolute top-[4px] h-[12px] w-[29.891px] rounded-[23.04px] bg-white transition-[left] duration-500 ease-out"
              style={{ left: `${4 + progress * 78.308}px` }}
            />
          </div>

          {/* Navigation Arrows — vertically centered on the cards */}
          <button
            type="button"
            aria-label="Previous milestones"
            onClick={() => changeSlide(-1)}
            className="absolute left-[49.818px] bottom-[281.766px] flex size-[55px] cursor-pointer items-center justify-center"
          >
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[55px]">
                <Image
                  src="/assets/about-euler/timeline-arrow-left.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </button>
          <button
            type="button"
            aria-label="Next milestones"
            onClick={() => changeSlide(1)}
            className="absolute right-[49.818px] bottom-[281.766px] z-10 size-[55px] cursor-pointer"
          >
            <Image
              src="/assets/about-euler/timeline-arrow-right.svg"
              alt=""
              fill
              className="object-cover"
            />
          </button>

        </div>

        {/* Right-edge fade (matches AboutEuler) — anchored to the section's right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-[96px] z-[5] h-[442.531px] w-[210.811px]"
          style={{
            background:
              "linear-gradient(270deg, #041231 0%, rgba(4, 18, 49, 0.00) 100%)",
            backdropFilter: "blur(0px)",
          }}
        />
      </div>
    </section>
  );
}
