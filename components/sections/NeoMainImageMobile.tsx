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
  return (
    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-[1.684px] bg-[#121212]">
      <span className="relative h-[11.789px] w-[18.526px] shrink-0">
        <span className="absolute inset-[-16.41%_-1.68%_-22.88%_-3.41%]">
          <Image src={`${A}arrow.svg`} alt="" width={23} height={20} className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
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
      className="relative isolate h-[1701px] w-full overflow-hidden bg-black text-white min-[768px]:max-[1023px]:h-[1550px]"
      data-node-id="4064:15781"
    >
      {/* The top navigation floats over the hero art in the mobile Figma frame. */}
      <div className="sticky top-0 z-50 -mb-[60px]">
        {announcementVisible && <div className="flex h-6 shrink-0 items-center justify-between self-stretch bg-[#121212] px-5 py-1 font-sans text-[10px] font-[700] not-italic leading-normal text-white min-[768px]:max-[1023px]:h-[30px] min-[768px]:max-[1023px]:px-8 min-[768px]:max-[1023px]:text-[12px]">
          <span>Euler - Explore our electric 4 wheeler range</span>
          <button type="button" aria-label="Close announcement" onClick={() => setAnnouncementVisible(false)} className="grid size-[9px] shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" className="block size-[9px]">
              <path d="M0.75 0.75L7.75 7.75M7.75 0.75L0.75 7.75" strokeWidth="1.5" strokeLinecap="round" stroke="white" />
            </svg>
          </button>
        </div>}
        <header className="flex h-[41px] items-center justify-between border-b border-white/30 bg-black/20 py-[2px] pl-5 pr-[2px] backdrop-blur-[15px] min-[768px]:max-[1023px]:h-[64px] min-[768px]:max-[1023px]:pl-8 min-[768px]:max-[1023px]:pr-8">
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="grid size-[18px] place-items-center text-[18px] leading-none text-white min-[768px]:max-[1023px]:size-6 min-[768px]:max-[1023px]:text-[24px]">☰</button>
          <a href="#top" aria-label="NEO by Euler home" className="relative h-[31.4px] w-[112.3px] shrink-0 overflow-hidden min-[768px]:max-[1023px]:h-[42px] min-[768px]:max-[1023px]:w-[150px]">
            <Image src={`${A}mobile-nav-logo.png`} alt="NEO by Euler" width={1} height={1} sizes="112px" className="absolute max-w-none object-fill" style={{ left: 0, top: "-268.34%", width: "100%", height: "637.58%" }} />
          </a>
          <a href="#contact" className="flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-gradient-to-r from-[#00ff87] to-[#1d6fff] py-[2px] pl-3 pr-[2px] font-display text-[12px] font-semibold leading-none text-white no-underline min-[768px]:max-[1023px]:h-[42px] min-[768px]:max-[1023px]:gap-3 min-[768px]:max-[1023px]:pl-4 min-[768px]:max-[1023px]:text-[14px]">
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

      <div className="absolute left-5 right-5 top-[415.83px] flex flex-col items-start gap-3 min-[768px]:max-[1023px]:left-8 min-[768px]:max-[1023px]:right-8 min-[768px]:max-[1023px]:top-[240px] min-[768px]:max-[1023px]:gap-4">
        <div className="flex w-full items-end justify-between">
          <div className="flex shrink-0 items-center gap-[6px]">
            <Image src={`${A}logo.svg`} alt="" width={14} height={14} />
            <p className="font-sans text-[12px] leading-normal">NEO BY EULER</p>
          </div>
          {proofVisible && (
            <aside className="relative flex h-[117px] w-[147px] shrink-0 flex-col items-start gap-[6px] rounded-[8px] bg-[rgba(0,0,0,0.42)] px-1 pb-1 pt-[6px] backdrop-blur-[38.85px]">
              <p className="flex self-stretch items-center gap-[10px] px-[6px] font-sans text-[12px] font-medium not-italic leading-normal text-white">Built after talking to</p>
              <div className="flex w-full flex-col items-start gap-2 rounded-[6px] bg-[rgba(0,0,0,0.20)] p-3 text-white backdrop-blur-[101.3px]">
                <p className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-.64px]">10,000+</p>
                <p className="font-sans text-[12px] font-semibold not-italic leading-normal">auto drivers.</p>
              </div>
              <button type="button" onClick={() => setProofVisible(false)} aria-label="Dismiss" className="absolute -right-[9.4px] -top-[10.4px] flex items-center justify-center gap-2 rounded-[640px] bg-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" className="block size-[9px] shrink-0">
                  <path d="M1 1L7.4 7.4M7.4 1L1 7.4" strokeWidth="2" strokeLinecap="round" stroke="#121212" />
                </svg>
              </button>
            </aside>
          )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="353" height="1" viewBox="0 0 353 1" fill="none" className="h-px w-[353px] max-w-full shrink-0" aria-hidden="true">
          <path opacity="0.5" d="M0 0.5H353" stroke="white" strokeOpacity="0.5" />
        </svg>
        <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-.64px] min-[768px]:max-[1023px]:text-[44px] min-[768px]:max-[1023px]:tracking-[-.88px]">
          More trips.<br />Less kharcha.
        </h1>
        <div className="flex w-full items-start gap-3">
          <p className="min-w-0 flex-1 font-sans text-[12px] leading-normal">
            200+ km on one charge. Charge it at home on a normal 16-amp plug full in about 3.5 hours.
          </p>
          <a href="#vehicles" className="flex h-9 shrink-0 items-center justify-center rounded-[4px] border border-white/50 bg-white/[.08] px-4 font-display text-[12px] font-semibold leading-none text-white no-underline">Explore Vehicles</a>
        </div>
      </div>

      {/* Four specifications: tablet and mobile layouts keep their own grouping. */}
      <div className="absolute left-1/2 top-[719.33px] inline-flex w-[calc(100vw_-_40px)] max-w-[351.6px] -translate-x-1/2 flex-col items-center gap-4 overflow-hidden rounded-[10px] p-5 min-[768px]:max-[1023px]:top-[590px] min-[768px]:max-[1023px]:w-[calc(100vw_-_64px)] min-[768px]:max-[1023px]:max-w-[760px] min-[768px]:max-[1023px]:flex-row min-[768px]:max-[1023px]:gap-3 min-[768px]:max-[1023px]:p-7" style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(38.849998474121094px)", WebkitBackdropFilter: "blur(38.849998474121094px)" }}>
        <div className="relative grid w-full grid-cols-2 items-center gap-5 min-[768px]:max-[1023px]:w-1/2 min-[768px]:max-[1023px]:gap-3">
          <Stat value="200+" unit="Km" label="RealRange™" />
          <Stat value="3.5" unit="Hrs" label="0 to full charge" />
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.40)] min-[768px]:max-[1023px]:hidden" />
        </div>
        <div aria-hidden="true" className="relative h-px w-[313px] max-w-full min-[768px]:max-[1023px]:h-8 min-[768px]:max-[1023px]:w-px" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
        <div className="relative grid w-full grid-cols-2 items-center gap-5 min-[768px]:max-[1023px]:w-1/2 min-[768px]:max-[1023px]:gap-3">
          <Stat value="5" unit="Yrs" label="Vehicle warranty" />
          <Stat value="D+3" label="Seating" />
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.40)] min-[768px]:max-[1023px]:hidden" />
        </div>
      </div>

      {/* Vehicle card: 373 × 774 Figma slot, fluidly reduced on narrower phones. */}
      <div id="vehicles" className="absolute left-1/2 top-[926.67px] h-[774px] w-[calc(100vw_-_20px)] max-w-[373px] -translate-x-1/2 overflow-hidden rounded-[12px] min-[768px]:max-[1023px]:top-[850px] min-[768px]:max-[1023px]:h-[660px] min-[768px]:max-[1023px]:w-[calc(100vw_-_64px)] min-[768px]:max-[1023px]:max-w-[900px]">
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

        <div className="absolute left-5 right-0 top-[20.33px] flex flex-col items-start gap-3 min-[768px]:max-[1023px]:left-8 min-[768px]:max-[1023px]:top-7">
          <div className="flex items-center gap-[6px]">
            <Image src={`${A}logo.svg`} alt="" width={14} height={14} />
            <span className="font-sans text-[12px] leading-normal">OUR VEHICLES</span>
          </div>
          <h2 className="whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-.56px] min-[768px]:max-[1023px]:text-[36px]">Meet the Neo family.</h2>
          <div role="tablist" aria-label="Neo model" className="flex h-[42px] items-center rounded-[4px] bg-black/[.12] p-1">
            {(["HiRANGE", "HiCITY"] as const).map((key) => (
              <button key={key} type="button" role="tab" aria-selected={vehicle === key} onClick={() => setVehicle(key)} className={`flex h-9 items-center justify-center rounded-[2px] px-5 font-display text-[12px] font-semibold leading-none ${vehicle === key ? "bg-white text-[#121212]" : "text-white"}`}>
                Neo {key}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute left-[10px] right-[10px] top-[363.33px] flex flex-col gap-3 min-[768px]:max-[1023px]:left-6 min-[768px]:max-[1023px]:right-6 min-[768px]:max-[1023px]:top-[245px]">
          <div className={`rounded-[4px] bg-black/[.42] p-3 backdrop-blur-[38.85px] ${vehicle === "HiRANGE" ? "h-[348.399px]" : ""}`}>
            <div className="relative flex flex-col gap-[10px] py-3">
              <span className="absolute right-0 top-0 flex h-8 items-center gap-3 rounded-[4px] bg-[#f3f4f5] px-3 py-[6px] font-sans text-[12px] font-semibold leading-[1.15] tracking-[-.24px] text-[#121212]">
                {detail.chip}
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" aria-hidden="true" className="block h-[4px] w-[9.333px]">
                  <path d="M0.75 0.75L4.63572 4.08061C5.0851 4.4658 5.74823 4.4658 6.19762 4.08061L10.0833 0.749999" strokeWidth="1.5" strokeLinecap="round" stroke="#112211" />
                </svg>
              </span>
              <h3 className="font-display text-[18px] font-semibold leading-[1.15] tracking-[-.36px]">Neo {vehicle}</h3>
              <p className="w-full pr-1 font-sans text-[12px] leading-normal">{detail.description}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 self-stretch rounded-[4px] bg-black/20 p-[14px] backdrop-blur-[101.3px]">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex w-full flex-col items-center gap-3">
                  <div className="relative flex w-full items-start justify-center gap-3">
                    {detail.specs.slice(row * 2, row * 2 + 2).map(([value, label]) => {
                      const [mainValue, ...unitParts] = value.split(" ");
                      const unit = unitParts.join(" ");
                      return (
                        <div key={label} className="flex h-[49.8px] min-w-0 flex-1 flex-col items-center gap-[4.8px] whitespace-nowrap">
                          <p className="m-0 flex items-center justify-center gap-[2px] text-center font-display text-[24px] font-normal leading-[1.15] tracking-[-.48px] text-white">
                            <span>{mainValue}</span>{unit && <span className="font-display text-[14px] font-normal leading-normal tracking-normal">{unit}</span>}
                          </p>
                          <span className="font-sans text-[12px] font-normal leading-normal text-white">{label}</span>
                        </div>
                      );
                    })}
                    <span aria-hidden="true" className="absolute left-1/2 top-0 h-[49.8px] w-[0.8px] -translate-x-1/2" style={{ backgroundColor: "rgba(255, 255, 255, 0.32)", opacity: 0.5 }} />
                  </div>
                  {row < 2 && <div aria-hidden="true" className="h-[0.8px] w-[301px] max-w-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.32)", opacity: 0.5 }} />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full gap-2">
            <a href={`/products/${vehicle === "HiRANGE" ? "neo-hirange" : "neo-hicity"}`} className="flex h-9 min-w-0 flex-[1_0_0] items-center justify-between rounded-[4px] bg-[linear-gradient(107.815deg,#00ff87_28.559%,#1d6fff_124.97%)] py-[2px] pl-[23px] pr-[2px] font-display text-[12px] font-semibold leading-none text-white no-underline">View Details<Arrow /></a>
            <a href="/products" className="flex h-9 min-w-0 flex-[1_0_0] items-center justify-center gap-2 rounded-[4px] border border-white/50 bg-white/[.08] px-6 font-display text-[12px] font-semibold leading-none text-white no-underline">
              <span className="whitespace-nowrap">Compare Vehicles</span>
              <span aria-hidden="true" className="relative size-[18px] shrink-0 overflow-clip">
                <span className="absolute inset-[20.83%]">
                  <span className="absolute inset-[-7.14%_-7.16%]">
                    <Image src={`${A}compare-icon.svg`} alt="" width={16} height={16} className="block size-full max-w-none" />
                  </span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center">
      <p className="whitespace-nowrap font-display text-[28px] font-medium leading-[1.15] tracking-[-.56px] min-[768px]:max-[1023px]:text-[34px]">
        {value}{unit && <span className="ml-1 text-[16px] tracking-normal">{unit}</span>}
      </p>
      <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-normal text-white/80 min-[768px]:max-[1023px]:text-[14px]">{label}</p>
    </div>
  );
}
