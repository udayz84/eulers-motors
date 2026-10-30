"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * "What this vehicle is good at." — Figma node 3453:13505 (and 3453:13501)
 * Desktop: 2-row Bento grid (3 top, 2 bottom) with Figma Default-state fly-in assembly animation.
 * Mobile (<1024px): Touch-friendly snap carousel with next-card peek & interactive progress pill.
 */
export default function ProductOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleMobileScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const firstCard = container.querySelector("article");
    const cardWidth = firstCard ? firstCard.offsetWidth : container.offsetWidth * 0.82;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.min(
      4,
      Math.max(0, Math.round(scrollLeft / (cardWidth + 16)))
    );
    setActiveMobileIndex(newIndex);
  }, []);

  // Figma initial offset values from variant node 3453:13499
  // Card 1: left-[-207px] top-[606px] vs resting left-[80px] top-[190px] -> dx: -287px, dy: +416px
  // Card 2: dx: ~0px, dy: +318px
  // Card 3: dx: +300px, dy: +395px
  // Card 4: dx: -605px, dy: +234px
  // Card 5: dx: +515px, dy: +254px
  const getCardTransform = (cardIndex: number) => {
    if (isVisible) return "translate3d(0, 0, 0)";
    if (isMobile) {
      return "translate3d(0, 36px, 0)";
    }
    switch (cardIndex) {
      case 0:
        return "translate3d(-287px, 416px, 0)";
      case 1:
        return "translate3d(0, 318px, 0)";
      case 2:
        return "translate3d(300px, 395px, 0)";
      case 3:
        return "translate3d(-605px, 234px, 0)";
      case 4:
        return "translate3d(515px, 254px, 0)";
      default:
        return "translate3d(0, 40px, 0)";
    }
  };

  const getTransitionDelay = (index: number) => {
    if (isMobile) return `${index * 60}ms`;
    const delays = [0, 80, 160, 100, 180];
    return `${delays[index] ?? 0}ms`;
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Vehicle Overview"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-[48px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px]">
        {/* Section Heading — Left Aligned (Figma 3453:13398 / 3453:13399) */}
        <div
          className="mb-8 flex flex-col items-start gap-4 lg:mb-[48px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
            transition: "opacity 700ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex h-6 items-center">
            <Eyebrow label="Overview" icons="navy" className="font-bold" />
          </div>
          <h2 className="font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink sm:text-[40px] lg:text-[52px] lg:tracking-[-1.04px]">
            What this vehicle is good at.
          </h2>
        </div>

        {/* ============================================================== */}
        {/* MOBILE & TABLET LAYOUT (<1024px): Touch Snap Carousel with Peek */}
        {/* ============================================================== */}
        <div className="relative -mx-5 block w-[calc(100%+40px)] sm:-mx-8 sm:w-[calc(100%+64px)] lg:hidden">
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="no-scrollbar flex w-full gap-4 overflow-x-auto px-[calc((100vw-min(82vw,340px))/2)] pb-4 sm:px-[calc((100vw-min(82vw,360px))/2)] snap-x snap-mandatory touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Mobile Card 1: Features */}
            <article
              className="relative h-[250px] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[12px] bg-[#d9e1eb] sm:h-[268px] sm:w-[360px]"
              style={{
                transform: getCardTransform(0),
                opacity: isVisible ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(0)}, opacity 600ms ease-out ${getTransitionDelay(0)}`,
              }}
            >
              <div className="absolute right-[16px] top-[18px] z-10 flex max-w-[210px] flex-col items-end gap-1.5 text-right sm:right-[20px] sm:top-[20px] sm:max-w-[240px]">
                <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.66px] text-ink sm:text-[26px]">
                  Features
                </h3>
                <p className="font-sans text-[13px] font-normal leading-snug text-ink sm:text-[15px]">
                  Designed for Indian roads, rugged for heat. Fast charging, long range, smart connectivity.
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-0 left-[-30px] h-[170px] w-[340px] select-none sm:left-[-40px] sm:h-[192px] sm:w-[400px]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/products/overview/features-truck.png"
                    alt="Euler Storm EV features"
                    width={528}
                    height={192}
                    className="absolute left-[1.5%] top-[-20%] h-[125%] w-[80%] max-w-none object-cover"
                  />
                </div>
              </div>
            </article>

            {/* Mobile Card 2: Shepherd App */}
            <article
              className="relative h-[250px] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[12px] bg-[#d9e1eb] sm:h-[268px] sm:w-[360px]"
              style={{
                transform: getCardTransform(1),
                opacity: isVisible ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(1)}, opacity 600ms ease-out ${getTransitionDelay(1)}`,
              }}
            >
              <div className="absolute left-[16px] top-[18px] z-10 flex max-w-[170px] flex-col items-start gap-1.5 text-left sm:left-[20px] sm:top-[20px] sm:max-w-[190px]">
                <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.66px] text-ink sm:text-[26px]">
                  Shepherd App
                </h3>
                <p className="font-sans text-[13px] font-normal leading-snug text-ink sm:text-[15px]">
                  Track battery health, trips, charging, and updates from one dashboard.
                </p>
              </div>
              <div className="pointer-events-none absolute right-[-15px] top-[10px] h-[300px] w-[190px] select-none sm:right-0 sm:h-[340px] sm:w-[220px]">
                <Image
                  src="/assets/products/overview/shepherd-app.png"
                  alt="Euler Shepherd App"
                  width={234}
                  height={353}
                  className="size-full object-cover"
                />
              </div>
            </article>

            {/* Mobile Card 3: Benefits */}
            <article
              className="relative h-[250px] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[12px] bg-[#d9e1eb] sm:h-[268px] sm:w-[360px]"
              style={{
                transform: getCardTransform(2),
                opacity: isVisible ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(2)}, opacity 600ms ease-out ${getTransitionDelay(2)}`,
              }}
            >
              <div className="absolute left-[16px] top-[18px] z-10 flex max-w-[180px] flex-col items-start gap-1.5 text-left sm:left-[20px] sm:top-[20px] sm:max-w-[210px]">
                <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.66px] text-ink sm:text-[26px]">
                  Benefits
                </h3>
                <p className="font-sans text-[13px] font-normal leading-snug text-ink sm:text-[15px]">
                  Lower costs with less fuel and maintenance. Reliable, quiet, eco-friendly performance.
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-[-10px] right-[-25px] h-[280px] w-[290px] select-none sm:right-[-10px] sm:h-[320px] sm:w-[340px]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/products/overview/benefits-truck.png"
                    alt="Benefits of Euler Storm"
                    width={546}
                    height={328}
                    className="absolute left-0 top-[-10%] h-[95%] w-[85%] max-w-none object-cover"
                  />
                </div>
              </div>
            </article>

            {/* Mobile Card 4: Ideal for */}
            <article
              className="relative h-[250px] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[12px] bg-[#d9e1eb] sm:h-[268px] sm:w-[360px]"
              style={{
                transform: getCardTransform(3),
                opacity: isVisible ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(3)}, opacity 600ms ease-out ${getTransitionDelay(3)}`,
              }}
            >
              <div className="pointer-events-none absolute right-[-20px] top-[15px] h-[240px] w-[340px] select-none sm:right-0 sm:h-[270px] sm:w-[400px]">
                <Image
                  src="/assets/products/overview/ideal-fleet.png"
                  alt="Fleet of Euler vehicles"
                  width={600}
                  height={283}
                  className="size-full object-contain"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(-87.76deg, rgba(217, 225, 235, 0) 55%, rgb(217, 225, 235) 90%)",
                  }}
                />
              </div>
              <div className="absolute left-[16px] top-[18px] z-10 flex max-w-[170px] flex-col items-start gap-1.5 text-left sm:left-[20px] sm:top-[20px] sm:max-w-[200px]">
                <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.66px] text-ink sm:text-[26px]">
                  Ideal for
                </h3>
                <p className="font-sans text-[13px] font-normal leading-snug text-ink sm:text-[15px]">
                  Fleet owners and transport businesses. 10 vehicles and up.
                </p>
              </div>
            </article>

            {/* Mobile Card 5: Key Use Cases */}
            <article
              className="relative h-[250px] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[12px] bg-[#d9e1eb] sm:h-[268px] sm:w-[360px]"
              style={{
                transform: getCardTransform(4),
                opacity: isVisible ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(4)}, opacity 600ms ease-out ${getTransitionDelay(4)}`,
              }}
            >
              <div className="pointer-events-none absolute right-[-20px] top-0 h-[240px] w-[340px] select-none sm:right-0 sm:h-[270px] sm:w-[400px]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/products/overview/usecases-loading.png"
                    alt="Loading logistics packages"
                    width={600}
                    height={283}
                    className="absolute left-[10%] top-[5%] h-[100%] w-[75%] max-w-none object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(-87.76deg, rgba(217, 225, 235, 0) 55%, rgb(217, 225, 235) 90%)",
                  }}
                />
              </div>
              <div className="absolute bottom-[16px] left-[16px] z-10 flex max-w-[180px] flex-col items-start gap-1.5 text-left sm:bottom-[20px] sm:left-[20px] sm:max-w-[210px]">
                <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.66px] text-ink sm:text-[26px]">
                  Key Use Cases
                </h3>
                <p className="font-sans text-[13px] font-normal leading-snug text-ink sm:text-[15px]">
                  Ideal for last-mile delivery and fleet operations, designed for daily routes in urban areas.
                </p>
              </div>
            </article>
          </div>

          {/* Mobile Progress Pill Indicator */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex h-4 w-[100px] items-center rounded-full bg-[#ccc]/50 p-1">
              <div
                className="h-full rounded-full bg-ink transition-transform duration-300 ease-out"
                style={{
                  width: `${100 / 5}%`,
                  transform: `translateX(${activeMobileIndex * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (>=1024px): 2-Row Bento Grid (Figma 3453:13501) */}
        {/* ============================================================== */}
        <div className="hidden flex-col gap-5 lg:flex">
          {/* Row 1: 3 cards (413.33px each on desktop) */}
          <div className="grid grid-cols-3 gap-5">
            {/* Card 1: Features (Figma 3453:13407) */}
            <article
              className="group relative h-[268px] w-full overflow-hidden rounded-[12px] bg-[#d9e1eb] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(14,47,109,0.08)]"
              style={{
                transform: getCardTransform(0),
                opacity: isVisible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(0)}, opacity 800ms ease-out ${getTransitionDelay(0)}`,
                willChange: "transform, opacity",
              }}
            >
              {/* Text: Top-Right aligned */}
              <div className="absolute right-[20px] top-[20px] z-10 flex max-w-[270px] flex-col items-end gap-2 text-right">
                <h3 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink whitespace-nowrap">
                  Features
                </h3>
                <p className="font-sans text-[16px] font-normal leading-normal text-ink">
                  Designed for Indian roads, rugged for heat. Fast charging, long range, smart connectivity.
                </p>
              </div>

              {/* Image: Truck driving on road (Figma 3453:13411) */}
              <div className="pointer-events-none absolute bottom-0 left-[-64px] h-[192px] w-[528px] select-none top-[99px]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/products/overview/features-truck.png"
                    alt="Euler Storm EV features and capabilities"
                    width={528}
                    height={192}
                    className="absolute left-[1.53%] top-[-22.07%] h-[129.55%] w-[70.59%] max-w-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </article>

            {/* Card 2: Shepherd App (Figma 3453:13412) */}
            <article
              className="group relative h-[268px] w-full overflow-hidden rounded-[12px] bg-[#d9e1eb] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(14,47,109,0.08)]"
              style={{
                transform: getCardTransform(1),
                opacity: isVisible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(1)}, opacity 800ms ease-out ${getTransitionDelay(1)}`,
                willChange: "transform, opacity",
              }}
            >
              {/* Text: Top-Left aligned */}
              <div className="absolute left-[20px] top-[20px] z-10 flex max-w-[204px] flex-col items-start gap-2 text-left">
                <h3 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink whitespace-nowrap">
                  Shepherd App
                </h3>
                <p className="font-sans text-[16px] font-normal leading-normal text-ink">
                  Track battery health, trips, charging, and updates from one dashboard.
                </p>
              </div>

              {/* Image: Hand holding smartphone with Shepherd App (Figma 3453:13413) */}
              <div className="pointer-events-none absolute left-[203px] top-[5px] h-[353px] w-[234px] select-none">
                <Image
                  src="/assets/products/overview/shepherd-app.png"
                  alt="Euler Shepherd App dashboard"
                  width={234}
                  height={353}
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </article>

            {/* Card 3: Benefits (Figma 3453:13417) */}
            <article
              className="group relative h-[268px] w-full overflow-hidden rounded-[12px] bg-[#d9e1eb] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(14,47,109,0.08)]"
              style={{
                transform: getCardTransform(2),
                opacity: isVisible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(2)}, opacity 800ms ease-out ${getTransitionDelay(2)}`,
                willChange: "transform, opacity",
              }}
            >
              {/* Text: Top-Left aligned */}
              <div className="absolute left-[20px] top-[20px] z-10 flex max-w-[243px] flex-col items-start gap-2 text-left">
                <h3 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink whitespace-nowrap">
                  Benefits
                </h3>
                <p className="font-sans text-[16px] font-normal leading-normal text-ink">
                  Lower costs with less fuel and maintenance. Reliable, quiet, eco-friendly performance.
                </p>
              </div>

              {/* Image: Truck with driver (Figma 3453:13421) */}
              <div className="pointer-events-none absolute left-[88px] top-[93px] h-[328px] w-[546px] select-none">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/products/overview/benefits-truck.png"
                    alt="Driver standing with Euler vehicle"
                    width={546}
                    height={328}
                    className="absolute left-0 top-[-14.34%] h-[89.09%] w-[71.48%] max-w-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Row 2: 2 cards (630px each on desktop) */}
          <div className="grid grid-cols-2 gap-5">
            {/* Card 4: Ideal for (Figma 3453:13423) */}
            <article
              className="group relative h-[268px] w-full overflow-hidden rounded-[12px] bg-[#d9e1eb] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(14,47,109,0.08)]"
              style={{
                transform: getCardTransform(3),
                opacity: isVisible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(3)}, opacity 800ms ease-out ${getTransitionDelay(3)}`,
                willChange: "transform, opacity",
              }}
            >
              {/* Image with seamless gradient fade (Figma 3453:13424) */}
              <div className="pointer-events-none absolute left-[165px] top-[20px] h-[283px] w-[600px] select-none">
                <Image
                  src="/assets/products/overview/ideal-fleet.png"
                  alt="Fleet of Euler commercial vehicles"
                  width={600}
                  height={283}
                  className="size-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(-87.76deg, rgba(217, 225, 235, 0) 74.98%, rgb(217, 225, 235) 94.47%)",
                  }}
                />
              </div>

              {/* Text: Top-Left aligned */}
              <div className="absolute left-[23px] top-[20px] z-10 flex max-w-[232px] flex-col items-start gap-2 text-left">
                <h3 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink whitespace-nowrap">
                  Ideal for
                </h3>
                <p className="font-sans text-[16px] font-normal leading-normal text-ink">
                  Fleet owners and transport businesses. 10 vehicles and up.
                </p>
              </div>
            </article>

            {/* Card 5: Key Use Cases (Figma 3453:13428) */}
            <article
              className="group relative h-[268px] w-full overflow-hidden rounded-[12px] bg-[#d9e1eb] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(14,47,109,0.08)]"
              style={{
                transform: getCardTransform(4),
                opacity: isVisible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(4)}, opacity 800ms ease-out ${getTransitionDelay(4)}`,
                willChange: "transform, opacity",
              }}
            >
              {/* Image: Loading packages into truck (Figma 3453:13429) */}
              <div className="pointer-events-none absolute left-[136px] top-0 h-[283px] w-[600px] select-none">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/assets/products/overview/usecases-loading.png"
                    alt="Loading logistics cargo into Euler truck"
                    width={600}
                    height={283}
                    className="absolute left-[16.19%] top-[7.44%] h-[103.19%] w-[67.5%] max-w-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(-87.76deg, rgba(217, 225, 235, 0) 74.98%, rgb(217, 225, 235) 94.47%)",
                  }}
                />
              </div>

              {/* Text: Bottom-Left aligned */}
              <div className="absolute bottom-[20px] left-[20px] z-10 flex max-w-[232px] flex-col items-start gap-2 text-left">
                <h3 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink whitespace-nowrap">
                  Key Use Cases
                </h3>
                <p className="font-sans text-[16px] font-normal leading-normal text-ink">
                  Ideal for last-mile delivery and fleet operations, designed for daily routes in urban areas.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
