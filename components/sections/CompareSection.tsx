"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

/** Desktop strips (Figma 1:1520 / 1:1552): 8 cards each — the second pass swaps
    the photo cards for icon variants. Photo crop = [left, top, width, height] %
    of the uniform 85.086×82 window into /assets/compare/truck-side.png. */
type DeskCard = {
  text: string;
  icon?: string;
  photo?: { crop: [number, number, number, number] };
};

const WITHOUT_DESK: DeskCard[] = [
  { icon: "/assets/compare/icon-fuel.svg", text: "Diesel cost goes up every month" },
  /* Breakdowns crop retuned for the uniform 82px window (was a 69.534px one):
     same rendered image rect in card coords, window just grows upward */
  { photo: { crop: [-4.16, -78.36, 196.07, 185.93] }, text: "Breakdowns stop your work" },
  { photo: { crop: [-108.78, 0, 199.78, 189.44] }, text: "Fewer trips, less earning" },
  { icon: "/assets/compare/icon-swap.svg", text: "No easy way to compare vehicles" },
  { icon: "/assets/compare/icon-fuel.svg", text: "Diesel cost goes up every month" },
  { icon: "/assets/compare/icon-cancel.svg", text: "Breakdowns stop your work" },
  { icon: "/assets/compare/icon-chart-down.svg", text: "Fewer trips, less earning" },
  { icon: "/assets/compare/icon-swap.svg", text: "No easy way to compare vehicles" },
];

const WITH_DESK: DeskCard[] = [
  /* Figma sets explicit line breaks (whitespace-pre-wrap) on the two-line texts */
  { icon: "/assets/compare/icon-cash.svg", text: "Running cost \n₹1.05 per km" },
  { photo: { crop: [-117.95, -100, 210.91, 200] }, text: "Service done in \n48 hours" },
  { photo: { crop: [0, 0, 210.91, 200] }, text: "More trips, \nmore earning" },
  { icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
  { icon: "/assets/compare/icon-cash.svg", text: "Running cost \n₹1.05 per km" },
  { icon: "/assets/compare/icon-clock.svg", text: "Service done in \n48 hours" },
  { icon: "/assets/compare/icon-chart-up.svg", text: "More trips, \nmore earning" },
  { icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
];

const AUDIENCE = ["Fleet owner", "Transport company", "Small business", "Driver", "Dealer"];

/** intrinsic glyph sizes — Figma renders each icon at natural size centered in
    a 24px window (e.g. fuel-station is 21.5×19.5), not stretched to 24×24 */
const ICON_SIZE: Record<string, [number, number]> = {
  "/assets/compare/icon-fuel.svg": [22, 20],
  "/assets/compare/icon-swap.svg": [16, 16],
  "/assets/compare/icon-cancel.svg": [22, 22],
  "/assets/compare/icon-chart-down.svg": [20, 20],
  "/assets/compare/icon-cash.svg": [22, 22],
  "/assets/compare/icon-truck.svg": [20, 20],
  "/assets/compare/icon-clock.svg": [22, 22],
  "/assets/compare/icon-chart-up.svg": [22, 18],
};

/**
 * "What changes when you switch?" (desktop 1:1498 · mobile 1:4703).
 * Split Without/With Euler carousels over a navy→blue gradient.
 */
/** one card + one gap — the marquee's repeat period (Figma 291.776 + 42) */
const MARQUEE_PERIOD = 291.776 + 42;

export default function CompareSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileFrameRef = useRef<HTMLDivElement>(null);
  const rightTracks = useRef<(HTMLDivElement | null)[]>([]);

  // The two strips animate with the same phase but anchor at different x
  // (left track starts at the screen edge, right track at the divider), so
  // their card edges never line up in columns — the right row reads as
  // "delayed". Shift the right tracks by (half-window mod period) so both
  // sit on one shared lattice: card edges flow through the divider as one
  // continuous conveyor. marginLeft is used because the marquee keyframes
  // own `transform`; a static margin doesn't affect the seamless loop.
  useLayoutEffect(() => {
    const align = (track: HTMLDivElement | null, half: number) => {
      if (!track) return;
      const scale = track.getBoundingClientRect().width / track.offsetWidth || 1;
      track.style.marginLeft = `${(half / scale) % MARQUEE_PERIOD}px`;
    };
    const run = () => {
      align(rightTracks.current[0], (mobileFrameRef.current?.clientWidth ?? 0) / 2);
      align(rightTracks.current[1], (sectionRef.current?.clientWidth ?? 0) / 2);
    };
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="group relative overflow-clip lg:h-[800px]"
      style={{
        /* exact Figma fills (1:1498), pixel-verified against the render: a
           uniform 40% black wash over the navy→blue gradient whose first
           stop sits OUTSIDE the box (-63.51%), so the blend runs across
           the whole width — right edge lands on #0C2C67, the left plateau
           on #114399 (= #1D6FFF under the wash). A stop at +63.511% would
           flatten the right two-thirds into solid navy, which the render
           does not show */
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(272.98deg, #0E2F6D -63.51%, #1D6FFF 87.23%), linear-gradient(90deg, #E9EDF3 0%, #E9EDF3 100%)",
      }}
      aria-label="Why Euler"
    >
      {/* ── mobile: composed Figma 1:4703 frame (393×612) — title block at
          y31.3 · flat visual render (1:4704) at y94 · Neo promo at y459 ── */}
      <div ref={mobileFrameRef} className="relative mx-auto h-[612px] w-full max-w-[393px] lg:hidden">
        {/* title container — (19.32, 31.3), gap 14, pills h-32 (1:4753) */}
        <div className="absolute inset-x-[19.32px] top-[31.3px] z-10 flex flex-col items-center gap-[14px]">
          <Eyebrow label="Why Euler" dark />
          <h2 className="w-[310.678px] text-center font-display text-[28px] font-semibold leading-[normal] tracking-[-0.56px] text-white">
            What changes when you switch?
          </h2>
          {/* pills row (Figma 1:4759: full 353px container width, first pill at
              its x=0). The 19.32px gutters live in snap-aligned spacer children
              — NOT container padding: mandatory snap ignores padding, so
              px-[19.32px] made scrollLeft 0 an invalid rest point and the
              browser auto-snapped the first pill against the raw left edge,
              cropping it. The spacers make 0 a valid snap position (same
              pattern as the Insights/Reviews rows), and the explicit width
              removes the w-auto shrink-to-fit drift */}
          <div className="snap-row -mx-[19.32px] w-[calc(100%+38.64px)] justify-start gap-3">
            <div aria-hidden className="shrink-0" style={{ width: "calc(19.32px - 12px)" }} />
            {AUDIENCE.map((a, i) => (
              <button
                key={a}
                onClick={() => setActiveTab(i)}
                className={`flex h-[32px] shrink-0 items-center justify-center whitespace-nowrap rounded-[24.381px] px-[14px] font-display text-[12px] font-semibold leading-none cursor-pointer transition-colors ${
                  i === activeTab
                    ? "border-[0.641px] border-[rgba(18,18,18,0.5)] border-solid bg-white text-ink"
                    : "border-[0.762px] border-solid border-white/10 bg-black text-white backdrop-blur-[7.619px] hover:bg-white/10"
                }`}
              >
                {a}
              </button>
            ))}
            <div aria-hidden className="shrink-0" style={{ width: "calc(19.32px - 12px)" }} />
          </div>
        </div>

        {/* mobile functional carousels & labels (replacing mobile-top.png) */}
        <div className="absolute left-0 top-[220px] h-[220px] w-full">
          {/* Vertical divider — Line 93's gradient asset rotated 90° (1px at
              mobile scale): fades at the ends, brightest at the centre */}
          <Image
            src="/assets/compare/divider-h.svg"
            alt=""
            width={220}
            height={1}
            aria-hidden
            className="pointer-events-none absolute left-[calc(50%_-_1px)] top-[-40px] h-px w-[220px] origin-top-left rotate-90"
          />

          {/* Left Half: Without Euler cards — strip at 80% (Figma 1:1519), so the
              black cards blend toward the navy gradient instead of flat black */}
          <div className="absolute left-0 top-0 h-[125px] w-1/2 overflow-hidden opacity-80 group">
            <div className="absolute left-[5%] top-0 origin-top-left scale-[0.55]">
              <div className="flex gap-[42px] animate-marquee [--marquee-gap:42px] group-active:[animation-play-state:paused]">
                {WITHOUT_DESK.map((c, i) => (
                  <DeskCardView key={`w1m-${i}`} c={c} tone="black" chip="red" />
                ))}
                {WITHOUT_DESK.map((c, i) => (
                  <DeskCardView key={`w2m-${i}`} c={c} tone="black" chip="red" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Half: With Euler cards */}
          <div className="absolute left-1/2 top-0 h-[125px] w-1/2 overflow-hidden group">
            <div className="absolute left-[5%] top-0 origin-top-left scale-[0.55]">
              <div ref={(el) => { rightTracks.current[0] = el; }} className="flex gap-[42px] animate-marquee [--marquee-gap:42px] group-active:[animation-play-state:paused]">
                {WITH_DESK.map((c, i) => (
                  <DeskCardView key={`w1m-${i}`} c={c} tone="glass" chip="green" />
                ))}
                {WITH_DESK.map((c, i) => (
                  <DeskCardView key={`w2m-${i}`} c={c} tone="glass" chip="green" />
                ))}
              </div>
            </div>
          </div>

          {/* Labels below cards */}
          <p className="absolute top-[150px] left-0 w-1/2 text-center font-display text-[16px] font-semibold leading-[normal] tracking-[-0.32px] text-[#ccc]">
            Without Euler
          </p>
          <div className="absolute top-[150px] left-1/2 flex w-1/2 items-center justify-center gap-2">
            <p className="font-display text-[16px] font-semibold leading-[normal] tracking-[-0.32px] text-white">With</p>
            <Image
              src="/assets/compare/logo-small.svg"
              alt="Euler"
              width={60}
              height={10}
              className="h-[10px] w-[60px]"
            />
          </div>
        </div>

        {/* Neo promo — (20, 459) 353×133, r8, p16, stacked centered (1:4771) */}
        <div className="absolute left-1/2 top-[459px] z-10 flex w-[353px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center gap-[14px] overflow-clip rounded-lg p-4">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              /* measured from the Figma mobile render (1:4771): a bright blue
                 card — stops solve the composite under the 20% gray png wash
                 to land on the render's ~#175AC4 left → #275EBE right (same
                 family as the desktop promo's measured #0C5DEC → #2365D7), so
                 the #121212 button keeps its Figma contrast. The old navy
                 stops (#0E2F6D → #114399) made the card — and with it the
                 button — read far darker than the design */
              backgroundImage: "linear-gradient(90deg, #1266F5 0%, #2365D7 100%)",
            }}
          />
          <Image
            src="/assets/compare/neo-promo-bg.png"
            alt=""
            fill
            sizes="353px"
            aria-hidden
            className="object-cover opacity-20"
          />
          <div className="relative flex flex-col items-center gap-0.5 whitespace-nowrap text-center">
            <p className="text-[18px] font-semibold leading-[1.25] tracking-[-0.27px] text-white">
              Which vehicle fits your work?
            </p>
            <p className="text-[12px] font-normal leading-[1.5] text-on-dark-2">
              Sirf 5 questions, 30 seconds. No phone number needed.
            </p>
          </div>
          <Button variant="dark" arrow="white" className="relative">
            Take the 30 second test
          </Button>
        </div>
      </div>

      {/* decorative truck outlines + concentric rings (desktop) — Figma 1:1499 / 1:1585.
          Anchored to the centered 1440px design grid, not the viewport edge, so the
          ovals stay aligned with the content on screens wider than 1440. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          <Image
            src="/assets/compare/truck-outline.svg"
            alt=""
            width={544}
            height={907}
            className="absolute left-[720px] top-[-45px]"
          />
          <Image
            src="/assets/compare/truck-big.svg"
            alt=""
            width={226}
            height={938}
            className="absolute left-[720px] top-[50px]"
          />
        </div>
      </div>

      {/* header — desktop only; the mobile frame 1:4703 has its own title block.
          z-10: Figma paints the header above Line 93 (1:1600 follows 1:1584),
          so the solid pill bg covers the divider's top end where it would
          otherwise cut across the centre pill (Small business) */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1360px] flex-col items-center gap-[24px] pt-[62.21px] lg:flex">
        <div className="flex h-[86.36px] flex-col items-center gap-4">
          <Eyebrow label="Why Euler" dark />
          <h2 className="text-center font-display text-[42px] font-semibold leading-[50px] tracking-[-0.84px] text-white">
            What changes when you switch?
          </h2>
        </div>
        <div className="snap-row gap-3" role="tablist" aria-label="Audience">
          {AUDIENCE.map((a, i) => (
            <button
              key={a}
              role="tab"
              aria-selected={i === activeTab}
              onClick={() => setActiveTab(i)}
              className={`flex h-[42px] items-center justify-center whitespace-nowrap rounded-[32px] px-6 font-display text-[16px] font-semibold leading-none cursor-pointer transition-colors ${
                i === activeTab
                  ? "border-[0.841px] border-[rgba(18,18,18,0.5)] border-solid bg-white text-ink"
                  : "border border-white/10 bg-black text-white backdrop-blur-[10px] hover:bg-white/10"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* ── desktop strips — full-bleed across the whole screen (per review), cards
            keep the Figma 1:1520/1:1552 look: static cropped rows, not a marquee.
            Left half "Without" (80% opacity), right half "With", split at the
            section's centre line like the design's 720/740 split. */}
      <div className="absolute left-0 top-[371px] hidden h-[220px] w-1/2 overflow-clip opacity-80 lg:block group">
        <div className="absolute left-0 top-0 flex h-[220px] gap-[42px] animate-marquee [--marquee-gap:42px] group-hover:[animation-play-state:paused]">
          {/* First set of 8 cards */}
          {WITHOUT_DESK.map((c, i) => (
            <DeskCardView key={`w1-${i}`} c={c} tone="black" chip="red" />
          ))}
          {/* Duplicated set for infinite marquee */}
          {WITHOUT_DESK.map((c, i) => (
            <DeskCardView key={`w2-${i}`} c={c} tone="black" chip="red" />
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 top-[371px] hidden h-[220px] w-1/2 overflow-clip lg:block group">
        <div ref={(el) => { rightTracks.current[1] = el; }} className="absolute left-0 top-0 flex h-[220px] gap-[42px] animate-marquee [--marquee-gap:42px] group-hover:[animation-play-state:paused]">
          {/* First set of 8 cards */}
          {WITH_DESK.map((c, i) => (
            <DeskCardView key={`w1-${i}`} c={c} tone="glass" chip="green" />
          ))}
          {/* Duplicated set for infinite marquee */}
          {WITH_DESK.map((c, i) => (
            <DeskCardView key={`w2-${i}`} c={c} tone="glass" chip="green" />
          ))}
        </div>
      </div>

      {/* ── desktop: exact Figma frame 1:1498 (labels y277.38 · strips y371 ·
            divider y201.57 · promo y679 within the 1440×800 section) ───── */}
      <div className="relative mx-auto hidden h-[585.43px] w-full max-w-[1440px] lg:block pointer-events-none">
        {/* labels (y277.38) */}
        <p className="absolute left-[279.47px] top-[62.81px] font-display text-[32px] font-semibold leading-[normal] tracking-[-0.64px] text-[#ccc]">
          Without Euler
        </p>
        <div className="absolute left-[987.92px] top-[62.81px] flex items-center gap-[14px]">
          <p className="font-display text-[32px] font-semibold leading-[normal] tracking-[-0.64px] text-white">With</p>
          <Image
            src="/assets/compare/logo-small.svg"
            alt="Euler"
            width={121}
            height={20}
            className="h-5 w-[120.741px]"
          />
        </div>

        {/* divider Line 93 — (719.92, 201.57), 598.5px tall, on the centre line.
            The asset is horizontal with the gradient along its length, so it
            renders at natural aspect rotated 90°: faint at the ends, glowing
            centre — squeezing it into a 1px box instead flattens the gradient
            into a uniform white line. No CSS blur: Figma's Line 93 carries no
            effect, and blurring smeared the crisp 2.5px stroke into a wide
            dim halo that read brighter/softer than the design */}
        <Image
          src="/assets/compare/divider-h.svg"
          alt=""
          width={599}
          height={3}
          aria-hidden
          className="pointer-events-none absolute left-[721.17px] top-[-13px] h-[2.5px] w-[598.535px] origin-top-left rotate-90"
        />

        {/* Neo promo — 722×91, r16, p20, gap 82 (Figma 1:1587: left-1/2
            -translate-x-1/2 at top 679 — the old fixed left-359px only
            centered at exactly 1440px and stuck right of center below it) */}
        <div className="absolute left-1/2 top-[464.43px] flex h-[91px] w-[722px] -translate-x-1/2 items-center gap-[82px] overflow-clip rounded-[16px] p-5">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              /* measured from the Figma render (1:1587): gentle left→right
                 drift; stops inverted through the 20% image wash so the
                 composite lands on the design's #1657c9 → #285db8 */
              backgroundImage: "linear-gradient(90deg, #0C5DEC 0%, #2365D7 100%)",
            }}
          />
          <Image
            src="/assets/compare/neo-promo-bg.png"
            alt=""
            fill
            sizes="722px"
            aria-hidden
            className="object-cover opacity-20"
          />
          <div className="relative flex flex-col gap-1.5 whitespace-nowrap">
            <p className="text-[20px] font-semibold leading-[1.25] tracking-[-0.3px] text-white">
              Which vehicle fits your work?
            </p>
            <p className="text-[13px] font-normal leading-[1.5] text-on-dark-2">
              Sirf 5 questions, 30 seconds. No phone number needed.
            </p>
          </div>
          <Button variant="dark" arrow="white" className="relative">
            Take the 30 second test
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Desktop card — 291.776×220, r18, p24 (Figma 1:1521–1:1582). Photo cards all
    follow the same Figma spec: padding 24 · column · justify-end · items-start ·
    gap 18, with a uniform 85.086×82 photo frame; icon cards keep their chip at
    the top (justify-between) per Figma 1:1553 */
function DeskCardView({ c, tone, chip }: { c: DeskCard; tone: "black" | "glass"; chip: "red" | "green" }) {
  const [iconW, iconH] = c.icon ? (ICON_SIZE[c.icon] ?? [24, 24]) : [24, 24];
  return (
    <div
      className={`flex h-[220px] w-[291.776px] shrink-0 flex-col items-start rounded-[18px] p-6 ${
        tone === "black" ? "bg-black" : "bg-white/[0.08]"
      } ${c.photo ? "justify-end gap-[18px]" : "justify-between"}`}
    >
      {c.icon && (
        <span
          className={`flex size-[52px] items-center justify-center rounded-[12px] ${
            chip === "red" ? "bg-chip-red/20" : "bg-chip-green/20"
          }`}
        >
          <Image src={c.icon} alt="" width={iconW} height={iconH} aria-hidden />
        </span>
      )}
      {c.photo && (
        /* Without-strip photos render at 80% opacity (Figma 1:1526/1:1529);
           With-strip photos are full opacity (1:1558/1:1562) */
        <span
          className={`relative block aspect-[85.09/82] h-[82px] w-[85.086px] shrink-0 overflow-hidden ${tone === "black" ? "opacity-80" : ""}`}
        >
          <Image
            src="/assets/compare/truck-side.png"
            alt=""
            width={170}
            height={140}
            className="absolute max-w-none"
            style={{
              left: `${c.photo.crop[0]}%`,
              top: `${c.photo.crop[1]}%`,
              width: `${c.photo.crop[2]}%`,
              height: `${c.photo.crop[3]}%`,
            }}
          />
        </span>
      )}
      <p className="w-[243.776px] whitespace-pre-line text-[24px] font-bold leading-normal text-white">{c.text}</p>
    </div>
  );
}

/** Mobile card (mobile node 1:4703) — the mobile UI ships as the flat render
    of the composed frame, so no per-card mobile markup is needed. */
