import { Fragment } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

const STATS = [
  { num: "96.4", suffix: "%", space: "39.2px", track: "-0.784px", label: "Fleet uptime" },
  { num: "1,412", suffix: "", space: "", track: "-0.8px", label: "Charging points" },
  { num: "15,000", suffix: "+", space: "30.917px", track: "-0.6183px", label: "Vehicles on the road" },
  { num: "480", suffix: "M", space: "39.2px", track: "-0.784px", label: "Kilometres driven" },
];

/** TECHNOLOGY page — "Proof / Why businesses trust Euler." (Figma 2991:13086, 393×396). */
const PROOF_BACKGROUND =
  "linear-gradient(180deg, #041231 0%, #041231 45%, rgba(4, 18, 49, 0) 100%), linear-gradient(0deg, rgba(29, 111, 255, 0.55) -20%, rgba(14, 47, 109, 0) 55%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #FFF";

export default function TechProof() {
  return (
    <section className="relative overflow-clip bg-[#041231]" style={{ background: PROOF_BACKGROUND }} aria-label="Proof">
      <div
        className="relative mx-auto hidden h-[359px] w-full max-w-[1440px] overflow-clip lg:block"
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
        <div className="absolute left-1/2 top-[50.53px] flex w-[414.434px] -translate-x-1/2 flex-col items-center justify-center gap-4">
          <div className="relative flex items-center gap-[6px]">
            <img src={`${A}/proof-mark.svg`} alt="" width="146.405" height="20.3555" className="absolute left-[3.43px] top-0 max-w-none" />
            <img src={`${A}/proof-mark-small.svg`} alt="" width="18.2171" height="20.3555" className="relative max-w-none" />
            <span className="relative whitespace-nowrap font-sans text-[14px] font-bold uppercase tracking-[0.7px] text-white">Proof</span>
          </div>
          <h2 className="whitespace-nowrap font-display text-[42px] font-semibold leading-[normal] tracking-[-0.84px] text-white">
            Why businesses trust Euler.
          </h2>
        </div>
        <div className="absolute left-1/2 top-[177.88px] flex w-[1322px] -translate-x-1/2 items-center gap-6">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              <div className="flex h-[167px] flex-1 flex-col items-center justify-center gap-5 overflow-clip rounded-3xl px-[2px] py-8">
                <p className="whitespace-nowrap text-center font-display text-[44.167px] font-semibold leading-[1.15] tracking-[-0.8833px] text-white">
                  {stat.num}{stat.suffix === "%" ? "%" : stat.suffix === "+" ? "+" : ""}
                  {stat.suffix === "M" && <span className="font-sans text-[22px] font-bold"> M</span>}
                </p>
                <p className="w-full text-center font-sans text-[22px] font-bold leading-normal text-white">
                  {stat.label}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <span aria-hidden="true" className="flex h-[62px] w-0 shrink-0 items-center justify-center">
                  <img src={`${A}/proof-divider.svg`} alt="" width="62" height="1" className="h-px w-[62px] max-w-none rotate-90" />
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="relative mx-auto h-[396px] w-full max-w-[393px] overflow-clip lg:hidden">
        <div className="absolute right-[-384.58px] top-[46.58px] size-[723.542px]">
          <img src={`${A}/proof__imgFrame1618873618.svg`} alt="" className="absolute inset-[-1.73%] size-full max-w-none" />
        </div>

        <div className="absolute inset-0 flex flex-col items-start gap-[10px] px-[33px] py-6">
          <div className="flex h-[94px] w-full flex-col items-center justify-between">
            <Eyebrow label="Proof" dark />
            <h2 className="w-[272.955px] text-center font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
              Why businesses trust Euler.
            </h2>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[14px]">
            <StatRow a={STATS[0]} b={STATS[1]} />
            <StatRow a={STATS[2]} b={STATS[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({ a, b }: { a: (typeof STATS)[number]; b: (typeof STATS)[number] }) {
  return (
    <div className="flex h-[115px] w-full items-center justify-center gap-3">
      <Stat {...a} />
      <div aria-hidden="true" className="h-[43.4px] w-[0.7px] shrink-0 bg-[rgba(255,255,255,0.40)]" />
      <Stat {...b} />
    </div>
  );
}

function Stat({ num, suffix, space, track, label }: (typeof STATS)[number]) {
  return (
    <div className="flex h-full w-[162px] shrink-0 flex-col items-center justify-center gap-[2.8px] overflow-clip rounded-[16.8px] px-[1.4px] py-3">
      <p
        className="whitespace-nowrap text-center font-display font-semibold leading-[1.15] text-white"
        style={{ letterSpacing: track }}
      >
        <span className="text-[40px]">{num}</span>
        {suffix && <span style={{ fontSize: space }}>{" "}</span>}
        {suffix && <span className="font-sans text-[16px] font-bold">{suffix}</span>}
      </p>
      <p className="w-full text-center text-[16px] font-bold leading-normal text-white">{label}</p>
    </div>
  );
}
