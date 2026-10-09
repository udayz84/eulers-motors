import Image from "next/image";
import Link from "next/link";
import DealerLocator from "@/components/sections/DealerLocator";
import FloatingWidget from "@/components/FloatingWidget";

const ASSET = "/assets/dealer-locator-hero/";

function SupportBadge() {
  return (
    <div className="relative flex h-5 items-center gap-1 lg:h-[21px] lg:gap-[6px]">
      <Image src={`${ASSET}desktop-support-left.svg`} alt="" width={149} height={21} aria-hidden="true" className="absolute left-[3px] top-0 hidden h-[21px] w-[149px] lg:block" />
      <Image src={`${ASSET}desktop-support-right.svg`} alt="" width={19} height={21} aria-hidden="true" className="relative hidden h-[21px] w-[19px] lg:block" />
      <span aria-hidden="true" className="absolute left-[3.43px] top-[2px] block h-4 w-[116.978px] lg:hidden">
        <Image src={`${ASSET}mobile-support-left.svg`} alt="" width={114.561} height={16} className="absolute left-[1.03%] top-0 max-w-none" />
      </span>
      <span aria-hidden="true" className="relative flex h-4 w-[14.794px] shrink-0 lg:hidden">
        <Image src={`${ASSET}mobile-support-right.svg`} alt="" width={14.1899} height={16} className="absolute left-[4.08%] top-0 max-w-none" />
      </span>
      <span className="relative font-sans text-xs font-bold uppercase leading-normal tracking-[0.6px] text-white lg:text-sm lg:tracking-[0.7px]">Support</span>
    </div>
  );
}

function SupportTabs({ active = "dealer" }: { active?: "dealer" | "charging" }) {
  return (
    <div
      className="relative flex h-9 w-[353px] items-center rounded-[43px] bg-[rgba(255,255,255,0.12)] p-0.5 lg:h-[46px] lg:w-[473px] lg:p-0.5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[0.5px] z-20 box-border rounded-[inherit] p-[0.5px]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.85))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.5px] left-[18px] right-[18px] z-20 h-[0.5px] rounded-full bg-gradient-to-r from-white/20 to-white/85 lg:left-[23px] lg:right-[23px]"
      />
      <Link
        href="/dealer-locator"
        aria-current={active === "dealer" ? "page" : undefined}
        className={`flex h-8 shrink-0 items-center whitespace-nowrap rounded-[500px] px-3 font-sans text-xs font-semibold leading-none lg:h-[42px] lg:px-4 lg:text-base ${active === "dealer" ? "border-[0.5px] border-solid border-white bg-white text-[#121212]" : "text-white"}`}
      >
        Dealer Locator
      </Link>
      <Link
        href="/charging-stations"
        aria-current={active === "charging" ? "page" : undefined}
        className={`flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 font-sans text-xs font-semibold leading-none lg:h-[42px] lg:px-4 lg:text-base ${active === "charging" ? "border-[0.5px] border-solid border-white bg-white text-[#121212]" : "text-white"}`}
      >
        Charging Stations
      </Link>
      <span
        aria-disabled="true"
        className="flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 font-sans text-xs font-semibold leading-none text-white lg:h-[42px] lg:px-4 lg:text-base"
      >
        Service Centers
      </span>
    </div>
  );
}

export default function DealerLocatorHero({ variant = "dealer" }: { variant?: "dealer" | "charging" }) {
  const charging = variant === "charging";
  return (
    <section
      aria-label={charging ? "Find a charging point" : "Find your nearest dealer"}
      className={`relative mx-auto isolate h-[1166px] w-full max-w-[393px] self-stretch overflow-hidden bg-[#1d6fff] lg:mx-0 lg:h-[1265px] lg:max-w-none ${charging ? "mb-5" : ""}`}
      style={{
        backgroundColor: "lightgray",
        backgroundImage: "linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: `url("${ASSET}desktop-texture.png")`,
          backgroundPosition: "left top",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <Image src={`${ASSET}mobile-texture.png`} alt="" fill sizes="393px" className="object-fill object-bottom" />
      </div>
      <div className="absolute left-[calc(50%+6.5px)] top-[428.54px] h-[1129.558px] w-[4141.919px] -translate-x-1/2 rounded-full bg-white blur-[220.45px] lg:left-[-859.81px] lg:top-[780.1px] lg:h-[984.503px] lg:w-[3610.026px]" aria-hidden="true" />
      <div className="absolute hidden left-[calc(100%+859.81px)] top-[780.1px] h-[984.503px] w-[3610.026px] -translate-x-1/2 rounded-full bg-white blur-[220.45px] lg:block" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px]"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)" }}
      />

      <div className="absolute left-1/2 top-[120px] z-10 flex w-[353px] -translate-x-1/2 flex-col items-center gap-3 lg:top-[151px] lg:w-[846px] lg:gap-6">
        <SupportBadge />
        <SupportTabs active={charging ? "charging" : "dealer"} />
        <h1 className="w-[246px] text-center font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white lg:w-[789px] lg:text-[52px] lg:tracking-[-1.04px]">{charging ? "Find a charging point." : "Find your nearest dealer."}</h1>
        <p className="whitespace-nowrap text-center font-sans text-xs leading-normal text-white lg:text-base">
          {charging ? "1,412 points across India, with live status on each one." : "Every dealer brings the vehicle to you for a test drive."}
        </p>
      </div>

      <div className="absolute left-1/2 top-[330.66px] z-10 w-full -translate-x-1/2 lg:top-[450px]">
        <DealerLocator
          variant={variant}
          searchLabel={charging ? "Search charging points by area" : "Search dealers by area"}
        />
      </div>
      <FloatingWidget mobileOnly />
    </section>
  );
}
