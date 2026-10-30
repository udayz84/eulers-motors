"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

interface SocialPost {
  id: string;
  img: string;
  duration: string;
  author: {
    name?: string;
    handle: string;
    avatar?: string;
    isOfficial?: boolean;
  };
  likes: string;
  timeAgo: string;
  linkTheme?: "dark" | "frosted";
}

const POSTS: readonly SocialPost[] = [
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

/**
 * "See the trucks in action." (desktop 1:2008 · mobile 1:5058).
 * Instagram-style post cards with author chip, stats and CTA.
 */
export default function SocialWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const interactionPausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const row = scrollRef.current;
    const track = trackRef.current;
    if (!section || !row || !track) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(desktopQuery.matches);
    const updateDesktop = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (!e.matches && track) {
        track.style.transform = "";
      }
    };
    desktopQuery.addEventListener("change", updateDesktop);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    let frame = 0;
    let offset = 0;
    let cachedLoopDist = 0;

    const getLoopDistance = () => {
      if (cachedLoopDist > 0) return cachedLoopDist;
      const duplicate = row.querySelector<HTMLElement>("[data-social-copy='true']");
      const first = row.querySelector<HTMLElement>("[data-social-index='0']");
      if (duplicate && first) {
        const dist = duplicate.offsetLeft - first.offsetLeft;
        if (dist > 0) {
          cachedLoopDist = dist;
          return dist;
        }
      }
      return 0;
    };

    const handleResize = () => {
      cachedLoopDist = 0;
    };
    window.addEventListener("resize", handleResize);

    const tick = () => {
      // Auto-scroll is enabled on desktop viewports only (>= 1024px)
      if (!desktopQuery.matches) {
        if (track.style.transform) track.style.transform = "";
        frame = window.requestAnimationFrame(tick);
        return;
      }

      if (!reducedMotion && visibleRef.current && !interactionPausedRef.current) {
        const loopDistance = getLoopDistance();
        if (loopDistance > 0) {
          if (row.scrollLeft !== 0) {
            offset = (offset + row.scrollLeft) % loopDistance;
            if (offset < 0) offset += loopDistance;
            row.scrollLeft = 0;
          }

          offset = (offset + 0.6) % loopDistance;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;

          const cardStep = loopDistance / POSTS.length;
          const currentIdx = Math.min(
            POSTS.length - 1,
            Math.floor((offset + cardStep * 0.25) / cardStep) % POSTS.length
          );
          setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      desktopQuery.removeEventListener("change", updateDesktop);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frame);
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseForInteraction = () => {
    interactionPausedRef.current = true;
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
  };

  const resumeAfterInteraction = (delay = 2000) => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      interactionPausedRef.current = false;
    }, delay);
  };

  const handleWheel = () => {
    pauseForInteraction();
    resumeAfterInteraction(1800);
  };

  const handleScroll = () => {
    if (isDesktop) {
      pauseForInteraction();
      resumeAfterInteraction(1800);
      return;
    }
    const row = scrollRef.current;
    if (!row) return;
    const cards = row.querySelectorAll<HTMLElement>("article");
    if (!cards.length) return;
    let index = 0;
    cards.forEach((card, i) => {
      if (row.scrollLeft >= card.offsetLeft - card.offsetWidth / 2) index = i % POSTS.length;
    });
    setActiveIndex(index);
  };

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
          <Eyebrow label="From the road" />
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
            See the trucks in action.
          </h2>
          <p className="text-[12px] text-ink lg:text-[16px] lg:leading-normal">
            Real vehicles, real depots, filmed by our own team.
          </p>
        </div>
      </div>

      {/* desktop row anchored at x=80, bleeding right — offset on a wrapper so
          the snap scroller doesn't consume it as initial scroll. Wrapper pb is
          the Figma container's 20px bottom padding (1:2008), nudged up a bit
          for breathing room below the cards */}
      <div className="w-full pb-[28px] lg:pb-[32px]">
        <div
          className="relative"
          onMouseEnter={pauseForInteraction}
          onMouseLeave={() => resumeAfterInteraction(600)}
          onPointerDown={pauseForInteraction}
          onPointerUp={() => resumeAfterInteraction(1800)}
          onPointerCancel={() => resumeAfterInteraction(1800)}
        >
          <div
            id="social-snap-row"
            ref={scrollRef}
            onScroll={handleScroll}
            onPointerDown={pauseForInteraction}
            onPointerUp={() => resumeAfterInteraction(1800)}
            onPointerCancel={() => resumeAfterInteraction(1800)}
            onWheel={handleWheel}
            className="snap-row snap-center-mobile gap-[12px] lg:gap-[30.663px] min-[2233px]:justify-center no-scrollbar"
            style={{
              scrollSnapType: isDesktop ? "none" : undefined,
              scrollBehavior: isDesktop ? "auto" : undefined,
              overflowAnchor: "none",
            }}
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
              className="hidden shrink-0 lg:block min-[2233px]:hidden"
              style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 49.337px)" }}
            />
            <div
              ref={trackRef}
              className="flex w-max shrink-0 gap-[12px] lg:gap-[30.663px]"
              style={{ willChange: "transform" }}
            >
              {[...POSTS, ...POSTS].map((post, i) => {
                const originalIndex = i % POSTS.length;
                const isCopy = i >= POSTS.length;
                const last = originalIndex === POSTS.length - 1;
                return (
                  <article
                    key={i}
                    data-social-index={originalIndex}
                    data-social-copy={isCopy ? "true" : undefined}
                    aria-hidden={isCopy ? true : undefined}
                    className="relative h-[400px] w-[300px] shrink-0 overflow-clip rounded-2xl lg:h-[519.574px] lg:w-[390px] lg:rounded-[20.442px]"
                  >
                    <Image
                      src={post.img}
                      alt="Euler trucks in action"
                      fill
                      sizes="400px"
                      loading={isCopy ? "eager" : "lazy"}
                      className="object-cover"
                    />
                    {/* scrim — mobile Figma (1:5068 bitmap): top-only darkening;
                        the bottom has NO scrim so the photo reads through the
                        white/20 panel (verified: figma panel px = photo×0.8+51) */}
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
                        {post.duration}
                      </span>
                    </div>

                    {/* play button */}
                    <button
                      type="button"
                      aria-label="Play video"
                      className="absolute left-1/2 top-[calc(50%-20px)] -translate-x-1/2"
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
                          {post.author.isOfficial ? (
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
                          ) : post.author.avatar ? (
                            <Image
                              src={post.author.avatar}
                              alt=""
                              width={20}
                              height={20}
                              className="size-[18px] rounded-[37px] lg:size-[20.4px] lg:rounded-full"
                            />
                          ) : null}
                          <span className="truncate text-[12px] font-medium text-white lg:text-[15.3px]">
                            {post.author.name || post.author.handle}
                          </span>
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center gap-[7.9px] lg:gap-[12.8px]">
                          <span className="text-[12px] font-bold text-white lg:text-[12.8px]">
                            {post.likes}
                          </span>
                          <span aria-hidden className="size-[3.1px] rounded-full bg-white/50 lg:size-[5.1px]" />
                          <span className="text-[12px] font-bold text-white lg:text-[12.8px]">
                            {post.timeAgo}
                          </span>
                        </div>

                        {/* CTA button */}
                        {post.linkTheme === "dark" ? (
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
            </div>
            {/* Spacers for right bleed padding — same width as the left one,
                keeping scroll-end padding symmetric with the start gutter */}
            <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 12px)" }} />
            <div
              aria-hidden
              className="hidden shrink-0 lg:block min-[2233px]:hidden"
              style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 49.337px)" }}
            />
          </div>
        </div>

        {/* Progress Indicator Pill */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-8">
          <div className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1">
            <div
              className="h-full rounded-[23px] bg-[#121212] transition-all duration-300"
              style={{
                width: `${100 / POSTS.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
