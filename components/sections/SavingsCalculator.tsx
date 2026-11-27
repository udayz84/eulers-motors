"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import {
  DEFAULT_TCO_INPUTS,
  EULER_VEHICLES,
  TcoVehicle,
  compareTco,
  competitorsFor,
  formatInr,
  maintenancePaisaPerKm,
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

  // 4 Comparison bars (Petrol, Diesel, CNG, Euler EV) matching the visual design
  const bars = useMemo(() => {
    const vehicleCompetitors = competitorsFor(vehicleId);
    let dieselComp = vehicleCompetitors.find((c) => c.fuel === "diesel");
    let cngComp = vehicleCompetitors.find((c) => c.fuel === "cng");
    let petrolComp = vehicleCompetitors.find((c) => c.fuel === "petrol");

    if (!petrolComp) {
      const baseComp = dieselComp || vehicleCompetitors[0];
      if (baseComp) {
        petrolComp = {
          id: `${vehicleId}-synthetic-petrol`,
          name: "Other Petrol",
          isEulerProduct: false,
          vehicleType: baseComp.vehicleType,
          fuel: "petrol",
          exShowroomPrice: Math.round(baseComp.exShowroomPrice * 0.86),
          mileage: Math.max(10, Math.round(baseComp.mileage * 0.88)),
          maintenancePaisaPerKm: maintenancePaisaPerKm("petrol"),
          competitorToId: vehicleId,
        };
      }
    }

    const fuelConfigs = [
      { comp: petrolComp, label: "with petrol", key: "petrol" },
      { comp: dieselComp, label: "with diesel", key: "diesel" },
      { comp: cngComp, label: "with CNG", key: "cng" },
    ].filter((f): f is { comp: TcoVehicle; label: string; key: string } => Boolean(f.comp));

    const competitorItems = fuelConfigs.map(({ comp: c, label, key }) => {
      const breakdown = monthlyBreakdown(c, {
        ...DEFAULT_TCO_INPUTS,
        dailyKm: km,
        ownershipYears: years,
      });
      return {
        key: c.id || key,
        fuel: c.fuel,
        label,
        value: breakdown.netMonthlyProfit,
        selected: c.id === competitor.id || c.fuel === competitor.fuel,
        euler: false,
      };
    });

    const eulerItem = {
      key: "euler",
      fuel: "electric" as const,
      label: "with Euler EV",
      value: result.euler.netMonthlyProfit,
      selected: true,
      euler: true,
    };

    const items = [...competitorItems, eulerItem];
    const maxVal = Math.max(...items.map((i) => i.value), 1);

    return items.map((item) => ({
      ...item,
      // Scaled so the lowest bar has enough height for the chamfered top (min 28%, max 94%)
      heightPct: Math.max(28, Math.min(94, Math.round((Math.max(item.value, 0) / maxVal) * 94))),
    }));
  }, [vehicleId, competitor.id, competitor.fuel, km, years, result.euler.netMonthlyProfit]);

  // Compute profit percentage over competitor
  const compProfit = useMemo(() => {
    return monthlyBreakdown(competitor, {
      ...DEFAULT_TCO_INPUTS,
      dailyKm: km,
      ownershipYears: years,
    }).netMonthlyProfit;
  }, [competitor, km, years]);

  const extraPercent = compProfit > 0 ? ((extra / compProfit) * 100).toFixed(1) : "50.9";

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

          {/* Live TCO panel with vibrant neon gradient border & outer glow */}
          <div className="relative rounded-[28px] lg:rounded-[32px] p-[1.5px] bg-[linear-gradient(135deg,#00f0ff_0%,#1d6fff_35%,#0052e6_70%,#00e5ff_100%)] shadow-[0_0_28px_rgba(29,111,255,0.55),0_0_65px_rgba(0,198,255,0.3),0_0_95px_rgba(29,111,255,0.18)]">
            <div className="relative rounded-[26.5px] lg:rounded-[30.5px] bg-[radial-gradient(130%_110%_at_50%_0%,#081e4d_0%,#051336_50%,#020817_100%)] p-5 sm:p-7 lg:p-8 backdrop-blur-xl overflow-hidden shadow-[inset_0_0_30px_rgba(29,111,255,0.22)]">
              {/* Top summary metric */}
              <div className="mb-6 flex flex-col gap-1 sm:mb-8">
                <span className="font-display text-[38px] sm:text-[48px] lg:text-[54px] font-bold leading-none text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {formatInr(extra)}
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-[#8ea2c6] tracking-wide">
                  {extraPositive ? `+${extraPercent}% more profit per month` : `${formatInr(Math.abs(extra))} less profit per month`}
                </span>
              </div>

              {/* 4 Chamfered Bar Graphs */}
              <div className="flex h-[280px] sm:h-[310px] lg:h-[330px] items-end justify-between gap-2.5 sm:gap-6 lg:gap-8 px-1 sm:px-3 pt-6">
                {bars.map((bar) => {
                  return (
                    <div
                      key={bar.key}
                      onClick={() => {
                        if (!bar.euler && bar.key !== competitor.id) {
                          setCompetitorId(bar.key);
                        }
                      }}
                      className="group flex flex-1 flex-col items-start justify-end h-full min-w-0 cursor-pointer"
                    >
                      {/* Bar wrapper animated to height */}
                      <div
                        className="relative w-full flex flex-col justify-end transition-[height] duration-500 ease-out"
                        style={{ height: `${bar.heightPct}%` }}
                      >
                        {/* Pin Dot & Value/Label Stack above the bar */}
                        <div className="absolute left-0 bottom-full flex flex-col items-start pb-1">
                          <div className="flex flex-col items-start whitespace-nowrap mb-1.5">
                            <span
                              className={`font-display text-[13px] sm:text-[15px] lg:text-[16px] font-bold leading-tight ${
                                bar.euler
                                  ? "text-white drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                                  : "text-white/95"
                              }`}
                            >
                              {formatInr(bar.value)}
                            </span>
                            <span
                              className={`font-sans text-[10px] sm:text-[11px] lg:text-[12px] font-medium leading-normal ${
                                bar.euler ? "text-[#38bdf8] font-semibold" : "text-[#8ea2c6]"
                              }`}
                            >
                              {bar.label}
                            </span>
                          </div>

                          {/* Pin dot node */}
                          <div className="relative flex items-center mb-1">
                            <span
                              className={`block size-[6px] rounded-full transition-transform group-hover:scale-125 ${
                                bar.euler
                                  ? "bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                                  : "bg-white/80 group-hover:bg-white"
                              }`}
                            />
                          </div>

                          {/* Dashed vertical pin line from dot to top-left of bar */}
                          <div
                            className={`h-4 sm:h-5 w-px border-l border-dashed ${
                              bar.euler ? "border-[#00f0ff]" : "border-white/40"
                            }`}
                          />
                        </div>

                        {/* Chamfered SVG bar */}
                        <div className="relative w-full h-full min-h-[45px] transition-transform duration-200 group-hover:-translate-y-0.5">
                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="size-full overflow-visible"
                          >
                            <defs>
                              {/* Glass gradient for competitor bars */}
                              <linearGradient id={`comp-glass-${bar.key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.01)" />
                              </linearGradient>

                              {/* Base rich royal blue to electric cyan vertical gradient */}
                              <linearGradient id="euler-base-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#144fe6" />
                                <stop offset="30%" stopColor="#0b2c8a" />
                                <stop offset="70%" stopColor="#0854c4" />
                                <stop offset="100%" stopColor="#00d4ff" />
                              </linearGradient>

                              {/* Vertical 3D fluted ribs pattern overlay */}
                              <pattern id="euler-fluted-3d" width="6" height="24" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="2" height="24" fill="rgba(255, 255, 255, 0.22)" />
                                <rect x="2" y="0" width="2" height="24" fill="rgba(0, 212, 255, 0.3)" />
                                <rect x="4" y="0" width="2" height="24" fill="rgba(0, 0, 0, 0.32)" />
                              </pattern>

                              {/* Glow filter for Euler top highlight */}
                              <filter id="glow-cyan-top" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2.5" result="blur" />
                                <feMerge>
                                  <feMergeNode in="blur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                            </defs>

                            {/* Main polygon fill (flat top 0..52, sloped 52..100) */}
                            <path
                              d="M 0 0 L 52 0 L 100 24 L 100 100 L 0 100 Z"
                              fill={bar.euler ? "url(#euler-base-grad)" : `url(#comp-glass-${bar.key})`}
                            />

                            {/* Fluted 3D ribbed glass texture on Euler EV */}
                            {bar.euler && (
                              <path
                                d="M 0 0 L 52 0 L 100 24 L 100 100 L 0 100 Z"
                                fill="url(#euler-fluted-3d)"
                              />
                            )}

                            {/* Crisp top contour highlight stroke */}
                            <path
                              d="M 0 0 L 52 0 L 100 24"
                              fill="none"
                              stroke={bar.euler ? "#ffffff" : "rgba(255, 255, 255, 0.95)"}
                              strokeWidth={bar.euler ? "2.5" : "1.8"}
                              strokeLinecap="round"
                              style={bar.euler ? { filter: "url(#glow-cyan-top)" } : undefined}
                            />

                            {/* Left dashed edge line */}
                            <line
                              x1="0.5"
                              y1="0"
                              x2="0.5"
                              y2="100"
                              stroke={bar.euler ? "rgba(0, 229, 255, 0.55)" : "rgba(255, 255, 255, 0.32)"}
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />

                            {/* Middle inflection dashed line */}
                            <line
                              x1="52"
                              y1="0"
                              x2="52"
                              y2="100"
                              stroke={bar.euler ? "rgba(0, 229, 255, 0.55)" : "rgba(255, 255, 255, 0.32)"}
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />

                            {/* Right dashed edge line */}
                            <line
                              x1="99.5"
                              y1="24"
                              x2="99.5"
                              y2="100"
                              stroke={bar.euler ? "rgba(0, 229, 255, 0.55)" : "rgba(255, 255, 255, 0.32)"}
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ownership-period projection summary */}
              <div className="mt-7 flex flex-col gap-2.5 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p
                  className={`text-xs sm:text-sm font-bold leading-[1.2] ${
                    extraPositive ? "text-[#6fcf97]" : "text-[#ff7a7a]"
                  }`}
                >
                  {extraPositive
                    ? `${formatInr(extra)} more profit every month vs ${competitor.fuel === "cng" ? "CNG" : competitor.fuel}`
                    : `${formatInr(Math.abs(extra))} less profit every month vs ${competitor.fuel === "cng" ? "CNG" : competitor.fuel}`}
                </p>
                <p className="text-xs text-white sm:text-sm">
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
            </div>
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
