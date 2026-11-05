import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

export interface InsightsArticleItem {
  id?: number | string;
  documentId?: string;
  title: string;
  slug?: string;
  description?: string;
  desc?: string;
  category?: string;
  readingTime?: string;
  publishedDate?: string;
  publishDate?: string;
  coverImage?: {
    url?: string;
  };
  img?: string;
  crop?: [number, number, number, number] | null;
  overlay?: boolean;
  date?: string;
}

const DEFAULT_ARTICLES: InsightsArticleItem[] = [
  {
    img: "/assets/insights/article-1.webp",
    title: "What an electric fleet really costs",
    desc: "Electricity, servicing, insurance, battery, and resale value. Everything calculated for fleets driving 80km to 200 km per day.",
    crop: null,
    overlay: false,
    date: "14 July 2026",
    readingTime: "09 Min",
  },
  {
    img: "/assets/insights/article-2.webp",
    title: "How much EV subsidy will you get?",
    desc: "Which states still offer subsidies, what ended in April, and how to claim them.",
    crop: [-21.5, -0.02, 143.14, 100.04],
    overlay: true,
    date: "14 July 2026",
    readingTime: "09 Min",
  },
  {
    img: "/assets/insights/article-3.webp",
    title: "Depot or public charging?",
    desc: "Under 9 vehicles, public charging works out cheaper. The full working is inside",
    crop: null,
    overlay: true,
    date: "14 July 2026",
    readingTime: "09 Min",
  },
];

import { mediaUrl } from "@/lib/strapi/client";

function getMediaUrl(img?: any): string | null {
  if (!img) return null;
  const url = mediaUrl(img);
  return url || null;
}

export interface InsightsProps {
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  mobileButtonLabel?: string;
  articles?: InsightsArticleItem[];
}

/**
 * "Learn more about EVs" (desktop 1:1853 · mobile 1:4924).
 * Article cards with white date chip and glass info panel.
 * Desktop: CTA on one line with the heading (1:1862) · mobile: single CTA
 * below the cards, centered (1:4956).
 */
export default function Insights({
  eyebrow = "insights",
  title = "Learn more about EVs",
  buttonLabel = "Explore vehicles",
  buttonHref = "/products",
  mobileButtonLabel,
  articles,
}: InsightsProps = {}) {
  const currentArticles = articles !== undefined ? articles : DEFAULT_ARTICLES;

  // Clean unmount if empty collection intentionally provided by CMS
  if (currentArticles.length === 0) return null;

  return (
    <section className="bg-white" aria-label="Insights">
      {/* Figma 1:1853: 1440 frame, padding 42px 80px 56px, column, items-center,
          gap 32 — header 1280×96.36 · highlights 1280×407 (3× 413.33 + 2×20) */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pb-8 pt-[42px] lg:items-center lg:gap-8 lg:px-[80px] lg:pb-14">
        {/* header — centered on mobile (Figma 1:4925), left on desktop; title
            stays on one line (1:1862) */}
        <div className="flex w-full flex-col items-center lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-center gap-[14px] text-center lg:items-start lg:gap-4 lg:text-left">
            {eyebrow && <Eyebrow label={eyebrow} />}
            <h2 className="whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[52px] lg:tracking-[-1.04px]">
              {title}
            </h2>
          </div>
          {/* wrapper hides on mobile — Button's base `inline-flex` beats a plain
              `hidden` under Tailwind v4's cascade, so the display toggle lives here */}
          {buttonLabel && buttonHref && (
            <div className="hidden lg:block">
              <Button href={buttonHref} variant="dark" arrow="white">
                {buttonLabel}
              </Button>
            </div>
          )}
        </div>

        <div className="snap-row snap-center-mobile -mx-5 w-[calc(100%+40px)] gap-[13px] lg:mx-0 lg:w-full lg:gap-5">
          {/* Mobile spacer — same system as Customer Reviews: the row bleeds
              to the viewport edge (-mx-5), so 20px gutter minus the 13px gap
              starts the first card at the container's 20px (px-5) content edge */}
          <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 13px)" }} />
          {currentArticles.map((a, i) => {
            const articleItem = a as InsightsArticleItem;
            const imgSrc =
              getMediaUrl(articleItem.coverImage) ||
              articleItem.img ||
              DEFAULT_ARTICLES[i % DEFAULT_ARTICLES.length]?.img ||
              "/assets/insights/article-1.webp";
            const cardTitle = articleItem.title || "";
            const cardDesc = articleItem.description || articleItem.desc || "";
            const cardDate = articleItem.publishDate || articleItem.date || "14 July 2026";
            const cardTime = articleItem.readingTime || "09 Min";
            const crop =
              articleItem.crop !== undefined
                ? articleItem.crop
                : imgSrc.includes("article-2")
                ? [-21.5, -0.02, 143.14, 100.04]
                : null;
            const hasOverlay =
              articleItem.overlay !== undefined ? articleItem.overlay : i > 0;

            return (
              <article
                key={`${cardTitle}-${i}`}
                className={`relative h-[320px] w-[300px] shrink-0 overflow-clip rounded-[12.6px] lg:h-[407px] lg:w-auto lg:flex-1 lg:rounded-[16px] ${
                  currentArticles.length < 3 ? "lg:max-w-[413.33px]" : ""
                }`}
              >
                {crop ? (
                  <Image
                    src={imgSrc}
                    alt=""
                    width={592}
                    height={407}
                    className="absolute max-w-none object-cover"
                    style={{
                      left: `${crop[0]}%`,
                      top: `${crop[1]}%`,
                      width: `${crop[2]}%`,
                      height: `${crop[3]}%`,
                    }}
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 324px, 427px"
                    className="object-cover"
                  />
                )}
                {hasOverlay && (
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[44.003%] from-black/0 to-[87.738%] to-black/50" />
                )}
                <div aria-hidden className="absolute -bottom-[118px] left-1/2 h-[247px] w-[473px] -translate-x-1/2 bg-black/20 blur-[102px]" />
                <div aria-hidden className="absolute -left-[383px] -top-[164px] h-[247px] w-[473px] bg-black/20 blur-[102px]" />

                {/* date + read time chip — (12, 12.09), white, r50, px-10/py-4 */}
                <div className="absolute left-3 top-3 flex items-center gap-2.5 rounded-full bg-white px-2.5 py-1">
                  <span className="text-[12px] font-bold text-black lg:text-[14px]">{cardDate}</span>
                  <span aria-hidden className="size-1 rounded-full bg-black/50" />
                  <span className="text-[12px] font-bold text-black lg:text-[14px]">{cardTime}</span>
                </div>

                {/* info panel — bottom 16, w 382, bg-white/20, p16, r10, gap 12 */}
                <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-[10px] bg-white/20 p-3 backdrop-blur-[10px] border border-white/20 lg:gap-3 lg:p-4">
                  <h3 className="text-[16px] font-semibold leading-normal tracking-[-0.4px] text-white lg:text-[20px]">
                    {cardTitle}
                  </h3>
                  {cardDesc && (
                    <p className="line-clamp-3 text-[12px] leading-[1.5] text-white lg:line-clamp-2 lg:text-[14px]">
                      {cardDesc}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
          {/* Mobile spacer — mirrors the left one for symmetric end padding */}
          <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(20px - 13px)" }} />
        </div>

        {/* mobile-only CTA below the cards — centered (Figma 1:4956) */}
        {buttonHref && (
          <Button href={buttonHref} variant="dark" arrow="white" className="self-center lg:hidden">
            {mobileButtonLabel || "All Articles"}
          </Button>
        )}
      </div>
    </section>
  );
}
