"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";
import { mediaUrl } from "@/lib/strapi/client";
import { StrapiTechnologyIndianRoadsSection, StrapiTechnologyRoadConditionCard } from "@/types/strapi";

const A = "/assets/technology-page";

const PROBLEM_GRADIENT =
  "linear-gradient(260.845deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";
const EULER_GRADIENT =
  "linear-gradient(-78.921deg, rgb(14,47,109) 63.511%, rgb(29,111,255) 87.226%), linear-gradient(258.187deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";

export interface TechIndianRoadsProps {
  data?: StrapiTechnologyIndianRoadsSection;
}

function IndianRoadCard({
  c,
  problemLabel,
  solutionLabel,
  gradientId,
}: {
  c: StrapiTechnologyRoadConditionCard;
  problemLabel: string;
  solutionLabel: string;
  gradientId: string;
}) {
  const iconUrl = mediaUrl(c.icon);

  return (
    <article className="relative h-[254px] w-[320px] sm:w-[353px] shrink-0 snap-center">
      {/* Auto-sizing slanted Tab Header with Icon & Label */}
      <div className="absolute left-[6.5px] top-[0.65px] inline-flex h-[48.328px] min-w-[120px] items-start pl-[13px] pr-[30px] pt-[5.53px]">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 180 48.3281"
          fill="none"
          className="pointer-events-none absolute inset-0 size-full max-w-none"
        >
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0H142C146.8 0 151.1 2.9 153 7.3L180 48.3281H0V8Z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient id={gradientId} x1="68" y1="7" x2="64" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#CDDFFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative flex items-center gap-2">
          {iconUrl && (
            <img
              src={iconUrl}
              alt=""
              className="relative h-[25.095px] w-[26.039px] shrink-0 object-contain"
            />
          )}
          <p className="relative whitespace-nowrap text-[18px] sm:text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">
            {c.condition}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="absolute left-0 top-[34.31px] flex h-[220px] w-full flex-col items-start gap-4 rounded-[10px] bg-white p-4 shadow-sm">
        <div className="flex w-full flex-col items-start gap-2">
          <p
            className="bg-clip-text text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent min-[1440px]:text-[16px]"
            style={{ backgroundImage: PROBLEM_GRADIENT }}
          >
            {problemLabel}
          </p>
          <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink min-[1440px]:text-[16px]">
            {c.problem}
          </p>
        </div>

        <div className="relative h-0 w-full">
          <img
            src={`${A}/indian__imgLine110.svg`}
            alt=""
            className="absolute inset-[-1px_0_0_0] block size-full max-w-none"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <p
            className="bg-clip-text text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent min-[1440px]:text-[16px]"
            style={{ backgroundImage: EULER_GRADIENT }}
          >
            {solutionLabel}
          </p>
          <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink min-[1440px]:text-[16px]">
            {c.solution}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * TECHNOLOGY page — "Built for Indian roads." banner (Figma 2990:12839, 393×442).
 * Mobile: manual touch swipeable snap carousel.
 * Desktop: auto-sliding carousel with draggable scroll and arrow controls (matching TechLoad).
 */
export default function TechIndianRoads({ data }: TechIndianRoadsProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const problemLabel = data?.problemLabel || "";
  const solutionLabel = data?.solutionLabel || "";
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

  // Track initial scroll progress and attach resize/scroll/wheel sync
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

  // Continuous auto-sliding loop (identical to TechLoad pattern)
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

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-[#d4dbec] py-10 md:pt-12 md:pb-0 lg:pt-16"
      aria-label={title || "Built for Indian roads"}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-5 pb-8 text-center md:pb-10 lg:pb-12">
        <div className="flex max-w-[700px] flex-col items-center gap-3 md:gap-4">
          {eyebrow && <Eyebrow label={eyebrow} />}
          {title && (
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink sm:text-[36px] sm:tracking-[-0.72px] md:text-[44px] md:tracking-[-0.88px] lg:text-[44px] lg:tracking-[-0.88px] min-[1440px]:text-[52px] min-[1440px]:tracking-[-1.04px]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-sans text-[13px] leading-normal text-ink sm:text-[14px] md:text-[15px] lg:text-[15px] min-[1440px]:text-[16px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Desktop Track: Single set of cards, draggable, arrows, clean start/end */}
      <div className="relative mx-auto hidden w-full max-w-none flex-col items-center gap-6 pb-12 pt-0 md:flex md:gap-8 min-[1440px]:gap-[42px] min-[1440px]:pb-[62px]">
        <div className="relative w-full">
          <div
            id="indian-roads-carousel-desktop"
            ref={scrollRef}
            className="no-scrollbar flex w-full items-center gap-6 overflow-x-auto px-6 md:px-10 lg:px-16 cursor-grab active:cursor-grabbing select-none"
          >
            {cards.map((c, i) => (
              <IndianRoadCard
                key={c.id ?? `${c.condition}-${i}`}
                c={c}
                problemLabel={problemLabel}
                solutionLabel={solutionLabel}
                gradientId={`road-tab-desk-${i}`}
              />
            ))}
            <div aria-hidden className="shrink-0 w-2 lg:w-4" />
          </div>

          {/* Blue Navigation Arrows with boundary auto-hide (matching TechLoad) */}
          <CarouselArrows
            rowId="indian-roads-carousel-desktop"
            label="Indian roads features"
            variant="blue"
            className="hidden md:block"
            onStep={() => pauseAutoScroll(600)}
          />
        </div>

        {/* Carousel Progress Indicator Pill (Figma 3321:13258 / matching TechLoad) */}
        <div className="mx-auto hidden w-full max-w-[1440px] items-center justify-center md:flex">
          <div
            role="progressbar"
            aria-label="Indian roads features scroll progress"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[rgba(255,255,255,0.5)] p-1"
          >
            <div
              className="h-full w-[29.891px] rounded-[23.04px] bg-black transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translateX(${scrollProgress * 78.308}px)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile view (<768px): Manual touch swipeable snap carousel */}
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center justify-center gap-6 px-5 py-[35px] md:hidden">
        <div className="relative -mx-5 w-[calc(100%+40px)]">
          <div
            id="tech-indian-roads-mobile"
            className="snap-row snap-center-mobile gap-3 px-5"
          >
            {cards.map((c, idx) => (
              <IndianRoadCard
                key={c.id ?? `${c.condition}-${idx}`}
                c={c}
                problemLabel={problemLabel}
                solutionLabel={solutionLabel}
                gradientId={`road-tab-mob-${idx}`}
              />
            ))}
          </div>
        </div>

        <PagerBar
          rowId="tech-indian-roads-mobile"
          className="rounded-[14.4px] bg-[rgba(255,255,255,0.5)] [&>div]:bg-black"
        />
      </div>
    </section>
  );
}
