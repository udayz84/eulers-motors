"use client";

import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

/** All five Figma cards repeat the same testimonial (Figma 1:1679-1:1791) */
const STORY_IMAGES = [
  { base: "/assets/reviews/story-a.jpg", overlay: "/assets/reviews/story-b.png" },
  { base: "/assets/reviews/story-a.jpg", overlay: "/assets/reviews/story-c.png" },
  { base: "/assets/reviews/story-a.jpg", overlay: "/assets/reviews/story-d.png" },
  { base: "/assets/reviews/story-a.jpg", overlay: null },
  { base: "/assets/reviews/story-a.jpg", overlay: null },
];

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
}: {
  autoScrollOnMobile?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
} = {}) {
  return (
    <section className="bg-white overflow-hidden" aria-label="Customer reviews">
      {/* Figma 1:1669 root — width 1440 · padding 62px 60px · flex-col ·
          items-center · justify-center · gap 42px. Heading row (1:1670) is w-1280,
          centered in the 1320px content box → text starts at x=80 on desktop. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-8 pb-[24px] pt-10 sm:pt-12 lg:justify-center lg:px-[60px] lg:pb-[42px] lg:pt-[62px]">
        <div className="flex w-full max-w-[1280px] flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:text-left">
          <Eyebrow label={eyebrow} />
          <h2 className="font-display text-[28px] sm:text-[38px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
            {title}
          </h2>
          <p className="text-[12px] sm:text-[14px] text-ink lg:text-[16px] lg:leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* Cards: touch snap-scroll on mobile, continuous auto-scrolling marquee on desktop */}
      <div className="w-full pb-[42px] lg:pb-[62px]">
        <div className="relative overflow-hidden">
          <div
            id="reviews-snap-row"
            className={`flex gap-[13px] lg:gap-6 ${
              autoScrollOnMobile
                ? "overflow-hidden"
                : "no-scrollbar overflow-x-auto snap-x snap-mandatory lg:overflow-hidden lg:snap-none touch-pan-x"
            }`}
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

            {/* Marquee Track: auto-scroll on desktop only, static & swipeable on mobile */}
            <div
              className={`flex w-max shrink-0 gap-[13px] lg:gap-6 lg:animate-marquee [--marquee-gap:13px] lg:[--marquee-gap:24px] will-change-transform ${
                autoScrollOnMobile ? "animate-marquee" : "max-lg:[animation:none]"
              }`}
              style={{ animationDuration: "40s" }}
            >
              {[...STORY_IMAGES, ...STORY_IMAGES].map((story, i) => (
                <article
                  key={`${i}-${story.base}`}
                  className="relative aspect-[300/400] h-[466.667px] w-[350px] shrink-0 snap-center overflow-clip rounded-[14.614px] lg:h-[485.645px] lg:w-auto lg:rounded-[20.442px]"
                >
                  <Image
                    src={story.base}
                    alt="Customer story"
                    fill
                    sizes="400px"
                    priority={i < 4}
                    className="object-cover"
                  />
                  {story.overlay && (
                    <Image
                      src={story.overlay}
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
                        ₹41,000 saved a month
                      </span>
                    </div>

                    <p className="text-[15.2px] font-bold leading-normal tracking-[-0.3577px] text-white lg:text-[17.887px]">
                      &quot;14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.&quot;
                    </p>

                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/reviews/avatar.png"
                        alt=""
                        width={31}
                        height={31}
                        className="h-[30.663px] w-[30.663px] rounded-full lg:h-[30.663px] lg:w-[30.663px]"
                      />
                      <div className="flex flex-col gap-[5px]">
                        <div className="flex items-center gap-[9px]">
                          <span className="text-[13px] font-bold text-white lg:text-[16px]">Saurabh Patil</span>
                          <span aria-hidden className="size-[6px] rounded-full bg-ink/20" />
                          <span className="text-[13px] font-medium text-white/50 lg:text-[12px]">Fleet Owner</span>
                        </div>
                        <div className="flex items-center gap-[5px]">
                          <span className="flex items-center gap-1">
                            {[0, 1, 2, 3].map((s) => (
                              <Image key={s} src="/assets/reviews/star.svg" alt="" width={12} height={12} aria-hidden className="size-3" />
                            ))}
                            <Image src="/assets/reviews/star-half.svg" alt="" width={12} height={12} aria-hidden className="size-3" />
                          </span>
                          <span className="font-inter text-[13px] font-medium leading-none tracking-[-0.5px] text-white lg:text-[10px]">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* time chip */}
                  <div className="absolute left-4 top-4 flex items-center justify-center rounded-[54.247px] bg-white px-[6.51px] py-[2.17px] lg:rounded-full lg:px-2.5 lg:py-1">
                    <span className="font-sans text-[13.019px] font-semibold leading-normal text-black lg:text-[14px] lg:font-bold">02:32</span>
                  </div>

                  {/* play button */}
                  <button
                    type="button"
                    aria-label="Play customer story"
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
              ))}
              <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "20px" }} />
            </div>
          </div>

          {/* Right edge fade gradient (Figma 3321:13208) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-[5] hidden w-[180px] bg-gradient-to-l from-white to-transparent lg:block xl:w-[210px]"
          />
        </div>
      </div>
    </section>
  );
}
