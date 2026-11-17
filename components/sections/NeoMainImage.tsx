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
      <ResponsiveFigmaCanvas>
      <div
        className="relative mx-auto h-[1739px] w-full max-w-[1440px] overflow-hidden bg-white"
        data-node-id="4064:13640"
        data-name="Main image"
      >
      {/* ------------------------------------------------------------------ */}
      {/* Background plate + scrim                                            */}
      {/* ------------------------------------------------------------------ */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-auto left-0 max-w-none top-[-13.76%] w-full" src={`${A}main-bg-1.png`} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-auto left-[0.12%] max-w-none top-[-7.93%] w-[99.76%]" src={`${A}main-bg-2.png`} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180.00000273772486deg, rgba(0, 0, 0, 0) 36.212%, rgb(0, 0, 0) 46.277%, rgba(0, 0, 0, 0.75) 70.986%, rgb(255, 255, 255) 100%)",
          }}
        />
      </div>

      {/* Blurred dark blooms */}
      <div aria-hidden className="-translate-x-1/2 absolute blur-[123.15px] h-[536.335px] left-1/2 top-[798px] w-[1895.95px]">
        <div className="absolute backdrop-blur-[268.7px] bg-[rgba(0,0,0,0.32)] inset-0 pointer-events-none" />
      </div>
      <div aria-hidden className="-translate-x-1/2 absolute blur-[123.15px] h-[935.8px] left-1/2 opacity-50 top-[548px] w-[2874.083px]">
        <div className="absolute backdrop-blur-[268.7px] bg-[rgba(0,0,0,0.4)] inset-0 pointer-events-none" />
      </div>
      <div aria-hidden className="-translate-x-1/2 absolute blur-[123.15px] h-[536.335px] left-1/2 opacity-50 top-[-480px] w-[1895.95px]">
        <div className="absolute backdrop-blur-[75px] bg-black inset-0 pointer-events-none" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Hero copy + stats banner (full-width 1440px column)                */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="-translate-x-1/2 absolute bottom-[829px] content-stretch flex flex-col gap-[20px] items-start left-1/2 w-[min(1280px,calc(100vw-40px))]"
        data-node-id="4064:13644"
      >
        {/* eyebrow */}
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="4064:13645">
          <div className="relative shrink-0 size-[14px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={`${A}logo.svg`} />
          </div>
          <p className="[word-break:break-word] font-sans font-normal leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">
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
        <div className="content-stretch flex items-end justify-between pb-[50px] relative shrink-0 w-full" data-node-id="4064:13650">
          <div className="[word-break:break-word] font-display font-semibold leading-[0] not-italic relative shrink-0 text-[52px] text-white tracking-[-1.04px] w-[455.246px] whitespace-pre-wrap">
            <p className="leading-[1.15] mb-0">{`More trips. `}</p>
            <p className="leading-[1.15]">Less kharcha.</p>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[372px]">
            <p className="[word-break:break-word] font-sans font-normal leading-[normal] relative shrink-0 text-[18px] text-white w-[380px]">
              200+ km on one charge. Charge it at home on a normal 16-amp plug full in about 3.5 hours.
            </p>
            <div className="content-stretch flex items-start relative shrink-0">
              <a
                href="/products"
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.5)] border-solid content-stretch flex h-[42px] items-center justify-center px-[24px] relative rounded-[4px] shrink-0 w-[174px] no-underline"
              >
                <p className="[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                  Explore Vehicles
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* glass stats bar */}
        <div
          className="content-stretch flex items-center justify-between overflow-clip px-[40px] py-[20px] relative shrink-0 w-full"
          style={{ borderRadius: "12px", background: "rgba(0, 0, 0, 0.42)", backdropFilter: "blur(38.849998474121094px)" }}
          data-node-id="4064:13658"
        >
          {/* decorative ellipse sweeps */}
          <div aria-hidden className="-translate-x-1/2 absolute flex h-[517.422px] items-center justify-center left-[calc(50%-108.67px)] top-[-114.64px] w-[638.022px]">
            <div className="flex-none rotate-[-31.12deg]">
              <div className="h-[243.12px] relative w-[598.493px]">
                <div className="absolute inset-[-75.56%_-30.69%]">
                  <img alt="" className="block max-w-none size-full" src={`${A}stats-ellipse-1.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="absolute flex h-[566.454px] items-center justify-center right-[1084.62px] top-[-189.54px] w-[737.948px]">
            <div className="-rotate-30 flex-none">
              <div className="h-[243.12px] relative w-[711.753px]">
                <div className="absolute inset-[-75.56%_-25.81%]">
                  <img alt="" className="block max-w-none size-full" src={`${A}stats-ellipse-2.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="absolute flex h-[566.454px] items-center justify-center right-[23.62px] top-[-189.54px] w-[737.948px]">
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
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* "Built after talking to" proof card                                 */}
      {/* ------------------------------------------------------------------ */}
      {proofVisible && (
        <div
          className="absolute backdrop-blur-[38.85px] bg-[rgba(0,0,0,0.42)] bottom-[1199px] content-stretch flex flex-col gap-[12px] items-start pb-[4px] pt-[12px] px-[4px] right-[80px] rounded-[8px]"
          data-node-id="4064:13814"
        >
          <div className="content-stretch flex items-center justify-center px-[12px] relative shrink-0 w-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-sans font-semibold leading-[normal] min-w-px relative text-[16px] text-white">
              Built after talking to
            </p>
          </div>
          <div className="[word-break:break-word] backdrop-blur-[101.3px] bg-[rgba(0,0,0,0.2)] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[6px] shrink-0 text-white">
            <p className="font-display font-semibold leading-[1.15] not-italic relative shrink-0 text-[52px] tracking-[-1.04px] whitespace-nowrap">
              10,000+
            </p>
            <p className="font-sans font-semibold leading-[normal] min-w-full relative shrink-0 text-[20px] w-[min-content]">
              auto drivers.
            </p>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setProofVisible(false)}
            className="absolute bg-white content-stretch flex items-center p-[8px] right-[10.8px] rounded-[640px] top-[11.8px] cursor-pointer"
          >
            <span className="block relative shrink-0 size-[6.4px]">
              <span className="absolute inset-[-15.62%_-15.63%_-15.63%_-15.62%]">
                <img alt="" className="block max-w-none size-full" src={`${A}close-icon.svg`} />
              </span>
            </span>
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Vehicle showcase card (full-width 1440 × 760)                      */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="-translate-x-1/2 absolute bottom-[20px] h-[760px] left-1/2 overflow-clip rounded-[12px] w-[min(1400px,calc(100vw-40px))]"
        data-node-id="4064:13822"
        data-name="Main image"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
          <img alt="" className="absolute h-[167.04%] left-[-11.87%] max-w-none top-[-33.52%] w-[123.73%]" src={`${A}main-bg-2.png`} />
        </div>

        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1040px] left-[calc(50%-254px)] top-[calc(50%+65px)] w-[1910px]" aria-hidden>
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[147.95%] left-[0.01%] max-w-none top-[-23.98%] w-[99.98%]" src={`${A}showcase-bg-1.png`} />
            </div>
            <div className="absolute backdrop-blur-[2px] bg-[rgba(0,0,0,0.12)] inset-0" />
          </div>
        </div>

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

        {/* foreground vehicle layer (transparent PNG) */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1040.932px] left-[calc(50%-273.02px)] top-[calc(50%+64px)] w-[1873.677px]" aria-hidden>
          <img alt="" className="absolute backdrop-blur-[2px] inset-0 max-w-none object-cover pointer-events-none size-full" src={`${A}showcase-bg-2.png`} />
        </div>

        {/* title */}
        <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[60px] top-[60px]">
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
        <div className="absolute bg-[rgba(0,0,0,0.12)] bottom-[616px] content-stretch flex items-center justify-center right-[101px] p-[4px] rounded-tl-[8px] rounded-tr-[8px]">
          <button
            type="button"
            onClick={() => setVehicle("HiRANGE")}
            className={`backdrop-blur-[26px] content-stretch flex h-[42px] items-center justify-center px-[20px] relative rounded-[4px] shrink-0 cursor-pointer ${
              vehicle === "HiRANGE" ? "bg-white" : ""
            }`}
          >
            <p className={`[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] whitespace-nowrap ${vehicle === "HiRANGE" ? "text-[#121212]" : "text-white"}`}>
              Neo HiRANGE
            </p>
          </button>
          <button
            type="button"
            onClick={() => setVehicle("HiCITY")}
            className={`backdrop-blur-[26px] content-stretch flex h-[42px] items-center justify-center px-[20px] relative rounded-[4px] shrink-0 cursor-pointer ${
              vehicle === "HiCITY" ? "bg-white" : ""
            }`}
          >
            <p className={`[word-break:break-word] font-display font-semibold leading-none not-italic relative shrink-0 text-[16px] whitespace-nowrap ${vehicle === "HiCITY" ? "text-[#121212]" : "text-white"}`}>
              Neo HiCITY
            </p>
          </button>
        </div>

        {/* CTA row */}
        <div className="absolute content-stretch flex gap-[14px] items-start right-[100px] top-[682.6px] w-[406px]" data-node-id="4064:13902">
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
        <div className="absolute h-[65.078px] left-[684.62px] top-[271.92px] w-[166.378px]" aria-hidden>
          <div className="absolute inset-[-0.77%_-1.6%_-4.1%_0]">
            <img alt="" className="block max-w-none size-full" src={`${A}decor.svg`} />
          </div>
        </div>
      </div>
      </div>
      </ResponsiveFigmaCanvas>
    </section>
  );
}
