"use client";

import Image from "next/image";

const features = [
  ["24 hours", "Truck back in a day"],
  ["Spare vehicle", "Totally free"],
  ["Every 3 months", "Free check-up at your depot"],
];

export default function EulerPrimeBannerMobile() {
  return (
    <section id="prime" className="relative h-[583px] w-full overflow-hidden bg-black lg:hidden" aria-label="Euler Prime service">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/assets/euler-prime/prime-mobile-layer-1.png"
          alt=""
          width={2180}
          height={965}
          className="absolute left-[-78.67%] top-[48.03%] h-[51.83%] max-w-none w-[178.63%]"
          priority
        />
        <Image
          src="/assets/euler-prime/prime-mobile-layer-2.png"
          alt=""
          width={2180}
          height={965}
          className="absolute left-[-112.56%] top-[43.75%] h-[58.45%] max-w-none w-[216.49%]"
          priority
        />
      </div>

      <div className="absolute left-1/2 top-[36.33px] flex w-[min(353px,calc(100%-40px))] -translate-x-1/2 flex-col items-start justify-center gap-[14px]">
        <div className="flex items-center gap-[6px]">
          <Image src="/assets/euler-prime-logo.svg" alt="" width={14} height={14} aria-hidden />
          <p className="font-sans text-[12px] font-normal leading-normal text-white uppercase">Euler Prime</p>
        </div>

        <h2 className="w-full max-w-[310.678px] font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.56px] text-white">
          Your work does not stop for service.
        </h2>

        <p className="w-full max-w-[332.967px] font-sans text-[12px] font-normal leading-normal text-white">
          Return the car within 24 hours, and we&rsquo;ll provide you with a complimentary spare vehicle.
        </p>

        <div
          className="h-[90px] w-full rounded-[5.507px] p-[10px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(19, 157, 216, 0.5), rgba(19, 157, 216, 0.5)), linear-gradient(90deg, rgba(14, 47, 109, 0.35), rgba(14, 47, 109, 0.35))",
          }}
        >
          <div className="flex w-full flex-col items-start justify-center gap-[11.014px]">
            {features.map(([title, description]) => (
              <div key={title} className="flex items-center gap-[5.507px]">
                <p className="whitespace-nowrap font-display text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-center text-[#f3f4f5]">
                  {title}
                </p>
                <span aria-hidden className="size-[4.956px] shrink-0 rounded-full bg-white/50" />
                <p className="whitespace-nowrap font-sans text-[12px] font-normal leading-normal text-[#ccc]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="/service-centers"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[linear-gradient(106.45deg,#00ff87_28.559%,#1d6fff_124.97%)] py-[2px] pl-3 pr-[2px] transition-transform hover:scale-[1.02]"
        >
          <span className="font-display text-[12px] font-semibold leading-none text-white">See Euler Prime</span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[1.684px] bg-[#121212]">
            <Image src="/assets/euler-prime-arrow.svg" alt="" width={19} height={12} aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
