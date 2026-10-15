import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

/* Card art = transparent cutouts absolutely positioned over the #d9e1eb card
   fill and cropped by the card's overflow-clip. Positions transcribed from
   Figma (image boxes keep each PNG's natural aspect, so a single rect per
   breakpoint reproduces the crop exactly). */
const CARDS = [
  {
    title: "Built around real business needs",
    image: "/assets/about-euler/belief-card-1.png",
    size: [1774, 887],
    // mobile 2925:14101 (contain-fit inside the 373.752×175.959 box) · desktop 3527:16851
    mobile: { left: 72.02, top: 46.74, width: 351.92, height: 175.96 },
    desktop: { left: -38.73, top: 89.79, width: 388.46, height: 194.23 },
    // mobile-only melt of the cutout's left edge into the card fill (2925:14101 overlay)
    fade: true,
    titleCls: "left-3 top-3 w-[205.816px]",
    gradient:
      "bg-[linear-gradient(-71.442deg,#1d6fff_23.585%,#0e2f6d_93.088%)] lg:bg-[linear-gradient(-72.958deg,#1d6fff_23.585%,#0e2f6d_93.088%)]",
  },
  {
    title: "Designed for Indian roads",
    image: "/assets/about-euler/belief-card-2.png",
    size: [1536, 1024],
    // mobile 2925:14111 · desktop 3527:16863
    mobile: { left: -48.37, top: 8.06, width: 327.49, height: 218.35 },
    desktop: { left: -38.85, top: 90.79, width: 351.72, height: 234.56 },
    fade: false,
    titleCls:
      "right-3 top-3 w-[153.283px] text-right lg:right-auto lg:left-6 lg:top-6 lg:w-[188.93px] lg:text-left",
    gradient:
      "bg-[linear-gradient(-75.962deg,#1d6fff_23.585%,#0e2f6d_93.088%)] lg:bg-[linear-gradient(-74.285deg,#1d6fff_23.585%,#0e2f6d_93.088%)]",
  },
  {
    title: "Customer feedback drives innovation",
    image: "/assets/about-euler/belief-card-3.png",
    size: [1449, 1086],
    // mobile 2925:14120 · desktop 3527:16865
    mobile: { left: 60.19, top: 11.74, width: 331.78, height: 248.56 },
    desktop: { left: 0, top: 66.78, width: 331.78, height: 248.56 },
    fade: false,
    titleCls: "left-3 top-3 w-[153.283px] lg:left-6 lg:top-6 lg:w-[205.816px]",
    gradient:
      "bg-[linear-gradient(-80.537deg,#1d6fff_23.585%,#0e2f6d_93.088%)] lg:bg-[linear-gradient(-72.958deg,#1d6fff_23.585%,#0e2f6d_93.088%)]",
  },
  {
    title: "Reliable performance",
    image: "/assets/about-euler/belief-card-4.png",
    size: [1774, 887],
    // mobile 2925:14117 · desktop 3527:16867 (positions verified against the
    // node renders — the code-gen crop offsets were ~6px off on this card)
    mobile: { left: -110, top: -21, width: 498.6, height: 249.3 },
    desktop: { left: -190, top: 38, width: 496.7, height: 248.4 },
    fade: false,
    titleCls:
      "right-[23.22px] top-[17.79px] w-[153.283px] text-right lg:right-auto lg:left-6 lg:top-6 lg:w-[205.816px] lg:text-left",
    gradient:
      "bg-[linear-gradient(-75.962deg,#1d6fff_23.585%,#0e2f6d_93.088%)] lg:bg-[linear-gradient(-72.958deg,#1d6fff_23.585%,#0e2f6d_93.088%)]",
  },
];

/**
 * Our Belief section (desktop Figma 3527:16797 · mobile 2917:13945).
 * "Building More Than Electric Vehicles" — header + four #d9e1eb cards with
 * vehicle cutouts and blue→navy gradient headings. Mobile stacks the cards
 * (200px tall) with alternating title sides; desktop keeps a centered
 * 311×284 row with all titles top-left.
 */
export default function AboutBelief() {
  return (
    <section className="bg-white py-6 lg:py-[60px]" aria-label="Our belief">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 lg:gap-[55px] lg:px-[80px]">
        {/* Header — mobile: stacked, 14px gaps · desktop: title left, copy bottom-aligned right */}
        <div className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[14px] lg:gap-4">
            <div className="lg:hidden">
              <Eyebrow label="Our Belief" />
            </div>
            <div className="hidden lg:block">
              <Eyebrow label="Customers" />
            </div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:w-[623.898px] lg:text-[52px] lg:tracking-[-1.04px]">
              Building More Than Electric Vehicles
            </h2>
          </div>
          <p className="text-[12px] font-normal leading-[1.4] text-ink lg:w-[481.935px] lg:text-[16px] lg:leading-[1.40625]">
            At Euler Motors, we believe a commercial vehicle should do more
            than move goods. It should help businesses grow, reduce running
            costs and make every working day more productive. That&apos;s why
            every vehicle, every technology and every decision starts with the
            people who use it every day.
          </p>
        </div>

        {/* Cards — mobile: 12px-apart stack · desktop: centered 10px-gap row */}
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:justify-center lg:gap-[10px]">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="relative h-[200px] w-full shrink-0 overflow-clip rounded-[12px] bg-[#d9e1eb] lg:h-[284px] lg:w-[311px]"
            >
              <Image
                src={card.image}
                alt=""
                width={card.size[0]}
                height={card.size[1]}
                className="pointer-events-none absolute max-w-none lg:hidden"
                style={card.mobile}
              />
              <Image
                src={card.image}
                alt=""
                width={card.size[0]}
                height={card.size[1]}
                className="pointer-events-none absolute hidden max-w-none lg:block"
                style={card.desktop}
              />
              {card.fade && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[61.1px] top-[46.74px] h-[175.959px] w-[373.752px] lg:hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(-87.75540964231453deg, rgba(217, 225, 235, 0) 74.98%, rgb(217, 225, 235) 94.469%)",
                  }}
                />
              )}
              <h3
                className={`absolute bg-clip-text font-display text-[18px] font-bold leading-[1.15] tracking-[-0.36px] text-transparent lg:text-[20px] lg:font-semibold lg:tracking-[-0.4px] ${card.titleCls} ${card.gradient}`}
              >
                {card.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
