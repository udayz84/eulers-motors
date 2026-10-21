"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";

type OverviewCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
};

const CARDS: OverviewCard[] = [
  {
    id: "shepherd-app",
    title: "Shepherd App",
    description: "Track battery health, trips, charging, and updates from one dashboard.",
    icon: "/assets/products/overview-icon-1.png",
    iconWidth: 89,
    iconHeight: 75,
  },
  {
    id: "features",
    title: "Features",
    description: "Designed for Indian roads, rugged for heat. Fast charging, long range, smart connectivity.",
    icon: "/assets/products/overview-icon-2.png",
    iconWidth: 100,
    iconHeight: 75,
  },
  {
    id: "ideal-for",
    title: "Ideal for",
    description: "Fleet owners and transport businesses. 10 vehicles and up.",
    icon: "/assets/products/overview-icon-3.png",
    iconWidth: 100,
    iconHeight: 75,
  },
  {
    id: "key-use-cases",
    title: "Key Use Cases",
    description: "Ideal for last-mile delivery and fleet operations, designed for daily routes in urban areas.",
    icon: "/assets/products/overview-icon-4.png",
    iconWidth: 100,
    iconHeight: 75,
  },
  {
    id: "benefits",
    title: "Benefits",
    description: "Lower costs with less fuel and maintenance. Reliable, quiet, eco-friendly performance.",
    icon: "/assets/products/overview-icon-5.png",
    iconWidth: 100,
    iconHeight: 75,
  },
];

/**
 * "What this vehicle is good at." — Figma node 2728:7444
 * Overview cards carousel highlighting vehicle advantages (Shepherd App, Features,
 * Ideal for, Key Use Cases, Benefits) with 3D blue icons, gradient cards, and progress pill.
 */
export default function ProductOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const interactionPausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const row = scrollRef.current;
    if (!section || !row) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0.15 });
    observer.observe(section);

    let frame = 0;
    const tick = () => {
      const duplicate = row.querySelector<HTMLElement>("[data-overview-copy='true']");
      const first = row.querySelector<HTMLElement>("[data-overview-index='0']");
      if (!reducedMotion && visibleRef.current && !interactionPausedRef.current && duplicate && first) {
        const loopDistance = duplicate.offsetLeft - first.offsetLeft;
        if (loopDistance > 0) {
          row.scrollLeft += 0.35;
          if (row.scrollLeft >= loopDistance) row.scrollLeft -= loopDistance;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseForInteraction = () => {
    interactionPausedRef.current = true;
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
  };

  const resumeAfterInteraction = () => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      interactionPausedRef.current = false;
    }, 2200);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 432; // 412px card + 20px gap
    const newIndex = Math.min(
      CARDS.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Vehicle Overview"
      className="relative flex w-full flex-col gap-6 overflow-hidden bg-white px-5 sm:px-8 py-[42px] sm:py-[50px] lg:gap-0 lg:px-0 lg:pb-16 lg:pt-[62px]"
    >
      {/* Centered Header Row (Figma 2728:7445) */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center gap-6 px-0 text-left lg:items-center lg:gap-4 lg:px-[80px] lg:pb-[36px] lg:text-center">
        <Eyebrow label="Overview" icons="navy" />
        <h2 className="font-display text-[28px] sm:text-[38px] font-semibold not-italic leading-[1.15] tracking-[-0.56px] text-ink lg:text-[52px] lg:tracking-[-1.04px]">
          What this vehicle is good at.
        </h2>
      </div>

      {/* Cards Carousel Track (Figma 2728:7462) */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onPointerDown={pauseForInteraction}
          onPointerUp={resumeAfterInteraction}
          onPointerCancel={resumeAfterInteraction}
          onWheel={pauseForInteraction}
          className="carousel-pad-overview mx-auto flex w-full max-w-[680px] flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:mx-0 lg:max-w-none lg:flex lg:flex-row lg:gap-5 lg:overflow-x-auto lg:pb-4 lg:snap-x lg:snap-mandatory scrollbar-none"
        >
          {[...CARDS, ...CARDS].map((card, index) => (
            <article
              key={`${card.id}-${index}`}
              data-overview-index={index % CARDS.length}
              data-overview-copy={index >= CARDS.length ? "true" : undefined}
              aria-hidden={index >= CARDS.length ? true : undefined}
              className="flex w-full shrink-0 snap-start flex-col justify-end gap-3 overflow-hidden rounded-[12px] bg-gradient-to-b from-[#ccd8e8] to-[#cfdef6] p-[16px_14px] transition-transform hover:-translate-y-1 sm:h-[230px] sm:justify-between lg:h-[257px] lg:w-[412px] lg:justify-between lg:gap-0 lg:p-8"
            >
              <div className="relative h-[52px] w-[52px] shrink-0 lg:h-[75px] lg:w-auto">
                <Image
                  src={card.icon}
                  alt=""
                  width={card.iconWidth}
                  height={card.iconHeight}
                  className="h-full w-full object-cover object-left lg:w-auto lg:object-contain"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[18px] font-bold not-italic leading-[1.15] tracking-[-0.36px] text-ink lg:bg-clip-text lg:text-[26px] lg:font-semibold lg:tracking-[-0.78px] lg:text-transparent lg:[background-image:linear-gradient(110deg,rgb(29,111,255)_24%,rgb(14,47,109)_93%)]">
                  {card.title}
                </h3>
                <p className="font-sans text-[12px] font-normal leading-normal text-ink lg:text-[16px]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Right Edge Fade Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-[180px] bg-gradient-to-l from-white to-transparent lg:block xl:w-[210px]"
        />
      </div>

      {/* Progress Indicator Pill (Figma 3324:13476) */}
      <div className="mx-auto hidden w-full max-w-[1440px] items-center justify-center pt-8 lg:flex">
        <div className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1">
          <div
            className="h-full rounded-[23px] bg-[#121212] transition-all duration-300"
            style={{
              width: `${100 / CARDS.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
