"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DealerLocator from "@/components/sections/DealerLocator";
import FloatingWidget from "@/components/FloatingWidget";

const ASSET = "/assets/dealer-locator-hero/";

function SupportBadge() {
  return (
    <div className="relative flex h-5 items-center gap-1 lg:h-[21px] lg:gap-[6px]">
      <Image src={`${ASSET}desktop-support-left.svg`} alt="" width={149} height={21} aria-hidden="true" className="absolute left-[3px] top-0 hidden h-[21px] w-[149px] lg:block" />
      <Image src={`${ASSET}desktop-support-right.svg`} alt="" width={19} height={21} aria-hidden="true" className="relative hidden h-[21px] w-[19px] lg:block" />
      <span aria-hidden="true" className="absolute left-[3.43px] top-[2px] block h-4 w-[116.978px] lg:hidden">
        <Image src={`${ASSET}mobile-support-left.svg`} alt="" width={114.561} height={16} className="absolute left-[1.03%] top-0 max-w-none" />
      </span>
      <span aria-hidden="true" className="relative flex h-4 w-[14.794px] shrink-0 lg:hidden">
        <Image src={`${ASSET}mobile-support-right.svg`} alt="" width={14.1899} height={16} className="absolute left-[4.08%] top-0 max-w-none" />
      </span>
      <span className="relative font-sans text-xs font-bold uppercase leading-normal tracking-[0.6px] text-white lg:text-sm lg:tracking-[0.7px]">Support</span>
    </div>
  );
}

export type SupportTabType = "dealer" | "charging" | "service";

function SupportTabs({
  active = "dealer",
  onTabChange,
  responsive = false,
}: {
  active?: SupportTabType;
  onTabChange?: (tab: SupportTabType) => void;
  responsive?: boolean;
}) {
  const pad = responsive ? "px-2.5 sm:px-3.5 max-[359px]:px-2" : "px-2.5 sm:px-3.5";
  const text = responsive ? "text-xs sm:text-[13px] max-[359px]:text-[11px]" : "text-xs sm:text-[13px]";
  return (
    <div
      role="tablist"
      aria-label="Support navigation"
      className={`relative flex h-9 sm:h-10 w-[353px] sm:w-[420px] items-center justify-between rounded-[43px] bg-[rgba(255,255,255,0.12)] p-0.5 lg:h-[46px] lg:w-[488px] lg:p-0.5 ${
        responsive ? "max-w-full" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[0.5px] z-20 box-border rounded-[inherit] p-[0.5px]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.85))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.5px] left-[18px] right-[18px] z-20 h-[0.5px] rounded-full bg-gradient-to-r from-white/20 to-white/85 lg:left-[23px] lg:right-[23px]"
      />
      <button
        type="button"
        role="tab"
        aria-selected={active === "dealer"}
        onClick={() => onTabChange?.("dealer")}
        className={`flex h-8 sm:h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[500px] ${pad} font-sans ${text} font-semibold leading-none cursor-pointer transition-all lg:h-[42px] lg:px-4 lg:text-base ${
          active === "dealer"
            ? "border-[0.5px] border-solid border-white bg-white text-[#121212] shadow-sm"
            : "text-white hover:text-white/80"
        }`}
      >
        Dealer Locator
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === "charging"}
        onClick={() => onTabChange?.("charging")}
        className={`flex h-8 sm:h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full ${pad} font-sans ${text} font-semibold leading-none cursor-pointer transition-all lg:h-[42px] lg:px-4 lg:text-base ${
          active === "charging"
            ? "border-[0.5px] border-solid border-white bg-white text-[#121212] shadow-sm"
            : "text-white hover:text-white/80"
        }`}
      >
        Charging Stations
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === "service"}
        onClick={() => onTabChange?.("service")}
        className={`flex h-8 sm:h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full ${pad} font-sans ${text} font-semibold leading-none cursor-pointer transition-all lg:h-[42px] lg:px-4 lg:text-base ${
          active === "service"
            ? "border-[0.5px] border-solid border-white bg-white text-[#121212] shadow-sm"
            : "text-white hover:text-white/80"
        }`}
      >
        Service Centers
      </button>
    </div>
  );
}

const tabContent = {
  dealer: {
    title: "Find your nearest dealer.",
    subtitle: "Every dealer brings the vehicle to you for a test drive.",
    searchLabel: "Search dealers by area",
  },
  charging: {
    title: "Find a charging point.",
    subtitle: "1,412 points across India, with live status on each one.",
    searchLabel: "Search charging points by area",
  },
  service: {
    title: "Find a service center.",
    subtitle: "Authorized Euler service centers with genuine parts and certified experts.",
    searchLabel: "Search service centers by area",
  },
};

export default function DealerLocatorHero({
  variant = "dealer",
}: {
  variant?: SupportTabType;
}) {
  const [activeTab, setActiveTab] = useState<SupportTabType>(variant);

  useEffect(() => {
    setActiveTab(variant);
  }, [variant]);

  const currentContent = tabContent[activeTab];
  const isCharging = activeTab === "charging";

  return (
    <section
      aria-label={currentContent.title}
      className={`relative isolate h-[1166px] w-full self-stretch overflow-hidden bg-[#1d6fff] lg:h-[1265px] ${isCharging ? "mb-5" : ""}`}
      style={{
        backgroundColor: "lightgray",
        backgroundImage: "linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: `url("${ASSET}desktop-texture.png")`,
          backgroundPosition: "left top",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <Image src={`${ASSET}mobile-texture.png`} alt="" fill sizes="393px" className="object-fill object-bottom" />
      </div>
      <div className="absolute left-[calc(50%+6.5px)] top-[428.54px] h-[1129.558px] w-[4141.919px] -translate-x-1/2 rounded-full bg-white blur-[220.45px] lg:left-[-859.81px] lg:top-[780.1px] lg:h-[984.503px] lg:w-[3610.026px]" aria-hidden="true" />
      <div className="absolute hidden left-[calc(100%+859.81px)] top-[780.1px] h-[984.503px] w-[3610.026px] -translate-x-1/2 rounded-full bg-white blur-[220.45px] lg:block" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px]"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)" }}
      />

      <div className={`absolute left-1/2 top-[120px] z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:gap-4 lg:top-[151px] lg:w-[846px] lg:gap-6 lg:max-w-none ${isCharging ? "w-full max-w-[353px] sm:max-w-[560px] px-4 sm:px-0" : "w-[353px] sm:w-[500px]"}`}>
        <SupportBadge />
        <SupportTabs
          active={activeTab}
          onTabChange={setActiveTab}
          responsive={isCharging}
        />
        <h1 className="w-full text-center font-display text-[32px] sm:text-[40px] font-semibold leading-[1.15] tracking-[-0.64px] text-white lg:w-[789px] lg:text-[52px] lg:tracking-[-1.04px]">
          {currentContent.title}
        </h1>
        <p className="whitespace-nowrap text-center font-sans text-xs sm:text-sm leading-normal text-white lg:text-base">
          {currentContent.subtitle}
        </p>
      </div>

      <div className="absolute left-1/2 top-[330.66px] z-10 w-full -translate-x-1/2 lg:top-[450px]">
        <DealerLocator
          variant={activeTab}
          searchLabel={currentContent.searchLabel}
        />
      </div>
      <FloatingWidget />
    </section>
  );
}
