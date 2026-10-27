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
      <div className="relative mx-auto hidden w-full max-w-none flex-col items-center gap-6 pb-12 pt-0 md:flex md:gap-8 lg:gap-[42px] lg:pb-[62px]">
        <div
          id="load-carousel-desktop"
          ref={desktopCarousel}
          className="snap-row w-full items-center gap-3.5 md:gap-4 lg:gap-5"
        >
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{
              width:
                "calc(max(16px, (100vw - 1440px) / 2 + 24px))",
            }}
          />
          <DesktopLoadCard variant="load" />
          <DesktopLoadCard variant="payload" />
          <DesktopLoadCard variant="load" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[101.97px] right-0 z-10 hidden h-[532.06px] w-[210.811px] bg-[rgba(0,0,0,0.01)] backdrop-blur-[4px] lg:block"
        />
        <button
          type="button"
          aria-label="Previous load features"
          onClick={() => scrollLoad(-1)}
          className="absolute bottom-[300px] left-4 z-10 flex h-[48px] w-[48px] -scale-x-100 items-center justify-center rounded-[8px] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),#212121] p-3 md:bottom-[320px] md:left-6 md:h-[55px] md:w-[55px] md:p-4 lg:bottom-[340.5px] lg:left-[calc(max(0px,(100vw-1440px)/2)+max(0px,(min(100vw,1440px)-1400px)/2)+40px)]"
        >
          <img src={`${A}/load__imgRightArrowContainer.svg`} alt="" width="55" height="55" className="max-w-none" />
        </button>
        <button
          type="button"
          aria-label="Next load features"
          onClick={() => scrollLoad(1)}
          className="absolute bottom-[300px] right-4 z-10 flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),#212121] p-3 md:bottom-[320px] md:right-6 md:h-[55px] md:w-[55px] md:p-4 lg:bottom-[340.5px] lg:right-[calc(max(0px,(100vw-1440px)/2)+max(0px,(min(100vw,1440px)-1400px)/2)+40px)]"
        >
          <img src={`${A}/load__imgRightArrowContainer1.svg`} alt="" width="55" height="55" className="max-w-none" />
        </button>
        <PagerBar rowId="load-carousel-desktop" className="bg-white/20 [&>div]:bg-white" />
      </div>

      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center justify-center gap-6 px-5 py-[35px] md:hidden">
        <div className="relative -mx-5 w-[calc(100%+40px)]">
        <div id="load-carousel-mobile" className="snap-row snap-center-mobile gap-3 px-5">
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
    <article data-carousel-card className="relative flex h-[430px] w-[500px] shrink-0 snap-start items-end justify-center gap-[10px] overflow-clip rounded-[12px] border border-white/20 p-6 md:h-[460px] md:w-[540px] md:p-7 lg:h-[488px] lg:w-[620px] lg:px-8 lg:pb-8 lg:pt-[252px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px]">
        <img
          src={LOAD_CARD_IMAGES[variant]}
          alt=""
          className="absolute left-[0.117px] top-[-32.237px] h-[106.547%] w-[99.951%] max-w-none rounded-[12px] object-cover"
        />
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

      <div className="relative flex w-[184px] shrink-0 flex-col items-start gap-[10px] overflow-clip rounded-[8px] border border-white/25 bg-white/[0.04] p-3 text-white">
        <p className="whitespace-nowrap font-display text-[0px] leading-[1.15] tracking-[-0.84px]">
          <span className="text-[42px] font-semibold">1,500 </span>
          <span className="text-[20px]">kg</span>
        </p>
        <p className="whitespace-nowrap font-display text-[16px] leading-[1.15] tracking-[-0.32px]">{payload ? "Maximum Payload" : "payload, rated"}</p>
      </div>
    </article>
  );
}
