"use client";

export default function ServiceEulerPrime() {
  return (
    <section className="relative isolate mx-auto flex min-h-[600px] w-full items-center justify-center bg-black lg:h-[798px] lg:w-[1440px] lg:max-w-full">
      {/* Background image for desktop */}
      <div className="absolute inset-0 bg-cover bg-center lg:block hidden" style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), linear-gradient(89.99999996411461deg, rgba(0,0,0,0.2) 24.792%, rgba(0,0,0,0) 54.063%)" }} />
      
      {/* Decorative blur element */}
      <div className="absolute left-[-204.85px] top-[-74.54px] h-[816.697px] w-[646.484px] bg-[rgba(0,0,0,0.2)] blur-[102.15px] backdrop-blur-[16px]" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-6 items-start px-5 py-10 lg:left-[80px] lg:top-[calc(50%+0.27px)] lg:w-[636px] lg:translate-y-[-50%] lg:gap-[25px] lg:px-0 lg:py-0">
        {/* Badge */}
        <div className="relative flex h-4 items-center gap-1.5 pl-1 lg:h-[20.355px] lg:gap-1.5">
          <div className="absolute left-1 top-0 h-4 w-[148.821px] lg:h-[20.355px] lg:w-[148.821px]">
            <div className="h-full w-full bg-gradient-to-r from-[#0e2f6d] to-[#1d6fff]" />
          </div>
          <div className="relative h-4 w-[18.821px] lg:h-[20.355px] lg:w-[18.821px]">
            <div className="h-full w-full bg-[#0e2f6d]" />
          </div>
          <span className="relative font-sans text-xs font-bold uppercase tracking-[0.7px] text-white lg:text-sm">
            Euler Prime
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:max-w-[575.92px] lg:text-[52px] lg:tracking-[-1.04px]">
          Your work does not stop for service.
        </h2>

        {/* Description */}
        <p className="font-sans text-xs leading-normal text-white lg:max-w-[413px] lg:text-base">
          Return the car within 24 hours, and we'll provide you with a complimentary spare vehicle.
        </p>

        {/* Feature panel */}
        <div className="flex flex-col gap-5 rounded-[10px] bg-[rgba(14,47,109,0.35)] p-5 lg:gap-[20px] lg:p-5">
          <div className="flex items-center justify-center gap-5 lg:gap-[20px]">
            <div className="flex flex-col gap-2.5 whitespace-nowrap">
              <p className="font-display text-xl font-bold leading-[1.15] tracking-[-0.4px] text-[#f3f4f5] lg:text-[24px] lg:tracking-[-0.48px]">
                24 hours
              </p>
              <p className="font-sans text-xs leading-normal text-[#ccc] lg:text-base">
                Truck back in a day
              </p>
            </div>
            <div className="h-2 w-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.5)] lg:h-2 lg:w-2" />
            <div className="flex flex-col gap-2.5 whitespace-nowrap">
              <p className="font-display text-xl font-bold leading-[1.15] tracking-[-0.4px] text-[#f3f4f5] lg:text-[24px] lg:tracking-[-0.48px]">
                Spare vehicle
              </p>
              <p className="font-sans text-xs leading-normal text-[#ccc] lg:text-base">
                Totally free
              </p>
            </div>
            <div className="h-2 w-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.5)] lg:h-2 lg:w-2" />
            <div className="flex flex-col gap-2.5 whitespace-nowrap">
              <p className="font-display text-xl font-bold leading-[1.15] tracking-[-0.4px] text-[#f3f4f5] lg:text-[24px] lg:tracking-[-0.48px]">
                Every 3 months
              </p>
              <p className="font-sans text-xs leading-normal text-[#ccc] lg:text-base">
                Free check-up at your depot
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="flex h-10 items-center justify-center gap-2 rounded-[4px] bg-white px-6 font-display text-sm font-semibold text-[#0e2f6d] lg:h-[50.477px] lg:px-6 lg:text-base">
          See Euler Prime
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="text-[#0e2f6d]">
            <path d="M15 1L21 7L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
