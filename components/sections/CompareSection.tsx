import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

type Card = { kind: "icon" | "photo"; icon?: string; text: string };

const WITHOUT: Card[] = [
  { kind: "icon", icon: "/assets/compare/icon-fuel.svg", text: "Diesel cost goes up every month" },
  { kind: "photo", text: "Breakdowns stop your work" },
  { kind: "photo", text: "Fewer trips, less earning" },
  { kind: "icon", icon: "/assets/compare/icon-swap.svg", text: "No easy way to compare vehicles" },
];

const WITH: Card[] = [
  { kind: "icon", icon: "/assets/compare/icon-cash.svg", text: "Running cost ₹1.05 per km" },
  { kind: "photo", text: "Service done in 48 hours" },
  { kind: "photo", text: "More trips, more earning" },
  { kind: "icon", icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
];

const AUDIENCE = ["Fleet owner", "Transport company", "Small business", "Driver", "Dealer"];

/**
 * "What changes when you switch?" (desktop 1:1498 · mobile 1:4703).
 * Split Without/With Euler carousels over a navy→blue gradient.
 */
export default function CompareSection() {
  return (
    <section
      className="relative overflow-clip py-10 lg:py-0"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), linear-gradient(3deg, #0E2F6D 63.5%, #1D6FFF 87.2%), linear-gradient(90deg, #E9EDF3 0%, #E9EDF3 100%)",
      }}
      aria-label="Why Euler"
    >
      {/* mobile: exact Figma render of the mobile top visual frame (1:4704) */}
      <div className="relative h-[418px] w-full lg:hidden">
        <Image src="/assets/compare/mobile-top.png" alt="Euler electric truck" fill sizes="100vw" className="object-cover" />
      </div>

      {/* decorative truck outlines (desktop) */}
      <Image
        src="/assets/compare/truck-outline.svg"
        alt=""
        width={544}
        height={907}
        aria-hidden
        className="pointer-events-none absolute left-[720px] top-[-45px] hidden opacity-90 lg:block"
      />
      <Image
        src="/assets/compare/truck-big.svg"
        alt=""
        width={226}
        height={938}
        aria-hidden
        className="pointer-events-none absolute left-[720px] top-[50px] hidden opacity-90 lg:block"
      />

      {/* header */}
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[24px] px-5 pt-2 lg:pt-[62px]">
        <div className="flex flex-col items-center gap-4">
          <Eyebrow label="Why Euler" dark />
          <h2 className="text-center font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-white lg:text-[42px] lg:leading-none">
            What changes when you switch?
          </h2>
        </div>
        <div className="snap-row gap-3 lg:gap-3" role="tablist" aria-label="Audience">
          {AUDIENCE.map((a, i) => (
            <span
              key={a}
              role="tab"
              aria-selected={i === 0}
              className={`flex h-[42px] items-center justify-center whitespace-nowrap rounded-[32px] px-6 font-display text-[12px] font-semibold leading-none lg:text-[16px] ${
                i === 0
                  ? "border border-[rgba(18,18,18,0.5)] bg-white text-ink"
                  : "border border-white/10 bg-black/80 text-white backdrop-blur-[10px]"
              }`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* column headers */}
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 pt-[26px] lg:pt-[116px]">
        <p className="font-display text-[14px] font-semibold leading-none tracking-[-0.64px] text-white/80 lg:text-[32px]">
          Without Euler
        </p>
        <p className="flex items-center gap-2 font-display text-[14px] font-semibold leading-none tracking-[-0.64px] text-white lg:gap-3 lg:text-[32px]">
          With
          <Image
            src="/assets/compare/logo-small.svg"
            alt="Euler"
            width={121}
            height={20}
            className="h-[16px] w-[120.741px] lg:h-5"
          />
        </p>
      </div>

      {/* carousels */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-2 py-3 lg:flex-row lg:gap-0 lg:py-0">
        {/* without */}
        <div className="relative w-full overflow-clip lg:h-[220px] lg:w-[720px]">
          <div className="snap-row gap-[8px] px-5 lg:translate-x-[-210px] lg:gap-[42px] lg:px-0">
            {[...WITHOUT, ...WITHOUT].map((c, i) => (
              <div
                key={i}
                className="flex h-[102px] w-[136px] flex-col justify-between rounded-xl bg-black p-[11px] lg:h-[220px] lg:w-[243.776px] lg:rounded-[18px] lg:p-6"
              >
                {c.kind === "icon" ? (
                  <span className="flex size-8 items-center justify-center rounded-[7.5px] bg-chip-red/20 lg:size-[52px] lg:rounded-xl">
                    <Image src={c.icon ?? ""} alt="" width={24} height={24} aria-hidden className="size-4 lg:size-6" />
                  </span>
                ) : (
                  <span className="relative block h-[32px] w-[33px] opacity-80 lg:h-[69.5px] lg:w-[85px]">
                    <Image src="/assets/compare/truck-side.png" alt="" fill sizes="90px" className="object-cover" />
                  </span>
                )}
                <p className="text-[12px] font-bold leading-tight text-white lg:text-[24px] lg:leading-normal">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div aria-hidden className="mx-auto hidden w-px lg:block">
          <Image src="/assets/compare/divider-h.svg" alt="" width={2} height={599} className="h-[598.5px] w-px" />
        </div>

        {/* with */}
        <div className="relative w-full overflow-clip lg:h-[220px] lg:w-[740px]">
          <div className="snap-row gap-[8px] px-5 lg:translate-x-[-231px] lg:gap-[42px] lg:px-0">
            {[...WITH, ...WITH].map((c, i) => (
              <div
                key={i}
                className="flex h-[102px] w-[136px] flex-col justify-between rounded-xl bg-white/[0.08] p-[11px] lg:h-[220px] lg:w-[243.776px] lg:rounded-[18px] lg:p-6"
              >
                {c.kind === "icon" ? (
                  <span className="flex size-[39px] items-center justify-center rounded-[9px] bg-chip-green/20 lg:size-[52px] lg:rounded-xl">
                    <Image src={c.icon ?? ""} alt="" width={24} height={24} aria-hidden className="size-[19px] lg:size-6" />
                  </span>
                ) : (
                  <span className="relative block h-[32px] w-[33px] lg:h-[82px] lg:w-[85px]">
                    <Image src="/assets/compare/truck-side.png" alt="" fill sizes="90px" className="object-cover" />
                  </span>
                )}
                <p className="text-[12px] font-bold leading-tight text-white lg:text-[24px] lg:leading-normal">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Neo promo banner (desktop only, per Figma) */}
      <div className="relative mx-auto mb-[21px] mt-10 hidden w-fit overflow-clip rounded-2xl p-5 lg:block">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(211.23deg, #0E2F6D 138.16%, #1D6FFF 87.019%), linear-gradient(174.6deg, #0E2F6D 0%, #114399 71.429%)",
          }}
        />
        <Image
          src="/assets/compare/neo-promo-bg.png"
          alt=""
          fill
          sizes="800px"
          aria-hidden
          className="object-cover opacity-20"
        />
        <div className="relative flex items-center gap-[82px]">
          <div className="flex flex-col gap-1.5">
            <p className="text-[20px] font-semibold leading-[1.25] tracking-[-0.3px] text-white">
              Which vehicle fits your work?
            </p>
            <p className="text-[13px] font-normal leading-[1.5] text-on-dark-2">
              Sirf 5 questions, 30 seconds. No phone number needed.
            </p>
          </div>
          <Button variant="dark" arrow="white">
            Take the 30 second test
          </Button>
        </div>
      </div>
    </section>
  );
}
