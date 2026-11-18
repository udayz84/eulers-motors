"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import PagerBar from "@/components/ui/PagerBar";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

const ASSET = "/assets/neo/figma/stories/";
const DESKTOP_STORIES = [
  { image: "story-1-high-res.png", position: "object-center" },
  { image: "story-4.png", position: "object-[center_bottom]" },
  { image: "story-2.png", position: "object-center" },
  { image: "story-3.jpeg", position: "object-center" },
] as const;
const MOBILE_STORIES = [DESKTOP_STORIES[0], DESKTOP_STORIES[1]] as const;

function RoadStoryCard({
  image,
  position,
  mobile = false,
  first = false,
}: {
  image: string;
  position: string;
  mobile?: boolean;
  first?: boolean;
}) {
  return (
    <article
      className={`relative shrink-0 overflow-clip text-white ${
        mobile
          ? `aspect-[3/4] w-[350px] snap-start rounded-[14.614px] min-[640px]:max-[1023px]:w-[420px] ${first ? "ml-5 scroll-ml-5 min-[640px]:max-[1023px]:ml-8 min-[640px]:max-[1023px]:scroll-ml-8" : ""}`
          : "h-[485.645px] aspect-[300/400] snap-start rounded-[20.442px]"
      }`}
    >
      <Image
        src={`${ASSET}${image}`}
        alt=""
        fill
        quality={100}
        sizes={mobile ? "350px" : "364px"}
        className={`pointer-events-none object-cover ${position}`}
      />

      {mobile ? (
        <>
          <div aria-hidden className="pointer-events-none absolute -translate-x-1/2 bottom-[-73.97px] left-[calc(50%-45.19px)] h-[243.057px] w-[468.194px] blur-[85.996px]">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[13.47px]" />
          </div>
          <div aria-hidden className="pointer-events-none absolute left-[-322.69px] top-[-137.36px] h-[208.252px] w-[398.185px] blur-[85.996px]">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[13.47px]" />
          </div>
        </>
      ) : (
        <>
          <div aria-hidden className="pointer-events-none absolute -translate-x-1/2 bottom-[-152.24px] left-[calc(50%-0.28px)] h-[316.052px] w-[604.301px] blur-[130.511px]">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-[20.442px]" />
          </div>
          <div aria-hidden className="pointer-events-none absolute left-[-489.73px] top-[-208.96px] h-[316.052px] w-[604.301px] blur-[130.511px]">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[20.442px]" />
          </div>
        </>
      )}

      <div
        className={`absolute flex flex-col items-start ${
          mobile
            ? "bottom-3 left-3 right-3 gap-[11.874px]"
            : "bottom-4 left-[12.7px] right-[12.7px] gap-[16.609px]"
        }`}
      >
        <div
          className={`flex shrink-0 items-center rounded-full border border-[#6fcf97] bg-[rgba(111,207,151,0.24)] backdrop-blur-[12.776px] ${
            mobile
              ? "gap-[6.51px] px-[6.51px] py-[4.34px]"
              : "h-[25.553px] gap-[10.221px] pl-[7.666px] pr-[15.332px] py-[4px]"
          }`}
        >
          <Image
            src="/assets/neo/road/savings-trend.svg"
            alt=""
            width={14}
            height={9}
            style={{ transform: mobile ? "scale(0.8, -0.8)" : "scaleY(-1)" }}
          />
          <span
            className={`whitespace-nowrap font-sans font-bold leading-[1.15] text-white ${
              mobile
                ? "text-[13.019px] tracking-[-0.2604px]"
                : "text-[12.776px] tracking-[-0.2555px]"
            }`}
          >
            ₹41,000 saved a month
          </span>
        </div>

        <p
          className={`m-0 font-sans font-bold leading-[1.2] text-white ${
            mobile
              ? "max-w-[300.598px] text-[15.189px] tracking-[-0.3038px]"
              : "w-full text-[17.887px] tracking-[-0.3577px]"
          }`}
        >
          &quot;14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.&quot;
        </p>

        <div className={`flex items-center ${mobile ? "gap-[7.387px]" : "gap-3"}`}>
          <Image
            src="/assets/reviews/avatar.png"
            alt=""
            width={mobile ? 33 : 31}
            height={mobile ? 33 : 31}
            className="shrink-0 rounded-full"
          />
          <div className={`flex flex-col ${mobile ? "gap-[3.078px]" : "gap-[5px]"}`}>
            <div className={`flex items-center ${mobile ? "gap-[5.54px]" : "gap-[9px]"}`}>
              <span className={`whitespace-nowrap font-sans font-bold text-white ${mobile ? "text-[13.019px]" : "text-[16px]"}`}>
                Saurabh Patil
              </span>
              <span aria-hidden className={`shrink-0 rounded-full ${mobile ? "size-[3.693px] bg-white/20" : "size-[6px] bg-[rgba(18,18,18,0.2)]"}`} />
              <span className={`whitespace-nowrap font-sans font-medium text-white/50 ${mobile ? "text-[13.019px]" : "text-[12px]"}`}>
                Fleet Owner
              </span>
            </div>
            <div className={`flex items-center ${mobile ? "gap-[6.156px]" : "gap-[5px]"}`}>
              <span className={`flex items-center ${mobile ? "gap-[3.616px]" : "gap-1"}`}>
                {[0, 1, 2, 3].map((star) => (
                  <Image
                    key={star}
                    src="/assets/reviews/star.svg"
                    alt=""
                    width={12}
                    height={12}
                    className={mobile ? "size-[10.849px]" : "size-3"}
                  />
                ))}
                <Image
                  src="/assets/reviews/star-half.svg"
                  alt=""
                  width={12}
                  height={12}
                  className={mobile ? "size-[10.849px]" : "size-3"}
                />
              </span>
              <span className={`font-inter font-medium leading-none text-white ${mobile ? "text-[13.019px] tracking-[-0.651px]" : "text-[10px] tracking-[-0.5px]"}`}>
                4.9
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute flex items-center justify-center bg-white ${
          mobile
            ? "left-[17.36px] top-[17.72px] rounded-[54.247px] px-[6.51px] py-[2.17px]"
            : "left-4 top-4 rounded-full px-[10px] py-1"
        }`}
      >
        <span className={`font-sans font-bold leading-normal text-black ${mobile ? "text-[13.019px] font-semibold" : "text-[14px]"}`}>
          02:32
        </span>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${mobile ? "size-[37.174px]" : "size-[52px]"}`}
      >
        {mobile ? (
          <div className="flex size-full items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.16)] backdrop-blur-[8px]">
            <span aria-hidden className="ml-[2px] h-[13px] w-[11px] bg-white [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          </div>
        ) : (
          <Image
            src="/assets/reviews/play-figma.png"
            alt=""
            width={52}
            height={52}
            className="size-[52px]"
          />
        )}
      </div>
    </article>
  );
}

function MobileRoadStories() {
  const rowRef = useRef<HTMLDivElement>(null);
  useDraggableScroll(rowRef);

  return (
      <section aria-labelledby="neo-road-title-mobile" className="flex flex-col items-center gap-6 bg-white px-0 py-[42px] min-[640px]:max-[1023px]:gap-8 min-[640px]:max-[1023px]:py-12">
      <header className="flex w-full flex-col items-center justify-center gap-[14px]">
        <div className="flex items-center gap-[6px]">
          <Image src="/assets/neo/main-image/logo.svg" alt="" width={14} height={14} />
          <span className="font-sans text-[12px] font-normal uppercase leading-normal text-[#121212]">From the road</span>
        </div>
        <h2 id="neo-road-title-mobile" className="m-0 whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] min-[640px]:max-[1023px]:text-[36px]">
          What other drivers say
        </h2>
      </header>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-visible">
        <div
          id="neo-road-mobile-row"
          ref={rowRef}
          className="no-scrollbar flex w-full cursor-grab snap-x snap-mandatory gap-[13.02px] overflow-x-auto overflow-y-hidden"
          style={{ overscrollBehaviorX: "contain", WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
        >
          {MOBILE_STORIES.map((story, index) => (
            <RoadStoryCard key={story.image} image={story.image} position={story.position} mobile first={index === 0} />
          ))}
        </div>
      </div>
      <PagerBar
        rowId="neo-road-mobile-row"
        className="rounded-full !bg-[#121212] p-[4px] [&>div]:h-[12px] [&>div]:w-[30px] [&>div]:bg-[linear-gradient(100.21deg,#00ff87_28.559%,#1d6fff_124.97%)]"
      />
    </section>
  );
}

// Stories are repeated a few times to give the row a comfortable scroll runway
const REPEATS = 3;

function DesktopRoadStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true); // Default true so it does not delay starting
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  // Progress is measured against the unique stories only (the row repeats
  // them for scroll runway): 100% once the last unique card fills the view
  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    const lastUnique = el?.children[DESKTOP_STORIES.length - 1] as HTMLElement | undefined;
    if (!el || !lastUnique) return;
    const usefulMax = Math.max(1, lastUnique.offsetLeft + lastUnique.offsetWidth - el.clientWidth);
    setProgress(Math.min(1, Math.max(0, el.scrollLeft / usefulMax)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

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
    },
  });

  // Section visibility tracking via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isVisibleRef.current = true;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Smooth auto-scroll loop (same feel as the homepage reviews row), pausing
  // on drag/arrow clicks and stopping at the end of the row
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId: number;
    let lastTime: number | null = null;
    let accumulator = 0;
    const speed = 50; // pixels per second

    const step = (now: number) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        !reducedMotion &&
        isVisibleRef.current &&
        !isDraggingRef.current &&
        !isInteractingRef.current
      ) {
        accumulator += speed * dt;
        if (accumulator >= 1) {
          const px = Math.floor(accumulator);
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft < maxScroll - 1) {
            container.scrollLeft = Math.min(maxScroll, container.scrollLeft + px);
            accumulator -= px;
          } else {
            accumulator = 0;
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, []);

  // Arrow navigation, same treatment as the "A day with Neo" carousel
  const scrollCards = (direction: -1 | 1) => {
    const row = scrollRef.current;
    const card = row?.querySelector<HTMLElement>("article");
    if (!row || !card) return;
    pauseAutoScroll(600);
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} aria-labelledby="neo-road-title" className="relative flex w-full flex-col items-center gap-[42px] overflow-hidden bg-white py-[62px]">
      <header className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-[14px] px-[60px] text-center">
        <div className="flex items-center gap-3">
          <Image src="/assets/neo/main-image/logo.svg" alt="" width={14} height={14} />
          <span className="font-sans text-[16px] font-normal uppercase leading-normal text-[#121212]">From the road</span>
        </div>
        <h2 id="neo-road-title" className="m-0 whitespace-nowrap font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-[#121212]">
          What other drivers say
        </h2>
      </header>

      <div className="relative h-[485.645px] w-full overflow-hidden">
        <div
          id="neo-road-desktop-row"
          ref={scrollRef}
          className="no-scrollbar flex h-full w-full cursor-grab gap-6 overflow-x-auto overflow-y-hidden pl-[56px]"
          style={{ overscrollBehaviorX: "contain" }}
        >
          {Array.from({ length: REPEATS }).flatMap((_, repeat) =>
            DESKTOP_STORIES.map((story, index) => (
              <RoadStoryCard key={`${story.image}-${repeat}-${index}`} image={story.image} position={story.position} />
            ))
          )}
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 top-0 z-[5] w-[210.811px] bg-gradient-to-l from-white to-[rgba(255,255,255,0)]" />

        {/* Arrows on both sides, same marks as "A day with Neo" */}
        <button
          type="button"
          aria-label="Previous driver stories"
          onClick={() => scrollCards(-1)}
          className="absolute left-[16px] top-1/2 z-20 size-[55px] -translate-y-1/2 rotate-180 cursor-pointer transition-transform hover:scale-110"
        >
          <Image src="/assets/arrow-right.svg" alt="" fill sizes="55px" className="object-contain" />
        </button>
        <button
          type="button"
          aria-label="Next driver stories"
          onClick={() => scrollCards(1)}
          className="absolute right-[16px] top-1/2 z-20 size-[55px] -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
        >
          <Image src="/assets/arrow-right.svg" alt="" fill sizes="55px" className="object-contain" />
        </button>
      </div>
      <PagerBar
        progress={progress}
        className="rounded-full bg-[#111] p-[4px] [&>div]:h-[12px] [&>div]:w-[30px] [&>div]:bg-gradient-to-r [&>div]:from-[#1d9eb6] [&>div]:to-[#a4e4c5]"
      />
    </section>
  );
}

export default function NeoRoadStories({
  mode,
}: {
  mode: "desktop" | "mobile";
}) {
  if (mode === "mobile") {
    return <MobileRoadStories />;
  }

  return <DesktopRoadStories />;
}
