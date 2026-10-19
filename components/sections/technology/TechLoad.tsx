"use client";

import { useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const A = "/assets/technology-page";

/** TECHNOLOGY page — "Load / Rated with weight on it." (Figma 3019:11885, 393×601). */
export default function TechLoad() {
  const desktopCarousel = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative bg-[#041231] bg-[linear-gradient(180deg,#041231_0%,#0c3797_100%)]"
      aria-label="Load"
    >
      <div className="mx-auto hidden w-full max-w-[1440px] flex-col items-center gap-[42px] px-20 pb-[62px] pt-[41px] lg:flex">
        <div id="load-carousel-desktop" ref={desktopCarousel} className="no-scrollbar flex w-full items-center gap-5 overflow-x-auto">
          <DesktopLoadCard variant="load" />
          <DesktopLoadCard variant="payload" />
          <DesktopLoadCard variant="load" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-[532px] w-[211px] bg-black/[0.01] backdrop-blur-[0px] lg:block" />
        <button
          type="button"
          aria-label="Previous load features"
          onClick={() => desktopCarousel.current?.scrollBy({ left: -640, behavior: "smooth" })}
          className="absolute left-[49.82px] top-[216.5px] z-10 size-[55px] rotate-180"
        >
          <img src={`${A}/load__imgRightArrowContainer.svg`} alt="" width="55" height="55" className="max-w-none" />
        </button>
        <button
          type="button"
          aria-label="Next load features"
          onClick={() => desktopCarousel.current?.scrollBy({ left: 640, behavior: "smooth" })}
          className="absolute right-[49.82px] top-[216.5px] z-10 size-[55px]"
        >
          <img src={`${A}/load__imgRightArrowContainer1.svg`} alt="" width="55" height="55" className="max-w-none" />
        </button>
        <PagerBar rowId="load-carousel-desktop" className="bg-white/20 [&>div]:bg-white" />
      </div>

      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center justify-center gap-6 px-5 py-[35px] lg:hidden">
        <div id="load-carousel-mobile" className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto">
          <MobileLoadCard variant="load" />
          <MobileLoadCard variant="payload" />
        </div>

        <PagerBar rowId="load-carousel-mobile" />
      </div>
    </section>
  );
}

function MobileLoadCard({ variant }: { variant: "load" | "payload" }) {
  const payload = variant === "payload";
  const title = payload ? "Carry More Every Trip" : "Rated with weight on it.";
  const body = payload ? (
    "Built to carry heavy loads without compromising performance."
  ) : (
    <>
      Payload, range and gradient are quoted
      <br />
      loaded. Empty numbers help nobody.
    </>
  );

  return (
    <div className="relative flex h-[488px] w-full shrink-0 flex-col items-center justify-end gap-[10px] overflow-clip rounded-[12px] border border-white/20 px-3 pb-3 pt-[252px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px]">
        <div className="absolute inset-0 overflow-hidden rounded-[12px]">
          <img src={`${A}/load__imgFrame1984081153.png`} alt="" className="absolute left-[-0.05%] top-[-10.55%] h-[85.66%] w-[100.1%] max-w-none" />
          {payload && (
            <img src={`${A}/load__imgFrame2147239381.png`} alt="" className="absolute inset-0 size-full rounded-[12px] object-cover" />
          )}
        </div>
        <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[53.37%] to-black to-[73.84%]" />
      </div>

      <div className="relative flex w-full shrink-0 flex-col items-start gap-3 overflow-clip">
        <Eyebrow label={payload ? "Payload" : "Load"} dark />
        <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
          {title}
        </h2>
        <p className="w-full font-sans text-[12px] font-normal leading-normal text-white">{body}</p>
      </div>

      <div className="relative flex w-full shrink-0 flex-col items-start overflow-clip rounded-[8px] border border-white/25 bg-[rgba(255,255,255,0.04)] p-3">
        <div className="flex w-full items-center gap-[10px] leading-[1.15] text-white">
          <p className="shrink-0 font-display text-[36px] font-semibold tracking-[-0.72px]">1,500</p>
          <p className="shrink-0 font-display text-[14px] tracking-[-0.28px]">
            {payload ? "kg maximum payload" : "kg payload, rated"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopLoadCard({ variant }: { variant: "load" | "payload" }) {
  const payload = variant === "payload";
  const label = payload ? "Payload" : "Load";
  const title = payload ? "Carry More Every Trip" : "Rated with weight on it.";
  const body = payload
    ? "Built to carry heavy loads without compromising performance."
    : "Payload, range and gradient are quoted loaded. Empty numbers help nobody.";

  return (
    <article className="relative flex h-[488px] w-[620px] shrink-0 items-end gap-[10px] overflow-clip rounded-[12px] border border-white/20 px-8 pb-8 pt-[252px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px]">
        <div className="absolute inset-0 overflow-hidden rounded-[12px]">
          <img src={`${A}/load__imgFrame1984081153.png`} alt="" className="absolute left-[0.02%] top-[-6.61%] h-[106.55%] w-[99.95%] max-w-none" />
        </div>
        {payload && <img src={`${A}/load__imgFrame2147239381.png`} alt="" className="absolute inset-0 size-full rounded-[12px] object-cover" />}
        <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[53.37%] to-black to-[73.84%]" />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col items-start gap-3 overflow-clip text-white">
        <div className="relative flex h-4 items-center gap-1">
          <img src={`${A}/load__imgRectangle42112.svg`} alt="" width="114.561" height="16" className="absolute left-[3.43px] top-[0.33px] max-w-none" />
          <img src={`${A}/load__imgRectangle42113.svg`} alt="" width="14.1899" height="16" className="relative max-w-none" />
          <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase tracking-[0.6px]">{label}</span>
        </div>
        <h2 className="whitespace-nowrap font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.52px]">{title}</h2>
        <p className="max-w-[340px] font-sans text-[16px] leading-[1.4]">{body}</p>
      </div>

      <div className="relative flex w-[184px] shrink-0 flex-col items-start gap-[10px] overflow-clip rounded-[8px] bg-white/[0.04] p-3 text-white">
        <p className="whitespace-nowrap font-display text-[0px] leading-[1.15] tracking-[-0.84px]">
          <span className="text-[42px] font-semibold">1,500 </span>
          <span className="text-[20px]">kg</span>
        </p>
        <p className="whitespace-nowrap font-display text-[16px] leading-[1.15] tracking-[-0.32px]">{payload ? "Maximum Payload" : "payload, rated"}</p>
      </div>
    </article>
  );
}
