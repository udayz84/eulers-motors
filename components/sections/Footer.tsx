"use client";

import { useState } from "react";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Euler MOTOR VEHICLES",
    links: ["Storm EV LongRange 200", "Storm EV T1500", "HiLoad EV", "Turbo EV 1000"],
    openOnMobile: true,
  },
  { title: "Neo by Euler VEHICLES", links: ["HiRange", "HiCity"], openOnMobile: false },
  {
    title: "Support",
    links: ["Dealer Locator", "Service Centres", "Charging Stations Locator", "Downloads"],
    openOnMobile: false,
  },
  { title: "Resources", links: ["Blogs", "In press"], openOnMobile: false },
  { title: "Company", links: ["About us", "Careers", "Sitemap"], openOnMobile: false },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms and conditions", "Cookie policy", "Refund policy"],
    openOnMobile: false,
  },
];

const SOCIALS = [
  /* the Figma sources for instagram/linkedin/youtube are stored flipped and
     displayed with -rotate-180 -scale-x-100 (node 1:2235/37/39); X is upright */
  { icon: "/assets/footer/icon-instagram.svg", label: "Instagram", flip: true },
  { icon: "/assets/footer/icon-linkedin.svg", label: "LinkedIn", flip: true },
  { icon: "/assets/footer/icon-youtube.svg", label: "YouTube", flip: true },
  { icon: "/assets/footer/icon-x.svg", label: "X", flip: false },
];

/**
 * Footer (desktop 1:2174 · mobile 1:5128 with accordion link columns).
 */
export default function Footer() {
  const [open, setOpen] = useState<string | null>(COLUMNS[0].title);

  return (
    <footer className="relative overflow-clip">
      {/* background sized to just cover the screen edges — full width,
          aspect-true, BOTTOM-anchored so the lower part of the picture shows
          and any excess is cropped from the top by the footer's clip */}
      {/* mobile bg — Figma 1:5128: photo bottom-anchored, 103.12% wide at
          left -3.12%, 33.36% of the 1006px frame tall · desktop keeps the
          aspect-true full-width fill */}
      <Image
        src="/assets/footer/bg.png"
        alt=""
        width={1588}
        height={991}
        aria-hidden
        className="absolute bottom-0 left-[-3.12%] h-[33.36%] w-[103.12%] max-w-none object-cover lg:left-0 lg:h-auto lg:w-full"
        priority={false}
      />
      {/* mobile wash — Figma 1:5129: white blur rect 726.216×155.082 at top 607.15, centered */}
      <div aria-hidden className="absolute left-1/2 top-[607.15px] h-[155.082px] w-[726.216px] -translate-x-1/2 bg-white blur-[44.6px] lg:hidden" />
      <div aria-hidden className="absolute inset-x-0 top-0 hidden h-[48%] bg-white/90 blur-[168px] lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-[45%] bg-black/25 blur-[102px] lg:block" />

      {/* container follows the PromoCard grid — max-w-[1440px] px-5 on
          mobile/tablet, lg:max-w-[1600px] lg:px-[30px] on desktop — so all
          footer content (header row, columns, bottom bar) starts and ends on
          the promo cards' content boundaries */}
      <div className="relative mx-auto flex h-[1006px] max-w-[1440px] flex-col gap-8 px-5 pt-[42px] lg:h-auto lg:max-w-[1600px] lg:min-h-[927px] lg:gap-0 lg:px-[30px] lg:pb-[38px] lg:pt-[39px]">
        {/* header row */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5 lg:gap-[38px]">
            <div className="flex items-center gap-[13.272px]">
              <Image src="/assets/footer/logo-dark.svg" alt="Euler Motors" width={145} height={24} className="h-[19.9px] w-[120.2px] lg:h-6 lg:w-[144.889px]" />
              <Image src="/assets/footer/icon-audio.svg" alt="" width={24} height={24} aria-hidden className="size-5 lg:size-[24.111px]" />
            </div>
            <p className="whitespace-pre-line font-display text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-ink lg:text-[32px] lg:leading-[1.15] lg:tracking-[-0.64px]">
              {`Electric goods vehicles, \nIndia ke liye.  `}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex size-[38px] items-center justify-center rounded-[6.653px] bg-surface py-[6.4px]"
              >
                <Image
                  src={s.icon}
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden
                  className={`size-[18px] ${s.flip ? "-rotate-180 -scale-x-100" : ""}`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* link columns — desktop grid / mobile accordion.
            Figma 1:2174: links start at y218.16, 42.93px below the header block. */}
        <div className="hidden justify-between pt-[42.93px] lg:flex">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-6">
              <h3 className="text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] leading-none text-ink hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* mobile — Figma 1:5157/1:5189/1:5190: accordion columns, the
            two-line imprint 20px below, crafted-by centered at frame bottom */}
        <div className="flex flex-col gap-5 lg:hidden">
          <div className="flex flex-col gap-3">
            {COLUMNS.map((col) => {
              const isOpen = open === col.title;
              return (
                <div key={col.title} className={`overflow-clip rounded-lg bg-surface ${isOpen ? "flex flex-col gap-3 p-3" : ""}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : col.title)}
                    className={`flex w-full items-center justify-between ${isOpen ? "pr-[8px]" : "py-[12px] pl-[12px] pr-[20px]"}`}
                  >
                    <span className={`text-[14px] leading-[1.15] tracking-[-0.28px] text-ink ${isOpen ? "font-bold" : "font-medium"}`}>{col.title}</span>
                    {/* Figma 1:5162/1:5172: caret-up glyph, flipped only when closed */}
                    <Image
                      src="/assets/footer/caret-up.svg"
                      alt=""
                      width={10}
                      height={6}
                      aria-hidden
                      className={`h-[4px] w-[9.333px] ${isOpen ? "" : "-scale-y-100"}`}
                    />
                  </button>
                  {isOpen && (
                    <>
                      {/* Line 86 (1:5163): white 0.7px hairline under the open title */}
                      <div aria-hidden className="h-[0.7px] w-full bg-white/80" />
                      <ul className="flex flex-col gap-3">
                        {col.links.map((l) => (
                          <li key={l}>
                            <a href="#" className="text-[12px] font-medium text-ink">
                              {l}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <p className="flex flex-col text-[12px] font-medium leading-[21px] text-ink">
            <span>© 2026 Euler Motors. All rights reserved.</span>
            <span>CIN U34100DL2018PTC000000.</span>
          </p>
        </div>

        {/* bottom bar — desktop row (Figma 1:2174) · mobile crafted-by sits
            centered at the frame bottom instead */}
        <div className="mt-auto hidden lg:flex lg:items-center lg:justify-between">
          <p className="text-[14px] font-medium leading-[21px] text-white">
            © 2026 Euler Motors. All rights reserved. CIN U34100DL2018PTC000000.
          </p>
          <CraftedBy />
        </div>
        <div className="mt-auto flex justify-center pb-3 lg:hidden">
          <CraftedBy />
        </div>
      </div>
    </footer>
  );
}

function CraftedBy() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[12px] leading-[1.3] text-white">Carefully crafted by</span>
      <span className="inline-flex items-center">
        <Image src="/assets/footer/crafted-1.svg" alt="" width={8} height={11} aria-hidden className="h-[11px] w-[8px]" />
        <Image src="/assets/footer/crafted-2.svg" alt="" width={43} height={12} aria-hidden className="ml-2.5 h-[12px] w-[43px]" />
      </span>
    </div>
  );
}
