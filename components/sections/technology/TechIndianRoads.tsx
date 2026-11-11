import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";
import { mediaUrl } from "@/lib/strapi/client";
import { StrapiTechnologyIndianRoadsSection, StrapiTechnologyRoadConditionCard } from "@/types/strapi";

const A = "/assets/technology-page";

const PROBLEM_GRADIENT =
  "linear-gradient(260.845deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";
const EULER_GRADIENT =
  "linear-gradient(-78.921deg, rgb(14,47,109) 63.511%, rgb(29,111,255) 87.226%), linear-gradient(258.187deg, rgb(156,24,24) 46.976%, rgb(249,96,96) 84.878%), linear-gradient(90deg, rgb(18,18,18) 0%, rgb(18,18,18) 100%)";

export interface TechIndianRoadsProps {
  data?: StrapiTechnologyIndianRoadsSection;
}

function IndianRoadCard({
  c,
  problemLabel,
  solutionLabel,
  gradientId,
}: {
  c: StrapiTechnologyRoadConditionCard;
  problemLabel: string;
  solutionLabel: string;
  gradientId: string;
}) {
  const iconUrl = mediaUrl(c.icon);

  return (
    <article className="relative h-[254px] w-[320px] sm:w-[353px] shrink-0 snap-center">
      {/* Auto-sizing slanted Tab Header with Icon & Label */}
      <div className="absolute left-[6.5px] top-[0.65px] inline-flex h-[48.328px] min-w-[120px] items-start pl-[13px] pr-[30px] pt-[5.53px]">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 180 48.3281"
          fill="none"
          className="pointer-events-none absolute inset-0 size-full max-w-none"
        >
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0H142C146.8 0 151.1 2.9 153 7.3L180 48.3281H0V8Z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient id={gradientId} x1="68" y1="7" x2="64" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#CDDFFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative flex items-center gap-2">
          {iconUrl && (
            <img
              src={iconUrl}
              alt=""
              className="relative h-[25.095px] w-[26.039px] shrink-0 object-contain"
            />
          )}
          <p className="relative whitespace-nowrap text-[18px] sm:text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">
            {c.condition}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="absolute left-0 top-[34.31px] flex h-[220px] w-full flex-col items-start gap-4 rounded-[10px] bg-white p-4 shadow-sm">
        <div className="flex w-full flex-col items-start gap-2">
          <p
            className="bg-clip-text text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent min-[1440px]:text-[16px]"
            style={{ backgroundImage: PROBLEM_GRADIENT }}
          >
            {problemLabel}
          </p>
          <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink min-[1440px]:text-[16px]">
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
            className="bg-clip-text text-[15px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent min-[1440px]:text-[16px]"
            style={{ backgroundImage: EULER_GRADIENT }}
          >
            {solutionLabel}
          </p>
          <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink min-[1440px]:text-[16px]">
            {c.solution}
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
export default function TechIndianRoads({ data }: TechIndianRoadsProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const problemLabel = data?.problemLabel || "";
  const solutionLabel = data?.solutionLabel || "";
  const cards = data?.cards || [];
  const quadrupledCards = cards.length > 0 ? [...cards, ...cards, ...cards, ...cards] : [];

  return (
    <section className="overflow-x-clip bg-[#d4dbec] py-10 md:pt-12 md:pb-0 lg:pt-16" aria-label={title || "Built for Indian roads"}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-5 pb-8 text-center md:pb-10 lg:pb-12">
        <div className="flex max-w-[700px] flex-col items-center gap-3 md:gap-4">
          {eyebrow && <Eyebrow label={eyebrow} />}
          {title && (
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink sm:text-[36px] sm:tracking-[-0.72px] md:text-[44px] md:tracking-[-0.88px] lg:text-[44px] lg:tracking-[-0.88px] min-[1440px]:text-[52px] min-[1440px]:tracking-[-1.04px]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-sans text-[13px] leading-normal text-ink sm:text-[14px] md:text-[15px] lg:text-[15px] min-[1440px]:text-[16px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {cards.length > 0 && (
        <>
          {/* Mobile Track: Manual touch snap scroll (not auto-sliding) */}
          <div className="relative w-full overflow-hidden md:hidden">
            <div
              className="no-scrollbar flex w-full gap-4 overflow-x-auto overflow-y-hidden px-5 pb-2 snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {cards.map((c, idx) => (
                <IndianRoadCard
                  key={c.id ?? `${c.condition}-${idx}`}
                  c={c}
                  problemLabel={problemLabel}
                  solutionLabel={solutionLabel}
                  gradientId={`road-tab-mob-${idx}`}
                />
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
              {quadrupledCards.map((c, i) => (
                <IndianRoadCard
                  key={`${c.condition}-${i}`}
                  c={c}
                  problemLabel={problemLabel}
                  solutionLabel={solutionLabel}
                  gradientId={`road-tab-desk-${i}`}
                />
              ))}
            </div>
          </div>
          <div className="hidden justify-center pt-[36px] pb-[42px] md:flex">
            <PagerBar className="rounded-[14.4px] bg-[rgba(255,255,255,0.5)] [&>div]:bg-black" />
          </div>
        </>
      )}
    </section>
  );
}
