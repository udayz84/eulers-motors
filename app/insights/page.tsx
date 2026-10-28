"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const FEATURED_ARTICLES = [
  {
    id: 1,
    img: "/assets/insights/article-featured-1.png",
    category: "Technology",
    title: "How Connected Vehicles Help Businesses Run Better",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "See how connected vehicle technology can help businesses…",
    slug: "connected-vehicles-business",
  },
  {
    id: 2,
    img: "/assets/insights/article-featured-2.png",
    category: "Technology",
    title: "The Future of Electric Commercial Vehicles",
    date: "25 July 2026",
    readTime: "7 min read",
    excerpt: "Exploring the next generation of EV technology for logistics…",
    slug: "future-electric-commercial-vehicles",
  },
  {
    id: 3,
    img: "/assets/insights/article-featured-3.png",
    category: "Industry",
    title: "Building Sustainable Supply Chains",
    date: "20 July 2026",
    readTime: "6 min read",
    excerpt: "How electric fleets are transforming logistics operations…",
    slug: "sustainable-supply-chains",
  },
  {
    id: 4,
    img: "/assets/insights/article-featured-4.png",
    category: "Fleet Operations",
    title: "Optimizing Fleet Management with AI",
    date: "15 July 2026",
    readTime: "8 min read",
    excerpt: "Leveraging artificial intelligence for smarter fleet decisions…",
    slug: "ai-fleet-management",
  },
];

const CATEGORIES = [
  { name: "All", count: 78 },
  { name: "Technology", count: 7 },
  { name: "Industry", count: 8 },
  { name: "Fleet Operations", count: 8 },
  { name: "Service", count: 7 },
];

const ALL_ARTICLES = [
  {
    id: 1,
    img: "/assets/insights/article-featured-1.png",
    category: "Technology",
    title: "How Connected Vehicles Help Businesses Run Better",
    date: "28 July 2026",
    readTime: "5 min read",
    excerpt: "See how connected vehicle technology can help businesses…",
    slug: "connected-vehicles-business",
  },
  {
    id: 2,
    img: "/assets/insights/article-featured-2.png",
    category: "Technology",
    title: "The Future of Electric Commercial Vehicles",
    date: "25 July 2026",
    readTime: "7 min read",
    excerpt: "Exploring the next generation of EV technology for logistics…",
    slug: "future-electric-commercial-vehicles",
  },
  {
    id: 3,
    img: "/assets/insights/article-featured-3.png",
    category: "Industry",
    title: "Building Sustainable Supply Chains",
    date: "20 July 2026",
    readTime: "6 min read",
    excerpt: "How electric fleets are transforming logistics operations…",
    slug: "sustainable-supply-chains",
  },
  {
    id: 4,
    img: "/assets/insights/article-featured-4.png",
    category: "Fleet Operations",
    title: "Optimizing Fleet Management with AI",
    date: "15 July 2026",
    readTime: "8 min read",
    excerpt: "Leveraging artificial intelligence for smarter fleet decisions…",
    slug: "ai-fleet-management",
  },
  {
    id: 5,
    img: "/assets/insights/article-featured-1.png",
    category: "Service",
    title: "Electric Vehicle Maintenance Best Practices",
    date: "10 July 2026",
    readTime: "4 min read",
    excerpt: "Essential tips for maintaining your electric fleet…",
    slug: "ev-maintenance-best-practices",
  },
  {
    id: 6,
    img: "/assets/insights/article-featured-2.png",
    category: "Technology",
    title: "Battery Technology Advances in 2026",
    date: "5 July 2026",
    readTime: "6 min read",
    excerpt: "Latest breakthroughs in battery technology for commercial EVs…",
    slug: "battery-technology-advances",
  },
];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProgress, setFeaturedProgress] = useState(0);
  const featuredRowRef = useRef<HTMLDivElement>(null);

  // Filter articles based on category and search
  const filteredArticles = ALL_ARTICLES.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Carousel navigation
  const featuredStep = () => {
    const row = featuredRowRef.current;
    const card = row?.querySelector<HTMLElement>('a[href^="/insights/"]');
    if (!row || !card) return 0;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const scrollFeatured = (direction: 1 | -1) => {
    const row = featuredRowRef.current;
    const step = featuredStep();
    if (!row || !step) return;
    row.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleFeaturedScroll = () => {
    const row = featuredRowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setFeaturedProgress(
      maxScroll > 0 ? Math.min(Math.max(row.scrollLeft / maxScroll, 0), 1) : 0
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[324px] self-stretch overflow-hidden lg:h-[420px]">
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage:
              "linear-gradient(-87.99deg, rgb(14, 47, 109) 63.511%, rgb(29, 111, 255) 87.226%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-12 object-bottom lg:hidden"
          style={{
            backgroundImage: "url('/assets/insights/mobile-hero-bg.png')",
            backgroundSize: "cover",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundColor: "#1d6fff",
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px), repeating-linear-gradient(0deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px), linear-gradient(272deg,#0e2f6d -63.51%,#1d6fff 87.23%)",
          }}
        />
        <div className="absolute left-1/2 top-[120.32px] lg:top-[calc(50%+30px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 lg:gap-6 text-center w-[353px] lg:w-auto">
          <div className="relative flex items-center gap-1">
            <div className="absolute left-[3.43px] top-[0.33px] h-[16px] w-[116.978px] lg:h-[20.355px] lg:w-[148.821px]">
              <Image
                src="/assets/insights/eyebrow-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] w-[14.794px] relative lg:h-[20.355px] lg:w-[18.821px]">
              <Image
                src="/assets/insights/eyebrow-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <span className="relative text-[12px] lg:text-[14px] font-bold text-white tracking-[0.6px] lg:tracking-[0.7px] uppercase whitespace-nowrap">
              Insights
            </span>
          </div>
          <h1 className="w-full text-balance font-display text-[32px] lg:text-[52px] font-semibold leading-[1.15] text-white tracking-[-0.64px] lg:tracking-[-1.04px] lg:whitespace-nowrap">
            Stories, Ideas & Insights
          </h1>
          <p className="max-w-[353px] lg:max-w-[493px] text-[12px] lg:text-[16px] font-normal text-white leading-normal">
            Practical thinking about electric commercial mobility, from technology
            and operations to the business of running a fleet.
          </p>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-[#f3f4f5] overflow-hidden pb-[32px] lg:pb-[62px] pt-[32px] lg:pt-[64px] px-5 lg:px-[80px]">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-4 lg:gap-8 items-center">
          <div className="flex flex-col gap-3 lg:gap-4 items-center lg:items-start text-center lg:text-left w-full">
            <div className="relative flex items-center gap-1">
              <div className="h-[16px] w-[14.794px] relative lg:h-[20.355px] lg:w-[18.821px]">
                <Image
                  src="/assets/insights/eyebrow-4.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute left-0 top-[0.33px] h-[16px] w-[116.978px] lg:left-[3.43px] lg:top-0 lg:h-[20.355px] lg:w-[148.821px]">
                <Image
                  src="/assets/insights/eyebrow-3.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <span className="relative text-[12px] lg:text-[14px] font-bold text-[#0e2f6d] tracking-[0.6px] lg:tracking-[0.7px] uppercase whitespace-nowrap">
                Featured
              </span>
            </div>
            <h2 className="font-display text-[28px] lg:text-[52px] font-semibold leading-[1.15] text-[#121212] tracking-[-0.56px] lg:tracking-[-1.04px] whitespace-nowrap">
              Editor&apos;s picks
            </h2>
          </div>

          {/* Featured Carousel - Mobile: horizontal scroll cards */}
          <div className="relative w-full lg:hidden">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5">
              {FEATURED_ARTICLES.map((article) => (
                <a
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="bg-white rounded-[12px] p-2 flex flex-col gap-3 shrink-0 w-[320px] snap-start hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[160px] rounded-[8px] overflow-hidden">
                    <Image
                      src={article.img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-white px-2 py-2 rounded-[39.312px]">
                      <span className="text-[12px] font-semibold text-black">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute bottom-[56px] right-[-4px] bg-white size-8 rounded-[4px] flex items-center justify-center">
                      <Image
                        src="/assets/insights/arrow-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="-rotate-90 -scale-x-100"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 pt-1 pb-3">
                    <h3 className="font-display text-[16px] font-semibold leading-[1.4] text-[#121212] tracking-[-0.32px]">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-[rgba(18,18,18,0.6)]">
                        {article.date}
                      </span>
                      <span className="size-[3.145px] rounded-full bg-[rgba(0,0,0,0.5)]" />
                      <span className="text-[12px] font-semibold text-[rgba(18,18,18,0.6)]">
                        {article.readTime}
                      </span>
                    </div>
                    <p className="text-[12px] font-normal text-[#121212] leading-[1.4]">
                      {article.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Carousel - Desktop: full-width horizontal scroller */}
        <div className="relative mt-4 hidden lg:-mx-20 lg:mt-8 lg:block">
          <div
            ref={featuredRowRef}
            onScroll={handleFeaturedScroll}
            className="snap-row w-full items-center gap-8"
          >
            <div
              aria-hidden
              className="shrink-0"
              style={{ width: "max(48px, calc(50% - 672px))" }}
            />
            {FEATURED_ARTICLES.map((article) => (
              <a
                key={article.id}
                href={`/insights/${article.slug}`}
                className="flex h-[273px] w-[807px] shrink-0 items-start gap-6 rounded-[12px] bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <div
                  className="relative flex h-[233px] w-[353px] shrink-0 flex-col items-start gap-6 rounded-[8px] bg-[lightgray] bg-cover bg-center bg-no-repeat p-3"
                  style={{ backgroundImage: `url('${article.img}')` }}
                >
                  <div className="flex flex-col items-start gap-[10px] rounded-[50px] bg-white px-[10px] py-1">
                    <span className="text-[14px] font-bold text-black">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute right-3 top-[11.645px] flex size-9 items-center justify-center rounded-[4px] bg-white p-[11px_12px]">
                    <Image
                      src="/assets/insights/arrow-icon.svg"
                      alt=""
                      width={10}
                      height={15}
                      className="-rotate-90 -scale-x-100"
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 self-stretch">
                  <h3 className="self-stretch font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.52px] text-[#121212]">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-center gap-[10px] text-[14px] font-bold leading-normal text-[rgba(18,18,18,0.60)]">
                    <span>{article.date}</span>
                    <span className="size-[3.145px] rounded-full bg-[rgba(0,0,0,0.5)]" />
                    <span>{article.readTime}</span>
                  </div>
                  <p className="self-stretch text-[16px] font-normal leading-normal text-[#121212]">
                    {article.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={() => scrollFeatured(-1)}
            className="absolute left-[max(80px,calc(50%_-_640px))] top-1/2 -translate-y-1/2 size-[55px] flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Previous article"
          >
            <Image
              src="/assets/insights/carousel-arrow-left.svg"
              alt="Previous"
              width={55}
              height={55}
              className="-scale-y-100 rotate-180"
            />
          </button>
          <button
            onClick={() => scrollFeatured(1)}
            className="absolute right-[max(80px,calc(50%_-_640px))] top-1/2 -translate-y-1/2 size-[55px] flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Next article"
          >
            <Image
              src="/assets/insights/carousel-arrow-right.svg"
              alt="Next"
              width={55}
              height={55}
            />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 flex justify-center lg:mt-8">
          <div className="h-5 w-[116.199px] bg-[rgba(204,204,204,0.5)] rounded-[14.4px] p-1 flex items-center">
            <div
              className="h-full bg-[#121212] rounded-[23.04px] transition-all duration-300"
              style={{
                width: `${25 + featuredProgress * 75}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="overflow-hidden bg-white px-5 pt-[32px] lg:px-[60px] lg:pt-[62px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:gap-5">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex h-[42px] w-full items-center justify-between rounded-[50px] border border-[rgba(0,0,0,0.06)] bg-[#f3f4f5] p-3 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.1)] lg:h-[46px] lg:rounded-[500px] lg:border-[rgba(0,0,0,0.04)] lg:py-[3px] lg:pl-4 lg:pr-[3px]">
              <div className="flex items-center gap-2 lg:gap-3 flex-1">
                <Image
                  src="/assets/insights/search-icon.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="lg:w-5 lg:h-5"
                />
                <input
                  type="text"
                  placeholder="Search articles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[14px] lg:text-[16px] font-semibold text-[rgba(18,18,18,0.8)] placeholder:text-[rgba(18,18,18,0.8)] w-full"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-[rgba(18,18,18,0.5)] hover:text-[rgba(18,18,18,0.8)]"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="no-scrollbar flex h-8 w-full items-center justify-start gap-2 overflow-x-auto lg:h-auto lg:justify-center lg:overflow-visible">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex h-8 shrink-0 items-center gap-[6.4px] rounded-[400px] px-3 transition-all lg:h-auto lg:px-4 lg:py-[13px] ${
                  activeCategory === cat.name
                    ? "bg-gradient-to-r from-[#0e2f6d] to-[#1d6fff] text-white border-white hover:opacity-90"
                    : "bg-[rgba(204,204,204,0.32)] text-[#121212] hover:bg-[rgba(204,204,204,0.5)]"
                }`}
              >
                <span className="whitespace-nowrap text-[12px] font-semibold leading-none lg:text-[16px]">
                  {cat.name}
                </span>
                <span className={`size-[3.145px] rounded-full ${activeCategory === cat.name ? "bg-white/50" : "bg-black/50"}`} />
                <span className="whitespace-nowrap text-[10px] font-normal leading-none lg:text-[14px]">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      <section className="bg-white px-5 pb-[100px] pt-4 lg:px-[60px] lg:pt-[42px]">
        <div className="mx-auto max-w-[1280px]">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[18px] font-semibold text-[rgba(18,18,18,0.6)]">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-[16px] font-semibold text-[#1d6fff] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-5">
              {filteredArticles.map((article) => (
                <a
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="flex flex-col gap-3 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-2 transition-shadow hover:shadow-lg lg:gap-6 lg:p-5"
                >
                  <div className="relative h-[160px] overflow-hidden rounded-[8px] lg:h-[233px]">
                    <Image
                      src={article.img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-2 top-2 rounded-[50px] bg-white px-2 py-1 lg:left-3 lg:top-3 lg:px-2.5">
                      <span className="text-[12px] font-semibold text-black lg:text-[14px] lg:font-bold">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-[4px] bg-white lg:right-3 lg:top-3 lg:size-9">
                      <Image
                        src="/assets/insights/arrow-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="-rotate-90 -scale-x-100"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 pb-3 pt-1 lg:px-0 lg:pb-0 lg:pt-0">
                    <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] lg:whitespace-normal lg:text-[26px] lg:leading-[1.15] lg:tracking-[-0.52px]">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[12px] font-semibold text-[rgba(18,18,18,0.6)] lg:text-[14px] lg:font-bold">
                        {article.date}
                      </span>
                      <span className="size-[3.145px] rounded-full bg-[rgba(0,0,0,0.5)]" />
                      <span className="text-[12px] font-semibold text-[rgba(18,18,18,0.6)] lg:text-[14px] lg:font-bold">
                        {article.readTime}
                      </span>
                    </div>
                    <p className="text-[12px] font-normal leading-[1.4] text-[#121212] lg:text-[16px] lg:leading-normal">
                      {article.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
          {filteredArticles.length > 0 && (
            <div className="mt-5 flex justify-center">
              <Link
                href="/insights/connected-vehicles-business"
                className="inline-flex h-8 items-center justify-center rounded-[2px] border border-[#b8b8b8] bg-[#f7f7f7] px-3 text-[10px] font-medium text-[#121212] transition-colors hover:bg-[#ededed] lg:h-[30px]"
              >
                Load More
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
