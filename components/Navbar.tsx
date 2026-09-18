"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "./ui/Arrow";

/** Dropdown data grounded in the Figma file's own link columns (footer) */
const DROPDOWNS = {
  Product: [
    "Storm EV LongRange 200",
    "Storm EV T1500",
    "HiLoad EV",
    "Turbo EV 1000",
    "Neo HiRange",
    "Neo HiCity",
  ],
  Company: ["About us", "Careers", "Sitemap"],
  Support: ["Dealer Locator", "Service Centres", "Charging Stations Locator", "Downloads"],
} as const;

type DropdownKey = keyof typeof DROPDOWNS;

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
      className={`mt-[3px] h-[4px] w-[9.333px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

      <div ref={navRef}>
        <nav
          className="relative flex items-center justify-between border-b border-white/30 bg-black/40 pl-5 pr-0 lg:pl-10 lg:pr-3 backdrop-blur-[15px]"
          aria-label="Main navigation"
        >
          {/* mobile: hamburger */}
          <div className="flex items-center py-[13px] lg:hidden">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-[18px] w-[18px] flex-col justify-between"
            >
              <span className="block h-[2px] w-full bg-white" />
              <span className="block h-[2px] w-full bg-white" />
              <span className="block h-[2px] w-full bg-white" />
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
                  <li key={key} className="relative">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === key}
                      onClick={() => toggleDropdown(key)}
                      className="flex items-center gap-2.5 text-[14px] font-semibold text-white"
                    >
                      {key === "Support" && (
                        <span className="flex h-[23.28px] w-[23.086px] items-center justify-center">
                          <Image
                            src="/assets/nav/phone-white.svg"
                            alt=""
                            width={17.5}
                            height={17.3}
                            aria-hidden
                            className="h-[17.315px] w-[17.459px]"
                          />
                        </span>
                      )}
                      {key}
                      {chevron(openDropdown === key)}
                    </button>

                    {openDropdown === key && (
                      <ul
                        role="menu"
                        aria-label={key}
                        className="absolute left-0 top-[calc(100%+12px)] w-56 overflow-hidden rounded-lg border border-white/10 bg-black/70 py-2 backdrop-blur-[15px]"
                      >
                        {DROPDOWNS[key].map((item) => (
                          <li key={item} role="none">
                            <Link
                              role="menuitem"
                              href="#"
                              className="block px-4 py-2 text-[14px] font-semibold text-white hover:bg-white/10 focus-visible:bg-white/10 focus:outline-none"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
          <div className="flex items-center lg:h-12 lg:gap-12">
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
                className="h-3.5 w-3.5"
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

        {/* mobile menu dropdown */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-b border-white/30 bg-black/70 backdrop-blur-[15px] lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {(Object.keys(DROPDOWNS) as DropdownKey[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    aria-expanded={openDropdown === key}
                    onClick={() => toggleDropdown(key)}
                    className="flex w-full items-center justify-between py-2 text-[14px] font-semibold text-white"
                  >
                    {key}
                    {chevron(openDropdown === key)}
                  </button>
                  {openDropdown === key && (
                    <ul className="pb-2 pl-3">
                      {DROPDOWNS[key].map((item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="block py-2 text-[14px] font-medium text-white/80"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/#technology"
                  className="block py-2 text-[14px] font-semibold text-white"
                >
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
