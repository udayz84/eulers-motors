"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const categories = [
  { label: "All", count: "78" },
  { label: "General", count: "7" },
  { label: "Vehicles", count: "8" },
  { label: "Charging", count: "8" },
  { label: "Service", count: "47" },
  { label: "Warranty", count: "8" },
];

const questions = [
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
  },
];

function FaqBadge() {
  return (
    <div className="relative flex h-[20.355px] items-center gap-[6px]">
      <Image
        src="/assets/charging-station-faq/badge-underline.svg"
        alt=""
        width={146}
        height={20}
        className="absolute left-[4.63px] top-0 h-[20.355px] w-[146.405px]"
      />
      <span className="relative h-[20.355px] w-[18.821px] shrink-0">
        <Image
          src="/assets/charging-station-faq/badge-mark.svg"
          alt=""
          width={18.2171}
          height={20.3555}
          className="absolute inset-y-0 left-[3.21%] h-[20.355px] w-[18.217px]"
        />
      </span>
      <span className="relative font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-[#0e2f6d]">
        FAQ
      </span>
    </div>
  );
}

export default function ChargingStationFaq() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openQuestion, setOpenQuestion] = useState<number | null>(1);
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Custom scrollbar states
  const [thumbHeight, setThumbHeight] = useState(80);
  const [thumbTop, setThumbTop] = useState(0);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const visibleQuestions =
    selectedCategory === "All"
      ? questions
      : questions.filter(({ categories: questionCategories }) =>
          questionCategories.includes(selectedCategory)
        );

  const updateScrollbar = useCallback(() => {
    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;

    const { scrollTop, scrollHeight, clientHeight } = list;
    const trackHeight = track.clientHeight;
    if (trackHeight <= 0) return;

    const maxScroll = scrollHeight - clientHeight;
    setCanScrollUp(scrollTop > 2);
    setCanScrollDown(scrollTop < maxScroll - 2);

    const computedThumbHeight = Math.min(60, trackHeight);
    setThumbHeight(computedThumbHeight);

    if (maxScroll <= 0) {
      setThumbTop(0);
      return;
    }

    const maxThumbTop = trackHeight - computedThumbHeight;
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    setThumbTop(scrollFraction * maxThumbTop);
  }, []);

  // Update on mount, resize, category switch, and accordion toggle
  useEffect(() => {
    updateScrollbar();

    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;

    const observer = new ResizeObserver(() => {
      updateScrollbar();
    });

    observer.observe(list);
    observer.observe(track);
    Array.from(list.children).forEach((child) => observer.observe(child));

    const handleWindowResize = () => updateScrollbar();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [updateScrollbar, openQuestion, selectedCategory]);

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setOpenQuestion(null);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }

  // One arrow press = one question-sized step (thumb slides a little each time)
  const getScrollStep = () => {
    const list = listRef.current;
    if (!list) return 0;
    const maxScroll = list.scrollHeight - list.clientHeight;
    if (maxScroll <= 0) return 0;
    return maxScroll / Math.max(1, visibleQuestions.length);
  };

  const handleScrollUp = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({ top: -getScrollStep(), behavior: "smooth" });
  };

  const handleScrollDown = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({ top: getScrollStep(), behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="charging-faq-title"
      className="mx-auto w-full max-w-[1440px] bg-white px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-12 lg:py-[62px] xl:px-20"
    >
      <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8 xl:gap-[41px]">
        {/* Left Column: Heading, Categories & Map */}
        <div className="flex flex-1 min-w-0 w-full flex-col items-start gap-5 lg:max-w-[587px] self-stretch">
          <div className="flex w-full flex-col items-start">
            <FaqBadge />
            <div className="mt-4 flex flex-col gap-3 text-[#121212] sm:gap-4">
              <h2
                id="charging-faq-title"
                className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] sm:text-[34px] sm:tracking-[-0.68px] lg:text-[40px] lg:tracking-[-0.8px] xl:text-[42px] xl:tracking-[-0.84px]"
              >
                Frequently asked questions
              </h2>
              <p className="max-w-[474px] font-sans text-[14px] leading-normal sm:text-[15px] lg:text-[16px] text-[#121212]/80">
                Find answers to the most common questions about our vehicles,
                charging, service, warranty and more.
              </p>
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="relative w-full overflow-hidden">
            <div
              className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-1 pr-14"
              aria-label="FAQ categories"
            >
              {categories.map((category) => {
                const selected = selectedCategory === category.label;
                return (
                  <button
                    key={category.label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectCategory(category.label)}
                    style={
                      selected
                        ? {
                            backgroundImage:
                              "linear-gradient(258deg, rgb(14, 47, 109) -138.16%, rgb(29, 111, 255) 87.02%), linear-gradient(258deg, rgb(14, 47, 109) -138.16%, rgb(29, 111, 255) 87.02%), linear-gradient(0deg, rgb(18, 18, 18) 0%, rgb(18, 18, 18) 100%)",
                          }
                        : undefined
                    }
                    className={`flex shrink-0 items-center gap-[6.4px] rounded-[400px] border-[0.4px] border-solid border-white px-3.5 py-2.5 sm:px-4 sm:py-[11px] cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                      selected
                        ? "text-white"
                        : "bg-[rgba(204,204,204,0.32)] text-[#121212]"
                    }`}
                  >
                    <span className="font-sans text-[14px] sm:text-[16px] font-semibold leading-none">
                      {category.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`size-[3.15px] rounded-full shrink-0 ${
                        selected ? "bg-white/50" : "bg-black/50"
                      }`}
                    />
                    <span className="font-sans text-[12px] sm:text-[14px] font-normal leading-none">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Whitish gradient overlay on the right side - matches Figma node 3354:19947 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 inset-y-0 z-10 w-[56px] sm:w-[70px]"
              style={{
                background:
                  "linear-gradient(270deg, #FFFFFF 15%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%)",
              }}
            />
          </div>

          {/* Map Image (Desktop & Tablet) */}
          <div
            role="img"
            aria-label="Euler charging station location network map"
            className="w-full flex-none self-stretch rounded-[20px] bg-[lightgray] aspect-[587/351] max-h-[352px] lg:aspect-auto lg:h-[351.64px]"
            style={{
              backgroundImage: "url('/assets/charging-station-faq/location-map.png')",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Right Column: FAQ List & Custom Responsive Scrollbar */}
        <div className="flex flex-1 min-w-0 w-full self-stretch items-stretch gap-2.5 sm:gap-3.5 lg:max-w-[652px]">
          {/* Scrollable FAQ List */}
          <div
            ref={listRef}
            onScroll={updateScrollbar}
            className="no-scrollbar flex h-[440px] sm:h-[500px] lg:h-[578px] min-h-0 flex-1 flex-col gap-3 sm:gap-4 overflow-y-auto"
            aria-label="Frequently asked questions"
          >
            {visibleQuestions.map((faq, index) => {
              const expanded = openQuestion === index;
              const icon = expanded ? "icon-minus.svg" : "icon-plus.svg";

              return (
                <article
                  key={index}
                  className={`shrink-0 overflow-hidden rounded-2xl bg-[#f3f4f5] p-4 sm:p-5 transition-all ${
                    expanded ? "flex flex-col gap-4 sm:gap-5" : "flex min-h-[64px] sm:min-h-[68px] items-center"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpenQuestion(expanded ? null : index)}
                    className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="min-w-0 flex-1 font-sans text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-[#121212]">
                      {faq.question}
                    </span>
                    <Image
                      src={`/assets/charging-station-faq/${icon}`}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0 transition-transform duration-200"
                    />
                  </button>
                  {expanded && (
                    <p className="font-sans text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] text-[rgba(18,18,18,0.8)] border-t border-black/5 pt-3">
                      {faq.answer}
                    </p>
                  )}
                </article>
              );
            })}
            {visibleQuestions.length === 0 && (
              <p
                className="rounded-2xl bg-[#f3f4f5] p-5 font-sans text-[15px] leading-normal text-[#121212]"
                role="status"
              >
                No questions found in this category.
              </p>
            )}
          </div>

          {/* Custom Interactive Scrollbar Track & Chevrons */}
          <div className="hidden w-3.5 sm:flex sm:w-4 shrink-0 flex-col items-center py-1 select-none">
            {/* Scroll Up Button */}
            <button
              type="button"
              aria-label="Scroll FAQ list up"
              disabled={!canScrollUp}
              onClick={handleScrollUp}
              className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[#121212] transition-all hover:bg-black/5 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Image
                src="/assets/charging-station-faq/scroll-up.svg"
                alt=""
                width={14}
                height={7}
                className="h-[6px] w-[13px] opacity-80 hover:opacity-100"
              />
            </button>

            {/* Scroll Track */}
            <div
              ref={trackRef}
              className="relative my-2 sm:my-2.5 w-3.5 sm:w-4 flex-1 rounded-[8px] bg-[#f3f4f5]"
            >
              {/* Thumb (position follows the list scroll) */}
              <div
                style={{
                  height: `${thumbHeight}px`,
                  transform: `translateY(${thumbTop}px)`,
                }}
                className="absolute left-0 top-0 w-full rounded-[8px] bg-[#0e2f6d] shadow-sm transition-[height] duration-150"
              />
            </div>

            {/* Scroll Down Button */}
            <button
              type="button"
              aria-label="Scroll FAQ list down"
              disabled={!canScrollDown}
              onClick={handleScrollDown}
              className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[#121212] transition-all hover:bg-black/5 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Image
                src="/assets/charging-station-faq/scroll-down.svg"
                alt=""
                width={14}
                height={7}
                className="h-[6px] w-[13px] rotate-180 opacity-80 hover:opacity-100"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

