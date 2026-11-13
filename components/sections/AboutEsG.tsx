"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import type { StrapiAboutEsgSection } from "@/types/strapi";
import { DEFAULT_ABOUT_PAGE } from "@/lib/strapi/defaults/about";
import { mediaUrl } from "@/lib/strapi/client";

export interface AboutEsGProps {
  data?: StrapiAboutEsgSection;
}

/**
 * ESG in action section (desktop Figma 3537:18846 · mobile 2937:15792).
 * "Building a Better Tomorrow" — ESG tab pills (Environment active), the
 * photo card with headline/description and the 480M km · 1,000+ · 40 cities
 * stat row split by hairlines, and the 01/02/03 impact cards (mobile keeps
 * two in a snap row with the pill indicator).
 */
export default function AboutEsG({ data }: AboutEsGProps = {}) {
  const fallback = DEFAULT_ABOUT_PAGE.esgSection!;
  const eyebrow = data?.eyebrow || fallback.eyebrow || "Esg in Action";
  const title = data?.title || "Building a Better\nTomorrow";
  const description = data?.description || fallback.description || "";
  const tabs = data?.tabs && data.tabs.length > 0 ? data.tabs : fallback.tabs!;

  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex < tabs.length ? activeIndex : 0;
  const activeTab = tabs[safeIndex] || tabs[0];
  const photoUrl = mediaUrl(activeTab?.image, "/assets/about-euler/esg-photo.png");
  const stats = activeTab?.stats || [];
  const cards = activeTab?.cards || [];

  return (
    <section className="esg-bg py-[41.85px] lg:py-[62px]" aria-label="ESG in action">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 sm:gap-9 px-5 sm:px-8 lg:gap-[42px] lg:px-20">
        {/* Header — mobile stacks · desktop: title left, copy + tabs right
            (the right column centers vertically in the row, Figma 3537:18960) */}
        <div className="flex flex-col gap-[14px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-[14px] lg:w-[636px] lg:gap-[25px]">
            <Eyebrow dark label={eyebrow} />
            <h2 className="whitespace-pre-line font-display text-[28px] sm:text-[36px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:w-[575.92px] lg:text-[52px] lg:tracking-[-1.04px]">
              {title}
            </h2>
          </div>
          <div className="flex flex-col gap-[14px] lg:items-end lg:gap-[31px]">
            <p className="text-[12px] sm:text-[14px] font-normal leading-[normal] text-white lg:w-[531px] lg:text-[16px]">
              {description}
            </p>
            <div className="flex w-full gap-3 lg:justify-end lg:gap-4" role="tablist" aria-label="ESG focus areas">
              {tabs.map((t, index) => {
                const active = index === safeIndex;
                return (
                  <button
                    key={t.id || t.tabTitle}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveIndex(index)}
                    className={`flex h-8 sm:h-9 flex-1 items-center justify-center whitespace-nowrap rounded-[24.381px] px-[14px] font-display text-[12px] sm:text-[14px] font-semibold leading-none cursor-pointer lg:h-[42px] lg:px-6 lg:text-[16px] ${active
                        ? "border-[0.641px] border-[rgba(18,18,18,0.5)] bg-white text-ink"
                        : "border-[0.762px] border-[rgba(255,255,255,0.1)] bg-black text-white backdrop-blur-[7.619px]"
                      }`}
                  >
                    {t.tabTitle}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Photo + statement/stats */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-[42px]">
          <div className="relative h-[235.284px] sm:h-[320px] w-full shrink-0 overflow-hidden rounded-[12px] lg:h-[384.279px] lg:w-[738.814px]">
            <Image
              src={photoUrl}
              alt={activeTab?.headline || "Euler electric commercial vehicle on a delivery route"}
              fill
              sizes="(min-width: 768px) 739px, 353px"
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-4 lg:h-[334px] lg:justify-between lg:gap-0">
            <div className="flex flex-col gap-2.5">
              <h3 className="font-display text-[18px] sm:text-[22px] font-semibold leading-[1.15] tracking-[-0.36px] text-white lg:text-[32px] lg:tracking-[-0.64px]">
                {activeTab?.headline}
              </h3>
              <p className="text-[12px] sm:text-[14px] font-normal leading-[normal] text-white lg:text-[18px]">
                {activeTab?.summary}
              </p>
            </div>
            <div className="flex items-center justify-between">
              {stats.map((s, i) => (
                <Fragment key={`${s.label}-${i}`}>
                  {i > 0 && (
                    <div className="flex flex-1 items-center justify-center px-4">
                      <span aria-hidden className="block h-[65px] w-px bg-white opacity-50" />
                    </div>
                  )}
                  <div className="flex flex-col gap-[2px] text-white">
                    <p className="font-display text-[24px] sm:text-[28px] font-semibold leading-[1.15] tracking-[-0.48px] lg:text-[36px] lg:tracking-[-0.72px]">
                      {s.value}{" "}
                      {s.unit && (
                        <span
                          className={`font-medium text-[16px] leading-[1.15] lg:text-[20px] ${s.unit.toLowerCase() === "cities" ? "tracking-[-0.32px] lg:tracking-[-0.4px]" : ""
                            }`}
                        >
                          {s.unit}
                        </span>
                      )}
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-normal leading-[normal] lg:text-[16px]">{s.label}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Impact cards — desktop row of 3 · mobile snap row of 2 + indicator */}
        <div className="flex flex-col gap-4 lg:gap-0">
          <div className="snap-row -mx-5 sm:-mx-8 gap-2.5 sm:gap-4 px-5 sm:px-8 lg:mx-0 lg:gap-5 lg:items-stretch lg:overflow-visible lg:px-0">
            {cards.map((card, i) => (
              <article
                key={card.id || `${card.number}-${i}`}
                className="w-[247px] sm:w-[280px] shrink-0 rounded-[6px] border border-white/20 bg-white/8 p-5 sm:p-6 lg:flex lg:min-w-px lg:w-auto lg:flex-[1_0_0] lg:items-center lg:p-6"
              >
                <div className="flex flex-col gap-2 lg:min-w-0 lg:flex-1 lg:gap-3">
                  <p className="bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.02)] bg-clip-text text-[24px] font-bold leading-none text-transparent lg:text-[32px]">
                    {card.number}
                  </p>
                  <p
                    className={`text-[16px] font-bold text-white lg:text-[22px] ${i === 2 ? "lg:tracking-[-0.44px]" : ""
                      }`}
                  >
                    {card.title}
                  </p>
                  <p className="text-[12px] font-normal text-white lg:text-[16px]">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
          {/* Mobile pill indicator (2937:3329:13511) */}
          <div aria-hidden className="mx-auto flex h-5 w-[116.199px] items-center rounded-[14.4px] bg-[rgba(204,204,204,0.2)] p-1 lg:hidden">
            <div className="h-full w-[29.891px] shrink-0 rounded-[23.04px] bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
