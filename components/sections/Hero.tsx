"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";

const SLIDES = 4;

/** Figma gradients baked into the rotated road layer (node 1:1286 "image 685"). */
const ROAD_GRADIENTS =
  "linear-gradient(0.7376432236689681deg, rgba(0,0,0,0) 76.305%, rgba(0,0,0,0.8) 106.49%)," +
  "linear-gradient(269.99996835141263deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100.43%)";

/**
 * Hero V3 (Figma 1:1283). Desktop 1440×800 · mobile 393×762.
 * Desktop: road photo mirrored + rotated 90° to span a 1440×810 box at top 5px
 * (over the base scene photo); mobile: road photo stretched to the frame with the
 * orange truck photo scaled to 349% width, offset -163% (Figma 1:4524).
 */
export default function Hero() {
  const [active, setActive] = useState(1); // Figma shows the 2nd dot active

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + SLIDES) % SLIDES);

  return (
    <section className="relative h-[762px] overflow-clip lg:h-[800px]" aria-label="Featured vehicle">
      {/* base scene — Figma "Rectangle 42158": inset-0 object-cover */}
      <Image
        src="/assets/hero/bg-rect.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover pointer-events-none max-lg:hidden"
      />
      {/* road photo — Figma 1:1286 "image 685": container spans the frame at
          top 5px (aspect 1440/810); the photo fills an 810×1440 box that is
          mirrored (scaleX -1) and rotated 90° to cover the container */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[5px] hidden aspect-[1440/810] lg:block"
        style={{ containerType: "size" }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 -scale-x-100"
          style={{ width: "100cqh", height: "100cqw" }}
        >
          <Image
            src="/assets/hero/road.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none"
            style={{ objectFit: "fill", objectPosition: "bottom" }}
          />
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: ROAD_GRADIENTS }} />
        </div>
      </div>
      {/* mobile (Figma 1:4524): road photo stretched to the frame, left-edge
          gradient, then the truck photo above it at 349% width / -163% left */}
      <div aria-hidden className="absolute inset-0 pointer-events-none lg:hidden">
        <Image
          src="/assets/hero/road.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none"
          style={{ objectFit: "fill", objectPosition: "bottom" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100.43%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 left-[-163.32%] w-[349.01%]">
            <Image
              src="/assets/hero/truck-photo.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="pointer-events-none"
              style={{ objectFit: "fill" }}
            />
          </div>
        </div>
      </div>
      {/* soft darkening overlay from mobile design (Figma 1:4525 "Overlay":
          black 40% box 783×448 at top 449.65 / left -180.59, blur 204 → vignette) */}
      <div
        aria-hidden
        className="absolute top-[449.65px] left-[-180.59px] h-[448.356px] w-[783.13px] bg-black/40 blur-[102.15px] lg:hidden"
      />

      {/* light streaks (desktop only, Figma "Object" layers 1:1292/1:1296/1:1316) */}
      <div
        aria-hidden
        className="absolute hidden items-center justify-center lg:flex"
        style={{
          top: "32.63%",
          right: "40.31%",
          bottom: "49.75%",
          left: "50.28%",
          containerType: "size",
        }}
      >
        <div
          className="rotate-[42.14deg]"
          style={{ width: "hypot(32.5951cqw, 28.3574cqh)", height: "hypot(-67.4049cqw, 71.6426cqh)" }}
        >
          <Image
            src="/assets/hero/sparkle-1.png"
            alt=""
            width={330}
            height={331}
            className="pointer-events-none h-full w-full"
            style={{ objectFit: "fill", objectPosition: "bottom" }}
          />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute hidden items-center justify-center lg:flex"
        style={{
          top: "25.65%",
          right: "26.36%",
          bottom: "63.33%",
          left: "63.66%",
          containerType: "size",
        }}
      >
        <div
          className="rotate-[13.65deg]"
          style={{ width: "hypot(90.4392cqw, 35.8235cqh)", height: "hypot(-9.56084cqw, 64.1765cqh)" }}
        >
          <Image
            src="/assets/hero/sparkle-2.png"
            alt=""
            width={330}
            height={331}
            className="pointer-events-none h-full w-full"
            style={{ objectFit: "fill", objectPosition: "bottom" }}
          />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute hidden items-center justify-center lg:flex"
        style={{
          top: "51.97%",
          right: "60.94%",
          bottom: "34.3%",
          left: "29.28%",
          containerType: "size",
        }}
      >
        <div
          className="rotate-[27.18deg]"
          style={{ width: "hypot(81.469cqw, 53.682cqh)", height: "hypot(-18.531cqw, 46.318cqh)" }}
        >
          <Image
            src="/assets/hero/sparkle-3.png"
            alt=""
            width={330}
            height={331}
            className="pointer-events-none h-full w-full"
            style={{ objectFit: "fill", objectPosition: "bottom" }}
          />
        </div>
      </div>

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
