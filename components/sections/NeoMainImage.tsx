/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import ResponsiveFigmaCanvas from "@/components/sections/ResponsiveFigmaCanvas";

/**
 * Figma node 4064:13640 — "Main image" (1440 × 1739).
 *
 * Pixel-exact desktop implementation: every width, height, padding, gap,
 * offset, radius, colour and font token below is taken directly from the
 * Figma design context. The frame keeps its native 1440px canvas; the
 * project's existing tablet scale-to-fit script (app/layout.tsx) renders
 * that canvas 1:1 at 768–1279px viewports.
 */

const A = "/assets/neo/main-image/";

const STATS = [
  { value: "200+", unit: "Km", label: "RealRange™" },
  { value: "3.5", unit: "Hrs", label: "0 to full charge" },
  { value: "5", unit: "Yrs", label: "Vehicle warranty" },
  { value: "D+3", unit: "", label: "Seating" },
] as const;

const VEHICLES = {
  HiRANGE: {
    chip: "HiRANGE PLUS",
    name: "Neo HiRANGE",
    description:
      "Built for inter-city delivery, logistics, and heavy payloads. Extra cabin safety and dual fast charging support.",
    rows: [
      [
        { value: "200", unit: "km", label: "on one charge" },
        { value: "261", unit: "km", label: "Certified Range" },
        { value: "D+3", unit: "", label: "Seating" },
      ],
      [
        { value: "60 ", unit: "Km/h", label: "Top Speed" },
        { value: "3.5", unit: "Hrs", label: "Top Speed" },
        { value: "5", unit: "Yrs", label: "Vehicle Warranty" },
      ],
    ],
  },
  HiCITY: {
    chip: "HiCITY PLUS",
    name: "Neo HiCITY",
    description:
      "Made for the city. Compact, agile and built for everyday delivery routes with low running costs.",
    rows: [
      [
        { value: "170", unit: "km", label: "on one charge" },
        { value: "177", unit: "km", label: "Certified Range" },
        { value: "D+3", unit: "", label: "Seating" },
      ],
      [
        { value: "55 ", unit: "Km/h", label: "Top Speed" },
        { value: "3.5", unit: "Hrs", label: "Full Charge" },
        { value: "5", unit: "Yrs", label: "Vehicle Warranty" },
      ],
    ],
  },
} as const;

type VehicleKey = keyof typeof VEHICLES;

function StatBlock({
  value,
  unit,
  label,
  large = false,
}: {
  value: string;
  unit: string;
  label: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-row items-center self-stretch" data-node-id="4064:13659">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] h-full items-start justify-center overflow-clip px-[2px] relative shrink-0 text-center whitespace-nowrap">
        <p className="font-display leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.8833px]">
          <span className="font-display font-medium leading-[1.15] text-[44.167px]">{value}</span>
          {unit && (
            <span className="font-display font-light leading-[1.15] text-[44.167px]">{` `}</span>
          )}
          {unit && (
            <span className={`font-display font-medium leading-[1.15] ${large ? "text-[26px]" : "text-[22px]"}`}>
              {unit}
            </span>
          )}
        </p>
        <p className="font-sans font-medium leading-[normal] relative shrink-0 text-[18px] text-[rgba(255,255,255,0.8)]">
          {label}
        </p>
      </div>
    </div>
  );
}

function VLine({ src }: { src: string }) {
  return (
    <div className="flex h-[32px] items-center justify-center relative shrink-0 w-0">
      <div className="flex-none rotate-90">
        <div className="h-0 relative w-[32px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={src} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecItem({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4.8px] items-start min-w-px overflow-clip relative text-center whitespace-nowrap">
      <p className="font-display leading-[0] not-italic relative shrink-0 text-[#121212] text-[0px] tracking-[-0.48px]">
        <span className="font-display font-normal leading-[1.15] text-[24px] text-white">{value}</span>
        {unit && (
          <span className="font-display font-normal leading-[1.15] text-[14px] text-white tracking-[-0.28px]">{` `}</span>
        )}
        {unit && (
          <span className="font-display font-normal leading-[1.15] text-[14px] text-white">{unit}</span>
        )}
      </p>
      <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[12px] text-white">
        {label}
      </p>
    </div>
  );
}

function SpecRow({
  items,
  separators,
}: {
  items: readonly { value: string; unit: string; label: string }[];
  separators: readonly string[];
}) {
  return (
    <div className="content-stretch flex gap-[33px] items-center relative shrink-0 w-full">
      {items.map((item, i) => (
        <div key={i} className="contents">
          <SpecItem {...item} />
          {i < items.length - 1 && (
            <div className="flex h-[21.143px] items-center justify-center relative shrink-0 w-0">
              <div className="-rotate-90 flex-none">
                <div className="h-0 relative w-[21.143px]">
                  <div className="absolute inset-[-0.8px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={separators[i]} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function NeoMainImage() {
  const [proofVisible, setProofVisible] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleKey>("HiRANGE");
  const data = VEHICLES[vehicle];

  return (
    <section aria-label="Neo by Euler — more trips, less kharcha" className="w-full bg-white">
      {/* ------------------------------------------------------------------ */}
      {/* First Fold: Hero (fits in first fold & auto-adjusts on laptops)   */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative h-[100dvh] min-h-[580px] max-h-[960px] w-full overflow-hidden bg-black text-white">
        {/* Background plate + scrim */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_55%] min-[1400px]:object-[center_50%]"
              src={`${A}main-bg-1.png`}
            />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_55%] min-[1400px]:object-[center_50%]"
              src={`${A}main-bg-2.png`}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.45) 100%)",
            }}
          />
        </div>

        {/* "Built after talking to" proof card */}
        {proofVisible && (
          <div
            className="absolute backdrop-blur-[38.85px] bg-[rgba(0,0,0,0.42)] top-[165px] min-[1400px]:top-[185px] right-[max(calc((100vw-1440px)/2+80px),32px)] z-10 flex flex-col gap-[12px] items-start pb-[4px] pt-[12px] px-[4px] rounded-[8px]"
            data-node-id="4064:13814"
          >
            <div className="flex items-center justify-center px-[12px] relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-sans font-semibold leading-[normal] text-[16px] text-white">
                Built after talking to
              </p>
            </div>
            <div className="backdrop-blur-[101.3px] bg-[rgba(0,0,0,0.2)] flex flex-col gap-[8px] items-start p-[16px] relative rounded-[6px] shrink-0 text-white">
              <p className="font-display font-semibold leading-[1.15] text-[52px] tracking-[-1.04px] whitespace-nowrap">
                10,000+
              </p>
              <p className="font-sans font-semibold leading-[normal] text-[20px]">
                auto drivers.
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setProofVisible(false)}
              className="absolute bg-white flex items-center p-[8px] right-[10.8px] rounded-[640px] top-[11.8px] cursor-pointer hover:bg-neutral-200 transition-colors"
            >
              <span className="block relative shrink-0 size-[6.4px]">
                <span className="absolute inset-[-15.62%_-15.63%_-15.63%_-15.62%]">
                  <img alt="" className="block max-w-none size-full" src={`${A}close-icon.svg`} />
                </span>
              </span>
            </button>
          </div>
        )}

        {/* Hero copy banner (anchored to bottom of first fold so it is never cut off on laptop screens) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[20px] min-[1400px]:bottom-[32px] z-10 flex w-[1280px] max-w-[calc(100%-80px)] flex-col gap-[12px] min-[1400px]:gap-[16px] items-start"
          data-node-id="4064:13644"
        >
          {/* eyebrow */}
          <div className="flex gap-[12px] items-center relative shrink-0" data-node-id="4064:13645">
            <div className="relative shrink-0 size-[14px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={`${A}logo.svg`} />
            </div>
            <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[14px] min-[1400px]:text-[16px] text-white whitespace-nowrap">
              NEO BY EULER
            </p>
          </div>

          {/* hairline */}
          <div className="h-0 relative shrink-0 w-full" data-node-id="4064:13649">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block max-w-none size-full" src={`${A}divider.svg`} />
            </div>
          </div>

          {/* headline + blurb + CTA */}
          <div className="flex items-end justify-between relative shrink-0 w-full" data-node-id="4064:13650">
            <div className="font-display font-semibold leading-[1.12] not-italic relative shrink-0 text-[36px] min-[1400px]:text-[52px] text-white tracking-[-1.04px] w-[455.246px] max-w-[48%] whitespace-pre-wrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              <p className="mb-0">{`More trips. `}</p>
              <p>Less kharcha.</p>
            </div>
            <div className="flex flex-col gap-[10px] min-[1400px]:gap-[16px] items-start relative shrink-0 w-[380px] max-w-[48%] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[14px] min-[1400px]:text-[18px] text-white w-full">
                200+ km on one charge. Charge it at home on a normal 16-amp plug full in about 3.5 hours.
              </p>
              <div className="flex items-start relative shrink-0">
                <a
                  href="#vehicles"
                  className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.5)] border-solid flex h-[38px] min-[1400px]:h-[42px] items-center justify-center px-[22px] min-[1400px]:px-[24px] relative rounded-[4px] shrink-0 w-[174px] no-underline transition-colors hover:bg-white/20"
                >
                  <p className="font-display font-semibold leading-none not-italic relative shrink-0 text-[14px] min-[1400px]:text-[16px] text-white whitespace-nowrap">
                    Explore Vehicles
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Second Fold: Stats Bar + Vehicle Showcase                          */}
      {/* ------------------------------------------------------------------ */}
      <div id="vehicles" className="relative w-full bg-gradient-to-b from-black via-[#0a0a0a] to-white pt-[30px] pb-[60px]">
        <ResponsiveFigmaCanvas>
          <div className="relative mx-auto flex flex-col items-center gap-[36px] w-full max-w-[1400px] px-[20px]">
            {/* glass stats bar */}
            <div
              className="flex items-center justify-between overflow-clip px-[28px] min-[1400px]:px-[40px] py-[16px] min-[1400px]:py-[20px] relative shrink-0 w-full rounded-[12px] border border-white/10"
              style={{ background: "rgba(0, 0, 0, 0.42)", backdropFilter: "blur(38.85px)" }}
              data-node-id="4064:13658"
            >
              {/* decorative ellipse sweeps */}
              <div aria-hidden className="-translate-x-1/2 absolute flex h-[517.422px] items-center justify-center left-[calc(50%-108.67px)] top-[-114.64px] w-[638.022px] pointer-events-none">
                <div className="flex-none rotate-[-31.12deg]">
                  <div className="h-[243.12px] relative w-[598.493px]">
                    <div className="absolute inset-[-75.56%_-30.69%]">
                      <img alt="" className="block max-w-none size-full" src={`${A}stats-ellipse-1.svg`} />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute flex h-[566.454px] items-center justify-center right-[1084.62px] top-[-189.54px] w-[737.948px] pointer-events-none">
                <div className="-rotate-30 flex-none">
                  <div className="h-[243.12px] relative w-[711.753px]">
                    <div className="absolute inset-[-75.56%_-25.81%]">
                      <img alt="" className="block max-w-none size-full" src={`${A}stats-ellipse-2.svg`} />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute flex h-[566.454px] items-center justify-center right-[23.62px] top-[-189.54px] w-[737.948px] pointer-events-none">
                <div className="-rotate-30 flex-none">
                  <div className="h-[243.12px] relative w-[711.753px]">
                    <div className="absolute inset-[-75.56%_-25.81%]">
                      <img alt="" className="block max-w-none size-full" src={`${A}stats-ellipse-2.svg`} />
                    </div>
                  </div>
                </div>
              </div>

              <StatBlock {...STATS[0]} />
              <VLine src={`${A}stats-vline.svg`} />
              <StatBlock {...STATS[1]} />
              <VLine src={`${A}stats-vline.svg`} />
              <StatBlock {...STATS[2]} />
              <VLine src={`${A}stats-vline.svg`} />
              <StatBlock {...STATS[3]} />
            </div>

            {/* Vehicle showcase card (full-width 1400 × 760) */}
            <div
              className="relative mx-auto h-[760px] w-full overflow-clip rounded-[12px] shadow-2xl"
              data-node-id="4064:13822"
              data-name="Main image"
            >
              {vehicle === "HiCITY" ? (
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]" aria-hidden>
                  <img
                    alt="Neo HiCITY"
                    className="h-full w-full object-cover object-center"
                    src={`${A}showcase-hicity-v2.png?v=2`}
                  />
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
                    <img alt="" className="absolute h-[167.04%] left-[-11.87%] max-w-none top-[-33.52%] w-[123.73%] object-cover" src={`${A}main-bg-2.png`} />
                  </div>

                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1040px] left-[calc(50%-254px)] top-[calc(50%+65px)] w-[1910px]" aria-hidden>
                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 overflow-hidden">
                        <img alt="" className="absolute h-[147.95%] left-[0.01%] max-w-none top-[-23.98%] w-[99.98%] object-cover" src={`${A}showcase-bg-1.png`} />
                      </div>
                      <div className="absolute backdrop-blur-[2px] bg-[rgba(0,0,0,0.12)] inset-0" />
                    </div>
                  </div>

                  {/* foreground vehicle layer (transparent PNG) */}
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1040.932px] left-[calc(50%-273.02px)] top-[calc(50%+64px)] w-[1873.677px]" aria-hidden>
                    <img alt="" className="absolute backdrop-blur-[2px] inset-0 max-w-none object-cover pointer-events-none size-full" src={`${A}showcase-bg-2.png`} />
                  </div>
                </>
              )}

              {/* model spec panel */}
              <div
                className="absolute z-10 bg-[rgba(0,0,0,0.5)] bottom-[89.4px] content-stretch flex flex-col gap-[24px] items-start p-[12px] right-[60px] rounded-[8px] w-[554px]"
                data-node-id="4064:13824"
                style={{ backdropFilter: "none", WebkitBackdropFilter: "none", filter: "none" }}
              >
                <div className="content-stretch flex flex-col gap-[10px] items-start justify-center px-[20px] py-[12px] relative shrink-0 w-full">
                  <div className="absolute bg-[#f3f4f5] content-stretch flex gap-[15px] h-[32px] items-center pl-[20px] pr-[16px] py-[6px] right-0 rounded-[4px] top-[12px]">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <p className="[word-break:break-word] font-sans font-semibold leading-[1.15] relative shrink-0 text-[#121212] text-[14px] text-center tracking-[-0.28px] whitespace-nowrap">
                        {data.chip}
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none">
                        <div className="h-[4px] relative w-[9.333px]">
                          <div className="absolute inset-[-9.24%_-8.04%_-18.75%_-8.04%]">
                            <img alt="" className="block max-w-none size-full" src={`${A}chevron.svg`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-display font-semibold leading-[1.15] not-italic relative shrink-0 text-[28px] text-white tracking-[-0.56px] whitespace-nowrap">
                      {data.name}
                    </p>
                  </div>
                  <p className="[word-break:break-word] font-sans font-normal leading-[normal] relative shrink-0 text-[16px] text-white w-[439.236px]">
                    {data.description}
                  </p>
                </div>

                <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col gap-[20px] items-center justify-center p-[24px] relative rounded-[6px] shrink-0 w-full">
                  <SpecRow items={data.rows[0]} separators={[`${A}spec-vline-1.svg`, `${A}spec-vline-2.svg`]} />
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute inset-[-0.8px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={`${A}spec-hline.svg`} />
                    </div>
                  </div>
                  <SpecRow items={data.rows[1]} separators={[`${A}spec-vline-1.svg`, `${A}spec-vline-1.svg`]} />
                </div>
              </div>

              {/* title */}
              <div className="absolute z-10 content-stretch flex flex-col gap-[14px] items-start left-[60px] top-[60px]">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[14px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={`${A}logo.svg`} />
                  </div>
                  <p className="[word-break:break-word] font-sans font-normal leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">
                    OUR VEHICLES
                  </p>
                </div>
                <p className="[word-break:break-word] font-display font-semibold leading-[1.15] not-italic relative shrink-0 text-[42px] text-white tracking-[-0.84px] w-[455.246px]">
                  Meet the Neo family.
                </p>
              </div>

              {/* model switcher */}
              <div className="absolute z-10 bg-[rgba(0,0,0,0.12)] bottom-[616px] content-stretch flex items-center justify-center right-[101px] p-[4px] rounded-tl-[8px] rounded-tr-[8px]">
                <button
                  type="button"
                  onClick={() => setVehicle("HiRANGE")}
                  className={`backdrop-blur-[26px] content-stretch flex h-[42px] items-center justify-center px-[20px] relative rounded-[4px] shrink-0 cursor-pointer ${vehicle === "HiRANGE" ? "bg-white" : ""
                    }`}
                >
                  <p className={`[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] whitespace-nowrap ${vehicle === "HiRANGE" ? "text-[#121212]" : "text-white"}`}>
                    Neo HiRANGE
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setVehicle("HiCITY")}
                  className={`backdrop-blur-[26px] content-stretch flex h-[42px] items-center justify-center px-[20px] relative rounded-[4px] shrink-0 cursor-pointer ${vehicle === "HiCITY" ? "bg-white" : ""
                    }`}
                >
                  <p className={`[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] whitespace-nowrap ${vehicle === "HiCITY" ? "text-[#121212]" : "text-white"}`}>
                    Neo HiCITY
                  </p>
                </button>
              </div>

              {/* CTA row */}
              <div className="absolute z-10 content-stretch flex gap-[14px] items-start right-[100px] top-[682.6px] w-[406px]" data-node-id="4064:13902">
                <a
                  href={`/products/${vehicle === "HiRANGE" ? "neo-hirange" : "neo-hicity"}`}
                  className="content-stretch flex gap-[20px] h-[42px] items-center justify-center pl-[24px] pr-[2px] relative rounded-[4px] shrink-0 no-underline"
                  style={{
                    backgroundImage:
                      "linear-gradient(107.75534555172112deg, rgb(0, 255, 135) 28.559%, rgb(29, 111, 255) 124.97%)",
                  }}
                >
                  <p className="[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                    View Details
                  </p>
                  <span className="bg-[#121212] content-stretch flex flex-col items-center justify-center relative rounded-[2px] shrink-0 size-[38px]">
                    <span className="h-[14px] relative shrink-0 w-[22px]">
                      <span className="absolute inset-[-16.4%_-1.68%_-22.89%_-3.41%]">
                        <img alt="" className="block max-w-none size-full" src={`${A}arrow.svg`} />
                      </span>
                    </span>
                  </span>
                </a>
                <a
                  href="/products"
                  className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.5)] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[42px] items-center justify-center min-w-px px-[24px] relative rounded-[4px] no-underline"
                >
                  <p className="[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                    Compare Vehicles
                  </p>
                  <span className="overflow-clip relative shrink-0 size-[24px]">
                    <span className="absolute inset-[20.83%]">
                      <span className="absolute inset-[-7.14%_-7.16%]">
                        <img alt="" className="block max-w-none size-full" src={`${A}compare-icon.svg`} />
                      </span>
                    </span>
                  </span>
                </a>
              </div>

              {/* small decorative swoosh */}
              <div
                className="absolute z-10 h-[65.078px] top-[271.92px] w-[166.378px]"
                style={{ left: vehicle === "HiCITY" ? "618px" : "684.62px" }}
                aria-hidden
              >
                <div className="absolute inset-[-0.77%_-1.6%_-4.1%_0]">
                  <img alt="" className="block max-w-none size-full" src={`${A}decor.svg`} />
                </div>
              </div>
            </div>
          </div>
        </ResponsiveFigmaCanvas>
      </div>
    </section>
  );
}
