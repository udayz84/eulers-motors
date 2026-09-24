"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

type Vehicle = { name: string; capacity: string; crop: [number, number, number, number] };

/* sprite crop boxes (Figma 1:2398/1:2404/1:2411/1:2417) — [left, top, width, height] %
   of the 42×42 thumb window into /assets/calculator/vehicle.png */
const VEHICLES: Vehicle[] = [
  { name: "Strom EV LR 200", capacity: "1,200 kg", crop: [-215.19, -125.87, 319.14, 213.66] },
  { name: "Storm EV T1500", capacity: "1,500 kg", crop: [-5.8, -125.03, 319.14, 213.66] },
  { name: "Turbo EV 1000", capacity: "1,000 kg", crop: [0, 0, 319.14, 213.66] },
  { name: "HiLoad EV", capacity: "688 kg", crop: [-279.52, -14.06, 397.73, 266.27] },
];

/* mobile track order (Figma 1:5219): T1500 leads, the default-active LR 200
   second, Turbo/HiLoad after — desktop grid keeps array order */
const MOBILE_ORDER = ["max-lg:order-2", "max-lg:order-1", "max-lg:order-3", "max-lg:order-4"];

/**
 * Figma slider (1:2426–1:2431 desktop · 1:5249–1:5257 mobile): dashed tick
 * track (Line 92) + gradient fill pill with a glowing head + white thumb with
 * three grip lines. Mobile renders the same parts at ~57% scale (thumb 24×18
 * vs desktop 43×32). A transparent <input type="range"> on top keeps it
 * interactive.
 */
function RangeSlider({
  value,
  min,
  max,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="group relative h-3 w-full">
      {/* tick track — Line 92, vertically centered on the 12px container */}
      <Image
        src="/assets/calculator/slider-line.svg"
        alt=""
        aria-hidden
        width={464}
        height={21}
        className="absolute left-0 top-1/2 h-[12.25px] w-full -translate-y-1/2 lg:h-[21.434px]"
      />
      {/* gradient fill — blue reaches past the thumb center (11px mobile / 19px desktop) */}
      <div className="absolute left-0 top-1/2 h-[12px] -translate-y-1/2 overflow-clip lg:h-[21px]" style={{ width: `${pct}%` }}>
        <div
          className="absolute inset-y-0 left-0 w-[calc(100%+11px)] lg:w-[calc(100%+19px)]"
          style={{ background: "linear-gradient(to right, #091c3d, #1d6fff)" }}
        />
        <div className="absolute -top-[4.32px] right-[5.71px] h-[22.072px] w-[16.75px] rounded-bl-[22px] rounded-tl-[21px] bg-[#1d6fff] blur-[3.171px] lg:-top-[7.56px] lg:right-[10px] lg:h-[38.627px] lg:w-[29.312px] lg:blur-[5.55px]" />
        <div className="absolute right-[6.7px] top-0 h-[13.432px] w-[10.193px] rounded-bl-[22px] rounded-tl-[21px] bg-white blur-[3.171px] lg:right-[8px] lg:h-[23.506px] lg:w-[17.838px] lg:blur-[5.55px]" />
      </div>
      {/* thumb — bottom/right brand border + inset shadow + 3 grips */}
      <div
        aria-hidden
        className="absolute top-1/2 flex h-[18.286px] w-[24.381px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[1.829px] overflow-clip rounded-[18.286px] border-b-[0.457px] border-r-[0.457px] border-solid border-[#1d6fff] bg-white shadow-[inset_0.914px_0.914px_3.657px_0px_rgba(0,0,0,0.25)] lg:h-[32px] lg:w-[43px] lg:gap-[3.2px] lg:rounded-[32px] lg:border-b-[0.8px] lg:border-r-[0.8px] lg:shadow-[inset_1.6px_1.6px_6.4px_0px_rgba(0,0,0,0.25)] group-focus-within:outline group-focus-within:outline-2 group-focus-within:outline-offset-2 group-focus-within:outline-white/40"
        style={{ left: `${pct}%` }}
      >
        <span className="h-[8px] w-[0.914px] rounded-[18.286px] bg-[#f3f4f5] lg:h-[14px] lg:w-[1.6px] lg:rounded-[32px]" />
        <span className="h-[8px] w-[0.914px] rounded-[18.286px] bg-[#f3f4f5] lg:h-[14px] lg:w-[1.6px] lg:rounded-[32px]" />
        <span className="h-[8px] w-[0.914px] rounded-[18.286px] bg-[#f3f4f5] lg:h-[14px] lg:w-[1.6px] lg:rounded-[32px]" />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-grab appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}

/**
 * Savings calculator (desktop 1:1471 · mobile 1:4689).
 * Desktop: chart left + controls right · Mobile: stacked, chips in a
 * full-bleed horizontal scroll row (Figma 1:5219).
 */
export default function SavingsCalculator() {
  const [vehicle, setVehicle] = useState(0);
  const [km, setKm] = useState(60);
  const [years, setYears] = useState(5);
  const chipsRef = useRef<HTMLDivElement>(null);

  // start the mobile chip row scrolled so the active chip leads with a ~33px
  // peek of its predecessor (Figma 1:5219 places the track ~150px from left)
  useLayoutEffect(() => {
    const row = chipsRef.current;
    const active = row?.querySelector<HTMLElement>('[data-active="true"]');
    if (!row || !active) return;
    row.scrollLeft = Math.max(
      0,
      active.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft - 33,
    );
  }, []);

  return (
    <section className="bg-deep py-[42px] lg:pt-[52px] lg:pb-[48px]" aria-label="Savings calculator">
      {/* container frame (Figma 1:1471/1:2381): 1440px wide, padding
          52px top · 89px right · 48px bottom · 71px left → a 1280px content
          row split 736 + 32 gap + 512 (1:2382–1:2391), columns bottom-aligned
          (items-end). Mobile: 20px sides, stacked flex-col. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[34px] px-5 lg:grid lg:grid-cols-[minmax(0,736px)_512px] lg:items-end lg:gap-8 lg:pl-[71px] lg:pr-[89px]">
        {/* left column (Figma 1:2383): 736px, flex-col gap 36 — title
            container (gap 12, pt 14) above the 736×496 chart (Component30);
            on mobile only the title renders here */}
        <div className="lg:flex lg:min-w-0 lg:flex-col lg:gap-[36px]">
          <div className="flex flex-col gap-[14px] lg:gap-3 lg:pt-[14px]">
            {/* Figma 1:2385: navy #0E2F6D badge marks with white text on the dark section */}
            <Eyebrow label="Savings calculator" dark icons="navy" />
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
              Calculate your savings
            </h2>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/assets/calculator/chart.svg"
              alt="Savings comparison chart between diesel and Euler vehicles"
              width={736}
              height={496}
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* right column (Figma 1:2391): 512px, flex-col gap 42 — the
            vehicle-selector block (gap 20) above the sliders panel; on
            mobile it stacks full-width below the title */}
        <div className="flex flex-1 flex-col gap-6 lg:min-w-0 lg:gap-[42px]">
          <div className="flex flex-col gap-3 lg:gap-5">
            <p className="text-[14px] font-medium leading-[1.15] tracking-[-0.28px] text-white lg:text-[20px] lg:tracking-[-0.4px]">
              Select Vehicle
            </p>

            {/* mobile: full-bleed horizontal scroll row (Figma 1:5219, 56px cards,
               r6, 42px thumbs) · desktop: 2×2 grid two per row */}
            <div
              ref={chipsRef}
              className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-[18px] lg:overflow-visible lg:px-0"
            >
              {VEHICLES.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  data-active={i === vehicle}
                  onClick={() => setVehicle(i)}
                  aria-pressed={i === vehicle}
                  className={`${MOBILE_ORDER[i]} flex h-[56px] w-auto shrink-0 items-center gap-[15px] rounded-[6px] border border-brand/50 py-[6px] pl-[6px] pr-[10px] text-left transition-opacity lg:order-none lg:h-[70px] lg:w-full lg:rounded-2xl lg:p-[6px] ${
                    i === vehicle ? "bg-brand/20" : "bg-brand/10 opacity-60"
                  }`}
                >
                  {/* white tile: 42×42 mobile (r4, 30.4px window) · 58×58 desktop (r12, 42px window) */}
                  <span className="relative h-[42px] w-[42px] shrink-0 rounded-[4px] bg-white lg:h-[58px] lg:w-[58px] lg:rounded-xl">
                    <span className="absolute inset-[5.79px] overflow-hidden rounded-[5.799px] lg:inset-2 lg:rounded-[8.008px]">
                      <Image
                        src="/assets/calculator/vehicle.png"
                        alt=""
                        width={947}
                        height={634}
                        sizes="134px"
                        className="absolute max-w-none"
                        style={
                          {
                            left: `${v.crop[0]}%`,
                            top: `${v.crop[1]}%`,
                            width: `${v.crop[2]}%`,
                            height: `${v.crop[3]}%`,
                          } as React.CSSProperties
                        }
                      />
                    </span>
                  </span>
                  <span className="flex flex-col gap-[4px] leading-[1.15] lg:gap-[6px]">
                    <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.28px] text-white lg:text-[16px] lg:tracking-[-0.32px]">
                      {v.name}
                    </span>
                    <span className="text-[12px] font-medium tracking-[-0.24px] text-white">
                      {v.capacity}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* sliders panel (Figma 1:2421): #030d1e, r16, p24, gap 32 —
              mobile p12/r8/gap12 per its own frame */}
          <div className="flex flex-col gap-3 rounded-lg bg-deeper p-3 lg:gap-8 lg:rounded-2xl lg:p-6">
            <SliderBlock
              label="How many kilometres driven per day?"
              value={km}
              display={`${km} km`}
              min={0}
              max={200}
              minLabel="0 km"
              maxLabel="200 km"
              onChange={setKm}
            />
            <div className="h-px w-full shrink-0 bg-white/20" aria-hidden />
            <SliderBlock
              label="Ownership period (years)"
              value={years}
              display={`${years} years`}
              min={1}
              max={10}
              minLabel="1 year"
              maxLabel="10 year"
              onChange={setYears}
            />
          </div>

          {/* mobile bottom visual — Component 31 (Figma 1:5278), 373×251,
              24px below the controls per the mobile frame */}
          <Image
            src="/assets/calculator/chart-mobile.svg"
            alt="Savings comparison illustration"
            width={373}
            height={251}
            className="w-full lg:hidden"
          />
        </div>
      </div>
    </section>
  );
}

function SliderBlock({
  label,
  value,
  display,
  min,
  max,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <div className="flex items-center justify-between leading-[1.15]">
        <p className="text-[14px] font-medium tracking-[-0.28px] text-white lg:text-[20px] lg:tracking-[-0.4px]">{label}</p>
        <p className="text-[18px] font-bold tracking-[-0.36px] text-white lg:text-[24px] lg:tracking-[-0.48px]">{display}</p>
      </div>
      <RangeSlider value={value} min={min} max={max} onChange={onChange} ariaLabel={label} />
      <div className="flex justify-between text-[12px] font-bold tracking-[-0.24px] text-[#808080] lg:text-[14px] lg:tracking-[-0.28px]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
