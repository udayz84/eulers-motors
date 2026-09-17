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
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 px-5 pb-3 pt-2 lg:flex-row lg:gap-5 lg:px-0 lg:pt-0 lg:pb-[19px]">
        {/* Enterprise card — 800×510 on #041231 (Figma 1:1909) */}
        <div className="relative h-[419px] w-full overflow-clip rounded-lg bg-deep lg:h-[510px] lg:w-[800px] lg:rounded-2xl">
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
          {/* mobile concentric rings */}
          <div aria-hidden className="absolute -right-16 -top-10 size-[380px] rounded-full border border-white/25 opacity-25 lg:hidden" />
          <div aria-hidden className="absolute -right-6 top-0 size-[290px] rounded-full border border-white/30 opacity-25 lg:hidden" />

          {/* content — (36, 43.27) 727×408, justify-between (Figma 1:1916) */}
          <div className="flex flex-col justify-center gap-[26px] p-6 lg:absolute lg:left-[36px] lg:top-[43.27px] lg:h-[408px] lg:w-[727px] lg:justify-between lg:gap-0 lg:p-0">
            <div className="flex flex-col gap-4 lg:gap-5">
              <Eyebrow label="Enterprise" dark />
              <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-1.04px] text-white lg:text-[52px]">
                Need 50+ trucks?
              </h2>
              <p className="max-w-[260px] text-[12px] leading-snug text-white lg:max-w-[359px] lg:text-[16px] lg:leading-normal">
                We check your routes on your own data first. Then connect with you.
              </p>
            </div>

            {/* desktop: button + bullets, gap 24 (Figma 1:1924) */}
            <div className="hidden lg:flex lg:flex-col lg:gap-6">
              <Button variant="white" arrow="ink" className="text-ink">
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

        {/* Dealer card — 460×510 on the light blue gradient (Figma 1:1951) */}
        <div
          className="relative h-[430px] w-full overflow-clip rounded-lg lg:h-[510px] lg:w-[460px] lg:rounded-2xl"
          style={{
            backgroundImage:
              "linear-gradient(175.65deg, rgba(194,211,241,0.8) 21.28%, rgba(91,148,214,0.8) 151.97%)",
          }}
        >
          {/* mobile photo */}
          <Image
            src="/assets/enterprise/dealer-photo.png"
            alt="Euler dealership"
            width={467}
            height={467}
            className="absolute bottom-0 left-1/2 w-[88%] -translate-x-1/2 object-cover lg:hidden"
          />
          {/* desktop photo — window 467×373 at (19.5, 200.27), img h 125.24% (Figma 1:1952) */}
          <div aria-hidden className="absolute left-[19.5px] top-[200.27px] hidden h-[373px] w-[467px] overflow-hidden lg:block">
            <Image
              src="/assets/enterprise/dealer-photo.png"
              alt="Euler dealership"
              width={467}
              height={467}
              className="absolute left-0 top-0 h-[125.24%] w-full object-cover"
            />
          </div>

          {/* content — (24, 40.27) w-412, gap 20 (Figma 1:1953) */}
          <div className="absolute inset-x-5 top-10 flex flex-col gap-5 lg:inset-x-auto lg:left-[24px] lg:top-[40.27px] lg:w-[412px]">
            <Eyebrow label="38 cities open" />
            <div className="flex flex-col gap-2.5">
              <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink">
                Want to become a dealer?
              </h2>
              <p className="max-w-[248px] text-[12px] leading-snug text-ink lg:max-w-none lg:text-[16px] lg:leading-normal">
                Your area, with clear numbers. We manage showroom setup and training.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-11 flex-1 items-center justify-center rounded-[4px] border border-white/50 bg-surface/50 px-5 font-display text-[12px] font-semibold leading-none text-ink backdrop-blur-[10px] lg:h-[42px] lg:text-[14px]">
                Download details
              </span>
              <span className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-solid border-white bg-ink px-5 font-display text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:text-[14px]">
                Apply now
                <Image src="/assets/enterprise/btn-arrow2.svg" alt="" width={22} height={14} aria-hidden className="h-3.5 w-[18.9px]" />
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
