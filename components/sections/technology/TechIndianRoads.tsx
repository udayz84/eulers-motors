"use client";

import { Fragment, useEffect, useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const A = "/assets/technology-page";

const PROBLEM_GRADIENT =
  "linear-gradient(260.845deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";
const EULER_GRADIENT =
  "linear-gradient(-78.921deg, rgb(14,47,109) 63.511%, rgb(29,111,255) 87.226%), linear-gradient(258.187deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";

const CARDS = [
  {
    label: "Dust",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "199.98%", left: "-11.42%", top: "-10.38%", width: "289.09%" },
    problem: ["Dust gets into everything and kills electronics."],
    euler: ["The battery box and motor are sealed to IP67. Dust", "stays outside."],
  },
  {
    label: "Rain",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "220.88%", left: "-115.98%", top: "-26.52%", width: "319.31%" },
    problem: ["Flooded roads stop work for days every monsoon."],
    euler: ["The pack is water sealed and the floor is raised. You", "keep running."],
  },
  {
    label: "Heavy loads",
    pill: `${A}/indian__imgRectangle1618873353.svg`,
    pillW: 180.892,
    crop: { height: "267.05%", left: "-44.54%", top: "-150.74%", width: "289.09%" },
    problem: ["Overloading is normal, and it breaks lighter vehicles."],
    euler: ["A steel frame rated well past the load on the paperwork."],
  },
  {
    label: "Daily use",
    pill: `${A}/indian__imgRectangle1618873355.svg`,
    pillW: 160.892,
    crop: { height: "223.93%", left: "-171.77%", top: "-123.93%", width: "323.72%" },
    problem: ["Two shifts a day wears a vehicle out fast."],
    euler: ["Tested to 200,000 km. Service every 10,000, not every month."],
  },
  {
    label: "Heat",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "199.98%", left: "-208.51%", top: "-14.64%", width: "308.51%" },
    problem: ["Forty five degrees drains a battery and shortens its life."],
    euler: ["Liquid cooling holds the pack in its safe range all summer."],
  },
];

/** TECHNOLOGY page — "Built for Indian roads." banner (Figma 2990:12839, 393×442). */
export default function TechIndianRoads() {
  const desktopRowRef = useRef<HTMLDivElement>(null);
  const mobileRowRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = [
      { row: desktopRowRef.current, track: desktopTrackRef.current },
      { row: mobileRowRef.current, track: mobileTrackRef.current },
    ].filter(
      (item): item is { row: HTMLDivElement; track: HTMLDivElement } => Boolean(item.row && item.track),
    );
    if (!sections.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visible = new Set<HTMLDivElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const row = entry.target as HTMLDivElement;
        if (entry.isIntersecting) visible.add(row);
        else visible.delete(row);
      });
    }, { threshold: 0.15 });
    sections.forEach(({ row }) => observer.observe(row));

    let animationFrame = 0;

    const animate = (time: number) => {
      if (!reducedMotion) sections.forEach(({ row, track }) => {
        const firstCard = track.querySelector<HTMLElement>('[data-carousel-copy="0"]');
        const repeatedCard = track.querySelector<HTMLElement>('[data-carousel-copy="1"]');
        const loopDistance = firstCard && repeatedCard ? repeatedCard.offsetLeft - firstCard.offsetLeft : 0;
        if (!visible.has(row) || loopDistance <= 0) return;

        const offset = Number(track.dataset.carouselOffset ?? "0");
        const nextOffset = (offset + 0.35) % loopDistance;
        track.dataset.carouselOffset = String(nextOffset);
        track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="overflow-x-clip bg-[#d4dbec]" aria-label="Built for Indian roads">
      <div className="mx-auto hidden w-full max-w-none flex-col items-center justify-center gap-9 px-0 py-[42px] lg:flex">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-[700px] flex-col items-center gap-4">
            <Eyebrow label="Built for here" />
            <h2 className="whitespace-nowrap text-center font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink">
              Built for Indian roads.
            </h2>
          </div>
          <p className="w-[700px] text-center font-sans text-[16px] leading-normal text-ink">
            From busy city streets to uneven roads and heavy loads, every detail is built to perform.
          </p>
        </div>

        <div className="relative m-0 w-full overflow-visible bg-[#d4dbec] p-0">
          <div ref={desktopRowRef} id="indian-roads-row" className="snap-row snap-center-mobile m-0 h-[254px] w-full items-start gap-6 bg-[#d4dbec] p-0" style={{ scrollSnapType: "none", overflowAnchor: "none" }}>
            <div aria-hidden="true" className="shrink-0" style={{ width: "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 36px)" }} />
            <div ref={desktopTrackRef} className="flex w-max shrink-0 gap-6" style={{ willChange: "transform" }}>
              {[0, 1].map((copy) => (
                <Fragment key={`desktop-copy-${copy}`}>
                {CARDS.map((c) => (
                  <article key={`${copy}-${c.label}`} aria-hidden={copy === 1} data-carousel-copy={copy} data-carousel-card className="relative h-[254px] w-[353px] shrink-0 snap-start">
              <div className="absolute left-[19.5px] top-[6.18px] flex items-center gap-2">
                <div className="absolute left-[-13px] top-[-5.53px] h-[48.328px]" style={{ width: c.pillW }}>
                  <img src={c.pill} alt="" className="absolute inset-0 size-full max-w-none" />
                </div>
                <div className="relative h-[25.095px] w-[26.039px] shrink-0 overflow-hidden">
                  <img src={`${A}/indian__imgChatGptImage.png`} alt="" className="absolute max-w-none" style={c.crop} />
                </div>
                <p className="relative whitespace-nowrap text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">{c.label}</p>
              </div>
              <div className="absolute left-[-0.5px] top-[34.31px] flex h-[220px] w-[353px] flex-col items-start gap-4 rounded-[10px] bg-white p-4">
                <div className="flex w-full flex-col items-start gap-3">
                  <p className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent" style={{ backgroundImage: PROBLEM_GRADIENT }}>The problem</p>
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink">{c.problem.join(" ")}</p>
                </div>
                <div className="relative h-0 w-full">
                  <img src={`${A}/indian__imgLine110.svg`} alt="" className="absolute inset-[-1px_0_0_0] block size-full max-w-none" />
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <p className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent" style={{ backgroundImage: EULER_GRADIENT }}>What Euler does</p>
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink">{c.euler.join(" ")}</p>
                </div>
              </div>
                  </article>
                ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <PagerBar rowId="indian-roads-row" className="bg-white/50 [&>div]:bg-ink" />
      </div>

      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center justify-center gap-8 px-5 py-[42px] lg:hidden">
        <div className="flex w-full flex-col items-start gap-[14px]">
          <Eyebrow label="Built for here" />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink">
            Built for Indian roads.
          </h2>
          <p className="w-[306.73px] font-sans text-[12px] font-normal leading-normal text-ink">
            From busy city streets to uneven roads and heavy loads, every detail is built to
            perform.
          </p>
        </div>

        <div className="relative left-1/2 m-0 w-screen -translate-x-1/2 p-0">
          <div className="relative">
          <div ref={mobileRowRef} className="snap-row snap-center-mobile m-0 gap-2 p-0" style={{ scrollSnapType: "none", overflowAnchor: "none" }}>
            <div aria-hidden="true" className="shrink-0" style={{ width: "calc(20px - 8px)" }} />
            <div ref={mobileTrackRef} className="flex w-max shrink-0 gap-2" style={{ willChange: "transform" }}>
              {[0, 1].map((copy) => (
                <Fragment key={`mobile-copy-${copy}`}>
                {CARDS.map((c) => (
                  <article key={`${copy}-${c.label}`} aria-hidden={copy === 1} data-carousel-copy={copy} data-carousel-card className="relative h-[202.13px] w-[353px] shrink-0 snap-start">
              <div className="absolute left-[19.5px] top-[6.18px] flex items-center gap-2">
                <div className="absolute left-[-13px] top-[-5.53px] h-[48.328px]" style={{ width: c.pillW }}>
                  <img src={c.pill} alt="" className="absolute inset-0 size-full max-w-none" />
                </div>
                <div className="relative h-[17.925px] w-[18.599px] shrink-0">
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <img
                      src={`${A}/indian__imgChatGptImage.png`}
                      alt=""
                      className="absolute left-[-11.42%] top-[-10.38%] h-[199.98%] w-[289.09%] max-w-none"
                    />
                  </div>
                </div>
                <p className="relative whitespace-nowrap text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">
                  {c.label}
                </p>
              </div>

              <div className="absolute bottom-0 left-[-0.5px] top-[34.31px] flex w-[353px] flex-col items-start gap-3 rounded-[10px] bg-white p-4">
                <div className="flex w-full flex-col items-start gap-3">
                  <p
                    className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent"
                    style={{ backgroundImage: PROBLEM_GRADIENT }}
                  >
                    The problem
                  </p>
                  <p className="text-[12px] font-semibold leading-[1.4] tracking-[-0.24px] text-ink">
                    {c.problem.join(" ")}
                  </p>
                </div>
                <div className="relative h-0 w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img src={`${A}/indian__imgLine110.svg`} alt="" className="block size-full max-w-none" />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <p
                    className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent"
                    style={{ backgroundImage: EULER_GRADIENT }}
                  >
                    What Euler does
                  </p>
                  <p className="text-[12px] font-semibold leading-[1.4] tracking-[-0.24px] text-ink">
                    {c.euler.join(" ")}
                  </p>
                </div>
              </div>
                  </article>
                ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
