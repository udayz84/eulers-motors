"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";
import MobilePageHero from "@/components/sections/MobilePageHero";
import Arrow from "@/components/ui/Arrow";

type PressCategory = "Company News" | "Funding" | "Charging" | "Service" | "Warranty";

type PressArticle = {
  id: number;
  source: string;
  date: string;
  title: string;
  summary: string;
  category: PressCategory;
  url: string;
};

const FEATURED_STORIES = [
  {
    source: "Business Standard",
    date: "28 July 2026",
    title: "Euler Motors expands charging network across India",
    summary:
      "The company is adding depot chargers at customer sites and highway points along the Delhi to Mumbai freight corridor, a route that carries a large share of the country’s containerised road freight.",
    image: "/assets/insights/article-featured-1.png",
  },
  {
    source: "Business Standard",
    date: "18 July 2026",
    title: "Euler Motors brings electric freight within reach of more businesses",
    summary:
      "New charging and service locations are helping more fleet operators make the switch to electric commercial vehicles.",
    image: "/assets/insights/article-featured-1.png",
  },
];

const CATEGORIES: { label: "All" | PressCategory; count: number }[] = [
  { label: "All", count: 78 },
  { label: "Company News", count: 7 },
  { label: "Funding", count: 8 },
  { label: "Charging", count: 8 },
  { label: "Service", count: 7 },
  { label: "Warranty", count: 8 },
];

const ARTICLES: PressArticle[] = [
  {
    id: 1,
    source: "Economic Times",
    date: "12 July 2026",
    title: "Euler Motors secures strategic investment to scale its electric fleet",
    summary: "Proceeds are earmarked for a second assembly line and a wider service footprint, the company told the paper.",
    category: "Funding",
    url: "#",
  },
  {
    id: 2,
    source: "Autocar Professional",
    date: "30 June 2026",
    title: "Euler launches new commercial EV platform",
    summary: "One skateboard chassis will carry three body styles down the same line, cutting the changeover between variants.",
    category: "Company News",
    url: "#",
  },
  {
    id: 3,
    source: "The Hindu BusinessLine",
    date: "14 July 2026",
    title: "Government fleet electrification gathers pace",
    summary: "The agreement covers twelve hundred last-mile vehicles and shared charging over three years.",
    category: "Charging",
    url: "#",
  },
  {
    id: 4,
    source: "Financial Express",
    date: "24 June 2026",
    title: "EV adoption in logistics continues to grow",
    summary: "Fleet operators quoted in the report put the switch down to running cost per kilometre rather than purchase price.",
    category: "Service",
    url: "#",
  },
  {
    id: 5,
    source: "Mint",
    date: "18 June 2026",
    title: "Euler Motors expands its nationwide service network",
    summary: "The role covers the plant ramp and supplier quality across both assembly lines.",
    category: "Service",
    url: "#",
  },
  {
    id: 6,
    source: "Autocar India",
    date: "10 June 2026",
    title: "Electric goods vehicles get a longer warranty",
    summary: "The updated coverage is designed to give fleet owners more confidence on the road.",
    category: "Warranty",
    url: "#",
  },
  {
    id: 7,
    source: "Business Standard",
    date: "4 June 2026",
    title: "Euler Motors adds fast charging locations for fleet customers",
    summary: "The expansion connects high-demand delivery and freight corridors.",
    category: "Charging",
    url: "#",
  },
  {
    id: 8,
    source: "The Economic Times",
    date: "28 May 2026",
    title: "Euler Motors announces new manufacturing capacity",
    summary: "The company is preparing for rising demand for electric commercial vehicles.",
    category: "Company News",
    url: "#",
  },
];

const MEDIA_KIT_ITEMS = [
  { label: "Media kit", title: "Logos, product shots, boilerplate and the company one-pager in one archive.", size: "18.4 km", filename: "euler-media-kit.zip" },
  { label: "Brand assets", title: "Wordmark and symbol in SVG and PNG, with the clear-space rules.", size: "6.2 km", filename: "euler-brand-assets.zip" },
  { label: "Company fact sheet", title: "Founding, footprint, plants, patents and the current team.", size: "140 kb", filename: "euler-fact-sheet.pdf" },
  { label: "Media kit", title: "Logos, product shots, boilerplate and the company one-pager in one archive.", size: "18.4 km", filename: "euler-media-kit.zip" },
  { label: "Leadership portraits", title: "Press-ready portraits with approved credits and captions.", size: "24.1 MB", filename: "euler-leadership-portraits.zip" },
  { label: "Press contact", title: "Reach the communications team directly for interviews and enquiries.", size: "", filename: "press@eulermotors.com" },
  { label: "Brochures", title: "Discover our story, explore our services, and see how we can bring your vision to life.", size: "", filename: "support@eulermotors.com" },
];

function SectionEyebrow({ children, light = false, className = "", readingAccent = false, mediaAccent = false }: { children: ReactNode; light?: boolean; className?: string; readingAccent?: boolean; mediaAccent?: boolean }) {
  return (
    <div className={`relative flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.6px] ${light ? "text-white" : "text-[#0e2f6d]"} ${readingAccent || mediaAccent ? "gap-[6px]" : ""} ${className}`}>
      {(readingAccent || mediaAccent) && <Image src="/assets/insights/figma-eyebrow-reading.svg" alt="" aria-hidden width={147} height={21} className={`absolute top-0 w-[148.821px] max-w-none ${mediaAccent ? "left-[4px] h-[20.355px] origin-left scale-x-[2]" : "left-[3.43px] h-[21px]"}`} />}
      {mediaAccent ? (
        <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" aria-hidden width={19} height={21} className="relative h-[20.355px] w-[18.821px]" />
      ) : readingAccent ? (
        <Image src="/assets/insights/figma-eyebrow-reading-dot.svg" alt="" aria-hidden width={19} height={21} className="relative h-[20.355px] w-[18.821px]" />
      ) : (
        <span aria-hidden className={`h-3 w-4 -skew-x-[25deg] ${light ? "bg-white" : "bg-[#0e2f6d]"}`} />
      )}
      <span className={readingAccent || mediaAccent ? "relative z-10" : ""}>{children}</span>
    </div>
  );
}

function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function StoryArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 55 55" fill="none" className="absolute inset-0 size-full" aria-hidden="true">
      <path
        d={
          direction === "left"
            ? "M30.3097 34.5L24.9791 28.2809C24.5939 27.8316 24.5939 27.1684 24.9791 26.7191L30.3097 20.5"
            : "M24.6903 34.5L30.0209 28.2809C30.4061 27.8316 30.4061 27.1684 30.0209 26.7191L24.6903 20.5"
        }
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function InPressPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | PressCategory>("All");
  const [featuredProgress, setFeaturedProgress] = useState(0);
  const [pressProgress, setPressProgress] = useState(0);
  const [pressIndex, setPressIndex] = useState(0);
  const [kitProgress, setKitProgress] = useState(0);
  const featuredRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const kitRef = useRef<HTMLDivElement>(null);
  const [arrowTops, setArrowTops] = useState<{ featured?: number; kit?: number }>({});

  useEffect(() => {
    let cancelled = false;
    const topFor = (row: HTMLDivElement | null) => {
      const section = row?.closest("section");
      const card = row?.querySelector<HTMLElement>("article");
      if (!section || !card) return undefined;
      const sectionRect = section.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const zoom = Number.parseFloat(window.getComputedStyle(document.documentElement).zoom) || 1;
      return Math.round((cardRect.top - sectionRect.top + cardRect.height / 2) / zoom - 27.5);
    };
    const measure = () => {
      if (!cancelled) setArrowTops({ featured: topFor(featuredRef.current), kit: topFor(kitRef.current) });
    };
    measure();
    const frame = requestAnimationFrame(measure);
    const timer = window.setTimeout(measure, 400);
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const visibleArticles = ARTICLES.filter((article) => activeCategory === "All" || article.category === activeCategory);

  const scrollRow = (ref: RefObject<HTMLDivElement | null>, direction: -1 | 1, selector: string) => {
    const row = ref.current;
    const card = row?.querySelector<HTMLElement>(selector);
    if (!row || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const updateProgress = (ref: RefObject<HTMLDivElement | null>, setter: (value: number) => void) => {
    const row = ref.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    setter(max > 0 ? Math.max(0, Math.min(1, row.scrollLeft / max)) : 0);
  };

  const pressPageCount = Math.max(1, Math.ceil(visibleArticles.length / 5));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="relative">
        <div className="lg:hidden">
          <MobilePageHero
            label="Newsroom"
            title="In the News"
            titleId="in-press-title-mobile"
            className="!h-[324px] sm:!h-[324px]"
            description="See the latest media coverage, company announcements and industry updates from Euler Motors."
            action={<a href="#media-kit" className="flex h-[44px] w-[313px] items-center justify-center gap-2 whitespace-nowrap rounded-[3px] bg-white px-5 font-display text-[12px] font-bold leading-[100%] text-[#121212] transition-colors hover:bg-[#e9edf3]">Download Media Kit <Arrow color="ink" /></a>}
            hasWidget
            imageSrc="/assets/in-press/Last banners-04.webp"
          />
        </div>
        <div className="hidden lg:block">
          <PolicyHero
            label="Newsroom"
            title="In the News"
            description="See the latest media coverage, company announcements and industry updates from Euler Motors."
            action={<a href="#media-kit" className="flex h-[50.477px] w-[241px] items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border-[0.5px] border-white bg-[#f2f2f2] px-6 font-display text-[16px] font-semibold leading-[100%] text-[#121212] transition-colors hover:bg-[#e9edf3]">Download Media Kit <Arrow color="ink" /></a>}
            hasWidget
            widgetDesktopClassName="lg:top-[calc(100%_-_20px)] lg:translate-y-0"
            widgetDesktopRightClassName="lg:right-[-30px]"
            imageSrc="/assets/in-press/Last banners-04.webp"
          />
        </div>

        <section className="relative overflow-hidden bg-[#f3f4f5] py-8 pl-[10px] pr-0 sm:py-12 sm:pl-8 sm:pr-8 md:flex md:h-[545px] md:flex-col md:items-center md:justify-center md:gap-8 md:px-[80px] md:pb-[62px] md:pt-[64px]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-4 md:block">
            <h2 className="self-stretch font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.4px] text-[#121212] md:text-[28px] md:leading-[115%] md:tracking-[-0.56px]">Featured story</h2>
            <div className="relative w-full md:mt-7 md:w-auto">
              <div ref={featuredRef} onScroll={() => updateProgress(featuredRef, setFeaturedProgress)} className="press-snap-row no-scrollbar -ml-[10px] flex w-[calc(100%+10px)] min-w-0 scroll-pl-[10px] gap-[10px] overflow-x-auto scroll-smooth pb-1 pl-[10px] snap-x snap-mandatory sm:ml-0 sm:w-full sm:scroll-pl-8 sm:pl-8 md:relative md:left-1/2 md:mx-0 md:flex-row md:w-[max(calc(100%_+_160px),100vw)] md:-translate-x-1/2 md:items-center md:gap-[10px] md:overflow-x-auto md:scroll-smooth md:px-0 md:pb-1 md:snap-x md:snap-mandatory md:[scroll-padding-left:max(80px,calc(50vw_-_640px))]">
                <div aria-hidden="true" className="hidden shrink-0 md:block md:w-[max(70px,calc(50vw_-_650px))]" />
                {FEATURED_STORIES.map((story) => (
                  <article key={story.title} className="flex h-[436px] w-[373px] shrink-0 snap-start flex-col items-start gap-3 overflow-hidden rounded-[12px] bg-white p-2 sm:h-[480px] sm:w-[520px] sm:gap-4 sm:p-3 md:h-[303px] md:w-[927px] md:flex-row md:items-start md:gap-[24px] md:rounded-[12px] md:p-[20px]">
                    <div className="relative h-[200px] w-full shrink-0 sm:h-[250px] md:h-[263px] md:w-[443.5px] md:flex-[1_0_0] md:self-stretch md:overflow-hidden md:rounded-[8px] md:p-3">
                      <Image src={story.image} alt="Euler Motors office" fill sizes="(max-width: 767px) 100vw, 444px" className="object-cover" />
                      <span className="absolute left-3 top-3 flex flex-col items-start gap-[7.862px] rounded-[39.312px] bg-white px-[7.862px] py-[3.145px] font-sans text-[12px] font-semibold leading-normal text-black md:h-[27px] md:w-[147px] md:flex-col md:items-start md:justify-center md:gap-[10px] md:px-[10px] md:py-1 md:text-[14px] md:font-bold md:font-sans md:leading-normal md:text-black">{story.source}</span>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col items-start gap-3 self-stretch p-3 md:min-h-[174px] md:min-w-0 md:flex-1 md:items-stretch md:self-stretch md:gap-[6px] md:p-0">
                      <div className="flex flex-col items-start gap-[6px] self-stretch">
                        <h3 className="w-[310.678px] max-w-full font-display text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] md:w-[310.678px] md:max-w-none md:text-[26px] md:leading-[115%] md:tracking-[-0.52px]">{story.title}</h3>
                        <p className="font-sans text-[12px] font-semibold leading-normal text-[rgba(18,18,18,0.60)] md:font-sans md:text-[14px] md:font-bold md:leading-normal md:text-[rgba(18,18,18,0.60)]">{story.date}</p>
                        <p className="line-clamp-3 self-stretch font-sans text-[12px] font-normal leading-[1.4] text-[#121212] md:line-clamp-none md:self-stretch md:text-[16px] md:font-normal md:leading-[1.25] md:text-[#121212]">{story.summary}</p>
                      </div>
                      <div className="mt-auto flex flex-col items-start gap-3 self-stretch p-0 md:mt-[6px] md:flex md:flex-[1_0_0] md:flex-col md:items-start md:justify-end md:gap-3 md:p-0">
                        <a href="#" className="flex h-8 w-fit items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.50)] bg-[#f3f4f5] px-5 font-display text-[12px] font-bold leading-[100%] text-[#121212] hover:bg-[#f3f4f5] md:h-[42px] md:w-[127px] md:items-center md:justify-center md:gap-2 md:rounded-[4px] md:border-[rgba(18,18,18,0.50)] md:bg-[#f3f4f5] md:px-3 md:font-display md:text-[16px] md:font-semibold md:leading-[100%] md:whitespace-nowrap">
                          Read Article <ArrowIcon className="hidden size-3.5 md:block" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-4 hidden justify-center md:mt-8 md:flex"><Progress value={featuredProgress} /></div>
          </div>
          <button type="button" onClick={() => scrollRow(featuredRef, -1, "article")} aria-label="Previous featured story" style={{ background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #212121", top: arrowTops.featured }} className="absolute left-[50px] top-[324px] z-20 hidden size-[55px] items-center justify-center gap-5 rounded-[8px] p-6 md:flex"><StoryArrowIcon direction="left" /></button>
          <button type="button" onClick={() => scrollRow(featuredRef, 1, "article")} aria-label="Next featured story" style={{ background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #212121", top: arrowTops.featured }} className="absolute right-[50px] top-[324px] z-20 hidden size-[55px] items-center justify-center gap-5 rounded-[8px] p-6 md:flex"><StoryArrowIcon direction="right" /></button>
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[-3px] z-10 hidden h-[551px] w-[min(210.811px,15%)] bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] backdrop-blur-[0px] md:block" />
        </section>

        <section className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-12 md:mx-auto md:flex md:w-full md:max-w-none md:flex-col md:items-center md:justify-center md:gap-[42px] md:px-[60px] md:py-[62px]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-6 md:flex md:w-full md:max-w-[1280px] md:flex-col md:items-start md:justify-start md:gap-[26px]">
            <div className="flex flex-col items-start justify-center gap-3 self-stretch md:flex md:flex-col md:items-start md:justify-start md:gap-3">
              <SectionEyebrow readingAccent className="md:font-sans md:text-[14px] md:tracking-[0.7px]">Latest press coverage</SectionEyebrow>
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] md:mt-0 md:max-w-full md:truncate md:text-[52px] md:leading-[115%] md:tracking-[-1.04px]">News &amp; Media Coverage</h2>
            </div>
            <div className="relative w-full">
              <div className="no-scrollbar -mx-5 flex h-8 w-[calc(100%_+_40px)] items-center gap-2 overflow-x-auto px-5 sm:-mx-8 sm:w-[calc(100%_+_64px)] sm:px-8 md:mx-0 md:mt-0 md:w-auto md:flex-wrap md:items-center md:justify-start md:gap-2 md:overflow-visible md:px-0">
              {CATEGORIES.map(({ label, count }) => (
                <button key={label} type="button" onClick={() => { setActiveCategory(label); setPressIndex(0); pressRef.current?.scrollTo({ left: 0 }); }} aria-pressed={activeCategory === label} className={`inline-flex h-8 shrink-0 items-center justify-center gap-[6.4px] rounded-[400px] px-3 font-sans text-[12px] font-semibold leading-[100%] transition-colors sm:h-9 sm:px-4 sm:text-[14px] md:h-auto md:gap-[6.4px] md:rounded-[400px] md:px-4 md:py-[13px] md:font-sans md:text-[16px] md:font-semibold md:leading-[100%] ${activeCategory === label ? "border-[0.4px] border-white text-white" : "bg-[rgba(204,204,204,0.32)] text-[#121212] hover:bg-[rgba(204,204,204,0.45)]"}`} style={activeCategory === label ? { background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #121212" } : undefined}>
                    {label}<span className={`size-1 rounded-full ${activeCategory === label ? "bg-white/70" : "bg-[#858585]"}`} />{count}
                  </button>
                ))}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[-19.994px] z-10 h-[49.664px] w-[54.598px] bg-[linear-gradient(270deg,#FFF_13.62%,rgba(255,255,255,0)_100%)] sm:right-[-31.994px] md:hidden" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1280px] md:w-full md:max-w-[1280px]">
            <p className="mt-4 font-display text-[16px] font-semibold leading-[115%] tracking-[-0.32px] text-[#121212] md:hidden">{visibleArticles.length} recent stories</p>
            <div ref={pressRef} data-press-row onScroll={() => updateProgress(pressRef, setPressProgress)} className="press-snap-row no-scrollbar mt-3 flex flex-col gap-2 overflow-hidden sm:gap-3 md:relative md:left-1/2 md:mt-0 md:w-[max(calc(100%_+_160px),100vw)] md:-translate-x-1/2 md:flex-row md:items-center md:gap-3 md:overflow-x-auto md:scroll-smooth md:[scroll-padding-left:max(80px,calc(50vw_-_640px))]">
              <div aria-hidden="true" className="hidden shrink-0 md:block md:w-[max(68px,calc(50vw_-_652px))]" />
              {visibleArticles.map((article, index) => (
                  <article key={article.id} className={`press-card relative flex h-[174px] w-full shrink-0 flex-col items-start gap-3 self-stretch rounded-[12px] bg-[#f3f4f5] p-3 transition-shadow hover:shadow-md sm:h-[202px] sm:gap-4 sm:p-4 md:h-[173.091px] md:w-[420px] md:items-start md:justify-start md:self-auto md:gap-3 md:rounded-[12px] md:p-4 `}>
                  <span className="flex w-fit flex-col items-start gap-[10px] rounded-[50px] bg-[#d4dbec] px-[10px] py-1 font-sans text-[12px] font-bold leading-[normal] text-black md:h-[24px] md:w-fit md:flex-col md:items-start md:justify-center md:gap-[10px] md:whitespace-nowrap md:rounded-[50px] md:bg-[#D4DBEC] md:px-[10px] md:py-1 md:font-sans md:text-[12px] md:font-bold md:leading-normal md:text-black">{article.source}</span>
                  <a href={article.url} aria-label={`Read ${article.title}`} className="absolute bottom-auto right-6 top-[130.263px] flex size-8 items-center justify-center rounded-[4px] bg-[#121212] text-white hover:bg-[#121212] md:bottom-[16px] md:right-[14px] md:top-auto md:h-[36px] md:w-[36px] md:gap-[11.25px] md:rounded-[4.5px] md:bg-[#121212] md:p-[12.375px_13.5px] md:text-white md:hover:bg-[#121212]"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[14px] shrink-0 md:hidden" aria-hidden="true"><path d="M6.47514 1.75C4.34617 1.75383 3.23133 1.8061 2.51887 2.51856C1.75 3.28743 1.75 4.5249 1.75 6.99985C1.75 9.47479 1.75 10.7123 2.51887 11.4811C3.28773 12.25 4.52521 12.25 7.00015 12.25C9.4751 12.25 10.7126 12.25 11.4814 11.4811C12.1939 10.7687 12.2462 9.65384 12.25 7.52486" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA" /><path d="M11.9823 2.04167L6.41602 7.58333M12.2494 4.66667C12.2494 4.66667 12.2494 3.06552 12.1169 2.31685C12.0978 2.20892 12.0507 2.11499 11.9823 2.04167C11.9059 1.9599 11.803 1.90377 11.6826 1.88245C10.9339 1.74986 9.33269 1.75 9.33269 1.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="hidden size-[18px] shrink-0 aspect-square md:block" aria-hidden="true"><path d="M8.32517 2.25C5.58793 2.25493 4.15457 2.32213 3.23854 3.23815C2.25 4.2267 2.25 5.81773 2.25 8.9998C2.25 12.1819 2.25 13.7729 3.23854 14.7615C4.22708 15.75 5.81812 15.75 9.00018 15.75H9.00019H9.0002C12.1823 15.75 13.7733 15.75 14.7618 14.7615C15.6779 13.8454 15.7451 12.4121 15.75 9.67483" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA" /><path d="M15.4066 2.625L8.25 9.75M15.75 6C15.75 6 15.75 3.94138 15.5797 2.97881C15.5552 2.84004 15.4946 2.71927 15.4066 2.625C15.3085 2.51987 15.1761 2.4477 15.0214 2.4203C14.0588 2.24982 12 2.25 12 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA" /></svg></a>
                  <div className="flex flex-col items-start gap-3 self-stretch">
                  <h3 className="line-clamp-2 self-stretch font-display text-[16px] font-semibold leading-[1.4] text-[#121212] sm:text-[18px] md:mt-0 md:self-stretch md:line-clamp-none md:overflow-hidden md:whitespace-nowrap md:pr-0 md:text-ellipsis md:text-[20px] md:leading-[140%] md:tracking-normal">{article.title}</h3>
                    <p className="font-sans text-[12px] font-medium leading-[100%] text-[rgba(18,18,18,0.60)] md:mt-0 md:font-sans md:text-[12px] md:font-medium md:leading-[100%] md:text-[rgba(18,18,18,0.60)]">{article.date}<span aria-hidden className="mx-1.5 inline-block size-1 aspect-square shrink-0 rounded-[500px] bg-[rgba(18,18,18,0.30)] align-middle" />{article.category}</p>
                  <p className="line-clamp-2 h-[34.926px] w-[279.543px] overflow-hidden text-ellipsis font-sans text-[12px] font-normal leading-[1.4] text-[#121212] sm:h-[39.2px] sm:w-full sm:text-[14px] md:mt-0 md:h-[41.02px] md:w-[347.56px] md:line-clamp-2 md:overflow-hidden md:whitespace-normal md:pr-0 md:text-ellipsis md:font-sans md:text-[14px] md:font-normal md:leading-[140%] md:text-[#121212]">{article.summary}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4 hidden justify-center md:mt-[42px] md:flex"><Progress value={pressProgress} /></div>
            <div data-press-pager className="mt-6 flex items-center justify-center gap-3 md:hidden">
              <button type="button" onClick={() => setPressIndex((page) => Math.max(0, page - 1))} disabled={pressIndex === 0} aria-label="Previous press coverage page" className="flex size-8 items-center justify-center rounded-[4.655px] bg-[#212121] text-white disabled:bg-[#CCCCCC]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="size-3 shrink-0" aria-hidden="true">
                  <path d="M7.5 2.25 3.75 6l3.75 3.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                </svg>
              </button>
              <p className="flex items-baseline justify-center gap-1 text-[#121212]">
                <span className="font-display text-[16px] font-bold leading-[115%] tracking-[-0.32px]">{String(pressIndex + 1).padStart(2, "0")}</span>
                <span className="font-display text-[12px] font-normal leading-[115%] tracking-[-0.24px]">/ {String(pressPageCount).padStart(2, "0")}</span>
              </p>
              <button type="button" onClick={() => setPressIndex((page) => Math.min(pressPageCount - 1, page + 1))} disabled={pressIndex >= pressPageCount - 1} aria-label="Next press coverage page" className="flex size-8 items-center justify-center rounded-[4.655px] bg-[#212121] text-white disabled:bg-[#CCCCCC]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="size-3 shrink-0" aria-hidden="true">
                  <path d="M4.5 2.25 8.25 6l-3.75 3.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <button type="button" onClick={() => scrollRow(pressRef, -1, ".press-card")} aria-label="Previous press coverage" style={{ background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #212121" }} className="absolute left-[50px] top-[324px] z-20 hidden size-[55px] items-center justify-center gap-5 rounded-[8px] p-6 md:flex min-[768px]:max-[1279.98px]:translate-y-[24px]"><StoryArrowIcon direction="left" /></button>
          <button type="button" onClick={() => scrollRow(pressRef, 1, ".press-card")} aria-label="Next press coverage" style={{ background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #212121" }} className="absolute right-[50px] top-[324px] z-20 hidden size-[55px] items-center justify-center gap-5 rounded-[8px] p-6 md:flex min-[768px]:max-[1279.98px]:translate-y-[24px]"><StoryArrowIcon direction="right" /></button>
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[-3px] z-10 hidden h-[551px] w-[min(210.811px,15%)] bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] backdrop-blur-[0px] md:block" />
        </section>

        <section id="media-kit" className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[#f3f4f5] px-5 py-8 sm:gap-8 sm:px-8 sm:py-12 md:h-[502.35px] md:gap-[42px] md:px-[60px] md:pb-[32px] md:pt-[62px]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-center gap-3 max-md:self-stretch md:max-w-[1280px] md:justify-start md:gap-4">
            <SectionEyebrow readingAccent className="max-md:text-[12px] max-md:tracking-[0.6px] md:font-sans md:text-[14px] md:tracking-[0.7px]">Media kit</SectionEyebrow>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] max-md:self-stretch sm:text-[34px] md:text-[52px] md:leading-[115%] md:tracking-[-1.04px]">Everything you need to cover Euler</h2>
            <p className="text-[12px] leading-normal text-[#121212] max-md:self-stretch sm:text-[14px] md:font-sans md:text-[16px] md:font-normal md:leading-normal md:text-[#121212]">Official company information, brand assets and media resources, all in one place.</p>
          </div>
          <div className="mx-auto w-full max-w-[1280px] md:w-full md:max-w-[1280px]">
            <div ref={kitRef} onScroll={() => updateProgress(kitRef, setKitProgress)} className="press-snap-row no-scrollbar -mx-5 mt-0 flex snap-x snap-mandatory flex-col gap-2 overflow-x-auto scroll-smooth px-5 sm:-mx-8 sm:gap-3 sm:px-8 md:relative md:left-1/2 md:mx-0 md:mt-0 md:w-[max(calc(100%_+_160px),100vw)] md:-translate-x-1/2 md:flex-row md:items-center md:gap-3 md:px-0 md:scroll-smooth md:[scroll-padding-left:max(80px,calc(50vw_-_640px))]">
              <div aria-hidden="true" className="hidden shrink-0 md:block md:w-[max(68px,calc(50vw_-_652px))]" />
              {MEDIA_KIT_ITEMS.map((item, index) => (
                <article key={`${item.filename}-${index}`} className="flex h-[156px] w-full max-w-[353px] shrink-0 flex-col items-start justify-center gap-3 self-stretch rounded-[10px] bg-white px-3 py-2 sm:h-[170px] sm:max-w-[560px] sm:gap-4 sm:p-4 md:h-[170px] md:w-[353px] md:max-w-none md:shrink-0 md:self-stretch md:items-start md:gap-3 md:rounded-[12px] md:p-4">
                  <span className="w-fit rounded-full bg-[#e4e8f0] px-2 py-1 text-[9px] font-semibold leading-none text-[#293c60] max-md:flex max-md:flex-col max-md:items-start max-md:gap-[10px] max-md:rounded-[50px] max-md:bg-[#d4dbec] max-md:px-[10px] max-md:py-[4px] max-md:text-[12px] max-md:font-bold max-md:leading-normal max-md:text-[#000] md:h-6 md:items-center md:px-[10px] md:py-1 md:font-sans md:text-[12px] md:font-bold md:text-[#000] md:bg-[#d4dbec]">{item.label}</span>
                  <h3 className="mt-0 h-[48px] line-clamp-2 max-md:self-stretch max-md:font-display text-[16px] font-semibold leading-[1.4] text-[#121212] sm:text-[18px] sm:leading-[1.3] md:mt-0 md:h-[50.4px] md:w-full md:overflow-hidden md:whitespace-normal md:text-ellipsis md:font-display md:text-[18px] md:font-semibold md:leading-[140%] md:text-[#121212]">{item.title}</h3>
                  <div className="mt-2 flex items-center justify-start gap-3 md:mt-auto md:self-stretch md:justify-between md:gap-2 md:pt-3">
                    <span className="inline-flex items-baseline gap-0 font-sans text-[#121212] md:gap-1 md:leading-[100%]">
                      {item.size && <><span className="font-sans text-[20px] font-bold leading-[100%] tracking-[-0.4px] md:text-[20px] md:font-bold md:tracking-[-0.4px]">{item.size.split(" ")[0]}</span><span className="font-sans text-[16px] font-normal leading-[100%] tracking-[-0.32px] md:text-[16px] md:font-normal md:tracking-[-0.32px]">{item.size.split(" ").slice(1).join(" ")}</span></>}
                    </span>
                    <a href={item.filename.includes("@") ? `mailto:${item.filename}` : `mailto:press@eulermotors.com?subject=${encodeURIComponent(`Request ${item.filename}`)}`} className="inline-flex h-8 max-w-none shrink-0 items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.50)] bg-[#f3f4f5] px-5 font-display text-[12px] font-semibold leading-[100%] text-[#121212] hover:bg-[#f3f4f5] md:h-[32px] md:max-w-none md:shrink-0 md:overflow-visible md:gap-2 md:rounded-[4px] md:border md:border-[rgba(18,18,18,0.50)] md:bg-[#f3f4f5] md:px-5 md:font-display md:text-[12px] md:font-semibold md:leading-[100%] md:text-[#121212]">
                      <span>{item.filename}</span>{item.filename.includes("@") ? <EmailIcon /> : <DownloadIcon />}
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4 hidden justify-center md:mt-[42px] md:flex"><Progress value={kitProgress} /></div>
          </div>
          <button type="button" onClick={() => scrollRow(kitRef, -1, "article")} aria-label="Previous media kit items" style={{ background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #212121", top: arrowTops.kit }} className="absolute left-[50px] top-[324px] z-20 hidden size-[55px] items-center justify-center gap-5 rounded-[8px] p-6 md:flex"><StoryArrowIcon direction="left" /></button>
          <button type="button" onClick={() => scrollRow(kitRef, 1, "article")} aria-label="Next media kit items" style={{ background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #212121", top: arrowTops.kit }} className="absolute right-[50px] top-[324px] z-20 hidden size-[55px] items-center justify-center gap-5 rounded-[8px] p-6 md:flex"><StoryArrowIcon direction="right" /></button>
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[-3px] z-10 hidden h-[551px] w-[min(210.811px,15%)] bg-[linear-gradient(270deg,#F3F4F5_0%,rgba(243,244,245,0)_100%)] backdrop-blur-[0px] md:block" />
        </section>

        <section className="mx-auto flex w-full max-w-[393px] p-[10px] flex-col justify-center items-center gap-24 bg-[linear-gradient(0deg,#F3F4F5_0%,#F3F4F5_100%),linear-gradient(180deg,#FFF_18.31%,#D4DBEC_38.3%)] sm:max-w-[560px] sm:gap-8 sm:p-3 lg:flex lg:flex-col lg:items-start lg:justify-start lg:gap-[10px] lg:self-stretch lg:pt-0 lg:px-[80px] lg:pb-8 lg:w-full lg:max-w-none lg:bg-[#f3f4f5]">
          <div className="mx-auto flex h-[288px] w-full max-w-[373px] flex-col items-start gap-[10px] rounded-[12px] bg-[linear-gradient(0deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.40)_100%),linear-gradient(272deg,#0E2F6D_-63.51%,#1D6FFF_87.23%)] px-[19px] py-8 text-white sm:h-[320px] sm:max-w-[520px] sm:px-8 lg:h-[200px] lg:w-full lg:max-w-[1280px] lg:flex-row lg:items-center lg:justify-between lg:gap-[10px] lg:self-stretch lg:rounded-[12px] lg:bg-[linear-gradient(0deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.40)_100%),linear-gradient(272deg,#0E2F6D_-63.51%,#1D6FFF_87.23%)] lg:px-10 lg:py-8">
            <div className="flex w-full flex-col items-center justify-center gap-[14px] self-stretch lg:flex lg:w-[414.434px] lg:shrink-0 lg:flex-col lg:items-start lg:justify-center lg:gap-4 lg:self-auto">
              <h2 className="font-display self-stretch text-center text-[28px] font-semibold leading-normal tracking-[-0.56px] sm:text-[32px] lg:w-[414.434px] lg:text-left lg:text-[32px] lg:font-semibold lg:leading-normal lg:tracking-[-0.64px]">Looking to speak with<br className="hidden md:block" /> Euler Motors?</h2>
              <p className="self-stretch text-center text-[14px] font-sans font-normal leading-normal text-white capitalize sm:text-[16px] md:w-[425.72px] md:text-[16px] md:font-normal md:leading-normal md:text-white md:text-left md:normal-case md:mt-0">For media enquiries, interviews or press requests, our communications team is here to help.</p>
            </div>
            <div className="flex w-full flex-col gap-3 self-stretch lg:ml-auto lg:w-auto lg:flex-row lg:items-center lg:justify-center lg:gap-[14px] lg:self-center">
              <a href="mailto:press@eulermotors.com" className="flex h-[44px] w-full self-stretch items-center justify-center gap-2 rounded-[4px] bg-white px-[20px] font-display text-[12px] font-bold leading-[100%] text-[#0e2f6d] hover:bg-[#e9edf3] sm:h-12 sm:gap-2 sm:px-6 sm:text-[14px] md:h-[50.477px] md:gap-8 md:rounded-[4px] md:px-6 md:text-[16px] md:font-display md:font-semibold md:leading-[100%] md:text-[#0E2F6D] md:w-auto">Contact communications <Arrow color="ink" /></a>
              <div className="flex items-center justify-center gap-2 md:justify-center md:gap-[14px]">
                <a href="mailto:press@eulermotors.com" className="font-display text-[12px] font-semibold leading-[100%] text-white md:text-left md:text-[18px] md:font-display md:font-semibold md:leading-[100%]">press@eulermotors.com</a>
                <button type="button" onClick={() => navigator.clipboard.writeText("press@eulermotors.com")} aria-label="Copy press email" className="inline-flex size-[14px] shrink-0 items-center justify-center md:size-[20.16px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="size-[14px] md:hidden">
                    <path d="M8.75 12.8333H9.33333C10.9832 12.8333 11.8082 12.8333 12.3208 12.3208C12.8333 11.8082 12.8333 10.9832 12.8333 9.33333V8.75C12.8333 7.10008 12.8333 6.27513 12.3208 5.76256C11.8082 5.25 10.9832 5.25 9.33333 5.25L8.75 5.25C7.10008 5.25 6.27513 5.25 5.76256 5.76256C5.25 6.27513 5.25 7.10008 5.25 8.75L5.25 9.33333C5.25 10.9832 5.25 11.8082 5.76256 12.3208C6.27513 12.8333 7.10008 12.8333 8.75 12.8333Z" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA" />
                    <path d="M9.91594 5.25008C9.91458 3.52511 9.88846 2.63162 9.38638 2.01983C9.28942 1.90168 9.18108 1.79335 9.06293 1.69639C8.41756 1.16675 7.45871 1.16675 5.54102 1.16675C3.62332 1.16675 2.66447 1.16675 2.0191 1.69639C1.90095 1.79335 1.79262 1.90168 1.69566 2.01983C1.16602 2.6652 1.16602 3.62405 1.16602 5.54175C1.16602 7.45944 1.16602 8.41829 1.69566 9.06366C1.79262 9.18181 1.90095 9.29014 2.0191 9.3871C2.63089 9.88919 3.52438 9.91531 5.24935 9.91667" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.16" height="20.16" viewBox="0 0 21 21" fill="none" aria-hidden="true" className="hidden size-[20.16px] md:block">
                    <g clipPath="url(#press-email-copy-clip)"><path d="M12.6005 18.48H13.4405C15.8164 18.48 17.0044 18.48 17.7425 17.7419C18.4805 17.0038 18.4805 15.8159 18.4805 13.44V12.6C18.4805 10.2241 18.4805 9.03618 17.7425 8.29809C17.0044 7.56 15.8164 7.56 13.4405 7.56L12.6005 7.56C10.2247 7.56 9.03673 7.56 8.29864 8.29809C7.56055 9.03618 7.56055 10.2241 7.56055 12.6L7.56055 13.44C7.56055 15.8159 7.56055 17.0038 8.29864 17.7419C9.03673 18.48 10.2247 18.48 12.6005 18.48Z" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA"/><path d="M14.2815 7.56C14.2796 5.07604 14.242 3.78942 13.519 2.90844C13.3793 2.73831 13.2233 2.58231 13.0532 2.44269C12.1239 1.68 10.7431 1.68 7.98164 1.68C5.22016 1.68 3.83941 1.68 2.91008 2.44268C2.73995 2.58231 2.58395 2.73831 2.44433 2.90844C1.68164 3.83777 1.68164 5.21852 1.68164 7.98C1.68164 10.7415 1.68164 12.1222 2.44432 13.0516C2.58395 13.2217 2.73995 13.3777 2.91008 13.5173C3.79105 14.2403 5.07768 14.2779 7.56164 14.2799" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" stroke="#FAFAFA"/></g>
                    <defs><clipPath id="press-email-copy-clip"><rect width="20.16" height="20.16" fill="white"/></clipPath></defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return <div aria-hidden className="flex h-5 w-[116.199px] flex-col items-start justify-center gap-[14.4px] rounded-[14.4px] bg-[rgba(204,204,204,0.5)] p-1"><span className="h-full rounded-[23.04px] bg-[#121212] transition-all" style={{ width: `${25 + value * 75}%` }} /></div>;
}

function DownloadIcon() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 aspect-square"><path d="M8.00065 9.66667L8.00065 3M8.00065 9.66667C7.53383 9.66667 6.66167 8.33713 6.33398 8M8.00065 9.66667C8.46747 9.66667 9.33963 8.33713 9.66732 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#121212"/><path d="M2.66602 11C2.66602 12.6547 3.01135 13 4.66602 13H11.3327C12.9873 13 13.3327 12.6547 13.3327 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#121212"/></svg>;
}

function EmailIcon() {
  return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[14px] shrink-0 aspect-square"><path d="M4.08398 4.95825L5.80016 5.97292C6.8007 6.56447 7.20061 6.56447 8.20114 5.97292L9.91732 4.95825" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#121212"/><path d="M5.307 2.06308C6.43895 2.03464 7.55975 2.03464 8.6917 2.06308C10.5283 2.10923 11.4466 2.1323 12.1065 2.79463C12.7663 3.45697 12.7854 4.35108 12.8235 6.13931C12.8357 6.71429 12.8357 7.28588 12.8235 7.86086C12.7854 9.64909 12.7663 10.5432 12.1065 11.2055C11.4466 11.8679 10.5283 11.8909 8.6917 11.9371C7.55975 11.9655 6.43895 11.9655 5.307 11.9371C3.47038 11.8909 2.55206 11.8679 1.89224 11.2055C1.23242 10.5432 1.21335 9.64909 1.17521 7.86086C1.16295 7.28588 1.16295 6.71429 1.17521 6.1393C1.21335 4.35107 1.23241 3.45696 1.89224 2.79463C2.55206 2.13229 3.47037 2.10922 5.307 2.06308Z" strokeWidth="1.5" strokeLinejoin="round" stroke="#121212"/></svg>;
}
