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
  { icon: "/assets/footer/icon-instagram.svg", label: "Instagram" },
  { icon: "/assets/footer/icon-linkedin.svg", label: "LinkedIn" },
  { icon: "/assets/footer/icon-youtube.svg", label: "YouTube" },
  { icon: "/assets/footer/icon-x.svg", label: "X" },
];

/**
 * Footer (desktop 1:2174 · mobile 1:5128 with accordion link columns).
 */
export default function Footer() {
  const [open, setOpen] = useState<string | null>(COLUMNS[0].title);

  return (
    <footer className="relative overflow-clip">
      <Image src="/assets/footer/bg.png" alt="" fill sizes="100vw" className="object-cover object-top" priority={false} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[48%] bg-white/90 blur-[168px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-black/25 blur-[102px]" />

      <div className="relative mx-auto flex min-h-[824px] max-w-[1440px] flex-col gap-8 px-5 pb-9 pt-10 lg:w-[1280px] lg:min-h-[927px] lg:gap-0 lg:px-0 lg:pb-[38px] lg:pt-[39px]">
        {/* header row */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[38px]">
            <div className="flex items-center gap-4">
              <Image src="/assets/footer/logo-dark.svg" alt="Euler Motors" width={145} height={24} className="h-[19.9px] w-[120.2px] lg:h-6 lg:w-[144.889px]" />
              <Image src="/assets/footer/icon-audio.svg" alt="" width={24} height={24} aria-hidden className="size-5 lg:size-[24.111px]" />
            </div>
            <p className="whitespace-pre-line font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink lg:text-[32px]">
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
                <Image src={s.icon} alt="" width={18} height={18} aria-hidden className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* link columns — desktop grid / mobile accordion */}
        <div className="hidden justify-between lg:flex">
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

        <div className="flex flex-col gap-3 lg:hidden">
          {COLUMNS.map((col) => {
            const isOpen = open === col.title;
            return (
              <div key={col.title} className={`overflow-clip rounded-lg bg-surface ${isOpen ? "p-3" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : col.title)}
                  className={`flex w-full items-center justify-between ${isOpen ? "" : "rounded-lg bg-surface px-5 py-3"}`}
                >
                  <span className={`text-[14px] leading-none text-ink ${isOpen ? "font-bold" : "font-medium"}`}>{col.title}</span>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className={isOpen ? "rotate-180" : ""}>
                    <path d="M1 1L7 7L13 1" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="flex flex-col gap-3 pb-1 pt-4">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a href="#" className="text-[12px] font-medium leading-none text-ink">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* bottom bar */}
        <div className="mt-auto flex flex-col gap-1 pt-6 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
          <p className="whitespace-pre-line text-[12px] font-medium leading-[21px] text-white lg:text-[14px]">
            © 2026 Euler Motors. All rights reserved.{"\n"}CIN U34100DL2018PTC000000.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[12px] leading-[1.3] text-white">Carefully crafted by</span>
            <span className="inline-flex items-center">
              <Image src="/assets/footer/crafted-1.svg" alt="" width={8} height={11} aria-hidden className="h-[11px] w-[8px]" />
              <Image src="/assets/footer/crafted-2.svg" alt="" width={43} height={12} aria-hidden className="ml-2.5 h-[12px] w-[43px]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
