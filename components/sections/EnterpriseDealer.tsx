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
 * Desktop: 800px dark card + 460px light card side by side. Mobile: stacked.
 */
export default function EnterpriseDealer() {
  return (
    <section className="bg-white" aria-label="Enterprise and dealership">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 px-5 pb-3 pt-2 lg:flex-row lg:gap-5 lg:px-0 lg:pb-5">
        {/* Enterprise card */}
        <div className="relative h-[419px] w-full overflow-clip rounded-lg bg-deep lg:h-[510px] lg:w-[800px] lg:rounded-2xl">
          <Image
            src="/assets/enterprise/ellipse.svg"
            alt=""
            width={604}
            height={928}
            aria-hidden
            className="pointer-events-none absolute -right-[299px] -top-[395px] hidden w-[604px] -scale-y-90 rotate-[61.22deg] skew-x-[23.46deg] lg:block"
          />
          <Image
            src="/assets/enterprise/ellipse2.svg"
            aria-hidden
            alt=""
            width={228}
            height={366}
            className="pointer-events-none absolute -right-[136px] -top-[133px] hidden w-[228px] -scale-y-90 rotate-[61.22deg] skew-x-[23.46deg] lg:block"
          />
          {/* mobile concentric rings */}
          <div aria-hidden className="absolute -right-16 -top-10 size-[380px] rounded-full border border-white/25 opacity-25 lg:hidden" />
          <div aria-hidden className="absolute -right-6 top-0 size-[290px] rounded-full border border-white/30 opacity-25 lg:hidden" />
          {/* desktop concentric rings (Figma ellipses 62/64/65/66) */}
          <div aria-hidden className="pointer-events-none absolute right-[60px] top-[110px] hidden size-[203px] rounded-full border-[0.98px] border-white/80 lg:block" />
          <div aria-hidden className="pointer-events-none absolute right-0 top-[50px] hidden size-[322px] rounded-full border-[1.55px] border-white/60 lg:block" />
          <div aria-hidden className="pointer-events-none absolute -right-[90px] top-[-10px] hidden size-[463px] rounded-full border-[2.24px] border-white/40 lg:block" />
          <div aria-hidden className="pointer-events-none absolute -right-[190px] top-[-80px] hidden size-[599px] rounded-full border-[2.89px] border-white/20 lg:block" />

          <div className="relative flex h-full flex-col justify-center gap-[26px] p-6 lg:w-[466px] lg:gap-0 lg:pl-10 lg:pr-0">
            <div className="flex flex-col gap-4 lg:justify-between lg:gap-[24px]">
              <Eyebrow label="Enterprise" dark />
              <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-1.04px] text-white lg:text-[52px]">
                Need 50+ trucks?
              </h2>
              <p className="max-w-[260px] text-[12px] leading-snug text-white lg:max-w-[359px] lg:text-[16px] lg:leading-normal">
                We check your routes on your own data first. Then connect with you.
              </p>
            </div>

            <div className="hidden lg:mt-6 lg:block">
              <Button variant="white" arrow="ink" className="text-ink">
                Talk to our team
              </Button>
            </div>

            <ul className="hidden flex-col gap-4 lg:mt-[24px] lg:flex lg:gap-4">
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
            </ul>

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

        {/* Dealer card */}
        <div
          className="relative h-[430px] w-full overflow-clip rounded-lg lg:h-[510px] lg:w-[460px] lg:rounded-2xl"
          style={{
            backgroundImage:
              "linear-gradient(175.65deg, rgba(194,211,241,0.8) 21.28%, rgba(91,148,214,0.8) 151.97%)",
          }}
        >
          <Image
            src="/assets/enterprise/dealer-photo.png"
            alt="Euler dealership"
            width={467}
            height={467}
            className="absolute bottom-0 left-1/2 w-[88%] -translate-x-1/2 object-cover lg:left-[19.5px] lg:h-auto lg:w-[467px] lg:translate-x-0"
          />
          <div className="absolute inset-x-5 top-10 flex flex-col gap-5">
            <Eyebrow label="38 cities open" />
            <div className="flex flex-col gap-2.5 lg:gap-2.5">
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
              <span className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] border border-white/50 bg-ink px-5 font-display text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:text-[14px]">
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
