"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Arrow from "../ui/Arrow";

const ARTICLES = [
  {
    title: "What an electric fleet really costs",
    desc: "Electricity, servicing, insurance, battery, and resale value. Everything calculated for fleets driving 80km to 200 km per day.",
    image: "/assets/insights/figma-highlight/story-2.png",
    mobileImage: "/assets/insights/highlights/story-2-mobile.png",
    overlay: true,
  },
  {
    title: "How much EV subsidy will you get?",
    desc: "Which states still offer subsidies, what ended in April, and how to claim them.",
    image: "/assets/insights/figma-highlight/story-4.png",
    mobileImage: "/assets/insights/highlights/story-4-mobile.png",
    overlay: false,
  },
  {
    title: "Depot or public charging?",
    desc: "Under 9 vehicles, public charging works out cheaper. The full working is inside",
    image: "/assets/insights/figma-highlight/story-5.png",
    mobileImage: "/assets/insights/highlights/story-5-desktop.png",
    overlay: true,
  },
];

const storyOverlay = "/assets/insights/figma-highlight/story-3.png";
const mobileStoryOverlay = "/assets/insights/highlights/story-3-mobile.png";

function ArticleArtwork({ index }: { index: number }) {
  const article = ARTICLES[index];

  if (index === 1) {
    return (
      <>
        <Image src={article.image} alt="" width={592} height={407} sizes="592px" className="absolute left-[-21.5%] top-[-0.02%] h-[100.04%] max-w-none w-[143.14%] object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-[44.003%] to-black/50 to-[87.738%]" />
      </>
    );
  }

  return (
    <>
      <Image src={article.image} alt="" fill sizes="407px" className="object-cover" />
      {index === 2 && <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-[44.003%] to-black/50 to-[87.738%]" />}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={storyOverlay}
          alt=""
          width={1049}
          height={728}
          className={index === 0
            ? "absolute left-[-2.17%] top-0 h-[193.19%] max-w-none w-[275.13%]"
            : "absolute left-[-159.36%] top-[-111.33%] h-[211.33%] max-w-none w-[300.96%]"}
        />
      </div>
    </>
  );
}

function DesktopArticleCard({ index }: { index: number }) {
  const article = ARTICLES[index];

  return (
    <article className="relative h-[407px] min-w-0 flex-[1_0_0] overflow-hidden rounded-2xl bg-[#121212]">
      <div className="absolute inset-0">
        <ArticleArtwork index={index} />
      </div>

      <div className="absolute left-3 top-3 flex h-[25.5px] w-[173px] items-center justify-center gap-2.5 rounded-full bg-white px-2.5 py-1">
        <span className="whitespace-nowrap font-sans text-[14px] font-bold leading-normal text-black">14 July 2026</span>
        <span aria-hidden className="size-1 shrink-0 rounded-full bg-black/50" />
        <span className="whitespace-nowrap font-sans text-[14px] font-bold leading-normal text-black">09 Min</span>
      </div>

      <div className="absolute bottom-4 left-1/2 flex w-[382px] -translate-x-1/2 flex-col gap-3 overflow-hidden rounded-[10px] border border-white/20 bg-white/20 p-4 text-white backdrop-blur-[60px]">
        <h3 className="w-full font-sans text-[20px] font-semibold leading-[24px] tracking-[-0.4px]">{article.title}</h3>
        <p className="h-[42px] w-full overflow-hidden text-ellipsis font-sans text-[14px] font-normal leading-[21px]">{article.desc}</p>
      </div>
    </article>
  );
}

function DesktopInsights() {
  return (
    <div className="mx-auto hidden h-[695px] w-full max-w-[1440px] flex-col items-center gap-8 px-20 pb-14 pt-[42px] lg:flex">
      <header className="flex shrink-0 flex-col items-center justify-center gap-[14px] text-center">
        <div className="flex items-center gap-3">
          <Image src="/assets/insights/figma-highlight/logo.svg" alt="" width={14} height={14} aria-hidden />
          <span className="font-sans text-[16px] font-normal uppercase leading-normal text-ink">insights</span>
        </div>
        <h2 className="whitespace-nowrap font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink">
          Learn More About EVs
        </h2>
      </header>

      <div className="flex w-full shrink-0 items-center justify-start gap-5">
        {ARTICLES.map((article, index) => <DesktopArticleCard key={article.title} index={index} />)}
      </div>

      <a
        href="/insights"
        className="inline-flex h-[42px] shrink-0 items-center gap-5 rounded-[4px] bg-[linear-gradient(106.856deg,#00ff87_28.559%,#1d6fff_124.97%)] py-0 pl-6 pr-[2px] font-display text-[16px] font-semibold leading-none text-white"
      >
        All articles
        <span className="flex size-[38px] flex-col items-center justify-center rounded-[2px] bg-ink">
          <Image src="/assets/insights/figma-highlight/arrow-container.svg" alt="" width={22} height={14} aria-hidden />
        </span>
      </a>
    </div>
  );
}

function MobileInsights() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setProgress(maxScroll > 0 ? row.scrollLeft / maxScroll : 0);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-6 px-5 pb-8 pt-[42px] lg:hidden">
      <header className="flex flex-col items-center justify-center gap-[14px] text-center">
        <div className="flex items-center gap-[6px]">
          <Image src="/assets/insights/figma-highlight/logo.svg" alt="" width={14} height={14} aria-hidden />
          <span className="font-sans text-[12px] font-normal uppercase leading-normal text-ink">insights</span>
        </div>
        <h2 className="whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink min-[768px]:max-[1023px]:text-[36px]">Learn More About EVs</h2>
      </header>

      <div ref={rowRef} onScroll={updateProgress} className="no-scrollbar flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pr-[10.388px] max-[767px]:-mx-5 max-[767px]:w-[calc(100%+40px)] max-[767px]:pr-0 min-[768px]:max-[1023px]:gap-4" aria-label="Featured articles">
        {ARTICLES.map((article, index) => (
          <article key={article.title} className={`relative h-[320px] w-[324px] shrink-0 snap-start overflow-clip rounded-[12.58px] min-[768px]:max-[1023px]:h-[390px] min-[768px]:max-[1023px]:w-[400px] ${index === 0 ? "max-[767px]:ml-5 max-[767px]:scroll-ml-5 min-[768px]:max-[1023px]:ml-0" : ""}`}>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
              {index !== 1 && <Image src={article.mobileImage} alt="" fill sizes="324px" className="rounded-[inherit] object-cover" />}
              {index === 0 && <div className="absolute inset-0 overflow-hidden rounded-[inherit]"><Image src={mobileStoryOverlay} alt="" width={1049} height={728} className="absolute left-[-2.59%] top-[-15.36%] h-[227.4%] max-w-none w-[323.86%]" /></div>}
              {index === 1 && <><Image src={article.mobileImage} alt="" width={592} height={407} className="absolute left-[-21.5%] top-[-0.02%] h-[100.04%] max-w-none w-[143.14%] object-cover" /><div aria-hidden className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-transparent from-[44.003%] to-black/50 to-[87.738%]" /></>}
              {index === 2 && <><div aria-hidden className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-transparent from-[44.003%] to-black/50 to-[87.738%]" /><div className="absolute inset-0 overflow-hidden rounded-[inherit]"><Image src={mobileStoryOverlay} alt="" width={1049} height={728} className="absolute left-[-159.36%] top-[-111.33%] h-[211.33%] max-w-none w-[300.96%]" /></div></>}
            </div>
            <div aria-hidden className="absolute -bottom-[118.5px] left-1/2 h-[247.371px] w-[472.982px] -translate-x-1/2 bg-black/20 blur-[102.15px]" />
            <div aria-hidden className="absolute -left-[383.31px] -top-[163.93px] h-[247.371px] w-[472.982px] bg-black/20 blur-[102.15px]" />
            <div className="absolute left-3 top-3 flex w-fit items-center justify-center gap-[7.862px] rounded-full bg-white px-[7.862px] py-[3.145px]">
              <span className="whitespace-nowrap font-sans text-[12px] font-semibold leading-normal text-black">14 July 2026</span><span aria-hidden className="size-1 shrink-0 rounded-full bg-black/50" /><span className="whitespace-nowrap font-sans text-[12px] font-semibold leading-normal text-black">09 Min</span>
            </div>
            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-[6px] rounded-lg bg-white/20 p-3 text-white backdrop-blur-[10px]">
              <h3 className={`w-full font-sans text-[16px] font-semibold leading-normal tracking-[-0.32px] ${index > 0 ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}>{article.title}</h3>
              <p className="h-9 w-full overflow-hidden text-ellipsis text-[12px] font-normal leading-[1.5]">{article.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="relative flex h-5 w-[116.2px] shrink-0 items-center rounded-[14.4px] bg-ink p-1" role="progressbar" aria-label="Article carousel position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <div className="h-3 w-[29.9px] rounded-full bg-[linear-gradient(100.21deg,#00ff87_28.559%,#1d6fff_124.97%)] transition-transform duration-150" style={{ transform: `translateX(${progress * 78.3}px)` }} />
        </div>
        <a href="/insights" className="inline-flex h-9 items-center gap-2 rounded bg-[linear-gradient(106.86deg,#00ff87_28.559%,#1d6fff_124.97%)] pl-3 pr-[2px] text-[12px] font-semibold leading-none text-white">
          <span className="font-display">All Articles</span>
          <span className="flex size-[32px] items-center justify-center rounded-[2px] bg-ink"><Arrow className="!h-[11.79px] !w-[18.53px]" /></span>
        </a>
      </div>
    </div>
  );
}

export default function Insights() {
  return (
    <section id="insights" className="bg-white" aria-label="Insights">
      <DesktopInsights />
      <MobileInsights />
    </section>
  );
}
