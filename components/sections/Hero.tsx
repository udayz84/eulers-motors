"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import FloatingWidget from "../FloatingWidget";

const SLIDES = 4;

/**
 * Hero V3 (Figma 1:1283). Desktop 1440×800 · mobile 393×762.
 * Background: /images/hero_desktop.png (1600×888) on lg+, /images/hero_mobile.png
 * (393×762) below — both match the Figma frame aspect, full-bleed object-cover.
 */
export default function Hero() {
  const [active, setActive] = useState(1); // Figma shows the 2nd dot active

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + SLIDES) % SLIDES);

  return (
    <section id="hero" className="relative h-[852px] overflow-clip lg:h-[900px]" aria-label="Featured vehicle">
      {/* hero backgrounds — desktop 1440×800 / mobile 393×762 (Figma 1:1283 / 1:4523);
          both sources match the frame aspect, so object-cover fits edge-to-edge */}
      <Image
        src="/images/hero_mobile.png"
        alt="Euler Turbo EV 1000 electric truck"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover lg:hidden"
      />
      <Image
        src="/images/hero_desktop.png"
        alt="Euler Turbo EV 1000 electric truck"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover max-lg:hidden"
      />

      {/* carousel arrows (desktop only) */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-10 top-1/2 hidden -translate-y-[calc(50%+90px)] lg:block"
      >
        <Image
          src="/assets/hero/arrow-left.svg"
          alt=""
          width={42}
          height={42}
          className="h-[42px] w-[42px] -scale-y-100"
        />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-10 top-1/2 hidden -translate-y-[calc(50%+90px)] lg:block"
      >
        <Image
          src="/assets/hero/arrow-right.svg"
          alt=""
          width={42}
          height={42}
          className="h-[42px] w-[42px]"
        />
      </button>

      {/* headline block — Figma bottom 60.52 (desktop) / 24 (mobile) */}
      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-6 px-5 lg:bottom-[60.52px] lg:gap-6">
        <h1 className="max-w-[788.543px] text-center font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white lg:text-[48px] lg:leading-[1.4] lg:tracking-[-0.96px]">
          Euler Turbo EV 1000 की 180km की RealRange™ हो तो करो 1 डिलीवरी और!
        </h1>
        <Button variant="dark" arrow="white" className="rounded-[4.571px] px-[22.822px] lg:rounded-[4px] lg:px-6">
          Explore our Vehicles
        </Button>
      </div>

      {/* carousel dots */}
      <div className="absolute inset-x-0 bottom-[27px] hidden justify-center lg:flex" role="tablist" aria-label="Hero slides">
        <div className="flex items-center gap-[7px] p-2.5">
          {Array.from({ length: SLIDES }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 w-1.5 rounded-[1px] ${i === active ? "bg-white" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2.5 lg:hidden" role="tablist" aria-label="Hero slides">
        <div className="flex items-center gap-[7px]">
          {Array.from({ length: SLIDES }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 w-1.5 rounded-[1px] ${i === active ? "bg-white" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      {/* quick-action rail — scoped to the hero (Figma places it in the hero frame) */}
      <FloatingWidget />
    </section>
  );
}
