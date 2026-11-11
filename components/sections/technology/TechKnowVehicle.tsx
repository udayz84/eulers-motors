"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { mediaUrl } from "@/lib/strapi/client";
import { StrapiTechnologyKnowVehicleSection } from "@/types/strapi";

const A = "/assets/technology-page";

export interface TechKnowVehicleProps {
  data?: StrapiTechnologyKnowVehicleSection;
}

function Chip({
  label,
  icon,
  active,
  onSelect,
}: {
  label: string;
  icon: string;
  active: boolean;
  onSelect: () => void;
}) {
  if (active) {
    return (
      <button
        type="button"
        aria-pressed="true"
        onClick={onSelect}
        className="flex h-[88px] w-[113px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-[6px] border border-[#256dec] px-4 py-[6px] cursor-pointer"
        style={{
          backgroundImage:
            "linear-gradient(-30.732deg,#0e2f6d 10.379%,#1d6fff 90.974%), linear-gradient(90deg,#121212 0%,#121212 100%)",
        }}
      >
        {icon && <img src={icon} alt="" className="size-[48px] shrink-0 object-contain" />}
        <p className="w-full text-center text-[12px] font-bold leading-normal text-white">{label}</p>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={onSelect}
      className="relative flex h-[88px] w-[113px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-[6px] border border-[rgba(204,204,204,0.12)] bg-[#121212] px-4 py-1.5 opacity-80 cursor-pointer"
    >
      <div className="pointer-events-none absolute left-[33.77px] top-[31.44px] h-[31.73px] w-[25.076px]">
        <div className="absolute inset-[-137.09%_-173.47%]">
          <img src={`${A}/kv__imgEllipse3429.svg`} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      {icon && (
        <div className="relative size-[48px] shrink-0 opacity-50">
          <img src={icon} alt="" className="size-full object-contain" />
        </div>
      )}
      <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
    </button>
  );
}

function DesktopChip({
  label,
  icon,
  active,
  onSelect,
}: {
  label: string;
  icon: string;
  active: boolean;
  onSelect: () => void;
}) {
  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[40.52px] top-[37.73px] h-[38.076px] w-[30.091px]"
    >
      <div className="absolute inset-[-137.09%_-173.47%]">
        <img src={`${A}/kv__imgEllipse3429.svg`} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );

  if (active) {
    return (
      <button
        type="button"
        aria-pressed="true"
        onClick={onSelect}
        className="relative flex h-[110px] w-[135.6px] shrink-0 flex-col items-center justify-center gap-[12px] overflow-hidden rounded-[7.2px] border-[1.2px] border-[#256dec] px-[19.2px] py-[7.2px] cursor-pointer min-[1440px]:h-[115.6px]"
        style={{
          backgroundImage:
            "linear-gradient(-31.352deg,#0e2f6d 10.379%,#1d6fff 90.974%),linear-gradient(90deg,#121212 0%,#121212 100%)",
        }}
      >
        {icon && <img src={icon} alt="" className="size-[60px] shrink-0 object-contain" />}
        <p className="w-full text-center font-sans text-[16px] font-bold leading-normal text-white">
          {label}
        </p>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={onSelect}
      className="relative flex h-[110px] w-[135.6px] shrink-0 flex-col items-center justify-center gap-[12px] overflow-hidden rounded-[7.2px] border-[1.2px] border-[rgba(204,204,204,0.12)] bg-[#121212] px-[19.2px] py-[7.2px] opacity-80 cursor-pointer min-[1440px]:h-[115.6px]"
    >
      {glow}
      {icon && (
        <img
          src={icon}
          alt=""
          className="relative size-[60px] shrink-0 object-contain opacity-50"
        />
      )}
      <p className="relative w-full text-center font-sans text-[16px] font-bold leading-normal text-[#ccc] opacity-50">
        {label}
      </p>
    </button>
  );
}

/** TECHNOLOGY page — "The parts / Know Your Vehicle Better" (Figma 3006:10290, 393×743). */
export default function TechKnowVehicle({ data }: TechKnowVehicleProps) {
  const [selectedChip, setSelectedChip] = useState(0);

  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const vehicleImage = mediaUrl(data?.vehicleImage);
  const whatIsItLabel = data?.whatIsItLabel || "";
  const whyMatterLabel = data?.whyMatterLabel || "";
  const businessMeaningLabel = data?.businessMeaningLabel || "";
  const parts = data?.parts || [];

  const activeIndex = selectedChip < parts.length ? selectedChip : 0;
  const selectedPart = parts[activeIndex];

  const details = selectedPart
    ? [
        { label: whatIsItLabel, body: selectedPart.whatIsIt, accent: false },
        { label: whyMatterLabel, body: selectedPart.whyDoesItMatter, accent: false },
        { label: businessMeaningLabel, body: selectedPart.businessMeaning, accent: true },
      ].filter((d) => d.body)
    : [];

  return (
    <section className="relative overflow-clip bg-[#041231]" aria-label={title || "Know your vehicle better"}>
      {/* Mobile view */}
      <div className="relative mx-auto h-[743px] w-full max-w-[480px] overflow-clip md:hidden">
        <div className="absolute left-[19.49px] right-[20.51px] top-[42.06px] flex flex-col items-start gap-[14px]">
          {eyebrow && <Eyebrow label={eyebrow} dark />}
          {title && (
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="w-full max-w-[320px] font-sans text-[12px] font-normal leading-normal text-white">
              {subtitle}
            </p>
          )}
        </div>

        {/* vehicle diagram + motor leader line */}
        <div className="absolute left-[66.34px] top-[158.08px] h-[187.669px] w-[306.156px] mix-blend-lighten">
          {vehicleImage && (
            <img src={vehicleImage} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
          )}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 91.376 142.44, rgba(4,18,49,0) 0%, rgba(4,18,49,1) 95.733%)",
              opacity: 0.2,
            }}
          />
        </div>
        {selectedPart && (
          <>
            <p className="absolute left-[46.35px] top-[220.06px] -translate-x-1/2 whitespace-nowrap text-center text-[12px] font-bold leading-normal text-white">
              {selectedPart.partName}
            </p>
            <div className="absolute left-[46.35px] top-[237.64px] h-[60.066px] w-[91.288px]">
              <img src={`${A}/kv__imgVector174.svg`} alt="" className="absolute inset-0 size-full max-w-none" />
            </div>
          </>
        )}

        {/* part chips — row scrolls horizontally */}
        {parts.length > 0 && (
          <div className="no-scrollbar absolute left-0 top-[335.06px] flex w-full items-stretch gap-2 overflow-x-auto overflow-y-hidden pl-[19.99px] pr-5">
            {parts.map((part, i) => (
              <Chip
                key={part.id ?? `${part.partName}-${i}`}
                label={part.partName}
                icon={mediaUrl(part.icon)}
                active={activeIndex === i}
                onSelect={() => setSelectedChip(i)}
              />
            ))}
          </div>
        )}

        {/* part detail */}
        {selectedPart && (
          <div className="absolute left-4 right-4 top-[441.06px] mx-auto max-w-[353px] rounded-[8px] border border-[rgba(204,204,204,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.2)_41.677%,rgba(0,0,0,0.2)_100%)] p-3">
            <div className="flex flex-col items-start gap-5">
              <p className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] text-white">
                {selectedPart.title}
              </p>
              <div className="flex w-full flex-col items-start gap-1.5">
                {details.map((d, idx) => (
                  <div key={`${d.label}-${idx}`} className="flex w-full flex-col items-start gap-2 rounded-[8px] bg-black p-3">
                    {d.label && (
                      <p
                        className="text-[12px] font-bold leading-[1.15] tracking-[-0.24px]"
                        style={{ color: d.accent ? "#1d6fff" : "#ccc" }}
                      >
                        {d.label}
                      </p>
                    )}
                    <p className="w-full text-[12px] leading-[1.4] tracking-[-0.24px] text-[#ccc] opacity-80">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop & Tablet view */}
      <div className="relative mx-auto hidden min-h-[644px] w-full max-w-[1440px] overflow-clip text-white md:flex md:px-6 md:py-10 lg:px-10 lg:py-10 min-[1440px]:px-0 min-[1440px]:py-0">
        {/* Responsive layout for md/lg - simplified centered layout */}
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row md:items-start md:justify-between lg:gap-10 min-[1440px]:hidden">
          <div className="flex flex-col items-start gap-3 md:gap-4">
            {eyebrow && <Eyebrow label={eyebrow} dark />}
            {title && (
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white md:text-[32px] lg:text-[42px]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-[400px] font-sans text-[14px] leading-normal text-white/90 md:text-[16px]">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
            {/* Vehicle Graphic with Leader Line */}
            <div className="relative flex h-[300px] w-full max-w-[500px] shrink-0 items-center justify-center md:h-[350px] lg:h-[400px]">
              <div className="relative h-full w-full mix-blend-lighten">
                {vehicleImage && (
                  <img src={vehicleImage} alt={title || "Euler vehicle breakdown"} className="size-full object-contain" />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 29.85% 75.96%, rgba(4,18,49,0) 0%, #041231 95.733%), linear-gradient(90deg, rgba(4,18,49,0.2), rgba(4,18,49,0.2))",
                    opacity: 0.2,
                  }}
                />
              </div>
              {selectedPart && (
                <div className="absolute left-[15%] top-[25%] flex flex-col items-center gap-1">
                  <p className="whitespace-nowrap font-sans text-[16px] font-bold leading-normal md:text-[18px] lg:text-[20px]">
                    {selectedPart.partName}
                  </p>
                  <div className="h-[90px] w-[80px] md:h-[120px] md:w-[100px] lg:h-[140px] lg:w-[120px]">
                    <img src={`${A}/kv__imgVector174.svg`} alt="" className="size-full object-contain" />
                  </div>
                </div>
              )}
            </div>

            {/* Chips + Details Card */}
            <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
              {parts.length > 0 && (
                <div
                  className="no-scrollbar flex w-full min-w-0 items-center gap-2.5 overflow-x-auto overflow-y-hidden"
                  onWheel={(event) => {
                    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
                    if (delta !== 0) {
                      event.currentTarget.scrollLeft += delta;
                      event.preventDefault();
                    }
                  }}
                >
                  {parts.map((part, i) => (
                    <DesktopChip
                      key={part.id ?? `${part.partName}-${i}`}
                      label={part.partName}
                      icon={mediaUrl(part.icon)}
                      active={activeIndex === i}
                      onSelect={() => setSelectedChip(i)}
                    />
                  ))}
                </div>
              )}

              {selectedPart && (
                <div className="w-full rounded-lg border border-[rgba(204,204,204,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.2)_41.677%,rgba(0,0,0,0.2)_100%)] p-4 md:p-5 lg:p-6 overflow-hidden">
                  <div className="flex flex-col items-start gap-4 md:gap-5">
                    <h3 className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] md:text-[20px] shrink-0">
                      {selectedPart.title}
                    </h3>
                    <div className="flex w-full flex-col items-start gap-2 overflow-hidden">
                      {details.map((detail, idx) => (
                        <div key={`${detail.label}-${idx}`} className="flex w-full flex-col items-start gap-1.5 rounded-lg bg-black p-3 md:p-3.5 shrink-0">
                          {detail.label && (
                            <p
                              className="whitespace-nowrap font-sans text-[15px] font-bold leading-[1.15] tracking-[-0.3px] md:text-[16px] shrink-0"
                              style={{ color: detail.accent ? "#1d6fff" : "#ccc" }}
                            >
                              {detail.label}
                            </p>
                          )}
                          <p className="w-full font-sans text-[14px] leading-[1.4] tracking-[-0.28px] text-[#ccc] opacity-80 md:text-[15px] line-clamp-2">
                            {detail.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Exact 1440px Figma positioning */}
        <div className="absolute inset-0 hidden min-[1440px]:block">
          {/* Header */}
          <div className="absolute left-[80px] top-[62px] flex flex-col items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[16px] w-[414.434px]">
              {eyebrow && <Eyebrow label={eyebrow} dark />}
              {title && (
                <h2 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-white whitespace-nowrap">
                  {title}
                </h2>
              )}
            </div>
            {subtitle && (
              <p className="font-sans text-[16px] leading-normal text-white whitespace-nowrap">
                {subtitle}
              </p>
            )}
          </div>

          {/* Vehicle image */}
          <div className="absolute left-[98.82px] top-[238.51px] h-[372.979px] w-[608.464px] mix-blend-lighten">
            {vehicleImage && (
              <img src={vehicleImage} alt={title || "Euler vehicle breakdown"} className="absolute inset-0 size-full max-w-none object-cover" />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 181.6px 283.08px, rgba(4,18,49,0) 0%, rgba(4,18,49,1) 95.733%), linear-gradient(90deg, rgba(4,18,49,0.2), rgba(4,18,49,0.2))",
                opacity: 0.2,
              }}
            />
          </div>

          {selectedPart && (
            <>
              <div className="absolute left-[109.5px] top-[344.34px] h-[175.228px] w-[153.635px]">
                <img src={`${A}/kv__imgVector174.svg`} alt="" className="absolute inset-[-1.52%_-0.33%_-0.29%_-1.74%] size-full max-w-none" />
              </div>

              <p className="absolute left-[109px] top-[309.77px] -translate-x-1/2 whitespace-nowrap text-center font-sans text-[20px] font-bold leading-normal text-white">
                {selectedPart.partName}
              </p>
            </>
          )}

          {/* Chips row */}
          {parts.length > 0 && (
            <div
              className="absolute left-[764.2px] top-[95.78px] flex h-[115.6px] w-[675.8px] min-w-0 items-center gap-[9.6px] overflow-x-auto overflow-y-hidden no-scrollbar"
              onWheel={(event) => {
                const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
                if (delta !== 0) {
                  event.currentTarget.scrollLeft += delta;
                  event.preventDefault();
                }
              }}
            >
              {parts.map((part, i) => (
                <DesktopChip
                  key={part.id ?? `${part.partName}-${i}`}
                  label={part.partName}
                  icon={mediaUrl(part.icon)}
                  active={activeIndex === i}
                  onSelect={() => setSelectedChip(i)}
                />
              ))}
            </div>
          )}

          {/* Details card */}
          {selectedPart && (
            <div className="absolute left-[764.2px] top-[234.78px] flex h-[304px] w-[596px] flex-col items-start gap-5 overflow-hidden rounded-[8px] border border-[rgba(204,204,204,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.2)_41.677%,rgba(0,0,0,0.2)_100%)] p-3">
              <div className="flex flex-col items-start gap-5 w-full">
                <h3 className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] text-white shrink-0">
                  {selectedPart.title}
                </h3>
                <div className="flex w-full flex-col items-start gap-1 overflow-hidden">
                  {details.map((detail, idx) => (
                    <div key={`${detail.label}-${idx}`} className="flex h-[75px] w-full shrink-0 flex-col items-start gap-2 rounded-[8px] bg-black p-3 min-[1440px]:w-[570px] min-[1440px]:self-stretch">
                      {detail.label && (
                        <p
                          className={`whitespace-nowrap font-sans text-[15px] font-bold leading-[1.15] tracking-[-0.3px] shrink-0 min-[1440px]:text-[18px] min-[1440px]:tracking-[-0.36px] ${detail.accent ? "text-[#1d6fff] min-[1440px]:text-[#ccc]" : "text-[#ccc]"}`}
                        >
                          {detail.label}
                        </p>
                      )}
                      <p className="w-full font-sans text-[14px] leading-[1.4] tracking-[-0.28px] text-[#ccc] opacity-80 line-clamp-2 min-[1440px]:flex-[1_0_0] min-[1440px]:text-[16px] min-[1440px]:tracking-[-0.32px] min-[1440px]:opacity-100">
                        {detail.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
