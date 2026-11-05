"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

const TESTIMONIALS = [
  {
    quote:
      "Joined to work on advanced electric powertrains. Stayed because of the collaborative culture and freedom to innovate. The team here genuinely values engineering excellence and new ideas.",
    name: "Rahul Deshmukh",
    role: "Senior Engineer, Euler Motors",
    image: "/assets/careers/testimonial-rahul.png",
  },
  {
    quote:
      "Joined to build cutting-edge battery packs. Stayed because of the high trust and low bureaucracy. The ownership given to engineers here is rare in the EV sector.",
    name: "Jahan Melad",
    role: "Project Manager, Euler Motors",
    image: "/assets/careers/testimonial-jahan.png",
  },
  {
    quote:
      "Came here to solve real-world mobility challenges. Stayed because of the supportive leadership and meaningful work. Every project gives us the opportunity to build technology that makes a difference.",
    name: "Priya Sharma",
    role: "Manufacturing Lead, Euler Motors",
    image: "/assets/careers/testimonial-priya.png",
  },
];

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({
  testimonial,
  isDuplicate = false,
}: {
  testimonial: Testimonial;
  isDuplicate?: boolean;
}) {
  return (
    <article
      aria-hidden={isDuplicate || undefined}
      data-testimonial={isDuplicate ? undefined : true}
      className="flex h-auto min-h-[338px] w-[calc(100vw-40px)] max-w-[353px] min-w-0 shrink-0 snap-center flex-col items-start justify-between gap-5 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-5 lg:h-[443px] lg:min-h-[443px] lg:w-[620px] lg:min-w-[620px] lg:max-w-[620px] lg:items-stretch lg:gap-8 lg:p-8 select-none"
    >
      <div className="flex items-center justify-between self-stretch">
        <svg
          aria-hidden="true"
          viewBox="0 0 23.092 18.4"
          className="h-[18.4px] w-[23.092px] shrink-0 fill-brand lg:h-[25.76px] lg:w-[32.33px]"
        >
          <path d="M0 18.4V10.6C0 4.8 3.6 0 9.2 0V5.6C6.7 5.6 5.3 7.3 5.2 9.4H9.2V18.4H0ZM13.892 18.4V10.6C13.892 4.8 17.492 0 23.092 0V5.6C20.592 5.6 19.192 7.3 19.092 9.4H23.092V18.4H13.892Z" />
        </svg>
        <span className="flex items-center self-stretch gap-1 rounded-[400px] border border-[rgba(29,111,255,0.02)] bg-white px-2.5 py-1.5 font-sans text-[13px] font-semibold text-ink/60 shadow-[0_0_12px_0_rgba(0,0,0,0.05)] lg:h-8 lg:gap-[5.6px] lg:self-auto lg:rounded-[560px] lg:border-[1.4px] lg:border-brand/[0.02] lg:py-0 lg:shadow-[0_0_8.4px_rgba(0,0,0,0.05)] lg:text-base lg:tracking-[-0.8px]">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[14px] fill-[#7e7e7e] lg:size-4">
            <path d="m8 1 1.8 4.2 4.6.4-3.5 3 1.1 4.5L8 10.7 4 13.1l1.1-4.5-3.5-3 4.6-.4L8 1Z" />
          </svg>
          4.5
        </span>
      </div>
      <p className="m-0 self-stretch font-sans text-[18px] font-bold leading-[1.4] tracking-[-0.24px] text-ink lg:text-[26px] lg:tracking-[-0.52px]">&quot;{testimonial.quote}&quot;</p>
      <div className="h-px w-[86px] bg-ink/20 lg:h-0.5 lg:w-[121px]" />
      <div className="flex items-center gap-2.5 self-stretch">
        <Image src={testimonial.image} alt="" width={62} height={62} className="size-[42px] shrink-0 rounded-full object-cover lg:size-[62px]" />
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="mb-1 mt-0 self-stretch font-sans text-base font-bold leading-none tracking-[-0.32px] text-ink [transform:rotate(-0.772deg)] lg:text-2xl lg:leading-none lg:tracking-[-0.48px] lg:[transform:rotate(-0.77deg)]">{testimonial.name}</h3>
          <p className="m-0 font-sans text-xs font-normal leading-none tracking-[-0.24px] text-ink/80 lg:text-sm lg:leading-none lg:tracking-[-0.28px]">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}

/**
 * CAREERS page — "What Our People Say" employee voice cards.
 * Unified slider: continuous desktop auto-scroll (no hover pause), draggable mouse,
 * blue navigation arrows with boundary auto-hide, and Figma 3321:13258 progress pill.
 */
export default function CareerTestimonials() {
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

  // Continuous auto-scroll loop (speed = 50px/s, does NOT pause on hover)
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
      const delta = (now - lastTime) / 1000;
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
              accumulator -= advance;

              if (row.scrollLeft >= maxScroll - 2) {
                row.scrollLeft = 0;
              } else {
                row.scrollLeft += advance;
              }
              updateProgress();
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [updateProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center gap-6 overflow-hidden bg-white py-8 lg:min-h-0 lg:gap-[42px] lg:py-[62px]"
      aria-labelledby="career-testimonials-heading"
    >
      <div className="flex w-[calc(100%-40px)] max-w-[518px] flex-col items-center gap-3 text-center lg:gap-4">
        <Eyebrow label="Employee voices" />
        <h2 id="career-testimonials-heading" className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[42px] lg:tracking-[-0.84px]">What Our People Say</h2>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-ink lg:w-[518.28px] lg:text-base">
          Read unfiltered feedback and experiences shared by members of the Euler Motors tech,
          manufacturing, and support divisions.
        </p>
      </div>

      <div className="relative w-full">
        <div
          id="career-testimonials-row"
          ref={scrollRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory lg:snap-none lg:[scroll-snap-type:none] items-center gap-2.5 overflow-x-auto px-[max(20px,calc((100vw-353px)/2))] lg:gap-4 lg:px-[max(80px,calc((100vw-1280px)/2))] lg:scroll-pl-[max(80px,calc((100vw-1280px)/2))] cursor-grab active:cursor-grabbing select-none"
          aria-label="Employee testimonials"
        >
          {Array.from({ length: 4 }).map((_, setIndex) =>
            TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={`${setIndex}-${testimonial.name}`}
                testimonial={testimonial}
                isDuplicate={setIndex > 0}
              />
            )),
          )}
          <div aria-hidden className="shrink-0 w-8 lg:w-16" />
        </div>

        {/* Right and left edge gradients */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 top-0 z-[5] hidden w-[140px] [transform:scaleX(-1)] bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 top-0 z-[5] hidden w-[140px] bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] lg:block" />

        {/* Blue Navigation Arrows with boundary auto-hide */}
        <CarouselArrows
          rowId="career-testimonials-row"
          label="employee testimonials"
          variant="blue"
          onStep={() => pauseAutoScroll(600)}
        />
      </div>

      {/* Progress Indicator Pill (Figma 3321:13258) */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-2">
        <div
          role="progressbar"
          aria-label="Employee testimonials scroll progress"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1"
        >
          <div
            className="h-full w-[29.891px] rounded-[23.04px] bg-[#121212] transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translateX(${scrollProgress * 78.308}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
