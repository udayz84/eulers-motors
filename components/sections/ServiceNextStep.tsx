"use client";

import Image from "next/image";

const ASSET = "/assets/service-page/";

/* Stacked-chevron arrow glyph (mobile 3619:12954 / desktop 354:19229).
   One 23.12×19.5 source per colour; mobile renders it uniformly scaled to
   19.82×16.71 inside a smaller slot, exactly as the design frames place it. */
function ArrowIcon({ variant }: { variant: "dark" | "white" }) {
  return (
    <span className="relative h-3 w-[18.857px] shrink-0 lg:h-[14px] lg:w-[22px]">
      <Image
        src={`${ASSET}arrow-${variant}.svg`}
        alt=""
        width={23.1195}
        height={19.5}
        aria-hidden="true"
        className="absolute left-[-3.41%] top-[-19.64%] h-[16.7143px] w-[19.8167px] lg:h-[19.5px] lg:w-[23.1195px]"
      />
    </span>
  );
}

/* Checkmark bullet (node 2828:11500, identical at both breakpoints):
   7.67×6.83 white check inside a 20px clipping box. */
function BulletPoint({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center gap-1 lg:gap-1.5">
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
      <p className="whitespace-nowrap font-display text-xs font-medium leading-[1.15] tracking-[-0.24px] text-[#f3f4f5] lg:text-base lg:font-bold lg:tracking-[-0.32px]">
        {text}
      </p>
    </div>
  );
}

export default function ServiceNextStep() {
  return (
    <section className="relative isolate flex w-full flex-col items-start gap-4 bg-gradient-to-b from-white from-[18.312%] to-[#d4dbec] to-[38.301%] lg:items-center lg:gap-5">
      {/* Full-width background; content centred & capped at 1440px so it stays responsive */}
      <div className="mx-auto max-w-[1440px] w-full flex flex-col items-start gap-4 px-5 py-8 sm:px-8 lg:px-20 lg:py-[42px] lg:items-center lg:gap-5">
        {/* Header — mobile 2828:11479 / desktop 3353:13346 */}
        <div className="flex w-full flex-col gap-[14px] lg:gap-4">
        <div className="relative flex h-4 items-center gap-1 lg:h-[20.355px] lg:gap-1.5">
          {/* Mobile swoosh pair: solid piece in flow, gradient bar over it */}
          <div className="relative h-4 w-[14.794px] shrink-0 lg:hidden">
            <Image
              src={`${ASSET}badge-swoosh-right-mobile.svg`}
              alt=""
              width={14.1899}
              height={16}
              aria-hidden="true"
              className="absolute left-[0.6px] top-0 h-4 w-[14.1899px] max-w-none"
            />
          </div>
          <Image
            src={`${ASSET}badge-swoosh-left-mobile.svg`}
            alt=""
            width={114.561}
            height={16}
            aria-hidden="true"
            className="absolute left-[1.2px] top-[0.33px] h-4 w-[114.561px] max-w-none lg:hidden"
          />
          {/* Desktop swoosh pair: gradient bar under, solid piece on top */}
          <Image
            src={`${ASSET}badge-swoosh-left-desktop.svg`}
            alt=""
            width={146.405}
            height={20.3555}
            aria-hidden="true"
            className="absolute left-[4.63px] top-0 hidden h-[20.355px] w-[146.405px] max-w-none lg:block"
          />
          <div className="relative hidden h-[20.355px] w-[18.821px] shrink-0 lg:block">
            <Image
              src={`${ASSET}badge-swoosh-right-desktop.svg`}
              alt=""
              width={18.2171}
              height={20.3555}
              aria-hidden="true"
              className="absolute left-[0.6px] top-0 h-[20.355px] w-[18.217px] max-w-none"
            />
          </div>
          <span className="relative whitespace-nowrap font-sans text-xs font-bold uppercase leading-4 tracking-[0.6px] text-[#0e2f6d] lg:text-sm lg:leading-[19px] lg:tracking-[0.7px]">
            <span className="lg:hidden">Predictable Operations</span>
            <span className="hidden lg:inline">Next step</span>
          </span>
        </div>
        <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] lg:whitespace-nowrap lg:text-[42px] lg:tracking-[-0.84px]">
          <span className="lg:hidden">Fleet Protection Plans</span>
          <span className="hidden lg:inline">Not sure which dealer to use?</span>
        </h2>
        <p className="font-sans text-xs leading-4 text-[#121212] lg:w-[474.189px] lg:text-base lg:leading-[22px]">
          <span className="lg:hidden">
            Eliminate surprise costs with flexible maintenance contracts and extensive industrial
            warranty coverage.
          </span>
          <span className="hidden lg:inline">
            Tell us where you work and how much you carry. We will put you with the right dealer
            and call you within one working day.
          </span>
        </p>
      </div>

      {/* Cards — mobile 353px column / desktop 1280px row */}
      <div className="flex w-full flex-col gap-4 lg:w-[1280px] lg:flex-row lg:items-center lg:gap-5">
        {/* AMC card — mobile 2828:11486 / desktop 3353:13267 */}
        <div className="relative h-[561px] w-[353px] shrink-0 overflow-clip rounded-lg lg:h-[510px] lg:w-[660px] lg:rounded-[16px]">
          <div className="absolute inset-0 bg-[#041231]" />
          <Image
            src={`${ASSET}amc-mobile.png`}
            alt=""
            width={1536}
            height={1024}
            aria-hidden="true"
            className="absolute left-[-15.8%] top-[45.69%] h-[55.21%] w-[131.6%] max-w-none lg:hidden"
          />
          <Image
            src={`${ASSET}amc-desktop.png`}
            alt=""
            width={2519}
            height={1926}
            aria-hidden="true"
            className="absolute left-[0.01%] top-[0.02%] hidden h-[100.11%] w-[101.18%] max-w-none lg:block"
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              backgroundImage:
                "linear-gradient(180.68deg, rgb(4, 18, 49) 47.17%, rgba(4, 18, 49, 0.2) 83.62%)",
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 333px 329px at 512.82px 413.67px, rgba(4, 18, 49, 0.1) 0%, rgba(4, 18, 49, 1) 100%)",
            }}
          />
          <div className="absolute left-1/2 top-[20.99px] flex w-[313px] -translate-x-1/2 flex-col items-start gap-5 lg:top-1/2 lg:h-[446px] lg:w-[596px] lg:-translate-y-1/2 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-5">
              <h3 className="w-[310.678px] font-display text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-white lg:w-[537.027px] lg:text-[52px] lg:leading-[1.15] lg:tracking-[-1.04px]">
                Keep maintenance predictable.
              </h3>
              <p className="font-sans text-xs leading-4 text-white lg:w-[552.676px] lg:text-base lg:leading-[22px]">
                <span className="lg:hidden">
                  An AMC covers routine services, parts replacement, and priority support for one
                  annual rate.
                </span>
                <span className="hidden lg:inline">
                  An Annual Maintenance Contract (AMC) covers your routine services, parts
                  replacement, and priority breakdown support under one flat annual rate.
                </span>
              </p>
            </div>
            <div className="flex w-full flex-col gap-[20px] lg:gap-[26px]">
              <div className="flex flex-col gap-[4px] lg:gap-[6px]">
                <BulletPoint text="Scheduled periodic services included" />
                <BulletPoint text="Free roadside assistance 24/7" />
                <BulletPoint text="Subsidized accidental repairs & towing" />
              </div>
              <button className="flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[4px] bg-white px-5 lg:h-[50px] lg:w-fit lg:px-6">
                <span className="whitespace-nowrap font-display text-xs font-bold leading-none text-[#121212] lg:text-base lg:font-semibold lg:leading-none">
                  Enquire about AMC
                </span>
                <ArrowIcon variant="dark" />
              </button>
            </div>
          </div>
        </div>

        {/* Warranty card — mobile 2828:11517 / desktop 3354:19331 */}
        <div className="flex w-[353px] shrink-0 flex-col gap-[26px] overflow-clip rounded-lg bg-white p-5 lg:flex-1 lg:self-stretch lg:justify-between lg:rounded-[16px] lg:p-8 lg:w-auto">
          <div className="flex w-full flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-3">
              <h3 className="w-[310.678px] font-display text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#121212] lg:w-auto lg:text-[52px] lg:leading-[1.15] lg:tracking-[-1.04px] lg:whitespace-nowrap">
                {"Know what's covered."}
              </h3>
              <p className="font-sans text-xs leading-4 text-[#121212] lg:w-[477.836px] lg:text-base lg:leading-[22px]">
                We stand behind our industrial-grade engineering with a comprehensive multi-year
                battery and vehicle warranty package.
              </p>
            </div>
            <div className="flex w-full items-center justify-between lg:w-[379px]">
              <div className="flex w-[116px] shrink-0 flex-col gap-4">
                <div className="flex items-end gap-[3px] whitespace-nowrap">
                  <p
                    className="bg-clip-text font-display text-[62px] font-semibold leading-[0.73] tracking-[-1.24px] text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(215.37deg, rgb(14, 47, 109) 26.333%, rgb(29, 111, 255) 87.163%)",
                    }}
                  >
                    03
                  </p>
                  <p className="font-sans text-[20px] font-semibold leading-none tracking-[-0.4px] text-[#0e2f6d]">
                    Yrs
                  </p>
                </div>
                <p className="w-[131.425px] font-sans text-xs leading-4 text-[#121212] whitespace-nowrap">
                  Standard Vehicle Warranty
                </p>
              </div>
              <div className="h-[56.116px] w-px shrink-0 bg-[#d4dbec]" />
              <div className="flex shrink-0 flex-col gap-4">
                <div className="flex items-end gap-[3px] whitespace-nowrap">
                  <p
                    className="bg-clip-text font-display text-[62px] font-semibold leading-[0.73] tracking-[-1.24px] text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(215.74deg, rgb(14, 47, 109) 26.333%, rgb(29, 111, 255) 87.163%)",
                    }}
                  >
                    05
                  </p>
                  <p className="font-sans text-[20px] font-semibold leading-none tracking-[-0.4px] text-[#0e2f6d]">
                    Yrs
                  </p>
                </div>
                <p className="w-[123.562px] font-sans text-xs leading-4 text-[#121212] whitespace-nowrap">
                  Battery Pack Protection
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-0 w-full shrink-0 lg:hidden">
            <div className="absolute inset-[-1px_0_0_0] bg-[#d4dbec]" />
          </div>
          <div className="flex w-full flex-col gap-[26px] lg:gap-5">
            <div className="flex flex-col gap-3">
              <p className="font-display text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] sm:text-[18px] lg:text-[18px] sm:tracking-[-0.36px] lg:tracking-[-0.36px]">
                Quick Terms:
              </p>
              <p className="font-sans text-xs leading-4 text-[#121212] sm:text-[14px] sm:leading-[20px] lg:text-[14px] lg:leading-[20px]">
                Coverage includes the permanent battery management system, drivetrain motor, and
                core chassis structures. Excludes regular wear-and-tear components such as brakes
                and tires.
              </p>
            </div>
            <button className="flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-5 lg:h-[50px] lg:w-fit lg:border-[0.5px] lg:border-solid lg:border-white lg:px-6">
              <span className="whitespace-nowrap font-display text-xs font-bold leading-none text-white lg:hidden">
                View Full Warranty Details
              </span>
              <span className="hidden whitespace-nowrap font-display text-xs font-bold leading-none text-white lg:inline lg:text-base lg:font-semibold lg:leading-none">
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
