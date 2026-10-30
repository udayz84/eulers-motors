"use client";

import { useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/charging-station-faq";

const CATEGORIES = [
  { label: "All", count: "78" },
  { label: "General", count: "7" },
  { label: "Vehicles", count: "8" },
  { label: "Charging", count: "8" },
  { label: "Service", count: "47" },
  { label: "Warranty", count: "8" },
];

const QUESTIONS: {
  question: string;
  answer: string;
  categories: string[];
  size?: number;
}[] = [
  {
    question: "How long does it take to fully charge an EV?",
    answer:
      "Charging time varies by battery capacity and charger type. Using a DC fast charger, you can reach 80% charge in about 30 to 45 minutes, while standard AC charging takes 4 to 6 hours.",
    categories: ["General", "Charging"],
  },
  {
    question: "What types of charging stations are available?",
    answer:
      "There are three main types: Level 1 (standard household outlet), Level 2 (dedicated home or public charger), and DC fast charging (rapid public stations).",
    categories: ["Charging"],
  },
  {
    question: "Can I charge my EV at home?",
    answer:
      "Yes, you can charge your EV at home using a standard 15A wall socket or with an installed dedicated Level 2 wall-box charger for faster overnight charging.",
    categories: ["General", "Charging"],
  },
  {
    question: "How much does it cost to charge an electric vehicle?",
    answer:
      "Charging costs depend on local electricity tariffs. On average, commercial EV charging costs between ₹1.2 to ₹1.8 per kilometer, which is significantly lower than petrol or diesel.",
    categories: ["General", "Charging"],
  },
  {
    question: "How do I find nearby charging stations?",
    answer:
      "You can locate nearby compatible charging stations directly in the Euler mobile app with real-time station availability, navigation directions, and socket types.",
    categories: ["Charging"],
  },
  {
    question: "Is it safe to charge in the rain?",
    answer:
      "Yes, it is completely safe. EV charging plugs and vehicle inlets are weatherproof (rated IP65/IP67) with built-in safety interlocks that prevent power flow until a secure seal is confirmed.",
    categories: ["General", "Charging"],
    size: 20,
  },
];

/** TECHNOLOGY page — "FAQ / Frequently asked questions" (Figma 3014:11664, 393×821). */
export default function TechFaq() {
  const [selected, setSelected] = useState("All");
  const [open, setOpen] = useState<number | null>(1);
  const desktopListRef = useRef<HTMLDivElement>(null);
  const [desktopThumbTop, setDesktopThumbTop] = useState(0);

  const visible =
    selected === "All"
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.categories.includes(selected));

  function selectCategory(label: string) {
    setSelected(label);
    setOpen(null);
  }

  return (
    <section className="overflow-x-clip bg-white" aria-label="Frequently asked questions">
      <div className="relative mx-auto flex w-full max-w-[480px] flex-col items-center gap-5 px-5 py-8 md:hidden">
        <div className="relative flex w-full flex-col items-start gap-[14px]">
          <Eyebrow label="FAQ" />
          <h2
            id="tech-faq-title"
            className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink"
          >
            Frequently asked questions
          </h2>
          <p className="w-full font-sans text-[12px] font-normal leading-normal text-ink">
            Find answers to the most common questions about our vehicles, charging, service, warranty
            and more.
          </p>

          {/* categories — horizontally scrollable */}
          <div className="relative w-full">
            <div className="no-scrollbar flex h-8 w-full items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((category) => {
                const isSelected = selected === category.label;
                return (
                  <button
                    key={category.label}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectCategory(category.label)}
                    style={
                      isSelected
                        ? {
                            backgroundImage:
                              "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%)",
                            backgroundColor: "#121212",
                          }
                        : undefined
                    }
                    className={`flex h-8 shrink-0 items-center gap-[6.4px] rounded-[400px] px-3 ${
                      isSelected
                        ? "border-[0.4px] border-solid border-white text-white"
                        : "bg-[rgba(204,204,204,0.32)] text-ink"
                    }`}
                  >
                    <span className="whitespace-nowrap text-[12px] font-semibold leading-none">
                      {category.label}
                    </span>
                    <span
                      aria-hidden
                      className={`size-[3.145px] shrink-0 rounded-full ${
                        isSelected ? "bg-white/50" : "bg-black/50"
                      }`}
                    />
                    <span className="whitespace-nowrap text-[10px] font-normal leading-none">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* right-edge fade (Figma 3014:11697) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-[-20px] w-[54.6px]"
              style={{
                backgroundImage:
                  "linear-gradient(-89.9999956537512deg, rgb(255,255,255) 13.618%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>
        </div>

        {/* FAQ list */}
        <div className="flex w-full flex-col gap-[10px]">
          {visible.map((faq, index) => {
            const expanded = open === index;
            return (
              <article
                key={faq.question}
                className="w-full overflow-clip rounded-[16px] bg-[#f3f4f5] px-3 py-[21px]"
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex w-full items-center gap-[10px] text-left"
                >
                  <span
                    className={`min-w-px flex-1 font-sans font-semibold leading-[1.4] text-ink ${
                      faq.size === 20 ? "text-[20px] tracking-[-0.4px]" : "text-[16px] tracking-[-0.32px]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span className="relative flex size-6 shrink-0 items-center justify-center">
                    <img
                      src={`${A}/icon-plus.svg`}
                      alt=""
                      className={`absolute size-6 select-none transition-all duration-300 ${
                        expanded ? "opacity-0 rotate-90 scale-75 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                      }`}
                    />
                    <img
                      src={`${A}/icon-minus.svg`}
                      alt=""
                      className={`absolute size-6 select-none transition-all duration-300 ${
                        expanded ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                      }`}
                    />
                  </span>
                </button>
                <div className="accordion-grid" data-open={expanded}>
                  <div className="accordion-inner">
                    <p className="pt-[10px] w-full font-sans text-[12px] font-normal leading-[1.4] text-[rgba(18,18,18,0.8)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Desktop & Tablet FAQ panel */}
      <div className="mx-auto hidden min-h-[640px] w-full max-w-[1440px] px-6 py-10 md:flex md:px-10 lg:min-h-[702px] lg:px-[80px] lg:py-[62px]">
        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-start md:gap-8 lg:items-center lg:gap-[41px]">
          <div className="flex h-auto w-full flex-col gap-4 md:h-[578px] md:w-[45%] md:gap-5 lg:flex-1">
            <div className="flex w-full flex-col items-start gap-3 md:gap-4">
              <Eyebrow label="FAQ" />
              <div className="flex flex-col items-start gap-3 text-ink md:gap-4">
                <h2 className="text-[clamp(26px,3vw,42px)] font-display font-semibold leading-[1.15] tracking-[-0.84px]">
                  Frequently asked questions
                </h2>
                <p className="max-w-[474px] font-sans text-[14px] leading-normal md:text-[15px] lg:text-[16px]">
                  Find answers to the most common questions about our vehicles, charging, service, warranty and more.
                </p>
              </div>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto" aria-label="FAQ categories">
                {CATEGORIES.map((category) => {
                  const isSelected = selected === category.label;
                  return (
                    <button
                      key={category.label}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelected(category.label);
                        setOpen(null);
                      }}
                      className={`flex shrink-0 items-center justify-center gap-[6.4px] rounded-full border-[0.4px] border-solid px-3.5 py-2.5 md:px-4 md:py-[13px] ${
                        isSelected
                          ? "border-white bg-gradient-to-br from-[#1d6fff] to-[#0e2f6d] text-white"
                          : "border-transparent bg-[rgba(204,204,204,0.32)] text-ink"
                      }`}
                    >
                      <span className="whitespace-nowrap text-[14px] font-semibold leading-none md:text-[16px]">{category.label}</span>
                      <span aria-hidden className={`size-[3.145px] shrink-0 rounded-full ${isSelected ? "bg-white/50" : "bg-black/50"}`} />
                      <span className="whitespace-nowrap text-[12px] leading-none md:text-[14px]">{category.count}</span>
                    </button>
                  );
                })}
              </div>
              <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[49px] bg-gradient-to-l from-white to-transparent" />
            </div>

            <div className="min-h-0 w-full flex-1 overflow-hidden rounded-[16px] md:rounded-[20px]">
              <img
                src="/assets/charging-station-faq/location-map.png"
                alt="Customer support team member helping with a vehicle question"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex h-auto w-full flex-col items-stretch gap-3 md:h-[578px] md:w-[55%] lg:w-[min(652px,48%)]">
            <div
              ref={desktopListRef}
              onScroll={(event) => {
                const list = event.currentTarget;
                const maxScroll = list.scrollHeight - list.clientHeight;
                setDesktopThumbTop(maxScroll > 0 ? (list.scrollTop / maxScroll) * 421 : 0);
              }}
              className="no-scrollbar flex h-full w-[calc(100%-28px)] flex-col gap-4 overflow-y-auto"
              aria-label="Frequently asked questions"
            >
              {visible.map((faq, index) => {
                const expanded = open === index;
                return (
                  <article key={faq.question} className="shrink-0 overflow-hidden rounded-[16px] bg-[#f3f4f5] p-5">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : index)}
                      className="flex w-full items-center justify-between gap-6 text-left"
                    >
                      <span className="min-w-0 flex-1 text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-ink">{faq.question}</span>
                      <span className="relative flex size-6 shrink-0 items-center justify-center">
                        <img
                          src={`${A}/icon-plus.svg`}
                          alt=""
                          className={`absolute size-6 select-none transition-all duration-300 ${
                            expanded ? "opacity-0 rotate-90 scale-75 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                          }`}
                        />
                        <img
                          src={`${A}/icon-minus.svg`}
                          alt=""
                          className={`absolute size-6 select-none transition-all duration-300 ${
                            expanded ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                          }`}
                        />
                      </span>
                    </button>
                    <div className="accordion-grid" data-open={expanded}>
                      <div className="accordion-inner">
                        <p className="pt-5 text-[16px] leading-[1.4] text-black/80">{faq.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex w-4 shrink-0 flex-col items-center justify-between py-0.5">
              <button type="button" aria-label="Scroll FAQ list up" onClick={() => desktopListRef.current?.scrollBy({ top: -100, behavior: "smooth" })}>
                <img src={`${A}/scroll-up.svg`} alt="" className="h-[6px] w-[14px]" />
              </button>
              <div className="relative my-2 w-4 flex-1 overflow-hidden rounded-[2px] bg-[#f3f4f5]">
                <div className="absolute left-0 top-0 h-[99px] w-4 rounded-[2px] bg-[#112750] transition-transform" style={{ transform: `translateY(${desktopThumbTop}px)` }} />
              </div>
              <button type="button" aria-label="Scroll FAQ list down" onClick={() => desktopListRef.current?.scrollBy({ top: 100, behavior: "smooth" })}>
                <img src={`${A}/scroll-down.svg`} alt="" className="h-[6px] w-[14px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
