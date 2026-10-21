"use client";

import { useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const A = "/assets/technology-page";
const LOAD_CARD_IMAGES = {
  load: `${A}/load-card-drive-exact.png`,
  payload: `${A}/load-card-payload-exact.png`,
} as const;

/** TECHNOLOGY page — "Load / Rated with weight on it." (Figma 3019:11885, 393×601). */
export default function TechLoad() {
  const desktopCarousel = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative bg-[#041231] bg-[linear-gradient(180deg,#041231_0%,#0c3797_100%)]"
      aria-label="Load"
    >
      <div className="relative mx-auto hidden w-full max-w-[1440px] flex-col items-center gap-[42px] pb-[62px] pt-0 lg:flex">
        <div
          id="load-carousel-desktop"
          ref={desktopCarousel}
          className="snap-row relative left-1/2 w-screen -translate-x-1/2 items-center gap-5"
        >
          {/* Customer Reviews aligns its first card at x=80px on a 1440px viewport.
              This spacer accounts for the 20px track gap so the card itself lands
              on the same x-position, while remaining responsive above 1440px. */}
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{
              width:
                "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 40px)",
            }}
          />
          <DesktopLoadCard variant="load" />
          <DesktopLoadCard variant="payload" />
          <DesktopLoadCard variant="load" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 z-10 hidden h-[532px] w-[180px] bg-gradient-to-l from-[#041231]/60 via-[#041231]/20 to-transparent backdrop-blur-[5px] lg:block"
          style={{ right: "min(0px, calc((1440px - 100vw) / 2))" }}
        />
        <button
          type="button"
          aria-label="Previous load features"
          onClick={() => scrollLoad(-1)}
          className="absolute left-[49.82px] top-[216.5px] z-10 size-[55px] rotate-180"
        >
          <img src={`${A}/load__imgRightArrowContainer.svg`} alt="" width="55" height="55" className="max-w-none" />
        </button>
        <button
          type="button"
          aria-label="Next load features"
          onClick={() => scrollLoad(1)}
          className="absolute right-[49.82px] top-[216.5px] z-10 size-[55px]"
        >
          <img src={`${A}/load__imgRightArrowContainer1.svg`} alt="" width="55" height="55" className="max-w-none" />
        </button>
        <PagerBar rowId="load-carousel-desktop" className="bg-white/20 [&>div]:bg-white" />
      </div>

      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center justify-center gap-6 px-5 py-[35px] lg:hidden">
        <div className="relative -mx-5 w-[calc(100%+40px)]">
        <div id="load-carousel-mobile" className="snap-row gap-3 px-5">
          <MobileLoadCard variant="load" />
          <MobileLoadCard variant="payload" />
          <MobileLoadCard variant="load" />
        </div>
        </div>

        <PagerBar rowId="load-carousel-mobile" />
      </div>
    </section>
  );
}

function scrollLoad(direction: -1 | 1) {
  const row = document.getElementById("load-carousel-desktop");
  const card = row?.querySelector<HTMLElement>("[data-carousel-card]");
  if (!row || !card) return;
  const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
  row.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
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
          <img src={LOAD_CARD_IMAGES[variant]} alt="" className="absolute inset-0 size-full rounded-[12px] object-cover object-top" />
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
    <article data-carousel-card className="relative flex h-[488px] w-[620px] shrink-0 snap-start items-end gap-[10px] overflow-clip rounded-[12px] border border-white/20 px-8 pb-8 pt-[252px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px]">
        <img src={LOAD_CARD_IMAGES[variant]} alt="" className="absolute inset-0 size-full rounded-[12px] object-cover object-top" />
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
