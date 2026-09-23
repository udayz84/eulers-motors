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
                <div aria-hidden className="absolute -bottom-[152px] left-1/2 h-[316px] w-[604px] -translate-x-1/2 bg-black/20 blur-[130.5px]" />
                <div aria-hidden className="absolute -left-[490px] -top-[209px] h-[316px] w-[604px] bg-black/20 blur-[130.5px]" />

                {/* instagram chip */}
                <span className="absolute right-[26px] top-6 flex size-[30.2px] items-center justify-center rounded-[7.6px] bg-white/20 max-lg:size-[41px] max-lg:rounded-[10.2px]">
                  <Image src="/assets/social/icon-instagram2.svg" alt="" width={18} height={18} aria-hidden className="size-[17px] max-lg:size-[23px]" />
                </span>

                {/* time chip */}
                <div className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1">
                  <span className="text-[12px] font-semibold text-black lg:text-[14px]">{last ? "02:55" : "02:32"}</span>
                </div>

                {/* play button */}
                <button type="button" aria-label="Play video" className="absolute left-1/2 top-[calc(50%-20px)] -translate-x-1/2">
                  <Image
                    src="/assets/social/play-button.svg"
                    alt=""
                    width={70}
                    height={70}
                    className="size-[42px] lg:size-[70.27px]"
                  />
                </button>

                {/* post info panel */}
                <div className="absolute inset-x-3 bottom-4 rounded-lg bg-white/20 p-2 backdrop-blur-[10px] border border-white/20 lg:inset-x-4 lg:bottom-4 lg:rounded-[18px] lg:p-4">
                  {last ? (
                    <div className="flex flex-col gap-[16.6px]">
                      <div className="flex items-center gap-[8.9px]">
                        <Image src="/assets/social/avatar.png" alt="" width={20} height={20} className="size-[20.4px] rounded-full" />
                        <span className="text-[12px] text-white">Arjun Nair</span>
                      </div>
                      <div className="flex items-center gap-[12.8px]">
                        <span className="text-[12.776px] font-bold text-white">2,412 likes</span>
                        <span aria-hidden className="size-[5.1px] rounded-full bg-white/50" />
                        <span className="text-[12.776px] font-bold text-white">2 days ago</span>
                      </div>
                      <span className="flex h-[40.9px] items-center justify-center gap-[10.2px] rounded-[10.2px] bg-ink px-[15.3px]">
                        <span className="font-display text-[15.3px] font-semibold text-white">View on Instagram</span>
                        <Image src="/assets/social/post-arrow.svg" alt="" width={20} height={13} aria-hidden className="h-[12.8px] w-[20px]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16.6px]">
                      <div className="flex items-center gap-[8.9px]">
                        <span className="flex size-6 items-center justify-center rounded-full bg-black">
                          <Image src="/assets/social/logo-small.svg" alt="" width={17} height={3} aria-hidden className="h-[2.8px] w-[16.9px]" />
                        </span>
                        <span className="text-[15.3px] text-white lg:text-[15.332px]">@eulermotors_retroautomobiles</span>
                      </div>
                      <div className="flex items-center gap-[12.8px]">
                        <span className="text-[12px] font-bold text-white">2,412 likes</span>
                        <span aria-hidden className="size-[5.1px] rounded-full bg-white/50" />
                        <span className="text-[12px] font-bold text-white">2 days ago</span>
                      </div>
                      <span className="flex h-[28px] items-center justify-center rounded-[8.6px] border border-white/50 bg-surface/20 px-[7.4px] backdrop-blur-[10px] lg:h-9 lg:rounded-[14px] lg:px-3">
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
