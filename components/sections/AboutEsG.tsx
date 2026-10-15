"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

const TABS = ["Environment", "People", "Governance"] as const;

const STATS = [
  { value: "480M", unit: "km", unitCls: "", label: "driven electric" },
  { value: "1,000+", unit: "", unitCls: "", label: "EVs on road" },
  {
    value: "40",
    unit: "cities",
    unitCls: "tracking-[-0.32px] lg:tracking-[-0.4px]",
    label: "with charging",
  },
];

const CARDS = [
  {
    num: "01",
    title: "Emissions cut at the source",
    body: "Every Euler on a route takes a diesel vehicle off it. Four hundred and eighty million kilometres so far, none of them burning fuel.",
  },
  {
    num: "02",
    title: "A second life for every pack",
    body: "Packs come back to us at the end of their vehicle life. Cells that still hold charge go to stationary storage, the rest go to a licensed recycler.",
  },
  {
    num: "03",
    title: "A plant that uses less to build more",
    body: "Rooftop solar, LED retrofits and a rebuilt compressed-air system cut the energy used for every vehicle we assemble.",
  },
];

/**
 * ESG in action section (desktop Figma 3537:18846 · mobile 2937:15792).
 * "Building a Better Tomorrow" — ESG tab pills (Environment active), the
 * photo card with headline/description and the 480M km · 1,000+ · 40 cities
 * stat row split by hairlines, and the 01/02/03 impact cards (mobile keeps
 * two in a snap row with the pill indicator).
 */
export default function AboutEsG() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Environment");

  return (
    <section className="esg-bg py-[41.85px] lg:py-[62px]" aria-label="ESG in action">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 lg:gap-[42px] lg:px-20">
        {/* Header — mobile stacks · desktop: title left, copy + tabs right
            (the right column centers vertically in the row, Figma 3537:18960) */}
        <div className="flex flex-col gap-[14px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-[14px] lg:w-[636px] lg:gap-[25px]">
            <Eyebrow dark label="Esg in Action" />
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:w-[575.92px] lg:text-[52px] lg:tracking-[-1.04px]">
              Building a Better<br />Tomorrow
            </h2>
          </div>
          <div className="flex flex-col gap-[14px] lg:items-end lg:gap-[31px]">
            <p className="text-[12px] font-normal leading-[normal] text-white lg:w-[531px] lg:text-[16px]">
              See how we&apos;re creating a positive impact through
              sustainability, people and responsible business practices.
            </p>
            <div className="flex w-full gap-3 lg:justify-end lg:gap-4" role="tablist" aria-label="ESG focus areas">
              {TABS.map((t) => {
                const active = t === tab;
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t)}
                    className={`flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-[24.381px] px-[14px] font-display text-[12px] font-semibold leading-none lg:h-[42px] lg:px-6 lg:text-[16px] ${
                      active
                        ? "border-[0.641px] border-[rgba(18,18,18,0.5)] bg-white text-ink"
                        : "border-[0.762px] border-[rgba(255,255,255,0.1)] bg-black text-white backdrop-blur-[7.619px]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Photo + statement/stats */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-[42px]">
          <div className="relative h-[235.284px] w-full shrink-0 overflow-hidden rounded-[12px] lg:h-[384.279px] lg:w-[738.814px]">
            <Image
              src="/assets/about-euler/esg-photo.png"
              alt="Euler electric commercial vehicle on a delivery route"
              fill
              sizes="(min-width: 768px) 739px, 353px"
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-4 lg:h-[334px] lg:justify-between lg:gap-0">
            <div className="flex flex-col gap-2.5">
              <h3 className="font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] text-white lg:text-[32px] lg:tracking-[-0.64px]">
                Every kilometre driven electric is diesel never burned.
              </h3>
              <p className="text-[12px] font-normal leading-[normal] text-white lg:text-[18px]">
                Our vehicles replace diesel on routes that run six days a
                week. The saving turns up in the fuel bill long before it
                turns up in a report.
              </p>
            </div>
            <div className="flex items-center justify-between">
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center self-stretch">
                  {i > 0 && <StatDivider />}
                  <div className="flex flex-col gap-[2px] text-white">
                    <p className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] lg:text-[36px] lg:tracking-[-0.72px]">
                      {s.value}{" "}
                      {s.unit && (
                        <span className={`font-medium text-[16px] leading-[1.15] lg:text-[20px] ${s.unitCls}`}>
                          {s.unit}
                        </span>
                      )}
                    </p>
                    <p className="text-[12px] font-normal leading-[normal] lg:text-[16px]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact cards — desktop row of 3 · mobile snap row of 2 + indicator */}
        <div className="flex flex-col gap-4 lg:gap-0">
          <div className="snap-row -mx-5 gap-2.5 px-5 lg:mx-0 lg:gap-5 lg:items-stretch lg:overflow-visible lg:px-0">
            {CARDS.map((card, i) => (
              <article
                key={card.num}
                className="w-[247px] shrink-0 rounded-[6px] bg-white/8 p-5 lg:flex lg:min-w-px lg:w-auto lg:flex-[1_0_0] lg:items-center lg:p-6"
              >
                <div className="flex flex-col gap-2 lg:min-w-0 lg:flex-1 lg:gap-3">
                  <p className="bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.02)] bg-clip-text text-[24px] font-bold leading-none text-transparent lg:text-[32px]">
                    {card.num}
                  </p>
                  <p
                    className={`text-[16px] font-bold text-white lg:text-[22px] ${
                      i === 2 ? "lg:tracking-[-0.44px]" : ""
                    }`}
                  >
                    {card.title}
                  </p>
                  <p className="text-[12px] font-normal text-white lg:text-[16px]">{card.body}</p>
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

/* 1px white hairline between the stats (Figma Line 107) */
function StatDivider() {
  return (
    <span
      aria-hidden
      className="mr-4 block h-[65px] w-px shrink-0 bg-white opacity-50"
    />
  );
}
