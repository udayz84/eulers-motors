"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import {
  DEFAULT_TCO_INPUTS,
  EULER_VEHICLES,
  compareTco,
  competitorsFor,
  formatInr,
  monthlyBreakdown,
  resolveCompetitor,
} from "@/lib/tco";

/* Chip tiles reuse the sprite crops from the Figma frame
   (1:2398/1:2404/1:2411/1:2417). All four Euler models are offered —
   Storm EV LR 200 runs on placeholder calculator data pending Marketing
   validation (docs/tco-client-questions.md Q10). */
const VEHICLE_CHIPS = [
  { id: "storm-t1500", name: "Storm EV T1500", capacity: "1,500 kg", crop: [-5.8, -125.03, 319.14, 213.66] as const },
  { id: "storm-lr200", name: "Storm EV LR 200", capacity: "1,200 kg", crop: [-215.19, -125.87, 319.14, 213.66] as const },
  { id: "turbo-ev", name: "Turbo EV 1000", capacity: "1,000 kg", crop: [0, 0, 319.14, 213.66] as const },
  { id: "hiload-ev", name: "HiLoad EV", capacity: "688 kg", crop: [-279.52, -14.06, 397.73, 266.27] as const },
];

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
  step = 1,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
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
        step={step}
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
 * The static chart image is gone: the left column now renders the live TCO
 * result — Euler vs competitor monthly profit, doughnut and period savings —
 * computed by lib/tco.ts from the selected vehicle, fuel competitor and the
 * two sliders. Projection uses the handoff's "spec" behaviour (EMI deducted
 * across the whole period) pending Marketing's answer on §7.1 — see
 * docs/tco-client-questions.md.
 */
export interface SavingsCalculatorProps {
  eyebrow?: string;
  title?: string;
  defaultDailyKm?: number;
  defaultYears?: number;
}

export default function SavingsCalculator({
  eyebrow = "Savings calculator",
  title = "Calculate your savings",
  defaultDailyKm = 60,
  defaultYears = 5,
}: SavingsCalculatorProps = {}) {
  const [vehicleId, setVehicleId] = useState("storm-t1500");
  const [competitorId, setCompetitorId] = useState<string | undefined>(undefined);
  const [km, setKm] = useState(Math.min(300, Math.max(20, defaultDailyKm || 20)));
  const [years, setYears] = useState(Math.min(10, Math.max(1, defaultYears || 5)));

  const euler = EULER_VEHICLES.find((v) => v.id === vehicleId) ?? EULER_VEHICLES[0];
  // Vehicle change auto-corrects an incompatible competitor to the first
  // mapped one (Diesel) — same rule as the handoff §3.
  const competitor = resolveCompetitor(vehicleId, competitorId) ?? euler;
  const competitorOptions = competitorsFor(vehicleId);

  const result = useMemo(
    () =>
      compareTco(euler, competitor, {
        ...DEFAULT_TCO_INPUTS,
        dailyKm: km,
        ownershipYears: years,
      }),
    [euler, competitor, km, years]
  );

  const extra = result.extraMonthlyProfit;
  const extraPositive = extra >= 0;
  const periodLabel = `${years} ${years === 1 ? "year" : "years"}`;

  // Bar graph (like the removed static chart): one bar per mapped competitor
  // fuel + the Euler EV, all live monthly profits scaled to the tallest bar.
  const bars = useMemo(() => {
    const items = [
      ...competitorsFor(vehicleId).map((c) => ({
        key: c.id,
        label: c.fuel === "cng" ? "CNG" : c.fuel[0].toUpperCase() + c.fuel.slice(1),
        value: monthlyBreakdown(c, {
          ...DEFAULT_TCO_INPUTS,
          dailyKm: km,
          ownershipYears: years,
        }).netMonthlyProfit,
        selected: c.id === competitor.id,
        euler: false,
      })),
      {
        key: "euler",
        label: "Euler EV",
        value: result.euler.netMonthlyProfit,
        selected: false,
        euler: true,
      },
    ];
    const max = Math.max(...items.map((i) => i.value), 1);
    return items.map((i) => ({ ...i, heightPct: Math.max(2, (Math.max(i.value, 0) / max) * 100) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId, competitor.id, km, years]);

  return (
    <section className="bg-deep py-[42px] lg:pt-[52px] lg:pb-[48px]" aria-label="Savings calculator">
      {/* container frame (Figma 1:1471/1:2381): 1440px wide, padding
          52px top · 89px right · 48px bottom · 71px left → a 1280px content
          row split 736 + 32 gap + 512 (1:2382–1:2391), columns bottom-aligned
          (items-end). Mobile: 20px sides, stacked flex-col. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[34px] px-5 sm:px-8 lg:grid lg:grid-cols-[minmax(0,736px)_512px] lg:items-end lg:gap-8 lg:pl-[71px] lg:pr-[89px]">
        {/* left column (Figma 1:2383): title above the live TCO result panel */}
        <div className="lg:flex lg:min-w-0 lg:flex-col lg:gap-[36px]">
          <div className="flex flex-col gap-[14px] lg:gap-3 lg:pt-[14px]">
            {/* white badge marks + white text on the dark section */}
            <Eyebrow label={eyebrow} dark icons="white" />
            <h2 className="font-display text-[28px] sm:text-[36px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:text-[52px] lg:tracking-[-1.04px]">
              {title}
            </h2>
          </div>

          {/* Live TCO panel — bar graph like the removed static chart, but computed */}
          <div className="relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md lg:p-6">
            {/* bar graph: monthly profit per fuel + Euler EV */}
            <div className="flex h-[240px] items-end justify-around gap-3 px-1 sm:gap-6 lg:h-[280px]">
              {bars.map((bar) => (
                <div key={bar.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <span
                    className={`whitespace-nowrap text-[13px] font-bold leading-none lg:text-[15px] ${
                      bar.euler ? "text-[#6fcf97]" : bar.value < 0 ? "text-[#ff7a7a]" : "text-white"
                    }`}
                  >
                    {formatInr(bar.value)}
                  </span>
                  <div
                    className={`w-full max-w-[86px] rounded-t-[10px] transition-[height] duration-500 ease-out ${
                      bar.euler
                        ? "bg-[linear-gradient(180deg,#00ff87_0%,#1d6fff_100%)]"
                        : bar.selected
                          ? "bg-white/30"
                          : "bg-white/15"
                    }`}
                    style={{ height: `${bar.heightPct}%` }}
                    aria-hidden
                  />
                </div>
              ))}
            </div>
            {/* x-axis labels aligned under each bar */}
            <div className="mt-2 flex justify-around gap-3 px-1 sm:gap-6">
              {bars.map((bar) => (
                <span
                  key={bar.key}
                  className={`min-w-0 flex-1 truncate text-center text-[12px] font-medium capitalize leading-none lg:text-[14px] ${
                    bar.euler ? "font-bold text-white" : "text-white/60"
                  }`}
                >
                  {bar.label}
                </span>
              ))}
            </div>

            {/* headline + ownership-period projection (§4) */}
            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className={`text-[15px] font-bold leading-[1.2] lg:text-[17px] ${
                  extraPositive ? "text-[#6fcf97]" : "text-[#ff7a7a]"
                }`}
              >
                {extraPositive
                  ? `${formatInr(extra)} more profit every month vs ${competitor.fuel === "cng" ? "CNG" : competitor.fuel}`
                  : `${formatInr(Math.abs(extra))} less profit every month vs ${competitor.fuel === "cng" ? "CNG" : competitor.fuel}`}
              </p>
              <p className="text-xs text-white lg:text-sm">
                <span className="text-white/70">
                  Over <span className="font-semibold text-white">{periodLabel}</span>:
                </span>{" "}
                <span
                  className={`font-bold ${extraPositive ? "text-[#6fcf97]" : "text-[#ff7a7a]"}`}
                >
                  {extraPositive
                    ? `${formatInr(result.periodExtraProfit)} extra savings`
                    : `${formatInr(Math.abs(result.periodExtraProfit))} less savings`}
                </span>
              </p>
            </div>

            {/* fixed assumptions (§2) — shown so the numbers have context */}
            <p className="mt-3 text-[11px] leading-[1.5] text-white/45">
              Assumes 25 operating days/month, ₹8/kWh electricity, ₹95/L diesel,
              10% down payment, 12% annual interest over a 36-month loan.
              Excludes insurance, registration and resale.
            </p>
          </div>
        </div>

        {/* right column (Figma 1:2391): vehicle selector above the sliders panel */}
        <div className="flex flex-1 flex-col gap-6 lg:min-w-0 lg:gap-[42px]">
          <div className="flex flex-col gap-3 lg:gap-5">
            <p className="text-[14px] font-medium leading-[1.15] tracking-[-0.28px] text-white lg:text-[20px] lg:tracking-[-0.4px]">
              Select your vehicle
            </p>

            {/* mobile: full-bleed horizontal scroll row (Figma 1:5219) ·
                desktop: 2 per row, like the original design */}
            <div
              className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-[18px] lg:overflow-visible lg:px-0"
            >
              {VEHICLE_CHIPS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  data-active={v.id === vehicleId}
                  onClick={() => {
                    setVehicleId(v.id);
                    setCompetitorId(undefined);
                  }}
                  aria-pressed={v.id === vehicleId}
                  className={`flex h-[56px] w-auto shrink-0 items-center gap-[15px] rounded-[6px] border border-brand/50 py-[6px] pl-[6px] pr-[10px] text-left transition-opacity lg:h-[70px] lg:w-full lg:rounded-2xl lg:p-[6px] ${
                    v.id === vehicleId ? "bg-brand/20" : "bg-brand/10 opacity-60"
                  }`}
                >
                  {/* white tile: 42×42 mobile (r4) · 58×58 desktop (r12) */}
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

            {/* competitor fuel picker — options mapped to the selected Euler model */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="tco-competitor"
                className="text-[14px] font-medium leading-[1.15] tracking-[-0.28px] text-white lg:text-[16px] lg:tracking-[-0.32px]"
              >
                Compare against
              </label>
              <select
                id="tco-competitor"
                value={competitor.id}
                onChange={(e) => setCompetitorId(e.target.value)}
                className="h-10 w-full rounded-[6px] border border-white/20 bg-[#030d1e] px-3 text-[14px] font-medium text-white focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {competitorOptions.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#030d1e]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* sliders panel (Figma 1:2421) — km range per the TCO handoff (20–300, step 10) */}
          <div className="flex flex-col gap-3 rounded-lg bg-deeper p-3 lg:gap-8 lg:rounded-2xl lg:p-6">
            <SliderBlock
              label="How many kilometres do you drive per day?"
              value={km}
              display={`${km} km`}
              min={20}
              max={300}
              step={10}
              minLabel="20 km"
              maxLabel="300 km"
              onChange={(v) => setKm(v)}
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
              onChange={(v) => setYears(v)}
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
  step = 1,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
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
      <RangeSlider value={value} min={min} max={max} step={step} onChange={onChange} ariaLabel={label} />
      <div className="flex justify-between text-[12px] font-bold tracking-[-0.24px] text-[#808080] lg:text-[14px] lg:tracking-[-0.28px]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
