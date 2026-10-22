import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import FloatingWidget from "@/components/FloatingWidget";
import PagerBar from "@/components/ui/PagerBar";

const A = "/assets/technology-page";

/**
 * TECHNOLOGY page — hero (Figma 2968:6673) + philosophy (2977:7348),
 * composed inside frame 2977:7419 (393×1315).
 */
export default function TechHero({ showPhilosophy = true }: { showPhilosophy?: boolean }) {
  return (
    <section className="relative overflow-clip bg-[#041231]" aria-label="Technology">
      <div className="relative mx-auto w-full max-w-[393px] lg:hidden">
        {/* hero — 393×762 */}
        <div className="relative h-[762px] w-full">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img src={`${A}/hero__imgEulerUiMobile.png`} alt="" className="absolute inset-0 size-full max-w-none object-bottom" />
            <div className="absolute inset-0 overflow-hidden">
              <img src={`${A}/hero__imgEulerUiMobile1.png`} alt="" className="absolute left-[-2.05%] top-[-3.59%] h-[103.55%] w-[104.1%] max-w-none" />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <img src={`${A}/hero__imgEulerUiMobile2.png`} alt="" className="absolute left-[-17.9%] top-[-9.1%] h-[109.05%] w-[135.8%] max-w-none" />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(4,18,49,0) 60.466%, rgb(4,18,49) 90.795%), linear-gradient(191.077deg, rgba(0,0,0,0) 56.444%, rgba(0,0,0,0.8) 99.952%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)",
              }}
            />
          </div>

          <div className="absolute bottom-[28.93px] left-1/2 flex w-[353px] -translate-x-1/2 flex-col items-start justify-center gap-3">
            <Eyebrow label="Technology" dark />
            <h1 className="w-[289px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white">
              Built Smarter.
              <br />
              Built for Business.
            </h1>
            <p className="w-[316px] font-sans text-[12px] font-normal leading-normal text-white">
              Every innovation is designed for everyday business.
            </p>
            <Button variant="white" arrow="white" href="/products" className="w-full">
              Book a test drive
            </Button>
          </div>

          {/* uptime ribbon — straddles the hero/philosophy seam */}
          <div className="absolute left-5 top-[746.74px] z-20 w-[353px] rounded-[8px] bg-gradient-to-b from-white/45 via-white/12 to-white/5 p-px">
            <div className="relative flex w-full flex-col gap-[10px] overflow-clip rounded-[7px] bg-[rgba(255,255,255,0.04)] px-[11px] pb-[13px] pt-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-[4px]">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-white opacity-[0.12]" />
              <div className="absolute bottom-0 left-0 h-1 w-1/2 bg-white" />
              <div className="flex items-center justify-center gap-[10px] text-white">
                <p className="shrink-0 font-display font-semibold leading-[1.15] tracking-[-0.84px]">
                  <span className="text-[36px]">96.4</span>
                  <span className="text-[24px]">%</span>
                </p>
                <p className="min-w-px flex-1 font-display leading-[1.15] tracking-[-0.28px] text-[14px]">
                  Fleet uptime last year, across 15,000 vehicles
                </p>
              </div>
            </div>
          </div>

          {/* quick-action rail — scoped to the hero (Figma places it in the hero frame);
              on mobile it sits low on the right, level with the heading/subheading */}
          <FloatingWidget mobileClassName="bottom-[80px]" />
        </div>

        {showPhilosophy && (
        /* philosophy — 393×553 */
        <div className="relative z-10 flex h-[553px] flex-col items-center justify-center gap-[42px] overflow-clip bg-[#041231] px-5 pb-[52px] pt-[117px]">
          <div className="flex w-full flex-col items-start gap-[14px]">
            <Eyebrow label="Philosophy" dark />
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
              Technology That Helps You Earn More
            </h2>
            <p className="w-full font-sans text-[12px] font-normal leading-normal text-white">
              A commercial vehicle is part of your business. That&apos;s why every technology we
              build is designed to reduce costs.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-5">
            <div className="relative -mx-5 w-[calc(100%+40px)]">
              <div
                id="philosophy-scroll-row"
                className="snap-row snap-center-mobile gap-[10px]"
              >
                <div aria-hidden="true" className="shrink-0" style={{ width: "calc(20px - 10px)" }} />
                {PHILOSOPHY.map((c) => (
                  <article
                    key={c.title}
                    data-carousel-card
                    className="flex w-[282px] shrink-0 snap-start flex-col items-start justify-center gap-5 rounded-[12px] bg-[rgba(255,255,255,0.08)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.45),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.25)]"
                  >
                  <div className="relative h-[62px] w-[64.333px] shrink-0">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <img src={`${A}/philosophy-icons-exact.png`} alt="" className="absolute max-w-none" style={c.crop} />
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start gap-2 leading-normal text-white">
                    <p className="w-full text-[16px] font-bold">{c.title}</p>
                    <p className="w-full text-[12px]">{c.desc}</p>
                  </div>
                  </article>
                ))}
              </div>
            </div>

            <PagerBar rowId="philosophy-scroll-row" />
          </div>
        </div>
        )}
      </div>

      <div className="relative hidden h-[800px] w-full overflow-clip lg:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <img src={`${A}/hero__imgRectangle42158.png`} alt="" className="absolute left-[0.05%] top-[-36.82%] h-[181.34%] w-[99.94%] max-w-none" />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(4,18,49,0) 60.47%, #041231 90.8%), linear-gradient(186deg, rgba(0,0,0,0) 56.44%, rgba(0,0,0,0.8) 99.95%), linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(182deg, rgba(0,0,0,0) 56.69%, rgba(0,0,0,0.8) 93.41%)",
            }}
          />
        </div>

        <div className="absolute left-1/2 top-[537px] flex w-[1280px] -translate-x-1/2 items-end justify-between">
          <div className="flex w-[450px] flex-col items-start justify-center gap-5 text-white">
            <Eyebrow label="Technology" dark />
            <h1 className="w-[788.543px] font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px]">
              Built Smarter.<br />Built for Business.
            </h1>
            <p className="w-[604.962px] font-sans text-[16px] leading-normal">
              Every innovation is designed for everyday business.
            </p>
          </div>

          <div className="flex w-[386px] flex-col items-start gap-5">
            <div className="relative w-full overflow-clip rounded-lg bg-white/[0.04] p-6">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-white opacity-[0.12]" />
              <div className="absolute bottom-0 left-0 h-1 w-[178px] bg-white" />
              <div className="flex w-full items-center gap-4 text-white">
                <p className="shrink-0 whitespace-nowrap font-display font-semibold leading-[1.15] tracking-[-0.84px]">
                  <span className="text-[42px]">96.4</span><span className="text-[26px]">%</span>
                </p>
                <p className="min-w-0 flex-1 font-display text-[16px] leading-[1.4] tracking-[-0.32px]">
                  Fleet uptime last year, across 15,000 vehicles
                </p>
              </div>
            </div>
            <Button variant="white" arrow="navy" href="/products" className="w-full">
              Book a test drive
            </Button>
          </div>
        </div>

        <FloatingWidget />
      </div>

      {showPhilosophy && (
      <div
        className="relative mx-auto hidden w-full max-w-[1440px] flex-col items-center justify-center gap-[42px] px-20 pb-[62px] pt-6 lg:flex"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #041231 43.98%, #05173F 63.46%, #0C3797 100%), linear-gradient(0deg, #041231 0%, #041231 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%), #E9EDF3",
        }}
      >
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-[900px] flex-col items-center gap-4">
            <Eyebrow label="Philosophy" dark />
            <h2 className="whitespace-nowrap text-center font-display text-[42px] font-semibold leading-[normal] tracking-[-0.84px] text-white">
              Technology That Helps You Earn More
            </h2>
          </div>
          <p className="w-[493.137px] text-center font-sans text-[16px] leading-normal text-white">
            A commercial vehicle is part of your business. That&apos;s why every technology we build is designed to reduce costs.
          </p>
        </div>

        <div className="relative w-full">
          <div className="snap-row snap-center-mobile w-full items-center gap-[10px]">
            {PHILOSOPHY.map((card) => (
              <article key={card.title} className="flex h-[228px] w-[420px] min-w-0 flex-[1_0_0] flex-col items-start justify-center gap-8 rounded-[12px] bg-[rgba(255,255,255,0.08)] p-8">
                <div className="relative h-[72px] w-[74.709px] shrink-0 overflow-hidden">
                  <img src={`${A}/philosophy-icons-exact.png`} alt="" className="absolute max-w-none" style={card.crop} />
                </div>
                <div className="flex w-full flex-col items-start gap-2 text-white">
                  <h3 className="w-full font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.78px]">{card.title}</h3>
                  <p className="w-full font-sans text-[16px] leading-normal">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[120px] bg-gradient-to-l from-[#05173f]/85 via-[#05173f]/35 to-transparent blur-[0.5px]"
          />
        </div>
      </div>
      )}
    </section>
  );
}

const PHILOSOPHY = [
  {
    title: "Lower Running Cost",
    desc: "Spend less on every kilometre you drive.",
    crop: { height: "149.02%", left: "-9.53%", top: "-16.08%", width: "342.77%" },
  },
  {
    title: "Less Downtime",
    desc: "Built for reliable everyday performance.",
    crop: { height: "157.37%", left: "-130.98%", top: "-20.61%", width: "361.96%" },
  },
  {
    title: "Easy to Service",
    desc: "Quick repairs and readily available support.",
    crop: { height: "149.02%", left: "-232.17%", top: "-16.08%", width: "342.77%" },
  },
];
