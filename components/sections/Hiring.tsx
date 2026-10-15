import Image from "next/image";

/**
 * Hiring/Join the journey section (Figma desktop: 3538:20555, mobile: 2937:16069).
 * Hiring section with background image and call-to-action.
 */
export default function Hiring() {
  return (
    <section className="relative overflow-hidden" aria-label="Hiring">
      {/* Mobile Layout */}
      <div className="relative h-[800px] sm:hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/hiring/mobile-bg.png"
              alt=""
              fill
              className="h-[162.55%] left-[-11.62%] top-[-45.09%] w-[123.24%]"
            />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[302px] content-stretch flex flex-col gap-[14px] items-start left-1/2 w-[353px]">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
            <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
              <Image
                src="/assets/hiring/mobile-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/hiring/mobile-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
              Join the journey
            </p>
          </div>
          <div className="font-display leading-[0] not-italic relative shrink-0 text-[28px] text-white tracking-[-0.56px] whitespace-nowrap">
            <p className="leading-[1.15] mb-0">We are hiring, and we</p>
            <p className="leading-[1.15]">are selling.</p>
          </div>
          <p className="font-sans font-normal leading-normal min-w-full relative shrink-0 text-[12px] text-white w-[min-content]">
            Either way, the same question applies. Does the work help somebody earn more than they did yesterday?
          </p>
          <div className="bg-white content-stretch flex gap-[5.333px] h-[42px] items-center justify-center px-[12px] py-[10.667px] relative rounded-[2px] shrink-0">
            <p className="font-display text-[12px] font-semibold leading-none not-italic relative shrink-0 text-[#121212] whitespace-nowrap">
              View Job openings
            </p>
            <div className="h-[9.333px] relative shrink-0 w-[14.667px]">
              <div className="absolute inset-[-16.39%_-1.68%_-22.9%_-3.41%]">
                <Image
                  src="/assets/hiring/mobile-arrow.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block relative h-[680px]">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/hiring/desktop-bg.png"
              alt=""
              fill
              className="h-[279.28%] left-[23.79%] top-[-138.38%] w-[83.44%]"
            />
          </div>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(269.9999995803797deg, rgb(0, 0, 0) 1.5968%, rgba(0, 0, 0, 0) 9.5485%), linear-gradient(89.67764656338602deg, rgb(0, 0, 0) 23.82%, rgba(0, 0, 0, 0) 51.072%)" }} />
        </div>
        <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[16px] items-start left-[80px] top-1/2 w-[636px]">
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
            <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
              <Image
                src="/assets/hiring/desktop-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
              <Image
                src="/assets/hiring/desktop-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase whitespace-nowrap">
              Join the journey
            </p>
          </div>
          <div className="font-display leading-[0] not-italic relative shrink-0 text-[52px] text-white tracking-[-1.04px] w-[575.92px]">
            <p className="leading-[1.15] mb-0">We are hiring, and we</p>
            <p className="leading-[1.15]">are selling.</p>
          </div>
          <p className="font-sans font-normal leading-normal relative shrink-0 text-[16px] text-white w-[531px]">
            Either way, the same question applies. Does the work help somebody earn more than they did yesterday?
          </p>
          <div className="bg-[#f2f2f2] border-[0.5px] border-solid border-white content-stretch flex gap-[8px] h-[50px] items-center justify-center px-[24px] relative rounded-[4px] shrink-0">
            <p className="font-display text-[16px] font-semibold leading-none not-italic relative shrink-0 text-[#121212] whitespace-nowrap">
              View Job openings
            </p>
            <div className="h-[14px] relative shrink-0 w-[22px]">
              <div className="absolute inset-[-23.05%_-3474.41%_-16.24%_-3.41%]">
                <Image
                  src="/assets/hiring/desktop-arrow.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
