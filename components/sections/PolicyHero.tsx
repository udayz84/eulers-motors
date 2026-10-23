import FloatingWidget from "@/components/FloatingWidget";
import Image from "next/image";

export default function PolicyHero({ label, title, variant = "privacy" }: { label: string; title: string; variant?: "refund" | "privacy" }) {
  const isRefund = variant === "refund";
  return (
    <section className={`policy-hero relative flex ${isRefund ? "h-[272px] lg:h-[420px]" : "h-[272px] lg:h-[420px]"} w-full items-center justify-center overflow-x-clip overflow-y-visible bg-[#1d6fff] text-white`} style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),repeating-linear-gradient(0deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),linear-gradient(272deg,#0e2f6d -63.51%,#1d6fff 87.23%)" }}>
      <div className="relative z-10 flex translate-y-[28px] flex-col items-center gap-[12px] text-center lg:translate-y-[25px] lg:gap-0">
        <div className="relative flex items-center gap-1 text-[12px] font-bold uppercase leading-normal tracking-[0.6px] lg:gap-1.5 lg:text-[14px] lg:leading-none lg:tracking-[0.7px]">
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
        <h1 className={`font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] lg:mt-[25px] lg:text-[52px] lg:tracking-[-1.04px]`}>{title}</h1>
        <p className="text-[12px] leading-normal lg:mt-[27px] lg:text-[16px]">We protect your data and respect your privacy.</p>
      </div>
      <FloatingWidget mobileClassName={isRefund ? "top-[615px]" : "top-[591px]"} desktopClassName="lg:top-[400px]" />
    </section>
  );
}
