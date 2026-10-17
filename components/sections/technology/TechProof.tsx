import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

const STATS = [
  { num: "96.4", suffix: "%", space: "39.2px", track: "-0.784px", label: "Fleet uptime" },
  { num: "1,412", suffix: "", space: "", track: "-0.8px", label: "Charging points" },
  { num: "15,000", suffix: "+", space: "30.917px", track: "-0.6183px", label: "Vehicles on the road" },
  { num: "480", suffix: "M", space: "39.2px", track: "-0.784px", label: "Kilometres driven" },
];

/** TECHNOLOGY page — "Proof / Why businesses trust Euler." (Figma 2991:13086, 393×396). */
export default function TechProof() {
  return (
    <section className="bg-[#041231]" aria-label="Proof">
      <div className="relative mx-auto h-[396px] w-full max-w-[393px] overflow-clip">
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
