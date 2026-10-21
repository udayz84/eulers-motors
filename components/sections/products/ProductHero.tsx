"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Arrow from "@/components/ui/Arrow";

const ASSET = "/assets/products/";

/** Stats entries */
const STATS = [
  { value: "200", unit: "km", label: "On One Charge" },
  { value: "1,200", unit: "kg", label: "Load Capacity" },
  { value: "₹1.05", unit: "/km", label: "Running Cost" },
  { value: "90", unit: "min", label: "Full Charge Time" },
];

const VARIANTS = [
  { name: "Base", range: "200 km", price: "₹11.49 L", image: "variant-thumb.png" },
  { name: "T1500", range: "200 km", price: "₹12.8 L", image: "vehicle-storm-t1500.png" },
  { name: "Turbo", range: "180 km", price: "₹9.8 L", image: "vehicle-turbo-1000.png" },
  { name: "HiLoad", range: "170 km", price: "₹7.5 L", image: "vehicle-hiload-ev.png" },
];

type VariantSelectorProps = {
  selectedIndex: number;
  expanded: boolean;
  onToggle: () => void;
  onSelect: (index: number) => void;
};

function VariantOptions({ selectedIndex, onSelect }: Pick<VariantSelectorProps, "selectedIndex" | "onSelect">) {
  return (
    <div className="flex flex-col gap-1.5">
      {VARIANTS.map((variant, index) => (
        <button
          key={variant.name}
          type="button"
          onClick={() => onSelect(index)}
          className={`flex w-full items-center gap-2 rounded-[10px] px-2 py-1.5 text-left transition-colors ${index === selectedIndex ? "bg-[#eaf1ff]" : "hover:bg-[#f4f7fb]"}`}
          aria-pressed={index === selectedIndex}
        >
          <span className="relative size-9 shrink-0 overflow-hidden rounded-[5px] bg-[#d9d9d9]">
            <Image src={`${ASSET}${variant.image}`} alt="" aria-hidden fill sizes="36px" className="object-cover" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-sans text-[13px] font-bold leading-tight text-[#0E2F6D]">{variant.name}</span>
            <span className="block truncate font-sans text-[11px] font-medium leading-tight text-[#0E2F6D]">{variant.range} · {variant.price}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * 3 elements: Image gallery thumbnails (42x42, rounded-4px)
 */
function Thumbs({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-end justify-start gap-[10px] lg:gap-2 ${className}`}>
      {/* Thumb 1 */}
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm lg:size-[62px]">
        <Image
          src={`${ASSET}thumb-1.png`}
          alt="Storm EV LR 200 Base thumb 1"
          fill
          sizes="42px"
          className="object-cover"
        />
      </div>

      {/* Thumb 2 */}
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm lg:size-[62px]">
        <Image
          src={`${ASSET}thumb-base.png`}
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-cover"
        />
        <Image
          src={`${ASSET}thumb-2-mid.png`}
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-bottom"
        />
        <Image
          src={`${ASSET}thumb-2-top.png`}
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-cover"
        />
      </div>

      {/* Thumb 3 (+5 overlay) */}
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm lg:size-[62px]">
        <Image
          src={`${ASSET}thumb-base.png`}
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-cover"
        />
        <Image
          src={`${ASSET}thumb-2-mid.png`}
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-bottom"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[13px] font-semibold text-white">
          +5
        </span>
      </div>
    </div>
  );
}

/**
 * Variants tab pill
 */
function VariantsTab({ selectedIndex, expanded, onToggle, onSelect }: VariantSelectorProps) {
  const selected = VARIANTS[selectedIndex];
  return (
    <div className="relative flex w-full flex-col rounded-[8px] border border-white/40 bg-white/20 p-1.5 shadow-sm backdrop-blur-[12px]">
      <div className="flex w-full items-center justify-between">
      <span className="px-2 font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0E2F6D]">
        VARIANTS
      </span>

      <button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls="mobile-variant-options" className="flex flex-1 items-center justify-between rounded-[12px] bg-white py-[6px] pl-[6px] pr-[16px] text-left shadow-sm">
        <div className="flex items-center gap-2">
          {/* Sized vehicle icon container */}
          <div className="relative size-[30.414px] shrink-0 overflow-hidden rounded-[5.799px] bg-[#D9D9D9]">
            <Image
              src={`${ASSET}${selected.image}`}
              alt={`${selected.name} variant`}
              width={97.11}
              height={64.97}
              className="absolute left-[-65.446px] top-[-38.282px] h-[64.97px] w-[97.11px] max-w-none"
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-[2px]">
            <span className="font-sans text-[14px] font-bold leading-[115%] tracking-[-0.28px] text-[#0E2F6D]">
              {selected.name}
            </span>
            <div className="flex items-center gap-1 font-sans text-[12px] font-medium leading-[115%] tracking-[-0.24px] text-[#0E2F6D]">
              <span>{selected.range}</span>
              <span className="size-[3px] rounded-full bg-[#0E2F6D]/40" />
              <span>{selected.price}</span>
            </div>
          </div>
        </div>

        {/* Chevron down */}
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 text-[#121212] transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      </div>
      <div id="mobile-variant-options" className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded ? "grid-rows-[1fr] opacity-100 pt-2" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <VariantOptions selectedIndex={selectedIndex} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}

/**
 * 2x2 Specs Grid Element
 */
function SpecsGrid() {
  return (
    <div className="flex w-full flex-col self-stretch rounded-[8px] bg-white/20 p-[14px] backdrop-blur-[12px] border border-white/30 shadow-sm">
      {/* Row 1 */}
      <div className="flex w-full items-center justify-between pb-2.5">
        {/* Spec 1 */}
        <div className="flex flex-1 flex-col items-start pr-3">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[0].value} <span className="font-sans text-[14px] font-medium">{STATS[0].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[0].label}
          </p>
        </div>

        {/* Divider */}
        <div className="h-[38px] w-[1px] bg-[#121212]/15" />

        {/* Spec 2 */}
        <div className="flex flex-1 flex-col items-start pl-4">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[1].value} <span className="font-sans text-[14px] font-medium">{STATS[1].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[1].label}
          </p>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="h-[1px] w-full bg-[#121212]/15" />

      {/* Row 2 */}
      <div className="flex w-full items-center justify-between pt-2.5">
        {/* Spec 3 */}
        <div className="flex flex-1 flex-col items-start pr-3">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[2].value}
            <span className="font-sans text-[14px] font-medium">{STATS[2].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[2].label}
          </p>
        </div>

        {/* Divider */}
        <div className="h-[38px] w-[1px] bg-[#121212]/15" />

        {/* Spec 4 */}
        <div className="flex flex-1 flex-col items-start pl-4">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[3].value} <span className="font-sans text-[14px] font-medium">{STATS[3].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[3].label}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop Variants Panel
 */
function DesktopVariantsPanel({ selectedIndex, expanded, onToggle, onSelect }: VariantSelectorProps) {
  const selected = VARIANTS[selectedIndex];
  return (
    <div className="relative z-30 flex w-[251px] flex-col gap-3 rounded-lg border border-white/30 bg-white/20 p-[14px] shadow-sm backdrop-blur-[12px]">
      <p className="w-full font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0E2F6D]">
        Variants
      </p>
      <button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls="desktop-variant-options" className="flex w-full items-center justify-between rounded-[12px] bg-white py-[6px] pl-1.5 pr-4 text-left shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[6px] bg-[#D9D9D9]">
            <Image
              src={`${ASSET}${selected.image}`}
              alt=""
              aria-hidden
              width={97.11}
              height={64.97}
              className="absolute left-[-65.46px] top-[-38.28px] h-[64.97px] w-[97.11px] max-w-none"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="whitespace-nowrap font-sans text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-[#0E2F6D]">
              {selected.name}
            </p>
            <div className="flex items-center gap-1">
              <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-[#0E2F6D]">
                {selected.range}
              </p>
              <span className="size-[4px] shrink-0 rounded-full bg-[#0E2F6D]/20" />
              <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-[#0E2F6D]">
                {selected.price}
              </p>
            </div>
          </div>
        </div>
        <Image
          src={`${ASSET}variant-chevron.svg`}
          alt=""
          aria-hidden
          width={15.5}
          height={7.12}
          className={`h-[7.12px] w-[15.5px] transition-transform ${expanded ? "rotate-180" : "-scale-y-100"}`}
        />
      </button>
      <div id="desktop-variant-options" className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-y-auto">
          <VariantOptions selectedIndex={selectedIndex} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}

/**
 * Product Hero Section
 */
export default function ProductHero() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [variantsExpanded, setVariantsExpanded] = useState(false);

  const toggleVariants = () => setVariantsExpanded((expanded) => !expanded);
  const selectVariant = (index: number) => {
    setSelectedVariant(index);
    setVariantsExpanded(false);
  };

  return (
    <section
      aria-label="Storm EV LR 200 Base"
      className="relative w-full overflow-hidden bg-white max-lg:h-[762px] sm:max-lg:h-[820px] max-lg:w-full lg:h-[800px]"
    >
      {/* Mobile background portrait crop */}
      <div aria-hidden className="absolute inset-0 lg:hidden">
        <Image
          src={`${ASSET}mobile-hero.png`}
          alt="Storm EV LR 200 electric vehicle on a city road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Sharp truck aligned to the blurred truck in the background */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-[393/762] -translate-x-1/2 -translate-y-1/2"
          style={{ width: "max(100vw, 393px)" }}
        >
          <Image
            src={`${ASSET}vehicle-storm-lr200.png`}
            alt=""
            aria-hidden
            width={300}
            height={190}
            className="absolute h-auto"
            style={{ left: "11%", top: "34.3%", width: "78%" }}
          />
        </div>
      </div>

      {/* Desktop background landscape */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <Image
          src={`${ASSET}hero-bg-desktop.png`}
          alt="Storm EV LR 200 electric vehicle on a city road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Mobile layout container (393px phone, fluid up to 560px on small tablets) */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[393px] sm:max-w-[560px] flex-col justify-between px-4 sm:px-6 pb-4 sm:pb-6 pt-[90px] sm:pt-[100px] lg:hidden">
        {/* Header container */}
        <div className="flex w-[302.801px] sm:w-[420px] max-w-full flex-col items-start justify-center gap-[12px]">
          <h1 className="self-stretch font-display text-[28px] sm:text-[36px] font-semibold leading-[115%] tracking-[-0.56px] text-[#121212]">
            Storm EV LR 200 Base
          </h1>
          <p className="w-[308.685px] sm:w-[420px] max-w-full font-sans text-[12px] sm:text-[14px] font-normal leading-normal text-[#121212]">
            Built for long city and highway runs. Carries a full load all day and charges overnight at your depot.
          </p>
          <a
            href="#book-test-drive"
            className="flex h-[44px] sm:h-[48px] items-center justify-center gap-[8px] rounded-[4px] bg-[#121212] px-[20px] sm:px-[24px] font-sans text-[14px] sm:text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <span>Download Brochure</span>
            <Arrow color="white" />
          </a>
        </div>

        {/* Bottom group */}
        <div className="flex w-full flex-col items-start gap-3">
          {/* 3 Thumbnails element */}
          <Thumbs />

          {/* Variants tab pill */}
          <VariantsTab selectedIndex={selectedVariant} expanded={variantsExpanded} onToggle={toggleVariants} onSelect={selectVariant} />

          {/* 2x2 Specs element */}
          <SpecsGrid />
        </div>
      </div>

      {/* Desktop layout container (>= lg: 768px with zoom) */}
      <div className="relative z-10 mx-auto hidden h-full max-w-[1440px] lg:block">
        {/* Left header */}
        <div className="absolute left-20 top-[130px] flex w-[303px] flex-col items-start gap-4">
          <h1 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink">
            Storm EV LR 200 Base
          </h1>
          <p className="w-[308.7px] font-sans text-[16px] leading-normal text-ink">
            Built for long city and highway runs. Carries a full load all day and charges overnight at your depot.
          </p>
          <a
            href="#book-test-drive"
            className="flex h-[50.477px] items-center justify-center gap-[8px] rounded-[4px] bg-[#121212] px-[24px] font-display text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <span>Download Brochure</span>
            <Arrow color="white" />
          </a>
        </div>

        {/* Right variants */}
        <div className="absolute right-0 top-[130px]">
          <DesktopVariantsPanel selectedIndex={selectedVariant} expanded={variantsExpanded} onToggle={toggleVariants} onSelect={selectVariant} />
        </div>

        {/* Bottom-left thumbnails */}
        <div className="absolute bottom-8 left-20">
          <Thumbs />
        </div>

        {/* Bottom-right horizontal stats */}
        <div className="absolute bottom-0 right-20 flex w-[720px] items-center justify-between rounded-t-lg bg-white/60 px-5 py-[14px] backdrop-blur-[10px] shadow-sm">
          {STATS.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && <span className="h-[21.143px] w-[0.8px] shrink-0 bg-ink/30" />}
              <div className="flex w-[120px] shrink-0 flex-col gap-[4.8px] whitespace-nowrap">
                <p className="font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.4px] text-ink">
                  {s.value} <span className="font-sans text-[14px] font-medium">{s.unit}</span>
                </p>
                <p className="font-sans text-[14px] font-medium capitalize leading-normal text-ink">
                  {s.label}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
