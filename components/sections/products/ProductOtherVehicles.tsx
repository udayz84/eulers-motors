"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

type VehicleCard = {
  id: string;
  name: string;
  image: string;
  ground: string;
  href: string;
  stats: {
    label: string;
    value: string;
    unit: string;
  }[];
};

const VEHICLES: VehicleCard[] = [
  {
    id: "turbo-ev-1000",
    name: "TURBO EV 1000",
    image: "/assets/other-vehicles/turbo-ev-1000.png",
    ground: "#4B423F",
    href: "/products/turbo-ev-1000",
    stats: [
      { label: "on one charge", value: "220", unit: "km" },
      { label: "Load capacity", value: "1,000", unit: "kg" },
      { label: "Running cost", value: "₹0.98", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
  {
    id: "hiload-ev",
    name: "HiLoad EV",
    image: "/assets/other-vehicles/hiload-ev.png",
    ground: "#524F56",
    href: "/products/hiload-ev",
    stats: [
      { label: "on one charge", value: "170", unit: "km" },
      { label: "Load capacity", value: "688", unit: "kg" },
      { label: "Running cost", value: "₹0.85", unit: "/km" },
      { label: "Charging Time", value: "60", unit: "min" },
    ],
  },
  {
    id: "storm-ev-t1500",
    name: "Storm EV T1500",
    image: "/assets/other-vehicles/storm-ev-t1500.png",
    ground: "#4B423F",
    href: "/products/storm-ev-t1500",
    stats: [
      { label: "on one charge", value: "210", unit: "km" },
      { label: "Load capacity", value: "1,500", unit: "kg" },
      { label: "Running cost", value: "₹1.15", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
];

const ALL_OTHER_VEHICLES: VehicleCard[] = [
  {
    id: "storm-ev-lr200",
    name: "Storm EV LR 200",
    image: "/assets/other-vehicles/storm-ev-lr200.png",
    ground: "#4B423F",
    href: "/products/lr200",
    stats: [
      { label: "on one charge", value: "200+", unit: "km" },
      { label: "Load capacity", value: "1,500", unit: "kg" },
      { label: "Running cost", value: "₹1.05", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
  {
    id: "turbo-ev-1000",
    name: "TURBO EV 1000",
    image: "/assets/other-vehicles/turbo-ev-1000.png",
    ground: "#4B423F",
    href: "/products/turbo-ev-1000",
    stats: [
      { label: "on one charge", value: "220", unit: "km" },
      { label: "Load capacity", value: "1,000", unit: "kg" },
      { label: "Running cost", value: "₹0.98", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
  {
    id: "hiload-ev",
    name: "HiLoad EV",
    image: "/assets/other-vehicles/hiload-ev.png",
    ground: "#524F56",
    href: "/products/hiload-ev",
    stats: [
      { label: "on one charge", value: "170", unit: "km" },
      { label: "Load capacity", value: "688", unit: "kg" },
      { label: "Running cost", value: "₹0.85", unit: "/km" },
      { label: "Charging Time", value: "60", unit: "min" },
    ],
  },
  {
    id: "storm-ev-t1500",
    name: "Storm EV T1500",
    image: "/assets/other-vehicles/storm-ev-t1500.png",
    ground: "#4B423F",
    href: "/products/storm-ev-t1500",
    stats: [
      { label: "on one charge", value: "210", unit: "km" },
      { label: "Load capacity", value: "1,500", unit: "kg" },
      { label: "Running cost", value: "₹1.15", unit: "/km" },
      { label: "Charging Time", value: "15", unit: "min" },
    ],
  },
];

/**
 * Other Vehicles ("Also worth a look.") — Figma node 2862:10734
 * Magnet infinite loop carousel with desktop auto-scroll, magnetic snapping,
 * interactive navigation arrows, and synchronized progress indicator.
 */
export default function ProductOtherVehicles({ currentVehicleId }: { currentVehicleId?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayVehicles = currentVehicleId
    ? ALL_OTHER_VEHICLES.filter((v) => v.id !== currentVehicleId).slice(0, 3)
    : VEHICLES;

  const N = displayVehicles.length;
  // Duplicate 3x for true seamless infinite loop
  const loopedVehicles = [...displayVehicles, ...displayVehicles, ...displayVehicles];

  const virtualIndexRef = useRef(N);
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getCardStep = () => {
    if (typeof window === "undefined") return 744;
    return window.innerWidth < 640 ? 340 : 744;
  };

  // Center on middle set (Set 1) on initial client mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const step = getCardStep();
    container.scrollLeft = N * step;
    virtualIndexRef.current = N;
  }, [N]);

  const scrollToVirtualIndex = (vIndex: number, behavior: ScrollBehavior = "smooth") => {
    const container = scrollRef.current;
    if (!container) return;
    const step = getCardStep();
    virtualIndexRef.current = vIndex;

    container.scrollTo({
      left: vIndex * step,
      behavior,
    });

    const normalized = ((vIndex % N) + N) % N;
    setActiveIndex(normalized);

    // If scrolled past the center set into Set 0 or Set 2, seamlessly jump back to Set 1
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    if (vIndex >= 2 * N || vIndex < N) {
      jumpTimeoutRef.current = setTimeout(() => {
        if (!scrollRef.current) return;
        const resetIndex = normalized + N;
        virtualIndexRef.current = resetIndex;
        scrollRef.current.style.scrollSnapType = "none";
        scrollRef.current.scrollLeft = resetIndex * step;
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.style.scrollSnapType = "";
          }
        });
      }, 500);
    }
  };

  // Section visibility tracking
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Desktop auto-scroll loop
  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const interval = setInterval(() => {
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      if (
        isDesktop &&
        isVisibleRef.current &&
        !isHoveredRef.current &&
        !isInteractingRef.current
      ) {
        scrollToVirtualIndex(virtualIndexRef.current + 1, "smooth");
      }
    }, 3500);

    return () => {
      clearInterval(interval);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, [N]);

  const scroll = (direction: -1 | 1) => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);

    const nextVirtual = virtualIndexRef.current + direction;
    scrollToVirtualIndex(nextVirtual, "smooth");

    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 4000);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const step = getCardStep();
    const vIndex = Math.round(scrollLeft / step);
    const normalized = ((vIndex % N) + N) % N;
    setActiveIndex(normalized);

    if (isInteractingRef.current) {
      virtualIndexRef.current = vIndex;
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Other vehicles"
      className="relative flex w-full flex-col items-start justify-center gap-6 overflow-hidden bg-white px-5 sm:px-8 py-[42px] sm:py-[50px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[80px] lg:pb-[32px] lg:pt-[62px]"
    >
      {/* Header Row (Figma 2862:10483) — desktop outer frame supplies padding 62/80/32/80 + gap 42 */}
      <div className="flex w-full flex-col items-start justify-center gap-6 lg:mx-auto lg:max-w-[1280px] lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:px-0 lg:pb-0">
        <div className="flex w-full flex-col items-start gap-6 lg:w-auto lg:gap-4">
          <Eyebrow label="Other vehicles" icons="navy" />
          <h2 className="w-full text-left font-display text-[28px] sm:text-[38px] font-semibold not-italic leading-[1.15] tracking-[-0.56px] text-ink lg:text-left lg:text-[52px] lg:tracking-[-1.04px]">
            Also worth a look.
          </h2>
        </div>

        <Button href="/products" variant="dark" arrow="white" className="max-lg:hidden h-[50.48px] px-6">
          See all vehicles
        </Button>
      </div>

      {/* Carousel Container — Full-Bleed across viewport (Figma 2862:10499).
          Breaks out of section side padding on mobile, tablet, and desktop to stay edge-to-edge. */}
      <div
        className="relative -mx-5 w-[calc(100%+40px)] sm:-mx-8 sm:w-[calc(100%+64px)] lg:mx-[calc(50%_-_50vw)] lg:w-[100vw]"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onPointerDown={() => {
          isInteractingRef.current = true;
        }}
        onPointerUp={() => {
          if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
          interactionTimeoutRef.current = setTimeout(() => {
            isInteractingRef.current = false;
          }, 3000);
        }}
      >
        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full gap-5 overflow-x-auto px-5 pb-4 scrollbar-none snap-x snap-mandatory scroll-pl-5 sm:gap-6 sm:px-8 sm:scroll-pl-8 lg:gap-6 lg:pl-[max(80px,calc((100vw-1280px)/2))] lg:scroll-pl-[max(80px,calc((100vw-1280px)/2))] lg:pr-[max(80px,calc((100vw-1280px)/2))]"
        >
          {loopedVehicles.map((vehicle, index) => (
            <article
              key={`${vehicle.id}-${index}`}
              className="relative h-[353px] w-[320px] shrink-0 snap-start overflow-hidden rounded-[8px] bg-surface sm:h-[485px] sm:w-[720px]"
            >
              {/* Vehicle photo render */}
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                sizes="(min-width: 640px) 720px, 320px"
                className="object-cover object-center"
                priority
              />

              {/* Vehicle Title & Explore Link */}
              <div className="absolute left-4 right-4 top-[14px] z-10 flex items-center justify-between sm:left-6 sm:right-6 sm:top-[23px]">
                <h3 className="font-display text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-[#121212] sm:text-[27px] sm:tracking-[-0.54px]">
                  {vehicle.name}
                </h3>
                <Link
                  href={vehicle.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-display text-[11px] sm:text-[13px] font-semibold text-ink backdrop-blur-md shadow-xs transition-all hover:bg-ink hover:text-white"
                >
                  <span>Explore</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Mobile Stats — 2×2 subcards */}
              <div className="absolute bottom-[9px] left-1/2 z-10 flex w-[300px] max-w-[calc(100%-20px)] -translate-x-1/2 flex-col items-start gap-3 rounded-[8px] bg-white/80 p-3 backdrop-blur-[10px] sm:hidden">
                {[0, 1].map((row) => (
                  <Fragment key={`stat-row-${row}`}>
                    {row > 0 && (
                      <div aria-hidden className="h-px w-full bg-[#ccc]/80" />
                    )}
                    <div className="flex w-full items-center gap-3">
                      {[0, 1].map((col) => {
                        const stat = vehicle.stats[row * 2 + col];
                        if (!stat) return null;
                        return (
                          <Fragment key={stat.label}>
                            {col > 0 && (
                              <div
                                aria-hidden
                                className="h-[37px] w-px shrink-0 bg-[#ccc]/80"
                              />
                            )}
                            <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center">
                              <p className="font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-[#121212]">
                                {stat.label}
                              </p>
                              <p className="font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-[#121212]">
                                <span className="font-display text-[20px] font-bold tracking-[-0.4px]">
                                  {stat.value}{" "}
                                </span>
                                {stat.unit}
                              </p>
                            </div>
                          </Fragment>
                        );
                      })}
                    </div>
                  </Fragment>
                ))}
              </div>

              {/* Bottom Stats Pill Bar (Figma 2736:7884) */}
              <div className="absolute bottom-[9px] left-1/2 z-10 hidden w-[calc(100%-18px)] -translate-x-1/2 items-center justify-between rounded-[8px] bg-white/80 p-3.5 backdrop-blur-[10px] sm:flex sm:p-4">
                {vehicle.stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="flex flex-col gap-1 sm:gap-2.5">
                      <p className="font-sans text-[11px] font-medium leading-[1.15] tracking-[-0.28px] text-[#121212] sm:text-[14px]">
                        {stat.label}
                      </p>
                      <p className="font-display font-bold leading-none tracking-[-0.54px] text-[#121212]">
                        <span className="text-[18px] sm:text-[27px]">{stat.value} </span>
                        <span className="font-sans text-[13px] font-medium sm:text-[18px]">
                          {stat.unit}
                        </span>
                      </p>
                    </div>
                    {/* Vertical Divider between stats */}
                    {i < vehicle.stats.length - 1 && (
                      <div
                        aria-hidden
                        className="mx-2 h-9 w-px bg-[#ccc]/60 sm:mx-4"
                      />
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Right Edge Bleed Fade (Figma 3321:13262) */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-[180px] bg-gradient-to-l from-white to-transparent lg:block xl:w-[210px]"
        />

        {/* Navigation Arrows: 55x55 Figma gradient buttons (Figma 3321:13264 / 3321:13268) */}
        <button
          type="button"
          aria-label="Previous vehicle"
          onClick={() => scroll(-1)}
          className="absolute top-1/2 z-20 hidden size-[45px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] shadow-[0_4px_16px_rgba(29,111,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_22px_rgba(29,111,255,0.45)] hover:brightness-110 active:scale-95 sm:size-[55px] left-4 sm:left-6 lg:left-[calc(max(80px,(100vw-1280px)/2)-27.5px)] lg:flex"
        >
          <svg
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
            aria-hidden="true"
          >
            <rect width="55" height="55" rx="8" fill="#212121" />
            <rect width="55" height="55" rx="8" fill="url(#other_blue_grad_left)" />
            <path
              d="M30.3097 34.5L24.9791 28.2809C24.5939 27.8316 24.5939 27.1684 24.9791 26.7191L30.3097 20.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="other_blue_grad_left"
                x1="132.207"
                y1="-70.111"
                x2="-11.187"
                y2="-40.3038"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0E2F6D" />
                <stop offset="1" stopColor="#1D6FFF" />
              </linearGradient>
            </defs>
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next vehicle"
          onClick={() => scroll(1)}
          className="absolute top-1/2 z-20 hidden size-[45px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] shadow-[0_4px_16px_rgba(29,111,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_22px_rgba(29,111,255,0.45)] hover:brightness-110 active:scale-95 sm:size-[55px] right-4 sm:right-6 lg:right-[calc(max(80px,(100vw-1280px)/2)-27.5px)] lg:flex"
        >
          <svg
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
            aria-hidden="true"
          >
            <rect width="55" height="55" rx="8" fill="#212121" />
            <rect width="55" height="55" rx="8" fill="url(#other_blue_grad_right)" />
            <path
              d="M24.6903 34.5L30.0209 28.2809C30.4061 27.8316 30.4061 27.1684 30.0209 26.7191L24.6903 20.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="other_blue_grad_right"
                x1="132.207"
                y1="-70.111"
                x2="-11.187"
                y2="-40.3038"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0E2F6D" />
                <stop offset="1" stopColor="#1D6FFF" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>

      {/* Bottom row (mobile): pager left · button right */}
      <div className="flex w-full items-center justify-between lg:hidden">
        <div className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1">
          <div
            className="h-full rounded-[23px] bg-[#121212] transition-all duration-300"
            style={{
              width: `${100 / displayVehicles.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
        <Button href="/products" variant="dark" arrow="white">
          See all vehicles
        </Button>
      </div>

      {/* Carousel Progress Indicator Pill (Figma 3321:13258) */}
      <div className="mx-auto hidden w-full max-w-[1440px] items-center justify-center pt-8 pb-2 lg:flex">
        <div className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1">
          <div
            className="h-full rounded-[23px] bg-[#121212] transition-all duration-300"
            style={{
              width: `${100 / displayVehicles.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
