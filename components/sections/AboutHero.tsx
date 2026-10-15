import Image from "next/image";
import FloatingWidget from "@/components/FloatingWidget";

/**
 * About Hero section (Figma desktop: 3524:16430, mobile: 2894:10628).
 * Hero banner with background image, gradient overlay, and text content.
 * Exact implementation matching both mobile and desktop designs.
 */
export default function AboutHero() {
  return (
    <section
      className="relative aspect-[393/762] w-full overflow-hidden sm:aspect-[9/5] sm:h-[800px] sm:w-full"
      aria-label="About Euler Motors"
    >
      {/* Mobile Background Image */}
      <div aria-hidden className="absolute inset-0 pointer-events-none sm:hidden">
        <Image
          src="/assets/about-euler/mobile-bg-new.png"
          alt=""
          fill
          sizes="100vw"
          className="object-bottom"
        />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/about-euler/mobile-overlay-new.png"
            alt=""
            fill
            sizes="100vw"
            className="h-[103.55%] left-[-2.05%] top-[-3.59%] w-[104.1%]"
          />
        </div>
        {/* Mobile Gradient Overlay - matching Figma's 188.67740589081268deg gradient */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(188.67740589081268deg, rgba(0, 0, 0, 0) 56.444%, rgba(0, 0, 0, 0.8) 99.952%)" }} />
      </div>

      {/* Desktop Background — gradient + image per Figma
          (182deg · image 0.219px -25.662px / 99.985% 103.164%) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none max-sm:hidden"
        style={{
          background:
            "linear-gradient(182deg, rgba(0, 0, 0, 0) 56.69%, rgba(0, 0, 0, 0.80) 93.41%), url('/assets/about-euler/desktop-bg-new.png') lightgray 0 -25.662px / 100% 103.164% no-repeat",
        }}
      />

      {/* Mobile Content */}
      <div className="absolute bottom-[28.67px] left-1/2 -translate-x-1/2 w-[353px] flex flex-col gap-[12px] items-start justify-center sm:hidden">
        {/* Mobile Eyebrow */}
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
            <Image
              src="/assets/about-euler/mobile-rect-1-new.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
            <Image
              src="/assets/about-euler/mobile-rect-2-new.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
            About Euler Motors
          </p>
        </div>
        <h1 className="w-[289px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white">
          Driving India's Electric Future
        </h1>
        <p className="w-[316px] text-[12px] font-normal leading-normal text-white">
          Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.
        </p>
      </div>

      {/* Desktop Content */}
      <div className="absolute bottom-[60.52px] left-1/2 -translate-x-1/2 hidden sm:flex sm:flex-col sm:gap-[20px] sm:items-center">
        {/* Desktop Eyebrow */}
        <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
          <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
            <Image
              src="/assets/about-euler/desktop-rect-1-new.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
            <Image
              src="/assets/about-euler/desktop-rect-2-new.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <p className="font-sans font-bold leading-normal relative shrink-0 text-[14px] text-white tracking-[0.7px] uppercase whitespace-nowrap">
            About Euler Motors
          </p>
        </div>
        <h1 className="w-[788.543px] font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px] text-center text-white">
          Driving India's Electric Future
        </h1>
        <p className="w-[604.962px] text-[16px] font-normal leading-normal text-center text-white">
          Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.
        </p>
      </div>

      {/* quick-action rail — scoped to the hero (same as the home hero) */}
      <FloatingWidget />
    </section>
  );
}
