import { Fragment } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import FloatingWidget from "@/components/FloatingWidget";
import PagerBar from "@/components/ui/PagerBar";
import { mediaUrl } from "@/lib/strapi/client";
import { StrapiTechnologyHero } from "@/types/strapi";

export interface TechHeroProps {
  data?: StrapiTechnologyHero;
  showPhilosophy?: boolean;
}

function renderMultiline(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/**
 * TECHNOLOGY page — hero (Figma 2968:6673) + philosophy (2977:7348),
 * composed inside frame 2977:7419 (393×1315).
 */
export default function TechHero({ data, showPhilosophy = true }: TechHeroProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const ctaLabel = data?.cta?.label || "";
  const ctaHref = data?.cta?.href || "/products";
  const desktopImg = mediaUrl(data?.desktopImage);
  const mobileImg = mediaUrl(data?.mobileImage) || desktopImg;

  const uptimeValue = data?.uptimeValue || "";
  const uptimeUnit = data?.uptimeUnit || "";
  const uptimeDescription = data?.uptimeDescription || "";

  const philosophyEyebrow = data?.philosophyEyebrow || "";
  const philosophyTitle = data?.philosophyTitle || "";
  const philosophyDescription = data?.philosophyDescription || "";
  const philosophyCards = data?.philosophyCards || [];

  return (
    <section className="relative overflow-clip bg-[#041231]" aria-label={eyebrow || "Technology"}>
      {/* Mobile Hero (< 640px) */}
      <div className="relative mx-auto w-full sm:hidden">
        {/* hero — dynamic 100svh minus navbar (52px) to fit in one fold for all mobile heights */}
        <div className="relative flex h-[calc(100svh-52px)] min-h-[500px] max-h-[762px] w-full flex-col justify-end">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {mobileImg && (
              <img
                src={mobileImg}
                alt=""
                className="absolute inset-0 size-full max-w-none object-cover object-center"
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(4,18,49,0) 45%, rgb(4,18,49) 85%), linear-gradient(191.077deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 99.95%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto flex w-[calc(100%-40px)] max-w-[353px] flex-col items-start justify-center gap-2.5 pb-8 min-[400px]:pb-10">
            {eyebrow && <Eyebrow label={eyebrow} dark />}
            {title && (
              <h1 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white min-[380px]:text-[32px] min-[380px]:tracking-[-0.64px]">
                {renderMultiline(title)}
              </h1>
            )}
            {subtitle && (
              <p className="w-full font-sans text-[12px] font-normal leading-normal text-white/90">
                {subtitle}
              </p>
            )}
            {ctaLabel && (
              <Button variant="white" arrow="white" href={ctaHref} className="w-full">
                {ctaLabel}
              </Button>
            )}
          </div>

          <FloatingWidget mobileClassName="bottom-[90px]" />
        </div>

        {/* uptime ribbon — sits over the seam between hero and philosophy */}
        {(uptimeValue || uptimeDescription) && (
          <div className="relative z-20 mx-auto -mt-[31px] w-[calc(100%-40px)] max-w-[353px] rounded-[8px] bg-gradient-to-b from-white/45 via-white/12 to-white/5 p-px">
            <div className="relative flex w-full flex-col gap-[10px] overflow-clip rounded-[7px] bg-[rgba(255,255,255,0.04)] px-[11px] pb-[13px] pt-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-[4px]">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-white opacity-[0.12]" />
              <div className="absolute bottom-0 left-0 h-1 w-1/2 bg-white" />
              <div className="flex items-center justify-center gap-[10px] text-white">
                {uptimeValue && (
                  <p className="shrink-0 font-display font-semibold leading-[1.15] tracking-[-0.84px]">
                    <span className="text-[36px]">{uptimeValue}</span>
                    {uptimeUnit && <span className="text-[24px]">{uptimeUnit}</span>}
                  </p>
                )}
                {uptimeDescription && (
                  <p className="min-w-px flex-1 font-display leading-[1.15] tracking-[-0.28px] text-[14px]">
                    {uptimeDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {showPhilosophy && (
          /* philosophy — mobile */
          <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center gap-[42px] overflow-clip bg-[#041231] px-5 pb-[52px] pt-[62px]">
            <div className="flex w-full flex-col items-start gap-[14px]">
              {philosophyEyebrow && <Eyebrow label={philosophyEyebrow} dark />}
              {philosophyTitle && (
                <h2 className="w-full font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-white md:text-[42px] lg:text-[42px]">
                  {philosophyTitle}
                </h2>
              )}
              {philosophyDescription && (
                <p className="w-full font-sans text-[12px] font-normal leading-normal text-white">
                  {philosophyDescription}
                </p>
              )}
            </div>

            {philosophyCards.length > 0 && (
              <div className="flex w-full flex-col items-center gap-5">
                <div className="relative -mx-5 w-[calc(100%+40px)]">
                  <div
                    id="philosophy-scroll-row"
                    className="snap-row snap-center-mobile gap-[10px]"
                  >
                    <div aria-hidden="true" className="shrink-0" style={{ width: "calc(20px - 10px)" }} />
                    {philosophyCards.map((c, idx) => {
                      const iconUrl = mediaUrl(c.icon);
                      return (
                        <article
                          key={c.id ?? `${c.title}-${idx}`}
                          data-carousel-card
                          className="flex w-[282px] shrink-0 snap-start flex-col items-start justify-center gap-5 rounded-[12px] bg-[rgba(255,255,255,0.08)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.45),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.25)]"
                        >
                          {iconUrl && (
                            <div className="relative h-[62px] w-[64.333px] shrink-0 overflow-hidden">
                              <img src={iconUrl} alt="" className="size-full object-contain" />
                            </div>
                          )}
                          <div className="flex w-full flex-col items-start gap-2 leading-normal text-white">
                            <p className="w-full text-[16px] font-bold">{c.title}</p>
                            <p className="w-full text-[12px]">{c.description}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <PagerBar rowId="philosophy-scroll-row" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tablet Hero (640px – 1023px) — Dedicated tablet layout with reduced image size & full bleed */}
      <div className="relative hidden h-[580px] w-full overflow-clip sm:block lg:hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {desktopImg && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={desktopImg}
                alt=""
                className="absolute inset-0 size-full object-cover object-[center_35%]"
              />
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(4,18,49,0) 60.47%, #041231 90.8%), linear-gradient(186deg, rgba(0,0,0,0) 56.44%, rgba(0,0,0,0.8) 99.95%), linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(182deg, rgba(0,0,0,0) 56.69%, rgba(0,0,0,0.8) 93.41%)",
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-10 mx-auto flex w-full max-w-[1440px] items-end justify-between pl-6 pr-12 md:pl-10 md:pr-24">
          <div className="flex flex-col items-start justify-center gap-[20px] text-white">
            {eyebrow && <Eyebrow label={eyebrow} dark />}
            {title && (
              <h1 className="font-display text-[36px] font-semibold leading-[1.15] tracking-[-0.72px] md:text-[46px] md:tracking-[-0.92px]">
                {renderMultiline(title)}
              </h1>
            )}
            {subtitle && (
              <p className="max-w-[605px] font-sans text-[14px] leading-normal md:text-[15px]">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex w-[300px] shrink-0 flex-col items-start gap-4 md:w-[340px]">
            {(uptimeValue || uptimeDescription) && (
              <div className="relative w-full overflow-clip rounded-lg bg-white/[0.04] p-4 md:p-5">
                <div className="absolute bottom-0 left-0 h-1 w-full bg-white opacity-[0.12]" />
                <div className="absolute bottom-0 left-0 h-1 w-[140px] bg-white md:w-[160px]" />
                <div className="flex w-full items-center gap-3 text-white md:gap-4">
                  {uptimeValue && (
                    <p className="shrink-0 whitespace-nowrap font-display font-semibold leading-[1.15] tracking-[-0.84px]">
                      <span className="text-[34px] md:text-[38px]">{uptimeValue}</span>
                      {uptimeUnit && <span className="text-[20px] md:text-[24px]">{uptimeUnit}</span>}
                    </p>
                  )}
                  {uptimeDescription && (
                    <p className="min-w-0 flex-1 font-display text-[13px] leading-[1.35] tracking-[-0.26px] md:text-[14px] md:leading-[1.4]">
                      {uptimeDescription}
                    </p>
                  )}
                </div>
              </div>
            )}
            {ctaLabel && (
              <Button variant="white" arrow="navy" href={ctaHref} className="w-full">
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>

        <FloatingWidget />
      </div>

      {/* Desktop Hero (>= 1024px) */}
      <div className="relative hidden h-[680px] w-full overflow-clip lg:block lg:h-[800px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {desktopImg && (
            <div className="absolute inset-0 overflow-hidden">
              <img src={desktopImg} alt="" className="absolute left-[0.05%] top-[-36.82%] h-[181.34%] w-[99.94%] max-w-none object-cover" />
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(4,18,49,0) 60.47%, #041231 90.8%), linear-gradient(186deg, rgba(0,0,0,0) 56.44%, rgba(0,0,0,0.8) 99.95%), linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(182deg, rgba(0,0,0,0) 56.69%, rgba(0,0,0,0.8) 93.41%)",
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-10 mx-auto flex w-full max-w-[1440px] items-end justify-between px-6 md:px-10 lg:bottom-12 lg:px-10 lg:pr-20 xl:pl-20 min-[1440px]:!pr-20">
          <div className="flex w-full max-w-[460px] flex-col items-start justify-center gap-3 text-white md:gap-4 lg:w-[450px] lg:flex-none lg:gap-5">
            {eyebrow && <Eyebrow label={eyebrow} dark />}
            {title && (
              <h1 className="font-display text-[36px] font-semibold leading-[1.15] tracking-[-0.72px] md:text-[44px] md:tracking-[-0.88px] lg:w-[450px] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-0.88px] min-[1440px]:w-[788.543px] min-[1440px]:text-[52px] min-[1440px]:tracking-[-1.04px]">
                {renderMultiline(title)}
              </h1>
            )}
            {subtitle && (
              <p className="max-w-[540px] font-sans text-[14px] leading-normal md:text-[15px] lg:w-[450px] lg:max-w-none lg:text-[16px] min-[1440px]:w-[604.962px] min-[1440px]:text-[16px]">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex w-[300px] shrink-0 flex-col items-start gap-4 md:w-[340px] lg:w-[386px] lg:gap-5">
            {(uptimeValue || uptimeDescription) && (
              <div className="relative h-auto w-full overflow-clip rounded-lg bg-white/[0.04] p-4 md:p-5 lg:h-[96px] lg:p-6">
                <div className="absolute bottom-0 left-0 h-1 w-full bg-white opacity-[0.12]" />
                <div className="absolute bottom-0 left-0 h-1 w-[140px] bg-white md:w-[160px] lg:w-[178px]" />
                <div className="flex w-full items-center gap-3 text-white md:gap-4">
                  {uptimeValue && (
                    <p className="shrink-0 whitespace-nowrap font-display font-semibold leading-[1.15] tracking-[-0.84px]">
                      <span className="text-[34px] md:text-[38px] min-[1440px]:text-[42px]">{uptimeValue}</span>
                      {uptimeUnit && <span className="text-[20px] md:text-[24px] min-[1440px]:text-[26px]">{uptimeUnit}</span>}
                    </p>
                  )}
                  {uptimeDescription && (
                    <p className="min-w-0 flex-1 font-display text-[13px] leading-[1.35] tracking-[-0.26px] md:text-[14px] md:leading-[1.4] min-[1440px]:text-[16px] min-[1440px]:tracking-[-0.32px]">
                      {uptimeDescription}
                    </p>
                  )}
                </div>
              </div>
            )}
            {ctaLabel && (
              <Button variant="white" arrow="navy" href={ctaHref} className="w-full lg:!h-[51px]">
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>

        <FloatingWidget />
      </div>

      {showPhilosophy && (
        <div
          className="relative mx-auto hidden w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-6 pb-12 pt-6 sm:flex md:px-10 lg:gap-[42px] lg:px-20 lg:pb-[62px] min-[1440px]:w-[1440px] min-[1440px]:gap-[42px] min-[1440px]:px-[80px] min-[1440px]:pb-[62px] min-[1440px]:pt-[24px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #041231 43.98%, #05173F 63.46%, #0C3797 100%), linear-gradient(0deg, #041231 0%, #041231 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%), #E9EDF3",
          }}
        >
          <div className="flex w-full flex-col items-center gap-4 md:gap-6">
            <div className="flex max-w-[900px] flex-col items-center gap-3 md:gap-4">
              {philosophyEyebrow && <Eyebrow label={philosophyEyebrow} dark />}
              {philosophyTitle && (
                <h2 className="text-center font-display text-[30px] font-semibold leading-[normal] tracking-[-0.6px] text-white md:text-[36px] md:tracking-[-0.72px] lg:text-[36px] lg:tracking-[-0.72px] min-[1440px]:text-[42px] min-[1440px]:tracking-[-0.84px]">
                  {philosophyTitle}
                </h2>
              )}
            </div>
            {philosophyDescription && (
              <p className="max-w-[540px] text-center font-sans text-[13px] leading-normal text-white md:text-[14px] lg:text-[14px] min-[1440px]:text-[16px]">
                {philosophyDescription}
              </p>
            )}
          </div>

          {philosophyCards.length > 0 && (
            <div className="relative w-full min-[1440px]:self-stretch">
              <div className="grid w-full grid-cols-3 items-stretch gap-3 md:gap-4 lg:gap-5 min-[1440px]:flex min-[1440px]:items-center min-[1440px]:gap-[10px]">
                {philosophyCards.map((card, idx) => {
                  const iconUrl = mediaUrl(card.icon);
                  return (
                    <article key={card.id ?? `${card.title}-${idx}`} className="flex min-h-[200px] w-full flex-col items-start justify-center gap-5 rounded-[12px] bg-[rgba(255,255,255,0.08)] p-5 md:gap-6 md:p-6 lg:h-[228px] min-[1440px]:h-[228px] min-[1440px]:w-[420px] min-[1440px]:flex-[1_0_0] min-[1440px]:self-stretch min-[1440px]:gap-8 min-[1440px]:p-8">
                      {iconUrl && (
                        <div
                          aria-hidden="true"
                          className="relative h-[56px] w-[58px] shrink-0 overflow-hidden md:h-[64px] md:w-[66px] lg:h-[72px] lg:w-[74.709px] min-[1440px]:h-[72px] min-[1440px]:w-[74.70px]"
                        >
                          <img src={iconUrl} alt="" className="size-full object-contain" />
                        </div>
                      )}
                      <div className="flex w-full flex-col items-start gap-1.5 text-white md:gap-2">
                        <h3 className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] md:text-[21px] md:tracking-[-0.42px] min-[1440px]:text-[26px] min-[1440px]:tracking-[-0.78px]">{card.title}</h3>
                        <p className="w-full font-sans text-[12px] leading-normal md:text-[13.5px] min-[1440px]:text-[16px]">{card.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
