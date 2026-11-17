"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { NeoAboutMobile } from "@/components/sections/NeoAbout";
import NeoContactSection from "@/components/sections/NeoContactSection";
import NeoSavingsCalculatorMobile from "@/components/sections/NeoSavingsCalculatorMobile";
import { NeoFooterMobile } from "@/components/sections/NeoFooter";
import { NeoEnterpriseMobile } from "@/components/sections/NeoEnterprise";
import NeoRoadStories from "@/components/sections/NeoRoadStories";
import NeoMainImageMobile from "@/components/sections/NeoMainImageMobile";
import EulerPrimeBannerMobile from "@/components/sections/EulerPrimeBannerMobile";
import InsightsSection from "@/components/sections/Insights";

const A = "/assets/neo/figma/";
const arrow = "inline-flex h-9 items-center gap-3 rounded bg-gradient-to-r from-[#00e99c] to-[#1685ff] px-3 text-[11px] font-semibold text-white";
const label = "flex items-center gap-2 text-[10px] uppercase before:h-[14px] before:w-[14px] before:bg-[url('/assets/neo/main-image/logo.svg')] before:bg-contain before:bg-center before:bg-no-repeat";

export default function NeoMobile() {
  const howItWorksRow = useRef<HTMLDivElement>(null);
  const [howItWorksProgress, setHowItWorksProgress] = useState(0);
  const updateHowItWorksProgress = () => {
    const row = howItWorksRow.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setHowItWorksProgress(maxScroll > 0 ? row.scrollLeft / maxScroll : 0);
  };
  const btn = (title: string) => <a href="#contact" className={arrow}>{title}<b className="bg-[#111] px-2 py-1">❯❯</b></a>;
  return <div id="top" className="min-[768px]:hidden overflow-hidden bg-white font-display text-[#111]">
    <main>
      <NeoMainImageMobile />
      <NeoAboutMobile />
      <section id="technology" className="px-4 py-8">
        <div className={label}>Technology</div>
        <h2 className="mt-3 text-[22px] font-semibold leading-tight">Your vehicle tells you<br />what&apos;s happening.</h2>
        <p className="mt-3 text-[11px] leading-[1.4]">No manuals, no guessing. Everything you need to know sits on your phone and on your dashboard.</p>
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {[
            { tag: "SHEPHERD APP", title: "Track your vehicle from your phone", text: "Live location, battery, trip history and anti-theft alerts.", src: "technology/tech-image-1.png" },
            { tag: "XAVIER\u2122 CLUSTER", title: "See speed, charge and distance at a glance", text: "See speed, charge and distance at a glance", src: "technology/tech-image-2.png" },
            { tag: "BUILT FOR OUR ROADS", title: "0.8mm metal body. 13% thicker.", text: "Hill assist for smoother climbs with heavy loads.", src: "technology/tech-image-4.png" },
            { tag: "BATTERY & CHARGING", title: "Charge with a 16-amp socket.", text: "Charge from zero to full in about 3.5 hours.", src: "technology/tech-image-5.png" },
          ].map((item, i) => {
            const wide = i === 0 || i === 3;
            const productCutout = i === 1 || i === 2;
            return (
              <article key={item.tag} className={`relative ${wide ? "col-span-2 min-h-[170px]" : "min-h-[205px]"} overflow-hidden rounded-md bg-[#0b2630] p-3 text-white`}>
                <Image
                  src={`${A}${item.src}`}
                  alt=""
                  fill
                  sizes={wide ? "90vw" : "45vw"}
                  className={productCutout ? "object-contain object-right-bottom opacity-90" : "object-cover opacity-65"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06242b]/90 via-[#06242b]/45 to-transparent" />
                <div className="relative z-[1] max-w-[190px]">
                  <span className="text-[8px] font-bold tracking-[1px]">{item.tag}</span>
                  <h3 className="mt-2 text-[14px] font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-2 text-[9px] leading-[1.35]">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <NeoSavingsCalculatorMobile />
      <section className="flex flex-col items-center gap-[32px] overflow-hidden bg-white px-5 pb-5 pt-[42px]">
        <header className="flex w-full max-w-[353px] flex-col items-center gap-[14px] text-center">
          <div className={`${label} justify-center text-[12px]`}>How it works</div>
          <h2 className="m-0 whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px]">A day with Neo.</h2>
        </header>
        <div
          ref={howItWorksRow}
          onScroll={updateHowItWorksProgress}
          className="no-scrollbar flex w-full max-w-[353px] snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth"
          aria-label="How it works steps"
        >
          {[
            { title: "Choose your Neo", copy: "Choose the vehicle for your route: HiRANGE for long days, HiCITY for city trips.", crop: "!h-[186.98%] !w-[253.54%] !left-[-10.74%] !top-[-15.41%]" },
            { title: "Charge and go", copy: "Charge at home or while out. Full in about 3.5 hours.", crop: "!h-[80.93%] !w-[96.95%] !left-[1.53%] !top-[-3.96%]" },
            { title: "Track your day", copy: "View your vehicle, trips, and battery on your phone. Stay informed before anyone else.", crop: "!h-[99.98%] !w-[137.74%] !left-[-33.75%] !top-0" },
            { title: "Keep earning", copy: "Worry less about your vehicle. Doorstep servicing takes 30 minutes to 2 hours.", crop: "!h-[99.94%] !w-[115.75%] !left-[-4.62%] !top-[0.02%]" },
          ].map((step, i) => (
            <article key={step.title} className="relative flex h-[300px] w-[320px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[12px] border-4 border-white p-5 text-white shadow-[0_12px_12px_rgba(33,158,182,0.2)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]">
                <Image src={`/assets/neo/how-it-works/step-${i + 1}.png`} alt="" fill sizes="320px" className={`max-w-none object-cover ${step.crop}`} />
                <div aria-hidden className="absolute inset-0 rounded-[12px] bg-[linear-gradient(180deg,transparent_63.322%,rgba(0,0,0,.8)_73.947%)]" />
                <Image src={i % 2 === 0 ? "/assets/overlay-1.svg" : "/assets/overlay-2.svg"} alt="" width={1007} height={630} className="absolute -bottom-[216px] -left-[68px] h-[470px] w-[689px] max-w-none rotate-[-21.89deg] opacity-90" />
              </div>
              <div className="relative z-[1] flex gap-1">
                {Array.from({ length: i + 1 }, (_, marker) => <i key={marker} className="size-2 rounded-[2px] bg-white" />)}
              </div>
              <div className="relative z-[1] flex flex-col items-start gap-2 text-white">
                <span className="font-sans text-[12px] font-bold leading-[1.15] tracking-[1.2px] opacity-80">0{i + 1}</span>
                <h3 className="m-0 font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.4px]">{step.title}</h3>
                <p className="m-0 max-w-[275px] font-sans text-[12px] font-normal leading-normal">{step.copy}</p>
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_12px_rgba(255,255,255,.25)]" />
            </article>
          ))}
        </div>
        <div className="relative flex h-5 w-[116.2px] shrink-0 items-center rounded-[14.4px] bg-[#121212] p-1" role="progressbar" aria-label="How it works card position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(howItWorksProgress * 100)}>
          <div className="h-3 w-[29.9px] rounded-full bg-[linear-gradient(100.21deg,#00ff87_28.559%,#1d6fff_124.97%)] transition-transform duration-150" style={{ transform: `translateX(${howItWorksProgress * 78.3}px)` }} />
        </div>
      </section>
      <EulerPrimeBannerMobile />
      <NeoRoadStories mode="mobile" />
      <NeoEnterpriseMobile />
      <InsightsSection />
      <NeoContactSection mode="mobile" />
    </main>
    <NeoFooterMobile />
  </div>;
}
