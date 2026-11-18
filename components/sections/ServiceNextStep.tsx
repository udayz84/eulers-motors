"use client";

import Image from "next/image";

const ASSET = "/assets/service-page/";

/* Stacked-chevron arrow glyph (desktop 354:19229) */
function ArrowIcon({ variant }: { variant: "dark" | "white" }) {
  return (
    <span className="relative h-[14px] w-[22px] shrink-0">
      <Image
        src={`${ASSET}arrow-${variant}.svg`}
        alt=""
        width={23.1195}
        height={19.5}
        aria-hidden="true"
        className="absolute left-[-3.41%] top-[-19.64%] h-[19.5px] w-[23.1195px]"
      />
    </span>
  );
}

/* Checkmark bullet (node 2828:11500):
   7.67×6.83 white check inside a 20px clipping box. */
function BulletPoint({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center gap-1.5">
      <div className="relative size-5 shrink-0 overflow-clip">
        <svg
          width="7.66685"
          height="6.83343"
          viewBox="0 0 7.66685 6.83343"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="absolute left-[6.166px] top-[7px]"
        >
          <path
            d="M0.500086 4.45843C0.500086 4.45843 1.83342 5.21887 2.50009 6.33343C2.50009 6.33343 4.50009 1.95843 7.16675 0.500094"
            stroke="#FAFAFA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="whitespace-nowrap font-display text-sm lg:text-base font-bold tracking-[-0.32px] text-[#f3f4f5]">
        {text}
      </p>
    </div>
  );
}

export default function ServiceNextStep() {
  return (
    <section
      id="service-next-step"
      className="relative isolate flex w-full flex-col items-center bg-gradient-to-b from-white from-[18.312%] to-[#d4dbec] to-[38.301%]"
    >
      {/* Full-width background; content centered & capped at 1440px */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 py-8 sm:px-8 md:gap-8 lg:px-20 lg:py-[42px]">
        {/* Header — Desktop style (Figma 3353:13346) */}
        <div className="flex w-full flex-col items-start gap-3 sm:gap-4 text-left">
          <div className="relative flex h-[20.355px] items-center gap-1.5">
            <Image
              src={`${ASSET}badge-swoosh-left-desktop.svg`}
              alt=""
              width={146.405}
              height={20.3555}
              aria-hidden="true"
              className="absolute left-[4.63px] top-0 h-[20.355px] w-[146.405px] max-w-none"
            />
            <div className="relative h-[20.355px] w-[18.821px] shrink-0">
              <Image
                src={`${ASSET}badge-swoosh-right-desktop.svg`}
                alt=""
                width={18.2171}
                height={20.3555}
                aria-hidden="true"
                className="absolute left-[0.6px] top-0 h-[20.355px] w-[18.217px] max-w-none"
              />
            </div>
            <span className="relative whitespace-nowrap font-sans text-xs sm:text-sm font-bold uppercase leading-[19px] tracking-[0.7px] text-[#0e2f6d]">
              Next step
            </span>
          </div>
          <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-[#121212]">
            Not sure which dealer to use?
          </h2>
          <p className="font-sans text-xs sm:text-sm lg:text-base leading-[22px] text-[#121212] max-w-[474px]">
            Tell us where you work and how much you carry. We will put you with the right dealer
            and call you within one working day.
          </p>
        </div>

        {/* Cards Row — Desktop side-by-side (Figma 3353:13350 & 3354:19331) */}
        <div className="flex w-full max-w-[1280px] flex-col md:flex-row items-stretch gap-5">
          {/* AMC Card */}
          <div className="relative min-h-[480px] lg:min-h-[510px] w-full md:w-[50%] lg:w-[660px] shrink-0 overflow-clip rounded-[16px] flex flex-col justify-between">
            <div className="absolute inset-0 bg-[#041231]" />
            <Image
              src={`${ASSET}amc-desktop.png`}
              alt=""
              width={2519}
              height={1926}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 333px 329px at 512.82px 413.67px, rgba(4, 18, 49, 0.1) 0%, rgba(4, 18, 49, 1) 100%)",
              }}
            />
            {/* Dark gradient fallback to guarantee readability on all aspect ratios */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(4, 18, 49, 0.85) 0%, rgba(4, 18, 49, 0.4) 50%, rgba(4, 18, 49, 0.9) 100%)",
              }}
            />

            <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="flex w-full flex-col gap-4 lg:gap-5">
                <h3 className="font-display text-[28px] sm:text-[34px] lg:text-[44px] xl:text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-white">
                  Keep maintenance predictable.
                </h3>
                <p className="font-sans text-xs sm:text-sm lg:text-base leading-[22px] text-white max-w-[552px]">
                  An Annual Maintenance Contract (AMC) covers your routine services, parts
                  replacement, and priority breakdown support under one flat annual rate.
                </p>
              </div>
              <div className="flex w-full flex-col gap-[20px] lg:gap-[26px] mt-6">
                <div className="flex flex-col gap-[12px] lg:gap-[16px]">
                  <BulletPoint text="Scheduled periodic services included" />
                  <BulletPoint text="Free roadside assistance 24/7" />
                  <BulletPoint text="Subsidized accidental repairs & towing" />
                </div>
                <button className="flex h-[46px] lg:h-[50px] w-fit items-center justify-center gap-2 rounded-[4px] bg-white px-5 lg:px-6 transition-opacity hover:opacity-90">
                  <span className="whitespace-nowrap font-display text-xs sm:text-sm lg:text-base font-semibold leading-none text-[#121212]">
                    Enquire about AMC
                  </span>
                  <ArrowIcon variant="dark" />
                </button>
              </div>
            </div>
          </div>

          {/* Warranty Card */}
          <div className="flex w-full md:flex-1 shrink-0 flex-col justify-between overflow-clip rounded-[16px] bg-white p-6 sm:p-8 lg:p-10 min-h-[480px] lg:min-h-[510px]">
            <div className="flex w-full flex-col gap-6 lg:gap-7">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[28px] sm:text-[34px] lg:text-[44px] xl:text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-[#121212]">
                  {"Know what's covered."}
                </h3>
                <p className="font-sans text-xs sm:text-sm lg:text-base leading-[22px] text-[#121212] max-w-[478px]">
                  We stand behind our industrial-grade engineering with a comprehensive multi-year
                  battery and vehicle warranty package.
                </p>
              </div>
              <div className="flex w-full max-w-[379px] items-center justify-between">
                <div className="flex w-[116px] shrink-0 flex-col gap-3 sm:gap-4">
                  <div className="flex items-end gap-[3px] whitespace-nowrap">
                    <p
                      className="bg-clip-text font-display text-[48px] sm:text-[56px] lg:text-[62px] font-semibold leading-[0.73] tracking-[-1.24px] text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(215.37deg, rgb(14, 47, 109) 26.333%, rgb(29, 111, 255) 87.163%)",
                      }}
                    >
                      03
                    </p>
                    <p className="font-sans text-[18px] sm:text-[20px] font-semibold leading-none tracking-[-0.4px] text-[#0e2f6d]">
                      Yrs
                    </p>
                  </div>
                  <p className="w-[131px] font-sans text-xs leading-4 text-[#121212] whitespace-nowrap">
                    Standard Vehicle Warranty
                  </p>
                </div>
                <div className="h-[56px] w-px shrink-0 bg-[#d4dbec]" />
                <div className="flex shrink-0 flex-col gap-3 sm:gap-4">
                  <div className="flex items-end gap-[3px] whitespace-nowrap">
                    <p
                      className="bg-clip-text font-display text-[48px] sm:text-[56px] lg:text-[62px] font-semibold leading-[0.73] tracking-[-1.24px] text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(215.74deg, rgb(14, 47, 109) 26.333%, rgb(29, 111, 255) 87.163%)",
                      }}
                    >
                      05
                    </p>
                    <p className="font-sans text-[18px] sm:text-[20px] font-semibold leading-none tracking-[-0.4px] text-[#0e2f6d]">
                      Yrs
                    </p>
                  </div>
                  <p className="w-[124px] font-sans text-xs leading-4 text-[#121212] whitespace-nowrap">
                    Battery Pack Protection
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-5 mt-6">
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <p className="font-display text-[16px] sm:text-[18px] font-semibold leading-[1.4] tracking-[-0.36px] text-[#121212]">
                  Quick Terms:
                </p>
                <p className="font-sans text-xs sm:text-[14px] leading-4 sm:leading-[20px] text-[#121212]">
                  Coverage includes the permanent battery management system, drivetrain motor, and
                  core chassis structures. Excludes regular wear-and-tear components such as brakes
                  and tires.
                </p>
              </div>
              <button className="flex h-[46px] lg:h-[50px] w-fit items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-5 lg:px-6 border-[0.5px] border-white transition-opacity hover:opacity-90">
                <span className="whitespace-nowrap font-display text-xs sm:text-sm lg:text-base font-semibold leading-none text-white">
                  Confirm test drive
                </span>
                <ArrowIcon variant="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
