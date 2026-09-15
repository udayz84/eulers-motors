import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

/**
 * TECHNOLOGY section (desktop 1:1618 · mobile 1:4784).
 * Four cards: 01 Battery · 02 Safety · 03 App (+store badges) · 04 Performance.
 */
export default function Technology() {
  return (
    <section id="technology" className="bg-white" aria-label="Technology">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 pb-6 pt-10 lg:w-[1280px] lg:gap-[42px] lg:px-0 lg:pb-12 lg:pt-12">
        {/* header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <Eyebrow label="Built for the job" />
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
              Built for Indian roads.
            </h2>
          </div>
          <Button variant="dark" arrow="white" className="self-start lg:self-auto">
            See how it works
          </Button>
        </div>

        {/* cards */}
        <div className="flex flex-col gap-3 lg:gap-5">
          {/* row 1 */}
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
            <article className="relative h-[250px] w-full overflow-clip rounded-xl bg-[#d9e1eb] lg:h-[431px] lg:w-[519px] lg:rounded-3xl">
              {/* desktop card art (Figma CARD fills) */}
              <Image src="/assets/technology/card-battery.png" alt="" fill sizes="(max-width:1024px) 393px, 519px" className="object-cover max-lg:hidden" />
              <Image
                src="/assets/technology/battery.png"
                alt="Water-cooled Euler battery pack"
                width={471}
                height={349}
                className="pointer-events-none absolute left-[32%] top-[-25%] w-[91%] object-cover max-lg:left-[30%] max-lg:top-1 max-lg:w-[80%]"
              />
              <CardHeading
                num="01 / Battery"
                title="Full range, even in garmi."
                desc="Batteries lose range above 40 degrees. The Euler battery is water cooled, maintaining range year-round."
              />
            </article>
            <article className="relative h-[250px] w-full overflow-clip rounded-xl lg:h-[431px] lg:flex-1 lg:rounded-3xl">
              {/* desktop: cabin interior · mobile: truck exterior photo (different Figma fills) */}
              <Image src="/assets/technology/card-safety.png" alt="" fill sizes="(max-width:1024px) 393px, 741px" className="object-cover max-lg:hidden" />
              <Image src="/assets/technology/card-safety-mobile.png" alt="" fill sizes="393px" className="object-cover lg:hidden" />
              {/* mobile scrim behind the heading (Figma Rectangle 42162) */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-[103px] bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
              <div aria-hidden className="absolute -left-20 -top-4 h-[185px] w-[812px] opacity-60 blur-[60px]" style={{ background: "radial-gradient(50% 50% at 40% 50%, rgba(255,255,255,0.5), transparent)" }} />
              <CardHeading
                className="lg:pt-7"
                num="02 / Safety"
                title="Comfortable for an 11-hour day."
                desc="Steel cabin, power steering, good seats, AC. Reverse camera and warnings included."
              />
            </article>
          </div>

          {/* row 2 */}
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
            <article className="relative h-[250px] w-full overflow-clip rounded-xl lg:h-[343px] lg:w-[671px] lg:rounded-3xl">
              <Image src="/assets/technology/app-photo.png" alt="" fill sizes="(max-width:1024px) 393px, 671px" className="object-cover max-lg:hidden" />
              <Image src="/assets/technology/card-app-mobile.png" alt="" fill sizes="393px" className="object-cover lg:hidden" />
              <Image
                src="/assets/technology/app-phone.png"
                alt="Euler fleet app on a phone"
                width={292}
                height={440}
                className="pointer-events-none absolute right-0 top-0 h-[128%] w-auto object-cover max-lg:hidden"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-[14px] lg:inset-auto lg:bottom-[123px] lg:left-[30px] lg:w-[376px] lg:p-0">
                <CardHeading
                  num="03 / App"
                  title="Poori fleet, ek phone mein."
                  desc="Track vehicle locations, charge levels, driving behavior, and service due dates all on one screen."
                />
                <div className="mt-2 flex items-start gap-[4.8px]">
                  {/* App Store badge — Figma "Component 2" (126×42, r6, border #a6a6a6) */}
                  <span className="flex h-[22.1px] w-[66.3px] items-center gap-[2.35px] rounded-[3.3px] border border-[#a6a6a6] bg-black px-[3.7px] lg:h-[42px] lg:w-[126px] lg:gap-2 lg:rounded-md lg:px-[7.35px]">
                    <Image src="/assets/technology/apple.svg" alt="" width={11} height={13} aria-hidden className="h-[13px] w-[11px] lg:h-[25px] lg:w-[21px]" />
                    <span className="flex flex-col text-white">
                      <span className="text-[5px] leading-[1.2] lg:text-[9.45px]">Download on the</span>
                      <span className="text-[9.9px] font-medium leading-none tracking-[-0.47px] lg:text-[18.9px]">App Store</span>
                    </span>
                  </span>
                  {/* Google Play badge — Figma "Component 3" */}
                  <span className="flex h-[22.1px] w-[66.3px] items-center gap-[2.35px] rounded-[3.3px] border border-[#a6a6a6] bg-black px-[3.7px] lg:h-[42px] lg:w-[126px] lg:gap-2 lg:rounded-md lg:px-[7.35px]">
                    <Image src="/assets/technology/playstore.svg" alt="" width={12} height={13} aria-hidden className="h-[13px] w-[12px] lg:h-[25px] lg:w-[22px]" />
                    <span className="flex flex-col gap-[1.7px] text-white">
                      <span className="text-[5.5px] uppercase leading-none lg:text-[10.5px]">GET IT ON</span>
                      <Image src="/assets/technology/play-wordmark.svg" alt="Google Play" width={41} height={8} className="w-[20px] lg:w-[41px]" />
                    </span>
                  </span>
                </div>
              </div>
            </article>
            <article className="relative h-[250px] w-full overflow-clip rounded-xl lg:h-[343px] lg:flex-1 lg:rounded-3xl">
              <Image src="/assets/technology/card-perf.png" alt="" fill sizes="(max-width:1024px) 393px, 589px" className="object-cover max-lg:hidden" />
              <Image src="/assets/technology/card-perf-mobile.png" alt="" fill sizes="393px" className="object-cover lg:hidden" />
              <CardHeading
                num="04 / Performance"
                title="Climbs a slope on a full load."
                desc="Our own Arc Reactor motor. It climbs 22 to 25 percent slopes with a full load. Ramps, flyovers and rough roads are no problem."
                className="lg:bottom-[21px] lg:left-9"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardHeading({
  num,
  title,
  desc,
  className = "",
}: {
  num: string;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-x-[14px] bottom-[14px] flex flex-col gap-3 lg:inset-x-7 lg:bottom-7 lg:gap-3 ${className}`}>
      <p className="font-display text-[12px] font-bold uppercase leading-[17.82px] tracking-[1.98px] text-ink-3 lg:text-[11px]">
        {num}
      </p>
      <h3 className="font-display text-[18px] font-bold leading-[1.15] tracking-[-0.84px] text-ink lg:text-[28px] lg:font-semibold">
        {title}
      </h3>
      <p className="max-w-full text-[12px] leading-snug text-ink lg:max-w-[427px] lg:text-[16px] lg:leading-normal">
        {desc}
      </p>
    </div>
  );
}
