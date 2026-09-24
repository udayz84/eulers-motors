import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

const POSTS = [
  { imgs: ["/assets/social/post-c.png"], user: "variant-a" },
  { imgs: ["/assets/social/post-d.png"], user: "variant-a" },
  { imgs: ["/assets/social/post-e.png"], user: "variant-a" },
  { imgs: ["/assets/social/post-b.jpg"], user: "variant-a" },
  { imgs: ["/assets/social/post-a.jpg"], user: "variant-b" },
] as const;

/**
 * "See the trucks in action." (desktop 1:2008 · mobile 1:5058).
 * Instagram-style post cards with author chip, stats and CTA.
 */
export default function SocialWall() {
  return (
    <section className="bg-white overflow-hidden" aria-label="From the road">
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
        <div className="snap-row snap-center-mobile gap-[12px] lg:gap-[30.663px] min-[2233px]:justify-center">
          {/* Spacers for alignment — the desktop spacer anchors the first card
              at x=80 on the 1440 frame (Figma 1:2008): frame margin + 49.337px
              spacer + 30.663px row gap = margin + 80px. Once the viewport fits
              all 5 cards (≥2233px) it hides and the row centers instead
              (justify-center on the snap-row). Mobile mirrors Customer
              Reviews: 20px gutter (the heading's px-5 content edge) minus the
              row's 12px gap, so the first card starts at exactly 20px */}
          <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 12px)" }} />
          <div aria-hidden className="hidden shrink-0 lg:block min-[2233px]:hidden" style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 49.337px)" }} />
          {POSTS.map((post, i) => {
            const last = i === POSTS.length - 1;
            return (
              <article
                key={i}
                className="relative h-[400px] w-[300px] shrink-0 overflow-clip rounded-2xl lg:h-[519.574px] lg:w-[390px] lg:rounded-[20.442px]"
              >
                <Image src={post.imgs[0]} alt="Euler trucks in action" fill sizes="400px" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                {/* instagram chip */}
                <span className="absolute right-[13.5px] top-[13.5px] flex size-[30.2px] items-center justify-center rounded-[7.6px] border border-white/20 bg-white/20 backdrop-blur-[10px] lg:right-[26px] lg:top-6 lg:size-[41px] lg:rounded-[10.2px]">
                  <Image src="/assets/social/icon-instagram2.svg" alt="" width={23} height={23} aria-hidden className="size-[17px] lg:size-[23px]" />
                </span>

                {/* time chip */}
                <div className="absolute left-4 top-4 flex items-center justify-center rounded-full bg-white px-[6px] py-[2px] lg:px-2.5 lg:py-1">
                  <span className="text-[12px] font-semibold leading-none text-black lg:text-[14px]">{last ? "02:55" : "02:32"}</span>
                </div>

                {/* play button */}
                <button type="button" aria-label="Play video" className="absolute left-1/2 top-[calc(50%-20px)] -translate-x-1/2">
                  <Image
                    src="/assets/reviews/play-figma.png"
                    alt=""
                    width={52}
                    height={52}
                    className="size-[42px] lg:size-[70.27px]"
                  />
                </button>

                {/* post info panel */}
                {/* post info panel */}
                <div className="absolute inset-x-[13.5px] bottom-3 rounded-[8px] bg-[rgba(255,255,255,0.2)] p-[8px] backdrop-blur-[12px] lg:inset-x-4 lg:bottom-4 lg:rounded-[18px] lg:border lg:border-white/20 lg:p-4 lg:bg-white/20">
                  {last ? (
                    <div className="flex flex-col gap-[6px] lg:gap-[16.6px]">
                      <div className="flex items-center gap-[5.5px] lg:gap-[8.9px]">
                        <Image src="/assets/social/avatar.png" alt="" width={20} height={20} className="size-[18px] rounded-[37px] lg:size-[20.4px] lg:rounded-full" />
                        <span className="text-[12px] text-white lg:text-[15.3px]">Arjun Nair</span>
                      </div>
                      <div className="flex items-center gap-[7.9px] lg:gap-[12.8px]">
                        <span className="text-[12px] font-bold text-white lg:text-[12.8px]">2,412 likes</span>
                        <span aria-hidden className="size-[3.1px] rounded-full bg-white/50 lg:size-[5.1px]" />
                        <span className="text-[12px] font-bold text-white lg:text-[12.8px]">2 days ago</span>
                      </div>
                      <span className="flex h-[28px] w-fit self-start items-center justify-center gap-[7.4px] rounded-[8.6px] bg-ink px-[7.4px] lg:h-[40.9px] lg:gap-[10.2px] lg:rounded-[10.2px] lg:px-[15.3px]">
                        <span className="font-display text-[10px] font-semibold text-white lg:text-[15.3px]">View on Instagram</span>
                        <Image src="/assets/social/post-arrow.svg" alt="" width={20} height={13} aria-hidden className="h-[9.3px] w-[14.5px] lg:h-[12.8px] lg:w-[20px]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[6px] lg:gap-[16.6px]">
                      <div className="flex w-[190px] items-center gap-[5.5px] lg:w-auto lg:gap-[8.9px]">
                        <span className="flex size-[18px] shrink-0 items-center justify-center rounded-[37px] bg-black lg:size-6 lg:rounded-full">
                          <Image src="/assets/social/logo-small.svg" alt="" width={17} height={3} aria-hidden className="h-[1.7px] w-[10.4px] lg:h-[2.8px] lg:w-[16.9px]" />
                        </span>
                        <span className="truncate text-[12px] text-white lg:text-[15.332px]">
                          @eulermotors_retroautomobiles
                        </span>
                      </div>
                      <div className="flex items-center gap-[7.9px] lg:gap-[12.8px]">
                        <span className="text-[12px] font-bold text-white lg:text-[12.8px]">2,412 likes</span>
                        <span aria-hidden className="size-[3.1px] rounded-full bg-white/50 lg:size-[5.1px]" />
                        <span className="text-[12px] font-bold text-white lg:text-[12.8px]">2 days ago</span>
                      </div>
                      <span className="flex h-[28px] w-fit self-start items-center justify-center rounded-[8.6px] border border-white/50 bg-[rgba(243,244,245,0.2)] px-[7.4px] backdrop-blur-[6.16px] lg:h-9 lg:rounded-[14px] lg:border-white/50 lg:bg-surface/20 lg:px-3 lg:backdrop-blur-[10px]">
                        <span className="font-display text-[10px] font-semibold text-white lg:text-[14px]">View on Instagram</span>
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
          {/* Spacers for right bleed padding — same width as the left one,
              keeping scroll-end padding symmetric with the start gutter */}
          <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 12px)" }} />
          <div aria-hidden className="hidden shrink-0 lg:block min-[2233px]:hidden" style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + 49.337px)" }} />
          </div>
        </div>
    </section>
  );
}
