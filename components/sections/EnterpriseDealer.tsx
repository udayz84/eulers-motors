import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

const BULLETS = [
  "Your route is based on your data.",
  "Guaranteed spare parts at every hub.",
  "Complete setup for charging at the warehouse.",
  "A dedicated account manager for you.",
];

/**
 * Enterprise + Dealer cards (desktop 1:1908 · mobile 1:4965).
 * Desktop: 800px dark card + 460px light card, gap 20, pb 19 (no top pad).
 */
export default function EnterpriseDealer() {
  return (
    <section className="bg-white" aria-label="Enterprise and dealership">
      {/* container matches PromoCard's shared spacing pattern exactly: 20px
          sides in a max-w-[1440px] frame, 30px sides inside the widened
          1600px container on desktop. Figma 1:1908 ratio 800 + 20 gap + 460
          via flex-[800]/flex-[460] so both cards grow with the page grid */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-5 pb-3 pt-2 lg:max-w-[1600px] lg:flex-row lg:gap-5 lg:px-[30px] lg:pt-0 lg:pb-[19px]">
        {/* Enterprise card — 800×510 on #041231 (Figma 1:1909) */}
        <div className="relative h-[419px] w-full overflow-clip rounded-lg bg-deep lg:h-[510px] lg:w-auto lg:flex-[800] lg:rounded-2xl">
          {/* Ellipse 3427 — container 603.078×927.122 at (468.49, -395.37),
              rotated 61.22° · scale-y .92 · skew-x 23.46° (Figma 1:1910) */}
          <div aria-hidden className="absolute left-[468.49px] top-[-395.37px] hidden h-[927.122px] w-[603.078px] items-center justify-center lg:flex">
            <div className="flex-none rotate-[61.22deg] scale-y-92 skew-x-[23.46deg]">
              <div className="relative h-[526.727px] w-[582.672px]">
                <div className="absolute inset-[-40.25%_-36.38%]">
                  <Image src="/assets/enterprise/ellipse.svg" alt="" fill sizes="1007px" className="pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          {/* concentric rings svg — 840.105² at (524, -294.6), svg inset -2.18% (Figma 1:1911) */}
          <div aria-hidden className="absolute left-[524px] top-[-294.6px] hidden h-[840.105px] w-[840.105px] lg:block">
            <div className="absolute inset-[-2.18%]">
              <Image src="/assets/enterprise/glow.svg" alt="" fill sizes="877px" className="pointer-events-none" />
            </div>
          </div>
          {/* Ellipse 3426 — container 227.546×365.607 at (649.23, -133.41) (Figma 1:1950) */}
          <div aria-hidden className="absolute left-[649.23px] top-[-133.41px] hidden h-[365.607px] w-[227.546px] items-center justify-center lg:flex">
            <div className="flex-none rotate-[61.22deg] scale-y-92 skew-x-[23.46deg]">
              <div className="relative h-[149.962px] w-[281.871px]">
                <div className="absolute inset-[-141.37%_-75.21%]">
                  <Image src="/assets/enterprise/ellipse2.svg" alt="" fill sizes="796px" className="pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          {/* mobile glow — measured pixel-by-pixel from the Figma render of
              1:4966: the blurred #1D6FFF Ellipse 3427 reads as an elliptical
              wash entering from the top-right, peak α .95 at the corner fading
              to nothing ~250px left / ~350px down (the node's own coordinates
              keep the blob off-canvas, so the gradient reproduces its rendered
              result directly) */}
          <div
            aria-hidden
            className="absolute inset-0 lg:hidden"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 250px 350px at 370px 30px, rgba(29,111,255,0.95) 0%, rgba(29,111,255,0.84) 20%, rgba(29,111,255,0.66) 40%, rgba(29,111,255,0.45) 55%, rgba(29,111,255,0.28) 70%, rgba(29,111,255,0.13) 85%, rgba(29,111,255,0) 100%)",
            }}
          />
          {/* mobile concentric ellipses (Figma 1:4967-71) — four hairline ring
              svgs (203.1 / 321.7 / 463.3 / 599.1) entering the card from the
              top-right. Single pass at Figma's 6.525px blur: the render
              measures the bands at just +5–9/255 over the wash — subtle
              ripples, not dominant rings */}
          <div
            aria-hidden
            className="absolute left-[126.95px] right-[-353.05px] top-[calc(50%_-_239.07px)] h-[599.105px] -translate-y-1/2 blur-[6.525px] lg:hidden"
          >
            <div className="absolute left-0 top-0 size-[599.105px]">
              <Image src="/assets/enterprise/ellipse-66.svg" alt="" fill sizes="599px" className="pointer-events-none" />
            </div>
            <div className="absolute left-[67.92px] top-[67.92px] size-[463.273px]">
              <Image src="/assets/enterprise/ellipse-65.svg" alt="" fill sizes="463px" className="pointer-events-none" />
            </div>
            <div className="absolute left-[138.7px] top-[138.7px] size-[321.717px]">
              <Image src="/assets/enterprise/ellipse-64.svg" alt="" fill sizes="322px" className="pointer-events-none" />
            </div>
            <div className="absolute left-[198px] top-[198px] size-[203.104px]">
              <Image src="/assets/enterprise/ellipse-62.svg" alt="" fill sizes="203px" className="pointer-events-none" />
            </div>
          </div>

          {/* content — (36, 43.27) 727×408, justify-between (Figma 1:1916) */}
          <div className="flex flex-col justify-center gap-[26px] p-6 lg:absolute lg:left-[36px] lg:top-[43.27px] lg:h-[408px] lg:w-[727px] lg:justify-between lg:gap-0 lg:p-0">
            <div className="flex flex-col gap-4 lg:gap-5">
              <Eyebrow label="Enterprise" dark />
              <h2 className="font-display text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-white lg:leading-[1.15] lg:tracking-[-1.04px] lg:text-[52px]">
                Need 50+ trucks?
              </h2>
              <p className="max-w-[260px] text-[12px] leading-snug text-white lg:max-w-[359px] lg:text-[16px] lg:leading-normal">
                We check your routes on your own data first. Then connect with you.
              </p>
            </div>

            {/* desktop: button + bullets, gap 24 (Figma 1:1924) — self-start
                keeps the button at its intrinsic ~208px width (1:1926) instead
                of stretching to the 727px column */}
            <div className="hidden lg:flex lg:flex-col lg:gap-6">
              <Button variant="white" arrow="ink" className="self-start text-ink">
                Talk to our team
              </Button>
              <div className="flex gap-[26px]">
                <div className="flex flex-col gap-4">
                  {BULLETS.slice(0, 2).map((b) => (
                    <Bullet key={b} text={b} />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {BULLETS.slice(2).map((b) => (
                    <Bullet key={b} text={b} />
                  ))}
                </div>
              </div>
            </div>

            {/* mobile bullets + CTA inline */}
            <ul className="flex flex-col gap-1.5 lg:hidden">
              {BULLETS.map((b) => (
                <li key={b}>
                  <Bullet text={b} />
                </li>
              ))}
            </ul>
            <div className="lg:hidden">
              <Button variant="white" arrow="ink" className="w-full text-ink">
                Talk to our team
              </Button>
            </div>
          </div>
        </div>

        {/* Dealer card — desktop 460×510 (Figma 1:1951) · mobile 353×430 (Figma 1:5005) */}
        <div className="relative h-[430px] w-full overflow-clip rounded-lg bg-[linear-gradient(175.22deg,rgba(194,211,241,0.8)_21.28%,rgba(91,148,214,0.8)_151.97%)] lg:h-[510px] lg:w-auto lg:flex-[460] lg:rounded-2xl lg:bg-[linear-gradient(175.65deg,rgba(194,211,241,0.8)_21.28%,rgba(91,148,214,0.8)_151.97%)]">
          {/* mobile photo — window 312×249 at (50, 221.67), img h 125.24% (Figma 1:5006) */}
          <div className="absolute left-[50px] top-[221.67px] h-[249px] w-[312px] overflow-hidden lg:hidden">
            <Image
              src="/assets/enterprise/dealer-photo.png"
              alt="Euler dealership"
              width={467}
              height={467}
              className="absolute left-0 top-0 h-[125.24%] w-full object-cover"
            />
          </div>
          {/* desktop photo — Figma 1:1952 window 467×373 at (19.5, 200.27) of the
              460px card, as % (4.24% / 101.52%) so it scales with the wider card */}
          <div aria-hidden className="absolute left-[4.24%] top-[200.27px] hidden h-[373px] w-[101.52%] overflow-hidden lg:block">
            <Image
              src="/assets/enterprise/dealer-photo.png"
              alt="Euler dealership"
              width={467}
              height={467}
              className="absolute left-0 top-0 h-[125.24%] w-full object-cover"
            />
          </div>

          {/* content — mobile (20, 19.67) w-313, gaps 12/16/12 (Figma 1:5007) ·
              desktop (24, 40.27) capped at the 412px Figma width (1:1953) and
              inset 24px both sides so it shrinks, not clips, on narrow cards */}
          <div className="absolute inset-x-5 top-[19.67px] flex flex-col lg:inset-x-[24px] lg:top-[40.27px] lg:max-w-[412px]">
            <Eyebrow label="38 cities open" />
            {/* mobile width breaks the heading after "become" (line 1 measures
                256.9px · "Want to become a" would need 286px, so 264 lands
                between them) — Figma 1:5007 two-line wrap */}
            <h2 className="mt-3 w-[264px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink lg:w-full">
              Want to become a dealer?
            </h2>
            <p className="mt-4 w-[248px] text-[12px] leading-4 text-ink lg:mt-2.5 lg:w-full lg:text-[16px] lg:leading-[21.33px]">
              Your area, with clear numbers.<br />
              We manage showroom setup and training.
            </p>
            <div className="mt-3 flex gap-3 lg:mt-5">
              <span className="flex h-11 flex-1 items-center justify-center rounded-[4px] border border-ink/50 bg-surface px-5 font-display text-[12px] font-semibold leading-none text-ink lg:h-[42px] lg:border-white/50 lg:bg-surface/50 lg:px-6 lg:text-[14px] lg:backdrop-blur-[10px]">
                Download details
              </span>
              <span className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] bg-ink px-5 font-display text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:border-[0.5px] lg:border-solid lg:border-white lg:px-6 lg:text-[14px]">
                Apply now
                <Image src="/assets/enterprise/btn-arrow2.svg" alt="" width={22} height={14} aria-hidden className="h-3 w-[18.857px] lg:h-3.5 lg:w-[22px]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <Image src="/assets/enterprise/icon-check.svg" alt="" width={20} height={20} aria-hidden className="size-5 shrink-0" />
      <span className="whitespace-nowrap font-display text-[12px] font-medium leading-[1.15] tracking-[-0.32px] text-[#f3f4f5] lg:text-[16px] lg:font-bold">
        {text}
      </span>
    </span>
  );
}
