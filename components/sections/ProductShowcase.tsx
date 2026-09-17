"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

type Product = {
  name: string;
  /** crop box [left%, top%, width%, height%] of the thumbnail frame, from Figma 1:1330-1:1339 */
  crop: [number, number, number, number];
};

/** Figma 1:1329-1:1340 product cards — same source image, different crops */
const PRODUCTS: Product[] = [
  { name: "Storm EV T1500", crop: [-228.13, -145.73, 335.27, 237.35] },
  { name: "Strom EV LR 200", crop: [-4.46, -140.4, 325.69, 230.57] },
  { name: "Turbo EV 1000", crop: [-2.9, -6.56, 322.07, 228] },
  { name: "HiLoad EV", crop: [-295.3, -19.56, 415.35, 294.03] },
];

const SPECS = [
  { icon: "/assets/products/icon-gauge.svg", label: "Range per charge", value: "200 km" },
  { icon: "/assets/products/icon-package.svg", label: "Load capacity", value: "1,200 kg" },
  { icon: "/assets/products/icon-clock.svg", label: "Charge time", value: "90 min" },
];

/**
 * "Choose your truck" (desktop 1:1318 · mobile 1:4604).
 * Thumbnails with Figma-crop zoom, big scene render, spec panel, CTAs.
 */
export default function ProductShowcase() {
  const [active, setActive] = useState(1); // Figma: "Strom EV LR 200" active

  return (
    <section className="relative overflow-clip bg-white" aria-label="Choose your truck">
      {/* layered backdrop — desktop: main image @50% + scene render (Figma 1:1318/1:1319) */}
      <Image
        src="/assets/products/main-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom opacity-50 pointer-events-none max-lg:hidden"
      />
      <Image
        src="/assets/products/scene.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom pointer-events-none max-lg:hidden"
      />
      {/* mobile: exact Figma render of the mobile backdrop frame (1:4605) */}
      <Image
        src="/assets/products/mobile-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top pointer-events-none lg:hidden"
      />
      <div aria-hidden className="absolute inset-x-0 top-[-170px] mx-auto h-[432px] w-[min(2160px,150vw)] bg-surface blur-[86.6px]" />

      <div className="relative mx-auto flex min-h-[751px] w-full flex-col px-5 pb-10 pt-[123px] lg:min-h-0 lg:w-full lg:px-0 lg:pb-0 lg:pt-[66.2px]">
        {/* section header — Figma 1:1321: 1285.539×136.355 at x 77.2 / y 66.2 */}
        <div className="lg:mx-auto lg:mb-[190px] lg:flex lg:w-[1285.539px] lg:items-center lg:justify-between">
          <div className="flex flex-col gap-[14px] lg:gap-5">
            <Eyebrow label="Choose your truck" />
            <h2 className="w-[322px] font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink lg:w-[403px] lg:text-[42px]">
              Pick the vehicle that fits your work.
            </h2>
          </div>

          {/* thumbnails — Figma 1:1328: 723px justify-between · mobile 1:4615:
              full-bleed row, px-20, cards hug their labels, 55×52 images */}
          <div className="mt-[24px] -mx-5 flex items-center justify-between px-5 lg:mx-0 lg:mt-0 lg:w-[723px] lg:justify-between lg:px-0">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`flex shrink-0 flex-col items-center gap-[7.215px] transition-opacity lg:w-[100.075px] lg:gap-[10.868px] ${
                  i === active ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="relative block h-[52px] w-[55px] overflow-hidden rounded-[9.62px] lg:h-[94.642px] lg:w-full lg:rounded-[14.491px]">
                  <span
                    className="absolute"
                    style={{
                      left: `${p.crop[0]}%`,
                      top: `${p.crop[1]}%`,
                      width: `${p.crop[2]}%`,
                      height: `${p.crop[3]}%`,
                    }}
                  >
                    <Image
                      src="/assets/products/product.png"
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </span>
                </span>
                <span className="whitespace-nowrap text-center text-[12px] font-bold leading-[1.15] tracking-[-0.32px] text-ink lg:text-[16px]">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* carousel arrows (desktop) */}
        <button
          type="button"
          aria-label="Previous vehicle"
          className="absolute left-20 top-[calc(50%-12px)] hidden -translate-y-1/2 lg:block"
        >
          <Image
            src="/assets/products/arrow-left.svg"
            alt=""
            width={55}
            height={55}
            className="h-[55px] w-[55px] rotate-180"
          />
        </button>
        <button
          type="button"
          aria-label="Next vehicle"
          className="absolute right-20 top-[379px] hidden lg:block"
        >
          <Image
            src="/assets/products/arrow-right.svg"
            alt=""
            width={55}
            height={55}
            className="h-[55px] w-[55px]"
          />
        </button>

        {/* spec panel + CTAs */}
        <div className="mt-auto flex flex-col gap-[20px] lg:mx-auto lg:mb-[52px] lg:w-[1285.539px] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full flex-col rounded-xl bg-white/20 p-4 backdrop-blur-md lg:w-[757px] lg:rounded-[18px] lg:p-6">
            <h3 className="font-display text-2xl font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[28px]">
              {PRODUCTS[active].name === "Strom EV LR 200"
                ? "Storm EV LongRange 200"
                : PRODUCTS[active].name === "Storm EV T1500"
                  ? "Storm EV T1500"
                  : PRODUCTS[active].name === "Turbo EV 1000"
                    ? "Turbo EV 1000"
                    : "HiLoad EV"}
            </h3>

            {/* desktop: horizontal stats · mobile: stacked with dividers */}
            <div className="mt-[12px] flex flex-col gap-3 lg:mt-[21px] lg:flex-row lg:items-start lg:gap-2.5">
              {SPECS.map((s, i) => (
                <div key={s.label} className="flex items-center lg:contents">
                  <div className="flex items-center gap-2.5 lg:gap-2.5">
                    <span className="flex h-[38px] w-[38px] items-center justify-center rounded bg-white p-2 lg:h-[52px] lg:w-[52px] lg:rounded-lg">
                      <Image
                        src={s.icon}
                        alt=""
                        width={22}
                        height={22}
                        aria-hidden
                        className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px]"
                      />
                    </span>
                    <span className="flex flex-col gap-[2px]">
                      <span className="text-[12px] leading-none text-ink lg:text-[16px] lg:leading-none">
                        {s.label}
                      </span>
                      <span className="font-display text-[16px] font-bold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[28px]">
                        {s.value}
                      </span>
                    </span>
                  </div>
                  {i < SPECS.length - 1 && (
                    <span
                      aria-hidden
                      className="ml-auto hidden h-[58px] w-px self-center bg-white/40 lg:block lg:rotate-0"
                    />
                  )}
                  {i < SPECS.length - 1 && (
                    <span aria-hidden className="my-1 h-px w-full bg-white/40 lg:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-[14px]">
            <Button variant="outline" arrow="none" className="gap-2 rounded-[4px] border">
              <Image
                src="/assets/products/icon-compare.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden
                className="h-[14px] w-[14px] lg:h-6 lg:w-6"
              />
              Compare
            </Button>
            <Button variant="dark" arrow="white">
              View Variants
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
