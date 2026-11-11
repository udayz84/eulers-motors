"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import DealerLocator, { Dealer, ChargingStation, ServiceCenter } from "@/components/sections/DealerLocator";
import FloatingWidget from "@/components/FloatingWidget";
import { StrapiMedia } from "@/types/strapi";

const ASSET = "/assets/dealer-locator-hero/";

function SupportBadge({ text = "Support" }: { text?: string }) {
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
      <span className="relative font-sans text-xs font-bold uppercase leading-normal tracking-[0.6px] text-white lg:text-sm lg:tracking-[0.7px]">{text}</span>
    </div>
  );
}

export type SupportTabType = "dealer" | "charging" | "service";

function SupportTabs({
  active = "dealer",
  labels,
  onTabChange,
}: {
  active?: SupportTabType;
  labels?: { dealer: string; charging: string; service: string };
  onTabChange?: (tab: SupportTabType) => void;
}) {
  const pad = "px-2 max-[359px]:px-1.5 sm:px-3.5";
  const text = "text-[11px] max-[359px]:text-[10px] sm:text-[13px]";
  return (
    <div
      role="tablist"
      aria-label="Support navigation"
      className="relative flex h-9 w-full max-w-[353px] items-center justify-between rounded-[43px] bg-[rgba(255,255,255,0.12)] p-0.5 sm:h-10 sm:w-[420px] sm:max-w-[420px] lg:h-[46px] lg:w-[488px] lg:max-w-[488px] lg:p-0.5"
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
        {labels?.dealer || "Dealer Locator"}
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
        {labels?.charging || "Charging Stations"}
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
        {labels?.service || "Service Centers"}
      </button>
    </div>
  );
}

const DEFAULT_TAB_CONTENT = {
  dealer: {
    tabLabel: "Dealer Locator",
    title: "Find your nearest Euler showroom",
    subtitle:
      "Explore our showroom network to find the right team for vehicle enquiries, purchases, and support near you.",
    searchLabel: "Search dealers by area",
    resultsLabel: "Dealers Found",
  },
  charging: {
    tabLabel: "Charging Stations",
    title: "Find a charging station near you.",
    subtitle: "Locate nearby charging points and plan your next stop with confidence.",
    searchLabel: "Search charging points by area",
    resultsLabel: "Charging Points",
  },
  service: {
    tabLabel: "Service Centers",
    title: "Find a service centre near you.",
    subtitle:
      "Get the right support for your Euler vehicle, from routine maintenance to service and repairs.",
    searchLabel: "Search service centers by area",
    resultsLabel: "Service Centers Found",
  },
};

export interface DealerLocatorHeroProps {
  variant?: SupportTabType;
  supportBadgeText?: string;
  tabContent?: {
    dealer?: { tabLabel?: string; title?: string; subtitle?: string; searchLabel?: string; resultsLabel?: string };
    charging?: { tabLabel?: string; title?: string; subtitle?: string; searchLabel?: string; resultsLabel?: string };
    service?: { tabLabel?: string; title?: string; subtitle?: string; searchLabel?: string; resultsLabel?: string };
  };
  cities?: string[] | string;
  defaultCity?: string;
  locationButtonLabel?: string;
  directionsButtonLabel?: string;
  distanceUnit?: string;
  emptyStateText?: string;
  mapImage?: StrapiMedia | string;
  dealers?: Dealer[];
  chargingStations?: ChargingStation[];
  serviceCenters?: ServiceCenter[];
}

export default function DealerLocatorHero({
  variant = "dealer",
  supportBadgeText = "Support",
  tabContent,
  cities,
  defaultCity,
  locationButtonLabel,
  directionsButtonLabel,
  distanceUnit,
  emptyStateText,
  mapImage,
  dealers,
  chargingStations,
  serviceCenters,
}: DealerLocatorHeroProps) {
  const [activeTab, setActiveTab] = useState<SupportTabType>(variant);

  const activeCities = useMemo(() => {
    if (typeof cities === "string") {
      const parsed = cities.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
      return parsed.length > 0 ? parsed : undefined;
    }
    return cities;
  }, [cities]);

  useEffect(() => {
    setActiveTab(variant);
  }, [variant]);

  const activeContent = {
    dealer: { ...DEFAULT_TAB_CONTENT.dealer, ...tabContent?.dealer },
    charging: { ...DEFAULT_TAB_CONTENT.charging, ...tabContent?.charging },
    service: { ...DEFAULT_TAB_CONTENT.service, ...tabContent?.service },
  };

  const currentContent = activeContent[activeTab];
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
          backgroundImage: `url("${ASSET}desktop-texture.webp")`,
          backgroundPosition: "left top",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <Image src={`${ASSET}mobile-texture.webp`} alt="" fill sizes="393px" className="object-fill object-bottom" />
      </div>
      <div className="absolute left-[calc(50%+6.5px)] top-[428.54px] h-[1129.558px] w-[4141.919px] -translate-x-1/2 rounded-full bg-white blur-[220.45px] lg:left-[-859.81px] lg:top-[780.1px] lg:h-[984.503px] lg:w-[3610.026px]" aria-hidden="true" />
      <div className="absolute hidden left-[calc(100%+859.81px)] top-[780.1px] h-[984.503px] w-[3610.026px] -translate-x-1/2 rounded-full bg-white blur-[220.45px] lg:block" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px]"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)" }}
      />

      <div className={`absolute left-1/2 top-[120px] z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:gap-4 lg:top-[151px] lg:w-[846px] lg:gap-6 lg:max-w-none ${isCharging ? "w-full max-w-[353px] sm:max-w-[560px] px-4 sm:px-0" : "w-full max-w-[353px] sm:w-[500px] sm:max-w-[500px]"}`}>
        <SupportBadge text={supportBadgeText} />
        <SupportTabs
          active={activeTab}
          labels={{
            dealer: activeContent.dealer.tabLabel,
            charging: activeContent.charging.tabLabel,
            service: activeContent.service.tabLabel,
          }}
          onTabChange={setActiveTab}
        />
        <h1 className="w-full text-center font-display text-[32px] sm:text-[40px] font-semibold leading-[1.15] tracking-[-0.64px] text-white lg:w-[789px] lg:text-[52px] lg:tracking-[-1.04px]">
          {currentContent.title}
        </h1>
        <p className="whitespace-normal sm:whitespace-nowrap text-center font-sans text-xs sm:text-sm leading-normal text-white lg:text-base max-w-[340px] sm:max-w-none">
          {currentContent.subtitle}
        </p>
      </div>

      <div className="absolute left-1/2 top-[330.66px] z-10 w-full -translate-x-1/2 lg:top-[450px]">
        <DealerLocator
          variant={activeTab}
          searchLabel={currentContent.searchLabel}
          locationButtonLabel={locationButtonLabel}
          resultsLabel={currentContent.resultsLabel}
          directionsButtonLabel={directionsButtonLabel}
          distanceUnit={distanceUnit}
          emptyStateText={emptyStateText}
          defaultCity={defaultCity}
          mapImage={mapImage}
          cities={activeCities}
          dealers={dealers}
          chargingStations={chargingStations}
          serviceCenters={serviceCenters}
        />
      </div>
      <FloatingWidget />
    </section>
  );
}
