import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const A = "/assets/technology-page";

/** TECHNOLOGY page — "Load / Rated with weight on it." (Figma 3019:11885, 393×601). */
export default function TechLoad() {
  return (
    <section
      className="bg-[#041231] bg-[linear-gradient(180deg,#041231_0%,#0c3797_100%)]"
      aria-label="Load"
    >
      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center justify-center gap-6 px-5 py-[35px]">
        <div className="relative flex h-[488px] w-full shrink-0 flex-col items-center justify-end gap-[10px] overflow-clip rounded-[12px] border border-white/20 px-3 pb-3 pt-[252px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px]">
            <div className="absolute inset-0 overflow-hidden rounded-[12px]">
              <img src={`${A}/load__imgFrame1984081153.png`} alt="" className="absolute left-[-0.05%] top-[-10.55%] h-[85.66%] w-[100.1%] max-w-none" />
            </div>
            <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent from-[53.37%] to-black to-[73.84%]" />
          </div>

          <div className="relative flex w-full shrink-0 flex-col items-start gap-3 overflow-clip">
            <Eyebrow label="Load" dark />
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
              Rated with weight on it.
            </h2>
            <p className="w-full font-sans text-[12px] font-normal leading-normal text-white">
              Payload, range and gradient are quoted
              <br />
              loaded. Empty numbers help nobody.
            </p>
          </div>

          <div className="relative flex w-full shrink-0 flex-col items-start overflow-clip rounded-[8px] border border-white/25 bg-[rgba(255,255,255,0.04)] p-3">
            <div className="flex w-full items-center gap-[10px] leading-[1.15] text-white">
              <p className="shrink-0 font-display text-[36px] font-semibold tracking-[-0.72px]">1,500</p>
              <p className="shrink-0 font-display text-[14px] tracking-[-0.28px]">kg payload, rated</p>
            </div>
          </div>
        </div>

        <PagerBar />
      </div>
    </section>
  );
}
