"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "./ui/Arrow";
import Button from "./ui/Button";

/**
 * Dropdown content — Figma "Component 20" Company-open state (panel 1:2826)
 * and the parked Support column draft. Items are label + description pairs
 * laid out in a horizontal row with white/40 hairline dividers.
 */
const DROPDOWNS = {
  Product: {
    heading: "EULER MOTORS",
    items: [],
  },
  Company: {
    heading: "EULER MOTORS",
    items: [
      { label: "About us", desc: "EV Revolution for India" },
      { label: "Leadership", desc: "Founders and board" },
      { label: "Careers", desc: "Find the right role for you." },
      { label: "In press", desc: "News and media kit" },
    ],
  },
  Support: {
    heading: "HELP AND SERVICE",
    items: [
      { label: "Find a dealer", desc: "112 dealers, 24 states" },
      { label: "Service centres", desc: "On the spot repair" },
      { label: "Charging stations", desc: "1,412 points on the app" },
      { label: "Media Kit", desc: "Brochure and manuals" },
      { label: "FAQs", desc: "Common questions" },
    ],
  },
} as const;

type DropdownKey = keyof typeof DROPDOWNS;

/** Mobile Products menu cards — payloads from the Figma mega-menu data */
const PRODUCT_MOBILE: readonly { label: string; desc?: string }[] = [
  { label: "Storm EV LongRange 200", desc: "1,200 kg" },
  { label: "Storm EV T1500", desc: "1,500 kg" },
  { label: "HiLoad EV", desc: "688 kg" },
  { label: "Turbo EV 1000", desc: "1,000 kg" },
  { label: "Neo HiRange" },
  { label: "Neo HiCity" },
];

/** Product mega-menu data (Figma "Property 1=Component 4" variant of Component 20) */
const MEGA_4W = [
  { name: "Strom EV LR 200", payload: "1,200 kg", img: "/assets/products/vehicle-storm-lr200.png" },
  { name: "Storm EV T1500", payload: "1,500 kg", img: "/assets/products/vehicle-storm-t1500.png" },
  { name: "Turbo EV 1000", payload: "1,000 kg", img: "/assets/products/vehicle-turbo-1000.png" },
];
const MEGA_3W = [{ name: "HiLoad EV", payload: "688 kg", img: "/assets/products/vehicle-hiload-ev.png" }];

/** Figma card: 200×267, #F3F4F5, radius 16; image 180×180 white/radius 12; ink arrow FAB */
function ProductCard({ name, payload, img }: { name: string; payload: string; img: string }) {
  return (
    <Link
      href="#"
      className="group relative block h-[267px] w-[200px] rounded-2xl bg-[#F3F4F5] p-[10px] pb-6"
    >
      <div className="flex h-[180px] w-[180px] items-center justify-center rounded-xl bg-white p-2">
        <Image src={img} alt={name} width={164} height={164} className="h-[164px] w-[164px] rounded-lg object-contain" />
      </div>
      <div className="mt-[15px] pl-[14px]">
        <p className="text-[16px] font-bold leading-[18px] text-ink">{name}</p>
        <p className="mt-[6px] text-[12px] font-medium leading-[14px] text-ink">{payload}</p>
      </div>
    </Link>
  );
}

/**
 * Full-width glass dropdown panel (Figma 1:2602/1:2606): bg-black/40 + blur
 * 15px, border-b white/32, px-80/py-32; uppercase Manrope Bold 16 heading
 * (tracking 0.8px), then a row of white #F3F4F5 cards (radius 16, p-24,
 * 20px apart) — label/desc in ink #121212 (Manrope Bold 16 / Medium 12) with
 * a 48px ink circle holding the white arrow icon (Figma transform: -rotate-90
 * -scale-x-100).
 */
function MenuPanel({
  heading,
  items,
}: {
  heading: string;
  items: readonly { label: string; desc: string }[];
}) {
  return (
    <div className="hidden border-b border-white/[0.32] bg-black/40 px-20 py-8 backdrop-blur-[15px] lg:block">
      <div className="flex gap-[60px] xl:gap-[100px]">
        {/* First Section */}
        <div className="flex flex-col items-start gap-[26px]">
          <p className="text-[16px] font-bold uppercase leading-[22px] tracking-[0.8px] text-white">
            {heading}
          </p>
          <div className="flex items-center gap-5">
            {items.map((item) => (
              heading === "HELP AND SERVICE" ? (
                <SupportMenuCard key={item.label} item={item} />
              ) : (
                <MenuCard key={item.label} item={item} />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportMenuCard({ item }: { item: { label: string; desc: string } }) {
  return (
    <Link
      href="#"
      className="flex h-[160px] w-[220px] flex-col justify-between rounded-[24px] bg-[#F3F4F5] p-6 transition-all duration-200 hover:bg-[#EAECEF]"
    >
      <div className="flex w-full justify-end">
        <span className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-ink transition-transform duration-200 group-hover:scale-110">
          <Image
            src="/assets/nav/arrow-right-white.svg"
            alt=""
            width={12}
            height={17}
            aria-hidden
            className="h-[17px] w-[11.5px] -rotate-90"
          />
        </span>
      </div>
      <span className="flex flex-col gap-[4px] whitespace-nowrap leading-[1.15] text-ink">
        <span className="text-[18px] font-bold tracking-[-0.32px]">{item.label}</span>
        <span className="text-[13px] font-medium tracking-[-0.24px] text-ink/80">{item.desc}</span>
      </span>
    </Link>
  );
}

function MenuCard({ item }: { item: { label: string; desc: string } }) {
  return (
    <Link
      href="#"
      className="group flex h-[160px] w-[220px] flex-col justify-between rounded-[24px] bg-[#F3F4F5] p-6 transition-all duration-200 hover:bg-[#EAECEF]"
    >
      <div className="flex w-full justify-end">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink transition-transform duration-200 group-hover:scale-110">
          <Image
            src="/assets/nav/arrow-right-white.svg"
            alt=""
            width={12}
            height={17}
            aria-hidden
            className="h-[17px] w-[11.5px] -rotate-90"
          />
        </span>
      </div>
      <span className="flex flex-col gap-[4px] whitespace-nowrap leading-[1.15] text-ink">
        <span className="text-[16px] font-bold tracking-[-0.32px]">{item.label}</span>
        <span className="text-[12px] font-medium tracking-[-0.24px]">{item.desc}</span>
      </span>
    </Link>
  );
}

/** Mobile menu accordion row — uppercase heading, 1px white/25 hairline below,
    thin plus/minus toggle (vertical bar collapses when open) */
function MenuRow({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex h-[52px] w-full items-center justify-between border-b border-white/25"
      >
        <span className="text-[18px] font-bold uppercase tracking-[0.5px] text-white">{label}</span>
        <span aria-hidden className="relative block h-[20px] w-[20px]">
          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-white" />
          <span
            className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-white transition-transform duration-200 ${open ? "scale-y-0" : ""}`}
          />
        </span>
      </button>
      {open && <div className="pt-4">{children}</div>}
    </div>
  );
}

/** Mobile menu card — white, r10, 15px semibold title + 13px gray subtitle */
function MenuCardLink({ item }: { item: { label: string; desc?: string } }) {
  return (
    <Link href="#" className="flex flex-col gap-1 rounded-[10px] bg-white px-3.5 py-3">
      <span className="text-[15px] font-semibold leading-[1.2] text-ink">{item.label}</span>
      {item.desc && <span className="text-[13px] leading-[1.3] text-ink-3">{item.desc}</span>}
    </Link>
  );
}

/**
 * Sticky glass navbar (Figma "Component 20" / mobile "Component 26").
 * Top gradient strip: linear 90deg #1D6FFF → #4A8CFF 50% → #347EFF 75% → #4A8CFF.
 */
export default function Navbar() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* close dropdown on Escape and on outside click */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const toggleDropdown = (key: DropdownKey) =>
    setOpenDropdown((cur) => (cur === key ? null : key));

  const chevron = (open: boolean) => (
    <Image
      src="/assets/nav/chevron-down.svg"
      alt=""
      width={9.3}
      height={4}
      aria-hidden
      className={`h-[4px] w-[9.333px] transition-transform duration-200 ${open ? "" : "rotate-180"}`}
    />
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {bannerOpen && (
        <div
          className="relative flex h-6 items-center justify-center lg:h-[22px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #1D6FFF 0%, #4A8CFF 50%, #347EFF 75%, #4A8CFF 100%)",
          }}
        >
          <p className="font-bold text-white text-[10px] leading-none tracking-[0.1px] lg:text-[14px]">
            Neo by Euler - Explore our electric 3 wheeler range
          </p>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setBannerOpen(false)}
            className="absolute right-[12px] top-1/2 -translate-y-1/2 lg:right-[49px]"
          >
            <Image
              src="/assets/nav/close.svg"
              alt=""
              width={7}
              height={7}
              aria-hidden
              className="h-[7px] w-[7px]"
            />
          </button>
        </div>
      )}

      <div ref={navRef} onMouseLeave={() => { if (!menuOpen) setOpenDropdown(null); }}>
        <nav
          className="relative flex items-center justify-between border-b border-white/[0.32] bg-black/40 pl-5 pr-0 lg:pl-20 lg:pr-0 backdrop-blur-[30px]"
          aria-label="Main navigation"
        >
          {/* mobile: hamburger — Figma "menu-01" icon (1:5204): 13.6×12.1
              white bars, 1.64 stroke, round caps, inset in an 18×18 button */}
          <div className="flex items-center py-[13px] lg:hidden">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-[18px] w-[18px] items-center justify-center"
            >
              {menuOpen ? (
                /* X state — two thin white bars crossing (same 1.64 stroke
                   as the menu-01 icon) */
                <span aria-hidden className="relative block h-[14px] w-[14px]">
                  <span className="absolute left-0 top-1/2 h-[1.64px] w-full -translate-y-1/2 rotate-45 bg-white" />
                  <span className="absolute left-0 top-1/2 h-[1.64px] w-full -translate-y-1/2 -rotate-45 bg-white" />
                </span>
              ) : (
                <Image
                  src="/assets/nav/menu.svg"
                  alt=""
                  width={14}
                  height={12}
                  aria-hidden
                  className="h-[12.136px] w-[13.636px]"
                />
              )}
            </button>
          </div>

          {/* mobile: logo (flex-centered in available space to avoid collision) */}
          <div className="flex flex-1 items-center justify-center pr-2 lg:hidden">
            <Link href="/" aria-label="Euler Motors home">
              <Image
                src="/assets/nav/logo-white.svg"
                alt="Euler Motors"
                width={121}
                height={20}
                className="h-5 w-[120.7px]"
              />
            </Link>
          </div>

          {/* desktop: logo + links */}
          <div className="hidden items-center lg:contents">
            <Link href="/" aria-label="Euler Motors home" className="flex items-center">
              <Image
                src="/assets/nav/logo-white.svg"
                alt="Euler Motors"
                width={145}
                height={24}
                className="h-6 w-[144.889px]"
                priority
              />
            </Link>
            <div className="flex items-center">
              <ul className="flex items-center gap-12 px-2.5">
                {(Object.keys(DROPDOWNS) as DropdownKey[]).map((key) => (
                  <li 
                    key={key} 
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(key)}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === key}
                      onClick={() => toggleDropdown(key)}
                      className="flex items-center gap-2.5 text-[14px] font-semibold text-white"
                    >
                      {key}
                      {chevron(openDropdown === key)}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    href="/#technology"
                    className="text-[14px] font-semibold text-white hover:text-white/80"
                  >
                    Technology
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* right cluster — desktop search + CTA / mobile CTA */}
          <div className="flex items-center lg:h-12 lg:gap-12 lg:pr-[3px]">
            <form
              role="search"
              action="/"
              className="hidden items-center gap-1 border-b border-white/80 pb-1.5 pr-10 lg:flex"
            >
              <Image
                src="/assets/nav/search.svg"
                alt=""
                width={14}
                height={14}
                aria-hidden
                className="h-3.5 w-3.5 scale-x-[-1]"
              />
              <label htmlFor="nav-search" className="sr-only">
                Search
              </label>
              <input
                id="nav-search"
                type="search"
                name="q"
                placeholder="Search here..."
                className="w-[110px] bg-transparent text-[14px] font-semibold text-white placeholder:text-white/80 focus:outline-none"
              />
            </form>
            <Link
              href="#book-test-drive"
              className="flex h-[42px] items-center justify-center gap-[5.3px] rounded-[2px] max-lg:rounded-r-none bg-white px-3 lg:gap-2 lg:px-8"
            >
              <span className="font-display text-[12px] font-semibold leading-none text-ink lg:text-[16px]">
                Book a Test Drive
              </span>
              <Arrow color="ink" />
            </Link>
          </div>
        </nav>

        {/* Company / Support dropdown panels (Figma 1:2826) */}
        {openDropdown && openDropdown !== "Product" && (
          <MenuPanel 
            heading={DROPDOWNS[openDropdown].heading} 
            items={DROPDOWNS[openDropdown].items} 
          />
        )}

        {/* Product mega-menu (Figma "Property 1=Component 4"): full-width glass
            panel, 420px tall, 80px side padding, vehicle cards + Neo promo */}
        {openDropdown === "Product" && (
          <div className="hidden bg-black/40 backdrop-blur-[30px] lg:block">
            <div className="flex items-start px-20 py-8">
              <div className="flex w-[632px] flex-col gap-[26px]">
                <p className="text-[16px] font-bold leading-[22px] text-white">
                  4 WHEEL GOODS VEHICLES
                </p>
                <div className="flex gap-4">
                  {MEGA_4W.map((p) => (
                    <ProductCard key={p.name} {...p} />
                  ))}
                </div>
              </div>

              <div aria-hidden className="ml-[29px] mr-[30px] w-px self-stretch bg-[#CCC]/20" />

              <div className="flex w-[226px] flex-col gap-[26px]">
                <p className="whitespace-nowrap text-[16px] font-bold leading-[22px] text-white">
                  3 WHEEL GOODS VEHICLES
                </p>
                {MEGA_3W.map((p) => (
                  <ProductCard key={p.name} {...p} />
                ))}
              </div>

              <div aria-hidden className="ml-[28px] mr-[29px] w-px self-stretch bg-[#CCC]/20" />

              {/* Neo promo card — using the new image as full background */}
              <div className="relative h-[355px] w-[305px] overflow-hidden rounded-2xl px-5 pt-6 bg-[#1b62cd]">
                <Image
                  src="/assets/neo/neo-card-image.png"
                  alt=""
                  fill
                  sizes="305px"
                  className="absolute inset-0 object-cover object-bottom"
                  priority
                />
                <div className="relative z-10 flex h-5 items-center">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-[-3px] w-[130px] bg-gradient-to-r from-white/0 to-white/20"
                  />
                  <span aria-hidden className="h-5 w-[19px] bg-white" />
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
              </div>
            </div>
          </div>
        )}

        {/* mobile menu overlay — per design screenshot: full-screen blurred
            backdrop under the navbar, uppercase 18px heading rows (~52px)
            split by 1px white/25 hairlines, +/− accordion toggles on the
            three dropdown sections, expanded content as a 2-col grid of
            white cards (title + subtitle), and the Neo promo card at the
            bottom (same lockup/headline/trucks as the Product mega-menu) */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="flex flex-col overflow-hidden bg-black/40 backdrop-blur-[24px] lg:hidden"
            style={{ height: `calc(100dvh - ${bannerOpen ? 71 : 47}px)` }}
          >
            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto">
            <div className="flex flex-col border-t border-white/25 px-5 pb-6">
              {/* PRODUCTS */}
              <MenuRow label="Products" open={openDropdown === "Product"} onToggle={() => toggleDropdown("Product")}>
                <div className="grid grid-cols-2 gap-2.5 pb-4">
                  {PRODUCT_MOBILE.map((item) => (
                    <MenuCardLink key={item.label} item={item} />
                  ))}
                </div>
                {/* Neo promo card — now properly inside the Products accordion */}
                <div className="relative mb-5 shrink-0 overflow-hidden rounded-2xl px-5 py-5 h-[300px] bg-[#1b62cd]">
                  <Image
                    src="/assets/neo/neo-card-image.png"
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 100vw"
                    className="absolute inset-0 object-cover object-bottom"
                  />
                  <div className="relative z-10 flex h-5 items-center">
                    <span aria-hidden className="h-5 w-[19px] bg-white" />
                    <span className="ml-[6px] text-[14px] font-bold leading-none text-white">Neo by Euler</span>
                  </div>
                  <p className="relative z-10 mt-[10px] max-w-[65%] font-display text-[28px] font-semibold leading-[32px] text-white">
                    HiRange and HiCity
                  </p>
                  <p className="relative z-10 mt-2 max-w-[65%] text-[13px] font-medium leading-[1.4] text-white">
                    Smaller vehicles for city delivery. Built for owner drivers and
                    delivery partners.
                  </p>
                  <Button variant="dark" arrow="white" className="relative z-10 mt-4">
                    Explore Neo
                  </Button>
                </div>
              </MenuRow>
              {/* TECHNOLOGY — plain link row */}
              <Link
                href="/#technology"
                className="flex h-[52px] items-center border-b border-white/25 text-[18px] font-bold uppercase tracking-[0.5px] text-white"
              >
                Technology
              </Link>
              {/* RESOURCES — plain link row */}
              <Link
                href="#"
                className="flex h-[52px] items-center border-b border-white/25 text-[18px] font-bold uppercase tracking-[0.5px] text-white"
              >
                Resources
              </Link>
              {/* COMPANY */}
              <MenuRow label="Company" open={openDropdown === "Company"} onToggle={() => toggleDropdown("Company")}>
                <div className="grid grid-cols-2 gap-2.5 border-b border-white/25 pb-4">
                  {DROPDOWNS.Company.items.map((item) => (
                    <MenuCardLink key={item.label} item={item} />
                  ))}
                </div>
              </MenuRow>
              {/* SUPPORT */}
              <MenuRow label="Support" open={openDropdown === "Support"} onToggle={() => toggleDropdown("Support")}>
                <div className="grid grid-cols-2 gap-2.5 border-b border-white/25 pb-4">
                  {DROPDOWNS.Support.items.map((item) => (
                    <MenuCardLink key={item.label} item={item} />
                  ))}
                </div>
              </MenuRow>
            </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
