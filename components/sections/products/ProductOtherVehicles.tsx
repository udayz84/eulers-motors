"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

type VehicleCard = {
  id: string;
  name: string;
  image: string;
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
    stats: [
      { label: "on one charge", value: "200", unit: "km" },
      { label: "Load capacity", value: "1,200", unit: "kg" },
      { label: "Running cost", value: "₹1.05", unit: "/km" },
      { label: "Charging Time", value: "90", unit: "min" },
    ],
  },
  {
    id: "hiload-ev",
    name: "HiLoad EV",
    image: "/assets/other-vehicles/hiload-ev.png",
    stats: [
      { label: "on one charge", value: "200", unit: "km" },
      { label: "Load capacity", value: "1,200", unit: "kg" },
      { label: "Running cost", value: "₹1.05", unit: "/km" },
      { label: "Charging Time", value: "90", unit: "min" },
    ],
  },
  {
    id: "storm-ev-t1500",
    name: "Storm EV T1500",
    image: "/assets/other-vehicles/turbo-ev-1000.png",
    stats: [
      { label: "on one charge", value: "200", unit: "km" },
      { label: "Load capacity", value: "1,500", unit: "kg" },
      { label: "Running cost", value: "₹1.05", unit: "/km" },
      { label: "Charging Time", value: "90", unit: "min" },
    ],
  },
];

/**
 * Other Vehicles ("Also worth a look.") — Figma node 2862:10734
 * Carousel showing alternative Euler EV goods vehicles with photo backdrop,
 * stat pill bar, interactive navigation arrows, and progress indicator.
 */
export default function ProductOtherVehicles() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: -1 | 1) => {
    if (!scrollRef.current) return;
    const cardWidth = 740; // 720px card + 20px gap
    scrollRef.current.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 740;
    const newIndex = Math.min(
      VEHICLES.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(newIndex);
  };

  return (
    <section
      aria-label="Other vehicles"
      className="relative w-full overflow-hidden bg-white pb-12 pt-16 lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[80px] lg:pb-[32px] lg:pt-[62px]"
    >
      {/* Header Row (Figma 2862:10483) — desktop outer frame supplies padding 62/80/32/80 + gap 42 */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-[42px] px-5 pb-[42px] sm:px-8 lg:max-w-[1280px] lg:px-0 lg:pb-0">
        <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow label="Other vehicles" icons="navy" />
            <h2 className="font-display text-[32px] font-semibold not-italic leading-[1.15] tracking-[-0.64px] text-ink sm:text-[42px] lg:text-[52px] lg:tracking-[-1.04px]">
              Also worth a look.
            </h2>
          </div>

          <Button variant="dark" arrow="white" className="h-[50.48px] px-6">
            See all vehicles
          </Button>
        </div>
      </div>

      {/* Carousel Container — Full-Bleed across viewport (Figma 2862:10499).
          Desktop cancels the outer frame's 80px side padding to stay edge-to-edge. */}
      <div className="relative w-full lg:mx-[calc(50%_-_50vw)] lg:w-[100vw]">
        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory lg:gap-6"
        >
          {/* Left Alignment Spacers — ensures first card is always aligned under the header */}
          <div
            aria-hidden
            className="hidden shrink-0 snap-start lg:block"
            style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 56px)" }}
          />
          <div
            aria-hidden
            className="hidden shrink-0 snap-start sm:block lg:hidden"
            style={{ width: "32px" }}
          />
          <div
            aria-hidden
            className="shrink-0 snap-start sm:hidden"
            style={{ width: "20px" }}
          />

          {VEHICLES.map((vehicle) => (
            <article
              key={vehicle.id}
              className="relative h-[485px] w-[88vw] max-w-[720px] shrink-0 snap-start overflow-hidden rounded-[8px] bg-surface sm:w-[720px]"
            >
              {/* Background base image */}
              <Image
                src="/assets/other-vehicles/card-bg.png"
                alt=""
                fill
                sizes="720px"
                className="object-cover object-bottom"
              />

              {/* Vehicle photo render */}
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                sizes="720px"
                className="object-cover object-center"
                priority
              />

              {/* Vehicle Title Top-Left (Figma 2736:8062) */}
              <h3 className="absolute left-6 top-[23px] z-10 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.54px] text-[#121212] sm:text-[27px]">
                {vehicle.name}
              </h3>

              {/* Bottom Stats Pill Bar (Figma 2736:7884) */}
              <div className="absolute bottom-[9px] left-1/2 z-10 flex w-[calc(100%-18px)] -translate-x-1/2 items-center justify-between rounded-[8px] bg-white/80 p-3.5 backdrop-blur-[10px] sm:p-4">
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

          {/* Right Padding Spacers */}
          <div
            aria-hidden
            className="hidden shrink-0 snap-start lg:block"
            style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 56px)" }}
          />
          <div
            aria-hidden
            className="hidden shrink-0 snap-start sm:block lg:hidden"
            style={{ width: "32px" }}
          />
          <div
            aria-hidden
            className="shrink-0 snap-start sm:hidden"
            style={{ width: "20px" }}
          />
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
          className="absolute top-1/2 z-20 flex size-[45px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] shadow-[0_4px_16px_rgba(29,111,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_22px_rgba(29,111,255,0.45)] hover:brightness-110 active:scale-95 sm:size-[55px] left-4 sm:left-6 lg:left-[calc(max(0px,(100vw-1440px)/2)+50px)]"
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
          className="absolute top-1/2 z-20 flex size-[45px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] shadow-[0_4px_16px_rgba(29,111,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_22px_rgba(29,111,255,0.45)] hover:brightness-110 active:scale-95 sm:size-[55px] right-4 sm:right-6 lg:right-[calc(max(0px,(100vw-1440px)/2)+50px)]"
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

      {/* Carousel Progress Indicator Pill (Figma 3321:13258) */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-8 pb-2">
        <div className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1">
          <div
            className="h-full rounded-[23px] bg-[#121212] transition-all duration-300"
            style={{
              width: `${100 / VEHICLES.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
