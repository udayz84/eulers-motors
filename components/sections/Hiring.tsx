import Image from "next/image";

/**
 * Hiring/Join the journey section (Figma desktop: 3538:20555, mobile: 2937:16069).
 * Background image + gradient wash with the hiring call-to-action.
 */
export default function Hiring() {
  return (
    <section className="relative overflow-hidden" aria-label="Hiring">
      {/* Mobile Layout */}
      <div
        className="flex flex-col items-center lg:hidden"
        style={{
          minHeight: "530px",
          padding: "32px 20px 302px 20px",
          backgroundColor: "#000",
          backgroundImage: "url('/assets/hiring/mobile-bg-new.png')",
          backgroundPosition: "-45.675px -238.97px",
          backgroundSize: "123.244% 162.552%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex w-full flex-col items-start gap-[14px]">
          <div className="relative flex w-full items-center gap-[4px]">
            <div className="absolute left-[3.43px] top-[0.33px] h-[16px] w-[116.978px] overflow-hidden">
              <Image
                src="/assets/hiring/mobile-rect-1-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[16px] w-[14.794px] shrink-0 overflow-hidden">
              <Image
                src="/assets/hiring/mobile-rect-2-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="relative shrink-0 font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-white whitespace-nowrap">
              Join the journey
            </p>
          </div>
          <div className="relative shrink-0 font-display font-semibold text-[28px] not-italic leading-[0] tracking-[-0.56px] text-white whitespace-nowrap">
            <p className="mb-0 leading-[1.15]">We are hiring, and we</p>
            <p className="leading-[1.15]">are selling.</p>
          </div>
          <p className="relative w-full shrink-0 font-sans text-[12px] font-normal leading-normal text-white">
            Either way, the same question applies. Does the work help somebody
            earn more than they did yesterday?
          </p>
          <div className="relative flex h-[42px] shrink-0 items-center justify-center gap-[5.333px] rounded-[2px] bg-white px-[12px] py-[10.667px]">
            <p className="relative shrink-0 font-display text-[12px] font-semibold not-italic leading-none text-[#121212] whitespace-nowrap">
              View Job openings
            </p>
            <div className="relative h-[9.333px] w-[14.667px] shrink-0">
              <div className="absolute inset-[-16.39%_-1.68%_-22.9%_-3.41%]">
                <Image
                  src="/assets/hiring/mobile-arrow-new.svg"
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
      <div
        className="hidden items-center lg:flex"
        style={{
          minHeight: "487px",
          padding: "102.322px 724px 102.322px 80px",
          background:
            "linear-gradient(270deg, #000 -1.6%, rgba(0, 0, 0, 0) 9.55%), linear-gradient(90deg, #000 23.82%, rgba(0, 0, 0, 0) 51.07%), url('/assets/hiring/desktop-bg-new.png') lightgray 342.61px -673.924px / 83.437% 279.284% no-repeat",
        }}
      >
        <div className="flex w-full flex-col items-start gap-[16px]">
          <div className="relative flex items-center gap-[6px]">
            <div className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px] overflow-hidden">
              <Image
                src="/assets/hiring/desktop-rect-1-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[20.355px] w-[18.821px] shrink-0 overflow-hidden">
              <Image
                src="/assets/hiring/desktop-rect-2-new.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="relative shrink-0 font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-white whitespace-nowrap">
              Join the journey
            </p>
          </div>
          <div className="relative w-[575.92px] shrink-0 font-display font-semibold text-[52px] not-italic leading-[0] tracking-[-1.04px] text-white">
            <p className="mb-0 leading-[1.15]">We are hiring, and we</p>
            <p className="leading-[1.15]">are selling.</p>
          </div>
          <p className="relative w-[531px] shrink-0 font-sans text-[16px] font-normal leading-normal text-white">
            Either way, the same question applies. Does the work help somebody
            earn more than they did yesterday?
          </p>
          <div className="relative flex h-[50px] shrink-0 items-center justify-center gap-[8px] rounded-[4px] border-[0.5px] border-solid border-white bg-[#f2f2f2] px-[24px]">
            <p className="relative shrink-0 font-display text-[16px] font-semibold not-italic leading-none text-[#121212] whitespace-nowrap">
              View Job openings
            </p>
            <div className="relative h-[14px] w-[22px] shrink-0">
              <div className="absolute inset-[-23.05%_-3474.41%_-16.24%_-3.41%]">
                <Image
                  src="/assets/hiring/desktop-arrow-new.svg"
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
