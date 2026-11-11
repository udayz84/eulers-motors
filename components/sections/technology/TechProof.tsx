import { Fragment } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { StrapiStat, StrapiTechnologyProofSection } from "@/types/strapi";

const A = "/assets/technology-page";

export interface TechProofProps {
  data?: StrapiTechnologyProofSection;
}

/** TECHNOLOGY page — "Proof / Why businesses trust Euler." (Figma 2991:13086, 393×396). */
const PROOF_BACKGROUND =
  "linear-gradient(180deg, #041231 0%, #041231 45%, rgba(4, 18, 49, 0) 100%), linear-gradient(0deg, rgba(29, 111, 255, 0.55) -20%, rgba(14, 47, 109, 0) 55%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #FFF";

export default function TechProof({ data }: TechProofProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const stats = data?.stats || [];

  const mobilePairs: StrapiStat[][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    mobilePairs.push(stats.slice(i, i + 2));
  }

  return (
    <section className="relative overflow-clip bg-[#041231]" style={{ background: PROOF_BACKGROUND }} aria-label={eyebrow || "Proof"}>
      {/* Desktop & Tablet view */}
      <div
        className="relative mx-auto hidden h-[340px] w-full max-w-[1440px] overflow-clip md:block lg:h-[359px]"
        style={{ background: "transparent" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[423.63px] -top-[484.67px] h-[1381.96px] w-[1381.96px]">
            <img src={`${A}/proof-rings.svg`} alt="" width="1381.96" height="1381.96" className="absolute -left-[23.16px] -top-[23.16px] max-w-none" />
          </div>
          <div className="absolute left-1/2 top-[254.71px] h-[906.379px] w-[2899.52px] -translate-x-1/2">
            <img src={`${A}/proof-glow.svg`} alt="" width="2899.52" height="906.379" className="absolute left-0 top-0 max-w-none" />
          </div>
        </div>
        <div className="absolute left-1/2 top-[40px] flex max-w-[480px] -translate-x-1/2 flex-col items-center justify-center gap-3 md:top-[44px] lg:top-[50.53px] lg:gap-4">
          {eyebrow && (
            <div className="relative flex items-center gap-[6px]">
              <img src={`${A}/proof-mark.svg`} alt="" width="146.405" height="20.3555" className="absolute left-[3.43px] top-0 max-w-none" />
              <img src={`${A}/proof-mark-small.svg`} alt="" width="18.2171" height="20.3555" className="relative max-w-none" />
              <span className="relative whitespace-nowrap font-sans text-[14px] font-bold uppercase tracking-[0.7px] text-white">{eyebrow}</span>
            </div>
          )}
          {title && (
            <h2 className="whitespace-nowrap font-display text-[30px] font-semibold leading-[normal] tracking-[-0.6px] text-white md:text-[36px] md:tracking-[-0.72px] lg:text-[42px] lg:tracking-[-0.84px]">
              {title}
            </h2>
          )}
        </div>
        {stats.length > 0 && (
          <div className="absolute inset-x-6 top-[150px] mx-auto flex max-w-[1322px] items-center gap-3 md:inset-x-10 md:top-[160px] md:gap-4 lg:inset-x-20 lg:top-[177.88px] lg:gap-6">
            {stats.map((stat, i) => {
              const unit = stat.unit || "";
              const tightUnit = unit === "%" || unit === "+";
              return (
                <Fragment key={stat.id ?? `${stat.label}-${i}`}>
                  <div className="flex h-[150px] flex-1 flex-col items-center justify-center gap-3 overflow-clip rounded-3xl px-[2px] py-4 md:h-[167px] md:gap-5 md:py-8">
                    <p className="whitespace-nowrap text-center font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white md:text-[38px] md:tracking-[-0.76px] lg:text-[44.167px] lg:tracking-[-0.8833px]">
                      {stat.value}
                      {tightUnit && unit}
                      {unit && !tightUnit && <span className="font-sans text-[18px] font-bold md:text-[22px]"> {unit}</span>}
                    </p>
                    <p className="w-full text-center font-sans text-[15px] font-bold leading-normal text-white md:text-[18px] lg:text-[22px]">
                      {stat.label}
                    </p>
                  </div>
                  {i < stats.length - 1 && (
                    <span aria-hidden="true" className="flex h-[50px] w-0 shrink-0 items-center justify-center md:h-[62px]">
                      <img src={`${A}/proof-divider.svg`} alt="" width="62" height="1" className="h-px w-[62px] max-w-none rotate-90" />
                    </span>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile view */}
      <div className="relative mx-auto min-h-[396px] w-full max-w-[480px] overflow-clip md:hidden">
        <div className="absolute right-[-384.58px] top-[46.58px] size-[723.542px]">
          <img src={`${A}/proof__imgFrame1618873618.svg`} alt="" className="absolute inset-[-1.73%] size-full max-w-none" />
        </div>

        <div className="relative flex flex-col items-start gap-[10px] px-[33px] py-6">
          <div className="flex min-h-[94px] w-full flex-col items-center justify-between gap-2">
            {eyebrow && <Eyebrow label={eyebrow} dark />}
            {title && (
              <h2 className="w-[272.955px] text-center font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
                {title}
              </h2>
            )}
          </div>

          {mobilePairs.length > 0 && (
            <div className="flex w-full flex-col items-center justify-center gap-[14px]">
              {mobilePairs.map((pair, idx) => (
                <StatRow key={idx} a={pair[0]} b={pair[1]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatRow({ a, b }: { a: StrapiStat; b?: StrapiStat }) {
  return (
    <div className="flex h-[115px] w-full items-center justify-center gap-3">
      <Stat stat={a} />
      {b && (
        <>
          <div aria-hidden="true" className="h-[43.4px] w-[0.7px] shrink-0 bg-[rgba(255,255,255,0.40)]" />
          <Stat stat={b} />
        </>
      )}
    </div>
  );
}

function Stat({ stat }: { stat: StrapiStat }) {
  const unit = stat.unit || "";
  const isM = unit === "M";
  const track = unit ? "-0.784px" : "-0.8px";

  return (
    <div className="flex h-full w-[162px] shrink-0 flex-col items-center justify-center gap-[2.8px] overflow-clip rounded-[16.8px] px-[1.4px] py-3">
      <p
        className="whitespace-nowrap text-center font-display font-semibold leading-[1.15] text-white"
        style={{ letterSpacing: track }}
      >
        <span className="text-[40px]">{stat.value}</span>
        {unit && <span style={{ fontSize: isM || unit === "%" ? "39.2px" : "30.917px" }}>{" "}</span>}
        {unit && <span className="font-sans text-[16px] font-bold">{unit}</span>}
      </p>
      <p className="w-full text-center text-[16px] font-bold leading-normal text-white">{stat.label}</p>
    </div>
  );
}
