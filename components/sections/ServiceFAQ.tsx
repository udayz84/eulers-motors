"use client";

import { useState } from "react";

export default function ServiceFAQ() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", count: 78 },
    { name: "General", count: 7 },
    { name: "Vehicles", count: 8 },
    { name: "Charging", count: 8 },
    { name: "Service", count: 0 },
    { name: "Warranty", count: 0 },
  ];

  return (
    <section className="relative isolate mx-auto flex w-full flex-col items-start bg-white px-5 py-10 sm:px-8 lg:w-[1440px] lg:max-w-full lg:px-20 lg:py-[62px]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-8 lg:gap-10">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex w-full flex-col gap-4 lg:w-[414.434px] lg:shrink-0">
            <div className="relative flex h-4 items-center gap-1.5 pl-1 lg:h-[20.355px] lg:gap-1.5">
              <div className="absolute left-1 top-0 h-4 w-[148.821px] lg:h-[20.355px] lg:w-[148.821px]">
                <div className="h-full w-full bg-gradient-to-r from-[#0e2f6d] to-[#1d6fff]" />
              </div>
              <div className="relative h-4 w-[18.821px] lg:h-[20.355px] lg:w-[18.821px]">
                <div className="h-full w-full bg-[#0e2f6d]" />
              </div>
              <span className="relative font-sans text-xs font-bold uppercase tracking-[0.7px] text-[#0e2f6d] lg:text-sm">
                FAQ
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] lg:max-w-[646px] lg:text-[42px] lg:tracking-[-0.84px]">
                Frequently asked questions
              </h2>
              <p className="font-sans text-xs leading-normal text-[#121212] lg:max-w-[474px] lg:text-base">
                Find answers to the most common questions about our vehicles, charging, service, warranty and more.
              </p>
            </div>
          </div>

          <div className="flex w-full gap-2 overflow-x-auto lg:w-auto lg:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-3 font-sans text-sm lg:px-4 lg:py-3 ${
                  activeCategory === cat.name
                    ? "border-[0.4px] border-solid border-white bg-[#121212] text-white"
                    : "bg-[rgba(204,204,204,0.32)] text-[#121212]"
                }`}
              >
                <span className="font-semibold">{cat.name}</span>
                <div className={`h-0.5 w-0.5 rounded-full ${activeCategory === cat.name ? "bg-white/50" : "bg-black/50"}`} />
                <span className="text-xs lg:text-xs">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-3">
          <div className="flex w-full flex-col gap-4 lg:w-[624px] lg:shrink-0">
            <div className="flex h-16 items-center justify-between gap-4 overflow-hidden rounded-[16px] bg-[#f3f4f5] p-5 lg:h-20 lg:gap-6 lg:p-5">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-base font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:text-lg">
                  What is the warranty period for Euler vehicles?
                </h3>
                <p className="font-sans text-xs leading-normal text-[#5c6675] lg:text-sm">
                  Learn about our comprehensive warranty coverage...
                </p>
              </div>
              <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#121212] lg:size-10">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                  <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex h-16 items-center justify-between gap-4 overflow-hidden rounded-[16px] bg-[#f3f4f5] p-5 lg:h-20 lg:gap-6 lg:p-5">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-base font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:text-lg">
                  How often should I service my Euler vehicle?
                </h3>
                <p className="font-sans text-xs leading-normal text-[#5c6675] lg:text-sm">
                  Recommended service intervals and maintenance...
                </p>
              </div>
              <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#121212] lg:size-10">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                  <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex h-16 items-center justify-between gap-4 overflow-hidden rounded-[16px] bg-[#f3f4f5] p-5 lg:h-20 lg:gap-6 lg:p-5">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-base font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:text-lg">
                  What parts are covered under warranty?
                </h3>
                <p className="font-sans text-xs leading-normal text-[#5c6675] lg:text-sm">
                  Detailed breakdown of warranty-covered components...
                </p>
              </div>
              <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#121212] lg:size-10">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                  <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative h-[400px] w-full overflow-hidden rounded-[20.655px] lg:h-[400px]">
              <div className="absolute inset-0 bg-[#e9edf3]" />
              <div className="absolute right-0 top-[147.88px] h-[74.957px] w-[49.257px] bg-gradient-to-l from-white to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
