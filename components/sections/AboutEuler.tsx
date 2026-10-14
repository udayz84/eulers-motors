"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

const CARDS = [
  {
    id: 1,
    badge: "Purpose",
    title: "Built for Businesses",
    description: "We build electric commercial vehicles that help businesses move more and spend less.",
    stat: "Founded in New Delhi, 2018",
    image: "/assets/about-euler/card-image-1.png",
  },
  {
    id: 2,
    badge: "Customer First",
    title: "Every Decision Starts Here",
    description: "We build around real customer needs, not assumptions.",
    stat: "1000+ Daily Business Trips",
    image: "/assets/about-euler/card-image-2.png",
  },
  {
    id: 3,
    badge: "Purpose",
    title: "Built for Businesses",
    description: "We build electric commercial vehicles that help businesses move more and spend less.",
    stat: "Founded in New Delhi, 2018",
    image: "/assets/about-euler/card-image-1.png",
  },
];

/**
 * About Euler section (Figma 3223:16874).
 * Horizontal scrolling cards showcasing Euler's mission and values.
 * Mobile: snap scroll with dots. Desktop: horizontal row with carousel.
 */
export default function AboutEuler() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative overflow-hidden compare-bg py-[26px] lg:py-[62px]"
      aria-label="About Euler"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 lg:px-[60px]">
        {/* Header */}
        <div className="flex w-full max-w-[1280px] flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:text-left">
          <Eyebrow label="Our Values" />
        </div>

        {/* Cards Container */}
        <div className="relative w-full mt-[26px]">
          <div
            id="about-euler-snap-row"
            className="snap-row snap-center-mobile gap-[20px] lg:gap-[20px]"
          >
            {/* Left spacer for alignment */}
            <div
              aria-hidden
              className="shrink-0 lg:hidden"
              style={{ width: "calc(20px - 20px)" }}
            />
            <div
              aria-hidden
              className="desktop-spacer hidden shrink-0 lg:block"
              style={{
                width:
                  "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 40px)",
              }}
            />

            {CARDS.map((card, index) => (
              <article
                key={card.id}
                className="relative aspect-[324/420] h-[420px] w-[324px] shrink-0 overflow-hidden rounded-[12px] sm:h-[485.645px] sm:w-auto sm:rounded-[20.442px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden rounded-[12px] sm:rounded-[20.442px]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 485px, 324px"
                    className="object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[68.873%] to-black/60 to-[90.703%] sm:rounded-[20.442px]"
                />

                {/* Info Card */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[308px] rounded-[8px] bg-white/20 p-[12px] backdrop-blur-[9.134px] sm:bottom-[16px] sm:w-[355px] sm:rounded-[12px] sm:p-[16px]">
                  {/* Badge */}
                  <div className="mb-[6px] inline-flex flex-col items-start rounded-[50px] bg-[#d4dbec] px-[10px] py-[4px] sm:mb-[8px]">
                    <span className="text-[12px] font-bold leading-normal text-black sm:text-[14px]">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-[6px] text-[16px] font-bold leading-normal tracking-[-0.32px] text-white sm:mb-[8px] sm:text-[20px] sm:tracking-[-0.4px]">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-[6px] h-[36px] overflow-hidden text-ellipsis text-[12px] font-normal leading-[1.5] text-white sm:mb-[8px] sm:h-[48px] sm:text-[14px]">
                    {card.description}
                  </p>

                  {/* Stat Badge */}
                  <div className="inline-flex items-center rounded-[14.614px] border border-[#6fcf97] border-[0.913px] bg-[rgba(111,207,151,0.24)] px-[6.51px] py-[4.34px] backdrop-blur-[9.134px] sm:rounded-[20.442px] sm:border-[1px] sm:px-[8px] sm:py-[6px]">
                    <span className="whitespace-nowrap text-[12px] font-bold leading-[1.15] tracking-[-0.24px] text-white sm:text-[14px]">
                      {card.stat}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {/* Right spacer for alignment */}
            <div
              aria-hidden
              className="shrink-0 lg:hidden"
              style={{ width: "calc(20px - 20px)" }}
            />
            <div
              aria-hidden
              className="desktop-spacer hidden shrink-0 lg:block"
              style={{
                width:
                  "calc(max(0px, (100vw - 1440px) / 2) + max(0px, (min(100vw, 1440px) - 1400px) / 2) + 40px)",
              }}
            />
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center gap-[7px] pt-4 lg:hidden">
            {CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Card ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 w-1.5 rounded-[1px] ${
                  i === active ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
