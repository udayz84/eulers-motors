import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

const PROBLEM_GRADIENT =
  "linear-gradient(260.845deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";
const EULER_GRADIENT =
  "linear-gradient(-78.921deg, rgb(14,47,109) 63.511%, rgb(29,111,255) 87.226%), linear-gradient(258.187deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";

const CARDS = [
  {
    label: "Dust",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "199.98%", left: "-11.42%", top: "-10.38%", width: "289.09%" },
    problem: "Dust gets into everything and kills electronics.",
    euler: "The battery box and motor are sealed to IP67. Dust stays outside.",
  },
  {
    label: "Rain",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "220.88%", left: "-115.98%", top: "-26.52%", width: "319.31%" },
    problem: "Flooded roads stop work for days every monsoon.",
    euler: "The pack is water sealed and the floor is raised. You keep running.",
  },
  {
    label: "Heavy loads",
    pill: `${A}/indian__imgRectangle1618873353.svg`,
    pillW: 180.892,
    crop: { height: "267.05%", left: "-44.54%", top: "-150.74%", width: "289.09%" },
    problem: "Overloading is normal, and it breaks lighter vehicles.",
    euler: "A steel frame rated well past the load on the paperwork.",
  },
  {
    label: "Daily use",
    pill: `${A}/indian__imgRectangle1618873355.svg`,
    pillW: 160.892,
    crop: { height: "223.93%", left: "-171.77%", top: "-123.93%", width: "323.72%" },
    problem: "Two shifts a day wears a vehicle out fast.",
    euler: "Tested to 200,000 km. Service every 10,000, not every month.",
  },
  {
    label: "Heat",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "199.98%", left: "-208.51%", top: "-14.64%", width: "308.51%" },
    problem: "Forty five degrees drains a battery and shortens its life.",
    euler: "Liquid cooling holds the pack in its safe range all summer.",
  },
];

const QUADRUPLED_CARDS = [...CARDS, ...CARDS, ...CARDS, ...CARDS];

function IndianRoadCard({ c }: { c: (typeof CARDS)[number] }) {
  return (
    <article className="relative h-[254px] w-[320px] sm:w-[353px] shrink-0 snap-center">
      {/* Tab Header with Icon & Label */}
      <div className="absolute left-[19.5px] top-[6.18px] flex items-center gap-2">
        <div
          className="absolute left-[-13px] top-[-5.53px] h-[48.328px]"
          style={{ width: c.pillW }}
        >
          <img
            src={c.pill}
            alt=""
            className="absolute inset-0 size-full max-w-none"
          />
        </div>
        <div className="relative h-[25.095px] w-[26.039px] shrink-0 overflow-hidden">
          <img
            src={`${A}/indian__imgChatGptImage.png`}
            alt=""
            className="absolute max-w-none"
            style={c.crop}
          />
        </div>
        <p className="relative whitespace-nowrap text-[18px] sm:text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">
          {c.label}
        </p>
      </div>

      {/* Card Body */}
      <div className="absolute left-0 top-[34.31px] flex h-[220px] w-full flex-col items-start gap-4 rounded-[10px] bg-white p-4 shadow-sm">
        <div className="flex w-full flex-col items-start gap-2">
          <p
            className="bg-clip-text text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent"
            style={{ backgroundImage: PROBLEM_GRADIENT }}
          >
            The problem
          </p>
          <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink">
            {c.problem}
          </p>
        </div>

        <div className="relative h-0 w-full">
          <img
            src={`${A}/indian__imgLine110.svg`}
            alt=""
            className="absolute inset-[-1px_0_0_0] block size-full max-w-none"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <p
            className="bg-clip-text text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent"
            style={{ backgroundImage: EULER_GRADIENT }}
          >
            What Euler does
          </p>
          <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink">
            {c.euler}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * TECHNOLOGY page — "Built for Indian roads." banner (Figma 2990:12839, 393×442).
 * Mobile: manual touch swipeable snap carousel (no auto-sliding).
 * Desktop: continuous, smooth GPU-accelerated infinite marquee.
 */
export default function TechIndianRoads() {
  return (
    <section className="overflow-x-clip bg-[#d4dbec] py-10 md:py-12 lg:py-16" aria-label="Built for Indian roads">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-5 pb-8 text-center md:pb-10 lg:pb-12">
        <div className="flex max-w-[700px] flex-col items-center gap-3 md:gap-4">
          <Eyebrow label="Built for here" />
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink sm:text-[36px] sm:tracking-[-0.72px] md:text-[44px] md:tracking-[-0.88px] lg:text-[52px] lg:tracking-[-1.04px]">
            Built for Indian roads.
          </h2>
          <p className="font-sans text-[13px] leading-normal text-ink sm:text-[14px] md:text-[15px] lg:text-[16px]">
            From busy city streets to uneven roads and heavy loads, every detail is built to perform.
          </p>
        </div>
      </div>

      {/* Mobile Track: Manual touch snap scroll (not auto-sliding) */}
      <div className="relative w-full overflow-hidden md:hidden">
        <div
          className="no-scrollbar flex w-full gap-4 overflow-x-auto px-5 pb-2 snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {CARDS.map((c) => (
            <IndianRoadCard key={c.label} c={c} />
          ))}
          <div aria-hidden className="shrink-0 w-1" />
        </div>
      </div>

      {/* Desktop Track: Continuous infinite auto-sliding marquee */}
      <div className="relative hidden w-full overflow-hidden md:block">
        <div
          className="flex w-max shrink-0 gap-6 animate-marquee [--marquee-gap:24px] will-change-transform"
          style={{ animationDuration: "40s" }}
        >
          {QUADRUPLED_CARDS.map((c, i) => (
            <IndianRoadCard key={`${c.label}-${i}`} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
