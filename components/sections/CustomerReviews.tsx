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
 */
export default function CustomerReviews() {
  return (
    <section className="bg-white overflow-hidden" aria-label="Customer reviews">
      {/* Figma 1:1669 root — width 1440 · padding 62px 60px · flex-col ·
          items-center · justify-center · gap 42px. The 42px gap and 62px bottom
          padding live on the cards wrapper below (the cards row spans the full
          viewport for the bleed carousel). Heading row (1:1670) is w-1280,
          centered in the 1320px content box → text starts at x=80 on desktop.
          Heading stack gap 16px (lg:gap-4). Mobile (1:4828) keeps px-5 ·
          pt-10 · pb-24. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pb-[24px] pt-10 lg:justify-center lg:px-[60px] lg:pb-[42px] lg:pt-[62px]">
        <div className="flex w-full max-w-[1280px] flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:text-left">
          <Eyebrow label="Customers" />
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
            Customer reviews
          </h2>
          <p className="text-[12px] text-ink lg:text-[16px] lg:leading-normal">
            Watch real customers share their experience with Euler Motors.
          </p>
        </div>
      </div>

      {/* cards — mobile snap scroller; desktop row per Figma 1:1678:
          h-485.645, gap-24, bleeding off the right edge (carousel).
          First card starts at the Figma row's left edge: x=80 on a 1440
          viewport (60px padding + 20px centering offset of the w-1280 row
          inside the 1320px content box), staying aligned under the heading
          at every width
          (the offset lives on a wrapper: padding on the snap scroller itself gets
          consumed as initial scroll by the browser) */}
      <div className="w-full pb-[42px] lg:pb-[62px]">
        <div className="snap-row snap-center-mobile gap-[13px] lg:gap-6">
          {/* Spacers for alignment — they mirror the header row's left edge so
              the first card starts under the heading. Desktop: centered
              container offset (≥1440) + the 1280 row's centering offset
              (≥1400) + 60px padding − the row's 24px gap (spacers are flex
              children, the gap follows them). Mobile (Figma 1:4836): 20px
              gutter minus the 13px gap */}
          <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 13px)" }} />
          <div
            aria-hidden
            className="desktop-spacer hidden shrink-0 lg:block"
            style={{
              width:
                "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 36px)",
            }}
          />
        {STORY_IMAGES.map((story, i) => (
            <article
              key={i}
              className="relative aspect-[300/400] h-[400px] w-[300px] overflow-clip rounded-[14.6px] lg:h-[485.645px] lg:w-auto lg:rounded-[20.442px]"
            >
              <Image src={story.base} alt="Customer story" fill sizes="400px" className="object-cover" />
              {story.overlay && (
                <Image src={story.overlay} alt="" fill sizes="400px" className="object-cover" />
              )}
              {/* graded frost — Figma 1:1680 only (bottom): a 604×316 rect of
                  tint@20% + backdrop-blur 20.442px, Gaussian-smeared by a
                  130.511px layer blur centered on the card's bottom edge. No
                  direct CSS equivalent (filter on an ancestor kills
                  backdrop-filter), so one layer with the Figma blur+tint is
                  masked by a gradient approximating the σ=130.5 falloff —
                  mask fades tint and blur together, like the layer blur. Tint
                  is white (designer request; Figma uses black). Height 80% ≈
                  the 2.5σ visible range on the 485.645px card. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-white/20 backdrop-blur-[20.442px] [mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,0.88)_17%,rgba(0,0,0,0.61)_33%,rgba(0,0,0,0.32)_50%,rgba(0,0,0,0.14)_67%,transparent_83%)]"
              />

              {/* quote + author — Figma 1:1679 bottom panel (Frame 1984080840
                  at y=324): savings chip → 16px gap → quote → author */}
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-[16.6px] lg:inset-x-4 lg:bottom-4">
                {/* savings chip — first element of the bottom panel, above the quote */}
                <div className="flex h-[25.5px] w-fit items-center gap-[6.5px] rounded-[20.442px] border border-chip-green bg-chip-green/25 py-[7.7px] pl-[6.5px] pr-[15.3px] backdrop-blur-[12.8px] lg:h-[25.553px]">
                  <Image src="/assets/reviews/icon-chat.svg" alt="" width={14} height={9} aria-hidden className="h-[8.688px] w-[13.799px] -scale-y-100" />
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
              <div className="absolute left-4 top-4 flex items-center justify-center rounded-full bg-white px-[6px] py-[2px] lg:px-2.5 lg:py-1">
                <span className="text-[12px] font-bold leading-normal text-black lg:text-[14px]">02:32</span>
              </div>

              {/* play button — user's Figma export of node 1:1705 (52×52 PNG) */}
              <button type="button" aria-label="Play customer story" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
          {/* Spacers for right bleed padding — same widths as the left ones,
              keeping scroll-end padding symmetric with the start gutter */}
          <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 13px)" }} />
          <div
            aria-hidden
            className="desktop-spacer hidden shrink-0 lg:block"
            style={{
              width:
                "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 36px)",
            }}
          />
          </div>
        </div>
    </section>
  );
}
