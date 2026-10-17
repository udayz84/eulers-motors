"use client";

import { useEffect, useState } from "react";

/**
 * White pager bar beneath a horizontally scrollable row (Figma 3329:13531):
 * a 116.199×20 track with a 29.891×12 white thumb.
 *
 * `rowId` is the id of the scroll container whose horizontal progress the
 * thumb mirrors — it translates across the track as that row is swiped or
 * scrolled. Without `rowId` the bar renders the design's resting state
 * (thumb at the start), for rows that do not scroll.
 */
const PAD = 4;
const TRACK_W = 116.199;
const THUMB_W = 29.891;
const TRAVEL = TRACK_W - PAD * 2 - THUMB_W;

export default function PagerBar({
  rowId,
  className = "",
}: {
  rowId?: string;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!rowId) return;
    const row = document.getElementById(rowId);
    if (!row) return;

    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      setProgress(max > 0 ? Math.min(1, Math.max(0, row.scrollLeft / max)) : 0);
    };

    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [rowId]);

  return (
    <div
      className={`flex h-5 w-[116.199px] shrink-0 items-center rounded-[14.4px] bg-[rgba(204,204,204,0.2)] p-1 ${className}`}
    >
      <div
        className="h-3 w-[29.891px] rounded-[23.04px] bg-white transition-transform duration-150 ease-out"
        style={{ transform: `translateX(${progress * TRAVEL}px)` }}
      />
    </div>
  );
}
