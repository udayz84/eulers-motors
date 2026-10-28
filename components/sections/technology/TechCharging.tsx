"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

const DOS = [
  "Charge conveniently at home or work whenever possible.",
  "Always use verified and compatible charging points.",
  "Plan your charging stops before the battery runs low.",
];

const DONTS = [
  "Avoid using unsuitable sockets or unverified charging setups.",
  "Never wait until the battery is completely empty.",
  "Don't skip planning your route around charging points.",
];

/**
 * TECHNOLOGY page — "Charging / Where Will I Charge?" (Figma 3009:11504, 393px width).
 */
export default function TechCharging() {
  const [chargingMode, setChargingMode] = useState<"home" | "public">("public");

  return (
    <section className="bg-white py-10 lg:py-16" aria-label="Charging">
      {/* Mobile view (< 768px) */}
      <div className="relative mx-auto w-full max-w-[480px] overflow-hidden px-4 md:hidden">
        {/* Header container */}
        <div className="flex flex-col items-start gap-3 pt-2">
          <Eyebrow label="Charging" />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink">
            Where Will I Charge?
          </h2>
          <p className="w-full font-sans text-[13px] font-normal leading-normal text-ink">
            Different businesses have different needs. Choose the charging setup that works best for
            your operations.
          </p>
        </div>

        {/* Home / Public segmented control */}
        <div className="mx-auto mt-5 flex h-[48px] w-[213px] items-center justify-center relative">
          <div className="pointer-events-none absolute -bottom-5 left-1/2 z-0 h-[60px] w-[253px] -translate-x-1/2 backdrop-blur-[26px]">
            <img
              src={`${A}/charge__imgRectangle42188.svg`}
              alt=""
              className="absolute inset-[0_2.36%] h-full w-auto rotate-180"
            />
          </div>
          <div className="relative z-20 flex h-8 w-[170px] translate-y-[7px] items-center">
            <button
              type="button"
              aria-label="Charge at home"
              aria-pressed={chargingMode === "home"}
              onClick={() => setChargingMode("home")}
              data-active={chargingMode === "home"}
              className={`pointer-events-auto flex h-full w-[77px] touch-manipulation items-center justify-center rounded-full border-[0.5px] border-white px-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6fff] ${chargingMode === "home" ? "text-white shadow-sm" : "bg-transparent text-ink"}`}
              style={chargingMode === "home" ? { backgroundImage: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%)", backgroundColor: "#121212" } : undefined}
            >
              <span className={`text-[12px] font-semibold leading-none ${chargingMode === "home" ? "text-white" : "text-ink"}`}>Home</span>
            </button>
            <button
              type="button"
              aria-label="Charge in public"
              aria-pressed={chargingMode === "public"}
              onClick={() => setChargingMode("public")}
              data-active={chargingMode === "public"}
              className={`pointer-events-auto flex h-full flex-1 touch-manipulation items-center justify-center rounded-full border-[0.4px] border-white px-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6fff] ${chargingMode === "public" ? "shadow-sm" : "bg-transparent"}`}
              style={chargingMode === "public" ? { backgroundImage: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%)", backgroundColor: "#121212" } : undefined}
            >
              <span className={`text-[12px] font-semibold leading-none ${chargingMode === "public" ? "text-white" : "text-ink"}`}>Public</span>
            </button>
          </div>
        </div>

        {/* Showcase card */}
        <div className="relative z-10 mx-auto mt-5 w-full overflow-hidden rounded-[20px] bg-gradient-to-b from-[#f8fafc] to-[#eef2f8] p-4 shadow-sm border border-[#E2E6EE]">
          {/* Top image illustration */}
          <div className="relative h-[200px] w-full overflow-hidden rounded-[14px] bg-white border border-[#E2E6EE] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-4">
            <img
              src={`${A}/charge__imgRectangle1618873364.png`}
              alt={`${chargingMode === "home" ? "Home" : "Public"} charging station preview`}
              className="absolute left-[14.5%] top-[12%] h-[88%] w-[71%] object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-5">
            {/* Two interactive feature action tiles */}
            <div className="grid grid-cols-2 w-full gap-2.5">
              <Link
                href="/products"
                className="group flex flex-col justify-between gap-3 rounded-[14px] border border-[#E2E6EE] bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-[#1D6FFF] hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0E2F6D] to-[#1D6FFF] text-white shadow-sm">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#f1f4f9] text-[#0E2F6D] group-hover:bg-[#1D6FFF] group-hover:text-white transition-colors">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 12L10 8L6 4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[13px] font-semibold text-ink leading-tight group-hover:text-[#1D6FFF] transition-colors">How it works</p>
                  <p className="mt-1 text-[11px] text-neutral-500 font-medium">Find on app</p>
                </div>
              </Link>

              <Link
                href="/charging-stations"
                className="group flex flex-col justify-between gap-3 rounded-[14px] border border-[#E2E6EE] bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-[#1D6FFF] hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0E2F6D] to-[#1D6FFF] text-white shadow-sm">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#f1f4f9] text-[#0E2F6D] group-hover:bg-[#1D6FFF] group-hover:text-white transition-colors">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 12L10 8L6 4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[13px] font-semibold text-ink leading-tight group-hover:text-[#1D6FFF] transition-colors">Stations</p>
                  <p className="mt-1 text-[11px] text-neutral-500 font-medium">Find a point</p>
                </div>
              </Link>
            </div>

            {/* Do's and Don'ts Lists */}
            <div className="flex w-full flex-col gap-6">
              {/* RECOMMENDED DO'S CARD */}
              <div className="flex w-full flex-col items-start">
                {/* Slanted blue tab */}
                <div className="relative z-10 -mb-px ml-3 flex h-[34px] w-[80px] items-center justify-start pl-3">
                  <svg
                    width="184"
                    height="34"
                    viewBox="0 0 184 48.328"
                    preserveAspectRatio="none"
                    fill="none"
                    className="absolute inset-0 size-full"
                  >
                    <defs>
                      <linearGradient id="dos_grad" x1="0" y1="0" x2="184" y2="48" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0E2F6D" />
                        <stop offset="1" stopColor="#1D6FFF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 12C0 5.37258 5.37258 0 12 0H155.871C160.726 0 165.103 2.92537 166.959 7.41136L183.892 48.3281H0V12Z"
                      fill="url(#dos_grad)"
                    />
                  </svg>
                  <span className="relative z-10 whitespace-nowrap text-left font-sans text-[14px] font-bold uppercase leading-none tracking-[0.7px] text-white">
                    Do&apos;s
                  </span>
                </div>

                {/* White card */}
                <div className="relative w-full rounded-[14px] rounded-tl-none bg-white p-4 shadow-sm flex flex-col gap-3.5 border border-[#E4E6EA]">
                  {DOS.map((text, idx) => (
                    <Fragment key={text}>
                      {idx > 0 && <div className="h-[1px] w-full bg-[#EAECEF]" />}
                      <div className="flex w-full items-center gap-3">
                        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#EBF2FE]">
                          <svg width="18" height="18" viewBox="0 0 18.17 18.17" fill="none" className="shrink-0">
                            <path
                              d="M13.25 1.86485C12.0243 1.15581 10.6012 0.75 9.08333 0.75C4.48096 0.75 0.75 4.48096 0.75 9.08333C0.75 13.6857 4.48096 17.4167 9.08333 17.4167C13.6857 17.4167 17.4167 13.6857 17.4167 9.08333C17.4167 8.51256 17.3593 7.95518 17.25 7.41667"
                              stroke="#0E2F6D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M5.75 9.5C5.75 9.5 7 9.5 8.66667 12.4167C8.66667 12.4167 13.299 4.77778 17.4167 3.25"
                              stroke="#0E2F6D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="flex-1 font-sans text-[13.5px] font-semibold leading-[1.35] tracking-[-0.2px] text-[#121212]">
                          {text}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* AVOID DON'TS CARD */}
              <div className="flex w-full flex-col items-end">
                {/* Slanted red tab on the right */}
                <div className="relative z-10 -mb-px mr-3 flex h-[34px] w-[92px] items-center justify-end pr-3">
                  <svg
                    width="135"
                    height="34"
                    viewBox="0 0 135 48.328"
                    preserveAspectRatio="none"
                    fill="none"
                    className="absolute inset-0 size-full scale-x-[-1]"
                  >
                    <defs>
                      <linearGradient id="donts_grad" x1="0" y1="0" x2="135" y2="48" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9C1818" />
                        <stop offset="1" stopColor="#F96060" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 12C0 5.37258 5.37258 0 12 0L106.871 0C111.726 0 116.103 2.92537 117.959 7.41136L134.892 48.3281H0V12Z"
                      fill="url(#donts_grad)"
                    />
                  </svg>
                  <span className="relative z-10 whitespace-nowrap text-right font-sans text-[14px] font-bold uppercase leading-none tracking-[0.7px] text-white">
                    Don&apos;ts
                  </span>
                </div>

                {/* White card */}
                <div className="relative w-full rounded-[14px] rounded-tr-none bg-white p-4 shadow-sm flex flex-col gap-3.5 border border-[#E4E6EA]">
                  {DONTS.map((text, idx) => (
                    <Fragment key={text}>
                      {idx > 0 && <div className="h-[1px] w-full bg-[#EAECEF]" />}
                      <div className="flex w-full items-center gap-3">
                        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#FEECEB]">
                          <svg width="18" height="18" viewBox="0 0 18.17 18.17" fill="none" className="shrink-0">
                            <path
                              d="M11.5828 11.5833L9.08333 9.0836M9.08333 9.0836L6.58333 6.58333M9.08333 9.0836L6.58387 11.5833M9.08333 9.0836L11.5833 6.58333"
                              stroke="#F00606"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.4167 9.08333C17.4167 4.48096 13.6857 0.75 9.08333 0.75C4.48096 0.75 0.75 4.48096 0.75 9.08333C0.75 13.6857 4.48096 17.4167 9.08333 17.4167C13.6857 17.4167 17.4167 13.6857 17.4167 9.08333Z"
                              stroke="#F00606"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <p className="flex-1 font-sans text-[13.5px] font-semibold leading-[1.35] tracking-[-0.2px] text-[#121212]">
                          {text}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop & Tablet charging guide */}
      <div className="mx-auto hidden w-full max-w-[1440px] flex-col gap-8 px-6 py-10 md:flex md:gap-10 md:px-10 lg:gap-[62px] lg:px-[80px] lg:py-[101px]">
        <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[534px] flex-col items-start justify-center gap-3 md:gap-4">
            <div className="relative flex h-[21px] items-center gap-[6px]">
              <img src={`${A}/charging-eyebrow-mark.svg`} alt="" className="relative z-10" />
              <img src={`${A}/charging-eyebrow-line.svg`} alt="" className="absolute left-[3.43px] top-0" />
              <span className="relative z-10 text-[14px] font-bold uppercase tracking-[0.7px] text-navy">Charging</span>
            </div>
            <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink md:text-[42px] md:tracking-[-0.84px] lg:text-[52px] lg:tracking-[-1.04px]">
              Where Will I Charge?
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end md:justify-end md:gap-5">
            <p className="max-w-[405px] text-[14px] leading-normal text-ink md:text-[15px] lg:text-[16px]">
              Different businesses have different needs. Choose the charging setup that works best for your operations.
            </p>
            <div className="flex items-center gap-3" role="group" aria-label="Charging setup">
              <button
                type="button"
                aria-pressed={chargingMode === "home"}
                data-active={chargingMode === "home"}
                onClick={() => setChargingMode("home")}
                className={`flex h-[42px] w-[100px] items-center justify-center rounded-full border-[0.5px] border-white px-4 text-[16px] font-semibold leading-none cursor-pointer transition-all ${chargingMode === "home" ? "text-white shadow-sm" : "bg-[#f3f4f5] text-ink hover:bg-[#e8ebf0]"}`}
                style={chargingMode === "home" ? { backgroundImage: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%)", backgroundColor: "#121212" } : undefined}
              >
                Home
              </button>
              <button
                type="button"
                aria-pressed={chargingMode === "public"}
                data-active={chargingMode === "public"}
                onClick={() => setChargingMode("public")}
                className={`flex h-[42px] w-[100px] items-center justify-center rounded-full border-[0.5px] border-white px-4 text-[16px] font-semibold leading-none cursor-pointer transition-all ${chargingMode === "public" ? "text-white shadow-sm" : "bg-[#f3f4f5] text-ink hover:bg-[#e8ebf0]"}`}
                style={chargingMode === "public" ? { backgroundImage: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%)", backgroundColor: "#121212" } : undefined}
              >
                Public
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Container */}
        <div className="flex w-full flex-col items-center justify-center gap-8 rounded-[20px] border border-[#E2E6EE] bg-gradient-to-b from-[#f8fafc] to-[#eef2f8] p-6 shadow-sm md:p-8 xl:flex-row xl:gap-8 xl:p-10">
          <div className="flex w-full max-w-[460px] shrink-0 flex-col items-start justify-center gap-5">
            {/* Top illustration container */}
            <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] bg-white border border-[#E2E6EE] shadow-[0_2px_12px_rgba(0,0,0,0.03)] md:h-[240px]">
              <img
                src={`${A}/charge__imgRectangle1618873364.png`}
                alt="Public charging station"
                className="absolute left-[14.45%] top-[11.87%] h-[88.13%] w-[71.1%] object-contain"
              />
            </div>

            {/* Two interactive feature action tiles */}
            <div className="grid grid-cols-2 w-full gap-3.5">
              <Link
                href="/products"
                className="group flex flex-col justify-between gap-4 rounded-[16px] border border-[#E2E6EE] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#1D6FFF] hover:shadow-[0_8px_24px_rgba(29,111,255,0.12)] transition-all duration-300"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E2F6D] to-[#1D6FFF] text-white shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#f1f4f9] text-[#0E2F6D] group-hover:bg-[#1D6FFF] group-hover:text-white transition-colors duration-200">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 12L10 8L6 4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[16px] font-semibold text-ink leading-tight group-hover:text-[#1D6FFF] transition-colors">How it works</p>
                  <p className="mt-1 text-[13px] font-medium text-neutral-500">Find it on the app</p>
                </div>
              </Link>

              <Link
                href="/charging-stations"
                className="group flex flex-col justify-between gap-4 rounded-[16px] border border-[#E2E6EE] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#1D6FFF] hover:shadow-[0_8px_24px_rgba(29,111,255,0.12)] transition-all duration-300"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E2F6D] to-[#1D6FFF] text-white shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#f1f4f9] text-[#0E2F6D] group-hover:bg-[#1D6FFF] group-hover:text-white transition-colors duration-200">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 12L10 8L6 4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[16px] font-semibold text-ink leading-tight group-hover:text-[#1D6FFF] transition-colors">Charging stations</p>
                  <p className="mt-1 text-[13px] font-medium text-neutral-500">Find a charging point</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Do's and Don'ts Checklist */}
          <div className="flex w-full flex-col sm:flex-row shrink-0 items-center justify-center gap-5 xl:w-auto">
            <ChargingList title="Do's" kind="do" items={DOS} />
            <ChargingList title="Don'ts" kind="dont" items={DONTS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChargingList({ title, kind, items }: { title: string; kind: "do" | "dont"; items: string[] }) {
  return (
    <div className="flex w-[320px] sm:w-[323px] flex-col items-start gap-[11px]">
      <div className="relative flex h-[32px] w-full items-center px-5">
        <img aria-hidden src={`${A}/charging-${kind === "do" ? "dos" : "donts"}-tab.svg`} alt="" className="absolute left-[10px] top-[-5.53px]" />
        <span className="relative z-10 text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-white">{title}</span>
      </div>
      <div className="flex w-full flex-col gap-[14px] rounded-[16px] border border-[#E2E6EE] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        {items.map((item, index) => (
          <Fragment key={item}>
            {index > 0 && <img aria-hidden src={`${A}/charging-divider.svg`} alt="" className="block opacity-70" />}
            <div className="flex w-full items-center gap-3.5 group cursor-default">
              <span className={`flex size-[42px] shrink-0 items-center justify-center rounded-[18px] p-[6px] transition-transform group-hover:scale-105 ${kind === "do" ? "bg-[rgba(212,219,236,0.4)]" : "bg-[rgba(240,6,6,0.1)]"}`}>
                <img aria-hidden src={`${A}/charging-${kind === "do" ? "check" : "cross"}.svg`} alt="" />
              </span>
              <p className="min-w-0 flex-1 text-[14px] font-semibold leading-[1.4] tracking-[-0.28px] text-ink">{item}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
