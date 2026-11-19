"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import VehicleCompareModal from "./VehicleCompareModal";

/** Desktop strips (Figma 1:1520 / 1:1552 / 2605:3630 / 2605:3661): 8 cards each */
type DeskCard = {
  text: string;
  icon?: string;
  image?: string;
  photo?: { crop: [number, number, number, number] };
};

const WITHOUT_DESK: DeskCard[] = [
  { icon: "fuel", text: "Diesel cost goes up every month" },
  { image: "/assets/compare/without-breakdown.png", text: "Breakdowns stop your work" },
  { image: "/assets/compare/without-trips.png", text: "Fewer trips, less earning" },
  { icon: "swap", text: "No easy way to compare vehicles" },
  { icon: "fuel", text: "Diesel cost goes up every month" },
  { icon: "cancel", text: "Breakdowns stop your work" },
  { icon: "chart-down", text: "Fewer trips, less earning" },
  { icon: "swap", text: "No easy way to compare vehicles" },
];

const WITH_DESK: DeskCard[] = [
  { image: "/assets/compare/with-cost.webp", icon: "cash", text: "Running cost \n₹1.05 per km" },
  { image: "/assets/compare/with-service.png", text: "Service done in \n48 hours" },
  { image: "/assets/compare/with-trips.png", text: "More trips, \nmore earning" },
  { icon: "truck", text: "See your whole fleet \non your phone" },
  { icon: "cash", text: "Running cost \n₹1.05 per km" },
  { icon: "clock", text: "Service done in \n48 hours" },
  { icon: "chart-up", text: "More trips, \nmore earning" },
  { icon: "truck", text: "See your whole fleet \non your phone" },
];

const AUDIENCE = ["Fleet owner", "Transport company", "Small business", "Driver", "Dealer"];

/** Inlined vector icons from Figma (Frame 2605:3630 & Frame 2605:3661) */
function CompareIconView({ icon, className = "size-7" }: { icon?: string; className?: string }) {
  if (!icon) return null;

  const key = icon
    .replace(/^\/assets\/compare\/icon-/, "")
    .replace(/\.svg(\?.*)?$/, "")
    .replace(/^icon-/, "");

  switch (key) {
    case "fuel":
      return (
        <svg viewBox="0 0 22 20" fill="none" className={className} aria-hidden>
          <path
            d="M9.21259 10.75L7.81858 12.5624C7.66919 12.7566 7.77626 13.0361 8.01987 13.0878L9.48013 13.3977C9.73986 13.4529 9.83892 13.7622 9.65732 13.9511L7.92773 15.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M2.75 7.75H14.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M2.75 18.75L2.75 6.75C2.75 3.92157 2.75 2.50736 3.62868 1.62868C4.50736 0.75 5.92157 0.75 8.75 0.75C11.5784 0.75 12.9926 0.75 13.8713 1.62868C14.75 2.50736 14.75 3.92157 14.75 6.75L14.75 18.75H2.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M0.75 18.75H16.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M14.75 11.75H16.4167C16.7267 11.75 16.8817 11.75 17.0088 11.7841C17.3539 11.8765 17.6235 12.1461 17.7159 12.4912C17.75 12.6183 17.75 12.7733 17.75 13.0833V14.25C17.75 15.0784 18.4216 15.75 19.25 15.75C20.0784 15.75 20.75 15.0784 20.75 14.25V7.9611C20.75 7.35998 20.75 7.05942 20.6642 6.77598C20.5784 6.49255 20.4116 6.24247 20.0782 5.7423L19.3047 4.58205C18.9582 4.06223 18.3747 3.75 17.75 3.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cancel":
      return (
        <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden>
          <path
            d="M0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M3.39856 3.82876C3.5369 3.68211 3.67948 3.5395 3.8261 3.40111M6.69733 1.47939C6.87884 1.3978 7.06313 1.32128 7.25 1.25M1.48172 6.69192C1.39925 6.87518 1.32195 7.06127 1.25 7.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M13.75 7.75002L10.75 10.75M10.75 10.75L7.75 13.75M10.75 10.75L13.75 13.75M10.75 10.75L7.75 7.75002"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "chart-down":
      return (
        <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
          <path
            d="M15.5086 13.75C15.5086 7.12258 10.6918 3.75 4.75 3.75M13.2672 12.75L14.2407 13.7911C14.8384 14.4304 15.1373 14.75 15.5086 14.75C15.88 14.75 16.1788 14.4304 16.7765 13.7911L17.75 12.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.75 18.75H7.75C4.45017 18.75 2.80025 18.75 1.77513 17.7249C0.75 16.6997 0.75 15.0498 0.75 11.75V0.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
          <path
            d="M14.7513 4.75H2.40985C1.40406 4.75 0.90116 4.75 0.776006 4.44134C0.650852 4.13268 1.00645 3.76942 1.71766 3.04289L3.96219 0.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.751287 10.75H13.0927C14.0985 10.75 14.6014 10.75 14.7266 11.0587C14.8517 11.3673 14.4961 11.7306 13.7849 12.4571L11.5404 14.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cash":
      return (
        <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden>
          <path
            d="M5.75018 17.75C7.66725 17.75 9.41764 17.3724 10.7502 16.75C12.0827 16.1276 13.8331 15.75 15.7502 15.75C16.8161 15.75 17.8305 15.8667 18.7502 16.0774C19.7101 16.2973 20.7502 15.6209 20.7502 14.636V3.86397C20.7502 3.07299 20.7502 2.67751 20.5561 2.26966C20.4454 2.03705 20.1932 1.72064 19.9912 1.56079C19.637 1.28051 19.3414 1.21281 18.7502 1.0774C17.8305 0.866748 16.8161 0.75 15.7502 0.75C13.8331 0.75 12.0827 1.12764 10.7502 1.75C9.41764 2.37236 7.66725 2.75 5.75018 2.75C4.68426 2.75 3.66987 2.63325 2.75018 2.4226C1.79021 2.20273 0.750179 2.87914 0.750179 3.86397V14.636C0.750179 15.427 0.750179 15.8225 0.944295 16.2303C1.05501 16.4629 1.30714 16.7794 1.50916 16.9392C1.86337 17.2195 2.15897 17.2872 2.75018 17.4226C3.66987 17.6333 4.68426 17.75 5.75018 17.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M0.750179 19.75C2.08272 20.3724 3.83311 20.75 5.75018 20.75C7.66725 20.75 9.41764 20.3724 10.7502 19.75C12.0827 19.1276 13.8331 18.75 15.7502 18.75C17.6672 18.75 19.4176 19.1276 20.7502 19.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M13.2502 9.25C13.2502 10.6307 12.1309 11.75 10.7502 11.75C9.36947 11.75 8.25018 10.6307 8.25018 9.25C8.25018 7.86929 9.36947 6.75 10.7502 6.75C12.1309 6.75 13.2502 7.86929 13.2502 9.25Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M4.25018 10.25L4.25018 10.259" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.2502 8.24219L17.2502 8.25117" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "truck":
      return (
        <svg viewBox="0 0 22 18" fill="none" className={className} aria-hidden>
          <circle cx="15.75" cy="14.75" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="5.75" cy="14.75" r="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9.75 13.75H13.75M12.25 3.75H13.1929C14.5033 3.75 15.1586 3.75 15.7141 4.06452C16.2696 4.37904 16.64 4.95972 17.3808 6.12107C17.9002 6.93543 18.4455 7.52652 19.2122 8.05239C19.9841 8.58185 20.3512 8.84058 20.5549 9.256C20.75 9.65384 20.75 10.125 20.75 11.0673C20.75 12.3096 20.75 12.9308 20.401 13.3255C20.386 13.3425 20.3707 13.359 20.3549 13.375C19.9875 13.75 19.4094 13.75 18.253 13.75H17.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.75 3.75L12.7442 6.23557C13.2313 7.45337 13.4749 8.06227 13.9828 8.40614C14.4907 8.75 15.1465 8.75 16.4581 8.75H19.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.61957 13.75C2.26684 13.75 1.59048 13.75 1.17024 13.3107C0.75 12.8713 0.75 12.1642 0.75 10.75V3.75C0.75 2.33579 0.75 1.62868 1.17024 1.18934C1.59048 0.75 2.26684 0.75 3.61957 0.75H8.88044C10.2332 0.75 10.9095 0.75 11.3298 1.18934C11.75 1.62868 11.75 2.33579 11.75 3.75V13.75H7.44566"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden>
          <circle cx="10.75" cy="10.75" r="10" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10.75 6.75V10.75L12.75 12.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart-up":
      return (
        <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
          <path
            d="M18.75 18.75H7.75C4.45017 18.75 2.80025 18.75 1.77513 17.7249C0.75 16.6997 0.75 15.0498 0.75 11.75V0.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M15.5086 4.75C15.5086 11.3774 10.6918 14.75 4.75 14.75M13.2672 5.75L14.2407 4.70887C14.8384 4.06962 15.1373 3.75 15.5086 3.75C15.88 3.75 16.1788 4.06963 16.7765 4.70887L17.75 5.75"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" className={className} aria-hidden />
      );
  }
}

/**
 * "What changes when you switch?" (desktop 1:1498 · mobile 1:4703).
 * Split Without/With Euler carousels over a navy→blue gradient.
 */
/** one card + one gap — the marquee's repeat period (Figma 291.776 + 42) */
const MARQUEE_PERIOD = 291.776 + 42;
/** mobile period: 136px card + 8px gap (Figma 1:4706) */
const MARQUEE_PERIOD_MOBILE = 136 + 8;

const ensureBuffer = (cards: DeskCard[]) => {
  if (cards.length >= 8) return cards;
  let res = [...cards];
  while (res.length < 8) res = [...res, ...cards];
  return res;
};

export interface ComparePersonaPoints {
  persona: string;
  points: string[];
}

export interface CompareSectionProps {
  eyebrow?: string;
  title?: string;
  quizTitle?: string;
  quizSubtitle?: string;
  quizCtaLabel?: string;
  withoutEulerPoints?: ComparePersonaPoints[];
  withEulerPoints?: ComparePersonaPoints[];
  withoutCards?: DeskCard[];
  withCards?: DeskCard[];
}

function pointToWithoutCard(text: string, index: number): DeskCard {
  const lower = text.toLowerCase();
  if (lower.includes("downtime") || lower.includes("breakdown") || lower.includes("disrupt") || lower.includes("stop")) {
    return { text, image: "/assets/compare/without-breakdown.png", icon: "cancel" };
  }
  if (lower.includes("trip") || lower.includes("fewer") || lower.includes("less") || lower.includes("inefficienc") || lower.includes("off the road") || lower.includes("capacity")) {
    return { text, image: "/assets/compare/without-trips.png", icon: "chart-down" };
  }
  if (lower.includes("cost") || lower.includes("₹") || lower.includes("fuel") || lower.includes("diesel") || lower.includes("petrol") || lower.includes("price") || lower.includes("margin") || lower.includes("pressure")) {
    return { text, icon: "fuel" };
  }
  if (lower.includes("compare") || lower.includes("vehicle") || lower.includes("way")) {
    return { text, icon: "swap" };
  }
  if (index % 3 === 0) {
    return { text, image: "/assets/compare/without-breakdown.png", icon: "cancel" };
  }
  if (index % 3 === 1) {
    return { text, image: "/assets/compare/without-trips.png", icon: "chart-down" };
  }
  return { text, icon: "fuel" };
}

function pointToWithCard(text: string, index: number): DeskCard {
  const lower = text.toLowerCase();
  if (lower.includes("service") || lower.includes("doorstep") || lower.includes("minute") || lower.includes("hour") || lower.includes("support")) {
    return { text, image: "/assets/compare/with-service.png", icon: "clock" };
  }
  if (lower.includes("trip") || lower.includes("more") || lower.includes("earning") || lower.includes("grow") || lower.includes("opportunity")) {
    return { text, image: "/assets/compare/with-trips.png", icon: "chart-up" };
  }
  if (lower.includes("cost") || lower.includes("₹") || lower.includes("saving") || lower.includes("margin") || lower.includes("economic")) {
    return { text, image: "/assets/compare/with-cost.webp", icon: "cash" };
  }
  if (lower.includes("vehicle") || lower.includes("fleet") || lower.includes("dealership") || lower.includes("partnership") || lower.includes("phone")) {
    return { text, icon: "truck" };
  }
  if (index % 2 === 0) {
    return { text, image: "/assets/compare/with-service.png", icon: "clock" };
  }
  return { text, image: "/assets/compare/with-trips.png", icon: "chart-up" };
}

export default function CompareSection({
  eyebrow = "Why Euler",
  title = "What changes when you switch?",
  quizTitle = "Which vehicle fits your work?",
  quizSubtitle = "Sirf 5 questions, 30 seconds. No phone number needed.",
  quizCtaLabel = "Take the 30 second test",
  withoutEulerPoints,
  withEulerPoints,
  withoutCards,
  withCards,
}: CompareSectionProps = {}) {
  const [activeTab, setActiveTab] = useState(0);

  const currentAudience = AUDIENCE[activeTab] || AUDIENCE[0];

  const matchedWithoutPoints = withoutEulerPoints?.find(
    (p) => p.persona?.toLowerCase() === currentAudience.toLowerCase()
  )?.points;

  const matchedWithPoints = withEulerPoints?.find(
    (p) => p.persona?.toLowerCase() === currentAudience.toLowerCase()
  )?.points;

  const personaWithoutCards =
    matchedWithoutPoints && matchedWithoutPoints.length > 0
      ? matchedWithoutPoints.map((pt, i) => pointToWithoutCard(pt, i))
      : undefined;

  const personaWithCards =
    matchedWithPoints && matchedWithPoints.length > 0
      ? matchedWithPoints.map((pt, i) => pointToWithCard(pt, i))
      : undefined;

  const currentWithout = ensureBuffer(personaWithoutCards || withoutCards || WITHOUT_DESK);
  const currentWith = ensureBuffer(personaWithCards || withCards || WITH_DESK);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileFrameRef = useRef<HTMLDivElement>(null);
  const rightTracks = useRef<(HTMLDivElement | null)[]>([]);

  // The two strips animate in lockstep but anchor at different x (left track
  // starts at its window edge, right track at the divider), so their card
  // edges only line up if both sit on one shared lattice. Shift the right
  // track by −offset mod period so its card edges are congruent with the
  // left track's and the rows read as one conveyor flowing through the
  // divider. offset = distance between the two tracks' origins (the left
  // mobile track starts at −48px, its Figma bleed). marginLeft because the
  // marquee keyframes own `transform`; a static margin doesn't affect the
  // seamless loop. Layout px throughout — congruence survives the tablet
  // zoom, which scales both tracks equally.
  useLayoutEffect(() => {
    const align = (track: HTMLDivElement | null, offset: number, period: number) => {
      if (!track) return;
      track.style.marginLeft = `${((period - (offset % period)) % period).toFixed(3)}px`;
    };
    const run = () => {
      align(rightTracks.current[0], (mobileFrameRef.current?.clientWidth ?? 0) / 2 + 48, MARQUEE_PERIOD_MOBILE);
      align(rightTracks.current[1], (sectionRef.current?.clientWidth ?? 0) / 2, MARQUEE_PERIOD);
    };
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  return (
    <section
      ref={sectionRef}
      /* exact Figma fills — mobile 1:4703 (near-vertical -88.94° blend) ·
         desktop 1:1498 (272.98° horizontal blend + mist base, pixel-verified:
         first stop outside the box so the blend runs across the whole width) */
      className="compare-bg group relative overflow-clip lg:h-[800px]"
      aria-label="Why Euler"
    >
      {/* ── mobile: composed Figma 1:4703 frame — title block at
          y31.3 · strips at y248.67 · labels at y374.25 · divider 178.67→458.5
          (touching the promo top) · truck art right half · Neo promo y459.
          h-[656px] provides healthy ~40px margin under the quiz card ── */}
      <div ref={mobileFrameRef} className="relative mx-auto h-[656px] w-full max-w-[393px] lg:hidden">
        {/* rings + blue glow art (1:4718, native 319×443, arcs centered on
            the divider) — scaled 1.294× about its arc center (197.74, 368.38)
            so the outer arcs span y≈122→612 like the taller divider, per
            review; box 413×573.5 at (196.14, 85.66) */}
        <Image
          src="/assets/compare/mobile-truck.svg"
          alt=""
          width={413}
          height={574}
          aria-hidden
          className="pointer-events-none absolute left-[196.14px] top-[85.66px] h-[573.5px] w-[413px]"
        />

        {/* title container — (19.32, 31.3), gap 14, pills h-32 (1:4753) */}
        <div className="absolute inset-x-[19.32px] top-[31.3px] z-10 flex flex-col items-center gap-[14px]">
          <Eyebrow label={eyebrow} dark />
          <h2 className="w-[310.678px] text-center font-display text-[28px] font-semibold leading-[normal] tracking-[-0.56px] text-white">
            {title}
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

        {/* card strips (1:4705/1:4728, y248.67 · h102): mobile cards are
            136×102 r12 (NOT scaled desktop cards) */}
        <div className="absolute left-0 top-[248.67px] h-[102px] w-full">
          {/* Left Half: Without Euler — window bleeds 48px past the left edge */}
          <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden group">
            <div className="absolute left-[-48px] top-0">
              <div className="flex w-max gap-[8px] animate-marquee [--marquee-gap:8px]">
                {currentWithout.map((c, i) => (
                  <MobileCardView key={`w1m-${i}`} c={c} tone="black" chip="red" />
                ))}
                {currentWithout.map((c, i) => (
                  <MobileCardView key={`w2m-${i}`} c={c} tone="black" chip="red" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Half: With Euler */}
          <div className="absolute left-1/2 top-0 h-full w-1/2 overflow-hidden group">
            <div ref={(el) => { rightTracks.current[0] = el; }} className="flex w-max gap-[8px] animate-marquee [--marquee-gap:8px]">
              {currentWith.map((c, i) => (
                <MobileCardView key={`w1m-${i}`} c={c} tone="glass" chip="green" />
              ))}
              {currentWith.map((c, i) => (
                <MobileCardView key={`w2m-${i}`} c={c} tone="glass" chip="green" />
              ))}
            </div>
          </div>

          {/* Labels (1:4715/1:4740, y374.25): Archia SemiBold 14 · Without at
              80% opacity · With + 60.37×10 logo */}
          <p className="absolute top-[125.58px] left-0 w-1/2 text-center font-display text-[14px] font-semibold leading-[normal] tracking-[-0.28px] text-white/80">
            Without Euler
          </p>
          <div className="absolute top-[125.58px] left-1/2 flex w-1/2 items-center justify-center gap-2">
            <p className="font-display text-[14px] font-semibold leading-[normal] tracking-[-0.28px] text-white">With</p>
            <Image
              src="/assets/compare/logo-small.svg"
              alt="Euler"
              width={60}
              height={10}
              className="h-[10px] w-[60.37px]"
            />
          </div>
        </div>

        {/* Line 93 mobile divider (Figma 2667:8261) — 279.83px tall, peak white at cards (y≈300),
            smooth fade to transparent at y178.67 (below pills) and y458.5 (above promo) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[calc(50%_+_1.11px)] top-[178.67px] h-[279.83px] w-[2.5px] -translate-x-1/2"
        >
          <svg
            viewBox="0 0 2.5 279.83"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.25"
              y1="0"
              x2="1.25"
              y2="279.83"
              stroke="url(#mobile-line-93-grad)"
              strokeWidth="2.5"
            />
            <defs>
              <linearGradient
                id="mobile-line-93-grad"
                x1="0"
                y1="0"
                x2="0"
                y2="279.83"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="0.333283" stopColor="white" stopOpacity="0.5" />
                <stop offset="0.429299" stopColor="white" stopOpacity="1" />
                <stop offset="0.570284" stopColor="white" stopOpacity="0.5" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Line Container shine (Figma 2667:8259) — native 90×509 art anchored to divider and spreading right into With Euler */}
        <Image
          src="/assets/compare/line-shine.svg"
          alt=""
          width={90}
          height={509}
          aria-hidden
          className="pointer-events-none absolute left-[calc(50%_+_0.11px)] top-[-7px] h-[509px] w-[90px] object-fill"
        />

        {/* Neo promo — (20, 459) 353×133, r8, p16, stacked centered (1:4771) */}
        <div className="pointer-events-auto absolute left-1/2 top-[459px] z-20 flex w-[353px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center gap-[14px] overflow-clip rounded-[8px] p-4">
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
          <div className="relative flex flex-col items-center gap-0.5 text-center">
            <p className="font-outfit text-[18px] font-semibold leading-[1.25] tracking-[-0.27px] text-white">
              {quizTitle}
            </p>
            <p className="text-[12px] font-normal leading-[1.5] text-on-dark-2">
              {quizSubtitle}
            </p>
          </div>
          <Button
            variant="dark"
            arrow="white"
            className="relative pointer-events-auto cursor-pointer"
            onClick={() => setIsCompareOpen(true)}
          >
            {quizCtaLabel}
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
          <Eyebrow label={eyebrow} dark />
          <h2 className="text-center font-display text-[42px] font-semibold leading-[50px] tracking-[-0.84px] text-white">
            {title}
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
        <div className="absolute left-0 top-0 flex w-max h-[220px] gap-[42px] animate-marquee [--marquee-gap:42px]">
          {/* First set of cards */}
          {currentWithout.map((c, i) => (
            <DeskCardView key={`w1-${i}`} c={c} tone="black" chip="red" />
          ))}
          {/* Duplicated set for infinite marquee */}
          {currentWithout.map((c, i) => (
            <DeskCardView key={`w2-${i}`} c={c} tone="black" chip="red" />
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 top-[371px] hidden h-[220px] w-1/2 overflow-clip lg:block group">
        <div ref={(el) => { rightTracks.current[1] = el; }} className="absolute left-0 top-0 flex w-max h-[220px] gap-[42px] animate-marquee [--marquee-gap:42px]">
          {/* First set of cards */}
          {currentWith.map((c, i) => (
            <DeskCardView key={`w1-${i}`} c={c} tone="glass" chip="green" />
          ))}
          {/* Duplicated set for infinite marquee */}
          {currentWith.map((c, i) => (
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

        {/* Quiz promo banner — adaptive width with justify-between so longer subtitles and CTA buttons never clip */}
        <div className="pointer-events-auto absolute left-1/2 top-[464.43px] z-20 flex min-h-[91px] h-auto w-[calc(100%-48px)] max-w-[880px] min-[1440px]:max-w-[920px] -translate-x-1/2 items-center justify-between gap-6 overflow-hidden rounded-[16px] p-5 shadow-lg">
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
            sizes="920px"
            aria-hidden
            className="object-cover opacity-20"
          />
          <div className="relative flex min-w-0 flex-1 flex-col gap-1.5">
            <p className="font-outfit text-[20px] font-semibold leading-[1.25] tracking-[-0.3px] text-white">
              {quizTitle}
            </p>
            <p className="text-[13px] font-normal leading-[1.5] text-on-dark-2">
              {quizSubtitle}
            </p>
          </div>
          <Button
            variant="dark"
            arrow="white"
            className="relative pointer-events-auto cursor-pointer shrink-0 whitespace-nowrap"
            onClick={() => setIsCompareOpen(true)}
          >
            {quizCtaLabel}
          </Button>
        </div>
      </div>

      {/* Compare Modal */}
      <VehicleCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </section>
  );
}

/** Desktop card — 291.776×220, r18, p24 (Figma 1:1521–1:1582). Photo cards all
    follow the same Figma spec: padding 24 · column · justify-end · items-start ·
    gap 18, with a uniform 85.086×82 photo frame; icon cards keep their chip at
    the top (justify-between) per Figma 1:1553 */
function DeskCardView({ c, tone, chip }: { c: DeskCard; tone: "black" | "glass"; chip: "red" | "green" }) {
  const isMediaCard = Boolean(c.image || c.photo);
  return (
    <div
      className={`flex h-[220px] w-[291.776px] shrink-0 flex-col justify-between rounded-[18px] p-6 ${
        tone === "black" ? "bg-black" : "bg-white/[0.08]"
      }`}
    >
      {/* Top slot (Figma: y=24 to y=112): height 88px */}
      <div className="flex h-[88px] w-full items-end justify-start">
        {!isMediaCard && c.icon && (
          <span
            className={`self-start flex size-[52px] items-center justify-center rounded-[12px] text-white ${
              chip === "red" ? "bg-chip-red/20" : "bg-chip-green/20"
            }`}
          >
            <CompareIconView icon={c.icon} className="size-7" />
          </span>
        )}
        {c.image && (
          <div
            className={`relative flex h-[82px] w-[85.086px] shrink-0 items-end overflow-hidden ${
              tone === "black" ? "opacity-80" : ""
            }`}
          >
            <Image
              src={c.image}
              alt=""
              width={86}
              height={82}
              className="max-h-[82px] max-w-[85.086px] object-contain object-left-bottom"
            />
          </div>
        )}
        {c.photo && !c.image && (
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
      </div>

      {/* Bottom text slot (Figma: y=130 to y=196): fixed start at y=130 */}
      <div className="flex min-h-[66px] w-[243.776px] items-start">
        <p className="w-full whitespace-pre-line text-[24px] font-bold leading-[32px] text-white">
          {c.text}
        </p>
      </div>
    </div>
  );
}

/** Mobile card (Figma 1:4706/1:4730): 136×102 · r12 · p-[11.273] · gap 7.515 ·
    Manrope Bold 12 text. Without = flat black; With = white/8 + GLASS rim
    (glass-rim-card). Chips: 34px red chip (Without) · 39.455px solid
    #6fcf97 (With); photo window 33.204×32 reusing the sprite crops (%) */
function MobileCardView({ c, tone, chip }: { c: DeskCard; tone: "black" | "glass"; chip: "red" | "green" }) {
  const isMediaCard = Boolean(c.image || c.photo);
  return (
    <div
      className={`flex h-[102px] w-[136px] shrink-0 flex-col justify-between rounded-[12px] p-[11.273px] ${
        tone === "black" ? "bg-black" : "glass-rim-card bg-white/[0.08]"
      }`}
    >
      {/* Top slot */}
      <div className="flex h-[36px] w-full items-end justify-start">
        {!isMediaCard && c.icon && (
          <span
            className={`self-start flex items-center justify-center text-white ${
              chip === "red" ? "size-[32px] rounded-[7.515px] bg-chip-red/20" : "size-[36px] rounded-[7.515px] bg-chip-green/20"
            }`}
          >
            <CompareIconView
              icon={c.icon}
              className={chip === "red" ? "size-5" : "size-[20px]"}
            />
          </span>
        )}
        {c.image && (
          <div
            className={`relative flex h-[32px] w-[33.204px] shrink-0 items-end overflow-hidden ${
              tone === "black" ? "opacity-80" : ""
            }`}
          >
            <Image
              src={c.image}
              alt=""
              width={34}
              height={32}
              className="max-h-[32px] max-w-[33.204px] object-contain object-left-bottom"
            />
          </div>
        )}
        {c.photo && !c.image && (
          <span className="relative block h-[32px] w-[33.204px] shrink-0 overflow-hidden">
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
      </div>

      {/* Bottom text slot */}
      <div className="flex min-h-[30px] w-full items-start">
        <p className="whitespace-pre-line font-sans text-[12px] font-bold leading-[15px] text-white">
          {c.text}
        </p>
      </div>
    </div>
  );
}
