"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Prev/next arrows for an existing `.snap-row` carousel (CSS scroll-snap row).
 * Clicking scrolls the row by one card + gap.
 * Arrows automatically show/hide based on current scroll position:
 * - Left arrow disappears when at the start of the slider (scrollLeft <= 8px).
 * - Right arrow disappears when at the end of the slider (scrollLeft >= maxScroll - 8px).
 * - Works smoothly in both directions and reflects real-time slider position.
 */
export default function CarouselArrows({
  rowId,
  label,
  className = "",
  variant = "default",
  onStep,
}: {
  /** id of the .snap-row the arrows scroll */
  rowId: string;
  /** aria-label fragment, e.g. "customer reviews" → "Previous customer reviews" */
  label: string;
  /** extra classes for the overlay (e.g. hiding it when the row can't scroll) */
  className?: string;
  /** "default" (white button) or "blue" (Figma node 3321:13434 blue gradient) */
  variant?: "default" | "blue";
  /** optional callback fired when a navigation arrow is clicked */
  onStep?: (dir: 1 | -1) => void;
}) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const row = document.getElementById(rowId);
    if (!row) return;
    const { scrollLeft, scrollWidth, clientWidth } = row;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScroll - 8);
  }, [rowId]);

  useEffect(() => {
    const row = document.getElementById(rowId);
    if (!row) return;

    checkScroll();
    row.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    const observer = new ResizeObserver(checkScroll);
    observer.observe(row);

    return () => {
      row.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      observer.disconnect();
    };
  }, [rowId, checkScroll]);

  const step = (dir: 1 | -1) => {
    onStep?.(dir);
    const row = document.getElementById(rowId);
    if (!row) return;
    row.dispatchEvent(new CustomEvent("carousel-step", { detail: { dir }, bubbles: true }));
    const card = row.querySelector<HTMLElement>("article");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const stepSize = card.offsetWidth + gap;
    row.scrollBy({ left: dir * stepSize, behavior: "smooth" });
  };

  if (variant === "blue") {
    const blueButton =
      "pointer-events-auto absolute top-1/2 hidden size-[45px] sm:size-[55px] -translate-y-1/2 items-center justify-center rounded-[8px] cursor-pointer shadow-[0_4px_16px_rgba(29,111,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_22px_rgba(29,111,255,0.45)] hover:brightness-110 active:scale-95 lg:flex";

    return (
      <div aria-hidden={false} className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => step(-1)}
          tabIndex={canScrollLeft ? 0 : -1}
          aria-hidden={!canScrollLeft}
          className={`${blueButton} left-4 lg:left-8 xl:left-[max(24px,calc((100vw-1440px)/2+50px))] ${
            canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
            aria-hidden="true"
          >
            <rect width="55" height="55" rx="8" fill="#212121" />
            <rect width="55" height="55" rx="8" fill="url(#blue_grad_left)" />
            <path
              d="M30.3097 34.5L24.9791 28.2809C24.5939 27.8316 24.5939 27.1684 24.9791 26.7191L30.3097 20.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
               <linearGradient
                 id="blue_grad_left"
                 x1="0%"
                 y1="0%"
                 x2="100%"
                 y2="100%"
                 gradientUnits="objectBoundingBox"
                 gradientTransform="rotate(258 0.5 0.5)"
               >
                 <stop stopColor="#0E2F6D" />
                 <stop offset="1" stopColor="#1D6FFF" />
               </linearGradient>
            </defs>
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={() => step(1)}
          tabIndex={canScrollRight ? 0 : -1}
          aria-hidden={!canScrollRight}
          className={`${blueButton} right-4 lg:right-8 xl:right-[max(24px,calc((100vw-1440px)/2+50px))] ${
            canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
            aria-hidden="true"
          >
            <rect width="55" height="55" rx="8" fill="#212121" />
            <rect width="55" height="55" rx="8" fill="url(#blue_grad_right)" />
            <path
              d="M24.6903 34.5L30.0209 28.2809C30.4061 27.8316 30.4061 27.1684 30.0209 26.7191L24.6903 20.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
               <linearGradient
                 id="blue_grad_right"
                 x1="0%"
                 y1="0%"
                 x2="100%"
                 y2="100%"
                 gradientUnits="objectBoundingBox"
                 gradientTransform="rotate(258 0.5 0.5)"
               >
                 <stop stopColor="#0E2F6D" />
                 <stop offset="1" stopColor="#1D6FFF" />
               </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    );
  }

  const button =
    "pointer-events-auto absolute top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-[10px] border border-gray-100/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_6px_24px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_2px_8px_rgba(0,0,0,0.10),0_10px_28px_rgba(0,0,0,0.20)] active:scale-95";

  return (
    <div aria-hidden={false} className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => step(-1)}
        tabIndex={canScrollLeft ? 0 : -1}
        aria-hidden={!canScrollLeft}
        className={`${button} left-4 lg:left-10 ${
          canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          className="h-4 w-4 text-[#1D6FFF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => step(1)}
        tabIndex={canScrollRight ? 0 : -1}
        aria-hidden={!canScrollRight}
        className={`${button} right-4 lg:right-10 ${
          canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          className="h-4 w-4 text-[#1D6FFF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
