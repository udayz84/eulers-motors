import Image from "next/image";

type Stat = { value: string; unit?: string; label: string };

/** Figma 1:1385 "Banner image" stats: Archia 44.167 numbers · Manrope Bold 22 labels */
const STATS: Stat[] = [
  { value: "15,000+", label: "Trucks delivered" },
  { value: "480", unit: "M", label: "Kilometres driven" },
  { value: "96.4%", label: "Trucks up & running" },
  { value: "112+", label: "Dealers & service" },
  { value: "08", unit: "yrs", label: "Battery warranty" },
];

function StatValue({ value, unit }: { value: string; unit?: string }) {
  return (
    <span className="whitespace-nowrap font-display text-[40px] font-semibold leading-[1.15] tracking-[-0.8833px] text-white lg:text-[44.167px]">
      {value}{" "}
      {unit && (
        <span className="text-[22px] font-bold font-sans leading-[1.15]">{unit}</span>
      )}
    </span>
  );
}

/**
 * Dark stats band (desktop 1:1317 top · mobile 1:4542).
 * Desktop: single row with rotated hairline dividers + concentric-circle art.
 * Mobile: 2×2 + 1 grid of glass cards (162×115, r-16.8).
 */
export default function StatsBanner() {
  return (
    <section className="relative overflow-clip bg-deep" aria-label="Euler Motors in numbers">
      {/* background stack (Figma 1:1384, bottom → top): brand gradient + photo @20%,
          both covered by the solid #041231 layer — the band renders flat deep */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(219.98deg, rgb(14,47,109) 138.16%, rgb(29,111,255) 87.019%), linear-gradient(90deg, rgb(255,255,255) 0%, rgb(255,255,255) 100%)",
          }}
        />
        <Image
          src="/assets/products/banner-img.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#041231]" />
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

      <div className="relative flex flex-col items-center gap-[14px] px-[33px] py-6 lg:py-[42px]">
        {/* mobile grid: rows of two cards with hairline dividers, last card centered */}
        <div className="flex w-full flex-col gap-[14px] lg:hidden">
          {[
            [STATS[0], STATS[1]],
            [STATS[2], STATS[3]],
          ].map((row, ri) => (
            <div key={ri} className="flex items-center gap-3">
              <MobileCard stat={row[0]} />
              <span aria-hidden className="h-[43px] w-px shrink-0 bg-white/40" />
              <MobileCard stat={row[1]} />
            </div>
          ))}
          <div className="flex justify-center">
            <MobileCard stat={STATS[4]} />
          </div>
        </div>

        {/* desktop row */}
        <div className="hidden w-[1322px] items-center gap-6 lg:flex">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center gap-5 overflow-clip rounded-[24px] px-[2px] py-8">
                <StatValue value={stat.value} unit={stat.unit} />
                <p className="text-center text-[22px] font-bold leading-normal text-white">
                  {stat.label}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <Image
                  src="/assets/products/stat-divider.svg"
                  alt=""
                  width={62}
                  height={1}
                  aria-hidden
                  className="h-px w-[62px] shrink-0 rotate-90"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCard({ stat }: { stat: Stat }) {
  return (
    <div className="flex h-[115px] w-[162px] flex-col items-center justify-center gap-[2.8px] rounded-[16.8px] border border-white/10 bg-white/5 px-[1.4px] py-3 backdrop-blur-sm">
      <StatValue value={stat.value} unit={stat.unit} />
      <p className="text-center text-[16px] font-bold leading-none text-white">{stat.label}</p>
    </div>
  );
}
