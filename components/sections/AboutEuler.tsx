"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import CarouselArrows from "../ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";
import type { StrapiAboutEulerSection } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

const BASE_CARDS = [
  {
    id: 1,
    badge: "Purpose",
    title: "Built for Businesses",
    description: "We build electric commercial vehicles that help businesses move more and spend less.",
    stat: "Founded in New Delhi, 2018",
    mobileImage: "/assets/about-euler/card-1-mobile.webp",
    desktopImage: "/assets/about-euler/card-1-desktop.webp",
  },
  {
    id: 2,
    badge: "Customer First",
    title: "Every Decision Starts Here",
    description: "We build around real customer needs, not assumptions.",
    stat: "1000+ Daily Business Trips",
    mobileImage: "/assets/about-euler/card-2-mobile.webp",
    desktopImage: "/assets/about-euler/card-2-desktop.webp",
  },
  {
    id: 3,
    badge: "Ownership",
    title: "We Own the Outcome",
    description: "We take responsibility for every vehicle on the road, end to end.",
    stat: "24/7 Roadside Support",
    mobileImage: "/assets/about-euler/card-3-mobile.webp",
    desktopImage: "/assets/about-euler/card-3-desktop.webp",
  },
];

export interface AboutEulerProps {
  data?: StrapiAboutEulerSection;
}

/**
 * About Euler section (Figma 3223:16874).
 * Horizontal scrolling cards showcasing Euler's mission and values.
 * Unified slider: continuous desktop auto-scroll (no hover pause), draggable mouse,
 * blue navigation arrows with boundary auto-hide, full-bleed edge bleed without cropping.
 */
export default function AboutEuler({ data }: AboutEulerProps = {}) {
  const eyebrow = data?.eyebrow || "About Euler";
  const sourceCards =
    data?.cards && data.cards.length > 0
      ? data.cards.map((card, idx) => {
        const fallback = BASE_CARDS[idx % BASE_CARDS.length];
        return {
          id: card.id ?? idx + 1,
          badge: card.badge || fallback.badge,
          title: card.title || fallback.title,
          description: card.description || fallback.description,
          stat: card.stat || fallback.stat,
          mobileImage: mediaUrl(card.mobileImage, fallback.mobileImage),
          desktopImage: mediaUrl(card.desktopImage, fallback.desktopImage),
        };
      })
      : BASE_CARDS;

  const displayCards = sourceCards.map((c) => ({ ...c, uniqueKey: `card-${c.id}` }));

  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Continuous auto-scroll loop (speed = 50px/s, stops at the end, does NOT pause on hover)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

              if (row.scrollLeft < maxScroll - 1) {
                row.scrollLeft = Math.min(maxScroll, row.scrollLeft + advance);
                updateProgress();
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [updateProgress]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="About Euler">
      {/* Mobile Background */}
      <div className="absolute inset-0 lg:hidden" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)" }} />
      {/* Desktop Background */}
      <div className="absolute inset-0 max-lg:hidden" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)" }} />

      {/* Header Container (Centered 1440 frame) */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="flex w-full flex-col items-center px-5 py-[26px] sm:px-8 sm:py-9 lg:px-[80px] lg:pt-[62px] lg:pb-[42px]">
          {/* Header */}
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 lg:hidden">
              <div className="absolute h-[16px] left-[3.43px] top-0 w-[116.978px] overflow-hidden">
                <Image
                  src="/assets/about-euler/mobile-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
                <Image
                  src="/assets/about-euler/mobile-rect-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] sm:text-[13px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
                {eyebrow}
              </p>
            </div>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 max-lg:hidden">
              <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                <Image
                  src="/assets/about-euler/desktop-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                <Image
                  src="/assets/about-euler/desktop-rect-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase whitespace-nowrap">
                {eyebrow}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Cards Container with Draggable Scroll & Arrows */}
      <div className="relative w-full">
        <div
          id="about-euler-snap-row"
          ref={scrollRef}
          className="no-scrollbar flex w-full gap-[20px] overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        >
          {/* Left gutter spacer so first card starts lined up with 1440px grid! */}
          <div
            aria-hidden
            className="shrink-0"
            style={{ width: "max(20px, calc((100vw - 1440px) / 2 + 80px))" }}
          />

          {displayCards.map((card) => (
            <article
              key={card.uniqueKey}
              className="relative h-[420px] w-[324px] sm:h-[460px] sm:w-[480px] shrink-0 overflow-hidden rounded-[12px] sm:rounded-[18px] lg:h-[485px] lg:w-[720px] lg:rounded-[20px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-[12px] sm:rounded-[18px] lg:rounded-[20px]">
                {/* Mobile */}
                <Image
                  src={card.mobileImage}
                  alt={card.title}
                  fill
                  sizes="(min-width: 640px) 480px, 324px"
                  className="object-cover lg:hidden"
                  unoptimized
                />
                {/* Desktop */}
                <Image
                  src={card.desktopImage}
                  alt={card.title}
                  fill
                  sizes="720px"
                  className="object-cover max-lg:hidden"
                  unoptimized
                />
              </div>

              {/* Gradient Overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[12px] sm:rounded-[18px] lg:rounded-[20px] bg-gradient-to-b from-transparent from-[68.87%] to-black/60 to-[90.7%]"
              />

              {/* Info Card */}
              <div className="absolute bottom-[8px] sm:bottom-4 left-1/2 -translate-x-1/2 w-[308px] sm:w-[calc(100%-32px)] rounded-[10px] border border-white/35 bg-white/20 p-[12px] sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-[40px] lg:border-white/25 lg:bottom-[20.36px] lg:left-[20px] lg:translate-x-0 lg:w-[388px] lg:p-[16px]">
                {/* Badge */}
                <div className="mb-[6px] inline-flex flex-col items-start rounded-[50px] bg-[#d4dbec] px-[10px] py-[4px] lg:mb-[12px]">
                  <span className="text-[12px] font-bold leading-normal text-black lg:text-[12px]">
                    {card.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-[6px] text-[16px] sm:text-[18px] font-bold leading-normal tracking-[-0.32px] text-white lg:mb-[12px] lg:text-[20px] lg:tracking-[-0.4px]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mb-[6px] h-[36px] sm:h-[42px] overflow-hidden text-ellipsis text-[12px] sm:text-[13px] font-normal leading-[1.5] text-white lg:mb-[12px] lg:h-[48px] lg:text-[14px]">
                  {card.description}
                </p>

                {/* Stat Badge */}
                <div className="inline-flex items-center rounded-[14.614px] border border-[#6fcf97] border-[0.913px] bg-[rgba(111,207,151,0.24)] px-[6.51px] py-[4.34px] backdrop-blur-[9.134px] lg:rounded-[14.614px] lg:border-[0.913px] lg:px-[6.51px] lg:py-[4.34px]">
                  <span className="whitespace-nowrap text-[12px] font-bold leading-[1.15] tracking-[-0.24px] text-white lg:text-[12px]">
                    {card.stat}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Right end spacer */}
          <div
            aria-hidden
            className="shrink-0"
            style={{ width: "max(20px, calc((100vw - 1440px) / 2 + 80px))" }}
          />
        </div>

        {/* Navigation Arrows with boundary auto-hide */}
        <CarouselArrows
          rowId="about-euler-snap-row"
          label="About Euler cards"
          variant="blue"
          onStep={() => pauseAutoScroll(600)}
        />

        {/* Right-edge fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-[5] hidden h-full w-[210.811px] lg:block"
          style={{
            background:
              "linear-gradient(270deg, #0D2D68 0%, rgba(13, 49, 112, 0.00) 100%)",
          }}
        />
      </div>

      {/* Progress Indicator Pill (Figma 3321:13258) */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-6 pb-2 lg:pt-8 lg:pb-[62px]">
        <div
          role="progressbar"
          aria-label="About Euler scroll progress"
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
    </section>
  );
}
