"use client";

import { useState } from "react";
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

/**
 * Figma slider (1:2426–1:2431): dashed tick track (Line 92) + gradient fill pill
 * with a glowing head + 43×32 white thumb with three grip lines. The visual is
 * drawn with divs; a transparent <input type="range"> on top keeps it interactive.
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
        className="absolute left-0 top-1/2 h-[21.434px] w-full -translate-y-1/2"
      />
      {/* gradient fill — blue is reached ~19px before the thumb center (Figma) */}
      <div className="absolute left-0 top-1/2 h-[21px] -translate-y-1/2 overflow-clip" style={{ width: `${pct}%` }}>
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: "calc(100% + 19px)", background: "linear-gradient(to right, #091c3d, #1d6fff)" }}
        />
        <div className="absolute -top-[7.56px] right-[10px] h-[38.627px] w-[29.312px] rounded-bl-[22px] rounded-tl-[21px] bg-[#1d6fff] blur-[5.55px]" />
        <div className="absolute top-0 right-[8px] h-[23.506px] w-[17.838px] rounded-bl-[22px] rounded-tl-[21px] bg-white blur-[5.55px]" />
      </div>
      {/* thumb — bottom/right 0.8px brand border + inset shadow + 3 grips */}
      <div
        aria-hidden
        className="absolute top-1/2 flex h-[32px] w-[43px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[3.2px] overflow-clip rounded-[32px] border-b-[0.8px] border-r-[0.8px] border-solid border-[#1d6fff] bg-white shadow-[inset_1.6px_1.6px_6.4px_0px_rgba(0,0,0,0.25)] group-focus-within:outline group-focus-within:outline-2 group-focus-within:outline-offset-2 group-focus-within:outline-white/40"
        style={{ left: `${pct}%` }}
      >
        <span className="h-[14px] w-[1.6px] rounded-[32px] bg-[#f3f4f5]" />
        <span className="h-[14px] w-[1.6px] rounded-[32px] bg-[#f3f4f5]" />
        <span className="h-[14px] w-[1.6px] rounded-[32px] bg-[#f3f4f5]" />
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
 * Desktop: chart left + controls right · Mobile: stacked with snap selector.
 */
export default function SavingsCalculator() {
  const [vehicle, setVehicle] = useState(0);
  const [km, setKm] = useState(60);
  const [years, setYears] = useState(5);

  return (
    <section className="bg-deep py-10 lg:py-[52px]" aria-label="Savings calculator">
      {/* Figma 1:2382: the row is the full 1280px (736 chart + 32 gap + 512 controls)
          with no internal padding, offset 9px left of center (row x=71 in the 1440
          frame) — px-[10px] is mobile-only (Figma 1:4689) */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[10px] lg:w-[1280px] lg:max-w-full lg:flex-row lg:items-end lg:gap-8 lg:px-0 lg:pt-0 lg:-translate-x-[9px]">
        {/* left: heading + chart */}
        <div className="flex flex-col gap-[14px] lg:h-[610px] lg:gap-9 lg:pt-[14px] lg:shrink-0">
          <div className="flex flex-col gap-3 lg:gap-3">
            <Eyebrow label="Savings calculator" dark />
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:text-[28px]">
              Calculate your savings
            </h2>
          </div>
          <Image
            src="/assets/calculator/chart.svg"
            alt="Savings comparison chart between diesel and Euler vehicles"
            width={736}
            height={496}
            className="hidden w-[736px] lg:block"
          />
        </div>

        {/* right: vehicle selector + sliders — 42px gap between group and panel (Figma 1:2391) */}
        <div className="flex flex-1 flex-col gap-[18px] lg:gap-[42px]">
          <div className="flex flex-col gap-[14px] lg:gap-5">
            <p className="text-[14px] font-medium leading-[1.15] tracking-[-0.4px] text-white lg:text-[20px]">
              Select Vehicle
            </p>

            {/* mobile: snap scroller · desktop: 2×2 grid */}
            <div className="snap-row -mx-[6px] gap-2 px-[6px] lg:grid lg:grid-cols-2 lg:gap-[18px] lg:overflow-visible">
              {VEHICLES.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setVehicle(i)}
                  aria-pressed={i === vehicle}
                  className={`flex h-[70px] w-full items-center gap-[15px] rounded-2xl border border-brand/50 p-[6px] text-left transition-opacity lg:w-auto ${
                    i === vehicle ? "bg-brand/20" : "bg-brand/10 opacity-60"
                  }`}
                >
                  {/* 58×58 white tile with a 42×42 sprite window at inset 8 (Figma 1:2397–98) */}
                  <span className="relative h-[58px] w-[58px] shrink-0 bg-white max-lg:h-[42px] max-lg:w-[42px]">
                    <span className="absolute inset-0 overflow-hidden rounded-[5.8px] lg:inset-2 lg:rounded-[8.008px]">
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
                  <span className="flex flex-col gap-[6px] leading-[1.15]">
                    <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.32px] text-white lg:text-[16px]">
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

          {/* sliders panel */}
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
            <Image
              src="/assets/calculator/divider.svg"
              alt=""
              width={2}
              height={2}
              aria-hidden
              className="h-px w-full rotate-180"
            />
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
    <div className="flex flex-col gap-2 py-2 lg:gap-6">
      <div className="flex items-center justify-between leading-[1.15]">
        <p className="text-[14px] font-medium tracking-[-0.4px] text-white lg:text-[20px]">{label}</p>
        <p className="text-[18px] font-bold tracking-[-0.48px] text-white lg:text-[24px]">{display}</p>
      </div>
      <RangeSlider value={value} min={min} max={max} onChange={onChange} ariaLabel={label} />
      <div className="flex justify-between text-[12px] font-bold tracking-[-0.28px] text-[#808080] lg:text-[14px]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
