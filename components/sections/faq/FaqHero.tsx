import Eyebrow from "@/components/ui/Eyebrow";
import FloatingWidget from "@/components/FloatingWidget";
import MobilePageHero from "@/components/sections/MobilePageHero";

/**
 * FAQ Hero / Banner Section — Figma node 3538:26147 (Desktop) & 2979:7907 (Mobile)
 * Blue tech grid gradient banner with Help Centre eyebrow, heading, and description.
 */
export default function FaqHero() {
  return (
    <>
    <div className="lg:hidden">
      <MobilePageHero
        label="Help centre"
        title={<>Frequently asked <br className="sm:hidden" /> questions</>}
        description="Find answers to the most common questions about our vehicles, charging, service, warranty and more."
      />
    </div>
    <div className="hidden lg:block">
    <section
      aria-label="FAQ Banner"
      className="relative w-full overflow-hidden bg-[linear-gradient(-84.34deg,#0e2f6d_63.51%,#1d6fff_87.23%)] lg:h-[420px] lg:w-full lg:max-w-full lg:overflow-x-clip lg:overflow-y-visible lg:bg-[repeating-linear-gradient(90deg,transparent_0,transparent_67px,rgba(0,0,0,.12)_68px),repeating-linear-gradient(0deg,transparent_0,transparent_67px,rgba(0,0,0,.12)_68px),linear-gradient(272deg,#0e2f6d_-63.51%,#1d6fff_87.23%)]"
    >
      {/* Blueprint grid background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-12 bg-repeat bg-top-left lg:hidden"
        style={{
          backgroundImage: "url('/assets/faq/faq-banner-grid.png')",
          backgroundSize: "720px auto",
        }}
      />

      {/* Subtle bottom blur accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[1200px] -translate-x-1/2 rounded-full bg-white/10 blur-[100px] lg:hidden"
      />

      {/* Content Container */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-[108px] pb-8 text-center sm:px-8 sm:pt-[124px] sm:pb-12 md:px-12 md:pt-[140px] md:pb-16 lg:h-[420px] lg:w-full lg:max-w-full lg:items-center lg:justify-center lg:px-0 lg:pt-0 lg:pb-0">
        <div className="contents lg:inline-flex lg:flex-col lg:items-center lg:gap-6">
          {/* Eyebrow */}
          <div className="mb-3 flex h-6 items-center sm:mb-4 md:mb-5 lg:mb-0">
            <Eyebrow label="Help centre" dark icons="white" className="font-bold text-[12px] sm:text-[13px] lg:text-[14px] tracking-[0.6px] lg:tracking-[0.7px] uppercase" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-[40px] md:text-[46px] md:tracking-[-0.88px] lg:w-[788.543px] lg:text-[52px] lg:tracking-[-1.04px]">
            Frequently asked <br className="sm:hidden" />
            questions
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-[311px] font-sans text-[12px] font-normal leading-normal text-white sm:mt-4 sm:max-w-[420px] sm:text-[14px] md:max-w-[493px] md:text-[15px] lg:mt-0 lg:w-[493.019px] lg:max-w-none lg:text-[16px] md:leading-relaxed lg:leading-normal sm:text-white/90">
            Find answers to the most common questions about our vehicles, charging, service, warranty and more.
          </p>
        </div>
      </div>

      {/* Floating Action Rail (desktop aligned to hero centre like the policy pages) */}
      <FloatingWidget boundary desktopClassName="lg:top-1/2 lg:-translate-y-1/2" />
    </section>
    </div>
    </>
  );
}
