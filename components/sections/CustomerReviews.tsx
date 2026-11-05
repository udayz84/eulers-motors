"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import CarouselArrows from "../ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

export interface ReviewItem {
  id?: number;
  documentId?: string;
  customerName: string;
  roleOrCompany?: string;
  location?: string;
  quote?: string;
  rating?: number;
  savingsMonthly?: string;
  videoDuration?: string;
  storyImage?: { url: string } | string;
  overlayImage?: { url: string } | string | null;
  avatarImage?: { url: string } | string;
  video?: { url: string } | string;
  videoUrl?: string;
  order?: number;
}

export interface CustomerReviewsProps {
  autoScrollOnMobile?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  reviews?: ReviewItem[];
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    customerName: "Saurabh Patil",
    roleOrCompany: "Fleet Owner",
    rating: 4.9,
    quote: "14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.",
    savingsMonthly: "₹41,000 saved a month",
    videoDuration: "02:32",
    storyImage: { url: "/assets/reviews/story-a.webp" },
    overlayImage: { url: "/assets/reviews/story-b.webp" },
    avatarImage: { url: "/assets/reviews/avatar.png" },
  },
  {
    customerName: "Saurabh Patil",
    roleOrCompany: "Fleet Owner",
    rating: 4.9,
    quote: "14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.",
    savingsMonthly: "₹41,000 saved a month",
    videoDuration: "02:32",
    storyImage: { url: "/assets/reviews/story-a.webp" },
    overlayImage: { url: "/assets/reviews/story-c.webp" },
    avatarImage: { url: "/assets/reviews/avatar.png" },
  },
  {
    customerName: "Saurabh Patil",
    roleOrCompany: "Fleet Owner",
    rating: 4.9,
    quote: "14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.",
    savingsMonthly: "₹41,000 saved a month",
    videoDuration: "02:32",
    storyImage: { url: "/assets/reviews/story-a.webp" },
    overlayImage: { url: "/assets/reviews/story-d.webp" },
    avatarImage: { url: "/assets/reviews/avatar.png" },
  },
  {
    customerName: "Saurabh Patil",
    roleOrCompany: "Fleet Owner",
    rating: 4.9,
    quote: "14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.",
    savingsMonthly: "₹41,000 saved a month",
    videoDuration: "02:32",
    storyImage: { url: "/assets/reviews/story-a.webp" },
    avatarImage: { url: "/assets/reviews/avatar.png" },
  },
  {
    customerName: "Saurabh Patil",
    roleOrCompany: "Fleet Owner",
    rating: 4.9,
    quote: "14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.",
    savingsMonthly: "₹41,000 saved a month",
    videoDuration: "02:32",
    storyImage: { url: "/assets/reviews/story-a.webp" },
    avatarImage: { url: "/assets/reviews/avatar.png" },
  },
];

import { mediaUrl } from "@/lib/strapi/client";

function getMediaUrl(img?: any): string | null {
  if (!img) return null;
  const url = mediaUrl(img);
  return url || null;
}

/**
 * Customer reviews (desktop 1:1669 · mobile 1:4828).
 * Instagram-story shaped testimonial cards (300/400 aspect) with play buttons.
 * Desktop: continuous infinite auto-scrolling marquee.
 * Mobile: touch swipeable snap row by hand (no auto-scroll on mobile).
 */
export default function CustomerReviews({
  autoScrollOnMobile = false,
  eyebrow = "Customers",
  title = "Customer reviews",
  description = "Watch real customers share their experience with Euler Motors.",
  reviews,
}: CustomerReviewsProps = {}) {
  const currentReviews = reviews !== undefined ? reviews : DEFAULT_REVIEWS;

  // Clean unmount if empty collection intentionally provided by CMS
  if (currentReviews.length === 0) return null;

  // Repeat collection to provide comfortable desktop scroll runway
  const repeats = Math.max(2, Math.ceil(12 / currentReviews.length));
  const displayList = Array.from({ length: repeats }).flatMap(() => currentReviews);

  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true); // Default true so it does not delay starting
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

    // Check immediate visibility in case already in viewport
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

  // Smooth desktop auto-scroll loop (pausing on hover, drag, or arrow clicks)
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
    <section ref={sectionRef} className="bg-white overflow-hidden" aria-label="Customer reviews">
      {/* Figma 1:1669 root — width 1440 · padding 62px 60px · flex-col ·
          items-center · justify-center · gap 42px. Heading row (1:1670) is w-1280,
          centered in the 1320px content box → text starts at x=80 on desktop. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-8 pb-[24px] pt-10 sm:pt-12 lg:justify-center lg:px-[60px] lg:pb-[42px] lg:pt-[62px]">
        <div className="flex w-full max-w-[1280px] flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:text-left">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <h2 className="font-display text-[28px] sm:text-[38px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
            {title}
          </h2>
          <p className="text-[12px] sm:text-[14px] text-ink lg:text-[16px] lg:leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* Cards: touch snap-scroll on mobile, draggable + auto-scrolling on desktop */}
      <div className="w-full pb-[42px] lg:pb-[62px]">
        <div className="relative overflow-hidden">
          <div
            id="reviews-snap-row"
            ref={scrollRef}
            onScroll={() => {
              if (isDraggingRef.current) {
                pauseAutoScroll();
              }
            }}
            className="no-scrollbar flex w-full gap-[13px] overflow-x-auto snap-x snap-mandatory lg:snap-none lg:gap-6 cursor-grab active:cursor-grabbing"
          >
            {/* Spacers for alignment — they mirror the header row's left edge so
                the first card starts under the heading on desktop (x=80) */}
            <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 13px)" }} />
            <div
              aria-hidden
              className="desktop-spacer hidden shrink-0 lg:block"
              style={{
                width:
                  "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 36px)",
              }}
            />

            {displayList.map((item, i) => {
              const baseImage = getMediaUrl(item.storyImage) || "/assets/reviews/story-a.webp";
              const overlayImage = getMediaUrl(item.overlayImage);
              const avatarUrl = getMediaUrl(item.avatarImage) || "/assets/reviews/avatar.png";
              const cleanQuote = item.quote ? item.quote.replace(/^["“”']|["“”']$/g, "") : "";

              return (
                <article
                  key={`review-${i}-${item.customerName || "story"}`}
                  className="relative aspect-[300/400] h-[466.667px] w-[350px] shrink-0 snap-center overflow-clip rounded-[14.614px] lg:h-[485.645px] lg:w-auto lg:rounded-[20.442px]"
                >
                  <Image
                    src={baseImage}
                    alt={item.customerName ? `${item.customerName} story` : "Customer story"}
                    fill
                    sizes="400px"
                    priority={i < 4}
                    className="object-cover"
                  />
                  {overlayImage && (
                    <Image
                      src={overlayImage}
                      alt=""
                      fill
                      sizes="400px"
                      priority={i < 4}
                      className="object-cover"
                    />
                  )}

                  {/* graded frost — Figma 1:1680 */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-white/20 backdrop-blur-[20.442px] [mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,0.88)_17%,rgba(0,0,0,0.61)_33%,rgba(0,0,0,0.32)_50%,rgba(0,0,0,0.14)_67%,transparent_83%)]"
                  />

                  {/* quote + author — Figma 1:1679 */}
                  <div className="absolute inset-x-4 bottom-4 flex flex-col gap-[16.6px] lg:inset-x-4 lg:bottom-4">
                    {/* savings chip */}
                    {item.savingsMonthly && (
                      <div className="flex h-[25.5px] w-fit items-center gap-[6.5px] rounded-[20.442px] border border-chip-green bg-chip-green/25 py-[7.7px] pl-[6.5px] pr-[15.3px] backdrop-blur-[12.8px] lg:h-[25.553px]">
                        <Image
                          src="/assets/reviews/icon-chat.svg"
                          alt=""
                          width={14}
                          height={9}
                          aria-hidden
                          className="h-[8.688px] w-[13.799px] -scale-y-100"
                        />
                        <span className="whitespace-nowrap text-[12.776px] font-bold leading-[1.15] tracking-[-0.2555px] text-white">
                          {item.savingsMonthly}
                        </span>
                      </div>
                    )}

                    {cleanQuote && (
                      <p className="text-[15.2px] font-bold leading-normal tracking-[-0.3577px] text-white lg:text-[17.887px]">
                        &quot;{cleanQuote}&quot;
                      </p>
                    )}

                    {(item.customerName || item.roleOrCompany) && (
                      <div className="flex items-center gap-3">
                        <Image
                          src={avatarUrl}
                          alt=""
                          width={31}
                          height={31}
                          className="h-[30.663px] w-[30.663px] rounded-full object-cover lg:h-[30.663px] lg:w-[30.663px]"
                        />
                        <div className="flex flex-col gap-[5px]">
                          <div className="flex items-center gap-[9px]">
                            {item.customerName && (
                              <span className="text-[13px] font-bold text-white lg:text-[16px]">{item.customerName}</span>
                            )}
                            {item.customerName && item.roleOrCompany && (
                              <span aria-hidden className="size-[6px] rounded-full bg-ink/20" />
                            )}
                            {item.roleOrCompany && (
                              <span className="text-[13px] font-medium text-white/50 lg:text-[12px]">{item.roleOrCompany}</span>
                            )}
                          </div>
                          {typeof item.rating === "number" && (
                            <div className="flex items-center gap-[5px]">
                              <span className="flex items-center gap-1">
                                {[0, 1, 2, 3].map((s) => (
                                  <Image key={s} src="/assets/reviews/star.svg" alt="" width={12} height={12} aria-hidden className="size-3" />
                                ))}
                                <Image src="/assets/reviews/star-half.svg" alt="" width={12} height={12} aria-hidden className="size-3" />
                              </span>
                              <span className="font-inter text-[13px] font-medium leading-none tracking-[-0.5px] text-white lg:text-[10px]">
                                {item.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* time chip */}
                  {item.videoDuration && (
                    <div className="absolute left-4 top-4 flex items-center justify-center rounded-[54.247px] bg-white px-[6.51px] py-[2.17px] lg:rounded-full lg:px-2.5 lg:py-1">
                      <span className="font-sans text-[13.019px] font-semibold leading-normal text-black lg:text-[14px] lg:font-bold">
                        {item.videoDuration}
                      </span>
                    </div>
                  )}

                  {/* play button */}
                  <button
                    type="button"
                    aria-label={item.customerName ? `Play ${item.customerName} story` : "Play customer story"}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  >
                    <Image
                      src="/assets/reviews/play-figma.png"
                      alt=""
                      width={52}
                      height={52}
                      className="size-[37px] lg:size-[52px]"
                    />
                  </button>
                </article>
              );
            })}
            <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "20px" }} />
            <div
              aria-hidden
              className="hidden shrink-0 lg:block"
              style={{
                width: "calc(max(24px, (100vw - 1440px) / 2 + 60px) + 80px)",
              }}
            />
          </div>

          {/* Right edge fade gradient (Figma 3321:13208) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-[5] hidden w-[180px] bg-gradient-to-l from-white to-transparent lg:block xl:w-[210px]"
          />

          {/* Arrows on both sides — Figma 3321:13434 / 3321:13436 */}
          <CarouselArrows
            rowId="reviews-snap-row"
            label="customer reviews"
            variant="blue"
            onStep={() => pauseAutoScroll(600)}
          />
        </div>

        {/* Carousel Progress Indicator Pill (Figma 3321:13258) */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-6 pb-2 lg:pt-8 lg:pb-0">
          <div
            role="progressbar"
            aria-label="Customer reviews scroll progress"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#ccc]/50 p-1"
          >
            <div
              className="h-full w-[29.891px] rounded-[23.04px] bg-[#121212] transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translateX(${scrollProgress * (116.199 - 8 - 29.891)}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
