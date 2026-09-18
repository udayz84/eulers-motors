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
    <section className="bg-white" aria-label="Customer reviews">
      {/* Figma 1:1669 anchors at x=80 — moved to 40px (lg:pl-10) to match the
          widened 1360px page grid; the heading stays anchored to the cards' left
          edge at every desktop width; the row bleeds off the right edge (carousel) */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[24px] px-5 pb-[18px] pt-10 lg:gap-[42px] lg:px-0 lg:pb-[62px] lg:pt-[62px]">
        <div className="flex w-full flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:pl-10 lg:text-left">
          <Eyebrow label="Customers" />
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
            Customer reviews
          </h2>
          <p className="text-[12px] text-ink lg:text-[16px] lg:leading-normal">
            Watch real customers share their experience with Euler Motors.
          </p>
        </div>

        {/* cards — mobile snap scroller; desktop row anchored at x=80, bleeding right
            (the offset lives on a wrapper: padding on the snap scroller itself gets
            consumed as initial scroll by the browser) */}
        <div className="w-full lg:pl-10">
          <div className="snap-row -mx-5 gap-[13px] px-5 lg:mx-0 lg:gap-6 lg:px-0">
          {STORY_IMAGES.map((story, i) => (
            <article
              key={i}
              className="relative aspect-[300/400] h-[466.7px] w-[350px] overflow-clip rounded-[14.6px] lg:h-[485.645px] lg:w-auto lg:rounded-[20.442px]"
            >
              <Image src={story.base} alt="Customer story" fill sizes="400px" className="object-cover" />
              {story.overlay && (
                <Image src={story.overlay} alt="" fill sizes="400px" className="object-cover" />
              )}
              {/* corner darkening (Figma blurred black rects) */}
              <div aria-hidden className="absolute -bottom-[152px] left-1/2 h-[316px] w-[604px] -translate-x-1/2 bg-black/20 blur-[130px]" />
              <div aria-hidden className="absolute -left-[490px] -top-[209px] h-[316px] w-[604px] bg-black/20 blur-[130px]" />

              {/* savings chip */}
              <div className="absolute left-4 top-[54px] flex h-[25.5px] items-center gap-[6.5px] rounded-[20.442px] border border-chip-green bg-chip-green/25 py-[7.7px] pl-[6.5px] pr-[15.3px] backdrop-blur-[12.8px] lg:top-[62px] lg:h-[25.553px]">
                <Image src="/assets/reviews/icon-chat.svg" alt="" width={15} height={15} aria-hidden className="h-[15.332px] w-[15.332px]" />
                <span className="whitespace-nowrap text-[12.776px] font-bold leading-[1.15] tracking-[-0.2555px] text-white">
                  ₹41,000 saved a month
                </span>
              </div>

              {/* quote + author */}
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-[16.6px] lg:inset-x-4 lg:bottom-4">
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
                        <span className="block h-3 w-1.5 overflow-hidden">
                          <Image src="/assets/reviews/star-half.svg" alt="" width={12} height={12} aria-hidden className="size-3" />
                        </span>
                      </span>
                      <span className="text-[13px] font-semibold leading-none tracking-[-0.5px] text-white lg:text-[10px]">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* time chip */}
              <div className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1">
                <span className="text-[13px] font-semibold leading-none text-black lg:text-[14px]">02:32</span>
              </div>

              {/* play button */}
              <button type="button" aria-label="Play customer story" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/assets/reviews/play.svg"
                  alt=""
                  width={52}
                  height={52}
                  className="size-[37px] lg:size-[52px]"
                />
              </button>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
