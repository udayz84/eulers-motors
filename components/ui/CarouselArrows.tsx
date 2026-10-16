"use client";

/**
 * Prev/next arrows for an existing `.snap-row` carousel (CSS scroll-snap row).
 * Clicking scrolls the row by one card + gap — mandatory snap settles on the
 * card, so the arrows drive the same scroller swipe/drag already uses.
 * Metrics match the Hero arrows (Hero.tsx): 42×42 button, rounded-[10px],
 * 40px (left-10/right-10) from the viewport edges on desktop — but keep the
 * white-card fill, which stays visible over these sections' light margins
 * (Hero's frosted white/25 variant only reads on its dark slides).
 * The overlay itself is pointer-events-none so cards and their play buttons
 * stay clickable; only the arrows take input.
 */
export default function CarouselArrows({
  rowId,
  label,
  className = "",
  variant = "default",
}: {
  /** id of the .snap-row the arrows scroll */
  rowId: string;
  /** aria-label fragment, e.g. "customer reviews" → "Previous customer reviews" */
  label: string;
  /** extra classes for the overlay (e.g. hiding it when the row can't scroll) */
  className?: string;
  /** "default" (white button) or "blue" (Figma node 3321:13434 blue gradient) */
  variant?: "default" | "blue";
}) {
  const step = (dir: 1 | -1) => {
    const row = document.getElementById(rowId);
    const card = row?.querySelector<HTMLElement>("article");
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  if (variant === "blue") {
    const blueButton =
      "pointer-events-auto absolute top-1/2 flex size-[45px] sm:size-[55px] -translate-y-1/2 items-center justify-center rounded-[8px] cursor-pointer shadow-[0_4px_16px_rgba(29,111,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_22px_rgba(29,111,255,0.45)] hover:brightness-110 active:scale-95";

    return (
      <div aria-hidden={false} className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => step(-1)}
          className={`${blueButton} left-4 lg:left-8 xl:left-[max(24px,calc((100vw-1440px)/2+50px))]`}
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
          className={`${blueButton} right-4 lg:right-8 xl:right-[max(24px,calc((100vw-1440px)/2+50px))]`}
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
    "pointer-events-auto absolute top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-[10px] border border-gray-100/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_6px_24px_rgba(0,0,0,0.15)] transition-all cursor-pointer hover:scale-105 hover:shadow-[0_2px_8px_rgba(0,0,0,0.10),0_10px_28px_rgba(0,0,0,0.20)] active:scale-95";

  return (
    <div aria-hidden={false} className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => step(-1)}
        className={`${button} left-4 lg:left-10`}
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
        className={`${button} right-4 lg:right-10`}
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
