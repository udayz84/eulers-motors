/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

/**
 * Saving Calculator — Figma node 4064:13961 (desktop, 1440 × 710).
 *
 * Every width, height, inset, gap, radius and colour below comes straight from
 * the Figma design context. The section fills the viewport width while its
 * 1280px content column stays centred, matching the other /neo sections.
 */

const A = "/assets/neo/savings-calculator/desktop/";

const SAVINGS_PER_KM = 4.100875;
const CO2_PER_KM = 0.20548;

type Vehicle = "HiRANGE" | "HiCITY";

function money(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function ChartColumn({
  value,
  label,
  nodes,
}: {
  value: string;
  label: string;
  nodes: {
    text: string;
    art: string;
    contents: string;
    mask: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
}) {
  const maskStyle: React.CSSProperties = {
    maskImage: `url("${A}chart-mask.png")`,
    WebkitMaskImage: `url("${A}chart-mask.png")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "122px 324px",
    WebkitMaskSize: "122px 324px",
    maskPosition: "15.457px 78.08px",
    WebkitMaskPosition: "15.457px 78.08px",
  };

  return (
    <div
      className="content-stretch flex flex-col gap-[16.903px] h-[436px] items-start relative shrink-0 w-[123px]"
      data-node-id={nodes.text}
    >
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[5px] items-start justify-center leading-[normal] relative shrink-0 text-white w-full">
        <p className="font-display font-bold not-italic relative shrink-0 text-[27.044px] tracking-[-1.0818px] whitespace-nowrap">
          {value}
        </p>
        <p className="font-sans font-normal relative shrink-0 text-[12px] tracking-[0.48px] w-[113px]">
          {label}
        </p>
      </div>
      <div className="h-[366px] relative shrink-0 w-[123px]" data-node-id={nodes.art}>
        <div className="absolute contents left-px top-[42.03px]" data-node-id={nodes.contents}>
          <div
            aria-hidden
            className="absolute h-[400.778px] left-[-14.46px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[15.457px_78.08px] mask-size-[122px_324px] top-[-36.05px] w-[152.66px]"
            data-node-id={nodes.mask}
            style={maskStyle}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              height={400.778}
              src={`${A}chart-fill.png`}
              width={152.66}
            />
          </div>
        </div>
        <div className="absolute h-[173px] left-[0.73px] top-[2.95px] w-0" data-node-id={nodes.line1}>
          <div className="absolute inset-[-1.65%_-2.86px_-0.31%_-2.86px]">
            <img alt="" className="block max-w-none size-full" src={`${A}vector-164.svg`} />
          </div>
        </div>
        <div className="absolute flex h-[164.798px] items-center justify-center left-[60.97px] top-[42.86px] w-[0.903px]" data-node-id={nodes.line2}>
          <div className="flex-none rotate-[0.23deg] skew-x-[-0.08deg]">
            <div className="h-[164.8px] relative w-0">
              <div className="absolute inset-[-0.33%_-0.54px]">
                <img alt="" className="block max-w-none size-full" src={`${A}vector-165.svg`} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[117.498px] left-[123.24px] top-[80.21px] w-0" data-node-id={nodes.line3}>
          <div className="absolute inset-[-0.46%_-0.54px]">
            <img alt="" className="block max-w-none size-full" src={`${A}vector-166.svg`} />
          </div>
        </div>
        <div className="absolute h-[37.036px] left-[0.51px] top-[42.52px] w-[122.732px]" data-node-id={nodes.line4}>
          <div className="absolute inset-[-4.34%_-1.31%]">
            <img alt="" className="block max-w-none size-full" src={`${A}vector-167.svg`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  value,
  min,
  max,
  fillPercent,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  fillPercent: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="h-[12px] relative rounded-[20px] shrink-0 w-full">
      <div className="absolute inset-x-0 top-1/2 h-0 -translate-y-1/2">
        <div className="absolute inset-x-0 top-[-10px] h-[20px]">
          <img alt="" className="block max-w-none size-full" src={`${A}line-92.svg`} />
        </div>
      </div>
      <div
        className="absolute bg-gradient-to-r from-[#030e19] h-[21px] left-0 top-1/2 -translate-y-1/2 overflow-clip to-[#1888ea] to-[93.72%] transition-[width] duration-75 ease-out"
        style={{ width: `${fillPercent}%` }}
      >
        <div className="absolute bg-[#07dea3] blur-[5.55px] h-[38.627px] rounded-bl-[22px] rounded-tl-[21px] top-[-8.06px] w-[29.312px]" style={{ left: `calc(100% - 37px)` }} />
        <div className="absolute bg-[#befae9] blur-[5.55px] h-[23.506px] rounded-bl-[22px] rounded-tl-[21px] top-[-0.5px] w-[17.838px]" style={{ left: `calc(100% - 26px)` }} />
      </div>
      <div
        className="absolute border-2 border-[#00ff87] border-solid flex gap-[3.2px] h-[32px] items-center justify-center overflow-clip px-[4.8px] py-[3.2px] rounded-[8px] top-1/2 w-[43px] -translate-y-1/2 transition-[left] duration-75 ease-out"
        style={{ left: `calc(${fillPercent}% - 21.5px)` }}
      >
        <div aria-hidden className="absolute bg-[#121212] inset-0 pointer-events-none rounded-[8px]" />
        <div className="bg-[#ccc] h-[14px] relative rounded-[32px] shrink-0 w-[1.6px]" />
        <div className="bg-[#ccc] h-[14px] relative rounded-[32px] shrink-0 w-[1.6px]" />
        <div className="bg-[#ccc] h-[14px] relative rounded-[32px] shrink-0 w-[1.6px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_12px_0px_#1a62e3]" />
      </div>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onInput={(e) => onChange(Number(e.currentTarget.value))}
        className="absolute inset-x-0 -top-[12px] h-[36px] w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export default function NeoSavingsCalculator() {
  const [vehicle, setVehicle] = useState<Vehicle>("HiRANGE");
  const [km, setKm] = useState(60);
  const [years, setYears] = useState(5);

  const yearly = Math.round(km * 365 * SAVINGS_PER_KM);
  const monthly = Math.round(yearly / 12);
  const total = Math.round(km * 365 * years * SAVINGS_PER_KM);
  const co2 = ((km * 365 * years * CO2_PER_KM) / 1000).toFixed(1);

  const kmPct = (km / 200) * 100;
  const yearsPct = ((years - 1) / 9) * 100;

  return (
    <section
      aria-label="Neo running cost savings calculator"
      className="relative h-[710px] w-full overflow-hidden bg-[#121212] max-[767px]:h-auto max-[767px]:px-6 max-[767px]:py-[42px]"
      data-node-id="4064:13961"
      data-name="Saving Calculator"
    >
      <div aria-hidden className="absolute bottom-[118px] h-[265.945px] right-[914.59px] w-[300.904px]" data-node-id="4064:13962">
        <div className="absolute inset-[-69.07%_-61.05%]">
          <img alt="" className="block max-w-none size-full" src={`${A}ellipse-3433.svg`} />
        </div>
      </div>
      <div aria-hidden className="absolute bottom-[221.34px] h-[243.12px] right-[1037.19px] w-[258.219px]" data-node-id="4064:13963">
        <div className="absolute inset-[-75.56%_-71.14%]">
          <img alt="" className="block max-w-none size-full" src={`${A}ellipse-3430.svg`} />
        </div>
      </div>

      <div className="absolute left-1/2 top-[42px] flex w-[min(1280px,calc(100%_-_48px))] -translate-x-1/2 items-end justify-between max-[767px]:relative max-[767px]:left-auto max-[767px]:top-auto max-[767px]:mx-auto max-[767px]:w-full max-[767px]:translate-x-0 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-5" data-node-id="4064:13964">
        <div className="flex flex-col items-start gap-[14px]">
          <div className="flex items-center gap-[12px]">
            <div className="relative size-[14px] shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}logo.svg`} />
            </div>
            <p className="font-sans font-normal text-[16px] uppercase leading-[normal] text-white whitespace-nowrap">
              Running costs
            </p>
          </div>
          <p className="w-[552.26px] font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-white">
            Let’s do the maths
          </p>
        </div>
        <p className="w-[338.041px] font-sans text-[18px] font-normal leading-[normal] text-white">
          Put in how you drive today. We will show you what changes.
        </p>
      </div>

      <div className="absolute left-1/2 top-[183px] flex h-[491px] w-[min(1280px,calc(100%_-_48px))] -translate-x-1/2 items-center gap-[20px] max-[767px]:relative max-[767px]:left-auto max-[767px]:top-auto max-[767px]:mx-auto max-[767px]:mt-12 max-[767px]:h-auto max-[767px]:w-full max-[767px]:translate-x-0 max-[767px]:flex-col max-[767px]:items-stretch" data-node-id="4064:13972">
        {/* Savings summary + chart */}
        <div className="relative flex shrink-0 flex-col items-start gap-[24px] rounded-[12px] bg-[rgba(0,0,0,0.42)] p-[12px] backdrop-blur-[38.85px]">
          <div className="relative flex shrink-0 flex-col items-start justify-center gap-[4px] px-[20px] pt-[20px] leading-[1.15] whitespace-nowrap" data-node-id="4064:13974">
            <p className="font-display text-right text-[62px] font-semibold tracking-[-3.72px] text-white">
              {money(total)}
            </p>
            <p className="font-display text-center text-[16px] font-normal tracking-[-0.48px] text-[rgba(255,255,255,0.6)]">
              over {years} years
            </p>
          </div>
          <div className="relative flex h-[330px] shrink-0 items-start gap-[41px] overflow-clip rounded-[12px] bg-[rgba(255,255,255,0.02)] p-[42px] backdrop-blur-[101.3px]" data-node-id="4064:13977">
            <ChartColumn
              value={money(monthly)}
              label="A Month"
              nodes={{ text: "4064:13978", art: "4064:13982", contents: "4064:13983", mask: "4064:13985", line1: "4064:13986", line2: "4064:13987", line3: "4064:13988", line4: "4064:13989" }}
            />
            <ChartColumn
              value={money(yearly)}
              label="A Year"
              nodes={{ text: "4064:13990", art: "4064:13994", contents: "4064:13995", mask: "4064:13997", line1: "4064:13998", line2: "4064:13999", line3: "4064:14000", line4: "4064:14001" }}
            />
            <ChartColumn
              value={`${co2}t`}
              label="Less CO₂"
              nodes={{ text: "4064:14002", art: "4064:14006", contents: "4064:14007", mask: "4064:14009", line1: "4064:14010", line2: "4064:14011", line3: "4064:14012", line4: "4064:14013" }}
            />
            <div aria-hidden className="absolute left-1/2 top-[calc(50%+185.19px)] h-[267.273px] w-[1002.576px] -translate-x-1/2 -translate-y-1/2" data-node-id="4064:14014">
              <div className="absolute inset-[-51.37%_-13.69%]">
                <img alt="" className="block max-w-none size-full" src={`${A}ellipse-3435.svg`} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="relative flex min-w-px flex-1 flex-col items-start gap-[42px]">
          <div className="flex w-full flex-col items-start gap-[20px]">
            <p className="w-full font-sans text-[20px] font-medium leading-[1.15] tracking-[-0.4px] text-white">
              Select Vehicle
            </p>
            <div className="flex w-full items-start gap-[18px]">
              <button
                type="button"
                onClick={() => setVehicle("HiRANGE")}
                aria-pressed={vehicle === "HiRANGE"}
                className={`flex h-[70px] min-w-px flex-1 items-center gap-[15px] rounded-[16px] border border-solid p-[6px] ${
                  vehicle === "HiRANGE"
                    ? "border-[rgba(29,111,255,0.5)] bg-white"
                    : "border-[#00ff87] bg-[rgba(255,255,255,0.04)] opacity-60"
                }`}
                data-node-id="4064:14019"
              >
                <div className="relative size-[58px] shrink-0 rounded-[12px]" style={{ backgroundImage: "linear-gradient(94.13554258205404deg, rgb(0, 255, 135) 28.559%, rgb(29, 111, 255) 124.97%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                  <div className="absolute inset-[1.5px_1px] rounded-[8.008px]">
                    <img alt="" className="absolute inset-0 size-full max-w-none rounded-[8.008px] object-cover" src={`${A}vehicle-hirange.png`} />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-[6px] text-center leading-[1.15] text-[#121212] whitespace-nowrap">
                  <p className={`font-sans text-[16px] font-bold tracking-[-0.32px] ${vehicle === "HiRANGE" ? "text-[#121212]" : "text-white"}`}>HiRANGE</p>
                  <p className={`font-sans text-[12px] font-medium tracking-[-0.24px] ${vehicle === "HiRANGE" ? "text-[#121212]" : "text-white/70"}`}>1,200 kg</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setVehicle("HiCITY")}
                aria-pressed={vehicle === "HiCITY"}
                className={`flex h-[70px] min-w-px flex-1 items-center gap-[15px] rounded-[16px] border border-solid p-[6px] ${
                  vehicle === "HiCITY"
                    ? "border-[#00ff87] bg-[rgba(255,255,255,0.04)] opacity-100"
                    : "border-[#00ff87] bg-[rgba(255,255,255,0.04)] opacity-60"
                }`}
                data-node-id="4064:14025"
              >
                <div className="relative size-[58px] shrink-0 rounded-[12px] bg-white">
                  <div className="absolute inset-[-4px] rounded-[8.008px]">
                    <img alt="" className="absolute inset-0 size-full max-w-none rounded-[8.008px] object-cover" src={`${A}vehicle-hicity.png`} />
                  </div>
                </div>
                <p className="font-sans text-[16px] font-bold tracking-[-0.32px] text-white whitespace-nowrap">HiCITY</p>
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-[32px] rounded-[16px] bg-[rgba(255,255,255,0.04)] p-[24px]">
            <div className="flex h-[108px] w-full flex-col items-center gap-[24px] py-[8px]" data-name="Saving Container">
              <div className="flex w-full items-center justify-between text-center leading-[1.15] text-white whitespace-nowrap">
                <p className="font-sans text-[20px] font-medium tracking-[-0.4px]">How many kilometres driven per day?</p>
                <p className="font-sans text-[24px] font-bold tracking-[-0.48px]">{km} km</p>
              </div>
              <Slider label="Kilometres driven per day" min={0} max={200} value={km} onChange={setKm} fillPercent={kmPct} />
              <div className="flex w-full items-center justify-between font-sans text-[14px] font-bold tracking-[-0.28px] text-[#808080] whitespace-nowrap">
                <span>0 km</span>
                <span>200 km</span>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <div className="w-full rotate-180">
                <div className="relative h-0 w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={`${A}line-84.svg`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[108px] w-full flex-col items-center gap-[24px] py-[8px]" data-name="Saving Container">
              <div className="flex w-full items-center justify-between text-center leading-[1.15] text-white whitespace-nowrap">
                <p className="font-sans text-[20px] font-medium tracking-[-0.4px]">Ownership period (years)</p>
                <p className="font-sans text-[24px] font-bold tracking-[-0.48px]">{years} years</p>
              </div>
              <Slider label="Ownership period in years" min={1} max={10} value={years} onChange={setYears} fillPercent={yearsPct} />
              <div className="flex w-full items-center justify-between font-sans text-[14px] font-bold tracking-[-0.28px] text-[#808080] whitespace-nowrap">
                <span>1 year</span>
                <span>10 year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
