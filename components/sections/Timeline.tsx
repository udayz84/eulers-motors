"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import CarouselArrows from "../ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

const YEARS = [2018, 2020, 2022, 2024, 2025, 2026];

/* Card image = 642.09×354.531 rounded-left, CSS background layers transcribed
   from Figma (image order: last background paints underneath). */
const CARD_BG_BASE =
  "url('/assets/timeline/timeline-2.png') -99.486px 0 / 130.973% 135.138% no-repeat, url('/assets/timeline/timeline-1.png') 0.151px -190.305px / 99.953% 234.094% no-repeat, #D9D9D9";
const CARD_BG_TOP =
  "url('/assets/timeline/timeline-3.png') 0 0 / 100% 185.99% no-repeat, " + CARD_BG_BASE;

const BASE_ITEMS = [
  {
    year: "2018",
    title: "One thousand vehicles at work.",
    descLine1: "Enough data from enough routes to design the",
    descLine2: "next one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    background: CARD_BG_BASE,
  },
  {
    year: "2020",
    title: "One thousand vehicles at work.",
    descLine1: "Enough data from enough routes to design the",
    descLine2: "next one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    background: CARD_BG_TOP,
  },
  {
    year: "2022",
    title: "One thousand vehicles at work.",
    descLine1: "Enough data from enough routes to design the",
    descLine2: "next one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    background: CARD_BG_BASE,
  },
  {
    year: "2024",
    title: "One thousand vehicles at work.",
    descLine1: "Enough data from enough routes to design the",
    descLine2: "next one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    background: CARD_BG_TOP,
  },
  {
    year: "2025",
    title: "One thousand vehicles at work.",
    descLine1: "Enough data from enough routes to design the",
    descLine2: "next one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    background: CARD_BG_BASE,
  },
  {
    year: "2026",
    title: "One thousand vehicles at work.",
    descLine1: "Enough data from enough routes to design the",
    descLine2: "next one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    background: CARD_BG_TOP,
  },
];

/**
 * Timeline section (Figma desktop: 3530:16872, mobile: 2929-14952).
 * Interactive timeline with year selection and milestone cards.
 * Unified slider: continuous desktop auto-scroll (no hover pause), draggable mouse,
 * blue navigation arrows with boundary auto-hide, full-bleed bleed layout without edge cropping.
 */
export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Repeat for continuous runway
  const displayCards = Array.from({ length: 4 }).flatMap((_, setIndex) =>
    BASE_ITEMS.map((item, idx) => ({
      ...item,
      uniqueKey: `${setIndex}-${item.year}-${idx}`,
    }))
  );

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
    } else {
      setScrollProgress(0);
    }
  }, []);

  const pauseAutoScroll = useCallback((duration = 600) => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, duration);
  }, []);

  useDraggableScroll(scrollRef, {
    onDragStart: () => {
      isDraggingRef.current = true;
      pauseAutoScroll(600);
    },
    onDragEnd: () => {
      isDraggingRef.current = false;
      pauseAutoScroll(400);
      updateProgress();
    },
  });

  // Track initial scroll progress and attach resize/scroll sync
  useEffect(() => {
    updateProgress();
    const row = scrollRef.current;
    if (!row) return;

    const onStep = () => pauseAutoScroll(600);

    row.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    row.addEventListener("carousel-step", onStep);

    return () => {
      row.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      row.removeEventListener("carousel-step", onStep);
    };
  }, [updateProgress, pauseAutoScroll]);

  // Section visibility check
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Continuous auto-scroll loop (speed = 50px/s, does NOT pause on hover)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime: number | null = null;
    let animId: number;
    let accumulator = 0;

    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const isDesktop = window.innerWidth >= 1024;
      if (
        isDesktop &&
        isVisibleRef.current &&
        !isInteractingRef.current &&
        !isDraggingRef.current
      ) {
        const row = scrollRef.current;
        if (row) {
          const maxScroll = row.scrollWidth - row.clientWidth;
          if (maxScroll > 1) {
            accumulator += 50 * delta;
            if (accumulator >= 1) {
              const advance = Math.floor(accumulator);
              accumulator -= advance;

              if (row.scrollLeft >= maxScroll - 2) {
                row.scrollLeft = 0;
              } else {
                row.scrollLeft += advance;
              }
              updateProgress();
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [updateProgress]);

  const scrollToYear = (year: number) => {
    setSelectedYear(year);
    pauseAutoScroll(800);
    const row = scrollRef.current;
    if (!row) return;

    const targetIdx = BASE_ITEMS.findIndex((item) => Number(item.year) === year);
    if (targetIdx !== -1) {
      const cardWidth = 1015;
      row.scrollTo({
        left: targetIdx * cardWidth,
        behavior: "smooth",
      });
    }
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
          <div className="no-scrollbar flex overflow-x-auto -mx-5 sm:-mx-8 w-[calc(100%+40px)] sm:w-[calc(100%+64px)] gap-[12px] px-5 sm:px-8">
            {YEARS.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => scrollToYear(year)}
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

          {/* Cards — moveable */}
          <div
            className="no-scrollbar flex overflow-x-auto -mx-5 sm:-mx-8 w-[calc(100%+40px)] sm:w-[calc(100%+64px)] gap-[12px] sm:gap-[16px] px-5 sm:px-8"
          >
            {BASE_ITEMS.map((item, idx) => (
              <div
                key={`mobile-${item.year}-${idx}`}
                className="border border-white/20 bg-[rgba(255,255,255,0.04)] content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[11px] pt-[252px] sm:pt-[295px] px-[12px] sm:px-[16px] relative rounded-[12px] shrink-0 w-[353px] sm:w-[420px]"
              >
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  <p className="font-display text-[42px] sm:text-[48px] font-semibold leading-[1.15] tracking-[-0.84px] text-white whitespace-nowrap">
                    {item.year}
                  </p>
                  <p className="font-display text-[18px] sm:text-[20px] font-semibold leading-[1.15] tracking-[-0.36px] text-white whitespace-nowrap">
                    {item.title}
                  </p>
                  <div className="font-sans font-normal leading-[0] min-w-full relative shrink-0 text-[12px] sm:text-[14px] text-white w-[min-content]">
                    <p className="leading-[normal] mb-0">{item.descLine1}</p>
                    <p className="leading-[normal]">{item.descLine2}</p>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                    {item.badges.map((badge, bIdx) => (
                      <div key={bIdx} className="bg-[#d4dbec] content-stretch flex flex-col items-start px-[10px] sm:px-[14px] py-[4px] sm:py-[6px] relative rounded-[50px] shrink-0">
                        <div className="font-sans font-bold justify-center leading-[0] relative shrink-0 text-[12px] sm:text-[13px] text-black whitespace-nowrap">
                          <p className="leading-[normal]">{badge}</p>
                        </div>
                      </div>
                    ))}
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

          {/* Pagination Dots (Mobile) */}
          <div className="bg-[rgba(204,204,204,0.2)] content-stretch flex flex-col h-[20px] items-start justify-center p-[4px] relative rounded-[14.4px] self-center shrink-0 w-[116.199px]">
            <div
              className="bg-white relative h-[12px] w-[29.891px] rounded-[23.04px]"
              style={{ transform: `translateX(${scrollProgress * 78.308}px)` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout — edge-to-edge full width so cards bleed smoothly without cutting */}
      <div
        className="relative hidden lg:block overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(272deg, rgb(14, 47, 109) -63.51%, rgb(29, 111, 255) 87.23%)",
        }}
      >
        {/* Header Row (Centered 1440 container) */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-[80px] pt-[60px] pb-[42px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-[636px] flex-col gap-[25px] items-start">
              {/* Eyebrow */}
              <div className="flex gap-[6px] items-center">
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
            <div className="flex flex-col gap-[31px] items-end justify-center">
              <p className="font-sans font-normal leading-normal text-[16px] text-white w-[531px]">
                Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.
              </p>
              <div className="flex gap-[16px] items-center justify-end">
                {YEARS.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => scrollToYear(year)}
                    className={`backdrop-blur-[7.619px] border-[0.762px] border-solid flex h-[42px] items-center justify-center px-[24px] relative rounded-[24.381px] shrink-0 transition-colors ${
                      selectedYear === year
                        ? "bg-white border-[rgba(18,18,18,0.5)]"
                        : "bg-black border-[rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <span
                      className="font-display text-[16px] font-semibold leading-none not-italic whitespace-nowrap"
                      style={{ color: selectedYear === year ? "rgb(18,18,18)" : "white" }}
                    >
                      {year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Carousel Track Container */}
        <div className="relative w-full">
          <div
            id="timeline-snap-row"
            ref={scrollRef}
            className="no-scrollbar flex w-full gap-[20px] items-center overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          >
            {/* Left gutter spacer so first card starts lined up with 1440px grid! */}
            <div
              aria-hidden
              className="shrink-0"
              style={{ width: "max(32px, calc((100vw - 1440px) / 2 + 80px))" }}
            />

            {displayCards.map((card) => (
              <div
                key={card.uniqueKey}
                className="border border-white/20 bg-[rgba(255,255,255,0.04)] flex gap-[24px] h-[354.531px] items-start overflow-clip relative rounded-[12px] shrink-0 w-[995px] select-none"
              >
                <div
                  aria-hidden
                  className="h-[354.531px] shrink-0 w-[642.09px] rounded-l-[12px]"
                  style={{ background: card.background }}
                />
                <div className="flex flex-col h-full items-start justify-between py-[24px] relative shrink-0 w-[329.5px]">
                  <p className="font-display text-[42px] font-semibold leading-[1.15] not-italic text-white tracking-[-0.84px] w-full">
                    {card.year}
                  </p>
                  <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="font-display text-[20px] font-semibold leading-[1.15] not-italic text-white tracking-[-0.4px] whitespace-nowrap">
                      {card.title}
                    </p>
                    <div className="font-sans font-normal min-w-full text-[14px] text-white">
                      <p className="leading-[normal] mb-0">{card.descLine1}</p>
                      <p className="leading-[normal]">{card.descLine2}</p>
                    </div>
                    <div className="flex gap-[10px] items-center relative shrink-0">
                      {card.badges.map((badge, bIdx) => (
                        <div
                          key={bIdx}
                          className="bg-[#d4dbec] flex flex-col items-start px-[10px] py-[4px] relative rounded-[50px] shrink-0"
                        >
                          <span className="font-sans font-bold leading-normal text-[12px] text-black whitespace-nowrap">
                            {badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Right end spacer */}
            <div
              aria-hidden
              className="shrink-0"
              style={{ width: "max(32px, calc((100vw - 1440px) / 2 + 80px))" }}
            />
          </div>

          {/* Right-edge fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-[5] h-full w-[210.811px]"
            style={{
              background:
                "linear-gradient(270deg, #041231 0%, rgba(4, 18, 49, 0.00) 100%)",
            }}
          />

          {/* Blue Navigation Arrows with boundary auto-hide */}
          <CarouselArrows
            rowId="timeline-snap-row"
            label="milestones timeline"
            variant="blue"
            onStep={() => pauseAutoScroll(600)}
          />
        </div>

        {/* Progress Indicator Pill */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-8 pb-[60px]">
          <div
            role="progressbar"
            aria-label="Timeline scroll progress"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-white/20 p-1"
          >
            <div
              className="h-full w-[29.891px] rounded-[23.04px] bg-white transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translateX(${scrollProgress * 78.308}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
