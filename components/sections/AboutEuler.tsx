"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

const CARDS = [
  {
    id: 1,
    badge: "Purpose",
    title: "Built for Businesses",
    description: "We build electric commercial vehicles that help businesses move more and spend less.",
    stat: "Founded in New Delhi, 2018",
    mobileImage: "/assets/about-euler/card-1-mobile.png",
    desktopImage: "/assets/about-euler/card-1-desktop.png",
  },
  {
    id: 2,
    badge: "Customer First",
    title: "Every Decision Starts Here",
    description: "We build around real customer needs, not assumptions.",
    stat: "1000+ Daily Business Trips",
    mobileImage: "/assets/about-euler/card-2-mobile.png",
    desktopImage: "/assets/about-euler/card-2-desktop.png",
  },
  {
    id: 3,
    badge: "Ownership",
    title: "We Own the Outcome",
    description: "We take responsibility for every vehicle on the road, end to end.",
    stat: "24/7 Roadside Support",
    mobileImage: "/assets/about-euler/card-3-mobile.png",
    desktopImage: "/assets/about-euler/card-3-desktop.png",
  },
];

/**
 * About Euler section (Figma 3223:16874).
 * Horizontal scrolling cards showcasing Euler's mission and values.
 * Mobile: snap scroll with dots. Desktop: horizontal row with carousel.
 */
export default function AboutEuler() {
  const [active, setActive] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const cardStep = () => {
    const first = rowRef.current?.querySelector<HTMLElement>("article");
    return first ? first.offsetWidth + 20 : 740;
  };

  const goTo = (index: number) => {
    const row = rowRef.current;
    if (!row) return;
    const len = CARDS.length;
    const next = ((index % len) + len) % len;
    setActive(next);
    row.scrollTo({ left: next * cardStep(), behavior: "smooth" });
  };

  const handleScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const step = cardStep();
    if (step === 0) return;
    const idx = Math.min(
      Math.max(Math.round(row.scrollLeft / step), 0),
      CARDS.length - 1,
    );
    if (idx !== active) setActive(idx);
  };

  return (
    <section className="relative overflow-hidden" aria-label="About Euler">
      {/* Mobile Background */}
      <div className="absolute inset-0 lg:hidden" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)" }} />
      {/* Desktop Background */}
      <div className="absolute inset-0 max-lg:hidden" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)" }} />

      {/* 1440 frame — arrows are positioned against this */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* padded content — desktop 62px 80px, column, gap 42 */}
        <div className="flex w-full flex-col items-center px-[19px] py-[26px] lg:gap-[42px] lg:px-[80px] lg:py-[62px]">
        {/* Header */}
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 lg:hidden">
            <div className="absolute h-[16px] left-[3.43px] top-0 w-[116.978px] overflow-hidden">
              <Image
                src="/assets/about-euler/mobile-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/about-euler/mobile-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
              About Euler
            </p>
          </div>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 max-lg:hidden">
            <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
              <Image
                src="/assets/about-euler/desktop-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
              <Image
                src="/assets/about-euler/desktop-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase whitespace-nowrap">
              About Euler
            </p>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative w-full mt-[26px] lg:mt-0">
          <div
            id="about-euler-snap-row"
            ref={rowRef}
            onScroll={handleScroll}
            className="snap-row snap-center-mobile -mx-[19px] w-[calc(100%+38px)] px-[19px] gap-[20px] lg:relative lg:left-1/2 lg:w-[max(calc(100%+160px),100vw)] lg:-translate-x-1/2 lg:scroll-pl-[max(80px,calc(50vw-640px))] lg:overflow-x-auto lg:px-[max(80px,calc(50vw-640px))] lg:mx-0"
          >
            {CARDS.map((card, index) => (
              <article
                key={card.id}
                className="relative h-[420px] w-[324px] shrink-0 overflow-hidden rounded-[12px] lg:h-[485px] lg:w-[720px] lg:rounded-[20px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden rounded-[12px] lg:rounded-[20px]">
                  <Image
                    src={card.mobileImage}
                    alt=""
                    fill
                    sizes="324px"
                    className="object-cover lg:hidden"
                  />
                </div>

                {/* Desktop Background — gradient + image (Figma 3223:16874) */}
                <div
                  aria-hidden
                  className="absolute inset-0 max-lg:hidden"
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 68.87%, rgba(0, 0, 0, 0.60) 90.7%), url('${card.desktopImage}') lightgray 0px -106.086px / 100% 149.608% no-repeat`,
                  }}
                />

                {/* Gradient Overlay (mobile only) */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[68.873%] to-black/60 to-[90.703%] lg:hidden"
                />

                {/* Info Card */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[308px] rounded-[8px] bg-white/20 p-[12px] backdrop-blur-[9.134px] lg:bottom-[20.36px] lg:left-[20px] lg:translate-x-0 lg:w-[388px] lg:rounded-[10px] lg:p-[16px]">
                  {/* Badge */}
                  <div className="mb-[6px] inline-flex flex-col items-start rounded-[50px] bg-[#d4dbec] px-[10px] py-[4px] lg:mb-[12px]">
                    <span className="text-[12px] font-bold leading-normal text-black lg:text-[12px]">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-[6px] text-[16px] font-bold leading-normal tracking-[-0.32px] text-white lg:mb-[12px] lg:text-[20px] lg:tracking-[-0.4px]">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-[6px] h-[36px] overflow-hidden text-ellipsis text-[12px] font-normal leading-[1.5] text-white lg:mb-[12px] lg:h-[48px] lg:text-[14px]">
                    {card.description}
                  </p>

                  {/* Stat Badge */}
                  <div className="inline-flex items-center rounded-[14.614px] border border-[#6fcf97] border-[0.913px] bg-[rgba(111,207,151,0.24)] px-[6.51px] py-[4.34px] backdrop-blur-[9.134px] lg:rounded-[14.614px] lg:border-[0.913px] lg:px-[6.51px] lg:py-[4.34px]">
                    <span className="whitespace-nowrap text-[12px] font-bold leading-[1.15] tracking-[-0.24px] text-white lg:text-[12px]">
                      {card.stat}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Scroll indicator — desktop sits 42px below the cards, 62px above the section's bottom edge */}
          <div className="bg-[rgba(204,204,204,0.2)] content-stretch z-10 mx-auto mt-[26px] flex h-[20px] w-[116.199px] shrink-0 flex-col items-start justify-center rounded-[14.4px] p-[4px] lg:mt-[42px]">
            <div
              className="h-full rounded-[23.04px] bg-white transition-transform duration-300 ease-out"
              style={{ width: `${100 / CARDS.length}%`, transform: `translateX(${active * 100}%)` }}
            />
          </div>
        </div>
        </div>

      {/* Navigation Arrows — positioned against the 1440 frame (Figma 3223:16874) */}
      <button
          type="button"
          aria-label="Previous card"
          className="absolute left-[50px] bottom-[339px] z-10 hidden size-[55px] lg:block"
          onClick={() => goTo(active - 1)}
        >
          <Image src="/assets/about-euler/arrow-left.svg" alt="" fill className="object-cover" />
        </button>
        <button
          type="button"
          aria-label="Next card"
          className="absolute right-[49.636px] bottom-[339px] z-10 hidden size-[55px] lg:block"
          onClick={() => goTo(active + 1)}
        >
          <Image src="/assets/about-euler/arrow-right.svg" alt="" fill className="object-cover" />
        </button>
      </div>

      {/* Right-edge fade (Figma 3223:16874) — anchored to the section's right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[63.316px] z-[5] hidden h-[606.722px] w-[210.811px] lg:block"
        style={{
          background:
            "linear-gradient(270deg, #0D2D68 0%, rgba(13, 49, 112, 0.00) 100%)",
          backdropFilter: "blur(0px)",
        }}
      />
    </section>
  );
}
