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
}: {
  /** id of the .snap-row the arrows scroll */
  rowId: string;
  /** aria-label fragment, e.g. "customer reviews" → "Previous customer reviews" */
  label: string;
  /** extra classes for the overlay (e.g. hiding it when the row can't scroll) */
  className?: string;
}) {
  const step = (dir: 1 | -1) => {
    const row = document.getElementById(rowId);
    const card = row?.querySelector<HTMLElement>("article");
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

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
