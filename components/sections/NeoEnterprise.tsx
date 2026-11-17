"use client";

import Image from "next/image";

const A = "/assets/neo/enterprise/";

function Mark({ mobile = false }: { mobile?: boolean }) {
  return (
    <Image
      src={`${A}${mobile ? "mobile-logo.svg" : "desktop-logo.svg"}`}
      alt=""
      aria-hidden
      width={14}
      height={14}
      className="shrink-0"
    />
  );
}

function ArrowIcon({ mobile = false }: { mobile?: boolean }) {
  return (
    <span className={`relative flex shrink-0 items-center justify-center bg-[#121212] ${mobile ? "size-[32px] rounded-[1.684px]" : "size-[38px] rounded-[2px]"}`}>
      <span className={`relative ${mobile ? "h-[11.789px] w-[18.526px]" : "h-[14px] w-[22px]"}`}>
        <span className="absolute inset-[-16.41%_-1.68%_-22.88%_-3.41%]">
          <Image
            src={`${A}${mobile ? "mobile-arrow.svg" : "desktop-arrow.svg"}`}
            alt=""
            aria-hidden
            width={23.1195}
            height={19.5}
            className="max-w-none"
          />
        </span>
      </span>
    </span>
  );
}

function GradientButton({
  children,
  href,
  mobile = false,
}: {
  children: React.ReactNode;
  href: string;
  mobile?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex shrink-0 self-start items-center rounded-[4px] bg-[linear-gradient(94deg,#00FF87_-28.56%,#1D6FFF_124.97%)] text-white no-underline transition-opacity hover:opacity-90 ${
        mobile ? "gap-[8px] py-[2px] pl-[12px] pr-[2px]" : "h-[42px] gap-[20px] py-[2px] pl-[24px] pr-[2px]"
      }`}
    >
      <span className={`whitespace-nowrap font-display font-semibold leading-none ${mobile ? "text-[12px]" : "text-[16px]"}`}>
        {children}
      </span>
      <ArrowIcon mobile={mobile} />
    </a>
  );
}

function Eyebrow({ children, mobile = false }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <div className={`flex items-center gap-[7px] font-sans font-normal leading-[normal] uppercase text-white ${mobile ? "text-[12px]" : "gap-[12px] text-[16px]"}`}>
      <Mark mobile={mobile} />
      {children}
    </div>
  );
}

const benefits = [
  "Your route is based on your data.",
  "Guaranteed spare parts at every hub.",
  "Complete setup for charging at the warehouse.",
  "A dedicated account manager for you.",
];

function Benefit({ children, mobile = false }: { children: string; mobile?: boolean }) {
  return (
    <li className={`flex items-center text-center font-display font-bold leading-[1.15] text-[#f3f4f5] ${mobile ? "gap-[4px] text-[12px] tracking-[-0.24px]" : "gap-[6px] text-[16px] tracking-[-0.32px]"}`}>
      <span className="relative block size-[20px] shrink-0 overflow-hidden">
        <Image
          src={`${A}desktop-check.svg`}
          alt=""
          aria-hidden
          width={7.67}
          height={6.84}
          className="absolute left-[6.67px] top-[7.5px]"
        />
      </span>
      <span className="whitespace-nowrap">{children}</span>
    </li>
  );
}

function FleetCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <article
      className={`relative shrink-0 overflow-hidden bg-[#121212] text-white ${mobile ? "min-h-[357px] w-full rounded-[8px] p-[12px]" : "flex h-[510px] w-[800px] items-center justify-center rounded-[16px] bg-[linear-gradient(0deg,#121212_0%,#121212_100%),#fff] p-[43.273px_37px_58.727px_36px]"}`}
      data-node-id={mobile ? "4064:16311" : "4064:14394"}
    >
      {mobile ? (
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col items-start gap-[12px]">
            <Eyebrow mobile>Enterprise</Eyebrow>
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px]">
              Need more than 50 vehicles?
            </h2>
            <p className="max-w-[273.5px] font-sans text-[12px] leading-[normal]">
              We check your routes on your own data first. Then connect with you.
            </p>
          </div>
          <div className="flex flex-col gap-[24px]">
            <ul className="flex flex-col gap-[8px]">
              {benefits.map((benefit) => <Benefit key={benefit} mobile>{benefit}</Benefit>)}
            </ul>
            <GradientButton href="#contact" mobile>Talk to Our Team</GradientButton>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-between">
          <div className="flex flex-col items-start gap-[14px]">
            <Eyebrow>Enterprise</Eyebrow>
            <h2 className="whitespace-nowrap font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px]">
              Need more than 50 vehicles?
            </h2>
            <p className="w-[368.4px] font-sans text-[16px] leading-[normal]">
              We check your routes on your own data first. Then connect with you.
            </p>
          </div>
          <div className="flex flex-col items-start gap-[24px]">
            <GradientButton href="#contact">Talk to Our Team</GradientButton>
            <ul className="grid grid-cols-[max-content_max-content] gap-x-[26px] gap-y-[16px]">
              {benefits.map((benefit) => <Benefit key={benefit}>{benefit}</Benefit>)}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}

function DealerGlows({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <div className={`pointer-events-none absolute flex items-center justify-center ${mobile ? "bottom-[-29.87px] right-[-58.52px] h-[284.698px] w-[293.304px]" : "bottom-[-13.32px] right-[-58.52px] h-[284.698px] w-[293.304px]"}`}>
        <div className="-scale-y-100 rotate-[31.43deg]">
          <div className="relative h-[197.262px] w-[223.192px]">
            <Image src={`${A}desktop-glow-1.svg`} alt="" aria-hidden width={495.706} height={469.776} className="absolute inset-[-69.07%_-61.05%] max-w-none" />
          </div>
        </div>
      </div>
      <div className={`pointer-events-none absolute flex items-center justify-center ${mobile ? "bottom-[-288.11px] right-[-24.75px] h-[543.008px] w-[550.963px]" : "bottom-[-271.56px] right-[-27.65px] h-[543.008px] w-[550.963px]"}`}>
        <div className="-scale-y-100 rotate-[31.43deg]">
          <div className="relative h-[385.908px] w-[409.875px]">
            <Image src={`${A}desktop-glow-2.svg`} alt="" aria-hidden width={618.842} height={594.875} className="absolute inset-[-27.07%_-25.49%] max-w-none" />
          </div>
        </div>
      </div>
    </>
  );
}

function DealerCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <article
      className={`relative shrink-0 overflow-hidden bg-[#121212] text-white ${mobile ? "h-[433px] w-full rounded-[8px]" : "h-[510px] w-[460px] rounded-[16px]"}`}
      data-node-id={mobile ? "4064:16344" : "4064:14430"}
    >
      <DealerGlows mobile={mobile} />
      <div className={`absolute overflow-hidden ${mobile ? "left-[12px] top-[116.61px] h-[373px] w-[467px]" : "left-[19.5px] top-[200.27px] h-[373px] w-[467px]"}`} aria-hidden>
        <Image
          src="/assets/neo/figma/stories/story-8.png"
          alt=""
          width={1280}
          height={1280}
          className="absolute left-0 top-0 h-[125.24%] w-full max-w-none"
        />
      </div>
      <div className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-start gap-[14px] ${mobile ? "top-[11.55px] w-[329px]" : "top-[40.27px] w-[calc(100%-52px)]"}`}>
        <Eyebrow mobile={mobile}>{mobile ? "38 cities open" : "38 cities open"}</Eyebrow>
        <h2 className={`w-full font-display font-semibold leading-[1.15] tracking-[-0.56px] ${mobile ? "text-[28px]" : "whitespace-nowrap text-[32px] tracking-[-0.64px]"}`}>
          Want to become a dealer?
        </h2>
        <p className={`font-sans leading-[normal] ${mobile ? "w-[263px] text-[12px]" : "w-[368.4px] text-[16px]"}`}>
          Your area, with clear numbers. We manage showroom setup and training.
        </p>
        {mobile ? (
          <div className="flex w-full items-start gap-[8px]">
            <a href="/products" className="flex self-stretch items-center justify-center rounded-[4px] border border-white/50 bg-white/[0.08] px-[16px] font-display text-[12px] font-semibold text-white no-underline">
              Download details
            </a>
            <GradientButton href="#contact" mobile>Apply now</GradientButton>
          </div>
        ) : (
          <div className="flex items-center gap-[8px]">
            <a href="/products" className="flex h-[42px] items-center justify-center rounded-[4px] border border-white/50 bg-white/[0.08] px-[24px] font-display text-[16px] font-semibold text-white no-underline">
              Download details
            </a>
            <GradientButton href="#contact" mobile={false}>Apply now</GradientButton>
          </div>
        )}
      </div>
    </article>
  );
}

export function NeoEnterpriseDesktop() {
  return (
    <section className="w-full bg-white px-5 pb-[19px] pt-0 min-[1440px]:px-[60px]" aria-label="Enterprise and dealer opportunities" data-node-id="4064:14393">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center gap-[20px] overflow-x-auto">
        <FleetCard />
        <DealerCard />
      </div>
    </section>
  );
}

export function NeoEnterpriseMobile() {
  return (
    <section className="flex w-full flex-col items-start gap-[16px] bg-white px-[20px] pb-[20px] pt-[8px]" aria-label="Enterprise and dealer opportunities" data-node-id="4064:16310">
      <FleetCard mobile />
      <DealerCard mobile />
    </section>
  );
}
