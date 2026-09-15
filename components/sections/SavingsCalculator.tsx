"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

type Vehicle = { name: string; capacity: string; crop: [number, number, number] };

const VEHICLES: Vehicle[] = [
  { name: "Strom EV LR 200", capacity: "1,200 kg", crop: [-5.8, -125.03, 319.14] },
  { name: "Storm EV T1500", capacity: "1,500 kg", crop: [-215.19, -125.87, 319.14] },
  { name: "Turbo EV 1000", capacity: "1,000 kg", crop: [0, 0, 319.14] },
  { name: "HiLoad EV", capacity: "688 kg", crop: [-279.52, -14.06, 397.73] },
];

/** Figma slider visuals: gradient fill + glowing head + white notched thumb */
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
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onChange(Number(e.target.value))}
      className="euler-range h-3 w-full"
      style={
        {
          "--pct": `${pct}%`,
        } as React.CSSProperties
      }
    />
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
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-[10px] lg:w-[1280px] lg:flex-row lg:items-end lg:gap-8 lg:px-10 lg:pt-0">
        {/* left: heading + chart */}
        <div className="flex flex-col gap-[14px] lg:h-[610px] lg:gap-9 lg:pt-[14px]">
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

        {/* right: vehicle selector + sliders */}
        <div className="flex flex-1 flex-col gap-[18px] lg:gap-5">
          <div className="flex flex-col gap-[14px] lg:gap-5">
            <p className="text-[14px] font-medium leading-[1.15] text-white lg:text-[20px]">
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
                  <span className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-xl bg-white max-lg:h-[42px] max-lg:w-[42px] max-lg:rounded">
                    <Image
                      src="/assets/calculator/vehicle.png"
                      alt=""
                      fill
                      sizes="60px"
                      className="object-cover"
                      style={
                        {
                          objectPosition: `${-v.crop[0] - 50}% ${-v.crop[1] - 50}%`,
                          transform: `scale(${v.crop[2] / 100})`,
                          transformOrigin: "top left",
                        } as React.CSSProperties
                      }
                    />
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

      <style>{`
        .euler-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        .euler-range::-webkit-slider-runnable-track {
          height: 12px;
          border-radius: 20px;
          background:
            linear-gradient(to right, #091c3d 0%, #1d6fff var(--pct), rgba(194,194,194,0.2) var(--pct));
        }
        .euler-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -10px;
          width: 43px;
          height: 32px;
          border-radius: 32px;
          border: 0.8px solid #1d6fff;
          border-right-width: 0.8px;
          background:
            repeating-linear-gradient(to right, transparent 0 6.4px, #f3f4f5 6.4px 8px) padding-box,
            #fff;
          background-size: 24px 14px;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: inset 1.6px 1.6px 6.4px rgba(0,0,0,0.25);
          filter: drop-shadow(0 0 6px rgba(29,111,255,0.45));
          cursor: grab;
        }
        .euler-range::-moz-range-track {
          height: 12px;
          border-radius: 20px;
          background: linear-gradient(to right, #091c3d 0%, #1d6fff var(--pct), rgba(194,194,194,0.2) var(--pct));
        }
        .euler-range::-moz-range-thumb {
          width: 43px;
          height: 32px;
          border-radius: 32px;
          border: 0.8px solid #1d6fff;
          background: #fff;
          box-shadow: inset 1.6px 1.6px 6.4px rgba(0,0,0,0.25);
          cursor: grab;
        }
      `}</style>
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
        <p className="text-[14px] font-medium text-white lg:text-[20px]">{label}</p>
        <p className="text-[18px] font-bold text-white lg:text-[24px]">{display}</p>
      </div>
      <RangeSlider value={value} min={min} max={max} onChange={onChange} ariaLabel={label} />
      <div className="flex justify-between text-[12px] font-bold text-[#808080] lg:text-[14px]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
