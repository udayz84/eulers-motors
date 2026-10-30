"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import FloatingWidget from "../FloatingWidget";

const HERO_SLIDES = [
  {
    headline: "Euler Storm EV T1500 with 200km Range — Built for Heavy Commercial Hauling",
  },
  {
    headline: "Euler Turbo EV 1000 की 180km की RealRange™ हो तो करो 1 डिलीवरी और!",
  },
  {
    headline: "Euler Storm EV LongRange 200 — Maximize Your Daily Fleet Earnings",
  },
  {
    headline: "Euler HiLoad EV — India's Most Powerful Commercial 3-Wheeler",
  },
];

export interface HeroSlideData {
  headline: string;
  subheading?: string;
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
  const currentSlides = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const slideCount = currentSlides.length;
  const [active, setActive] = useState(1); // Figma shows the 2nd dot active
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const mouseStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const dragOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const isSwipingHorizontalRef = useRef(false);
  const isSwipingVerticalRef = useRef(false);

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + slideCount) % slideCount);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
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
      if ((active === 0 && dx > 0) || (active === slideCount - 1 && dx < 0)) {
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
        if (dx < 0 && active < slideCount - 1) {
          setActive((prev) => prev + 1);
        } else if (dx > 0 && active > 0) {
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
            isDragging && dragOffset !== 0
              ? `translateX(calc(-${active * 100}% + ${dragOffset}px))`
              : `translateX(-${active * 100}%)`,
        }}
      >
        {currentSlides.map((slide, i) => (
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

            {/* Mobile scrim — Figma 1:4525 rebuilt exactly: a 783.13×448.36
                plate of black 40% + backdrop-blur 16px at y 449.65 (top
                59.01% of the 393×762 frame), bleeding past all frame edges,
                Gaussian-smeared by a 102.15px layer blur. CSS filter would
                kill backdrop-filter, so the blur's edge profile is split:
                (a) masked backdrop-blur ramping to full at 65% of the band
                (≈2σ of 102.15px over the 312px on-frame band) and (b) a
                plain tint gradient with the same ramp — separate layer so
                the tint shows even where mask+backdrop-filter combos fail
                (WebKit). Plate bleeds horizontally off-frame, so no side
                feathering is visible — inset-x-0 covers it. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[59.01%] bottom-0 sm:hidden">
              <div className="absolute inset-0 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent,black_65%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/15 to-65%" />
            </div>
            
            {/* Desktop black gradient overlay */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none max-sm:hidden"
            />
            
            {/* Content (Text + CTA) */}
            <div className="absolute inset-x-0 bottom-[62px] flex flex-col items-start gap-3 px-5 lg:bottom-[60.52px] lg:items-center lg:gap-6">
              <h1 className="max-w-[289px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white lg:max-w-[788.543px] lg:text-center lg:text-[48px] lg:leading-[1.4] lg:tracking-[-0.96px]">
                {slide.headline}
              </h1>
              <Button
                href="/products"
                variant="dark"
                arrow="white"
                className="max-lg:gradient-border-dark-soft h-12 rounded-[4.571px] px-[22.822px] text-[13.714px] lg:rounded-[4px] lg:px-6"
              >
                Explore our Vehicles
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* carousel arrows (desktop only) */}
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

      {/* Mobile dots */}
      <div className="absolute inset-x-0 bottom-6 flex px-5 lg:hidden">
        <div className="flex items-center gap-[7px] p-2.5" role="tablist" aria-label="Hero slides">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 w-1.5 rounded-[1px] ${i === active ? "bg-white" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop dots */}
      <div className="absolute inset-x-0 bottom-[27px] hidden justify-center lg:flex" role="tablist" aria-label="Hero slides">
        <div className="flex items-center gap-[7px] p-2.5">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 w-1.5 rounded-[1px] ${i === active ? "bg-white" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
      {/* quick-action rail — scoped to the hero (Figma places it in the hero frame) */}
      <FloatingWidget mobileClassName="max-lg:bottom-[82px]" />

    </section>
  );
}
