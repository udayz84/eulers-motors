"use client";

import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

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
 * Unified slider: continuous desktop auto-scroll (no hover pause), draggable mouse,
 * blue navigation arrows with boundary auto-hide, and Figma 3321:13258 progress pill.
 */
export default function ProductOtherVehicles({ currentVehicleId }: { currentVehicleId?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayVehicles = currentVehicleId
    ? ALL_OTHER_VEHICLES.filter((v) => v.id !== currentVehicleId).slice(0, 3)
    : VEHICLES;

  // Duplicate 4x for continuous infinite runway
  const loopedVehicles = Array.from({ length: 4 }).flatMap(() => displayVehicles);

  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Section visibility tracking
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

  return (
    <section
      ref={sectionRef}
      aria-label="Other vehicles"
      className="relative flex w-full flex-col items-start justify-center gap-6 overflow-hidden bg-white px-5 sm:px-8 py-[42px] sm:py-[50px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[80px] lg:pb-[32px] lg:pt-[62px]"
    >
      {/* Header Row (Figma 2862:10483) */}
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

      {/* Carousel Container — Full-Bleed across viewport */}
      <div className="relative -mx-5 w-[calc(100%+40px)] sm:-mx-8 sm:w-[calc(100%+64px)] lg:mx-[calc(50%_-_50vw)] lg:w-[100vw]">
        {/* Scrollable Track */}
        <div
          id="other-vehicles-snap-row"
          ref={scrollRef}
          className="no-scrollbar flex w-full gap-5 overflow-x-auto px-5 pb-4 scrollbar-none snap-x snap-mandatory lg:snap-none lg:[scroll-snap-type:none] scroll-pl-5 sm:gap-6 sm:px-8 sm:scroll-pl-8 lg:gap-6 lg:pl-[max(80px,calc((100vw-1280px)/2))] lg:scroll-pl-[max(80px,calc((100vw-1280px)/2))] lg:pr-[max(80px,calc((100vw-1280px)/2))] cursor-grab active:cursor-grabbing select-none"
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
                className="object-cover object-center pointer-events-none"
                priority={index < 3}
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

        {/* Navigation Arrows with boundary auto-hide */}
        <CarouselArrows
          rowId="other-vehicles-snap-row"
          label="other vehicles"
          variant="blue"
          onStep={() => pauseAutoScroll(600)}
        />
      </div>

      {/* Bottom row: Progress Bar Pill & Mobile CTA */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between lg:justify-center pt-6 pb-2 lg:pt-8 lg:pb-0">
        <div
          role="progressbar"
          aria-label="Other vehicles scroll progress"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1"
        >
          <div
            className="h-full w-[29.891px] rounded-[23.04px] bg-[#121212] transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translateX(${scrollProgress * 78.308}px)`,
            }}
          />
        </div>
        <div className="lg:hidden">
          <Button href="/products" variant="dark" arrow="white">
            See all vehicles
          </Button>
        </div>
      </div>
    </section>
  );
}
