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
    <section aria-label="Specifications" className="flex w-full flex-col items-center gap-5 bg-surface px-5 sm:px-8 py-[42px] sm:py-12 lg:bg-white lg:px-0 lg:py-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 lg:gap-[42px] lg:px-[79px]">
        <div className="flex w-full items-end justify-between gap-5 max-lg:flex-col max-lg:items-start">
          <div className="flex flex-col items-start justify-center gap-[14px] self-stretch lg:gap-4 lg:self-auto">
            <div className="relative flex h-4 items-center gap-1 lg:h-6 lg:gap-1.5 lg:py-1">
              <Image src={`${ASSET}spec-badge-left.svg`} alt="" aria-hidden width={149} height={20} className="absolute left-[3px] top-1/2 h-4 w-[117px] -translate-y-1/2 lg:h-5 lg:w-[149px]" />
              <Image src={`${ASSET}spec-badge-icon.svg`} alt="" aria-hidden width={18.821} height={20.355} className="relative h-4 w-[14.8px] lg:h-[20.355px] lg:w-[18.821px]" />
              <p className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-none tracking-[0.6px] text-navy lg:text-[14px] lg:tracking-[0.7px]">Specifications</p>
            </div>
            <h2 className="w-full font-display text-[28px] sm:text-[38px] font-semibold not-italic leading-[115%] tracking-[-0.56px] text-ink lg:whitespace-nowrap lg:text-[52px] lg:tracking-[-1.04px]">
              Know Your Vehicle Better
            </h2>
          </div>
          <Button className="max-lg:hidden">Download Spec sheet</Button>
        </div>

        {/* Tab pills + spec content — mobile: scrolling pill row on the surface,
            desktop: pills tucked into the card's top notch */}
        <div className="relative isolate flex w-full max-w-[680px] lg:max-w-[1282px] flex-col items-center gap-5 lg:block">
          <div className="relative z-10 mt-2.5 flex w-full flex-row flex-nowrap items-center gap-2 overflow-x-auto scrollbar-none lg:absolute lg:left-1/2 lg:top-[11.54px] lg:mt-0 lg:w-auto lg:-translate-x-1/2 lg:gap-0 lg:overflow-visible">
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
                      ? "flex h-[34px] shrink-0 items-center justify-center gap-2 rounded-[400px] border-[0.4px] border-solid border-white px-3 font-sans text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:border-[0.5px] lg:px-3.5 xl:px-4 lg:text-[16px]"
                      : "flex h-[34px] shrink-0 items-center justify-center gap-2 rounded-[400px] bg-[rgba(204,204,204,0.32)] px-3 font-sans text-[12px] font-semibold leading-none text-ink lg:h-[42px] lg:bg-transparent lg:px-3.5 xl:px-4 lg:text-[16px]"
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

          <div className="relative isolate flex w-full items-center gap-[42px] overflow-clip rounded-[12px] bg-[rgba(229,235,243,0.6)] px-[42px] pb-[42px] pt-[89px] max-lg:flex-col max-lg:items-stretch max-lg:gap-0 max-lg:rounded-none max-lg:bg-transparent max-lg:px-0 max-lg:pb-0 max-lg:pt-0">
          {/* solid-white inner card art with cutout for tabs — desktop */}
          <div className="pointer-events-none absolute inset-x-[12.5px] top-[11.54px] bottom-[10.3px] -z-10 hidden lg:block">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1257 533.156"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                id="Subtract"
                d="M1257 521.156C1257 527.784 1251.63 533.156 1245 533.156H12C5.37256 533.156 0 527.784 0 521.156V12C0 5.37259 5.37258 0 12 0H247.905C252.885 0 257.347 3.07546 259.12 7.72905L272.286 42.3002C274.058 46.9538 278.521 50.0293 283.5 50.0293H973.5C978.479 50.0293 982.942 46.9538 984.714 42.3002L997.88 7.72905C999.653 3.07546 1004.115 0 1009.095 0H1245C1251.63 0 1257 5.37258 1257 12V521.156Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="flex min-w-px flex-1 flex-col gap-1.5 max-lg:relative max-lg:z-10 max-lg:order-2 max-lg:-mt-16 lg:gap-3 lg:pt-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={
                  i > 0
                    ? "flex h-8 w-full items-center justify-between overflow-clip border-t border-solid border-[#ccc]/60 px-0.5 py-1 lg:h-auto lg:pt-3"
                    : "flex h-8 w-full items-center justify-between overflow-clip px-0.5 py-1 lg:h-auto lg:pt-3"
                }
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[3.25px] bg-[#eff3f8] lg:size-8 lg:rounded-[4px]">
                    <Image src={`${ASSET}${f.icon}`} alt="" aria-hidden width={20} height={20} />
                  </span>
                  <p className="whitespace-nowrap text-center font-sans text-[12px] font-bold capitalize leading-normal text-ink lg:text-[16px]">{f.label}</p>
                </div>
                <p className="whitespace-nowrap text-center font-sans text-[12px] font-bold capitalize leading-normal text-ink lg:text-[16px]">{f.value}</p>
              </div>
            ))}
          </div>

          <div aria-hidden className="w-px shrink-0 self-stretch bg-[#ccc]/60 max-lg:hidden" />

          <div className="w-[557px] shrink-0 self-stretch max-lg:order-1 max-lg:w-full">
            <div className="relative aspect-[353/320.99] w-full overflow-hidden rounded-[12px] lg:aspect-auto lg:h-full">
              <Image
                src={`${ASSET}spec-image.png`}
                alt="Storm EV LR 200 cabin and controls"
                width={557}
                height={424}
                className="h-full w-full object-cover max-lg:[mask-image:linear-gradient(180deg,black_35%,rgba(0,0,0,0.65)_60%,transparent_82%)] lg:absolute lg:inset-0"
              />
            </div>
          </div>
          </div>
        </div>

        <Button className="lg:hidden max-lg:h-11 max-lg:w-auto max-lg:px-5">Download Spec sheet</Button>
      </div>
    </section>
  );
}
