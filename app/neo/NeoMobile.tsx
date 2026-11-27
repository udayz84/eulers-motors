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
import InsightsSection from "@/components/sections/NeoInsights";
import { NeoNavbarMobile as NeoHeaderMobile } from "@/components/sections/NeoNavbar";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

const A = "/assets/neo/figma/";
const arrow = "inline-flex h-9 items-center gap-3 rounded bg-gradient-to-r from-[#00e99c] to-[#1685ff] px-3 text-[11px] font-semibold text-white";
const label = "flex items-center gap-2 text-[10px] uppercase before:h-[14px] before:w-[14px] before:bg-[url('/assets/neo/main-image/logo.svg')] before:bg-contain before:bg-center before:bg-no-repeat";

function TechnologyGlowLayer({
  asset,
  outerClass,
  frameClass,
  insetClass,
  rotated = false,
}: {
  asset: string;
  outerClass: string;
  frameClass?: string;
  insetClass: string;
  rotated?: boolean;
}) {
  const image = (
    <div className={`absolute ${insetClass}`}>
      <Image src={`/assets/neo/figma/technology/${asset}.svg`} alt="" fill sizes="1127px" className="max-w-none" />
    </div>
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-0 hidden ${rotated ? "max-[1023px]:flex" : "max-[1023px]:block"} ${outerClass}`}>
      {rotated ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className={`relative flex-none rotate-[15.44deg] ${frameClass ?? ""}`}>{image}</div>
        </div>
      ) : image}
    </div>
  );
}

export default function NeoMobile() {
  const howItWorksRow = useRef<HTMLDivElement>(null);
  useDraggableScroll(howItWorksRow);
  const [howItWorksProgress, setHowItWorksProgress] = useState(0);
  const updateHowItWorksProgress = () => {
    const row = howItWorksRow.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setHowItWorksProgress(maxScroll > 0 ? row.scrollLeft / maxScroll : 0);
  };
  const btn = (title: string) => <a href="#contact" className={arrow}>{title}<b className="bg-[#111] px-2 py-1">❯❯</b></a>;
  return <div id="top" className="min-[1024px]:hidden overflow-x-clip bg-white font-display text-[#111]">
    <NeoHeaderMobile />
    <main>
      <NeoMainImageMobile />
      <NeoAboutMobile />
      <section id="technology" className="px-4 py-8 max-[1023px]:flex max-[1023px]:w-full max-[1023px]:flex-col max-[1023px]:items-start max-[1023px]:gap-8 max-[1023px]:px-5 max-[1023px]:pb-5 max-[1023px]:pt-[42px] min-[640px]:max-[1023px]:gap-10 min-[640px]:max-[1023px]:px-8 min-[640px]:max-[1023px]:pt-12">
        <div className="max-[1023px]:mx-auto max-[1023px]:flex max-[1023px]:w-full max-[1023px]:max-w-[353px] max-[1023px]:flex-col max-[1023px]:items-start max-[1023px]:gap-[14px] min-[640px]:max-[1023px]:max-w-[736px]">
          <div className={`${label} max-[1023px]:text-[12px] max-[1023px]:font-sans max-[1023px]:font-normal max-[1023px]:uppercase max-[1023px]:text-[#121212]`}>Technology</div>
          <h2 className="mt-3 text-[22px] font-semibold leading-tight max-[1023px]:mt-0 max-[1023px]:self-stretch max-[1023px]:font-display max-[1023px]:text-[28px] max-[1023px]:font-semibold max-[1023px]:leading-[1.15] max-[1023px]:tracking-[-0.56px] max-[1023px]:text-[#121212] min-[640px]:max-[1023px]:text-[36px]">Your vehicle tells you<br />what&apos;s happening.</h2>
          <p className="mt-3 text-[11px] leading-[1.4] max-[1023px]:mt-0 max-[1023px]:w-[318.758px] max-[1023px]:max-w-full max-[1023px]:font-sans max-[1023px]:text-[12px] max-[1023px]:font-normal max-[1023px]:leading-normal max-[1023px]:text-[#121212] min-[640px]:max-[1023px]:w-full min-[640px]:max-[1023px]:max-w-[650px] min-[640px]:max-[1023px]:text-[14px]">No manuals, no guessing. Everything you need to know sits on your phone and on your dashboard.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 max-[1023px]:mx-auto max-[1023px]:mt-0 max-[1023px]:w-full max-[1023px]:max-w-[353px] max-[1023px]:gap-3 min-[640px]:max-[1023px]:max-w-[736px] min-[640px]:max-[1023px]:gap-4">
          {[
            { tag: "SHEPHERD APP", title: "Track your vehicle from your phone", text: "Live location, battery, trip history and anti-theft alerts.", src: "technology/tech-image-1.png" },
            { tag: "XAVIER\u2122 CLUSTER", title: "See speed, charge and distance at a glance", text: "See speed, charge and distance at a glance", src: "technology/tech-image-2.png" },
            { tag: "BUILT FOR OUR ROADS", title: "0.8mm metal body. 13% thicker.", text: "Hill assist for smoother climbs with heavy loads.", src: "technology/tech-image-4.png" },
            { tag: "BATTERY & CHARGING", title: "Charge with a 16-amp socket.", text: "Charge from zero to full in about 3.5 hours.", src: "technology/tech-image-5.png" },
          ].map((item, i) => {
            const wide = i === 0 || i === 3;
            const productCutout = i === 1 || i === 2;
            return (
              <article key={item.tag} className={`relative ${wide ? "col-span-2 min-h-[170px]" : "min-h-[205px]"} overflow-hidden rounded-md bg-[#0b2630] p-3 text-white max-[1023px]:rounded-[6px] max-[1023px]:bg-[#121212] max-[1023px]:p-0 ${wide ? "max-[1023px]:h-[180px] max-[1023px]:min-h-0" : "max-[1023px]:h-[220px] max-[1023px]:min-h-0"} min-[640px]:max-[1023px]:col-span-1 min-[640px]:max-[1023px]:h-[230px]`}>
                {i === 0 && <Image src="/assets/neo/figma/technology/technology-card-shepherd-full.png" alt="" width={3061} height={1053} quality={100} sizes="353px" className="absolute left-0 top-0 hidden h-full w-full max-w-none object-cover max-[1023px]:z-[1] max-[1023px]:left-[-25.81%] max-[1023px]:block max-[1023px]:w-[148.23%]" />}
                {i === 3 && <Image src="/assets/neo/figma/technology/technology-card-shepherd-full.png" alt="" width={3061} height={1053} quality={100} sizes="353px" className="absolute left-0 top-0 hidden h-full w-full max-w-none object-cover max-[1023px]:z-[1] max-[1023px]:left-[-37.32%] max-[1023px]:block max-[1023px]:w-[164.7%]" />}
                {i === 3 && <Image src="/assets/neo/figma/technology/technology-card-charging-full.png" alt="" width={2249} height={1180} quality={100} sizes="353px" className="absolute inset-0 hidden h-full w-full max-w-none object-cover max-[1023px]:z-[1] max-[1023px]:block" />}
                {wide && i === 0 ? (
                  <Image
                    src={`${A}${item.src}`}
                    alt=""
                    width={383}
                    height={132}
                    sizes="353px"
                    className="absolute left-0 top-0 h-full w-full max-w-none object-cover opacity-65 max-[1023px]:hidden"
                  />
                ) : (
                  <Image
                    src={`${A}${item.src}`}
                    alt=""
                    fill
                    sizes={wide ? "90vw" : "45vw"}
                    className={productCutout ? "object-contain object-right-bottom opacity-90 max-[1023px]:hidden" : `object-cover opacity-65 ${i === 3 ? "max-[1023px]:hidden" : "max-[1023px]:opacity-100"}`}
                  />
                )}
                {i === 1 && <Image src={`${A}${item.src}`} alt="" width={187} height={89} quality={100} sizes="187px" className="absolute left-[38.04px] top-[140.66px] z-[1] hidden h-[89px] w-[187px] max-w-none object-cover max-[1023px]:block" />}
                {i === 2 && (
                  <div className="absolute left-[calc(50%+14.73px)] top-[126.66px] z-[1] hidden h-[116.36px] w-[242.285px] -translate-x-1/2 -scale-y-100 rotate-180 max-[1023px]:block">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image src={`${A}${item.src}`} alt="" width={1470} height={1070} quality={100} sizes="242px" className="absolute left-[7.38%] top-[4.75%] h-full w-[65.88%] max-w-none object-cover" />
                    </div>
                  </div>
                )}
                {i === 0 && <>
                  <TechnologyGlowLayer asset="ellipse-3433" outerClass="bottom-[-152.19px] right-[202.16px] h-[336.464px] w-[360.853px] items-center justify-center" frameClass="h-[265.945px] w-[300.904px]" insetClass="inset-[-69.07%_-61.05%]" rotated />
                  <TechnologyGlowLayer asset="ellipse-3430" outerClass="bottom-[-85.8px] right-[-17.94px] h-[845.877px] w-[875.273px] items-center justify-center" frameClass="h-[678.493px] w-[720.63px]" insetClass="inset-[-27.07%_-25.49%]" rotated />
                </>}
                {i === 1 && <>
                  <TechnologyGlowLayer asset="ellipse-3432" outerClass="bottom-[-176.64px] left-[calc(50%+99.52px)] h-[261.979px] w-[275.044px] -translate-x-1/2" insetClass="inset-[-46.98%_-44.75%]" />
                  <TechnologyGlowLayer asset="ellipse-3434" outerClass="bottom-[-129.64px] left-[calc(50%+109.81px)] h-[178.189px] w-[201.612px] -translate-x-1/2" insetClass="inset-[-69.07%_-61.05%]" />
                </>}
                {i === 2 && <>
                  <TechnologyGlowLayer asset="ellipse-3432" outerClass="bottom-[-166.64px] right-[-148.52px] h-[261.979px] w-[275.044px]" insetClass="inset-[-46.98%_-44.75%]" />
                  <TechnologyGlowLayer asset="ellipse-3434" outerClass="bottom-[-119.64px] right-[-108.52px] h-[178.189px] w-[201.612px]" insetClass="inset-[-69.07%_-61.05%]" />
                </>}
                {i === 3 && <>
                  <TechnologyGlowLayer asset="ellipse-3430" outerClass="bottom-[-315.8px] right-[32.06px] h-[845.877px] w-[875.273px] items-center justify-center" frameClass="h-[678.493px] w-[720.63px]" insetClass="inset-[-27.07%_-25.49%]" rotated />
                  <TechnologyGlowLayer asset="ellipse-3433" outerClass="bottom-[-241.23px] right-[238.19px] h-[336.464px] w-[360.853px] items-center justify-center" frameClass="h-[265.945px] w-[300.904px]" insetClass="inset-[-69.07%_-61.05%]" rotated />
                </>}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#06242b]/90 via-[#06242b]/45 to-transparent ${wide ? "max-[1023px]:hidden" : "max-[1023px]:hidden"}`} />
                <div className={`relative z-[1] max-w-[190px] max-[1023px]:absolute max-[1023px]:z-[2] max-[1023px]:left-[18px] max-[1023px]:flex max-[1023px]:max-w-none max-[1023px]:flex-col max-[1023px]:items-start max-[1023px]:justify-center max-[1023px]:gap-2 ${wide ? "max-[1023px]:top-[18px] max-[1023px]:w-[260px]" : i === 1 ? "max-[1023px]:top-[18.66px] max-[1023px]:w-[146px]" : "max-[1023px]:top-[18.66px] max-[1023px]:w-[143px]"}`}>
                  <span className="text-[8px] font-bold tracking-[1px] max-[1023px]:block max-[1023px]:w-full max-[1023px]:font-sans max-[1023px]:text-[10px] max-[1023px]:leading-[1.15] max-[1023px]:tracking-[1px] max-[1023px]:opacity-80">{item.tag}</span>
                  <h3 className={`mt-2 text-[14px] font-semibold leading-tight max-[1023px]:mt-0 max-[1023px]:font-display max-[1023px]:text-[16px] max-[1023px]:font-semibold max-[1023px]:leading-[1.15] max-[1023px]:tracking-[-0.32px] ${wide ? i === 0 ? "max-[1023px]:w-[201.607px]" : "max-[1023px]:w-[135px]" : "max-[1023px]:w-full"}`}>{item.title}</h3>
                  <p className={`mt-2 text-[9px] leading-[1.35] max-[1023px]:mt-0 max-[1023px]:font-sans max-[1023px]:text-[11px] max-[1023px]:font-normal max-[1023px]:leading-normal ${wide ? i === 0 ? "max-[1023px]:w-[169.019px]" : "max-[1023px]:w-[138px]" : "max-[1023px]:w-full"}`}>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <NeoSavingsCalculatorMobile />
      <section className="flex flex-col items-center gap-[32px] overflow-hidden bg-white px-0 pb-5 pt-[42px] min-[640px]:max-[1023px]:gap-8 min-[640px]:max-[1023px]:pt-12">
        <header className="flex w-full flex-col items-center gap-[14px] text-center">
          <div className={`${label} justify-center text-[12px]`}>How it works</div>
          <h2 className="m-0 whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] min-[640px]:max-[1023px]:text-[36px]">
            A day with Neo.
          </h2>
        </header>
        <div
          ref={howItWorksRow}
          onScroll={updateHowItWorksProgress}
          className="no-scrollbar flex w-full cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth max-[767px]:pb-[56px] min-[640px]:max-[1023px]:gap-4 min-[640px]:max-[1023px]:px-8"
          aria-label="How it works steps"
        >
          {[
            { title: "Choose your Neo", copy: "Choose the vehicle for your route: HiRANGE for long days, HiCITY for city trips.", crop: "!h-[186.98%] !w-[253.54%] !left-[-10.74%] !top-[-15.41%]" },
            { title: "Charge and go", copy: "Charge at home or while out. Full in about 3.5 hours.", crop: "!h-[80.93%] !w-[96.95%] !left-[1.53%] !top-[-3.96%]" },
            { title: "Track your day", copy: "View your vehicle, trips, and battery on your phone. Stay informed before anyone else.", crop: "!h-[99.98%] !w-[137.74%] !left-[-33.75%] !top-0" },
            { title: "Keep earning", copy: "Worry less about your vehicle. Doorstep servicing takes 30 minutes to 2 hours.", crop: "!h-[99.94%] !w-[115.75%] !left-[-4.62%] !top-[0.02%]" },
          ].map((step, i) => (
            <article key={step.title} className={`relative flex h-[300px] w-[320px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[12px] border-4 border-white p-5 text-white shadow-[0_12px_12px_rgba(33,158,182,0.2)] max-[767px]:shadow-[0_12px_18px_rgba(33,158,182,0.2)] min-[640px]:max-[1023px]:h-[360px] min-[640px]:max-[1023px]:w-[420px] ${i === 0 ? "ml-5 scroll-ml-5 min-[640px]:max-[1023px]:ml-0" : ""}`}>
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]">
                <Image src={`/assets/neo/how-it-works/step-${i + 1}.png`} alt="" fill quality={100} unoptimized={i === 0} sizes="320px" className={`max-w-none object-cover ${step.crop}`} />
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
        <div className="relative flex h-5 w-[116.2px] shrink-0 items-center rounded-[14.4px] bg-[#121212] p-1 max-[767px]:-mt-[56px]" role="progressbar" aria-label="How it works card position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(howItWorksProgress * 100)}>
          <div className="h-3 w-[29.9px] rounded-full bg-[linear-gradient(100.21deg,#00ff87_28.559%,#1d6fff_124.97%)] transition-transform duration-150" style={{ transform: `translateX(${howItWorksProgress * 78.3}px)` }} />
        </div>
      </section>
      <EulerPrimeBannerMobile neoTablet />
      <NeoRoadStories mode="mobile" />
      <NeoEnterpriseMobile />
      <InsightsSection />
      <NeoContactSection mode="mobile" />
    </main>
    <NeoFooterMobile />
  </div>;
}
