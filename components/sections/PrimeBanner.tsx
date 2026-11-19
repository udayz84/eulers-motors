import { Fragment } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Arrow from "../ui/Arrow";

export interface PrimeFeature {
  value: string;
  label: string;
}

export interface PrimeBannerProps {
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: PrimeFeature[];
  isServicePage?: boolean;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
}

const DEFAULT_FEATURES: PrimeFeature[] = [
  { value: "90-minute service", label: "Quick response to help minimise vehicle downtime." },
  { value: "24×7 RSA support", label: "Roadside assistance when you need it." },
  { value: "Predictive maintenance", label: "Proactive support to help identify service needs early." },
  { value: "Doorstep service", label: "Expert technicians bring service support to your location." },
];

/**
 * Euler Prime banner (desktop 1:1819 · mobile 1:4894).
 * Desktop & Tablet (>=768px): Uses the widescreen art stack with the truck positioned
 * on the right half, a dark gradient backdrop on the left for maximum contrast and legibility,
 * and a 2-column feature grid that keeps all copy completely clear of the vehicle.
 * Mobile (<768px): Single-column content with vertical readability gradient overlay.
 */
export default function PrimeBanner({
  eyebrow = "Euler Prime",
  title = "Get free check-up at your depot with Prime",
  ctaLabel = "Explore Euler Prime",
  ctaHref = "/products",
  features,
  isServicePage = false,
  backgroundImage,
  mobileBackgroundImage,
}: PrimeBannerProps = {}) {
  const currentFeatures = features !== undefined ? features : DEFAULT_FEATURES;
  const showCta = Boolean(ctaLabel && ctaHref);

  return (
    <section
      id="prime-banner"
      className="relative min-h-[760px] md:h-[600px] overflow-clip bg-[#030a18] md:bg-white"
      aria-label="Euler Prime"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* mobile background (<768px) */}
        <div className="absolute inset-0 overflow-hidden md:hidden">
          {mobileBackgroundImage ? (
            <Image
              src={mobileBackgroundImage}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover object-bottom"
            />
          ) : isServicePage ? (
            <Image
              src="/assets/prime/service-prime-mobile.webp"
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover object-[50%_100%]"
            />
          ) : (
            <Image
              src="/assets/prime/bg-3.png"
              alt=""
              width={2186}
              height={941}
              priority
              className="absolute max-w-none"
              style={{ left: "-78.67%", top: "48.03%", width: "178.63%", height: "51.83%" }}
            />
          )}
          {/* Mobile dark vignette overlay to ensure text is 100% readable over vehicle */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(3,10,24,0.95) 0%, rgba(3,10,24,0.85) 45%, rgba(3,10,24,0.3) 75%, rgba(3,10,24,0.85) 100%)",
            }}
          />
        </div>

        {/* desktop & tablet background stack (>=768px) */}
        <div className="absolute inset-0 hidden md:block">
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          ) : isServicePage ? (
            <Image
              src="/assets/prime/service-prime-desktop.webp"
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover object-[75%_center] lg:object-center"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-white" />
              <Image src="/assets/prime/bg-1.png" alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/assets/prime/bg-2.png"
                  alt=""
                  width={1670}
                  height={942}
                  className="absolute max-w-none"
                  style={{ left: "-4.68%", top: "-37.93%", width: "119.36%", height: "175.86%" }}
                />
              </div>
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/assets/prime/bg-3.png"
                  alt=""
                  width={2186}
                  height={941}
                  className="absolute max-w-none"
                  style={{ left: "-1%", top: "-1%", width: "105%", height: "108%" }}
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 15%, rgba(0,0,0,0) 100%)",
                }}
              />
            </>
          )}

          {/* Left-side dark vignette on tablet/desktop to keep left column clear & readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(3,10,24,0.92) 0%, rgba(3,10,24,0.82) 32%, rgba(3,10,24,0.35) 55%, rgba(3,10,24,0) 75%)",
            }}
          />
        </div>
      </div>

      {/* Container Background (Figma 1:1820) — frosted-glass panel over left background */}
      <div
        aria-hidden
        className="absolute -left-[204.85px] -top-[74.54px] hidden h-[816.697px] w-[646.484px] blur-[102.15px] md:block"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[16px]" />
      </div>

      {/* Content column: left-anchored on tablet & desktop, keeps all text & cards clear of truck */}
      <div className="relative z-10 flex min-h-[760px] md:min-h-0 md:h-full flex-col items-start justify-start gap-[14px] px-[20px] pt-[36px] pb-8 md:justify-center md:gap-[18px] min-[1440px]:gap-[25px] md:pt-0 md:pb-0 md:px-0 md:pl-[max(32px,calc(50vw-640px))] lg:pl-[max(80px,calc(50vw-640px))] md:w-[calc(max(32px,calc(50vw-640px))+min(520px,46vw))] lg:w-[calc(max(80px,calc(50vw-640px))+min(560px,39vw))] min-[1440px]:w-[calc(max(80px,calc(50vw-640px))+636px)]">
        {eyebrow && <Eyebrow label={eyebrow} dark />}
        <h2 className="w-full max-w-[311px] font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white md:max-w-none md:text-[34px] lg:text-[38px] lg:tracking-[-0.76px] min-[1440px]:text-[52px] min-[1440px]:tracking-[-1.04px]">
          {title}
        </h2>

        {/* Service page specific subtitle */}
        {isServicePage && (
          <p className="w-full max-w-[340px] font-sans text-[12px] font-normal leading-normal text-[#ccc] md:max-w-[480px] md:text-[15px] lg:text-[16px] lg:leading-normal md:!text-[#FFF]">
            Return the car within 24 hours, and we&apos;ll provide you with a complimentary spare vehicle.
          </p>
        )}

        {/* features — 2-column grid on tablet/desktop to keep height compact and clear of the vehicle */}
        {currentFeatures.length > 0 && (
          <div
            className={`w-full max-w-[353px] rounded-[5.5px] bg-navy/40 p-2.5 backdrop-blur-[6px] glass-rim md:max-w-none md:rounded-[10px] md:p-3.5 lg:p-4 min-[1440px]:p-5 ${
              currentFeatures.length > 3
                ? "flex flex-col items-start gap-[11px] md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-3 lg:gap-x-6 lg:gap-y-3.5"
                : "flex flex-col items-start gap-[11px] md:flex-row md:flex-wrap md:items-center md:gap-4 min-[1440px]:flex-nowrap min-[1440px]:gap-5"
            }`}
          >
            {currentFeatures.map((f, i) => (
              <Fragment key={`${f.value}-${i}`}>
                <div className="flex items-center gap-[5.5px] md:flex-col md:items-start md:gap-1.5">
                  <span className="font-display text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-[#f3f4f5] md:text-[16px] lg:text-[18px] lg:tracking-[-0.36px] min-[1440px]:text-[20px] min-[1440px]:tracking-[-0.4px]">
                    {f.value}
                  </span>
                  {/* mobile separator — sits between value and label */}
                  <span aria-hidden className="h-[4.4px] w-[5px] shrink-0 rounded-full bg-white/50 md:hidden" />
                  <span className="text-[12px] leading-snug text-[#ccc] md:text-[13px] min-[1440px]:text-[14px]">
                    {f.label}
                  </span>
                </div>
                {currentFeatures.length <= 3 && i < currentFeatures.length - 1 && (
                  /* desktop separators: only when items are in a single horizontal row */
                  <span
                    aria-hidden
                    className={`hidden rounded-full bg-white/50 min-[1440px]:block ${i === 0 ? "size-2" : "h-2 w-[9px]"}`}
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}

        {showCta && (
          <a
            href={ctaHref}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[4px] bg-white px-5 font-display text-[12px] font-semibold leading-none text-navy md:h-[46px] lg:h-[50.477px] md:px-6 md:text-[15px] lg:text-[16px] transition-opacity hover:opacity-90"
          >
            {ctaLabel}
            <Arrow color="navy" />
          </a>
        )}
      </div>
    </section>
  );
}
