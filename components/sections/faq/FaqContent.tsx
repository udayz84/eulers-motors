"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import type { StrapiFaqFaqsSection, StrapiFaqPageItem } from "@/types/strapi";

interface CategoryMeta {
  id: string;
  label: string;
  count: number;
}

interface FaqItem {
  id: string;
  title: string;
  answer: string;
  categories: string[];
  isFeatured: boolean;
  order: number;
}

function mapItems(section?: StrapiFaqFaqsSection): FaqItem[] {
  return (section?.items || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item: StrapiFaqPageItem, index) => ({
      id: String(item.id ?? index),
      title: item.question,
      answer: item.answer,
      categories: [item.category],
      isFeatured: Boolean(item.isFeatured),
      order: item.order ?? 0,
    }));
}

function buildCategories(items: FaqItem[], section?: StrapiFaqFaqsSection): CategoryMeta[] {
  const labels = section?.categories?.length
    ? section.categories.map((c) => c.label)
    : Array.from(new Set(items.map((i) => i.categories[0]).filter(Boolean)));

  return [
    { id: "All", label: "All", count: items.length },
    ...labels.map((label) => ({
      id: label,
      label,
      count: items.filter((i) => i.categories[0] === label).length,
    })),
  ];
}

/**
 * FAQ Main Container — Figma node 3538:26361
 * - Dynamic tab filtering with curated questions per category
 * - By default, the first accordion is open across all tabs and searches
 * - When searching, the "Last Updated" and legal text paragraphs are hidden, showing only the relevant accordions
 * - Items, categories, and intro copy are powered by the Strapi `faq-page` single type
 */
export default function FaqContent({ data }: { data?: StrapiFaqFaqsSection }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const searchPlaceholder = data?.searchPlaceholder || "Search for the question";
  const lastUpdated = data?.lastUpdated || "";
  const introParagraphs = useMemo(
    () => (data?.introText || "").split("\n\n").map((p) => p.trim()).filter(Boolean),
    [data?.introText]
  );

  const faqDatabase = useMemo(() => mapItems(data), [data]);
  const categories = useMemo(() => buildCategories(faqDatabase, data), [faqDatabase, data]);

  const isSearching = searchQuery.trim().length > 0;

  const filteredFaqs = useMemo(() => {
    let list: FaqItem[] = [];

    if (activeCategory === "All") {
      // In "All" view, featured items come first (in editorial order), then the rest
      const featured = faqDatabase.filter((f) => f.isFeatured);
      const rest = faqDatabase.filter((f) => !f.isFeatured);
      list = [...featured, ...rest];
    } else {
      list = faqDatabase.filter((faq) => faq.categories.includes(activeCategory));
    }

    if (isSearching) {
      const queryWords = searchQuery.trim().toLowerCase().split(/\s+/);
      list = list.filter((faq) =>
        queryWords.every(
          (word) =>
            faq.title.toLowerCase().includes(word) ||
            faq.answer.toLowerCase().includes(word)
        )
      );
    }

    return list;
  }, [activeCategory, searchQuery, isSearching, faqDatabase]);

  // By default, the first accordion should be open in all tabs and search results
  useEffect(() => {
    if (filteredFaqs.length > 0) {
      setExpandedItems({ [filteredFaqs[0].id]: true });
    } else {
      setExpandedItems({});
    }
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [showAllMobile, setShowAllMobile] = useState(false);

  // Reset showAllMobile on category or search change
  useEffect(() => {
    setShowAllMobile(false);
  }, [activeCategory, searchQuery]);

  const displayedFaqs = useMemo(() => {
    return filteredFaqs;
  }, [filteredFaqs]);

  return (
    <div
      data-node-id="3538:26361"
      className="relative mx-auto flex w-full flex-col items-center justify-center bg-white px-5 py-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]"
    >
      <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
        {/* ============================================================== */}
        {/* Search & Category Filter Section (Figma 3538:26362 / 2979:8417)*/}
        {/* ============================================================== */}
        <div className="relative flex w-[373px] max-w-[calc(100vw_-_20px)] self-center flex-col items-center gap-4 sm:w-full sm:max-w-full sm:self-auto sm:gap-5 md:gap-[20px]">
          {/* Tapered Frosted Filter Tray Background on Desktop / Wide Tablets (Figma 3538:26363) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[9.75px] left-1/2 hidden h-[76px] w-[811px] -translate-x-1/2 select-none min-[880px]:block"
          >
            <Image
              src="/assets/faq/filter-tray.svg"
              alt=""
              width={811}
              height={76}
              className="size-full object-contain"
            />
          </div>

          {/* Search Row Input Box (Figma 3538:26364 / 2979:8417) */}
          <div className="relative z-10 flex h-[42px] w-full items-center justify-between rounded-[50px] border border-black/[0.06] bg-[#f3f4f5] px-3.5 py-1 sm:h-[46px] sm:rounded-[500px] sm:border-black/[0.04] sm:py-[3px] sm:pl-4 sm:pr-3 sm:drop-shadow-[0px_2px_2px_rgba(0,0,0,0.1)] lg:h-[46px] lg:rounded-[500px] lg:border-black/[0.04] lg:py-[3px] lg:pl-4 lg:pr-[3px] lg:drop-shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex w-full items-center gap-2.5 sm:gap-3">
              <div className="flex size-4 shrink-0 items-center justify-center sm:size-5">
                <Image
                  src="/assets/faq/icon-search.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-3.5 opacity-80 sm:size-[18px]"
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent font-sans text-[14px] font-semibold text-ink placeholder:text-ink/80 focus:outline-none sm:text-[15px] md:text-[16px] lg:text-[16px] lg:font-semibold lg:text-[rgba(18,18,18,0.80)]"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="cursor-pointer text-[12px] font-medium text-ink/60 hover:text-ink sm:text-[13px]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular Categories Pill Row (Figma 3538:26368 / 2979:8424) */}
          {/* Spreads full width edge-to-edge on mobile and small tablets, centers on medium tablets */}
          <div className="relative z-10 -mx-4 w-[calc(100%+32px)] sm:-mx-8 sm:w-[calc(100%+64px)] md:mx-0 md:w-full">
            <div className="faq-pill-row flex w-full items-center justify-start gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:px-8 md:justify-center md:px-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex h-[32px] shrink-0 cursor-pointer items-center gap-1.5 rounded-[400px] px-3 transition-all duration-200 active:scale-95 sm:h-[36px] sm:px-3.5 md:h-auto md:px-4 md:py-3.5 ${
                      isActive
                        ? "faq-active-category border-[0.4px] border-white text-white shadow-sm"
                        : "bg-[#cccccc]/30 text-ink hover:bg-[#cccccc]/50"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundImage:
                              "linear-gradient(246.81deg, rgb(14, 47, 109) 138.16%, rgb(29, 111, 255) 87.02%)",
                          }
                        : undefined
                    }
                  >
                    <span className="font-sans text-[12px] font-semibold leading-none sm:text-[13px] md:text-[16px] md:leading-[100%] lg:font-semibold">
                      {cat.label}
                    </span>
                    <span
                      className={`size-[3.15px] rounded-full ${
                        isActive ? "bg-white/50" : "bg-black/50"
                      }`}
                    />
                    <span
                      className={`font-sans text-[10px] font-normal leading-none sm:text-[12px] md:text-[13px] lg:text-[14px] ${
                        isActive ? "text-white" : "text-ink"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Introductory Policy & Terms Text (Tablet & Desktop in Figma)   */}
        {/* Hidden on mobile (Figma 2979:7915) & hidden during search     */}
        {/* ============================================================== */}
        {!isSearching && introParagraphs.length > 0 && (
          <div className="hidden w-full max-w-[1040px] flex-col font-sans text-[15px] leading-[1.6] text-ink md:flex md:h-auto md:min-h-[275px] lg:text-[18px]">
            {lastUpdated && (
              <p className="mb-3 md:mb-4">
                <span className="font-normal">Last updated: </span>
                <span className="font-bold text-ink">{lastUpdated}</span>
              </p>
            )}
            {introParagraphs.map((paragraph, index) => (
              <p key={index} className={index < introParagraphs.length - 1 ? "mb-3 md:mb-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* ============================================================== */}
        {/* Dynamic Accordions List (Figma 3538:26361 / 2979:8438)         */}
        {/* ============================================================== */}
        <div
          key={activeCategory}
          id="faq-accordion-list"
          className="flex w-[373px] max-w-[calc(100vw_-_20px)] flex-col gap-2.5 self-center transition-all duration-300 sm:w-full sm:max-w-full sm:self-auto sm:gap-3 md:gap-[10px]"
        >
          {displayedFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[16px] bg-[#f3f4f5] px-6 py-12 text-center">
              <p className="font-sans text-[16px] font-semibold text-ink sm:text-[18px]">
                No matching questions found
              </p>
              <p className="mt-1 font-sans text-[13px] text-ink/70 sm:text-[14px]">
                We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your search.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 cursor-pointer rounded-full bg-navy px-5 py-2 font-sans text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-navy/90 sm:text-[14px]"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {displayedFaqs
                .slice(0, !isSearching && !showAllMobile ? 10 : displayedFaqs.length)
                .map((faq, index) => {
                  const isOpen = !!expandedItems[faq.id];
                  return (
                    <article
                      key={faq.id}
                      className="overflow-hidden rounded-[16px] bg-[#f3f4f5] transition-all duration-200"
                      style={{
                        animation: `fadeIn 300ms ease-out ${Math.min(index * 30, 240)}ms both`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(faq.id)}
                        aria-expanded={isOpen}
                        className="flex h-[56px] min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:h-[64px] sm:min-h-[64px] sm:p-5 sm:px-6 md:h-[70px] md:min-h-[70px] md:gap-5 md:p-6 md:px-8"
                      >
                        <span className="flex-1 font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[20px] lg:text-[20px] sm:tracking-[-0.4px]">
                          {faq.title}
                        </span>
                        <span className="relative flex size-5 shrink-0 items-center justify-center sm:size-5.5 md:size-6">
                          <Image
                            src="/assets/faq/icon-plus.svg"
                            alt=""
                            width={24}
                            height={24}
                            aria-hidden
                            className={`absolute size-5 select-none transition-all duration-300 sm:size-5.5 md:size-6 ${
                              isOpen ? "opacity-0 rotate-90 scale-75 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                            }`}
                          />
                          <Image
                            src="/assets/faq/icon-minus.svg"
                            alt=""
                            width={24}
                            height={24}
                            aria-hidden
                            className={`absolute size-5 select-none transition-all duration-300 sm:size-5.5 md:size-6 ${
                              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        className="accordion-grid"
                        data-open={isOpen}
                      >
                        <div className="accordion-inner">
                          <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                            <p className="font-sans text-[12px] font-normal leading-[1.4] text-ink/80 sm:text-[14px] sm:leading-[1.5] md:text-[16px] lg:!text-[18px] lg:font-normal lg:leading-[140%] lg:text-[#121212] sm:leading-[1.6] sm:text-ink">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

              {/* Load More Button on Mobile (Figma node 2982:9198) */}
              {!isSearching && !showAllMobile && displayedFaqs.length > 10 && (
                <div className="mt-2 flex justify-center md:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAllMobile(true)}
                    className="flex h-[32px] cursor-pointer items-center justify-center rounded-[4px] border border-black/50 bg-[#f3f4f5] px-5 font-display text-[12px] font-bold text-ink transition-colors hover:bg-black/10 active:scale-95"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
