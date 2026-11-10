"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWidget from "@/components/FloatingWidget";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

type Article = {
  id: number;
  img: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  slug: string;
};

const FEATURED_ARTICLES: Article[] = [
  { id: 1, img: "/assets/insights/article-featured-1.png", category: "Technology", title: "How Connected Vehicles Help Businesses Run Better", date: "28 July 2026", readTime: "5 min read", excerpt: "See how connected vehicle technology can help businesses…", slug: "connected-vehicles-business" },
  { id: 2, img: "/assets/insights/article-featured-2.png", category: "Industry", title: "The Real Cost of Running an Electric…", date: "28 July 2026", readTime: "5 min read", excerpt: "A side-by-side comparison of electric versus diesel running costs for last-mile delivery…", slug: "real-cost-electric" },
  { id: 3, img: "/assets/insights/article-featured-1.png", category: "Technology", title: "How Connected Vehicles Help Businesses Run Better", date: "28 July 2026", readTime: "5 min read", excerpt: "See how connected vehicle technology can help businesses…", slug: "connected-vehicles-business-2" },
  { id: 4, img: "/assets/insights/article-featured-2.png", category: "Industry", title: "The Real Cost of Running an Electric…", date: "28 July 2026", readTime: "5 min read", excerpt: "A side-by-side comparison of electric versus diesel running costs for last-mile delivery…", slug: "real-cost-electric-2" },
];

const CATEGORIES = [
  { name: "All", count: 78 },
  { name: "Technology", count: 7 },
  { name: "Industry", count: 8 },
  { name: "Fleet Operations", count: 8 },
  { name: "Service", count: 7 },
];

const ALL_ARTICLES: Article[] = [
  { id: 1, img: "/assets/insights/article-featured-1.png", category: "Technology", title: "How Connected Vehicles Help Businesses Run Better", date: "28 July 2026", readTime: "5 min read", excerpt: "See how connected vehicle technology can help businesses…", slug: "connected-vehicles-business" },
  { id: 2, img: "/assets/insights/article-featured-2.png", category: "Industry", title: "The Real Cost of Running an Electric…", date: "28 July 2026", readTime: "5 min read", excerpt: "A side-by-side comparison of electric versus diesel running costs for last-mile delivery…", slug: "real-cost-electric" },
  { id: 3, img: "/assets/insights/article-featured-3.png", category: "Industry", title: "Understanding EV Subsidies and…", date: "28 July 2026", readTime: "5 min read", excerpt: "A practical guide to central and state subsidies available for commercial electric…", slug: "ev-subsidies" },
  { id: 4, img: "/assets/insights/article-featured-4.png", category: "Industry", title: "What Makes a Good Charging Network…", date: "28 July 2026", readTime: "5 min read", excerpt: "Depot charging, highway charging and the infrastructure decisions that matter for fleet…", slug: "charging-network" },
  { id: 5, img: "/assets/insights/article-featured-2.png", category: "Industry", title: "The Real Cost of Running an Electric…", date: "28 July 2026", readTime: "5 min read", excerpt: "A side-by-side comparison of electric versus diesel running costs for last-mile delivery…", slug: "real-cost-electric-2" },
  { id: 6, img: "/assets/insights/article-featured-3.png", category: "Industry", title: "Understanding EV Subsidies and…", date: "28 July 2026", readTime: "5 min read", excerpt: "A practical guide to central and state subsidies available for commercial electric…", slug: "ev-subsidies-2" },
];

function Metadata({ article, mobile = false }: { article: Article; mobile?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 text-[rgba(18,18,18,0.60)] ${mobile ? "text-[12px] lg:text-[14px]" : "text-[14px]"} font-bold leading-normal`}>
      <span>{article.date}</span><span aria-hidden className="aspect-square size-[3.145px] shrink-0 rounded-[393.12px] bg-[rgba(0,0,0,0.50)]" /><span>{article.readTime}</span>
    </div>
  );
}

function Eyebrow({ label, variant }: { label: string; variant: "hero" | "featured" }) {
  const hero = variant === "hero";
  return (
    <div className={`relative flex items-center gap-1 lg:gap-[6px] ${hero ? "text-white" : "text-[#0e2f6d]"}`}>
      <Image src={`/assets/insights/eyebrow-${hero ? "1" : "3"}.svg`} alt="" aria-hidden width={149} height={21} className="absolute left-[3.43px] top-0 h-4 w-[117px] lg:h-[20.355px] lg:w-[148.821px]" />
      <Image src={`/assets/insights/eyebrow-${hero ? "2" : "4"}.svg`} alt="" aria-hidden width={19} height={21} className="relative h-4 w-[14.8px] lg:h-[20.355px] lg:w-[18.821px]" />
      <span className="relative whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.6px] lg:text-[14px] lg:tracking-[0.7px]">{label}</span>
    </div>
  );
}

function ArticleCard({ article, mobileImg }: { article: Article; mobileImg?: string }) {
  return (
    <Link href={`/insights/${article.slug}`} className="flex h-[286.32px] w-full min-w-0 flex-col gap-3 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-2 transition-shadow hover:shadow-lg lg:h-[432px] lg:w-auto lg:flex-[1_0_0] lg:gap-[24px] lg:p-[20px]">
      <div className="relative h-[160px] shrink-0 overflow-hidden rounded-[8px] bg-[lightgray] lg:h-[233px] lg:w-full lg:self-stretch lg:p-[12px]">
        {mobileImg ? (
          <>
            <Image src={mobileImg} alt="" fill sizes="(max-width: 767px) 90vw" className="object-cover lg:hidden" />
            <Image src={article.img} alt="" fill sizes="(min-width: 768px) 42vw, 413px" className={`hidden object-cover lg:block ${article.id === 2 || article.id === 4 ? "lg:scale-[1.04]" : ""}`} />
          </>
        ) : (
          <Image src={article.img} alt="" fill sizes="(max-width: 767px) 90vw, (max-width: 1279px) 42vw, 413px" className={`object-cover ${article.id === 2 ? "max-lg:scale-x-[1.04] max-lg:object-[50%_60%]" : ""} ${article.id === 2 || article.id === 4 ? "lg:scale-[1.04]" : ""}`} />
        )}
        <span className="absolute left-2 top-2 flex flex-col items-start gap-[10px] rounded-[50px] bg-white px-[10px] py-1 text-[12px] font-bold text-black lg:left-3 lg:top-3 lg:text-[14px]">{article.category}</span>
        <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white lg:right-[12.333px] lg:top-[11.645px] lg:size-9 lg:p-[11px_12px]">
          <Image src="/assets/insights/article-arrow.svg" alt="" width={20} height={20} className="aspect-square size-5 shrink-0 lg:hidden" />
          <Image src="/assets/insights/arrow-icon.svg" alt="" width={20} height={20} className="hidden shrink-0 lg:block lg:-rotate-90 lg:-scale-x-100" />
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-3 pb-3 pt-1 lg:self-stretch lg:gap-[6px] lg:px-0 lg:pb-0 lg:pt-0">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] lg:self-stretch lg:overflow-visible lg:whitespace-normal lg:text-[26px] lg:leading-[115%] lg:tracking-[-0.52px]">{article.title}</h3>
        <Metadata article={article} mobile />
        <p className="self-stretch text-[12px] leading-[1.4] text-[#121212] lg:text-[16px] lg:leading-normal">{article.excerpt}</p>
      </div>
    </Link>
  );
}

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // Runway for comfortable continuous scrolling
  const repeats = Math.max(2, Math.ceil(8 / FEATURED_ARTICLES.length));
  const displayFeatured = Array.from({ length: repeats }).flatMap(() => FEATURED_ARTICLES);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateProgress = useCallback(() => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    const el = isDesktop ? scrollRef.current : mobileScrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
    } else {
      setScrollProgress(0);
    }
  }, []);

  const pauseAutoScroll = useCallback((duration = 600) => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, duration);
  }, []);

  useDraggableScroll(scrollRef, {
    onDragStart: () => {
      isDraggingRef.current = true;
      pauseAutoScroll(600);
    },
    onDragEnd: () => {
      isDraggingRef.current = false;
      pauseAutoScroll(400);
      updateProgress();
    },
  });

  // Track initial scroll progress and attach resize/scroll sync
  useEffect(() => {
    updateProgress();
    const row = scrollRef.current;
    const mRow = mobileScrollRef.current;
    if (!row) return;

    const onStep = () => pauseAutoScroll(600);

    row.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    row.addEventListener("carousel-step", onStep);
    if (mRow) mRow.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      row.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      row.removeEventListener("carousel-step", onStep);
      if (mRow) mRow.removeEventListener("scroll", updateProgress);
    };
  }, [updateProgress, pauseAutoScroll]);

  // Section visibility check
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isVisibleRef.current = true;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Continuous auto-scroll loop (speed = 50px/s, pauses on hover, drag, or interaction)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime: number | null = null;
    let animId: number;
    let accumulator = 0;

    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      if (
        isDesktop &&
        isVisibleRef.current &&
        !isInteractingRef.current &&
        !isDraggingRef.current
      ) {
        const row = scrollRef.current;
        if (row) {
          const maxScroll = row.scrollWidth - row.clientWidth;
          if (maxScroll > 1) {
            accumulator += 50 * delta;
            if (accumulator >= 1) {
              const advance = Math.floor(accumulator);
              accumulator -= advance;

              if (row.scrollLeft >= maxScroll - 2) {
                row.scrollLeft = 0;
              } else {
                row.scrollLeft += advance;
              }
              updateProgress();
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, [updateProgress]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const updateVisible = () => setVisibleCount(mobile.matches ? 4 : 6);
    updateVisible();
    mobile.addEventListener("change", updateVisible);
    return () => mobile.removeEventListener("change", updateVisible);
  }, []);

  const filteredArticles = useMemo(() => ALL_ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    return matchesCategory && (!query || article.title.toLowerCase().includes(query) || article.excerpt.toLowerCase().includes(query));
  }), [activeCategory, searchQuery]);
  const shownArticles = filteredArticles.slice(0, visibleCount);

  const clearFilters = () => { setSearchQuery(""); setActiveCategory("All"); setVisibleCount(6); };

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <Navbar />
      <main>
        <section className="relative flex h-[324px] items-center justify-center overflow-visible bg-[linear-gradient(272deg,#0e2f6d_-63.51%,#1d6fff_87.23%)] px-5 pt-[120.32px] pb-[57.68px] lg:block lg:h-[420px] lg:px-20 lg:py-0">
          <div aria-hidden className="absolute inset-0 bg-cover bg-center lg:hidden" style={{ backgroundImage: "url('/assets/insights/mobile-hero-bg.png')" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px), repeating-linear-gradient(0deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px)" }} />
          <div className="relative flex w-full max-w-[353px] flex-col items-center gap-3 text-center lg:absolute lg:left-1/2 lg:top-[calc(50%+30px)] lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2 lg:gap-6">
            <Eyebrow label="Insights" variant="hero" />
            <h1 className="w-full text-balance font-display text-[32px] font-semibold leading-[115%] tracking-[-0.64px] text-white lg:whitespace-nowrap lg:text-[52px] lg:tracking-[-1.04px]">Stories, Ideas &amp; Insights</h1>
            <p className="w-full text-[12px] leading-normal text-white lg:max-w-[493px] lg:text-[16px]">Practical thinking about electric commercial mobility, from technology and operations to the business of running a fleet.</p>
          </div>
          <div className="hidden lg:block">
            <FloatingWidget />
          </div>
        </section>

        <section ref={sectionRef} className="relative flex h-auto w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#f3f4f5] px-5 py-8 lg:block lg:h-auto lg:px-20 lg:pb-[62px] lg:pt-16" aria-label="Featured articles">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 lg:gap-8">
            <header className="flex w-full flex-col items-center justify-center gap-3 self-stretch text-center lg:items-start lg:gap-4 lg:text-left">
              <Eyebrow label="Featured" variant="featured" />
              <h2 className="self-stretch whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] lg:text-[52px] lg:tracking-[-1.04px]">Editor&apos;s picks</h2>
            </header>
            <div className="relative -mx-5 w-[calc(100%+40px)] lg:hidden">
              <div
                ref={mobileScrollRef}
                onScroll={updateProgress}
                className="snap-row no-scrollbar flex w-full items-center gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory"
              >
                {FEATURED_ARTICLES.map((article) => (
                  <Link key={article.id} href={`/insights/${article.slug}`} className="flex h-[310px] w-[320px] shrink-0 snap-start flex-col gap-3 rounded-xl bg-white p-2 transition-shadow hover:shadow-lg">
                    <div className="relative h-[160px] w-full shrink-0 self-stretch overflow-hidden rounded-[8px] bg-[lightgray]">
                      <Image src={article.img} alt="" fill sizes="320px" className={`object-cover ${article.id === 2 || article.id === 4 ? "scale-[1.04]" : ""}`} />
                      <span className="absolute left-[6px] top-[6px] flex h-[25px] w-[83px] flex-col items-start justify-center gap-[7.862px] rounded-[39.312px] bg-white px-2 text-[12px] font-semibold text-black">{article.category}</span>
                      <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white">
                        <Image src="/assets/insights/article-arrow.svg" alt="" width={20} height={20} className="aspect-square size-5 shrink-0" />
                      </span>
                    </div>
                    <div className="flex w-full flex-col gap-1.5 px-3 pb-1 pt-1">
                      <h3 className="self-stretch font-display text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212]">{article.title}</h3>
                      <Metadata article={article} mobile />
                      <p className="self-stretch text-[12px] leading-[1.4] text-[#121212]">{article.excerpt}</p>
                    </div>
                  </Link>
                ))}
                <div aria-hidden="true" className="w-1 shrink-0" />
              </div>
            </div>
          </div>

          <div className="relative mt-4 hidden lg:-mx-20 lg:mt-8 lg:block">
            <div
              id="featured-articles-row"
              ref={scrollRef}
              onScroll={() => {
                if (isDraggingRef.current) {
                  pauseAutoScroll();
                }
              }}
              onMouseEnter={() => {
                isInteractingRef.current = true;
              }}
              onMouseLeave={() => {
                isInteractingRef.current = false;
              }}
              className="snap-row no-scrollbar flex w-full items-center gap-8 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
            >
              <div aria-hidden className="shrink-0" style={{ width: "max(48px, calc(50% - 672px))" }} />
              {displayFeatured.map((article, idx) => (
                <article
                  key={`${article.id}-${idx}`}
                  data-featured-card
                  className="featured-card flex h-[273px] w-[807px] shrink-0 snap-start items-start gap-[24px] rounded-[12px] bg-white p-[20px] transition-shadow hover:shadow-lg"
                >
                  <Link
                    href={`/insights/${article.slug}`}
                    className="relative flex h-[233px] w-[353px] shrink-0 flex-col items-start gap-[24px] overflow-hidden rounded-[8px] bg-[lightgray] p-[12px] group"
                  >
                    <div
                      aria-hidden
                      className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105 ${article.id === 2 || article.id === 4 ? "scale-[1.04]" : ""}`}
                      style={{ backgroundImage: `url('${article.img}')` }}
                    />
                    <span className="relative flex flex-col items-start gap-[10px] rounded-[50px] bg-white px-[10px] py-1 text-[14px] font-bold text-black">
                      {article.category}
                    </span>
                    <span className="absolute right-3 top-[11.645px] flex size-9 items-center justify-center rounded-[4px] bg-white p-[11px_12px] transition-transform duration-200 group-hover:scale-105">
                      <Image src="/assets/insights/arrow-icon.svg" alt="" width={20} height={20} className="shrink-0 -rotate-90 -scale-x-100" />
                    </span>
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px] self-stretch">
                    <Link href={`/insights/${article.slug}`} className="self-stretch">
                      <h3 className="self-stretch font-display text-[26px] font-semibold leading-[115%] tracking-[-0.52px] text-[#121212] transition-colors hover:text-[#1d6fff]">
                        {article.title}
                      </h3>
                    </Link>
                    <Metadata article={article} />
                    <p className="self-stretch text-[16px] leading-normal text-[#121212]">{article.excerpt}</p>
                  </div>
                </article>
              ))}
              <div aria-hidden className="shrink-0 w-8 lg:w-16" />
            </div>

            {/* Blue Navigation Arrows with boundary auto-hide */}
            <CarouselArrows
              rowId="featured-articles-row"
              label="featured articles"
              variant="blue"
              onStep={() => pauseAutoScroll(600)}
            />
          </div>

          {/* Carousel Progress Indicator Pill (Figma 3321:13258) */}
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center pt-4 lg:pt-8">
            <div
              role="progressbar"
              aria-label="Featured articles scroll progress"
              aria-valuenow={Math.round(scrollProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="flex h-5 w-[116.2px] items-center rounded-[14.4px] bg-[#9ca3af]/40 p-1"
            >
              <div
                className="h-full w-[29.891px] rounded-[23.04px] bg-[#121212] transition-transform duration-75 ease-out will-change-transform"
                style={{
                  transform: `translateX(${scrollProgress * 78.308}px)`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="relative bg-white px-5 pt-8 lg:mx-auto lg:flex lg:w-full lg:max-w-[1440px] lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[60px] lg:pb-[42px] lg:pt-[62px]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 lg:gap-5">
            <label className="flex h-[42px] w-full items-center justify-between rounded-[500px] border border-black/[0.06] bg-[#f3f4f5] p-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.10)] lg:h-[46px] lg:w-[1320px] lg:max-w-full lg:py-[3px] lg:pl-4 lg:pr-[3px]">
              <span className="flex min-w-0 flex-1 items-center gap-3 text-[#121212]/70"><Image src="/assets/insights/search-icon.svg" alt="" width={20} height={20} className="aspect-square size-5 shrink-0" /><input aria-label="Search articles" type="search" placeholder="Search articles" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); }} className="min-w-0 flex-1 bg-transparent font-sans text-[14px] font-semibold outline-none placeholder:text-[rgba(18,18,18,0.80)] lg:text-[16px] lg:font-semibold lg:leading-normal lg:text-[rgba(18,18,18,0.80)]" /></span>
              {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search" className="ml-2 px-2 text-xl leading-none text-[#121212]/60">×</button>}
            </label>
            <div className="relative -mx-5 lg:mx-0">
              <Image src="/assets/insights/tabs-row-decoration.svg" alt="" aria-hidden width={752} height={76} className="pointer-events-none absolute left-1/2 top-[-20px] z-0 hidden h-[76px] w-[751.148px] max-w-none -translate-x-1/2 lg:block" />
              <div className="no-scrollbar relative z-10 flex h-8 w-full items-center justify-start gap-2 overflow-x-auto pl-5 pr-0 lg:h-[42px] lg:justify-center lg:overflow-visible lg:px-0">
                {CATEGORIES.map((category) => <button key={category.name} type="button" onClick={() => setActiveCategory(category.name)} className={`flex h-8 shrink-0 items-center gap-[6.4px] rounded-[400px] px-3 transition-opacity lg:h-auto lg:px-4 lg:py-[13px] ${activeCategory === category.name ? "border-[0.4px] border-white text-white" : "bg-black/[0.08] text-[#121212] hover:bg-black/[0.14]"}`} style={activeCategory === category.name ? { background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #121212" } : undefined}>
                  <span className="whitespace-nowrap text-[12px] font-semibold leading-none lg:text-[16px]">{category.name}</span><span className={`aspect-square size-[3.145px] rounded-[393.12px] ${activeCategory === category.name ? "bg-[rgba(255,255,255,0.50)]" : "bg-[rgba(0,0,0,0.50)]"}`} /><span className="whitespace-nowrap text-[10px] leading-none lg:text-[14px]">{category.count}</span>
                </button>)}
              </div>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute right-0 top-[80px] z-20 h-[49.664px] w-[54.598px] bg-[linear-gradient(270deg,#FFF_13.62%,rgba(255,255,255,0)_100%)] lg:hidden" />
        </section>

        <section className="bg-white px-5 pb-8 pt-4 lg:px-[60px] lg:pb-[62px] lg:pt-0">
          <div className="mx-auto max-w-[1280px]">
            {shownArticles.length === 0 ? <div className="py-20 text-center"><p className="text-[18px] font-semibold text-black/60">No articles found matching your criteria.</p><button onClick={clearFilters} className="mt-4 text-[16px] font-semibold text-[#1d6fff] hover:underline">Clear filters</button></div> : <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-5">{shownArticles.map((article, index) => {
              const mobileImg = index === 0
                ? "/assets/insights/figma-mobile-article-3.png"
                : index === shownArticles.length - 1
                  ? shownArticles[0]?.img
                  : undefined;
              return <ArticleCard key={article.id} article={article} mobileImg={mobileImg} />;
            })}</div>}
            {filteredArticles.length > 0 && <div className="mt-4 flex justify-center lg:mt-[42px]">
              <Link href="/insights/charging-network" className="inline-flex h-8 items-center justify-center gap-2 rounded-[4px] border border-[#121212]/50 bg-[#f3f4f5] px-5 font-display text-[12px] font-bold leading-none text-[#121212] transition-colors hover:bg-[#ededed] lg:h-[50px] lg:gap-[8px] lg:px-6 lg:text-[16px] lg:font-semibold">Load More</Link>
            </div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
