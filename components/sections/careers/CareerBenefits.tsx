import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";
import type { StrapiCareerBenefitsSection } from "@/types/strapi";

type CareerBenefitsProps = {
  data?: StrapiCareerBenefitsSection;
};

const ILLUSTRATIONS = [
  "bg-[url('/assets/careers/impact-illustration-1.webp')]",
  "bg-[url('/assets/careers/impact-illustration-growth.webp')]",
  "bg-[url('/assets/careers/impact-illustration-tech.webp')]",
];

export default function CareerBenefits({ data }: CareerBenefitsProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const description = data?.description || "";
  const benefits = data?.benefits || [];

  return (
    <section
      className="flex w-full flex-col items-center justify-center gap-4 overflow-x-hidden bg-[linear-gradient(180deg,#FFF_18.31%,#D4DBEC_38.3%)] bg-[#FFF] py-8 lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[max(40px,calc((100vw-1440px)/2+80px))] xl:px-[max(80px,calc((100vw-1440px)/2+80px))] lg:py-[62px]"
      aria-labelledby="career-impact-heading"
    >
      <div className="flex flex-col items-start justify-center gap-[14px] self-stretch px-5 lg:w-full lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-0">
        <div className="flex w-full flex-col gap-[14px] lg:w-[414.43px] lg:shrink-0 lg:gap-4">
          <Eyebrow label={eyebrow} />
          <h2
            id="career-impact-heading"
            className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:w-[646.448px] lg:text-[42px] lg:tracking-[-0.84px]"
          >
            {title}
          </h2>
        </div>
        <p className="m-0 self-stretch font-sans text-xs font-normal leading-normal text-ink lg:w-[474.189px] lg:shrink-0 lg:self-auto lg:text-base">
          {description}
        </p>
      </div>

      <div
        id="career-benefits-row"
        className="no-scrollbar flex w-full snap-x snap-mandatory scroll-pl-5 items-stretch gap-2.5 overflow-x-auto px-5 lg:m-0 lg:flex lg:w-full lg:shrink-0 lg:items-stretch lg:gap-5 lg:overflow-visible lg:p-0 lg:snap-none lg:scroll-pl-0"
      >
        {benefits.map((benefit, index) => {
          const illustrationClass = ILLUSTRATIONS[index % ILLUSTRATIONS.length];
          return (
            <article
              className="relative flex min-h-[220px] h-auto w-[282px] min-w-[282px] shrink-0 snap-start flex-col items-start justify-start overflow-hidden rounded-[8px] bg-[#f3f4f5] p-5 pt-[72px] lg:min-h-[240px] lg:h-auto lg:w-auto lg:min-w-0 lg:flex-1 lg:items-start lg:rounded-[8px] lg:p-6 lg:pt-[94px]"
              key={benefit.number || index}
            >
              <span className="pointer-events-none select-none absolute top-[9.818px] left-5 bg-[linear-gradient(2deg,rgb(29_111_255_/_0%)_-11.9%,rgb(29_111_255_/_20%)_87.54%)] bg-clip-text font-display text-[42px] font-bold leading-[1.15] tracking-[-0.84px] text-transparent lg:left-6 lg:top-[12px] lg:text-[62px] lg:tracking-[-1.24px]">
                {benefit.number}
              </span>
              <div
                className={`pointer-events-none absolute top-[2.566px] right-[5.139px] h-[68.434px] w-[71.009px] aspect-[71.01/68.43] bg-transparent bg-cover bg-center bg-no-repeat lg:top-[10px] lg:right-[20px] lg:h-[76.003px] lg:w-[78.863px] lg:bg-contain ${illustrationClass}`}
              />
              <div className="relative z-[1] flex w-full min-w-0 flex-1 flex-col justify-start gap-2 lg:gap-3">
                <h3 className="m-0 self-stretch line-clamp-2 font-display text-lg font-bold leading-[1.2] tracking-[-0.36px] text-ink lg:mt-0 lg:bg-[linear-gradient(-54.6deg,#1d6fff_23.58%,#0e2f6d_93.09%)] lg:bg-clip-text lg:text-[26px] lg:leading-[1.3] lg:tracking-[-0.52px] lg:text-transparent lg:min-h-[68px]">
                  {benefit.title}
                </h3>
                <p className="m-0 w-full max-w-[223.869px] font-sans text-xs font-normal leading-normal text-ink lg:max-w-[383.635px] lg:text-base lg:leading-[1.4]">
                  {benefit.description}
                </p>
              </div>
            </article>
          );
        })}
        <div aria-hidden className="w-5 shrink-0 lg:hidden" />
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
