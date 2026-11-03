"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import FloatingWidget from "../FloatingWidget";

const HERO_SLIDES: HeroSlideData[] = [
  {
    headline: "Euler Storm EV T1500 with 200km Range — Built for Heavy Commercial Hauling",
    primaryCta: { label: "Explore our Vehicles", href: "/products" },
  },
  {
    headline: "Euler Turbo EV 1000 की 180km की RealRange™ हो तो करो 1 डिलीवरी और!",
    primaryCta: { label: "Explore our Vehicles", href: "/products" },
  },
  {
    headline: "Euler Storm EV LongRange 200 — Maximize Your Daily Fleet Earnings",
    primaryCta: { label: "Explore our Vehicles", href: "/products" },
  },
  {
    headline: "Euler HiLoad EV — India's Most Powerful Commercial 3-Wheeler",
    primaryCta: { label: "Explore our Vehicles", href: "/products" },
  },
];

export interface HeroSlideData {
  tag?: string;
  headline: string;
  subheading?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export interface HeroProps {
  slides?: HeroSlideData[];
}

/**
 * Hero V3 (Figma 1:1283). Desktop frame 1440×800 · mobile frame 393×762.
 * The section keeps each frame's aspect ratio and scales with viewport width,
 * so the hero always shows the full Figma frame (never a cover-crop).
 * Background: /images/hero_desktop_clean.png (2880×1598, bottom scrim
 * removed per user request — was hero_desktop_resize.png) from sm up, /images/
 * hero_mobile_clean.png (393×762, bottom scrim removed) below — both
 * edge-to-edge.
 */
export default function Hero({ slides }: HeroProps = {}) {
  const currentSlides = slides !== undefined ? slides : HERO_SLIDES;
  const slideCount = currentSlides.length;
  const [active, setActive] = useState(() => (slideCount > 1 ? 1 : 0)); // Figma shows the 2nd dot active
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const mouseStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const dragOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const isSwipingHorizontalRef = useRef(false);
  const isSwipingVerticalRef = useRef(false);

  if (slideCount === 0) return null;

  const safeActive = Math.min(Math.max(0, active), slideCount - 1);

  const go = (dir: 1 | -1) => {
    if (slideCount <= 1) return;
    setActive((i) => (i + dir + slideCount) % slideCount);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (slideCount <= 1 || e.touches.length !== 1) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("aside") || target?.closest('[role="tablist"]')) return;

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
    dragDistanceRef.current = 0;
    dragOffsetRef.current = 0;
    isSwipingHorizontalRef.current = false;
    isSwipingVerticalRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    if (isSwipingVerticalRef.current) return;

    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    dragDistanceRef.current = Math.hypot(dx, dy);

    if (!isSwipingHorizontalRef.current && !isSwipingVerticalRef.current) {
      // If moving predominantly vertically, let the page scroll naturally
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        isSwipingVerticalRef.current = true;
        setIsDragging(false);
        setDragOffset(0);
        dragOffsetRef.current = 0;
        return;
      }
      if (Math.abs(dx) > 8 && Math.abs(dx) >= Math.abs(dy)) {
        isSwipingHorizontalRef.current = true;
        setIsDragging(true);
      }
    }

    if (isSwipingHorizontalRef.current) {
      // Rubber-band resistance past bounds (index 0 and slideCount - 1)
      let effectiveDx = dx;
      if ((active === 0 && dx > 0) || (active === slideCount - 1 && dx < 0)) {
        effectiveDx = dx * 0.35;
      }
      dragOffsetRef.current = effectiveDx;
      setDragOffset(effectiveDx);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) return;

    if (isSwipingHorizontalRef.current) {
      const dx = dragOffsetRef.current;
      const dt = Date.now() - touchStartRef.current.time;
      const isQuickFlick = dt < 300 && Math.abs(dx) > 30;
      const isPastThreshold = Math.abs(dx) > 50;

      if (isQuickFlick || isPastThreshold) {
        if (dx < 0 && active < slideCount - 1) {
          setActive((prev) => prev + 1);
        } else if (dx > 0 && active > 0) {
          setActive((prev) => prev - 1);
        }
      }
    }

    touchStartRef.current = null;
    isSwipingHorizontalRef.current = false;
    isSwipingVerticalRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
    isSwipingHorizontalRef.current = false;
    isSwipingVerticalRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  // Mouse drag support for desktop emulation of mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    if (slideCount <= 1) return;
    if (typeof window !== "undefined" && window.innerWidth >= 640) return;
    if (e.button !== 0) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("aside") || target?.closest('[role="tablist"]')) return;

    mouseStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    dragDistanceRef.current = 0;
    dragOffsetRef.current = 0;
    isSwipingHorizontalRef.current = false;
    isSwipingVerticalRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseStartRef.current) return;
    const dx = e.clientX - mouseStartRef.current.x;
    const dy = e.clientY - mouseStartRef.current.y;
    dragDistanceRef.current = Math.hypot(dx, dy);

    if (!isSwipingHorizontalRef.current && !isSwipingVerticalRef.current) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        isSwipingVerticalRef.current = true;
        setIsDragging(false);
        setDragOffset(0);
        dragOffsetRef.current = 0;
        return;
      }
      if (Math.abs(dx) > 8 && Math.abs(dx) >= Math.abs(dy)) {
        isSwipingHorizontalRef.current = true;
        setIsDragging(true);
      }
    }

    if (isSwipingHorizontalRef.current) {
      let effectiveDx = dx;
      if ((safeActive === 0 && dx > 0) || (safeActive === slideCount - 1 && dx < 0)) {
        effectiveDx = dx * 0.35;
      }
      dragOffsetRef.current = effectiveDx;
      setDragOffset(effectiveDx);
    }
  };

  const handleMouseUp = () => {
    if (!mouseStartRef.current) return;

    if (isSwipingHorizontalRef.current) {
      const dx = dragOffsetRef.current;
      const dt = Date.now() - mouseStartRef.current.time;
      const isQuickFlick = dt < 300 && Math.abs(dx) > 30;
      const isPastThreshold = Math.abs(dx) > 50;

      if (isQuickFlick || isPastThreshold) {
        if (dx < 0 && safeActive < slideCount - 1) {
          setActive((prev) => prev + 1);
        } else if (dx > 0 && safeActive > 0) {
          setActive((prev) => prev - 1);
        }
      }
    }

    mouseStartRef.current = null;
    isSwipingHorizontalRef.current = false;
    isSwipingVerticalRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragDistanceRef.current > 10) {
      e.preventDefault();
      e.stopPropagation();
      dragDistanceRef.current = 0;
    }
  };

  return (
    <section
      id="hero"
      className="relative aspect-[393/762] overflow-clip sm:aspect-[1440/800] select-none sm:select-auto cursor-grab active:cursor-grabbing sm:cursor-auto"
      aria-label="Featured vehicle"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClickCapture={handleClickCapture}
    >
      {/* Slider Track */}
      <div 
        className={`absolute inset-0 flex will-change-transform ${
          isDragging ? "" : "transition-transform duration-500 ease-in-out"
        }`}
        style={{
          transform:
            slideCount <= 1
              ? "none"
              : isDragging && dragOffset !== 0
              ? `translateX(calc(-${safeActive * 100}% + ${dragOffset}px))`
              : `translateX(-${safeActive * 100}%)`,
        }}
      >
        {currentSlides.map((slide, i) => {
          const headlineLen = slide.headline?.length ?? 0;
          const isLongHeadline = headlineLen > 60;
          const isExpanded = headlineLen > 80 || Boolean(slide.subheading && slide.subheading.trim().length > 0);

          return (
            <div key={i} className="relative h-full w-full shrink-0">
              {/* Backgrounds */}
              <Image
                src="/images/hero_mobile_clean.png"
                alt="Euler Turbo EV 1000 electric truck"
                fill
                priority
                sizes="100vw"
                className="pointer-events-none object-cover sm:hidden"
              />

              <Image
                src="/images/hero_desktop_clean.png"
                alt="Euler Turbo EV 1000 electric truck"
                fill
                priority
                sizes="100vw"
                className="pointer-events-none object-cover max-sm:hidden"
              />

              {/* Mobile scrim — Figma 1:4525 rebuilt exactly */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[59.01%] bottom-0 sm:hidden">
                <div className="absolute inset-0 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent,black_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/15 to-65%" />
              </div>
              {/* Adaptive mobile contrast extension for expanded content */}
              {isExpanded && (
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[25%] bg-gradient-to-t from-black/95 via-black/60 to-transparent sm:hidden" />
              )}
              
              {/* Desktop black gradient overlay */}
              <div
                aria-hidden
                className={`absolute inset-x-0 bottom-0 ${isExpanded ? "h-[85%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" : "h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent"} pointer-events-none max-sm:hidden`}
              />
              
              {/* Content (Text + CTA) */}
              <div className="absolute inset-x-0 bottom-[62px] flex flex-col items-start gap-2.5 px-5 lg:bottom-[60.52px] lg:items-center lg:gap-5">
                {slide.tag && (
                  <span className="inline-block font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-[6px] sm:text-[11px] lg:text-[12px] lg:tracking-[0.18em]">
                    {slide.tag}
                  </span>
                )}
                {slide.headline && (
                  <h1
                    className={`w-full max-w-[340px] sm:max-w-[580px] md:max-w-[700px] lg:max-w-[960px] xl:max-w-[1040px] font-display font-semibold text-white [text-wrap:balance] ${
                      isLongHeadline
                        ? "text-[23px] leading-[1.22] tracking-[-0.46px] sm:text-[28px] sm:leading-[1.2] sm:tracking-[-0.56px] md:text-[32px] lg:text-[40px] lg:leading-[1.25] lg:tracking-[-0.8px] xl:text-[44px]"
                        : "text-[32px] leading-[1.15] tracking-[-0.64px] sm:text-[34px] sm:leading-[1.2] lg:text-[48px] lg:leading-[1.3] lg:tracking-[-0.96px]"
                    } lg:text-center`}
                  >
                    {slide.headline}
                  </h1>
                )}
                {slide.subheading && (
                  <p className="max-w-[340px] sm:max-w-[580px] md:max-w-[680px] text-[14px] text-white/85 lg:max-w-[788.543px] lg:text-center lg:text-[18px] lg:leading-relaxed">
                    {slide.subheading}
                  </p>
                )}
                {slide.primaryCta?.label && slide.primaryCta?.href && (
                  <Button
                    href={slide.primaryCta.href}
                    variant="dark"
                    arrow="white"
                    className="max-lg:gradient-border-dark-soft min-h-12 h-auto py-2.5 sm:py-0 sm:h-12 rounded-[4.571px] px-[22.822px] text-[13.714px] lg:rounded-[4px] lg:px-6 whitespace-normal max-w-[280px] sm:max-w-md text-left"
                  >
                    <span>{slide.primaryCta.label}</span>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* carousel arrows (desktop only) */}
      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-10 top-1/2 hidden -translate-y-[calc(50%+90px)] lg:block cursor-pointer rounded-[10px] bg-white/25 backdrop-blur-[100px] backdrop-saturate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_1px_0_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(255,255,255,0.1),0_0_14px_rgba(255,255,255,0.15)] hover:scale-110 transition-transform z-20"
          >
            <Image
              src="/assets/hero/arrow-left.svg"
              alt=""
              width={42}
              height={42}
              className="h-[42px] w-[42px] -scale-x-100"
            />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-10 top-1/2 hidden -translate-y-[calc(50%+90px)] lg:block cursor-pointer rounded-[10px] bg-white/25 backdrop-blur-[100px] backdrop-saturate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_1px_0_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(255,255,255,0.1),0_0_14px_rgba(255,255,255,0.15)] hover:scale-110 transition-transform z-20"
          >
            <Image
              src="/assets/hero/arrow-right.svg"
              alt=""
              width={42}
              height={42}
              className="h-[42px] w-[42px]"
            />
          </button>
        </>
      )}

      {/* Mobile dots */}
      {slideCount > 1 && (
        <div className="absolute inset-x-0 bottom-6 flex px-5 lg:hidden">
          <div className="flex items-center gap-[7px] p-2.5" role="tablist" aria-label="Hero slides">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safeActive}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 w-1.5 rounded-[1px] ${i === safeActive ? "bg-white" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Desktop dots */}
      {slideCount > 1 && (
        <div className="absolute inset-x-0 bottom-[27px] hidden justify-center lg:flex" role="tablist" aria-label="Hero slides">
          <div className="flex items-center gap-[7px] p-2.5">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safeActive}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 w-1.5 rounded-[1px] ${i === safeActive ? "bg-white" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      )}
      {/* quick-action rail — scoped to the hero (Figma places it in the hero frame) */}
      <FloatingWidget mobileClassName="max-lg:bottom-[82px]" />

    </section>
  );
}
