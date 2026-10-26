import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const BENEFITS = [
  {
    number: "01",
    title: "Impact & Purpose",
    description:
      "Every vehicle we ship directly helps an independent business operator run better. Real-world physical impact you can witness on the streets.",
    illustration: "impactOne" as const,
  },
  {
    number: "02",
    title: "Growth & Learning",
    description:
      "Work in a fast-evolving domain alongside seasoned leads across battery chemistry, commercial vehicle chassis design, and IoT firmware layers.",
    illustration: "impactTwo" as const,
  },
  {
    number: "03",
    title: "Innovation & Tech",
    description:
      "We build for Indian weather, roads, and high payloads. There was no textbook for what we do — we invent the infrastructure as we scale.",
    illustration: "impactThree" as const,
  },
];

export default function CareerBenefits() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[linear-gradient(180deg,#FFF_18.31%,#D4DBEC_38.3%)] bg-[#FFF] px-5 py-8 lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[max(80px,calc((100vw-1440px)/2+80px))] lg:py-[62px]" aria-labelledby="career-impact-heading">
      <div className="flex flex-col items-start justify-center gap-[14px] self-stretch lg:w-full lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex w-full flex-col gap-[14px] lg:w-[414.43px] lg:shrink-0 lg:gap-4">
          <Eyebrow label="Why work with us" />
          <h2 id="career-impact-heading" className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:w-[646.448px] lg:text-[42px] lg:tracking-[-0.84px]">Engineering Impact, Every Day</h2>
        </div>
        <p className="m-0 self-stretch font-sans text-xs font-normal leading-normal text-ink lg:w-[474.189px] lg:shrink-0 lg:self-auto lg:text-base">
          At Euler Motors, we build commercial vehicles that drive micro-economies forward. Our
          team integrates engineering, software, and real operations to deliver reliability where
          it matters most.
        </p>
      </div>

      <div id="career-benefits-row" className="snap-row -mx-5 w-[calc(100%+40px)] items-center gap-2.5 px-5 lg:m-0 lg:w-full lg:shrink-0 lg:items-center lg:gap-5 lg:overflow-visible lg:p-0">
        {BENEFITS.map((benefit) => (
          <article className="relative flex h-[200px] w-[282px] min-w-[282px] shrink-0 flex-col items-start justify-end gap-5 overflow-hidden rounded-[8px] bg-[#f3f4f5] p-5 pt-[54px] [scroll-snap-align:start] max-lg:first:scroll-ml-5 lg:w-auto lg:min-w-0 lg:flex-1 lg:items-start lg:gap-8 lg:rounded-lg lg:pt-[54px]" key={benefit.number}>
            <span className="absolute top-[9.818px] left-5 bg-[linear-gradient(2deg,rgb(29_111_255_/_0%)_-11.9%,rgb(29_111_255_/_20%)_87.54%)] bg-clip-text font-display text-[42px] font-bold leading-[1.15] tracking-[-0.84px] text-transparent lg:text-[62px] lg:tracking-[-1.24px]">{benefit.number}</span>
            <div
              className={`absolute top-[2.566px] right-[5.139px] h-[68.434px] w-[71.009px] aspect-[71.01/68.43] bg-transparent bg-cover bg-center bg-no-repeat lg:top-[10px] lg:right-[25.073px] lg:h-[76.003px] lg:w-[78.863px] lg:bg-contain ${
                benefit.illustration === "impactOne"
                  ? "bg-[url('/assets/careers/impact-illustration-1.png')]"
                  : benefit.illustration === "impactTwo"
                    ? "bg-[url('/assets/careers/impact-illustration-growth.png')]"
                    : "bg-[url('/assets/careers/impact-illustration-tech.png')]"
              }`}
              data-illustration={benefit.illustration}
            />
            <div className="relative z-[1] flex flex-col gap-5 lg:gap-2">
              <h3 className="m-0 self-stretch font-display text-lg font-bold leading-[1.15] tracking-[-0.36px] text-ink lg:mt-0 lg:text-[26px] lg:leading-[1.4] lg:tracking-[-0.52px]">{benefit.title}</h3>
              <p className="m-0 w-[223.869px] font-sans text-xs font-normal leading-normal text-ink lg:w-[383.635px] lg:text-base lg:leading-[1.4]">{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>

      <PagerBar
        rowId="career-benefits-row"
        className="self-center [&>div]:bg-ink lg:hidden"
        trackStyle={{
          background: "rgba(204, 204, 204, 0.50)",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "14.4px",
        }}
      />
    </section>
  );
}
