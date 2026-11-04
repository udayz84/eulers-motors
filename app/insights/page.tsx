"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWidget from "@/components/FloatingWidget";

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
      <span>{article.date}</span><span aria-hidden className="size-[3px] shrink-0 rounded-full bg-black/50" /><span>{article.readTime}</span>
    </div>
  );
}

function Eyebrow({ label, variant }: { label: string; variant: "hero" | "featured" }) {
  const hero = variant === "hero";
  return (
    <div className={`relative flex items-center gap-1 ${hero ? "text-white" : "text-[#0e2f6d]"}`}>
      <Image src={`/assets/insights/eyebrow-${hero ? "1" : "3"}.svg`} alt="" aria-hidden width={149} height={21} className="absolute left-[3px] top-0 h-5 w-[149px]" />
      <Image src={`/assets/insights/eyebrow-${hero ? "2" : "4"}.svg`} alt="" aria-hidden width={19} height={21} className="relative h-5 w-[19px]" />
      <span className="relative whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.6px] lg:text-[14px] lg:tracking-[0.7px]">{label}</span>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/insights/${article.slug}`} className="flex h-[286.32px] w-full min-w-0 flex-col gap-3 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-2 transition-shadow hover:shadow-lg lg:h-[432px] lg:w-auto lg:flex-[1_0_0] lg:gap-[24px] lg:p-[20px]">
      <div className="relative h-[160px] shrink-0 overflow-hidden rounded-[8px] bg-[lightgray] lg:h-[233px] lg:w-full lg:self-stretch lg:p-[12px]">
        <Image src={article.img} alt="" fill sizes="(max-width: 767px) 90vw, (max-width: 1279px) 42vw, 413px" className="object-cover" />
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
  const [featuredProgress, setFeaturedProgress] = useState(0);
  const featuredRowRef = useRef<HTMLDivElement>(null);

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

  const scrollFeatured = (direction: 1 | -1) => {
    const row = featuredRowRef.current;
    const card = row?.querySelector<HTMLElement>(".featured-card");
    if (!row || !card) return;
    row.scrollBy({ left: direction * (card.offsetWidth + (parseFloat(getComputedStyle(row).columnGap) || 0)), behavior: "smooth" });
  };
  const handleFeaturedScroll = (row: HTMLDivElement | null = featuredRowRef.current) => {
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setFeaturedProgress(maxScroll > 0 ? Math.min(Math.max(row.scrollLeft / maxScroll, 0), 1) : 0);
  };
  const clearFilters = () => { setSearchQuery(""); setActiveCategory("All"); setVisibleCount(6); };

  return (
    <div className="min-h-screen bg-white">
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

        <section className="relative flex h-[486px] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#f3f4f5] px-5 py-8 lg:block lg:h-auto lg:px-20 lg:pb-[62px] lg:pt-16">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 lg:gap-8">
            <header className="flex w-full flex-col items-center justify-center gap-3 self-stretch text-center lg:items-start lg:gap-4 lg:text-left">
              <Eyebrow label="Featured" variant="featured" />
              <h2 className="self-stretch whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] lg:text-[52px] lg:tracking-[-1.04px]">Editor&apos;s picks</h2>
            </header>
            <div className="relative -mx-5 w-[calc(100%+40px)] lg:hidden">
              <div onScroll={(event) => handleFeaturedScroll(event.currentTarget)} className="snap-row no-scrollbar w-full items-center gap-3 overflow-x-auto scroll-smooth touch-pan-x-y">
                <div aria-hidden="true" className="w-2 shrink-0" />
                {FEATURED_ARTICLES.map((article) => <Link key={article.id} href={`/insights/${article.slug}`} className="flex h-[310px] w-[320px] shrink-0 snap-start flex-col gap-3 rounded-xl bg-white p-2 transition-shadow hover:shadow-lg">
                  <div className="relative h-[160px] w-full shrink-0 self-stretch overflow-hidden rounded-[8px] bg-[lightgray]"><Image src={article.img} alt="" fill sizes="320px" className={`object-cover ${article.id === 2 || article.id === 4 ? "scale-[1.04]" : ""}`} /><span className="absolute left-[6px] top-[6px] flex h-[25px] w-[83px] flex-col items-start justify-center gap-[7.862px] rounded-[39.312px] bg-white px-2 text-[12px] font-semibold text-black">{article.category}</span><span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white"><Image src="/assets/insights/article-arrow.svg" alt="" width={20} height={20} className="aspect-square size-5 shrink-0" /></span></div>
                  <div className="flex w-full flex-col gap-1.5 px-3 pb-1 pt-1"><h3 className="self-stretch font-display text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212]">{article.title}</h3><Metadata article={article} mobile /><p className="self-stretch text-[12px] leading-[1.4] text-[#121212]">{article.excerpt}</p></div>
                </Link>)}
              </div>
            </div>
          </div>
          <div className="relative mt-4 hidden lg:-mx-20 lg:mt-8 lg:block">
            <div ref={featuredRowRef} onScroll={(event) => handleFeaturedScroll(event.currentTarget)} className="snap-row w-full items-center gap-8">
              <div aria-hidden className="shrink-0" style={{ width: "max(48px, calc(50% - 672px))" }} />
              {FEATURED_ARTICLES.map((article) => <article key={article.id} data-featured-card className="featured-card flex h-[273px] w-[807px] shrink-0 snap-start items-start gap-[24px] rounded-[12px] bg-white p-[20px] transition-shadow hover:shadow-lg">
                <div className="relative flex h-[233px] w-[353px] shrink-0 flex-col items-start gap-[24px] rounded-[8px] bg-[lightgray] bg-cover bg-center bg-no-repeat p-[12px]" style={{ backgroundImage: `url('${article.img}')` }}>
                  <span className="flex flex-col items-start gap-[10px] rounded-[50px] bg-white px-[10px] py-1 text-[14px] font-bold text-black">{article.category}</span>
                  <span className="absolute right-3 top-[11.645px] flex size-9 items-center justify-center rounded-[4px] bg-white p-[11px_12px]"><Image src="/assets/insights/arrow-icon.svg" alt="" width={20} height={20} className="shrink-0 -rotate-90 -scale-x-100" /></span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px] self-stretch"><h3 className="self-stretch font-display text-[26px] font-semibold leading-[115%] tracking-[-0.52px] text-[#121212]">{article.title}</h3><Metadata article={article} /><p className="self-stretch text-[16px] leading-normal text-[#121212]">{article.excerpt}</p></div>
              </article>)}
            </div>
            <div aria-hidden className="pointer-events-none absolute right-0 top-[14px] z-10 h-[551px] w-[210.811px] bg-[linear-gradient(270deg,#fff_0%,rgba(255,255,255,0)_100%)]" />
          </div>
          <div className="mt-0 flex justify-center lg:mt-8"><div className="flex h-5 w-[116.199px] items-center rounded-[14.4px] bg-[rgba(204,204,204,0.5)] p-1"><div className="h-full rounded-[23.04px] bg-[#121212] transition-all duration-300" style={{ width: `${25 + featuredProgress * 75}%` }} /></div></div>
          <button onClick={() => scrollFeatured(-1)} aria-label="Previous featured articles" className="absolute bottom-[223px] left-[50px] z-20 hidden size-[55px] items-center justify-center [transform:scaleX(-1)] lg:flex"><Image src="/assets/insights/carousel-arrow-left.svg" alt="" width={55} height={55} /></button>
          <button onClick={() => scrollFeatured(1)} aria-label="Next featured articles" className="absolute bottom-[223px] right-[50px] z-20 hidden size-[55px] items-center justify-center lg:flex"><Image src="/assets/insights/carousel-arrow-right.svg" alt="" width={55} height={55} /></button>
        </section>

        <section className="relative bg-white px-5 pt-8 lg:px-[60px] lg:py-[62px]">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:gap-[20px]">
            <label className="flex h-[42px] w-full items-center justify-between rounded-[500px] border border-black/[0.06] bg-[#f3f4f5] p-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.10)] lg:h-[46px] lg:w-[1320px] lg:max-w-full lg:py-[3px] lg:pl-4 lg:pr-[3px]">
              <span className="flex min-w-0 flex-1 items-center gap-3 text-[#121212]/70"><Image src="/assets/insights/search-icon.svg" alt="" width={20} height={20} /><input aria-label="Search articles" type="search" placeholder="Search articles" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); }} className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold outline-none placeholder:text-[#121212]/80 lg:text-[16px]" /></span>
              {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search" className="ml-2 px-2 text-xl leading-none text-[#121212]/60">×</button>}
            </label>
            <div className="relative -mx-5 lg:mx-0">
              <Image src="/assets/insights/tabs-row-decoration.svg" alt="" aria-hidden width={752} height={76} className="pointer-events-none absolute left-1/2 top-[-20px] z-0 hidden h-[76px] w-[751.148px] max-w-none -translate-x-1/2 lg:block" />
              <div className="no-scrollbar relative z-10 flex h-8 w-full items-center justify-start gap-2 overflow-x-auto pl-5 pr-0 lg:h-[42px] lg:justify-center lg:overflow-visible lg:px-0">
                {CATEGORIES.map((category) => <button key={category.name} type="button" onClick={() => setActiveCategory(category.name)} className={`flex h-8 shrink-0 items-center gap-[6.4px] rounded-[400px] px-3 transition-opacity lg:h-auto lg:px-4 lg:py-[13px] ${activeCategory === category.name ? "border-[0.4px] border-white text-white" : "bg-black/[0.08] text-[#121212] hover:bg-black/[0.14]"}`} style={activeCategory === category.name ? { background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #121212" } : undefined}>
                  <span className="whitespace-nowrap text-[12px] font-semibold leading-none lg:text-[16px]">{category.name}</span><span className={`size-[3px] rounded-full ${activeCategory === category.name ? "bg-white/50" : "bg-black/50"}`} /><span className="whitespace-nowrap text-[10px] leading-none lg:text-[14px]">{category.count}</span>
                </button>)}
              </div>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute right-0 top-[80px] z-20 h-[49.664px] w-[54.598px] bg-[linear-gradient(270deg,#FFF_13.62%,rgba(255,255,255,0)_100%)] lg:hidden" />
        </section>

        <section className="bg-white px-5 pb-8 pt-5 lg:px-[60px] lg:pb-[62px] lg:pt-5">
          <div className="mx-auto max-w-[1280px]">
            {shownArticles.length === 0 ? <div className="py-20 text-center"><p className="text-[18px] font-semibold text-black/60">No articles found matching your criteria.</p><button onClick={clearFilters} className="mt-4 text-[16px] font-semibold text-[#1d6fff] hover:underline">Clear filters</button></div> : <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-5">{shownArticles.map((article) => <ArticleCard key={article.id} article={article} />)}</div>}
            {filteredArticles.length > 0 && <div className="mt-5 flex justify-center lg:mt-[42px]">
              <Link href="/insights/charging-network" className="inline-flex h-8 items-center justify-center gap-2 rounded-[4px] border border-[#121212]/50 bg-[#f3f4f5] px-5 font-display text-[12px] font-bold leading-none text-[#121212] transition-colors hover:bg-[#ededed] lg:h-[50px] lg:gap-[8px] lg:px-6 lg:text-[16px] lg:font-semibold">Load More</Link>
            </div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
