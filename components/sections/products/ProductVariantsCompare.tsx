import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

const TRUCK_IMG = "/assets/products/variant-compare-truck.png";

type VariantData = {
  name: string;
  pillBg: string;
  bodyType: string;
  emi: string;
  payload: string;
  range: string;
  runningCost: string;
  fullCharge: string;
  cargoSpace: string;
};

const VARIANTS: VariantData[] = [
  {
    name: "Base Variant",
    pillBg: "bg-white lg:shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
    bodyType: "Flatbed",
    emi: "₹19,800",
    payload: "1,200 kg",
    range: "200 km",
    runningCost: "₹1.05/km",
    fullCharge: "90 min",
    cargoSpace: "2.9 m loading deck",
  },
  {
    name: "Cargo Variant",
    pillBg: "bg-[#f3f4f5]",
    bodyType: "3 wheel",
    emi: "688 kg",
    payload: "151 km",
    range: "Rs 0.84",
    runningCost: "75 min",
    fullCharge: "18%",
    cargoSpace: "Rs 4.29 L",
  },
  {
    name: "XL Variant",
    pillBg: "bg-[#f3f4f5]",
    bodyType: "3 wheel",
    emi: "688 kg",
    payload: "151 km",
    range: "Rs 0.84",
    runningCost: "75 min",
    fullCharge: "18%",
    cargoSpace: "Rs 4.29 L",
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

const VALUES = (v: VariantData) => [
  v.bodyType,
  v.emi,
  v.payload,
  v.range,
  v.runningCost,
  v.fullCharge,
  v.cargoSpace,
];

/**
 * Compare variants side by side — Figma node 2861:7715
 * 1440px frame, px-79/py-47, heading row + side-by-side comparison table
 * with Base Variant gradient highlight and truck renders above each column.
 *
 * Mobile (Figma 393px): header on top, horizontally scrollable comparison
 * card, and the two CTA buttons moved to the section's bottom in one row.
 */
export default function ProductVariantsCompare() {
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
          <div className="relative w-[488.801px] shrink-0">
            {/* Truck renders */}
            <div className="relative mb-3 h-[47.389px] w-full">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute top-0 aspect-[45/29] h-[47.389px] w-[73.534px] shrink-0"
                  style={{ left: `${132.034 + i * 120}px` }}
                >
                  <Image
                    src={TRUCK_IMG}
                    alt=""
                    fill
                    sizes="74px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="relative h-[286px] w-[488.801px] shrink-0 rounded-[9.6px] border-[0.8px] border-[#ccc] bg-white p-5 pl-[108.801px]">
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

            {/* Base Variant highlight — spans the full card height (top → bottom border) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[108.801px] top-0 flex h-full w-[120px] flex-col justify-between overflow-hidden rounded-[0_3.2px_3.2px_0]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(29,111,255,0.20) 0%, rgba(29,111,255,0.04) 35.26%, rgba(29,111,255,0.04) 75%, rgba(29,111,255,0.20) 100%)",
              }}
            >
              <div className="h-[6.4px] w-full shrink-0 bg-[#0E2F6D]" />
              <div className="h-[6.4px] w-full shrink-0 bg-[#0E2F6D]" />
            </div>

            {/* Variant columns */}
            {VARIANTS.map((variant, i) => (
              <div
                key={variant.name}
                className="absolute flex h-[246px] w-[120px] flex-col items-center justify-between py-[10px]"
                style={{
                  left: `${108.801 + i * 120}px`,
                  top: "20px",
                }}
              >
                <div
                  className={`flex items-center rounded-[9.6px] px-[10px] py-[4px] ${variant.pillBg}`}
                >
                  <p className="whitespace-nowrap text-center font-sans text-[12px] font-bold leading-[1.2] tracking-[-0.24px] text-[#121212]">
                    {variant.name}
                  </p>
                </div>
                {VALUES(variant).map((value, vi) => (
                  <p
                    key={vi}
                    className={`whitespace-nowrap font-sans text-[12px] font-bold leading-[1.2] tracking-[-0.06px] ${
                      i === 0 ? "text-ink" : "text-[#121212]"
                    }`}
                  >
                    {value}
                  </p>
                ))}
              </div>
            ))}
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

      {/* ===== Desktop (unchanged) ===== */}
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
              {/* 3 Truck Renders sitting on top of the table (Figma 2861:7786) */}
              <div className="absolute left-[352.53px] top-[9px] flex items-center gap-[136px]">
                <div className="relative h-[119.284px] w-[185.096px] shrink-0">
                  <Image
                    src={TRUCK_IMG}
                    alt="Base Variant Truck"
                    fill
                    sizes="185px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="relative h-[119.284px] w-[185.096px] shrink-0">
                  <Image
                    src={TRUCK_IMG}
                    alt="Cargo Variant Truck"
                    fill
                    sizes="185px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="relative h-[119.284px] w-[185.096px] shrink-0">
                  <Image
                    src={TRUCK_IMG}
                    alt="XL Variant Truck"
                    fill
                    sizes="185px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Table Card (Figma 2861:7736) */}
              <div className="absolute bottom-0 left-0 flex h-[456px] w-[1277px] items-center justify-between overflow-hidden rounded-[12px] border border-[#ccc] bg-white px-8 py-[42px]">
                {/* Highlight Column for Base Variant (Figma 2861:7737) */}
                <div
                  className="pointer-events-none absolute left-[266.93px] top-1/2 flex h-[456px] w-[348px] -translate-y-1/2 flex-col justify-between overflow-hidden rounded-[4px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(29, 111, 255, 0.2) 0%, rgba(29, 111, 255, 0.04) 35.26%, rgba(29, 111, 255, 0.04) 75%, rgba(29, 111, 255, 0.2) 100%)",
                  }}
                >
                  <div className="h-2 w-full bg-[#0e2f6d]" />
                  <div className="h-2 w-full bg-[#0e2f6d]" />
                </div>

                {/* Column 1: Labels (Figma 2861:7740) */}
                <div className="flex h-[400px] w-[242px] shrink-0 flex-col items-start justify-between">
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

                {/* Column 2: Base Variant (Figma 2861:7750) */}
                <div className="relative z-10 flex h-[400px] w-[312.143px] shrink-0 flex-col items-center justify-between">
                  <div className={`flex items-center rounded-[12px] px-4 py-3 ${VARIANTS[0].pillBg}`}>
                    <p className="font-sans text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink">
                      {VARIANTS[0].name}
                    </p>
                  </div>
                  {VALUES(VARIANTS[0]).map((value, vi) => (
                    <p
                      key={vi}
                      className="whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.1px] text-ink"
                    >
                      {value}
                    </p>
                  ))}
                </div>

                {/* Column 3: Cargo Variant (Figma 2861:7762) */}
                <div className="relative z-10 flex h-[400px] w-[312.143px] shrink-0 flex-col items-center justify-between">
                  <div className={`flex items-center rounded-[12px] px-4 py-3 ${VARIANTS[1].pillBg}`}>
                    <p className="font-sans text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink">
                      {VARIANTS[1].name}
                    </p>
                  </div>
                  {VALUES(VARIANTS[1]).map((value, vi) => (
                    <p
                      key={vi}
                      className="whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.1px] text-ink"
                    >
                      {value}
                    </p>
                  ))}
                </div>

                {/* Column 4: XL Variant (Figma 2861:7774) */}
                <div className="relative z-10 flex h-[400px] w-[312.143px] shrink-0 flex-col items-center justify-between">
                  <div className={`flex items-center rounded-[12px] px-4 py-3 ${VARIANTS[2].pillBg}`}>
                    <p className="font-sans text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink">
                      {VARIANTS[2].name}
                    </p>
                  </div>
                  {VALUES(VARIANTS[2]).map((value, vi) => (
                    <p
                      key={vi}
                      className="whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.1px] text-ink"
                    >
                      {value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
