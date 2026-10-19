import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

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
    problem: ["Dust gets into everything and kills electronics."],
    euler: ["The battery box and motor are sealed to IP67. Dust", "stays outside."],
  },
  {
    label: "Rain",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "220.88%", left: "-115.98%", top: "-26.52%", width: "319.31%" },
    problem: ["Flooded roads stop work for days every monsoon."],
    euler: ["The pack is water sealed and the floor is raised. You", "keep running."],
  },
  {
    label: "Heavy loads",
    pill: `${A}/indian__imgRectangle1618873353.svg`,
    pillW: 180.892,
    crop: { height: "267.05%", left: "-44.54%", top: "-150.74%", width: "289.09%" },
    problem: ["Overloading is normal, and it breaks lighter vehicles."],
    euler: ["A steel frame rated well past the load on the paperwork."],
  },
  {
    label: "Daily use",
    pill: `${A}/indian__imgRectangle1618873355.svg`,
    pillW: 160.892,
    crop: { height: "223.93%", left: "-171.77%", top: "-123.93%", width: "323.72%" },
    problem: ["Two shifts a day wears a vehicle out fast."],
    euler: ["Tested to 200,000 km. Service every 10,000, not every month."],
  },
  {
    label: "Heat",
    pill: `${A}/indian__imgRectangle1618873354.svg`,
    pillW: 120.892,
    crop: { height: "199.98%", left: "-208.51%", top: "-14.64%", width: "308.51%" },
    problem: ["Forty five degrees drains a battery and shortens its life."],
    euler: ["Liquid cooling holds the pack in its safe range all summer."],
  },
];

/** TECHNOLOGY page — "Built for Indian roads." banner (Figma 2990:12839, 393×442). */
export default function TechIndianRoads() {
  return (
    <section className="bg-[#d4dbec]" aria-label="Built for Indian roads">
      <div className="mx-auto hidden w-full max-w-[1440px] flex-col items-center justify-center gap-9 px-20 py-[42px] lg:flex">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-[700px] flex-col items-center gap-4">
            <Eyebrow label="Built for here" />
            <h2 className="whitespace-nowrap text-center font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink">
              Built for Indian roads.
            </h2>
          </div>
          <p className="w-[700px] text-center font-sans text-[16px] leading-normal text-ink">
            From busy city streets to uneven roads and heavy loads, every detail is built to perform.
          </p>
        </div>

        <div id="indian-roads-row" className="no-scrollbar flex h-[254px] w-full items-start gap-6 overflow-x-auto">
          {CARDS.map((c) => (
            <article key={c.label} className="relative h-[254px] w-[353px] shrink-0">
              <div className="absolute left-[19.5px] top-[6.18px] flex items-center gap-2">
                <div className="absolute left-[-13px] top-[-5.53px] h-[48.328px]" style={{ width: c.pillW }}>
                  <img src={c.pill} alt="" className="absolute inset-0 size-full max-w-none" />
                </div>
                <div className="relative h-[25.095px] w-[26.039px] shrink-0 overflow-hidden">
                  <img src={`${A}/indian__imgChatGptImage.png`} alt="" className="absolute max-w-none" style={c.crop} />
                </div>
                <p className="relative whitespace-nowrap text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">{c.label}</p>
              </div>
              <div className="absolute left-[-0.5px] top-[34.31px] flex h-[220px] w-[353px] flex-col items-start gap-4 rounded-[10px] bg-white p-4">
                <div className="flex w-full flex-col items-start gap-3">
                  <p className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent" style={{ backgroundImage: PROBLEM_GRADIENT }}>The problem</p>
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink">{c.problem.join(" ")}</p>
                </div>
                <div className="relative h-0 w-full">
                  <img src={`${A}/indian__imgLine110.svg`} alt="" className="absolute inset-[-1px_0_0_0] block size-full max-w-none" />
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <p className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent" style={{ backgroundImage: EULER_GRADIENT }}>What Euler does</p>
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink">{c.euler.join(" ")}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <PagerBar rowId="indian-roads-row" className="bg-white/50 [&>div]:bg-ink" />
      </div>

      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center justify-center gap-8 px-5 py-[42px] lg:hidden">
        <div className="flex w-full flex-col items-start gap-[14px]">
          <Eyebrow label="Built for here" />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink">
            Built for Indian roads.
          </h2>
          <p className="w-[306.73px] font-sans text-[12px] font-normal leading-normal text-ink">
            From busy city streets to uneven roads and heavy loads, every detail is built to
            perform.
          </p>
        </div>

        <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto">
          {CARDS.map((c) => (
            <article key={c.label} className="relative h-[202.13px] w-[353px] shrink-0">
              <div className="absolute left-[19.5px] top-[6.18px] flex items-center gap-2">
                <div className="absolute left-[-13px] top-[-5.53px] h-[48.328px]" style={{ width: c.pillW }}>
                  <img src={c.pill} alt="" className="absolute inset-0 size-full max-w-none" />
                </div>
                <div className="relative h-[17.925px] w-[18.599px] shrink-0">
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <img
                      src={`${A}/indian__imgChatGptImage.png`}
                      alt=""
                      className="absolute left-[-11.42%] top-[-10.38%] h-[199.98%] w-[289.09%] max-w-none"
                    />
                  </div>
                </div>
                <p className="relative whitespace-nowrap text-[20px] font-bold leading-[1.15] tracking-[-0.4px] text-ink">
                  {c.label}
                </p>
              </div>

              <div className="absolute bottom-0 left-[-0.5px] top-[34.31px] flex w-[353px] flex-col items-start gap-3 rounded-[10px] bg-white p-4">
                <div className="flex w-full flex-col items-start gap-3">
                  <p
                    className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent"
                    style={{ backgroundImage: PROBLEM_GRADIENT }}
                  >
                    The problem
                  </p>
                  <p className="text-[12px] font-semibold leading-[1.4] tracking-[-0.24px] text-ink">
                    {c.problem.join(" ")}
                  </p>
                </div>
                <div className="relative h-0 w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img src={`${A}/indian__imgLine110.svg`} alt="" className="block size-full max-w-none" />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <p
                    className="bg-clip-text text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-transparent"
                    style={{ backgroundImage: EULER_GRADIENT }}
                  >
                    What Euler does
                  </p>
                  <p className="text-[12px] font-semibold leading-[1.4] tracking-[-0.24px] text-ink">
                    {c.euler.join(" ")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
