import { Fragment } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

const DOS = [
  "Charge conveniently at home or work whenever possible.",
  "Always use verified and compatible charging points.",
  "Plan your charging stops before the battery runs low.",
];

const DONTS = [
  "Avoid using unsuitable sockets or unverified charging setups.",
  "Never wait until the battery is completely empty.",
  "Don't skip planning your route around charging points.",
];

/**
 * TECHNOLOGY page — "Charging / Where Will I Charge?" (Figma 3009:11504, 393px width).
 */
export default function TechCharging() {
  return (
    <section className="bg-white py-6 lg:py-0" aria-label="Charging">
      <div className="relative mx-auto w-full max-w-[393px] overflow-hidden lg:hidden">
        {/* Header container */}
        <div className="flex flex-col items-start gap-[14px] px-5 pt-2">
          <Eyebrow label="Charging" />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink">
            Where Will I Charge?
          </h2>
          <p className="w-full font-sans text-[12px] font-normal leading-normal text-ink">
            Different businesses have different needs. Choose the charging setup that works best for
            your operations.
          </p>
        </div>

        {/* Home / Public segmented control */}
        <div className="mx-auto mt-4 flex h-[48px] w-[213px] translate-y-[8px] items-center justify-center relative">
          {/* Frosted-glass trapezoid plate (Figma 3009:11525) */}
          <div className="pointer-events-none absolute -bottom-5 left-1/2 z-0 h-[60px] w-[253px] -translate-x-1/2 backdrop-blur-[26px]">
            <img
              src={`${A}/charge__imgRectangle42188.svg`}
              alt=""
              className="absolute inset-[0_2.36%] h-full w-auto rotate-180"
            />
          </div>
          <div className="relative z-10 flex h-8 w-[170px] translate-y-[7px] items-center">
            <div className="flex h-full w-[77px] items-center justify-center rounded-full px-3">
              <span className="text-[12px] font-semibold leading-none text-ink">Home</span>
            </div>
            <div
              className="flex h-full flex-1 items-center justify-center rounded-full border-[0.4px] border-white px-3 shadow-sm"
              style={{
                backgroundImage:
                  "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(90deg, #121212 0%, #121212 100%)",
              }}
            >
              <span className="text-[12px] font-semibold leading-none text-white">Public</span>
            </div>
          </div>
        </div>

        {/* How it works card */}
        <div className="relative z-10 mx-auto mt-4 w-[353px] overflow-hidden rounded-[16px] bg-[#f3f4f5] pb-6 pt-0 shadow-sm border border-black/5">
          {/* Top image */}
          <div className="relative h-[190px] w-full overflow-hidden">
            <img
              src={`${A}/charge__imgRectangle1618873364.png`}
              alt="Charging station preview"
              className="absolute left-[14.5%] top-[12%] h-[88%] w-[71%] object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-5 px-3.5">
            {/* "How it works" pill row */}
            <div className="flex w-full items-center justify-between rounded-[8px] bg-white py-1.5 pl-3 pr-1.5 shadow-sm">
              <span className="text-[12px] font-semibold text-ink">How it works</span>
              <div className="flex h-7 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.3)] bg-[#f3f4f5] px-4">
                <span className="font-display text-[11px] font-bold text-ink">
                  Find it on the app
                </span>
              </div>
            </div>

            {/* Do's and Don'ts Lists */}
            <div className="flex w-full flex-col gap-6">
              {/* RECOMMENDED DO'S CARD */}
              <div className="flex w-full flex-col items-start">
                {/* Slanted blue tab */}
                <div className="relative z-10 -mb-px ml-3 flex h-[34px] w-fit items-center justify-center pl-2 pr-6">
                  <svg
                    width="184"
                    height="34"
                    viewBox="0 0 184 48"
                    preserveAspectRatio="none"
                    fill="none"
                    className="absolute inset-0"
                  >
                    <defs>
                      <linearGradient id="dos_grad" x1="0" y1="0" x2="184" y2="48" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0E2F6D" />
                        <stop offset="1" stopColor="#1D6FFF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 12C0 5.37258 5.37258 0 12 0H155.871C160.726 0 165.103 2.92537 166.959 7.41136L183.892 48.3281H0V12Z"
                      fill="url(#dos_grad)"
                    />
                  </svg>
                  <span className="relative z-10 whitespace-nowrap font-sans text-[14px] font-bold uppercase leading-none tracking-[0.7px] text-white">
                    Recommended Do&apos;s
                  </span>
                </div>

                {/* White card */}
                <div className="relative w-full rounded-[14px] rounded-tl-none bg-white p-4 shadow-sm flex flex-col gap-3.5 border border-black/5">
                  {DOS.map((text, idx) => (
                    <Fragment key={text}>
                      {idx > 0 && <div className="h-[1px] w-full bg-[#EAECEF]" />}
                      <div className="flex w-full items-center gap-3">
                        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#EBF2FE]">
                          <svg width="18" height="18" viewBox="0 0 18.17 18.17" fill="none" className="shrink-0">
                            <path
                              d="M13.25 1.86485C12.0243 1.15581 10.6012 0.75 9.08333 0.75C4.48096 0.75 0.75 4.48096 0.75 9.08333C0.75 13.6857 4.48096 17.4167 9.08333 17.4167C13.6857 17.4167 17.4167 13.6857 17.4167 9.08333C17.4167 8.51256 17.3593 7.95518 17.25 7.41667"
                              stroke="#0E2F6D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M5.75 9.5C5.75 9.5 7 9.5 8.66667 12.4167C8.66667 12.4167 13.299 4.77778 17.4167 3.25"
                              stroke="#0E2F6D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="flex-1 font-sans text-[13.5px] font-semibold leading-[1.35] tracking-[-0.2px] text-[#121212]">
                          {text}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* AVOID DON'TS CARD */}
              <div className="flex w-full flex-col items-end">
                {/* Slanted red tab on the right */}
                <div className="relative z-10 -mb-px mr-3 flex h-[34px] w-fit items-center justify-center px-6">
                  <svg
                    width="135"
                    height="34"
                    viewBox="0 0 135 48"
                    preserveAspectRatio="none"
                    fill="none"
                    className="absolute inset-0 scale-x-[-1]"
                  >
                    <defs>
                      <linearGradient id="donts_grad" x1="0" y1="0" x2="135" y2="48" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9C1818" />
                        <stop offset="1" stopColor="#F96060" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 12C0 5.37258 5.37258 0 12 0L106.871 0C111.726 0 116.103 2.92537 117.959 7.41136L134.892 48.3281H0V12Z"
                      fill="url(#donts_grad)"
                    />
                  </svg>
                  <span className="relative z-10 whitespace-nowrap font-sans text-[14px] font-bold uppercase leading-none tracking-[0.7px] text-white">
                    Avoid Don&apos;ts
                  </span>
                </div>

                {/* White card */}
                <div className="relative w-full rounded-[14px] rounded-tr-none bg-white p-4 shadow-sm flex flex-col gap-3.5 border border-black/5">
                  {DONTS.map((text, idx) => (
                    <Fragment key={text}>
                      {idx > 0 && <div className="h-[1px] w-full bg-[#EAECEF]" />}
                      <div className="flex w-full items-center gap-3">
                        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#FEECEB]">
                          <svg width="18" height="18" viewBox="0 0 18.17 18.17" fill="none" className="shrink-0">
                            <path
                              d="M11.5828 11.5833L9.08333 9.0836M9.08333 9.0836L6.58333 6.58333M9.08333 9.0836L6.58387 11.5833M9.08333 9.0836L11.5833 6.58333"
                              stroke="#F00606"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.4167 9.08333C17.4167 4.48096 13.6857 0.75 9.08333 0.75C4.48096 0.75 0.75 4.48096 0.75 9.08333C0.75 13.6857 4.48096 17.4167 9.08333 17.4167C13.6857 17.4167 17.4167 13.6857 17.4167 9.08333Z"
                              stroke="#F00606"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <p className="flex-1 font-sans text-[13.5px] font-semibold leading-[1.35] tracking-[-0.2px] text-[#121212]">
                          {text}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop charging guide (Figma 3572:26411). */}
      <div className="mx-auto hidden w-full max-w-[1440px] flex-col gap-[62px] px-[80px] py-[101px] lg:flex">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-[534px] flex-col items-start justify-center gap-4">
            <div className="relative flex h-[21px] items-center gap-[6px]">
              <img src={`${A}/charging-eyebrow-mark.svg`} alt="" className="relative z-10" />
              <img src={`${A}/charging-eyebrow-line.svg`} alt="" className="absolute left-[3.43px] top-0" />
              <span className="relative z-10 text-[14px] font-bold uppercase tracking-[0.7px] text-navy">Charging</span>
            </div>
            <h2 className="whitespace-nowrap font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink">
              Where Will I Charge?
            </h2>
          </div>
          <div className="flex flex-col items-end justify-end gap-5">
            <p className="w-[405px] text-[16px] leading-normal text-ink">
              Different businesses have different needs. Choose the charging setup that works best for your operations.
            </p>
            <div className="flex items-center gap-3" role="group" aria-label="Charging setup">
              <button type="button" className="flex h-[42px] w-[100px] items-center justify-center rounded-full bg-[#f3f4f5] px-4 text-[16px] font-semibold leading-none text-ink">
                Home
              </button>
              <button type="button" aria-pressed="true" className="flex h-[42px] w-[100px] items-center justify-center rounded-full border-[0.5px] border-white bg-gradient-to-br from-[#1d6fff] to-[#0e2f6d] px-4 text-[16px] font-semibold leading-none text-white">
                Public
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-[27px] rounded-[12px] bg-[#f3f4f5] p-[42px]">
          <div className="flex shrink-0 flex-col items-start justify-center gap-5">
            <div className="relative h-[243px] w-[452px] overflow-hidden">
              <img src={`${A}/charge__imgRectangle1618873364.png`} alt="Public charging station" className="absolute left-[14.45%] top-[11.87%] h-[88.13%] w-[71.1%] object-contain" />
            </div>
            <div className="flex h-[50px] items-center gap-[119px] rounded-[8px] bg-white py-1 pl-3 pr-1">
              <span className="whitespace-nowrap text-[18px] font-semibold leading-none text-ink">How it works</span>
              <a href="#technology-app" className="flex h-[42px] items-center justify-center rounded-[4px] border border-black/50 bg-[#f3f4f5] px-5 font-display text-[16px] font-bold leading-none text-ink">
                Find it on the app
              </a>
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-5">
            <ChargingList title="Do's" kind="do" items={DOS} />
            <ChargingList title="Don'ts" kind="dont" items={DONTS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChargingList({ title, kind, items }: { title: string; kind: "do" | "dont"; items: string[] }) {
  return (
    <div className="flex w-[323px] flex-col items-start gap-[11px]">
      <div className="relative flex h-[32px] w-full items-center px-5">
        <img aria-hidden src={`${A}/charging-${kind === "do" ? "dos" : "donts"}-tab.svg`} alt="" className="absolute left-[10px] top-[-5.53px]" />
        <span className="relative z-10 text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-white">{title}</span>
      </div>
      <div className="flex w-full flex-col gap-[14px] rounded-[12px] bg-white p-4">
        {items.map((item, index) => (
          <Fragment key={item}>
            {index > 0 && <img aria-hidden src={`${A}/charging-divider.svg`} alt="" className="block" />}
            <div className="flex w-full items-center gap-3">
              <span className={`flex size-[42px] shrink-0 items-center justify-center rounded-[20px] p-[6px] ${kind === "do" ? "bg-[rgba(212,219,236,0.4)]" : "bg-[rgba(240,6,6,0.1)]"}`}>
                <img aria-hidden src={`${A}/charging-${kind === "do" ? "check" : "cross"}.svg`} alt="" />
              </span>
              <p className="min-w-0 flex-1 text-[14px] font-semibold leading-[1.4] tracking-[-0.28px] text-ink">{item}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
