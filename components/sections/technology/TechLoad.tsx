"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const A = "/assets/technology-page";
const LOAD_CARD_IMAGES = {
  load: `${A}/load-card-drive-exact.png`,
  payload: `${A}/load-card-payload-exact.png`,
} as const;

type CardVariant = "load" | "payload";
const CARDS_CYCLE: CardVariant[] = ["load", "payload", "load", "payload"];
const SET_SIZE = CARDS_CYCLE.length;
const LOOPED_CARDS: CardVariant[] = [...CARDS_CYCLE, ...CARDS_CYCLE, ...CARDS_CYCLE];

/** TECHNOLOGY page — "Load / Rated with weight on it." (Figma 3019:11885, 393×601). */
export default function TechLoad() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopCarousel = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const virtualIndexRef = useRef(SET_SIZE);
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getCardStep = () => {
    const container = desktopCarousel.current;
    if (!container) return 640;
    const card = container.querySelector<HTMLElement>("[data-carousel-card]");
    if (!card) return 640;
    const gap = parseFloat(getComputedStyle(container).columnGap) || 20;
    return card.offsetWidth + gap;
  };

  // Center on middle set (Set 1) on initial client mount
  useEffect(() => {
    const container = desktopCarousel.current;
    if (!container) return;
    const step = getCardStep();
    container.scrollLeft = SET_SIZE * step;
    virtualIndexRef.current = SET_SIZE;
  }, []);

  const scrollToVirtualIndex = (vIndex: number, behavior: ScrollBehavior = "smooth") => {
    const container = desktopCarousel.current;
    if (!container) return;
    const step = getCardStep();
    virtualIndexRef.current = vIndex;

    container.scrollTo({
      left: vIndex * step,
      behavior,
    });

    const normalized = ((vIndex % 2) + 2) % 2;
    setActiveIndex(normalized);

    // If scrolled past the center set into Set 0 or Set 2, seamlessly jump back to Set 1
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    if (vIndex >= 2 * SET_SIZE || vIndex < SET_SIZE) {
      jumpTimeoutRef.current = setTimeout(() => {
        if (!desktopCarousel.current) return;
        const resetIndex = (((vIndex % SET_SIZE) + SET_SIZE) % SET_SIZE) + SET_SIZE;
        virtualIndexRef.current = resetIndex;
        desktopCarousel.current.style.scrollSnapType = "none";
        desktopCarousel.current.scrollLeft = resetIndex * getCardStep();
        requestAnimationFrame(() => {
          if (desktopCarousel.current) {
            desktopCarousel.current.style.scrollSnapType = "";
          }
        });
      }, 500);
    }
  };

  // Section visibility tracking
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Desktop auto-scroll loop
  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const interval = setInterval(() => {
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
      if (
        isDesktop &&
        isVisibleRef.current &&
        !isHoveredRef.current &&
        !isInteractingRef.current
      ) {
        scrollToVirtualIndex(virtualIndexRef.current + 1, "smooth");
      }
    }, 3500);

    return () => {
      clearInterval(interval);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, []);

  const scroll = (direction: -1 | 1) => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);

    const nextVirtual = virtualIndexRef.current + direction;
    scrollToVirtualIndex(nextVirtual, "smooth");

    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 4000);
  };

  const handleScroll = () => {
    if (!desktopCarousel.current) return;
    const scrollLeft = desktopCarousel.current.scrollLeft;
    const step = getCardStep();
    if (step <= 0) return;
    const vIndex = Math.round(scrollLeft / step);
    const normalized = ((vIndex % 2) + 2) % 2;
    setActiveIndex(normalized);

    if (isInteractingRef.current) {
      virtualIndexRef.current = vIndex;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#041231] bg-[linear-gradient(180deg,#041231_0%,#0c3797_100%)] overflow-hidden"
      aria-label="Load"
    >
      <div
        className="relative mx-auto hidden w-full max-w-none flex-col items-center gap-6 pb-12 pt-0 md:flex md:gap-8 lg:gap-[42px] lg:pb-[62px]"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div className="relative w-full">
          <div
            id="load-carousel-desktop"
            ref={desktopCarousel}
            onScroll={handleScroll}
            className="snap-row w-full items-center gap-3.5 md:gap-4 lg:gap-5 px-6 md:px-10 lg:px-[max(80px,calc((100vw-1280px)/2))] lg:scroll-pl-[max(80px,calc((100vw-1280px)/2))]"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {LOOPED_CARDS.map((variant, index) => (
              <DesktopLoadCard
                key={`${variant}-${index}`}
                variant={variant}
              />
            ))}
          </div>


          <button
            type="button"
            aria-label="Previous load features"
            onClick={() => scroll(-1)}
            className="absolute top-1/2 left-4 z-30 flex h-[48px] w-[48px] -translate-y-1/2 -scale-x-100 items-center justify-center rounded-[8px] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),#212121] p-3 md:left-6 md:h-[55px] md:w-[55px] md:p-4 lg:left-[calc(max(0px,(100vw-1440px)/2)+max(0px,(min(100vw,1440px)-1400px)/2)+40px)] transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <img src={`${A}/load__imgRightArrowContainer.svg`} alt="" width="55" height="55" className="max-w-none" />
          </button>
          <button
            type="button"
            aria-label="Next load features"
            onClick={() => scroll(1)}
            className="absolute top-1/2 right-4 z-30 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-[8px] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),#212121] p-3 md:right-6 md:h-[55px] md:w-[55px] md:p-4 lg:right-[calc(max(0px,(100vw-1440px)/2)+max(0px,(min(100vw,1440px)-1400px)/2)+40px)] transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <img src={`${A}/load__imgRightArrowContainer1.svg`} alt="" width="55" height="55" className="max-w-none" />
          </button>
        </div>

        {/* Carousel Progress Indicator Pill */}
        <div className="mx-auto hidden w-full max-w-[1440px] items-center justify-center md:flex">
          <div className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-white/20 p-1">
            <div
              className="h-full rounded-[23px] bg-white transition-all duration-300"
              style={{
                width: "50%",
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>
        </div>
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

      <div className="relative flex w-full shrink-0 flex-col items-start overflow-clip rounded-[8px] border border-white/20 bg-white/[0.04] p-3">
        <div className="flex w-full items-baseline gap-[8px] leading-[1.15] text-white">
          <p className="shrink-0 font-display text-[36px] font-semibold tracking-[-0.72px]">1,500</p>
          <p className="shrink-0 font-display text-[14px] font-normal tracking-[-0.28px]">
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
    <article
      data-carousel-card
      className="relative flex h-[488px] w-[620px] shrink-0 snap-start items-end justify-center gap-[10px] overflow-clip rounded-[12px] border border-white/20 px-[32px] pb-[32px] pt-[252px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px]">
        <img
          src={LOAD_CARD_IMAGES[variant]}
          alt=""
          className="absolute left-[0.117px] top-[-32.237px] h-[106.547%] w-[99.951%] max-w-none rounded-[12px] object-cover"
        />
        <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[53.37%] to-black to-[73.84%]" />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col items-start gap-[12px] overflow-clip text-white">
        <div className="relative flex h-4 items-center gap-1">
          <img src={`${A}/load__imgRectangle42112.svg`} alt="" width="114.561" height="16" className="absolute left-[3.43px] top-[0.33px] max-w-none" />
          <img src={`${A}/load__imgRectangle42113.svg`} alt="" width="14.1899" height="16" className="relative max-w-none" />
          <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase tracking-[0.6px]">{label}</span>
        </div>
        <h2 className="whitespace-nowrap font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.52px]">{title}</h2>
        <p className="max-w-[340px] font-sans text-[16px] leading-[1.4]">{body}</p>
      </div>

      <div className="relative flex h-[100px] w-[184px] shrink-0 flex-col gap-[10px] items-start overflow-clip rounded-[8px] border border-white/20 bg-white/[0.04] p-[12px] text-white">
        <div className="flex items-baseline gap-[6px] text-white leading-[1.15]">
          <span className="font-display text-[42px] font-semibold tracking-[-0.84px]">1,500</span>
          <span className="font-display text-[20px] font-normal tracking-[-0.4px]">kg</span>
        </div>
        <p className="whitespace-nowrap font-display text-[16px] font-normal leading-[1.15] tracking-[-0.32px]">{payload ? "Maximum Payload" : "payload, rated"}</p>
      </div>
    </article>
  );
}
