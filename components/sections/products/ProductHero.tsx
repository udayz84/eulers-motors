import { Fragment } from "react";
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

/**
 * 3 elements: Image gallery thumbnails (42x42, rounded-4px)
 */
function Thumbs({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-end justify-start gap-[10px] ${className}`}>
      {/* Thumb 1 */}
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm">
        <Image
          src={`${ASSET}thumb-1.png`}
          alt="Storm EV LR 200 Base thumb 1"
          fill
          sizes="42px"
          className="object-cover"
        />
      </div>

      {/* Thumb 2 */}
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm">
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
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm">
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
function VariantsTab() {
  return (
    <div className="flex w-full items-center justify-between rounded-[8px] bg-white/20 p-1.5 backdrop-blur-[12px] border border-white/40 shadow-sm">
      <span className="px-2 font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0E2F6D]">
        VARIANTS
      </span>

      <div className="flex flex-1 items-center justify-between rounded-[12px] bg-white py-[6px] pl-[6px] pr-[16px] shadow-sm">
        <div className="flex items-center gap-2">
          {/* Sized vehicle icon container */}
          <div className="relative size-[30.414px] shrink-0 overflow-hidden rounded-[5.799px] bg-[#D9D9D9]">
            <Image
              src={`${ASSET}variant-thumb.png`}
              alt="Base variant"
              width={97.11}
              height={64.97}
              className="absolute left-[-65.446px] top-[-38.282px] h-[64.97px] w-[97.11px] max-w-none"
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-[2px]">
            <span className="font-sans text-[14px] font-bold leading-[115%] tracking-[-0.28px] text-[#0E2F6D]">
              Base
            </span>
            <div className="flex items-center gap-1 font-sans text-[12px] font-medium leading-[115%] tracking-[-0.24px] text-[#0E2F6D]">
              <span>200 km</span>
              <span className="size-[3px] rounded-full bg-[#0E2F6D]/40" />
              <span>₹11.49 L</span>
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
          className="shrink-0 text-[#121212]"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
function DesktopVariantsPanel() {
  return (
    <div className="flex w-[251px] flex-col gap-3 rounded-lg bg-white/20 p-[14px] backdrop-blur-[12px] border border-white/30 shadow-sm">
      <p className="w-full font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0E2F6D]">
        Variants
      </p>
      <div className="flex w-full items-center justify-between rounded-[12px] bg-white py-[6px] pl-1.5 pr-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[6px] bg-[#D9D9D9]">
            <Image
              src={`${ASSET}variant-thumb.png`}
              alt=""
              aria-hidden
              width={97.11}
              height={64.97}
              className="absolute left-[-65.46px] top-[-38.28px] h-[64.97px] w-[97.11px] max-w-none"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="whitespace-nowrap font-sans text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-[#0E2F6D]">
              Base
            </p>
            <div className="flex items-center gap-1">
              <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-[#0E2F6D]">
                200 km
              </p>
              <span className="size-[4px] shrink-0 rounded-full bg-[#0E2F6D]/20" />
              <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-[#0E2F6D]">
                ₹11.49 L
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
          className="h-[7.12px] w-[15.5px] -scale-y-100"
        />
      </div>
    </div>
  );
}

/**
 * Product Hero Section
 */
export default function ProductHero() {
  return (
    <section
      aria-label="Storm EV LR 200 Base"
      className="relative w-full overflow-hidden bg-white max-xl:h-[762px] max-xl:w-full xl:h-[800px]"
    >
      {/* Mobile background portrait crop */}
      <div aria-hidden className="absolute inset-0 xl:hidden">
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
      <div aria-hidden className="absolute inset-0 hidden xl:block">
        <Image
          src={`${ASSET}hero-bg-desktop.png`}
          alt="Storm EV LR 200 electric vehicle on a city road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Mobile layout container (393px × 762px) */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[393px] flex-col justify-between px-4 pb-4 pt-[90px] xl:hidden">
        {/* Header container */}
        <div className="flex w-[302.801px] max-w-full flex-col items-start justify-center gap-[12px]">
          <h1 className="self-stretch font-display text-[28px] font-semibold leading-[115%] tracking-[-0.56px] text-[#121212]">
            Storm EV LR 200 Base
          </h1>
          <p className="w-[308.685px] max-w-full font-sans text-[12px] font-normal leading-normal text-[#121212]">
            Built for long city and highway runs. Carries a full load all day and charges overnight at your depot.
          </p>
          <button
            type="button"
            className="flex h-[44px] items-center justify-center gap-[8px] rounded-[4px] bg-[#121212] px-[20px] font-sans text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <span>Download Brochure</span>
            <Arrow color="white" />
          </button>
        </div>

        {/* Bottom group */}
        <div className="flex w-full flex-col items-start gap-3">
          {/* 3 Thumbnails element */}
          <Thumbs />

          {/* Variants tab pill */}
          <VariantsTab />

          {/* 2x2 Specs element */}
          <SpecsGrid />
        </div>
      </div>

      {/* Desktop layout container (>= xl) */}
      <div className="relative z-10 mx-auto hidden h-full max-w-[1440px] xl:block">
        {/* Left header */}
        <div className="absolute left-20 top-[130px] flex w-[303px] flex-col items-start gap-4">
          <h1 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink">
            Storm EV LR 200 Base
          </h1>
          <p className="w-[308.7px] font-sans text-[16px] leading-normal text-ink">
            Built for long city and highway runs. Carries a full load all day and charges overnight at your depot.
          </p>
          <button
            type="button"
            className="flex h-[44px] items-center justify-center gap-[8px] rounded-[4px] bg-[#121212] px-[20px] font-sans text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <span>Download Brochure</span>
            <Arrow color="white" />
          </button>
        </div>

        {/* Right variants */}
        <div className="absolute right-20 top-[130px]">
          <DesktopVariantsPanel />
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
