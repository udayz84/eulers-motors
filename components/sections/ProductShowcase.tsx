"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Arrow from "../ui/Arrow";
import Eyebrow from "../ui/Eyebrow";

export type VehicleData = {
  id: string;
  tabLabel: string;
  title: string;
  /** Truck cutout swapped into the scene's truck region (desktop carousel) */
  image: string;
  crop: [number, number, number, number];
  specs: {
    range: string;
    capacity: string;
    chargeTime: string;
  };
};

const VEHICLES: VehicleData[] = [
  {
    id: "storm-ev-t1500",
    tabLabel: "Storm EV T1500",
    title: "Storm EV T1500",
    image: "/assets/products/vehicle-storm-t1500.png",
    crop: [-228.13, -145.73, 335.27, 237.35],
    specs: {
      range: "200 km",
      capacity: "1,500 kg",
      chargeTime: "90 min",
    },
  },
  {
    id: "storm-ev-lr-200",
    tabLabel: "Strom EV LR 200",
    title: "Storm EV LongRange 200",
    image: "/assets/products/vehicle-storm-lr200.png",
    crop: [-4.46, -140.4, 325.69, 230.57],
    specs: {
      range: "200 km",
      capacity: "1,200 kg",
      chargeTime: "90 min",
    },
  },
  {
    id: "turbo-ev-1000",
    tabLabel: "Turbo EV 1000",
    title: "Turbo EV 1000",
    image: "/assets/products/vehicle-turbo-1000.png",
    crop: [-2.9, -6.56, 322.07, 228],
    specs: {
      range: "180 km",
      capacity: "1,000 kg",
      chargeTime: "90 min",
    },
  },
  {
    id: "hiload-ev",
    tabLabel: "HiLoad EV",
    title: "HiLoad EV",
    image: "/assets/products/vehicle-hiload-ev.png",
    crop: [-295.3, -19.56, 415.35, 294.03],
    specs: {
      range: "170 km",
      capacity: "688 kg",
      chargeTime: "60 min",
    },
  },
];

/**
 * Desktop renders the Figma scene (1:1319) with the truck swapping per
 * vehicle — the default (LR 200) IS the scene image, the others swap cutouts
 * into the same region. Arrows and tabs cycle the selection (specs + imagery).
 * Mobile (1:4605) is the static Figma scene; tabs cycle specs only.
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
      className="relative overflow-hidden bg-white pb-[134px] pt-[41px] lg:pb-9 lg:pt-[66px]"
      aria-label="Choose your truck"
    >
      {/* Figma background stack (1:1318): white base · main-bg @50% ·
          scene truck render (1:1319) · blurred #f3f4f5 band (1:1320).
          The scene is the static Figma imagery (1440×874, bottom-anchored);
          arrows/tabs cycle the selected vehicle's specs, not the truck. */}
      <div aria-hidden className="absolute inset-0 hidden pointer-events-none lg:block">
        <Image
          src="/assets/products/main-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-50"
        />
      </div>
      {/* Scene box (1:1319, Figma 1440×874, bottom-anchored): the default
          vehicle renders the scene image itself; the others swap a cutout into
          the scene truck's bbox (x 29.3–71.8% · y 34.9–76.2%) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 hidden aspect-[1440/874] w-full max-w-[1440px] -translate-x-1/2 pointer-events-none lg:block"
      >
        {current.id === "storm-ev-lr-200" ? (
          <Image
            src="/assets/products/scene.png"
            alt=""
            fill
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-fill"
          />
        ) : (
          <div
            key={current.id}
            className="animate-fadeIn absolute left-[29.3%] top-[34.87%] h-[41.37%] w-[42.48%]"
          >
            <Image
              src={current.image}
              alt=""
              fill
              sizes="(min-width: 1440px) 620px, 42vw"
              className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
            />
          </div>
        )}
      </div>
      <div
        aria-hidden
        className="absolute left-[calc(50%_-_25px)] top-[-170.73px] hidden h-[432px] w-[2160px] -translate-x-1/2 bg-surface blur-[86.6px] lg:block"
      />
      {/* mobile scene (1:4605, 393×852 at top -41.34): #a3aaba base ·
          environment (mobile-bg-1) · white/50 wash · truck cutout
          (mobile-bg-2) — every layer stretched to the node per the Figma */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-41.34px] h-[852px] w-[393px] -translate-x-1/2 pointer-events-none overflow-hidden lg:hidden"
      >
        <div className="absolute inset-0 bg-[#a3aaba]" />
        <Image
          src="/assets/products/mobile-bg-1.png"
          alt=""
          fill
          sizes="393px"
          className="object-fill object-bottom"
        />
        <div className="absolute inset-0 bg-white/50" />
        <Image
          src="/assets/products/mobile-bg-2.png"
          alt=""
          fill
          sizes="393px"
          className="object-fill object-bottom"
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
              <br className="hidden lg:block" />{" "}
              that fits your work.
            </h2>
          </div>

          {/* Right: 4 vehicle cards — clickable, sync with the arrows */}
          <div
            className="no-scrollbar flex items-center justify-between gap-2 overflow-x-auto sm:gap-4 lg:gap-8 lg:overflow-visible"
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

        {/* Stage — the truck comes from the scene layer (1:1319); this is the
            arrow band. Height sized so the section lands on the Figma 862px
            frame: truck bottom sits ~7px above the spec card (1:1341). */}
        <div className="relative flex h-[242px] w-full items-center justify-center lg:my-6 lg:h-auto lg:min-h-[420px]">

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

        {/* Bottom Bar: Specs Card + CTAs — mobile per Figma 1:4628–1:4663,
            desktop 1:1341–1:1377 */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          {/* Specs Card — desktop (1:1341): white/20 glass, 757px, r18 ·
              mobile (1:4629): white/20 glass, r12, p16 */}
          <div className="w-full rounded-[12px] bg-white/20 p-4 sm:p-5 lg:w-[757px] lg:rounded-[18px] lg:p-6">
            <h3 className="mb-6 font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-ink lg:mb-[27px] lg:text-[28px] lg:tracking-[-0.56px]">
              {current.title}
            </h3>

            {/* mobile: range + capacity split by a vertical hairline, charge
                time below (1:4634–1:4656) · desktop: 3 stats separated by
                flex-1 white/40 hairlines (line 84, 1:1342) — lg:contents
                dissolves the mobile row into the desktop flex row */}
            <div className="flex flex-col gap-5 lg:h-[58px] lg:flex-row lg:items-center lg:gap-[10px]">
              <div className="flex items-center gap-[17px] lg:contents">
                {/* Spec 1: Range per charge — icon 22 in a 38px white box
                    (mobile 1:4636) · 28 in a 52px box (desktop 1:1344) */}
                <div className="flex flex-1 items-center gap-2 lg:flex-none lg:gap-2.5">
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[4px] bg-white lg:size-[52px] lg:rounded-[8px]">
                    <Image
                      src="/assets/products/icon-gauge.svg"
                      alt=""
                      width={28}
                      height={28}
                      aria-hidden
                      className="size-[22px] lg:size-7"
                    />
                  </span>
                  <span className="flex flex-col gap-[2px]">
                    <span className="text-[12px] font-normal leading-[normal] text-ink lg:text-[16px]">
                      Range per charge
                    </span>
                    <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[28px] lg:tracking-[-0.56px]">
                      {current.specs.range}
                    </span>
                  </span>
                </div>

                {/* divider — line 84 hairline (white/40): mobile self-stretch
                    between range & capacity · desktop flex-1 centered (1:1342) */}
                <div aria-hidden className="flex self-stretch lg:h-full lg:flex-1 lg:items-center lg:justify-center">
                  <div className="h-full w-px bg-white/40" />
                </div>

                {/* Spec 2: Load capacity — icon 20 (mobile 1:4645) · 28 (desktop 1:1353) */}
                <div className="flex flex-1 items-center gap-2 lg:flex-none lg:gap-2.5">
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[4px] bg-white lg:size-[52px] lg:rounded-[8px]">
                    <Image
                      src="/assets/products/icon-package.svg"
                      alt=""
                      width={28}
                      height={28}
                      aria-hidden
                      className="size-[20px] lg:size-7"
                    />
                  </span>
                  <span className="flex flex-col gap-[2px]">
                    <span className="text-[12px] font-normal leading-[normal] text-ink lg:text-[16px]">
                      Load capacity
                    </span>
                    <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[28px] lg:tracking-[-0.56px]">
                      {current.specs.capacity}
                    </span>
                  </span>
                </div>
              </div>

              {/* desktop hairline between capacity and charge time (line 84) */}
              <div aria-hidden className="hidden lg:flex lg:h-full lg:flex-1 lg:items-center lg:justify-center">
                <div className="h-full w-px bg-white/40" />
              </div>

              {/* Spec 3: Charge time — icon 20 (mobile 1:4652) · 28 (desktop 1:1360) */}
              <div className="flex flex-1 items-center gap-2 lg:flex-none lg:gap-2.5">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[4px] bg-white lg:size-[52px] lg:rounded-[8px]">
                  <Image
                    src="/assets/products/icon-clock.svg"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden
                    className="size-[20px] lg:size-7"
                  />
                </span>
                <span className="flex flex-col gap-[2px]">
                  <span className="text-[12px] font-normal leading-[normal] text-ink lg:text-[16px]">
                    Charge time
                  </span>
                  <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[28px] lg:tracking-[-0.56px]">
                    {current.specs.chargeTime}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* CTAs — mobile: full-width pair, h-44, r4, flex-1 each (1:4657) ·
              desktop (1:1371): h50, r4, 16px — Compare on #f3f4f5 w/ ink/50
              border, View Variants solid ink */}
          <div className="flex w-full items-center gap-3 self-stretch lg:w-auto lg:self-end">
            <button
              type="button"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] border border-ink/50 bg-surface px-5 font-display text-[12px] font-bold leading-none text-ink transition-all cursor-pointer hover:bg-white lg:h-[50px] lg:flex-none lg:gap-2 lg:px-6 lg:text-[16px] lg:font-semibold"
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
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] bg-ink px-5 font-display text-[12px] font-bold leading-none text-white shadow-md transition-all cursor-pointer hover:bg-black lg:h-[50px] lg:flex-none lg:gap-2 lg:px-6 lg:text-[16px] lg:font-semibold"
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

