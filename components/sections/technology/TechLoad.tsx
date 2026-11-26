"use client";

import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";
import { mediaUrl } from "@/lib/strapi/client";
import { StrapiTechnologyLoadCard, StrapiTechnologyLoadSection } from "@/types/strapi";

const A = "/assets/technology-page";

export interface TechLoadProps {
  data?: StrapiTechnologyLoadSection;
}

function renderMultiline(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** TECHNOLOGY page — "Load / Rated with weight on it." (Figma 3019:11885 / 3321:13258). */
export default function TechLoad({ data }: TechLoadProps) {
  const cards = data?.cards || [];

  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
    } else {
      setScrollProgress(0);
    }
  }, []);

  const pauseAutoScroll = useCallback((duration = 600) => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, duration);
  }, []);

  useDraggableScroll(scrollRef, {
    onDragStart: () => {
      isDraggingRef.current = true;
      pauseAutoScroll(600);
    },
    onDragEnd: () => {
      isDraggingRef.current = false;
      pauseAutoScroll(400);
      updateProgress();
    },
  });

  // Track initial scroll progress and attach resize/scroll sync
  useEffect(() => {
    updateProgress();
    const row = scrollRef.current;
    if (!row) return;

    const onStep = () => pauseAutoScroll(600);
    const onWheel = () => pauseAutoScroll(1000);

    row.addEventListener("scroll", updateProgress, { passive: true });
    row.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", updateProgress);
    row.addEventListener("carousel-step", onStep);

    return () => {
      row.removeEventListener("scroll", updateProgress);
      row.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateProgress);
      row.removeEventListener("carousel-step", onStep);
    };
  }, [updateProgress, pauseAutoScroll]);

  // Section visibility tracking via IntersectionObserver with immediate viewport check
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isVisibleRef.current = true;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          isVisibleRef.current = entry.isIntersecting;
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Continuous auto-sliding loop (matching CustomerReviews, AboutEuler, Insights, ServicePreventiveAdvice)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime: number | null = null;
    let animId: number;
    let accumulator = 0;
    const speed = 50; // pixels per second

    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
      if (
        isDesktop &&
        isVisibleRef.current &&
        !isInteractingRef.current &&
        !isDraggingRef.current
      ) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 1) {
          accumulator += speed * delta;
          if (accumulator >= 1) {
            const advance = Math.floor(accumulator);
            accumulator -= advance;

            if (container.scrollLeft >= maxScroll - 2) {
              container.scrollLeft = 0;
            } else {
              container.scrollLeft += advance;
            }
            updateProgress();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, [updateProgress]);

  if (cards.length === 0) return null;

  const isCentered = cards.length <= 2;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#041231] bg-[linear-gradient(180deg,#041231_0%,#0c3797_100%)] overflow-hidden"
      aria-label={data?.eyebrow || "Load"}
    >
      <div className="relative mx-auto hidden w-full max-w-none flex-col items-center gap-6 pb-12 pt-0 md:flex md:gap-8 min-[1440px]:gap-[42px] min-[1440px]:pb-[62px]">
        <div className="relative w-full">
          <div
            id="load-carousel-desktop"
            ref={scrollRef}
            className={`no-scrollbar flex w-full items-center gap-3.5 md:gap-5 min-[1440px]:gap-5 px-6 md:px-10 overflow-x-auto cursor-grab active:cursor-grabbing select-none ${
              isCentered
                ? "min-[1260px]:justify-center min-[1260px]:px-0 xl:justify-center xl:px-0"
                : "lg:px-16"
            }`}
          >
            {cards.map((card, index) => (
              <DesktopLoadCard
                key={card.id ?? `${card.title}-${index}`}
                card={card}
              />
            ))}
          </div>

          {/* Blue Navigation Arrows with boundary auto-hide (matching global standard) */}
          <CarouselArrows
            rowId="load-carousel-desktop"
            label="load features"
            variant="blue"
            className="hidden md:block"
            onStep={() => pauseAutoScroll(600)}
          />
        </div>

        {/* Carousel Progress Indicator Pill (Figma 3321:13258 / 3354:19618) */}
        <div className="mx-auto hidden w-full max-w-[1440px] items-center justify-center md:flex">
          <div
            role="progressbar"
            aria-label="Load features scroll progress"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-white/20 p-1"
          >
            <div
              className="h-full w-[29.891px] rounded-[23.04px] bg-white transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translateX(${scrollProgress * 78.308}px)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile view (<768px) */}
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center justify-center gap-6 px-5 py-[35px] md:hidden">
        <div className="relative -mx-5 w-[calc(100%+40px)]">
          <div id="load-carousel-mobile" className="snap-row snap-center-mobile gap-3 px-5">
            {cards.map((card, i) => (
              <MobileLoadCard key={card.id ?? `${card.title}-${i}`} card={card} />
            ))}
          </div>
        </div>

        <PagerBar rowId="load-carousel-mobile" />
      </div>
    </section>
  );
}

function MobileLoadCard({ card }: { card: StrapiTechnologyLoadCard }) {
  const imgUrl = mediaUrl(card.image);
  const unitAndLabel = [card.statUnit, card.statLabel].filter(Boolean).join(" ");

  return (
    <div className="relative flex h-[488px] w-full shrink-0 flex-col items-center justify-end gap-[10px] overflow-clip rounded-[12px] border border-white/20 px-3 pb-3 pt-[252px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px]">
        {imgUrl && (
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <img src={imgUrl} alt="" className="absolute inset-0 size-full rounded-[12px] object-cover object-top" />
          </div>
        )}
        <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[53.37%] to-black to-[73.84%]" />
      </div>

      <div className="relative flex w-full shrink-0 flex-col items-start gap-3 overflow-clip">
        {card.eyebrow && <Eyebrow label={card.eyebrow} dark />}
        <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
          {card.title}
        </h2>
        <p className="w-full font-sans text-[12px] font-normal leading-normal text-white">
          {renderMultiline(card.description)}
        </p>
      </div>

      {(card.statValue || unitAndLabel) && (
        <div className="relative flex w-full shrink-0 flex-col items-start overflow-clip rounded-[8px] border border-white/20 bg-white/[0.04] p-3">
          <div className="flex w-full items-baseline gap-[8px] leading-[1.15] text-white">
            {card.statValue && (
              <p className="shrink-0 font-display text-[36px] font-semibold tracking-[-0.72px]">{card.statValue}</p>
            )}
            {unitAndLabel && (
              <p className="shrink-0 font-display text-[14px] font-normal tracking-[-0.28px]">
                {unitAndLabel}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopLoadCard({ card }: { card: StrapiTechnologyLoadCard }) {
  const imgUrl = mediaUrl(card.image);

  return (
    <article
      data-carousel-card
      className="relative flex h-[488px] w-[620px] shrink-0 snap-start items-end justify-center gap-[10px] overflow-clip rounded-[12px] border-b border-white/20 px-[32px] pb-[32px] pt-[252px]"
      style={{ borderTopWidth: 0 }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px]">
        {imgUrl && (
          <img
            src={imgUrl}
            alt=""
            className="absolute left-[0.117px] top-[-32.237px] h-[106.547%] w-[99.951%] max-w-none rounded-[12px] object-cover"
          />
        )}
        <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[53.37%] to-black to-[73.84%]" />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col items-start gap-[12px] overflow-clip text-white">
        {card.eyebrow && (
          <div className="relative flex h-4 items-center gap-1">
            <img src={`${A}/load__imgRectangle42112.svg`} alt="" width="114.561" height="16" className="absolute left-[3.43px] top-[0.33px] max-w-none" />
            <img src={`${A}/load__imgRectangle42113.svg`} alt="" width="14.1899" height="16" className="relative max-w-none" />
            <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase tracking-[0.6px]">{card.eyebrow}</span>
          </div>
        )}
        <h2 className="whitespace-nowrap font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.52px]">{card.title}</h2>
        <p className="max-w-[340px] font-sans text-[16px] leading-[1.4]">{card.description.replace(/\n+/g, " ")}</p>
      </div>

      {(card.statValue || card.statLabel) && (
        <div className="relative flex h-[100px] w-[184px] shrink-0 flex-col gap-[10px] items-start overflow-clip rounded-[8px] border border-white/20 bg-white/[0.04] p-[12px] text-white">
          <div className="flex items-baseline gap-[6px] text-white leading-[1.15]">
            {card.statValue && (
              <span className="font-display text-[42px] font-semibold tracking-[-0.84px]">{card.statValue}</span>
            )}
            {card.statUnit && (
              <span className="font-display text-[20px] font-normal tracking-[-0.4px]">{card.statUnit}</span>
            )}
          </div>
          {card.statLabel && (
            <p className="whitespace-nowrap font-display text-[16px] font-normal leading-[1.15] tracking-[-0.32px]">{card.statLabel}</p>
          )}
        </div>
      )}
    </article>
  );
}
