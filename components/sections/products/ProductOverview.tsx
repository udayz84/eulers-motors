"use client";

import { useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      aria-label="Vehicle Overview"
      className="relative w-full overflow-hidden bg-white pb-12 pt-16 lg:pb-16 lg:pt-[62px]"
    >
      {/* Centered Header Row (Figma 2728:7445) */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-4 px-5 pb-[36px] text-center sm:px-8 lg:px-[80px]">
        <Eyebrow label="Overview" icons="navy" />
        <h2 className="font-display text-[32px] font-semibold not-italic leading-[1.15] tracking-[-0.64px] text-ink sm:text-[42px] lg:text-[52px] lg:tracking-[-1.04px]">
          What this vehicle is good at.
        </h2>
      </div>

      {/* Cards Carousel Track (Figma 2728:7462) */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {/* Left Alignment Spacer */}
          <div
            aria-hidden
            className="hidden shrink-0 lg:block"
            style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 80px)" }}
          />
          <div
            aria-hidden
            className="hidden shrink-0 sm:block lg:hidden"
            style={{ width: "32px" }}
          />
          <div
            aria-hidden
            className="shrink-0 sm:hidden"
            style={{ width: "20px" }}
          />

          {CARDS.map((card) => (
            <article
              key={card.id}
              className="flex h-[257px] w-[320px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[12px] bg-gradient-to-b from-[#ccd8e8] to-[#cfdef6] p-8 transition-transform hover:-translate-y-1 sm:w-[412px]"
            >
              <div className="relative h-[75px] w-auto">
                <Image
                  src={card.icon}
                  alt=""
                  width={card.iconWidth}
                  height={card.iconHeight}
                  className="h-full w-auto object-contain object-left"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3
                  className="bg-clip-text font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.78px] text-transparent sm:text-[26px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, rgb(29, 111, 255) 24%, rgb(14, 47, 109) 93%)",
                  }}
                >
                  {card.title}
                </h3>
                <p className="font-sans text-[15px] font-normal leading-normal text-ink sm:text-[16px]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}

          {/* Right Alignment Spacer */}
          <div
            aria-hidden
            className="hidden shrink-0 lg:block"
            style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 80px)" }}
          />
          <div
            aria-hidden
            className="hidden shrink-0 sm:block lg:hidden"
            style={{ width: "32px" }}
          />
          <div
            aria-hidden
            className="shrink-0 sm:hidden"
            style={{ width: "20px" }}
          />
        </div>

        {/* Right Edge Fade Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-[180px] bg-gradient-to-l from-white to-transparent lg:block xl:w-[210px]"
        />
      </div>

      {/* Progress Indicator Pill (Figma 3324:13476) */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-8">
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
