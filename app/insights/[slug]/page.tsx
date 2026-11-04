"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWidget from "@/components/FloatingWidget";

const HERO_IMAGE = "/assets/insights/article-featured-3.png";
const ARTICLE_IMAGES = {
  connected: "/assets/insights/article-featured-1.png",
  office: "/assets/insights/article-featured-2.png",
  comparison: "/assets/insights/article-featured-3.png",
};

const RELATED_ARTICLES = [
  {
    image: ARTICLE_IMAGES.connected,
    category: "Technology",
    title: "How Connected Vehicles Help Businesses Run Better",
    description: "See how connected vehicle technology can help businesses run smarter fleets.",
    date: "28 July 2026",
    slug: "connected-vehicles-business",
  },
  {
    image: ARTICLE_IMAGES.office,
    category: "Industry",
    title: "The Real Cost of Running an Electric Fleet",
    description: "A side-by-side look at the everyday costs behind electric and diesel fleets.",
    date: "28 July 2026",
    slug: "real-cost-electric",
  },
  {
    image: ARTICLE_IMAGES.comparison,
    category: "Industry",
    title: "Understanding EV Subsidies and Incentives",
    description: "A practical guide to the support available for commercial electric vehicles.",
    date: "28 July 2026",
    slug: "ev-subsidies",
  },
];

const SHARE_LINKS = [
  { name: "Instagram", icon: "/assets/insights/figma-instagram.svg", url: "https://www.instagram.com/" },
  { name: "LinkedIn", icon: "/assets/insights/figma-linkedin.svg", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
  { name: "YouTube", icon: "/assets/insights/figma-youtube.svg", url: "https://www.youtube.com/" },
  { name: "X", icon: "/assets/insights/figma-x.svg", url: "https://twitter.com/intent/tweet?url=" },
];

function ArticleImage({ src, alt, className = "", imageClassName = "", mobileSrc }: { src: string; alt: string; className?: string; imageClassName?: string; mobileSrc?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] bg-[#e8ebef] ${className}`}>
      {mobileSrc && <Image src={mobileSrc} alt={alt} fill sizes="(max-width: 767px) 90vw, 560px" className={`object-cover lg:hidden ${imageClassName}`} />}
      <Image src={src} alt={mobileSrc ? "" : alt} fill sizes="(max-width: 767px) 90vw, 560px" className={`object-cover ${mobileSrc ? "hidden lg:block" : ""} ${imageClassName}`} />
    </div>
  );
}

function ShareActions({ title }: { title: string }) {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-5" aria-label="Share this article">
      {SHARE_LINKS.map((share) => (
        <a
          key={share.name}
          href={pageUrl ? `${share.url}${encodedUrl}${share.name === "X" ? `&text=${encodedTitle}` : ""}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${share.name}`}
          className="flex size-[38px] items-center justify-center rounded-[6.653px] bg-[#f3f4f5] transition-colors hover:bg-[#e9edf3]"
        >
          <Image
            src={share.icon}
            alt=""
            width={18}
            height={18}
            className={share.name === "Instagram" || share.name === "LinkedIn" ? "-scale-y-100" : ""}
          />
        </a>
      ))}
    </div>
  );
}

function BookTestDriveCard() {
  const [tab, setTab] = useState("Test drive");

  const continueEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign("/products#book-test-drive");
  };

  return (
    <aside id="book-test-drive" className="scroll-mt-24 -mx-3 flex w-[calc(100%+24px)] min-w-0 flex-col gap-3 overflow-hidden rounded-[10px] bg-[#f3f4f5] p-4 lg:mx-0 lg:h-full lg:w-full lg:gap-8 lg:rounded-[16px] lg:p-8">
      <div className="flex flex-col gap-[6px] lg:hidden">
        <div className="relative flex h-4 items-center gap-1">
          <Image src="/assets/insights/figma-eyebrow-reading.svg" alt="" width={117} height={16} className="absolute left-[3.43px] top-0 h-4 w-[116.978px]" />
          <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" width={15} height={16} className="relative h-4 w-[14.794px]" />
          <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-[#0e2f6d]">Free, 40 minutes</span>
        </div>
        <p className="font-sans text-[24px] font-bold leading-[1.15] tracking-[-0.48px] text-[#121212]">Book a test drive</p>
        <p className="font-sans text-[12px] leading-normal text-[#121212]">We bring the vehicle to you with a load on it.</p>
      </div>
      <div className="hidden w-full flex-col gap-3 text-[#121212] lg:flex">
        <p className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px]">Book a test drive</p>
        <p className="text-[16px] leading-normal">Two steps. We call you within one working day.</p>
      </div>
      <div className="hidden w-full gap-3 lg:flex" role="tablist" aria-label="Enquiry type">
        {["Test drive", "Price Enquiry", "Fleet"].map((name) => (
          <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`flex h-[42px] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full px-6 font-display text-[16px] font-semibold leading-none transition-colors ${tab === name ? "bg-[#0c2c66] text-white" : "border border-white/50 bg-white/80 text-[#121212] backdrop-blur-[10px] hover:bg-white"}`}>
            {name}
          </button>
        ))}
      </div>
      <form onSubmit={continueEnquiry} className="hidden w-full flex-col gap-8 lg:contents">
        <div className="grid w-full grid-cols-2 gap-3">
          <label className="flex min-w-0 flex-col gap-1 text-[12px] font-medium leading-normal text-[#212125]">
            Name *
            <input name="desktop-name" autoComplete="name" required placeholder="Full name" className="h-[46px] w-full rounded-[13px] border border-[#ededed] bg-white px-4 py-[2px] text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af] focus:border-[#1d6fff]" />
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-[12px] font-medium leading-normal text-[#212125]">
            Mobile number *
            <input name="desktop-mobile" autoComplete="tel" type="tel" inputMode="numeric" pattern="[0-9]{10}" required maxLength={10} placeholder="10 digit" className="h-[46px] w-full rounded-[13px] border border-[#ededed] bg-white px-4 py-[2px] text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af] focus:border-[#1d6fff]" />
          </label>
        </div>
        <label className="flex w-full min-w-0 flex-col gap-1 text-[12px] font-medium leading-normal text-[#212125]">
          Which vehicle *
          <span className="relative block">
            <select name="desktop-vehicle" defaultValue="" required className="h-[46px] w-full appearance-none rounded-[13px] border border-[#ededed] bg-white pl-4 pr-10 py-[2px] text-[12px] font-medium text-[#9ca3af] outline-none focus:border-[#1d6fff]">
              <option value="" disabled>Not sure, please suggest one</option>
              <option>Storm EV</option><option>HiLoad EV</option><option>Turbo EV</option><option>Not sure yet</option>
            </select>
            <Image src="/assets/insights/figma-chevron.svg" alt="" width={14} height={7} aria-hidden="true" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 -scale-y-100" />
          </span>
        </label>
        <div className="grid w-full grid-cols-2 gap-3">
          <label className="flex min-w-0 flex-col gap-1 text-[12px] font-medium leading-normal text-[#212125]">
            City *<input name="desktop-city" placeholder="Mumbai" className="h-[46px] w-full rounded-[13px] border border-[#ededed] bg-white px-4 py-[2px] text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af] focus:border-[#1d6fff]" />
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-[12px] font-medium leading-normal text-[#212125]">
            Kilometres per day*<input name="kilometres" placeholder="150" className="h-[46px] w-full rounded-[13px] border border-[#ededed] bg-white px-4 py-[2px] text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af] focus:border-[#1d6fff]" />
          </label>
        </div>
        <label className="flex w-full items-start gap-[10px] text-[14px] font-medium leading-normal text-[#121212]">
          <input type="checkbox" name="contact-consent" className="mt-[1px] size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] checked:bg-[#0c2c66]" />
          <span>Euler Motors and its dealers may contact me about this enquiry. Privacy policy.</span>
        </label>
        <div className="flex w-full flex-col gap-3">
          <button type="submit" className="inline-flex h-[50.477px] w-fit items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-6 font-display text-[16px] font-semibold leading-none text-white transition-colors hover:bg-[#0c2c66]">
            {tab === "Test drive" ? "Confirm test drive" : tab === "Fleet" ? "Talk to our fleet team" : "Get price list"}
            <Image src="/assets/insights/figma-fleet-arrow.svg" alt="" width={22} height={14} aria-hidden="true" />
          </button>
          <p className="w-full text-center text-[12px] font-medium leading-normal text-[#121212]">We never share your number with anyone else. No spam calls.</p>
        </div>
      </form>
      <form onSubmit={continueEnquiry} className="grid grid-cols-2 gap-x-1.5 gap-y-3 lg:gap-3">
        <label className="order-2 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:order-1">
          Name *
          <input name="name" autoComplete="name" required placeholder="Full name" className="h-9 min-w-0 rounded-[8px] border border-[#ededed] bg-white px-4 text-[12px] outline-none focus:border-[#1d6fff] lg:h-[46px] lg:rounded-[13px]" />
        </label>
        <label className="order-3 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:order-2">
          Mobile number *
          <input name="mobile" autoComplete="tel" type="tel" inputMode="numeric" pattern="[0-9]{10}" required maxLength={10} placeholder="10 digit" className="h-9 min-w-0 rounded-[8px] border border-[#ededed] bg-white px-4 text-[12px] outline-none focus:border-[#1d6fff] lg:h-[46px] lg:rounded-[13px]" />
        </label>
        <label className="order-1 col-span-2 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:order-3">
          Which vehicle? <span className="hidden lg:inline">*</span>
          <select name="vehicle" defaultValue="" required className="h-9 rounded-[8px] border border-[#ededed] bg-white px-4 text-[12px] text-[#9ca3af] outline-none focus:border-[#1d6fff] lg:h-[46px] lg:rounded-[13px]">
            <option value="" disabled>Select a vehicle</option>
            <option>Storm EV</option>
            <option>HiLoad EV</option>
            <option>Turbo EV</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="order-4 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:hidden">
          State*
          <select name="state" defaultValue="" required className="h-9 rounded-[8px] border border-[#ededed] bg-white px-3 text-[12px] text-[#9ca3af] outline-none focus:border-[#1d6fff]"><option value="" disabled>Select State</option><option>Delhi</option><option>Maharashtra</option><option>Karnataka</option></select>
        </label>
        <label className="order-5 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:hidden">
          City*
          <select name="city" defaultValue="" required className="h-9 rounded-[8px] border border-[#ededed] bg-white px-3 text-[12px] text-[#9ca3af] outline-none focus:border-[#1d6fff]"><option value="" disabled>Select City</option><option>Delhi</option><option>Mumbai</option><option>Bengaluru</option></select>
        </label>
        <label className="order-6 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:hidden">
          Pincode*
          <input name="pincode" inputMode="numeric" pattern="[0-9]{6}" required placeholder="Enter Pincode" className="h-9 rounded-[8px] border border-[#ededed] bg-white px-4 text-[12px] outline-none focus:border-[#1d6fff]" />
        </label>
        <label className="order-7 col-span-2 flex min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:hidden">
          Product*
          <select name="product" defaultValue="" required className="h-9 rounded-[8px] border border-[#ededed] bg-white px-4 text-[12px] text-[#9ca3af] outline-none focus:border-[#1d6fff]"><option value="" disabled>Select Product</option><option>Storm EV</option><option>HiLoad EV</option><option>Turbo EV</option></select>
        </label>
        <label className="hidden min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:order-4 lg:flex">
          City *<input name="desktop-city" placeholder="Mumbai" className="h-[46px] min-w-0 rounded-[13px] border border-[#ededed] bg-white px-4 text-[12px] outline-none focus:border-[#1d6fff]" />
        </label>
        <label className="hidden min-w-0 flex-col gap-1 text-[12px] font-medium text-[#212125] lg:order-5 lg:flex">
          Kilometres per day*<input name="kilometres" placeholder="150" className="h-[46px] min-w-0 rounded-[13px] border border-[#ededed] bg-white px-4 text-[12px] outline-none focus:border-[#1d6fff]" />
        </label>
        <button type="submit" className="order-8 col-span-2 mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-5 font-display text-[12px] font-bold leading-none text-white transition-colors hover:bg-[#0e2f6d] lg:order-6 lg:h-[50px] lg:px-6 lg:text-[16px] lg:font-semibold">
          {tab === "Test drive" ? "Confirm test drive" : tab === "Fleet" ? "Talk to our fleet team" : "Get price list"}
          <svg aria-hidden="true" viewBox="0 0 22 14" className="h-3 w-[18.857px] lg:h-[14px] lg:w-[22px]" fill="none"><path d="M1 7h19m-6-5 6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </form>
      <p className="w-full max-w-[271px] self-center text-center text-[12px] font-medium leading-normal text-[#121212]">We never share your number with anyone else. No spam calls.</p>
    </aside>
  );
}

function ArticleCallout({ children }: { children: React.ReactNode }) {
  return <div className="my-7 rounded-[10px] border-l-[3px] border-[#1d6fff] bg-[#f3f4f5] px-5 py-4 text-[14px] leading-[1.65] text-[#121212] sm:my-8 sm:px-6 sm:py-5 sm:text-[16px] lg:text-[18px]">{children}</div>;
}

function LegacyRelatedArticles() {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => rowRef.current?.scrollBy({ left: direction * 390, behavior: "smooth" });

  return (
    <section className="bg-white pb-10 pt-12 sm:pb-14 sm:pt-16" aria-labelledby="related-heading">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.7px] text-[#0e2f6d]">More to explore</p>
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <h2 id="related-heading" className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] sm:text-[40px] sm:tracking-[-0.8px]">Related articles</h2>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous related articles" className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-[#f3f4f5]">
              <span aria-hidden="true" className="text-xl leading-none">‹</span>
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next related articles" className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-[#f3f4f5]">
              <span aria-hidden="true" className="text-xl leading-none">›</span>
            </button>
          </div>
        </div>
        <div ref={rowRef} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-5">
          {RELATED_ARTICLES.map((article) => (
            <Link key={article.slug} href="/insights" className="flex w-[min(86vw,360px)] shrink-0 snap-start flex-col gap-3 rounded-[12px] bg-[#f3f4f5] p-2 transition-shadow hover:shadow-lg sm:w-[calc((100%-20px)/2)] sm:p-3 lg:w-[calc((100%-40px)/3)]">
              <div className="relative h-[160px] overflow-hidden rounded-[8px] sm:h-[190px]">
                <Image src={article.image} alt="" fill sizes="(max-width: 639px) 86vw, 360px" className="object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#121212]">{article.category}</span>
                <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white">
                  <Image src="/assets/insights/article-arrow.svg" alt="" width={18} height={18} />
                </span>
              </div>
              <div className="flex flex-col gap-1 px-2 pb-2">
                <p className="text-[11px] font-semibold text-[#5c6675]">{article.date} <span aria-hidden="true">·</span> 5 min read</p>
                <h3 className="font-display text-[16px] font-semibold leading-[1.3] tracking-[-0.32px] text-[#121212]">{article.title}</h3>
                <p className="line-clamp-2 text-[12px] leading-[1.5] text-[#121212]">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const FIGMA_RELATED_CARDS = [
  {
    id: "connected-vehicles-business-a",
    image: "/assets/insights/figma-related-article.png",
    category: "Technology",
    title: "How Connected Vehicles Help Businesses Run Better",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "See how connected vehicle technology can help businesses…",
    href: "/insights/connected-vehicles-business",
  },
  {
    id: "connected-vehicles-business-b",
    image: "/assets/insights/figma-related-article.png",
    category: "Technology",
    title: "How Connected Vehicles Help Businesses Run Better",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "See how connected vehicle technology can help businesses…",
    href: "/insights/connected-vehicles-business",
  },
];

const MOBILE_RELATED_CARDS = [
  {
    id: "connected-vehicles-business",
    image: "/assets/insights/figma-mobile-article-3.png",
    category: "Technology",
    title: "How Connected Vehicles Help Businesses Run Better",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "See how connected vehicle technology can help businesses…",
    href: "/insights/connected-vehicles-business",
  },
  {
    id: "real-cost-electric",
    image: "/assets/insights/figma-mobile-article-2.png",
    category: "Industry",
    title: "The Real Cost of Running an Electric…",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "A side-by-side comparison of electric versus diesel running costs for last-mile delivery…",
    href: "/insights/real-cost-electric",
  },
  {
    id: "ev-subsidies",
    image: "/assets/insights/article-featured-4.png",
    category: "Industry",
    title: "Understanding EV Subsidies and…",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "A practical guide to central and state subsidies available for commercial electric…",
    href: "/insights/ev-subsidies",
  },
  {
    id: "charging-network",
    image: "/assets/insights/figma-related-article.png",
    category: "Industry",
    title: "What Makes a Good Charging Network…",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "Depot charging, highway charging and the infrastructure decisions that matter for fleet…",
    href: "/insights/charging-network",
  },
  {
    id: "ev-maintenance-best-practices",
    image: "/assets/insights/article-featured-1.png",
    category: "Service",
    title: "Electric Vehicle Maintenance Best Practices",
    date: "10 July 2026",
    readTime: "4 min read",
    excerpt: "Essential tips for maintaining your electric fleet.",
    href: "/insights/ev-maintenance-best-practices",
  },
  {
    id: "battery-technology-advances",
    image: "/assets/insights/article-featured-2.png",
    category: "Technology",
    title: "Battery Technology Advances in 2026",
    date: "5 July 2026",
    readTime: "6 min read",
    excerpt: "Latest breakthroughs in battery technology for commercial EVs.",
    href: "/insights/battery-technology-advances",
  },
];

function RelatedArticles() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);

  const scroll = (direction: -1 | 1) => {
    const row = rowRef.current;
    const card = row?.querySelector<HTMLElement>("[data-related-card]");
    if (!row || !card) return;
    const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const updateProgress = () => {
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setProgress(maxScroll > 0 ? Math.min(Math.max(row.scrollLeft / maxScroll, 0), 1) : 0);
  };

  return (
    <section className="relative overflow-hidden bg-white lg:h-[579.356px] lg:pb-[62px] lg:pt-16" aria-labelledby="related-heading">
      <div className="relative flex flex-col items-center gap-4 px-5 py-8 lg:hidden">
        <div className="relative flex h-[20.355px] w-full items-center gap-[6px]">
          <Image src="/assets/insights/figma-eyebrow-reading.svg" alt="" aria-hidden width={147} height={21} className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px]" />
          <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" aria-hidden width={19} height={21} className="relative h-[20.355px] w-[18.821px]" />
          <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-[#0e2f6d]">Keep reading</span>
        </div>
        <h2 id="related-heading-mobile" className="w-full font-sans text-[24px] font-bold leading-[1.15] tracking-[-0.48px] text-[#121212]">Related articles</h2>
        <div className="flex w-full flex-col gap-2">
          {MOBILE_RELATED_CARDS.slice(0, mobileVisibleCount).map((article) => (
            <Link key={article.id} href={article.href} className="flex h-[282px] w-full shrink-0 flex-col gap-3 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-2">
              <div className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-[8px]">
                <Image src={article.image} alt="" fill sizes="353px" className={`rounded-[8px] object-cover ${article.id === "real-cost-electric" ? "scale-x-[1.12] object-[50%_60%]" : ""}`} />
                <span className="absolute left-[6px] top-[6px] flex h-[25px] w-[83px] items-center justify-center rounded-[39.312px] bg-white p-0 text-[12px] font-semibold leading-normal text-black">{article.category}</span>
                <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white lg:right-[12.333px] lg:top-[11.645px] lg:size-9 lg:p-[11px_12px]">
                  <Image src="/assets/insights/article-arrow.svg" alt="" width={20} height={20} className="size-5 shrink-0 aspect-square" />
                </span>
              </div>
              <div className="flex min-h-0 flex-col gap-[6px] px-3 pb-0 pt-1">
                <h3 className="shrink-0 overflow-hidden text-ellipsis whitespace-nowrap font-display text-[16px] font-semibold leading-[1.5] tracking-[-0.32px] text-[#121212]">{article.title}</h3>
                <div className="flex items-center gap-2 text-[12px] font-semibold leading-normal text-[rgba(18,18,18,0.6)]">
                  <span>{article.date}</span><span aria-hidden="true" className="size-[3.145px] shrink-0 rounded-full bg-black/50" /><span>{article.readTime}</span>
                </div>
                <p className="line-clamp-2 text-[12px] leading-[1.4] text-[#121212]">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        {mobileVisibleCount < MOBILE_RELATED_CARDS.length && (
          <button type="button" onClick={() => setMobileVisibleCount((count) => Math.min(count + 2, MOBILE_RELATED_CARDS.length))} className="flex h-8 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-5 font-display text-[12px] font-bold leading-none text-[#121212]">
            Load More
          </button>
        )}
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[80px] z-10 h-[49.664px] w-[54.598px] bg-[linear-gradient(270deg,#fff_13.618%,rgba(255,255,255,0)_100%)]" />
      </div>

      <div className="mx-auto hidden w-full max-w-[1440px] flex-col gap-5 px-5 lg:flex lg:gap-8 lg:px-20">
        <header className="flex w-full flex-col items-start lg:h-[96.355px] lg:items-start lg:justify-between">
          <div className="flex flex-col items-start gap-3 lg:items-start lg:gap-4">
            <div className="relative flex h-[20.355px] items-center gap-[6px]">
              <Image src="/assets/insights/figma-eyebrow-reading.svg" alt="" width={147} height={21} className="absolute left-[-2px] top-0 h-[20.355px] w-[148.821px] lg:left-[3.43px]" />
              <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" width={19} height={21} className="relative h-[20.355px] w-[18.821px]" />
              <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-[#0e2f6d] lg:text-[14px] lg:tracking-[0.7px]">Keep reading</span>
            </div>
            <h2 id="related-heading" className="whitespace-nowrap font-sans text-[24px] font-bold leading-[1.15] tracking-[-0.48px] text-[#121212] lg:font-display lg:text-[52px] lg:font-semibold lg:tracking-[-1.04px]">Related articles</h2>
          </div>
        </header>

        <div className="relative -mr-5 w-[calc(100%+20px)] lg:left-[calc(50%-50vw)] lg:w-screen">
          <div ref={rowRef} onScroll={updateProgress} className="no-scrollbar flex snap-x snap-mandatory flex-row gap-3 overflow-x-auto scroll-smooth pb-2 touch-pan-x lg:gap-8 lg:overflow-y-hidden lg:pb-0 lg:pl-20 lg:pr-0 lg:[scroll-padding-left:80px]">
            {FIGMA_RELATED_CARDS.map((article) => (
              <Link key={article.id} data-related-card href={article.href} className="flex h-[282px] w-full shrink-0 snap-start flex-col gap-2 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-2 transition-shadow hover:shadow-lg lg:h-[273px] lg:w-[807px] lg:flex-row lg:items-start lg:gap-6 lg:p-5">
                <div className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-[8px] p-2 lg:h-[233px] lg:w-[353px] lg:p-3">
                  <Image src={article.id.endsWith("b") ? "/assets/insights/figma-mobile-article-3.png" : "/assets/insights/figma-mobile-article-1.png"} alt="" fill sizes="(max-width: 767px) 90vw, 353px" className="object-cover lg:hidden" />
                  <Image src={article.image} alt="" fill sizes="(max-width: 767px) 90vw, 353px" className="hidden object-cover lg:block" />
                  <span className="absolute left-2 top-2 rounded-[50px] bg-white px-[10px] py-2 text-[12px] font-bold text-black lg:left-3 lg:top-3 lg:py-1 lg:text-[14px]">{article.category}</span>
                  <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white lg:right-[12px] lg:top-[11.645px] lg:size-9 lg:aspect-square lg:gap-[10px] lg:px-3 lg:py-[11px]">
                    <Image src="/assets/insights/article-arrow.svg" alt="" width={20} height={20} className="size-5 shrink-0 aspect-square" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1 px-3 pb-1 pt-0 lg:w-[390px] lg:gap-1.5 lg:px-0 lg:pb-0 lg:pt-0">
                  <h3 className="line-clamp-1 font-display text-[16px] font-semibold leading-[1.3] tracking-[-0.32px] text-[#121212] lg:line-clamp-none lg:text-[26px] lg:leading-[1.15] lg:tracking-[-0.52px]">{article.title}</h3>
                  <div className="flex items-center gap-[10px] text-[12px] font-bold leading-normal text-[rgba(18,18,18,0.6)] lg:text-[14px]">
                    <span>{article.date}</span><span aria-hidden="true" className="size-[3.145px] shrink-0 rounded-full bg-black/50" /><span>{article.readTime}</span>
                  </div>
                  <p className="text-[12px] leading-[1.4] text-[#121212] lg:text-[16px] lg:leading-normal">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <button type="button" onClick={() => scroll(-1)} aria-label="Previous related articles" className="absolute left-5 top-1/2 z-20 hidden size-[55px] -translate-y-1/2 items-center justify-center lg:left-[50px] lg:flex">
            <Image src="/assets/insights/figma-related-nav-left.svg" alt="" width={55} height={55} className="rotate-180" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next related articles" className="absolute right-5 top-1/2 z-20 hidden size-[55px] -translate-y-1/2 items-center justify-center lg:right-[50px] lg:flex">
            <Image src="/assets/insights/figma-related-nav-right.svg" alt="" width={55} height={55} />
          </button>
        </div>

        <div className="hidden justify-center lg:mt-0 lg:flex">
          <div className="relative flex h-5 w-[116.199px] items-center rounded-[14.4px] bg-[rgba(204,204,204,0.5)] p-1">
            <div className="h-3 w-[29.891px] rounded-[23.04px] bg-[#121212] transition-transform duration-300" style={{ transform: `translateX(${progress * 78.308}px)` }} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[14px] z-10 hidden h-[551px] w-[210.811px] bg-[linear-gradient(270deg,#fff_0%,rgba(255,255,255,0)_100%)] lg:block" />
    </section>
  );
}

function FleetBanner() {
  return (
    <>
    <section className="bg-white px-5 pb-5 pt-2 lg:hidden">
      <div className="relative mx-auto h-[384px] w-full max-w-[353px] overflow-hidden rounded-[8px] bg-[linear-gradient(175.729deg,rgba(194,211,241,0.8)_21.28%,rgba(91,148,214,0.8)_151.97%)]">
        <div aria-hidden="true" className="absolute left-[14.164%] top-[175px] h-[249px] w-[88.385%] overflow-hidden">
          <Image src="/assets/insights/figma-fleet-banner.png" alt="" width={520} height={415} className="absolute left-0 top-0 h-[125.24%] w-full max-w-none object-fill" />
        </div>
        <div className="absolute left-1/2 top-5 flex w-[calc(100%-40px)] max-w-[313px] -translate-x-1/2 flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-3">
            <div className="relative flex h-4 w-full items-center gap-1">
              <Image src="/assets/insights/figma-eyebrow-reading.svg" alt="" width={117} height={16} aria-hidden="true" className="absolute left-[3.43px] top-0 h-4 w-[116.978px]" />
              <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" width={15} height={16} aria-hidden="true" className="relative h-4 w-[14.794px]" />
              <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-[#0e2f6d]">38 cities open</span>
            </div>
            <h2 className="w-full max-w-[254px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-[#121212]">See how Euler fits your fleet</h2>
          </div>
          <div className="grid w-full grid-cols-[151.5fr_149.5fr] items-center gap-3">
            <Link href="/dealer-locator" className="flex h-11 min-w-0 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-3 font-display text-[12px] font-bold leading-none text-[#121212]">Find a dealer</Link>
            <Link href="/products" className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-3 font-display text-[12px] font-bold leading-none text-white">
              <span className="whitespace-nowrap">Explore vehicles</span>
              <Image src="/assets/insights/figma-fleet-arrow.svg" alt="" width={19} height={12} aria-hidden="true" className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="hidden bg-[#f3f4f5] px-5 py-6 lg:block lg:h-[339px] lg:px-20 lg:py-8">
      <div className="relative mx-auto flex min-h-[300px] w-full max-w-[1280px] items-center overflow-hidden rounded-[12px] bg-[linear-gradient(179.155deg,rgba(194,211,241,0.8)_21.28%,rgba(91,148,214,0.8)_151.97%),linear-gradient(90deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.4)_100%),linear-gradient(-82.341deg,#0e2f6d_63.511%,#1d6fff_87.226%)] px-5 py-8 lg:h-[275px] lg:min-h-0 lg:px-10 lg:py-8">
        <div className="relative z-10 flex w-full flex-col items-start gap-4 lg:w-[414.434px]">
          <div className="relative flex h-[20.355px] items-center gap-[6px]">
            <Image src="/assets/insights/figma-eyebrow-reading.svg" alt="" width={149} height={21} className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px]" />
            <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" width={19} height={21} className="relative h-[20.355px] w-[18.821px]" />
            <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-[#0e2f6d] lg:text-[14px] lg:tracking-[0.7px]">38 cities open</span>
          </div>
          <h2 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-[#121212] sm:text-[28px] lg:whitespace-nowrap lg:text-[32px] lg:leading-normal lg:tracking-[-0.64px]">See how Euler fits your fleet</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dealer-locator" className="inline-flex h-[50.477px] items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-6 font-display text-[14px] font-semibold leading-none text-[#121212] transition-colors hover:bg-white lg:text-[16px]">Find a dealer</Link>
            <Link href="/products" className="inline-flex h-[50.477px] items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-6 font-display text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#0e2f6d] lg:text-[16px]">
              Explore vehicles
              <Image src="/assets/insights/figma-fleet-arrow.svg" alt="" width={22} height={14} />
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-[-30px] top-[84px] h-[260px] w-[326px] sm:right-0 sm:top-[50px] sm:h-[320px] sm:w-[400px] lg:right-[48.51px] lg:top-[-64.48px] lg:h-[415.255px] lg:w-[520.047px]">
          <Image src="/assets/insights/figma-fleet-banner.png" alt="" width={520} height={415} className="absolute left-0 top-0 h-[125.24%] w-full max-w-none object-fill" />
        </div>
      </div>
    </section>
    </>
  );
}

function FigmaArticleBody({ title }: { title: string }) {
  const text = "[word-break:break-word] text-[#121212]";
  const heading = "font-display text-[18px] font-semibold leading-[1.4] tracking-[-0.36px] lg:text-[24px] lg:tracking-[-0.48px]";
  const headingSmall = "font-display text-[14px] font-semibold leading-[1.4] tracking-[-0.28px] lg:text-[24px] lg:tracking-[-0.48px]";
  const paragraph = "text-[12px] leading-[1.4] lg:text-[18px]";
  const image = "/assets/insights/figma-article-image-1.png";
  const secondImage = "/assets/insights/figma-article-image-2.png";
  const callout = "-mx-[22px] w-[calc(100%+44px)] rounded-[16px] bg-[#f3f4f5] px-3 py-4 text-[12px] font-medium leading-[1.4] lg:mx-0 lg:w-full lg:p-8 lg:text-[18px]";
  const section = "flex flex-col gap-[10px]";

  return (
    <section id="article-body" className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-8 pb-[42px] pt-8 lg:items-center lg:justify-center lg:gap-10 lg:px-[200px] lg:pt-16">
      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <label className="order-2 -mx-3 flex h-[42px] w-[calc(100%+24px)] max-w-[353px] min-w-0 flex-1 items-center justify-start gap-2 rounded-[50px] border border-[rgba(0,0,0,0.06)] bg-[#f3f4f5] p-3 lg:order-none lg:mx-0 lg:h-[46px] lg:w-auto lg:max-w-none lg:flex-[1_0_0] lg:justify-between lg:gap-3 lg:border-[rgba(0,0,0,0.04)] lg:py-[3px] lg:pl-4 lg:pr-[3px] lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.10)]">
          <span className="flex min-w-0 flex-1 items-center gap-2 lg:gap-3">
            <Image src="/assets/insights/mobile-search.svg" alt="" width={14} height={14} className="size-[14px] shrink-0 lg:hidden" />
            <Image src="/assets/insights/desktop-search.svg" alt="" width={20} height={20} className="hidden size-5 shrink-0 lg:block" />
            <input type="search" placeholder="Search articles" aria-label="Search articles" className="min-w-0 flex-1 bg-transparent font-sans text-[14px] font-semibold leading-normal text-[rgba(18,18,18,0.8)] outline-none placeholder:text-[rgba(18,18,18,0.8)] lg:text-[16px]" />
          </span>
        </label>
        <div className="order-1 flex w-full shrink-0 flex-col items-start gap-2 lg:order-none lg:w-auto lg:flex-row lg:items-center">
          <span className="font-display text-[14px] font-semibold leading-[1.4] tracking-[-0.28px]">Share this article</span>
          <ShareActions title={title} />
        </div>
      </div>

      <div className="grid w-full items-start gap-4 lg:grid-cols-2 lg:gap-8">
        <ArticleImage src={image} mobileSrc="/assets/insights/figma-mobile-article-1.png" alt="Commercial electric vehicle charging at a depot" className="h-[160px] aspect-auto w-full rounded-[8px] lg:aspect-[504/250] lg:h-[250px] lg:w-[504px] lg:shrink-0" />
        <p className={`${text} ${paragraph}`}>
          For fleet operators moving to electric commercial vehicles, charging is the single most important operational decision after the vehicle itself. Where you charge, how you charge, and when you charge shapes everything from daily route planning to total cost of ownership.<br /><br />This guide compares the two main approaches depot (home-base) charging and public charging and explains how most fleet operators combine both to keep vehicles running without downtime.
        </p>
      </div>

      <div className="grid w-full items-start gap-4 lg:grid-cols-2 lg:gap-8">
        <div className={`${section} ${text} order-2 justify-center lg:order-1`}>
          <h2 className={heading}>Understanding depot charging</h2>
          <p className={paragraph}>Depot charging means plugging in at your own premises — a warehouse, distribution centre, or fleet yard. The vehicle charges overnight or between shifts, using either a standard 15A wall socket or a dedicated AC charger.</p>
        </div>
        <ArticleImage src={secondImage} mobileSrc="/assets/insights/figma-mobile-article-2.png" alt="Depot charging equipment for commercial electric vehicles" className="order-1 h-[160px] aspect-auto w-full rounded-[8px] lg:order-2 lg:aspect-[504/189] lg:h-[189px] lg:w-[504px] lg:shrink-0" imageClassName="max-lg:scale-x-[1.12] lg:scale-x-[1.07] object-[50%_60%] lg:object-[50%_60%]" />
      </div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={headingSmall}>How depot charging works</h2>
        <p className={paragraph}>Most commercial EVs, including the Euler HiLoad, ship with an onboard charger that accepts standard AC input. You plug in when the vehicle returns from its last delivery, and it charges through the night. By morning the battery is full.</p>
        <ul className={`${paragraph} list-disc space-y-1 pl-[27px]`}>
          <li>A standard 15A socket charges an Euler HiLoad from 0–100% in roughly 5 hours</li>
          <li>A dedicated 3.3 kW AC charger can reduce this to about 4 hours</li>
          <li>No special electrical infrastructure is needed beyond a dedicated circuit and an earthed socket</li>
          <li>Charging costs follow your commercial electricity tariff, which in most Indian states is ₹6–₹9 per kWh</li>
        </ul>
      </div>

      <div className={callout}>For a typical last-mile delivery route of 60– 80 km per day, overnight depot charging covers the full range with energy to spare. Most fleet operators never need to charge during working hours.</div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={headingSmall}>Advantages of depot charging</h2>
        <p className={paragraph}><strong>Lowest cost per kilometre -</strong> Commercial electricity is cheaper than public charging tariffs, which include service fees and demand charges.</p>
        <p className={paragraph}><strong>Predictable scheduling -</strong> Vehicles charge during downtime, so charging never competes with delivery runs.</p>
        <p className={paragraph}><strong>No waiting -</strong> There is no queue. Each vehicle has its own socket or charger bay.</p>
        <p className={paragraph}><strong>Battery-friendly -</strong> Slow overnight charging puts less thermal stress on the battery than fast DC charging, preserving long-term capacity.</p>
      </div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={heading}>Understanding public charging</h2>
        <p className={paragraph}>Public charging stations are third-party installations at fuel stations, highway rest stops, malls, and commercial zones. They typically offer DC fast charging at 30 kW to 60 kW, bringing a depleted battery to 80% in 30–50 minutes.</p>
      </div>

      <div className="grid w-full items-stretch gap-8 lg:h-[683.476px] lg:grid-cols-[491px_517px]">
        <ArticleImage src={secondImage} mobileSrc="/assets/insights/figma-mobile-article-2.png" alt="Public charging station for electric vehicles" className="h-[160px] w-full rounded-[8px] lg:h-[683.476px] lg:w-[491px] lg:shrink-0" imageClassName="max-lg:scale-x-[1.12] lg:scale-x-[1.07] object-[50%_60%] lg:object-center" />
        <BookTestDriveCard />
      </div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={heading}>When public charging makes sense</h2>
        <p className={paragraph}>Public charging is useful when a vehicle travels beyond its usual range, works a double shift, or needs an unexpected top-up away from the depot.</p>
        <ul className={`${paragraph} list-disc space-y-1 pl-[27px]`}>
          <li>Long-distance intercity routes that exceed the vehicle’s single-charge range</li>
          <li>Double-shift operations where the vehicle cannot return to the depot between shifts</li>
          <li>Unexpected route extensions or detours</li>
          <li>Backup charging when a depot charger is unavailable</li>
        </ul>
      </div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={heading}>Challenges of relying on public</h2>
        <p className={paragraph}>Public charging has a few operational trade-offs to factor into your route planning:</p>
        <ul className={`${paragraph} list-disc space-y-1 pl-[27px]`}>
          <li>Higher cost per unit than depot electricity tariffs</li>
          <li>Potential wait times at busy stations, especially during peak hours</li>
          <li>Charger compatibility — not all public stations support all connector types</li>
          <li>Uptime variability — some stations go offline for maintenance with limited notice</li>
        </ul>
      </div>

      <div className={`${callout} lg:whitespace-nowrap`}>“Most of our operators charge at their depot 90% of the time. Public charging is the safety net, not the primary plan.”</div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={heading}>Combining both: the hybrid approach</h2>
        <p className={paragraph}>The most efficient fleets use a hybrid model. Depot charging handles the daily energy needs, while public charging covers edge cases — long routes, double shifts, or unexpected detours.</p>
      </div>
      <div className="grid w-full gap-4 lg:h-[320px] lg:grid-cols-2 lg:gap-8">
        <ArticleImage src={image} mobileSrc="/assets/insights/figma-mobile-article-1.png" alt="Electric fleet charging at its depot" className="h-[160px] w-full rounded-[8px] lg:h-[320px] lg:w-[504px] lg:shrink-0" />
        <ArticleImage src={secondImage} mobileSrc="/assets/insights/figma-mobile-article-2.png" alt="Electric vehicles at a public charging station" className="h-[160px] w-full rounded-[8px] lg:h-[320px] lg:w-[504px] lg:shrink-0" imageClassName="max-lg:scale-x-[1.12] lg:scale-x-[1.07] object-[50%_60%] lg:object-center" />
      </div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={headingSmall}>Setting up your depot</h2>
        <p className={paragraph}>A depot charging setup for a small fleet of 5–10 vehicles requires:</p>
        <p className={paragraph}><strong>Dedicated electrical capacity -</strong> Industrial-grade sockets with MCB protection, installed where vehicles park.</p>
        <p className={paragraph}><strong>Earthed, weather-protected sockets -</strong> Vehicles charge during downtime, so charging never competes with delivery runs.</p>
        <p className={paragraph}><strong>Cable management -</strong> Keep charging cables off the ground and away from vehicle movement paths.</p>
        <p className={paragraph}><strong>A charging schedule -</strong> Stagger start times if your sanctioned load is tight — not every vehicle needs to start charging at the same moment.</p>
      </div>
      <div className={callout}>Euler’s Shepherd app shows real-time battery level for every vehicle in your fleet. Operators can monitor charging status remotely and plan the next day’s routes based on available range.</div>

      <div className={`${section} ${text} w-full`}>
        <h2 className={headingSmall}>Mapping public chargers on your routes</h2>
        <p className={paragraph}>Before committing to routes that depend on mid-way public charging, verify three things: charger location, connector compatibility, and station uptime history. Euler’s connected platform shows nearby charging stations and can alert drivers when battery level drops below a threshold.</p>
      </div>
      <div className={`${section} ${text} w-full`}>
        <h2 className={heading}>Cost comparison</h2>
        <p className={paragraph}>The table below compares charging costs for a typical Euler HiLoad covering 80 km per day. Actual figures will vary by state electricity tariff and public station pricing.</p>
      </div>
      <div className={`${callout} space-y-1 lg:h-[139px] lg:w-[1040px]`}>
        <p><strong>Depot charging:</strong> ~₹50–₹70 per full charge (₹0.63–₹0.88/km)</p>
        <p><strong>Public DC fast charging:</strong> ~₹100–₹145 per full charge (₹1.25–₹1.81/km)</p>
        <p><strong>Diesel equivalent:</strong> ~₹280–₹350 per 80 km (₹3.50–₹4.38/km)</p>
      </div>
      <p className={`${text} ${paragraph} w-full`}>Even at public charging rates, electric is significantly cheaper than diesel. But depot charging roughly halves the energy cost again, which compounds across a fleet and over years.</p>

      <div className={`${section} ${text} w-full`}>
        <h2 className={heading}>Practical tips for fleet operators</h2>
        <p className={paragraph}><strong>Start with depot charging -</strong> Install it before your first vehicle arrives. Most operators find this covers 90%+ of their energy needs.</p>
      </div>

      <div className="flex w-full flex-col gap-4 border-t border-[#ededed] pt-6">
        <p className="font-display text-[20px] font-bold leading-[1.15] tracking-[-0.4px]">Share this article</p>
        <ShareActions title={title} />
      </div>
    </section>
  );
}

export default function BlogDetailsPage() {
  const title = "How to Charge Your Electric Truck: Home vs Public Charging";
  return (
    <div className="min-h-screen bg-white text-[#121212]">
      <Navbar />
      <main>
        <section className="relative isolate h-[594px] overflow-x-clip overflow-y-visible bg-[#101923] sm:h-[594px] lg:h-[650px] lg:overflow-visible" aria-label="Article header">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
            <div className="absolute inset-0 scale-[1.06]">
              <Image src="/assets/insights/figma-mobile-hero-base.png" alt="" fill priority sizes="100vw" className="object-fill" />
              <Image src="/assets/insights/figma-mobile-hero-layer-1.png" alt="" fill priority sizes="100vw" className="absolute left-[-2.05%] top-[-3.59%] h-[103.55%] w-[104.1%] max-w-none object-fill" />
              <div className="absolute inset-0 bg-[linear-gradient(188.677deg,rgba(0,0,0,0)_56.444%,rgba(0,0,0,0.8)_99.952%)]" />
              <Image src="/assets/insights/figma-mobile-hero-layer-2.png" alt="" fill priority sizes="100vw" className="absolute left-[-11.08%] top-[-1.11%] h-[104.6%] w-[122.17%] max-w-none object-fill" />
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            <Image src="/assets/insights/figma-hero-layer-1.png" alt="" width={1440} height={671} priority sizes="100vw" className="absolute left-[0.02%] top-[-3.21%] h-[103.16%] w-[99.98%] max-w-none object-fill" />
            <Image src="/assets/insights/figma-hero-layer-2.png" alt="" width={1440} height={1204} priority sizes="100vw" className="absolute left-[0.02%] top-[-17.15%] h-[185.29%] w-[99.96%] max-w-none object-fill" />
            <div className="absolute inset-0 bg-[linear-gradient(222.514deg,rgba(0,0,0,0)_62.956%,rgba(0,0,0,0.8)_106.14%)]" />
            <div className="absolute -left-[270px] -top-[110px] h-[245px] w-[562px] rounded-full bg-black/20 blur-[61px] backdrop-blur-[119px]" />
          </div>
          <nav aria-label="Breadcrumb" className="absolute left-[19px] top-[85px] z-10 flex items-center gap-2 font-sans text-[14px] font-bold leading-normal text-white lg:left-20 lg:top-[90px] lg:text-[16px]">
            <Link href="/" className="whitespace-nowrap transition-colors hover:text-white/80">Home</Link>
            <svg aria-hidden="true" viewBox="0 0 22 22" className="size-4 shrink-0 lg:size-[22px]" fill="none">
              <path d="M8.25 5.5L13.75 11L8.25 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link href="/insights" className="whitespace-nowrap transition-colors hover:text-white/80">Blog</Link>
            <svg aria-hidden="true" viewBox="0 0 22 22" className="size-4 shrink-0 lg:size-[22px]" fill="none">
              <path d="M8.25 5.5L13.75 11L8.25 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span aria-current="page" className="min-w-0 max-w-[calc(100vw-205px)] truncate whitespace-nowrap text-[#ccc] sm:max-w-[240px] lg:max-w-none">How to Charge...</span>
          </nav>
          <div className="absolute bottom-[24px] left-5 flex max-w-[calc(100%-40px)] -translate-x-0 flex-col items-start justify-center gap-3 lg:bottom-[62px] lg:left-[calc(50%-360.54px)] lg:max-w-none lg:-translate-x-1/2 lg:gap-5">
            <div className="relative flex h-[20.355px] items-center gap-[6px]">
              <Image src="/assets/insights/figma-eyebrow-wide.svg" alt="" width={149} height={21} className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px]" />
              <Image src="/assets/insights/figma-eyebrow-dot.svg" alt="" width={19} height={21} className="relative h-[20.355px] w-[18.821px]" />
              <span className="relative whitespace-nowrap font-sans text-[12px] font-bold uppercase leading-normal tracking-[0.6px] text-white lg:text-[14px] lg:tracking-[0.7px]">Charging</span>
            </div>
            <h1 className="w-[353px] max-w-full font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-white lg:w-[558.925px] lg:text-[32px] lg:leading-[115%] lg:tracking-[-0.64px]">{title}</h1>
            <div className="flex flex-wrap items-center justify-start gap-2 text-[12px] font-semibold leading-normal text-white/60 lg:gap-4 lg:text-[16px]">
              <div className="flex items-center gap-1">
                <Image src="/assets/insights/figma-mobile-author.png" alt="Aditi Singh" width={20} height={20} className="size-5 shrink-0 rounded-full object-cover lg:size-8" />
                <span>Aditi Singh</span>
              </div>
              <span aria-hidden="true" className="size-[6px] shrink-0 rounded-full bg-white/50 opacity-60" />
              <span>28 July 2026</span>
              <span aria-hidden="true" className="size-[6px] shrink-0 rounded-full bg-white/50 opacity-60" />
              <span>5 min read</span>
            </div>
          </div>
          <Link href="/insights" aria-label="Back to insights" className="absolute bottom-[46px] right-[-8px] z-20 flex size-[42px] shrink-0 items-center justify-center overflow-hidden lg:hidden">
            <Image src="/assets/insights/figma-floating-toggle.svg" alt="" width={42} height={42} className="size-[42px]" />
          </Link>
          <FloatingWidget desktopHandle mobileClassName="top-[calc(100%_-_38px)] translate-y-0" desktopClassName="lg:top-[400px] lg:translate-y-0" desktopRightClassName="lg:right-[-30px]" mobileRightClassName="right-[-26px]" />
        </section>

        <FigmaArticleBody title={title} />
        <RelatedArticles />
        <FleetBanner />
      </main>
      <Footer />
    </div>
  );
}
