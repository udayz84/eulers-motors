import { Fragment } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Arrow from "../ui/Arrow";

const FEATURES = [
  { value: "24 hours", label: "Truck back in a day" },
  { value: "Spare vehicle", label: "Totally free" },
  { value: "Every 3 months", label: "Free check-up at your depot" },
];

/**
 * Euler Prime banner (desktop 1:1819 · mobile 1:4894).
 * Desktop: exact Figma layer stack — bg-3 sits on top (103.32%×106.74%),
 * so the white base, bg-1/bg-2 and the gradient renders beneath it, clipped.
 * Mobile: black base + a single bg-3 strip in the bottom half, right-anchored
 * (178.63% × 51.83% at (-78.67, 48.03)), content top-aligned at 36.33px.
 */
export default function PrimeBanner() {
  return (
    <section className="relative h-[620px] overflow-clip bg-black lg:h-[600px] lg:bg-white" aria-label="Euler Prime">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* mobile background (Figma 1:4894) — bg-3 only, bottom half of the section */}
        <div className="absolute inset-0 overflow-hidden lg:hidden">
          <Image
            src="/assets/prime/bg-3.png"
            alt=""
            width={2186}
            height={941}
            priority
            className="absolute max-w-none"
            style={{ left: "-78.67%", top: "48.03%", width: "178.63%", height: "51.83%" }}
          />
        </div>
        {/* desktop background stack (Figma 1:1819, bottom → top) */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-0 bg-white" />
          <Image src="/assets/prime/bg-1.png" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 overflow-hidden">
            {/* bg-2 — h 175.86% at (-4.68, -37.93), w 119.36% */}
            <Image
              src="/assets/prime/bg-2.png"
              alt=""
              width={1670}
              height={942}
              className="absolute max-w-none"
              style={{ left: "-4.68%", top: "-37.93%", width: "119.36%", height: "175.86%" }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(0,0,0) 0%, rgb(0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 24.792%, rgba(0,0,0,0) 54.063%)",
            }}
          />
          <div className="absolute inset-0 overflow-hidden">
            {/* bg-3 — top layer, h 106.74% at (0.02, 0), w 103.32% */}
            <Image
              src="/assets/prime/bg-3.png"
              alt=""
              width={2186}
              height={941}
              className="absolute max-w-none"
              style={{ left: "0.02%", top: 0, width: "103.32%", height: "106.74%" }}
            />
          </div>
        </div>
      </div>
      {/* Container Background (Figma 1:1820) — frosted-glass panel over the
          left bg stack: inner backdrop-blur 16 + black/20 wash, its edges
          softened by the 102.15px gaussian on the wrapper */}
      <div aria-hidden className="absolute -left-[204.85px] -top-[74.54px] hidden h-[816.697px] w-[646.484px] blur-[102.15px] lg:block">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[16px]" />
      </div>

      {/* desktop column per Figma 1:1821: left 80px inside the 1440px frame,
          vertically centered, w 636. The anchor tracks the centered 1440px
          frame on wider viewports (50vw-640px = frame left + 80px), floored
          at 80px below it; the bg art scales with the viewport. Mobile stays
          top-left as before */}
      <div className="absolute inset-0 flex flex-col items-start justify-start gap-[14px] px-[20px] pt-[36px] lg:w-[calc(max(80px,calc(50vw-640px))+636px)] lg:justify-center lg:gap-[25px] lg:px-0 lg:pl-[max(80px,calc(50vw-640px))] lg:pt-0">
        <Eyebrow label="Euler Prime" dark />
        <h2 className="w-full max-w-[311px] font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:max-w-none lg:text-[52px] lg:tracking-[-1.04px]">
          Get free check-up at your depot with Prime
        </h2>

        {/* features — desktop: flat row [col · dot · col · dot · col] gap 20 (Figma 1:1827–38);
            mobile: inline rows [value · dot · label] gap 5.5, stacked gap 11 (Figma 1:4903–14) */}
        <div className="flex w-full max-w-[353px] flex-col items-start gap-[11px] rounded-[5.5px] bg-navy/35 p-2.5 lg:max-w-none lg:flex-row lg:items-center lg:gap-5 lg:rounded-[10px] lg:p-5">
          {FEATURES.map((f, i) => (
            <Fragment key={f.value}>
              <div className="flex items-center gap-[5.5px] lg:flex-col lg:items-start lg:gap-2.5">
                <span className="whitespace-nowrap font-display text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-[#f3f4f5] lg:text-[24px] lg:tracking-[-0.48px]">
                  {f.value}
                </span>
                {/* mobile separator — sits between value and label (Figma 1:4905) */}
                <span aria-hidden className="h-[4.4px] w-[5px] shrink-0 rounded-full bg-white/50 lg:hidden" />
                <span className="text-[12px] leading-normal text-[#ccc] lg:text-[16px]">{f.label}</span>
              </div>
              {i < FEATURES.length - 1 && (
                /* desktop separators: 8×8 after the first feature, 9×8 after the second (Figma 1:1832/1:1836) */
                <span
                  aria-hidden
                  className={`hidden rounded-full bg-white/50 lg:block ${i === 0 ? "size-2" : "h-2 w-[9px]"}`}
                />
              )}
            </Fragment>
          ))}
        </div>

        <a
          href="#book-test-drive"
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[4px] bg-white px-5 font-display text-[12px] font-semibold leading-none text-navy lg:h-[50.477px] lg:px-6 lg:text-[16px]"
        >
          See Euler Prime
          <Arrow color="navy" />
        </a>
      </div>
    </section>
  );
}
