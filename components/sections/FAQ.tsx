"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = [
  { name: "All", count: 78 },
  { name: "General", count: 7 },
  { name: "Vehicles", count: 8 },
  { name: "Charging", count: 8 },
  { name: "Service", count: 6 },
  { name: "Warranty", count: 5 },
];

const FAQS = [
  {
    question: "How long does it take to fully charge an EV?",
    answer: "",
  },
  {
    question: "What types of charging stations are available?",
    answer: "There are three main types: Level 1 (standard household outlet), Level 2 (dedicated home or public charger), and DC fast charging (rapid public stations).",
  },
  {
    question: "Can I charge my EV at home?",
    answer: "",
  },
  {
    question: "How much does it cost to charge an electric vehicle?",
    answer: "",
  },
  {
    question: "How do I find nearby charging stations?",
    answer: "",
  },
  {
    question: "Is it safe to charge in the rain?",
    answer: "",
  },
];

/**
 * FAQ section (Figma desktop: 3538:20662, mobile: 2937:16193).
 * Frequently asked questions with category filters.
 */
export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section className="bg-white relative overflow-hidden" aria-label="FAQ">
      {/* Mobile Layout */}
      <div className="flex sm:hidden mx-auto" style={{ width: "393px", padding: "32px 20px", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div className="flex flex-col gap-[14px] items-start justify-center relative shrink-0 w-[353px]">
          <div className="flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/about-euler/faq-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute h-[16px] left-0 top-0 w-[116.978px] overflow-hidden">
              <Image
                src="/assets/about-euler/faq-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
              FAQ
            </p>
          </div>
          <p className="font-display text-[28px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.56px]">
            Frequently asked questions
          </p>
          <p className="font-sans font-normal leading-normal relative shrink-0 text-[#121212] text-[12px]">
            Find answers to the most common questions about our vehicles, charging, service, warranty and more.
          </p>
          <div className="flex gap-[8px] h-[32px] items-center relative shrink-0 w-full overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isActive = cat.name === activeCategory;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex gap-[6.4px] items-center justify-center px-[12px] relative rounded-[400px] shrink-0 ${
                    isActive
                      ? "border-[0.4px] border-solid border-white"
                      : "bg-[rgba(204,204,204,0.32)]"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundImage:
                            "linear-gradient(246.81105819928138deg, rgb(14, 47, 109) 138.16%, rgb(29, 111, 255) 87.019%), linear-gradient(90deg, rgb(18, 18, 18) 0%, rgb(18, 18, 18) 100%)",
                        }
                      : undefined
                  }
                >
                  <p className={`font-sans leading-none relative shrink-0 whitespace-nowrap ${isActive ? "font-semibold text-[12px] text-white" : "font-semibold text-[12px] text-[#121212]"}`}>
                    {cat.name}
                  </p>
                  <div className={`relative rounded-[393.12px] shrink-0 size-[3.145px] ${isActive ? "bg-[rgba(255,255,255,0.5)]" : "bg-[rgba(0,0,0,0.5)]"}`} />
                  <p className={`font-sans leading-none relative shrink-0 whitespace-nowrap ${isActive ? "font-normal text-[10px] text-white" : "font-normal text-[10px] text-[#121212]"}`}>
                    {cat.count}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="absolute h-[49.664px] right-[-19.99px] top-[145.71px] w-[54.598px]" style={{ backgroundImage: "linear-gradient(-89.9999956537512deg, rgb(255, 255, 255) 13.618%, rgba(255, 255, 255, 0) 100%)" }} />
        </div>
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-[373px]">
          {FAQS.filter((_, index) => index !== 1).map((faq, index) => {
            const originalIndex = index === 0 ? 0 : index + 1;
            return (
              <div
                key={originalIndex}
                className={`bg-[#f3f4f5] overflow-clip px-[12px] relative rounded-[16px] shrink-0 w-full ${
                  expandedId === originalIndex ? "flex flex-col gap-[10px] items-center justify-center py-[21px]" : "flex gap-[10px] items-center justify-center py-[21px]"
                }`}
              >
                <div className="relative shrink-0 w-full">
                  <button
                    onClick={() => setExpandedId(expandedId === originalIndex ? null : originalIndex)}
                    className="flex items-start justify-center relative w-full"
                  >
                    <p className="flex-[1_0_0] font-sans font-semibold leading-[1.4] min-w-px relative text-[#121212] text-[16px] tracking-[-0.32px] text-left">
                      {faq.question}
                    </p>
                    <div className="relative shrink-0 size-[24px]">
                      <Image
                        src={expandedId === originalIndex ? "/assets/about-euler/faq-icon-minus.svg" : "/assets/about-euler/faq-icon-plus.svg"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                </div>
                {expandedId === originalIndex && faq.answer && (
                  <p className="font-sans font-normal leading-[1.4] relative shrink-0 text-[12px] text-[rgba(18,18,18,0.8)] w-full text-left">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex mx-auto" style={{ width: "1440px", padding: "62px 80px", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
        <div className="flex items-center gap-[41px]" style={{ alignSelf: "stretch" }}>
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <div className="flex flex-[1_0_0] flex-col gap-[20px] h-full items-start min-w-px relative">
              <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-[414.434px]">
                <div className="flex gap-[6px] items-center relative shrink-0">
                  <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                    <Image
                      src="/assets/about-euler/faq-desktop-rect-1.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                    <Image
                      src="/assets/about-euler/faq-desktop-rect-2.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
                    FAQ
                  </p>
                </div>
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 text-[#121212]">
                  <p className="font-display text-[42px] font-semibold leading-[1.15] not-italic relative shrink-0 tracking-[-0.84px] w-[646.448px]">
                    Frequently asked questions
                  </p>
                  <p className="font-sans font-normal leading-normal relative shrink-0 text-[16px] w-[474.189px]">
                    Find answers to the most common questions about our vehicles, charging, service, warranty and more.
                  </p>
                </div>
              </div>
              <div className="flex gap-[8px] items-center overflow-clip relative shrink-0 w-full">
                {CATEGORIES.map((cat) => {
                  const isActive = cat.name === activeCategory;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex gap-[6.4px] items-center justify-center px-[16px] py-[13px] relative rounded-[400px] shrink-0 ${
                        isActive
                          ? "border-[0.4px] border-solid border-white"
                          : "bg-[rgba(204,204,204,0.32)]"
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundImage:
                                "linear-gradient(247.68105717249472deg, rgb(14, 47, 109) 138.16%, rgb(29, 111, 255) 87.019%), linear-gradient(90deg, rgb(18, 18, 18) 0%, rgb(18, 18, 18) 100%)",
                            }
                          : undefined
                      }
                    >
                      <p className={`font-sans leading-none relative shrink-0 whitespace-nowrap ${isActive ? "font-semibold text-[16px] text-white" : "font-semibold text-[16px] text-[#121212]"}`}>
                        {cat.name}
                      </p>
                      <div className={`relative rounded-[393.12px] shrink-0 size-[3.145px] ${isActive ? "bg-[rgba(255,255,255,0.5)]" : "bg-[rgba(0,0,0,0.5)]"}`} />
                      <p className={`font-sans leading-none relative shrink-0 whitespace-nowrap ${isActive ? "font-normal text-[14px] text-white" : "font-normal text-[14px] text-[#121212]"}`}>
                        {cat.count}
                      </p>
                    </button>
                  );
                })}
              </div>
              <div className="flex-[1_0_0] min-h-px relative rounded-[20.655px] w-full">
                <Image
                  src="/assets/about-euler/faq-desktop-image.png"
                  alt=""
                  fill
                  className="object-cover rounded-[20.655px]"
                />
              </div>
              <div className="absolute bg-gradient-to-l from-white h-[74.957px] right-0 to-[rgba(255,255,255,0)] top-[147.88px] w-[49.257px]" />
            </div>
          </div>
          <div className="flex gap-[12px] items-center relative shrink-0">
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-[624px]">
              {FAQS.filter((_, index) => index !== 0).map((faq, index) => {
                const originalIndex = index + 1;
                return (
                  <div
                    key={originalIndex}
                    className={`bg-[#f3f4f5] overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full ${
                      expandedId === originalIndex ? "flex flex-col gap-[16px]" : "flex gap-[24px] items-center justify-center"
                    }`}
                  >
                    <div className="relative shrink-0 w-full">
                      <button
                        onClick={() => setExpandedId(expandedId === originalIndex ? null : originalIndex)}
                        className="flex items-start justify-center relative w-full"
                      >
                        <p className="flex-[1_0_0] font-sans font-semibold leading-[1.4] min-w-px relative text-[#121212] text-[20px] tracking-[-0.4px] text-left">
                          {faq.question}
                        </p>
                        <div className="relative shrink-0 size-[36px]">
                          <Image
                            src={expandedId === originalIndex ? "/assets/about-euler/faq-desktop-icon-minus.svg" : "/assets/about-euler/faq-desktop-icon-plus.svg"}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      </button>
                    </div>
                    {expandedId === originalIndex && faq.answer && (
                      <p className="font-sans font-normal leading-[1.4] relative shrink-0 text-[16px] text-[rgba(18,18,18,0.8)] w-full text-left">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
