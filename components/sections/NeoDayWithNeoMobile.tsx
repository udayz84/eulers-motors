"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

const STEPS = [
  {
    id: "01",
    title: "Choose your Neo",
    description: "Choose the vehicle for your route: HiRANGE for long days, HiCITY for city trips.",
    image: "/assets/step1-bg.png",
    imageBox: { left: "-10.74%", top: "-15.41%", width: "253.54%", height: "186.98%" },
    overlay: "/assets/overlay-1.svg",
    overlayBox: "inset-[-64.71%_-39.89%_-19.95%_-16.74%]",
    overlayPosition: "left-[-68px] bottom-[-216px]",
  },
  {
    id: "02",
    title: "Charge and go",
    description: "Charge at home or while out. Full in about 3.5 hours.",
    image: "/assets/step2-bg.png",
    imageBox: { left: "1.53%", top: "-3.96%", width: "96.95%", height: "80.93%" },
    overlay: "/assets/overlay-2.svg",
    overlayBox: "inset-[-64.71%_-39.89%_-19.95%_-16.74%]",
    overlayPosition: "left-[-68px] bottom-[-226px]",
  },
  {
    id: "03",
    title: "Track your day",
    description: "View your vehicle, trips, and battery on your phone. Stay informed before anyone else.",
    image: "/assets/step3-bg.png",
    imageBox: { left: "-33.75%", top: "0", width: "137.74%", height: "99.98%" },
    overlay: "/assets/overlay-1.svg",
    overlayBox: "inset-[-64.71%_-39.89%_-19.95%_-16.74%]",
    overlayPosition: "left-[-68px] bottom-[-231px]",
  },
  {
    id: "04",
    title: "Keep earning",
    description: "Worry less about your vehicle. Doorstep servicing takes 30 minutes to 2 hours.",
    image: "/assets/step4-bg.png",
    imageBox: { left: "-4.62%", top: "0.02%", width: "115.75%", height: "99.94%" },
    overlay: "/assets/overlay-2.svg",
    overlayBox: "inset-[-64.71%_-39.89%_-19.95%_-16.74%]",
    overlayPosition: "left-[-68px] bottom-[-226px]",
  },
];

export default function NeoDayWithNeoMobile() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setProgress(maxScroll > 0 ? row.scrollLeft / maxScroll : 0);
  }, []);

  return (
    <section className="flex w-full flex-col items-center gap-8 bg-[#f3f4f5] px-5 pb-5 pt-[42px] lg:hidden" aria-label="A day with Neo">
      <div className="flex w-full max-w-[353px] flex-col items-center justify-center gap-[14px] text-center">
        <div className="flex items-center gap-[6px]">
          <Image src="/assets/logo-icon.svg" alt="" width={14} height={14} aria-hidden />
          <p className="whitespace-nowrap font-sans text-[12px] font-normal leading-normal text-[#121212]">
            HOW IT WORKS
          </p>
        </div>
        <h2 className="whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212]">
          A day with Neo.
        </h2>
      </div>

      <div
        ref={rowRef}
        onScroll={updateProgress}
        className="no-scrollbar flex w-full max-w-[353px] snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x"
        aria-label="How it works steps"
      >
        {STEPS.map((step, index) => (
          <article
            key={step.id}
            className="relative h-[300px] w-[320px] shrink-0 snap-start overflow-hidden rounded-[12px] border-4 border-solid border-white shadow-[0px_12px_12px_0px_rgba(33,158,182,0.2)]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px]">
              <div className="absolute inset-0 rounded-[12px] bg-white" />
              <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                <Image
                  src={step.image}
                  alt=""
                  width={418}
                  height={386}
                  className="absolute max-w-none object-cover"
                  style={step.imageBox}
                />
              </div>
              <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-[63.322%] from-transparent to-[73.947%] to-black/80" />
            </div>

            <div aria-hidden className="absolute top-[276.27px] left-[-79.03px] h-[147.779px] w-[522.188px] blur-[24.65px]">
              <div className={`absolute inset-0 ${index === 0 ? "bg-black/80 backdrop-blur-[51.25px]" : "bg-black/40 backdrop-blur-[79.15px]"}`} />
            </div>

            <div aria-hidden className={`pointer-events-none absolute ${step.overlayPosition} flex h-[469.992px] w-[688.905px] items-center justify-center`}>
              <div className={`flex-none ${index === 1 || index === 3 ? "-scale-y-100 rotate-[-158.11deg]" : "rotate-[-21.89deg]"}`}>
                <div className="relative h-[248.279px] w-[642.676px]">
                  <div className={`absolute ${step.overlayBox}`}>
                    <Image src={step.overlay} alt="" fill sizes="643px" className="block max-w-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_12px_0px_rgba(255,255,255,0.25)]" />

            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div className="flex items-start gap-1">
                {Array.from({ length: index + 1 }).map((_, i) => (
                  <span key={i} className="size-2 shrink-0 rounded-[2px] bg-white" />
                ))}
              </div>
              <div className="flex w-full flex-col items-start gap-2 text-white">
                <p className="font-sans text-[12px] font-bold leading-[1.15] tracking-[1.2px] opacity-80">{step.id}</p>
                <h3 className={`font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.4px] ${index === 2 ? "text-[22px] tracking-[-0.44px]" : ""}`}>
                  {step.title}
                </h3>
                <p className={`font-sans text-[12px] font-normal leading-normal ${index === 1 ? "w-[315.119px]" : index === 0 ? "w-[270px]" : "w-[275px]"}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="relative flex h-5 w-[116.199px] shrink-0 items-center rounded-[14.4px] bg-[#121212] p-1"
        role="progressbar"
        aria-label="How it works carousel position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-3 w-[29.891px] rounded-[23.04px] bg-[linear-gradient(100.21deg,#00ff87_28.559%,#1d6fff_124.97%)] transition-transform duration-150"
          style={{ transform: `translateX(${progress * 78.308}px)` }}
        />
      </div>
    </section>
  );
}
