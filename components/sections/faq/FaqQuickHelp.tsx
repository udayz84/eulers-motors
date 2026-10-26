"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

interface QuickHelpCard {
  id: string;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const CARDS: QuickHelpCard[] = [
  {
    id: "test-drive",
    icon: "/assets/faq/icon-test-drive.png",
    iconAlt: "Book a test drive",
    title: "Book a test drive",
    description: "Not sure which vehicle fits your route? We bring one to your depot with a load.",
    buttonText: "Book Now",
    href: "/contact",
  },
  {
    id: "dealer",
    icon: "/assets/faq/icon-dealer.png",
    iconAlt: "Locate a dealer",
    title: "Locate a dealer",
    description: "112 dealers across 24 states, every one with a workshop bay.",
    buttonText: "Find Dealer",
    href: "/dealer-locator",
  },
  {
    id: "service",
    icon: "/assets/faq/icon-service.png",
    iconAlt: "Book a service",
    title: "Book a service",
    description: "Pick a centre, a date and a slot. Or ask the mobile van to come to you.",
    buttonText: "Book Service",
    href: "/service-centers",
  },
];

/**
 * FAQ Quick Help Section — Figma node 3538:26434 (Desktop) & 2980:8763 (Mobile)
 * Dark section highlighting "The three things people ask for next" with 3D blue icons.
 * Mobile includes horizontal touch swipe snap carousel with interactive pill progress indicator.
 */
export default function FaqQuickHelp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const index = Math.round(progress * (CARDS.length - 1));
    setActiveIndex(Math.max(0, Math.min(CARDS.length - 1, index)));
  };

  return (
    <section
      data-node-id="3538:26434"
      aria-label="Quick Help"
      className="relative w-full overflow-hidden bg-[#041231] py-10 sm:py-12 lg:py-[62px]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(4, 18, 49) 0%, rgb(4, 18, 49) 100%), linear-gradient(-86.26deg, rgb(14, 47, 109) 63.51%, rgb(29, 111, 255) 87.23%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 sm:gap-10 md:gap-[42px] px-5 sm:px-8 lg:px-[80px]">
        {/* Header Block (Figma 3538:26435 / 2980:8764) */}
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4 md:gap-6">
          <div className="flex h-6 items-center">
            <Eyebrow label="Quick help" dark icons="white" className="font-bold uppercase text-[12px] sm:text-[13px] tracking-[0.6px]" />
          </div>

          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white sm:text-[34px] lg:text-[42px] lg:tracking-[-0.84px]">
            The three things people <br className="sm:hidden" />
            ask for next.
          </h2>

          <p className="hidden max-w-[494px] font-sans text-[13px] font-normal leading-normal text-white sm:text-[14px] md:block lg:text-[16px]">
            Maximize efficiency and prolong vehicle battery lifespan with simple routine habits.
          </p>
        </div>

        {/* Cards Row: Horizontal snap swipe on mobile & small tablets, 3-col grid on medium & large tablets */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 scrollbar-none sm:-mx-8 sm:w-[calc(100%+64px)] sm:px-8 md:mx-0 md:grid md:w-full md:grid-cols-3 md:overflow-visible md:px-0 lg:gap-5"
        >
          {CARDS.map((card) => (
            <article
              key={card.id}
              className="group flex w-[282px] shrink-0 snap-center flex-col justify-between gap-4 rounded-[12px] bg-white/[0.08] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12] hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] sm:w-[330px] sm:gap-5 sm:p-6 md:w-auto lg:p-6"
            >
              {/* 3D Icon (Figma 2980:8865) */}
              <div className="relative h-[62px] w-[64px] shrink-0 sm:h-[68px] sm:w-[70px] lg:h-[72px] lg:w-[75px]">
                <Image
                  src={card.icon}
                  alt={card.iconAlt}
                  width={75}
                  height={72}
                  className="size-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text content & CTA button */}
              <div className="flex flex-col items-start gap-1.5 sm:gap-2">
                <h3 className="font-sans text-[16px] font-bold leading-normal text-white sm:text-[18px] md:font-display md:leading-[1.15] md:tracking-[-0.78px] lg:text-[24px]">
                  {card.title}
                </h3>
                <p className="font-sans text-[12px] font-normal leading-normal text-white/90 sm:text-[13px] lg:text-[15px]">
                  {card.description}
                </p>

                {/* Glassmorphic Link Button (Figma 2980:8870) */}
                <Link
                  href={card.href}
                  className="mt-1 inline-flex h-[28px] items-center justify-center rounded-[5px] border border-white/50 bg-[#f3f4f5]/20 px-2.5 font-display text-[10px] font-semibold text-white backdrop-blur-[6px] transition-all hover:border-white hover:bg-white/30 sm:mt-2 sm:h-[32px] sm:rounded-[6px] sm:px-3 sm:text-[11px] md:rounded-[8px] lg:h-[36px] lg:text-[14px]"
                >
                  {card.buttonText}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Progress Indicator Pill on Mobile & Small Tablets */}
        <div
          aria-hidden
          className="flex h-[20px] w-[116px] items-center rounded-[14.4px] bg-[#cccccc]/20 p-1 md:hidden"
        >
          <div
            className="h-[12px] w-[30px] rounded-[23px] bg-white transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${activeIndex * 39}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
