"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

const SUPPORT_ITEMS = [
  {
    title: "Medical Cover",
    description: "Cover for you, spouse, children, and parents.",
    left: "-62.93%",
    top: "-8.32%",
  },
  {
    title: "Learning Budget",
    description: "Paid courses, workshops, and global certs.",
    left: "-190.28%",
    top: "-8.32%",
  },
  {
    title: "Flexible Leave",
    description: "Take the time you need comfortably.",
    left: "-335.71%",
    top: "-8.32%",
  },
  {
    title: "Counseling",
    description: "Confidential mental health support, free of cost.",
    left: "-466.27%",
    top: "-8.32%",
  },
  {
    title: "Equity Options",
    description: "Own a stake in the mobility revolution.",
    left: "-57.4%",
    top: "-101.96%",
  },
  {
    title: "Modern Workspace",
    description: "Spacious hubs in Delhi & Bangalore.",
    left: "-177.8%",
    top: "-96.38%",
  },
  {
    title: "Parental Support",
    description: "Helpful paid parent leave systems.",
    left: "-332.54%",
    top: "-103.95%",
  },
  {
    title: "Recognition",
    description: "Quarterly peer-voted awards & spot bonuses.",
    left: "-466.18%",
    top: "-104.68%",
  },
];

type SupportItem = (typeof SUPPORT_ITEMS)[number];

function SupportCard({ item, isDuplicate = false }: { item: SupportItem; isDuplicate?: boolean }) {
  return (
    <article
      aria-hidden={isDuplicate || undefined}
      className={`flex h-[102px] w-full max-w-[353px] items-center gap-5 rounded-[12px] border-[0.5px] border-white/20 bg-white/[0.08] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md select-none shrink-0 lg:h-[228px] lg:w-[412px] lg:min-w-[412px] lg:max-w-[412px] lg:flex-col lg:items-start lg:justify-center lg:gap-8 lg:p-8 ${
        isDuplicate ? "hidden lg:flex" : "flex"
      }`}
    >
      <div className="relative h-[62px] w-[64.33px] shrink-0 overflow-hidden lg:h-[72px] lg:w-[74.71px]">
        <Image
          src="/assets/careers/support-illustrations.png"
          alt=""
          width={630}
          height={218}
          style={{
            position: "absolute",
            width: "629.2%",
            height: "217.63%",
            left: item.left,
            top: item.top,
            maxWidth: "none",
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="m-0 font-sans text-base font-bold leading-normal text-white lg:font-display lg:text-[26px] lg:font-semibold lg:leading-[1.15] lg:tracking-[-0.78px]">{item.title}</h3>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-white lg:text-base">{item.description}</p>
      </div>
    </article>
  );
}

/**
 * CAREERS page — "Support That Matters" perks carousel.
 * Matches bottom carousel (CareerTestimonials) functionality:
 * continuous desktop auto-scroll (speed 50px/s), draggable mouse scroll,
 * responsive scroll snap, navigation arrows, and dynamic progress pill.
 */
export default function CareerSupport() {
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

  const pauseAutoScroll = useCallback((duration = 5000) => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, duration);
  }, []);

  useDraggableScroll(scrollRef, {
    onDragStart: () => {
      isDraggingRef.current = true;
      pauseAutoScroll(5000);
    },
    onDragEnd: () => {
      isDraggingRef.current = false;
      pauseAutoScroll(3000);
      updateProgress();
    },
  });

  // Track initial scroll progress and attach resize/scroll sync
  useEffect(() => {
    updateProgress();
    const row = scrollRef.current;
    if (!row) return;

    const onStep = () => pauseAutoScroll(5000);

    row.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    row.addEventListener("carousel-step", onStep);

    return () => {
      row.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      row.removeEventListener("carousel-step", onStep);
    };
  }, [updateProgress, pauseAutoScroll]);

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

  // Smooth desktop auto-scroll loop (stops at end like homepage CustomerReviews)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime: number | null = null;
    let animId: number;
    let accumulator = 0;

    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      if (
        isDesktop &&
        isVisibleRef.current &&
        !isInteractingRef.current &&
        !isDraggingRef.current
      ) {
        const row = scrollRef.current;
        if (row) {
          const maxScroll = row.scrollWidth - row.clientWidth;
          if (maxScroll > 1) {
            accumulator += 50 * delta;
            if (accumulator >= 1) {
              const advance = Math.floor(accumulator);
              if (row.scrollLeft < maxScroll - 1) {
                row.scrollLeft = Math.min(maxScroll, row.scrollLeft + advance);
                accumulator -= advance;
                updateProgress();
              } else {
                accumulator = 0;
              }
            }
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
      className="relative flex flex-col items-center gap-[24px] overflow-hidden bg-[linear-gradient(0deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.40)_100%),linear-gradient(272deg,#0E2F6D_-63.51%,#1D6FFF_87.23%)] bg-[#E9EDF3] px-5 py-[31.63px] text-white lg:h-[610.36px] lg:min-h-0 lg:justify-start lg:gap-[42px] lg:px-0 lg:py-[62px]"
      aria-labelledby="career-support-heading"
    >
      <div className="flex w-full max-w-[353px] flex-col items-center justify-center gap-[14px] text-center lg:max-w-none lg:gap-6 lg:px-20">
        <div className="flex flex-col items-center justify-center gap-[14px] lg:gap-4">
          <Eyebrow label="Our offering" dark icons="white" />
          <h2 id="career-support-heading" className="m-0 font-display text-[28px] font-semibold leading-normal tracking-[-0.56px] text-white lg:text-[42px] lg:tracking-[-0.84px]">Support That Matters</h2>
        </div>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-[#ccc] w-full max-w-[295.77px] text-center lg:w-[493.14px] lg:max-w-[493.14px] lg:text-base lg:text-white">
          We focus on complete physical, mental, and professional growth support. No standard
          corporate fluff, just helpful baseline perks.
        </p>
      </div>

      <div className="relative w-full">
        <div
          id="career-support-row"
          ref={scrollRef}
          onMouseEnter={() => {
            isInteractingRef.current = true;
          }}
          onMouseLeave={() => {
            isInteractingRef.current = false;
          }}
          className="flex w-full max-w-[353px] flex-col items-center gap-2.5 mx-auto lg:no-scrollbar lg:flex-row lg:w-full lg:max-w-none lg:items-center lg:gap-3 lg:overflow-x-auto lg:px-[max(80px,calc((100vw-1280px)/2))] lg:scroll-pl-[max(80px,calc((100vw-1280px)/2))] cursor-default lg:cursor-grab active:lg:cursor-grabbing select-none"
          aria-label="Employee benefits"
        >
          {SUPPORT_ITEMS.map((item) => (
            <SupportCard key={item.title} item={item} />
          ))}
          <div aria-hidden className="hidden shrink-0 lg:block lg:w-16" />
        </div>

        {/* Navigation Arrows with boundary auto-hide (desktop only) */}
        <CarouselArrows
          rowId="career-support-row"
          label="support perks"
          variant="blue"
          className="hidden lg:block"
          onStep={() => pauseAutoScroll(5000)}
        />
      </div>

      {/* Progress Indicator Pill (matches bottom carousel, desktop only) */}
      <div className="hidden mx-auto w-full max-w-[1440px] items-center justify-center pt-2 lg:flex">
        <div
          role="progressbar"
          aria-label="Employee benefits scroll progress"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/20 p-1"
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
