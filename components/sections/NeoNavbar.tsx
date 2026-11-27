"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NeoHeaderMobile from "@/components/sections/NeoHeaderMobile";

const NAV_MEGA_4W = [
  {
    name: "Storm EV LR 200",
    payload: "1,500 kg",
    img: "/assets/products/vehicle-storm-lr200.png",
    href: "/products/lr200",
  },
  {
    name: "Storm EV T1500",
    payload: "1,500 kg",
    img: "/assets/products/vehicle-storm-t1500.png",
    href: "/products/storm-ev-t1500",
  },
  {
    name: "Turbo EV 1000",
    payload: "1,000 kg",
    img: "/assets/products/vehicle-turbo-1000.png",
    href: "/products/turbo-ev-1000",
  },
];

const NAV_MEGA_3W = [
  {
    name: "HiLoad EV",
    payload: "688 kg",
    img: "/assets/products/vehicle-hiload-ev.png",
    href: "/products/hiload-ev",
  },
];

const NAV_COMPANY = [
  { label: "About us", desc: "EV Revolution for India", href: "/about" },
  { label: "Leadership", desc: "Founders and board", href: "#" },
  { label: "Careers", desc: "Find the right role for you.", href: "/careers" },
  { label: "In press", desc: "News and media kit", href: "/in-press" },
];

const NAV_SUPPORT = [
  { label: "Find a dealer", desc: "112 dealers, 24 states", href: "/dealer-locator" },
  { label: "Service centres", desc: "On the spot repair", href: "/service-centers" },
  { label: "Charging stations", desc: "1,412 points on the app", href: "/charging-stations" },
  { label: "Media Kit", desc: "Brochure and manuals", href: "/in-press#media-kit" },
  { label: "FAQs", desc: "Common questions", href: "/faq" },
];

type NavKey = "Product" | "Company" | "Support";

function NavChevron() {
  return (
    <span className="relative block h-[4px] w-[9.333px] shrink-0">
      <Image
        src="/assets/neo/main-image/chevron.svg"
        alt=""
        aria-hidden
        width={10.8334}
        height={5.11952}
        className="absolute inset-[-9.24%_-8.04%_-18.75%_-8.04%] max-w-none"
      />
    </span>
  );
}

function NavProductCard({
  name,
  payload,
  img,
  href,
}: {
  name: string;
  payload: string;
  img: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block h-[267px] w-[200px] shrink-0 cursor-pointer rounded-2xl border border-white/15 bg-white/[0.06] p-[10px] pb-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.1]"
    >
      <div className="flex h-[180px] w-[180px] items-center justify-center rounded-xl bg-white/90 p-2">
        <Image
          src={img}
          alt={name}
          width={164}
          height={164}
          className="h-[164px] w-[164px] rounded-lg object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="mt-[15px] pl-[14px]">
        <p className="text-[16px] font-bold leading-[18px] text-white">{name}</p>
        <p className="mt-[6px] text-[12px] font-medium leading-[14px] text-white/60">{payload}</p>
      </div>
    </Link>
  );
}

function NavMenuCard({ label, desc, href }: { label: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex h-[160px] w-[220px] shrink-0 flex-col justify-between rounded-[24px] border border-white/15 bg-white/[0.06] p-6 no-underline transition-all duration-200 hover:bg-white/[0.12]"
    >
      <div className="flex w-full justify-end">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(106.86deg,#00ff87_28.559%,#1d6fff_124.97%)] transition-transform duration-200 group-hover:scale-110">
          <Image
            src="/assets/nav/arrow-right-white.svg"
            alt=""
            aria-hidden
            width={12}
            height={17}
            className="h-[17px] w-[11.5px] -rotate-90"
          />
        </span>
      </div>
      <span className="flex flex-col gap-[4px] leading-[1.15] text-white">
        <span className="whitespace-nowrap text-[18px] font-bold tracking-[-0.32px]">{label}</span>
        <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.24px] text-white/60">
          {desc}
        </span>
      </span>
    </Link>
  );
}

function NavTrigger({
  label,
  active,
  support = false,
  onHover,
  onToggle,
}: {
  label: string;
  active: boolean;
  support?: boolean;
  onHover: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="relative flex shrink-0 items-center" onMouseEnter={onHover}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={active}
        onClick={onToggle}
        className="flex cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap font-sans text-[14px] font-semibold leading-[normal] text-white"
      >
        {support && (
          <span className="relative block h-[23.28px] w-[23.086px] shrink-0">
            <span className="absolute left-[3.01px] top-[3.44px] h-[17.315px] w-[17.459px]">
              <span className="absolute left-[2.17px] top-[2.17px] size-[13.027px]">
                <Image
                  src="/assets/neo/contact/phone.svg"
                  alt=""
                  aria-hidden
                  width={22.001}
                  height={22.001}
                  className="absolute inset-[-5.76%] max-w-none"
                />
              </span>
            </span>
          </span>
        )}
        {label}
        <span className={`transition-transform duration-200 ${active ? "rotate-180" : ""}`}>
          <NavChevron />
        </span>
      </button>
    </div>
  );
}

function NeoNav({ scrolled = false }: { scrolled?: boolean }) {
  const [open, setOpen] = useState<NavKey | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panelBase =
    "absolute inset-x-0 top-full z-30 hidden bg-[#071511]/95 shadow-2xl backdrop-blur-[30px] lg:block";

  return (
    <header
      className={`relative inset-x-0 h-[48px] w-full transition-colors duration-200 backdrop-blur-[20px] ${
        scrolled
          ? "border-b border-white/10 bg-[#071511]/90 shadow-lg"
          : "border-b border-white/10 bg-black/20"
      }`}
      data-node-id="4064:13784"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between pl-[80px]">
        <Link
          href="/neo"
          aria-label="NEO by Euler home"
          className="relative block h-[30px] w-[107.331px] shrink-0 overflow-hidden mix-blend-lighten"
          data-node-id="4064:13785"
        >
          <Image
            src="/assets/neo/main-image/mobile-nav-logo.png"
            alt="NEO by Euler"
            width={335}
            height={597}
            className="absolute left-0 top-[-268.34%] h-[637.58%] w-full max-w-none"
          />
        </Link>
        <nav
          className="flex shrink-0 items-center justify-center gap-[48px] px-[10px]"
          aria-label="Main navigation"
          data-node-id="4064:13786"
        >
          <NavTrigger
            label="Product"
            active={open === "Product"}
            onHover={() => setOpen("Product")}
            onToggle={() => setOpen(open === "Product" ? null : "Product")}
          />
          <NavTrigger
            label="Company"
            active={open === "Company"}
            onHover={() => setOpen("Company")}
            onToggle={() => setOpen(open === "Company" ? null : "Company")}
          />
          <Link
            href="/technology"
            className="shrink-0 whitespace-nowrap font-sans text-[14px] font-semibold leading-[normal] text-white no-underline hover:text-white/80 transition-colors"
            data-node-id="4064:13793"
          >
            Technology
          </Link>
          <NavTrigger
            label="Support"
            active={open === "Support"}
            support
            onHover={() => setOpen("Support")}
            onToggle={() => setOpen(open === "Support" ? null : "Support")}
          />
        </nav>
        <div
          className="flex h-[48px] w-[224px] shrink-0 items-center justify-end pr-[3px]"
          data-node-id="4064:13800"
        >
          <Link
            href="#contact"
            className="flex h-[42px] shrink-0 items-center justify-center gap-[20px] rounded-[4px] bg-[linear-gradient(111deg,#00ff87_28.559%,#1d6fff_124.97%)] py-[2px] pl-[24px] pr-[2px] text-white no-underline transition-opacity hover:opacity-90"
            data-node-id="4064:13804"
          >
            <span className="whitespace-nowrap font-display text-[16px] font-semibold leading-none">
              Book a Test Drive
            </span>
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[2px] bg-[#121212]">
              <span className="relative block h-[14px] w-[22px]">
                <span className="absolute inset-[-16.4%_-1.68%_-22.89%_-3.41%]">
                  <Image
                    src="/assets/neo/enterprise/desktop-arrow.svg"
                    alt=""
                    aria-hidden
                    width={23.1195}
                    height={19.5}
                    className="max-w-none"
                  />
                </span>
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Company / Support panels */}
      {(open === "Company" || open === "Support") && (
        <div className={panelBase}>
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-[26px] py-8 pl-[80px] pr-[60px]">
            <p className="text-[16px] font-bold uppercase leading-[22px] tracking-[0.8px] text-white">
              {open === "Company" ? "Company" : "Help and Service"}
            </p>
            <div className="flex items-center gap-5">
              {(open === "Company" ? NAV_COMPANY : NAV_SUPPORT).map((item) => (
                <NavMenuCard key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product mega-menu */}
      {open === "Product" && (
        <div className={panelBase}>
          <div className="mx-auto flex w-full max-w-[1440px] items-start py-8 pl-[80px] pr-[60px]">
            <div className="flex w-[632px] flex-col gap-[26px]">
              <Link
                href="/products"
                className="text-[16px] font-bold uppercase leading-[22px] tracking-[0.8px] text-white no-underline transition-opacity hover:opacity-80"
              >
                4 Wheeler Goods Vehicles
              </Link>
              <div className="flex gap-4">
                {NAV_MEGA_4W.map((p) => (
                  <NavProductCard key={p.name} {...p} />
                ))}
              </div>
            </div>

            <div aria-hidden className="ml-[29px] mr-[30px] w-px self-stretch bg-white/15" />

            <div className="flex w-[226px] flex-col gap-[26px]">
              <Link
                href="/products"
                className="whitespace-nowrap text-[16px] font-bold uppercase leading-[22px] tracking-[0.8px] text-white no-underline transition-opacity hover:opacity-80"
              >
                3 Wheeler Goods Vehicles
              </Link>
              {NAV_MEGA_3W.map((p) => (
                <NavProductCard key={p.name} {...p} />
              ))}
            </div>

            <div aria-hidden className="ml-[28px] mr-[29px] w-px self-stretch bg-white/15" />

            <Link
              href="/products"
              className="group relative block h-[355px] w-[305px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-[#1b62cd] px-5 pt-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src="/assets/neo/neo-card-image.png"
                alt="Neo by Euler"
                fill
                sizes="305px"
                className="absolute inset-0 object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
              />
              <div className="relative z-10 flex h-5 items-center">
                <Image
                  src="/assets/nav/neo-mark-white.svg"
                  alt=""
                  width={18.22}
                  height={20.36}
                  aria-hidden
                  className="h-5 w-auto"
                />
                <span className="ml-[6px] text-[14px] font-bold leading-none text-white">
                  Neo by Euler
                </span>
              </div>
              <p className="relative z-10 mt-[10px] max-w-[200px] font-display text-[28px] font-semibold leading-[32px] text-white">
                HiRange and HiCity
              </p>
              <p className="relative z-10 mt-3 w-[263px] text-[12px] font-medium leading-[17px] text-white">
                Smaller vehicles for city delivery. Built for owner drivers and
                delivery partners.
              </p>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function NeoNavbarDesktop() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full ${
        announcementVisible ? "-mb-[70px]" : "-mb-[48px]"
      }`}
    >
      {announcementVisible && (
        <aside
          className="relative z-40 h-[22px] w-full bg-black text-white"
          data-node-id="4064:13675"
        >
          <p className="absolute left-1/2 top-0 h-[19px] w-[290px] -translate-x-1/2 whitespace-nowrap font-sans text-[14px] font-[700] leading-[19px]">
            Euler - Explore our electric 4 wheeler range
          </p>
          <button
            type="button"
            aria-label="Close announcement"
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-[max(calc((100vw_-_1440px)/2+49px),49px)] top-[6.5px] grid size-[7px] cursor-pointer place-items-center border-0 bg-transparent p-0"
          >
            <img src="/assets/neo/main-image/close-icon.svg" alt="" className="block size-full" />
          </button>
        </aside>
      )}
      <NeoNav scrolled={scrolled} />
    </div>
  );
}

export const NeoHeaderDesktop = NeoNavbarDesktop;
export const NeoNavbarMobile = NeoHeaderMobile;
export { NeoHeaderMobile };

export default function NeoNavbar() {
  return (
    <>
      <div className="lg:hidden">
        <NeoNavbarMobile />
      </div>
      <div className="hidden lg:block">
        <NeoNavbarDesktop />
      </div>
    </>
  );
}
