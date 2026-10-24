"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { calculateMonthlyEmi } from "@/components/data/vehicle-finance";

const TRUCK_IMG = "/assets/products/variant-compare-truck.png";

type VariantData = {
  name: string;
  price: number;
  bodyType: string;
  payload: string;
  range: string;
  runningCost: string;
  fullCharge: string;
  cargoSpace: string;
};

const VARIANTS: VariantData[] = [
  {
    name: "LR 200",
    price: 1149000,
    bodyType: "4-wheel cargo EV",
    payload: "1,200 kg",
    range: "200 km",
    runningCost: "₹1.05/km",
    fullCharge: "90 min",
    cargoSpace: "2.9 m loading deck",
  },
  {
    name: "T1500",
    price: 1280000,
    bodyType: "4-wheel container EV",
    payload: "1,500 kg",
    range: "200 km",
    runningCost: "₹1.15/km",
    fullCharge: "105 min",
    cargoSpace: "3.2 m loading deck",
  },
  {
    name: "Turbo 1000",
    price: 980000,
    bodyType: "4-wheel delivery EV",
    payload: "1,000 kg",
    range: "180 km",
    runningCost: "₹0.98/km",
    fullCharge: "75 min",
    cargoSpace: "2.5 m loading deck",
  },
];

const LABELS = [
  "Body type",
  "EMI, 48 months",
  "Rated payload",
  "Certified range",
  "Running cost",
  "Full charge",
  "Cargo space",
];

const formatEmi = (price: number) => {
  return `₹${calculateMonthlyEmi(price).toLocaleString("en-IN")}/month`;
};

const VALUES = (v: VariantData) => [
  v.bodyType,
  formatEmi(v.price),
  v.payload,
  v.range,
  v.runningCost,
  v.fullCharge,
  v.cargoSpace,
];

// Layout positioning constants
const DESKTOP_INITIAL_LEFT = 266.93;
const DESKTOP_STEP = 323.67;

const MOBILE_INITIAL_LEFT = 108.801;
const MOBILE_STEP = 156;
const MOBILE_TRUCK_WIDTH = 73.534;
const MOBILE_TRUCK_INITIAL_LEFT =
  MOBILE_INITIAL_LEFT + (MOBILE_STEP - MOBILE_TRUCK_WIDTH) / 2;
const MOBILE_TOTAL_WIDTH =
  MOBILE_INITIAL_LEFT + VARIANTS.length * MOBILE_STEP + 20;

export const HILOAD_VARIANTS: VariantData[] = [
  {
    name: "Delivery Van (DV)",
    price: 420000,
    bodyType: "3-wheel container EV",
    payload: "688 kg",
    range: "170 km",
    runningCost: "₹0.85/km",
    fullCharge: "60 min",
    cargoSpace: "170 cu. ft. box",
  },
  {
    name: "Pickup Van (PV)",
    price: 394000,
    bodyType: "3-wheel open deck EV",
    payload: "688 kg",
    range: "170 km",
    runningCost: "₹0.85/km",
    fullCharge: "60 min",
    cargoSpace: "Open cargo bed",
  },
  {
    name: "Flatbed (FB)",
    price: 410000,
    bodyType: "3-wheel flatbed EV",
    payload: "688 kg",
    range: "170 km",
    runningCost: "₹0.85/km",
    fullCharge: "60 min",
    cargoSpace: "Flatbed deck",
  },
];

/**
 * Compare variants side by side — Figma node 2861:7715
 * 1440px frame, px-79/py-47, heading row + side-by-side comparison table
 * with interactive variant highlight selector and truck renders above each column.
 *
 * Mobile (Figma 393px): header on top, horizontally scrollable comparison
 * card, and the two CTA buttons moved to the section's bottom in one row.
 */
export default function ProductVariantsCompare({
  variants = VARIANTS,
  truckImg = TRUCK_IMG,
}: {
  variants?: VariantData[];
  truckImg?: string;
} = {}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mobileTotalWidth = MOBILE_INITIAL_LEFT + variants.length * MOBILE_STEP + 20;

  return (
    <section
      aria-label="Compare variants side by side"
      className="w-full bg-surface lg:bg-gradient-to-b lg:from-[#f3f4f5] lg:to-white"
    >
      {/* ===== Mobile ===== */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-5 px-5 sm:px-8 py-[42px] sm:py-[50px] lg:hidden">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-[14px]">
          <Eyebrow label="VARIANTS" icons="navy" />
          <h2 className="w-full font-display text-[28px] sm:text-[38px] font-semibold not-italic leading-[1.15] tracking-[-0.56px] text-ink">
            Compare variants
            <br />
            side by side.
          </h2>
        </div>

        {/* Comparison card */}
        <div className="-mx-5 sm:-mx-8 w-[calc(100%+40px)] sm:w-[calc(100%+64px)] overflow-x-auto px-5 sm:px-8 pb-1 scrollbar-none">
          <div className="relative shrink-0" style={{ width: `${mobileTotalWidth}px` }}>
            {/* Truck renders */}
            <div className="relative mb-3 h-[47.389px] w-full">
              {variants.map((variant, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Select ${variant.name}`}
                    className={`absolute top-0 aspect-[45/29] h-[47.389px] w-[73.534px] shrink-0 cursor-pointer transition-all duration-200 focus:outline-none ${
                      isSelected ? "scale-105" : "opacity-75 hover:opacity-100"
                    }`}
                    style={{ left: `${MOBILE_TRUCK_INITIAL_LEFT + i * MOBILE_STEP}px` }}
                  >
                    <Image
                      src={truckImg}
                      alt={`${variant.name} Truck`}
                      fill
                      sizes="74px"
                      className="object-contain"
                    />
                  </button>
                );
              })}
            </div>

            <div
              className="relative h-[286px] shrink-0 rounded-[9.6px] border-[0.8px] border-[#ccc] bg-white p-5 pl-[108.801px]"
              style={{ width: `${mobileTotalWidth}px` }}
            >
              {/* Label column */}
              <div
                className="absolute left-0 top-0 flex h-full w-[108.801px] flex-col items-center justify-between pl-2 pr-px py-[26.313px]"
                style={{
                  backgroundImage:
                    "linear-gradient(270deg, rgba(255,255,255,0.00) 0%, #FFF 9.17%)",
                }}
              >
                <p className="w-full whitespace-nowrap font-sans text-[12px] font-semibold leading-[1.2] text-[#4a4f57]">
                  Variants
                </p>
                {LABELS.map((label) => (
                  <p
                    key={label}
                    className="w-full whitespace-nowrap font-sans text-[12px] font-semibold leading-[1.2] text-[#4a4f57]"
                  >
                    {label}
                  </p>
                ))}
              </div>

              {/* Variant highlight box — smoothly slides to selected variant */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 flex h-full flex-col justify-between overflow-hidden rounded-[0_3.2px_3.2px_0] transition-[left] duration-300 ease-in-out"
                style={{
                  width: `${MOBILE_STEP}px`,
                  left: `${MOBILE_INITIAL_LEFT + selectedIndex * MOBILE_STEP}px`,
                  backgroundImage:
                    "linear-gradient(180deg, rgba(29,111,255,0.20) 0%, rgba(29,111,255,0.04) 35.26%, rgba(29,111,255,0.04) 75%, rgba(29,111,255,0.20) 100%)",
                }}
              >
                <div className="h-[6.4px] w-full shrink-0 bg-[#0E2F6D]" />
                <div className="h-[6.4px] w-full shrink-0 bg-[#0E2F6D]" />
              </div>

              {/* Variant columns */}
              {variants.map((variant, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <div
                    key={variant.name}
                    onClick={() => setSelectedIndex(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIndex(i);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${variant.name}`}
                    aria-pressed={isSelected}
                    className="absolute flex h-[246px] cursor-pointer flex-col items-center justify-between py-[10px] select-none focus:outline-none"
                    style={{
                      width: `${MOBILE_STEP}px`,
                      left: `${MOBILE_INITIAL_LEFT + i * MOBILE_STEP}px`,
                      top: "20px",
                    }}
                  >
                    <div
                      className={`flex items-center rounded-[9.6px] px-[10px] py-[4px] transition-all duration-200 ${
                        isSelected
                          ? "bg-white shadow-sm ring-1 ring-[#0E2F6D]/20"
                          : "bg-[#f3f4f5]"
                      }`}
                    >
                      <p className="whitespace-nowrap text-center font-sans text-[12px] font-bold leading-[1.2] tracking-[-0.24px] text-[#121212]">
                        {variant.name}
                      </p>
                    </div>
                    {VALUES(variant).map((value, vi) => (
                      <p
                        key={vi}
                        className={`whitespace-nowrap text-center font-sans text-[12px] font-bold leading-[1.2] tracking-[-0.06px] transition-colors duration-200 ${
                          isSelected ? "text-ink" : "text-[#4a4f57]"
                        }`}
                      >
                        {value}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA buttons — bottom of the section, one row */}
        <div className="flex w-full items-start gap-3">
          <button
            type="button"
            className="flex h-[44px] sm:h-[48px] flex-1 items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.50)] bg-[#F3F4F5] font-display text-[12px] sm:text-[14px] font-bold leading-none text-[#121212]"
          >
            Get Price Quote
          </button>
          <button
            type="button"
            className="flex h-[44px] sm:h-[48px] flex-1 items-center justify-center gap-2 rounded-[4px] bg-[#121212] font-display text-[12px] sm:text-[14px] font-bold leading-none text-white"
          >
            Talk to an expert
          </button>
        </div>
      </div>

      {/* ===== Desktop ===== */}
      <div className="hidden py-[47px] lg:block">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[42px] px-5 xl:px-[79px]">
          {/* Heading + Action Buttons (Figma 2861:7716) */}
          <div className="flex w-full flex-col items-start justify-between gap-6 xl:flex-row xl:items-end">
            <div className="flex flex-col items-start gap-4">
              <Eyebrow label="VARIANTS" icons="navy" />
              <h2 className="w-full max-w-[539px] font-display text-[32px] font-semibold not-italic leading-[1.15] tracking-[-0.64px] text-ink sm:text-[42px] xl:text-[52px] xl:tracking-[-1.04px]">
                Compare variants side by side.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="#book-test-drive" variant="outline" arrow="none" className="h-[50.48px] px-6">
                Get Price Quote
              </Button>
              <Button href="#book-test-drive" variant="dark" arrow="white" className="h-[50.48px] px-6">
                Talk to an expert
              </Button>
            </div>
          </div>

          {/* Comparison Table Area (Figma 2861:7735) */}
          <div className="w-full overflow-x-auto pb-4 xl:overflow-x-visible">
            <div className="relative h-[612px] w-[1277px] shrink-0 max-xl:mx-auto">
              {/* Truck Renders sitting on top of the table (Figma 2861:7786) */}
              <div className="absolute left-[352.53px] top-[9px] flex items-center gap-[136px]">
                {variants.map((variant, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <button
                      key={variant.name}
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      aria-label={`Select ${variant.name} Truck`}
                      className={`relative h-[119.284px] w-[185.096px] shrink-0 cursor-pointer transition-all duration-300 focus:outline-none ${
                        isSelected
                          ? "scale-105 drop-shadow-[0_8px_16px_rgba(14,47,109,0.18)]"
                          : "opacity-80 hover:scale-[1.03] hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={truckImg}
                        alt={`${variant.name} Truck`}
                        fill
                        sizes="185px"
                        className="object-contain"
                        priority
                      />
                    </button>
                  );
                })}
              </div>

              {/* Table Card (Figma 2861:7736) */}
              <div className="absolute bottom-0 left-0 flex h-[456px] w-[1277px] items-center justify-between overflow-hidden rounded-[12px] border border-[#ccc] bg-white px-8 py-[42px]">
                {/* Highlight Column for selected variant — animated transition */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 flex h-[456px] w-[348px] -translate-y-1/2 flex-col justify-between overflow-hidden rounded-[4px] transition-[left] duration-300 ease-in-out"
                  style={{
                    left: `${DESKTOP_INITIAL_LEFT + selectedIndex * DESKTOP_STEP}px`,
                    backgroundImage:
                      "linear-gradient(180deg, rgba(29, 111, 255, 0.2) 0%, rgba(29, 111, 255, 0.04) 35.26%, rgba(29, 111, 255, 0.04) 75%, rgba(29, 111, 255, 0.2) 100%)",
                  }}
                >
                  <div className="h-2 w-full bg-[#0e2f6d]" />
                  <div className="h-2 w-full bg-[#0e2f6d]" />
                </div>

                {/* Column 1: Labels (Figma 2861:7740) */}
                <div className="relative z-10 flex h-[400px] w-[242px] shrink-0 flex-col items-start justify-between">
                  <div className="flex w-full items-center py-3">
                    <p className="font-sans text-[16px] font-semibold leading-[1.3] text-[#4a4f57]">
                      Variants
                    </p>
                  </div>
                  {LABELS.map((label) => (
                    <p
                      key={label}
                      className="w-full font-sans text-[16px] font-semibold leading-[1.3] text-[#4a4f57]"
                    >
                      {label}
                    </p>
                  ))}
                </div>

                {/* Columns 2-4: Interactive Variants */}
                {variants.map((variant, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <div
                      key={variant.name}
                      onClick={() => setSelectedIndex(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedIndex(i);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${variant.name}`}
                      aria-pressed={isSelected}
                      className="relative z-10 flex h-[400px] w-[312.143px] shrink-0 cursor-pointer flex-col items-center justify-between select-none focus:outline-none"
                    >
                      <div
                        className={`flex items-center rounded-[12px] px-4 py-3 transition-all duration-200 ${
                          isSelected
                            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-[#0E2F6D]/20"
                            : "bg-[#f3f4f5] hover:bg-[#e8eaec]"
                        }`}
                      >
                        <p className="font-sans text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink">
                          {variant.name}
                        </p>
                      </div>
                      {VALUES(variant).map((value, vi) => (
                        <p
                          key={vi}
                          className={`whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.1px] transition-colors duration-200 ${
                            isSelected ? "text-ink" : "text-[#4a4f57]"
                          }`}
                        >
                          {value}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
