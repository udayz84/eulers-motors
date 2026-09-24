import { Fragment } from "react";
import Image from "next/image";

type Stat = {
  value: string;
  unit?: string;
  /** mobile node 1:4542 renders "+" / "%" as small Manrope units; desktop keeps them in the number */
  valueMobile?: string;
  unitMobile?: string;
  label: string;
};

/** Figma 1:1385 desktop stats: Archia 44.167 numbers · Manrope Bold 22 units/labels
 *  Figma 1:4542 mobile stats: Archia 40 numbers · Manrope Bold 16 units/labels */
const STATS: Stat[] = [
  { value: "15,000+", valueMobile: "15,000", unitMobile: "+", label: "Trucks delivered" },
  { value: "480", unit: "M", label: "Kilometres driven" },
  { value: "96.4%", valueMobile: "96.4", unitMobile: "%", label: "Trucks up & running" },
  { value: "112+", label: "Dealers & service" },
  { value: "08", unit: "yrs", label: "Battery warranty" },
];

function StatValue({ value, unit }: { value: string; unit?: string }) {
  return (
    <span className="whitespace-nowrap font-display text-[40px] font-semibold leading-[1.15] tracking-[-0.78px] text-white lg:text-[44.167px] lg:tracking-[-0.8833px]">
      {value}{" "}
      {unit && (
        <span className="text-[16px] font-bold font-sans leading-[1.15] lg:text-[22px]">{unit}</span>
      )}
    </span>
  );
}

/**
 * Dark stats band — desktop 1:1384/1:1385 · mobile 1:4542.
 * Rebuilt from the Figma structure: the section itself is one flat solid
 * #041231 (the file's gradient + photo layers sit fully under a solid fill
 * and contribute nothing). Decorative rings/glows are SVG layers above it.
 * Desktop: 1322 row (gap-24 around zero-width divider slots → 48px between
 * the five 226×167 r24 cells), cells justify-center py-32 gap-20,
 * value 44.167×1.15 + label 22 → 42/42 padding = 251 band.
 */
export default function StatsBanner() {
  return (
    <section className="relative z-10 -mt-[6px] overflow-clip bg-[#041231]" aria-label="Euler Motors in numbers">
      {/* mobile glows (Figma 1:4543/1:4544 — Ellipse 3426 white · 3427 blue):
          438.233×325.137 and 602.244×446.821, anchored left calc(50% + 23.84px),
          tops 347.23 / 365.55 — clipped by the band so light rises off the bottom edge */}
      <div
        aria-hidden
        className="absolute left-[calc(50%_+_23.84px)] top-[347.23px] h-[325.137px] w-[438.233px] -translate-x-1/2 lg:hidden"
      >
        <div className="absolute inset-[-36.11%_-26.79%]">
          <Image
            src="/assets/mobile/stats-ellipse-1.svg"
            alt=""
            fill
            sizes="674px"
            className="pointer-events-none"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute left-[calc(50%_+_23.84px)] top-[365.55px] h-[446.821px] w-[602.244px] -translate-x-1/2 lg:hidden"
      >
        <div className="absolute inset-[-26.27%_-19.49%]">
          <Image
            src="/assets/mobile/stats-ellipse-2.svg"
            alt=""
            fill
            sizes="837px"
            className="pointer-events-none"
          />
        </div>
      </div>

      {/* concentric rings — 1335.635² at (-423.63, -484.38), svg inset -1.73% (Figma 1:1435) */}
      <div aria-hidden className="absolute -right-[423.63px] -top-[484.38px] hidden size-[1335.635px] lg:block">
        <div className="absolute inset-[-1.73%]">
          <Image src="/assets/products/concentric.svg" alt="" fill sizes="1382px" className="pointer-events-none" />
        </div>
      </div>
      {/* ellipse glows (Figma 1:1440/1:1441) */}
      <div aria-hidden className="absolute left-1/2 top-[269px] hidden h-[197.726px] w-[1014.71px] -translate-x-1/2 lg:block">
        <div className="absolute inset-[-107.22%_-20.89%]">
          <Image src="/assets/products/ellipse-1.svg" alt="" fill sizes="1439px" className="pointer-events-none" />
        </div>
      </div>
      <div aria-hidden className="absolute left-1/2 top-[195px] hidden h-[271.726px] w-[1394.471px] -translate-x-1/2 lg:block">
        <div className="absolute inset-[-78.02%_-15.2%]">
          <Image src="/assets/products/ellipse-2.svg" alt="" fill sizes="1818px" className="pointer-events-none" />
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[14px] px-5 py-6 lg:justify-center lg:px-[60px] lg:py-[42px]">
        {/* mobile grid: centered rows of two flat stat cells split by hairlines, last cell alone */}
        <div className="flex w-full flex-col gap-[14px] lg:hidden">
          {[
            [STATS[0], STATS[1]],
            [STATS[2], STATS[3]],
          ].map((row, ri) => (
            <div key={ri} className="flex h-[115px] items-center justify-center gap-3">
              <MobileCard stat={row[0]} />
              <MobileDivider />
              <MobileCard stat={row[1]} />
            </div>
          ))}
          <div className="flex h-[115px] justify-center">
            <MobileCard stat={STATS[4]} />
          </div>
        </div>

        {/* desktop row — Figma 1:1385: 1322 wide, gap-24 around zero-width divider
            slots yields 48px between the five flex-1 (226 @ 1440) cells; the row's
            items-center puts each 62px divider's center at 52.5 of the 167 cells */}
        <div className="hidden w-full items-center gap-6 lg:flex">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              <div className="flex h-[167px] flex-1 flex-col items-center justify-center gap-5 overflow-clip rounded-[24px] px-[2px] py-8">
                <StatValue value={stat.value} unit={stat.unit} />
                <p className="font-sans text-center text-[22px] font-bold leading-[normal] text-white min-[1366px]:whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
              {i < STATS.length - 1 && <DesktopDivider />}
            </Fragment>
          ))}
        </div>
      </div>

      {/* mobile rings (Figma 1:4599) — 723.542² at right -384.58 / top 46.58,
          painted above the content like the Figma layer order; clipped at the right edge */}
      <div aria-hidden className="absolute -right-[384.58px] top-[46.58px] size-[723.542px] lg:hidden">
        <div className="absolute inset-[-1.73%]">
          <Image
            src="/assets/mobile/stats-concentric.svg"
            alt=""
            fill
            sizes="749px"
            className="pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

function MobileCard({ stat }: { stat: Stat }) {
  return (
    <div className="flex h-[115px] w-[162px] flex-col items-center justify-center gap-[2.8px] overflow-clip rounded-[16.8px] px-[1.4px] py-3">
      <StatValue value={stat.valueMobile ?? stat.value} unit={stat.unitMobile ?? stat.unit} />
      {/* 15px (Figma 16): at ≤393px viewports the two cards squeeze to ~152px and
          the 16px "Trucks up & running" wraps — 15px keeps every label one line */}
      <p className="text-center text-[15px] font-bold leading-normal text-white">{stat.label}</p>
    </div>
  );
}

/** desktop hairline — Line 86 (62×1) rotated 90° inside a zero-width slot
 *  (Figma 1:1395 `w-0`); row items-center → line center lands at y 52.5 */
function DesktopDivider() {
  return (
    <span aria-hidden className="flex h-[62px] w-0 shrink-0 items-center justify-center">
      <Image
        src="/assets/products/stat-divider.svg"
        alt=""
        width={62}
        height={1}
        className="h-px w-[62px] max-w-none rotate-90"
      />
    </span>
  );
}

/** mobile hairline — Line 86 (43.4×0.7, white @40%) rotated 90° in a zero-width slot */
function MobileDivider() {
  return (
    <span aria-hidden className="flex h-[43.4px] w-0 shrink-0 items-center justify-center">
      <Image
        src="/assets/mobile/stats-divider.svg"
        alt=""
        width={44}
        height={1}
        className="h-[0.7px] w-[43.4px] max-w-none rotate-90"
      />
    </span>
  );
}
