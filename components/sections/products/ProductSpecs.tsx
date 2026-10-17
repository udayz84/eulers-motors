"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const ASSET = "/assets/products/";

/** Spec tabs — Figma 3241:17171; only the Features state exists in the design */
const TABS = ["Battery", "Dimensions", "Performance", "Features", "Safety", "Comfort"];

/** Features tab rows — Figma 3241:17072 */
const FEATURES = [
  { icon: "spec-ic-phone.svg", label: "Telematics", value: "Shepherd app, included" },
  { icon: "spec-ic-location.svg", label: "Live location", value: "Yes" },
  { icon: "spec-ic-charge.svg", label: "State of charge on phone", value: "Yes" },
  { icon: "spec-ic-analytics.svg", label: "Driver score", value: "Yes" },
  { icon: "spec-ic-bell.svg", label: "Service alerts", value: "Predictive" },
  { icon: "spec-ic-clock.svg", label: "Trip history", value: "12 months" },
  { icon: "spec-ic-target.svg", label: "Geofencing", value: "Yes" },
  { icon: "spec-ic-doc.svg", label: "Fleet API", value: "On request" },
];

/**
 * /products specifications — Figma 3245:17543. Section px-79/py-48, header row
 * (badge + h2 / spec-sheet CTA), then a rounded-12 #e5ebf3/60 panel with the
 * centered tab pill row overlapping its top edge (pt-89 clears it), the
 * spec list and the 557×424 photo split by a hairline.
 */
export default function ProductSpecs() {
  const [activeTab, setActiveTab] = useState("Features");

  return (
    <section aria-label="Specifications" className="flex w-full flex-col items-center gap-5 bg-surface px-5 py-[42px] xl:bg-white xl:px-0 xl:py-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 xl:gap-[42px] xl:px-[79px]">
        <div className="flex w-full items-end justify-between gap-5 max-xl:flex-col max-xl:items-start">
          <div className="flex flex-col items-start justify-center gap-[14px] self-stretch xl:gap-4 xl:self-auto">
            <div className="relative flex h-4 items-center gap-1 xl:h-6 xl:gap-1.5 xl:py-1">
              <Image src={`${ASSET}spec-badge-left.svg`} alt="" aria-hidden width={149} height={20} className="absolute left-[3px] top-1/2 h-4 w-[117px] -translate-y-1/2 xl:h-5 xl:w-[149px]" />
              <Image src={`${ASSET}spec-badge-icon.svg`} alt="" aria-hidden width={18.821} height={20.355} className="relative h-4 w-[14.8px] xl:h-[20.355px] xl:w-[18.821px]" />
              <p className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-none tracking-[0.6px] text-navy xl:text-[14px] xl:tracking-[0.7px]">Specifications</p>
            </div>
            <h2 className="w-full font-display text-[28px] font-semibold not-italic leading-[115%] tracking-[-0.56px] text-ink sm:text-[32px] sm:tracking-[-0.64px] xl:whitespace-nowrap xl:text-[52px] xl:tracking-[-1.04px]">
              Know Your Vehicle Better
            </h2>
          </div>
          <Button className="max-xl:hidden">Download Spec sheet</Button>
        </div>

        {/* Tab pills + spec content — mobile: scrolling pill row on the surface,
            desktop: pills tucked into the card's top notch */}
        <div className="relative isolate flex w-full max-w-[1282px] flex-col items-center gap-5 xl:block">
          <div className="relative z-10 mt-2.5 flex w-full flex-row flex-nowrap items-center gap-2 overflow-x-auto scrollbar-none xl:absolute xl:left-1/2 xl:top-[11.54px] xl:mt-0 xl:w-auto xl:-translate-x-1/2 xl:gap-0 xl:overflow-visible">
            {TABS.map((tab) => {
              const active = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={active}
                  className={
                    active
                      ? "flex h-[34px] shrink-0 items-center justify-center gap-2 rounded-[400px] border-[0.4px] border-solid border-white px-3 font-sans text-[12px] font-semibold leading-none text-white xl:h-[42px] xl:border-[0.5px] xl:px-4 xl:text-[16px]"
                      : "flex h-[34px] shrink-0 items-center justify-center gap-2 rounded-[400px] bg-[rgba(204,204,204,0.32)] px-3 font-sans text-[12px] font-semibold leading-none text-ink xl:h-[42px] xl:bg-transparent xl:px-4 xl:text-[16px]"
                  }
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #121212",
                        }
                      : undefined
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative isolate flex w-full items-center gap-[42px] overflow-clip rounded-[12px] bg-[rgba(229,235,243,0.6)] px-[42px] pb-[42px] pt-[89px] max-xl:flex-col max-xl:items-stretch max-xl:gap-0 max-xl:rounded-none max-xl:bg-transparent max-xl:px-0 max-xl:pb-0 max-xl:pt-0">
          {/* solid-white inner card art with cutout for tabs — desktop */}
          <div className="pointer-events-none absolute inset-x-[12.5px] top-[11.54px] bottom-[10.3px] -z-10 hidden xl:block">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1257 533.156"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                id="Subtract"
                d="M1257 521.156C1257 527.784 1251.63 533.156 1245 533.156H12C5.37256 533.156 0 527.784 0 521.156V12C0 5.37259 5.37258 0 12 0H288.021C293.001 0 297.463 3.07546 299.236 7.72905L312.402 42.3002C314.174 46.9538 318.637 50.0293 323.616 50.0293H911.384C916.363 50.0293 920.826 46.9538 922.598 42.3002L935.764 7.72905C937.537 3.07546 941.999 0 946.979 0H1245C1251.63 0 1257 5.37258 1257 12V521.156Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="flex min-w-px flex-1 flex-col gap-1.5 max-xl:relative max-xl:z-10 max-xl:order-2 max-xl:-mt-16 xl:gap-3 xl:pt-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={
                  i > 0
                    ? "flex h-8 w-full items-center justify-between overflow-clip border-t border-solid border-[#ccc]/60 px-0.5 py-1 xl:h-auto xl:pt-3"
                    : "flex h-8 w-full items-center justify-between overflow-clip px-0.5 py-1 xl:h-auto xl:pt-3"
                }
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[3.25px] bg-[#eff3f8] xl:size-8 xl:rounded-[4px]">
                    <Image src={`${ASSET}${f.icon}`} alt="" aria-hidden width={20} height={20} />
                  </span>
                  <p className="whitespace-nowrap text-center font-sans text-[12px] font-bold capitalize leading-normal text-ink xl:text-[16px]">{f.label}</p>
                </div>
                <p className="whitespace-nowrap text-center font-sans text-[12px] font-bold capitalize leading-normal text-ink xl:text-[16px]">{f.value}</p>
              </div>
            ))}
          </div>

          <div aria-hidden className="w-px shrink-0 self-stretch bg-[#ccc]/60 max-xl:hidden" />

          <div className="w-[557px] shrink-0 self-stretch max-xl:order-1 max-xl:w-full">
            <div className="relative aspect-[353/320.99] w-full overflow-hidden rounded-[12px] xl:aspect-auto xl:h-full">
              <Image
                src={`${ASSET}spec-image.png`}
                alt="Storm EV LR 200 cabin and controls"
                width={557}
                height={424}
                className="h-full w-full object-cover max-xl:[mask-image:linear-gradient(180deg,black_35%,rgba(0,0,0,0.65)_60%,transparent_82%)] xl:absolute xl:inset-0"
              />
            </div>
          </div>
          </div>
        </div>

        <Button className="xl:hidden max-xl:h-11 max-xl:w-auto max-xl:px-5">Download Spec sheet</Button>
      </div>
    </section>
  );
}
