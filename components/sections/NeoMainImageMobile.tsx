"use client";

import Image from "next/image";
import { useState } from "react";

const A = "/assets/neo/main-image/";

const VEHICLES = {
  HiRANGE: {
    chip: "HiRANGE PLUS",
    specs: [
      ["200 km", "on one charge"],
      ["261 km", "Certified Range"],
      ["D+3", "Seating"],
      ["60 Km/h", "Top Speed"],
      ["3.5 Hrs", "Top Speed"],
      ["5 Yrs", "Vehicle Warranty"],
    ],
    description:
      "Built for inter-city delivery, logistics, and heavy payloads. Extra cabin safety and dual fast charging support.",
  },
  HiCITY: {
    chip: "HiCITY PLUS",
    specs: [
      ["170 km", "on one charge"],
      ["177 km", "Certified Range"],
      ["D+3", "Seating"],
      ["55 Km/h", "Top Speed"],
      ["3.5 Hrs", "Full Charge"],
      ["5 Yrs", "Vehicle Warranty"],
    ],
    description:
      "Made for the city. Compact, agile and built for everyday delivery routes with low running costs.",
  },
} as const;

type Vehicle = keyof typeof VEHICLES;

function Arrow() {
  return <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-[2px] bg-[#121212] text-[17px]">››</span>;
}

export default function NeoMainImageMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [proofVisible, setProofVisible] = useState(true);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [vehicle, setVehicle] = useState<Vehicle>("HiRANGE");
  const detail = VEHICLES[vehicle];

  return (
    <section
      aria-label="NEO by Euler — More trips, less kharcha"
      className="relative isolate h-[1701px] w-full overflow-hidden bg-black text-white"
      data-node-id="4064:15781"
    >
      {/* The top navigation floats over the hero art in the mobile Figma frame. */}
      <div className="sticky top-0 z-50 -mb-[60px]">
        {announcementVisible && <div className="flex h-6 items-center justify-between bg-[#121212] px-5 text-[10px] font-bold text-white">
          <span>Euler - Explore our electric 4 wheeler range</span>
          <button type="button" aria-label="Close announcement" onClick={() => setAnnouncementVisible(false)} className="grid size-3 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[11px] leading-none text-white">×</button>
        </div>}
        <header className="flex h-[36px] items-center justify-between border-b border-white/30 bg-black/20 py-[2px] pl-5 pr-[2px] backdrop-blur-[15px]">
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="grid size-[18px] place-items-center text-[18px] leading-none text-white">☰</button>
          <a href="#top" aria-label="NEO by Euler home" className="relative h-[31.4px] w-[112.3px] shrink-0 overflow-hidden">
            <Image src={`${A}mobile-nav-logo.png`} alt="NEO by Euler" width={1} height={1} sizes="112px" className="absolute max-w-none object-fill" style={{ left: 0, top: "-268.34%", width: "100%", height: "637.58%" }} />
          </a>
          <a href="#contact" className="flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-gradient-to-r from-[#00ff87] to-[#1d6fff] py-[2px] pl-3 pr-[2px] font-display text-[12px] font-semibold leading-none text-white no-underline">
            Book a Test Drive <Arrow />
          </a>
          {menuOpen && (
            <nav className="absolute left-0 right-0 top-full grid gap-3 bg-[#101719] p-5 text-sm text-white shadow-xl">
              <a href="#vehicles" onClick={() => setMenuOpen(false)}>Vehicles</a>
              <a href="#technology" onClick={() => setMenuOpen(false)}>Technology</a>
              <a href="#prime" onClick={() => setMenuOpen(false)}>Euler Prime</a>
              <a href="#insights" onClick={() => setMenuOpen(false)}>Insights</a>
            </nav>
          )}
        </header>
      </div>

      {/* Figma's mobile background uses the source photo with the same crop and scrim as desktop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={`${A}mobile-hero.png`}
          alt=""
          width={1}
          height={1}
          priority
          sizes="100vw"
          className="absolute max-w-none object-fill"
          style={{ left: "-79.26%", top: "-5.71%", height: "44.8%", width: "258.52%" }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 36.212%, #000 46.277%, rgba(0,0,0,.75) 70.986%, #fff 100%)" }} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -left-[442.2px] top-[437.49px] h-[460.837px] w-[1119.366px] bg-black/40 blur-[102.15px]" />

      <div className="absolute left-5 right-5 top-[415.83px] flex flex-col items-start gap-3">
        <div className="flex w-full items-end justify-between">
          <div className="flex shrink-0 items-center gap-[6px]">
            <Image src={`${A}logo.svg`} alt="" width={14} height={14} />
            <p className="font-sans text-[12px] leading-normal">NEO BY EULER</p>
          </div>
          {proofVisible && (
            <aside className="relative flex shrink-0 flex-col gap-[6px] rounded-lg bg-black/40 px-1 pb-1 pt-[6px] backdrop-blur-[38.85px]">
              <p className="px-[6px] font-sans text-[12px] font-medium leading-normal">Built after talking to</p>
              <div className="rounded-[6px] bg-black/20 p-3 backdrop-blur-[101px]">
                <p className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-.64px]">10,000+</p>
                <p className="font-sans text-[12px] font-semibold leading-normal">auto drivers.</p>
              </div>
              <button type="button" onClick={() => setProofVisible(false)} aria-label="Dismiss" className="absolute -right-[9px] -top-[10px] grid size-[22px] place-items-center rounded-full bg-white text-[11px] text-black">×</button>
            </aside>
          )}
        </div>
        <div className="h-px w-full bg-white/40" />
        <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-.64px]">
          More trips.<br />Less kharcha.
        </h1>
        <div className="flex w-full items-start gap-3">
          <p className="min-w-0 flex-1 font-sans text-[12px] leading-normal">
            200+ km on one charge. Charge it at home on a normal 16-amp plug full in about 3.5 hours.
          </p>
          <a href="#vehicles" className="flex h-9 shrink-0 items-center justify-center rounded-[4px] border border-white/50 bg-white/[.08] px-4 font-display text-[12px] font-semibold leading-none text-white no-underline">Explore Vehicles</a>
        </div>
      </div>

      {/* Four specifications: exact mobile frame position and two by two layout. */}
      <div className="absolute left-1/2 top-[719.33px] flex w-[calc(100vw_-_40px)] max-w-[351.6px] -translate-x-1/2 flex-col items-center gap-4 overflow-hidden rounded-[10px] bg-black/[.42] p-5 backdrop-blur-[38.85px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[120px] top-1/2 h-[172px] w-[182px] -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_0_25px_#ffffff08,0_0_0_55px_#ffffff06]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-[129px] top-1/2 h-[172px] w-[182px] -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_0_25px_#ffffff08,0_0_0_55px_#ffffff06]" />
        <div className="relative grid w-full grid-cols-2 items-center gap-5">
          <Stat value="200+" unit="Km" label="RealRange™" />
          <Stat value="3.5" unit="Hrs" label="0 to full charge" />
          <span aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white/40" />
        </div>
        <div aria-hidden="true" className="relative h-px w-full bg-white/40" />
        <div className="relative grid w-full grid-cols-2 items-center gap-5">
          <Stat value="5" unit="Yrs" label="Vehicle warranty" />
          <Stat value="D+3" label="Seating" />
          <span aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white/40" />
        </div>
      </div>

      {/* Vehicle card: 373 × 774 Figma slot, fluidly reduced on narrower phones. */}
      <div id="vehicles" className="absolute left-1/2 top-[926.67px] h-[774px] w-[calc(100vw_-_20px)] max-w-[373px] -translate-x-1/2 overflow-hidden rounded-[12px]">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[12px] bg-white">
          <Image src={`${A}mobile-showcase-bg.png`} alt="" width={1} height={1} sizes="373px" className="absolute max-w-none object-cover" style={{ left: "-57.48%", top: "-7.26%", width: "214.96%", height: "107.25%" }} />
          <div className="absolute inset-0 bg-black/[.12]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-5 left-0 h-[794px] w-full overflow-hidden">
          <Image src={`${A}mobile-showcase-layer-1.png`} alt="" width={1} height={1} sizes="373px" className="absolute max-w-none object-fill" style={{ left: "-53.87%", top: "-7.42%", width: "207.74%", height: "107.38%" }} />
          <div className="absolute inset-0 bg-black/[.32]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-[19.67px] left-0 h-[762px] w-full overflow-hidden">
          <Image src={`${A}mobile-showcase-layer-2.png`} alt="" width={1} height={1} sizes="373px" className="absolute max-w-none object-fill" style={{ left: "-57.48%", top: "-7.42%", width: "214.96%", height: "107.39%" }} />
        </div>

        <div className="absolute left-5 right-0 top-[20.33px] flex flex-col items-start gap-3">
          <div className="flex items-center gap-[6px]">
            <Image src={`${A}logo.svg`} alt="" width={14} height={14} />
            <span className="font-sans text-[12px] leading-normal">OUR VEHICLES</span>
          </div>
          <h2 className="whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-.56px]">Meet the Neo family.</h2>
          <div role="tablist" aria-label="Neo model" className="flex h-[42px] items-center rounded-[4px] bg-black/[.12] p-1">
            {(["HiRANGE", "HiCITY"] as const).map((key) => (
              <button key={key} type="button" role="tab" aria-selected={vehicle === key} onClick={() => setVehicle(key)} className={`flex h-9 items-center justify-center rounded-[2px] px-5 font-display text-[12px] font-semibold leading-none ${vehicle === key ? "bg-white text-[#121212]" : "text-white"}`}>
                Neo {key}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute left-[10px] right-[10px] top-[363.33px] flex flex-col gap-3">
          <div className="rounded-[4px] bg-black/[.42] p-3 backdrop-blur-[38.85px]">
            <div className="relative flex flex-col gap-[10px] py-3">
              <span className="absolute right-0 top-0 flex h-8 items-center gap-3 rounded-[4px] bg-[#f3f4f5] px-3 py-[6px] font-sans text-[12px] font-semibold leading-[1.15] tracking-[-.24px] text-[#121212]">{detail.chip}<span className="text-[9px]">⌄</span></span>
              <h3 className="font-display text-[18px] font-semibold leading-[1.15] tracking-[-.36px]">Neo {vehicle}</h3>
              <p className="w-full pr-1 font-sans text-[12px] leading-normal">{detail.description}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-[4px] bg-black/20 p-[14px] backdrop-blur-[101px]">
              {[0, 1, 2].map((row) => (
                <div key={row} className={`grid grid-cols-2 items-start gap-3 ${row > 0 ? "border-t border-white/40 pt-3" : ""}`}>
                  {detail.specs.slice(row * 2, row * 2 + 2).map(([value, label], index) => (
                    <div key={label} className={`flex h-[50px] flex-col gap-[4.8px] whitespace-nowrap ${index === 1 ? "border-l border-white/40 pl-2" : ""}`}>
                      <span className="font-display text-[24px] leading-[1.15] tracking-[-.48px]">{value}</span>
                      <span className="font-sans text-[12px] leading-normal">{label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full gap-2">
            <a href={`/products/${vehicle === "HiRANGE" ? "neo-hirange" : "neo-hicity"}`} className="flex h-9 min-w-0 flex-1 items-center justify-between rounded-[4px] bg-gradient-to-r from-[#00ff87] to-[#1d6fff] py-[2px] pl-[23px] pr-[2px] font-display text-[12px] font-semibold leading-none text-white no-underline">View Details<Arrow /></a>
            <a href="/products" className="flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-[4px] border border-white/50 bg-white/[.08] px-3 font-display text-[12px] font-semibold leading-none text-white no-underline">Compare Vehicles<span aria-hidden="true">↔</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center">
      <p className="whitespace-nowrap font-display text-[28px] font-medium leading-[1.15] tracking-[-.56px]">
        {value}{unit && <span className="ml-1 text-[16px] tracking-normal">{unit}</span>}
      </p>
      <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-normal text-white/80">{label}</p>
    </div>
  );
}
