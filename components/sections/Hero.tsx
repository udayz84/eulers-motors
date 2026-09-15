"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";

const SLIDES = 4;

/**
 * Hero V3 (Figma 1:1283). Desktop 1440×800 · mobile 393×762.
 * Layered road photo over scene photo, dark gradients from bottom/right,
 * carousel arrows (desktop), headline + CTA + dots anchored at the bottom.
 */
export default function Hero() {
  const [active, setActive] = useState(1); // Figma shows the 2nd dot active

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + SLIDES) % SLIDES);

  return (
    <section className="relative h-[762px] overflow-clip lg:h-[800px]" aria-label="Featured vehicle">
      {/* base scene (desktop) */}
      <Image
        src="/assets/hero/bg-rect.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom pointer-events-none max-lg:hidden"
      />
      {/* curved road photo — desktop: Figma rotates the portrait source 90° to span
          the frame (1024px side across 1440px width ⇒ ~1.4× zoom) */}
      <div className="absolute left-1/2 top-1/2 hidden h-[1440px] w-[800px] -translate-x-1/2 -translate-y-1/2 rotate-90 lg:block">
        <Image
          src="/assets/hero/road.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom pointer-events-none"
        />
      </div>
      {/* mobile (Figma 1:4524): road photo covers the frame, object-bottom… */}
      <Image
        src="/assets/hero/road.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom pointer-events-none lg:hidden"
      />
      {/* …with the orange truck photo scaled to 349% width, offset -163% (Figma) */}
      <div className="absolute inset-y-0 left-[-163.32%] w-[349.01%] lg:hidden">
        <Image
          src="/assets/hero/truck-photo.png"
          alt="Euler Turbo EV 1000"
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none"
        />
      </div>
      {/* road gradients (baked into the Figma layer) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.8) -6.49%, rgba(0,0,0,0) 23.695%), linear-gradient(to left, rgba(0,0,0,0.8) 0.43%, rgba(0,0,0,0) 50%)",
        }}
      />
      {/* soft darkening overlay from mobile design (blur 204 → solid vignette) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black/40 blur-[102px] lg:hidden"
      />

      {/* light streaks (desktop only, per Figma "Object" layers) */}
      <Image
        src="/assets/hero/sparkle-1.png"
        alt=""
        width={330}
        height={331}
        aria-hidden
        className="pointer-events-none absolute left-[28%] top-[38%] hidden w-[23%] origin-center -scale-x-100 rotate-[42.14deg] lg:block"
      />
      <Image
        src="/assets/hero/sparkle-2.png"
        alt=""
        width={330}
        height={331}
        aria-hidden
        className="pointer-events-none absolute left-[59%] top-[27%] hidden w-[23%] origin-center rotate-[13.65deg] lg:block"
      />
      <Image
        src="/assets/hero/sparkle-3.png"
        alt=""
        width={330}
        height={331}
        aria-hidden
        className="pointer-events-none absolute left-[24%] top-[54%] hidden w-[23%] origin-center rotate-[27.18deg] lg:block"
      />

      {/* range badges (desktop only, Figma Vector 171/172) */}
      <Image
        src="/assets/hero/badge-1.svg"
        alt=""
        width={199}
        height={79}
        aria-hidden
        className="pointer-events-none absolute left-[854px] top-[206px] hidden xl:block"
      />
      <Image
        src="/assets/hero/badge-2.svg"
        alt=""
        width={199}
        height={79}
        aria-hidden
        className="pointer-events-none absolute left-[348px] top-[438px] hidden xl:block"
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
      <div className="absolute inset-x-0 top-[747px] hidden justify-center lg:flex" role="tablist" aria-label="Hero slides">
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
    </section>
  );
}
