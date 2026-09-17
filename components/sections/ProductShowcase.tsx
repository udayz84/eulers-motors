"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Arrow from "../ui/Arrow";

export type VehicleData = {
  id: string;
  tabLabel: string;
  title: string;
  image: string;
  thumbnail: string;
  crop: [number, number, number, number];
  specs: {
    range: string;
    capacity: string;
    chargeTime: string;
  };
  altText: string;
};

const VEHICLES: VehicleData[] = [
  {
    id: "storm-ev-t1500",
    tabLabel: "Storm EV T1500",
    title: "Storm EV T1500",
    image: "/assets/products/vehicle-storm-t1500.png",
    thumbnail: "/assets/products/vehicle-storm-t1500.png",
    crop: [-228.13, -145.73, 335.27, 237.35],
    specs: {
      range: "200 km",
      capacity: "1,500 kg",
      chargeTime: "90 min",
    },
    altText: "Euler Storm EV T1500 electric commercial vehicle",
  },
  {
    id: "storm-ev-lr-200",
    tabLabel: "Strom EV LR 200",
    title: "Storm EV LongRange 200",
    image: "/assets/products/vehicle-storm-lr200.png",
    thumbnail: "/assets/products/vehicle-storm-lr200.png",
    crop: [-4.46, -140.4, 325.69, 230.57],
    specs: {
      range: "200 km",
      capacity: "1,200 kg",
      chargeTime: "90 min",
    },
    altText: "Euler Storm EV LongRange 200 electric commercial vehicle",
  },
  {
    id: "turbo-ev-1000",
    tabLabel: "Turbo EV 1000",
    title: "Turbo EV 1000",
    image: "/assets/products/vehicle-turbo-1000.png",
    thumbnail: "/assets/products/vehicle-turbo-1000.png",
    crop: [-2.9, -6.56, 322.07, 228],
    specs: {
      range: "180 km",
      capacity: "1,000 kg",
      chargeTime: "90 min",
    },
    altText: "Euler Turbo EV 1000 electric truck",
  },
  {
    id: "hiload-ev",
    tabLabel: "HiLoad EV",
    title: "HiLoad EV",
    image: "/assets/products/vehicle-hiload-ev.png",
    thumbnail: "/assets/products/vehicle-hiload-ev.png",
    crop: [-295.3, -19.56, 415.35, 294.03],
    specs: {
      range: "170 km",
      capacity: "688 kg",
      chargeTime: "60 min",
    },
    altText: "Euler HiLoad EV 3-wheeler commercial vehicle",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(1); // Default to "Strom EV LR 200"

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev === 0 ? VEHICLES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev === VEHICLES.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const current = VEHICLES[active];

  return (
    <section
      className="relative overflow-hidden bg-white pt-10 pb-12 lg:pt-16 lg:pb-16"
      aria-label="Choose your truck"
    >
      {/* Figma background stack (1:1318): main image @50% + scene render —
          temporarily removed per review; re-add here when needed. */}

      <div className="relative mx-auto flex w-full max-w-[1360px] flex-col px-4 sm:px-6 lg:px-12">
        {/* Top Header Row: Eyebrow + Heading on Left, Vehicle Selector Tabs on Right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Eyebrow badge + Main heading */}
          <div className="flex flex-col gap-3 lg:max-w-[480px]">
            <div className="inline-flex items-center gap-2">
              <span className="relative h-4 w-3.5 lg:h-[18px] lg:w-4">
                <Image
                  src="/assets/products/badge-cap.svg"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden
                />
              </span>
              <span className="font-bold text-[12px] lg:text-[13px] tracking-[0.7px] uppercase text-[#0E2F6D]">
                CHOOSE YOUR TRUCK
              </span>
            </div>
            <h2 className="font-display text-[30px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.12] tracking-[-0.84px] text-ink">
              Pick the vehicle
              <br />
              that fits your work.
            </h2>
          </div>

          {/* Right: 4 Vehicle Selector Tabs */}
          <div
            className="flex items-center justify-between gap-2 overflow-x-auto pb-2 sm:gap-4 lg:gap-8 lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Vehicle models"
          >
            {VEHICLES.map((vehicle, index) => {
              const isActive = index === active;
              return (
                <button
                  key={vehicle.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(index)}
                  className={`group flex shrink-0 flex-col items-center gap-2 cursor-pointer transition-all duration-200 ${isActive ? "opacity-100" : "opacity-45 hover:opacity-85"
                    }`}
                >
                  <span className="relative flex h-[52px] w-[58px] sm:h-[64px] sm:w-[72px] lg:h-[80px] lg:w-[94px] items-center justify-center overflow-hidden rounded-[10px] lg:rounded-[12px] bg-transparent transition-transform group-hover:scale-105">
                    <span
                      className="absolute"
                      style={{
                        left: `${vehicle.crop[0]}%`,
                        top: `${vehicle.crop[1]}%`,
                        width: `${vehicle.crop[2]}%`,
                        height: `${vehicle.crop[3]}%`,
                      }}
                    >
                      <Image
                        src="/assets/products/product.png"
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                  <span
                    className={`whitespace-nowrap text-center text-[12px] lg:text-[14px] leading-tight transition-colors ${isActive ? "font-bold text-ink" : "font-medium text-gray-500"
                      }`}
                  >
                    {vehicle.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Vehicle Stage with Left/Right Carousel Controls */}
        <div className="relative my-4 flex min-h-[300px] sm:min-h-[360px] lg:min-h-[600px] w-full items-center justify-center lg:my-6">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous vehicle"
            className="absolute left-1 sm:left-3 lg:left-6 z-20 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg
              className="h-5 w-5 lg:h-6 lg:w-6 text-[#1D6FFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Active Center Vehicle Image */}
          <div className="relative flex h-[340px] sm:h-[430px] lg:h-[560px] w-full max-w-[1020px] items-center justify-center px-8 sm:px-12">
            <div
              key={current.id}
              className="relative flex h-full w-full items-center justify-center transition-all duration-300 animate-fadeIn"
            >
              <Image
                src={current.image}
                alt={current.altText}
                width={1020}
                height={560}
                priority
                className="max-h-[330px] sm:max-h-[420px] lg:max-h-[550px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next vehicle"
            className="absolute right-1 sm:right-3 lg:right-6 z-20 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg
              className="h-5 w-5 lg:h-6 lg:w-6 text-[#1D6FFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Bottom Bar: Floating Specs Card on Left + Action Buttons on Right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Bottom Left: Specs Card (Frosted Glass Container) */}
          <div className="w-full rounded-[18px] lg:rounded-[22px] bg-white/70 backdrop-blur-md border border-white/60 p-4 sm:p-5 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:w-[680px]">
            <h3 className="font-display text-[20px] sm:text-[22px] lg:text-[24px] font-semibold leading-tight tracking-[-0.56px] text-ink mb-4">
              {current.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {/* Spec 1: Range per charge */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-[8px] bg-white shadow-xs">
                  <Image
                    src="/assets/products/icon-gauge.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="h-5 w-5 lg:h-6 lg:w-6"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] lg:text-[13px] text-gray-500 font-medium leading-none mb-1">
                    Range per charge
                  </span>
                  <span className="font-display text-[16px] lg:text-[20px] font-bold text-ink leading-none tracking-tight">
                    {current.specs.range}
                  </span>
                </span>
              </div>

              {/* Spec 2: Load capacity */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-[8px] bg-white shadow-xs">
                  <Image
                    src="/assets/products/icon-package.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="h-5 w-5 lg:h-6 lg:w-6"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] lg:text-[13px] text-gray-500 font-medium leading-none mb-1">
                    Load capacity
                  </span>
                  <span className="font-display text-[16px] lg:text-[20px] font-bold text-ink leading-none tracking-tight">
                    {current.specs.capacity}
                  </span>
                </span>
              </div>

              {/* Spec 3: Charge time */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-[8px] bg-white shadow-xs">
                  <Image
                    src="/assets/products/icon-clock.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="h-5 w-5 lg:h-6 lg:w-6"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] lg:text-[13px] text-gray-500 font-medium leading-none mb-1">
                    Charge time
                  </span>
                  <span className="font-display text-[16px] lg:text-[20px] font-bold text-ink leading-none tracking-tight">
                    {current.specs.chargeTime}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Right: Action Buttons */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-gray-300/90 bg-white/90 hover:bg-white text-ink font-display font-semibold text-[13px] lg:text-[15px] px-5 py-3 lg:px-6 lg:py-3.5 shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Image
                src="/assets/products/icon-compare.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden
                className="h-4 w-4 lg:h-[18px] lg:w-[18px]"
              />
              Compare
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2.5 rounded-[6px] bg-ink hover:bg-black text-white font-display font-semibold text-[13px] lg:text-[15px] px-5 py-3 lg:px-6 lg:py-3.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>View Variants</span>
              <Arrow color="white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

