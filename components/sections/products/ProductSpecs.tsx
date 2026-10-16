import Image from "next/image";
import Button from "@/components/ui/Button";

const ASSET = "/assets/products/";

/** Spec tabs — Figma 3241:17171; only the Features state exists in the design */
const TABS = ["Battery", "Dimensions", "Performance", "Features", "Safety", "Comfort"];

/** Features tab rows — Figma 3241:17072 */
const FEATURES = [
  { icon: "spec-ic-phone.svg", label: "Telematics", value: "Shepherd app, included" },
  { icon: "spec-ic-location.svg", label: "Live location", value: "Yes" },
  { icon: "spec-ic-charge.svg", label: "State of charge on phone", value: "Yes" },
  { icon: "spec-ic-analytics.svg", label: "Driver score", value: "Yes" },
  { icon: "spec-ic-bell.svg", label: "Service alerts", value: "Predictive" },
  { icon: "spec-ic-clock.svg", label: "Trip history", value: "12 months" },
  { icon: "spec-ic-target.svg", label: "Geofencing", value: "Yes" },
  { icon: "spec-ic-doc.svg", label: "Fleet API", value: "On request" },
];

/**
 * /products specifications — Figma 3245:17543. Section px-79/py-48, header row
 * (badge + h2 / spec-sheet CTA), then a rounded-12 #e5ebf3/60 panel with the
 * centered tab pill row overlapping its top edge (pt-89 clears it), the
 * spec list and the 557×424 photo split by a hairline.
 */
export default function ProductSpecs() {
  return (
    <section aria-label="Specifications" className="w-full bg-white py-12 max-xl:py-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[42px] px-5 xl:px-[79px] max-xl:gap-6">
        <div className="flex w-full items-end justify-between max-xl:flex-col max-xl:items-start max-xl:gap-6">
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="relative flex h-6 items-center gap-1.5 py-1">
              <Image src={`${ASSET}spec-badge-left.svg`} alt="" aria-hidden width={149} height={20} className="absolute left-[3px] top-1/2 h-5 w-[149px] -translate-y-1/2" />
              <Image src={`${ASSET}spec-badge-icon.svg`} alt="" aria-hidden width={18.821} height={20.355} className="relative h-[20.355px] w-[18.821px]" />
              <p className="relative whitespace-nowrap font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-navy">Specifications</p>
            </div>
            <h2 className="whitespace-nowrap font-display text-[52px] font-semibold not-italic leading-[1.15] tracking-[-1.04px] text-ink max-xl:text-[32px] max-xl:tracking-[-0.64px] max-xl:whitespace-normal">
              Know Your Vehicle Better
            </h2>
          </div>
          <Button className="max-xl:w-full">Download Spec sheet</Button>
        </div>

        <div className="relative isolate flex w-full max-w-[1282px] items-center gap-[42px] overflow-clip rounded-[12px] bg-[rgba(229,235,243,0.6)] px-[42px] pb-[42px] pt-[89px] max-xl:flex-col max-xl:gap-6 max-xl:px-5 max-xl:pb-6 max-xl:pt-6">
          {/* solid-white inner card art with cutout for tabs — desktop */}
          <div className="pointer-events-none absolute inset-x-[12.5px] top-[11.54px] bottom-[10.3px] -z-10 hidden xl:block">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1257 533.156"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                id="Subtract"
                d="M1257 521.156C1257 527.784 1251.63 533.156 1245 533.156H12C5.37256 533.156 0 527.784 0 521.156V12C0 5.37259 5.37258 0 12 0H288.021C293.001 0 297.463 3.07546 299.236 7.72905L312.402 42.3002C314.174 46.9538 318.637 50.0293 323.616 50.0293H911.384C916.363 50.0293 920.826 46.9538 922.598 42.3002L935.764 7.72905C937.537 3.07546 941.999 0 946.979 0H1245C1251.63 0 1257 5.37258 1257 12V521.156Z"
                fill="white"
              />
            </svg>
          </div>

          {/* solid-white inner card — mobile/tablet fallback when tabs stack */}
          <div className="pointer-events-none absolute inset-x-[10px] top-[10px] bottom-[10px] -z-10 rounded-[8px] bg-white xl:hidden" />

          <div className="absolute left-1/2 top-[11.54px] flex -translate-x-1/2 max-xl:relative max-xl:top-auto max-xl:translate-x-0 max-xl:flex-wrap max-xl:justify-center max-xl:gap-2">
            {TABS.map((tab) => {
              const active = tab === "Features";
              return (
                <button
                  key={tab}
                  type="button"
                  className={
                    active
                      ? "flex h-[42px] shrink-0 items-center justify-center rounded-[500px] border-[0.5px] border-solid border-white px-4 font-sans text-[16px] font-semibold leading-none text-white"
                      : "flex h-[42px] shrink-0 items-center justify-center rounded-full px-4 font-sans text-[16px] font-semibold leading-none text-ink"
                  }
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #121212",
                        }
                      : undefined
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex min-w-px flex-1 flex-col gap-3 xl:pt-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={
                  i > 0
                    ? "flex h-8 w-full items-center justify-between overflow-clip border-t border-solid border-[#ccc]/60 px-0.5 py-1"
                    : "flex h-8 w-full items-center justify-between overflow-clip px-0.5 py-1"
                }
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#eff3f8]">
                    <Image src={`${ASSET}${f.icon}`} alt="" aria-hidden width={20} height={20} />
                  </span>
                  <p className="whitespace-nowrap font-sans text-[16px] font-bold capitalize leading-normal text-ink">{f.label}</p>
                </div>
                <p className="whitespace-nowrap font-sans text-[16px] font-bold capitalize leading-normal text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          <div aria-hidden className="w-px shrink-0 self-stretch bg-[#ccc]/60 max-xl:hidden" />

          <div className="w-[557px] shrink-0 self-stretch max-xl:w-full">
            <div className="w-full overflow-hidden rounded-[12px]">
              <Image
                src={`${ASSET}spec-image.png`}
                alt="Storm EV LR 200 cabin and controls"
                width={557}
                height={424}
                className="h-[424px] w-full object-cover max-xl:h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
