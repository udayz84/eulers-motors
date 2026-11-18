"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

const STEPS = [
  {
    id: "01",
    title: "Choose your Neo",
    description: "Choose the vehicle for your route: HiRANGE for long days, HiCITY for city trips.",
    image: "/assets/step1-bg.png",
    overlay: "/assets/overlay-1.svg",
  },
  {
    id: "02",
    title: "Charge and go",
    description: "Charge at home or while out. Full in about 3.5 hours.",
    image: "/assets/step2-bg.png",
    overlay: "/assets/overlay-2.svg",
  },
  {
    id: "03",
    title: "Track your day",
    description: "View your vehicle, trips, and battery on your phone. Stay informed before anyone else.",
    image: "/assets/step3-bg.png",
    overlay: "/assets/overlay-1.svg",
  },
  {
    id: "04",
    title: "Keep earning",
    description: "Worry less about your vehicle. Doorstep servicing takes 30 minutes to 2 hours.",
    image: "/assets/step4-bg.png",
    overlay: "/assets/overlay-2.svg",
  },
];

/**
 * "A day with Neo" section — desktop-only carousel showing 4 steps
 * Figma node-id: 4075:17102
 * Desktop frame with 4 cards, navigation arrows, and progress indicator
 */
export default function NeoDayWithNeo() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setProgress(maxScroll > 0 ? row.scrollLeft / maxScroll : 0);
  }, []);

  const scrollCards = (direction: -1 | 1) => {
    const row = rowRef.current;
    const card = row?.querySelector<HTMLElement>("[data-neo-step]");
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="relative hidden w-full overflow-hidden bg-[#f3f4f5] py-[80px] lg:block" aria-label="A day with Neo">
      <div className="mx-auto max-w-[1440px] px-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-[14px] items-center justify-center mb-[50px]">
          <div className="flex gap-[12px] items-center">
            <div className="relative size-[14px] shrink-0">
              <Image
                src="/assets/logo-icon.svg"
                alt=""
                fill
                sizes="14px"
                className="absolute block max-w-none size-full"
              />
            </div>
            <p className="font-sans text-[16px] font-normal leading-normal text-[#121212] whitespace-nowrap">
              HOW IT WORKS
            </p>
          </div>
          <h2 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-[#121212] whitespace-nowrap">
            A day with Neo.
          </h2>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            type="button"
            aria-label="Previous step"
            onClick={() => scrollCards(-1)}
            className="absolute left-[-30px] top-[169px] z-20 size-[55px] cursor-pointer transition-transform hover:scale-110"
          >
            <Image src="/assets/arrow-left.svg" alt="" fill sizes="55px" className="object-contain" />
          </button>
          <button
            type="button"
            aria-label="Next step"
            onClick={() => scrollCards(1)}
            className="absolute right-[-30px] top-[169px] z-20 size-[55px] cursor-pointer transition-transform hover:scale-110"
          >
            <Image src="/assets/arrow-right.svg" alt="" fill sizes="55px" className="object-contain" />
          </button>

          {/* Cards Track */}
          <div
            ref={rowRef}
            id="neo-how-it-works-desktop"
            onScroll={updateProgress}
            className="no-scrollbar flex w-[calc(100%+80px)] snap-x snap-mandatory gap-[16px] overflow-x-auto scroll-smooth"
            aria-label="How it works steps"
          >
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                data-neo-step
                className="relative h-[386px] w-[418px] shrink-0 snap-start overflow-hidden rounded-[12px] border-4 border-solid border-white shadow-[0px_12px_12px_0px_rgba(33,158,182,0.2)]"
              >
                {/* Background Layers */}
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                  <div className="absolute bg-white inset-0 rounded-[12px]" />
                  <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                    <Image
                      src={step.image}
                      alt=""
                      width={418}
                      height={386}
                      className="absolute max-w-none object-cover"
                      style={{
                        ...(index === 0 && {
                          height: "162.32%",
                          left: "-3.66%",
                          top: "-5%",
                          width: "216.79%",
                        }),
                        ...(index === 1 && {
                          height: "100%",
                          left: "-2.16%",
                          top: "-10.36%",
                          width: "104.32%",
                        }),
                        ...(index === 2 && {
                          height: "100%",
                          left: "-17.16%",
                          top: "0",
                          width: "119.97%",
                        }),
                        ...(index === 3 && { objectPosition: "center" }),
                      }}
                    />
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute bg-gradient-to-b from-[63.322%] from-transparent to-[73.947%] to-black/80 inset-0 rounded-[12px]" />
                </div>

                {/* Blur Effect */}
                <div
                  aria-hidden
                  className="absolute left-[-79.03px] top-[276.27px] h-[147.779px] w-[522.188px] blur-[24.65px]"
                >
                  <div className={`absolute inset-0 backdrop-blur-[51.25px] ${index === 0 ? "bg-black/80" : "bg-black/40"}`} />
                </div>

                {/* Overlay SVG */}
                <div className="absolute bottom-[-176px] left-[-108px] w-[688.905px] h-[469.992px] flex items-center justify-center pointer-events-none">
                  <div className="flex-none rotate-[-21.89deg]">
                    <div className="relative w-[642.676px] h-[248.279px]">
                      <div className={`absolute ${index === 1 || index === 3 ? "inset-[-87.28%_-21.37%_-125.1%_-13.77%]" : "inset-[-86.18%_-39.89%_-67.72%_-16.74%]"}`}>
                        <Image
                          src={step.overlay}
                          alt=""
                          fill
                          sizes="643px"
                          className="block max-w-none size-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inner Shadow */}
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_12px_0px_rgba(255,255,255,0.25)]" />

                {/* Content */}
                <div className="absolute inset-0 px-[18px] py-[20px] flex flex-col justify-between">
                  {/* Progress Dots */}
                  <div className="flex gap-[4px] items-start">
                    {Array.from({ length: index + 1 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-[2px] size-[8px] shrink-0"
                      />
                    ))}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-[10px] items-start text-white w-full">
                    <p className="font-sans text-[14px] font-extrabold leading-[1.15] tracking-[1.4px] opacity-80">
                      {step.id}
                    </p>
                    <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.44px]">
                      {step.title}
                    </h3>
                    <p className={`font-sans text-[14px] font-normal leading-normal ${index === 1 ? "w-[315.119px]" : index === 2 ? "w-[279px]" : "max-w-[276px]"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-[50px] flex justify-center">
          <div className="bg-[#121212] h-[20px] rounded-[14.4px] w-[116.199px] p-[4px] flex items-center">
            <div
              className="h-full w-[29.891px] rounded-[23.04px] bg-[linear-gradient(100.21deg,#00ff87_28.56%,#1d6fff_124.97%)] transition-transform duration-150"
              style={{ transform: `translateX(${progress * 78.308}px)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
