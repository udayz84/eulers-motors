"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const categories = [
  { label: "All", count: "78" },
  { label: "General", count: "7" },
  { label: "Vehicles", count: "8" },
  { label: "Charging", count: "8" },
  { label: "Service", count: "47" },
  { label: "Warranty", count: "8" },
];

const questions = [
  { question: "How long does it take to fully charge an EV?", categories: ["General", "Charging"] },
  { question: "What types of charging stations are available?", categories: ["Charging"] },
  { question: "Can I charge my EV at home?", categories: ["General", "Charging"] },
  { question: "How much does it cost to charge an electric vehicle?", categories: ["General", "Charging"] },
  { question: "How do I find nearby charging stations?", categories: ["Charging"] },
  { question: "Is it safe to charge in the rain?", categories: ["General", "Charging"] },
];

const answer =
  "There are three main types: Level 1 (standard household outlet), Level 2 (dedicated home or public charger), and DC fast charging (rapid public stations).";

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
  const [openQuestion, setOpenQuestion] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const visibleQuestions = selectedCategory === "All"
    ? questions
    : questions.filter(({ categories: questionCategories }) => questionCategories.includes(selectedCategory));

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setOpenQuestion(-1);
    if (listRef.current) listRef.current.scrollTop = 0;
  }

  return (
    <section
      aria-labelledby="charging-faq-title"
      className="mx-auto flex h-[702px] w-full max-w-[1440px] items-end justify-between bg-white px-20 py-[62px] max-[767px]:h-auto max-[767px]:items-stretch max-[767px]:px-6 max-[767px]:py-10"
    >
      <div className="flex h-[578px] w-full items-stretch gap-[41px] max-[767px]:h-auto max-[767px]:flex-col max-[767px]:gap-8">
        <div className="flex min-w-0 flex-[1_0_0] flex-col items-start gap-5 self-stretch">
          <div className="flex w-full flex-col items-start">
            <FaqBadge />
            <div className="mt-4 flex flex-col gap-4 text-[#121212]">
              <h2
                id="charging-faq-title"
                className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] max-[767px]:text-[32px] max-[767px]:tracking-[-0.64px]"
              >
                Frequently asked questions
              </h2>
              <p className="max-w-[474px] font-sans text-[16px] leading-normal">
                Find answers to the most common questions about our vehicles,
                charging, service, warranty and more.
              </p>
            </div>
          </div>

          <div className="relative w-full">
            <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-1" aria-label="FAQ categories">
              {categories.map((category) => {
                const selected = selectedCategory === category.label;
                return (
                  <button
                    key={category.label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectCategory(category.label)}
                    style={selected ? {
                      background: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #121212",
                    } : undefined}
                    className={`flex shrink-0 items-center gap-[6px] rounded-[400px] border-[0.4px] border-solid border-white px-2 py-2 ${
                      selected
                        ? "text-white"
                        : "bg-[rgba(204,204,204,0.32)] text-[#121212]"
                    }`}
                  >
                    <span className="font-sans text-[16px] font-semibold leading-none">
                      {category.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-[3px] w-[3px] rounded-full ${selected ? "bg-white/50" : "bg-black/50"}`}
                    />
                    <span className="font-sans text-[14px] font-normal leading-none">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-px -top-4 z-10 h-[75px] w-[50px] bg-gradient-to-l from-white to-white/0"
            />
          </div>

          <div
            role="img"
            aria-label="A customer using a laptop"
            className="h-[351.64453px] w-[587px] flex-none self-stretch rounded-[20.655px] bg-[lightgray] max-[767px]:h-auto max-[767px]:w-full max-[767px]:max-w-full max-[767px]:aspect-[587/351.64453]"
            style={{
              backgroundImage: "url('/assets/charging-station-faq/location-map.png')",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
          </div>
        </div>

        <div className="flex h-full w-[652px] shrink-0 self-stretch items-stretch gap-3 max-[767px]:h-[540px] max-[767px]:w-full">
          <div
            ref={listRef}
            className="no-scrollbar flex h-full min-h-0 flex-1 flex-col gap-4 overflow-y-auto"
            aria-label="Frequently asked questions"
          >
            {visibleQuestions.map(({ question }, index) => {
              const expanded = openQuestion === index;
              const icon = expanded ? "icon-minus.svg" : "icon-plus.svg";

              return (
                <article
                  key={question}
                  className={`shrink-0 overflow-hidden rounded-2xl bg-[#f3f4f5] p-5 ${
                    expanded ? "flex flex-col gap-6" : "flex min-h-[68px] items-center"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpenQuestion(expanded ? -1 : index)}
                    className="flex w-full items-center gap-6 text-left"
                  >
                    <span className="min-w-0 flex-1 font-sans text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-[#121212]">
                      {question}
                    </span>
                    <Image
                      src={`/assets/charging-station-faq/${icon}`}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0 drop-shadow-[0px_1px_1px_rgba(18,18,18,0.24)]"
                    />
                  </button>
                  {expanded && (
                    <p className="font-sans text-[16px] leading-[1.4] text-[rgba(18,18,18,0.8)]">
                      {answer}
                    </p>
                  )}
                </article>
              );
            })}
            {visibleQuestions.length === 0 && (
              <p className="rounded-2xl bg-[#f3f4f5] p-5 font-sans text-[16px] leading-normal text-[#121212]" role="status">
                No questions in this category yet.
              </p>
            )}
          </div>

          <div className="flex w-4 shrink-0 flex-col items-center py-[2px]">
            <button
              type="button"
              aria-label="Scroll FAQ list up"
              onClick={() => listRef.current?.scrollBy({ top: -150, behavior: "smooth" })}
              className="flex h-[6px] w-[14px] items-center justify-center"
            >
              <span className="relative block h-[6px] w-[14px] shrink-0">
                <Image
                  src="/assets/charging-station-faq/scroll-up.svg"
                  alt=""
                  width={16}
                  height={7}
                  className="absolute left-[-0.75px] top-[-0.37px] max-w-none"
                />
              </span>
            </button>
            <div className="relative my-3 w-4 flex-1 overflow-hidden rounded-[2px] bg-[#f3f4f5]">
              <div className="absolute left-0 top-[17px] h-[99px] w-4 rounded-[2px] bg-[#112750]" />
            </div>
            <button
              type="button"
              aria-label="Scroll FAQ list down"
              onClick={() => listRef.current?.scrollBy({ top: 150, behavior: "smooth" })}
              className="flex h-[6px] w-[14px] items-center justify-center"
            >
              <span className="relative block h-[6px] w-[14px] shrink-0">
                <Image
                  src="/assets/charging-station-faq/scroll-down.svg"
                  alt=""
                  width={16}
                  height={7}
                  className="absolute left-[-0.75px] top-[-0.37px] max-w-none rotate-180"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
