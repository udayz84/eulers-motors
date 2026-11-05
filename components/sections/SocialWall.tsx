"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import CarouselArrows from "../ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

export interface SocialPostItem {
  id?: string;
  img: string;
  duration?: string;
  author?: {
    name?: string;
    handle: string;
    avatar?: string;
    isOfficial?: boolean;
  };
  likes?: string;
  timeAgo?: string;
  linkTheme?: "dark" | "frosted";
}

const DEFAULT_POSTS: readonly SocialPostItem[] = [
  {
    id: "post-1",
    img: "/assets/social/post-c.png",
    duration: "02:14",
    author: {
      handle: "@eulermotors",
      isOfficial: true,
    },
    likes: "4,820 likes",
    timeAgo: "1 day ago",
    linkTheme: "frosted",
  },
  {
    id: "post-2",
    img: "/assets/social/post-d.png",
    duration: "01:48",
    author: {
      handle: "@eulermotors_drivers",
      isOfficial: true,
    },
    likes: "3,150 likes",
    timeAgo: "3 days ago",
    linkTheme: "frosted",
  },
  {
    id: "post-3",
    img: "/assets/social/post-e.png",
    duration: "00:58",
    author: {
      handle: "@eulermotors",
      isOfficial: true,
    },
    likes: "9,480 likes",
    timeAgo: "5 days ago",
    linkTheme: "frosted",
  },
  {
    id: "post-4",
    img: "/assets/social/post-b.jpg",
    duration: "02:45",
    author: {
      handle: "@eulermotors_fleet",
      isOfficial: true,
    },
    likes: "6,240 likes",
    timeAgo: "1 week ago",
    linkTheme: "frosted",
  },
  {
    id: "post-5",
    img: "/assets/social/post-a.jpg",
    duration: "02:55",
    author: {
      name: "Arjun Nair",
      handle: "@arjunnair_fleet",
      avatar: "/assets/social/avatar.png",
      isOfficial: false,
    },
    likes: "2,890 likes",
    timeAgo: "2 weeks ago",
    linkTheme: "dark",
  },
] as const;

export interface SocialWallProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  posts?: readonly SocialPostItem[] | SocialPostItem[];
}

/**
 * "See the trucks in action." (desktop 1:2008 · mobile 1:5058).
 * Instagram-style post cards with author chip, stats and CTA.
 */
export default function SocialWall({
  eyebrow = "From the road",
  title = "See the trucks in action.",
  description = "Real vehicles, real depots, filmed by our own team.",
  posts,
}: SocialWallProps = {}) {
  const currentPosts = posts !== undefined ? posts : DEFAULT_POSTS;

  // Clean unmount if empty collection intentionally provided by CMS
  if (currentPosts.length === 0) return null;

  const repeats = Math.max(2, Math.ceil(12 / currentPosts.length));
  const displayList = Array.from({ length: repeats }).flatMap(() => currentPosts);

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

  // Smooth desktop auto-scroll loop (continuous drift without pausing on hover)
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

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        isDesktop &&
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
            updateProgress();
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
  }, [updateProgress]);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden" aria-label="From the road">
      {/* Figma 1:2008: 1440 frame · padding 60px 60px 20px · column ·
          items-center · gap 42. Header and post row are both 1280 wide inside
          the 1320 content box, so they center and start at x = 60 + 20 = 80.
          The row bleeds off the right edge (carousel), so it lives outside
          this padded container; its spacer anchors the first card on the same
          x=80 line as the heading. On wide screens (≥2233px, all 5 cards fit)
          the row centers instead, and the heading follows the first card
          (constant −396.33px = −316.33px group offset (2072.65−1440)/2 − 80px anchor) */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-[20px] pt-10 lg:items-start lg:px-0 lg:pb-[42px] lg:pt-[60px]">
        <div className="flex w-full flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:pl-[80px] min-[2233px]:-ml-[396.326px] lg:text-left">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
            {title}
          </h2>
          <p className="text-[12px] text-ink lg:text-[16px] lg:leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* desktop row anchored at x=80, bleeding right */}
      <div className="w-full pb-[28px] lg:pb-[32px]">
        <div className="relative overflow-hidden">
          <div
            id="social-snap-row"
            ref={scrollRef}
            onScroll={() => {
              if (isDraggingRef.current) {
                pauseAutoScroll(600);
              }
            }}
            className="no-scrollbar flex w-full gap-[12px] overflow-x-auto snap-x snap-mandatory lg:snap-none lg:gap-[30.663px] cursor-grab active:cursor-grabbing"
          >
            {/* Spacers for alignment — the desktop spacer anchors the first card
                at x=80 on the 1440 frame (Figma 1:2008): frame margin + 49.337px
                spacer + 30.663px row gap = margin + 80px. Once the viewport fits
                all 5 cards (≥2233px) it hides and the row centers instead
                (justify-center on the snap-row). Mobile mirrors Customer
                Reviews: 20px gutter (the heading's px-5 content edge) minus the
                row's 12px gap, so the first card starts at exactly 20px */}
            <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 12px)" }} />
            <div
              aria-hidden
              className="desktop-spacer hidden shrink-0 lg:block min-[2233px]:hidden"
              style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 49.337px)" }}
            />

            {displayList.map((post, i) => {
              const originalIndex = i % currentPosts.length;
              const duration = post.duration || "02:00";
              const author = post.author || { handle: "@eulermotors", isOfficial: true };
              const likes = post.likes || "4,820 likes";
              const timeAgo = post.timeAgo || "1 day ago";
              const linkTheme = post.linkTheme || "frosted";

              return (
                <article
                  key={`social-${i}`}
                  data-social-index={originalIndex}
                  className="relative h-[400px] w-[300px] shrink-0 snap-center overflow-clip rounded-2xl lg:h-[519.574px] lg:w-[390px] lg:rounded-[20.442px]"
                >
                  <Image
                    src={post.img}
                    alt="Euler trucks in action"
                    fill
                    sizes="400px"
                    priority={i < 4}
                    className="object-cover"
                  />
                  {/* scrim — mobile Figma (1:5068 bitmap): top-only darkening */}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent lg:to-black/60" />

                  {/* instagram chip */}
                  <span className="absolute right-[13.5px] top-[13.5px] flex size-[30.2px] items-center justify-center rounded-[7.6px] border border-white/20 bg-white/20 backdrop-blur-[10px] lg:right-[26px] lg:top-6 lg:size-[41px] lg:rounded-[10.2px]">
                    <Image
                      src="/assets/social/icon-instagram2.svg"
                      alt=""
                      width={23}
                      height={23}
                      aria-hidden
                      className="size-[17px] lg:size-[23px]"
                    />
                  </span>

                  {/* time chip */}
                  <div className="absolute left-4 top-4 flex items-center justify-center rounded-full bg-white px-[6px] py-[2px] lg:px-2.5 lg:py-1">
                    <span className="text-[12px] font-semibold leading-none text-black lg:text-[14px]">
                      {duration}
                    </span>
                  </div>

                  {/* play button */}
                  <button
                    type="button"
                    aria-label="Play video"
                    className="absolute left-1/2 top-[calc(50%-20px)] -translate-x-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  >
                    <Image
                      src="/assets/reviews/play-figma.png"
                      alt=""
                      width={52}
                      height={52}
                      className="size-[42px] lg:size-[70.27px]"
                    />
                  </button>

                  {/* post info panel — frosted glass with white veil */}
                  <div className="absolute inset-x-[13.5px] bottom-3 rounded-[8px] bg-gradient-to-b from-white/[0.12] to-white/[0.38] p-[8px] backdrop-blur-[8px] lg:inset-x-4 lg:bottom-4 lg:rounded-[18px] lg:border lg:border-white/20 lg:p-4 lg:bg-none lg:bg-white/20 lg:backdrop-blur-[12px]">
                    <div className="flex flex-col gap-[6px] lg:gap-[16.6px]">
                      {/* Author row */}
                      <div className="flex w-[190px] items-center gap-[5.5px] lg:w-auto lg:gap-[8.9px]">
                        {author.isOfficial ? (
                          <span className="flex size-[18px] shrink-0 items-center justify-center rounded-[37px] bg-black lg:size-6 lg:rounded-full">
                            <Image
                              src="/assets/social/logo-small.svg"
                              alt=""
                              width={17}
                              height={3}
                              aria-hidden
                              className="h-[1.7px] w-[10.4px] lg:h-[2.8px] lg:w-[16.9px]"
                            />
                          </span>
                        ) : author.avatar ? (
                          <Image
                            src={author.avatar}
                            alt=""
                            width={20}
                            height={20}
                            className="size-[18px] rounded-[37px] lg:size-[20.4px] lg:rounded-full"
                          />
                        ) : null}
                        <span className="truncate text-[12px] font-medium text-white lg:text-[15.3px]">
                          {author.name || author.handle}
                        </span>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center gap-[7.9px] lg:gap-[12.8px]">
                        <span className="text-[12px] font-bold text-white lg:text-[12.8px]">
                          {likes}
                        </span>
                        <span aria-hidden className="size-[3.1px] rounded-full bg-white/50 lg:size-[5.1px]" />
                        <span className="text-[12px] font-bold text-white lg:text-[12.8px]">
                          {timeAgo}
                        </span>
                      </div>

                      {/* CTA button */}
                      {linkTheme === "dark" ? (
                        <a
                          href="https://www.instagram.com/eulermotors/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-[28px] w-fit self-start items-center justify-center gap-[7.4px] rounded-[8.6px] bg-ink px-[7.4px] lg:h-[40.9px] lg:gap-[10.2px] lg:rounded-[10.2px] lg:px-[15.3px] hover:bg-black transition-colors"
                        >
                          <span className="font-display text-[10px] font-semibold text-white lg:text-[15.3px]">
                            View on Instagram
                          </span>
                          <Image
                            src="/assets/social/post-arrow.svg"
                            alt=""
                            width={20}
                            height={13}
                            aria-hidden
                            className="h-[9.3px] w-[14.5px] lg:h-[12.8px] lg:w-[20px]"
                          />
                        </a>
                      ) : (
                        <a
                          href="https://www.instagram.com/eulermotors/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-[28px] w-fit self-start items-center justify-center rounded-[8.6px] border border-white/50 bg-[rgba(243,244,245,0.2)] px-[7.4px] backdrop-blur-[6.16px] lg:h-9 lg:rounded-[14px] lg:border-white/50 lg:bg-surface/20 lg:px-3 lg:backdrop-blur-[10px] hover:bg-white/30 transition-colors"
                        >
                          <span className="font-display text-[10px] font-semibold text-white lg:text-[14px]">
                            View on Instagram
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* End spacers: mobile gutter, desktop buffer so the last card is fully visible before maxScroll */}
            <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 12px)" }} />
            <div
              aria-hidden
              className="hidden shrink-0 lg:block"
              style={{
                width: "calc(max(24px, (100vw - 1440px) / 2 + 60px) + 80px)",
              }}
            />
          </div>

          {/* Right edge fade gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-[5] hidden w-[180px] bg-gradient-to-l from-white to-transparent lg:block xl:w-[210px]"
          />

          {/* Arrows on both sides — Figma 3321:13434 / 3321:13436 */}
          <CarouselArrows
            rowId="social-snap-row"
            label="trucks in action"
            variant="blue"
            onStep={() => pauseAutoScroll(600)}
          />
        </div>

        {/* Progress Indicator Pill (Figma 3321:13258) */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-6 pb-2 lg:pt-8 lg:pb-0">
          <div
            role="progressbar"
            aria-label="Social posts scroll progress"
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
      </div>
    </section>
  );
}
