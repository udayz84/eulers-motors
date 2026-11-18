"use client";

import Image from "next/image";

/**
 * About Neo Banner - Mobile version
 * Figma node-id: 4064:16241
 */
export default function NeoAboutBannerMobile() {
  return (
    <section className="lg:hidden bg-white relative h-[488px] w-full overflow-hidden" aria-label="About Neo">
      {/* Content Container */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[42.39px] w-[353px] flex flex-col gap-[14px] items-start">
        {/* Header */}
        <div className="flex gap-[6px] items-center">
          <div className="relative size-[14px] shrink-0">
            <Image
              src="/assets/mobile-neo-logo.svg"
              alt=""
              fill
              sizes="14px"
              className="absolute block max-w-none size-full"
            />
          </div>
          <p className="font-sans text-[12px] font-normal leading-normal text-[#121212] whitespace-nowrap">
            ABOUT NEO
          </p>
        </div>
        <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212]">
          Built around real drives.
        </h2>
        <p className="font-sans text-[12px] font-normal leading-normal text-[#121212] w-[325px]">
          Neo is Euler Motors' EV brand for drivers on the road. Each vehicle is designed for their routes and work to help them earn more.
        </p>

        {/* CTA Button */}
        <div
          className="flex gap-[8px] items-center justify-center pl-[12px] pr-[2px] py-[2px] rounded-[4px] shrink-0 cursor-pointer hover:scale-105 transition-transform"
          style={{
            backgroundImage:
              "linear-gradient(103.22deg, #00ff87 28.559%, #1d6fff 124.97%)",
          }}
        >
          <p className="font-display text-[12px] font-semibold leading-none text-white whitespace-nowrap">
            About Neo
          </p>
          <div className="bg-[#121212] flex items-center justify-center rounded-[1.684px] size-[32px] shrink-0">
            <div className="h-[11.789px] w-[18.526px] relative shrink-0">
              <div className="absolute inset-[-16.4%_-1.68%_-22.89%_-3.41%]">
                <Image
                  src="/assets/mobile-neo-arrow.svg"
                  alt=""
                  fill
                  sizes="19px"
                  className="block max-w-none size-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute bottom-[14.97px] left-1/2 -translate-x-1/2 ml-[-63.5px] h-[277.641px] w-[555.281px] overflow-hidden">
        <div className="absolute h-[67.752px] left-0 top-[209.89px] w-[555.281px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#d9d9d9] inset-0" />
            <Image
              src="/assets/mobile-neo-banner-bg-1.png"
              alt=""
              width={555}
              height={277}
              className="absolute max-w-none"
              style={{
                height: "477.13%",
                left: "0.04%",
                top: "-365.19%",
                width: "116%",
              }}
            />
          </div>
        </div>
        <div className="absolute left-[361.76px] top-[122.48px]">
          <div className="absolute h-[277.641px] left-0 top-0 w-[555.281px]">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#d9d9d9] inset-0" />
              <Image
                src="/assets/mobile-neo-banner-bg-1.png"
                alt=""
                width={555}
                height={277}
                className="absolute max-w-none"
                style={{
                  height: "116.43%",
                  left: "0.04%",
                  top: "-13.52%",
                  width: "116%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="absolute h-[277.641px] left-0 top-0 w-[555.281px]">
          <Image
            src="/assets/mobile-neo-banner-bg-2.png"
            alt=""
            width={555}
            height={277}
            className="absolute max-w-none"
            style={{
              height: "116.43%",
              left: "0.04%",
              top: "-13.52%",
              width: "116%",
            }}
          />
        </div>
        <div className="absolute bg-white blur-[12.262px] h-[61.12px] left-[-45.2px] top-[254.47px] w-[663.507px]" />
      </div>
    </section>
  );
}
