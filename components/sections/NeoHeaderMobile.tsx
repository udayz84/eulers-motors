"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const A = "/assets/neo/main-image/";

function Arrow() {
  return (
    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-[1.684px] bg-[#121212]">
      <span className="relative h-[11.789px] w-[18.526px] shrink-0">
        <span className="absolute inset-[-16.41%_-1.68%_-22.88%_-3.41%]">
          <Image src={`${A}arrow.svg`} alt="" width={23} height={20} className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
}

export default function NeoHeaderMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
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
        announcementVisible
          ? "-mb-[65px] min-[640px]:max-[1023px]:-mb-[94px]"
          : "-mb-[41px] min-[640px]:max-[1023px]:-mb-[64px]"
      }`}
    >
      {announcementVisible && (
        <div className="flex h-6 shrink-0 items-center justify-between self-stretch bg-[#121212] px-5 py-1 font-sans text-[10px] font-[700] not-italic leading-normal text-white min-[640px]:max-[1023px]:h-[30px] min-[640px]:max-[1023px]:px-8 min-[640px]:max-[1023px]:text-[12px]">
          <span>Euler - Explore our electric 4 wheeler range</span>
          <button
            type="button"
            aria-label="Close announcement"
            onClick={() => setAnnouncementVisible(false)}
            className="grid size-[9px] shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" className="block size-[9px]">
              <path d="M0.75 0.75L7.75 7.75M7.75 0.75L0.75 7.75" strokeWidth="1.5" strokeLinecap="round" stroke="white" />
            </svg>
          </button>
        </div>
      )}
      <header
        className={`flex h-[41px] items-center justify-between border-b py-[2px] pl-5 pr-[2px] transition-colors duration-200 backdrop-blur-[20px] min-[640px]:max-[1023px]:h-[64px] min-[640px]:max-[1023px]:pl-8 min-[640px]:max-[1023px]:pr-8 ${
          scrolled || menuOpen
            ? "border-white/20 bg-[#071511]/90 shadow-lg"
            : "border-white/30 bg-black/20"
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid size-[18px] place-items-center text-[18px] leading-none text-white min-[640px]:max-[1023px]:size-6 min-[640px]:max-[1023px]:text-[24px]"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <a href="#top" aria-label="NEO by Euler home" className="relative h-[31.4px] w-[112.3px] shrink-0 overflow-hidden min-[640px]:max-[1023px]:h-[42px] min-[640px]:max-[1023px]:w-[150px]">
          <Image
            src={`${A}mobile-nav-logo.png`}
            alt="NEO by Euler"
            width={112}
            height={31}
            sizes="112px"
            className="absolute max-w-none object-fill"
            style={{ left: 0, top: "-268.34%", width: "100%", height: "637.58%" }}
          />
        </a>
        <a
          href="#contact"
          className="flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-gradient-to-r from-[#00ff87] to-[#1d6fff] py-[2px] pl-3 pr-[2px] font-display text-[12px] font-semibold leading-none text-white no-underline min-[640px]:max-[1023px]:h-[42px] min-[640px]:max-[1023px]:gap-3 min-[640px]:max-[1023px]:pl-4 min-[640px]:max-[1023px]:text-[14px]"
        >
          Book a Test Drive <Arrow />
        </a>
        {menuOpen && (
          <nav className="absolute left-0 right-0 top-full grid gap-3 border-b border-white/10 bg-[#101719]/95 p-5 text-sm text-white shadow-xl backdrop-blur-[24px]">
            <a href="/products" onClick={() => setMenuOpen(false)}>Vehicles</a>
            <a href="/technology" onClick={() => setMenuOpen(false)}>Technology</a>
            <a href="/about" onClick={() => setMenuOpen(false)}>About us</a>
            <a href="/careers" onClick={() => setMenuOpen(false)}>Careers</a>
            <a href="/in-press" onClick={() => setMenuOpen(false)}>In press</a>
            <a href="/dealer-locator" onClick={() => setMenuOpen(false)}>Find a dealer</a>
            <a href="/service-centers" onClick={() => setMenuOpen(false)}>Service centres</a>
            <a href="/charging-stations" onClick={() => setMenuOpen(false)}>Charging stations</a>
            <a href="/faq" onClick={() => setMenuOpen(false)}>FAQs</a>
          </nav>
        )}
      </header>
    </div>
  );
}
