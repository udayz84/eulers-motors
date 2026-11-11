import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";
import { mediaUrl } from "@/lib/strapi/client";
import { StrapiTechnologyShepherdSection } from "@/types/strapi";

const A = "/assets/technology-page";

export interface TechShepherdProps {
  data?: StrapiTechnologyShepherdSection;
}

/** TECHNOLOGY page — "Shepherd app / Manage Everything in One Place" (Figma 3008:10799, 393×663). */
export default function TechShepherd({ data }: TechShepherdProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const appImageUrl = mediaUrl(data?.appImage);
  const primaryCta = data?.cta;
  const secondaryCta = data?.secondaryCta;
  const features = data?.features || [];

  return (
    <section id="technology-app" className="relative bg-[#f3f4f5]" aria-label={eyebrow || "Shepherd app"}>
      {/* Desktop & Tablet view */}
      <div className="relative mx-auto hidden h-[620px] w-full max-w-[1440px] overflow-clip md:block lg:h-[668px] min-[1440px]:px-[80px] min-[1440px]:py-[62px]">
        {appImageUrl && (
          <div className="absolute right-[-40px] top-[-20px] h-[440px] w-[540px] overflow-hidden rounded-lg md:right-0 md:top-[-30px] md:h-[480px] md:w-[580px] lg:left-[calc(25%+336.51px)] lg:top-[-41.75px] lg:h-[529.435px] lg:w-[642.52px]">
            <img
              src={appImageUrl}
              alt={title || "Shepherd app dashboard"}
              className="absolute left-0 top-[-5.82%] h-[105.79%] w-full max-w-none object-cover"
            />
          </div>
        )}
        <div aria-hidden="true" className="absolute left-[20.49px] top-[333.21px] h-[252.152px] w-[1645.513px] bg-[#f3f4f5] blur-[47.1px]" />

        <div className="absolute left-6 top-[60px] flex max-w-[460px] flex-col items-start justify-center gap-3 md:left-10 md:top-[70px] lg:left-[160px] lg:top-[100.85px] lg:max-w-[534px] lg:gap-4 min-[1440px]:left-[80px]">
          {eyebrow && <Eyebrow label={eyebrow} />}
          {title && (
            <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink md:text-[40px] md:tracking-[-0.8px] lg:w-[550px] lg:text-[52px] lg:tracking-[-1.04px]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="max-w-[405.5px] font-sans text-[14px] font-normal leading-normal text-ink md:text-[15px] lg:text-[16px]">
              {subtitle}
            </p>
          )}
          {(primaryCta?.label || secondaryCta?.label) && (
            <div className="flex flex-wrap items-center gap-3">
              {primaryCta?.label && (
                <Link href={primaryCta.href || "/products"} className="flex h-[44px] items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-4 hover:bg-white transition-colors md:h-[50.477px] md:px-6">
                  <span className="whitespace-nowrap font-display text-[14px] font-semibold leading-none text-ink md:text-[16px]">
                    {primaryCta.label}
                  </span>
                  <span className="flex size-5 shrink-0 items-center justify-center md:size-6">
                    <img src={`${A}/shep__imgElements6.svg`} alt="" className="h-[15.1px] w-4 object-contain" />
                  </span>
                </Link>
              )}
              {secondaryCta?.label && (
                <Link href={secondaryCta.href || "/products"} className="flex h-[44px] items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-4 hover:bg-black transition-colors md:h-[50.477px] md:px-6">
                  <span className="whitespace-nowrap font-display text-[14px] font-semibold leading-none text-white md:text-[16px]">
                    {secondaryCta.label}
                  </span>
                  <img src={`${A}/shep__imgContainer.svg`} alt="" className="h-[14px] w-[22px] shrink-0 object-contain" />
                </Link>
              )}
            </div>
          )}
        </div>

        <PagerBar
          rowId="shepherd-features-row"
          className="absolute left-1/2 top-[560px] -translate-x-1/2 bg-[rgba(204,204,204,0.5)] [&>div]:bg-[#121212] lg:top-[593.86px]"
        />
      </div>

      {features.length > 0 && (
        <div
          id="shepherd-features-row"
          className="snap-row absolute left-0 top-[375px] hidden w-full items-center gap-3 md:flex md:top-[385px] lg:top-[418.69px]"
        >
          <div aria-hidden="true" className="shrink-0 min-[1440px]:!w-[max(80px,calc((100vw-1440px)/2+80px))]" style={{ width: "calc(max(16px, (100vw - 1440px) / 2 + 24px))" }} />
          {features.map((feature, idx) => {
            const iconUrl = mediaUrl(feature.icon);
            return (
              <article key={feature.id ?? `${feature.title}-${idx}`} data-carousel-card className="flex h-[138.8px] w-[320px] shrink-0 snap-start flex-col items-start gap-2.5 overflow-clip rounded-lg bg-white p-4 md:w-[360px] md:p-5 lg:w-[420px] lg:gap-3">
                <div className="flex w-full items-center gap-2">
                  {iconUrl && (
                    <div className="flex size-[38px] shrink-0 items-center justify-center rounded-[5.25px] bg-[#eff3f8] p-[6px] md:size-[42px] md:p-[7px]">
                      <img src={iconUrl} alt="" className="size-5 object-contain" />
                    </div>
                  )}
                  <h3 className="whitespace-nowrap font-sans text-[17px] font-bold capitalize leading-normal text-ink md:text-[18px] lg:text-[20px]">
                    {feature.title}
                  </h3>
                </div>
                <p className="pl-9 font-sans text-[13.5px] leading-[1.35] text-[rgba(18,18,18,0.8)] md:pl-10 md:text-[14.5px] lg:text-[16px] lg:leading-[1.4]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[375px] z-[1] hidden h-[138.8px] w-[88px] bg-gradient-to-l from-[#f3f4f5] to-transparent md:block lg:top-[418.69px]" />

      {/* Mobile view */}
      <div className="relative mx-auto h-[663px] w-full max-w-[480px] overflow-clip md:hidden">
        <div className="absolute left-5 right-5 top-[44px] flex max-w-[353px] flex-col items-start gap-[14px]">
          {eyebrow && <Eyebrow label={eyebrow} />}
          {title && (
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="w-[326.035px] font-sans text-[12px] font-normal leading-normal text-ink">
              {subtitle}
            </p>
          )}
        </div>

        <div className="absolute left-[23px] top-[156.5px] size-[350px]">
          {appImageUrl && (
            <div className="absolute left-[-66.82px] top-[20.71px] h-[378.772px] w-[459.675px] overflow-hidden rounded-[8px]">
              <img
                src={appImageUrl}
                alt={title || "Shepherd app dashboard"}
                className="absolute left-0 top-[-5.82%] h-[105.79%] w-full max-w-none object-cover"
              />
            </div>
          )}
          <div aria-hidden className="absolute left-[-581.19px] top-[294.79px] h-[233.914px] w-[1526.493px] bg-[#f3f4f5] blur-[47.1px]" />
        </div>

        {features.length > 0 && (
          <div className="absolute left-0 right-0 top-[466px]">
            <div className="relative">
              <div className="snap-row gap-3 px-5">
                {features.map((f, idx) => {
                  const iconUrl = mediaUrl(f.icon);
                  return (
                    <article key={f.id ?? `${f.title}-${idx}`} data-carousel-card className="flex w-[280px] shrink-0 snap-start flex-col items-start gap-2 overflow-clip rounded-[8px] bg-white p-[14px]">
                      <div className="flex w-full items-center gap-2">
                        {iconUrl && (
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#eff3f8]">
                            <img src={iconUrl} alt="" className="size-5 object-contain" />
                          </div>
                        )}
                        <p className="whitespace-nowrap text-center text-[16px] font-bold capitalize leading-normal text-ink">{f.title}</p>
                      </div>
                      <div className="flex w-full items-center justify-center pl-10">
                        <p className="min-w-px flex-1 text-[12px] leading-[1.4] text-[rgba(18,18,18,0.8)]">{f.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[54px] bg-gradient-to-l from-[#f3f4f5] to-transparent" />
            </div>
          </div>
        )}

        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="absolute left-1/2 top-[585px] flex w-[353px] -translate-x-1/2 items-start gap-2">
            {primaryCta?.label && (
              <Link
                href={primaryCta.href || "/products"}
                className="flex h-11 min-w-px flex-1 items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-4 hover:bg-white transition-colors"
              >
                <span className="whitespace-nowrap font-display text-[12px] font-semibold leading-none text-ink">
                  {primaryCta.label}
                </span>
                <img src={`${A}/shep__imgElements6.svg`} alt="" className="size-4 shrink-0 object-contain" />
              </Link>
            )}
            {secondaryCta?.label && (
              <Link
                href={secondaryCta.href || "/products"}
                className="flex h-11 min-w-px flex-1 items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-4 hover:bg-black transition-colors"
              >
                <span className="whitespace-nowrap font-display text-[12px] font-bold leading-none text-white">
                  {secondaryCta.label}
                </span>
                <img src={`${A}/shep__imgContainer.svg`} alt="" className="h-3 w-[18.857px] shrink-0 object-contain" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
