"use client";

import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

/**
 * AboutAwards - "Join the journey" hiring/careers section
 * Desktop Figma: node-id 3538-20555
 * Mobile Figma: node-id 2937-16069
 */
export default function AboutAwards() {
  return (
    <section
      className="relative h-[600px] lg:h-[700px] overflow-hidden bg-black"
      aria-label="Join the journey"
    >
      {/* Background image with gradient overlays */}
      <div className="absolute inset-0">
        <Image
          src="/assets/about-euler/hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </div>

      {/* Content - Desktop: left-[80px] top-1/2, Mobile: bottom-[302px] centered */}
      <div className="relative z-10 flex h-full items-center px-5 lg:px-[80px] lg:items-center lg:justify-start">
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-[646px]">
          {/* Eyebrow with decorative SVGs */}
          <Eyebrow label="Join the journey" dark />

          {/* Heading */}
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:text-[52px] lg:tracking-[-1.04px]">
            We are hiring, and we are selling
          </h2>

          {/* Description */}
          <p className="max-w-[474px] text-[14px] leading-snug text-white/90 lg:text-[16px] lg:leading-normal">
            We help people earn more by building electric vehicles that are
            reliable, efficient, and affordable. Join us in transforming the
            last-mile logistics industry.
          </p>

          {/* Button */}
          <Button variant="white" arrow="ink" href="/careers">
            View Job openings
          </Button>
        </div>
      </div>
    </section>
  );
}
