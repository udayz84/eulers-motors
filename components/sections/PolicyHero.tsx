import FloatingWidget from "@/components/FloatingWidget";
import Image from "next/image";

export default function PolicyHero({
  label,
  title,
  variant = "privacy",
}: {
  label: string;
  title: string;
  variant?: "refund" | "privacy";
}) {
  return (
    <section
      aria-label={`${title} Banner`}
      className="policy-hero relative flex w-full items-center justify-center overflow-x-clip overflow-y-visible bg-[#1d6fff] text-white"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),repeating-linear-gradient(0deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),linear-gradient(272deg,#0e2f6d -63.51%,#1d6fff 87.23%)",
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-[108px] pb-8 text-center sm:px-8 sm:pt-[124px] sm:pb-12 md:px-12 md:pt-[140px] md:pb-16 lg:pt-[164px] lg:pb-[104px]">
        {/* Eyebrow badge */}
        <div className="relative flex items-center gap-1 text-[12px] font-bold uppercase leading-normal tracking-[0.6px] sm:text-[13px] lg:gap-1.5 lg:text-[14px] lg:leading-none lg:tracking-[0.7px]">
          <Image
            src="/assets/products/badge-line-white.svg"
            alt=""
            width={117}
            height={16}
            aria-hidden
            className="absolute left-[3.43px] top-0 h-4 w-[117px] lg:h-[20.355px] lg:w-[148.821px]"
          />
          <Image
            src="/assets/products/badge-cap-white.svg"
            alt=""
            width={14.794}
            height={16}
            aria-hidden
            className="relative h-4 w-[14.794px] lg:h-[20.355px] lg:w-[18.821px]"
          />
          {label}
        </div>
        {/* Heading */}
        <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white mt-3 sm:mt-4 sm:text-[40px] md:mt-5 md:text-[46px] md:tracking-[-0.88px] lg:mt-6 lg:text-[52px] lg:tracking-[-1.04px]">
          {title}
        </h1>
        {/* Description */}
        <p className="mt-3 max-w-[311px] font-sans text-[12px] font-normal leading-normal text-white sm:mt-4 sm:max-w-[420px] sm:text-[14px] md:max-w-[493px] md:text-[15px] md:leading-relaxed lg:text-[16px] sm:text-white/90">
          We protect your data and respect your privacy.
        </p>
      </div>
      <FloatingWidget boundary desktopClassName="lg:top-1/2 lg:-translate-y-1/2" />
    </section>
  );
}
