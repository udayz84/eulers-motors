"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

type ChipKind = "plain" | "cropped" | "blurred";
type PartKey = "motor" | "battery" | "charging";

const CHIPS: {
  label: string;
  part: PartKey;
  icon: string;
  kind: ChipKind;
}[] = [
  { label: "Motor", part: "motor", icon: `${A}/kv__imgChatGpt2.png`, kind: "plain" },
  { label: "Battery", part: "battery", icon: `${A}/kv__imgChatGpt3.png`, kind: "cropped" },
  { label: "Charging", part: "charging", icon: `${A}/kv__imgChatGpt4.png`, kind: "blurred" },
  { label: "Motor", part: "motor", icon: `${A}/kv__imgChatGpt2.png`, kind: "plain" },
  { label: "Battery", part: "battery", icon: `${A}/kv__imgChatGpt3.png`, kind: "plain" },
  { label: "Charging", part: "charging", icon: `${A}/kv__imgChatGpt4.png`, kind: "blurred" },
];

const PART_CONTENT: Record<PartKey, { title: string; details: { label: string; body: string; accent?: boolean }[] }> = {
  motor: {
    title: "Full loads, from standstill.",
    details: [
      { label: "WHAT IS IT", body: "A motor that makes its pulling power from zero, with no gearbox." },
      { label: "WHY DOES IT MATTER", body: "City work is stop and start all day, with weight on board." },
      { label: "WHAT IT MEANS FOR YOUR BUSINESS", body: "Up a flyover loaded, without dropping a trip from the route.", accent: true },
    ],
  },
  battery: {
    title: "Full range, even in garmi.",
    details: [
      { label: "WHAT IS IT", body: "The Euler battery is water cooled." },
      { label: "WHY DOES IT MATTER", body: "Batteries lose range above 40 degrees." },
      { label: "WHAT IT MEANS FOR YOUR BUSINESS", body: "It maintains range year-round.", accent: true },
    ],
  },
  charging: {
    title: "Where will I charge?",
    details: [
      { label: "WHAT IS IT", body: "Different businesses have different charging needs." },
      { label: "WHY DOES IT MATTER", body: "Choose the charging setup that works best for your operations." },
      { label: "WHAT IT MEANS FOR YOUR BUSINESS", body: "Find compatible charging stations in the Euler app.", accent: true },
    ],
  },
};

function Chip({ label, icon, active, kind, onSelect }: (typeof CHIPS)[number] & { active: boolean; onSelect: () => void }) {
  if (active) {
    return (
      <button
        type="button"
        aria-pressed="true"
        onClick={onSelect}
        className="flex w-[113px] shrink-0 flex-col items-center justify-center gap-3 rounded-[6px] border border-[#256dec] px-4 py-[6px]"
        style={{
          backgroundImage:
            "linear-gradient(-30.732deg,#0e2f6d 10.379%,#1d6fff 90.974%), linear-gradient(90deg,#121212 0%,#121212 100%)",
        }}
      >
        <img src={icon} alt="" className="size-[52px] shrink-0 object-contain" />
        <p className="w-full text-center text-[12px] font-bold leading-normal text-white">{label}</p>
      </button>
    );
  }

  const cell =
    "relative w-[113px] shrink-0 rounded-[6px] border border-[rgba(204,204,204,0.12)] bg-[#121212] px-4 opacity-80";

  const glow = (
    /* soft glow behind the icon (Figma Ellipse 3429) */
    <div className="pointer-events-none absolute left-[33.77px] top-[31.44px] h-[31.73px] w-[25.076px]">
      <div className="absolute inset-[-137.09%_-173.47%]">
        <img src={`${A}/kv__imgEllipse3429.svg`} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );

  if (kind === "cropped") {
    return (
      <button type="button" aria-pressed="false" onClick={onSelect} className={`${cell} flex flex-col items-center justify-between pb-1.5 pt-3`}>
        {glow}
        <div className="relative h-[46.886px] w-[71.23px] shrink-0 overflow-hidden opacity-50">
          <img src={icon} alt="" className="absolute left-[0.63%] top-0 h-full w-[98.73%] max-w-none" />
        </div>
        <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
      </button>
    );
  }

  if (kind === "blurred") {
    return (
      <button type="button" aria-pressed="false" onClick={onSelect} className={`${cell} flex flex-col items-center justify-end gap-3 overflow-clip py-1.5`}>
        {glow}
        <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
        <div className="absolute left-[26.46px] top-[14.51px] flex h-[87.57px] w-[72.857px] items-center justify-center">
          <div className="flex-none rotate-[-19.47deg]">
            <div className="relative h-[74.926px] w-[50.783px] overflow-hidden opacity-70">
              <img src={icon} alt="" className="absolute left-0 top-[-6.78%] h-[108.02%] w-full max-w-none object-contain" />
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button type="button" aria-pressed="false" onClick={onSelect} className={`${cell} flex flex-col items-center gap-3 py-1.5`}>
      {glow}
      <div className="relative size-[52px] shrink-0 opacity-50">
        <img src={icon} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
    </button>
  );
}

/** TECHNOLOGY page — "The parts / Know Your Vehicle Better" (Figma 3006:10290, 393×743). */
export default function TechKnowVehicle() {
  const [selectedChip, setSelectedChip] = useState(0);
  const selectedPart = PART_CONTENT[CHIPS[selectedChip].part];

  return (
    <section className="relative overflow-clip bg-[#041231]" aria-label="Know your vehicle better">
      <div className="relative mx-auto h-[743px] w-full max-w-[480px] overflow-clip md:hidden">
        <div className="absolute left-[19.49px] right-[20.51px] top-[42.06px] flex flex-col items-start gap-[14px]">
          <Eyebrow label="The parts" dark />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
            Know Your Vehicle Better
          </h2>
          <p className="w-full max-w-[320px] font-sans text-[12px] font-normal leading-normal text-white">
            Understand what each key part does and how it helps you on every trip.
          </p>
        </div>

        {/* vehicle diagram + motor leader line */}
        <div className="absolute left-[66.34px] top-[158.08px] h-[187.669px] w-[306.156px] mix-blend-lighten">
          <img src={`${A}/kv__imgChatGpt1.png`} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 91.376 142.44, rgba(4,18,49,0) 0%, rgba(4,18,49,1) 95.733%)",
              opacity: 0.2,
            }}
          />
        </div>
        <p className="absolute left-[46.35px] top-[220.06px] -translate-x-1/2 whitespace-nowrap text-center text-[12px] font-bold leading-normal text-white">
          Motor
        </p>
        <div className="absolute left-[46.35px] top-[237.64px] h-[60.066px] w-[91.288px]">
          <img src={`${A}/kv__imgVector174.svg`} alt="" className="absolute inset-0 size-full max-w-none" />
        </div>

        {/* part chips — Motor active (row scrolls horizontally) */}
        <div className="no-scrollbar absolute left-0 top-[335.06px] flex w-full items-stretch gap-2 overflow-x-auto pl-[19.99px] pr-5">
          {CHIPS.map((chip, i) => (
            <Chip key={`${chip.label}-${i}`} {...chip} active={selectedChip === i} onSelect={() => setSelectedChip(i)} />
          ))}
        </div>

        {/* part detail */}
        <div className="absolute left-4 right-4 top-[441.06px] mx-auto max-w-[353px] rounded-[8px] border border-[rgba(204,204,204,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.2)_41.677%,rgba(0,0,0,0.2)_100%)] p-3">
          <div className="flex flex-col items-start gap-5">
            <p className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] text-white">{selectedPart.title}</p>
            <div className="flex w-full flex-col items-start gap-1.5">
              {selectedPart.details.map((d) => (
                <div key={d.label} className="flex w-full flex-col items-start gap-2 rounded-[8px] bg-black p-3">
                  <p
                    className="text-[12px] font-bold leading-[1.15] tracking-[-0.24px]"
                    style={{ color: d.accent ? "#1d6fff" : "#ccc" }}
                  >
                    {d.label}
                  </p>
                  <p className="w-full text-[12px] leading-[1.4] tracking-[-0.24px] text-[#ccc] opacity-80">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop & Tablet view */}
      <div className="relative mx-auto hidden min-h-[644px] w-full max-w-[1440px] flex-col gap-8 px-6 py-10 text-white md:flex md:px-10 lg:gap-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-start gap-3 md:gap-4">
          <Eyebrow label="The parts" dark />
          <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white md:text-[38px] md:tracking-[-0.76px] lg:text-[42px] lg:tracking-[-0.84px]">
            Know Your Vehicle Better
          </h2>
          <p className="max-w-[600px] font-sans text-[14px] leading-normal text-white/90 md:text-[15px] lg:text-[16px]">
            Understand what each key part does and how it helps you on every trip.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Left Column: Vehicle Graphic with Leader Line */}
          <div className="relative flex h-[320px] w-full max-w-[540px] shrink-0 items-center justify-center md:h-[350px] lg:h-[400px]">
            <div className="relative h-full w-full mix-blend-lighten">
              <img src={`${A}/kv__imgChatGpt1.png`} alt="Euler electric vehicle with motor highlighted" className="size-full object-contain" />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 29.85% 75.96%, rgba(4,18,49,0) 0%, #041231 95.733%), linear-gradient(90deg, rgba(4,18,49,0.2), rgba(4,18,49,0.2))",
                  opacity: 0.2,
                }}
              />
            </div>
            <div className="absolute left-[15%] top-[25%] flex flex-col items-center">
              <p className="whitespace-nowrap font-sans text-[16px] font-bold leading-normal md:text-[18px] lg:text-[20px]">Motor</p>
              <div className="h-[90px] w-[80px] md:h-[120px] md:w-[100px] lg:h-[140px] lg:w-[120px]">
                <img src={`${A}/kv__imgVector174.svg`} alt="" className="size-full object-contain" />
              </div>
            </div>
          </div>

          {/* Right Column: Chips + Details Card */}
          <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
            <div className="no-scrollbar flex w-full items-center gap-2.5 overflow-x-auto pb-1">
              {CHIPS.map((chip, i) => (
                <DesktopChip key={`${chip.label}-${i}`} {...chip} active={selectedChip === i} onSelect={() => setSelectedChip(i)} />
              ))}
            </div>

            <div className="w-full rounded-lg border border-[rgba(204,204,204,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.2)_41.677%,rgba(0,0,0,0.2)_100%)] p-4 md:p-5 lg:p-6">
              <div className="flex flex-col items-start gap-4 md:gap-5">
                <h3 className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] md:text-[20px]">{selectedPart.title}</h3>
                <div className="flex w-full flex-col items-start gap-2">
                  {selectedPart.details.map((detail) => (
                    <div key={detail.label} className="flex w-full flex-col items-start gap-1.5 rounded-lg bg-black p-3 md:p-3.5">
                      <p className="whitespace-nowrap font-sans text-[15px] font-bold leading-[1.15] tracking-[-0.3px] md:text-[16px]" style={{ color: detail.accent ? "#1d6fff" : "#ccc" }}>{detail.label}</p>
                      <p className="w-full font-sans text-[14px] leading-[1.4] tracking-[-0.28px] text-[#ccc] opacity-80 md:text-[15px]">{detail.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopChip({ label, icon, active, kind, onSelect }: (typeof CHIPS)[number] & { active: boolean; onSelect: () => void }) {
  const glow = (
    <div aria-hidden="true" className="pointer-events-none absolute left-[40.52px] top-[37.73px] h-[38.076px] w-[30.091px]">
      <div className="absolute inset-[-137.09%_-173.47%]">
        <img src={`${A}/kv__imgEllipse3429.svg`} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );

  if (active) {
    return (
      <button type="button" aria-pressed="true" onClick={onSelect} className="flex w-[135.6px] shrink-0 flex-col items-center justify-center gap-[14.4px] rounded-[7.2px] border-[1.2px] border-[#256dec] px-[19.2px] py-[7.2px]" style={{ backgroundImage: "linear-gradient(-31.352deg,#0e2f6d 10.379%,#1d6fff 90.974%),linear-gradient(90deg,#121212 0%,#121212 100%)" }}>
        <img src={icon} alt="" className="size-[62.4px] shrink-0 object-contain" />
        <p className="w-full text-center font-sans text-[16px] font-bold leading-normal">{label}</p>
      </button>
    );
  }

  if (kind === "cropped") {
    return (
      <button type="button" aria-pressed="false" onClick={onSelect} className="relative flex h-[109.6px] w-[135.6px] shrink-0 flex-col items-center justify-between overflow-clip rounded-[7.2px] border-[1.2px] border-[rgba(204,204,204,0.12)] bg-[#121212] px-[19.2px] pb-[7.2px] pt-[14.4px] opacity-80">
        {glow}
        <img src={icon} alt="" className="relative h-[56.263px] w-[85.476px] shrink-0 object-cover opacity-50" />
        <p className="relative w-full text-center font-sans text-[16px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
      </button>
    );
  }

  if (kind === "blurred") {
    return (
      <button type="button" aria-pressed="false" onClick={onSelect} className="relative flex h-[109.6px] w-[135.6px] shrink-0 flex-col items-center justify-end gap-[14.4px] overflow-clip rounded-[7.2px] border-[1.2px] border-[rgba(204,204,204,0.12)] bg-[#121212] px-[19.2px] py-[7.2px] opacity-80">
        {glow}
        <p className="relative w-full text-center font-sans text-[16px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
        <div className="absolute left-[31.75px] top-[17.41px] flex h-[105.084px] w-[87.429px] items-center justify-center">
          <div className="flex-none rotate-[-19.47deg]">
            <div className="relative h-[89.912px] w-[60.94px] overflow-hidden opacity-70">
              <img src={icon} alt="" className="absolute left-0 top-[-6.78%] h-[108.02%] w-full max-w-none object-contain" />
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button type="button" aria-pressed="false" onClick={onSelect} className="relative flex w-[135.6px] shrink-0 flex-col items-center gap-[14.4px] rounded-[7.2px] border-[1.2px] border-[rgba(204,204,204,0.12)] bg-[#121212] px-[19.2px] py-[7.2px] opacity-80">
      {glow}
      <img src={icon} alt="" className="relative size-[62.4px] shrink-0 object-cover opacity-50" />
      <p className="relative w-full text-center font-sans text-[16px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
    </button>
  );
}
