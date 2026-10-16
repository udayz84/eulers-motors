import Image from "next/image";

/**
 * Factory/HowWeBuild section (Figma desktop: 3534:18269, mobile: 2929:14988).
 * Factory section with background image and call-to-action.
 */
export default function Factory() {
  return (
    <section className="relative overflow-hidden" aria-label="Factory">
      {/* Mobile Layout (Figma 2929:14988 — 393×620 frame) */}
      <div
        className="relative h-[620px] sm:h-[680px] w-full lg:hidden"
        style={{
          background:
            "url('/assets/factory/mobile-bg.png') -342.233px 0px / 283.969% 100% no-repeat, linear-gradient(0deg, #041231 0%, #041231 100%) #fff",
        }}
      >
        <div className="absolute blur-[102.15px] h-[285.986px] left-[-66.16px] top-[409.47px] w-[534.271px]">
          <div aria-hidden className="absolute backdrop-blur-[16px] bg-[rgba(0,0,0,0.6)] inset-0 pointer-events-none" />
        </div>
        <div className="absolute bottom-[20px] sm:bottom-[36px] content-stretch flex flex-col gap-[12px] sm:gap-[16px] items-start left-[20px] sm:left-[36px] w-[calc(100%-40px)] sm:w-[calc(100%-72px)] max-w-[540px]">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
            <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
              <Image
                src="/assets/factory/mobile-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/factory/mobile-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] sm:text-[13px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
              How we build
            </p>
          </div>
          <p className="font-display text-[28px] sm:text-[38px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.56px]">
            Inside Our Factory
          </p>
          <p className="font-sans font-normal leading-normal relative shrink-0 text-[12px] sm:text-[15px] text-white">
            See how every Euler vehicle is built and tested.
          </p>
          <div className="bg-white content-stretch flex gap-[5.333px] h-[42px] sm:h-[48px] items-center justify-center px-[12px] sm:px-[18px] py-[10.667px] relative rounded-[2px] sm:rounded-[4px] shrink-0">
            <p className="font-display text-[12px] sm:text-[14px] font-semibold leading-none not-italic relative shrink-0 text-[#121212] whitespace-nowrap">
              Learn about our technology
            </p>
            <div className="h-[9.333px] sm:h-[11px] relative shrink-0 w-[14.667px] sm:w-[17px]">
              <div className="absolute inset-[-16.4%_-1.68%_-22.89%_-3.41%]">
                <Image
                  src="/assets/factory/mobile-arrow.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[37.174px] sm:size-[50px] top-1/2">
          <Image
            src="/assets/factory/mobile-play.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-[55px] px-5 py-[60px] lg:px-[80px]">
          <div className="relative h-[680px] w-full overflow-hidden rounded-[20px]">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-[20px] bg-[#d9d9d9]" />
              <Image
                src="/assets/factory/desktop-bg.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-[40px] left-[40px] flex w-[636px] flex-col items-start gap-[16px]">
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                  <Image
                    src="/assets/factory/desktop-rect-1.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                  <Image
                    src="/assets/factory/desktop-rect-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase whitespace-nowrap">
                  How we build
                </p>
              </div>
              <p className="font-display text-[52px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-1.04px] w-[575.92px]">
                Inside Our Factory
              </p>
              <p className="font-sans font-normal leading-normal relative shrink-0 text-[16px] text-white w-[531px]">
                See how every Euler vehicle is built and tested.
              </p>
              <div className="bg-[#f2f2f2] border-[0.5px] border-solid border-white content-stretch flex gap-[8px] h-[50px] items-center justify-center px-[24px] relative rounded-[4px] shrink-0">
                <p className="font-display text-[16px] font-semibold leading-none not-italic relative shrink-0 text-[#121212] whitespace-nowrap">
                  Learn about our technology
                </p>
                <div className="h-[14px] relative shrink-0 w-[22px]">
                  <div className="absolute inset-[-23.05%_-3474.41%_-16.24%_-3.41%]">
                    <Image
                      src="/assets/factory/desktop-arrow.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[52px] top-1/2">
              <Image
                src="/assets/factory/desktop-play.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
