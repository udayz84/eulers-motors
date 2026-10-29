import Eyebrow from "@/components/ui/Eyebrow";
import FloatingWidget from "@/components/FloatingWidget";

/**
 * FAQ Hero / Banner Section — Figma node 3538:26147 (Desktop) & 2979:7907 (Mobile)
 * Blue tech grid gradient banner with Help Centre eyebrow, heading, and description.
 */
export default function FaqHero() {
  return (
    <section
      aria-label="FAQ Banner"
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(-84.34deg, rgb(14, 47, 109) 63.51%, rgb(29, 111, 255) 87.23%)",
      }}
    >
      {/* Blueprint grid background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-12 bg-repeat bg-top-left"
        style={{
          backgroundImage: "url('/assets/faq/faq-banner-grid.png')",
          backgroundSize: "720px auto",
        }}
      />

      {/* Subtle bottom blur accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[1200px] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]"
      />

      {/* Content Container */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-[108px] pb-8 text-center sm:px-8 sm:pt-[124px] sm:pb-12 md:px-12 md:pt-[140px] md:pb-16 lg:pt-[164px] lg:pb-[104px]">
        {/* Eyebrow */}
        <div className="mb-3 flex h-6 items-center sm:mb-4 md:mb-5 lg:mb-6">
          <Eyebrow label="Help centre" dark icons="white" className="font-bold text-[12px] sm:text-[13px] lg:text-[14px] tracking-[0.6px] lg:tracking-[0.7px] uppercase" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-[40px] md:text-[46px] md:tracking-[-0.88px] lg:text-[52px] lg:tracking-[-1.04px]">
          Frequently asked <br className="sm:hidden" />
          questions
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-[311px] font-sans text-[12px] font-normal leading-normal text-white sm:mt-4 sm:max-w-[420px] sm:text-[14px] md:max-w-[493px] md:text-[15px] lg:text-[16px] md:leading-relaxed lg:leading-normal sm:text-white/90">
          Find answers to the most common questions about our vehicles, charging, service, warranty and more.
        </p>
      </div>

      {/* Floating Action Rail on Mobile (Figma node 2979:8005) */}
      <FloatingWidget mobileOnly boundary />
    </section>
  );
}
