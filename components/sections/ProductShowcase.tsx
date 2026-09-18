"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Arrow from "../ui/Arrow";
import Eyebrow from "../ui/Eyebrow";

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

/**
 * The scene renders behind provide the vehicle (desktop 1:1319 · mobile
 * 1:4605). Left/right arrows cycle the selected vehicle (tabs + specs);
 * the truck imagery itself stays the static scene.
 */
export default function ProductShowcase() {
  const [active, setActive] = useState(1); // Default to "Strom EV LR 200"

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev === 0 ? VEHICLES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev === VEHICLES.length - 1 ? 0 : prev + 1));
  }, []);

  const current = VEHICLES[active];

  return (
    <section
      className="relative overflow-hidden bg-white pb-[93px] pt-[82px] lg:pb-16 lg:pt-16"
      aria-label="Choose your truck"
    >
      {/* Figma background stack (1:1318) — truck render (scene, 1:1319) removed
          per review; the environment wash + blur band stay:
          white base · main-bg @50% · blurred #f3f4f5 band (1:1320) */}
      <div aria-hidden className="absolute inset-0 hidden pointer-events-none lg:block">
        <Image
          src="/assets/products/main-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-50"
        />
      </div>
      <div
        aria-hidden
        className="absolute left-[calc(50%_-_25px)] top-[-170.73px] hidden h-[432px] w-[2160px] -translate-x-1/2 bg-surface blur-[86.6px] lg:block"
      />
      {/* mobile background — main-bg.png recomposed as a right-sized asset
          (main-bg-mobile.png, 790×1724 = 395×862 @2x): the baked truck fully
          visible and centered over a softly blurred scene fill; @50% opacity
          per the Figma wash (1:1318) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[862px] w-[395px] -translate-x-1/2 pointer-events-none overflow-hidden lg:hidden"
      >
        <Image
          src="/assets/products/main-bg-mobile.png"
          alt=""
          fill
          sizes="395px"
          className="object-cover opacity-50"
        />
      </div>
      {/* mobile blurred band (Figma 1:4607): 1874.7×374.9 at (50%+19.5, -73.34) */}
      <div
        aria-hidden
        className="absolute left-[calc(50%+19.5px)] top-[-73.34px] h-[374.945px] w-[1874.727px] -translate-x-1/2 bg-surface blur-[86.6px] lg:hidden"
      />

      {/* Figma 1:1317 grid: content spans 80→1360 inside the 1440 frame (1280px)
          — widened a bit to 1360px (40px margins) per review */}
      <div className="relative mx-auto flex w-full max-w-[1360px] flex-col px-5 sm:px-6 lg:px-0">
        {/* Top Header Row: Eyebrow + Heading on Left, Vehicle Selector Tabs on Right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Eyebrow badge + Main heading */}
          {/* mobile (Figma 1:4608): gap 14 · title 28px/-0.56 wrapping at 322px */}
          <div className="flex flex-col gap-[14px] lg:max-w-[480px] lg:gap-3">
            <Eyebrow label="Choose your truck" />
            <h2 className="w-[322px] font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink sm:w-auto sm:text-[36px] lg:text-[42px] lg:leading-[1.12] lg:tracking-[-0.84px]">
              Pick the vehicle
              <br className="hidden lg:block" />
              that fits your work.
            </h2>
          </div>

          {/* Right: 4 vehicle cards — clickable, sync with the arrows */}
          <div
            className="flex items-center justify-between gap-2 overflow-x-auto sm:gap-4 lg:gap-8 lg:overflow-visible"
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
                  className={`group flex h-[73.215px] shrink-0 cursor-pointer flex-col items-center justify-between transition-all duration-200 lg:h-auto lg:justify-start lg:gap-2 ${isActive ? "opacity-100" : "opacity-40 hover:opacity-85"
                    }`}
                >
                  <span className="relative flex h-[52px] w-[54.986px] items-center justify-center overflow-hidden rounded-[9.621px] bg-transparent transition-transform group-hover:scale-105 sm:h-[64px] sm:w-[72px] lg:h-[80px] lg:w-[94px] lg:rounded-[12px]">
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
                  <span className="whitespace-nowrap text-center text-[12px] font-bold leading-[1.15] tracking-[-0.24px] text-ink lg:text-[14px] lg:tracking-normal">
                    {vehicle.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage — desktop: truck cutout + arrows · mobile: static per the
            Figma (1:4605) — no product image, no arrows, just the background */}
        <div className="relative flex h-[242px] w-full items-center justify-center lg:my-6 lg:h-auto lg:min-h-[600px]">
          <div className="relative hidden h-[550px] w-[680px] items-center justify-center lg:flex">
            <Image
              key={current.id}
              src={current.image}
              alt={current.altText}
              fill
              sizes="680px"
              priority
              className="animate-fadeIn object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
            />
          </div>

          {/* Left Arrow — desktop only */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous vehicle"
            className="absolute left-6 z-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-gray-100/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer hover:scale-105 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] active:scale-95 lg:flex"
          >
            <svg
              className="h-5 w-5 text-[#1D6FFF]"
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

          {/* Right Arrow — desktop only */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next vehicle"
            className="absolute right-6 z-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-gray-100/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer hover:scale-105 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] active:scale-95 lg:flex"
          >
            <svg
              className="h-5 w-5 text-[#1D6FFF]"
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

        {/* Bottom Bar: Specs Card + CTAs — mobile per Figma 1:4628–1:4663 */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          {/* Specs Card — mobile: white/20 glass, r12, p16, gap 24 (1:4629) */}
          <div className="w-full rounded-[12px] bg-white/20 p-4 sm:p-5 lg:w-[680px] lg:rounded-[22px] lg:border lg:border-white/60 lg:bg-white/70 lg:p-6 lg:shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:backdrop-blur-md">
            <h3 className="mb-6 font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-ink lg:mb-4 lg:tracking-[-0.56px]">
              {current.title}
            </h3>

            {/* mobile: range + capacity split by a vertical hairline, charge time
                below (1:4634–1:4656) · lg:contents dissolves the row into the
                desktop 3-column grid */}
            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
              <div className="flex items-center gap-[17px] lg:contents">
                {/* Spec 1: Range per charge — icon 22 in a 38px white box (1:4636) */}
                <div className="flex flex-1 items-center gap-2 lg:gap-3">
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[4px] bg-white lg:size-12 lg:rounded-[8px] lg:shadow-xs">
                    <Image
                      src="/assets/products/icon-gauge.svg"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                      className="size-[22px] lg:h-6 lg:w-6"
                    />
                  </span>
                  <span className="flex flex-col gap-[2px] lg:gap-1">
                    <span className="text-[12px] font-normal leading-[normal] text-ink lg:text-[13px] lg:font-medium lg:text-gray-500">
                      Range per charge
                    </span>
                    <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[20px] lg:leading-none lg:tracking-tight">
                      {current.specs.range}
                    </span>
                  </span>
                </div>

                {/* mobile vertical divider (Figma line 84) */}
                <div aria-hidden className="w-px self-stretch bg-ink/10 lg:hidden" />

                {/* Spec 2: Load capacity — icon 20 (1:4645) */}
                <div className="flex flex-1 items-center gap-2 lg:gap-3">
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[4px] bg-white lg:size-12 lg:rounded-[8px] lg:shadow-xs">
                    <Image
                      src="/assets/products/icon-package.svg"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                      className="size-[20px] lg:h-6 lg:w-6"
                    />
                  </span>
                  <span className="flex flex-col gap-[2px] lg:gap-1">
                    <span className="text-[12px] font-normal leading-[normal] text-ink lg:text-[13px] lg:font-medium lg:text-gray-500">
                      Load capacity
                    </span>
                    <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[20px] lg:leading-none lg:tracking-tight">
                      {current.specs.capacity}
                    </span>
                  </span>
                </div>
              </div>

              {/* Spec 3: Charge time — icon 20 (1:4652) */}
              <div className="flex flex-1 items-center gap-2 lg:gap-3">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[4px] bg-white lg:size-12 lg:rounded-[8px] lg:shadow-xs">
                  <Image
                    src="/assets/products/icon-clock.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="size-[20px] lg:h-6 lg:w-6"
                  />
                </span>
                <span className="flex flex-col gap-[2px] lg:gap-1">
                  <span className="text-[12px] font-normal leading-[normal] text-ink lg:text-[13px] lg:font-medium lg:text-gray-500">
                    Charge time
                  </span>
                  <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[20px] lg:leading-none lg:tracking-tight">
                    {current.specs.chargeTime}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* CTAs — mobile: full-width pair, h-44, r4, flex-1 each (1:4657) */}
          <div className="flex w-full items-center gap-3 self-stretch lg:w-auto lg:self-end">
            <button
              type="button"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] border border-ink/50 bg-surface px-5 font-display text-[12px] font-semibold leading-none text-ink transition-all cursor-pointer hover:bg-white lg:h-auto lg:flex-none lg:rounded-[6px] lg:border-gray-300/90 lg:bg-white/90 lg:px-6 lg:py-3 lg:text-[13px] lg:shadow-xs lg:hover:shadow-sm"
            >
              <Image
                src="/assets/products/icon-compare.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden
                className="h-3.5 w-3.5 lg:h-[18px] lg:w-[18px]"
              />
              Compare
            </button>
            <button
              type="button"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] bg-ink px-5 font-display text-[12px] font-semibold leading-none text-white shadow-md transition-all cursor-pointer hover:bg-black lg:h-auto lg:flex-none lg:gap-2.5 lg:rounded-[6px] lg:px-6 lg:py-3 lg:text-[13px] lg:hover:shadow-lg"
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

