import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

/**
 * TECHNOLOGY section (desktop 1:1618 · mobile 1:4784).
 * Four cards: 01 Battery · 02 Safety (heading top-left on mobile) · 03 App
 * (+store badges, phone mockup on mobile) · 04 Performance. Mobile CTA sits
 * below the cards, centered (1:4818); desktop keeps it in the header.
 * Desktop card art/positions follow Figma 1:1640–1:1668 exactly.
 */
export default function Technology() {
  return (
    <section id="technology" className="bg-white" aria-label="Technology">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 pb-3 pt-[42px] lg:w-[1360px] lg:max-w-full lg:gap-[42px] lg:px-0 lg:pb-12 lg:pt-12">
        {/* header — Figma 1:1619: subheading left · button bottom-aligned right (lg) */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[14px]">
            <Eyebrow label="Built for the job" />
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[52px] lg:tracking-[-1.04px]">
              Built for Indian roads.
            </h2>
          </div>
          {/* wrapper hides on mobile — Button's base `inline-flex` beats a plain
              `hidden` under Tailwind v4's cascade, so the display toggle lives here */}
          <div className="hidden lg:block">
            <Button variant="dark" arrow="white">
              See how it works
            </Button>
          </div>
        </div>

        {/* cards — mobile 12px apart, rows 20px apart on lg (Figma 1:1639) ·
            mobile CTA 24px below the cards, centered (Figma 1:4818) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 lg:gap-5">
            {/* row 1 */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
              <article className="relative h-[250px] w-full overflow-clip rounded-xl bg-[#d9e1eb] sm:h-[300px] md:h-[360px] lg:h-[431px] lg:w-[519px] lg:rounded-3xl">
                {/* desktop card art — both Figma CARD fills (1:1641), bottom-anchored */}
                <Image src="/assets/technology/card-battery.png" alt="" fill sizes="(max-width:1024px) 393px, 519px" className="object-cover object-bottom max-lg:hidden" />
                <Image src="/assets/technology/card-battery2.png" alt="" fill sizes="(max-width:1024px) 393px, 519px" className="object-cover object-bottom max-lg:hidden" />
                {/* battery pack — mobile Figma 1:4798: 309.6×229.3 at (114.13, -81.26)
                    of the 353px card · desktop Figma 1:1646: 470.947×348.682 at (164.57, -108.52) */}
                <Image
                  src="/assets/technology/battery.png"
                  alt="Water-cooled Euler battery pack"
                  width={471}
                  height={349}
                  className="pointer-events-none absolute left-[32.35%] top-[-81.26px] w-[87.72%] object-cover lg:left-[164.57px] lg:top-[-108.52px] lg:h-[348.682px] lg:w-[470.947px]"
                />
                <CardHeading
                  className="lg:bottom-auto lg:left-[28px] lg:top-[281px] lg:w-[534px]"
                  num="01 / Battery"
                  title="Full range, even in garmi."
                  desc="Batteries lose range above 40 degrees. The Euler battery is water cooled, maintaining range year-round."
                />
              </article>
              <article className="relative h-[250px] w-full overflow-clip rounded-xl sm:h-[300px] md:h-[360px] lg:h-[431px] lg:flex-1 lg:rounded-3xl">
                {/* desktop: cabin interior · mobile: truck exterior photo (different Figma fills) */}
                <Image src="/assets/technology/card-safety.png" alt="" fill sizes="(max-width:1024px) 393px, 741px" className="object-cover max-lg:hidden" />
                <Image src="/assets/technology/card-safety-mobile.png" alt="" fill sizes="393px" className="object-cover lg:hidden" />
                {/* mobile scrim behind the top-left heading (Figma 1:4800: #d0d9e9 fade) */}
                <div aria-hidden className="absolute inset-x-0 top-0 h-[103px] bg-gradient-to-b from-[#d0d9e9] to-transparent lg:hidden" />
                {/* desktop glow — Ellipse 3424 svg (Figma 1:1648): container 811.56×184.94
                    at (-79.29, -16.87), svg oversized via insets -85.11%/-19.39% */}
                <div aria-hidden className="absolute left-[-79.29px] top-[-16.87px] hidden h-[184.94px] w-[811.56px] lg:block">
                  <div className="absolute inset-[-85.11%_-19.39%]">
                    <Image src="/assets/technology/ellipse.svg" alt="" fill sizes="1127px" className="pointer-events-none" />
                  </div>
                </div>
                {/* mobile: heading at top-left over the fade (Figma 1:4801) ·
                    desktop: below the glow */}
                <CardHeading
                  className="max-lg:bottom-auto max-lg:right-auto max-lg:top-[14px] max-lg:w-[281px] lg:bottom-auto lg:left-[28px] lg:top-[30px] lg:w-[534px]"
                  num="02 / Safety"
                  title="Comfortable for an 11-hour day."
                  titleW="max-lg:max-w-[236px] lg:max-w-[244px]"
                  descW="max-lg:max-w-[187px] lg:max-w-[327px]"
                  desc="Steel cabin, power steering, good seat, air conditioning. Reverse camera and warnings standard."
                />
              </article>
            </div>

            {/* row 2 */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
              <article className="relative h-[250px] w-full overflow-clip rounded-xl sm:h-[290px] md:h-[330px] lg:h-[343px] lg:w-[671px] lg:rounded-3xl">
                {/* bg — Figma 1:1655: a 671×442 image frame at top-0.36, clipped by the card */}
                <Image
                  src="/assets/technology/app-photo.png"
                  alt=""
                  width={671}
                  height={442}
                  className="pointer-events-none absolute left-0 top-[0.36px] h-[442px] w-[671px] object-cover max-lg:hidden"
                />
                <Image src="/assets/technology/card-app-mobile.png" alt="" fill sizes="393px" className="object-cover lg:hidden" />
                {/* mobile phone mockup — Figma 1:4799 overlay: 51.41% wide at
                    (55.15%, 6.34%), bleeding past the card bottom */}
                <Image
                  src="/assets/technology/app-phone-mobile.png"
                  alt="Euler fleet app on a phone"
                  width={181}
                  height={259}
                  className="pointer-events-none absolute left-[55.15%] top-[6.34%] h-[103.63%] w-[51.41%] object-cover lg:hidden"
                />
                {/* phone — desktop Figma 1:1656: 292×440 at (370, 25.22) */}
                <Image
                  src="/assets/technology/app-phone.png"
                  alt="Euler fleet app on a phone"
                  width={292}
                  height={440}
                  className="pointer-events-none absolute left-[370px] top-[25.22px] h-[440px] w-[292px] object-cover max-lg:hidden"
                />
                {/* on lg the wrapper spans the card so heading and badges place
                    independently (Figma 1:1657/1:1661); mobile keeps the narrow
                    heading column at bottom-left, badges in flow (Figma 1:4806) */}
                <div className="absolute bottom-[76.9px] left-[14px] flex w-[197.8px] flex-col gap-3 lg:inset-0 lg:w-auto lg:p-0">
                  <CardHeading
                    className="max-lg:static lg:right-auto lg:bottom-[123.36px] lg:left-[30px] lg:w-[376px]"
                    num="03 / App"
                    title="Poori fleet, ek phone mein."
                    descW="lg:max-w-[376px]"
                    desc="Track vehicle locations, charge levels, driving behavior, and service due dates all on one screen."
                  />
                  <div className="flex items-start gap-[4.8px] lg:absolute lg:left-[30px] lg:top-[253.29px]">
                    {/* App Store badge — Figma "Component 2" (r6, border #a6a6a6). Width is
                        content-hugged: Manrope runs wider than Figma's SF Compact at 18.9px */}
                    <span className="flex h-[22.1px] w-auto shrink-0 items-center gap-[2.35px] rounded-[3.3px] border border-[#a6a6a6] bg-black px-[3.7px] lg:h-[42px] lg:gap-2 lg:rounded-md lg:px-[7.35px]">
                      <Image src="/assets/technology/apple.svg" alt="" width={11} height={13} aria-hidden className="h-[13px] w-[11px] lg:h-[25.2px] lg:w-[21px]" />
                      <span className="flex flex-col whitespace-nowrap text-white">
                        <span className="text-[5px] leading-[1.2] lg:text-[9.45px] lg:leading-[9.45px]">Download on the</span>
                        <span className="text-[9.9px] font-medium leading-none tracking-[-0.47px] lg:text-[18.9px]">App Store</span>
                      </span>
                    </span>
                    {/* Google Play badge — Figma "Component 3". The path90 wordmark is stored
                        vertically flipped in Figma and rendered with -scale-y-100 */}
                    <span className="flex h-[22.1px] w-auto shrink-0 items-center gap-[2.35px] rounded-[3.3px] border border-[#a6a6a6] bg-black px-[3.7px] lg:h-[42px] lg:gap-2 lg:rounded-md lg:px-[7.35px]">
                      <Image src="/assets/technology/playstore.svg" alt="" width={12} height={13} aria-hidden className="h-[13px] w-[12px] lg:h-[25.2px] lg:w-[22.05px]" />
                      <span className="flex flex-col gap-[1.7px] whitespace-nowrap text-white lg:gap-[3.15px]">
                        <span className="text-[5.5px] uppercase leading-none lg:text-[10.5px]">GET IT ON</span>
                        <Image src="/assets/technology/play-wordmark.svg" alt="Google Play" width={78} height={16} className="-scale-y-100 w-[20px] lg:w-[77.7px]" />
                      </span>
                    </span>
                  </div>
                </div>
              </article>
              <article className="relative h-[250px] w-full overflow-clip rounded-xl sm:h-[290px] md:h-[330px] lg:h-[343px] lg:flex-1 lg:rounded-3xl">
                <Image src="/assets/technology/card-perf.png" alt="" fill sizes="(max-width:1024px) 393px, 589px" className="object-cover object-bottom max-lg:hidden" />
                <Image src="/assets/technology/card-perf-mobile.png" alt="" fill sizes="393px" className="object-cover lg:hidden" />
                <CardHeading
                  className="lg:bottom-[21px] lg:left-[36px] lg:w-[534px]"
                  num="04 / Performance"
                  title="Climbs a slope on a full load"
                  descW="max-lg:max-w-[315px] lg:max-w-[484px]"
                  desc="Our own Arc Reactor motor. It climbs 22 to 25 percent slopes with a full load. Ramps, flyovers and rough roads are no problem."
                />
              </article>
            </div>
          </div>

          {/* mobile CTA (Figma 1:4818) — 24px below the cards, centered;
              the heading area carries no button on mobile (1:4785) */}
          <Button variant="dark" arrow="white" className="self-center lg:hidden">
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
}

function CardHeading({
  num,
  title,
  desc,
  titleW = "",
  descW = "lg:max-w-[427px]",
  className = "",
}: {
  num: string;
  title: string;
  desc: string;
  /** per-card title max-width (Figma), e.g. the Safety title wraps at 244px */
  titleW?: string;
  /** per-card description max-width (Figma: 427 · 327 · 376 · 484) */
  descW?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-x-[14px] bottom-[14px] flex flex-col gap-3 lg:gap-3 ${className}`}>
      <p className="font-display text-[12px] font-bold leading-[10.75px] tracking-[1.19px] text-ink-3 lg:text-[11px] lg:leading-[17.82px] lg:tracking-[1.98px]">
        {num}
      </p>
      <h3 className={`font-display text-[18px] font-bold leading-[1.15] tracking-[-0.36px] text-ink lg:text-[28px] lg:font-semibold lg:tracking-[-0.84px] ${titleW}`}>
        {title}
      </h3>
      <p className={`max-w-full text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-normal ${descW}`}>
        {desc}
      </p>
    </div>
  );
}
