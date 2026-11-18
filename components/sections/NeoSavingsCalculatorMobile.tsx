/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

/**
 * Saving Calculator — Figma node 4064:15979 (mobile, 393 × 808).
 * Mirrors the desktop calculator with mobile-specific spacing and assets.
 */

const A = "/assets/neo/savings-calculator/mobile/";

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
    maskSize: "77.041px 204.602px",
    WebkitMaskSize: "77.041px 204.602px",
    maskPosition: "9.762px 49.307px",
    WebkitMaskPosition: "9.762px 49.307px",
  };

  return (
    <div className="relative flex w-[77.673px] shrink-0 flex-col items-start gap-[10.674px]" data-node-id={nodes.text}>
      <div className="flex w-full flex-col items-start justify-center gap-[3.157px] leading-[normal] text-white">
        <p className="font-display text-[16px] font-bold not-italic tracking-[-0.64px] whitespace-nowrap">{value}</p>
        <p className="w-[71.358px] font-sans text-[12px] font-normal tracking-[0.48px]">{label}</p>
      </div>
      <div className="relative h-[231.123px] w-[77.673px] shrink-0" data-node-id={nodes.art}>
        <div className="absolute contents left-[0.63px] top-[26.54px]" data-node-id={nodes.contents}>
          <div
            aria-hidden
            className="absolute left-[-9.13px] top-[-22.77px] h-[253.085px] w-[96.402px] mask-alpha mask-intersect mask-no-clip mask-no-repeat"
            data-node-id={nodes.mask}
            style={maskStyle}
          >
            <img alt="" className="absolute inset-0 block max-w-none size-full" height={253.085} src={`${A}chart-fill.png`} width={96.402} />
          </div>
        </div>
        <div className="absolute left-[0.46px] top-[1.86px] h-[109.247px] w-0" data-node-id={nodes.line1}>
          <div className="absolute inset-[-1.65%_-1.8px_-0.31%_-1.8px]">
            <img alt="" className="block max-w-none size-full" src={`${A}vector-164.svg`} />
          </div>
        </div>
        <div className="absolute left-[38.5px] top-[27.06px] flex h-[104.067px] w-[0.57px] items-center justify-center" data-node-id={nodes.line2}>
          <div className="flex-none rotate-[0.23deg] skew-x-[-0.08deg]">
            <div className="relative h-[104.069px] w-0">
              <div className="absolute inset-[-0.33%_-0.34px]">
                <img alt="" className="block max-w-none size-full" src={`${A}vector-165.svg`} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[77.82px] top-[50.65px] h-[74.198px] w-0" data-node-id={nodes.line3}>
          <div className="absolute inset-[-0.46%_-0.34px]">
            <img alt="" className="block max-w-none size-full" src={`${A}vector-166.svg`} />
          </div>
        </div>
        <div className="absolute left-[0.32px] top-[26.85px] h-[23.388px] w-[77.503px]" data-node-id={nodes.line4}>
          <div className="absolute inset-[-4.34%_-1.31%]">
            <img alt="" className="block max-w-none size-full" src={`${A}vector-167.svg`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSlider({
  label,
  value,
  min,
  max,
  fillPercent,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  fillPercent: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="relative h-[12px] w-[min(346px,calc(100vw_-_47px))] shrink-0 rounded-[11.429px]">
      <img
        alt=""
        aria-hidden="true"
        width={346}
        height={11.4286}
        className="pointer-events-none absolute left-0 top-1/2 z-[10] h-[11.429px] w-full -translate-y-1/2 max-w-none"
        src={`${A}line-92.svg`}
      />
      <div
        className="absolute top-[calc(50%+0.27px)] z-0 h-[12px] overflow-clip -translate-y-1/2 transition-[width] duration-75 ease-out"
        style={{
          width: `${fillPercent}%`,
          backgroundImage: "linear-gradient(90deg, rgb(3, 14, 25) 0%, rgb(24, 136, 234) 93.72%), linear-gradient(89.99999976805947deg, rgb(9, 28, 61) 0%, rgb(29, 111, 255) 83.874%)",
        }}
      >
        <div className="absolute right-[5.71px] top-[-4.32px] h-[22.072px] w-[16.75px] rounded-bl-[12.571px] rounded-tl-[12px] bg-[#1d6fff] blur-[3.171px]" />
        <div className="absolute left-[63.66px] top-0 h-[13.432px] w-[10.193px] rounded-bl-[12.571px] rounded-tl-[12px] bg-[#befae9] blur-[3.171px]" />
      </div>
      <div
        className="absolute top-[calc(50%+0.27px)] z-[20] flex h-[18px] w-[24px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[1.8px] overflow-clip rounded-[4.5px] border-[1.125px] border-solid border-[#00ff87] px-[2.7px] py-[1.8px] transition-[left] duration-75 ease-out"
        style={{ left: `${fillPercent}%` }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[4.5px] bg-[#121212]" />
        <div className="relative h-[7.875px] w-[0.9px] shrink-0 rounded-[18px] bg-[#ccc]" />
        <div className="relative h-[7.875px] w-[0.9px] shrink-0 rounded-[18px] bg-[#ccc]" />
        <div className="relative h-[7.875px] w-[0.9px] shrink-0 rounded-[18px] bg-[#ccc]" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_6.75px_0px_#1a62e3]" />
      </div>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        className="absolute -top-[10px] left-0 z-[30] h-[32px] w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export default function NeoSavingsCalculatorMobile() {
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
      className="relative flex w-full flex-col items-center gap-[34px] px-[10px] pb-[20px] pt-[42px] min-[768px]:max-[1023px]:gap-10 min-[768px]:max-[1023px]:px-8 min-[768px]:max-[1023px]:pb-10 min-[768px]:max-[1023px]:pt-12"
      data-node-id="4064:15979"
      data-name="Euler - UI Mobile"
      style={{ backgroundImage: "linear-gradient(90deg, rgb(18, 18, 18) 0%, rgb(18, 18, 18) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}
    >
      <div className="flex w-full max-w-[353px] shrink-0 flex-col items-start gap-[12px] min-[768px]:max-[1023px]:max-w-[760px]" data-node-id="4064:15980">
        <div className="flex items-center gap-[6px]">
          <div className="relative size-[14px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}logo.svg`} />
          </div>
          <p className="font-sans text-[12px] font-normal uppercase leading-[normal] text-white whitespace-nowrap">Running costs</p>
        </div>
        <p className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white whitespace-nowrap min-[768px]:max-[1023px]:text-[36px]">Let&apos;s do the maths</p>
        <p className="w-full max-w-[332.967px] font-sans text-[12px] font-normal leading-[normal] text-white min-[768px]:max-[1023px]:max-w-[650px] min-[768px]:max-[1023px]:text-[14px]">Put in how you drive today. We will show you what changes.</p>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center gap-[24px] min-[768px]:max-[1023px]:max-w-[760px]" data-node-id="4064:15987">
        <div className="flex w-full max-w-[373px] shrink-0 flex-col items-center gap-[24px] min-[768px]:max-[1023px]:max-w-[760px] min-[768px]:max-[1023px]:grid min-[768px]:max-[1023px]:grid-cols-2 min-[768px]:max-[1023px]:items-start min-[768px]:max-[1023px]:gap-4">
          <div className="flex w-full max-w-[353px] shrink-0 flex-col items-start gap-[20px] min-[768px]:max-[1023px]:col-span-2 min-[768px]:max-[1023px]:max-w-none">
            <p className="w-full font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-white">Select Vehicle</p>
            <div className="flex w-full items-start gap-[18px] min-[768px]:max-[1023px]:justify-center">
              <button
                type="button"
                onClick={() => setVehicle("HiRANGE")}
                aria-pressed={vehicle === "HiRANGE"}
                className={`flex h-[58px] w-[167.5px] shrink-0 items-center gap-[15px] rounded-[4px] border border-solid p-[4px] ${vehicle === "HiRANGE" ? "border-[rgba(29,111,255,0.5)] bg-white" : "border-[#00ff87] bg-[rgba(255,255,255,0.04)] opacity-60"}`}
              >
                <div className="relative size-[48px] shrink-0 rounded-[4px]" style={{ backgroundImage: "linear-gradient(94.13554258205404deg, rgb(0, 255, 135) 28.559%, rgb(29, 111, 255) 124.97%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                  <div className="absolute inset-[1.24px_0.83px] rounded-[6.627px]">
                    <img alt="" className="absolute inset-0 size-full max-w-none rounded-[6.627px] object-cover" src={`${A}vehicle-hirange.png`} />
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
                className={`flex h-[58px] w-[167.5px] shrink-0 items-center gap-[15px] rounded-[4px] border border-solid border-[#00ff87] bg-[rgba(255,255,255,0.04)] p-[4px] ${vehicle === "HiCITY" ? "opacity-100" : "opacity-60"}`}
              >
                <div className="relative size-[48px] shrink-0 rounded-[4px] bg-white">
                  <img alt="" className="absolute inset-0 size-full max-w-none rounded-[4px] object-cover" src={`${A}vehicle-hicity.png`} />
                </div>
                <p className="font-sans text-[16px] font-bold tracking-[-0.32px] text-white whitespace-nowrap">HiCITY</p>
              </button>
            </div>
          </div>

          <div className="flex w-full max-w-[373px] shrink-0 flex-col items-center gap-[12px] rounded-[8px] bg-[rgba(255,255,255,0.04)] p-[12px] min-[768px]:max-[1023px]:max-w-none min-[768px]:max-[1023px]:p-5">
            <div className="flex w-full flex-col items-start justify-center gap-[8px]">
              <div className="flex w-full items-center justify-between leading-[1.15] text-white whitespace-nowrap">
                <p className="font-sans text-[14px] font-medium tracking-[-0.28px]">How many kilometres driven per day?</p>
                <p className="font-sans text-[18px] font-bold text-center tracking-[-0.36px]">{km} km</p>
              </div>
              <MobileSlider label="Kilometres driven per day" min={0} max={200} value={km} onChange={setKm} fillPercent={kmPct} />
              <div className="flex w-full items-center justify-between font-sans text-[12px] font-bold tracking-[-0.24px] text-[#808080] whitespace-nowrap">
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
            <div className="flex w-full flex-col items-start justify-center gap-[8px]">
              <div className="flex w-full items-center justify-between leading-[1.15] text-white whitespace-nowrap">
                <p className="font-sans text-[14px] font-medium tracking-[-0.28px]">Ownership period (years)</p>
                <p className="font-sans text-[18px] font-bold text-center tracking-[-0.36px]">{years} years</p>
              </div>
              <MobileSlider label="Ownership period in years" min={1} max={10} value={years} onChange={setYears} fillPercent={yearsPct} />
              <div className="flex w-full items-center justify-between font-sans text-[12px] font-bold tracking-[-0.24px] text-[#808080] whitespace-nowrap">
                <span>1 year</span>
                <span>10 year</span>
              </div>
            </div>
          </div>

          <div className="relative h-[310.059px] w-full max-w-[373px] shrink-0 min-[768px]:max-[1023px]:max-w-none" data-node-id="4064:16037">
            <div aria-hidden className="absolute bottom-[51.78px] right-[71.73px] h-[167.94px] w-[190.016px]" data-node-id="4064:16038">
              <div className="absolute inset-[-69.07%_-61.05%]">
                <img alt="" className="block max-w-none size-full" src={`${A}ellipse-3433.svg`} />
              </div>
            </div>
            <div aria-hidden className="absolute bottom-[117.04px] right-[149.15px] h-[153.527px] w-[163.061px]" data-node-id="4064:16039">
              <div className="absolute inset-[-75.56%_-71.14%]">
                <img alt="" className="block max-w-none size-full" src={`${A}ellipse-3430.svg`} />
              </div>
            </div>
            <div className="absolute left-0 top-0 flex w-full flex-col items-start gap-[15.156px] rounded-[7.578px] bg-[rgba(0,0,0,0.42)] p-[7.578px] backdrop-blur-[24.533px]" data-node-id="4064:16040">
              <div className="relative flex shrink-0 flex-col items-start justify-center gap-[2.526px] px-[12.63px] pt-[12.63px] leading-[1.15] whitespace-nowrap">
                <p className="font-display text-right text-[36px] font-semibold tracking-[-2.16px] text-white">{money(total)}</p>
                <p className="font-display text-center text-[12px] font-normal tracking-[-0.36px] text-[rgba(255,255,255,0.6)]">over {years} years</p>
              </div>
              <div className="relative flex h-[208.39px] w-full shrink-0 items-start justify-between overflow-clip rounded-[7.578px] bg-[rgba(255,255,255,0.02)] p-[26.522px] backdrop-blur-[63.969px]" data-node-id="4064:16044">
                <ChartColumn value={money(monthly)} label="A Month" nodes={{ text: "4064:16045", art: "4064:16049", contents: "4064:16050", mask: "4064:16052", line1: "4064:16053", line2: "4064:16054", line3: "4064:16055", line4: "4064:16056" }} />
                <ChartColumn value={money(yearly)} label="A Year" nodes={{ text: "4064:16057", art: "4064:16061", contents: "4064:16062", mask: "4064:16064", line1: "4064:16065", line2: "4064:16066", line3: "4064:16067", line4: "4064:16068" }} />
                <ChartColumn value={`${co2}t`} label="Less CO2" nodes={{ text: "4064:16069", art: "4064:16073", contents: "4064:16074", mask: "4064:16076", line1: "4064:16077", line2: "4064:16078", line3: "4064:16079", line4: "4064:16080" }} />
                <div aria-hidden className="absolute left-1/2 top-[calc(50%+116.94px)] h-[168.779px] w-[633.112px] -translate-x-1/2 -translate-y-1/2" data-node-id="4064:16081">
                  <div className="absolute inset-[-51.37%_-13.69%]">
                    <img alt="" className="block max-w-none size-full" src={`${A}ellipse-3435.svg`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
