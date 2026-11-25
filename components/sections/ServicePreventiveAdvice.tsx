"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";
import type { StrapiServicePreventiveAdvice } from "@/types/strapi";

type Tip = {
  title: string;
  description: string;
  icon: string;
  /** intrinsic size of the sliced icon (for next/image) */
  size: [number, number];
  /** placement inside the Figma icon box (74.709×72 desktop · 64.333×62
      mobile): [left, top, width, height] as % of the box — derived from the
      ChatGPT-image sprite fill crops (nodes 3354:19574…3354:19594) */
  box: [number, number, number, number];
};

/**
 * Preventive advice — Figma desktop 3354:19393 · mobile 2828:11548.
 * Navy→blue washed section with routine-habit cards.
 * Global carousel behavior matching CustomerReviews, Insights & AboutEuler:
 * - Desktop/tablet (>=768px): draggable mouse scroll, continuous auto-sliding (speed 50px/s,
 *   loops continuously, no hover freeze, pauses on drag or arrow navigation), blue navigation
 *   arrows with boundary auto-hide, and interactive progress indicator pill.
 * - Mobile (<768px): full-bleed touch swipeable snap carousel with peek, snap-center alignment,
 *   and real-time interactive progress pill.
 */
const TIPS: Tip[] = [
  {
    title: "Check tyres regularly",
    description: "Maintain recommended PSI for optimal battery range and heavy-load road grip.",
    icon: "/assets/service/preventive/icon-tyres.png",
    size: [303, 207],
    box: [4.9, 19.51, 90.38, 64.07],
  },
  {
    title: "Keep charging healthy",
    description: "Avoid fully draining the battery. Keep state of charge between 20% and 80%.",
    icon: "/assets/service/preventive/icon-charging.png",
    size: [284, 243],
    box: [6.14, 8.81, 88.33, 78.42],
  },
  {
    title: "Follow scheduled service",
    description: "Visit our authorized centres every 10,000 km for proactive check-ups.",
    icon: "/assets/service/preventive/icon-service.png",
    size: [251, 228],
    box: [12.64, 12.85, 74.86, 70.56],
  },
  {
    title: "Watch warning signs",
    description: "Address any critical dashboard errors or thermal alert signs instantly.",
    icon: "/assets/service/preventive/icon-warnings.png",
    size: [262, 233],
    box: [10.94, 14.17, 78.14, 72.11],
  },
  {
    title: "Keep your vehicle clean",
    description: "Keep cooling vents free of heavy mud and delivery highway dust.",
    icon: "/assets/service/preventive/icon-clean.png",
    size: [230, 230],
    box: [16.01, 14.39, 68.6, 71.18],
  },
];

function PreventiveCard({ tip }: { tip: Tip }) {
  return (
    <article
      className="flex min-h-[102px] w-[300px] sm:w-[353px] shrink-0 snap-center flex-row items-center gap-4 sm:gap-5 rounded-[12px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-4 sm:p-5 shadow-xs backdrop-blur-sm select-none md:min-h-[250px] md:w-[412px] md:min-w-[412px] md:max-w-[412px] md:flex-col md:items-start md:justify-center md:gap-8 md:p-8"
    >
      <div className="relative h-[62px] w-[64.333px] shrink-0 aspect-[64.33/62] md:aspect-[74.71/72] md:h-[72px] md:w-[74.709px]">
        <Image
          src={tip.icon}
          alt=""
          width={tip.size[0]}
          height={tip.size[1]}
          aria-hidden
          className="absolute max-w-none md:!left-0 md:!top-0 md:!h-full md:!w-full md:!object-contain"
          style={{
            left: `${tip.box[0]}%`,
            top: `${tip.box[1]}%`,
            width: `${tip.box[2]}%`,
            height: `${tip.box[3]}%`,
            objectFit: "fill",
          }}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
        <h3 className="font-sans text-[15px] sm:text-[16px] font-bold leading-[20px] sm:leading-[22px] text-white md:font-display md:text-[26px] md:font-semibold md:leading-[30px] md:tracking-[-0.78px]">
          {tip.title}
        </h3>
        <p className="font-sans text-xs leading-[16px] text-white/90 md:text-base md:leading-[22px]">
          {tip.description}
        </p>
      </div>
    </article>
  );
}

export default function ServicePreventiveAdvice({
  data,
}: {
  data?: StrapiServicePreventiveAdvice;
}) {
  // CMS-driven copy with hardcoded fallbacks (careers page pattern) — icon
  // slices stay keyed to slot order since they are position-cropped art.
  const cmsTips = data?.tips ?? [];
  const activeTips: Tip[] = TIPS.map((t, i) => {
    const cms = cmsTips[i];
    return cms ? { ...t, title: cms.title, description: cms.description } : t;
  });
  const eyebrowLabel = data?.eyebrow || "Preventive advice";
  const headerLine = data?.headerLine || "Keep your Euler performing at its best.";
  const sectionTitle = data?.title || "Keep your Neo running better";
  const sectionSubtitle =
    data?.subtitle ||
    "Maximize efficiency and prolong vehicle battery lifespan with simple routine habits.";
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Repeat collection to provide comfortable continuous auto-sliding runway (matching CustomerReviews & Insights)
  const repeats = Math.max(2, Math.ceil(10 / activeTips.length));
  const displayTips = Array.from({ length: repeats }).flatMap(() => activeTips);

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

    row.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    row.addEventListener("carousel-step", onStep);

    return () => {
      row.removeEventListener("scroll", updateProgress);
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

  // Continuous auto-sliding loop (speed = 50px/s, loops continuously, pauses on drag or arrow clicks)
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

  return (
    <section
      ref={sectionRef}
      className="preventive-bg relative isolate w-full flex-col items-center justify-center py-8 sm:py-10 md:py-[62px]"
      aria-label="Preventive advice"
    >
      {/* Header Container — padded container */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-8 pb-7 sm:pb-9 md:pb-[42px]">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center">
          <div className="flex flex-col items-center gap-3 sm:gap-3.5 md:gap-4">
            <Eyebrow dark label={eyebrowLabel} />
            <p className="font-sans text-[15px] sm:text-[16px] font-bold leading-[22px] text-white md:text-[18px] md:leading-[26px]">
              {headerLine}
            </p>
            <h2 className="w-full max-w-[420px] font-display text-[26px] sm:text-[32px] font-semibold leading-[32px] sm:leading-[38px] tracking-[-0.56px] text-white md:max-w-none md:text-[42px] md:leading-[50px] md:tracking-[-0.84px]">
              {sectionTitle}
            </h2>
          </div>
          <p className="w-full max-w-[340px] sm:max-w-[420px] font-sans text-xs leading-[18px] text-[#ccc] md:max-w-[493.137px] md:text-base md:leading-[22px] md:text-white">
            {sectionSubtitle}
          </p>
        </div>
      </div>

      {/* Cards Track Container — full bleed across the screen */}
      <div className="relative w-full overflow-hidden">
        <div
          id="service-preventive-row"
          ref={scrollRef}
          className="no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex w-full items-center gap-3.5 overflow-x-auto px-5 snap-x snap-mandatory md:snap-none md:gap-6 md:px-[max(40px,calc((100vw-1280px)/2))] lg:px-[max(80px,calc((100vw-1280px)/2))] lg:scroll-pl-[max(80px,calc((100vw-1280px)/2))] cursor-grab active:cursor-grabbing select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          aria-label="Preventive advice cards"
        >
          {displayTips.map((tip, index) => (
            <PreventiveCard key={`${tip.title}-${index}`} tip={tip} />
          ))}
          <div aria-hidden className="shrink-0 w-2 md:w-16" />
        </div>

        {/* Navigation Arrows with boundary auto-hide (desktop/tablet only) */}
        <CarouselArrows
          rowId="service-preventive-row"
          label="preventive advice"
          variant="blue"
          className="hidden md:block"
          onStep={() => pauseAutoScroll(600)}
        />
      </div>

      {/* Progress Indicator Pill (Figma node 3354:19618 / 3321:13258) — visible on mobile and desktop */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-5 sm:pt-6 md:pt-8">
        <div
          role="progressbar"
          aria-label="Preventive advice scroll progress"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[rgba(204,204,204,0.2)] p-1"
        >
          <div
            className="h-full w-[29.891px] rounded-[23.04px] bg-white transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translateX(${scrollProgress * 78.308}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
