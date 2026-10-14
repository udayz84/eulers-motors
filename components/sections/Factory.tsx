import Image from "next/image";

/**
 * Factory/HowWeBuild section (Figma desktop: 3534:18269, mobile: 2929:14988).
 * Factory section with background image and call-to-action.
 */
export default function Factory() {
  return (
    <section className="relative overflow-hidden" aria-label="Factory">
      {/* Mobile Layout */}
      <div className="relative h-[800px] sm:hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/about-euler/factory-mobile-bg.png"
              alt=""
              fill
              className="h-full left-[-87.08%] w-[283.97%]"
            />
          </div>
        </div>
        <div className="absolute blur-[102.15px] h-[285.986px] left-[-66.16px] top-[409.47px] w-[534.271px]">
          <div aria-hidden className="absolute backdrop-blur-[16px] bg-[rgba(0,0,0,0.6)] inset-0 pointer-events-none" />
        </div>
        <div className="absolute bottom-[20px] flex flex-col gap-[12px] items-start left-[20px] w-[353px]">
          <div className="flex gap-[4px] items-center relative shrink-0 w-full">
            <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
              <Image
                src="/assets/about-euler/factory-mobile-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/about-euler/factory-mobile-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
              How we build
            </p>
          </div>
          <p className="font-display text-[28px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.56px] whitespace-nowrap">
            Inside Our Factory
          </p>
          <p className="font-sans font-normal leading-normal min-w-full relative shrink-0 text-[12px] text-white w-[min-content]">
            See how every Euler vehicle is built and tested.
          </p>
          <div className="bg-white flex gap-[5.333px] h-[42px] items-center justify-center px-[12px] py-[10.667px] relative rounded-[2px] shrink-0">
            <p className="font-display text-[12px] font-semibold leading-none not-italic relative shrink-0 text-[#121212] whitespace-nowrap">
              Learn about our technology
            </p>
            <div className="h-[9.333px] relative shrink-0 w-[14.667px]">
              <div className="absolute inset-[-16.4%_-1.68%_-22.89%_-3.41%]">
                <Image
                  src="/assets/about-euler/factory-mobile-arrow.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[37.174px] top-1/2">
          <Image
            src="/assets/about-euler/factory-mobile-play.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block bg-white px-[80px] py-[60px]">
        <div className="h-[680px] relative w-full">
          <div className="absolute h-[680px] left-0 rounded-[20px] top-0 w-[1280px]">
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[20px]">
              <div className="absolute bg-[#d9d9d9] inset-0 rounded-[20px]" />
              <Image
                src="/assets/about-euler/factory-desktop-bg.png"
                alt=""
                fill
                className="object-cover rounded-[20px]"
              />
            </div>
          </div>
          <div className="absolute bottom-[40px] flex flex-col gap-[16px] items-start left-[40px] w-[636px]">
            <div className="flex gap-[6px] items-center relative shrink-0">
              <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                <Image
                  src="/assets/about-euler/factory-desktop-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                <Image
                  src="/assets/about-euler/factory-desktop-rect-2.svg"
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
            <div className="bg-[#f2f2f2] border-[0.5px] border-solid border-white flex gap-[8px] h-[50px] items-center justify-center px-[24px] relative rounded-[4px] shrink-0">
              <p className="font-display text-[16px] font-semibold leading-none not-italic relative shrink-0 text-[#121212] whitespace-nowrap">
                Learn about our technology
              </p>
              <div className="h-[14px] relative shrink-0 w-[22px]">
                <div className="absolute inset-[-23.05%_-3474.41%_-16.24%_-3.41%]">
                  <Image
                    src="/assets/about-euler/factory-desktop-arrow.svg"
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
              src="/assets/about-euler/factory-desktop-play.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
