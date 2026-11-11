import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

type Tip = {
  title: string;
  description: string;
  icon: string;
  /** intrinsic size of the sliced icon (for next/image) */
  size: [number, number];
  /** placement inside the Figma icon box (74.709×72 desktop · 64.333×62
      mobile): [left, top, width, height] as % of the box — derived from the
      ChatGPT-image sprite fill crops (nodes 3354:19574…3354:19594) */
  box: [number, number, number, number];
};

/**
 * Preventive advice — Figma desktop 3354:19393 · mobile 2828:11548.
 * Navy→blue washed section with five routine-habit cards.
 * Desktop: continuous looping marquee — two identical sets of 412×250 cards
 * scroll left-to-right forever (seamless loop via the duplicated set),
 * bleeding edge-to-edge on the full-width section.
 * Mobile/tablet: 353×102 icon-left cards stacked in a single list.
 */
const TIPS: Tip[] = [
  {
    title: "Check tyres regularly",
    description: "Maintain recommended PSI for optimal battery range and heavy-load road grip.",
    icon: "/assets/service/preventive/icon-tyres.png",
    size: [303, 207],
    box: [4.9, 19.51, 90.38, 64.07],
  },
  {
    title: "Keep charging healthy",
    description: "Avoid fully draining the battery. Keep state of charge between 20% and 80%.",
    icon: "/assets/service/preventive/icon-charging.png",
    size: [284, 243],
    box: [6.14, 8.81, 88.33, 78.42],
  },
  {
    title: "Follow scheduled service",
    description: "Visit our authorized centres every 10,000 km for proactive check-ups.",
    icon: "/assets/service/preventive/icon-service.png",
    size: [251, 228],
    box: [12.64, 12.85, 74.86, 70.56],
  },
  {
    title: "Watch warning signs",
    description: "Address any critical dashboard errors or thermal alert signs instantly.",
    icon: "/assets/service/preventive/icon-warnings.png",
    size: [262, 233],
    box: [10.94, 14.17, 78.14, 72.11],
  },
  {
    title: "Keep your vehicle clean",
    description: "Keep cooling vents free of heavy mud and delivery highway dust.",
    icon: "/assets/service/preventive/icon-clean.png",
    size: [230, 230],
    box: [16.01, 14.39, 68.6, 71.18],
  },
];

function PreventiveCard({ tip }: { tip: Tip }) {
  return (
    <div
      className="flex min-h-[102px] w-full shrink-0 snap-center flex-row items-center gap-5 rounded-[12px] bg-[rgba(255,255,255,0.08)] p-5 lg:min-h-[250px] lg:w-[412px] lg:flex-col lg:items-start lg:justify-center lg:gap-8 lg:p-8"
    >
      <div className="relative h-[62px] w-[64.333px] shrink-0 lg:h-[72px] lg:w-[74.709px]">
        <Image
          src={tip.icon}
          alt=""
          width={tip.size[0]}
          height={tip.size[1]}
          aria-hidden
          className="absolute max-w-none"
          style={{
            left: `${tip.box[0]}%`,
            top: `${tip.box[1]}%`,
            width: `${tip.box[2]}%`,
            height: `${tip.box[3]}%`,
            objectFit: "fill",
          }}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="font-sans text-[16px] font-bold leading-[22px] text-white lg:font-display lg:text-[26px] lg:font-semibold lg:leading-[30px] lg:tracking-[-0.78px]">
          {tip.title}
        </h3>
        <p className="font-sans text-xs leading-[16px] text-white lg:text-base lg:leading-[22px]">
          {tip.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicePreventiveAdvice() {
  return (
    /* Section frame: mobile 2828:11548 — 31.63px top / 31.19px bottom padding,
       40.18px between header and cards; desktop 3354:19393 — 62px paddings,
       42px gaps. Background `.preventive-bg` (globals.css). */
    <section className="preventive-bg relative isolate w-full flex-col items-center justify-center pt-[31.63px] pb-[31.19px] lg:pt-[62px] lg:pb-[62px]">
      <div className="flex w-full flex-col items-center gap-[40.18px] lg:gap-[42px] px-5 sm:px-8 lg:px-0">
        {/* header — mobile: eyebrow/title/description stack with 14px gaps;
            desktop: eyebrow+title group (16px) then subtitle (24px) */}
        <div className="flex flex-col items-center gap-[14px] lg:gap-6">
          <div className="flex flex-col items-center gap-[14px] lg:gap-4">
            <Eyebrow dark label="Preventive advice" />
            <h2 className="max-w-[273.396px] text-center font-display text-[28px] font-semibold leading-[34px] tracking-[-0.56px] text-white lg:max-w-none lg:text-[42px] lg:leading-[50px] lg:tracking-[-0.84px]">
              Keep your Neo running better
            </h2>
          </div>
          <p className="max-w-[295.766px] text-center font-sans text-xs leading-[16px] text-[#ccc] lg:max-w-[493.137px] lg:text-base lg:leading-[22px] lg:text-white">
            Maximize efficiency and prolong vehicle battery lifespan with simple routine habits.
          </p>
        </div>

        {/* cards — mobile: stacked single list; desktop:
            continuous infinite auto-sliding marquee (4× duplicated set,
            gap-24, snap-center, 40s) — same desktop scroll type as
            TechIndianRoads "Built for here" */}
        <div className="relative w-full overflow-hidden">
          {/* Mobile: stacked single list */}
          <div className="flex flex-col gap-2.5 lg:hidden">
            {TIPS.map((tip) => (
              <PreventiveCard key={tip.title} tip={tip} />
            ))}
          </div>
          {/* Desktop Track: Continuous infinite auto-sliding marquee */}
          <div className="hidden md:block">
            <div
              className="flex w-max shrink-0 gap-6 animate-marquee [--marquee-gap:24px] will-change-transform"
              style={{ animationDuration: "40s" }}
            >
              {[...TIPS, ...TIPS, ...TIPS, ...TIPS].map((tip, i) => (
                <PreventiveCard key={`${i}-${tip.title}`} tip={tip} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
