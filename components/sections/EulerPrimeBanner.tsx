"use client";

import Image from "next/image";

/**
 * Euler Prime Banner section
 * Figma node-id: 4064:14122
 * Desktop hero-style banner with background images, features panel, and CTA
 */
export default function EulerPrimeBanner() {
  return (
    <section id="prime" className="relative hidden h-[600px] w-full lg:block" aria-label="Euler Prime service">
      {/* Background Layers */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <Image
          src="/assets/euler-prime-bg.png"
          alt=""
          width={1440}
          height={800}
          className="absolute max-w-none object-cover size-full"
        />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/euler-prime-overlay-1.png"
            alt=""
            width={1440}
            height={800}
            className="absolute max-w-none h-[175.86%] left-[-4.68%] top-[-37.93%] w-[119.36%] object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 24.792%, rgba(0, 0, 0, 0) 54.063%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/euler-prime-overlay-2.png"
            alt=""
            width={1440}
            height={800}
            className="absolute max-w-none h-[117.64%] left-[-17.02%] top-[-11.93%] w-[122.39%] object-cover"
          />
        </div>
      </div>

      {/* Blur Effect */}
      <div
        aria-hidden
        className="absolute blur-[102.15px] h-[816.697px] left-[-204.85px] top-[-74.54px] w-[646.484px]"
      >
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[16px]" />
      </div>

      {/* Content Container */}
      <div className="absolute left-[80px] top-[calc(50%+0.27px)] -translate-y-1/2 w-[636px] flex flex-col gap-[25px] items-start">
        {/* Header */}
        <div className="flex flex-col gap-[14px] items-start">
          <div className="flex gap-[12px] items-center">
            <div className="relative size-[14px] shrink-0">
              <Image
                src="/assets/euler-prime-logo.svg"
                alt=""
                fill
                sizes="14px"
                className="absolute block max-w-none size-full"
              />
            </div>
            <p className="font-sans text-[16px] font-normal leading-normal text-white uppercase whitespace-nowrap">
              Euler Prime
            </p>
          </div>
          <h2 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-white w-[523px]">
            Your work does not stop for service.
          </h2>
        </div>

        {/* Description */}
        <p className="font-sans text-[16px] font-normal leading-normal text-white w-[413px]">
        Return the car within 24 hours, and we&rsquo;ll provide you with a complimentary spare vehicle.
        </p>

        {/* Features Panel */}
        <div className="bg-[rgba(19,157,216,0.5)] p-[20px] rounded-[10px]">
          <div className="flex gap-[20px] items-center justify-center">
            {/* Feature 1 */}
            <div className="flex flex-col gap-[10px] items-start whitespace-nowrap">
              <p className="font-display text-[24px] font-bold leading-[1.15] tracking-[-0.48px] text-[#f3f4f5] text-center">
                24 hours
              </p>
              <p className="font-sans text-[16px] font-normal leading-normal text-[#ccc]">
                Truck back in a day
              </p>
            </div>

            {/* Separator */}
            <div className="bg-[rgba(255,255,255,0.5)] rounded-[500px] size-[8px] shrink-0" />

            {/* Feature 2 */}
            <div className="flex flex-col gap-[10px] items-start whitespace-nowrap">
              <p className="font-display text-[24px] font-bold leading-[1.15] tracking-[-0.48px] text-[#f3f4f5] text-center">
                Every 3 months
              </p>
              <p className="font-sans text-[16px] font-normal leading-normal text-[#ccc]">
                Free check-up at your depot
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="/service-centers"
          className="flex h-[42px] shrink-0 items-center justify-center gap-[20px] rounded-[4px] pl-[24px] pr-[2px] transition-transform hover:scale-[1.02]"
          style={{
            backgroundImage:
              "linear-gradient(109.70138650900736deg, rgb(0, 255, 135) 28.559%, rgb(29, 111, 255) 124.97%)",
          }}
        >
          <span className="font-display text-[16px] font-semibold leading-none text-white whitespace-nowrap">
            See Euler Prime
          </span>
          <div className="bg-[#121212] flex flex-col items-center justify-center rounded-[2px] size-[38px] shrink-0">
            <div className="h-[14px] w-[22px] relative shrink-0">
              <div className="absolute inset-[-16.41%_-1.68%_-22.88%_-3.41%]">
                <Image
                  src="/assets/euler-prime-arrow.svg"
                  alt=""
                  fill
                  sizes="22px"
                  className="block max-w-none size-full"
                />
              </div>
            </div>
          </div>
        </a>
      </div>

    </section>
  );
}
