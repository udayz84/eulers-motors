"use client";

import { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Arrow from "@/components/ui/Arrow";

const ASSET = "/assets/products/";

const STATS = [
  { value: "150+", unit: "km", label: "RealRange™" },
  { value: "768", unit: "kg", label: "Certified Payload" },
  { value: "88.55", unit: "Nm", label: "Peak Torque" },
  { value: "15", unit: "min", label: "Fast Charge (50km)" },
];

const HILOAD_VARIANTS = [
  { name: "HiLoad TR (Fast Charge)", range: "164 km ARAI", price: "₹4.32 L", image: "vehicle-hiload-ev-clean.png" },
  { name: "HiLoad XR (Extended Range)", range: "198 km ARAI", price: "₹3.92 L", image: "vehicle-hiload-ev-clean.png" },
  { name: "HiLoad DV (170 cu. ft.)", range: "164 km ARAI", price: "₹4.20 L", image: "vehicle-hiload-ev-clean.png" },
  { name: "HiLoad PV (Open Deck)", range: "164 km ARAI", price: "₹4.10 L", image: "vehicle-hiload-ev-clean.png" },
];

type VariantSelectorProps = {
  selectedIndex: number;
  expanded: boolean;
  onToggle: () => void;
  onSelect: (index: number) => void;
};

function Thumbs({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-end justify-start gap-[10px] lg:gap-2 ${className}`}>
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm lg:size-[62px]">
        <Image
          src="/assets/products/vehicle-hiload-ev-clean.png"
          alt="HiLoad EV front angle"
          fill
          sizes="42px"
          className="object-contain p-1"
        />
      </div>
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm lg:size-[62px]">
        <Image
          src="/assets/products/thumb-base.png"
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-cover"
        />
        <Image
          src="/assets/products/vehicle-hiload-ev-clean.png"
          alt="HiLoad EV container"
          fill
          sizes="42px"
          className="object-contain p-1"
        />
      </div>
      <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] shadow-sm lg:size-[62px]">
        <Image
          src="/assets/products/thumb-base.png"
          alt=""
          aria-hidden
          fill
          sizes="42px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[13px] font-semibold text-white">
          +4
        </span>
      </div>
    </div>
  );
}

function VariantsTab({ selectedIndex, expanded, onToggle, onSelect }: VariantSelectorProps) {
  const selected = HILOAD_VARIANTS[selectedIndex];
  return (
    <div className="relative z-40 flex w-full flex-col rounded-[8px] border border-white/40 bg-white/20 p-1.5 shadow-sm backdrop-blur-[12px]">
      <div className="flex w-full items-center justify-between">
        <span className="px-2 font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0E2F6D]">
          VARIANTS
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          aria-expanded={expanded}
          aria-controls="hiload-mobile-variant-options"
          className="flex flex-1 items-center justify-between rounded-[12px] bg-white py-[6px] pl-[6px] pr-[16px] text-left shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="relative size-[30.414px] shrink-0 overflow-hidden rounded-[5.799px] bg-[#D9D9D9]">
              <Image src={`${ASSET}${selected.image}`} alt={selected.name} fill sizes="30px" className="object-contain p-0.5" />
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
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 text-[#121212] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
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

      {expanded && (
        <div
          id="hiload-mobile-variant-options"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[280px] overflow-y-auto rounded-[8px] border border-gray-200 bg-white p-2 shadow-2xl"
        >
          <div className="flex flex-col gap-1.5">
            {HILOAD_VARIANTS.map((v, i) => (
              <button
                key={v.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(i);
                }}
                className={`flex w-full items-center justify-between rounded-[8px] p-2 text-left transition-colors ${i === selectedIndex ? "bg-[#eaf1ff] font-bold text-[#0E2F6D] shadow-sm" : "hover:bg-gray-100 text-[#121212]"}`}
              >
                <div className="flex items-center gap-2">
                  <div className="relative size-7 shrink-0 overflow-hidden rounded bg-gray-100">
                    <Image src={`${ASSET}${v.image}`} alt="" fill sizes="28px" className="object-contain p-0.5" />
                  </div>
                  <span className="text-[13px]">{v.name}</span>
                </div>
                <span className="text-[12px] text-[#0E2F6D] font-semibold">{v.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopVariantsPanel({ selectedIndex, expanded, onToggle, onSelect }: VariantSelectorProps) {
  const selected = HILOAD_VARIANTS[selectedIndex];
  return (
    <div className="relative z-30 flex w-[320px] flex-col gap-3 rounded-lg border border-white/30 bg-white/20 p-[14px] shadow-sm backdrop-blur-[12px]">
      <p className="w-full font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0E2F6D]">
        Variants
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        aria-expanded={expanded}
        aria-controls="hiload-desktop-variant-options"
        className="flex w-full items-center justify-between gap-3 rounded-[12px] bg-white py-[6px] pl-2 pr-3.5 text-left shadow-sm transition-colors hover:bg-white/90"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[6px] bg-[#D9D9D9]">
            <Image src={`${ASSET}${selected.image}`} alt="" fill sizes="42px" className="object-contain p-0.5" />
          </div>
          <div className="flex flex-col justify-center gap-1 min-w-0">
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
          className={`h-[7.12px] w-[15.5px] shrink-0 transition-transform ${expanded ? "rotate-180" : "-scale-y-100"}`}
        />
      </button>

      {expanded && (
        <div
          id="hiload-desktop-variant-options"
          className="flex flex-col gap-1.5 rounded-lg border border-white/40 bg-white/95 p-2 shadow-lg backdrop-blur-md"
        >
          {HILOAD_VARIANTS.map((v, i) => (
            <button
              key={v.name}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
              className={`flex w-full items-center justify-between rounded-[8px] p-2 text-left transition-colors ${i === selectedIndex ? "bg-[#eaf1ff] font-bold text-[#0E2F6D]" : "hover:bg-gray-100 text-[#121212]"}`}
            >
              <div className="flex items-center gap-2">
                <div className="relative size-8 shrink-0 overflow-hidden rounded bg-gray-100">
                  <Image src={`${ASSET}${v.image}`} alt="" fill sizes="32px" className="object-contain p-0.5" />
                </div>
                <span className="text-[13px]">{v.name}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#0E2F6D]">{v.price}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecsGrid() {
  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center rounded-[8px] border border-white/40 bg-white/20 p-2.5 shadow-sm backdrop-blur-[12px]">
      <div className="flex w-full items-center justify-between pb-2.5">
        <div className="flex flex-1 flex-col items-start pr-3">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[0].value} <span className="font-sans text-[14px] font-medium">{STATS[0].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[0].label}
          </p>
        </div>
        <div className="h-[38px] w-[1px] bg-[#121212]/15" />
        <div className="flex flex-1 flex-col items-start pl-4">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[1].value} <span className="font-sans text-[14px] font-medium">{STATS[1].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[1].label}
          </p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#121212]/15" />
      <div className="flex w-full items-center justify-between pt-2.5">
        <div className="flex flex-1 flex-col items-start pr-3">
          <p className="font-display text-[20px] font-semibold leading-[115%] tracking-[-0.4px] text-[#121212]">
            {STATS[2].value} <span className="font-sans text-[14px] font-medium">{STATS[2].unit}</span>
          </p>
          <p className="font-sans text-[14px] font-medium capitalize leading-normal text-[#121212]">
            {STATS[2].label}
          </p>
        </div>
        <div className="h-[38px] w-[1px] bg-[#121212]/15" />
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

export default function HiLoadHero() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [variantsExpanded, setVariantsExpanded] = useState(false);
  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!variantsExpanded) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        desktopPanelRef.current && !desktopPanelRef.current.contains(target) &&
        mobilePanelRef.current && !mobilePanelRef.current.contains(target)
      ) {
        setVariantsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [variantsExpanded]);

  const toggleVariants = () => setVariantsExpanded((expanded) => !expanded);
  const selectVariant = (index: number) => {
    setSelectedVariant(index);
    setVariantsExpanded(false);
  };
  const selected = HILOAD_VARIANTS[selectedVariant];

  return (
    <section
      aria-label={selected.name}
      className="relative w-full overflow-hidden bg-white max-lg:overflow-visible max-lg:h-[762px] sm:max-lg:h-[820px] max-lg:w-full lg:h-[800px]"
    >
      {/* Mobile background: Homepage perspective warehouse tunnel */}
      <div aria-hidden className="absolute inset-0 overflow-hidden lg:hidden">
        <Image
          src="/images/vehicel images.png"
          alt="Euler HiLoad EV background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Mobile HiLoad EV vehicle cutout positioned in the tunnel */}
        <div
          className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[270px] sm:w-[440px] sm:h-[340px]"
        >
          <Image
            src="/assets/products/vehicle-hiload-ev-clean.png"
            alt="Euler HiLoad EV"
            fill
            priority
            sizes="440px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Desktop background: Homepage perspective warehouse tunnel */}
      <div aria-hidden className="absolute inset-0 hidden pointer-events-none lg:block">
        <Image
          src="/images/vehicel images.png"
          alt="Euler HiLoad EV background scene"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
          quality={100}
        />
      </div>

      {/* Desktop HiLoad EV Cutout aligned in the tunnel perspective (same as homepage ProductShowcase) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 hidden aspect-[1440/874] w-full max-w-[1440px] -translate-x-1/2 pointer-events-none lg:block"
      >
        <div className="absolute left-1/2 -translate-x-1/2 w-[62%] h-[57.5%] top-[20.5%]">
          <Image
            src="/assets/products/vehicle-hiload-ev-clean.png"
            alt="Euler HiLoad EV"
            fill
            sizes="(min-width: 1440px) 900px, 65vw"
            className="object-contain"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Mobile layout container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[393px] sm:max-w-[560px] flex-col justify-between px-4 sm:px-6 pb-4 sm:pb-6 pt-[90px] sm:pt-[100px] lg:hidden">
        <div className="flex w-[302.801px] sm:w-[420px] max-w-full flex-col items-start justify-center gap-[12px]">
          <h1 className="self-stretch font-display text-[28px] sm:text-[36px] font-semibold leading-[115%] tracking-[-0.56px] text-[#121212]">
            {selected.name}
          </h1>
          <p className="w-[308.685px] sm:w-[420px] max-w-full font-sans text-[12px] sm:text-[14px] font-normal leading-normal text-[#121212]">
            Xtra load needs Xtra performance. India&apos;s highest-rated electric cargo 3-wheeler with up to 688 kg payload, 170 km range, and 88.55 Nm peak torque.
          </p>
          <a
            href="#book-test-drive"
            className="flex h-[44px] sm:h-[48px] items-center justify-center gap-[8px] rounded-[4px] bg-[#121212] px-[20px] sm:px-[24px] font-sans text-[14px] sm:text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <span>Download Brochure</span>
            <Arrow color="white" />
          </a>
        </div>

        <div ref={mobilePanelRef} className="relative z-20 flex w-full flex-col items-start gap-3">
          <Thumbs />
          <VariantsTab selectedIndex={selectedVariant} expanded={variantsExpanded} onToggle={toggleVariants} onSelect={selectVariant} />
          <SpecsGrid />
        </div>
      </div>

      {/* Desktop layout container */}
      <div className="relative z-10 mx-auto hidden h-full max-w-[1440px] lg:block">
        {/* Left header */}
        <div className="absolute left-20 top-[130px] flex w-[320px] flex-col items-start gap-4">
          <h1 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink">
            {selected.name}
          </h1>
          <p className="w-[310px] font-sans text-[16px] leading-normal text-ink">
            Xtra load needs Xtra performance. India&apos;s highest-rated electric cargo 3-wheeler with up to 688 kg payload, 170 km range, and 88.55 Nm peak torque.
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
        <div ref={desktopPanelRef} className="absolute right-20 top-[130px]">
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
